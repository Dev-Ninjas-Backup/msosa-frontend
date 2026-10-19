import { useMemo, useState, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Archive,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileBarChart,
  HelpCircle,
  Mail,
  Megaphone,
  MoreVertical,
  Search,
  Settings,
  Sparkles,
  Users,
  MailOpen,
  MapPinned,
  CheckCheck 
} from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Input from "@/ui/Input";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { useMemberPortal } from "@/pages/shared/member/MemberPortalContext";
import {
  archiveAllMemberNotices,
  dismissMemberNotice,
  getMemberNotices,
  markAllMemberNoticesRead,
  subscribeMemberNotices,
  type MemberNotice,
  type MemberNoticePriority,
  type MemberNoticeTag,
} from "@/pages/shared/member/notifications/data";

const iconStyles: Record<
  MemberNotice["icon"],
  { bg: string; color: string; Icon: typeof Mail }
> = {
  alert: { bg: "bg-rose-500/15", color: "text-rose-400", Icon: MapPinned  },
  report: { bg: "bg-sky-500/15", color: "text-sky-400", Icon: FileBarChart },
  milestone: {
    bg: "bg-violet-500/15",
    color: "text-violet-400",
    Icon: Sparkles,
  },
  announce: {
    bg: "bg-blue-500/15",
    color: "text-blue-400",
    Icon: Users,
  },
  system: {
    bg: "bg-teal-500/15",
    color: "text-teal-400",
    Icon: Settings,
  },
};



const tagClass = (tag: MemberNoticeTag) => {
  switch (tag) {
    case "ACTION REQUIRED":
      return "bg-amber-500/15 text-amber-300 border-amber-500/25";
    case "PINNED":
      return "bg-rose-500/15 text-rose-300 border-rose-500/25";
    case "REPORTS":
      return "bg-sky-500/15 text-sky-300 border-sky-500/25";
    case "CONTINUUM":
      return "bg-violet-500/15 text-violet-300 border-violet-500/25";
    case "ORGANIZATION":
      return "bg-blue-500/15 text-blue-300 border-blue-500/25";
    case "SYSTEM":
      return "bg-teal-500/15 text-teal-300 border-teal-500/25";
    default:
      return "bg-white/5 text-white/60 border-white/10";
  }
};

const priorityDot = (p: MemberNoticePriority) =>
  p === "High"
    ? "bg-rose-400"
    : p === "Medium"
      ? "bg-amber-400"
      : "bg-emerald-400";

