import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Download } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import { cn } from "@/lib/utils";
import {
  GhostAction,
  MiniStat,
  PrimaryAction,
  StatCard,
} from "../_shared/FounderPageKit";

const GROWTH = [
  { month: "Jan", users: 124, orgs: 52, ratio: 1.61 },
  { month: "Feb", users: 158, orgs: 98, ratio: 1.42 },
  { month: "Mar", users: 210, orgs: 120, ratio: 1.55 },
  { month: "Apr", users: 268, orgs: 142, ratio: 1.68 },
  { month: "May", users: 312, orgs: 168, ratio: 1.72 },
  { month: "Jun", users: 364, orgs: 190, ratio: 1.8 },
];

const RANGES = ["30 Days", "6 Months", "1 Year"] as const;

const AnalyticsInsights = () => {
  const [range, setRange] = useState<(typeof RANGES)[number]>("6 Months");

  return (
    <AnimatedContainer className="space-y-6 pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-white/40">Last Updated: Today · 9:45 AM</p>
          <p className="text-sm text-white/55 mt-1">
            Deep platform analytics, reflection data, and user trends.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
            {RANGES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs cursor-pointer border-0",
                  range === r
                    ? "bg-[#fbbf24] text-black font-semibold"
                    : "bg-transparent text-white/60 hover:text-white"
                )}
              >
                {r}
              </button>
            ))}
          </div>
          <PrimaryAction title="Export Analytics" leftIcon={<Download className="size-4" />} />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Users" value="124,802" hint="Platform-wide" />
        <StatCard label="Active Orgs" value="1,245" hint="+4.1% MoM" hintTone="up" />
        <StatCard label="Active Products" value="842" />
        <StatCard label="Monthly Revenue" value="$482,000" hintTone="gold" hint="Last 30 Days" />
      </div>

      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-200/90">
        Platform Status · <span className="font-semibold tracking-wide">SYSTEMS NORMAL</span>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MiniStat label="DAU / MAU Ratio" value="42.8%" tone="green" />
        <MiniStat label="New Registrations" value="8,240" />
        <MiniStat label="Retention Rate" value="94.2%" tone="gold" />
        <MiniStat label="Reflection Completion" value="86.5%" tone="green" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-sm font-semibold text-white">Platform Growth Trends</h2>
              <p className="text-xs text-white/45">Detailed performance breakdown by month</p>
            </div>
            <GhostAction title={range} />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={GROWTH}>
                <defs>
                  <linearGradient id="usersFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.35)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.35)" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: "#0a0a0a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#fbbf24"
                  fill="url(#usersFill)"
                  strokeWidth={2}
                  name="User Growth"
                />
                <Area
                  type="monotone"
                  dataKey="orgs"
                  stroke="#10b7ba"
                  fill="transparent"
                  strokeWidth={2}
                  name="Org Growth"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
          <div className="border-b border-white/10 px-4 py-3">
            <h2 className="text-sm font-semibold text-white">Month Index</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[11px] uppercase tracking-wide text-white/45">
                  <th className="px-4 py-2 font-medium">Month</th>
                  <th className="px-4 py-2 font-medium">Users</th>
                  <th className="px-4 py-2 font-medium">Orgs</th>
                  <th className="px-4 py-2 font-medium">Ratio</th>
                </tr>
              </thead>
              <tbody>
                {GROWTH.map((g) => (
                  <tr key={g.month} className="border-b border-white/5">
                    <td className="px-4 py-2 text-white/80">{g.month}</td>
                    <td className="px-4 py-2 text-white tabular-nums">{g.users}</td>
                    <td className="px-4 py-2 text-white/70 tabular-nums">{g.orgs}</td>
                    <td className="px-4 py-2 text-[#fbbf24] tabular-nums">{g.ratio}x</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default AnalyticsInsights;
