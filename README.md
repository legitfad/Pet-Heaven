# Pet Heaven 🐾

A **ReactJS Single Page Application** for *Pet Heaven*, a charity that rehomes
abandoned cats and dogs. Built for **ISIT207 – Frontend Web Programming,
Assignment 3**.

Visitors can learn about the society, browse and search pets available for
adoption, register as a member, request to adopt a specific pet (members only),
and submit a form to release a pet they can no longer keep. All request forms
are e‑mailed to the society administrator.

---

## What it uses

| Area | Choice |
|------|--------|
| Framework | React 18 (function components + hooks) |
| Build tool | Vite |
| Routing | react-router-dom (`HashRouter`) — a true SPA |
| State | React Context + a reusable `useLocalStorage` hook |
| Styling | One shared, token-driven `styles.css` (CSS custom properties) |
| Data | `src/data/pets.js` (no backend required) |
| Forms | Hand-written validation + `mailto:` submission |

---

## Run it locally

You need **Node.js 18+** installed. Then, from this folder:

```bash
npm install
```

```bash
npm run dev
```

Vite prints a local address (usually `http://localhost:5173/`). Open it in your
browser. The page reloads automatically as you edit the code.

## Build for production

```bash
npm run build
```

This creates a `dist/` folder with the finished static site. To preview that
build locally:

```bash
npm run preview
```

To put it online, see **[DEPLOY.md](DEPLOY.md)** (Netlify or Firebase).

---

## Project structure

```
src/
  main.jsx            App entry (Router + Member provider)
  App.jsx             All routes
  styles.css          Global design tokens + all styles
  data/pets.js        The list of pets (our "database")
  context/            MemberContext (login state, shared app-wide)
  hooks/              useLocalStorage (reusable custom hook)
  utils/              validators.js, mailto.js
  components/         Reusable UI: NavBar, Footer, PetCard, FormField, ...
  pages/              One file per screen: Home, Adopt, Register, ...
```

## Notes

- **Pet photos** are fetched at runtime from two free, no-key APIs — **Dog CEO**
  (matched to each dog's breed) and **The Cat API** — and cached in
  `localStorage` so each pet keeps the same picture on every visit. If a photo
  can't load (e.g. offline), the app falls back to a **generated SVG avatar**
  (`PetAvatar`) that matches the pet's colour, so a card is never broken. To
  force a specific picture, set a pet's `photo` field in `src/data/pets.js`.
- The member login is a **classroom demo** using `localStorage` — it is not real
  security (passwords are stored as plain text). This is noted in the code.
- This is a student project and not a real organisation.
