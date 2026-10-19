# Dashboard scope — corrected against the frontend

**Date:** 13 October 2026  
**Draft reviewed:** Response to Mike Sosa, 13 October 2026, from Mst. Jannatul / Innosight_Fiverr Development Team  
**Phase:** Frontend only. Product dashboards, widgets, protocols, and voice results are visualized from Redux. No backend is required for this phase.

This file keeps the letter’s positions and corrects the claims that do not match the current frontend.

---

## Corrections

| Draft claim | What is wrong | Accurate position |
| --- | --- | --- |
| Connecting widgets, titles/labels/formats, widget selection plus permissions, and reopen/edit/save are all still extra development. | Too broad. Several of these already work in the app. | Split “already in the frontend” from “still to build in Redux.” Only the gaps add time. |
| Reopen, edit, and save still needs to be included as new work. | Already built. Products → Product Details → Dashboard saves `product.dashboard` in the `founderProducts` slice. Create Product Step 7 uses the same builder. | Say it is already in Version 1. Persisting that slice in the browser (redux-persist) is the only save gap, and it is still frontend. |
| Titles, labels, and basic display formats are not built. | Titles, fonts, font size, and colors are already saved per widget. | Still to add: field labels and display formats (number, percent, date, currency). |
| Selecting widget types and applying permissions is not built. | The Founder already picks Widget Library widgets. Visibility (All, Consumer, Enterprise, Founder) already filters the preview. | Still to add: enforce Create Product Step 8 flags from Redux when the dashboard opens. |
| Widgets are not connected to product data. | Widgets already render library content (chart, KPI, grid, timeline, configuration) from the Widget Library slice. | Still to add: point those widgets at that product’s data in Redux, not the fixed sample series. |
| “Move boxes and widgets by dragging; rearrange sections freely” is included, while resizing is outside scope. | These conflict. Free rearrange is close to the blank canvas Mike said is not needed. The app today reorders with Up/Down, not drag, and uses fixed spans (full, half, third, sidebar). | Version 1 includes reorder inside the existing grid (Up/Down now; drag reorder can be added). It does not include free-form section placement. Resizing stays outside scope, matching the letter. |
| Voice update delay cannot be stated until Phase 3. | For this frontend phase the behavior is knowable. There is no server. | After a short simulated processing step (about 1–3 seconds), and after an approval control if one is shown, a Redux action writes the result onto that product. The open dashboard re-renders. No page refresh. A real processor delay belongs to Phase 3 and should be labeled separately. |
| Copying a layout is replaced by pre-built templates, as if templates are still to be offered. | Dashboard 1–4 and “save as new layout” already exist and can be applied to a product. | Keep the scope line: templates are in; cloning one product’s dashboard onto another product is not. Do not describe templates as future work. |
| Tables/rankings, schedules, announcements, and awards cannot be assessed until Mike replies. | Half of that can be answered now. | Data Grid already covers a basic table. Rankings, schedules, announcements, and awards are not widget types. Clarification is still right before building those four. |
| Video authorized access is left entirely to a later report. | This phase can state the rule now. | A video widget stores a browser file URL in Redux. Authorized access means the same visibility flags: if the role cannot see the widget, the player is not shown. |

Blank-canvas design and undo/redo stay out of scope. That part of the letter is correct.

---

## Corrected summary

| Item | Position | Notes |
| --- | --- | --- |
| Connect library widgets to product data | Included, no charge (added time) | Rendering from the Widget Library is already in the frontend. Binding each widget to that product’s Redux data is the remaining work. |
| Titles, labels, and basic display formats | Included, no charge (added time) | Titles and text size are already saved. Labels and formats are the remaining work. |
| Select widget types and apply existing permissions | Included, no charge (added time) | Library selection and visibility preview already work. Step 8 enforcement is the remaining work. |
| Reopen, edit, and save a product dashboard | Already in Version 1 | No extra build for the flow itself. |
| Voice results on the correct dashboard | Frontend visualization now; processing engine is Phase 3 | Redux update after a simulated process. No refresh. Do not quote a server delay in Version 1. |
| Two test protocols, same architecture | Included | Two protocol payloads in Redux, one canvas. |
| Drag to reorder widgets inside the grid | Included | Reorder only. Not free-form section layout. |
| Rearrange sections freely | Not included | Conflicts with “no blank canvas” and with resizing staying out of scope. |
| Widget resizing in the grid | Outside current scope | Unchanged. |
| Video upload/embed and playback | Included | Visibility flags in Redux gate playback. |
| Tables | Already covered | Existing Data Grid widget type. |
| Rankings, schedules, announcements, awards | Clarification needed | Not in the Widget Library. Need fields, data source, and who can view or edit before they are estimated. |
| Per-widget colors and text sizes | Already in Version 1 | Background, title, body, border, font, and font size. |
| Per-widget alignment | Included, no charge (added time) | Left, center, right on the same style object. |
| Copy one product’s configured layout onto another | Not included | |
| Pre-built templates applied to a product | Already in Version 1 | Dashboard 1–4 plus saved layouts. Customer data is not part of a template. |

---

## Voice timing (frontend phase only)

| Question | Answer |
| --- | --- |
| When does the dashboard update? | When the result is written to that product in Redux, after the simulated processing step and after approval if the screen requires it. Not while recording is still running. |
| Expected delay | About 1–3 seconds in the UI. No network wait. |
| Is a page refresh required? | No. The dashboard reads Redux and re-renders. |

Phase 3 can replace the simulated wait with real processing. That delay is not a Version 1 frontend number.

---

## Handover

The letter is right to answer Git, hosting, DNS, and credentials in a separate message. Those are not dashboard features and are not solved by Redux.

---

## What the October 15 report should not repeat

- Do not list reopen/edit/save, widget-library rendering, colors, font size, or pre-built templates as unbuilt work.
- Do not promise free section rearrange and also exclude resizing and a blank canvas.
- Do not say video authorization is unknown. For this phase it is widget visibility in Redux.
- Do not hold the frontend voice-timing answer until Phase 3. Label the simulated delay and the future processor delay separately.
