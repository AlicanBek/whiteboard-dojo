// Sample challenges data with categories and new structure
const challenges = {
    branding: {
        beginner: [
            {
                design: "a simple logo",
                for: "a local coffee shop",
                toHelp: "young professionals identify the brand"
            },
            {
                design: "a color palette",
                for: "a fitness startup",
                toHelp: "convey energy and motivation"
            },
            {
                design: "a business card layout",
                for: "a freelance photographer",
                toHelp: "make a memorable first impression"
            },
            {
                design: "a packaging layout",
                for: "a boutique skincare brand",
                toHelp: "stand out on retail shelves and communicate brand values"
            },
            {
                design: "social media graphics",
                for: "a fitness influencer",
                toHelp: "create consistent, engaging visual content across platforms"
            }
        ],
        intermediate: [
            {
                design: "a complete brand identity system",
                for: "a sustainable fashion brand",
                toHelp: "appeal to environmentally conscious millennials"
            },
            {
                design: "a brand refresh strategy",
                for: "an established restaurant chain",
                toHelp: "attract younger customers while retaining loyalty"
            },
            {
                design: "a brand guidelines system",
                for: "a startup acquiring another company",
                toHelp: "merge two brand identities while maintaining equity"
            },
            {
                design: "a corporate rebrand campaign",
                for: "a legacy manufacturing company modernizing its image",
                toHelp: "signal innovation without alienating existing customers"
            }
        ],
        advanced: [
            {
                design: "a comprehensive rebranding strategy",
                for: "a B2B software company pivoting to consumer market",
                toHelp: "completely change market perception and target audience"
            },
            {
                design: "a luxury brand identity system",
                for: "a sustainable jewelry startup",
                toHelp: "appeal to affluent environmentally-conscious consumers"
            },
            {
                design: "a rebrand for a crisis recovery",
                for: "a company recovering from negative press",
                toHelp: "rebuild trust and establish a new brand narrative"
            }
        ]
    },
    marketing: {
        beginner: [
            {
                design: "a social media post template",
                for: "a bakery's Instagram account",
                toHelp: "increase daily engagement with local customers"
            },
            {
                design: "an email newsletter layout",
                for: "a book club",
                toHelp: "keep members informed about upcoming meetings"
            },
            {
                design: "a social media campaign calendar",
                for: "a local charity",
                toHelp: "build awareness and drive volunteer signups"
            },
            {
                design: "podcast artwork and branding",
                for: "an indie podcast creator",
                toHelp: "create a professional presence across platforms"
            }
        ],
        intermediate: [
            {
                design: "a landing page for a marketing campaign",
                for: "a SaaS product launch",
                toHelp: "convert free trial users to paid subscribers"
            },
            {
                design: "a multi-channel campaign strategy",
                for: "a non-profit fundraising event",
                toHelp: "reach diverse donor demographics across platforms"
            },
            {
                design: "a video marketing strategy",
                for: "a B2B SaaS company",
                toHelp: "educate prospects and reduce sales cycle length"
            },
            {
                design: "a guerrilla marketing campaign",
                for: "a sustainable fashion startup with limited budget",
                toHelp: "generate viral awareness and media coverage"
            }
        ],
        advanced: [
            {
                design: "a comprehensive marketing automation flow",
                for: "an e-commerce platform",
                toHelp: "reduce cart abandonment and increase customer lifetime value"
            },
            {
                design: "an omnichannel customer experience strategy",
                for: "a retail fashion brand",
                toHelp: "seamlessly integrate online and physical store interactions"
            },
            {
                design: "a community-driven growth marketing strategy",
                for: "a developer tools platform",
                toHelp: "build organic adoption through influencers and advocates"
            }
        ]
    },
    "product-ux": {
        beginner: [
            {
                design: "a login screen",
                for: "a fitness app",
                toHelp: "busy professionals"
            },
            {
                design: "a shopping cart view",
                for: "a recipe app", 
                toHelp: "college students"
            },
            {
                design: "a profile page",
                for: "a music streaming app",
                toHelp: "commuters"
            },
            {
                design: "a search results view",
                for: "a book reading app",
                toHelp: "bookworms"
            },
            {
                design: "a notification settings screen",
                for: "a meditation app",
                toHelp: "stressed workers"
            },
            {
                design: "a favorites/wishlist feature",
                for: "an e-commerce mobile app",
                toHelp: "price-conscious shoppers track items they want"
            },
            {
                design: "an onboarding flow",
                for: "a project management tool",
                toHelp: "new users understand core features quickly"
            }
        ],
        intermediate: [
            {
                design: "a multi-step checkout flow",
                for: "an e-commerce platform",
                toHelp: "elderly users with accessibility needs"
            },
            {
                design: "a collaborative playlist feature",
                for: "a music streaming service",
                toHelp: "remote teams who want to bond"
            },
            {
                design: "a habit tracking dashboard",
                for: "a productivity app",
                toHelp: "freelancers and consultants"
            },
            {
                design: "a meal planning interface",
                for: "a nutrition app",
                toHelp: "families with dietary restrictions"
            },
            {
                design: "a project management dashboard",
                for: "a team collaboration tool",
                toHelp: "creative agencies"
            },
            {
                design: "a social proof/review system",
                for: "a booking platform (hotels, flights, restaurants)",
                toHelp: "increase user trust and conversion rates"
            },
            {
                design: "an activity feed for a social app",
                for: "a professional networking platform",
                toHelp: "users discover relevant content and connections"
            }
        ],
        advanced: [
            {
                design: "a real-time collaboration system",
                for: "a design tool",
                toHelp: "distributed teams across different time zones"
            },
            {
                design: "an AI-powered content moderation interface",
                for: "a social media platform",
                toHelp: "moderators handling complex policy violations"
            },
            {
                design: "a financial planning dashboard",
                for: "a fintech application",
                toHelp: "both individual investors and financial advisors"
            },
            {
                design: "a multi-tenant analytics platform",
                for: "an enterprise SaaS tool",
                toHelp: "different business units with varying needs"
            },
            {
                design: "a crisis management communication system",
                for: "an emergency response platform",
                toHelp: "first responders coordinating across multiple agencies"
            },
            {
                design: "a machine learning model monitoring dashboard",
                for: "a data science platform",
                toHelp: "data scientists track model performance and detect drift"
            },
            {
                design: "a personalization engine interface",
                for: "a content streaming service",
                toHelp: "support both algorithmic recommendations and user preferences"
            }
        ]
    }
};

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
    timerDisplay.value = formatTime(timeLeft);
}

