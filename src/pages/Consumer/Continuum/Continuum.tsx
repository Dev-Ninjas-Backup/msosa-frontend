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
import Button from "@/ui/Button";
import Input from "@/ui/Input";
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

const Continuum = () => {
  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8 pb-4">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-blue">
        <Link to="/consumer/dashboard" className="hover:text-primary-brand">
          Home
        </Link>
        <span>/</span>
        <span className="text-primary-text">Continuum</span>
      </div>

      <AnimatedContainer delay={0.05}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: "Blueprints Completed", value: "12" },
            { label: "Reports Delivered", value: "8" },
            { label: "Alignment Score", value: "87%" },
            { label: "Growth Stage", value: "Expanding" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-light-bg/50 p-4"
            >
              <p className="text-xs text-muted-blue">{stat.label}</p>
              <p className="mt-2 font-playfair text-2xl text-primary-text">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.1}>
        <div className="rounded-2xl border border-white/10 bg-light-bg/50 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="font-playfair text-xl sm:text-2xl text-primary-text">
                FRC™ Continuum Growth
              </h2>
              <p className="mt-1 text-sm text-secondary-text">
                Longitudinal alignment across your reflection journey
              </p>
            </div>
            <p className="font-playfair text-3xl text-primary-brand">87%</p>
          </div>
          <div className="h-[220px] sm:h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="continuumGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                  }}
                  formatter={(v) => [`${v}%`, "Alignment"]}
                />
                <Area type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={2.5} fill="url(#continuumGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="secondary" size="sm">
              Analyze Remediation →
            </Button>
            <Button variant="outline" size="sm">
              Optimize Balance →
            </Button>
          </div>
        </div>
      </AnimatedContainer>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-5 lg:gap-6">
        <AnimatedContainer delay={0.14}>
          <div className="rounded-2xl border border-white/10 bg-light-bg/50 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
              <h2 className="font-playfair text-xl text-primary-text flex-1">
                Reflection Journey Timeline
              </h2>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="flex-1 sm:w-48">
                  <Input
                    variant="search"
                    placeholder="Search timeline..."
                    leftIcon={<Search className="size-4 text-muted-blue" />}
                  />
                </div>
                <Button variant="secondary" size="sm" leftIcon={<Filter className="size-3.5" />}>
                  Filter
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase text-muted-blue">
                    <th className="py-3 pr-3 font-medium">Blueprint Name</th>
                    <th className="py-3 pr-3 font-medium">Date Range</th>
                    <th className="py-3 pr-3 font-medium">Status</th>
                    <th className="py-3 font-medium">Delta</th>
                  </tr>
                </thead>
                <tbody>
                  {TIMELINE.map((row) => (
                    <tr key={row.name} className="border-b border-white/5 last:border-0">
                      <td className="py-4 pr-3">
                        <p className="text-primary-text font-medium">{row.name}</p>
                        <p className="text-xs text-muted-blue">{row.series}</p>
                      </td>
                      <td className="py-4 pr-3 text-secondary-text">{row.date}</td>
                      <td className="py-4 pr-3">
                        <span
                          className={cn(
                            "text-xs font-semibold",
                            row.status === "DELIVERED"
                              ? "text-emerald-400"
                              : "text-muted-blue"
                          )}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4 text-primary-brand font-medium">{row.delta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex justify-center">
              <Button variant="secondary" size="sm">
                LOAD FULL JOURNEY
              </Button>
            </div>
          </div>
        </AnimatedContainer>

        <div className="space-y-5">
          <AnimatedContainer delay={0.16} direction="left">
            <div className="rounded-2xl border border-white/10 bg-light-bg/50 p-4 sm:p-5">
              <h3 className="font-playfair text-lg text-primary-text mb-3 flex items-center gap-2">
                <Trophy className="size-4 text-primary-brand" />
                Milestones
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between gap-2">
                  <span className="text-secondary-text">1 Year Active</span>
                  <span className="text-emerald-400">Reached</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span className="text-secondary-text">Next badge</span>
                  <span className="text-muted-blue">2 reports away</span>
                </li>
              </ul>
              <Link to="/consumer/blueprint" className="mt-4 block">
                <Button variant="outline" size="sm" fullWidth>
                  Explore Blueprint
                </Button>
              </Link>
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
};

export default Continuum;
