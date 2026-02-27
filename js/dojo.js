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
            },
            {
                design: "a daily mood tracker interface",
                for: "a mental wellness companion app",
                toHelp: "teenagers express emotions without typing"
            },
            {
                design: "a voice command tutorial screen",
                for: "a smart home control app",
                toHelp: "elderly users discover hands-free features"
            },
            {
                design: "a progress celebration screen",
                for: "a language learning app",
                toHelp: "motivate learners when they reach milestones"
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
            },
            {
                design: "a gift recommendation engine interface",
                for: "a social marketplace app",
                toHelp: "users who struggle with choosing thoughtful presents"
            },
            {
                design: "a skill-based matchmaking system",
                for: "a volunteer coordination platform",
                toHelp: "connect nonprofits with people's actual talents"
            },
            {
                design: "a micro-learning challenge interface",
                for: "a professional development app",
                toHelp: "users learn new skills during their commute"
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
            },
            {
                design: "a dynamic consent management system",
                for: "a healthcare data platform",
                toHelp: "patients control access across multiple providers and research institutions"
            },
            {
                design: "an ethical AI decision-visualization tool",
                for: "an autonomous vehicle control system",
                toHelp: "engineers audit and understand edge-case behaviors"
            },
            {
                design: "a cross-reality collaboration workspace",
                for: "a spatial computing platform",
                toHelp: "users seamlessly switch between VR, AR, and traditional screens"
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
            },
            {
                design: "a customer testimonial showcase",
                for: "a local service business website",
                toHelp: "build trust with potential first-time customers"
            },
            {
                design: "a seasonal promotion campaign",
                for: "a coffee shop's loyalty app",
                toHelp: "drive foot traffic during slow morning hours"
            },
            {
                design: "a user-generated content strategy",
                for: "a pet product brand",
                toHelp: "encourage customers to share photos with their purchases"
            },
            {
                design: "a welcome email series",
                for: "an online course platform",
                toHelp: "engage new sign-ups during their first week"
            },
            {
                design: "a birthday rewards campaign",
                for: "a beauty products subscription box",
                toHelp: "increase customer retention and personal connection"
            },
            {
                design: "a TikTok content strategy",
                for: "a sustainable fashion brand",
                toHelp: "reach Gen Z shoppers through authentic storytelling"
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
            },
            {
                design: "an influencer partnership program",
                for: "a health and wellness startup",
                toHelp: "build credibility with skeptical audiences"
            },
            {
                design: "a re-engagement campaign",
                for: "a gaming app with churned users",
                toHelp: "bring back players who haven't logged in for 30+ days"
            },
            {
                design: "a podcast advertising strategy",
                for: "a luxury travel booking service",
                toHelp: "reach affluent listeners ready to book experiences"
            },
            {
                design: "a community activation plan",
                for: "an open-source developer platform",
                toHelp: "turn casual users into active contributors"
            },
            {
                design: "a location-based marketing campaign",
                for: "a grocery delivery app",
                toHelp: "target users in newly launched neighborhoods"
            },
            {
                design: "a lifecycle marketing framework",
                for: "a fintech credit card",
                toHelp: "nurture customers from application to power user"
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
            },
            {
                design: "a zero-budget viral campaign",
                for: "a climate tech startup",
                toHelp: "achieve 100K impressions through creativity alone"
            },
            {
                design: "a privacy-first attribution system",
                for: "a consumer app in a cookieless world",
                toHelp: "measure campaign effectiveness without invasive tracking"
            },
            {
                design: "a narrative-driven brand evolution",
                for: "a legacy company entering Web3",
                toHelp: "reposition brand for crypto-native audiences while retaining existing customers"
            },
            {
                design: "a hyperlocal expansion playbook",
                for: "a food delivery platform",
                toHelp: "launch in 50 new cities with limited marketing budget"
            },
            {
                design: "a thought leadership engine",
                for: "a B2B AI infrastructure company",
                toHelp: "establish CEO as industry visionary and drive inbound leads"
            },
            {
                design: "a cross-platform gamification strategy",
                for: "a fitness app ecosystem",
                toHelp: "create network effects between hardware, mobile app, and social community"
            },
            {
                design: "a cultural moment hijacking framework",
                for: "a Gen Z-focused brand",
                toHelp: "authentically participate in trending conversations without seeming forced"
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
            },
            {
                design: "a follow-up email sequence",
                for: "a freelance web designer",
                toHelp: "stay top-of-mind with potential clients after initial meeting"
            },
            {
                design: "a pricing conversation script",
                for: "a boutique marketing agency",
                toHelp: "confidently present fees without underselling services"
            },
            {
                design: "a LinkedIn outreach message",
                for: "a B2B sales development rep",
                toHelp: "start conversations with cold prospects"
            },
            {
                design: "a demo booking landing page",
                for: "a project management software",
                toHelp: "convert website visitors into qualified leads"
            },
            {
                design: "a referral request script",
                for: "a real estate agent",
                toHelp: "ask satisfied clients for introductions naturally"
            },
            {
                design: "a voicemail script",
                for: "an insurance sales professional",
                toHelp: "get prospects to return calls"
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
            },
            {
                design: "a negotiation framework",
                for: "a commercial real estate broker",
                toHelp: "navigate complex multi-party deals while protecting margins"
            },
            {
                design: "a champion-building strategy",
                for: "an enterprise sales rep",
                toHelp: "identify and empower internal advocates within prospect organizations"
            },
            {
                design: "a storytelling pitch structure",
                for: "a social impact startup",
                toHelp: "emotionally engage donors while demonstrating measurable impact"
            },
            {
                design: "a proof-of-concept proposal",
                for: "a data analytics consulting firm",
                toHelp: "de-risk large contracts with pilot programs"
            },
            {
                design: "a multi-stakeholder presentation",
                for: "a healthcare technology vendor",
                toHelp: "address diverse concerns of doctors, administrators, and patients"
            },
            {
                design: "a renewal conversation framework",
                for: "a SaaS customer success manager",
                toHelp: "expand accounts while addressing usage gaps"
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
            },
            {
                design: "a boardroom transformation pitch",
                for: "a management consulting firm",
                toHelp: "sell a $2M organizational change initiative to skeptical board members"
            },
            {
                design: "a global expansion sales playbook",
                for: "a SaaS company entering Asia-Pacific markets",
                toHelp: "adapt messaging and tactics for diverse cultural contexts"
            },
            {
                design: "a category creation pitch",
                for: "a startup defining a new market",
                toHelp: "convince prospects they have a problem they didn't know existed"
            },
            {
                design: "a hostile takeover defense presentation",
                for: "a boutique investment bank",
                toHelp: "persuade shareholders to reject acquisition offer"
            },
            {
                design: "a crisis turnkey sales plan",
                for: "a cybersecurity firm",
                toHelp: "sell emergency incident response during active data breach"
            },
            {
                design: "a consortium sale strategy",
                for: "an infrastructure technology vendor",
                toHelp: "coordinate bid across multiple government agencies and contractors"
            },
            {
                design: "a platform ecosystem pitch",
                for: "a B2B marketplace",
                toHelp: "sell vision that requires prospects to change entire business model"
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
            },
            {
                design: "a simple inventory system",
                for: "a small retail store",
                toHelp: "track stock levels and prevent shortages"
            },
            {
                design: "a client onboarding checklist",
                for: "a freelance consulting business",
                toHelp: "ensure smooth project kickoffs every time"
            },
            {
                design: "a team capacity planning spreadsheet",
                for: "a creative agency with 10 people",
                toHelp: "prevent burnout and overcommitment"
            },
            {
                design: "a decision-making framework",
                for: "a product team evaluating feature requests",
                toHelp: "prioritize based on impact and effort"
            },
            {
                design: "a standard operating procedure",
                for: "a restaurant opening routine",
                toHelp: "ensure consistency across multiple shifts"
            },
            {
                design: "a supplier evaluation checklist",
                for: "a small manufacturing business",
                toHelp: "choose reliable vendors for raw materials"
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
            },
            {
                design: "a supply chain optimization strategy",
                for: "a direct-to-consumer brand",
                toHelp: "reduce shipping costs without compromising delivery speed"
            },
            {
                design: "a remote work policy framework",
                for: "a traditionally office-based company",
                toHelp: "maintain culture and productivity while offering flexibility"
            },
            {
                design: "a product launch coordination plan",
                for: "a SaaS company with multiple departments",
                toHelp: "synchronize engineering, marketing, sales, and support efforts"
            },
            {
                design: "a customer health scoring system",
                for: "a B2B subscription service",
                toHelp: "proactively identify churn risks and expansion opportunities"
            },
            {
                design: "a cross-team collaboration model",
                for: "a matrixed organization",
                toHelp: "clarify ownership when people report to multiple managers"
            },
            {
                design: "a post-mortem analysis framework",
                for: "a fintech experiencing service outages",
                toHelp: "learn from incidents without blame culture"
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
            },
            {
                design: "a platform governance framework",
                for: "a marketplace with millions of third-party sellers",
                toHelp: "enforce quality standards without stifling entrepreneurship"
            },
            {
                design: "a zero-based budgeting initiative",
                for: "a public company under activist investor pressure",
                toHelp: "cut costs strategically while investing in growth areas"
            },
            {
                design: "a distributed workforce operating model",
                for: "a global enterprise with 10,000+ employees",
                toHelp: "standardize processes across 30 countries with different labor laws"
            },
            {
                design: "a sustainability transformation program",
                for: "a manufacturing conglomerate",
                toHelp: "achieve carbon neutrality without disrupting production"
            },
            {
                design: "a competitive response strategy",
                for: "an incumbent threatened by disruptive startup",
                toHelp: "leverage existing strengths while building new capabilities"
            },
            {
                design: "a regulatory compliance framework",
                for: "a fintech expanding into banking services",
                toHelp: "navigate complex regulations across multiple jurisdictions"
            },
            {
                design: "a moonshot project incubation model",
                for: "a tech giant exploring emerging technologies",
                toHelp: "balance innovation freedom with accountability to core business"
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
            },
            {
                design: "a monthly expense tracker",
                for: "a freelancer managing business finances",
                toHelp: "categorize spending and identify cost-saving opportunities"
            },
            {
                design: "a social media engagement report",
                for: "a local restaurant's Instagram",
                toHelp: "identify which posts drive the most customer interest"
            },
            {
                design: "a simple conversion funnel",
                for: "a lead magnet landing page",
                toHelp: "see where potential customers drop off"
            },
            {
                design: "a customer satisfaction scorecard",
                for: "a service business collecting survey responses",
                toHelp: "spot trends in customer happiness over time"
            },
            {
                design: "a team productivity dashboard",
                for: "a project manager tracking task completion",
                toHelp: "visualize team velocity and identify blockers"
            },
            {
                design: "an email campaign performance report",
                for: "a newsletter with growing subscribers",
                toHelp: "understand open rates and click patterns"
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
            },
            {
                design: "a revenue forecasting model",
                for: "a growing SaaS business",
                toHelp: "predict monthly recurring revenue based on historical trends"
            },
            {
                design: "a customer lifetime value calculator",
                for: "a subscription box service",
                toHelp: "determine how much to spend on customer acquisition"
            },
            {
                design: "a product usage heat map",
                for: "a mobile app development team",
                toHelp: "visualize which features users engage with most"
            },
            {
                design: "a seasonality analysis dashboard",
                for: "an e-commerce fashion retailer",
                toHelp: "prepare inventory based on predictable demand patterns"
            },
            {
                design: "a multi-touch attribution report",
                for: "a digital marketing team",
                toHelp: "understand which channels contribute to conversions"
            },
            {
                design: "a user journey mapping analysis",
                for: "a fintech onboarding flow",
                toHelp: "identify friction points in the sign-up process"
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
            },
            {
                design: "a causal inference framework",
                for: "a product team testing new features",
                toHelp: "distinguish correlation from causation in user behavior changes"
            },
            {
                design: "a dynamic pricing algorithm",
                for: "a ride-sharing platform",
                toHelp: "optimize supply-demand matching across cities in real-time"
            },
            {
                design: "a fraud detection system",
                for: "a payment processing company",
                toHelp: "identify suspicious transactions without blocking legitimate users"
            },
            {
                design: "a recommendation engine performance audit",
                for: "a streaming entertainment platform",
                toHelp: "measure and improve algorithmic content discovery"
            },
            {
                design: "a multi-dimensional cohort analysis",
                for: "a marketplace with buyers and sellers",
                toHelp: "understand network effects and cross-side dynamics"
            },
            {
                design: "a real-time personalization engine",
                for: "a news media platform",
                toHelp: "serve individualized content while maintaining editorial standards"
            },
            {
                design: "a data quality governance framework",
                for: "an enterprise with siloed data systems",
                toHelp: "ensure consistency and accuracy across hundreds of data sources"
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
