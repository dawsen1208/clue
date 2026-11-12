# GreenGo · Campus Find

A separate, bilingual University of Birmingham micro-wayfinding prototype. The original GreenGo commute prototype and its repository remain unchanged.

Repository: https://github.com/dawsen1208/greengo-uob-campus-find

Pages address after successful deployment: https://dawsen1208.github.io/greengo-uob-campus-find/

## Try it

Serve `dist/`, or run `npm start` and open http://127.0.0.1:8788. Chinese: `index.html`; English: `en.html`. No dependencies, secrets, transport API or build step are required.

Find a classroom or nearby listed toilet → check building, floor and evidence → use building–floor–place guidance. Save favourite place IDs in this browser. Download issue notes locally.

## Scope and data

- Public seed directory: 10 building reference points, 10 room labels and 4 toilet entries in 2 buildings.
- Search matches room codes, building codes and bilingual names.
- Distances are straight-line distances to approximate building centres. Map-picked origins use a rough alignment; they are reference points, not surveyed coordinates. Ranking does not account for floors, entrances, walls, access restrictions or path length. It cannot promise the nearest usable toilet on campus.
- Known floors have linked public sources. Other floors remain `null`; G19, UG04 and 127 never trigger automatic floor inference. Source-linked is different from field-verified.
- Map artwork is retained from the supplied campus map in the original prototype. University copyright remains with its owner. This is an unofficial student research prototype, not an endorsed university service.
- No verified indoor floor plan, indoor turn-by-turn routing, live opening status, occupancy detection or room access feed.
- Sources and review date are included in `dist/data.mjs` and the About page.

## Proactive interaction and control

Optional arrival assistance requests location only after an explanation and explicit action. While this page is open, an accurate-enough fix near the approximate destination building can trigger a floor-check prompt. This does not prove arrival at an entrance or room. It offers snooze, mute and stop controls. Manual building check-in provides a testable fallback. No background tracking. Location is not stored or sent to a server; bookmarks store place IDs only.

## Verification and deployment

`npm run check` checks syntax. `npm test` checks search aliases, floor provenance, location boundaries, filtering, ranking and proximity guards. GitHub Actions runs both and deploys `dist/` to Pages when Pages is configured with Source = GitHub Actions. Pull requests run checks only.

## Design record

See `docs/01-direction-change.md`, `docs/02-user-study-plan.md`, `docs/03-data-validation.md`, `docs/04-implementation-log.md` and `docs/06-group-direction-record.md`. These distinguish group decisions, design assumptions, sourced facts and research still to carry out. No interview results or participant findings have been fabricated.

Preserved original: https://dawsen1208.github.io/greengo-uob-commute/
