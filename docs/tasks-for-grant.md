# Items needed from Grant

Last updated: August 2026. Hand this document to Grant.

For each item: what we need, what format, and where it will live on the site.

---

## 1. Interactive quiz — "Questions for Program Leaders"

**What we need from Grant:** The 12 diagnostic questions from the "Questions for Program Leaders" list, converted into a scored self-assessment. For each question we need:

- The question text
- 3–5 multiple-choice answers per question
- A score weight for each answer (e.g., "Yes, we do this regularly" = 3 points, "We've discussed it" = 2, "Not yet" = 1, "Doesn't apply" = 0)
- 3–4 result tiers with interpretive text (e.g., "0–12 points: Early stage — your program would benefit from exploring accountability frameworks. Start with...", "13–24 points: Developing — you have promising practices but gaps remain...", etc.)

**Preferred format:** A Google Sheet with columns: Question | Option A (score) | Option B (score) | Option C (score) | Option D (score), plus a separate tab with result tiers.

**Where it lives on the site:** We will build a self-contained JavaScript quiz widget embedded on `why-nplb.html` or a new `quiz.html`. No backend needed — all scoring happens in the browser. The user clicks through questions, sees their score, and gets a recommendation linking to relevant site resources.

---

## 2. Healthcare leader resources — content from the PowerPoint topic tree

**What we need from Grant:** The actual content behind the section titles on the topic tree. This includes detailed recommendations, toolkits, and guidance documents for:

- ED Inflow Recommendations
- ED Throughput Recommendations
- ED Outflow Recommendations
- ALC Recommendations
- Intake Areas & Low-Acuity Diversion
- Rationing & Ethical Allocation
- The One vs. the Many
- Matching Demand & Capacity
- Reducing Variability
- Task Shifting
- Overcapacity Protocols (Levels 1–4)

**Preferred format:** Each as a PDF or Google Doc. PDFs are better for downloadable toolkits. If content already exists in Google Docs, share the folder and we will link from the site.

**Where it lives on the site:** 
- PDFs go into a `downloads/` folder in the repo and are linked from the relevant card on `strategies.html` or `resources.html`
- Google Docs can be embedded via iframe or linked directly
- Grant's preference: we recommend PDFs hosted in the repo (no dependency on Google Drive availability, and they work offline)

---

## 3. Teaching materials

**What we need from Grant:** Slide decks, workshop materials, training guides, and presentation files.

**Preferred format:** Export PowerPoint files as PDF. If slide decks need to remain editable, provide both the original file and a PDF export.

**Where it lives on the site:** `downloads/` folder in the repo, linked from the Teaching Materials section on `strategies.html`.

---

## 4. PDF downloads for the site

Several pages have "download" buttons that currently go nowhere. Grant needs to provide the actual files:

| Download | Page | Format needed |
|---|---|---|
| Implementation Guide (full) | `accountability.html` | PDF |
| Protocol Overview | `resources.html` | PDF |
| Award Application Form | `awards.html` | PDF or Word doc |
| Budget Template | `awards.html` | Excel or PDF |
| Submission Guidelines | `awards.html` | PDF |
| System Improvement Toolkit | `resources.html` | PDF |
| Quality Metrics Template | `resources.html` | PDF or Excel |
| Process Mapping Guide | `resources.html` | PDF |
| Risk Assessment Framework | `resources.html` | PDF |

**Where it lives:** `downloads/` folder in the repo, linked directly from the relevant page. No external hosting dependency.

---

## 5. Patient / public advocate content

**What we need from Grant:** Content for `patient.html` — information aimed at patients and public advocates explaining:

- Why care delays happen
- What the fund is doing about it
- How to support system improvement
- How to donate and where donations go

**Preferred format:** A Google Doc or plain text file. We will convert to HTML and place on `patient.html`.

**Where it lives:** `patient.html` (currently a placeholder page).

---

## 6. Healthcare stories

**What we need from Grant:** 3–5 anonymized case studies or narratives illustrating:

- How care delays impact real patients
- How accountability frameworks or process improvements resolved a bottleneck
- Before/after impact

**Preferred format:** A Google Doc — one story per section with a title, body text (~200–400 words each), and any anonymized data or quotes.

**Where it lives:** `strategies.html` Healthcare Stories section (currently "coming soon"). Each story becomes a card or expandable section.

---

## 7. Media hub content

**What we need from Grant:**

- **YouTube:** A YouTube channel URL or a list of specific video URLs to embed. If the foundation plans to create a YouTube channel, we can embed the channel or individual videos.
- **Podcast:** If Grant or Dr. Helman plan to produce podcast episodes for the fund, we need the RSS feed URL or a SoundCloud/Spotify playlist URL. The EM Cases podcast embed is already live as a placeholder example.
- **Op-eds / press:** Any published articles or news coverage we should link to or display.

**Preferred format:** A list of URLs. No files needed.

**Where it lives:** `media.html` (already stubbed with an EM Cases embed and a YouTube placeholder).

---

## 8. References

**What we need from Grant:** A structured list of foundational studies, papers, and sources cited throughout the site.

**Preferred format:** A Google Sheet or Doc with columns: Title | Authors | Journal | Year | DOI or URL. We will format it as a reference list on `strategies.html`.

**Where it lives:** `strategies.html` References section (currently "coming soon").

---

## 9. Assets

| Item | Format needed | Where it lives |
|---|---|---|
| Dr. Lorraine Kane headshot | High-res photo (JPEG or PNG), at least 500×500px | `media/` folder, displayed on `board.html` |
| Charitable registration number | Text (format: 123456789 RR 0001) | Donate section on `index.html` |

---

## 10. Newsletter setup

Grant (or someone at the foundation) needs to create a free Mailchimp account (mailchimp.com, free tier: up to 500 contacts). Once created, provide us with the embedded form HTML snippet or the form action URL. We will embed the signup form on the site, replacing the current mailto: workaround.

Alternatively, if the foundation prefers a different provider, any service that generates an HTML embed form will work. See `docs/email-newsletter-research.md` for a comparison.

---

## Summary: what formats to send us

| Content type | Send us |
|---|---|
| Text content (stories, patient page, quiz questions) | Google Doc or plain text |
| Structured data (quiz answers, references, funding tiers) | Google Sheet |
| Slide decks, workshop materials | PDF exports |
| Downloadable documents (guides, forms, templates) | PDF files |
| Images (headshots, photos) | JPEG or PNG, high resolution |
| Video/podcast links | URLs (YouTube, SoundCloud, Spotify, RSS) |
| Charity number | Text |
