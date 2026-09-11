import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Archive,
  CheckCircle2,
  ChevronDown,
  FileBarChart,
  HelpCircle,
  Mail,
  Megaphone,
  MoreVertical,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Card from "@/pages/Consumer/Dashboard/Card";
import { cn } from "@/lib/utils";

type NotifTag = "ACTION REQUIRED" | "PINNED" | "REPORTS" | "SYSTEM" | "MILESTONE";
type Priority = "High" | "Medium" | "Low";

type NotificationItem = {
  id: string;
  title: string;
  body: string;
  time: string;
  priority: Priority;
  tags: NotifTag[];
  unread: boolean;
  icon: "alert" | "report" | "milestone" | "system" | "announce";
  actionLabel?: string;
  actionHref?: string;
};

const INITIAL: NotificationItem[] = [
  {
    id: "1",
    title: "Reflection Due Soon: Leadership Growth",
    body: "Your scheduled reflection for Leadership Growth Blueprint is due in 6 hours. Complete it to keep your Continuum streak.",
    time: "12 min ago",
    priority: "High",
    tags: ["ACTION REQUIRED", "PINNED"],
    unread: true,
    icon: "alert",
    actionLabel: "Take Action",
    actionHref: "/consumer/reflection-room",
  },
  {
    id: "2",
    title: "New Report Ready: FuturePath Narrative",
    body: "Your latest Blueprint narrative has been delivered. Review insights and recommended next steps.",
    time: "1 hour ago",
    priority: "Medium",
    tags: ["REPORTS"],
    unread: true,
    icon: "report",
    actionLabel: "View Report",
    actionHref: "/consumer/report",
  },
  {
    id: "3",
    title: "Milestone Unlocked: 10 Reflections",
    body: "You've completed 10 reflections this month. Your FRC Continuum depth score increased.",
    time: "Yesterday",
    priority: "Low",
    tags: ["MILESTONE"],
    unread: true,
    icon: "milestone",
    actionLabel: "Dismiss",
  },
  {
    id: "4",
    title: "System Maintenance Window",
    body: "Scheduled maintenance Sunday 2:00–4:00 AM UTC. Reflection Room will remain available in read-only mode.",
    time: "2 days ago",
    priority: "Low",
    tags: ["SYSTEM"],
    unread: false,
    icon: "system",
    actionLabel: "Dismiss",
  },
  {
    id: "5",
    title: "Founder Announcement: Continuum Update",
    body: "New longitudinal charts are live on Continuum. Explore trend lines across your last 90 days.",
    time: "3 days ago",
    priority: "Medium",
    tags: ["SYSTEM"],
    unread: false,
    icon: "announce",
    actionLabel: "View Report",
    actionHref: "/consumer/continuum",
  },
];

const iconStyles: Record<
  NotificationItem["icon"],
  { bg: string; color: string; Icon: typeof Mail }
> = {
  alert: { bg: "bg-red-500/15", color: "text-red-400", Icon: AlertTriangle },
  report: { bg: "bg-sky-500/15", color: "text-sky-400", Icon: FileBarChart },
  milestone: {
    bg: "bg-violet-500/15",
    color: "text-violet-400",
    Icon: Sparkles,
  },
  system: { bg: "bg-white/10", color: "text-white/70", Icon: Settings },
  announce: {
    bg: "bg-fuchsia-500/15",
    color: "text-fuchsia-400",
    Icon: Megaphone,
  },
};

const tagClass = (tag: NotifTag) => {
  switch (tag) {
    case "ACTION REQUIRED":
      return "border-[#FBBF24]/40 bg-[#FBBF24]/15 text-[#FBBF24]";
    case "PINNED":
      return "border-white/20 bg-white/10 text-white/80";
    case "REPORTS":
      return "border-sky-500/30 bg-sky-500/10 text-sky-300";
    case "MILESTONE":
      return "border-violet-500/30 bg-violet-500/10 text-violet-300";
    default:
      return "border-white/15 bg-white/5 text-white/60";
  }
};

const priorityDot = (p: Priority) =>
  p === "High"
    ? "bg-red-400"
    : p === "Medium"
      ? "bg-[#FBBF24]"
      : "bg-emerald-400";

