import { Link } from "react-router-dom";
import { ChevronRight, TrendingUp } from "lucide-react";
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
import { RADAR_OVERVIEW } from "../data";

const QcvOverview = () => (
  <AnimatedContainer delay={0.16}>
    <Card className="p-6 sm:p-8 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white">QCV™ Overview</h3>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-white/60">
          <Link
            to="/enterprise/blueprint-management"
            className="inline-flex items-center gap-1 text-white hover:text-[#10B7BA]"
          >
            Organizational Culture Blueprint™
            <ChevronRight className="size-3" />
          </Link>
          <span className="text-white/30">·</span>
          <span>Q2 — Q3, 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_240px] gap-6 items-center">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={RADAR_OVERVIEW} cx="50%" cy="50%" outerRadius="70%">
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
                stroke="#10B7BA"
                fill="#10B7BA"
                fillOpacity={0.35}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="size-2.5 rounded-sm bg-[#10B7BA]" />
              <span className="text-white">Q2 (87%)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="size-2.5 rounded-sm bg-zinc-500" />
              <span className="text-white/60">Q1 (72%)</span>
            </div>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 space-y-3">
            <div>
              <p className="text-xs text-white/55">Current Quarter</p>
              <p className="text-sm font-medium text-white mt-0.5">Q2 2026</p>
              <p className="text-xs text-white/55 mt-0.5">vs Q1 2026</p>
            </div>
            <div className="flex items-center gap-2 text-[#10B7BA]">
              <TrendingUp className="size-4" />
              <div>
                <p className="text-sm font-medium">Improving</p>
                <p className="text-xs text-white/60">+9.7% · Trend: Positive</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </AnimatedContainer>
);

export default QcvOverview;
