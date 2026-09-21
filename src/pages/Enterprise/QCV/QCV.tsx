import { useState } from "react";
import { Download, TrendingUp } from "lucide-react";
import { toast } from "sonner";
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
import Select from "@/ui/Select";

const QCV_DATA = [
  { axis: "Business Growth", q3: 90, q2: 78 },
  { axis: "Leadership Growth", q3: 86, q2: 72 },
  { axis: "Employee Growth", q3: 88, q2: 74 },
  { axis: "Team Growth", q3: 82, q2: 70 },
  { axis: "Innovation Growth", q3: 91, q2: 75 },
];

const META_KPIS = [
  { badge: "Active", label: "Current Quarter", value: "Q3 2026", sub: "Jul — Sep, 2026" },
  { badge: "Closed", label: "Previous Quarter", value: "Q2 2026", sub: "Apr — Jun, 2026" },
  { badge: "+2.1%", label: "Reports Compared", value: "18 Reports", sub: "vs last cycle" },
  { badge: "+12%", label: "Overall Progress", value: "+12%", sub: "vs last quarter" },
  { badge: "5.2%↑", label: "Improvement Score", value: "84%", sub: "vs last cycle" },
  { badge: "Completed", label: "Comparison Status", value: "Done", sub: "Q2–Q3 2026" },
] as const;

const QCV = () => {
  const [current, setCurrent] = useState("Q3 2026");
  const [compare, setCompare] = useState("Q2 2026");

  return (
    <div className="space-y-5 sm:space-y-6 pb-8">
      <AnimatedContainer delay={0.04}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <p className="text-sm text-secondary-text flex flex-wrap gap-x-2 gap-y-1">
            <span>Organization: Acme Corporation</span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span>Current Quarter: Q3 2026</span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span>Previous Quarter: Q2 2026</span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span>Comparison Period: Q2–Q3 2026</span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span>Last Updated: Jun 2, 2026</span>
          </p>
          <Button
            variant="soft"
            size="sm"
            className="rounded-xl! self-start"
            onClick={() => toast.success("Export started.")}
          >
            <Download className="size-3.5" />
            Export PDF
          </Button>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.08}>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {META_KPIS.map((k) => (
            <Card key={k.label} className="p-4">
              <span className="inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium bg-white/10 text-secondary-text">
                {k.badge}
              </span>
              <p className="mt-3 text-lg font-bold text-primary-text">{k.value}</p>
              <p className="mt-1 text-xs text-secondary-text">{k.label}</p>
              <p className="text-[10px] text-secondary-text/70">{k.sub}</p>
            </Card>
          ))}
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.1}>
        <Card className="p-5 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
            <div className="flex-1">
              <p className="text-xs text-secondary-text mb-1.5">Current Quarter</p>
              <Select
                variant="soft"
                options={["Q3 2026", "Q2 2026", "Q1 2026"]}
                value={current}
                onChange={setCurrent}
              />
            </div>
            <p className="text-sm font-semibold text-secondary-text pb-3 text-center">
              VS
            </p>
            <div className="flex-1">
              <p className="text-xs text-secondary-text mb-1.5">Compare With</p>
              <Select
                variant="soft"
                options={["Q2 2026", "Q1 2026", "Q4 2025"]}
                value={compare}
                onChange={setCompare}
              />
            </div>
            <Button
              variant="primary"
              size="md"
              className="rounded-xl! bg-[#FBBF24]!"
              onClick={() => toast.success("Comparison updated.")}
            >
              Run Comparison
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-6 items-center">
            <div className="h-[300px] w-full">
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
                    name="Q2"
                    dataKey="q2"
                    stroke="#71717a"
                    fill="#71717a"
                    fillOpacity={0.15}
                  />
                  <Radar
                    name="Q3"
                    dataKey="q3"
                    stroke="#2DD4BF"
                    fill="#2DD4BF"
                    fillOpacity={0.35}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 space-y-4">
              <h3 className="text-base text-primary-text">Comparison Summary</h3>
              <div className="flex items-center gap-2 text-teal-300">
                <TrendingUp className="size-4" />
                <div>
                  <p className="text-sm font-medium">Improving</p>
                  <p className="text-xs">+9.7% · Trend: Positive</p>
                </div>
              </div>
              <p className="text-xs text-secondary-text leading-relaxed">
                Overall organizational performance has improved significantly
                compared to the previous quarter. Participation rates increased
                and capability scores rose across all five growth axes.
              </p>
            </div>
          </div>
        </Card>
      </AnimatedContainer>
    </div>
  );
};

export default QCV;
