# Clue 项目概览 / Project overview

记录日期 / Recorded: 2026-11-14

项目仓库 / Repository: https://github.com/dawsen1208/clue

在线原型 / Prototype: https://dawsen1208.github.io/clue/

Slogan: **Follow the clue. Find your place. / 循着线索，找到去处。**

## 中文

### 1. 项目定位

Clue 是面向伯明翰大学 Edgbaston 校园的主动式具体地点查找助手。它以校园内的教室、楼层与厕所等小地点为核心，将“身处校园某处”到“确认找到具体地点”的过程连接起来。当前交付物是可交互、可解释、可测试的设计原型，以假设拥有完善后端与定位服务为前提呈现使用体验。

项目范围已从校外＋校内通勤收敛到校园内查找，不再以公交、火车或完整通勤方案为核心。校园地图是空间背景，具体地点和楼内衔接是重点。

### 2. 核心问题与项目目标

**核心问题：如何帮助不熟悉校园的人，从当前位置逐步找到正确建筑、正确楼层和具体教室／厕所，并在找不到时得到有效帮助？**

拟解决的问题包括：建筑名与课程地点代码难以对应；到了教学楼仍不清楚楼层与走廊；看见地图位置却缺少现场参照点；需要厕所时无法判断具体位置或设施是否合适。这些仍属于待用户研究验证的问题假设。

项目目标：

- **连续性**：连接校园地图、建筑入口、楼层、室内标识与最终地点，减少信息断层。
- **清晰度**：每一步只突出当前应核对的地点、标识或行动，明确进度和下一步。
- **适时帮助**：在允许的情况下，在接近建筑等关键时机主动给出下一条线索。
- **使用者控制**：允许更换起点、返回上一步、暂停／静音提醒，并由使用者确认是否找到。
- **失败恢复**：未找到、标识不清或设施无法使用时，保留目标并提供重新核对、记录问题或替代地点。
- **研究可验证性**：通过任务测试、访谈和问卷判断设计是否降低困惑与操作负担，而不是用功能数量证明有效。

### 3. 目标用户

| 优先级 | 用户 | 典型需要 |
| --- | --- | --- |
| 主要 | 新生、国际学生及不熟悉校园的学生 | 将课程地点代码对应到建筑、楼层和教室门口。 |
| 主要 | 到陌生教学楼／教室上课的在校学生 | 在已有校园认识基础上，补足具体楼内位置。 |
| 主要 | 需要在校园查找厕所的使用者 | 找到附近候选设施，查看楼层及适用设施线索。 |
| 次要 | 访客、活动参与者 | 从校园参考位置找到具体活动地点。 |

无障碍、性别中立设施与电梯偏好已纳入设计探索，但尚未与相关用户共同验证，不能宣称目前原型已满足无障碍导航要求。

### 4. 使用流程

**入口：搜索教室／房间代码、点击地图建筑、查看厕所目录或选择热门线索。** 热门排行当前为情境演示数据，不是真实查询统计。

**五步查找：**

1. **确认位置**：在假设授权后显示校园定位；核对起点，必要时更换参考位置；选择是否允许到楼提示。
2. **前往建筑**：在校园地图中关联起点与目标建筑；核对入口名称牌；确认进入建筑。
3. **找到楼层**：突出目标楼层，提供入口索引牌、电梯／楼梯及楼层牌线索；可选择电梯／无台阶偏好。
4. **室内线索**：通过简易示意图、走廊方向牌和房间号／厕所图标，找到具体门口。
5. **确认找到**：由使用者确认目标是否匹配、厕所所需设施是否可以使用；确认后才结案。

**未找到分支：**重新查看室内线索 → 核对楼层 → 记录不清楚的位置／现场询问；厕所另可查看其他候选地点。中途可以返回或结束，不因模拟位置变化自动完成。

### 5. Unique idea：让“最后一段找路”成为连续的线索链

**核心表达：从校园里的一个点，到真正要去的那扇门。**

Clue 的设计特色由三部分共同构成：

- **跨空间尺度的线索链**：把校园位置、建筑、楼层、室内参照点和目的地确认放在同一任务中，重点处理各段之间的交接。
- **有时机、可控制的主动提示**：到楼时提出下一步，而不是持续展示大量信息；提醒可以暂停、稍后处理或静音。
- **可视化的探案线索板**：地图建筑图钉用红线关联地点档案，室内线索继续延伸；地图保持可见，用户知道每张卡片与哪个建筑有关。视觉隐喻服务于理解，不要求完成解谜。

