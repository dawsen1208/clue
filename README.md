# Clue · Campus wayfinding design prototype

A bilingual University of Birmingham micro-wayfinding design prototype. Brand: Clue. Slogan: Follow the clue. Find your place. The original commute prototype remains unchanged.

Repository: https://github.com/dawsen1208/greengo-uob-campus-find

Pages address after successful deployment: https://dawsen1208.github.io/greengo-uob-campus-find/

## Try it

Serve `dist/`, or run `npm start` and open http://127.0.0.1:8788. English (default): `index.html` or `en.html`; Chinese: `zh.html`. No dependencies, secrets, transport API or build step are required.

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

## Unified casebook update

All screens now share the paper-file, corkboard, pin and thread system. The opening unfolds the campus map, lands pins and clue cards, traces a thread and reveals the wordmark. It is skippable, replayable from Prototype notes, and bypassed for reduced motion. See docs/09-unified-casebook-and-motion.md.


## Trending clues map workspace

The map, shared search, time-window Top 10 and place/guidance panels now form one workspace. Popularity uses clearly labelled fictional counts for Last 7 days / Last 30 days; no student queries are collected. Map pins open a destination or a choice of destinations in the building, followed by Go here (demo). See docs/10-trending-clues-map-workspace.md.


## Map and clue extensions · 2026-11-13

Version 0.5.0 keeps the campus map beside the clue file on desktop and above it on mobile. Selecting a building draws a red relationship string into the external clue file; indoor guidance adds a floor clue without hiding the campus map. See `docs/11-map-and-branch-clues.md` for the feedback, alternatives, motion and verification record. This supersedes the overlay/full-map interaction in version 0.4.0.

## Campus-to-door journey · 2026-11-14

Version 0.6.0 extends the concept flow to Locate → Building → Floor → Inside → Confirm. It adds scenario entrance/direction-sign checkpoints, explicit user confirmation, previous-step controls and not-found/cannot-use recovery, including alternative toilets. See `docs/12-campus-to-door-journey.md`. Positioning and indoor paths remain assumptions, not verified services. Source mode stays source-only. Fifteen automated tests pass.
