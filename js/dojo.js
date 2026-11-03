// App state
let currentDifficulty = 'beginner';
let currentCategory = 'all';
let currentChallenge = null;
let timer = null;
let timeLeft = 0;
let isTimerRunning = false;

// DOM elements
const categoryBtns = document.querySelectorAll('.category-btn');
const difficultyBtns = document.querySelectorAll('.difficulty-btn');
const challengeContent = document.querySelector('#challenge-content');
const newChallengeBtn = document.getElementById('new-challenge-btn');
const timerDisplay = document.getElementById('timer-display');
const increaseTimerBtn = document.getElementById('increase-timer-btn');
const decreaseTimerBtn = document.getElementById('decrease-timer-btn');
const startTimerBtn = document.getElementById('start-timer-btn');
const pauseTimerBtn = document.getElementById('pause-timer-btn');
const resetTimerBtn = document.getElementById('reset-timer-btn');

// Category selection
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;

        // Reset challenge display
        challengeContent.innerHTML = `
            <div class="challenge-placeholder">
                <span class="placeholder-text">Click "Generate New Challenge" to generate your practice challenge</span>
            </div>
        `;
        currentChallenge = null;
        startTimerBtn.disabled = true;
    });
});

// Difficulty selection
difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        difficultyBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDifficulty = btn.dataset.difficulty;

        // Reset challenge display
        challengeContent.innerHTML = `
            <div class="challenge-placeholder">
                <span class="placeholder-text">Click "Generate New Challenge" to generate your practice challenge</span>
            </div>
        `;
        currentChallenge = null;
        startTimerBtn.disabled = true;
    });
});

// Helper function to get all challenges from all categories
function getAllChallenges(difficulty) {
    let allChallenges = [];
    Object.keys(challenges).forEach(category => {
        if (challenges[category][difficulty]) {
            allChallenges = allChallenges.concat(challenges[category][difficulty]);
        }
    });
    return allChallenges;
}

// Challenge generation
newChallengeBtn.addEventListener('click', () => {
    let challengeList = [];
    
    if (currentCategory === 'all') {
        challengeList = getAllChallenges(currentDifficulty);
    } else {
        challengeList = challenges[currentCategory][currentDifficulty] || [];
    }
    
    if (challengeList.length === 0) {
        challengeContent.innerHTML = `
            <div class="challenge-placeholder">
                <span class="placeholder-text">No challenges available for this category and difficulty level.</span>
            </div>
        `;
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * challengeList.length);
    currentChallenge = challengeList[randomIndex];
    
    challengeContent.innerHTML = `
        <div class="challenge-structure">
            <div class="challenge-field">
                <div class="challenge-label">Design:</div>
                <div class="challenge-value">${currentChallenge.design}</div>
            </div>
            <div class="challenge-field">
                <div class="challenge-label">For:</div>
                <div class="challenge-value">${currentChallenge.for}</div>
            </div>
            <div class="challenge-field">
                <div class="challenge-label">To help:</div>
                <div class="challenge-value">${currentChallenge.toHelp}</div>
            </div>
        </div>
    `;

    startTimerBtn.disabled = false;
    
    // Reset timer
    resetTimer();

    gtag('event', 'challenge_generated', { category: currentCategory, difficulty: currentDifficulty });
});

// Timer functions
function parseTimeInput(timeString) {
    // Parse MM:SS format or just MM format
    const parts = timeString.split(':');
    if (parts.length === 2) {
        const minutes = parseInt(parts[0]) || 0;
        const seconds = parseInt(parts[1]) || 0;
        return (minutes * 60) + seconds;
    } else if (parts.length === 1) {
        const minutes = parseInt(parts[0]) || 0;
        return minutes * 60;
    }
    return 0;
}

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
}

function increaseTimer() {
    if (!isTimerRunning && timeLeft === 0) {
        const currentTime = parseTimeInput(timerDisplay.textContent);
        const newTime = Math.min(currentTime + 60, 120 * 60); // Add 1 minute, max 120 minutes
        timerDisplay.textContent = formatTime(newTime);
    }
}

function decreaseTimer() {
    if (!isTimerRunning && timeLeft === 0) {
        const currentTime = parseTimeInput(timerDisplay.textContent);
        const newTime = Math.max(currentTime - 60, 60); // Remove 1 minute, min 1 minute
        timerDisplay.textContent = formatTime(newTime);
    }
}

function updateButtonStates() {
    const isRunning = isTimerRunning;
    const isPaused = timeLeft > 0 && !isTimerRunning;

    increaseTimerBtn.disabled = isRunning || isPaused;
    decreaseTimerBtn.disabled = isRunning || isPaused;
}

function startTimer() {
    if (!currentChallenge) return;

    if (!isTimerRunning) {
        if (timeLeft === 0) {
            timeLeft = parseTimeInput(timerDisplay.textContent);
            if (timeLeft === 0) {
                alert('Please enter a valid time (e.g., 20:00 or 20)');
                return;
            }
        }
        
        timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                isTimerRunning = false;
                startTimerBtn.textContent = 'Start';
                startTimerBtn.disabled = false;
                pauseTimerBtn.disabled = true;
                updateButtonStates();
                alert('Time\'s up! Great work on your challenge!');
            }
        }, 1000);
        
        isTimerRunning = true;
        startTimerBtn.textContent = 'Resume';
        startTimerBtn.disabled = true;
        pauseTimerBtn.disabled = false;
        updateButtonStates();
    }
}

function pauseTimer() {
    if (isTimerRunning) {
        clearInterval(timer);
        isTimerRunning = false;
        startTimerBtn.disabled = false;
        pauseTimerBtn.disabled = true;
        updateButtonStates();
    }
}

function resetTimer() {
    clearInterval(timer);
    isTimerRunning = false;
    timeLeft = 0;
    timerDisplay.textContent = '20:00';
    startTimerBtn.textContent = 'Start';
    startTimerBtn.disabled = currentChallenge ? false : true;
    pauseTimerBtn.disabled = true;
    updateButtonStates();
}

// Timer event listeners
increaseTimerBtn.addEventListener('click', increaseTimer);
decreaseTimerBtn.addEventListener('click', decreaseTimer);
startTimerBtn.addEventListener('click', startTimer);
pauseTimerBtn.addEventListener('click', pauseTimer);
resetTimerBtn.addEventListener('click', resetTimer);

// Go to Whiteboard button event listener
const goToWhiteboardBtn = document.getElementById('go-to-whiteboard-btn');
goToWhiteboardBtn.addEventListener('click', () => {
    gtag('event', 'go_to_whiteboard', { with_challenge: Boolean(currentChallenge), difficulty: currentDifficulty });
    if (currentChallenge) {
        // Get current timer value
        const currentTimerValue = parseTimeInput(timerDisplay.textContent);

        const challengeParams = new URLSearchParams({
            design: currentChallenge.design,
            for: currentChallenge.for,
            toHelp: currentChallenge.toHelp,
            timer: currentTimerValue.toString()
        });
        window.location.href = `../whiteboard/?challenge=${encodeURIComponent(challengeParams.toString())}`;
    } else {
        // No challenge generated - navigate to whiteboard without challenge
        window.location.href = `../whiteboard/`;
    }
});

// Initialize timer display and button states
timerDisplay.textContent = '15:00';
updateButtonStates();
