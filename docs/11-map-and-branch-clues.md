# Map first, clues extend / 地图保留，线索延伸

Date: 2026-11-13 · Version 0.5.0

## Feedback and decision / 反馈与决定

The project owner observed that Trending clues obscured most of the map and asked for building selection to extend into a new clue connected by red string. This is design feedback from the project owner, not a participant research finding.

此前的榜单和档案浮在地图上，遮住了主要空间信息。本轮将地图作为持续保留的空间背景，榜单、匹配地点及地点档案放在地图外的线索延伸区。避免用户在“看列表”与“看地图”之间反复切换。

## Implemented / 本轮实现

- Desktop: map on the left, clue collection/file on the right, with no card covering the map.
- Mobile: map above, clue collection/file below, rather than an overlaid sheet. Both remain in the same document; scrolling is required on small screens.
- Selecting a building highlights its pin, draws a red string to the external clue pin, and unfolds the paper file. Multiple-place buildings first list their matching destinations.
- Selection returns to the campus overview instead of automatically zooming into a cropped area. Manual pan/zoom remains available; the string endpoint follows the selected pin.
- Floor guidance opens an extra floor clue beneath the board. It does not replace or hide the outdoor map.
- Red thread drawing (650 ms), paper unfolding (460 ms), and floor-clue arrival (480 ms) bridge the states. Reduced-motion preference removes these movement effects.
- Search, 7/30-day illustrative Top 10, facility filters, saved places, source mode and both languages remain available. Map overview resets the map without concealing the file.

## Meaning and boundaries / 含义与边界

The new red string indicates a relationship between a building and its clue file; it is not a walking route. The separate scenario guidance path, indoor sketch, counts, floors and timing retain their existing demo/source distinctions. No new backend, location collection or real popularity analytics were introduced. The previous commute prototype remains unchanged.

## Verification / 检查

- All 12 existing directory, concept and popularity tests pass; all frontend modules pass syntax checks.
- Browser at 1366 × 900: building-to-file interaction, group selection (Main Library, five places), and 7/30-day ranking checked. Map/file intersection area is 0 px²; selecting Arts retains viewBox `900 430 800 630`.
- Browser at 390 × 844: map/file intersection area is 0 px², map lies above the file, no horizontal page overflow. Overview remains unchanged on selection.
- Entering the building keeps the outdoor map visible and displays the additional floor clue.
- English and Chinese initial screens checked; no console errors observed in the tested English flow.
- These are implementation checks, not field navigation validation or a user study. Next study: can participants understand the pin–thread–file relationship, retain spatial context, and distinguish the relationship string from a route?

Tools: Codex assisted with interface design, bilingual copy, frontend changes, documentation and verification. Browser checks used the in-app browser; repository deployment uses the existing GitHub Actions workflow.
