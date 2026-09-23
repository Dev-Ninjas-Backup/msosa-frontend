import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Ellipsis, IdCard, LogOut } from "lucide-react";
import { toast } from "sonner";
import { MenuItem } from "@/utils/Generator/MenuGenerator";
import { Location } from "react-router-dom";
import { cn } from "@/lib/utils";
import Logo from "@/common/Logo";
import { REFINER_PROFILE } from "@/pages/Refiner/ReviewQueue/data";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import ConfirmModal from "@/components/reuseable/ConfirmModal";
import { useAppDispatch } from "@/hooks/useRedux";
import { logOut } from "@/store/features/AuthSlice/authSlice";

const exactMatchPaths = [
  "/founder",
  "/consumer",
  "/enterprise",
  "/employee",
  "/refiner",
];



const isRouteActive = (item: MenuItem, currentPath: string): boolean => {
  if (!item.path) return false;

  if (currentPath === item.path) return true;

  if (exactMatchPaths.includes(item.path)) return false;

  if (item.path !== "/" && currentPath.startsWith(item.path + "/")) return true;

  if (item.children) {
    return item.children.some((child) => isRouteActive(child, currentPath));
  }

  return false;
};

const hasActiveChild = (menuItem: MenuItem, path: string): boolean => {
  if (!menuItem.children) return false;
  return menuItem.children.some(
    (child) => isRouteActive(child, path) || hasActiveChild(child, path)
  );
};