“找到／还没找到”让最后的到达判断回到使用者，并把失败恢复纳入完整流程。这是拟验证的设计差异点，不能表述为全球首创，或已经证明优于其他地图服务。

### 6. 当前原型与研究边界

已实现前端搜索、筛选、地图交互、收藏、五步流程、提醒控制与恢复分支。原型没有读取真实 GPS，没有完整室内定位／路径服务；入口、指示牌、室内图、部分楼层、可用状态、时间和排行均可能使用标注的假设数据。附近排序基于近似建筑点位，不能保证最近可用厕所或可通行路线。

下一步应验证：使用者是否理解楼层与现场参照点；何时需要主动提示；哪些确认步骤有帮助、哪些多余；找不到时能否恢复；探案风格是否提高可理解性而未增加负担。项目方向和设计选择不能代替真实研究证据。

## English

### 1. Positioning

Clue is a proactive micro-wayfinding assistant concept for the University of Birmingham's Edgbaston campus. It focuses on specific classrooms, floors and toilets, connecting a campus position to a user-confirmed destination. The current deliverable is an interactive, explainable and testable design prototype that assumes complete supporting location and navigation services.

The scope has narrowed from off-campus and campus commuting to finding places within campus. The campus map provides context; building-to-room handovers are the focus. Bus, rail and end-to-end commuting are outside the current version.

### 2. Problem and goals

**How can someone unfamiliar with campus progress from their current position to the right building, floor and classroom or toilet, and recover when they cannot find it?**

Potential difficulties include interpreting class location codes, finding the right floor after reaching a building, connecting a map pin to a visible landmark, and finding a suitable toilet. These are research hypotheses, not established participant findings.

The goals are to:

- Connect campus, entrance, floor, indoor landmark and final destination without losing context.
- Highlight the next useful action and make progress understandable.
- Offer timely, permission-based help at handovers such as approaching a building.
- Preserve control through origin correction, previous-step actions and prompt controls.
- Support recovery when signs are missing, a place cannot be found or a facility cannot be used.
- Evaluate clarity, effort and recovery through user research, rather than treating feature count as evidence of success.

### 3. Target users

Primary users are new and international students unfamiliar with campus, existing students attending an unfamiliar classroom, and campus users looking for a listed toilet with suitable facilities. Visitors and event attendees are a secondary audience.

Adapted facilities, gender-neutral toilets and lift preferences are included as design considerations. Relevant user groups have not yet validated the design or real accessible routes.

### 4. User journey

**Entry:** search a room/building code, select a campus pin, explore listed toilets, or open an illustrative Trending clue.

**Locate → Building → Floor → Inside → Confirm**

1. Check an assumed campus location, correct the reference origin if necessary and choose approach prompts.
2. Follow the campus connection, match an example entrance sign and confirm entry.
3. Check the destination floor using directory, lift/stairs and landing-sign clues; choose an access preference.
4. Follow a schematic indoor trail using corridor directions and a room code or toilet sign.
5. Confirm finding the correct place, including the required toilet facilities being usable, before closing the case.

If the place is not found or usable, retain the destination and review indoor clues, recheck the floor, record an issue or ask staff. Toilet users can explore alternatives. Users can go back or end the demonstration; simulated position changes do not declare success.

### 5. Unique idea

**From a point on campus to the door that matters.**

Clue's proposed distinction is a continuous chain of spatial clues across campus, building, floor, indoor landmarks and destination confirmation. Timely prompts support the handovers, while the user controls whether and how to proceed.

Its detective-board interface makes the chain visible: selecting a building extends a red thread to its place file, with indoor clues extending the same task. The map stays available alongside or above the file. The metaphor explains relationships without adding a puzzle to an essential task.

Explicit “found it / not found” choices make confirmation and recovery part of the main journey. This is a design proposition to test, not a claim of global novelty or demonstrated superiority over existing services.

### 6. Prototype scope and next research

The frontend implements search, filters, map interaction, bookmarks, five-stage guidance, prompt controls and recovery. It does not read GPS or connect complete positioning/routing services. Entrance/sign checkpoints, indoor plans, some floors, availability, timing and popularity counts are labelled scenarios. Approximate building-centre proximity cannot guarantee the nearest usable toilet or an accessible path.

Next research should examine landmark comprehension, prompt timing, the value and burden of confirmations, recovery when lost, and whether the visual metaphor supports clarity. Design decisions and successful implementation checks remain distinct from participant evidence.
