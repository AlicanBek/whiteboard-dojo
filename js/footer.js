// Centralized footer for Whiteboard Dojo
// Add this script to any page with: <div id="footer-container"></div>

function createFooter() {
    const container = document.getElementById('footer-container');
    if (!container) return;

    // Determine the relative path based on current location
    const path = window.location.pathname;
    let basePath = '';

    // Check if we're in pages/docs/ subdirectory
    if (path.includes('/pages/docs/')) {
        basePath = '../../';
    }
    // Check if we're in pages/ subdirectory
    else if (path.includes('/pages/')) {
        basePath = '../';
    }
    // Otherwise we're in the root
    else {
        basePath = '';
    }

    const footerHTML = `
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-about">
                <div class="footer-title">
                    <img src="${basePath}images/logo.svg" alt="Whiteboard Dojo Logo" class="footer-logo-image">
                    Whiteboard Dojo
                </div>
                <p class="footer-description">
                    Practice with purpose. Sharpen your skills with real whiteboard challenges.
                </p>
            </div>

            <div class="footer-section">
                <h3 class="footer-section-title">Quick Links</h3>
                <ul class="footer-links">
                    <li><a href="${basePath}index.html" class="footer-link">Home</a></li>
                    <li><a href="${basePath}pages/dojo.html" class="footer-link">The Dojo</a></li>
                    <li><a href="${basePath}pages/docs.html" class="footer-link">Documentation</a></li>
                </ul>
            </div>

            <div class="footer-section">
                <h3 class="footer-section-title">Connect</h3>
                <ul class="footer-links">
                    <li><a href="https://github.com/yourusername/whiteboard-dojo" class="footer-link" target="_blank">GitHub</a></li>
                </ul>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; 2026 Whiteboard Dojo. Built with love for the craft of building ❤️</p>
        </div>
    </footer>
    `;

    container.innerHTML = footerHTML;
}

// Run when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createFooter);
} else {
    createFooter();
}
