// Sample challenges data with categories and new structure
const challenges = {
    "product-ux-design": {
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
    },
    "marketing-growth": {
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
                design: "a referral program interface",
                for: "a mobile app startup",
                toHelp: "incentivize users to invite friends"
            },
            {
                design: "a content calendar",
                for: "a lifestyle blogger",
                toHelp: "plan and schedule consistent posts across platforms"
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
                design: "a viral loop strategy",
                for: "a social networking app",
                toHelp: "achieve exponential user growth through network effects"
            },
            {
                design: "a content distribution strategy",
                for: "a B2B software company",
                toHelp: "maximize reach across owned, earned, and paid channels"
            }
        ],
        advanced: [
            {
                design: "a comprehensive marketing automation flow",
                for: "an e-commerce platform",
                toHelp: "reduce cart abandonment and increase customer lifetime value"
            },
            {
                design: "a growth experiment framework",
                for: "a fintech startup",
                toHelp: "systematically test and optimize acquisition channels"
            },
            {
                design: "a community-driven growth strategy",
                for: "a developer tools platform",
                toHelp: "build organic adoption through influencers and advocates"
            }
        ]
    },
    "sales-pitching": {
        beginner: [
            {
                design: "a 60-second elevator pitch",
                for: "a mobile app for busy parents",
                toHelp: "clearly communicate value to potential investors"
            },
            {
                design: "a product demo script",
                for: "a productivity software tool",
                toHelp: "showcase key features to prospective customers"
            },
            {
                design: "a cold email template",
                for: "a B2B SaaS sales team",
                toHelp: "book discovery calls with enterprise prospects"
            },
            {
                design: "a discovery call framework",
                for: "a consulting services firm",
                toHelp: "uncover client pain points and qualify opportunities"
            }
        ],
        intermediate: [
            {
                design: "a sales presentation deck",
                for: "an enterprise software solution",
                toHelp: "convince C-level executives to adopt the platform"
            },
            {
                design: "an objection handling framework",
                for: "a high-ticket coaching program",
                toHelp: "address common concerns and move prospects to close"
            },
            {
                design: "a competitive battle card",
                for: "a SaaS sales team facing strong competition",
                toHelp: "position unique value and counter competitor claims"
            },
            {
                design: "a value-based pricing pitch",
                for: "a custom software development agency",
                toHelp: "justify premium pricing through ROI calculations"
            }
        ],
        advanced: [
            {
                design: "a strategic account plan",
                for: "an enterprise software vendor targeting Fortune 500",
                toHelp: "orchestrate complex multi-stakeholder sales cycles"
            },
            {
                design: "an investor pitch deck",
                for: "a seed-stage startup raising Series A",
                toHelp: "secure $5M funding with compelling growth narrative"
            },
            {
                design: "a partnership proposal",
                for: "a marketplace platform seeking channel partners",
                toHelp: "structure mutually beneficial co-selling agreements"
            }
        ]
    },
    "strategy-operations": {
        beginner: [
            {
                design: "a project timeline",
                for: "a website redesign project",
                toHelp: "coordinate designers, developers, and stakeholders"
            },
            {
                design: "a process documentation",
                for: "a customer support team",
                toHelp: "standardize ticket handling and reduce response times"
            },
            {
                design: "a resource allocation plan",
                for: "a small marketing agency",
                toHelp: "balance team workload across client projects"
            },
            {
                design: "a meeting agenda framework",
                for: "a remote-first startup",
                toHelp: "run efficient, productive team sync meetings"
            }
        ],
        intermediate: [
            {
                design: "a quarterly OKR framework",
                for: "a fast-growing tech startup",
                toHelp: "align cross-functional teams around strategic priorities"
            },
            {
                design: "a vendor evaluation matrix",
                for: "an operations team selecting a CRM system",
                toHelp: "systematically compare solutions and make data-driven decisions"
            },
            {
                design: "a scaling operations playbook",
                for: "a marketplace expanding to new markets",
                toHelp: "replicate success while adapting to local contexts"
            },
            {
                design: "a crisis response plan",
                for: "an e-commerce company during peak season",
                toHelp: "handle operational failures and maintain customer satisfaction"
            }
        ],
        advanced: [
            {
                design: "a business model transformation strategy",
                for: "a traditional media company pivoting to digital",
                toHelp: "navigate organizational change while maintaining revenue"
            },
            {
                design: "a merger integration plan",
                for: "two SaaS companies combining operations",
                toHelp: "unify processes, systems, and cultures efficiently"
            },
            {
                design: "a multi-year strategic roadmap",
                for: "a scaling startup planning IPO",
                toHelp: "balance growth, profitability, and operational excellence"
            }
        ]
    },
    "data-analytics": {
        beginner: [
            {
                design: "a basic metrics dashboard",
                for: "a content creator tracking audience growth",
                toHelp: "visualize key performance indicators across platforms"
            },
            {
                design: "a sales report template",
                for: "a small retail business",
                toHelp: "track daily revenue and identify top-selling products"
            },
            {
                design: "a customer feedback analysis",
                for: "a mobile app with user reviews",
                toHelp: "categorize feedback themes and prioritize improvements"
            },
            {
                design: "a website traffic report",
                for: "a blog or portfolio site",
                toHelp: "understand visitor behavior and popular content"
            }
        ],
        intermediate: [
            {
                design: "a cohort retention analysis",
                for: "a subscription-based mobile app",
                toHelp: "identify when and why users churn"
            },
            {
                design: "an A/B test framework",
                for: "an e-commerce product page",
                toHelp: "determine which design variation drives more conversions"
            },
            {
                design: "a customer segmentation model",
                for: "a SaaS platform with diverse user base",
                toHelp: "personalize marketing and product experiences"
            },
            {
                design: "a funnel conversion analysis",
                for: "a lead generation website",
                toHelp: "identify drop-off points and optimization opportunities"
            }
        ],
        advanced: [
            {
                design: "a predictive churn model",
                for: "a subscription service",
                toHelp: "proactively identify at-risk customers for retention campaigns"
            },
            {
                design: "an attribution modeling system",
                for: "a multi-channel marketing operation",
                toHelp: "understand true impact of each touchpoint on conversions"
            },
            {
                design: "a real-time anomaly detection dashboard",
                for: "a high-traffic e-commerce platform",
                toHelp: "immediately identify and respond to unusual patterns or issues"
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
