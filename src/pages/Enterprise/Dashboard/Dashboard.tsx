import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Download,
  FileSpreadsheet,
  Pencil,
  Receipt,
  Share2,
  TrendingDown,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";

const KPIS = [
  {
    label: "Employees",
    value: "145",
    delta: "5.2%",
    up: true,
    icon: Users,
  },
  {
    label: "Active Participants",
    value: "98",
    delta: "8.3%",
    up: true,
    icon: UserPlus,
  },
  {
    label: "Completed",
    value: "112",
    delta: "12.4%",
    up: true,
    icon: BookOpen,
  },
  {
    label: "Pending",
    value: "33",
    delta: "2.1%",
    up: false,
    icon: FileSpreadsheet,
  },
] as const;

const EMPLOYEE_BREAKDOWN = [
  { label: "Total Employees", value: 247, pct: 100, color: "#F5C542" },
  { label: "Invited", value: 198, pct: 80, color: "#F5C542" },
  { label: "Accepted", value: 156, pct: 63, color: "#2DD4BF" },
  { label: "Pending", value: 42, pct: 17, color: "#FB923C" },
  { label: "Suspended", value: 8, pct: 3, color: "#A1A1AA" },
] as const;

const BLUEPRINTS = [
  { name: "MindState™ Reflection", status: "Active", action: "View", to: "/enterprise/blueprint-management" },
  { name: "Leadership Alignment™", status: "Assigned", action: "View", to: "/enterprise/blueprint-management" },
  { name: "Org Readiness™", status: "Available", action: "Assign", to: "/enterprise/blueprint-management" },
] as const;

const REPORTS = [
  {
    title: "MindState™ Q1 2026",
    meta: "Completed Mar 31 · v1.2",
    status: "Ready" as const,
  },
  {
    title: "Leadership Alignment™ Q4 2025",
    meta: "Completed Dec 31 · v2.0",
    status: "Ready" as const,
  },
  {
    title: "Org Readiness™ Q3 2025",
    meta: "Completed Sep 30 · v1.0",
    status: "Archived" as const,
  },
  {
    title: "Q2 2026 Report",
    meta: "In progress · Q2 2026",
    status: "Pending" as const,
  },
];

const ACTIVITY = [
  {
    title: "Sarah Chen completed MindState™ Reflection",
    detail: "Reflection submitted for review",
    time: "5 min ago",
  },
  {
    title: "Marcus Webb accepted invitation",
    detail: "Joined Engineering · Leadership Alignment™",
    time: "20 min ago",
  },
  {
    title: "Assessment launched",
    detail: "Org Readiness™ assigned to Ops team",
    time: "40 min ago",
  },
  {
    title: "Priya Patel completed Leadership Alignment™",
    detail: "Score ready in Reports",
    time: "1 hr ago",
  },
  {
    title: "Assessment launched",
    detail: "MindState™ cycle opened for Q2",
    time: "4 hrs ago",
  },
];

const QUICK_ACTIONS = [
  { label: "Start New Blueprint", to: "/enterprise/blueprint-management", icon: BookOpen },
  { label: "Invite Employee", to: "/enterprise/invitation-management", icon: Share2 },
  { label: "View All Reports", to: "/enterprise/reports", icon: FileSpreadsheet },
  { label: "View QCV™", to: "/enterprise/qcv", icon: TrendingUp },
  { label: "Manage Billing", to: "/enterprise/billing", icon: Receipt },
  { label: "Add Employee", to: "/enterprise/employee-management", icon: UserPlus },
] as const;

const QCV_DATA = [
  { axis: "Business Growth", q2: 92, q1: 78 },
  { axis: "Leadership Growth", q2: 85, q1: 70 },
  { axis: "Employee Growth", q2: 88, q1: 74 },
  { axis: "Team Growth", q2: 80, q1: 68 },
  { axis: "Innovation Growth", q2: 90, q1: 72 },
];

const reportStatusClass = (status: (typeof REPORTS)[number]["status"]) =>
  status === "Ready"
    ? "bg-emerald-500/15 text-emerald-300"
    : status === "Archived"
      ? "bg-white/10 text-secondary-text"
      : "bg-orange-500/15 text-orange-300";

const blueprintStatusClass = (status: string) =>
  status === "Active"
    ? "bg-teal-500/15 text-teal-300"
    : status === "Assigned"
      ? "bg-[#FBBF24]/15 text-[#FBBF24]"
      : "bg-white/10 text-secondary-text";

const SectionLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link
    to={to}
    className="text-xs font-medium text-[#F5C542] hover:text-[#e8b93a] no-underline inline-flex items-center gap-1 shrink-0"
  >
    {children}
    <ArrowRight className="size-3.5" />
  </Link>
);