const Notifications = () => {
  const { path } = useMemberPortal();
  const items = useSyncExternalStore(subscribeMemberNotices, getMemberNotices);
  const [query, setQuery] = useState("");
  const [chip, setChip] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((n) => {
      const matchQ =
        !q ||
        n.title.toLowerCase().includes(q) ||
        n.body.toLowerCase().includes(q);
      const matchChip =
        chip === "All" ||
        (chip === "Action Required" && n.tags.includes("ACTION REQUIRED")) ||
        (chip === "Blueprint Updates" &&
          (n.tags.includes("REPORTS") ||
            /blueprint|reflection/i.test(n.title))) ||
        (chip === "Organization" && n.tags.includes("ORGANIZATION")) ||
        (chip === "System" && n.tags.includes("SYSTEM"));
      return matchQ && matchChip;
    });
  }, [items, query, chip]);

  const unread = items.filter((n) => n.unread).length;
  const actionRequired = items.filter((n) =>
    n.tags.includes("ACTION REQUIRED")
  ).length;

  const markAllRead = () => markAllMemberNoticesRead();
  const dismiss = (id: string) => dismissMemberNotice(id);

  return (
    <div className="pb-6">
      {/* Stats */}
      <AnimatedContainer delay={0.04}>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-5">
          {[
            {
              label: "Total",
              value: items.length,
              Icon: Mail,
              tone: "text-sky-400 bg-sky-500/15",
            },
            {
              label: "Unread",
              value: unread,
              Icon: MailOpen ,
              tone: "text-teal-400 bg-teal-500/15",
            },
            {
              label: "Action Required",
              value: actionRequired,
              Icon: AlertTriangle,
              tone: "text-amber-400 bg-amber-500/15",
            },
            {
              label: "Completed",
              value: 35,
              Icon: CheckCheck,
              tone: "text-emerald-400 bg-emerald-500/15",
            },
            {
              label: "Announcements",
              value: 4,
              Icon: Megaphone,
              tone: "text-violet-400 bg-violet-500/15",
            },
          ].map((s) => (
            <Card key={s.label} className="px-6 py-8">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl shrink-0 py-2",
                    s.tone
                  )}
                >
                  <s.Icon className="size-4" />
                </span>
                <div className="space-y-0.5">
                  <p className="text-sm text-secondary-text mt-1">{s.label}</p>
                  <p className="text-xl font-semibold text-primary-text leading-none">
                    {s.value}
                  </p>
                  
                </div>
              </div>
            </Card>
          ))}
        </div>
      </AnimatedContainer>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-5">
        {/* Left column */}
        <div className="space-y-4 min-w-0">
          {/* Search + actions */}
          <AnimatedContainer delay={0.06}>
              <Card className="flex flex-col justify-between sm:flex-row gap-3 p-4">
                <Input
                  variant="search"
                  leftIcon={<Search className="size-4" />}
                  placeholder="Search notifications by title or keyword..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  containerClassName=""
                  className="bg-[#1C1C1F] w-fit min-w-100 text-sm text-primary-text placeholder:text-secondary-text focus:ring-0 focus:border-[#F5C542] focus:ring-[#F5C542] rounded-xl"
                />
             
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={markAllRead}
                  className="h-10 px-4 rounded-xl bg-[#FBBF241A] hover:bg-[#e8b93a] text-[#FBBF24] hover:text-black! text-xs font-semibold transition-colors cursor-pointer border-0"
                >
                  Mark All as Read
                </button>
                <button
                  type="button"
                  aria-label="Notification settings"
                  className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-[#1C1C1F] text-[#F8FAFC] hover:text-primary-text transition-colors cursor-pointer"
                >
                  <Settings className="size-4" />
                </button>
              </div>
               </Card>
          </AnimatedContainer>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-secondary-text">Filter By:</span>
            {[
              "All",
              "Action Required",
              "Blueprint Updates",
              "Organization",
              "System",
            ].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setChip(name)}
                className={cn(
                  "h-8 rounded-full border px-3 text-xs cursor-pointer",
                  chip === name
                    ? "border-[#FBBF24] bg-[#FBBF24] text-black"
                    : "border-white/15 bg-transparent text-secondary-text"
                )}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Notification list */}
          <div className="space-y-3">
            {filtered.map((n, i) => {
              const meta = iconStyles[n.icon];
              return (
                <AnimatedContainer key={n.id} delay={0.08 + i * 0.03}>
                  <Card className="p-4 sm:p-5">
                    <div className="flex gap-3 sm:gap-4">
                      {/* Icon */}
                      <span
                        className={cn(
                          "flex size-11 items-center justify-center rounded-full shrink-0",
                          meta.bg,
                          meta.color
                        )}
                      >
                        <meta.Icon className="size-5" />
                      </span>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[15px] font-medium text-primary-text">
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

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-secondary-text">
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

                      {/* Actions */}
                      <div className="flex items-start gap-2 shrink-0">
                        {n.actionLabel && (
                          n.actionHref ? (
                            <Link to={path(n.actionHref)}>
                              <button
                                type="button"
                                className={cn(
                                  "h-9 px-3.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border-0",
                                  n.actionVariant === "primary"
                                    ? "bg-[#F5C542] hover:bg-[#e8b93a] text-black"
                                    : "border border-white/15 bg-white/5 hover:bg-white/10 text-primary-text"
                                )}
                              >
                                {n.actionLabel}
                              </button>
                            </Link>
                          ) : (
                            <button
                              type="button"
                              onClick={() => dismiss(n.id)}
                              className="h-9 px-3.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-primary-text text-xs font-medium transition-colors cursor-pointer"
                            >
                              {n.actionLabel}
                            </button>
                          )
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
              className="inline-flex items-center gap-2 h-10 px-5 rounded-xl border border-white/10 bg-white/[0.04] text-sm text-secondary-text hover:bg-white/[0.07] cursor-pointer"
            >
              Load Previous Notifications
              <ChevronDown className="size-4" />
            </button>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Quick Actions */}

          <Card className="p-4 sm:p-5 space-y-6"> 
            <AnimatedContainer delay={0.1}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary-text mb-3">
                Quick Actions
              </h3>
              <ul className="space-y-1">
                <li>
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm text-primary-text hover:bg-white/5 border-0 bg-transparent cursor-pointer text-left"
                  >
                    <span className="inline-flex items-center gap-3">
                      <CheckCheck className="size-4 text-teal-400" />
                      Mark All Read
                    </span>
                    <ChevronRight className="size-4 text-secondary-text" />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={archiveAllMemberNotices}
                    className="w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm text-primary-text hover:bg-white/5 border-0 bg-transparent cursor-pointer text-left"
                  >
                    <span className="inline-flex items-center gap-3">
                      <Archive className="size-4 text-secondary-text" />
                      Archive All
                    </span>
                    <ChevronRight className="size-4 text-secondary-text" />
                  </button>
                </li>
                <li>
                  <Link
                    to={path("profile")}
                    className="w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm text-primary-text hover:bg-white/5"
                  >
                    <span className="inline-flex items-center gap-3">
                      <Settings className="size-4 text-secondary-text" />
                      Notification Settings
                    </span>
                    <ChevronRight className="size-4 text-secondary-text" />
                  </Link>
                </li>
              </ul>
          </AnimatedContainer>

          {/* Need Help */}
          <AnimatedContainer delay={0.12}>
            <Card className="p-4 sm:p-5 relative overflow-hidden bg-gradient-to-br from-[#FBBF242A] to-[#FBBF2400]" >
              <div className="absolute -right-1 -bottom-1 size-20 bg-[#F5C54210] rounded-full " />
              <div className="absolute -right-1 -bottom-1 size-20 flex items-center justify-center text-black/40 font-bold text-6xl z-10 rotate-325">?</div>
              {/* <HelpCircle className="absolute -right-1 -bottom-1 size-20 text-black rotate-325 z-10" /> */}
              <h3 className="font-playfair text-base text-primary-text">
                Need Help?
              </h3>
              <p className="mt-2 text-sm text-secondary-text leading-relaxed">
                Can’t find a specific notification or having trouble with your
                Reflection updates?
              </p>
              <button
                type="button"
                className="mt-3 text-sm font-medium text-[#F5C542] hover:text-[#e8b93a] border-0 bg-transparent cursor-pointer p-0"
              >
                Contact HR Support →
              </button>
            </Card>
          </AnimatedContainer>

          {/* Recent Activity */}
          <AnimatedContainer delay={0.14}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary-text mb-4">
                Recent Activity
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="mt-1.5 size-2 rounded-full bg-teal-400 shrink-0" />
                  <div>
                    <p className="text-sm text-primary-text">Email Digest Sent</p>
                    <p className="text-xs text-secondary-text mt-0.5">
                      Daily summary of notifications was emailed to your work
                      address.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 size-2 rounded-full bg-violet-400 shrink-0" />
                  <div>
                    <p className="text-sm text-primary-text">Settings Updated</p>
                    <p className="text-xs text-secondary-text mt-0.5">
                      You changed high-priority alerts to “Always Visible”.
                    </p>
                  </div>
                </li>
              </ul>
          </AnimatedContainer>
          </Card>
          
        </div>
      </div>
    </div>
  );
};

export default Notifications;