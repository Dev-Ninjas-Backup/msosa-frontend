import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Box,
  Building2,
  ChevronDown,
  FileBarChart,
  Link2,
  Package,
  Plus,
  QrCode,
  Sparkles,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import { cn } from "@/lib/utils";

const SOLUTION_TABS = [
  { id: "consumer", label: "Consumer Solutions™", icon: Users },
  { id: "readiness", label: "Professional Readiness™", icon: Zap },
  { id: "org", label: "Organizational Solutions™", icon: Building2 },
  { id: "enterprise", label: "Enterprise", icon: Workflow },
] as const;

const KPI_CARDS = [
  {
    value: "27",
    label: "Active Products™",
    change: "12.5%",
    up: true,
    icon: Package,
  },
  {
    value: "18",
    label: "Organizations™",
    change: "5.6%",
    up: true,
    icon: Building2,
  },
  {
    value: "278",
    label: "Founder Protocols™",
    change: "8.3%",
    up: true,
    icon: Workflow,
  },
  {
    value: "12",
    label: "Active Live Exp.™",
    change: "9.1%",
    up: true,
    icon: Zap,
  },
  {
    value: "46",
    label: "Products Purchased™",
    change: "18.4%",
    up: true,
    icon: Box,
  },
  {
    value: "312",
    label: "Reports Generated™",
    change: "22.6%",
    up: true,
    icon: FileBarChart,
  },
] as const;

const SNAPSHOT_STATS = [
  { value: "23", label: "New Customers", change: "12.5%", up: true },
  { value: "2", label: "New Organizations", change: "8.3%", up: false },
  { value: "46", label: "Products Purchased", change: "5.6%", up: true },
  { value: "5", label: "Renewals", change: "9.1%", up: false },
  { value: "$2,986", label: "Revenue", change: "18.4%", up: false },
  { value: "18", label: "Reports Pending", change: "18.4%", up: false },
] as const;

const GROWTH_DATA = [
  { label: "1st Jan", value: 42000 },
  { label: "3d Jan", value: 48000 },
  { label: "5th Jan", value: 51000 },
  { label: "7th Jan", value: 47000 },
  { label: "9th Jan", value: 62000 },
  { label: "11th Jan", value: 58000 },
  { label: "13th Jan", value: 71000 },
  { label: "15th Jan", value: 68000 },
  { label: "17th Jan", value: 79000 },
  { label: "19th Jan", value: 86000 },
  { label: "21th Jan", value: 82000 },
  { label: "23th Jan", value: 94000 },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Blueprint 1",
    division: "Division 1",
    purchases: 186,
    completion: 82,
    reports: 186,
    revenue: "$6,120",
  },
  {
    id: 2,
    name: "Blueprint 4",
    division: "Division 1",
    purchases: 97,
    completion: 76,
    reports: 97,
    revenue: "$2,450",
  },
  {
    id: 3,
    name: "Blueprint 5",
    division: "Division 1",
    purchases: 58,
    completion: 74,
    reports: 58,
    revenue: "$1,420",
  },
  {
    id: 4,
    name: "Readiness Product 1",
    division: "Division 2",
    purchases: 156,
    completion: 81,
    reports: 156,
    revenue: "$6,860",
  },
  {
    id: 5,
    name: "Readiness Product 2",
    division: "Division 2",
    purchases: 112,
    completion: 80,
    reports: 112,
    revenue: "$4,180",
  },
  {
    id: 6,
    name: "Readiness Product 6",
    division: "Division 2",
    purchases: 71,
    completion: 75,
    reports: 71,
    revenue: "$2,429",
  },
] as const;

const LINK_ACTIONS = [
  { label: "Create New Link™", icon: Plus, to: "/founder/link-center" },
  { label: "Manage Links™", icon: Link2, to: "/founder/link-center" },
  { label: "Link Templates™", icon: Box, to: "/founder/link-center" },
  { label: "QR Code Generator™", icon: QrCode, to: "/founder/link-center" },
] as const;

const ACTIVITIES = [
  { text: 'New organization "Apex Corp" registered', time: "5 min ago" },
  {
    text: "Blueprint 1 report generated for user #4821",
    time: "12 min ago",
  },
  {
    text: "Readiness Product 1 purchased — 3 seats",
    time: "18 min ago",
  },
  { text: "Protocol #112 updated by admin", time: "25 min ago" },
  { text: "Live Experience session ended", time: "35 min ago" },
] as const;

