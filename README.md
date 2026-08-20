# Grand Caribbean Condo Guide

A backend-free static website for **Grand Caribbean at Dune Crest** in Port Aransas, Texas. It is designed for GitHub Pages and provides:

- A simple landing page and client-side condo search
- One URL/page for each of the 40 condo unit numbers
- Separate public-listing and on-site-rental-reference fields
- Floor filtering plus search by unit, manager, phone number, or STR number
- A small optimized photo set from the property
- Responsive layouts for phones and desktops

## Local preview

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Updating condo information

Edit `data.js`. Public booking data uses fields such as `title`, `bedrooms`, `baths`, `guests`, `bookingUrl`, and `sourceLabel`.

On-site rental placards use a separate `rentalReference` object with `name`, `phone`, `maxOccupancy`, `strNumber`, `observedDate`, and `source`. Keeping these separate matters when an online listing and a photographed placard name different managers.

The condo URLs use the pattern:

```text
/condos/3008/
/condos/4004/
```

## Photo policy

Photos in `assets/photos/` are intentionally resized to roughly 480–640 pixels and encoded as WebP. The current three-photo set is about 22 KB total. Gallery images use native lazy loading. On-site rental placards are transcribed into structured reference data rather than loading large sign photos on every page.

## GitHub Pages

After the site is on `main`, enable **Settings → Pages → Deploy from a branch**, choose the `main` branch and `/ (root)` folder, then save.

## Data policy

The site avoids presenting unverified unit details as fact. Public booking pages, on-site placards, and common-area photos are labeled by source and context. Rental contacts and managers can change, so users should confirm current management before paying or booking.
