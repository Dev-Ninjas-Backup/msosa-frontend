import { TrendingUp } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { SUMMARY_TEXT } from "../data";

const ComparisonSummary = () => (
  <AnimatedContainer delay={0.08}>
    <Card className="p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-xl font-bold text-white">Comparison Summary</h3>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(16,183,186,0.4)] bg-[rgba(16,183,186,0.1)] px-3 py-1 text-xs text-[#10B7BA]">
            <TrendingUp className="size-3" />
            Improving
          </span>
          <span className="text-xs text-white/70">+9.7% · Trend: Positive</span>
        </div>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 border-l-4 border-l-[#10B7BA]">
        <TrendingUp className="size-4 text-[#10B7BA] mb-3" />
        <p className="text-sm text-[#9CA3AF] leading-relaxed">{SUMMARY_TEXT}</p>
        <p className="mt-4 text-xs text-white/50 flex flex-wrap gap-x-2">
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#10B7BA]" />
            Q2 → Q3 comparison complete
          </span>
          <span>·</span>
          <span>18 reports analyzed</span>
          <span>·</span>
          <span>Generated Jun 2, 2026</span>
        </p>
      </div>
    </Card>
  </AnimatedContainer>
);

export default ComparisonSummary;
