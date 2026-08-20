# Booking-channel audit

Checked **2026-08-19**. This audit is intentionally stricter than a general web search: a booking link is added only when the public page can be tied to the exact condo by unit number, STR/registration number, exact property name plus operator, or an exact property/layout match. Generic Grand Caribbean search pages are not treated as exact-unit channels unless the exact condo is visibly surfaced there.

The goal is price comparison, so direct manager pages and third-party booking platforms are both retained. Visitors should enter the same dates and guest count on every channel and compare the final checkout total, including cleaning/service fees, taxes, cancellation terms and payment-card charges.

## New or improved booking channels

| Unit | Channel | URL | Exact-match basis |
|---|---|---|---|
| 2001 | Airbnb | https://www.airbnb.com/rooms/1251486128823478988 | `2001GC: Turtley Awesome`; Life in Paradise host; 3 BR / 3 BA / 8 guests |
| 2001 | Vrbo | https://www.vrbo.com/4180112 | `2001GC: Turtley Awesome` exact-unit title |
| 2002 | Vrbo | https://www.vrbo.com/9662522ha | Same Evolve title/layout; STR 200105630 |
| 2002 | Booking.com | https://www.booking.com/hotel/us/beachfront-port-aransas-condo-with-ocean-views.html | Same Evolve title/operator/layout as exact Unit 2002 listing |
| 2005 | Stayz | https://www.stayz.com.au/d/137423/grand-caribbean-at-dune-crest | Grand Caribbean inventory visibly surfaces `Indigo Breeze`; 2 BR / 2 BA / sleeps 4 |
| 2008 | Silver Sands | https://silversandsvacationrentals.com/property/af70d671-b8f6-4e8c-8ba1-77a55f2ea397 | `Shore Thang` direct manager listing |
| 2008 | Airbnb | https://www.airbnb.com/rooms/1155872932386109741 | `Shore Thang`; STR 200105642; Silver Sands host |
| 2008 | Vrbo | https://www.vrbo.com/4002543 | `Shore Thang`; STR 200105642 |
| 2009 | Airbnb | https://www.airbnb.com/rooms/17775144 | Exact STR 200105644 |
| 2009 | Sand Key Vacation Rentals | https://www.sandkeyvacationrentals.com/winter-texan-monthly-rents | Exact `Grand Caribbean Unit 2009`; 3 BR / 3 BA / 8 guests; Book Now surfaced |
| 3002 | Ostrovok | https://ostrovok.ru/hotel/united_states_of_america/port_aransas/mid8760464/grand_carribean_agc_3002_2/ | Exact `Grand Carribean AGC 3002`, 5495 State Highway 361; current rates exposed |
| 3002 | T-Bank Travel | https://www.tbank.ru/travel/hotels/new/hotels/1843624/ | Exact `Grand Carribean AGC 3002`, 5495 State Highway 361 |
| 3002 | JTB | https://www.jtb.co.jp/ovs_htl/detail/search_detail/1066531/ | Exact `Grand Carribean AGC 3002`, 5495 State Highway 361 |
| 3002 | Hotels.ru | https://www.hotels.ru/rus/hotels/united_states/port_aransas/grand_carribean_agc_3002.htm | Exact `Grand Carribean AGC 3002`; separate booking/payment route |
| 3002 | Skyscanner comparison | https://www.skyscanner.com.au/hotels/united-states/port-aransas-hotels/grand-carribean-agc-3002/ht-158617952 | Exact title and 5495 State Highway 361; meta-search compares rates across hundreds of supplier sites |
| 3004 | Airbnb | https://www.airbnb.com/rooms/1081869189988434900 | Exact `Gulf'n My Life Away` + Starkey/Portoro operator match |
| 3004 | Portoro | https://www.portoro.com/properties/gulfn-my-life-away-starkey-by-portoro | Exact `Gulf'n My Life Away`; Portoro identifies a third-floor Grand Caribbean condo, 2 BR / 2 BA / 6 guests, with direct Book now inventory |
| 3007 | Airbnb | https://www.airbnb.com/rooms/1421165774159268720 | Exact STR 200105660 |
| 3007 | Vrbo | https://www.vrbo.com/4502644 | Exact STR 200105660 + Port A Escapes listing identity |
| 3010 | Portoro | https://www.portoro.com/properties/beach-haven-starkey-by-portoro | Exact `Beach Haven`; Portoro identifies a third-floor Grand Caribbean condo, 3 BR / 3 BA / 8 guests, with direct Book now inventory |
| 4001 | Airbnb | https://www.airbnb.com/rooms/1329922891657403234 | Exact STR 200105668 |
| 4001 | Vrbo | https://www.vrbo.com/4347177 | Exact STR 200105668 + Port A Escapes listing identity |

For **Unit 2008**, the old generic Vrbo/Silver Sands unit-selector link is replaced at runtime by the direct Silver Sands property page plus exact Airbnb and exact Vrbo pages. The exact rental name `Shore Thang` is also applied.

### GC3002 focused follow-up

A second focused sweep was run after the initial audit because Expedia-family distribution did not provide useful price-comparison diversity. The Hotels.com mirror is therefore omitted from the site as redundant with Expedia. Exact non-Expedia inventory was validated on Ostrovok, T-Bank Travel, JTB and Hotels.ru.

A further sweep found an exact Skyscanner property page for `Grand Carribean AGC 3002` at 5495 State Highway 361. Skyscanner states that it compares this exact property across hundreds of supplier sites. It is included as a **comparison engine**, not counted or described as a direct owner/manager booking page.

Portoro was checked directly because it manages other Grand Caribbean condos. Exact Portoro pages were validated for **GC3004 / Gulf'n My Life Away** and **GC3010 / Beach Haven**, and those direct manager links are now attached to their condo pages. Portoro's current Port Aransas inventory and indexed property pages did not surface `3002`, `AGC 3002`, `Grand Caribbean`, or `Grand Carribean` as an exact Unit 3002 match, so no Portoro link is attached to GC3002 unless that exact unit becomes identifiable there later.

Searches across the major Port Aransas managers and common owner-direct/vacation-rental networks still did not expose an independently indexed owner-direct or local-manager book-now page for exact GC3002. The additional GC3002 booking links are therefore labeled accurately as third-party distributors or comparison tools rather than direct/owner booking.

## Audit exception

**GC1010** remains a live Port A Escapes rental with a current public calendar, but this audit did **not** validate an exact second booking platform. Searches using `GC1010`, `#1010 Grand Caribbean`, the exact street/unit address, and the known unit details did not surface an exact Airbnb, Vrbo, Booking.com, Expedia, Hotels.com or Stayz mirror. The site therefore flags GC1010 as the single-platform exception rather than adding a generic or guessed link.

This leaves **22 of 23** currently `verified` / `Book online` condos with at least two validated booking platforms or booking surfaces for comparison, with GC1010 explicitly disclosed as the sole exception found on 2026-08-19.
