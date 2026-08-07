# ISIT207 Assignment 3 — Part B
# Review Report: *Pet Heaven* Web Application

> **How to use this draft:** This report is written for you to finish and submit.
> Fill in your details below, paste your screenshots where you see the
> **📷 [SCREENSHOT: …]** markers, and add your two links in Section 10. Then open
> it in Word (or paste it in), check it reads well, and **export it as a PDF** to
> upload on Moodle. Aim to keep it to about **5 pages** — trim any part that runs
> long. You can delete this box before submitting.

| | |
|---|---|
| **Name** | _your name here_ |
| **Student ID** | _your ID here_ |
| **Subject** | ISIT207 Frontend Web Programming |
| **Assignment** | Assignment 3 — Part B |
| **Date** | _date here_ |

---

## 1. Introduction

This report describes the design of **Pet Heaven**, a Single Page Application
(SPA) built with **ReactJS** for a charity that cares for abandoned cats and
dogs. The website lets the public learn about the society, browse pets available
for adoption, register as a member, request to adopt a specific pet, and submit
a request to release (rehome) a pet they can no longer keep. Every request form
is e‑mailed to the society administrator.

The application was built using a **component-based approach**: the interface is
assembled from small, reusable React components rather than repeated blocks of
HTML. The sections below explain the key design decisions on **functions, screen
layout, styles, and data handling**.

📷 **[SCREENSHOT: Home page — hero banner and navigation]**

---

## 2. Target audience

The site serves three main groups:

- **Adopters** — individuals and families looking to give a pet a home.
- **Pet owners in difficulty** — people who need to rehome a pet responsibly.
- **Supporters** — volunteers and donors who want to help the society.

The design therefore favours warmth and reassurance (friendly colours, rounded
cards, plain language) and makes the two main actions — *Adopt* and *Release a
Pet* — obvious from the very first screen.

---

## 3. Functions and business events

The brief lists several functions the society needs. The table below maps each
required business event to where it is handled in the app.

| Business need (from the brief) | Where it is handled | Notes |
|---|---|---|
| Communicate purpose, facilities & pet info | `Home`, `About` pages | Mission, facilities and values sections |
| List pets available for adoption | `Adopt` page | Cards generated from the pet data |
| Register as a member / supporter | `Register` page | Saved to `localStorage`, auto sign-in |
| Release (surrender) a pet | `Release` page | Form e‑mailed to admin |
| Adopt a specific pet | `PetDetails` → `AdoptRequest` | **Members only**; form e‑mailed to admin |
| Forms mailed to the administrator | `utils/mailto.js` | Builds a pre-filled `mailto:` message |

**Extra, credit-earning features** were also added: a **search and filter** bar
on the Adopt page, a responsive mobile layout, generated pet illustrations, and
deployment to a live host.

---

## 4. Site structure and SPA navigation

Although it feels like a multi-page website, it is a **Single Page Application**:
React Router swaps the page content instantly without a full browser reload. The
shared **NavBar** and **Footer** are drawn once and appear on every route.

```
Pet Heaven (SPA)
│
├── /                 Home        (purpose, facilities, featured pets)
├── /adopt            Adopt       (search + filter + pet grid)
│     └── /adopt/:id  Pet details (one pet)  ──► /adopt/:id/request  (adopt form*)
├── /release          Release a pet form
├── /register         Become a member
├── /login            Member log in
├── /about            About the society
├── /contact          Contact form + FAQ
└── *                 Not-found page

        * requires the visitor to be logged in
```

Routing uses **`HashRouter`** so that the deployed site works on any static host
and never returns a "404" if a visitor refreshes an inner page.

📷 **[SCREENSHOT: Adopt page showing the pet grid and the search/filter bar]**

---

## 5. Component-based design and reusable components

This was the central design goal. The UI is broken into small components that are
**written once and reused** across the app. Data flows into them through **props**.

| Component | Reused in | Purpose |
|---|---|---|
| `FormField` | Register, Login, Release, Adopt request, Contact | One labelled input/select/textarea with its own error message |
| `PetCard` | Home (featured) and Adopt (full list) | Preview card for a single pet |
| `PetGrid` | Home, Adopt | Lays cards out in a responsive grid |
| `PetAvatar` | PetCard, PetDetails, Home hero | Draws a cat/dog illustration from the pet's data |
| `PetImage` | PetCard, PetDetails | Shows a fetched photo, with `PetAvatar` as an automatic fallback |
| `Button` | Everywhere | Consistent button that can be a link or a real button |
| `NavBar` / `Footer` / `Layout` | Every page | Shared shell around all routes |
| `SectionHeading`, `Notice`, `SearchFilterBar` | Multiple pages | Headings, messages, and the search UI |

Two pieces of **reusable logic** were also written:

- **`useLocalStorage`** — a custom hook that behaves like `useState` but also
  saves the value to the browser so it survives a refresh.
- **`usePetPhoto`** — a custom hook that fetches a real photo for each pet from
  free public APIs (**Dog CEO** for dogs, matched to the breed; **The Cat API**
  for cats) and caches the result, so pictures load fast and stay the same.