const Notifications = () => {
  const [items, setItems] = useState(INITIAL);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (n) =>
        n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q)
    );
  }, [items, query]);

  const unread = items.filter((n) => n.unread).length;
  const actionRequired = items.filter((n) =>
    n.tags.includes("ACTION REQUIRED")
  ).length;

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));

  const dismiss = (id: string) =>
    setItems((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="pb-4 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
        <p className="text-xs text-muted-blue">
          ABC Healthcare &gt; Sarah Johnson
        </p>
        <p className="text-xs sm:text-sm text-secondary-text">
          <span className="text-primary-text font-medium">{items.length}</span>{" "}
          Total Notifications ·{" "}
          <span className="text-[#14B8A6] font-semibold">{unread} Unread</span>
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-5">
        <div className="space-y-5 min-w-0">
          <AnimatedContainer delay={0.04}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  label: "Unread",
                  value: unread,
                  Icon: Mail,
                  tone: "text-[#14B8A6] bg-[#14B8A6]/15",
                },
                {
                  label: "Action Required",
                  value: actionRequired,
                  Icon: AlertTriangle,
                  tone: "text-[#FBBF24] bg-[#FBBF24]/15",
                },
                {
                  label: "Completed",
                  value: 35,
                  Icon: CheckCircle2,
                  tone: "text-emerald-400 bg-emerald-500/15",
                },
                {
                  label: "Announcements",
                  value: 4,
                  Icon: Megaphone,
                  tone: "text-violet-400 bg-violet-500/15",
                },
              ].map((s) => (
                <Card key={s.label} className="p-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex size-10 items-center justify-center rounded-xl shrink-0",
                        s.tone
                      )}
                    >
                      <s.Icon className="size-4" />
                    </span>
                    <div>
                      <p className="text-xl font-semibold text-primary-text">
                        {s.value}
                      </p>
                      <p className="text-xs text-secondary-text">{s.label}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </AnimatedContainer>

          <AnimatedContainer delay={0.08}>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                variant="search"
                leftIcon={<Search className="size-4" />}
                placeholder="Search notifications by title or keyword..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                containerClassName="flex-1"
              />
              <div className="flex gap-2 shrink-0">
                <Button variant="secondary" size="sm" onClick={markAllRead}>
                  Mark All as Read
                </Button>
                <Link
                  to="/consumer/profile"
                  className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-secondary-text hover:text-primary-brand"
                  aria-label="Notification settings"
                >
                  <Settings className="size-4" />
                </Link>
              </div>
            </div>
          </AnimatedContainer>

          <div className="space-y-3">
            {filtered.map((n, i) => {
              const meta = iconStyles[n.icon];
              return (
                <AnimatedContainer key={n.id} delay={0.1 + i * 0.03}>
                  <Card
                    className={cn(
                      "p-4 sm:p-5",
                      n.unread && "ring-1 ring-[#14B8A6]/25"
                    )}
                  >
                    <div className="flex gap-3 sm:gap-4">
                      <span
                        className={cn(
                          "flex size-11 sm:size-12 items-center justify-center rounded-full shrink-0",
                          meta.bg,
                          meta.color
                        )}
                      >
                        <meta.Icon className="size-5" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base sm:text-lg font-medium text-primary-text">
                            {n.title}
                          </h3>
                          {n.tags.map((tag) => (
                            <span
                              key={tag}
                              className={cn(
                                "rounded-md border px-1.5 py-0.5 text-[10px] font-semibold tracking-wide",
                                tagClass(tag)
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="mt-1.5 text-sm text-secondary-text leading-relaxed">
                          {n.body}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-blue">
                          <span>{n.time}</span>
                          <span className="inline-flex items-center gap-1.5">
                            <span
                              className={cn(
                                "size-1.5 rounded-full",
                                priorityDot(n.priority)
                              )}
                            />
                            {n.priority} Priority
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 shrink-0">
                        {n.actionLabel === "Take Action" ? (
                          <Button
                            variant="primary"
                            size="sm"
                            asChild={Boolean(n.actionHref)}
                          >
                            {n.actionHref ? (
                              <Link to={n.actionHref}>{n.actionLabel}</Link>
                            ) : (
                              n.actionLabel
                            )}
                          </Button>
                        ) : n.actionLabel === "View Report" && n.actionHref ? (
                          <Button variant="secondary" size="sm" asChild>
                            <Link to={n.actionHref}>{n.actionLabel}</Link>
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => dismiss(n.id)}
                            className="text-secondary-text! normal-case! tracking-normal!"
                          >
                            Dismiss
                          </Button>
                        )}
                        <button
                          type="button"
                          className="flex size-8 items-center justify-center rounded-lg text-secondary-text hover:bg-white/5 border-0 bg-transparent cursor-pointer"
                          aria-label="More actions"
                        >
                          <MoreVertical className="size-4" />
                        </button>
                      </div>
                    </div>
                  </Card>
                </AnimatedContainer>
              );
            })}
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-white/10 bg-white/[0.04] text-sm text-secondary-text hover:bg-white/[0.07] cursor-pointer"
            >
              Load Previous Notifications
              <ChevronDown className="size-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <AnimatedContainer delay={0.1}>
            <Card className="p-4 sm:p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-blue mb-3">
                Quick Actions
              </h3>
              <ul className="space-y-1">
                <li>
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-primary-text hover:bg-white/5 border-0 bg-transparent cursor-pointer text-left"
                  >
                    <CheckCircle2 className="size-4 text-[#14B8A6]" />
                    Mark All Read
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setItems([])}
                    className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-primary-text hover:bg-white/5 border-0 bg-transparent cursor-pointer text-left"
                  >
                    <Archive className="size-4 text-primary-brand" />
                    Archive All
                  </button>
                </li>
                <li>
                  <Link
                    to="/consumer/profile"
                    className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-primary-text hover:bg-white/5"
                  >
                    <Settings className="size-4 text-secondary-text" />
                    Notification Settings
                  </Link>
                </li>
              </ul>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={0.12}>
            <Card className="p-4 sm:p-5 relative overflow-hidden">
              <HelpCircle className="absolute -right-2 -bottom-2 size-24 text-white/[0.04]" />
              <h3 className="font-playfair text-lg text-primary-text">
                Need Help?
              </h3>
              <p className="mt-2 text-sm text-secondary-text leading-relaxed">
                Questions about notifications or account preferences? Reach out
                to your support team.
              </p>
              <button
                type="button"
                className="mt-4 text-sm font-medium text-primary-brand hover:underline border-0 bg-transparent cursor-pointer p-0"
              >
                Contact HR Support
              </button>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={0.14}>
            <Card className="p-4 sm:p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-blue mb-4">
                Recent Activity
              </h3>
              <ul className="space-y-4">
                {[
                  { title: "Email Digest Sent", time: "Today, 8:00 AM" },
                  { title: "Settings Updated", time: "Yesterday" },
                  { title: "Report Delivered", time: "2 days ago" },
                ].map((a) => (
                  <li key={a.title} className="flex gap-3">
                    <span className="mt-1.5 size-2 rounded-full bg-primary-brand shrink-0" />
                    <div>
                      <p className="text-sm text-primary-text">{a.title}</p>
                      <p className="text-xs text-muted-blue mt-0.5">{a.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
