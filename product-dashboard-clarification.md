# Product Dashboard Builder™ — Clarification for Client

**Purpose:** Confirm how a dashboard is bound before we implement.  
**Sources:** Mike (msosa29) — Sept 30 customizer note; item 10; Oct 2–3 messages on Product Dashboard Builder™.  
**Also see:** `dashboard-customizer.md`, platform `README.md` (product dashboards section).

---

## What we think Mike means (our current read)

**Primary model: Option A — Product-level dashboard.**

Each product has one dashboard configuration (layout + widgets) assigned to that product.

| Product | Dashboard |
| --- | --- |
| Product A | Dashboard A |
| Product B | Dashboard B |
| Enterprise Product | Enterprise Dashboard |

### Why this reading

Mike’s language is consistently **product → dashboard**:

- “assign that dashboard **to the product**”
- “reusable product dashboards … for **each product**”
- “flexible and reusable for **future FAR products**”
- Workflow: create/configure product → select/configure layout → widgets from Widget Library™ → **assign to product** → publish
- Different **products** may need very different layouts and widget sets
- System must work across products and divisions **without hard-coding a new dashboard per product**

That is Option A: one reusable FAR dashboard system; many products; each product gets its assigned dashboard.

### What is not confirmed yet

| Option | Status |
| --- | --- |
| **A — Product-level** | Confirmed as the main intent |
| **B — Role-only** (one product, dashboards only by role, no product binding) | Does **not** match “assign to the product” |
| **C — Both** (each product can have several dashboards by audience/role) | Possible later; **not stated** in Mike’s messages |

“Divisions” and “Enterprise products” in his notes can mean **different product types** (Consumer product vs Enterprise product), not necessarily multiple dashboards inside one product for Consumer / Enterprise / Employee users.

**Recommendation until he answers:** implement Option A. Design the data model so Option C can be added later (product → one or more dashboard assignments, optional audience) without rewriting Widget Library™.

---

## Message to send Mike (copy / paste)

Subject: Product Dashboard Builder™ — one confirmation before we build

Hi Mike,

We’re happy to proceed with Product Dashboard Builder™ as a reusable system across FAR products (no hard-coded dashboard per product). Before implementation, we need one binding rule confirmed.

When you say the Founder configures a dashboard for each product, which model do you mean?

**Option A — Product-level (our current understanding)**  
Each product has its own dashboard.

- Product A → Dashboard A  
- Product B → Dashboard B  
- Enterprise Product → Enterprise Dashboard  

**Option B — Role / audience-level only**  
One product has different dashboards by who is logged in.

- Same product → Consumer dashboard / Enterprise dashboard / Employee dashboard  

**Option C — Both**  
Each product can have more than one dashboard, each aimed at a role or audience.

- Enterprise Product → Enterprise user dashboard + Employee dashboard  
- Consumer Product → Consumer dashboard  

Could you please answer the short yes/no list below? That tells us how to bind layout and widgets to the product and the user experience.

Thank you,  
[Name]

---

## Yes / No questions for Mike

Please reply **Yes** or **No** to each. If No, the “If no…” line is what we need instead.

### Binding

1. **Is Option A correct as the primary model?**  
   Each product has one dashboard (layout + widgets) assigned to that product.  
   - [ ] Yes  
   - [ ] No — If no: which option is correct, B or C? ________

2. **Should Option B alone be the model?**  
   Dashboards are chosen only by user role, not owned by a product.  
   - [ ] Yes  
   - [ ] No  

3. **Do you need Option C in Phase 2?**  
   One product can have multiple dashboards (e.g. Enterprise users vs Employees of the same product).  
   - [ ] Yes  
   - [ ] No — If no: is Option C planned for a later phase? Yes / No / Unknown ________

### Workflow (confirm)

4. **Is this the correct Founder workflow?**  
   Create/configure product → select or create dashboard → add/select widgets from Widget Library™ → assign dashboard to product → publish.  
   - [ ] Yes  
   - [ ] No — If no: what step is wrong or missing? ________

5. **Should Widget Library™ stay as the reusable widget source (no redesign), with the builder only connecting it to products?**  
   - [ ] Yes  
   - [ ] No — If no: what must change in Widget Library™? ________

### Who sees the dashboard

6. **After publish, do product users see that product’s assigned dashboard (not the Founder’s personal control-center layout)?**  
   - [ ] Yes  
   - [ ] No — If no: who sees the configured dashboard? ________

7. **If a product has only one audience (e.g. Consumer-only), is one dashboard per product enough?**  
   - [ ] Yes  
   - [ ] No — If no: which audiences need separate dashboards for that product? ________

### Founder home vs product builder

8. **Should Dashboard 1–4 on the Founder home stop being the “product customizer” and become either (a) product layout templates, or (b) a separate Founder ops view?**  
   - [ ] Yes — use as **templates** for product dashboards  
   - [ ] Yes — keep as **Founder-only** home layout, separate from products  
   - [ ] No — If no: how should Dashboard 1–4 work? ________

### Flexibility (from Oct messages)

9. **Must the same FAR dashboard system support future products without a developer hard-coding a new dashboard each time?**  
   - [ ] Yes  
   - [ ] No  

10. **May different products use completely different layouts and widget combinations through that same system?**  
    - [ ] Yes  
    - [ ] No  

---

## How answers change the build

| If Mike says… | We build… |
| --- | --- |
| A = Yes, C = No | Product → one Dashboard → widgets. Ship Phase 2 on that. |
| C = Yes | Product → list of Dashboard assignments (each with optional audience/role) → widgets. Larger data model and UI in configure product. |
| B = Yes, A = No | Role/audience catalogs only; product does not own the dashboard. Revisit architecture (conflicts with current wording). |

---

## Internal note (team)

Do not start Option C until question 3 is Yes. Do not treat Founder Dashboard Edit Layout as the product builder until questions 1 and 8 are answered. Widget Library™ work stays; binding and product configure flow are the Phase 2 focus for this feature.