- **`MemberContext`** — React Context that shares the logged-in member with the
  whole app, so any component can check who is signed in without passing props
  through many layers.

> **Why this matters:** In a plain HTML site, the navigation bar has to be copied
> into every page. Here it lives in one `NavBar` component, so a change is made
> once and appears everywhere — this is the main benefit of component reuse.

📷 **[SCREENSHOT: A pet details page with the "Request to adopt" button]**

---

## 6. Visual design and branding

The look is warm and trustworthy, suited to a caring charity:

- **Colour:** a calm teal primary (`#0f766e`) with soft tinted section bands and
  a warm accent, on a clean white background.
- **Consistency through design tokens:** all colours, corner radius, shadows and
  the max page width are defined once as **CSS custom properties** in `:root`
  (`styles.css`). Every component reads from these tokens, so the whole site
  stays visually consistent and can be re-themed from one place.
- **Type & shape:** a clean system font, generous spacing, and rounded cards and
  buttons give a friendly, approachable feel.

---

## 7. Layout and responsive design

Page structure uses **CSS Grid**; smaller components use **Flexbox**. The layout
adapts to the screen size through two breakpoints:

- **Tablet (≤ 900px):** multi-column grids reduce to two columns, and the
  navigation collapses into a **hamburger menu**.
- **Phone (≤ 560px):** grids stack into a single column so everything stays
  readable without side-scrolling.

📷 **[SCREENSHOT: The site on a mobile width, with the hamburger menu open]**

---

## 8. Forms, validation and data handling

**Validation.** Every form validates in the browser before it is accepted. Shared
helper functions (`utils/validators.js`) check for required fields, valid email
and phone formats, minimum lengths, and matching passwords. If a field is
invalid, an inline message appears beneath it, the first invalid field is
focused, and submission is blocked.

📷 **[SCREENSHOT: A form showing inline validation error messages]**

**Sending to the administrator.** As the brief requires, submitting a valid form
"mails it to the administrator". Because this is a frontend-only project, the app
builds a **`mailto:`** link containing all the entered details and opens the
visitor's email program with everything pre-filled — they simply press *Send*.

**Data storage (database discussion).** Member accounts and sign-in state are
stored in the browser using **`localStorage`**, wrapped in the reusable
`useLocalStorage` hook. A real backend database (such as **Firebase Firestore**
or **MongoDB**) was **optional** for this assignment. It could be added later by
replacing the `localStorage` calls in `MemberContext` with database reads/writes;
the form submission could likewise be upgraded to a service like **EmailJS** or a
small server endpoint. The current design keeps the app simple and fully
frontend, which met the core requirements.

**Pet photos from public APIs.** Rather than bundling image files, each pet's
photo is fetched at run time from two free, no-key web APIs — **Dog CEO**
(`dog.ceo`, matched to the dog's breed) and **The Cat API** (`thecatapi.com`).
The reusable `usePetPhoto` hook caches the chosen photo in `localStorage` so each
pet keeps the same picture, and the `PetImage` component automatically shows the
drawn avatar if a photo cannot load. This demonstrates consuming an external API
from a React frontend while keeping the app resilient when offline.

> **Security / privacy consideration:** The demo login stores passwords as plain
> text in `localStorage`, which is **not secure** — it is a classroom
> demonstration only. A real site would send credentials over HTTPS and store
> only a safely *hashed* password on a server. This limitation is noted directly
> in the source code.

---

## 9. Usability and accessibility

- **Clear navigation:** the current page is highlighted; the logo returns home.
- **No dead ends:** unknown URLs show a friendly "page not found" with links out.
- **Feedback:** success messages confirm when a form has been prepared/sent.
- **Accessibility touches:** a "skip to content" link, labels tied to every
  input, `aria-` attributes on the menu and error messages, visible keyboard
  focus outlines, and an accessible FAQ built with native `<details>` elements.

---

## 10. Deployment and links

The app was built with `npm run build` and deployed as static files. Routing via
`HashRouter` means no special server configuration was needed.

- 🌐 **Live website:** _paste your deployed URL here (e.g. https://…netlify.app)_
- 🎥 **Demonstration video (Google Drive):** _paste your shared link here_

> Make sure the Google Drive video link is set to **"Anyone with the link can
> view"** so your marker can open it.

---

## 11. Conclusion

Pet Heaven meets all of the required functions using a modern, component-based
ReactJS architecture. Building the interface from small reusable components
(`FormField`, `PetCard`, `PetAvatar`, and the shared layout) kept the code
organised and consistent, while React Router turned the separate screens into a
smooth Single Page Application. Extra features — search and filter, responsive
design, and live deployment — add polish beyond the basic requirements. The main
area for future work is replacing the demo `localStorage` login and `mailto:`
submission with a real, secure backend.

---

### Screenshot checklist (delete before submitting)

- [ ] Home page (hero + navigation)
- [ ] Adopt page (grid + search/filter)
- [ ] Pet details page (with "Request to adopt")
- [ ] A form showing validation errors
- [ ] The success message after submitting a form
- [ ] Mobile view with the hamburger menu open
- [ ] (Optional) The "members only" prompt on the adoption form
