# UI Upgrade Plan — No Patient Left Behind

Status: proposed, not yet implemented.
Audience: implementation agent. Every task lists exact files, exact edits, and how to verify.

Repository root: `/mnt/d/Work/sherry-site`
Pages: `index.html`, `accountability.html`, `resources.html`, `strategies.html`, `awards.html`, `board.html`, `why-nplb.html`, `mission.html`, `patient.html`
Shared assets: `styles.css` (one stylesheet for everything), `script.js` (nav toggle, active-link highlight, smooth scroll), `media/` (images).

## How to verify your work

Local server:

```bash
cd /mnt/d/Work/sherry-site
npx serve . -l 4173
```

Headless visual check (puppeteer is installed in `/tmp/node_modules`; Chrome lives at `/home/alex/.cache/puppeteer/chrome/linux-147.0.7727.57/chrome-linux64/chrome`):

```bash
cd /tmp && node chk.cjs   # checks broken images + horizontal overflow on all pages
```

If `/tmp/chk.cjs` no longer exists, recreate a script that loads each page at 1440px and 390px and asserts: no image with `naturalWidth === 0`, and `document.documentElement.scrollWidth === document.documentElement.clientWidth`.

Commit after each completed task. Use imperative commit messages matching repo style (see `git log`).

---

## Phase 1 — Critical fixes (bugs + accessibility baseline)

### 1.1 Fix mobile horizontal overflow

Symptom: at 390px viewport the page measures 432px wide. Cause: header row = logo (242px) + `.nav-donate-btn` (116px) + `.nav-toggle` (42px) + container padding (48px) > 390px.

Files: `styles.css`

Changes:
1. In the `@media (max-width: 480px)` block, add:
   ```css
   .logo-sub { display: none; }
   .nav-donate-btn { padding: 6px 12px; font-size: 0.8rem; }
   .logo-text { font-size: 0.95rem; white-space: normal; }
   ```
2. Add `min-width: 0; flex-shrink: 1;` to `.logo a` so the logo column can shrink instead of forcing overflow.

Verify: load `index.html` at 390px, assert `scrollWidth === clientWidth`, hamburger toggle visible, donate button not clipped.

### 1.2 Compress and resize oversized images

Symptom: `media/Dr. Grant Innes.png` is 2.3 MB; `media/st-pauls-hospital.png` is 1.0 MB; `media/Emma  Helman.png` is 746 KB. Board page ships ~4.5 MB total.

Files: everything in `media/` referenced by `<img>` tags.

Changes:
- Resize all headshots to max 480px on the longest edge, export as quality-80 JPEG (or optimized PNG).
- `st-pauls-hospital.png` and `grant-newspaper.png` (figure images): max 1200px wide, JPEG q80.
- Keep filenames identical so no HTML changes are needed. Exception: if you change a file extension (`.png` → `.jpg`), grep for the old name in `*.html` and update every reference.
- Tooling: `convert`/`magick` if installed, else `python3 -m PIL` (Pillow), else `npx sharp-cli`.

Verify: `rtk ls media/` shows each headshot <150 KB; page weight of `board.html` (sum of its images) < 1.5 MB; no 404s.

### 1.3 Lazy-load non-hero images

Files: all `*.html` containing `<img>`.

Changes: add `loading="lazy"` to every `<img>` EXCEPT the nav/hero-critical ones. On this site, every image is below the fold, so apply it to all of them: `.leader-avatar img` (board.html), `.figure-card img` and `.qr-area img` (index.html).

Verify: grep — `rtk grep -n '<img' *.html` — every result contains `loading="lazy"`.

### 1.4 Accessibility baseline

Files: `styles.css`, `script.js`, all `*.html`.

Changes:
1. Focus outlines — append to `styles.css`:
   ```css
   :focus-visible {
     outline: 2px solid var(--primary-light);
     outline-offset: 2px;
     border-radius: 2px;
   }
   ```
2. Skip link — add as the first element inside `<body>` on every page:
   ```html
   <a href="#main" class="skip-link">Skip to content</a>
   ```
   Add `id="main"` to each page's `<main>` element. Add CSS:
   ```css
   .skip-link {
     position: absolute; left: -9999px; top: 0;
     background: var(--primary); color: #fff;
     padding: 10px 16px; z-index: 200; border-radius: 0 0 8px 0;
   }
   .skip-link:focus { left: 0; }
   ```
3. Escape closes nav — in `script.js`, inside the `if (toggle && navList)` block, add:
   ```js
   document.addEventListener('keydown', function (e) {
     if (e.key === 'Escape' && navList.classList.contains('open')) {
       navList.classList.remove('open');
       toggle.setAttribute('aria-expanded', 'false');
       toggle.focus();
     }
   });
   ```
   Also add `aria-controls="navList"` to the `<button class="nav-toggle">` element on every page, and `aria-expanded="false"` initially.
