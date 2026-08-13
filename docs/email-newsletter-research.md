# Research: Email newsletter signup for a static foundation site

## Recommendation: Mailchimp embedded form (free tier)

**Mailchimp** is the best fit for a cost-conscious, maintenance-conscious foundation:

| Factor | Assessment |
|---|---|
| Cost | Free tier: up to 500 contacts, 1,000 emails/month |
| Maintenance | Zero — Mailchimp hosts the form, manages the list, sends the emails |
| Integration | Generates an HTML snippet; paste it into any page |
| Privacy | Mailchimp handles GDPR/CASL unsubscribe compliance |
| Trust | Established brand; foundations and nonprofits commonly use it |

**Setup process:** Someone at the foundation creates a free Mailchimp account, builds an audience, generates an embedded form, and gives us the form `action` URL. We paste it into the site. They log into Mailchimp to send campaigns (quarterly, at most).

**Alternatives considered:**

- **Buttondown** — nicer UX, but free tier caps at 100 subscribers. $9/mo after.
- **Google Forms** — free forever, but stores responses in a spreadsheet, not a newsletter tool. Manual export to send.
- **ConvertKit** — free up to 1,000 subs, but aimed at creators/course sellers; overbuilt for quarterly foundation updates.

**What we need from the foundation:** A Mailchimp account (or similar) and the embed code or form URL. We cannot wire this up from our side alone.

For now, the site uses a `mailto:` link ("Email us to subscribe") as a lightweight stopgap.
