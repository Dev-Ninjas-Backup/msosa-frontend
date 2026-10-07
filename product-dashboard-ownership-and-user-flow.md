# Product Dashboard Ownership and User Flow

**Audience:** Engineering and product before implementing Product Dashboard Builder™  
**Confirmed model:** Option A — product-level dashboard (not role/audience-based)  
**Related docs:** `dashboard-customizer.md`, `product-dashboard-clarification.md`, platform `README.md`

## Legend

| Label | Meaning |
| --- | --- |
| **Confirmed by Mike** | Explicitly stated in his messages |
| **Strongly implied by Mike** | Follows from his wording; not a one-line quote |
| **Recommended by us** | Best fit for this codebase + his intent; not client-signed |
| **Needs client confirmation** | Open; do not pretend he answered |

Audience/role-based dashboards (Consumer vs Enterprise vs Employee dashboards for the **same** product) are **OUT OF SCOPE** unless a product is already modeled as a separate product in Create Product™.

---

## 1. Executive summary

Mike wants a **Product Dashboard Builder™**: each FAR product owns a dashboard (layout + widgets). The Founder configures that while creating or configuring the product, picks widgets from Widget Library™, assigns the dashboard to the product, and publishes.

```text
Product
  └── Product Dashboard
        ├── Layout (from template or later custom)
        └── Widgets (from Widget Library™)
```

What exists today on `/founder/dashboard` (Edit Dashboard → Dashboard 1–4) is a **personal Founder home layout** stored in the browser. That is **not** the Product Dashboard Builder. It must be separated or repurposed.

**Primary configure path (recommended):** Create Product™ Step 7 + later edit via Product Details → Dashboard.  
**Who sees it (recommended from current app):** users who already have access to that product open it from their member hub / product surface — the dashboard is not a separate unlock; **product access** gates visibility.

---

## 2. What “Product Dashboard” means

**Confirmed by Mike**

- A dashboard configuration that belongs to a **product**
- Includes layout and widgets
- Different products may have completely different layouts and widget sets
- Configured in a Founder product workflow, then published with the product
- Built through one reusable FAR dashboard system (no hard-coded dashboard per product)

**Strongly implied by Mike**

- End users of that product see the configured dashboard after the product is published and they have access
- Changing Founder home layout must not silently change product dashboards

**Recommended by us**

```text
ProductDashboard =
  which layout template was chosen (or custom layout later)
  + which Widget Library™ widgets are included
  + arrangement / display options
  + draft vs published version of that configuration
```

---

## 3. What “Product” means in this context

In this repo, a **Product** is a Create Product™ / Product List entity: Reflection, Assessment, Enterprise, Protocol, etc., with status (`Draft`, `Published`, `Active`, `Archived`, `Upcoming`), division, pricing, and a ten-step configuration including dashboard.

**Confirmed by Mike (examples):** Product A, Product B, “Enterprise Product” as **separate products**, each with its own dashboard.

**Out of scope:** treating Consumer / Enterprise / Employee **roles** as dashboard slots on one product. If the business needs “Enterprise Reflection Suite” vs “Consumer Reflection,” those are **different products**, each with one dashboard.

---

## 4. Founder Dashboard vs Product Dashboard

| | Founder Dashboard (`/founder/dashboard`) | Product Dashboard |
| --- | --- | --- |
| Belongs to | Founder / platform ops | A specific Product |
| Purpose | Control center: products, analytics, ops widgets | Product experience for people who use that product |
| Today | Edit Layout + Dashboard 1–4 in `localStorage` | Step 7 toggles on product draft (incomplete builder) |
| After redesign | Stay as Founder ops home (optional personal layout) | Layout + widgets saved on the product and published |

**Confirmed by Mike:** product dashboards, not personal Founder appearance.  
**Recommended by us:** keep `/founder/dashboard` as the Founder control center. Remove or relabel “Edit Dashboard / Dashboard 1–4” so they are **not** presented as the Product Dashboard Builder. Reuse those presets as **layout templates** inside product configure.

---

## 5. Where the Founder configures the Product Dashboard

### Question 1 — Why is the customizer on Founder Dashboard today?

**Answer:** Historical / wrong binding. The UI was built as Founder personal layout. Mike’s requirement is product-owned. Showing Dashboard 1–4 on Founder home is a **gap**, not the target UX.

### Two UX options Mike allows (control can live in Founder area)

| Option | Flow | Fit |
| --- | --- | --- |
| **Product-centric (recommended)** | Products → Product → Product Details → Dashboard | Best match for “assign dashboard **to the product**” and existing Create Product / Product List |
| **Global Dashboard Builder** | Founder → Dashboard Builder → Select Product → Configure | Acceptable only if every session **starts with product selection**; weaker than product details for day-to-day edits |

