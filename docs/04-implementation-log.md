# Implementation and tools · 2026-11-12

## Tools used

- Codex / generative AI assisted in restructuring the UI, writing bilingual copy, implementing interactions and drafting research plans. Generated materials require human review; they are not user-study evidence.
- Existing GreenGo source and supplied campus map were used as starting materials.
- Official university pages and AccessAble were consulted for specific public facts. Links are recorded in the directory and data-validation document.
- JavaScript, HTML and CSS implement the prototype; Node runs syntax checks and automated logic tests.
- Browser interaction is used to verify visible workflows. GitHub stores the new prototype and, when configured, Actions validates/deploys it.

## Design decisions implemented

1. Replace commute choices with a focused place search and map.
2. Keep unknown floors explicit rather than infer from room numbers.
3. Show the floor prominently, with evidence one click away.
4. Restrict nearby results to a declared pilot directory and explain distance basis.
5. Use three short guidance stages instead of a long information page.
6. Add controlled, optional arrival prompting without claiming indoor location sensing.
7. Preserve the old project; do not import its private class snapshot or transport secrets.

## Still to evaluate

User need and relative priority of rooms versus toilets; interpretation of UK floor labels; whether proximity information is useful without verified indoor routing; notification tolerance; accessibility of the interaction; task completion compared with existing solutions. These are open questions, not proven benefits.

## Next iteration inputs

Verified room-floor mappings, permitted floor plans, a field-checked list of toilets and entrances, opening/access constraints, and observations from real users. Keep changes linked to evidence rather than expanding features first.