const EnterpriseDashboard = () => {
  return (
    <div className="space-y-6 sm:space-y-8 pb-8">
      <AnimatedContainer delay={0.04}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
              Good Morning, Mike 👋
            </h2>
            <p className="mt-2 text-sm text-secondary-text flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>Organization: ABC Healthcare</span>
              <span className="text-white/20 hidden sm:inline">|</span>
              <span>Current Cycle: Q2 2026</span>
            </p>
          </div>
          <Button variant="soft" size="sm" className="self-start sm:self-auto rounded-xl!">
            <Pencil className="size-3.5" />
            Edit Dashboard
          </Button>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.08}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {KPIS.map(({ label, value, delta, up, icon: Icon }) => (
            <Card key={label} className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-primary-brand">
                  <Icon className="size-5" />
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-xs font-medium",
                    up ? "text-teal-300" : "text-orange-300"
                  )}
                >
                  {up ? (
                    <TrendingUp className="size-3.5" />
                  ) : (
                    <TrendingDown className="size-3.5" />
                  )}
                  {delta}
                </span>
              </div>
              <p className="mt-4 text-[28px] font-bold text-primary-text leading-none">
                {value}
              </p>
              <p className="mt-2 text-sm font-medium text-primary-text">{label}</p>
              <p className="mt-1 text-xs text-secondary-text">vs last cycle</p>
            </Card>
          ))}
        </div>
      </AnimatedContainer>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_280px] gap-4 sm:gap-6">
        <AnimatedContainer delay={0.1}>
          <Card className="p-5 sm:p-6 h-full">
            <div className="flex items-center justify-between gap-3 mb-5">
              <h3 className="text-lg sm:text-xl text-primary-text">Employee Overview</h3>
              <SectionLink to="/enterprise/employee-management">Manage</SectionLink>
            </div>
            <ul className="space-y-4">
              {EMPLOYEE_BREAKDOWN.map((row) => (
                <li key={row.label}>
                  <div className="flex items-center justify-between gap-3 text-sm mb-1.5">
                    <span className="text-secondary-text">{row.label}</span>
                    <span className="text-primary-text font-medium tabular-nums">
                      {row.value}
                      <span className="ml-2 text-xs text-secondary-text">{row.pct}%</span>
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${row.pct}%`, backgroundColor: row.color }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </AnimatedContainer>

        <AnimatedContainer delay={0.12}>
          <Card className="p-5 sm:p-6 h-full">
            <div className="flex items-center justify-between gap-3 mb-5">
              <h3 className="text-lg sm:text-xl text-primary-text">Blueprint™</h3>
              <SectionLink to="/enterprise/blueprint-management">View All</SectionLink>
            </div>
            <ul className="space-y-3">
              {BLUEPRINTS.map((bp) => (
                <li
                  key={bp.name}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 flex items-center gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-primary-text truncate">{bp.name}</p>
                    <span
                      className={cn(
                        "mt-1.5 inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium",
                        blueprintStatusClass(bp.status)
                      )}
                    >
                      {bp.status}
                    </span>
                  </div>
                  <Button variant="soft" size="sm" asChild className="shrink-0 rounded-lg!">
                    <Link to={bp.to}>{bp.action}</Link>
                  </Button>
                </li>
              ))}
            </ul>
            <Link
              to="/enterprise/blueprint-management"
              className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[#F5C542] hover:text-[#e8b93a] no-underline"
            >
              Purchase New Reflection
              <ArrowRight className="size-3.5" />
            </Link>
          </Card>
        </AnimatedContainer>

        <AnimatedContainer delay={0.14}>
          <Card className="p-5 sm:p-6 h-full">
            <h3 className="text-lg sm:text-xl text-primary-text mb-4">Quick Actions</h3>
            <ul className="space-y-2">
              {QUICK_ACTIONS.map(({ label, to, icon: Icon }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-primary-text hover:border-white/20 hover:bg-white/[0.06] transition-colors no-underline"
                  >
                    <span className="flex size-8 items-center justify-center rounded-lg bg-white/5 text-primary-brand shrink-0">
                      <Icon className="size-4" />
                    </span>
                    <span className="truncate flex-1">{label}</span>
                    <ArrowUpRight className="size-3.5 text-secondary-text shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </AnimatedContainer>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-4 sm:gap-6">
        <AnimatedContainer delay={0.16}>
          <Card className="p-5 sm:p-6 h-full">
            <div className="flex items-center justify-between gap-3 mb-5">
              <h3 className="text-lg sm:text-xl text-primary-text">Reports</h3>
              <SectionLink to="/enterprise/reports">View All</SectionLink>
            </div>
            <ul className="space-y-3">
              {REPORTS.map((report) => (
                <li
                  key={report.title}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 flex flex-col sm:flex-row sm:items-center gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-primary-text">{report.title}</p>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-medium",
                          reportStatusClass(report.status)
                        )}
                      >
                        {report.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-secondary-text">{report.meta}</p>
                  </div>
                  {report.status !== "Pending" ? (
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="soft" size="sm" asChild className="rounded-lg!">
                        <Link to="/enterprise/reports">View Report</Link>
                      </Button>
                      <Button variant="soft" size="sm" className="rounded-lg!">
                        <Download className="size-3.5" />
                        PDF
                      </Button>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </Card>
        </AnimatedContainer>

        <AnimatedContainer delay={0.18}>
          <Card className="p-5 sm:p-6 h-full">
            <div className="flex items-center justify-between gap-3 mb-5">
              <h3 className="text-lg sm:text-xl text-primary-text">Recent Activity</h3>
              <SectionLink to="/enterprise/participation-monitoring">View All</SectionLink>
            </div>
            <ul className="space-y-5">
              {ACTIVITY.map((item) => (
                <li key={item.title + item.time} className="flex gap-3 border-b border-white/[0.06] pb-4 last:border-0 last:pb-0">
                  <span className="mt-1.5 size-2 rounded-full bg-primary-brand shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-primary-text">{item.title}</p>
                    <div className="mt-1 flex items-start justify-between gap-3">
                      <p className="text-xs text-secondary-text">{item.detail}</p>
                      <span className="text-[10px] text-muted-blue shrink-0">{item.time}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </AnimatedContainer>
      </div>

      <AnimatedContainer delay={0.2}>
        <Card className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
            <div>
              <h3 className="text-lg sm:text-xl text-primary-text">QCV™ Comparison Analysis</h3>
              <p className="mt-1 text-sm text-secondary-text">
                Relationship™ · Jan 01 — Dec 31, 2024
              </p>
            </div>
            <SectionLink to="/enterprise/qcv">View All</SectionLink>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_240px] gap-6 items-center">
            <div className="h-[280px] sm:h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={QCV_DATA} cx="50%" cy="50%" outerRadius="70%">
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis
                    dataKey="axis"
                    tick={{ fill: "#a1a1aa", fontSize: 11 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: "#71717a", fontSize: 10 }}
                    axisLine={false}
                  />
                  <Radar
                    name="Q1"
                    dataKey="q1"
                    stroke="#71717a"
                    fill="#71717a"
                    fillOpacity={0.15}
                    strokeWidth={1.5}
                  />
                  <Radar
                    name="Q2"
                    dataKey="q2"
                    stroke="#2DD4BF"
                    fill="#2DD4BF"
                    fillOpacity={0.35}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="size-2.5 rounded-sm bg-teal-400" />
                  <span className="text-primary-text">Q2 (87%)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="size-2.5 rounded-sm bg-zinc-500" />
                  <span className="text-secondary-text">Q1 (72%)</span>
                </div>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 space-y-3">
                <div>
                  <p className="text-xs text-secondary-text">Current Quarter</p>
                  <p className="text-sm font-medium text-primary-text mt-0.5">Q2 2026</p>
                  <p className="text-xs text-secondary-text mt-0.5">vs Q1 2026</p>
                </div>
                <div className="flex items-center gap-2 text-teal-300">
                  <TrendingUp className="size-4" />
                  <div>
                    <p className="text-sm font-medium">Improving</p>
                    <p className="text-xs">+9.7% · Trend: Positive</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </AnimatedContainer>

      <AnimatedContainer delay={0.22}>
        <Card className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 mb-6">
            <h3 className="text-lg sm:text-xl text-primary-text">Billing & Subscription</h3>
            <SectionLink to="/enterprise/billing">Upgrade</SectionLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-xs text-secondary-text">Current Plan</p>
              <p className="mt-1 text-base font-semibold text-primary-text">Professional Plan</p>
            </div>
            <div>
              <p className="text-xs text-secondary-text">Renewal Date</p>
              <p className="mt-1 text-base font-semibold text-primary-text">Aug 15, 2026</p>
              <p className="mt-0.5 text-xs text-secondary-text">31 days remaining</p>
            </div>
            <div>
              <p className="text-xs text-secondary-text">Current Invoice</p>
              <p className="mt-1 text-base font-semibold text-primary-text">INV-2026-042</p>
              <p className="mt-0.5 text-xs text-secondary-text">
                <span className="text-[#F5C542]">$2,400/mo</span> · Due Aug 1
              </p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between gap-3 mb-2">
              <p className="text-sm text-primary-text">Seats Used</p>
              <p className="text-sm font-medium text-primary-text tabular-nums">198 / 250</p>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full rounded-full bg-[#F5C542]" style={{ width: "79%" }} />
            </div>
            <p className="mt-1.5 text-xs text-secondary-text">79% of seats used</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="soft" size="md" asChild className="rounded-xl! flex-1">
              <Link to="/enterprise/billing">Payment History</Link>
            </Button>
            <Button variant="soft" size="md" className="rounded-xl! flex-1">
              <Download className="size-4" />
              Download Invoice
            </Button>
          </div>
        </Card>
      </AnimatedContainer>

      <AnimatedContainer delay={0.24}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {[
            "Private & Secure",
            "Emotionally Intelligent",
            "Built For Growth",
            "Always With You",
          ].map((label) => (
            <div
              key={label}
              className="text-center text-[10px] sm:text-xs uppercase tracking-[0.12em] text-secondary-text/70"
            >
              {label}
            </div>
          ))}
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default EnterpriseDashboard;
