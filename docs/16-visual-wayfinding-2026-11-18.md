# 图形化找教室流程 / Visual classroom wayfinding

2026-11-18 · Version 0.9.0

## 需求 / Request

项目提出者希望找教室流程尽量使用图形语言，减少逐条文字说明。这是一次设计需求与实现记录，并非参与者研究结果。

The project owner requested less written instruction and more visual language in the classroom-finding flow. This is a design request and implementation record, not a participant-study result.

## 设计改动 / Design changes

| 环节 / Stage | 主要图形 / Primary visual | 保留的操作 / User control |
| --- | --- | --- |
| 定位 / Locate | 蓝色起点、红线、目标建筑 / Blue origin, red thread, building | 核对或更换起点 / Confirm or change origin |
| 建筑 / Building | 建筑轮廓、名称牌、入口箭头 / Building outline, name sign, entrance arrow | 确认已进入 / Confirm entry |
| 楼层 / Floor | 分层楼板、突出目标层、楼梯或电梯图标 / Layer stack, highlighted floor, stairs/lift | 核对楼层、切换电梯偏好 / Match floor and choose lift preference |
| 门口 / Door | 走廊示意、方向箭头、门牌匹配卡 / Corridor sketch, arrows, sign-matching card | 放大室内图、核对门牌 / Enlarge sketch and match sign |
| 确认 / Confirm | 门口示意、建筑／楼层／门牌三项对照 / Door drawing and building/floor/sign checks | 找到了、未找到、恢复入口 / Found, not found and recovery actions |

每一步保留短标签和有图标的明确按钮。详细说明移入默认收起的“更多提示与演示说明”；重要的演示标识持续保留。图标同时配有短文字，不仅依赖颜色。示意图提供可被辅助技术读取的解释，减少动态效果的系统偏好仍被遵循。

Each step retains short labels and an explicit icon-labelled action. Detailed instructions move into collapsed More help & demo scope. A persistent simulation label remains visible. Icons have short text labels and do not rely on colour alone; diagrams have accessible descriptions and respect reduced-motion preferences.

移动端在进入新步骤时展开当前线索面板，主要确认按钮保持可见。放大室内图会降低面板，让出画布。桌面端楼层与室内示意在主画布区域展开，避免图示被排到页面下方。进入楼层阶段优先显示 3D 分层；进入找门口阶段切换到 2D 室内图。可以返回校园地图。

On mobile, a new checkpoint expands the clue sheet and keeps its primary confirmation visible. Enlarging the indoor sketch lowers the sheet. On desktop, the floor/indoor panel occupies the main canvas instead of appearing below it. The floor checkpoint starts in 3D layers; the door checkpoint opens the 2D sketch. Campus view remains available.

## 保留的边界 / Retained boundaries

定位、建筑入口、室内布局、路径和部分楼层仍是假设情境。示意不是实际建筑测绘。没有增加真实 GPS 或室内定位。原始资料查看模式保留，不会用图形掩盖未知楼层。位置更新不会自动判定完成；仍需人工核对楼层和最终门牌。厕所流程保留设施可用性确认与替代地点入口。

Position, entrances, indoor layouts, paths and some floors remain scenario assumptions. The sketches are not building surveys and no real GPS/indoor positioning was added. Source view remains separate and unknown floors are not inferred. Position updates never complete the task; floor and final sign checks remain human decisions. Toilet guidance retains usability confirmation and alternative facilities.

## 实现核对 / Implementation checks

- 25 automated checks pass, including diagram accessibility labels, checkpoint controls, unknown floors, label escaping, lift/stairs cues, toilet recovery and previous functionality.
- Browser checks cover the five-step flow, wrong-floor blocking, lift preference, automatic 2D switching, diagram enlargement, recovery controls and completion. English and Chinese rendering are checked at mobile and desktop sizes.
- These checks verify implementation behaviour. They do not demonstrate improved real-world wayfinding.

## 下一轮用户验证 / Next user validation

比较原文字版与图形版，观察是否能不展开帮助完成任务；记录错误转向、图标误解、回退、完成时间，以及对“示意／真实路线”的理解。重点询问：楼层图是否更易懂？方向箭头和门牌是否足够明确？主要按钮是否容易找到？图形是否省力，还是造成新的理解负担？保留失败和恢复情境。

Compare the former text-led flow with this visual version. Observe completion without help, wrong turns, icon misunderstandings, backtracking, task time and understanding of simulation boundaries. Ask whether the floor diagram, direction arrows, door signs and main actions are clear, and whether the graphics reduce effort or introduce new interpretation demands. Include failure and recovery tasks.

Codex协助开发原型和整理迭代记录。设计决策与用户研究由小组负责。

Codex assists with prototype development and organising iteration records. The group is responsible for design decisions and user research.
