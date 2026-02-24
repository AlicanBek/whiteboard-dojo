# Whiteboard Dojo - Website Structure

This document explains the website structure for Whiteboard Dojo after reorganizing it into a proper multi-page website.

## Project Structure

```
whiteboard-dojo/
├── index.html                          # Landing/home page
├── css/
│   └── styles.css                      # All shared CSS styles
├── js/
│   ├── dojo.js                         # Challenge data (150 challenges)
│   └── script.js                       # Challenge generator and timer logic (mirrors dojo.js)
├── images/
│   └── logo.svg                        # Whiteboard Dojo logo
├── pages/
│   ├── dojo.html                       # The Dojo (challenge practice page)
│   ├── docs.html                       # Documentation hub/index
│   └── docs/
│       ├── TEMPLATE.html               # Template for creating new doc pages
│       ├── what-is-whiteboard-challenge.html
│       ├── why-we-love-whiteboard-challenges.html
│       ├── whiteboard-challenge-fundamentals.html
│       ├── running-solo-practice-sessions.html
│       ├── preparing-for-your-challenge.html
│       ├── job-interview-whiteboard-challenges.html
│       ├── self-assessment-after-challenges.html
│       ├── building-whiteboard-skills.html
│       ├── running-team-practice-sessions.html
│       ├── preparing-team-for-challenges.html
│       ├── role-playing-during-challenge.html
│       ├── team-assessment-after-challenge.html
│       ├── why-whiteboard-challenges-in-hiring.html
│       ├── designing-effective-hiring-challenges.html
│       ├── running-interview-challenge.html
│       ├── evaluating-performance-making-decisions.html
│       └── make-whiteboard-dojo-better-together.html
├── CHALLENGES.md                       # Challenge reference document (150 challenges)
├── STRUCTURE.md                        # This file - project structure documentation
└── DOCUMENTATION_COMPLETE.md           # Documentation generation notes
```

## Pages Overview

### 1. **Landing Page** (`index.html`)
- Entry point for the website
- Hero section with call-to-action buttons
- Feature cards showcasing the value proposition
- Navigation to Dojo and Docs

### 2. **The Dojo** (`pages/dojo.html`)
- Interactive challenge generator
- Category and difficulty selectors (5 categories: Product & UX Design, Marketing & Growth, Sales & Pitching, Strategy & Operations, Data & Analytics)
- Challenge display with design, context, and user information
- Built-in timer with controls
- Uses `script.js` (which mirrors `js/dojo.js`) for all functionality

### 3. **Documentation Hub** (`pages/docs.html`)
- Overview of all available documentation
- Organized into 5 main sections:
  1. The Whiteboard Challenge (fundamentals)
  2. For Individual Practice & Interview Prep
  3. For Team Development
  4. For Hiring & Assessment
  5. How to Contribute

### 4. **Individual Doc Pages** (`pages/docs/*.html`)
- Each documentation article gets its own page
- Includes navigation buttons for previous/next articles
- Consistent styling and structure
- Breadcrumb navigation through the header

## Key Features

### Navigation
- Sticky header with navigation links on every page
- Logo links back to home page
- Active state indicators on current page

### Styling
- Single CSS file (`css/styles.css`) for consistent styling across all pages
- Responsive design with mobile-first approach
- Color-coded with CSS variables for easy theming

### Challenge Data
- Challenges data stored in both `js/dojo.js` and `script.js` (synchronized)
- **150 total challenges** across 5 categories and 3 difficulty levels:
  - Product & UX Design: 30 challenges (10 beginner, 10 intermediate, 10 advanced)
  - Marketing & Growth: 30 challenges (10 beginner, 10 intermediate, 10 advanced)
  - Sales & Pitching: 30 challenges (10 beginner, 10 intermediate, 10 advanced)
  - Strategy & Operations: 30 challenges (10 beginner, 10 intermediate, 10 advanced)
  - Data & Analytics: 30 challenges (10 beginner, 10 intermediate, 10 advanced)
- Matches the `CHALLENGES.md` reference document

### Documentation
- HTML-based documentation pages for better discoverability
- Each article has metadata and structured content
- Navigation links between related articles

## File Organization Best Practices

### CSS
- All styles in `css/styles.css`
- Organized by component (header, buttons, forms, etc.)
- Responsive breakpoints at the bottom

### JavaScript
- `js/dojo.js` contains challenge data (150 challenges)
- `script.js` contains challenge generator, timer logic, and mirrors dojo.js
- Challenges data structure matches the documentation

### Pages
- Root-level pages (`index.html`) for main sections
- `/pages/` directory for sub-pages
- `/pages/docs/` directory for documentation articles

## Adding New Pages

### To Add a New Documentation Article:

1. Copy `pages/docs/TEMPLATE.html` to a new file with a descriptive name (e.g., `pages/docs/new-article.html`)
2. Replace `[TITLE]`, `[ARTICLE TITLE]`, etc. with your content
3. Update the links to previous and next articles
4. Add a link to this new page in `pages/docs.html`

### To Add a New Challenge:

1. Open both `js/dojo.js` and `script.js` and locate the `challenges` object
2. Add your challenge to the appropriate category and difficulty level in both files
3. Update `CHALLENGES.md` with the new challenge
4. Test by running the Dojo and generating the challenge

## URL Structure

- `index.html` → Home page
- `pages/dojo.html` → Challenge practice
- `pages/docs.html` → Documentation hub
- `pages/docs/[article-name].html` → Individual articles

All relative paths are set up to work with this structure.

## Next Steps

1. Keep challenges updated with modern, relevant scenarios
2. Test all links and navigation across pages
3. Consider adding more categories or difficulty levels as needed
4. Set up web hosting or deployment
5. Create a CONTRIBUTING.md for contributors
