# Unified casebook and entrance refinement / 线索板整体化迭代

Recorded: 12 November 2026. Trigger: the user requested stronger integration of the detective-board style across every page and more entrance-animation detail. This is design feedback, not a participant-study finding.

## One visual system / 同一本校园探案手册

- **Search / 线索板**: a shared cork-and-wood desk now holds both the search file and campus map. Paper cards, tape, pins, file codes and clue connections belong to the same layout rather than styling only the map.
- **Place / 地点档案**: building index slip, paperclip, opened-folder title, floor ticket and saved marker share the case-file language.
- **Guidance / 导航**: building–floor–place steps are connected by a red thread. Campus and floor views become Exhibits A and B. The functional labels remain plain and direct.
- **Saved / 收藏档案室**: distinct archive heading, retained-place count and filed map pins communicate the purpose of this page. Search filters remain available.
- **Completion / 结案反馈**: a case-closed sheet confirms completion of the design scenario. It offers saving the place or clearing the previous query and starting another search. It does not claim detected physical arrival.
- **Notes and dialogs / 说明与弹窗**: a pinned field-guide board, source cards and notebook-style dialogs replace unrelated panel treatments. The reality/assumption distinction remains visible.

## Entrance storyboard / 入场分镜

1. Folder and campus map unfold.
2. Three pins land in sequence; a red thread connects them.
3. Paper clue cards arrive and a magnifier scans across the map.
4. Clue wordmark and campus-casebook seal land before the page is revealed.

The sequence lasts approximately 3.2 seconds, can be skipped immediately, and runs once per tab session for this visual version. The Prototype notes page includes Replay the opening scene. A reduced-motion preference bypasses the animation and disables replay. There is no audio, flashing, fake server-loading percentage or new tracking.

该动画是视觉叙事，不表示系统正在真实定位、分析学校数据或连接后端。红线、示意楼层图等仍遵循原有演示标识和资料分层。

## Interaction and accessibility checks

- English desktop: search → room file → guidance → floor → place → case-closed sheet.
- Saving from the completed case adds the place to the archive.
- Starting another case clears the old query/filters and restores the full directory.
- Archive headings, saved counts and filed map pins render correctly; prototype notes includes replay.
- Replay, skip and animation cleanup checked in browser; no application errors observed.
- Chinese mobile checked at 390 × 844 for file layout and the completion/search continuation. Temporary viewport override reset after QA.
- Existing source/concept data separation remains unchanged. No real user study, physical navigation test or new backend capability is claimed.

## Next research questions / 待真实用户评估

Does the shared metaphor make page transitions clearer? Is the extra animation acceptable? Are file codes, stage threads and completion feedback helpful rather than distracting? Can people find a room or toilet without needing to understand detective terminology? Preserve these as open questions until evaluated.

Tools: Codex assisted with the visual implementation, bilingual labels, animation and documentation. School-map artwork is retained from the supplied material; decorative paper, pins and threads are drawn in CSS/SVG, without copying reference-image watermarks.

## 2026-11-15 · Opening map crop alignment

The opening scene now reads the crop rectangle from the interactive campus artwork and applies the same clipping region. The printed legends are excluded even where the opening's wide paper leaves margins around the portrait map. Unfolding, pins, threads, skip/replay and reduced-motion behaviour remain. Browser replay confirmed both crop regions are x=786, y=47, width=946, height=1037. The Prototype notes replay control also remains available after accepting the scope briefing.
