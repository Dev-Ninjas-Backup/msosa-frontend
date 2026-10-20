# Phase 2 screen checklist

Each row in the screen tables is in this delivery. Open the live URL and the named screen is there.

Phase 3 does not add or remove these screens. Phase 3 is the later server work: accounts, saved sessions, payments, files, and processing on the screens already listed. That work is described after the screen tables. It is not a reason to reject a screen that already opens.

Live site: https://msosa-frontend-topaz.vercel.app

Figma file: [Far-System™-UP](https://www.figma.com/design/9EJvzZvBVdbIk4SmTIsbwV/Far-System%E2%84%A2-UP)

To enter a portal, open https://msosa-frontend-topaz.vercel.app/login and use **Founder**, **Consumer**, **Enterprise**, **Employee**, or **Refiner**. Those buttons open the portal directly.

Where several Figma frames are states of one screen, they share one URL.

## Landing and account

| Figma screen | Live URL | What opens |
| --- | --- | --- |
| FAR SYSTEMS Official Homepage | https://msosa-frontend-topaz.vercel.app/ | Marketing home |
| Welcome back | https://msosa-frontend-topaz.vercel.app/login | Sign in, plus the five portal buttons |
| Create Account | https://msosa-frontend-topaz.vercel.app/register | Individual or Enterprise registration. `/signup` opens the same screen |
| Check Your Inbox | https://msosa-frontend-topaz.vercel.app/register | Verification step after the registration form |
| Check Your Inbox, work email | https://msosa-frontend-topaz.vercel.app/employee/signup | Work email, code, then password |
| Forgot Password | https://msosa-frontend-topaz.vercel.app/forgot-password | Email, code, then a new password |

## Consumer

| Figma screen | Live URL | What opens |
| --- | --- | --- |
| Individual Consumer Dashboard | https://msosa-frontend-topaz.vercel.app/consumer/dashboard | Journey tracker, active reflection, Continue, reports, and quick actions |
| Marketplace | https://msosa-frontend-topaz.vercel.app/consumer/customer-products | Consumer products. A product dashboard opens from a product card |
| Checkout | https://msosa-frontend-topaz.vercel.app/consumer/checkout | Purchase form |
| Checkout complete | https://msosa-frontend-topaz.vercel.app/consumer/checkout/success | Confirmation, Start Reflection, and return to the dashboard |
| Reflection Room™ | https://msosa-frontend-topaz.vercel.app/consumer/reflection-room | Voice or text, English or Español, Music / Vibe, Save & Continue |
| Reports Dashboard | https://msosa-frontend-topaz.vercel.app/consumer/report | Report list |
| Report Details View | https://msosa-frontend-topaz.vercel.app/consumer/report/relationship-v2 | Report, version history, Music / Vibe |
| Continuum | https://msosa-frontend-topaz.vercel.app/consumer/continuum | FRC Continuum |
| Profile | https://msosa-frontend-topaz.vercel.app/consumer/profile | Individual profile |
| Notifications | https://msosa-frontend-topaz.vercel.app/consumer/notifications | Notices, with All, Action Required, Blueprint Updates, Organization, and System |

## Employee

Figma section: Emplyee.

| Figma screen | Live URL | What opens |
| --- | --- | --- |
| Employee Dashboard | https://msosa-frontend-topaz.vercel.app/employee/dashboard | Sarah Johnson, ABC Healthcare, assigned blueprint, Continue Reflection |
| My Blueprint | https://msosa-frontend-topaz.vercel.app/employee/customer-products | My Blueprints. No purchase price on this list |
| Reflection Room™ | https://msosa-frontend-topaz.vercel.app/employee/reflection-room | Same room as the consumer, on the employee path |
| Reports Dashboard | https://msosa-frontend-topaz.vercel.app/employee/report | Report list |
| Report Details View | https://msosa-frontend-topaz.vercel.app/employee/report/relationship-v2 | Report detail |
| Employee - Continuum | https://msosa-frontend-topaz.vercel.app/employee/continuum | Professional Development Continuum |
| Employee Profile | https://msosa-frontend-topaz.vercel.app/employee/profile | Profile plus department, employee id, and administrator |
| Employee Notifications | https://msosa-frontend-topaz.vercel.app/employee/notifications | Same notice filters as the consumer |

## Enterprise

| Figma screen | Live URL | What opens |
| --- | --- | --- |
| Enterprise Dashboard v2 | https://msosa-frontend-topaz.vercel.app/enterprise/dashboard | Organization dashboard |
| Employee Management List | https://msosa-frontend-topaz.vercel.app/enterprise/employee-management | Employee list. Add and edit stay on this page |
| Employee Detail Page | https://msosa-frontend-topaz.vercel.app/enterprise/employee-management/EMP-0041 | One employee, including Assign Reflection |
| Blueprint Management List | https://msosa-frontend-topaz.vercel.app/enterprise/blueprint-management | Enterprise products |
| Blueprint Detail Page | https://msosa-frontend-topaz.vercel.app/enterprise/blueprint-management/bp-leadership | One product, including preview |
| Invitation Management List | https://msosa-frontend-topaz.vercel.app/enterprise/invitation-management | Invitations. Create invitation stays on this page |
| Invitation Detail Page | https://msosa-frontend-topaz.vercel.app/enterprise/invitation-management/EMP-0041 | One invitation, secure link, resend, cancel |
| Participation Monitoring - Overview | https://msosa-frontend-topaz.vercel.app/enterprise/participation-monitoring | Participation list |
| Participation Monitoring - Employee Detail | https://msosa-frontend-topaz.vercel.app/enterprise/participation-monitoring/EMP-001 | One person's stage and timeline |
| Reports Center List Page | https://msosa-frontend-topaz.vercel.app/enterprise/reports | Organization reports |
| Report Detail Viewer Page | https://msosa-frontend-topaz.vercel.app/enterprise/reports/RPT-2026-0041 | One organization report |
| QCV™ Dashboard | https://msosa-frontend-topaz.vercel.app/enterprise/qcv | QCV overview and comparison |
| Notification Center List | https://msosa-frontend-topaz.vercel.app/enterprise/notifications | Organization notices |
| Billing & Subscription Overview | https://msosa-frontend-topaz.vercel.app/enterprise/billing | Plan, usage, and invoices |
| Billing History & Invoices | https://msosa-frontend-topaz.vercel.app/enterprise/billing/history | Invoice history |
| Profile Management | https://msosa-frontend-topaz.vercel.app/enterprise/profile | My Profile, Account Settings, Security, and Notification Preferences |

## Founder

| Figma screen | Live URL | What opens |
| --- | --- | --- |
| Founder Dashboard - Control Center | https://msosa-frontend-topaz.vercel.app/founder/dashboard | Control Center |
| Add New Widget | https://msosa-frontend-topaz.vercel.app/founder/dashboard | Widget library modal on the dashboard |
| Edit Widget | https://msosa-frontend-topaz.vercel.app/founder/dashboard | Widget configuration on the dashboard |
| Edit Dashboard | https://msosa-frontend-topaz.vercel.app/founder/dashboard | Layout editing on the dashboard |
| Create Product™ — Main List | https://msosa-frontend-topaz.vercel.app/founder/create-product | Product list |
| Create Product™ wizard | https://msosa-frontend-topaz.vercel.app/founder/create-product | Continue through Basic Info, Reflection, Protocol, Workflow, AI Config, Reports, Dashboard, Permissions, Pricing, and Publish. The Protocol screen is step 3 |
| Product dashboard builder | https://msosa-frontend-topaz.vercel.app/founder/create-product | Open a product, then its dashboard. Widgets reorder by drag or by Up and Down |
| Founder Widget Library Dashboard | https://msosa-frontend-topaz.vercel.app/founder/widget-library | Widget list |
| Create New Widget Configuration | https://msosa-frontend-topaz.vercel.app/founder/widget-library/create | New widget form |
| Widget Details - Preview & Versions | https://msosa-frontend-topaz.vercel.app/founder/widget-library/WID-FIN-8821 | One widget. Edit is on the same record |
| Protocol Library™ | https://msosa-frontend-topaz.vercel.app/founder/protocol-library | Protocol list, create, filter, duplicate, and archive |
| Founder User Management Dashboard | https://msosa-frontend-topaz.vercel.app/founder/user-management | Users and roles |
| User profile | https://msosa-frontend-topaz.vercel.app/founder/user-management/FAR-US-9921 | One user |
| Founder Report Management Dashboard | https://msosa-frontend-topaz.vercel.app/founder/reports | Reports |
| Report Templates & Configuration View | https://msosa-frontend-topaz.vercel.app/founder/reports/templates | Report templates |
| AI Services Dashboard Overview | https://msosa-frontend-topaz.vercel.app/founder/ai-services | Providers and prompts |
| Create New Prompt Page | https://msosa-frontend-topaz.vercel.app/founder/ai-services/create-new-prompt | New prompt |
| Link Center Dashboard | https://msosa-frontend-topaz.vercel.app/founder/link-center | Links |
| Create New Link Configuration | https://msosa-frontend-topaz.vercel.app/founder/link-center/create | New link |
| Founder – Analytics & Insights™ | https://msosa-frontend-topaz.vercel.app/founder/analytics-insights | Analytics |
| Founder – Financial Center™ | https://msosa-frontend-topaz.vercel.app/founder/financial-center | Financial overview |
| Invoice Listing Dashboard | https://msosa-frontend-topaz.vercel.app/founder/financial-center/invoices | Invoice list |
| Invoice detail | https://msosa-frontend-topaz.vercel.app/founder/financial-center/invoices/INV-2024-001 | One invoice |
| Founder Control Center profile | https://msosa-frontend-topaz.vercel.app/founder/profile | My Profile, Security, Notification Preferences, Login Sessions, and Activity Log |
| Notifications | https://msosa-frontend-topaz.vercel.app/founder/notifications | Founder notices |

## Refiner

Figma section: FAR Refiner.

| Figma screen | Live URL | What opens |
| --- | --- | --- |
| Refiner Dashboard | https://msosa-frontend-topaz.vercel.app/refiner/dashboard | Good morning, Alex Morgan, queue summary, and recent activity. The reviewer name on the profile is Masud J |
| Review Queue | https://msosa-frontend-topaz.vercel.app/refiner/review-queue | Reports needing review |
| Review Queue, open report | https://msosa-frontend-topaz.vercel.app/refiner/review-queue/1041 | One report, section edits, notes, and approve |
| Review History | https://msosa-frontend-topaz.vercel.app/refiner/review-history | Completed reviews |
| Profile & Settings | https://msosa-frontend-topaz.vercel.app/refiner/profile-settings | Profile, security, and notification preferences |

## Phase 3

Phase 3 keeps the same URLs. A server stores the result. Until then, the buttons run on demo data in this browser.

| Item | What this delivery does | What Phase 3 adds |
| --- | --- | --- |
| Account session | Sign in, register, employee signup, and forgot password accept the form and open a portal. Any complete code works. No email is sent. | A real session, a code sent by email, and each portal limited to its own role. |
| Continue | The stage stays in this browser: Reflection Room, then the product dashboard, then the report. | The same stage is stored on the server and survives another device or a cleared browser. |
| Reflection answers | Voice and text stay in the browser. | Audio and text are stored against the product the person continued, and that product dashboard shows them. |
| Journey tracker | The six circles show a fixed demo stage for the selected product. | The circles move from that person's real assignment. |
| Report opened by Continue | The report stop opens `relationship-v2`. | Continue opens the report for that assignment. |
| Widgets | Widgets show sample data. | Widgets show that product's live data. |
| Permissions | Permission flags can be set in Create Product. The portals do not enforce them. | An enterprise user does not see an employee's private reflection text unless that product allows it. |
| Refiner approval | Approve confirms on the refiner screen. | Approval publishes the report to the member. |
| PDF | Export and download controls confirm the action. They do not create a file. | A real PDF is generated and delivered. |
| Protocols | The wizard and Protocol Library can select and edit a protocol in the browser. | Two protocols route to live data on the same architecture. |
| Enterprise records | Add, assign, invite, purchase, and invoice confirm on the page. A refresh restores the demo. | Employees, assignments, invitations, participation, purchases, and invoices persist. |
| Employee signup | A work email and any code open the employee dashboard. | The signup requires the invitation email and token sent by the organization. |
| Founder records | Publish, widgets, protocols, users, prompts, and links last until refresh. | Those records are stored on the server. |
| Payment | Checkout opens the success page. No charge is made. | Checkout takes payment and grants access. Enterprise billing is a real subscription. |
| Notifications | Each portal has its own notice list in the page. | Notices are loaded for the signed-in account. |
| Illumination processing | The processing step is a demo state. No model is called. | The server processes the submitted reflection. The AI choices in Create Product connect to that processing. |

## Not in this agreement

These were paused. They are not part of the delivered screens, and they are not Phase 3.

| Item | Status |
| --- | --- |
| Resize widgets | Outside the agreement |
| Copy a layout without customer data | Outside the agreement |
| Tables, schedules, announcements, and awards widgets | Outside the agreement |
| Custom appearance from reference images | Outside the agreement |
| AI creating or changing layouts inside Create a Product | Outside the agreement |
| Image plus instructions, preview, and conversational revisions | Outside the agreement |
| Save, approve, and restore dashboard templates as a library | Outside the agreement |
