import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { menuGenerator } from "@/utils/Generator/MenuGenerator";

const routeDescriptions: Record<string, string> = {
  Overview: "Welcome back to your reseller dashboard.",
  "Founder Control Center™":
    "Founder Operating System for the FAR Platform Engine™",
  "Dashboard™": "Founder Operating System for the FAR Platform Engine™",
  Dashboard: "Review refinement metrics and reports needing attention.",
  "Review Queue": " ",
  "Review History": " ",
  "Profile & Settings": " ",
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
  const title = activeItem ? activeItem.label : "Overview";
  const description = isReportDetail
    ? ""
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
