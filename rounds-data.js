const ATTENDINGS = {
  hardass: { name: "Dr. Sterling", title: "Chief of Surgery", color: "text-red-500", bg: "bg-red-950/30", border: "border-red-500", multiplier: 2.2 },
  socratic: { name: "Dr. Sphinx", title: "Internal Medicine", color: "text-blue-400", bg: "bg-blue-950/30", border: "border-blue-400", multiplier: 1.3 },
  toxic: { name: "Dr. Viper", title: "OBGYN Attending", color: "text-purple-400", bg: "bg-purple-950/30", border: "border-purple-400", multiplier: 1.9 },
  pediatric: { name: "Dr. Sunny", title: "Pediatrician", color: "text-emerald-400", bg: "bg-emerald-950/30", border: "border-emerald-400", multiplier: 0.8 },
  neuro: { name: "Dr. Reflex", title: "Neurology", color: "text-amber-400", bg: "bg-amber-950/30", border: "border-amber-400", multiplier: 1.5 }
};

const CASES = [
  {
    patient: "Mr. Jones, 68M",
    vignette: "Post-op Day 1 after an emergency AAA repair. The patient was stable overnight but now complains of sudden, agonizing abdominal pain. He has had two episodes of grossly bloody diarrhea in the last hour. Vitals: HR 118, BP 105/65.",
    attending: ATTENDINGS.hardass,
    intro: "My surgery was flawless. Why is this man's colon dying? Don't embarrass me.",
    questions: [{
        text: "What happened in the OR that caused this?",
        options: ["C. Difficile overgrowth", "Ligation of the IMA", "Aortoenteric fistula", "Small bowel obstruction"],
        correct: 1,
        success: "Exactly. The IMA was sacrificed. I expect you to know the anatomy before you scrub in next time.",
        fail: "Wrong. It's Ischemic Colitis. We ligated the Inferior Mesenteric Artery. Read a book."
    }]
  },
  {
    patient: "Ms. Miller, 24F",
    vignette: "G1P0 at 34 weeks gestation. She presents to L&D with a 'blinding' headache and flashes of light in her vision. Her blood pressure is 178/114. On exam, she has 4+ patellar reflexes and 3 beats of clonus.",
    attending: ATTENDINGS.toxic,
    intro: "The patient is about to have a grand mal seizure. Are you going to help or just stand there?",
    questions: [{
        text: "What is your immediate neuroprotective priority?",
        options: ["Stat C-Section", "IV Magnesium Sulfate", "Labetalol drip", "Wait for labs"],
        correct: 1,
        success: "Fine. You saved her from a seizure. Don't expect a thank you.",
        fail: "She just seized because you hesitated. It's Magnesium. Always Magnesium."
    }]
  },
  {
    patient: "Baby Boy, 2-week-old",
    vignette: "A newborn presents with forceful, projectile, non-bilious vomiting after every feed. He looks dehydrated. You feel a small, firm, 'olive-like' mass in the epigastrium during the exam.",
    attending: ATTENDINGS.pediatric,
    intro: "Poor little guy. Since you're so smart, tell me exactly what his blood chemistry looks like.",
    questions: [{
        text: "Select the expected BMP findings:",
        options: ["Metabolic Acidosis", "Hypochloremic Hypokalemic Metabolic Alkalosis", "Hyperkalemia", "Normal electrolytes"],
        correct: 1,
        success: "Spot on! Contraction alkalosis from losing all that gastric acid.",
        fail: "Incorrect. Think! He's vomiting pure HCl. That leads to Hypochloremic Metabolic Alkalosis."
    }]
  },
  {
    patient: "Mr. Henderson, 55M",
    vignette: "Long history of alcohol use and cirrhosis. He is confused and disoriented. You notice a distinct 'flapping' tremor (asterixis) when he extends his arms.",
    attending: ATTENDINGS.socratic,
    intro: "Hepatic encephalopathy. A classic. But tell me, doctor, what is the primary medication to start?",
    questions: [{
        text: "Initial treatment of choice?",
        options: ["Rifaximin", "Lactulose", "Neomycin", "Spironolactone"],
        correct: 1,
        success: "Correct. We need to trap that ammonia in the gut. 2-3 soft stools a day.",
        fail: "No. Lactulose is first-line. Rifaximin is what you add when you're failing."
    }]
  },
  {
    patient: "Ms. Lane, 30F",
    vignette: "Sudden onset pleuritic chest pain and SOB. She recently returned from a 14-hour flight. She is on OCPs and smokes. HR 124, RR 26, O2 sat 91%.",
    attending: ATTENDINGS.hardass,
    intro: "She's tachycardic and hypoxic. If you say 'anxiety' I'm reporting you to the Dean.",
    questions: [{
        text: "What is the most common EKG finding for this condition?",
        options: ["S1Q3T3 pattern", "Sinus Tachycardia", "Right Bundle Branch Block", "T-wave inversions"],
        correct: 1,
        success: "Correct. S1Q3T3 is a board trap. Real doctors look for Sinus Tach.",
        fail: "You fell for the board trap! S1Q3T3 is rare. Sinus Tachycardia is the most common."
    }]
  },
  {
    patient: "Mr. D, 52M",
    vignette: "Found down in a park. Pinpoint pupils, RR 6, HR 50. Blue tint to his lips. He's barely breathing.",
    attending: ATTENDINGS.socratic,
    intro: "Clock is ticking. What are we giving him?",
    questions: [{
        text: "Treatment?",
        options: ["Flumazenil", "Naloxone", "Physostigmine", "Atropine"],
        correct: 1,
        success: "Yes. Keep an eye on him, the half-life of the drug is shorter than the opioid.",
        fail: "Respiratory depression + pinpoint pupils = Opioids. Give the Narcan!"
    }]
  },
  {
    patient: "Ms. S, 19F",
    vignette: "College student with fever, neck stiffness, and a petechial rash on her legs. BP 90/60. She is rapidly declining.",
    attending: ATTENDINGS.hardass,
    intro: "Meningitis until proven otherwise. I want the empiric antibiotics NOW.",
    questions: [{
        text: "Initial antibiotic choice?",
        options: ["Amoxicillin", "Ceftriaxone and Vancomycin", "Ciprofloxacin", "Gentamicin"],
        correct: 1,
        success: "Correct. Don't wait for the LP if they are this unstable.",
        fail: "She'll be dead by morning. You need Ceftriaxone and Vancomycin to cover N. men and S. pneumo."
    }]
  },
  {
    patient: "Mr. K, 45M",
    vignette: "Sudden onset 'worst headache of my life.' BP 190/110. CT head is negative for hemorrhage.",
    attending: ATTENDINGS.socratic,
    intro: "CT is negative. Does that mean we can go have lunch? Is the patient safe?",
    questions: [{
        text: "Next step?",
        options: ["MRI Head", "Lumbar Puncture", "Repeat CT", "Discharge with NSAIDs"],
        correct: 1,
        success: "Correct. We must check for xanthochromia in the CSF.",
        fail: "Never trust a negative CT if the history screams Subarachnoid Hemorrhage. Do the LP."
    }]
  },
  {
    patient: "Jimmy, 12M",
    vignette: "Sudden onset scrotal pain. The testis is high-riding and the cremasteric reflex is absent. He is crying in pain.",
    attending: ATTENDINGS.hardass,
    intro: "Time is tissue, doctor. What's the plan?",
    questions: [{
        text: "Management?",
        options: ["Doppler Ultrasound", "Manual Detorsion", "Immediate Surgical Exploration", "Ice pack and rest"],
        correct: 2,
        success: "Correct. Don't waste time on imaging if the clinical suspicion is this high.",
        fail: "Wrong. Every minute you spend waiting for ultrasound, that testis is dying. Straight to the OR."
    }]
  },
  {
    patient: "Ms. P, 28F",
    vignette: "Hearing voices telling her she is royalty. This has been happening for 8 months. No mood symptoms or drug use.",
    attending: ATTENDINGS.socratic,
    intro: "Let's talk diagnostics. How long does this have to last to qualify as Schizophrenia?",
    questions: [{
        text: "Diagnosis?",
        options: ["Schizophreniform", "Schizophrenia", "Brief Psychotic Disorder", "Delusional Disorder"],
        correct: 1,
        success: "Correct. Over 6 months moves it from 'form' to 'phrenia'.",
        fail: "Look at the timeline! 8 months = Schizophrenia. Under 6 months would be Schizophreniform."
    }]
  },
  {
    patient: "Mr. B, 62M",
    vignette: "Crushing chest pain. EKG shows ST elevation in leads II, III, and aVF. He's nauseous.",
    attending: ATTENDINGS.socratic,
    intro: "Where is the infarct, and which artery is likely blocked?",
    questions: [{
        text: "Location and Artery?",
        options: ["Anterior / LAD", "Inferior / RCA", "Lateral / LCX", "Posterior / PDA"],
        correct: 1,
        success: "Correct. Inferior MI. Check the right-sided leads before giving Nitro.",
        fail: "II, III, and aVF are the inferior leads. That's the Right Coronary Artery."
    }]
  },
  {
    patient: "Mrs. G, 70F",
    vignette: "SOB, crackles on lung exam. AFib with RVR (HR 162). BP is 82/50. She's cold and clammy.",
    attending: ATTENDINGS.socratic,
    intro: "She's unstable. Do we give drugs or electricity?",
    questions: [{
        text: "Next step?",
        options: ["Metoprolol", "Synchronized Cardioversion", "Diltiazem", "Amiodarone"],
        correct: 1,
        success: "Yes. If they are unstable with a pulse, you shock them.",
        fail: "If the BP is 82/50, she's in shock. Don't reach for the beta-blocker, reach for the paddles."
    }]
  },
  {
    patient: "Mr. H, 55M",
    vignette: "Smoker with a lung mass. Sodium is 119. He's confused and just had a brief seizure.",
    attending: ATTENDINGS.socratic,
    intro: "SIADH. We need to raise the sodium, but how fast?",
    questions: [{
        text: "Management?",
        options: ["Fluid restriction", "3% Hypertonic Saline", "Normal Saline", "Desmopressin"],
        correct: 1,
        success: "Correct. Symptomatic hyponatremia gets 3%. Don't go too fast or you'll fry the pons.",
        fail: "He's seizing! Fluid restriction isn't enough. You need Hypertonic Saline."
    }]
  },
  {
    patient: "Ms. T, 30F",
    vignette: "Joint pain, butterfly rash, and new-onset proteinuria. You suspect SLE.",
    attending: ATTENDINGS.socratic,
    intro: "What's the first test you're ordering to screen her?",
    questions: [{
        text: "Screening test?",
        options: ["Anti-dsDNA", "ANA", "Anti-Smith", "Complement C3/C4"],
        correct: 1,
        success: "Correct. High sensitivity. If this is negative, it's likely not Lupus.",
        fail: "ANA is the screening test. dsDNA and Smith are for confirmation."
    }]
  },
  {
    patient: "Mr. R, 65M",
    vignette: "Fever, new heart murmur, and splinter hemorrhages under his fingernails. History of IV drug use.",
    attending: ATTENDINGS.socratic,
    intro: "Endocarditis. What are you doing first before the antibiotics hit the vein?",
    questions: [{
        text: "Initial action?",
        options: ["TTE", "Blood Cultures x3", "TEE", "Chest X-ray"],
        correct: 1,
        success: "Always. Get the cultures from different sites before you muddy the waters with meds.",
        fail: "You'll never get a clean culture if you start meds first. Cultures x3 immediately."
    }]
  },
  {
    patient: "Mrs. P, 80F",
    vignette: "Productive cough, confusion. BP 88/50, RR 32, BUN 30. CXR shows RML pneumonia.",
    attending: ATTENDINGS.socratic,
    intro: "Calculate the CURB-65. Where is this patient going?",
    questions: [{
        text: "Disposition?",
        options: ["Home with Azithro", "General Floor", "ICU Admission", "Observation unit"],
        correct: 2,
        success: "Correct. Her score is 4. She needs the unit.",
        fail: "Her CURB-65 score is 4. Sending her anywhere but the ICU is negligence."
    }]
  },
  {
    patient: "Ms. J, 28F",
    vignette: "Heavy vaginal bleeding, IUP at 8 weeks. Cramping is severe. On exam, the cervical os is open.",
    attending: ATTENDINGS.toxic,
    intro: "She's bleeding out. Is this pregnancy savable?",
    questions: [{
        text: "Diagnosis?",
        options: ["Threatened Abortion", "Inevitable Abortion", "Incomplete Abortion", "Missed Abortion"],
        correct: 1,
        success: "Correct. The open os makes it inevitable.",
        fail: "If the os is open and she's bleeding/cramping, it's inevitable. Threatened has a closed os."
    }]
  },
  {
    patient: "Ms. K, 32F",
    vignette: "Just delivered a 9lb baby. Now she's having massive postpartum hemorrhage. The uterus feels soft and boggy.",
    attending: ATTENDINGS.toxic,
    intro: "Uterine atony. Don't just look at the blood, do something!",
    questions: [{
        text: "First step?",
        options: ["Bimanual Uterine Massage", "IV Oxytocin", "Hysterectomy", "B-Lynch suture"],
        correct: 0,
        success: "Yes. Massage first, then meds. Keep the uterus contracting.",
        fail: "Bimanual massage is always the first move. Then you reach for the Pitocin."
    }]
  },
  {
    patient: "Boy, 4M",
    vignette: "Brought in with fever, a 'barking' cough, and inspiratory stridor that gets worse when he cries.",
    attending: ATTENDINGS.pediatric,
    intro: "Croup. What are we going to do to open up those airways?",
    questions: [{
        text: "Treatment?",
        options: ["Albuterol", "Dexamethasone and Racemic Epi", "Antibiotics", "Intubation"],
        correct: 1,
        success: "Correct. Racemic Epi for the stridor at rest, steroids for the inflammation.",
        fail: "It's Croup! Steroids and Racemic Epinephrine. Albuterol does nothing for subglottic swelling."
    }]
  },
  {
    patient: "Girl, 6F",
    vignette: "Sudden bruising and petechiae 1 week after a viral cold. Platelets are 12,000. Rest of the CBC is normal.",
    attending: ATTENDINGS.pediatric,
    intro: "It's ITP. Do we need to do a bone marrow biopsy?",
    questions: [{
        text: "Management?",
        options: ["Bone marrow biopsy", "Observe or IVIG/Steroids", "Splenectomy", "Platelet transfusion"],
        correct: 1,
        success: "Correct. In kids, it usually resolves on its own. Observe or treat with IVIG/Steroids.",
        fail: "No biopsy needed for classic ITP. Just observe or use IVIG/Steroids if bleeding."
    }]
  },
  {
    patient: "Mr. V, 70M",
    vignette: "Right-sided weakness and aphasia started 2 hours ago. CT head shows no hemorrhage.",
    attending: ATTENDINGS.neuro,
    intro: "Ischemic stroke. Are we within the window for tPA?",
    questions: [{
        text: "Action?",
        options: ["Alteplase (tPA)", "Aspirin only", "MRI head first", "Wait 24 hours"],
        correct: 0,
        success: "Correct. We are within the 3-4.5 hour window. Let's roll.",
        fail: "Time is brain! CT is clear and we are in the window. Give the tPA."
    }]
  },
  {
    patient: "Mr. Y, 40M",
    vignette: "Diagnosed with a massive STEMI. He says he 'feels fine' and wants to leave AMA to go to a concert.",
    attending: ATTENDINGS.socratic,
    intro: "He's trying to kill himself by leaving. Can we stop him?",
    questions: [{
        text: "Ethical Action?",
        options: ["Call security to restrain him", "Let him leave immediately", "Assess for decision-making capacity", "Call his wife to decide"],
        correct: 2,
        success: "Yes. If he has capacity, he can make bad decisions. But you must prove he has capacity first.",
        fail: "You cannot restrain him without assessing capacity. If he's sound of mind, he can walk out."
    }]
  },
  {
    patient: "Mr. O, 25M",
    vignette: "Presents with painful urination and a purulent urethral discharge. Gram stain shows no organisms.",
    attending: ATTENDINGS.socratic,
    intro: "Negative gram stain doesn't mean negative infection. What are we treating?",
    questions: [{
        text: "Treatment?",
        options: ["Ceftriaxone only", "Azithromycin/Doxy only", "Ceftriaxone AND Azithro/Doxy", "Syphilis treatment"],
        correct: 2,
        success: "Correct. Always treat for both Gonorrhea and Chlamydia.",
        fail: "Standard of care is to cover both Gonorrhea and Chlamydia simultaneously."
    }]
  },
  {
    patient: "Ms. Q, 50F",
    vignette: "Flank pain, fever, and nausea. Urinalysis shows WBC casts.",
    attending: ATTENDINGS.socratic,
    intro: "WBC casts. Does she have a simple UTI or something worse?",
    questions: [{
        text: "Diagnosis?",
        options: ["Cystitis", "Pyelonephritis", "Nephrolithiasis", "Glomerulonephritis"],
        correct: 1,
        success: "Yes. Casts mean the infection is in the kidneys.",
        fail: "The casts tell the story. This is Pyelonephritis."
    }]
  },
  {
    patient: "Mr. E, 33M",
    vignette: "Final Case: A hiker found in the snow. Temp is 84F. EKG shows a bizarre upward notch at the end of the QRS.",
    attending: ATTENDINGS.hardass,
    intro: "Last one. Identify the EKG finding and the diagnosis.",
    questions: [{
        text: "Diagnosis?",
        options: ["Hypothermia / Osborn Waves", "Hyperkalemia / Peaked T", "Brugada / ST elevation", "Hypocalcemia / Long QT"],
        correct: 0,
        success: "Excellent. You finished the shift. Go get some sleep.",
        fail: "Osborn waves. It's classic hypothermia. Get him on a warming blanket."
    }]
  }
];