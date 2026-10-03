# Widgets

A widget is a named piece of a dashboard. The founder decides what it shows, who may see it, how large it is, and which platform data it reads. The screen that displays it does not contain the business rules. It receives a definition and paints one of five known shapes.

That split is what makes a backend able to manage widgets. The founder is editing a record. The backend stores the record, decides who may read it, and returns the numbers. The frontend only knows how to draw the five shapes.

## What you see today

Two catalogs exist, and they are not the same list.

**Widget Library** (`Founder → Widget Library`, and Create Widget) is the catalog of reusable definitions. It holds charts, KPI strips, grids, timelines, and configuration tools. Creating, editing, publishing, and deploying all happen here. The cards you see are prebuilt examples so the library is not empty. They are sample records, not live connections to revenue, users, or audits.

**Dashboard layout** (`Founder → Founder Control Center`, while editing the layout) is a second, smaller catalog: Continuum Growth, Active Products™, Quick Actions, AI Recommendations, and similar cards. Adding one of those places a copy on the founder home. That copy is stored in the browser. It is not a row from the Widget Library, and creating a widget in the library does not make it appear on the dashboard.

Until those two are one catalog, a widget published in the library is a definition waiting to be placed. It does not yet drive a live dashboard.

## How a widget works

Three things are involved. Mixing them up is what makes widgets feel like templates with no behavior.

| Piece | What it is | Who owns it |
| --- | --- | --- |
| Definition | Name, type, title, color, size, data source, refresh, environments, visibility, status, version | Founder, stored by the backend |
| Placement | “This definition sits on this dashboard, in this slot, with this title override” | The person arranging that dashboard |
| Data | The numbers or rows for one placement, for one viewer, at one moment | The backend, from the named source |

The definition never contains the numbers. `Revenue-Ledger-Primary` is a name of a source the platform already trusts. It is not a query the browser invents, and it is not a script the founder uploads.

When someone opens a dashboard:

1. The backend returns the placements that role is allowed to see.
2. For each placement it returns the published definition (type, title, color, size).
3. The frontend picks the renderer for that type.
4. The renderer asks the backend for that widget’s data.
5. The backend reads the real source, applies the viewer’s organization and role, and returns a small typed payload.
6. If the definition says real-time, the same payload is pushed again on an interval or a socket. Otherwise the screen keeps the snapshot until the viewer refreshes.

Visibility is decided on the server. A founder preview can *simulate* “what an enterprise admin would see,” which this app already does by blurring a widget the role cannot open. In production the enterprise admin must not receive the widget or its data at all.

## The five types

The library only offers shapes the product already knows how to draw. A new shape is a frontend change plus a data contract. It is not something a founder pastes in as code.

| Type | Category | What the viewer sees | What the data payload is |
| --- | --- | --- | --- |
| Interactive Chart | Analytics | A weekly area chart in the widget color | `{ points: [{ label, value }] }` |
| KPI Metric | Analytics | Current value, 7-day average, and change | `{ current, average, delta }` |
| Data Grid | System | A table of segments, counts, and a load bar | `{ columns: string[], rows: object[] }` |
| Event Timeline | System | A short list of events with time | `{ events: [{ title, at, detail }] }` |
| Configuration Tool | Utility | Switches the viewer can change | `{ settings: [{ id, label, value }] }` |

A configuration tool is the only type that writes. Toggling a setting calls the backend, which updates that viewer’s preference for that placement. The other four types are read-only.

Size is layout, not data. Width is Auto, 1/3, 1/2, 2/3, or Full. Height is Auto, Small, Medium, or Large. The dashboard uses that when it places the card. Color is the accent of the chart, the bars, and the timeline dots.

Refresh is a promise about freshness:

- Real-time (WebSocket) — the backend pushes when the source changes
- Every 30 seconds, every 5 minutes, hourly, daily — the client refetches on that cadence
- Manual — the viewer asks again

Auto-refresh and the real-time flag on the definition must agree with that choice. A draft with no data source can be saved. It cannot be published.

