import { Link, NavLink, useLocation } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { MenuItem } from "@/utils/Generator/MenuGenerator";
import { cn } from "@/lib/utils";
import Logo from "@/common/Logo";

type ConsumerSidebarProps = {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  menu: MenuItem[];
};

const ConsumerSidebar = ({
  isMobileOpen,
  setIsMobileOpen,
  menu,
}: ConsumerSidebarProps) => {
  const location = useLocation();

  const isActive = (item: MenuItem) => {
    if (!item.path) return false;
    if (item.path === "/consumer/dashboard") {
      return (
        location.pathname === "/consumer/dashboard" ||
        location.pathname === "/consumer"
      );
    }
    if (item.path === "/consumer/blueprint") {
      return location.pathname.startsWith("/consumer/blueprint");
    }
    if (item.path === "/consumer/report") {
      return location.pathname.startsWith("/consumer/report");
    }
    return (
      location.pathname === item.path ||
      location.pathname.startsWith(item.path + "/")
    );
  };

  return (
    <aside
      className={cn(
        "bg-[#0a0c12] border-r border-white/8 text-primary-text h-screen flex flex-col z-50 shrink-0",
        "fixed left-0 top-0 w-[260px] transition-transform duration-300",
        "lg:static lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Logo Header */}
      <div className="h-[88px] sm:h-[100px] flex items-center justify-between px-5 border-b border-white/8 shrink-0">
        <Link
          to="/consumer/dashboard"
          className="w-full no-underline outline-none"
          onClick={() => setIsMobileOpen(false)}
        >
          <Logo className="w-full justify-start" />
        </Link>
        <button
          type="button"
          aria-label="Close sidebar"
          className="lg:hidden p-2 text-muted-blue hover:text-primary-text border-0 bg-transparent cursor-pointer"
          onClick={() => setIsMobileOpen(false)}
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1">
        {menu.map((item) => {
          const active = isActive(item);
          return (
            <NavLink
              key={item.path}
              to={item.path || "#"}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 h-11 px-4 rounded-xl text-[14px] font-medium no-underline! transition-all duration-200",
                active
                  ? "bg-white/10 text-white"
                  : "text-secondary-text hover:bg-white/5 hover:text-primary-text"
              )}
            >
              {item.icon && (
                <span
                  className={cn(
                    "shrink-0 [&_svg]:size-[18px]",
                    active ? "text-white" : "text-secondary-text"
                  )}
                >
                  {item.icon}
                </span>
              )}
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile Footer */}
      <div className="p-4 pb-5 border-t border-white/8 shrink-0">
        <div className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
          <Link
            to="/consumer/profile"
            onClick={() => setIsMobileOpen(false)}
            className="flex items-center gap-3 min-w-0 no-underline! flex-1"
          >
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
              alt="Liza Fernandes"
              className="size-9 rounded-full object-cover border border-white/10 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-primary-text truncate leading-tight">
                Liza Fernandes
              </p>
              <p className="text-xs text-secondary-text truncate">Consumer</p>
            </div>
          </Link>
          <button
            type="button"
            title="Logout"
            onClick={() => {
              window.location.href = "/";
            }}
            className="text-secondary-text hover:text-rose-400 transition-colors cursor-pointer border-0 bg-transparent p-1.5 shrink-0 rounded-lg hover:bg-white/5"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ConsumerSidebar;

/** Mobile-only hamburger trigger used by header */
export const ConsumerMenuButton = ({
  onClick,
}: {
  onClick: () => void;
}) => (
  <button
    type="button"
    aria-label="Open menu"
    onClick={onClick}
    className="p-2 -ml-2 rounded-lg hover:bg-white/5 text-secondary-text hover:text-primary-text lg:hidden cursor-pointer shrink-0 border-0 bg-transparent"
  >
    <Menu className="size-6" />
  </button>
);