# Trending clues + shared map workspace / 热门线索与地图工作台

Recorded: **13 November 2026**. This iteration responds to a direct user design request, not participant-research findings.

## Requested change / 请求

Replace the generic place-list heading with a time-bounded Top 10 of places people most often look for. Integrate search, the popular list and map into one workspace, allowing panels rather than requiring simultaneous display. Clicking a location should lead into its going-there scenario, with transitions connecting the experience.

## Implemented / 已实现

1. **Trending clues · Top 10 / 热门线索 · Top 10.** Default Last 7 days; Last 30 days provides a different illustrative ranking. Ranks, counts and period are shown. All popularity counts are fictional design data; no student search history is collected or used.
2. **One map workspace.** Search, origin, category filters, time period and list/map controls share a toolbar. The place list, place file and guidance are panels over the same map. The previous floating Open map button is removed from the experience.
3. **Map-to-place interaction.** A building with one listed destination opens that destination directly. A building with multiple listed rooms/facilities shows the available choices first. This avoids silently selecting the wrong room or pretending every room has a surveyed map point.
4. **Go here (demo) / 前往这里（演示）.** The selected file starts the existing building–floor–place scenario without opening an external page. Source view retains its non-simulated information.
5. **Transitions.** A short clue-selection motion, animated map focus, panel slide/fade and campus-to-floor transition connect states. Reduced-motion preferences bypass these animations. Drag/zoom input cancels automatic map motion.
6. **Mobile layout.** Shared search and panel controls remain available; list/file guidance uses a compact overlay sheet. Full map can hide the sheet while keeping the selected place or guidance context.

## Data and scope boundaries / 资料边界

Popular counts represent two predefined example aggregate windows; they are not live analytics, actual rolling-period measurements or research evidence. The source directory is unchanged. In source view, saved views, text searches and facility-filter results, the interface does not label the result as a real popularity ranking. The demonstration still has no indoor GPS, routing backend, live facility availability or physical-arrival detection.

## Verification / 检查

- Twelve automated tests pass, including ranking size/unique IDs/rank order, changed time windows, directory immutability and popularity-context gating.
- Desktop: Last 7/30 days changes the first ranked clue; map selection opens the file and starts guidance; full-map mode preserves the task.
- Chinese mobile at 390 × 844: ranking, shared search, full map, pin selection, Go here, floor guidance and case completion were exercised.
- Multi-place building selection returns the Main Library's five listed destinations before choosing a room.
- Source view returns to the directory and hides the popularity time control. No application console errors observed in the checked flows.
- No field navigation or participant study was performed for this iteration.

## Still to test with people / 待用户研究验证

Do people recognise the rankings as demonstration data? Do period labels make sense? Is it easier to find a destination using the panel/map combination? Can users discover the map pins and retain context when hiding the panel? Do transitions improve understanding without slowing tasks? Future conclusions must use actual observations rather than prototype completion.

Tools: Codex assisted in bilingual interface text, frontend implementation, tests and documentation. No new external data service, tracking or transport query was introduced.
