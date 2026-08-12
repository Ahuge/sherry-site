# AGENTS.md — No Patient Left Behind

Guidance for agents working in this repo. Read this before editing.

## What this is

Static website for the **No Patient Left Behind** fund (The Grant Innes Health Endowment Fund). Plain HTML5/CSS3/JS. No framework, no build step, no dependencies, no backend. Deploy by copying files to any static host (GitHub Pages / Netlify / Vercel configs exist but need no build command).

## Project shape

- 9 HTML pages at repo root: `index.html` (home/launchpad), `accountability.html`, `resources.html`, `strategies.html`, `awards.html`, `board.html`, `why-nplb.html`, `mission.html`, `patient.html`
- `styles.css` — the only stylesheet. Everything lives here.
- `script.js` — the only script. Hamburger toggle, active-nav-link highlighting, smooth scroll.
- `media/` — images. Filenames contain spaces; in HTML `src` they are URL-encoded (`%20`). Note: `Emma  Helman.png` has TWO spaces → `Emma%20%20Helman.png`.
- Source-of-truth content: `No Patient Web Page Mock-up.pptx.txt` (text extract of the client's mock-up).
- `docs/ui-upgrade-plan.md` — the active improvement plan. Follow it task by task.

## Non-negotiable content rules

1. **The mock-up document is the source of truth.** Sections in it that have body text must appear verbatim or near-verbatim. Sections that are only titles become labeled stubs.
2. **The long verbatim passages** (board orientation narrative, terms of reference) live on `why-nplb.html` and `mission.html`. Do not rewrite or shorten them for style.
3. **Authored copy** (intros, card descriptions) follows these rules: no em dashes in body text or titles/meta, no rule-of-three flourishes, no filler intensifiers, professional government/foundation register. Written for clarity, not marketing voice.
4. **No emojis anywhere on the site.** Icons are inline SVGs (24×24 viewBox, `stroke="currentColor"`, stroke-width 2, round caps/joins). Match existing SVG style; reuse SVG paths already in the repo where possible.
5. **Color semantics:** `.blue` = knowledge/framework/reference, `.warm` = process/flow/operations, `.gold` = funding/award. Apply consistently (see plan task 2.2).

## CSS architecture conventions

- Design tokens in `:root`: colors (`--primary`, `--primary-light`, `--accent`, `--warm`, `--bg`, `--bg-card`, `--text`, `--text-muted`, `--border`), radii, shadows, `--max-width`, `--font`.
- Component classes are single-purpose: `.card` + `.card-grid`, `.leader-card` + `.leadership-grid`, `.action-card` + `.action-grid`, `.download-item` + `.download-list`, `.typeset` for long-form text, `.page-hero` for inner-page banners, `.support-section` for the donate block.
- Variants via suffix classes: `.blue/.warm/.gold` on `.card-icon`; `.blue/.warm/.gold/.link` on `.download-icon`.
- Responsive breakpoints: 768px and 480px only. Grids collapse to `1fr` at 768px.
- When adding a component, add its mobile collapse rule in the same edit.

## JS conventions

- Vanilla, no libraries. `script.js` is shared by all pages; guard with existence checks (`if (el)`), since not every page has every element.
- The nav toggle pattern: `#navToggle` button + `#navList` list; toggling adds/removes `.open`.

## Working practices in this repo

- **Commit after every completed task.** Imperative messages in the repo's style (see `git log`). Never bundle unrelated changes.
- **Verify visually before committing.** Serve with `npx serve . -l 4173` and screenshot with headless Chrome (see the plan's verification section). Broken images and horizontal overflow are the two most common regressions here — check both.
- **The `rtk` CLI wrapper** is used for file ops (`rtk ls`, `rtk grep`, `rtk cat`). It is noisy with piped commands; for anything involving pipes or complex output, plain `bash` without `rtk` may be more reliable.
- **Pitfall learned the hard way: never use `rtk sed -i` on HTML** containing `&copy;` or other entities — entity characters in replacement strings produce corrupted output. Use the Edit tool for text replacement instead.
- **Headshot wiring:** add the file to `media/`, then update the person's `.leader-avatar` on `board.html`. People currently using initials placeholders: Dr. Lorraine Kane (`LK`) — only person left without a photo.
- **Image weight matters:** the README targets < 2 MB per page. Compress before adding; never commit a multi-MB image without resizing.

## Environment notes

- OS: Linux (working dir is a WSL mount at `/mnt/d/Work/sherry-site`).
- `npx serve .` works but prints no URL on success; curl `http://localhost:4173/PAGE.html` to check. It returns 301 → resolves fine.
- Headless Chrome for screenshots: `/home/alex/.cache/puppeteer/chrome/linux-147.0.7727.57/chrome-linux64/chrome` with `--headless --no-sandbox --screenshot=... --window-size=1440,900`.
- Python `docx` module is installed for reading client .docx files from `/mnt/c/Users/ahugh/Downloads/LegacyFoundation/` if new source content arrives.

## What "done" looks like right now

The active work is `docs/ui-upgrade-plan.md`. Execute phases in order (1 → 2 → 3; 4 is optional/confirm-first). Each phase should land as its own commit or small commit series. The definition-of-done checklist is at the bottom of that file.
