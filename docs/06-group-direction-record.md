# 小组方向调整记录 / Group direction change

记录日期 / Recorded: **12 November 2026**。
来源 / Basis: 用户转述的小组讨论结果和随后明确的原型要求。记录日不自动等于会议日。

用途：作为总设计演变记录第14阶段的详细材料，供最终主要 PPT、过程 PPT 和 viva 使用。原有13个阶段保留，不重写为新方向一直存在。

## 1. 本次决定 / The decision

将项目从“课表驱动的校外＋校内通勤助手”收窄为“伯明翰大学校园内的小地点查找助手”。暂用名称 **GreenGo · Campus Find**。新原型独立开发并使用新仓库；旧通勤原型、旧网站与旧仓库保留作比较和历史证据。

Narrow the project from a timetable-driven off-campus and on-campus commute assistant to a micro-wayfinding assistant within the University of Birmingham. Working name: **GreenGo · Campus Find**. Develop it separately, retaining the commute prototype, website and repository as historical evidence and a comparison point.

## 2. 改变之前 / Before the change

系统试图连接课表、出发地、天气、公交／火车、校园到达点、建筑和教室，并在关键时机建议出发或提醒行程。流程较长，涉及多个不同问题及较多输入、数据与选择。

The system linked classes, origin, weather, bus/train travel, campus arrival, building and room, with departure advice and journey prompts. This combined several problems and required multiple inputs, data sources and choices.

## 3. 为什么改变 / Why the group changed direction

小组认为，原方案较像把已有软件连接起来，仍未很好证明它解决了一个足够具体的用户痛点。与其继续扩大通勤功能，小组选择深入“到了学校，仍找不到真正需要的地点”的问题。

The group felt the earlier concept resembled a connection between existing tools and had not sufficiently demonstrated a specific user problem. Rather than expand commuting features further, the group chose to examine difficulty finding the actual destination after reaching campus.

**证据类别：小组反思与范围决策。并非来自已完成的问卷、访谈或焦点小组，也不能据此声称学生普遍认为原方案无效。**

**Evidence type: group reflection and a scope decision. This is not a completed questionnaire/interview finding and does not establish that students generally found the former concept ineffective.**

## 4. 新问题与范围 / New problem and scope

### 核心问题 / Core question

当使用者已经在伯明翰大学校园内，如何帮助其确认目的地点的建筑、楼层与下一步查找方式，或根据当前位置寻找适合的附近厕所？

When someone is already on campus, how can the system help them identify a destination’s building, floor and next finding step, or find a suitable nearby toilet from their current location?

### 重点场景 / Priority scenarios

- 找指定教室：输入房间名、房间号码或建筑名，查看建筑与有来源的楼层信息。 / Find a particular room through its name, code or building, with sourced floor information.
- 找附近厕所：选择参考位置或自愿授权定位，比较已收录厕所，考虑设施需要与可进入性。 / Find nearby listed toilets using a reference origin or optional location, considering facility needs and access.
- 到楼后的衔接：在合适时机提示核对楼层和门牌，减少“找到了楼却找不到房间”的中断。 / On approach, prompt the next floor/sign check so finding the building is not mistaken for finding the room.

暂不把整个大学的所有房间、所有设施或可靠室内定位作为已实现能力。当前原型只含小规模目录。

The prototype does not claim a complete university directory or reliable indoor positioning; its current directory is a small pilot.

## 5. 取舍与备选方向 / Choices and alternatives

| Option considered | Decision and reason |
| --- | --- |
| 继续完整校外＋校内通勤 / Continue end-to-end commuting | 移出新版本；范围广，关键价值尚待证明。保留旧版本便于比较。 / Remove from the new scope: broad coverage and unproven core value; keep the old version for comparison. |
| 只做建筑地图 / Building map only | 作为基础保留，但不足以覆盖房间、楼层和具体设施任务。 / Retain as a foundation, but it does not fully address rooms, floors and particular facilities. |
| 深入具体地点 / Focus on specific places | 作为新的主要方向，便于围绕具体任务开展研究和测试。其价值仍需验证。 / Select for focused research and testing; its value remains a hypothesis. |
| 立即实现完整室内逐步导航 / Implement full indoor routing immediately | 暂缓；缺少可核验的楼层图、门位与通行路径，不能编造路线。 / Defer without verified floor plans, doors and access paths. |
| 自动推断房间楼层 / Infer floors from room codes | 不采用；编号不是充分证据，使用有来源楼层或明确未知状态。 / Reject: use sourced floors or explicit unknown states. |

## 6. 新旧流程 / Before and after

**旧流程**：课表 → 出发地点／偏好 → 出行方式 → 公交／火车／天气 → 校园到达点 → 建筑 → 教室。

