# No Patient Left Behind — Legacy Static Website

A professional, authoritative, and compassionate digital home for **No Patient Left Behind (NPLB)** — a Grant Innes legacy initiative institutionalising healthcare accountability frameworks, improving resource sharing, and scaling improvement strategies.

## Architecture

| Property | Detail |
|----------|--------|
| **Stack** | Vanilla HTML5 / CSS3 / JS — zero dependencies |
| **Hosting** | GitHub Pages · Netlify · Vercel (free, static) |
| **Security** | No databases, no user accounts, no server-side scripts |
| **Performance** | Target &lt; 2 MB per page; embedded media via lightweight iframes |

## Site Structure

```
├── Home                          Mission, Vision, ToR, Tribute, Leadership, Donate
├── Accountability Frameworks     Implementation Manual (4-phase guide), Strategic Overcapacity Protocols
├── Improvement Resources         Operational Focus Areas, Curated Catalog (links, PDFs, video/audio)
└── Awards & Applications         Funding Priorities, Application Download, Email Submission
```

## Deploy

```bash
# Local preview
npx serve .

# Deploy — push repo, then:
#   GitHub Pages: enable Pages from / (root)
#   Netlify:      connect repo → publish = "."
#   Vercel:       import project → no build command
```

No build step, no environment variables, no configuration required.

## Design

- **Typography:** Inter — clean, high-contrast, clinical yet warm
- **Layout:** Responsive, mobile-first, sticky navigation
- **Colour:** Deep navy + warm accent, white cards, generous whitespace
- **Feature mapping:** Donation QR code, `mailto:` award submissions, embedded YouTube/SoundCloud

---

_© 2024 No Patient Left Behind. Built with care — static, secure, zero-maintenance._
