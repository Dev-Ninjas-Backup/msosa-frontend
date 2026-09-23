import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Menu,
  Check,
  CheckCheck,
  BellOff,
  ChevronDown,
  Clock,
  Palette,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import LayoutCustomizerBar from "@/pages/Founder/Dashboard/LayoutCustomizerBar";
import {
  LAYOUT_CANCEL_EVENT,
  LAYOUT_EDITING_CHANGED_EVENT,
  LAYOUT_RESUME_EVENT,
  OPEN_DASHBOARD_SETTINGS_EVENT,
  OPEN_LAYOUT_EDIT_EVENT,
} from "@/pages/Founder/Dashboard/data";

interface HeaderProps {
  title?: string;
  description?: string;
  onMenuClick?: () => void;
}

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "New User Registered",
    description: "Alex joined the reseller admin platform as a Manager.",
    time: "2 mins ago",
    read: false,
  },
  {
    id: "2",
    title: "System Performance Alert",
    description: "Database latency spiked above 250ms on node-1b.",
    time: "10 mins ago",
    read: false,
  },
  {
    id: "3",
    title: "Billing Invoice Paid",
    description: "Invoice #1092-B has been paid by Client BaseKit.",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "4",
    title: "Security Policy Updated",
    description:
      "Multi-factor authentication (MFA) requirements updated for all administrators.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "5",
    title: "Backup Completed",
    description:
      "Automated nightly backup completed successfully for database cluster storage.",
    time: "5 hours ago",
    read: true,
  },
];

