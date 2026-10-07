import { useState, useEffect, type ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { menuGenerator } from "@/utils/Generator/MenuGenerator";
import { getBlueprint } from "@/pages/Enterprise/BlueprintManagement/data";
import { getReport } from "@/pages/Enterprise/Reports/data";
import type { ManagedUser } from "@/pages/Founder/UserManagement/data";
import { useAppSelector } from "@/hooks/useRedux";
import {
  WIDGET_CREATE_PATH,
  WIDGETS_PATH,
  widgetPath,
} from "@/pages/Founder/WidgetLibrary/events";
import {
  bootDashboardTheme,
  DASHBOARD_THEME_ROOT_ID,
} from "@/lib/dashboardTheme";
import { getInvoice } from "@/pages/Founder/FinancialCenter/data";

const routeDescriptions: Record<string, string> = {
  "Create Product™":
    "Build and configure a new FAR Platform product by setting up its workflows, Reflections, protocols, AI behavior, dashboards, reports, user access, and operational settings.",
  "Widget Library™":
    "Manage, version, and deploy modular UI components across the FAR ecosystem.",
  "Protocol Library™":
    "Manage voice intelligence protocols and behavioral schemas across the FAR Platform Engine™.",
  "User Management™":
    "Founder Operating System for the FAR Platform Engine™",
  "Reports™":
    "Monitor analytics delivery, approval workflows, and report generation cycles.",
  "AI Services™":
    "Founder Operating System for the FAR Platform Engine.",
  "Link Center™":
    "Create, distribute, and monitor secure platform links across the FAR Platform Engine™.",
  "Analytics & Insights™":
    "Deep platform analytics, reflection data, and user trends.",
  "Financial Center™":
    "Revenue operations, transactions, and fiscal metrics.",
  Overview: "Welcome back to your reseller dashboard.",
  "Founder Control Center™":
    "Founder Operating System for the FAR Platform Engine™",
  "Dashboard™": "Founder Operating System for the FAR Platform Engine™",
  Dashboard: " ",
  "Review Queue": " ",
  "Review History": " ",
  "Profile & Settings": " ",
  "Employee Management": "Manage workforce roster, roles, and access.",
  "Enterprise Management": "Assign and track organizational Reflections™.",
  "Blueprint Management": "Assign and track organizational Reflections™.",
  "Invitation Management": "Send and monitor employee invitations.",
  "Participation Monitoring": "Track reflection and assessment participation.",
  "QCV™": "Quarterly Capability Value comparison analysis.",
  "Notifications™": "Enterprise notification center.",
  "Billing™": "Plan, seats, invoices, and subscription.",

  "Dynamic Table": "Manage database records using a powerful dynamic table.",
  "Dynamic Form": "Build and submit validation-ready dynamic forms.",
  Employees: "Manage staff records, roles, and profiles.",
  Marketing: "Monitor campaigns, traffic growth, and outreach stats.",
  "System Settings":
    "Configure system settings, integrations, and preferences.",
  "Help & Support": "Access documentation and raise customer support tickets.",
};

const ENGINE_NAME_RE = /FAR Platform Engine™?\.?$/;

const highlightEngineName = (text: string): ReactNode => {
  const match = text.match(ENGINE_NAME_RE);
  if (!match || match.index === undefined) return text;
  return (
    <>
      {text.slice(0, match.index)}
      <span className="italic text-[#fbbf24]">FAR Platform Engine™</span>
    </>
  );
};

const userStatusBadge = (user: ManagedUser): ReactNode => {
  const [label, tone] =
    user.status === "Suspended"
      ? ["Suspended", "border-[#ef4444]/40 bg-[#ef4444]/10 text-[#ef4444]"]
      : user.status === "Invited"
        ? ["Invitation Pending", "border-[#eab308]/40 bg-[#eab308]/10 text-[#eab308]"]
        : user.verification === "Verified"
          ? ["Active & Verified", "border-[#10b981]/40 bg-[#10b981]/10 text-[#10b981]"]
          : ["Active · Unverified", "border-[#f97316]/40 bg-[#f97316]/10 text-[#f97316]"];
  return (
    <span
      className={`shrink-0 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.5px] ${tone}`}
    >
      {label}
    </span>
  );
};

const DashboardLayout = ({ config }: { config: any[] }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const founderUsers = useAppSelector((s) => s.founderUsers.users);
  const founderWidgets = useAppSelector((s) => s.founderWidgets.widgets);
  const founderProducts = useAppSelector((s) => s.founderProducts.products);

  useEffect(() => {
    bootDashboardTheme();
  }, [location.pathname]);

  const menu = menuGenerator(config);

  const findActiveItem = (items: any[]): any => {
    for (const item of items) {
      if (item.path === location.pathname) return item;
      if (item.children) {
        const found = findActiveItem(item.children);
        if (found) return found;
      }
    }
    const basePaths = [
      "/founder",
      "/consumer",
      "/enterprise",
      "/employee",
      "/refiner",
    ];
    for (const item of items) {
      if (
        item.path &&
        !basePaths.includes(item.path) &&
        location.pathname.startsWith(item.path)
      ) {
        return item;
      }
    }
    return null;
  };

  const activeItem = findActiveItem(menu);
  const isReportDetail = /\/refiner\/review-queue\/[^/]+/.test(
    location.pathname
  );
  const isEnterpriseDash = location.pathname.startsWith("/enterprise/dashboard");
  const isEmployeeDetail = /\/enterprise\/employee-management\/[^/]+/.test(
    location.pathname
  );
  const isBlueprintList =
    location.pathname === "/enterprise/blueprint-management";
  const isBlueprintDetail = /\/enterprise\/blueprint-management\/[^/]+/.test(
    location.pathname
  );
  const blueprintMatch = location.pathname.match(
    /\/enterprise\/blueprint-management\/([^/]+)/
  );
  const blueprintName = blueprintMatch
    ? getBlueprint(blueprintMatch[1])?.name
    : undefined;
  const isInvitationDetail = /\/enterprise\/invitation-management\/[^/]+/.test(
    location.pathname
  );
  const isParticipationDetail =
    /\/enterprise\/participation-monitoring\/[^/]+/.test(location.pathname);
  const isReportsList = location.pathname === "/enterprise/reports";
  const isReportDetailPage = /\/enterprise\/reports\/[^/]+/.test(
    location.pathname
  );
  const isNotificationsPage =
    location.pathname === "/enterprise/notifications";
  const isBillingPage = location.pathname === "/enterprise/billing";
  const isBillingHistory =
    location.pathname === "/enterprise/billing/history";
  const isProfilePage = location.pathname === "/enterprise/profile";
  const reportMatch = location.pathname.match(
    /\/enterprise\/reports\/([^/]+)/
  );
  const reportName = reportMatch
    ? getReport(reportMatch[1])?.name
    : undefined;
  const isCreatePrompt =
    location.pathname === "/founder/ai-services/create-new-prompt";
  const isCreateLink = location.pathname === "/founder/link-center/create";
  const isAnalytics = location.pathname === "/founder/analytics-insights";
  const isFounderProfile = location.pathname === "/founder/profile";
  const isFounderNotifications = location.pathname === "/founder/notifications";
  const isFinancial = location.pathname === "/founder/financial-center";
  const isInvoices = location.pathname === "/founder/financial-center/invoices";
  const invoiceDetailId = location.pathname.match(/^\/founder\/financial-center\/invoices\/([^/]+)$/)?.[1];
  const invoiceRecord = invoiceDetailId ? getInvoice(decodeURIComponent(invoiceDetailId)) : undefined;
  const userProfileMatch = location.pathname.match(
    /^\/founder\/user-management\/([^/]+)$/
  );
  const profileUser = userProfileMatch
    ? founderUsers.find((u) => u.id === userProfileMatch[1])
    : undefined;
  const isFounderReports = location.pathname === "/founder/reports";
  const isReportTemplates = location.pathname === "/founder/reports/templates";
  const isWidgetList = location.pathname === WIDGETS_PATH;
  const isWidgetCreate = location.pathname === WIDGET_CREATE_PATH;
  const widgetEditId = location.pathname.match(/^\/founder\/widget-library\/([^/]+)\/edit$/)?.[1];
  const widgetDetailId = isWidgetCreate
    ? undefined
    : location.pathname.match(/^\/founder\/widget-library\/([^/]+)$/)?.[1];
  const routeWidget = founderWidgets.find((w) => w.id === (widgetDetailId ?? widgetEditId));
  const widgetCrumb = routeWidget
    ? `${routeWidget.id}: ${routeWidget.name}™`
    : widgetDetailId ?? widgetEditId ?? "";
  const widgetBreadcrumbs = isWidgetList
    ? [
        { label: "Founder Control Center™", to: "/founder/dashboard" },
        { label: "Dashboard Builder™" },
        { label: "Widget Library™" },
      ]
    : isWidgetCreate
    ? [
        { label: "Dashboard Builder™" },
        { label: "Widget Library™", to: WIDGETS_PATH },
        { label: "Create New Widget™" },
      ]
    : widgetEditId
    ? [
        { label: "Widget Library™", to: WIDGETS_PATH },
        { label: widgetCrumb, to: widgetPath(widgetEditId) },
        { label: "Edit Configuration" },
      ]
    : widgetDetailId
    ? [
        { label: "Widget Library™", to: WIDGETS_PATH },
        { label: widgetCrumb },
      ]
    : undefined;
  const productDetailMatch = location.pathname.match(
    /^\/founder\/create-product\/([^/]+)(?:\/(dashboard)(?:\/(preview))?)?$/
  );
  const routeProduct = productDetailMatch
    ? founderProducts.find((p) => p.id === productDetailMatch[1])
    : undefined;
  const isProductDashboard = productDetailMatch?.[2] === "dashboard";
  const isProductDashboardPreview = productDetailMatch?.[3] === "preview";
  const productBreadcrumbs = routeProduct
    ? isProductDashboardPreview
      ? [
          { label: "Create Product™", to: "/founder/create-product" },
          {
            label: routeProduct.name,
            to: `/founder/create-product/${routeProduct.id}`,
          },
          {
            label: "Dashboard",
            to: `/founder/create-product/${routeProduct.id}/dashboard`,
          },
          { label: "User Preview" },
        ]
      : isProductDashboard
        ? [
            { label: "Create Product™", to: "/founder/create-product" },
            {
              label: routeProduct.name,
              to: `/founder/create-product/${routeProduct.id}`,
            },
            { label: "Dashboard" },
          ]
        : [
            { label: "Create Product™", to: "/founder/create-product" },
            { label: routeProduct.name },
          ]
    : undefined;
  const breadcrumbs = widgetBreadcrumbs
    ? widgetBreadcrumbs
    : productBreadcrumbs
    ? productBreadcrumbs
    : isInvoices
    ? [
        { label: "Financial Center™", to: "/founder/financial-center" },
        { label: "Invoices™" },
      ]
    : invoiceDetailId
    ? [
        { label: "Financial Center™", to: "/founder/financial-center" },
        { label: "Invoices™", to: "/founder/financial-center/invoices" },
        { label: decodeURIComponent(invoiceDetailId) },
      ]
    : isFounderProfile
    ? [
        { label: "Founder Control Center™", to: "/founder/dashboard" },
        { label: "Account Settings" },
      ]
    : isCreateLink
    ? [
        { label: "Founder Control Center™", to: "/founder/dashboard" },
        { label: "Link Center™", to: "/founder/link-center" },
      ]
    : isCreatePrompt
    ? [
        { label: "AI Services™", to: "/founder/ai-services" },
        { label: "Create New Prompt" },
      ]
    : isReportTemplates
    ? [
        { label: "Reports™", to: "/founder/reports" },
        { label: "Templates & Configuration" },
      ]
    : userProfileMatch
      ? [
          { label: "User Management™", to: "/founder/user-management" },
          { label: profileUser?.name ?? "Unknown User" },
        ]
      : undefined;
  const titleBadge = profileUser ? userStatusBadge(profileUser) : undefined;
  const title = isFounderNotifications
    ? "Notifications"
    : isFounderProfile
    ? "Account Settings"
    : isInvoices
    ? "Invoices™"
    : invoiceDetailId
    ? `Invoice #${decodeURIComponent(invoiceDetailId)}`
    : isWidgetCreate
    ? "Create New Widget™"
    : widgetEditId
    ? "Edit Widget Configuration"
    : widgetDetailId
    ? "Widget Details & History"
    : isProductDashboardPreview
    ? "Product Dashboard User Preview™"
    : isProductDashboard
    ? "Product Dashboard Builder™"
    : routeProduct
    ? "Product Details™"
    : userProfileMatch
    ? "User Profile & Configuration"
    : isReportTemplates
    ? "Report Templates & Configuration™"
    : isFounderReports
    ? "Report Management™"
    : isCreateLink
    ? "Create New Link™"
    : isCreatePrompt
    ? "Create New Prompt"
    : isEnterpriseDash
    ? "Enterprise Dashboard"
    : isEmployeeDetail
      ? "Employee Profile"
      : isBlueprintList
        ? "Enterprise Solutions™"
        : isBlueprintDetail
          ? blueprintName ?? "Reflection Detail"
          : isInvitationDetail
            ? "Invitation Profile"
            : isParticipationDetail
              ? "Participation Detail"
              : isReportsList
                ? "Reports Center™"
                : isReportDetailPage
                  ? reportName ?? "Report Detail"
                  : isNotificationsPage
                    ? "Notifications™"
                    : isBillingPage
                      ? "Billing & Subscription™"
                      : isBillingHistory
                        ? "Historical Reports™"
                        : isProfilePage
                          ? "Encounters Profile"
                          : activeItem
                            ? activeItem.label
                            : "Overview";
  const rawDescription = isWidgetCreate
    ? "Configure a modular system component with distinct logic and visual layers."
    : widgetEditId
    ? "Update logic and visual layers. Published widgets need a redeploy to push changes live."
    : widgetDetailId
    ? "Preview live states, manage versions, and analyze deployment metrics."
    : isProductDashboardPreview && routeProduct
    ? `Read-only Founder preview of ${routeProduct.name} as users would see it. No consumer or employee login required.`
    : isProductDashboard && routeProduct
    ? `Configure the Product Dashboard for ${routeProduct.name}. Layout templates, Widget Library™ widgets, and styling — without recreating the product.`
    : routeProduct
    ? `${routeProduct.id} · ${routeProduct.division} · Manage product identity and its assigned Product Dashboard.`
    : isFounderNotifications
    ? ""
    : isFounderProfile
    ? "Organization Administrator for Encounters Corporation"
    : isCreateLink
    ? ""
    : isCreatePrompt
    ? routeDescriptions["Founder Control Center™"]
    : isReportTemplates
    ? "Configure visual architecture, PDF branding, and approval protocols for Founder knowledge assets."
    : isReportDetail || userProfileMatch
    ? ""
    : isNotificationsPage || isProfilePage
      ? ""
      : isEnterpriseDash ||
        isEmployeeDetail ||
        isBlueprintList ||
        isBlueprintDetail ||
        isInvitationDetail ||
        isParticipationDetail ||
        isReportsList ||
        isReportDetailPage ||
        isBillingPage ||
        isBillingHistory ||
        location.pathname.startsWith("/enterprise/")
        ? "Organization Administrator for Encounters Corporation"
        : activeItem && routeDescriptions[activeItem.label]
          ? routeDescriptions[activeItem.label]
          : "Welcome back to your dashboard.";
  const description = isFinancial ? (
    <>
      <span className="text-[10px] font-bold uppercase tracking-[1px] text-white/40">Last Updated:</span>{" "}
      <span className="text-xs font-semibold normal-case tracking-normal text-[#fbbf24]">Today • 9:30 AM</span>
    </>
  ) : isInvoices ? (
    "Manage, track and process billing for all platform-generated services."
  ) : invoiceDetailId ? (
    ``
  ) : isAnalytics ? (
    <>
      <span className="text-[10px] font-bold uppercase tracking-[1px] text-white/40">Last Updated:</span>{" "}
      <span className="text-xs font-semibold normal-case tracking-normal text-[#fbbf24]">Today • 9:45 AM</span>
    </>
  ) : (
    highlightEngineName(rawDescription)
  );

  return (
    <div
      id={DASHBOARD_THEME_ROOT_ID}
      className="flex h-screen overflow-hidden bg-primary-bg"
    >
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        menu={menu}
      />

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 sm:hidden transition-opacity duration-200"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto overscroll-contain">
        <Header
          title={isReportDetail ? "" : title}
          description={description}
          breadcrumbs={breadcrumbs}
          breadcrumbVariant={widgetBreadcrumbs ? "caps" : "default"}
          titleBadge={titleBadge}
          onMenuClick={() => setIsMobileOpen(true)}
        />

        <main className="flex-1 px-4 sm:px-6 py-4 sm:py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
