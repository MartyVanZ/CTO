# Technology / Clarity: AI-guided technology assessment

A mobile-friendly, two-question, natural-language AI assessment for Cloudflare Pages.

## How it works

1. A visitor describes the stage of their company naturally. OpenAI classifies it into **prototyping**, **scaling**, or **established**.
2. They describe their primary technology challenge. OpenAI identifies **knowledge**, **growth**, **efficiency**, or **cost** (and any strongly supported overlapping areas).
3. The application presents up to 3 matching offerings, with short personalized rationales. The service text itself is written in the website and is not invented by the model.
4. They can copy results or initiate an email conversation. No analytics or database is included.

## File structure

- `public/index.html` — page layout
- `public/styles.css` — visual styling
- `public/app.js` — interactions
- `functions/api/assess.js` — **server-side** Cloudflare Pages Function calling OpenAI

## Deploy to an EXISTING Cloudflare Pages site

**Important: Cloudflare Pages Functions require a Git/Wrangler workflow. A dashboard drag-and-drop upload of the `public` folder alone does NOT deploy the backend function.**

### Recommended: Git deployment

1. Put the contents of this directory in a GitHub repository (or place inside the repository for your current Cloudflare Pages project). Keep the top-level `functions/` directory at the repository root for this layout.
2. In Cloudflare dashboard → **Workers & Pages** → select your Pages project → connect this repository through Git integration (or update the linked repo).
3. Set **Build command** to blank (no build required) and **Build output directory** to `public`. Set the root directory to the repo root.
4. In the Pages project go to **Settings → Variables and Secrets → Add**. Add `OPENAI_API_KEY`, enter your OpenAI API key, and select **Encrypt**. Optionally set `OPENAI_MODEL` to `gpt-4.1-mini` (the default).
5. Trigger a new deployment after creating the secret.
6. Load your Pages URL, complete both questions and check that the recommendations display.

### Alternative: Wrangler CLI

From the project directory:

```sh
npx wrangler pages deploy public --project-name YOUR_EXISTING_PAGES_PROJECT
```

This should pick up the top-level `functions/` directory. Configure secrets in the Cloudflare Pages project dashboard before testing. You can also set the secret using Cloudflare's CLI tooling.

### Run locally

Create a `.dev.vars` file at the project root containing `OPENAI_API_KEY=...` (never commit it), then run:

```sh
npx wrangler pages dev public
```

Open the local address Wrangler prints.

## Key security, privacy and cost notes

- **Do not put the OpenAI key in frontend JavaScript, HTML, Git, or public build variables.** Only `functions/api/assess.js` reads the encrypted secret.
- OpenAI API usage is **not free** and billed separately from a ChatGPT subscription. Each assessment makes two API calls. See https://openai.com/api/pricing/.
- Public anonymous forms can be abused. Before promotion, add Cloudflare Turnstile validation and Cloudflare WAF/rate limiting to `/api/assess`, plus OpenAI spending limits / alerts. The included length and origin validation help, but do **not** prevent automated abuse.
- The site itself stores no answer data, but both answers are sent to OpenAI for analysis. The OpenAI call sets `store:false`; consult OpenAI's current data-retention terms and your privacy/legal requirements before promoting the tool. The optional email link includes the visitor's answers in the email body if they choose to send it.
- No sensitive personal/customer information should be pasted into the assessment.
- Model classifications can be mistaken. Results are suggestions, not a technical audit.

## Personalize

- Change brand name and copy in `public/index.html`.
- Edit the eight offering descriptions in `public/app.js` (`serviceDetails`).
- Edit routing in `functions/api/assess.js` (`routes`).
- Change the contact email in `public/index.html` and `public/app.js`.

## Flowchart mapping

| Stage | Concern | Core offering(s) |
| --- | --- | --- |
| Prototyping | Knowledge | Independent Technology Advisory |
| Prototyping | Growth | Product Scalability |
| Scaling | Knowledge | Fractional CTO Leadership |
| Scaling | Growth | Product Scalability |
| Established | Efficiency | Business-Aligned Strategy, Team Productivity, Architecture Modernization |
| Established | Cost | Technology Cost & Efficiency |

Practical AI Transformation is also considered for scaling and established visitors who explicitly mention AI. The AI model can recognize other overlapping concerns, while the server restricts recommendations to the valid services for that stage and concern.
