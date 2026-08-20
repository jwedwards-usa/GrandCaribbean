# Grand Caribbean Condo Guide

Static GitHub Pages directory for Grand Caribbean in Port Aransas, Texas.

**Live site:** https://jwedwards-usa.github.io/GrandCaribbean/

## Structure

- `index.html` is the directory entry point.
- `condos/` contains the canonical per-condo route entry points.
- `units/` preserves legacy URLs and redirects them to `condos/`.
- `assets/bootstrap.js` loads the data required for the requested page.
- `assets/render.js` renders the directory and condo detail views.
- `assets/carousel.js` and `assets/carousel.css` provide the shared rental-photo carousel.
- `assets/price-compare.js` adds booking-platform comparison guidance.
- `assets/data/units-*.js` contains the static condo research records.
- `assets/data/galleries-*.js` contains exact-unit gallery records, grouped by floor.
- `assets/data/overrides.js` applies verified booking updates and builds the booking-platform index.
- `docs/booking-sources.md` and `docs/gallery-sources.md` record source provenance.

## Development

The site has no build step, package manager, backend, or runtime dependency. Serve the repository with any static HTTP server and open `index.html` through that server.

## Data policy

Unit details come from on-site photos captured in August 2026 and linked public rental or property sources. STR registration, occupancy, management, pricing, availability, and property information can change; the site keeps source dates visible and directs visitors to verify current details with the linked source.

Images are requested at reduced dimensions where the source or image proxy supports it to limit bandwidth.
