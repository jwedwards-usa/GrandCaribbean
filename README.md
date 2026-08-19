# Grand Caribbean Condo Guide

A backend-free static website for **Grand Caribbean at Dune Crest** in Port Aransas, Texas. It is designed for GitHub Pages and provides:

- A landing page for the complex
- Client-side condo search and floor filtering
- One URL/page for each of the 40 condo unit numbers
- A shared data file so condo details and booking links are easy to maintain
- Responsive layouts for phones and desktops

## Local preview

Because the site uses only relative files, any simple static server works:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Updating condo information

Edit `data.js`. Each verified unit can override the generated defaults with fields such as `title`, `bedrooms`, `baths`, `guests`, `bookingUrl`, and `sourceLabel`.

The condo URLs use the pattern:

```text
/condos/3008/
/condos/4004/
```

All condo directories use the same lightweight HTML template and shared JavaScript renderer.

## GitHub Pages

After the site is on `main`, enable **Settings → Pages → Deploy from a branch**, choose the `main` branch and `/ (root)` folder, then save.

## Data policy

The site intentionally leaves unit-specific facts blank until a current public source is found. This avoids presenting stale rental-manager, capacity, or booking information as current.