**Recommended by us:** Product-centric. A floating “Dashboard Builder” without a product context invites the same mistake as today’s Founder home editor.

**Needs client confirmation:** whether Founder home keeps any personal layout editor at all after the redesign.

### Question 2 — Inside Product Details / Edit Product?

**Recommended by us: Yes.**

```text
Founder
  → Create Product™ (product list)
  → Select Product
  → Product Details / Configure Product
       ├── Overview
       ├── Configuration (other steps)
       ├── Dashboard   ← layout + widgets + preview
       └── Publish
```

That matches ownership. Today, “Edit” on Product List only reopens the wizard with seed data; there is no full Product Details shell yet — that shell should host Dashboard for post-create edits.

**Do not** treat this as the primary path:

```text
Founder Dashboard → Edit Dashboard
```

---

## 6. Product creation workflow

### Question 3 — Should Step 7 be the Product Dashboard Builder?

**Strongly implied by Mike:** Yes — create/configure product includes selecting dashboard and widgets before publish.

**Confirmed in product copy today:** Step 7 title is already “Dashboard Configuration” / “Select and configure reusable dashboard widgets for your product.”

**Recommended by us:** Expand Step 7 into the real builder (primary create-time place):

```text
Create Product
  → Steps 1–6 (identity, reflection, protocol, workflow, AI, reports)
  → Step 7: Product Dashboard
        ├── Select layout template (Dashboard 1–4 as templates)
        ├── Select widgets from Widget Library™
        ├── Arrange / enable widgets
        ├── Preview
        └── Save on product draft
  → Steps 8–9 (permissions, pricing)
  → Step 10: Publish
```

Step 7 today only toggles a fixed local widget list and does **not** load Widget Library™ records or layout presets. That is the implementation gap.

**Needs client confirmation:** whether “Select/Create Dashboard” means (a) only pick a layout template + widgets on the product, or (b) also manage named reusable dashboard definitions in a library before assign.

---

## 7. Product details / edit workflow

**Recommended by us**

```text
Product List → Product Details
  → Dashboard tab/section
       ├── Current published dashboard (read-only summary)
       ├── Edit draft (layout + widgets)
       ├── Preview
       └── Publish dashboard / Publish product
```

Create-time (Step 7) and edit-time (Product Details → Dashboard) share the same Product Dashboard model.

---

## 8. How users access the Product Dashboard

### Question 5 — Who sees it?

Mike did **not** specify login → exact screen. The existing member app (Consumer / Employee shared portal) already works like a **hub**:

- `/consumer/dashboard` or `/employee/dashboard` — journey + **Active Products** + marketplace links  
- Products via `customer-products`, checkout, reflection room, reports, continuum  

So the architecture already assumes **products are entered from a hub**, not that login always lands on one product dashboard.

| Model | Description | Status |
| --- | --- | --- |
| **1 — Product selection first** | Login → Member hub → My / Active Products → Open Product → Product Dashboard | **Recommended by us** (matches current app) |
| **2 — Product dashboard = main** | Login → Product Dashboard only | Weak fit if user has multiple products |
| **3 — Conditional** | One product → go to its dashboard; many → hub | **Recommended enhancement**; **needs client confirmation** |

```text
User (with product access)
  → Login
  → Member Dashboard (hub)     ← exists today
  → Active / My Products
  → Open Product A
  → Product A Dashboard        ← loads Product A’s published layout + widgets
```

Do **not** invent role-specific product dashboards here.

---

## 9. Product access / subscription vs dashboard

### Question 6 — What does “unlocking” mean?

**Recommended by us (from existing surfaces, not invented payment rules):**

```text
Founder creates & publishes Product
  → User gains access via existing product channels in the app
       (e.g. Consumer checkout/purchase; org invitation / assignment for employee-style access)
  → Product appears in the user’s product surfaces (Active Products, library, etc.)
  → Opening that product loads its published Product Dashboard
```

| Concept | Role |
| --- | --- |
| Product access | Gate: can the user open the product at all? |
| Product Dashboard | Presentation: what they see when the product is open |

The dashboard is **not** a separate unlockable SKU. If the product is not available to the user, its dashboard is not available.

**Needs client confirmation:** exact access rules per division (Consumer purchase vs Enterprise seat vs Employee assignment) if they differ from what the current UX already implies.

---

## 10. Dashboard 1–4 explanation

### Question 4

| Interpretation | Today in code | Target |
| --- | --- | --- |
| A. Actual product dashboards | No | No |
| B. Layout templates / presets | Partially — they rearrange Founder home columns | **Recommended:** yes, as **templates** for product dashboards |
| C. Founder personal layouts | **Yes today** (`LAYOUT_PRESET_KEY` / layout widgets in `localStorage`) | Keep only if Founder ops personalization remains, clearly labeled |

