import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { menuGenerator } from "@/utils/Generator/MenuGenerator";
import { getBlueprint } from "@/pages/Enterprise/BlueprintManagement/data";

const routeDescriptions: Record<string, string> = {
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
  "Reports™": "Organizational reports and exportable insights.",
  "QCV™": "Quarterly Capability Value comparison analysis.",
  "Billing™": "Plan, seats, invoices, and subscription.",

  "Dynamic Table": "Manage database records using a powerful dynamic table.",
  "Dynamic Form": "Build and submit validation-ready dynamic forms.",
  Employees: "Manage staff records, roles, and profiles.",
  Marketing: "Monitor campaigns, traffic growth, and outreach stats.",
  "System Settings":
    "Configure system settings, integrations, and preferences.",
  "Help & Support": "Access documentation and raise customer support tickets.",
};

const DashboardLayout = ({ config }: { config: any[] }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

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
  const isReportDetailPage = /\/enterprise\/reports\/[^/]+/.test(
    location.pathname
  );
  const title = isEnterpriseDash
    ? "Enterprise Dashboard"
    : isEmployeeDetail
      ? "Employee Profile"
      : isBlueprintList
        ? "Enterprise Solutions™"
        : isBlueprintDetail
          ? blueprintName ?? "Reflection Detail"
          : isInvitationDetail
            ? "Invitation Profile"
            : isReportDetailPage
              ? "Report Detail"
              : activeItem
                ? activeItem.label
                : "Overview";
  const description = isReportDetail
    ? ""
    : isEnterpriseDash ||
        isEmployeeDetail ||
        isBlueprintList ||
        isBlueprintDetail ||
        isInvitationDetail ||
        isReportDetailPage ||
        location.pathname.startsWith("/enterprise/")
      ? "Organization Administrator for Encounters Corporation"
      : activeItem && routeDescriptions[activeItem.label]
        ? routeDescriptions[activeItem.label]
        : "Welcome back to your dashboard.";

  return (
    <div className="flex h-screen overflow-hidden bg-primary-bg">
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
