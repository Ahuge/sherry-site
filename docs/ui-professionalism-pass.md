# UI Professionalism Pass — Step-by-Step Implementation Plan

Status: proposed. Phases ordered by impact (1 = highest).
Audience: simple implementation agent.

## How to verify

```bash
cd /mnt/d/Work/sherry-site
npx serve . -l 4173
```

Verify at 1440px and 390px. Use headless Chrome at `/home/alex/.cache/puppeteer/chrome/linux-147.0.7727.57/chrome-linux64/chrome` if available. Otherwise, open the browser. For each task, check: no broken images, no horizontal overflow, no console errors.

Commit after each task. Messages follow repo style: `Phase X.Y: description`.

---

## Phase 1 — Immediate professionalism wins

### 1.1 Remove "Built with care" developer tagline from all footers

**Why:** "Built with care, as a static site that is secure and low-maintenance" is a developer note. Government/foundation sites do not carry this.

**Files:** All 9 `*.html` footer-bottom sections.

Find and delete the second `<span>` in each `.footer-bottom`:
```html
<span>Built with care, as a static site that is secure and low-maintenance.</span>
```
After removal, `.footer-bottom` will contain only the copyright line. Adjust the CSS:
```css
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 24px;
  font-size: 0.8rem;
}
```
Drop `display: flex; justify-content: space-between;` since there is only one child now.

**Verify:** `rtk grep -rn "Built with care" *.html` returns zero matches.

### 1.2 Consolidate three near-empty sections on strategies.html into one

**Why:** `strategies.html` has Teaching Materials, Healthcare Stories, and References as three full `.section` blocks, each containing only a header and a `span.coming-soon` chip. Together they waste ~600px of scroll height for no content. A foundation site hides this until content exists.

**File:** `strategies.html` (lines ~105–136).

Replace the three adjacent sections with one compact section:

```html
    <!-- ─── Teaching, Stories, References ─── -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>More Resources</h2>
          <p>Teaching materials, healthcare stories, and references are being prepared.</p>
        </div>
        <div class="card-grid">
          <div class="card">
            <div class="card-icon blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></div>
            <h3>Teaching Materials</h3>
            <p>Guides and training modules for doctors, nurses, and managers.</p>
            <span class="coming-soon">Coming soon</span>
          </div>
          <div class="card">
            <div class="card-icon blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/></svg></div>
            <h3>Healthcare Stories</h3>
            <p>First-hand accounts of improving patient access and flow.</p>
            <span class="coming-soon">Coming soon</span>
          </div>
          <div class="card">
            <div class="card-icon blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div>
            <h3>References</h3>
            <p>Primary sources and supporting literature.</p>
            <span class="coming-soon">Coming soon</span>
          </div>
        </div>
      </div>
    </section>
```

Save this block for insertion. Use the Edit tool to:
1. Match and delete the three old sections (exact strings from file).
2. Insert the consolidated block in their place.

**Verify:** `strategies.html` has exactly one "More Resources" section replacing the three; no duplicate anchors; page scroll height visibly shorter; no `.section section section` sequences.

### 1.3 Add Dr. Lorraine Kane headshot placeholder treatment

**Why:** She is the only board member without a photo — just "LK" initials. This looks incomplete next to 10 real headshots.

**File:** `board.html` (line ~120).

Since there's no photo file, update the avatar to use a professionally-styled placeholder that blends better than bare initials. Replace:
```html
<div class="leader-avatar">LK</div>
```
with:
```html
<div class="leader-avatar leader-avatar-placeholder">LK</div>
```
Add CSS:
```css
.leader-avatar-placeholder { background: linear-gradient(135deg, var(--primary-light), var(--primary-dark)); }
```

**Verify:** Kane's avatar has a navy gradient (not flat blue), visually distinct from headshots but not a jarring fallback.

### 1.4 Fix action-card visual weight

**Why:** The six action cards on the home page use a 2×3 grid with standard borders. They need a slightly more authoritative presence — slightly bolder headings, a left border accent, and hover treatment that signals "this is interactive."

**Files:** `styles.css`, `index.html`.

