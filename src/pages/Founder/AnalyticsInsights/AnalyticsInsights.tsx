import { useEffect, useState, type ReactNode } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { ArrowDown, ArrowUp, Building2, Star, Trophy } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import { cn } from "@/lib/utils";
import {
  ANALYTICS_EXPORT_EVENT,
  ANALYTICS_RANGE_EVENT,
  type AnalyticsWindow,
} from "./events";

type Direction = "up" | "down";

type GrowthRow = {
  month: string;
  users: number;
  orgs: number;
  ratio: string;
  userDir: Direction;
  orgDir: Direction;
  ratioDir: Direction;
};

const SIX_MONTHS: GrowthRow[] = [
  { month: "January", users: 124, orgs: 52, ratio: "1.61x", userDir: "up", orgDir: "up", ratioDir: "up" },
  { month: "February", users: 158, orgs: 98, ratio: "1.61x", userDir: "up", orgDir: "up", ratioDir: "up" },
  { month: "March", users: 14, orgs: 76, ratio: "1.87x", userDir: "down", orgDir: "down", ratioDir: "down" },
  { month: "April", users: 264, orgs: 124, ratio: "1.61x", userDir: "up", orgDir: "up", ratioDir: "up" },
  { month: "May", users: 382, orgs: 168, ratio: "1.61x", userDir: "up", orgDir: "up", ratioDir: "up" },
  { month: "June", users: 496, orgs: 242, ratio: "1.61x", userDir: "up", orgDir: "up", ratioDir: "up" },
];

const YEAR: GrowthRow[] = [
  ...SIX_MONTHS,
  { month: "July", users: 520, orgs: 260, ratio: "1.64x", userDir: "up", orgDir: "up", ratioDir: "up" },
  { month: "August", users: 548, orgs: 281, ratio: "1.62x", userDir: "up", orgDir: "up", ratioDir: "up" },
  { month: "September", users: 410, orgs: 240, ratio: "1.71x", userDir: "down", orgDir: "down", ratioDir: "down" },
  { month: "October", users: 590, orgs: 310, ratio: "1.63x", userDir: "up", orgDir: "up", ratioDir: "up" },
  { month: "November", users: 640, orgs: 340, ratio: "1.61x", userDir: "up", orgDir: "up", ratioDir: "up" },
  { month: "December", users: 710, orgs: 380, ratio: "1.65x", userDir: "up", orgDir: "up", ratioDir: "up" },
];

const WINDOWS: Record<
  AnalyticsWindow,
  {
    users: string;
    orgs: string;
    products: string;
    revenue: string;
    dau: string;
    dauHint: string;
    regs: string;
    retention: string;
    reflection: string;
    reflectionHint: string;
  }
> = {
  "Last 30 Days": {
    users: "124,802",
    orgs: "1,245",
    products: "842",
    revenue: "$482,000",
    dau: "42.8%",
    dauHint: "+2.4% vs last mo",
    regs: "8,240",
    retention: "94.2%",
    reflection: "86.5%",
    reflectionHint: "+5% improvement",
  },
  "6 Months": {
    users: "612,440",
    orgs: "6,180",
    products: "842",
    revenue: "$2,640,000",
    dau: "39.1%",
    dauHint: "+1.8% vs prior period",
    regs: "41,200",
    retention: "93.4%",
    reflection: "84.1%",
    reflectionHint: "+3% improvement",
  },
  "1 Year": {
    users: "1,104,220",
    orgs: "9,840",
    products: "910",
    revenue: "$5,120,000",
    dau: "36.4%",
    dauHint: "+0.9% vs prior year",
    regs: "86,540",
    retention: "91.8%",
    reflection: "82.6%",
    reflectionHint: "+8% improvement",
  },
};

const DISTRIBUTION = [
  { name: "Consumer", value: 58, color: "#fbbf24" },
  { name: "Employee", value: 42, color: "#10b7ba" },
];

const Trend = ({ dir, tone }: { dir: Direction; tone: "gold" | "teal" | "red" }) => {
  const Icon = dir === "up" ? ArrowUp : ArrowDown;
  return (
    <Icon
      className={cn(
        "size-3",
        tone === "gold" && "text-[#fbbf24]",
        tone === "teal" && "text-[#10b7ba]",
        tone === "red" && "text-[#ef4444]",
      )}
    />
  );
};

