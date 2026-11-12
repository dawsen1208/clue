# Clue verification · 12 November 2026

This record describes the Clue redesign. Earlier verification records describe the previous Campus Find build.

## Completed

- JavaScript syntax checks passed.
- Nine automated tests passed, including the original directory checks and new checks that the scenario overlay does not mutate sourced data, modes remain distinct, and illustrative duration estimates are finite.
- English browser flow: ARTS 127 search → place file → start guidance → proactive prompt replay → floor clue → lift preference → destination confirmation.
- Source mode: ARTS 127 returns to an unknown floor and the hypothetical indoor plan is removed.
- Nearby adapted-toilet filter and TLB origin selection put the TLB candidate before the Main Library candidate.
- Chinese mobile layout checked at 390 × 844, including search/list, map toggle and zoom. Desktop breakpoint checked at 1366 × 900. Temporary viewport override reset after QA.
- Initial scope briefing, mode controls and persistent mode indicator checked. No browser application errors observed in the tested flow.
- Entry animation is short, skippable and bypassed when reduced motion is requested. It runs once per browser tab session; mode and briefing selection persist within the tab session.

## Explicit limitations

No real navigation, room-door location, GPS, indoor positioning, live opening/occupancy, message delivery or backend integration was validated. Floor paths and some floor values are fictional in concept mode. The source directory remains unchanged. No participant study has been carried out as part of these checks.

## Version preservation

The immediately preceding Campus Find files were copied to an ignored local pre-Clue snapshot before the rewrite. Previous versions remain in repository history. The original commute repository/site were not modified.