**Strongly implied + recommended:**

```text
Dashboard 1–4 = reusable layout templates
Product A → chooses Template 2 → selects widgets → saves Product A’s own configuration
```

**Needs client confirmation:**

1. Confirm Dashboard 1–4 become product layout templates.  
2. Confirm whether Founders may create a **fully custom layout** beyond 1–4 in Phase 2, or only later.

---

## 11. Widget Library relationship

**Confirmed by Mike**

- Widget Library™ is the reusable foundation  
- Do **not** redesign Widget Library™ for this work  
- Founder selects widgets from Widget Library™ into the product dashboard  

**Recommended by us**

```text
Widget Library™ (definitions: type, data source, version, publish status)
        ↓ select published widgets
Product Dashboard (assignments: which widgets, order, optional display overrides)
```

Only **published** Widget Library™ widgets should be assignable to a product dashboard going live. Drafts stay in the library.

Step 7’s current hardcoded `DEFAULT_DASHBOARD_WIDGETS` should be replaced by selection from `founderWidgets` / Widget Library™.

---

## 12. Publish / update behavior

### Question 7 — Edit after users already have access?

Mike’s “configure → **publish**” wording **strongly implies** a draft vs published split. He did **not** specify live vs version freeze for existing users.

| Behavior | Description | Status |
| --- | --- | --- |
| **A. Live update** | Every edit hits users immediately | Risky; weak match for “publish” |
| **B. Publish-based** | Users see last published dashboard until Founder publishes again | **Strongly implied / recommended** |
| **C. Version pin per user** | Old users stay on old version forever | **Needs client confirmation**; heavier |

**Recommended by us for Phase 2: B**

```text
Product Dashboard
  ├── draft configuration (Founder editing)
  └── published configuration (what users with access see)
```

Publishing product and/or publishing dashboard updates the live user experience.

**Needs client confirmation:** whether dashboard publish is the same action as product publish, or a separate “Publish dashboard” control.

### Question 8 — Product duplication

Product List today has edit/delete-style actions; **no first-class product duplicate** in Create Product™.

| Behavior | Status |
| --- | --- |
| Copy product → copy dashboard configuration into the new draft | **Recommended if/when duplicate exists** |
| Copy product → empty dashboard | Worse default |

Mark as **optional / future** until duplication exists.

### Question 9 — Unpublish / archive / delete

**Recommended by us**

| Product status | Product Dashboard config | Users |
| --- | --- | --- |
| Draft | Editable draft; not user-facing | No access |
| Published / Active | Config retained; published version served | Access per product rules |
| Unpublished / Archived | Config **retained** on product | Users cannot open product → cannot see dashboard |
| Deleted | Config deleted with product (or soft-delete with product) | No access |

Dashboard configuration is not deleted merely because the product is temporarily unavailable.

---

## 13. Dashboard ownership / data model

### Question 12–13 — Entity shape and template vs assignment

**Recommended by us**

```text
LayoutTemplate (Dashboard 1–4, later custom templates)
  id, name, grid/slots definition

Widget (Widget Library™ — already exists as founder widget definitions)
  id, type, dataSource, status, version, …

Product
  id, status, …
  └── ProductDashboard (owned by product)
        templateId (optional origin)
        layoutSnapshot          ← copy of layout at assign/save time
        widgetAssignments[]     ← snapshot of chosen widgets + order + overrides
        draftRevision
        publishedRevision
```

| Approach | Use? |
| --- | --- |
| Embed only flat fields on Product with no snapshot | Too weak for versioning |
| Live reference to shared template (inheritance) | Avoid as default — template edit would rewrite all products |
| **ProductDashboard assignment with snapshot** | **Recommended** |

**Template vs assigned dashboard (explicit):**

```text
Layout Template 2          ← reusable, library-level
        ↓ assign / save
Product A → ProductDashboard
        └── snapshot based on Template 2 + selected widgets
```

Changing Template 2 later must **not** change Product A’s published dashboard unless the Founder explicitly re-applies the template (**needs client confirmation** for that re-apply UX).

Reusable **Dashboard** entity (create once, assign to many products) is optional:

- **Minimum (Phase 2):** ProductDashboard embedded/assigned 1:1 with product + layout templates  
- **Later:** named Dashboard definitions assignable to products if Mike’s “Select/Create Dashboard” means a dashboard library  

**Needs client confirmation:** 1:1 ProductDashboard only vs reusable Dashboard library.

Future extensibility (audience) can add optional `audience` on assignments later without changing Widget Library™ — **not implemented now**.

---

## 14. Recommended UX / navigation

### Question 11 — Cleanest structure

**Recommended by us** (verified against Mike + current routes):

