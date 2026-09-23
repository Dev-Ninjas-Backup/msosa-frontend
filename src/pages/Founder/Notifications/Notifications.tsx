import { useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowUpDown, Bell, CheckCircle2, FileText, Megaphone, MoreVertical, RefreshCw, Search, Users } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import { cn } from "@/lib/utils";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import {
  dismissNotice,
  getNotices,
  loadOlderNotices,
  markAllNoticesRead,
  markNoticeRead,
  subscribeNotices,
  type FounderNotice,
  type NoticeFilter,
} from "./data";

const FILTERS = ["All", "Unread", "Action Required", "Reflection Updates", "Reports", "Organization", "System"] as const;

const priorityTone = {
  "High Priority": "text-[#ef4444]",
  "Medium Priority": "text-[#3b82f6]",
  "Low Priority": "text-white/40",
};

const iconFor = (notice: FounderNotice) => {
  if (notice.filter === "Action Required") return <AlertTriangle className="size-4 text-[#ef4444]" />;
  if (notice.filter === "Reports") return <FileText className="size-4 text-[#60a5fa]" />;
  if (notice.filter === "Organization") return <Users className="size-4 text-white/70" />;
  if (notice.filter === "System") return <RefreshCw className="size-4 text-[#10b7ba]" />;
  return <Bell className="size-4 text-[#a78bfa]" />;
};

