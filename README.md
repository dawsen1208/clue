# Clue

**Follow the clue. Find your place.**

A user-centred campus wayfinding design prototype for the **University of Birmingham, Edgbaston campus**. Clue connects a campus position, a building, a floor, indoor landmarks and the final classroom or toilet into one guided journey.

[Open prototype · English](https://dawsen1208.github.io/clue/) · [中文原型](https://dawsen1208.github.io/clue/zh.html) · [Project overview · 中英双版](docs/13-clue-project-overview.md) · [Repository](https://github.com/dawsen1208/clue)

> **Design prototype:** the experience assumes complete location and indoor-navigation services. GPS fixes, indoor paths, some floors, availability, popularity counts and travel times are clearly labelled scenarios. The prototype does not read device GPS or provide verified real-world navigation.

## The problem

Finding the right building is only part of arriving. Someone unfamiliar with campus may still need to identify the entrance, interpret floor labels, find a corridor sign and match a door code. Locating a nearby toilet also involves facilities and access needs. Clue focuses on these small-place wayfinding tasks within campus.

These are problem hypotheses to investigate through user research; the prototype itself is not evidence that the problem or solution has been validated.

## Who it is for

- New, international and visiting students unfamiliar with campus buildings and room codes.
- Students attending a class in an unfamiliar building or room.
- Campus users looking for a listed toilet, including adapted or gender-neutral facilities.
- Visitors who need help connecting a campus map to a specific destination.

Access-related interactions are included for investigation. Accessibility, usability and real routes have not been validated with the relevant user groups.

## The idea: a trail of spatial clues

**Campus position → building → floor → indoor landmark → confirmed destination.**

A building pin extends into a place file, connected by a red thread. The campus map stays visible alongside the file on desktop and above it on mobile. Floor sketches add another clue rather than replacing the map. The detective-board style makes relationships visible; it does not require users to solve a puzzle.

Clue's proposed distinction is the handover between these scales, supported by timely prompts, visible progress, user confirmation and recovery when a clue is missing. This is a design proposition, not a claim of a globally unique invention or proven advantage over existing services.

## Try the journey

1. **Find a destination:** search by room/building code, choose a map pin, explore listed toilets, or open an illustrative Trending clue.
2. **Locate:** check a simulated campus origin, change the reference position if needed, and choose whether to allow approach prompts for the demonstration.
3. **Building:** follow the campus connection and check the example entrance name sign before confirming entry.
4. **Floor:** check the destination floor and example foyer directory, lift/stairs and landing signs. Try a lift/step-free preference.
5. **Inside:** use a simple floor sketch, direction-sign example and room/toilet sign to approach the destination.
6. **Confirm:** explicitly confirm finding the place. If it is missing or unusable, review indoor clues, recheck the floor, record an issue or explore another listed toilet.

The five-stage guidance is **Locate → Building → Floor → Inside → Confirm**. The initial destination search precedes that guidance. The demonstration can be ended, and intermediate stages allow returning to the previous clue.

## Current features

- English by default; a separate Chinese interface.
- Room/building-code search, destination files, map pins and bookmarks.
- Pannable/zoomable campus map cropped to the right-hand geographic artwork, excluding printed legends.
- 7/30-day illustrative Top 10 clues; no actual student search statistics are collected.
- Toilet facility filters and ranking from a scenario/reference origin.
- Five-stage classroom/toilet journey, schematic indoor clues and explicit arrival confirmation.
- Optional timed approach prompts with replay, snooze, pause and mute controls.
- Paper, pins and red-thread transitions; skippable opening and reduced-motion support.
- Source view for inspecting the original directory without filling in unknown floors.

## What works and what is assumed

| Layer | Current scope |
| --- | --- |
| Implemented frontend | Search, filters, state transitions, interactive map, bookmarks, prompt controls, stage progression, confirmation and recovery. |
| Sourced seed directory | 10 building reference points, 10 room entries and 4 toilet entries in 2 buildings. Public sources are linked where available. Coverage is partial. |
| Assumed services | Accurate campus/indoor positioning, a complete room/floor database, verified routes and entrances, facility availability and appropriate location events. |
| Simulated presentation | Campus fix, generic entrance/sign checkpoints, indoor floor sketch, routes, some floors, times, status and popularity counts. |

Source-linked information is not field verification. Unknown source floors remain unknown; room codes do not automatically determine floors. Proximity uses approximate building-centre distances, not verified walking routes, and cannot guarantee the nearest usable toilet. The lift preference does not establish an accessible route.

No school authentication, live GPS, indoor positioning, occupancy feed, background tracking or university messaging service is connected. Bookmarks store place IDs in this browser; feedback and simulated replies persist in this browser. No real feedback recipient is connected. No personal timetable, precise location or credentials are published.

## Local preview

Requires a supported Node.js installation; Node 22 is used in CI. No external packages or API keys are required.

```sh
npm start
# Open http://127.0.0.1:8788/
npm run check
npm test
```

Alternatively, run `node preview.mjs` and serve the existing `dist/` files. Entry points: `index.html` / `en.html` for English, `zh.html` for Chinese. No build step is needed.

## Deployment

The existing [GitHub Actions workflow](.github/workflows/deploy.yml) checks syntax and runs tests before deploying `dist/` to GitHub Pages after a push to `main`. Pull requests run checks without deploying. Pages must use **GitHub Actions** as its source.

Current repository: `dawsen1208/clue`. Current Pages base: `https://dawsen1208.github.io/clue/`. Interface assets and navigation use relative URLs. The repository was previously named `greengo-uob-campus-find`; historical records may refer to that name. Use the current links above.

## Design and research records

- [Project positioning, goals, audience, flow and unique idea · 中英双版](docs/13-clue-project-overview.md)
- [Group direction and rationale](docs/06-group-direction-record.md)
- [Design concept and assumptions](docs/07-clue-design-concept.md)
- [Map and red-thread clue extensions](docs/11-map-and-branch-clues.md)
- [Campus-to-door journey, recovery and next study](docs/12-campus-to-door-journey.md)
- [User-study plan](docs/02-user-study-plan.md) · [Data validation](docs/03-data-validation.md)

These records separate project-owner/group decisions, assumptions and completed checks from participant findings. No questionnaire, interview or task-test results have been fabricated. Next research should test whether landmarks help orientation, confirmations add useful control, and the visual metaphor improves clarity without increasing effort.

## Sources and project history

The campus artwork comes from the supplied Edgbaston Campus Map. Copyright remains with the University of Birmingham and other relevant rights holders. Sources are listed in `dist/data.mjs` and the Prototype notes page. This is an unofficial student design project, not a university-endorsed navigation service. No blanket open-source licence is asserted for third-party artwork.

The [earlier commute prototype](https://dawsen1208.github.io/greengo-uob-commute/) is preserved separately as design history. Clue's current scope is finding specific places within campus; off-campus transport planning is outside this version.

---

## 中文简介

**Clue 是面向伯明翰大学校园内具体地点查找的主动式导航设计原型。** 它关注从校园当前位置到教学楼、楼层、室内参照点，再到具体教室或厕所的连续体验。

核心目标是减少“已经到了楼附近，却仍找不到具体地方”的不确定感。主要面向不熟悉校园的新生、国际学生、到陌生教学楼上课的学生，以及需要查找校园设施的使用者。

设计以“线索”串联不同空间尺度：建筑图钉通过红线延伸到地点档案；校园地图持续保留；室内示意图补充楼层、走廊和门口线索；最后由使用者确认是否找到。未找到时可返回核对或寻找其他厕所。

当前是用于用户研究和设计测试的中英文交互原型，定位、室内路径及设施状态等仍为明确标注的假设。详见[中英双版项目概览](docs/13-clue-project-overview.md)。

## Group review update · 2026-11-17

Version 0.7.0 adds browser-local trail drafts (Continue/Clear, seven-day recovery), partial guidance updates that retain the campus canvas, icon/checkpoint guidance, a persistent Recommended/Feedback navigation, illustrative 3D/2D floor switching and a three-height draggable mobile clue sheet over the map. Drafts are not synced or uploaded. 3D layers are not surveyed building models. See [the meeting feedback and design decisions](docs/14-group-review-2026-11-17.md). Group feedback is recorded separately from participant research evidence.


## Saved clues and feedback update · 2026-11-18

Version 0.8.0 adds individual saved-clue deletion with Undo, plus Feedback & replies with browser-local notes, Pending / In review / Replied progress, linked-place details and clearly labelled simulated replies. New notes stay pending until an explicit demo action. A sample reply can be previewed independently. See [design decisions, scope and checks](docs/15-saved-clues-and-feedback-2026-11-18.md).

新增收藏删除与撤销；反馈与回信档案支持查看本地反馈原文、关联地点、处理状态及演示回信。没有真实后台处理或学校消息发送。


## Visual wayfinding update · 2026-11-18

Version 0.9.0 replaces the default concept journey's written checkpoint lists with origin/building diagrams, a highlighted floor stack, corridor arrows, door-sign matching and visual recovery controls. Short action labels remain; detailed help is collapsible. The mobile sheet focuses each checkpoint and lowers for a larger indoor sketch. See [visual design decisions and validation](docs/16-visual-wayfinding-2026-11-18.md). All diagrams remain explicitly illustrative.

找教室流程改为图形优先：起点 → 建筑 → 楼层 → 门牌 → 确认。保留简短操作、可展开说明、演示标识、无障碍描述与未找到时的恢复入口。


## Optional voice update · 2026-11-18

Version 0.10.0 adds an opt-in Voice guide to the graphical journey, using the earlier detailed written instructions. Voice defaults off on each page load and offers Replay and Stop. Step changes replace old speech; leaving the guide or hiding the page stops it. English/Chinese speech uses available browser/device voices, with a visible fallback when unavailable. See [voice behaviour and verification limits](docs/17-optional-voice-guide-2026-11-18.md).

新增默认关闭的语音指引，沿用此前详细文字，支持重播与停止。图形页面保持不变；“更多提示”可查看播报全文。音色与可用性依赖浏览器和设备。
