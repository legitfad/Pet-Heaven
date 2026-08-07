# Screen-Recording Script — Pet Heaven

A guide for your Part B demonstration video. **Aim for about 4–6 minutes.**
Record your screen while you click through the app and read the narration in your
own words (you don't have to read it word-for-word — sounding natural is better).

**Before you record**
- Run the app: `npm run dev`, then open the local address in your browser.
- Have these tabs/pages ready to reach: Home, Adopt, a pet's details, Register.
- Use any screen recorder (e.g. Windows **Xbox Game Bar** `Win+G`, OBS, or Zoom).
- Speak clearly; pause briefly between sections.
- **The brief asks you to illustrate your design ideas** — so don't just click,
  explain *why* things are designed the way they are (especially reusable
  components and the SPA).
- After recording, **upload to Google Drive** and set sharing to *"Anyone with
  the link can view"*, then put the link in your report.

---

### 0:00 — Introduction (~30s)

> **SAY:** "Hi, my name is _[name]_, student ID _[id]_. This is my ISIT207
> Assignment 3 project: **Pet Heaven**, a React single-page application for a
> charity that rehomes abandoned cats and dogs. I'll walk through the site and
> point out some of the design decisions."

**DO:** Start on the Home page.

---

### 0:30 — Home page & design idea (~45s)

**DO:** Slowly scroll down the home page — hero, the "who we are" cards, featured
pets, the how-it-works steps, and the stats band.

> **SAY:** "The home page communicates the society's purpose and facilities. I
> chose a warm teal theme and rounded cards to feel friendly and trustworthy. All
> the colours come from CSS design tokens, so the whole site stays consistent.
> Notice the navigation bar and footer — these are single React components reused
> on every page."

---

### 1:15 — Single Page Application navigation (~30s)

**DO:** Click a few nav links (Adopt, About, Home). Point out the URL changing to
`#/adopt` etc. *without* the page fully reloading.

> **SAY:** "Because this is a single-page application built with React Router, the
> pages switch instantly — the browser never does a full reload. The address bar
> still updates, so links and the back button work like a normal site."

---

### 1:45 — Adopt page: browsing, search & filter (~45s)

**DO:** Go to **Adopt**. Type a name (e.g. "Bella") in the search box. Clear it,
then click the **Cats** and **Dogs** filter chips. Watch the count update.

> **SAY:** "The Adopt page lists every pet. Each pet card is the same reusable
> `PetCard` component, filled with different data. I added a search box and
> Cats/Dogs filters as an extra browsing feature — the list and the count update
> live as I type or filter."

---

### 2:30 — Pet details (~30s)

**DO:** Click a pet to open its details page. Scroll through the description and
facts. Hover the **Request to adopt** button.

> **SAY:** "Clicking a pet opens its details, loaded from the pet's id in the URL.
> From here a member can request to adopt this specific pet."

---

### 3:00 — Membership: registration & validation (~60s)

**DO:** Click **Request to adopt** *before* logging in to show the "members only"
prompt. Then go to **Register**. First press submit with empty fields to show the
validation errors. Then fill it in correctly and submit.

> **SAY:** "Adoption is for members, so the app asks me to register or log in
> first. On the registration form, if I submit empty, every field shows an inline
> error and it won't send — that's the data-entry validation. Once I fill it in
> correctly, my membership is created, it's saved in the browser with
> localStorage, and I'm signed in automatically — see my name now appears in the
> navigation bar."

---

### 4:00 — Adoption request & 'mail to administrator' (~45s)

**DO:** Go back to a pet and click **Request to adopt** — now the form opens,
pre-filled with your name and email. Fill the rest, tick the box, and submit.
Show the success message (and, if your email app opens, show the pre-filled mail,
then you can close it).

> **SAY:** "Now that I'm a member, the adoption form opens, pre-filled from my
> account. When I submit a valid form, the app prepares an email to the society
> administrator with all the details — this meets the requirement that forms are
> mailed to the admin — and shows a confirmation message."

---

### 4:45 — Release a pet & responsive design (~45s)

**DO:** Briefly show the **Release a Pet** form. Then resize the browser narrow
(or open dev-tools device view) to show the layout reflow and the hamburger menu.

> **SAY:** "Owners who need to rehome a pet use the Release form, which reuses the
> same form components and validation. Finally, the whole site is responsive —
> as the screen gets smaller, the grids stack and the navigation collapses into a
> hamburger menu, so it works well on a phone."

---

### 5:30 — Closing (~20s)

> **SAY:** "To sum up: Pet Heaven is a component-based React SPA covering all the
> required functions — browsing, membership, adoption and release requests — with
> search, validation, responsive design, and it's deployed live. Thanks for
> watching."

**DO:** End on the Home page or the live deployed URL.

---

### Quick shot list (tick as you record)

- [ ] Intro on Home
- [ ] Scroll Home (purpose/facilities/featured)
- [ ] SPA nav (URL changes, no reload)
- [ ] Adopt: search + Cats/Dogs filter
- [ ] Pet details page
- [ ] "Members only" prompt
- [ ] Register: validation errors → successful sign-up
- [ ] Adoption form pre-filled → submit → success
- [ ] Release form (brief)
- [ ] Responsive / hamburger menu
- [ ] Closing (+ live URL)
