import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Bell, ChevronRight, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import Button from "@/ui/Button";
import { ConsumerMenuButton } from "./ConsumerSidebar";
import { useMemberPortal } from "@/pages/shared/member/MemberPortalContext";
import {
  getMemberNotices,
  markAllMemberNoticesRead,
  markMemberNoticeRead,
  memberModalNotices,
  memberUnreadCount,
  subscribeMemberNotices,
} from "@/pages/shared/member/notifications/data";

type ConsumerHeaderProps = {
  title: string;
  description?: string;
  onMenuClick: () => void;
};

const ConsumerHeader = ({
  title,
  description,
  onMenuClick,
}: ConsumerHeaderProps) => {
  const { path } = useMemberPortal();
  const location = useLocation();
  const navigate = useNavigate();
  useSyncExternalStore(subscribeMemberNotices, getMemberNotices);
  const unreadCount = memberUnreadCount();
  const modalNotices = memberModalNotices();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    setIsNotifOpen(false);
  }, [location.pathname]);

  const openAllNotifications = () => {
    setIsNotifOpen(false);
    navigate(path("notifications"));
  };

  return (
    <header className="sticky top-0 z-30 bg-primary-bg/90 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
          <ConsumerMenuButton onClick={onMenuClick} />
          <div className="min-w-0 pt-0.5 sm:pt-0">
            <h1 className="font-playfair text-xl sm:text-2xl lg:text-[28px] text-primary-text leading-tight truncate">
              {title}
            </h1>
            {description && (
              <p className="mt-1 text-xs sm:text-sm text-secondary-text max-w-xl">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-secondary-text pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              className="h-10 w-48 lg:w-56 pl-10 pr-4 rounded-xl border border-white/10 bg-white/5 text-sm text-primary-text placeholder:text-secondary-text outline-none focus:border-primary-brand/40 focus:bg-white/[0.07] transition-all"
            />
          </div>

          <div className="relative flex items-center" ref={notifRef}>
            <button
              type="button"
              onClick={() => setIsNotifOpen((open) => !open)}
              className="relative flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-secondary-text hover:text-primary-brand hover:border-primary-brand/40 transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="size-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary-brand ring-2 ring-primary-bg" />
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 top-full z-50 mt-3 w-[min(calc(100vw-2rem),358px)] overflow-hidden rounded-xl border border-[#27272a] bg-[#121214] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
                <div className="flex items-center justify-between bg-white/10 px-5 py-5">
                  <p className="text-xl font-semibold tracking-[-0.5px] text-[#f8fafc]">
                    Notifications
                  </p>
                  <button
                    type="button"
                    className="cursor-pointer border-0 bg-transparent p-0 text-[13px] font-medium text-[#fbbf24]"
                    onClick={markAllMemberNoticesRead}
                  >
                    Mark all as read
                  </button>
                </div>
                <div>
                  {modalNotices.map((notice) => (
                    <button
                      key={notice.id}
                      type="button"
                      onClick={() => markMemberNoticeRead(notice.id)}
                      className="relative block w-full cursor-pointer border border-white/10 bg-transparent px-5 py-4 text-left"
                    >
                      <p className="pr-6 text-[15px] font-semibold text-[#f8fafc]">
                        {notice.shortTitle}
                      </p>
                      <p className="mt-2 text-[13px] leading-[18px] text-[#94a3b8]">
                        {notice.preview}
                      </p>
                      <p
                        className={cn(
                          "mt-2 text-[11px] font-medium",
                          notice.priority === "Medium" ? "text-[#3b82f6]" : "text-[#94a3b8]"
                        )}
                      >
                        {notice.priority === "Medium"
                          ? `Medium Priority • ${notice.ago}`
                          : notice.ago}
                      </p>
                      {notice.unread && (
                        <span className="absolute right-5 top-6 size-2 rounded-full bg-[#10b7ba]" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex justify-center border-t border-[#27272a] bg-[#0a0a0b] px-4 py-5">
                  <Button
                    variant="primary"
                    size="sm"
                    className="h-11 rounded-[10px] bg-[#fbbf24] px-6 text-sm font-medium text-black"
                    rightIcon={<ChevronRight className="size-3.5" />}
                    title="View all notifications"
                    onClick={openAllNotifications}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ConsumerHeader;
