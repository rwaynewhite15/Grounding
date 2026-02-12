// State management
let currentExercise = null;
let exerciseState = {
    step: 0,
    isRunning: false,
    intervalId: null
};

// Navigation
function startExercise(exerciseId) {
    hideAllScreens();
    document.getElementById(`exercise-${exerciseId}`).classList.add('active');
    currentExercise = exerciseId;
    resetExerciseState();
}

function goHome() {
    hideAllScreens();
    document.getElementById('home-screen').classList.add('active');
    currentExercise = null;
    resetExerciseState();
    stopBreathing();
}

function hideAllScreens() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
}

function resetExerciseState() {
    exerciseState.step = 0;
    exerciseState.isRunning = false;
    if (exerciseState.intervalId) {
        clearInterval(exerciseState.intervalId);
        exerciseState.intervalId = null;
    }
}

// 5-4-3-2-1 Grounding Technique
const technique54321 = [
    { text: "Welcome to the 5-4-3-2-1 grounding technique. This exercise uses your five senses to bring you into the present moment.", progress: 0 },
    { text: "Take a deep breath and look around you.", progress: 5 },
    { text: "Name 5 things you can SEE around you. Take your time with each one.", progress: 15 },
    { text: "Notice the colors, shapes, and details of what you see.", progress: 25 },
    { text: "Now, name 4 things you can TOUCH. Feel their texture - smooth, rough, soft, hard?", progress: 35 },
    { text: "Pay attention to the sensation of your body in contact with what you're touching.", progress: 45 },
    { text: "Name 3 things you can HEAR. Listen carefully to sounds near and far.", progress: 55 },
    { text: "Notice sounds you might normally ignore - breathing, distant traffic, birds.", progress: 65 },
    { text: "Name 2 things you can SMELL. If you can't smell anything, name 2 favorite scents.", progress: 75 },
    { text: "Take a moment to really focus on these scents and what they remind you of.", progress: 85 },
    { text: "Name 1 thing you can TASTE. What does your mouth taste like right now?", progress: 90 },
    { text: "Take a final deep breath. Notice how you feel more present and grounded.", progress: 95 },
    { text: "Exercise complete! You've successfully used your senses to anchor yourself in the present moment.", progress: 100 }
];

let current54321Step = 0;

function next54321() {
    if (current54321Step < technique54321.length - 1) {
        current54321Step++;
        update54321Display();
    } else {
        current54321Step = 0;
        update54321Display();
    }
}

function update54321Display() {
    const step = technique54321[current54321Step];
    document.getElementById('instruction-text-54321').textContent = step.text;
    document.getElementById('progress-54321').style.width = step.progress + '%';
    
    const button = document.getElementById('next-54321');
    if (current54321Step === technique54321.length - 1) {
        button.textContent = 'Restart';
    } else {
        button.textContent = 'Next';
    }
}

// Initialize 5-4-3-2-1 when page loads
document.addEventListener('DOMContentLoaded', () => {
    update54321Display();
});

// Box Breathing Exercise
let breathingActive = false;
let breathingPhase = 0;
const breathingPhases = [
    { name: 'Breathe In', duration: 4000, class: 'inhale' },
    { name: 'Hold', duration: 4000, class: 'inhale' },
    { name: 'Breathe Out', duration: 4000, class: 'exhale' },
    { name: 'Hold', duration: 4000, class: 'exhale' }
];

function startBreathing() {
    breathingActive = true;
    breathingPhase = 0;
    document.getElementById('start-breathing').style.display = 'none';
    document.getElementById('stop-breathing').style.display = 'inline-block';
    runBreathingCycle();
}

function stopBreathing() {
    breathingActive = false;
    breathingPhase = 0;
    document.getElementById('start-breathing').style.display = 'inline-block';
    document.getElementById('stop-breathing').style.display = 'none';
    document.getElementById('breathing-instruction').textContent = 'Get Ready';
    document.querySelector('.circle-inner').className = 'circle-inner';
}

function runBreathingCycle() {
    if (!breathingActive) return;
    
    const phase = breathingPhases[breathingPhase];
    const circle = document.querySelector('.circle-inner');
    const instruction = document.getElementById('breathing-instruction');
    
    // Remove all classes
    circle.className = 'circle-inner';
    
    // Add current phase class
    setTimeout(() => {
        circle.classList.add(phase.class);
    }, 50);
    
    instruction.textContent = phase.name;
    
    breathingPhase = (breathingPhase + 1) % breathingPhases.length;
    
    setTimeout(() => {
        runBreathingCycle();
    }, phase.duration);
}