function increaseTimer() {
    if (!isTimerRunning && timeLeft === 0) {
        const currentTime = parseTimeInput(timerDisplay.value);
        const newTime = Math.min(currentTime + (5 * 60), 120 * 60); // Add 5 minutes, max 120 minutes
        timerDisplay.value = formatTime(newTime);
    }
}

function decreaseTimer() {
    if (!isTimerRunning && timeLeft === 0) {
        const currentTime = parseTimeInput(timerDisplay.value);
        const newTime = Math.max(currentTime - (5 * 60), 5 * 60); // Remove 5 minutes, min 5 minutes
        timerDisplay.value = formatTime(newTime);
    }
}

function updateButtonStates() {
    const isRunning = isTimerRunning;
    const isPaused = timeLeft > 0 && !isTimerRunning;
    
    increaseTimerBtn.disabled = isRunning || isPaused;
    decreaseTimerBtn.disabled = isRunning || isPaused;
    timerDisplay.disabled = isRunning;
}

function startTimer() {
    if (!currentChallenge) return;
    
    if (!isTimerRunning) {
        if (timeLeft === 0) {
            timeLeft = parseTimeInput(timerDisplay.value);
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
    timerDisplay.value = '20:00';
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

// Initialize timer display and button states
timerDisplay.value = '20:00';
updateButtonStates();
