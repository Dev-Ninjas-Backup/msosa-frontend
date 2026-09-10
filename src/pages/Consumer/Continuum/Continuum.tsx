import { Link } from "react-router-dom";
import { Filter, Search, Trophy } from "lucide-react";
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
import Input from "@/ui/Input";
import Card from "@/pages/Consumer/Dashboard/Card";
import { cn } from "@/lib/utils";

const CHART = [
  { label: "Jan", value: 42 },
  { label: "Feb", value: 48 },
  { label: "Mar", value: 55 },
  { label: "Apr", value: 52 },
  { label: "May", value: 61 },
  { label: "Jun", value: 68 },
  { label: "Jul", value: 72 },
  { label: "Aug", value: 78 },
  { label: "Sep", value: 81 },
  { label: "Oct", value: 87 },
];

const TIMELINE = [
  {
    name: "Professional Evolution Report",
    series: "Relationship Blueprint™",
    date: "Mar 15, 2026",
    status: "DELIVERED",
    delta: "+4.2%",
  },
  {
    name: "Core Dynamics Mapping",
    series: "Clarity Series",
    date: "Feb 28, 2026",
    status: "ARCHIVED",
    delta: "+2.8%",
  },
] as const;

const ghostBtn =
  "h-9 px-4 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-primary-text text-xs font-medium transition-colors cursor-pointer";
const goldBtn =
  "h-9 px-4 rounded-lg bg-[#F5C542] hover:bg-[#e8b93a] text-black text-xs font-semibold transition-colors cursor-pointer border-0";

const Continuum = () => {
  return (
    <div className="space-y-5 sm:space-y-6 pb-6">
      <AnimatedContainer delay={0.05}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: "Blueprints Completed", value: "12" },
            { label: "Reports Delivered", value: "8" },
            { label: "Alignment Score", value: "87%" },
            { label: "Growth Stage", value: "Expanding" },
          ].map((stat) => (
            <Card key={stat.label} className="p-4">
              <p className="text-xs text-secondary-text">{stat.label}</p>
              <p className="mt-2 font-playfair text-2xl text-primary-text">
                {stat.value}
              </p>
            </Card>
          ))}
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.1}>
        <Card className="p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="font-playfair text-xl sm:text-2xl text-primary-text">
                FRC™ Continuum Growth
              </h2>
              <p className="mt-1 text-sm text-secondary-text">
                Longitudinal alignment across your reflection journey
              </p>
            </div>
            <p className="font-playfair text-3xl text-[#F5C542]">87%</p>
          </div>
          <div className="h-[220px] sm:h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={CHART}
                margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="continuumGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F5C542" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#F5C542" stopOpacity={0} />
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
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d1117",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 12,
                    color: "#fff",
                  }}
                  formatter={(v) => [`${v}%`, "Alignment"]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#F5C542"
                  strokeWidth={2.5}
                  fill="url(#continuumGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" className={ghostBtn}>
              Analyze Remediation →
            </button>
            <button type="button" className={goldBtn}>
              Optimize Balance →
            </button>
          </div>
        </Card>
      </AnimatedContainer>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] 2xl:grid-cols-[minmax(0,1fr)_320px] gap-5 lg:gap-6">
        <AnimatedContainer delay={0.14}>
          <Card className="p-4 sm:p-5 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
              <h2 className="font-playfair text-xl text-primary-text flex-1">
                Reflection Journey Timeline
              </h2>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="flex-1 sm:w-48">
                  <Input
                    variant="search"
                    placeholder="Search timeline..."
                    leftIcon={<Search className="size-4 text-secondary-text" />}
                  />
                </div>
                <button type="button" className={ghostBtn}>
                  <span className="inline-flex items-center gap-1.5">
                    <Filter className="size-3.5" />
                    Filter
                  </span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08] text-xs uppercase text-secondary-text">
                    <th className="py-3 pr-3 font-medium">Blueprint Name</th>
                    <th className="py-3 pr-3 font-medium">Date Range</th>
                    <th className="py-3 pr-3 font-medium">Status</th>
                    <th className="py-3 font-medium">Delta</th>
                  </tr>
                </thead>
                <tbody>
                  {TIMELINE.map((row) => (
                    <tr
                      key={row.name}
                      className="border-b border-white/[0.05] last:border-0"
                    >
                      <td className="py-4 pr-3">
                        <p className="text-primary-text font-medium">{row.name}</p>
                        <p className="text-xs text-secondary-text">{row.series}</p>
                      </td>
                      <td className="py-4 pr-3 text-secondary-text">{row.date}</td>
                      <td className="py-4 pr-3">
                        <span
                          className={cn(
                            "text-xs font-semibold",
                            row.status === "DELIVERED"
                              ? "text-emerald-400"
                              : "text-secondary-text"
                          )}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4 text-[#F5C542] font-medium">{row.delta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex justify-center">
              <button type="button" className={ghostBtn}>
                LOAD FULL JOURNEY
              </button>
            </div>
          </Card>
        </AnimatedContainer>

        <AnimatedContainer delay={0.16} direction="left">
          <Card className="p-4 sm:p-5">
            <h3 className="font-playfair text-lg text-primary-text mb-3 flex items-center gap-2">
              <Trophy className="size-4 text-[#F5C542]" />
              Milestones
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between gap-2">
                <span className="text-secondary-text">1 Year Active</span>
                <span className="text-emerald-400">Reached</span>
              </li>
              <li className="flex justify-between gap-2">
                <span className="text-secondary-text">Next badge</span>
                <span className="text-secondary-text">2 reports away</span>
              </li>
            </ul>
            <Link to="/consumer/blueprint" className="mt-4 block">
              <button type="button" className={`${ghostBtn} w-full`}>
                Explore Blueprint
              </button>
            </Link>
          </Card>
        </AnimatedContainer>
      </div>
    </div>
  );
};

export default Continuum;