## Lifecycle

A widget moves through three statuses. The version string carries the channel so a person can see which copy is which.

| Status | Version channel | Meaning |
| --- | --- | --- |
| Draft | `alpha` | Being written. A name is enough. It is not offered for placement. |
| Active | `RC1` | Candidate. It can be reviewed. It is not the live copy. |
| Published | `stable` | The copy dashboards are allowed to run. |

**Create.** The founder fills four groups: identity (name, description, type, tags), presentation (title, subtitle, color, width, height), data and logic (source, refresh, auto-refresh, real-time, quick navigation), and security (Consumer, Enterprise, or both, plus a visibility rule). Save as draft, or publish.

**Validate.** Publish-level checks: a title, a data source, and at least one environment. The screen calls this a schema check. In this app it is those field rules. A backend should keep those rules and add its own: the source must be one it knows, the type must be one of the five, and the visibility rule must match the environments.

**Edit.** Saving a change bumps the patch version and writes a history line. If the widget is already published, the new version is not live until someone deploys it. The detail page shows “undeployed changes” when the working version and the deployed version differ.

**Deploy.** Deploy copies the current version into `deployedVersion` and marks the widget published. Placements read the deployed version, not the draft sitting in the editor.

**Duplicate.** A copy is a new draft with a new id and zero usage. It does not inherit the live deployment.

**Remove.** Deleting the definition should be refused while a placement still points at it, or those placements should be detached first. This app currently removes the record from memory only.

Usage figures on a library card — dashboards, products, times opened, engagement, session depth — are properties of the definition that only a backend can know, because only the backend sees every dashboard that placed it.

## How this app is built

The library is a frontend catalog with working create, edit, filter, preview, publish, and deploy behavior. It does not call the API.

- The thirteen cards are seed records held in Redux for the browser session. Refreshing the page restores the seeds. Nothing is written to `VITE_API_BASE_URL`.
- The summary numbers (142 widgets, 90.1% deployment, and the rest) are fixed labels. They are not a count of the table.
- Preview data is invented on the client. A chart is a seeded weekly series. If the widget is not a draft, has a data source, and has real-time turned on, that series jitters every three seconds so the card looks live. It is not reading Protocol-V1, the revenue ledger, or the audit log.
- “FAR Security Schema” on the create screen is the field validator above. There is no uploaded script, and no scan of dependencies.
- Identifiers look like `WID-FIN-8821`. New ones are random ids in that shape. Versions look like `v1.0.0-alpha`, `v1.1.0-RC1`, and `v4.2.1-stable`.
- The founder home layout keeps its own template list and saves layout choices in the browser. Publishing Financial Pulse Chart does not add Financial Pulse Chart to that home.

So the question “can the backend manage this?” is yes, and the current screens are the contract for that API. They are not already backed by it.

## How the backend manages it

The backend is the source of truth for definitions, versions, placements, and data. The frontend keeps a copy of the list it last fetched and sends the same actions it already performs locally: create, save, validate, publish, deploy, delete.

### Who may call it

Only a founder manages the library. Enterprise admins and consumers never create types or bind sources. They receive placements that were published for their environment, and only the data their organization is allowed to see.

A visibility rule is enforced when data is requested, not only when the editor draws a lock icon.

| Rule | Who receives the widget |
| --- | --- |
| All | Any role whose environment is selected on the widget |
| Consumer | Consumer accounts only |
| Enterprise | Enterprise accounts only |
| Founder | Founder accounts only |

### Definition

`POST /widgets` creates a draft. `GET /widgets` lists the library for the founder, with the same filters the screen has: search, type, status, category, updated range. `GET /widgets/:id` returns one definition plus its history. `PATCH /widgets/:id` saves an edit and appends a history entry. `DELETE /widgets/:id` removes it when nothing placed still depends on it.

A definition body matches the form:

