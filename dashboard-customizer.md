# Founder Dashboard Customizer — What the Client Wants

**Source:** Mike (msosa29), Sept 30 — “Founder Dashboard – Dashboard Customizer”; confirmed in item 10 (Founder Dashboard / Product Dashboard Builder); Oct 2–3 reuse / assign-to-product notes.  
**Status:** Confirmed product-level intent (Option A). Audience-per-product (Option C) is not confirmed — use `product-dashboard-clarification.md` for the client Q&A.  
**Note:** The current Edit Dashboard / Layout Customizer (personal Dashboard 1–4) does not match this intent.

## One-sentence answer

Mike wants a **product dashboard builder**: the Founder chooses the layout and widgets that ship **with each product** (for example an Enterprise product). He does not want a tool that only rearranges the Founder’s own home screen.

## What Mike said

1. He sees Edit Dashboard / Layout Customizer with **Dashboard 1, 2, 3, and 4** on the Founder Dashboard and asked what that feature is for.
2. His intention for “customizable dashboards” is:
   - Create or select different dashboard layouts **for different products**
   - Example: **Enterprise products** may need a completely different dashboard and set of widgets than another product
3. He is fine with the control living on the Founder Dashboard, as long as the product is a **product dashboard builder / customizer**, not a personal appearance setting for the Founder’s own view.
4. Ideal moment: **while creating or configuring a product**, the Founder selects:
   - the dashboard layout for that product
   - the widgets that belong to that product’s dashboard
5. He marked this as **very important** and asked for confirmation.

### Confirmed workflow (item 10)

Create Product™ → Configure Product → Select/Create Dashboard → Add/Select Widgets from Widget Library™ → Assign Dashboard to Product → Publish.

The Widget Library™ does not need a redesign. The work is connecting it to this product configuration flow.

## What that means in product terms

| Question | Answer |
| --- | --- |
| Who customizes? | The Founder |
| What is being customized? | The dashboard that belongs to a **product** |
| Who sees the result? | People who use that product (for example Enterprise users of that product), not only the Founder looking at their control center |
| Why? | Different products need different dashboards and widgets |
| When? | During product create / product configuration |

A layout saved for Product A must not silently become Product B’s dashboard. Each product has its own layout + widget set.

## What the app does today (gap)

Today’s Founder Dashboard customizer is a **personal Founder home layout**:

- Presets: Dashboard 1–4
- Stored in the browser (`far-founder-dashboard-preset` / layout keys)
- Changes which cards appear on `/founder/dashboard` for that browser session
- It does **not** bind a layout to a product, and it does **not** publish that layout to Enterprise (or any other) product users

Create Product already has a **Step 7 — Dashboard** where widgets can be toggled on a product draft. That step is closer to Mike’s intent than the Founder home “Edit Dashboard” flow, but it is still a light configuration screen, not a full product dashboard builder tied to presets and published product experience.

## What Mike actually wants built

### Core outcome

When a Founder creates or edits a product, they define **that product’s dashboard**:

1. Pick a layout (the Dashboard 1–4 presets can stay as layout templates).
2. Choose which widgets appear on that product’s dashboard.
3. Save that configuration **on the product**.
4. When someone uses that product, they see **that** dashboard — not the Founder’s personal control-center arrangement.

### Intended mental model

```text
Product (e.g. Enterprise Reflection Suite)
  └── Product Dashboard
        ├── Layout preset (Dashboard 1 / 2 / 3 / 4 or later custom)
        └── Widget set (KPIs, charts, reports, continuum, etc.)
```

The Founder Control Center may still have its own operating dashboard. That is separate from product dashboards.

### Acceptable UX (per Mike)

- Controls can live in the Founder area.
- Preferred place: **inside Create / Configure Product** (dashboard step), not as “change my Founder home look.”
- Reusing the same layout presets and widget library is fine, as long as the save target is the **product**, not “my Founder session.”

## Requirements checklist (client intent)

- [ ] Dashboard customizer is framed as **product dashboard builder**, not personal theme/layout for Founder home alone
- [ ] Founder can assign **layout + widgets per product**
- [ ] Different products can have completely different dashboards
- [ ] Configuration happens during **product create / product configure**
- [ ] Saved config is owned by the product and used by that product’s audience
- [ ] Founder home edit mode, if kept, is clearly separate (Founder ops view vs product dashboard)

## Suggested confirmation reply to Mike

> Confirmed: the customizer should define the dashboard for each **product** (layout + widgets), especially so Enterprise and other products can ship different dashboards. It should not only rearrange the Founder’s personal control-center home. We’ll treat layout presets (Dashboard 1–4) as templates for product dashboards and wire that into product create / configure.

## Out of scope for his message

Mike did not ask for:

- Only color/theme skinning of the Founder home
- A single global dashboard for every product
- Consumer redesign of the customizer UI without product binding

Those may still exist as separate Founder tools; they are not what he meant by “customizable dashboards” in this note.
