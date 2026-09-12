import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ConsumerSidebar from "./ConsumerSidebar";
import ConsumerHeader from "./ConsumerHeader";
import { menuGenerator } from "@/utils/Generator/MenuGenerator";

const pageMeta: Record<string, { title: string; description: string }> = {
  Dashboard: {
    title: "Welcome back, Sarah.",
    description: "You are currently working on FuturePath Blueprint™.",
  },
  Blueprints: {
    title: "Blueprint Marketplace",
    description: "",
  },
  Checkout: {
    title: "Checkout",
    description: "Complete your Blueprint purchase securely.",
  },
  "Checkout Success": {
    title: "Purchase Complete",
    description: "Your Blueprint is ready — continue your reflection journey.",
  },
  "Reflection Room": {
    title: "Reflection Room™",
    description: "Take a deep breath. Share what's on your mind.",
  },
  Reports: {
    title: "Reports",
    description: "Your delivered narratives and reflection analyses.",
  },
  Continuum: {
    title: "FRC™ Continuum",
    description: "Longitudinal data from your reflection journey.",
  },
  Profile: {
    title: "Profile",
    description: "Manage your personal details and preferences.",
  },
  Notifications: {
    title: "Notifications",
    description: "Stay on top of reflections, reports, and system updates.",
  },
};

type ConsumerLayoutProps = {
  config: any[];
};

const ConsumerLayout = ({ config }: ConsumerLayoutProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const menu = menuGenerator(config);

  const isContinuum = location.pathname.includes("/continuum");

  const findActiveItem = (items: any[]): any => {
    for (const item of items) {
      if (item.path === location.pathname) return item;
      if (item.children) {
        const found = findActiveItem(item.children);
        if (found) return found;
      }
    }
    for (const item of items) {
      if (
        item.path &&
        item.path !== "/consumer" &&
        location.pathname.startsWith(item.path)
      ) {
        return item;
      }
    }
    return null;
  };

  const activeItem = findActiveItem(menu);
  const meta =
    (activeItem && pageMeta[activeItem.label]) ||
    pageMeta.Dashboard;

  const isCheckoutSuccess = location.pathname.includes("/checkout/success");
  const isCheckout =
    location.pathname.includes("/checkout") && !isCheckoutSuccess;
  const isReportDetail = /\/report\/[^/]+$/.test(location.pathname);
  const isProfile = location.pathname.includes("/profile");
  const isNotifications = location.pathname.includes("/notifications");
  const headerMeta = isCheckoutSuccess
    ? pageMeta["Checkout Success"]
    : isCheckout
      ? pageMeta.Checkout
      : isReportDetail
        ? {
            title: "Report Details",
            description: "Deep dive into your delivered Blueprint narrative.",
          }
        : isProfile
          ? pageMeta.Profile
          : isNotifications
            ? pageMeta.Notifications
            : meta;

  const isReflectionRoom = location.pathname.includes("/reflection-room");

  if (isReflectionRoom) {
    return (
      <div className="h-screen overflow-hidden bg-black">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-primary-bg">
      <ConsumerSidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        menu={menu}
      />

      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden border-0 cursor-pointer"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto overscroll-contain">
        <ConsumerHeader
          title={headerMeta.title}
          description={headerMeta.description}
          onMenuClick={() => setIsMobileOpen(true)}
        />

        <main className={`flex-1 ${isContinuum ? "" : "px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8"}`}>
          <Outlet />
        </main>

        <footer className="px-4 sm:px-6 lg:px-8 py-4 border-t border-white/5">
          <p className="text-[11px] sm:text-xs text-muted-blue text-center sm:text-left">
            FAR Systems™ uses enterprise-grade encryption. Your personal
            reflection data is private and secure.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ConsumerLayout;
