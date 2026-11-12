# 地点数据核验 / Place data validation

The seed directory is deliberately small. Do not label all campus toilets as covered. Source-linked means a public document supports a fact; it does not mean a researcher checked it on site today.

## Current evidence

- Provided Edgbaston Campus Map, inherited from original project: building reference points and artwork. These are not surveyed room-door or entrance coordinates.
- [University Library room guide](https://www.birmingham.ac.uk/libraries/using/accessibility/ml-training-accessibility): room/floor labels used for the library room examples.
- [University Library facilities](https://www.birmingham.ac.uk/libraries/our-libraries/main-library): facility-type evidence.
- [AccessAble Library](https://www.accessable.co.uk/university-of-birmingham/access-guides/library) and [Teaching and Learning Building](https://www.accessable.co.uk/university-of-birmingham/access-guides/teaching-and-learning-building): toilet/access descriptions.
- [University teaching-room directory](https://conferences.bham.ac.uk/venues/lecture-theatres/): Arts room naming, not a verified floor mapping.

Sources consulted: 12 November 2026. Sources may change. No personal timetable, home address, API secret or participant record is included.

## Required field checks before practical indoor use

| Building / place | Exact entrance | Floor label | Door / nearby sign | Lift / step-free route | Access / opening | Date / checker |
| --- | --- | --- | --- | --- | --- | --- |
| Main Library room 404 | To check | Source-linked; field check pending | To check | To check | To check | Pending |
| Arts 127 | To check | Unknown | To check | To check | To check | Pending |
| TLB UG toilet | To check | Source-linked; field check pending | To check | To check | To check | Pending |

When a floor is confirmed, record the source, method and date. Do not derive G, UG, basement or level 1 from a room code alone. Do not insert corridors or turn instructions without a checked floor plan and permission to reuse it.

## Proximity limitations

Ranking uses geographic straight-line distance to approximate building centres. It ignores indoor walking, entrances, floor changes and live access. GPS must be within the main-campus bounds; automatic arrival prompting additionally requires reported accuracy of at most 60 m and distance under 70 m to the approximate building point. These are prototype thresholds requiring field evaluation, not validated reliability claims. A map-picked origin is a rough alignment and should be treated as a reference only.

## Data extension format

Edit `dist/data.mjs`. Keep building ID, room/facility ID, source key, nullable floor, aliases and bilingual display notes. Each new toilet needs a source and field-check status. Avoid creating a full campus toilet directory from assumed facilities in every building.
