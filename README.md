# NONZERO — Growth Studio

An editorial, responsive React website for a digital growth agency. **NONZERO is a placeholder brand name** — confirm trademark/domain availability before launching a business under it.

## What's here

- React + Vite with handcrafted CSS and no UI-kit dependency.
- Sharp-corner buttons, one lime accent, custom SVG system diagram, subtle animated reveals, no gradients/AI hero image/emoji icons.
- Mobile navigation, accessible service accordions, interactive lead-math calculator, reduced-motion support.
- Working Netlify Forms integration: native form registration, AJAX submission, honeypot field, and realistic loading/success/error/preview states.
- No fabricated clients, results, testimonials, or guarantees.

## Run it locally

Requires Node.js 20.19+ (or Node 22.12+).

```bash
npm install
npm run dev
```

Then open the local address Vite prints. Forms will show a preview notice locally and **will not claim to send messages**.

## Deploy with Netlify (GitHub recommended)

1. Create a new GitHub repository for this website and upload the files in this folder, maintaining the `src/` and `public/` folders. Do not upload `node_modules`.
2. In Netlify, choose **Add new project → Import an existing project → GitHub**, authorize Netlify, and select your repo.
3. Netlify should read `netlify.toml`: build command `npm run build`, publish directory `dist`.
4. Go to your Netlify site **Forms → Enable form detection**, then redeploy the site. This is important because client-rendered React forms are invisible to Netlify's parser without the static form blueprint in `index.html`.
5. Send a real test inquiry from the live site. Check **Netlify → Forms → project-inquiry** to verify it arrived. Under Forms notification settings, add an email notification so you don't miss inquiries.
6. Add a custom domain and your brand/SEO metadata after settling on a name. A logo or site name alone is not a trademark clearance.

There is no database or server to maintain. The static React build can be served on Netlify's CDN.

## Edit the agency

- Agency copy and services: `src/App.jsx` (arrays named `services` and `plans`, plus the JSX sections)
- Brand colors, typography, breakpoints, animations: `src/styles.css` (`:root`)
- SEO title and social metadata: `index.html`
- Favicon: `public/favicon.svg`

## Marketing honesty

The interactive calculator demonstrates hypothetical changes to lead count. It explicitly states that it isn't a guarantee or forecast. Replace sample service descriptions with the services you are able to deliver. Add case studies only when you have real work and permission to discuss it.