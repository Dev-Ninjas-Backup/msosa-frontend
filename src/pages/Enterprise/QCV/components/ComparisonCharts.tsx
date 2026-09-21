import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { RADAR_COMPARE } from "../data";

const ComparisonCharts = () => (
  <AnimatedContainer delay={0.14}>
    <Card className="p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-xl font-bold text-white">Comparison Charts</h3>
        <div className="flex items-center gap-4 text-xs text-white/60">
          <span className="inline-flex items-center gap-2">
            <span className="size-3 rounded-sm bg-[#10B7BA]" />
            Q3 2026
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-3 rounded-sm bg-white/40" />
            Q2 2026
          </span>
        </div>
      </div>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={RADAR_COMPARE} cx="50%" cy="50%" outerRadius="70%">
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
              stroke="#9CA3AF"
              fill="#9CA3AF"
              fillOpacity={0.15}
              strokeWidth={1.5}
            />
            <Radar
              name="Q3"
              dataKey="q3"
              stroke="#10B7BA"
              fill="#10B7BA"
              fillOpacity={0.35}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  </AnimatedContainer>
);

export default ComparisonCharts;
