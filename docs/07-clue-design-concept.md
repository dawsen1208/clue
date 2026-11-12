# Clue · Design concept / 设计提案

Recorded: 12 November 2026. This is a requested design revision, not a user-study finding.

## New framing / 新的前提

项目以用户为中心的设计为重点。当前真实功能与边界说明后，默认情景假设：系统具有完善的房间／楼层库、室内定位、可通行路线、设施状态和位置事件。前端据此呈现完整、可交互、可解释和可测试的体验，而不将尚未接入的技术作为每一步的障碍。

The prototype prioritises user-centred design. After explaining actual capabilities and limits, the default concept assumes a complete room/floor directory, indoor positioning, navigable routes, facility status and location events. The frontend presents a coherent, interactive and testable experience without making every missing integration interrupt the task.

This does not mean those services have been implemented or that fictional content is valid campus navigation.

## Brand and slogan / 品牌与口号

- **Clue**: a short name connecting searching, discovery and the next small piece of wayfinding information.
- **Follow the clue. Find your place.**
- **循着线索，找到去处。**
- Supporting line: **A little curiosity. A little less wandering. / 留一点好奇，少一点绕路。**

GreenGo names remain in historical documents and existing repository URLs to preserve design history and working links. The current interface uses Clue. No trademark or name-availability clearance is claimed.

## Visual approach / 视觉方向

The user supplied detective-board references. The interface borrows corkboard framing, paper case files, pins, handwritten notes, restrained red threads and a campus map. It does not copy reference images or watermarks. No criminal or frightening content is needed. Primary task labels remain literal: room search, toilet filters, campus map, floor and place.

使用参考图的“关系组织”与“纸质线索”语言，而非复制图片。地图仍是实际提供的学校地图；探案风格提供辨识度，不要求用户解谜。纸张、木框、图钉与连线由前端样式和图形实现。

## Experience / 流程

1. Short logo/magnifier entrance, skippable and disabled under reduced-motion preferences.
2. First-session explanation of real capabilities, assumed backend and simulated content.
3. Choose a room or nearby toilet; open a compact case file with building, floor and next action.
4. Follow building → floor → place guidance. The scenario includes a schematic indoor plan and a lift/stairs preference.
5. With the scenario reminder option enabled, a timed frontend location event demonstrates a proactive floor clue. Snooze, pause and mute remain available.
6. Confirm the destination, save it or record feedback within the demonstration.

## Two data layers / 两种数据层

| Layer | Behaviour |
| --- | --- |
| Sourced directory / 资料查看 | Uses `data.mjs`. Unknown floors remain null; no hypothetical indoor plan or scenario path. A source supports only its documented facts, not live availability. |
| Full concept / 完整设计演示 | Uses a separate `concept.mjs` overlay. Some missing floors, availability, travel time, path connections and the floor-plan layout are fictional. Every concept record is marked as a scenario. Original data is not mutated. |

Persistent mode label and the Reality & design assumptions panel explain the distinction. Detailed evidence remains available in place files. The schematic floor plan is visibly labelled as illustrative, not an actual building plan. Scenario origins do not read device position.

## Actual implementation / 真实实现

Frontend search/filtering, SVG campus-map pan/zoom, local bookmarks, hash-based screens, mode selection, state-based guidance, scenario event timers, feedback within page memory and animation. Some public source links are retained. No indoor/GPS tracking, real routing, live facility feed, backend or school message submission is connected.

The 8-second approach event is a design demonstration while a case is active, not actual movement detection. Manual replay is available for task tests. Snooze is five minutes; pausing, ending or leaving guidance cancels pending prompts. No background tracking or device-location permission request occurs.

## Evaluation still needed / 后续验证

- Does the style make the project memorable without reducing legibility?
- Can users locate a classroom and suitable toilet with few actions?
- Are mode labels, simulated floors and source provenance understood?
- Is the entrance/briefing burden acceptable, especially on mobile?
- Are prompt timing, content and controls useful and understandable?
- Does the indoor sketch communicate the intended navigation hierarchy without being mistaken for an actual plan?

These remain questions. No questionnaire, interview, focus-group result or navigation effectiveness has been invented.

## Preservation and tools / 版本与工具

The earlier Campus Find build is retained in GitHub history and a local pre-Clue snapshot. The original commute prototype remains separate. Codex assisted in naming, bilingual copy, implementation and documentation. The group must review the design, conduct real participant research and link future changes to evidence.