```json
{
  "name": "Financial Pulse Chart",
  "description": "Streams weekly revenue velocity across every connected product.",
  "type": "Interactive Chart",
  "tags": ["Priority: High", "Finance"],
  "title": "Revenue Velocity Matrix",
  "subtitle": "Global Stream 772",
  "color": "#EAB308",
  "width": "Full",
  "height": "Medium",
  "dataSource": "Revenue-Ledger-Primary",
  "refresh": "Hourly",
  "autoRefresh": true,
  "realtime": false,
  "quickNav": true,
  "environments": ["Enterprise"],
  "visibility": "Enterprise"
}
```

The server assigns `id`, `status`, `version`, `deployedVersion`, `updatedAt`, and the usage counters. The client does not send those.

`POST /widgets/:id/validate` runs the publish rules and returns the field errors, or an empty error list. `POST /widgets/:id/publish` moves it to Published only when validation passes, sets the version channel to stable, and records history. `POST /widgets/:id/deploy` sets `deployedVersion` to the current version. Saving after deploy does not change what dashboards run until deploy is called again. That is the behavior the detail page already describes.

`POST /widgets/:id/duplicate` creates a new draft from the definition, with a new id and empty usage.

Sources are a server list, `GET /widget-sources`. The create form may only submit an id from that list. The five names in the app today (protocol stream, revenue ledger, user events, audit archive, theme registry) are the first entries. Each source declares which widget types it can feed, so a theme registry cannot be published as a revenue chart.

### Data

`GET /widgets/:id/data` is what makes the widget work. The caller is the signed-in user. The server loads the **deployed** definition, checks visibility, resolves the source inside that user’s organization, and returns the payload for the type.

Chart example:

```json
{
  "widgetId": "WID-FIN-8821",
  "version": "v4.2.1-stable",
  "asOf": "2026-09-30T09:00:00Z",
  "points": [
    { "label": "Mon", "value": 42 },
    { "label": "Tue", "value": 51 }
  ]
}
```

Grid example: `columns` plus `rows`. Timeline example: `events`. KPI example: `current`, `average`, `delta`. Configuration example: `settings`, and `PATCH /widgets/:id/settings` with `{ "id": "compact-density", "value": true }` to persist a toggle.

If the widget is still a draft, this route is only available to the founder, and the response is labeled preview. Everyone else receives the deployed version or nothing.

Real-time widgets open a channel keyed by widget id and organization. The message body is the same payload as the GET. The refresh field on the definition tells the client whether to open that channel, poll, or wait.

### Placement

A dashboard does not embed a copy of the chart. It stores a placement.

`GET /dashboards/:dashboardId/placements` returns the cards for the signed-in role, already filtered. Each item is `{ placementId, widgetId, version, slot, title, width, height }`.

`POST /dashboards/:dashboardId/placements` with `{ "widgetId", "slot" }` adds a published widget. The server rejects a draft, a widget whose environment does not include this dashboard, and a widget the caller’s role cannot see.

`PATCH` and `DELETE` on a placement change the slot or remove the card. They do not edit the library definition. Title and color overrides, if the product allows them, live on the placement so one Financial Pulse Chart can be titled differently on two dashboards without forking the definition.

The founder home layout should become one dashboard id whose placements point at library widgets. The separate template list (Continuum Growth, Quick Actions, and the rest) should be ordinary published widgets of the matching type, not a second catalog.

### What the frontend changes when the API exists

The screens stay. The place they write changes.

- Opening the library calls `GET /widgets` instead of reading the seed list.
- Create, save, publish, deploy, duplicate, and delete call the routes above and then show the returned record.
- Preview calls `GET /widgets/:id/data` and draws that payload with the existing chart, KPI, grid, timeline, or settings body. The seeded series and the three-second jitter go away.
- The role switcher in preview remains a founder tool: it calls the data route with a preview role, and the server returns either the payload or a hidden result. It does not trust the browser to hide data it already downloaded.
- Dashboard “add widget” lists published widgets for that environment, and saving the layout writes placements.

Until those calls exist, the library is a faithful editor for the records a backend would store, running entirely in the session.
