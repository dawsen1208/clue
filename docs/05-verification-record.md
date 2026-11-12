# Verification record · 12 November 2026

## Automated checks

JavaScript syntax checks passed for the application, core logic and seed data. Six Node tests passed: alias search; no floor inference; source provenance; location-dependent toilet ranking and facility filters; campus-boundary handling; and GPS-accuracy guards for arrival prompting.

## Browser checks

- English room search: `arts 127` yields the intended room and explicitly shows an unconfirmed floor.
- Saving a place makes it appear in Saved.
- Changing the origin to TLB and enabling the adapted-toilet filter puts the TLB entry before the library entry.
- Manual building check-in triggers a clearly labelled floor-check prompt; proceeding through floor and place stages completes guidance.
- Chinese room `404` displays source-linked Fourth Floor information.
- Phone layout checked at 390 × 844: search and result cards, bottom navigation, and map/list switching.
- No application console errors observed in the checked flow.

## Not tested / not claimed

Live device-location accuracy, real walking routes, indoor positioning, real building access, lift operation, facility availability, actual room-door finding, or user-study effectiveness. GPS permissions were not enabled during browser QA. Proximity thresholds have only logic-level checks and need on-campus evaluation.

## Preservation

The original `dist/index.html`, `dist/en.html` and `dist/context.js` match the corresponding preserved copy by SHA-256. The old repository and live commute site were not changed during this redesign.

## Repository publication

The user created the new public repository, https://github.com/dawsen1208/greengo-uob-campus-find, and its visibility and write access were verified through the GitHub connector. The user also confirmed Pages Source = GitHub Actions. The initial publication includes code, the public seed directory, tests and design records; private exports, location records, timetable snapshots and secrets are excluded. A successful workflow and deployed page must be verified before reporting the site as live.