const downloadAnalytics = (windowLabel: AnalyticsWindow, rows: GrowthRow[]) => {
  const snapshot = WINDOWS[windowLabel];
  const lines = [
    `Window,${windowLabel}`,
    `Total Users,${snapshot.users}`,
    `Active Orgs,${snapshot.orgs}`,
    `Active Products,${snapshot.products}`,
    `Monthly Revenue,${snapshot.revenue}`,
    "",
    "Month,User Growth,Org Growth,Growth Ratio",
    ...rows.map((row) => `${row.month},${row.users},${row.orgs},${row.ratio}`),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "far-analytics.csv";
  anchor.click();
  URL.revokeObjectURL(url);
};

const AnalyticsInsights = () => {
  const [windowLabel, setWindowLabel] = useState<AnalyticsWindow>("Last 30 Days");
  const [span, setSpan] = useState<"6 Months" | "1 Year">("6 Months");
  const rows = span === "6 Months" ? SIX_MONTHS : YEAR;
  const metrics = WINDOWS[windowLabel];
  const footer =
    span === "6 Months"
      ? { users: "1,566", orgs: "760", rate: "+22.4%" }
      : { users: "4,856", orgs: "2,271", rate: "+18.6%" };

  useEffect(() => {
    const onRange = (event: Event) => {
      const next = (event as CustomEvent<AnalyticsWindow>).detail;
      if (next === "Last 30 Days" || next === "6 Months" || next === "1 Year") setWindowLabel(next);
    };
    const onExport = () => downloadAnalytics(windowLabel, rows);
    window.addEventListener(ANALYTICS_RANGE_EVENT, onRange);
    window.addEventListener(ANALYTICS_EXPORT_EVENT, onExport);
    return () => {
      window.removeEventListener(ANALYTICS_RANGE_EVENT, onRange);
      window.removeEventListener(ANALYTICS_EXPORT_EVENT, onExport);
    };
  }, [windowLabel, rows]);

  return (
    <AnimatedContainer className="space-y-8 pb-8">
      <div className="flex flex-wrap items-center justify-between gap-8 rounded-xl border border-white/10 bg-white/5 px-8 py-4">
        {(
          [
            ["Total Users", metrics.users, "text-white"],
            ["Active Orgs", metrics.orgs, "text-[#10b7ba]"],
            ["Active Products", metrics.products, "text-white"],
            ["Monthly Revenue", metrics.revenue, "text-[#fbbf24]"],
          ] as const
        ).map(([label, value, tone]) => (
          <div key={label} className="flex min-w-[120px] flex-1 flex-col items-center gap-1 border-r border-white/10 pr-8 last:border-r-0">
            <p className="text-[10px] font-bold text-white/40">{label}</p>
            <p className={cn("text-2xl font-black leading-9", tone)}>{value}</p>
          </div>
        ))}
        <div className="flex flex-col items-center gap-1">
          <p className="text-[10px] font-bold text-white/40">Platform Status</p>
          <span className="mt-1 rounded-full bg-[rgba(34,197,94,0.1)] px-3 py-1 text-[10px] font-bold text-[#22c55e]">
            SYSTEMS NORMAL
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="DAU / MAU Ratio" value={metrics.dau}>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#10b7ba]">
            <ArrowUp className="size-2.5" />
            {metrics.dauHint}
          </span>
        </Metric>
        <Metric label="New Registrations" value={metrics.regs} valueClass="text-[#fbbf24]">
          <span className="text-[10px] font-bold text-white/40">Current month total</span>
        </Metric>
        <Metric label="Retention Rate" value={metrics.retention}>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#fbbf24]">
            <Star className="size-2.5 fill-[#fbbf24]" />
            Top performance tier
          </span>
        </Metric>
        <Metric label="Reflection Completion" value={metrics.reflection}>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#10b7ba]">
            <ArrowUp className="size-2.5" />
            {metrics.reflectionHint}
          </span>
        </Metric>
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_372px]">
        <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)",
              backgroundSize: "25% 100%, 100% 50%",
            }}
          />
          <div className="relative flex flex-col gap-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold tracking-[-0.6px] text-white">Platform Growth Trends</h2>
                <p className="text-sm text-white/50">Detailed performance breakdown by month</p>
              </div>
              <div className="flex gap-3">
                {(["6 Months", "1 Year"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSpan(option)}
                    className={cn(
                      "cursor-pointer rounded-lg border px-4 py-2 text-xs font-bold",
                      span === option
                        ? "border-[rgba(251,191,36,0.2)] bg-[rgba(251,191,36,0.1)] text-[#fbbf24]"
                        : "border-white/10 bg-white/5 text-white/60",
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0a0a]">
              <div className="grid grid-cols-4 border-b border-white/5 bg-white/[0.03] text-[12px] font-bold uppercase tracking-[1.2px] text-white/50">
                <p className="px-8 py-5">Month Index</p>
                <p className="px-8 py-5 text-center">User Growth</p>
                <p className="px-8 py-5 text-center">Org Growth</p>
                <p className="px-8 py-5 text-center">Growth Ratio</p>
              </div>
              {rows.map((row) => (
                <div key={row.month} className="grid grid-cols-4 items-center border-b border-white/10 last:border-b-0">
                  <p className="px-8 py-6 text-[15px] font-medium text-white">{row.month}</p>
                  <p className="flex items-center justify-center gap-3 px-8 py-6 text-lg font-bold">
                    <span className={row.userDir === "up" ? "text-[#fbbf24]" : "text-[#ef4444]"}>{row.users}</span>
                    <Trend dir={row.userDir} tone={row.userDir === "up" ? "gold" : "red"} />
                  </p>
                  <p className="flex items-center justify-center gap-3 px-8 py-6 text-lg font-bold">
                    <span className={row.orgDir === "up" ? "text-[#10b7ba]" : "text-[#ef4444]"}>{row.orgs}</span>
                    <Trend dir={row.orgDir} tone={row.orgDir === "up" ? "teal" : "red"} />
                  </p>
                  <p className="flex items-center justify-center gap-2.5 px-8 py-6 text-sm text-white/40">
                    {row.ratio}
                    <Trend dir={row.ratioDir} tone={row.ratioDir === "up" ? "teal" : "red"} />
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {(
                [
                  ["Total Users", footer.users, "text-white"],
                  ["Total Orgs", footer.orgs, "text-white"],
                  ["Avg Growth Rate", footer.rate, "text-[#fbbf24]"],
                ] as const
              ).map(([label, value, tone]) => (
                <div key={label} className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <p className="text-xs font-semibold uppercase text-white/40">{label}</p>
                  <p className={cn("mt-1 text-2xl font-bold", tone)}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6 rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-bold text-white">User Distribution</h2>
          <div className="relative h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DISTRIBUTION}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={78}
                  outerRadius={112}
                  startAngle={90}
                  endAngle={-270}
                  stroke="#050505"
                  strokeWidth={4}
                  paddingAngle={1.5}
                >
                  {DISTRIBUTION.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5">
              {DISTRIBUTION.map((entry) => (
                <span key={entry.name} className="inline-flex w-[75px] items-center justify-between text-[10px] text-[#9ca3af]">
                  <span className="size-3 rounded-[2px]" style={{ backgroundColor: entry.color }} />
                  {entry.name}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[rgba(16,183,186,0.2)] text-[#10b7ba]">
                <Trophy className="size-4" />
              </span>
              <span>
                <span className="block text-[10px] font-bold uppercase text-white/40">Active Countries</span>
                <span className="block text-sm font-bold text-white">42 Regions</span>
                <span className="block text-xs text-[#10b7ba]">+3 this quarter</span>
              </span>
            </div>
            <div className="flex items-start gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[rgba(251,191,36,0.2)] text-[#fbbf24]">
                <Building2 className="size-4" />
              </span>
              <span>
                <span className="block text-[10px] font-bold uppercase text-white/40">Largest Org</span>
                <span className="block text-sm font-bold text-white">CyberCore Systems</span>
                <span className="block text-xs text-white/60">8,200 active seats</span>
              </span>
            </div>
          </div>
        </section>
      </div>

      <div className="flex flex-col gap-6 rounded-xl border border-white/5 bg-white/5 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-12">
          <FooterStat label="Avg Session Time" value="18m 42s" />
          <FooterStat label="Outstanding Reports" value="142" valueClass="text-[#fb923c]" />
          <div>
            <p className="text-[10px] font-bold text-white/40">Total Enterprise Value</p>
            <p className="text-xl font-black text-white">
              $4,284,200 <span className="text-xs font-black text-[#10b7ba]">+12%</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-[10px] font-bold uppercase text-white/40">Operational Status:</p>
          <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(34,197,94,0.1)] px-3 py-1 text-[10px] font-bold uppercase text-[#22c55e]">
            <span className="size-2 rounded-full bg-[#22c55e]" />
            Systems Normal
          </span>
        </div>
      </div>
    </AnimatedContainer>
  );
};

const Metric = ({
  label,
  value,
  valueClass = "text-white",
  children,
}: {
  label: string;
  value: string;
  valueClass?: string;
  children: ReactNode;
}) => (
  <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-5">
    <p className="text-[10px] font-bold uppercase tracking-[1px] text-white/40">{label}</p>
    <p className={cn("text-[30px] font-black leading-none", valueClass)}>{value}</p>
    {children}
  </div>
);

const FooterStat = ({
  label,
  value,
  valueClass = "text-white",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) => (
  <div>
    <p className="text-[10px] font-bold text-white/40">{label}</p>
    <p className={cn("text-xl font-black", valueClass)}>{value}</p>
  </div>
);

export default AnalyticsInsights;
