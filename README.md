# Clue · Campus wayfinding design prototype

A bilingual University of Birmingham micro-wayfinding design prototype. Brand: Clue. Slogan: Follow the clue. Find your place. The original commute prototype remains unchanged.

Repository: https://github.com/dawsen1208/greengo-uob-campus-find

Pages address after successful deployment: https://dawsen1208.github.io/greengo-uob-campus-find/

## Try it

Serve `dist/`, or run `npm start` and open http://127.0.0.1:8788. Chinese: `index.html`; English: `en.html`. No dependencies, secrets, transport API or build step are required.

Find a classroom or nearby listed toilet → check building, floor and evidence → use building–floor–place guidance. Save favourite place IDs in this browser. Download issue notes locally.

## Current design mode

The default experience assumes a complete backend after a first-session scope briefing. Scenario floors, availability, times, red paths and schematic indoor plans are fictional and labelled. Source view preserves the unmodified public directory and unknown floors. No real positioning or backend is connected. See docs/07-clue-design-concept.md for the current design framing. Earlier records describe earlier versions.

## Scope and data

- Public seed directory: 10 building reference points, 10 room labels and 4 toilet entries in 2 buildings.
- Search matches room codes, building codes and bilingual names.
- Distances are straight-line distances to approximate building centres. Map-picked origins use a rough alignment; they are reference points, not surveyed coordinates. Ranking does not account for floors, entrances, walls, access restrictions or path length. It cannot promise the nearest usable toilet on campus.
- Known floors have linked public sources. Other floors remain `null`; G19, UG04 and 127 never trigger automatic floor inference. Source-linked is different from field-verified.
- Map artwork is retained from the supplied campus map in the original prototype. University copyright remains with its owner. This is an unofficial student research prototype, not an endorsed university service.
- No verified indoor floor plan, indoor turn-by-turn routing, live opening status, occupancy detection or room access feed.
- Sources and review date are included in `dist/data.mjs` and the About page.

## Proactive interaction and control

The approach prompt is a timed frontend scenario while guidance is active, with replay, snooze, pause and mute controls. It does not read device location. The illustrative floor plan and lift/stairs path test the intended interaction, not actual indoor navigation. Bookmarks save place IDs locally; feedback stays in page memory.

## Verification and deployment

`npm run check` checks syntax. `npm test` checks search aliases, floor provenance, location boundaries, filtering, ranking and proximity guards. GitHub Actions runs both and deploys `dist/` to Pages when Pages is configured with Source = GitHub Actions. Pull requests run checks only.

## Design record

See `docs/01-direction-change.md`, `docs/02-user-study-plan.md`, `docs/03-data-validation.md`, `docs/04-implementation-log.md` and `docs/06-group-direction-record.md`. These distinguish group decisions, design assumptions, sourced facts and research still to carry out. No interview results or participant findings have been fabricated.

Preserved original: https://dawsen1208.github.io/greengo-uob-commute/
