<div align="center">

<img src="assets/images/logo.svg" alt="Happy Pill logo" width="80" />

# Happy Pill

</div>

---

## ✨ Highlights

- **Calm, accessible design** — soft palette, generous whitespace, semantic HTML, keyboard-navigable, respects `prefers-reduced-motion`.
- **Fully responsive** — mobile-first layout with a sticky blurred navbar and hamburger menu under 768 px.
- **Six pages, one shared design system** — home, about, counsellors, sign in, sign up, and account, all powered by a single CSS file driven by CSS variables.
- **Demo authentication** — sign-up, sign-in, profile edit, and sign-out using `localStorage`, so the original auth feature works on a static host without a backend.
- **Zero build step** — no bundler, no framework, no dependencies. Drop it on any static host (GitHub Pages, Netlify, Vercel, S3).

## 🗂️ Pages

| Page | File | What's on it |
| --- | --- | --- |
| Home | `index.html` | Hero, "how it works" services, split feature, CTA banner |
| About | `about.html` | Brand story, values, what you can talk about |
| Counsellors | `counselors.html` | Counsellor cards with specialisations and booking CTA |
| Sign in | `login.html` | Email + password sign-in (demo, client-side) |
| Sign up | `signup.html` | Account creation (demo, client-side) |
| Account | `account.html` | View profile, edit name/email/password, sign out |

## 🧰 Tech stack

- **HTML5** — semantic landmarks (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`), `aria-*` attributes, and meta tags for SEO / theme colour.
- **CSS3** — custom properties, fluid type with `clamp()`, CSS Grid, Flexbox, `backdrop-filter`, accessible focus rings.
- **Vanilla JavaScript** — no framework. Mobile nav, scroll state, active-link highlighting, and a tiny demo `Auth` module backed by `localStorage`.
- **Google Fonts** — Plus Jakarta Sans.

## 📁 Project structure

```
mentalhealth-website/
├── index.html
├── about.html
├── counselors.html
├── login.html
├── signup.html
├── account.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── logo.jpg
│       ├── comforting.jpg
│       ├── counsel-illustration.png
│       ├── about-illustration.jpg
│       ├── therapist-1.jpg … therapist-3.jpg
│       └── facebook.png · instagram.png · twitter.png · linkedin.png
├── LICENSE
└── README.md
```

## 🚀 Run locally

No build tools required — any static server works:

```bash
# clone
git clone https://github.com/kshama7/mentalhealth-website.git
cd mentalhealth-website

# pick one
python3 -m http.server 8000
# or
npx serve .
```

Then visit <http://localhost:8000>.

## 🌐 Deploy

Hosted on **GitHub Pages** straight from `main`.

To enable it on a fork:

1. Go to **Settings → Pages**.
2. Under "Build and deployment", choose **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`.
4. Your site goes live at `https://<your-username>.github.io/mentalhealth-website/`.

## 🔒 A note on the demo authentication

The sign-up / sign-in flow is **client-side only**. Accounts live in your browser's `localStorage`, and passwords are run through a tiny non-cryptographic hash for display purposes. This is deliberate — it lets the site demonstrate the original auth feature without a server, but it is **not real authentication** and should never ship to production.

The original college version used PHP + MySQL on XAMPP. To restore real auth, swap the `Auth` module in `assets/js/main.js` for `fetch()` calls against a real backend (Node/Express, PHP, or a BaaS like Supabase / Firebase).

## 📜 History

This project started as a college assignment in 2021 — a XAMPP/PHP/MySQL site with three pages and a registration form. The 2026 rewrite kept the brand and core concept and rebuilt everything else:

- ❌ Removed PHP backend, XAMPP dependency, hardcoded `localhost` URLs.
- ✅ Modern responsive layout, design system, accessibility, sticky nav, smooth animations.
- ✅ Auth concept preserved as a client-side demo so the site stands on its own.

## 📄 License

MIT © Kshama Bhatt. See [LICENSE](LICENSE).
