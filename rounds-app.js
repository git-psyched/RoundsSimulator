const { useState, useEffect, useRef } = React;
const e = React.createElement;

function App() {
    const [screen, setScreen] = useState('start'); 
    const [caseIdx, setCaseIdx] = useState(0);
    const [stress, setStress] = useState(20);
    const [feedback, setFeedback] = useState("");
    const [showNext, setShowNext] = useState(false);
    const [volume, setVolume] = useState(0.5);
    
    const audioCtx = useRef(null);
    const nextBeatTime = useRef(0);
    const requestRef = useRef();
    const canvasRef = useRef(null);

    // --- ECG CANVAS ENGINE (The Visuals) ---
    useEffect(() => {
        if (screen !== 'play' || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let x = 0;
        let animationId;

        const draw = () => {
            const bpm = 60 + (stress * 1.2);
            const speed = (bpm / 60) * 2.5; 
            
            ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.strokeStyle = stress > 85 ? '#ef4444' : '#22c55e';
            ctx.lineWidth = 3;
            
            let y = canvas.height / 2;
            const cycle = x % 100;
            if (cycle > 40 && cycle < 45) y -= 4; // P wave
            if (cycle >= 45 && cycle < 47) y += 6; // Q
            if (cycle >= 47 && cycle < 52) y -= 38; // R
            if (cycle >= 52 && cycle < 55) y += 18; // S
            if (cycle >= 65 && cycle < 75) y -= 6; // T wave

            ctx.moveTo(x % canvas.width, y);
            x += speed;
            ctx.lineTo(x % canvas.width, y);
            ctx.stroke();

            animationId = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(animationId);
    }, [screen, stress]);

    // --- AUDIO ENGINE (Heartbeat & Alarms Only) ---
    const playHeartbeat = () => {
        if (!audioCtx.current || screen !== 'play') return;
        if (audioCtx.current.state === 'suspended') audioCtx.current.resume();

        const bpm = 60 + (stress * 1.2); 
        const interval = 60 / bpm;

        if (audioCtx.current.currentTime > nextBeatTime.current) {
            // THE THUMP
            const osc = audioCtx.current.createOscillator();
            const gain = audioCtx.current.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(50, audioCtx.current.currentTime);
            osc.frequency.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + 0.15);
            gain.gain.setValueAtTime(volume * 0.6, audioCtx.current.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + 0.15);
            osc.connect(gain); gain.connect(audioCtx.current.destination);
            osc.start(); osc.stop(audioCtx.current.currentTime + 0.15);

            // TACHYCARDIA ALARM
            if (stress >= 90) {
                const alarm = audioCtx.current.createOscillator();
                const alarmGain = audioCtx.current.createGain();
                alarm.type = 'square';
                alarm.frequency.setValueAtTime(1000, audioCtx.current.currentTime);
                alarmGain.gain.setValueAtTime(volume * 0.15, audioCtx.current.currentTime);
                alarmGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + 0.1);
                alarm.connect(alarmGain); alarmGain.connect(audioCtx.current.destination);
                alarm.start(); alarm.stop(audioCtx.current.currentTime + 0.1);
            }
            nextBeatTime.current = audioCtx.current.currentTime + interval;
        }
        requestRef.current = requestAnimationFrame(playHeartbeat);
    };

    useEffect(() => {
        if (screen === 'play') requestRef.current = requestAnimationFrame(playHeartbeat);
        return () => cancelAnimationFrame(requestRef.current);
    }, [screen, stress, volume]);

    const initGame = async () => {
        if (!audioCtx.current) audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
        await audioCtx.current.resume();
        setScreen('play');
    };

    const playTone = (freq, duration, vol) => {
        if (!audioCtx.current || audioCtx.current.state !== 'running') return;
        const osc = audioCtx.current.createOscillator();
        const gain = audioCtx.current.createGain();
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(vol * volume, audioCtx.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + duration);
        osc.connect(gain); gain.connect(audioCtx.current.destination);
        osc.start(); osc.stop(audioCtx.current.currentTime + duration);
    };

    const handleAnswer = (idx) => {
        const curCase = CASES[caseIdx];
        const isCorrect = idx === curCase.questions[0].correct;
        if (isCorrect) {
            setFeedback(curCase.questions[0].success);
            setStress(s => Math.max(10, s - 12));
            playTone(880, 0.1, 0.2); 
        } else {
            setFeedback(curCase.questions[0].fail);
            const penalty = 35 * (curCase.attending.multiplier || 1.2);
            playTone(110, 0.4, 0.4); 
            setStress(s => {
                const ns = s + penalty;
                if (ns >= 100) setScreen('fail');
                return Math.min(100, ns);
            });
        }
        setShowNext(true);
    };

    const nextCase = () => {
        if (caseIdx + 1 < CASES.length) {
            setCaseIdx(caseIdx + 1);
            setFeedback("");
            setShowNext(false);
        } else {
            setScreen('win');
        }
    };

    if (screen === 'start') return e('div', {className: 'h-screen flex flex-col items-center justify-center p-6 bg-zinc-950 text-white'},
        e('h1', {className: 'text-8xl font-black italic tracking-tighter mb-4 text-center'}, 'ROUNDS SIM'),
        e('p', {className: 'text-zinc-500 mb-10 font-bold uppercase tracking-widest text-center whitespace-pre-line'}, 'Ready to get pimped?\nYou don\'t have a choice, you are paying for this!'),
        e('button', {onClick: initGame, className: 'bg-white text-black px-14 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]'}, 'START SHIFT')
    );

    if (screen === 'fail' || screen === 'win') {
        const isWin = screen === 'win';
        return e('div', {className: `h-screen flex flex-col items-center justify-center p-6 ${isWin ? 'bg-emerald-950' : 'bg-red-950'} text-white text-center`},
            e('h1', {className: 'text-7xl font-black mb-6 uppercase'}, isWin ? 'HONORS' : 'YOU BROKE'),
            e('p', {className: 'text-xl mb-10 max-w-md font-bold uppercase'}, isWin ? 'Surviving the shift is its own reward.' : 'You cracked under pressure. Go read UWorld.'),
            e('button', {onClick: () => window.location.reload(), className: 'bg-white text-black px-10 py-4 rounded-full font-black'}, 'RESTART')
        );
    }

    const current = CASES[caseIdx];

    return e('div', {className: 'max-w-2xl mx-auto py-6 px-6 min-h-screen flex flex-col justify-start'},
        e('canvas', {ref: canvasRef, width: 600, height: 100, className: 'w-full h-24 mb-4 rounded-xl bg-zinc-950 border border-zinc-900 shadow-inner'}),
        
        e('div', {className: 'flex flex-col gap-4 mb-6'},
            e('div', {className: 'flex justify-center gap-1'},
                CASES.map((_, i) => e('div', { key: i, className: `h-1 w-full rounded-full transition-all duration-500 ${i === caseIdx ? 'bg-white shadow-[0_0_8px_white]' : i < caseIdx ? 'bg-zinc-600' : 'bg-zinc-800'}` }))
            ),
            e('div', {className: 'flex justify-between items-end'},
                e('div', {className: 'w-1/3'}, 
                   e('p', {className: 'text-[10px] font-black text-zinc-500 mb-1 uppercase tracking-tighter'}, 'VOLUME'),
                   e('input', {type: 'range', min: 0, max: 1, step: 0.1, value: volume, onChange: (ev) => setVolume(parseFloat(ev.target.value)), className: 'w-full accent-white'})
                ),
                e('div', {className: 'text-right'},
                   e('p', {className: 'text-[10px] font-black text-zinc-500 mb-1 uppercase'}, 'STRESS_LEVEL'),
                   e('p', {className: `text-2xl font-black ${stress > 75 ? 'text-red-500 animate-pulse' : 'text-white'}`}, Math.round(stress) + '%')
                )
            )
        ),
        
        e('div', {className: 'bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-2xl mb-6'},
            e('h2', {className: 'text-blue-500 font-black mb-4 text-[10px] tracking-widest uppercase'}, 'FILE: ' + current.patient),
            e('p', {className: 'medical-font text-xl leading-relaxed text-zinc-100 italic'}, current.vignette)
        ),

        e('div', {className: `p-6 rounded-3xl border-2 mb-8 ${current.attending.border} ${current.attending.bg}`},
            e('p', {className: `font-black text-[10px] mb-2 uppercase ${current.attending.color}`}, current.attending.name + " // " + current.attending.title),
            e('p', {className: 'text-2xl font-bold leading-tight italic'}, feedback ? `"${feedback}"` : `"${current.intro || 'What is the diagnosis?'}"`)
        ),

        !showNext ? e('div', {className: 'grid gap-3'},
            current.questions[0].options.map((opt, i) => e('button', { key: i, onClick: () => handleAnswer(i), className: 'p-5 text-left border-2 border-zinc-800 rounded-2xl hover:border-white hover:bg-zinc-800 transition-all font-bold text-lg' }, opt))
        ) : e('button', { onClick: nextCase, className: 'w-full py-6 bg-white text-black font-black rounded-2xl text-2xl hover:scale-[1.02] transition-transform shadow-xl shadow-black/50' }, 'NEXT PATIENT →')
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e(App));