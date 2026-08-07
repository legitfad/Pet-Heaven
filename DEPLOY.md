# Deploying Pet Heaven

Part B of the assignment asks for a **link to your deployed website**. This app
builds to plain static files, so it can be hosted for free almost anywhere.

First, build the site (do this before either option):

```bash
npm run build
```

This creates a **`dist/`** folder — that folder *is* your website.

> Because the app uses `HashRouter` (URLs contain `#`, e.g. `.../#/adopt`), you
> do **not** need any special server "redirect/rewrite" rules. Refreshing an
> inner page will never show a 404. This keeps deployment simple.

---

## Option A — Netlify Drop (easiest, ~2 minutes, no install)

1. Go to **https://app.netlify.com/drop**.
2. Sign in / sign up (free — a GitHub or email account is fine).
3. **Drag the whole `dist` folder** onto the page.
4. Netlify uploads it and gives you a live URL like
   `https://your-site-name.netlify.app`.
5. (Optional) In *Site settings → Change site name*, pick a tidier name.
6. Copy that URL into your Part B report.

To update later: run `npm run build` again and drag the new `dist` folder to the
same site (Deploys tab → drag to deploy).

---

## Option B — Firebase Hosting (named in the assignment brief)

You need a Google account. Do this once:

```bash
npm install -g firebase-tools
```

```bash
firebase login
```

Then, in this project folder:

```bash
firebase init hosting
```

Answer the prompts like this:

- **Use an existing project / create a new project** → create or pick one.
- **What do you want to use as your public directory?** → type **`dist`**
- **Configure as a single-page app (rewrite all urls to /index.html)?** → **No**
  (we use HashRouter, so this is not needed — but choosing Yes is harmless).
- **Set up automatic builds with GitHub?** → **No**.
- **Overwrite `dist/index.html`?** → **No**.

Finally, build and deploy:

```bash
npm run build
```

```bash
firebase deploy
```

Firebase prints a **Hosting URL** (e.g. `https://your-project.web.app`). Copy it
into your Part B report.

---

## After deploying — checklist

- [ ] Open the live URL and click through every page.
- [ ] Test the search/filter and a form on the live site.
- [ ] Paste the live URL into the Part B report (Section 9).
- [ ] Paste your video link (Google Drive) into the Part B report (Section 9).