const ALERTS = [
  {
    text: "Storage usage approaching 80% threshold",
    tone: "warn" as const,
  },
  {
    text: "API rate limit at 85% for endpoint /reports",
    tone: "warn" as const,
  },
  {
    text: "Payment gateway timeout — 3 failed txns",
    tone: "danger" as const,
  },
  {
    text: "Email delivery failure for 2 org accounts",
    tone: "danger" as const,
  },
  { text: "Backup completed successfully", tone: "ok" as const },
  { text: "Platform update v1.0.1 available", tone: "info" as const },
] as const;

const TrendBadge = ({
  change,
  up,
  compact,
}: {
  change: string;
  up: boolean;
  compact?: boolean;
}) => (
  <span
    className={cn(
      "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-medium",
      up
        ? "bg-emerald-500/10 text-emerald-400"
        : "bg-rose-500/10 text-rose-400",
      compact && "px-1"
    )}
  >
    {up ? (
      <ArrowUpRight className="size-3" />
    ) : (
      <ArrowDownRight className="size-3" />
    )}
    {change}
  </span>
);

const Panel = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "rounded-2xl border border-white/10 bg-light-bg/60 backdrop-blur-sm",
      className
    )}
  >
    {children}
  </div>
);

const FounderDashboard = () => {
  const [activeTab, setActiveTab] = useState<(typeof SOLUTION_TABS)[number]["id"]>(
    "consumer"
  );

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8 pb-8">
      {/* Page actions */}
      <AnimatedContainer delay={0.05}>
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <Button variant="secondary" size="sm" leftIcon={<Bell className="size-4" />}>
            Alerts
          </Button>
          <Link to="/founder/create-product">
            <Button variant="primary" size="sm" leftIcon={<Plus className="size-4" />}>
              Create Product
            </Button>
          </Link>
        </div>
      </AnimatedContainer>

      {/* Solution tabs */}
      <AnimatedContainer delay={0.1}>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3">
          {SOLUTION_TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all",
                  active
                    ? "border-primary-brand/50 bg-primary-brand/10 shadow-[0_0_20px_rgba(212,175,55,0.12)]"
                    : "border-white/10 bg-light-bg/40 hover:border-white/20 hover:bg-light-bg/70"
                )}
              >
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-lg shrink-0",
                    active ? "bg-primary-brand/20 text-primary-brand" : "bg-white/5 text-muted-blue"
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <span
                  className={cn(
                    "text-sm font-medium truncate",
                    active ? "text-primary-text" : "text-secondary-text"
                  )}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </AnimatedContainer>

      {/* KPI row */}
      <AnimatedContainer delay={0.15}>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
          {KPI_CARDS.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Panel key={kpi.label} className="p-4 sm:p-5 flex flex-col gap-3 min-h-[140px] sm:min-h-[180px]">
                <div className="flex items-start justify-between gap-2">
                  <span className="flex size-10 sm:size-12 items-center justify-center rounded-xl bg-primary-brand/10 text-primary-brand">
                    <Icon className="size-4 sm:size-5" />
                  </span>
                  <TrendBadge change={kpi.change} up={kpi.up} />
                </div>
                <p className="font-playfair text-2xl sm:text-3xl text-primary-text leading-none">
                  {kpi.value}
                </p>
                <div>
                  <p className="text-xs sm:text-sm text-secondary-text">{kpi.label}</p>
                  <p className="mt-1 text-[11px] text-muted-blue">↑ vs yesterday</p>
                </div>
              </Panel>
            );
          })}
        </div>
      </AnimatedContainer>

      {/* Main + sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] 2xl:grid-cols-[minmax(0,1fr)_360px] gap-5 lg:gap-6">
        <div className="space-y-5 lg:space-y-6 min-w-0">
          {/* Business Snapshot */}
          <AnimatedContainer delay={0.18}>
            <Panel className="p-4 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-playfair text-xl sm:text-2xl text-primary-text">
                      Business Snapshot
                    </h2>
                    <ChevronDown className="size-3.5 text-muted-blue" />
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-base sm:text-lg text-primary-text font-medium">
                      Relationship
                      <sup className="text-primary-brand text-xs">™</sup>
                    </h3>
                    <ChevronDown className="size-3 text-muted-blue" />
                  </div>
                </div>
                <Link
                  to="/founder/analytics-insights"
                  className="inline-flex items-center gap-1.5 text-sm text-primary-brand hover:opacity-80"
                >
                  View Business Analytics
                  <ArrowRight className="size-3" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {SNAPSHOT_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/10 bg-primary-bg/50 p-3 sm:p-4"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <p className="font-playfair text-xl sm:text-2xl text-primary-text">
                        {stat.value}
                      </p>
                      <TrendBadge change={stat.change} up={stat.up} compact />
                    </div>
                    <p className="mt-2 text-xs text-secondary-text leading-snug">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>
          </AnimatedContainer>

          {/* Growth chart */}
          <AnimatedContainer delay={0.2}>
            <Panel className="p-4 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">
                <div>
                  <h2 className="font-playfair text-xl sm:text-2xl text-primary-text flex items-center gap-2">
                    FRC™ Continuum Growth
                    <Sparkles className="size-4 text-primary-brand" />
                  </h2>
                  <p className="mt-1 text-sm text-secondary-text">
                    Longitudinal data from your reflection journey
                  </p>
                </div>
                <p className="font-playfair text-2xl sm:text-3xl text-primary-brand shrink-0">
                  $22,779
                </p>
              </div>

              <div className="h-[220px] sm:h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={GROWTH_DATA}
                    margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="founderGrowthGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.06)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#94A3B8", fontSize: 10 }}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#94A3B8", fontSize: 10 }}
                      tickFormatter={(v) => `${Math.round(v / 1000)}K`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 8,
                        color: "#fff",
                      }}
                      formatter={(value) => [
                        `$${Number(value || 0).toLocaleString()}`,
                        "Value",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#D4AF37"
                      strokeWidth={2.5}
                      fill="url(#founderGrowthGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-white/10 pt-4">
                <div className="flex flex-wrap gap-4 sm:gap-8">
                  <div>
                    <p className="text-xs text-muted-blue">Avg Daily</p>
                    <p className="text-sm font-semibold text-primary-text">$758</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-blue">Best Day (Jul 8)</p>
                    <p className="text-sm font-semibold text-primary-text">$1,135</p>
                  </div>
                </div>
                <Link
                  to="/founder/financial-center"
                  className="inline-flex items-center gap-1.5 text-sm text-primary-brand hover:opacity-80"
                >
                  View Financial Dashboard
                  <ArrowRight className="size-3" />
                </Link>
              </div>
            </Panel>
          </AnimatedContainer>

          {/* Continuum + Product performance */}
          <AnimatedContainer delay={0.22}>
            <div className="grid grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)] gap-4">
              <Panel className="p-5 flex flex-col justify-between min-h-[140px]">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-blue">
                    August 2023
                  </p>
                  <p className="mt-2 font-playfair text-4xl text-primary-text">72</p>
                </div>
                <p className="text-sm text-secondary-text mt-4">
                  Continuum Growth:{" "}
                  <span className="text-emerald-400 font-medium">+12%</span>
                </p>
              </Panel>

              <Panel className="p-4 sm:p-6 overflow-hidden">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-4">
                  <div>
                    <h2 className="font-playfair text-xl sm:text-2xl text-primary-text">
                      Product Performance (MTD)
                    </h2>
                    <p className="mt-1 text-sm text-secondary-text">
                      Performance metrics for all products this month.
                    </p>
                  </div>
                  <Link
                    to="/founder/analytics-insights"
                    className="inline-flex items-center gap-1.5 text-sm text-primary-brand hover:opacity-80 whitespace-nowrap"
                  >
                    View All Products Analytics
                    <ArrowRight className="size-3" />
                  </Link>
                </div>

                <div className="overflow-x-auto -mx-1 px-1">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-muted-blue text-xs uppercase tracking-wide">
                        <th className="py-3 pr-3 font-medium">#</th>
                        <th className="py-3 pr-3 font-medium">Product Name</th>
                        <th className="py-3 pr-3 font-medium">Purchases</th>
                        <th className="py-3 pr-3 font-medium">Completion</th>
                        <th className="py-3 pr-3 font-medium">Reports</th>
                        <th className="py-3 font-medium">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PRODUCTS.map((product) => (
                        <tr
                          key={product.id}
                          className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                        >
                          <td className="py-3.5 pr-3 text-muted-blue">{product.id}</td>
                          <td className="py-3.5 pr-3">
                            <p className="text-primary-text font-medium">{product.name}</p>
                            <p className="text-xs text-muted-blue">{product.division}</p>
                          </td>
                          <td className="py-3.5 pr-3 text-primary-text">{product.purchases}</td>
                          <td className="py-3.5 pr-3">
                            <div className="flex items-center gap-2 min-w-[100px]">
                              <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-primary-brand"
                                  style={{ width: `${product.completion}%` }}
                                />
                              </div>
                              <span className="text-xs text-secondary-text w-8">
                                {product.completion}%
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 pr-3 text-primary-text">{product.reports}</td>
                          <td className="py-3.5 text-primary-brand font-medium">
                            {product.revenue}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Panel>
            </div>
          </AnimatedContainer>

          {/* Link Center */}
          <AnimatedContainer delay={0.24}>
            <Panel className="p-4 sm:p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
                <h2 className="font-playfair text-xl sm:text-2xl text-primary-text">
                  Link Center™
                </h2>
                <Link
                  to="/founder/link-center"
                  className="inline-flex items-center gap-1.5 text-sm text-primary-brand hover:opacity-80"
                >
                  View All Links
                  <ArrowRight className="size-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {LINK_ACTIONS.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.label}
                      to={action.to}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-primary-bg/40 px-4 py-4 hover:border-primary-brand/40 hover:bg-primary-brand/5 transition-colors"
                    >
                      <span className="flex size-9 items-center justify-center rounded-lg bg-primary-brand/10 text-primary-brand">
                        <Icon className="size-4" />
                      </span>
                      <span className="text-sm text-primary-text font-medium">
                        {action.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </Panel>
          </AnimatedContainer>

          <AnimatedContainer delay={0.26}>
            <button
              type="button"
              className="w-full rounded-2xl border border-dashed border-primary-brand/40 bg-primary-brand/5 py-5 text-sm font-semibold tracking-wider text-primary-brand hover:bg-primary-brand/10 transition-colors"
            >
              + ADD NEW WIDGET
            </button>
          </AnimatedContainer>
        </div>

        {/* Right rail */}
        <div className="space-y-5 lg:space-y-6">
          <AnimatedContainer delay={0.18} direction="left">
            <Panel className="p-4 sm:p-5">
              <h3 className="font-playfair text-lg text-primary-text mb-4">
                Platform Health
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "System Uptime", value: "99.99%", ok: true },
                  { label: "AI Services", value: "Operational", ok: true },
                  { label: "Storage", value: "72% Used", ok: false },
                  { label: "Response Time", value: "412ms", ok: true },
                ].map((row) => (
                  <li
                    key={row.label}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-secondary-text">{row.label}</span>
                    <span
                      className={cn(
                        "font-medium",
                        row.ok ? "text-emerald-400" : "text-amber-400"
                      )}
                    >
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                to="/founder/ai-services"
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary-brand hover:opacity-80"
              >
                View System Health
                <ArrowRight className="size-3" />
              </Link>
            </Panel>
          </AnimatedContainer>

          <AnimatedContainer delay={0.2} direction="left">
            <Panel className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-playfair text-lg text-primary-text">Recent Activity</h3>
                <button
                  type="button"
                  className="text-xs text-primary-brand hover:opacity-80"
                >
                  View All
                </button>
              </div>
              <ul className="space-y-4">
                {ACTIVITIES.map((item) => (
                  <li key={item.text} className="flex gap-3">
                    <span className="mt-1.5 size-2 rounded-full bg-primary-brand shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-primary-text leading-snug">{item.text}</p>
                      <p className="mt-0.5 text-xs text-muted-blue">{item.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          </AnimatedContainer>

          <AnimatedContainer delay={0.22} direction="left">
            <Panel className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-playfair text-lg text-primary-text">System Alerts™</h3>
                <span className="flex size-5 items-center justify-center rounded-full bg-rose-500/20 text-[11px] font-semibold text-rose-400">
                  6
                </span>
              </div>
              <ul className="space-y-3">
                {ALERTS.map((alert) => (
                  <li
                    key={alert.text}
                    className={cn(
                      "rounded-lg border px-3 py-2.5 text-xs leading-snug",
                      alert.tone === "warn" &&
                        "border-amber-500/20 bg-amber-500/5 text-amber-200/90",
                      alert.tone === "danger" &&
                        "border-rose-500/20 bg-rose-500/5 text-rose-200/90",
                      alert.tone === "ok" &&
                        "border-emerald-500/20 bg-emerald-500/5 text-emerald-200/90",
                      alert.tone === "info" &&
                        "border-sky-500/20 bg-sky-500/5 text-sky-200/90"
                    )}
                  >
                    {alert.text}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary-brand hover:opacity-80"
              >
                View All Alerts
                <ArrowRight className="size-3" />
              </button>
            </Panel>
          </AnimatedContainer>

          <AnimatedContainer delay={0.24} direction="left">
            <Panel className="p-4 sm:p-5 border-primary-brand/30 bg-gradient-to-b from-primary-brand/10 to-transparent">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-primary-brand">
                AI RECOMMENDATION
              </p>
              <p className="mt-3 text-sm text-primary-text leading-relaxed">
                &ldquo;Storage is at 72% capacity. Consider archiving unused protocol
                drafts or upgrading storage before peak reporting week.&rdquo;
              </p>
              <Link
                to="/founder/ai-services"
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary-brand hover:opacity-80"
              >
                Explore suggestion
                <ArrowRight className="size-3" />
              </Link>
            </Panel>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
};

export default FounderDashboard;
