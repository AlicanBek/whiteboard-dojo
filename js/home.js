// Home page "Start with a challenge" card: a random beginner or intermediate challenge
// that opens straight on the whiteboard with the brief and a 20 minute timer.
(function () {
    const TIMER_SECONDS = 20 * 60;
    const pool = [];
    Object.values(challenges).forEach((byDifficulty) => {
        ['beginner', 'intermediate'].forEach((level) => pool.push(...(byDifficulty[level] || [])));
    });

    const designEl = document.getElementById('home-challenge-design');
    const forEl = document.getElementById('home-challenge-for');
    const toHelpEl = document.getElementById('home-challenge-tohelp');
    const startLink = document.getElementById('home-challenge-start');
    const shuffleBtn = document.getElementById('home-challenge-shuffle');
    let current = null;

    function show(challenge) {
        current = challenge;
        designEl.textContent = challenge.design;
        forEl.textContent = challenge.for;
        toHelpEl.textContent = challenge.toHelp;
        const params = new URLSearchParams({
            design: challenge.design,
            for: challenge.for,
            toHelp: challenge.toHelp,
            timer: String(TIMER_SECONDS)
        });
        startLink.href = `whiteboard/?challenge=${encodeURIComponent(params.toString())}`;
    }

    function shuffle() {
        let next;
        do {
            next = pool[Math.floor(Math.random() * pool.length)];
        } while (pool.length > 1 && next === current);
        show(next);
    }

    shuffleBtn.addEventListener('click', shuffle);
    shuffle();
})();