const SidebarItem = ({ item, location, depth = 0 }: { item: MenuItem; location: Location; depth?: number }) => {
  const [isOpen, setIsOpen] = useState(() => hasActiveChild(item, location.pathname));
  const hasChildren = !!item.children?.length;
  const isActive = isRouteActive(item, location.pathname);

  return (
    <div className="w-full">
      {hasChildren ? (
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "flex items-center justify-between w-full rounded-xl transition-all duration-200 group cursor-pointer",
              depth === 0 ? "h-11 px-4 text-[14px] font-medium" : "h-10 px-3 text-[13px] font-medium",
              isActive
                ? "bg-white/10 text-white"
                : "text-secondary-text hover:bg-white/5 hover:text-primary-text"
            )}
          >
            <div className="flex items-center gap-3">
              {item.icon && (
                <span className={cn("shrink-0 transition-colors",
                  depth === 0 ? "[&_svg]:size-[18px]" : "[&_svg]:size-4",
                  isActive ? "text-white" : "text-secondary-text group-hover:text-primary-text"
                )}>
                  {item.icon}
                </span>
              )}
              <span className="truncate">{item.label}</span>
            </div>
            <ChevronRight
              className={cn(
                "w-3.5 h-3.5 transition-transform duration-200 shrink-0",
                isActive
                  ? "text-white"
                  : "text-secondary-text group-hover:text-primary-text",
                isOpen && "rotate-90"
              )}
            />
          </button>
          {isOpen && (
            <div className={cn(
              "mt-1 space-y-1 border-l border-white/10 animate-in slide-in-from-top-1 duration-200",
              depth === 0 ? "ml-6 pl-3" : "ml-3 pl-2"
            )}>
              {item.children!.map((child) => (
                <SidebarItem key={child.path} item={child} location={location} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <NavLink
          to={item.path || "#"}
          className={cn(
            "flex items-center gap-3 rounded-xl transition-all duration-200 no-underline! group",
            depth === 0 ? "h-11 px-4 text-[14px] font-medium" : "h-10 px-3 text-[13px] font-medium",
            isActive
              ? "bg-white/10 text-white"
              : "text-secondary-text hover:bg-white/5 hover:text-primary-text"
          )}
        >
          {item.icon && (
            <span className={cn("shrink-0 transition-colors",
              depth === 0 ? "[&_svg]:size-[18px]" : "[&_svg]:size-4",
              isActive ? "text-white" : "text-secondary-text group-hover:text-primary-text"
            )}>
              {item.icon}
            </span>
          )}
          <span className="truncate">{item.label}</span>
        </NavLink>
      )}
    </div>
  );
};

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  menu: MenuItem[];
}

const Sidebar = ({ isMobileOpen, setIsMobileOpen, menu }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isRefiner = location.pathname.startsWith("/refiner");
  const isEnterprise = location.pathname.startsWith("/enterprise");
  const isFounder = location.pathname.startsWith("/founder");
  const profilePath = isFounder
    ? "/founder/profile"
    : isRefiner
      ? "/refiner/profile-settings"
      : isEnterprise
        ? "/enterprise/profile"
        : "/consumer/profile";
  const [accountOpen, setAccountOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const w = window.innerWidth;
    if (w < 640) return false;
    if (w < 1280) return true;
    return localStorage.getItem("sidebar-collapsed") === "true";
  });
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );

  const prevBreakpoint = useRef<"mobile" | "sm-xl" | "xl">("xl");

  useEffect(() => {
    const getBreakpoint = (w: number): "mobile" | "sm-xl" | "xl" =>
      w < 640 ? "mobile" : w < 1280 ? "sm-xl" : "xl";

    const handleResize = () => {
      const w = window.innerWidth;
      const bp = getBreakpoint(w);
      setIsMobile(w < 640);

      if (bp === "sm-xl" && prevBreakpoint.current === "xl") {
        setIsCollapsed(true);
      }
      if (bp === "xl" && prevBreakpoint.current === "sm-xl") {
        setIsCollapsed(localStorage.getItem("sidebar-collapsed") === "true");
      }
      prevBreakpoint.current = bp;
    };

    prevBreakpoint.current =
      window.innerWidth < 640 ? "mobile" : window.innerWidth < 1280 ? "sm-xl" : "xl";

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setAccountOpen(false);
  }, [location.pathname, setIsMobileOpen]);

  const toggleCollapse = () => {
    const nextState = !isCollapsed;
    setIsCollapsed(nextState);
    if (typeof window !== "undefined" && window.innerWidth >= 1280) {
      localStorage.setItem("sidebar-collapsed", String(nextState));
    }
  };

  const confirmLogout = () => {
    dispatch(logOut());
    setLogoutOpen(false);
    setAccountOpen(false);
    toast.success("Logged out.");
    navigate("/login");
  };

  const avatarSrc = isRefiner
    ? REFINER_PROFILE.avatar
    : location.pathname.startsWith("/founder")
      ? "https://res.cloudinary.com/dc6zbxbvm/image/upload/v1772355382/nest-practice/zickqqto0zmov8aespmn.png"
      : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80";

  const displayName = location.pathname.startsWith("/founder")
    ? "Sourav Debnath"
    : location.pathname.startsWith("/enterprise")
      ? "Enterprise Admin"
      : location.pathname.startsWith("/employee")
        ? "Team Member"
        : isRefiner
          ? REFINER_PROFILE.displayName
          : "Alex";

  const displayRole = location.pathname.startsWith("/founder")
    ? "Founder"
    : location.pathname.startsWith("/enterprise")
      ? "Organization Lead"
      : location.pathname.startsWith("/employee")
        ? "Employee"
        : isRefiner
          ? REFINER_PROFILE.role
          : "Consumer";

  const groupedMenu = menu.reduce<Record<string, MenuItem[]>>((acc, item) => {
    const group = item.group || "";
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});

  const showCollapsed = isCollapsed && !isMobile;

  return (
    <aside
      className={cn(
        "bg-primary-bg border-r border-border text-primary-text h-screen flex flex-col transition-all duration-300 z-50 shrink-0",
        "sm:sticky sm:top-0 sm:translate-x-0",
        showCollapsed ? "sm:w-20" : "sm:w-[280px]",
        "fixed left-0 top-0 h-screen w-[280px] sm:static",
        isMobileOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
      )}
    >
      <button
        onClick={toggleCollapse}
        className="absolute right-[-12px] top-20 z-50 transform -translate-y-1/2 w-6 h-6 rounded-full bg-primary-bg border border-border hidden sm:flex items-center justify-center cursor-pointer hover:border-border-active/50 transition-colors text-secondary-text hover:text-primary-text focus:outline-none"
      >
        {showCollapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>

      <div className={cn("h-20 flex items-center justify-center border-b border-white/8 shrink-0", showCollapsed ? "px-1" : "px-4")}>
        <Link to={menu[0]?.path || "/"} className="w-full no-underline outline-none">
          <Logo collapsed={showCollapsed} className="w-full justify-center sm:justify-start" />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-5 scrollbar-thin">
        {Object.entries(groupedMenu).map(([group, items]) => (
          <div key={group} className="space-y-1">
            {!showCollapsed && Boolean(group.trim()) && (
              <span className="text-xs uppercase tracking-wider font-semibold text-muted-blue px-4 block mb-2">
                {group}
              </span>
            )}
            <div className="space-y-1">
              {items.map((item) =>
                showCollapsed ? (
                  <Link
                    key={item.path}
                    to={item.path || "#"}
                    className={cn(
                      "flex items-center justify-center h-11 rounded-xl transition-all duration-200",
                      isRouteActive(item, location.pathname)
                        ? "bg-white/10 text-white"
                        : "text-secondary-text hover:bg-white/5 hover:text-primary-text"
                    )}
                  >
                    {item.icon && (
                      <span
                        className={cn(
                          "shrink-0 [&_svg]:size-[18px]",
                          isRouteActive(item, location.pathname)
                            ? "text-white"
                            : "text-secondary-text"
                        )}
                      >
                        {item.icon}
                      </span>
                    )}
                  </Link>
                ) : (
                  <SidebarItem key={item.label + item.path} item={item} location={location} />
                )
              )}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 pb-5 border-t border-white/8 mt-auto shrink-0">
        <Popover open={accountOpen} onOpenChange={setAccountOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label="Account menu"
              className={cn(
                "w-full cursor-pointer border border-white/10 bg-white/5 text-left transition-colors hover:bg-white/10",
                showCollapsed
                  ? "flex items-center justify-center rounded-full border-0 bg-transparent p-0"
                  : "flex items-center justify-between gap-2 rounded-xl px-3 py-2.5",
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
                    <span className="truncate text-sm font-medium leading-tight text-primary-text">{displayName}</span>
                    <span className="mt-0.5 truncate text-xs leading-tight text-secondary-text">{displayRole}</span>
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
              <img src={avatarSrc} alt="" className="size-10 rounded-full border border-white/30 object-cover" />
              <div className="text-center">
                <p className="text-sm font-semibold leading-5 text-white">{displayName}</p>
                <p className="text-xs leading-4 text-white/40">{displayRole}</p>
              </div>
              <span className="rounded-full bg-[#10b7ba]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.4px] text-[#10b7ba]">
                Active Session
              </span>
            </div>
            <div className="px-2 pt-2">
              <Link
                to={profilePath}
                onClick={() => setAccountOpen(false)}
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

export default Sidebar;