Changes to CSS:
```css
.action-card-body h3 {
  font-size: 1.05rem;          /* was 1rem */
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 8px;
}

.action-card {
  border-left: 3px solid transparent;  /* add: ready for hover */
}

.action-card:hover {
  border-left-color: var(--primary-light);
}
```

Changes to index.html: Add a subtle SVG chevron to each `.action-arrow` span, replacing the plain text. Find each `class="action-arrow">` and replace with:
```html
<span class="action-arrow">Explore Resources <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" style="vertical-align:middle;margin-left:4px"><polyline points="9 18 15 12 9 6"/></svg></span>
```
Do this for all six cards, matching the correct label text (Explore Resources, Learn More, View Board, Read More, Read More, Donate).

Add CSS for the inline arrow:
```css
.action-arrow svg { vertical-align: middle; margin-left: 4px; }
```

**Verify:** Each action card heading is 1.05rem. Cards gain a 3px blue left border on hover. Every "arrow" label has a real chevron SVG next to it.

### 1.5 Style the Donate email subscription line

**Why:** The subscribe mailto text sits as a raw paragraph at the bottom of the navy support section. It should look like a deliberate CTA, not an afterthought.

**File:** `index.html` (lines ~206–210).

Before the closing `</div>` of `.support-section`, find the current subscribe paragraph. Wrap it in a styled callout:
```html
<div style="margin-top:24px;padding:16px 24px;background:rgba(255,255,255,0.08);border-radius:var(--radius-sm);max-width:420px;margin-left:auto;margin-right:auto">
  <p style="margin:0;font-size:0.9rem;color:rgba(255,255,255,0.9)">
    Want updates on grant announcements and system improvement resources?
  </p>
  <p style="margin:8px 0 0;font-size:0.85rem">
    <a href="mailto:contact@nopatientleftbehind.org?subject=Subscribe%20me" style="color:var(--warm);font-weight:600;text-decoration:none;border-bottom:1px solid rgba(244,162,97,0.4);padding-bottom:2px">Email us to subscribe</a>
  </p>
</div>
```

**Verify:** The subscribe area has a subtle translucent background box around it; the email link has an underline.

---

## Phase 2 — Consistency and polish

### 2.1 Reduce typography scale to 8 core sizes

**Why:** There are 20 distinct font-size values across the CSS. Government/foundation sites typically use 6–9 sizes with a clear ratio. This creates visual noise and makes the site feel less systematic.

**File:** `styles.css`. Do a find-and-normalize pass on font-size values.

Target scale (rem values):
| Group | Target |
|---|---|
| fine print / meta | 0.75rem |
| small body | 0.85rem |
| body | 0.95rem |
| lead / large card | 1.05rem |
| h4 / card title | 1rem |
| h3 | 1.15rem |
| h2 | 1.8rem |
| hero h2 | 2.4rem |

Mapping (each line = an edit in styles.css):
- `font-size: 0.62rem` → `0.75rem` (.logo-sub)
- `font-size: 0.7rem` → `0.75rem` (wherever it appears)
- `font-size: 0.8rem` → `0.85rem` (this appears many places — `.hero-tag`, `.role`, `.breadcrumb`, `.meta`, `.footer-col a`, `.footer-bottom`)
- `font-size: 0.875rem` → `0.85rem` (`.nav-link`)
- `font-size: 0.9rem` → `0.95rem` (`.card p`, `.catalog-category h3` actually is 1.1rem, but `button`, input set to 0.9rem)
- `font-size: 1rem` → keep (`.leader-card h4`, `.btn-sm`, `.hero-actions .btn-lg`)
- `font-size: 1.05rem` → keep (`.btn-lg`, `.page-hero p`, `.action-card-body h3`)
- `font-size: 1.1rem` → `1.05rem` (`.catalog-category h3`)
- `font-size: 1.15rem` → keep (`.card h3`)
- `font-size: 1.2rem` → `1.15rem` (`.typeset h3`)
- `font-size: 1.4rem` → keep (`.tier-card h4`)
- `font-size: 1.5rem` → collapse to `1.8rem` if it's a h2 variant
- `font-size: 1.6rem` → `1.8rem` (`.typeset h2`)
- `font-size: 1.8rem` → keep
- `font-size: 2.2rem` → `2rem` (`.page-hero h2`)
- `font-size: 2.8rem` → `2.4rem` (`.hero h2`)