```text
Founder Control Center (/founder/dashboard)
  → ops home only (not product builder)

Create Product™ (/founder/create-product)
  → Product List
  → Create Product wizard
       → Step 7 Product Dashboard Builder
  → Edit Product / Product Details
       → Dashboard section (same builder)

Widget Library™ (/founder/widget-library)
  → create/publish widgets used by Step 7 / Product Details
```

Create-time and edit-time share one builder component bound to `productId`.

**Founder home Dashboard 1–4:** convert to template picker **inside** that builder; stop using them as the product customizer on `/founder/dashboard`.

---

## 15. Open questions Mike has NOT explicitly answered

1. Confirm Dashboard 1–4 = layout templates for products (not Founder-only forever).  
2. Custom layouts beyond 1–4 in Phase 2?  
3. After create, is Product Details → Dashboard the edit home? (we recommend yes)  
4. User access: always hub → product (Model 1), or conditional skip when one product (Model 3)?  
5. Dashboard publish = product publish, or separate?  
6. Post-publish edits: confirm publish-based (B) vs live (A) vs per-user version pin (C).  
7. Reusable Dashboard library vs 1:1 ProductDashboard only?  
8. Does re-applying a template overwrite an existing product dashboard?  
9. Keep any personal layout editor on Founder home after redesign?  
10. Product duplicate behavior when that feature exists?

Use `product-dashboard-clarification.md` yes/no list where it still helps; this doc is the team architecture brief.

---

## 16. Recommended implementation approach

### Phase order

1. **Data model** — `ProductDashboard` draft/published + layout snapshot + widget assignments; layout templates from Dashboard 1–4 definitions.  
2. **Upgrade Step 7** — layout picker, Widget Library™ multi-select (published widgets), arrange, preview; save on product draft.  
3. **Product Details Dashboard** — same builder for edit after create.  
4. **Runtime** — when a user opens a product they can access, render **published** Product Dashboard.  
5. **Founder home cleanup** — remove or relabel personal Edit Dashboard so it cannot be mistaken for the product builder; optionally keep Founder-ops personalization under a different name.  
6. **Do not** build audience/role dashboard matrices.

### Non-goals for this phase

- Role-based dashboards for one product  
- Hard-coded per-product React pages  
- Redesigning Widget Library™  
- Treating Founder browser `localStorage` layout as product source of truth  

### Consistency check with Mike’s workflow

| Mike step | Where it lives |
| --- | --- |
| Create Product | Create Product™ |
| Configure Product | Wizard + Product Details |
| Select/Create Dashboard | Step 7 / Dashboard section (layout template ± future dashboard library) |
| Select Layout | Template picker (Dashboard 1–4) |
| Select Widgets | Widget Library™ |
| Assign to Product | Saving ProductDashboard on that product |
| Publish | Step 10 / Publish (and/or publish dashboard revision) |

---

## 17. Audience / role-based dashboards — OUT OF SCOPE

**Explicitly out of scope for now:**

```text
One Product
  ├── Consumer Dashboard
  ├── Enterprise Dashboard
  └── Employee Dashboard
```

**In scope:**

```text
Product A → Dashboard A
Product B → Dashboard B
Enterprise Product (as its own product) → its Dashboard
```

If Consumer and Enterprise experiences must differ, create **separate products** (or separate product variants already represented as distinct Product records), each with one Product Dashboard — until Mike confirms Option C.

---

## Answers to the architectural questions (quick reference)

| # | Question | Determination |
| --- | --- | --- |
| 1 | Why customizer on Founder Dashboard? | Wrong binding today. Target: product-centric configure, not Founder home Edit. |
| 1b | Products → Product → Dashboard vs global Builder? | **Recommended:** Products → Product Details → Dashboard. Global builder only if it forces product select first. |
| 2 | Config in Product Details? | **Recommended: Yes.** |
| 3 | Step 7 = builder? | **Strongly implied / recommended: Yes** — expand it; wire Widget Library™ + layouts. |
| 4 | Dashboard 1–4? | Today: Founder personal presets. Target: **layout templates**. Custom layouts: confirm with Mike. |
| 5 | Who sees product dashboard? | Users with product access; hub → open product (**Model 1** recommended). |
| 6 | Unlock? | **Product access** gates; dashboard is the product UI, not a separate unlock. |
| 7 | Edit after users exist? | **Recommended: publish-based (B)**; confirm with Mike. |
| 8 | Duplicate product? | Future; recommend copy dashboard config. |
| 9 | Unpublish/archive/delete? | Keep config with product; deny user access while product unavailable. |
| 10 | Separate Founder vs Product? | **Yes — required.** |
| 11–14 | UX + data model | Product-owned ProductDashboard with layout/widget **snapshots**; Widget Library™ unchanged as source of widgets. |