// Body Scan Meditation
const bodyScanSteps = [
    { text: "Find a comfortable position, either sitting or lying down. Close your eyes if you feel comfortable.", duration: 5000, progress: 0 },
    { text: "Take three deep breaths. Breathe in through your nose and out through your mouth.", duration: 8000, progress: 8 },
    { text: "Bring your awareness to the top of your head. Notice any sensations - tingling, warmth, pressure, or nothing at all.", duration: 8000, progress: 16 },
    { text: "Move your attention to your face. Relax your forehead, your eyes, your jaw.", duration: 8000, progress: 24 },
    { text: "Notice your neck and shoulders. Let any tension melt away with each exhale.", duration: 8000, progress: 32 },
    { text: "Bring awareness to your chest and back. Feel your breath moving in this area.", duration: 8000, progress: 40 },
    { text: "Move down to your abdomen. Notice it rising and falling with each breath.", duration: 8000, progress: 48 },
    { text: "Shift attention to your arms, from shoulders to fingertips. Notice any sensations.", duration: 8000, progress: 56 },
    { text: "Bring awareness to your hips and pelvis. Notice where your body contacts the surface beneath you.", duration: 8000, progress: 64 },
    { text: "Move to your thighs. Notice any sensations of contact, temperature, or tension.", duration: 8000, progress: 72 },
    { text: "Focus on your knees and lower legs. Simply observe without judgment.", duration: 8000, progress: 80 },
    { text: "Finally, bring awareness to your feet and toes. Wiggle them gently if you like.", duration: 8000, progress: 88 },
    { text: "Take a moment to feel your whole body as one. Notice the sense of completeness.", duration: 8000, progress: 95 },
    { text: "When you're ready, gently open your eyes. Notice how your body feels now compared to when you started.", duration: 5000, progress: 100 }
];

let bodyScanIndex = 0;
let bodyScanInterval = null;

function startBodyScan() {
    bodyScanIndex = 0;
    document.getElementById('start-bodyscan').disabled = true;
    runBodyScanStep();
}

function runBodyScanStep() {
    if (bodyScanIndex >= bodyScanSteps.length) {
        document.getElementById('start-bodyscan').disabled = false;
        document.getElementById('start-bodyscan').textContent = 'Restart';
        return;
    }
    
    const step = bodyScanSteps[bodyScanIndex];
    document.getElementById('bodyscan-instruction').textContent = step.text;
    document.getElementById('progress-bodyscan').style.width = step.progress + '%';
    
    setTimeout(() => {
        bodyScanIndex++;
        runBodyScanStep();
    }, step.duration);
}

// Progressive Muscle Relaxation
const pmrSteps = [
    { text: "Welcome to Progressive Muscle Relaxation. Find a comfortable position and prepare to tense and relax different muscle groups.", duration: 6000, progress: 0 },
    { text: "Start with your hands. Make tight fists and hold for 5 seconds... Now release and notice the difference.", duration: 8000, progress: 10 },
    { text: "Bend your arms and tense your biceps. Hold... Now release and feel the relaxation spreading.", duration: 8000, progress: 20 },
    { text: "Raise your shoulders up toward your ears. Hold the tension... Now drop them and feel the release.", duration: 8000, progress: 30 },
    { text: "Wrinkle your forehead by raising your eyebrows. Hold... Now relax and smooth your forehead.", duration: 8000, progress: 40 },
    { text: "Squeeze your eyes shut tightly. Hold... Now relax and notice the softness around your eyes.", duration: 8000, progress: 50 },
    { text: "Clench your jaw by biting down. Hold... Now relax and let your mouth fall slightly open.", duration: 8000, progress: 60 },
    { text: "Tighten your chest and stomach muscles. Hold your breath... Now breathe out and relax completely.", duration: 8000, progress: 70 },
    { text: "Tense your legs by straightening them and pointing your toes. Hold... Now relax completely.", duration: 8000, progress: 80 },
    { text: "Curl your toes downward tightly. Hold... Now release and wiggle your toes gently.", duration: 8000, progress: 90 },
    { text: "Take a moment to scan your entire body. Notice the deep relaxation you've created.", duration: 6000, progress: 95 },
    { text: "Exercise complete! Your body has learned the difference between tension and relaxation. Practice this regularly to rewire your stress response.", duration: 5000, progress: 100 }
];

let pmrIndex = 0;

function startPMR() {
    pmrIndex = 0;
    document.getElementById('start-pmr').disabled = true;
    runPMRStep();
}

function runPMRStep() {
    if (pmrIndex >= pmrSteps.length) {
        document.getElementById('start-pmr').disabled = false;
        document.getElementById('start-pmr').textContent = 'Restart';
        return;
    }
    
    const step = pmrSteps[pmrIndex];
    document.getElementById('pmr-instruction').textContent = step.text;
    document.getElementById('progress-pmr').style.width = step.progress + '%';
    
    setTimeout(() => {
        pmrIndex++;
        runPMRStep();
    }, step.duration);
}

// Initialize app
console.log('Grounding app initialized - Rewire Your Brain');
