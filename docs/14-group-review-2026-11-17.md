# 小组会议反馈与原型修改 / Group review and prototype changes

记录日期 / Recorded: **2026-11-17** · Prototype **0.7.0**

反馈来源：项目负责人转述的小组会议修改意见。未提供参会者名单、原始观察记录、样本数量或量化结果；本记录不将这些意见表述为正式用户研究结论。记录日期不自动代表实际开会日期。

Source: group-meeting feedback supplied by the project owner. Participant identities, raw observations, sample size and quantitative results were not supplied. These are design-review inputs, not findings from a completed participant study. The recording date is not an assertion of the meeting date.

## 反馈 → 决策 → 实现 / Feedback → decision → implementation

| ID | 小组反馈 / Feedback | 本轮修改 / Change | 核对重点 / Check |
| --- | --- | --- | --- |
| F01 | 点击下一步像反复刷新；优化跳转 / Next feels like repeated page refreshes | 主查找流程改为只更新当前步骤与相关地图线索，不重建校园底图；短淡入与焦点衔接 / Update the active guidance panel and related clue, retaining the campus canvas | 地图缩放位置不变，流程不中断 / Preserve viewport and task |
| F02 | 误退出／返回后保留进度 / Recover after accidental exit/back | 本地自动保存地点、步骤、参考起点与偏好；推荐页可继续／清除；刷新相同旅程恢复 / Browser-local draft, Continue/Clear entry, refresh recovery | 不是自动完成；暂停后不偷偷重新触发提示 / No automatic completion or surprise prompt restart |
| F03 | 降低纯文本阅读量 / Visualize guidance | 五阶段图标＋编号进度条，参照点拆成编号卡片；保留必要说明 / Icon/number progress and checkpoint cards | 图形与文字是否互相解释 / Comprehension |
| F04 | 提高推荐页权重 / Prioritize Recommendations | 默认主页仍为推荐线索，主导航明确命名“推荐 / Recommended”；移除主页大幅介绍区 / Default map-led recommendations with persistent navigation | 首屏能否找到主要任务 / Task discoverability |
| F05 | 增加主页反馈入口 / Add homepage feedback | 主导航常驻反馈；手机底栏可随时打开反馈表单 / Persistent feedback entry, including mobile bottom navigation | 反馈仅留在当前演示页面，未提交学校 / Local session only |
| F06 | 地图支持 3D 与分层 / Add layered 3D map views | 选择地点后可切换校园图、立体楼层堆叠与平面示意；选择查看楼层并突出目标层 / Campus, illustrative 3D floor stack, 2D sketch and floor selector | 不是实测楼宇模型、地形或真实立体路网 / Not a surveyed model or terrain |
| F07 | 强化手机适配与触控 / Improve mobile UI | 全屏地图底图、浮动搜索／筛选、可拖动线索抽屉；主要操作增大触控区域 / Full-screen canvas, floating controls, resizable sheet and larger key controls | 遮挡、滚动、触控与横向溢出 / Occlusion and touch interaction |
| F08 | 参考 Google Maps 式布局 / Use the suggested map layout pattern | 按会上给出的“地图＋浮动搜索＋底部抽屉”思路重组，保留 Clue 纸张、图钉、红线语言；桌面仍采用并列线索卡 / Apply the supplied pattern while retaining Clue identity | 不是声称已完成 Google Maps 的独立竞品评测 / No standalone competitor study claimed |

## 重要取舍 / Design trade-offs

此前迭代要求地图不被浮层遮住；本次会议进一步提出手机底部抽屉。采用可收起、半展开、展开三档抽屉，让遮挡程度由使用者控制。地图留在底层，手机不再把地图和所有长内容按页面上下堆叠；桌面保留并排布局。该决定来自本次小组反馈，仍需实际用户测试判断是否改善体验。

The previous design avoided overlays. This review requested a mobile bottom sheet. Three adjustable heights let users choose how much detail to reveal; the map remains mounted underneath. Desktop keeps side-by-side content. The trade-off needs task testing rather than being assumed superior.

进度保存在同一浏览器的 localStorage，最长恢复窗口为七天；保存时不包含提醒计时器、反馈文本或完整地图数据库。草稿不跨设备、不上传仓库，清除后不可恢复。实际 GPS 未被读取；参考起点属于当前情境或手动地图参考。存储被禁用时显示无法保存状态。

Drafts are local to the browser with a seven-day recovery window. Timers, feedback text and directory data are excluded. There is no cross-device sync or repository upload. GPS is not read; origins are scenario/manual references. Storage failure is reflected in the interface.

立体楼层采用假设的层数、轮廓和房间示意。目标层可高亮，查看其他层不会假装显示目的地。没有室内测绘资料，因此不能把此视图作为实际建筑结构或无障碍路线证据。

Floor count, outlines and room placement are illustrative. Other-floor selection does not invent a destination on that floor. The stack is not evidence of actual building structure or accessible routing.

## 下一轮小范围任务测试 / Next task test

1. 从推荐页找一个教室，边做边说明下一步预期；记录犹豫、误触与需要解释的位置。
2. 在第三／第四步误返回或刷新，观察能否发现“继续查找”，并说明恢复到了哪里。
3. 在手机上调整抽屉，交替查看地图与线索；记录重要内容是否被遮挡。
4. 在立体和平面视图中找目标楼层，再切到错误楼层；检查是否能分辨示意与事实。
5. 模拟未找到／厕所无法使用，从反馈或恢复入口继续；询问是否愿意接收主动提示。

记录：任务是否完成、卡住的位置、回退次数、原话、观察到的问题、下一版修改及理由。不要填造满意度、节省时间或成功率。

Record completion, difficulties, backtracking, quotes, design changes and rationale. Do not invent satisfaction scores, time savings or success rates.

Tools: Codex assisted with documentation, frontend changes and checks; the in-app browser exercised interaction and responsive layouts; the existing GitHub Actions workflow validates and publishes the prototype. These implementation checks do not replace participant evaluation.

## 本轮实现检查 / Implementation checks

- 18 项自动检查通过，覆盖原目录、情境隔离、排行、步骤门槛与新增草稿恢复／过期／损坏数据处理。
- 主流程在保持同一旅程地址时切换步骤，校园地图缩放范围保持不变；刷新第三步后恢复到第三步并重新打开楼层视图。
- 检查了查看其他楼层、返回目标层、3D/2D 切换、退出后继续、未找到、确认结案和结案后不再出现恢复横幅。
- 手机 390×844：实际拖动抽屉至收起档位；也检查 Home/End 调整档位。未出现横向页面溢出；反馈底栏触控高度为 48px。
- 中文推荐标题与导航已核对；所检查交互未观察到浏览器应用错误。检查不代表所有浏览器／设备均已验证，也不代表真实用户评测。

These checks exercise implementation behaviour; participant-based evaluation remains outstanding.
