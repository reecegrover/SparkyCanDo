# SparkyCanDo! — moving off Wix, step by step

This is a plain HTML/CSS/JS site — no build tools, no framework, nothing to install.
It's designed to replace https://sparkycando.wixsite.com/sparkycando.

## What's real vs. placeholder

- **Real, from the live Wix site:** hero text, the four gallery photos, email, and all social links.
- **Placeholder (marked with an "Edit me" tag in the page):** Commission Info steps, FAQ answers, Care Guide, Terms & Conditions. These Wix sub-pages couldn't be auto-scraped, so copy/paste your partner's existing text from the Wix editor into the matching spots in `index.html` and `terms.html`. Search for `edit-me` in the files to find every spot.

## 1. Get your images off Wix (do this before canceling Wix)

The gallery images currently point at Wix's CDN (`static.wixstatic.com`) so the site works today, but those links can break once the Wix site is taken down. Before that happens:

1. In the Wix editor, open Media Manager and download the original photos your partner wants to keep (the four already used, plus anything else from the real Gallery page).
2. Put them in a new folder: `assets/gallery/`.
3. In `index.html`, replace each `https://static.wixstatic.com/...` image `src` with the local path, e.g. `assets/gallery/kayto.jpg`.

## 2. Set up the contact form (2 minutes, optional but recommended)

The form currently points at a placeholder (`YOUR_FORM_ID`). To make it actually deliver emails:

1. Go to [formspree.io](https://formspree.io) and sign up free (50 submissions/month free tier).
2. Create a new form, point it at `SparkyCanDo@gmail.com`.
3. Copy the form endpoint it gives you (looks like `https://formspree.io/f/abcd1234`).
4. In `index.html`, replace `YOUR_FORM_ID` in the `<form action="...">` line with that ID.

If you'd rather skip this, just delete the `<form>` block — the `mailto:` link next to it already works with zero setup.

## 3. Put it on GitHub

```bash
cd sparkycando
git init
git add .
git commit -m "Initial site"
```

1. Create a new repo on GitHub (e.g. `sparkycando-site`) — don't initialize it with a README.
2. Push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/sparkycando-site.git
git branch -M main
git push -u origin main
```

## 4. Turn on GitHub Pages

1. On GitHub, go to the repo → **Settings** → **Pages**.
2. Under "Build and deployment", set **Source** to "Deploy from a branch".
3. Branch: `main`, folder: `/ (root)`. Save.
4. GitHub gives you a URL like `https://YOUR_USERNAME.github.io/sparkycando-site/` — that's your site, live, in about a minute.

## 5. Point the custom domain at it (since she already owns one)

Since your partner already owns the domain, you have two options — **A is simpler and recommended** for a domain that will *only* point to this site.

### Option A: apex/root domain (e.g. `sparkycando.com`)
1. In the repo, create a file named exactly `CNAME` (no extension) at the root, containing just her domain:
   ```
   sparkycando.com
   ```
2. At her domain registrar (GoDaddy, Namecheap, wherever she bought it), add these **A records** for the root domain, pointing to GitHub's IPs:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
3. If she also wants `www.sparkycando.com` to work, add a **CNAME record**: `www` → `YOUR_USERNAME.github.io`.
4. Back in GitHub → Settings → Pages, enter the custom domain in the "Custom domain" field and save (this writes the same CNAME file for you if you skip step 1). Check "Enforce HTTPS" once it's available (can take up to 24 hours for the certificate).

### Option B: subdomain (e.g. `www.sparkycando.com` only, no root)
Just the CNAME record from step 3 above — simpler, no A records needed. Root domain won't work with this option alone though.

DNS changes can take anywhere from a few minutes to 24 hours to propagate.

## 6. Cancel Wix

Once the new domain resolves correctly and everything looks right, cancel/downgrade the Wix plan.

---

### A note on the design
Dark, warm workshop palette (deep browns, amber "spark" accent) instead of a generic light template, with a hand-stitched dashed line as the recurring divider — a nod to it being a sewing/costuming business. Fonts are Fraunces (headlines) + Inter (body), loaded free from Google Fonts.

### If you want it to look different
Everything is controlled from `assets/style.css` under `:root` at the top — change the hex values there (`--bg`, `--spark`, `--ember`, etc.) to shift the whole palette without touching any other file.
