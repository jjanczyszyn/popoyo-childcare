# Popoyo Childcare

Trusted in-home childcare site for families visiting Popoyo, Nicaragua.

- Live site: <https://popoyochildcare.justinalydia.com>
- Stack: React + Vite + TypeScript + Tailwind on the frontend, [Convex](https://convex.dev) for backend (booking persistence + owner-tunable config), GitHub Pages for hosting.
- The booking form opens WhatsApp with a formatted summary; if Convex is wired up, it also persists the booking so a coordinator can review it later.

---

## Local development

```bash
npm install

# 1. start Convex (first time will prompt for login + create a project).
#    This generates convex/_generated/* and prints VITE_CONVEX_URL to copy.
npm run dev:convex

# 2. (separately) seed default config (one-time, after convex is running)
npx convex run config:seedDefaults

# 3. in another terminal, start vite
echo "VITE_CONVEX_URL=https://<your-deployment>.convex.cloud" > .env.local
npm run dev
```

Without Convex set up, the site still runs — the booking form just opens WhatsApp without persisting to the DB.

## Production build

```bash
npm run build      # outputs to dist/
npm run preview    # local preview of dist/
```

## Deploying to GitHub Pages under `popoyochildcare.justinalydia.com`

The repo ships with `.github/workflows/deploy.yml` and `public/CNAME`. To go live:

1. **Push the repo to GitHub.** Any account/repo name works.
2. **Push your Convex prod deployment** so the live site has a backend:
   ```bash
   npx convex deploy
   ```
   Copy the deployment URL it prints.
3. **Set repo secret `VITE_CONVEX_URL`** to that URL: `Settings → Secrets and variables → Actions → New repository secret`.
4. **Enable Pages**: `Settings → Pages → Build and deployment → Source: GitHub Actions`.
5. **Add the custom domain in Pages**: enter `popoyochildcare.justinalydia.com` in the Pages settings. GitHub will create the `CNAME` file (we already include one) and start an HTTPS provisioning step.
6. **DNS** — add a `CNAME` record at the registrar that owns `justinalydia.com`:
   ```
   Name:  popoyochildcare
   Type:  CNAME
   Value: <github-username>.github.io.
   ```
   (For an org repo: `<org-name>.github.io.`)
7. Wait a few minutes for DNS to propagate. Then in GitHub Pages settings, tick **Enforce HTTPS**.

Subsequent pushes to `main` redeploy automatically.

## Owner ops

- View bookings: `npx convex dashboard` → `bookings` table.
- Update phone number / WhatsApp link / maps link without a redeploy:
  ```
  npx convex run config:setKey '{"key": "ownerWhatsappE164", "value": "+50589750052"}'
  ```
  Keys live in `convex/config.ts`.

## Where things live

```
src/
  App.tsx               # single-page composition
  components/           # one file per landing section
  components/BookingForm.tsx   # the heaviest piece — pricing UI + Convex submit
  lib/pricing.ts        # pure pricing engine (mirrors spec rate card)
convex/
  schema.ts             # bookings + config tables
  bookings.ts           # submit/list/byCode
  config.ts             # owner-tunable config + seed
public/
  CNAME                 # popoyochildcare.justinalydia.com
.github/workflows/
  deploy.yml            # builds and deploys to GitHub Pages
```

## Future expansion (per spec)

- Nanny profile cards + availability
- Recurring booking flow
- Spanish translation
- Admin dashboard (`bookings` table is already structured for this)
- Spa + childcare cross-sell with Popoyo Beauty