**新流程 A**：搜索教室 → 确认建筑与楼层 → 建筑／楼层／地点引导。

**新流程 B**：设置参考位置 → 查找附近厕所并筛选 → 查看设施与楼层 → 地点引导。

**Old:** class → origin/preferences → mode → transport/weather → campus arrival point → building → room.

**New A:** search room → check building and floor → building/floor/place guidance.

**New B:** set reference origin → find and filter nearby toilets → check facilities and floor → place guidance.

## 7. 主动性如何保留 / Retaining proactivity

主动干预由“出发与下车提醒”转为“到楼时衔接楼层查找”。经同意可在页面打开时读取位置，接近目标建筑后提示核对楼层；保留稍后处理、静音和停止控制。手动到楼确认能测试相同提示内容，但必须标明触发来源。GPS 不能自动识别房间或楼层。

Shift intervention from departure/alighting prompts to a floor-check suggestion near the destination building. With consent, in-page location can trigger a prompt with snooze, mute and stop controls. Manual check-in can test the same message but must identify its trigger. GPS does not automatically identify floors or rooms.

这回应 brief 的交互、外部信息输入、主动干预与使用者控制要求；并不代表老师已认可新方案或研究已经证明它有效。

This addresses the brief’s interaction, external-input, proactive-intervention and control requirements. It does not imply tutor approval of this specific direction or demonstrated effectiveness.

## 8. 已知资料与未完成证据 / Known information and missing evidence

- 用户确认目前没有室内图、厕所位置或已核实楼层资料。 / The user confirmed no indoor plans or verified room/toilet-floor records were available from the group.
- 新原型采用少量公开资料支持的地点，未知楼层仍明确标识。公开资料不等于现场核验。 / The prototype uses a small number of publicly sourced places and preserves unknown floors; source evidence is not a field check.
- 需要比较现有大学校园地图与现场标识的真实能力。不能未经评审便声称它们不支持设施或房间查找。 / Evaluate the actual capabilities of the official campus map and signs rather than assuming they lack facility or room search.
- 需要真实研究验证问题频率、影响、信息需求及提醒接受度。当前无新增研究结果。 / Real research is needed on frequency, impact, information needs and prompt acceptance. No new results are reported here.

## 9. 下一轮应收集的证据 / Next evidence to collect

1. 近期真实找路经历访谈：困难发生在楼、入口、楼层、走廊还是门牌？ / Interviews about recent episodes and the exact point of difficulty.
2. 问卷与 Pilot：检验“楼层”“附近”“可进入”等词语是否被正确理解。 / Questionnaire and pilot to check wording and interpretation.
3. 现场走查：记录地点、楼层标识、门位、通行条件、日期及核验者。 / Walkthroughs documenting place, floor label, door, access, date and checker.
4. 任务测试：查房间／找厕所／处理未知数据／控制提醒；记录完成、错误、求助、耗时与解释。 / Task tests recording completion, errors, help, time and uncertainty comprehension.
5. 反馈到修改：每次写明观察 → 设计解释 → 改动 → 再测试。 / Link each observation to a decision, change and retest.

## 10. 可用于过程 PPT 的简述 / Slide-ready account

**中文**：经过小组评审，我们将 GreenGo 从完整通勤规划收窄为校园内的小地点查找。我们认为，原方向覆盖了较多既有工具的信息，却尚未证明一个足够具体的核心价值，因此保留旧方案，转而深入教室、楼层和附近厕所的查找任务。这是待研究验证的方向决策；下一步将通过访谈、问卷与任务测试检验问题，并根据证据继续调整。

**English**: Following group review, we narrowed GreenGo from end-to-end commute planning to finding specific places on campus. We felt the previous scope combined information from existing tools without yet demonstrating a sufficiently focused value. We retained the earlier design and chose to investigate rooms, floors and nearby toilets in more depth. This is a direction decision to validate, not a user-research finding. Interviews, a questionnaire and task tests will inform the next iteration.

## 11. 关联材料 / Related records

- `16-design-evolution-for-viva.md`：总演变记录，第14阶段。 / Master evolution record, stage 14.
- `17-tutor-feedback-2026-11-10.md`：老师反馈的用户转述。 / User’s account of tutor feedback.
- 新原型 `docs/01-direction-change.md`：方向摘要。 / Direction summary.
- 新原型 `docs/02-user-study-plan.md`：拟开展的用户研究。 / Proposed research.
- 新原型 `docs/03-data-validation.md`：数据与现场核验边界。 / Data and field-validation limits.

使用工具：Codex 协助整理已有对话、生成双语记录和构建原型；小组仍需审阅文字、执行真实研究，并保留反馈证据。 / Tool disclosure: Codex assisted in organising the conversation, drafting bilingual records and building the prototype. The group must review the materials, carry out actual research and retain evidence.