const Header = ({ title, description, onMenuClick }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [layoutEditing, setLayoutEditing] = useState(false);

  const enterpriseNotifs = location.pathname.startsWith("/enterprise");
  const isFounder = location.pathname.startsWith("/founder");
  const isFounderDashboard = location.pathname === "/founder/dashboard";

  const openLayoutEdit = () => {
    if (!isFounderDashboard) return;
    window.dispatchEvent(new CustomEvent(OPEN_LAYOUT_EDIT_EVENT));
  };

  const openThemeSettings = () => {
    if (!isFounderDashboard) return;
    window.dispatchEvent(new CustomEvent(OPEN_DASHBOARD_SETTINGS_EVENT));
  };
  const openAllNotifications = () => {
    setIsNotifOpen(false);
    if (enterpriseNotifs) {
      navigate("/enterprise/notifications");
      return;
    }
    setIsModalOpen(true);
  };

  useEffect(() => {
    const onEditing = (e: Event) => {
      const detail = (e as CustomEvent<{ editing: boolean }>).detail;
      setLayoutEditing(Boolean(detail?.editing));
    };
    const onOpen = () => {
      if (location.pathname === "/founder/dashboard") {
        setLayoutEditing(true);
      }
    };
    window.addEventListener(LAYOUT_EDITING_CHANGED_EVENT, onEditing);
    window.addEventListener(OPEN_LAYOUT_EDIT_EVENT, onOpen);
    return () => {
      window.removeEventListener(LAYOUT_EDITING_CHANGED_EVENT, onEditing);
      window.removeEventListener(OPEN_LAYOUT_EDIT_EVENT, onOpen);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!isFounderDashboard && layoutEditing) setLayoutEditing(false);
  }, [isFounderDashboard, layoutEditing]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setIsNotifOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  if (isFounder && layoutEditing && isFounderDashboard) {
    return (
      <header className="sticky top-0 z-50 shrink-0 border-b border-border bg-card shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
        <div className="w-full px-4 sm:px-6 py-4 sm:py-5">
          <LayoutCustomizerBar
            embedded
            onCancel={() =>
              window.dispatchEvent(new CustomEvent(LAYOUT_CANCEL_EVENT))
            }
            onResume={() =>
              window.dispatchEvent(new CustomEvent(LAYOUT_RESUME_EVENT))
            }
          />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 bg-primary-bg/90 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between gap-4 w-full px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <button
            type="button"
            onClick={onMenuClick}
            className="p-2 -ml-2 rounded-lg hover:bg-primary-text/5 text-secondary-text hover:text-primary-text sm:hidden cursor-pointer shrink-0 border-0 bg-transparent"
          >
            <Menu className="w-6 h-6" />
          </button>

          {(title || description) && (
            <div className="flex flex-col min-w-0">
              {title ? (
                <h1 className="font-playfair text-xl sm:text-2xl lg:text-[28px] text-primary-text leading-tight truncate">
                  {title}
                </h1>
              ) : null}
              {description ? (
                <p className="mt-1 text-xs sm:text-sm text-secondary-text max-w-xl hidden sm:block">
                  {description}
                </p>
              ) : null}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="static sm:relative flex items-center" ref={searchRef}>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-secondary-text pointer-events-none" />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search…"
                className="h-12 w-48 lg:w-[323px] pl-10 pr-4 rounded-[10px] border border-border bg-primary-text/5 text-sm text-primary-text placeholder:text-secondary-text outline-none focus:border-button-bg/40 focus:bg-primary-text/[0.07] transition-all"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex size-12 items-center justify-center text-secondary-text hover:text-primary-text hover:bg-primary-text/5 rounded-xl border border-border bg-primary-text/5 transition-colors cursor-pointer sm:hidden"
            >
              <Search className="size-5" />
            </button>

            {isSearchOpen && (
              <div className="absolute left-0 right-0 sm:left-auto sm:right-0 top-full mt-2 w-auto sm:w-72 bg-card border border-border rounded-xl p-2 z-50 shadow-lg animate-in fade-in zoom-in-95 duration-100 sm:hidden">
                <Input
                  type="text"
                  variant="search"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Search…"
                  autoFocus
                  leftIcon={<Search className="w-5 h-5 text-secondary-text" />}
                />
              </div>
            )}
          </div>

          <div className="static sm:relative flex items-center" ref={notifRef}>
            <button
              type="button"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative flex size-12 items-center justify-center rounded-xl border border-border bg-primary-text/5 text-secondary-text hover:text-button-bg hover:border-button-bg/40 transition-colors cursor-pointer"
            >
              <Bell className="size-5" />
              {unreadCount > 0 && (
                <span className="absolute top-3.5 right-3.5 size-2 rounded-full bg-button-bg ring-2 ring-primary-bg" />
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute left-0 right-0 sm:left-auto sm:right-0 top-full mt-2 sm:mt-3 w-auto sm:w-80 bg-card border border-border rounded-xl py-2 z-50 shadow-lg animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center justify-between px-4 py-2 border-b border-border mb-1">
                  <p className="text-xs text-primary-text font-bold uppercase tracking-wider">
                    Notifications
                  </p>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="text-[10px] text-button-bg hover:underline flex items-center gap-1 font-semibold cursor-pointer border-0 bg-transparent"
                    >
                      <CheckCheck className="w-4 h-4" /> Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-64 overflow-y-auto divide-y divide-border">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-secondary-text flex flex-col items-center gap-1">
                      <BellOff className="w-8 h-8 opacity-40 mb-1" />
                      No notifications
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={cn(
                          "px-4 py-3 hover:bg-primary-text/5 transition-colors flex gap-3 items-start",
                          !n.read && "bg-primary-text/[0.03]"
                        )}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline gap-2">
                            <p
                              className={cn(
                                "text-xs truncate font-semibold",
                                n.read
                                  ? "text-secondary-text"
                                  : "text-primary-text"
                              )}
                            >
                              {n.title}
                            </p>
                            <span className="text-[9px] text-muted-blue shrink-0">
                              {n.time}
                            </span>
                          </div>
                          <p className="text-[11px] text-secondary-text mt-0.5 line-clamp-2">
                            {n.description}
                          </p>
                        </div>
                        {!n.read && (
                          <button
                            type="button"
                            onClick={() => markAsRead(n.id)}
                            className="text-button-bg p-1 hover:bg-primary-text/5 rounded-full shrink-0 cursor-pointer border-0 bg-transparent"
                            title="Mark as read"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>

                <div className="border-t border-border mt-1 pt-1.5 px-3">
                  <button
                    type="button"
                    onClick={openAllNotifications}
                    className="w-full text-center text-xs font-semibold text-secondary-text hover:text-button-bg py-1.5 hover:bg-primary-text/5 rounded-lg transition-colors cursor-pointer border-0 bg-transparent"
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {isFounder && (
            <>
              <button
                type="button"
                className="hidden lg:flex size-12 items-center justify-center rounded-xl border border-border bg-primary-text/5 text-secondary-text hover:text-primary-text transition-colors cursor-pointer"
                aria-label="History"
              >
                <Clock className="size-3.5" />
              </button>
              <button
                type="button"
                className="hidden lg:flex size-12 items-center justify-center rounded-xl border border-border bg-primary-text/5 text-secondary-text hover:text-primary-text transition-colors cursor-pointer"
                aria-label="Share"
              >
                <Share2 className="size-3.5" />
              </button>
              <button
                type="button"
                className="hidden md:flex h-12 items-center gap-2 rounded-xl border border-border bg-primary-text/5 px-4 text-left cursor-pointer hover:border-button-bg/30 transition-colors"
              >
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-primary-text leading-none">
                    Environment
                  </span>
                  <span className="flex items-center gap-1 text-[12px] text-secondary-text lowercase tracking-wide">
                    <span className="size-2 rounded-full bg-button-bg shrink-0" />
                    <span>
                      <span className="uppercase">P</span>roduction
                    </span>
                  </span>
                </span>
                <ChevronDown className="size-2.5 text-secondary-text ml-2" />
              </button>
              {isFounderDashboard && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="inline-flex h-12! rounded-xl! px-3! sm:px-4! text-sm font-medium"
                    leftIcon={<Palette className="size-4" />}
                    onClick={openThemeSettings}
                    title="Theme Settings"
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    className="inline-flex h-12! rounded-xl! px-4! sm:px-[30px]! text-sm font-medium"
                    onClick={openLayoutEdit}
                    title="Edit Dashboard"
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d1117] rounded-xl border border-white/10 max-w-lg w-full p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <h3 className="text-lg font-semibold text-primary-text">
                All Notifications
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-secondary-text hover:text-primary-text font-semibold text-sm cursor-pointer border-0 bg-transparent"
              >
                Close
              </button>
            </div>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={cn(
                    "p-4 rounded-lg border flex gap-3 items-start",
                    n.read
                      ? "border-white/10 bg-white/[0.03]"
                      : "border-primary-brand/20 bg-primary-brand/5"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4
                        className={cn(
                          "text-sm font-semibold",
                          n.read ? "text-secondary-text" : "text-primary-text"
                        )}
                      >
                        {n.title}
                      </h4>
                      <span className="text-[10px] text-muted-blue shrink-0">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-xs text-secondary-text mt-1 leading-relaxed">
                      {n.description}
                    </p>
                  </div>
                  {!n.read && (
                    <button
                      type="button"
                      onClick={() => markAsRead(n.id)}
                      className="text-primary-brand p-1 hover:bg-white/5 rounded-full shrink-0 cursor-pointer border-0 bg-transparent"
                      title="Mark as read"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