4. Reduced motion — append to `styles.css`:
   ```css
   @media (prefers-reduced-motion: reduce) {
     html { scroll-behavior: auto; }
     *, *::before, *::after { transition: none !important; animation: none !important; }
   }
   ```

Verify: Tab through index.html — a visible outline appears on the skip link, then nav toggle, then donate button. Press Escape with the nav open — it closes. No console errors.

### 1.5 Fix the dead email signup

Symptom: `index.html` email form button is `type="button"` with no handler — clicking does nothing.

File: `index.html` (donate section, around line 207).

Decision needed before implementing: there is no backend. Replace the `<input>`+`<button>` with a plain mailto CTA:
```html
<p style="margin-top:24px;font-size:0.9rem;color:rgba(255,255,255,0.8)">
  Want updates on grant announcements and system improvement resources?
  <a href="mailto:contact@nopatientleftbehind.org?subject=Subscribe%20me" style="color:var(--warm);font-weight:600">Email us to subscribe</a>.
</p>
```
Remove the `.email-signup` markup. Keep the `.email-signup` CSS (harmless) or delete it — deleting is cleaner.

Verify: no `<input>` remains in the donate section; the mailto link opens a mail client.

### 1.6 Footer "Site" column is missing new pages

Files: every `*.html` footer.

Change: in each footer's Site `<ul>`, after "Awards &amp; Applications", add:
```html
<li><a href="board.html">Our Board</a></li>
<li><a href="why-nplb.html">Why NPLB</a></li>
<li><a href="mission.html">Our Mission</a></li>
```
Do NOT add `patient.html` — it is a placeholder.

Verify: grep each page for `board.html` — must appear in nav-adjacent footer list, not just body.

---

## Phase 2 — Design system hardening

### 2.1 Spacing scale

File: `styles.css`.

Add to `:root`:
```css
--space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
--space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 64px;
```
Then normalize: `.section { padding: var(--space-8) 0; }` (keep 64px), `.section-header { margin-bottom: var(--space-7); }`, card padding `var(--space-6)`, grid gaps `var(--space-5)`. Do a pass over styles.css replacing raw padding/margin values with tokens where the value matches the scale (4/8/12/16/24/32/48/64). Do NOT touch values that don't map (e.g., 36px button padding, 28px, 56px) — leave those; partial consistency is fine.

Verify: site renders identically at 1440px (screenshot-diff by eye is acceptable).

### 2.2 Semantic icon colors

File: `styles.css`, plus `accountability.html`, `resources.html`, `strategies.html`, `awards.html`.

Meaning going forward:
- `.card-icon.blue` = knowledge/framework/reference (default)
- `.card-icon.warm` = process/flow/operations
- `.card-icon.gold` = funding/award/money

Required re-coloring (edit the class on these elements):
- `resources.html` Level cards (lines ~94–112): Levels 1–4 currently blue/warm/gold/blue. Set ALL four to `warm` (they are process escalation levels). The numeric "1/2/3/4" markers are inside `.card-icon` divs — keep the text, just change the class.
- `accountability.html` line 101: System Frameworks card is `warm` — it is a framework, set to `blue`. Line 95 Facility Frameworks stays `blue`.
- `strategies.html` Key Accountability Strategies (lines 150–180): set all six to `blue` (they are strategy knowledge cards). ED recommendation cards (75–93): all four to `warm` (they are flow processes).
- `awards.html`: Funding evaluation cards (110/116/122): `Alignment with Mission` → `blue`, `Quality & Rigour` → `blue`, `Potential Impact` → `gold` (impact = outcome value). Project cards (169/175): keep as-is (`blue` list, `gold` funded).

Verify: `rtk grep -n "card-icon" *.html` — colors match the mapping above; screenshots show uniform color per section.

### 2.3 Unify "coming soon" placeholders

Files: `strategies.html`, `accountability.html`, `resources.html`, `awards.html`.

Current state: each placeholder is an `<em>` line, some inside a full-width `.typeset-block` box, some inline in cards. This produces three near-empty full sections on strategies.html.

Changes:
1. Add a chip style to `styles.css`:
   ```css
   .coming-soon {
     display: inline-block;
     font-size: 0.75rem;
     font-style: normal;
     font-weight: 600;
     color: var(--primary-light);
     background: rgba(26,107,179,0.08);
     border: 1px solid rgba(26,107,179,0.2);
     border-radius: 100px;
     padding: 4px 12px;
     margin-top: 12px;
   }
   ```