For each value in this list, grep for it in styles.css and replace with the target. If a replacement would cause overflow or wrapping, keep the original. Do NOT touch `12rem` (the decorative quote mark in `.tribute-visual::before` — dead code that we remove in 2.3 anyway).

**Verify:** `rtk grep -o "font-size: [0-9.]*rem" styles.css | sort -u | rtk wc -l` shows ≤ 12 values (acceptable since a few edge cases remain). Page renders without text overflow at 390/768/1440px.

### 2.2 Normalize line-height to consistent values

**Why:** Line-height jumps between 1.2, 1.4, 1.5, 1.6, 1.7, 1.8, and 2. Inconsistent leading makes the site feel unpolished.

**File:** `styles.css`.

Targets:
- Headings: `line-height: 1.2` (hero h2, page-hero h2, .section-header h2, h3, h4)
- Body: `line-height: 1.65` (.typeset p, .card p, .leader-card p)
- Tight: `line-height: 1.4` (small elements like .hero-tag, .breadcrumb, .footer-bottom)

Changes:
1. `body { line-height: 1.65; }` (was 1.7)
2. `.typeset p { line-height: 1.65; }` (was 1.8)
3. `.typeset li { line-height: 1.65; }` (was 1.7)
4. `.card p { line-height: 1.55; }` (was 1.6)
5. `.leader-card p { line-height: 1.5; }` (keep — it's tight inside cards)
6. `.hero p { line-height: 1.6; }` (keep — lead text)
7. `.hero h2 { line-height: 1.2; }` (keep)
8. `.page-hero h2 { line-height: 1.2; }` (add, currently inherits 1.65)

**Verify:** No text clipping; paragraphs look comfortably spaced. No orphan lines visible at common viewport widths.

### 2.3 Prune unused CSS

**Why:** Dead code from the old design clutters the stylesheet and confuses future agents. Removing it is safe and makes the CSS smaller and cleaner.

**File:** `styles.css`.

Remove the following blocks (they are not referenced by any HTML page):
- `.tribute` and all `.tribute-*` children (`.tribute-inner`, `.tribute-content`, `.tribute-visual`, `.tribute-visual::before`, `.tribute-quote`, `.tribute-attribution`) — these were from the old index.html tribute section, removed long ago.
- `.typeset-phase` and `.typeset-phase h3` and `.typeset-phase .phase-num` — old accountability page phase cards, replaced.
- `.nav-donate` — the old dropdown Donate link, replaced by `.nav-donate-btn`.
- `.qr-placeholder` — still referenced by `index.html` line 200. Keep the class but remove `border: 2px dashed var(--border)` (the dashed border looks like a placeholder; the image now fills it).
- `.media-grid`, `.media-card`, `.media-card-header`, `.media-card-body`, `.video-wrapper`, `.audio-wrapper` and their iframe rules — the old resources page multimedia section. Check if any page still uses these. `rtk grep -rn "media-grid\|media-card\|video-wrapper\|audio-wrapper" *.html` → if zero matches, delete all associated CSS.

Remove the lines found above.

**Verify:** `rtk grep -n "\.tribute\|\.typeset-phase\|\.nav-donate\b" styles.css` returns zero matches. The site renders identically — no missing styles.

### 2.4 Fix adjacent section-alt double borders

**Why:** `.section-alt` has `border-top: 1px solid var(--border); border-bottom: 1px solid var(--border)`. When two `.section-alt` blocks are adjacent (e.g., accountability.html exec summary → overview), the bottom border of the first and top border of the second create a 2px double line.

**File:** `styles.css`.

Change `.section-alt`:
```css
.section-alt { background: var(--bg-card); border-top: 1px solid var(--border); }
```
Remove `border-bottom`.

**Verify:** accountability.html no longer has a double line between the Exec Summary and Framework Overview sections.

---

## Phase 3 — Structural improvements

### 3.1 Add Grant Innes bio to home page hero area

**Why:** The hero currently names the fund but doesn't introduce the founder. A brief Grant Innes photo + one-sentence attribution next to or below the hero tag builds institutional credibility.

**File:** `index.html`.

After the hero-tag, add a small founder attribution:
```html
<div class="hero-founder">
  <img loading="lazy" src="media/Dr.%20Grant%20Innes.jpg" alt="Dr. Grant Innes" style="width:56px;height:56px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,0.8);box-shadow:0 2px 6px rgba(0,0,0,0.1)">
  <span>Founded by <strong>Dr. Grant Innes</strong></span>
</div>
```
Add CSS:
```css
.hero-founder {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  font-size: 0.85rem;
  color: var(--text-muted);
}
```

**Verify:** A small circular headshot plus "Founded by Dr. Grant Innes" appears centered above the hero heading.

### 3.2 Add key statistics callout to why-nplb.html

**Why:** The "Why NPLB" page is a single long typeset block with no visual breaks. Key numbers (ED utilization, wait-time reductions) get buried in paragraphs. Pull them into callout boxes.

**File:** `why-nplb.html`.

After the first "The Problem" paragraph, insert a stat row. Add CSS first:
```css
.stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
  margin: var(--space-6) 0;
}

.stat-box {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: var(--space-5);
  text-align: center;
}

.stat-box .stat-value {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
  line-height: 1.2;
  margin-bottom: 4px;
}

.stat-box .stat-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.4;
}
```

Then insert in why-nplb.html after "As a result, Canada has the highest ED utilization rate of all high-income countries." (end of the first paragraph in "The Problem"):
```html
        <div class="stat-row">
          <div class="stat-box">
            <span class="stat-value">#1</span>
            <span class="stat-label">Canada has the highest ED utilization among high-income countries</span>
          </div>
          <div class="stat-box">
            <span class="stat-value">30–50%</span>
            <span class="stat-label">Potential reduction in wait times through system efficiency</span>
          </div>
          <div class="stat-box">
            <span class="stat-value">2–4%</span>
            <span class="stat-label">Small hospital flow improvement that eliminates waiting room deteriorations</span>
          </div>
        </div>
```

**Verify:** Three stat boxes appear above "The Causes" heading. Mobile: they stack vertically.

### 3.3 Truncate long board bios on board.html

**Why:** Cards with 4+ sentences of bio (Grant Innes, Sherry Stackhouse) tower over cards with 2 sentences (Lynn Garrow, Shelley McLeod). The grid is inherently uneven because bios vary in length, but using `<details>` to collapse long bios gives the page a cleaner top-level scan.

Do NOT use `<details>` yet — past feedback asked for simpler layout. Instead, cap bios at ~250 characters for the grid view. If a bio exceeds this, truncate the last sentence and append ... (no "read more" link — the bios are complete enough at ~250 chars).

Actually, per AGENTS.md, these bios are source-of-truth content and should not be rewritten or shortened. Skip this task.

### 3.4 Add responsive rules for hero-tag and hero-founder at mobile

**Why:** The hero-tag and founder block will wrap awkwardly at small widths.

**File:** `styles.css`, in the `@media (max-width: 480px)` block.

Add:
```css
.hero-tag { font-size: 0.75rem; padding: 5px 12px; }
.hero-founder { flex-direction: column; gap: 8px; }
```

**Verify:** At 390px, no horizontal overflow from hero elements.

---

## Summary of expected changes

| Phase | Task | Impact |
|---|---|---|
| 1.1 | Remove footer tagline | High |
| 1.2 | Consolidate three near-empty sections on strategies.html | High |
| 1.3 | Lorraine Kane avatar styling | Medium |
| 1.4 | Action card visual weight + chevrons | High |
| 1.5 | Donate subscription styling | Medium |
| 2.1 | Reduce typography scale | High |
| 2.2 | Normalize line-height | Medium |
| 2.3 | Prune unused CSS | Low |
| 2.4 | Fix section-alt double borders | Low |
| 3.1 | Grant Innes in hero | Medium |
| 3.2 | Why-NPLB key statistics | Medium |
| 3.3 | Board bio truncation | Skipped (source-of-truth content rule) |
| 3.4 | Mobile hero responsiveness | Medium |

Commit after each task. Each commit message should name the phase and task, e.g. `Phase 1.2: Consolidate near-empty sections on strategies.html`.
