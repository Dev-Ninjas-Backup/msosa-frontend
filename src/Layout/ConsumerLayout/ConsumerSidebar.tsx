import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Ellipsis, IdCard, LogOut, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { MenuItem } from "@/utils/Generator/MenuGenerator";
import { cn } from "@/lib/utils";
import Logo from "@/common/Logo";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import ConfirmModal from "@/components/reuseable/ConfirmModal";
import { useAppDispatch } from "@/hooks/useRedux";
import { logOut } from "@/store/features/AuthSlice/authSlice";
import { useMemberPortal } from "@/pages/shared/member/MemberPortalContext";

const COLLAPSE_KEY = "member-sidebar-collapsed";

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { basePath, path, role, roleLabel } = useMemberPortal();
  const [accountOpen, setAccountOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    const width = window.innerWidth;
    if (width < 1024) return false;
    if (width < 1280) return true;
    return localStorage.getItem(COLLAPSE_KEY) === "true";
  });
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1024
  );
  const prevBreakpoint = useRef<"mobile" | "lg" | "xl">("xl");

  useEffect(() => {
    const breakpoint = (width: number): "mobile" | "lg" | "xl" =>
      width < 1024 ? "mobile" : width < 1280 ? "lg" : "xl";

    const onResize = () => {
      const width = window.innerWidth;
      const next = breakpoint(width);
      setIsDesktop(width >= 1024);
      if (next === "lg" && prevBreakpoint.current === "xl") setIsCollapsed(true);
      if (next === "xl" && prevBreakpoint.current === "lg") {
        setIsCollapsed(localStorage.getItem(COLLAPSE_KEY) === "true");
      }
      prevBreakpoint.current = next;
    };

    prevBreakpoint.current = breakpoint(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setAccountOpen(false);
  }, [location.pathname, setIsMobileOpen]);

  const confirmLogout = () => {
    dispatch(logOut());
    setLogoutOpen(false);
    setAccountOpen(false);
    toast.success("Logged out.");
    navigate("/login");
  };

  const avatarSrc =
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80";
  const displayName = role === "employee" ? "Sarah Johnson" : "Liza Fernandes";

  const toggleCollapse = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    if (window.innerWidth >= 1280) {
      localStorage.setItem(COLLAPSE_KEY, String(next));
    }
  };

  const showCollapsed = isCollapsed && isDesktop;

  const isActive = (item: MenuItem) => {
    if (!item.path) return false;
    if (item.path === path("dashboard")) {
      return (
        location.pathname === path("dashboard") ||
        location.pathname === basePath
      );
    }
    if (item.path === path("customer-products")) {
      return (
        location.pathname.startsWith(path("customer-products")) ||
        location.pathname.startsWith(path("checkout"))
      );
    }
    if (item.path === path("report")) {
      return location.pathname.startsWith(path("report"));
    }
    return (
      location.pathname === item.path ||
      location.pathname.startsWith(item.path + "/")
    );
  };

  return (
    <aside
      className={cn(
        "bg-[#0a0c12] border-r border-white/8 text-primary-text h-screen flex flex-col z-50 shrink-0 transition-all duration-300",
        "fixed left-0 top-0 w-[260px]",
        "lg:static lg:translate-x-0",
        showCollapsed ? "lg:w-20" : "lg:w-[260px]",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <button
        type="button"
        onClick={toggleCollapse}
        aria-label={showCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute right-[-12px] top-20 z-50 hidden h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#0a0c12] text-secondary-text hover:text-primary-text lg:flex"
      >
        {showCollapsed ? (
          <ChevronRight className="size-3.5" />
        ) : (
          <ChevronLeft className="size-3.5" />
        )}
      </button>

      <div
        className={cn(
          "flex h-[88px] shrink-0 items-center border-b border-white/8 sm:h-[100px]",
          showCollapsed ? "justify-center px-2" : "justify-between px-5"
        )}
      >
        <Link
          to={path("dashboard")}
          className="w-full no-underline outline-none"
          onClick={() => setIsMobileOpen(false)}
        >
          <Logo
            collapsed={showCollapsed}
            className={cn("w-full", showCollapsed ? "justify-center" : "justify-start")}
          />
        </Link>
        <button
          type="button"
          aria-label="Close sidebar"
          className="border-0 bg-transparent p-2 text-muted-blue hover:text-primary-text cursor-pointer lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        >
          <X className="size-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        {menu.map((item) => {
          const active = isActive(item);
          return (
            <NavLink
              key={item.path}
              to={item.path || "#"}
              title={item.label}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "flex h-11 items-center rounded-xl text-[14px] font-medium no-underline! transition-all duration-200",
                showCollapsed ? "justify-center px-0" : "gap-3 px-4",
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
              {!showCollapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className={cn("mt-auto shrink-0 border-t border-white/8", showCollapsed ? "p-3" : "p-4 pb-5")}>
        <Popover open={accountOpen} onOpenChange={setAccountOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label="Account menu"
              className={cn(
                "w-full cursor-pointer border border-white/10 bg-white/5 text-left transition-colors hover:bg-white/10",
                showCollapsed
                  ? "flex items-center justify-center rounded-full border-0 bg-transparent p-0"
                  : "flex items-center justify-between gap-2 rounded-xl px-3 py-2.5"
              )}
            >
              <span className={cn("flex min-w-0 items-center", showCollapsed ? "" : "gap-3")}>
                <img
                  src={avatarSrc}
                  alt=""
                  className="size-9 shrink-0 rounded-full border border-white/30 object-cover"
                />
                {!showCollapsed && (
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-medium leading-tight text-primary-text">
                      {displayName}
                    </span>
                    <span className="mt-0.5 truncate text-xs leading-tight text-secondary-text">
                      {roleLabel}
                    </span>
                  </span>
                )}
              </span>
              {!showCollapsed && <Ellipsis className="size-4 shrink-0 text-secondary-text" />}
            </button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align={showCollapsed ? "center" : "start"}
            sideOffset={10}
            className="w-[220px] overflow-hidden rounded-xl border-white/20 bg-[#252525] p-0 text-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]"
          >
            <div className="flex flex-col items-center gap-3 border-b border-white/5 bg-white/5 p-4">
              <img
                src={avatarSrc}
                alt=""
                className="size-10 rounded-full border border-white/30 object-cover"
              />
              <div className="text-center">
                <p className="text-sm font-semibold leading-5 text-white">{displayName}</p>
                <p className="text-xs leading-4 text-white/40">{roleLabel}</p>
              </div>
              <span className="rounded-full bg-[#10b7ba]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.4px] text-[#10b7ba]">
                Active Session
              </span>
            </div>
            <div className="px-2 pt-2">
              <Link
                to={path("profile")}
                onClick={() => {
                  setAccountOpen(false);
                  setIsMobileOpen(false);
                }}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-xs font-medium text-white no-underline hover:bg-white/5"
              >
                <IdCard className="size-4 shrink-0" />
                View Profile
              </Link>
            </div>
            <div className="px-2">
              <button
                type="button"
                onClick={() => {
                  setAccountOpen(false);
                  setLogoutOpen(true);
                }}
                className="flex w-full cursor-pointer items-center gap-3 rounded-lg border-0 bg-transparent p-3 text-xs font-bold uppercase tracking-[0.3px] text-[#ef4444] hover:bg-white/5"
              >
                <LogOut className="size-4 shrink-0" />
                Log Out
              </button>
            </div>
            <p className="px-4 py-2 text-[9px] leading-[13.5px] text-white/20">FAR System™ v1.0</p>
          </PopoverContent>
        </Popover>
        <ConfirmModal
          isOpen={logoutOpen}
          onClose={() => setLogoutOpen(false)}
          onConfirm={confirmLogout}
          variant="danger"
          title="Log out?"
          description="This ends your active session on FAR System™."
          confirmText="Log Out"
          cancelText="Cancel"
        />
      </div>
    </aside>
  );
};

export default ConsumerSidebar;

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