2. In cards: replace `<p><em style="font-size:0.85rem">X coming soon.</em></p>` with `<span class="coming-soon">Coming soon</span>`.
3. In full sections (strategies.html Teaching/Stories/References, currently `.typeset-block` containing one em line): replace the whole block with `<p style="text-align:center"><span class="coming-soon">Coming soon</span></p>` directly under the `.section-header`. This removes the giant empty boxes.
4. Same for `accountability.html` line ~81 and ~163 typeset-blocks, and `resources.html` line ~119 typeset-block: collapse to the centered chip.

Verify: strategies.html full-page screenshot no longer shows large empty bordered boxes; chip appears inline/centered.

### 2.4 Equal-height board cards with left-aligned bios

File: `board.html`, `styles.css`.

Current: `.leader-card` is `text-align: center`; bios vary wildly in length (Dr. Innes's is longest).

Changes to `styles.css`:
```css
.leader-card { text-align: left; display: flex; flex-direction: column; }
.leader-avatar { margin: 0 0 16px 0; }   /* drop auto-centering */
.leader-card p { flex: 1; }              /* pushes cards to equal height */
```
Add `.leadership-grid { align-items: stretch; }` (default for grid, but make it explicit).

Optional, only if asked: collapsible long bios with `<details>`. Default: do NOT add; long text is acceptable once left-aligned.

Verify: `board.html` screenshot — cards in a row share a height, bios left-aligned, avatars left-aligned above names.

---

## Phase 3 — Visual polish

### 3.1 Hero spacing + CTA sizing

File: `styles.css`.

- `.hero { padding: 64px 0 48px; }` (was 80/60 — reduces the dead gap between hero and summary).
- `.hero-actions .btn-lg { padding: 14px 28px; font-size: 1rem; }` so the two CTAs stop wrapping mid-width.
- Add `.hero-actions { margin-top: 4px; }`.

Verify: index.html at 1440px — hero CTAs on one line; gap before first text section looks intentional, not empty.

### 3.2 Icons on home action cards

File: `index.html`, `styles.css`.

The six `.action-card`s are text-only while every other card type has an icon square. Add an SVG icon (24px, `stroke="currentColor"`, matching the stroke-linecap/linejoin pattern used elsewhere on the site) at the top of each `.action-card-body`, before the `<h3>`:
- healthcare leader/clinician → stethoscope or clipboard-lines SVG
- patient/advocate → heart SVG
- Who Are We → users/people SVG
- Why NPLB → help-circle SVG
- Our Mission → target SVG
- Donate Now → heart-handshake or gift SVG (white stroke on the accent card)

CSS: `.action-card-body svg { width: 28px; height: 28px; color: var(--primary-light); margin-bottom: 12px; }` and `.action-card-accent .action-card-body svg { color: var(--warm); }`.

Reuse SVG paths already present in the repo where possible (target, users already exist in awards.html/strategies.html).

Verify: each of the six cards shows an icon; accent card icon is readable against navy.

### 3.3 Balance Education Links

File: `index.html`, `styles.css`.

Current: `.catalog-grid` is 2-column; only one `.catalog-category` exists → right half empty.

Simplest fix: in index.html only, wrap the grid content in a single-column container: change the section's `<div class="catalog-grid">` to `<div style="max-width:560px">`. This centers the list without touching shared CSS.

Verify: the Education Links list is centered, no empty right column.

### 3.4 Breadcrumb cue on inner pages

Files: all pages except `index.html`; `styles.css`.

Rationale: nav is hamburger-only, so orientation is weak.

Add directly under each `.page-hero` heading container, above the `<h2>`:
```html
<p class="breadcrumb"><a href="index.html">Home</a> / <span>PAGE NAME</span></p>
```
CSS:
```css
.breadcrumb { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px; }
.breadcrumb a { color: var(--primary-light); text-decoration: none; }
.breadcrumb a:hover { text-decoration: underline; }
```
PAGE NAME = human name of each page (e.g., `Accountability Frameworks`, `Our Board`).

Verify: breadcrumb renders above the h2 on all 8 inner pages; links home.

---

## Phase 4 — Nice-to-haves (optional; confirm before doing)

- Open Graph + Twitter Card meta on all pages (`og:title`, `og:description`, `og:type: website`, `og:image` → absolute URL of `media/Dr. Grant Innes.png` once hosted).
- Print stylesheet: `@media print { .header, .footer, .support-actions, .email-signup, .nav-list { display: none; } }` so the QR-code donate section prints cleanly.

---

## Definition of done for the whole plan

- [ ] No horizontal overflow at 390/480/768/1440px on any page
- [ ] No broken images; board page image weight < 1.5 MB
- [ ] Keyboard: skip link, focus outlines, Escape closes nav
- [ ] Email signup replaced with mailto
- [ ] Footer Site column includes Board / Why NPLB / Mission on all pages
- [ ] Icon colors follow the semantic mapping everywhere
- [ ] No full-width empty "coming soon" boxes remain
- [ ] Each phase committed separately; message names the task(s)
