# 可选语音指引 / Optional voice guidance

2026-11-18 · Version 0.10.0

## 需求与实现 / Request and implementation

项目提出者要求保留当前图形流程，使用此前的详细文字说明实现语音播报，并允许使用者选择是否开启。此记录属于需求与实现记录，不是参与者研究发现。

The project owner requested optional spoken guidance using the earlier detailed written descriptions while retaining the graphical flow. This is a request and implementation record, not participant-research evidence.

- 在图形步骤条下增加语音开关、重播、停止及当前状态。默认关闭，不保存为刷新后自动播放的偏好。
- A voice toggle, Replay, Stop and current status sit below the graphical stepper. Voice defaults off; no autoplay preference is restored after reload.
- 开启时立即读当前步骤；以后切换步骤、变更起点、改变电梯偏好或进入恢复情境时更新讲解。相同内容的重复界面刷新不会重复播报。
- Enabling voice reads the current step. New steps, origins, lift preferences and recovery states update the script. Re-rendering unchanged content does not repeat narration.
- 播报内容直接复用原文字版流程中的标题、段落和逐项指引，并补充当前建筑、教室、楼层和相关起点。不会朗读页面按钮或流程编号。每次讲解均说明是演示。
- Scripts reuse headings, paragraphs and checkpoint instructions from the previous text-led journey, with the current building, room, floor and relevant origin. Buttons and progress numbering are excluded. Each script identifies the guidance as a demo.
- “停止”仅停止当前声音，下一步仍可继续播报；关闭开关取消当前及后续自动播报。离开指引、切到后台或离开页面会停止声音。切换步骤先取消旧内容，避免旧路线与新路线叠加。
- Stop ends the current reading while leaving later step narration enabled. Turning the toggle off cancels current and future automatic narration. Leaving guidance, hiding the page or unloading stops speech. A new step replaces old speech rather than overlapping it.
- 英文页面请求英语音色，中文页面请求中文音色；使用浏览器／设备提供的语音能力。没有接入独立付费语音服务，也不会申请麦克风权限。实际音色、可用语言及播放行为取决于浏览器和设备的语音服务。
- English pages request English speech and Chinese pages request Chinese speech, using browser/device synthesis. No standalone paid speech service or microphone permission was added. Voice availability, languages and playback depend on the browser and device speech service.
- 不支持语音或播放失败时显示状态，图形和操作流程继续可用。“更多提示”中可以查看当前播报全文。资料查看模式不朗读假设室内路线。
- Unsupported or failed speech produces a status message while the graphical flow remains usable. The full current script is available inside More help. Source view does not narrate assumed indoor routes.

## 验证范围 / Verification scope

30 automated checks pass. New checks cover default-off behaviour, opt-in, script reuse, lift/stairs wording, Chinese text, toilet recovery, replacing old speech, stale callback suppression, stopping, replaying and unsupported/blocked engines.

Browser checks observed English and Chinese speech-start status events, Stop/Replay/off interactions, step changes, script text, off state after reload and a narrow-screen control layout. No page errors were observed in the checked interactions. Speech-start events do not verify speaker volume, pronunciation quality, audio audibility or every device's compatibility; those need human listening and device testing.

## 下一轮用户测试 / Next user study

在安静、嘈杂和不适合外放的场景中，分别测试图形模式与图形＋语音模式。观察是否容易发现关闭／停止入口、语音是否过长、是否能区分“停止本次”和“关闭后续”，以及边听边走是否增加负担。保留不能播放、选错楼层和未找到教室的恢复任务。无需为了功能演示采集真实位置或麦克风录音。

Compare graphics-only and graphics-plus-voice in quiet, noisy and unsuitable-for-speaker settings. Check discoverability of Off/Stop, script length, understanding of Stop versus Off, and whether listening while walking adds effort. Include playback failure, wrong-floor and missing-room recovery. Real location or microphone recording is unnecessary for demonstrating this feature.

Codex协助开发原型和整理迭代记录。设计决策与用户研究由小组负责。

Codex assists with prototype development and organising iteration records. The group is responsible for design decisions and user research.
