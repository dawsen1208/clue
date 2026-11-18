# 收藏管理与反馈闭环 / Saved clues and feedback follow-up

Date: 2026-11-18 · Version 0.8.0

## 需求与设计决定 / Request and design decisions

项目提出者要求增加删除收藏路线的入口，以及查看个人反馈是否被处理、阅读回信的功能。此记录属于设计需求与实现记录，尚未构成参与者研究结论。

The project owner requested deletion of saved routes/clues and a way to check feedback handling and read replies. This records a design request and implementation, not participant research findings.

- 收藏页每条地点线索旁增加独立“删除”按钮，避免误触打开地点；删除后提供 12 秒“撤销”。地点详情的“已收藏”按钮仍可取消收藏。删除会更新收藏列表、数量和地图图钉标记；刷新后保留更改。保存的是地点 ID，并非经过测绘的实际路线。
- Each saved place has a separate Delete button, with a 12-second Undo. The Saved control in place details also removes a bookmark. The list, count and filed map pins update together and persist across reloads. Bookmarks retain place IDs, not surveyed routes.
- 导航常驻“反馈与回信”入口，包含“写反馈”“我的反馈与回信”。记录显示原文、关联地点、保存时间、状态、详情和回信。
- A persistent Feedback & replies entry provides Write a note and My notes & replies. Records include the original note, linked place, saved time, status, detail and reply.
- 新反馈始终为“待处理”，不因时间流逝自动变成已处理。可展开明确标注的演示工具，依次预览“处理中”“已回复”。回信示例可单独查看，不混入个人反馈。
- New notes always start Pending. Time alone never implies handling. Explicit demo tools preview In review and Replied; a separate sample reply does not become a personal submission.
- 已回复不等于问题已解决。示例回信与演示状态均标注来源，不能宣称学校已经收到、地点已经核实或工作人员已经修复问题。
- Replied does not mean resolved. Simulated states and replies cannot be taken as proof of university receipt, verified place information or a staff fix.

## 数据范围 / Data scope

反馈、模拟处理状态和回信信息保存在当前浏览器的 `clue:feedback:v1`；收藏使用现有 `clue:saved`。中英文页面共享同一浏览器来源的记录。没有用户账号、跨设备同步、真实后台处理或消息发送。清除站点数据会清除这些记录；浏览器存储不可用时会提示仅在当前页面保留。真实使用须另行设计授权、隐私、接收方、处理职责与保存期限。

Feedback records and simulated handling persist under `clue:feedback:v1`; bookmarks use the existing `clue:saved`. English and Chinese pages on the same origin share records. There is no account, device sync, real handling backend or message delivery. Clearing site data removes records; unavailable storage produces a page-only warning. Real deployment would need a separately designed consent, privacy, recipient, ownership and retention process.

## 已完成核对 / Completed checks

- JavaScript syntax checks and 21 automated checks pass, covering note validation, corruption recovery, explicit simulated status transitions, original-text preservation and existing guidance behaviour.
- Browser checks cover save/delete/undo, local persistence after reload, Pending → In review → Replied simulation, an isolated sample case, and Chinese/English labels. Narrow-screen feedback layout checked at 390px; desktop checked separately.
- These are implementation checks. Participant task testing remains outstanding.

## 下一轮用户测试 / Next participant tasks

1. 删除一个已收藏地点，随后撤销；观察是否能识别操作成功、是否误触进入导航。
   Delete a saved place and undo; observe recognition of success and accidental navigation.
2. 为某地点留下反馈，刷新页面后找到原记录；判断当前状态及是否收到回复。
   Leave a place-linked note, reload, find it again and identify its handling/reply status.
3. 预览回信后解释“已回复”和“已解决”的区别；检查演示标识是否足够清楚。
   Preview a reply and explain the difference between replied and resolved; check whether simulation labels are understood.

Codex协助开发原型和整理迭代记录。设计判断与真实用户研究由小组负责。

Codex assists with prototype development and organising iteration records. Design judgement and real user research remain the group's responsibility.
