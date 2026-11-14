# From campus position to the right door / 从校园位置到具体门口

2026-11-14 · Version 0.6.0

## Why this changed / 修改原因

The project owner felt the existing building–floor–place sequence was too simple. A destination label and floor number did not explain how someone would connect their campus position, a building entrance, floor signs and the final door. This is a design proposal from the project owner, not a finding from completed user research.

## Current concept flow / 当前交互流程

1. **Locate / 确认位置** — Show a simulated campus location, assumed permission and origin pin. Allow changing the reference location and opting into approach prompts. The user confirms the starting point.
2. **Building / 前往建筑** — Connect origin and building in the campus map. Give a scenario entrance-name-sign checkpoint; ask the user to confirm entry to the foyer. An opt-in timed approach prompt can suggest opening floor clues; the user still confirms the entrance.
3. **Floor / 找到楼层** — Emphasise the destination floor; explain checking the foyer directory, lift/stairs signs and landing labels. Same-floor destinations do not require changing floors. Allow an assumed lift/step-free preference.
4. **Inside / 室内线索** — Show the next room code or toilet sign, corridor/direction-sign checkpoints and a simple schematic floor plan. Ask the user to confirm seeing the matching sign.
5. **Confirm / 确认找到** — Ask whether the classroom door matches the destination, or whether the toilet and required facilities have been found and are usable. Only a positive user action opens Case closed.

Every intermediate stage allows returning to the previous clue. The campus map remains in the board; indoor guidance is an additional clue beneath it. Stage transitions retain the paper/red-thread design and respect reduced motion.

## Recovery / 未找到或无法使用

“Not found / cannot use it” keeps the current destination and offers reviewing indoor clues, rechecking the floor, recording a missing clue, and asking on-site staff when signs/access are unsuitable. Toilets additionally offer exploring other listed toilet clues. Feedback is local to this demonstration and is not sent to the university.

## Reality and assumptions / 真实能力与假设

This is a user-experience prototype under the assumption of complete location and indoor-routing technology. It does **not** request or read device GPS. The campus fix, entrance landmark, direction sign, corridor route and indoor plan are illustrative and unverified. Reusing one schematic does not establish actual room locations or accessible paths. The original sourced directory remains unchanged; source mode retains its source-only flow. No location event automatically declares success.

## Verification / 检查记录

- All frontend modules pass syntax checks. Fifteen automated tests pass, including guards against skipped checkpoints, early success controls and misleading toilet recovery.
- English classroom journey exercised through origin, building, floor, lift preference, indoor signs, final confirmation, not-found recovery, retry and user-confirmed case closure.
- Chinese toilet journey exercised through all five stages and alternative-toilet recovery.
- Mobile 390 × 844 checked: no horizontal overflow; campus and floor maps remain in the document. No console errors observed in the checked flow.
- These checks verify prototype interaction, not real navigation or GPS accuracy. No participant results have been generated.

## Next user study / 下一轮用户测试

Task A: From a chosen campus reference point, find a named classroom; explain which sign would be checked at each handover. Task B: Find a toilet with the needed facilities, then handle a missing sign or unusable facility. Observe wrong turns in the interface, requests for help, backtracking and whether users understand simulation labels. Ask whether each confirmation helps orientation or creates unnecessary effort. Compare text landmarks with the floor sketch before committing to greater indoor detail.

Tools: Codex assisted with bilingual interaction design, implementation, state guards, tests and documentation; the in-app browser checked the scenarios; the existing GitHub Actions workflow publishes the prototype. User research is still required to validate the design.

### 2026-11-14 map crop

The campus artwork is clipped to its right-hand geographic portion (original artwork coordinates x=786, y=47, width=946, height=1037). Printed building lists, the left key and bottom-right cultural-attractions legend are excluded. Default overview, destination focus, reset, pan limits and zoom limits share the cropped bounds. Building pins keep the original artwork coordinate system; source attribution remains on the Prototype notes page.
