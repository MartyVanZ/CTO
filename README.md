# Technology / Clarity - Button-Based Assessment

A free, static, two-question technology assessment for Cloudflare Pages. No OpenAI API, API key, backend Functions, database, or paid AI service required.

## How it works

1. Visitors select a company stage: **Prototyping**, **Ready to scale**, or **Established**.
2. Visitors select a technology priority: **Knowledge & direction**, **Growth & scale**, **Efficiency & delivery**, or **Cost & simplification**.
3. The browser uses a deterministic matching table in `public/app.js` to display relevant service recommendations, descriptions, and a contact mailto link.

The original flowchart's direct relationships are preserved. The flowchart doesn't cover every stage/concern pairing, so we added sensible fallback recommendations for those combinations. You can customize each mapping in the `matches` object in `public/app.js`.

## Deploying to existing Cloudflare Pages with GitHub

Copy the contents of this project's folder (not the containing folder itself) to the root of the GitHub repository connected to Cloudflare Pages:

```
repository-root/
  public/
    index.html
    styles.css
    app.js
  README.md
```

**Remove the old `functions/` folder from your GitHub repository**, since the application no longer needs an API route. In GitHub, commit the changed `public` files and the removal of `functions/`; Cloudflare Pages will redeploy automatically from your production branch.

Cloudflare Pages configuration:

- Framework preset: **None**
- Build command: **exit 0** (or leave blank)
- Build output directory: **public**
- Root directory: **/**

You can delete the old `OPENAI_API_KEY` secret from this project, since nothing reads it. The app runs entirely in users' browsers. No API calls are made.

If your project is still deployed as a Cloudflare **Worker**, use a proper Pages project or configure Worker static assets separately. The layout above is designed for Pages.

## Testing locally

Open `public/index.html` using a basic static server (for example `python -m http.server 8000 -d public`) and visit `http://localhost:8000`.

Try all three company stages and all four concerns, including Start again, Change priority, Copy my results, and Let's connect.

## Privacy and cost

- No server-side code or paid AI API calls.
- No user response data is stored or transmitted by this application.
- Clicking Let's connect opens the visitor's email program with their selected categories prefilled; the visitor decides whether to send it.
- Hosting is subject to Cloudflare's applicable free-tier limits.

## Customize

- **Service titles and descriptions:** `serviceDetails` in `public/app.js`
- **Recommendation matching:** `matches` in `public/app.js`
- **Recommendation explanations:** `rationales` in `public/app.js`
- **Contact email:** `mailto:` in `public/index.html` and `public/app.js`
- **Appearance:** `public/styles.css`

## Meeting scheduler

The results-page call to action opens the Zoom Scheduler at https://scheduler.zoom.us/marty-vanzwietering/marty-techcxo-intro in a new browser tab. No email draft is generated.
