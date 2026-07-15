# No Patient Left Behind - Legacy Static Website

## Project Overview

The objective of this project is to build a professional, authoritative, and compassionate digital home for **No Patient Left Behind (NPLB)**. The website serves as the primary vessel for Grant Innes's legacy, aiming to institutionalize healthcare accountability frameworks, improve resource sharing, and scale improvement strategies.

By utilizing a static site architecture, this website will be incredibly fast, virtually maintenance-free, highly secure, and extremely cost-effective (often 100% free to host) over the long term.

## Architecture Strategy

* **Core Tech Stack:** Single-effort, one-time build using lightweight, modern HTML/CSS/JS
* **Zero-Maintenance Hosting:** Deployed on globally distributed networks like **GitHub Pages**, **Netlify**, or **Vercel**
* **Security Profile:** Since there are no databases, user accounts, or active server-side scripts processing personal data, the site is virtually un-hackable

## Features

### Streamlined Static Feature Mapping

To eliminate backend complexity while preserving core functionality, all interactive features are mapped to direct external options:

| Feature Requirement | Simplified Static Solution |
| :--- | :--- |
| **Donations & Financial Support** | High-visibility call-to-action (CTA) buttons and a printable QR code routing users directly to an external foundation payment portal |
| **Award & Grant Submissions** | Direct `mailto:` link that triggers the applicant's default email client with a pre-populated subject line |
| **Resource & Video Libraries** | Standard embedded third-party players (YouTube, Spotify) to play media directly on the page |

## Information Architecture

The website is organized into a clean, flat, highly readable layout:

1. **Home Page**
2. **Accountability Frameworks & Strategies**
3. **Improvement Resources & Strategies**
4. **Awards & Applications**

## Technical Specifications

- **Responsive Typography:** Clean, high-contrast, clinical yet warm typography (sans-serif web-safe fonts like Arial or Inter)
- **Fast Performance:** Media assets embedded through lightweight iframe players, keeping page weight under 2MB
- **One-Time Handover:** Domain DNS records pointed directly to static host at launch

## Deployment

Deploy to **GitHub Pages**, **Netlify**, or **Vercel** for free, automated lifetime SSL, and global distribution.
