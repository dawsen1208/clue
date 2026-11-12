# 方向变更记录 / Direction change · 2026-11-12

## 决策 / Decision

小组将项目从“校外通勤＋校园到课”收敛为“伯明翰大学校园内具体小地点查找”。新原型独立开发，旧原型与仓库保留以支持设计演变说明。暂用名称 GreenGo · Campus Find。

The group narrowed the project from off-campus commuting and class arrival to finding specific places within the University of Birmingham. The new prototype is separate; the previous prototype and repository remain available as design history. Working name: GreenGo · Campus Find.

## 小组提出的理由 / Group rationale

原方向包含较多已有出行工具的组合，流程长、选择多，尚未充分证明解决核心痛点。小组希望深入“已经到学校，却找不到哪间教室、几楼或附近厕所”的具体问题。**这是小组的判断与待研究的假设，并非问卷或访谈所得结论。**

The group felt the previous direction combined existing travel tools without sufficiently demonstrating a distinct pain point. The new focus examines difficulty finding a room, floor or nearby toilet after reaching campus. **This is a group judgement and research hypothesis, not a reported user-study result.**

## 保留、移除与新增 / Keep, remove, add

| Category | 中文 | English |
| --- | --- | --- |
| 保留 | 品牌、双语、可拖动缩放的校园地图、建筑编号、已知房间线索、资料边界标识 | Brand, bilingual UI, pannable campus map, building codes, known room labels, visible uncertainty |
| 移出新原型 | 出行方式选择、公交／铁路班次、校外起点、碳排放展示、逐小时天气 | Mode selection, bus/rail schedules, off-campus origins, carbon display and hourly weather |
| 新增 | 房间检索、楼层卡片、附近厕所筛选、地点收藏、三阶段引导、到楼核对提醒、问题反馈下载 | Room search, floor cards, nearby-toilet filters, bookmarks, three-stage guidance, arrival floor check and local feedback downloads |

## 新问题定义 / New problem statement

如何在不夸大定位能力的情况下，帮助校园使用者更快确认“目的地点在哪栋楼、哪一层、如何继续查找”，并在需要时找到附近有资料支持的厕所？

How can a campus user identify the correct building and floor, understand the next finding step, and locate a nearby documented toilet without overstating positioning accuracy?

## 与设计挑战的关系 / Relation to the brief

交互：搜索、筛选、地图选点、位置授权、收藏与引导。外部输入：提供的校园地图、公开设施／房间指南，以及自愿获取的设备位置。主动干预：经授权后，在页面打开时接近目标建筑主动提示核对楼层；可暂缓、静音或停止。手动确认用于展示与测试同一提示机制，不冒充自动感知。技术完成度不是设计有效性的替代证据。

Interaction includes search, filters, map input, optional location, bookmarks and guidance. External inputs include the supplied map, public room/facility guides and optional device location. With consent, in-page proximity can initiate a floor-check prompt, with snooze, mute and stop controls. Manual check-in demonstrates the same mechanism without claiming automatic sensing. Technical implementation is not evidence of design effectiveness.

## PPT 应保留的证据 / Evidence to retain for slides

旧／新流程截图；小组讨论日期与理由；研究问题；候选方案及取舍；问卷 Pilot 修改；现场核验表；任务测试记录；由反馈引发的具体界面改变。尚未进行的活动标为计划。

Retain old/new flows, dated group rationale, research questions, alternatives and trade-offs, pilot revisions, field checks, usability observations and concrete feedback-driven changes. Label unfinished activities as planned.