const Notifications = () => {
  const navigate = useNavigate();
  const notices = useSyncExternalStore(subscribeNotices, getNotices);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [newest, setNewest] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const unread = notices.filter((notice) => !notice.read).length;
  const actionRequired = notices.filter((notice) => notice.filter === "Action Required").length;

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return notices
      .filter((notice) => {
        const matchesFilter =
          filter === "All" ||
          (filter === "Unread" && !notice.read) ||
          notice.filter === (filter as NoticeFilter);
        const matchesQuery = !needle || `${notice.title} ${notice.body}`.toLowerCase().includes(needle);
        return matchesFilter && matchesQuery;
      })
      .sort((a, b) => (newest ? b.sort - a.sort : a.sort - b.sort));
  }, [notices, query, filter, newest]);

  const runAction = (notice: FounderNotice) => {
    if (notice.action === "Dismiss") {
      dismissNotice(notice.id);
      return;
    }
    markNoticeRead(notice.id);
    if (notice.action === "View Report") navigate("/founder/reports");
    else if (notice.action === "Take Action") toast.message("Opening the Leadership Growth reflection.");
    else if (notice.action === "What's New") toast.message("Reports analytics and the Reflections interface were updated in v2.4.");
    else setExpanded((current) => (current === notice.id ? null : notice.id));
  };

  return (
    <AnimatedContainer className="space-y-5 pb-8">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={<Bell className="size-4 text-[#10b7ba]" />} label="Unread" value={String(unread)} />
        <Stat icon={<AlertTriangle className="size-4 text-[#fbbf24]" />} label="Action Required" value={String(actionRequired)} />
        <Stat icon={<CheckCircle2 className="size-4 text-[#22c55e]" />} label="Completed" value={String(35 + (5 - Math.min(unread, 5)))} />
        <Stat icon={<Megaphone className="size-4 text-[#a78bfa]" />} label="Announcements" value="4" />
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <Input
              variant="soft"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search notifications by title or keyword..."
              leftIcon={<Search className="size-4 text-white/40" />}
              containerClassName="w-full lg:max-w-md"
              className="border-white/10 bg-black/40 text-white placeholder:text-white/35"
            />
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="h-10 rounded-lg border-white/10 bg-white/5 text-xs text-white" leftIcon={<ArrowUpDown className="size-3.5" />} title={newest ? "Newest First" : "Oldest First"} onClick={() => setNewest((value) => !value)} />
              <Button variant="secondary" size="sm" className="h-10 rounded-lg border-[#10b7ba]/40 bg-[#10b7ba]/15 text-xs font-semibold text-[#10b7ba]" title="Mark All as Read" onClick={markAllNoticesRead} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.6px] text-white/40">Filter By:</span>
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={cn(
                  "cursor-pointer rounded-full border px-3 py-1 text-xs",
                  filter === item ? "border-transparent bg-[#10b7ba] font-semibold text-black" : "border-white/10 bg-white/5 text-white/70",
                )}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {visible.map((notice) => (
              <article key={notice.id} className={cn("rounded-xl border bg-white/[0.03] p-4", notice.filter === "Action Required" && !notice.read ? "border-[#ef4444]/50" : "border-white/10")}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 gap-3">
                    <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/5">{iconFor(notice)}</span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-bold text-white">{notice.title}</h2>
                        {notice.tag && <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white/70">{notice.tag}</span>}
                        {notice.pinned && <span className="rounded bg-[#ef4444]/20 px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#ef4444]">Pinned</span>}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-white/60">{expanded === notice.id ? notice.body : notice.body}</p>
                      <p className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/40">
                        <span>{notice.time}</span>
                        {notice.priority && <span className={priorityTone[notice.priority]}>{notice.priority}</span>}
                        {!notice.read && <span className="size-1.5 rounded-full bg-[#10b7ba]" />}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      variant={notice.action === "Take Action" ? "primary" : "secondary"}
                      size="sm"
                      className={notice.action === "Take Action" ? "h-9 rounded-lg bg-[#fbbf24] px-4 text-xs font-bold text-black" : "h-9 rounded-lg border-white/10 bg-white/5 px-4 text-xs text-white"}
                      title={notice.action}
                      onClick={() => runAction(notice)}
                    />
                    <Popover open={openMenu === notice.id} onOpenChange={(open) => setOpenMenu(open ? notice.id : null)}>
                      <PopoverTrigger asChild>
                        <button type="button" aria-label={`${notice.title} actions`} className="cursor-pointer border-0 bg-transparent p-1 text-white/40">
                          <MoreVertical className="size-4" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-40 rounded-xl border-white/10 bg-[#111] p-1">
                        <button type="button" className="block w-full cursor-pointer rounded-lg border-0 bg-transparent px-3 py-2 text-left text-sm text-white hover:bg-white/5" onClick={() => { markNoticeRead(notice.id); setOpenMenu(null); }}>Mark as read</button>
                        <button type="button" className="block w-full cursor-pointer rounded-lg border-0 bg-transparent px-3 py-2 text-left text-sm text-[#ef4444] hover:bg-white/5" onClick={() => { dismissNotice(notice.id); setOpenMenu(null); }}>Dismiss</button>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </article>
            ))}
            {visible.length === 0 && <p className="py-10 text-center text-sm text-white/40">No notifications match this view.</p>}
          </div>

          <div className="flex justify-center pt-2">
            <Button variant="secondary" size="sm" className="h-10 rounded-full border-white/10 bg-white/5 px-5 text-sm text-white" title="Load Previous Notifications" onClick={loadOlderNotices} />
          </div>
        </div>

        <aside className="space-y-4">
          <section className="rounded-xl border border-[#10b7ba]/30 bg-[#062628] p-5">
            <h2 className="text-lg font-bold text-white">Need Help?</h2>
            <p className="mt-2 text-sm leading-6 text-white/60">Can&apos;t find a specific notification or having trouble with your Reflection updates?</p>
            <button type="button" className="mt-4 cursor-pointer border-0 bg-transparent p-0 text-sm font-semibold text-[#10b7ba]" onClick={() => toast.message("HR support has been contacted.")}>
              Contact HR Support →
            </button>
          </section>
          <section className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-[10px] font-bold uppercase tracking-[1px] text-white/40">Recent Activity</h2>
            <div className="mt-4 space-y-4 text-sm">
              <div>
                <p className="font-medium text-[#10b7ba]">Email Digest Sent</p>
                <p className="text-xs text-white/40">Daily summary of notifications was emailed to your work address.</p>
              </div>
              <div>
                <p className="font-medium text-[#a78bfa]">Settings Updated</p>
                <p className="text-xs text-white/40">You changed high priority alerts to &apos;Always Visible&apos;.</p>
              </div>
            </div>
          </section>
        </aside>
      </div>
      <p className="pt-4 text-center text-xs text-white/30">FAR Systems™ uses enterprise-grade encryption. Your personal reflection data is private and secure.</p>
    </AnimatedContainer>
  );
};

const Stat = ({ icon, label, value }: { icon: ReactNode; label: string; value: string }) => (
  <article className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-4">
    <div className="flex items-center gap-3 text-sm text-white/70">
      {icon}
      {label}
    </div>
    <p className="text-3xl font-bold text-white">{value}</p>
  </article>
);

export default Notifications;
