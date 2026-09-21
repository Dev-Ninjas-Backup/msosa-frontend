import { Check } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import type { SectionProgress, StageStep } from "../data";

type AssessmentStageCardProps = {
  campaign: string;
  steps: StageStep[];
  sections: SectionProgress[];
};

const AssessmentStageCard = ({
  campaign,
  steps,
  sections,
}: AssessmentStageCardProps) => (
  <AnimatedContainer delay={0.1}>
    <Card className="p-6 space-y-5 h-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-white">Assessment Stage</h3>
          <p className="mt-0.5 text-[11px] text-[#9CA3AF]">
            MindState™ Reflection · {campaign}
          </p>
        </div>
        <span className="rounded-full bg-[rgba(251,191,36,0.1)] px-2.5 py-0.5 text-[10px] font-bold text-[#FBBF24]">
          In Progress
        </span>
      </div>

      <div className="rounded-[10px] border border-[rgba(16,183,186,0.2)] bg-[rgba(16,183,186,0.05)] px-3.5 py-2.5 flex flex-wrap items-center gap-2.5">
        <span className="size-2 rounded-full bg-[#10B7BA]" />
        <span className="text-xs font-semibold text-[#10B7BA]">
          Current Stage: Reflection In Progress
        </span>
        <span className="text-[10px] text-[#9CA3AF]">Since Jun 1, 9:20 AM</span>
      </div>

      <div className="relative pt-1">
        <div className="absolute top-[15px] left-[8%] right-[8%] h-px bg-gradient-to-r from-[#10B7BA] via-[#10B7BA] to-white/10" />
        <div className="relative flex items-start justify-between gap-2">
          {steps.map((step) => (
            <div
              key={step.label}
              className="flex flex-col items-center text-center flex-1 min-w-0 z-10"
            >
              {step.state === "done" ? (
                <span className="flex size-[30px] items-center justify-center rounded-full bg-[#10B7BA] shadow-[0_0_6px_rgba(251,191,36,0.3)]">
                  <Check className="size-3 text-black" strokeWidth={3} />
                </span>
              ) : (
                <span
                  className={cn(
                    "flex size-[30px] items-center justify-center rounded-full border-[1.5px] bg-black text-[10px] font-medium",
                    step.state === "current"
                      ? "border-[#10B7BA] text-[#10B7BA]"
                      : "border-white/20 text-white"
                  )}
                >
                  {step.number}
                </span>
              )}
              <p
                className={cn(
                  "mt-2 text-[9px] font-bold uppercase tracking-wide leading-tight",
                  step.state === "pending"
                    ? "text-white/30"
                    : "text-[#10B7BA]"
                )}
              >
                {step.label}
              </p>
              {step.sublabel ? (
                <p className="mt-0.5 text-[8px] text-[#9CA3AF]">
                  {step.sublabel}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-bold text-white">Section Progress</p>
          <p className="text-[11px] text-[#9CA3AF]">4 Sections</p>
        </div>
        {sections.map((s) => {
          const color =
            s.percent === 100
              ? "#10B7BA"
              : s.percent > 0
                ? "#FBBF24"
                : "#9CA3AF";
          return (
            <div key={s.label} className="space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-medium text-white">{s.label}</p>
                <p
                  className="text-[11px] font-bold"
                  style={{ color }}
                >
                  {s.percent}%
                </p>
              </div>
              <div className="h-[5px] rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${s.percent}%`,
                    backgroundColor: color === "#9CA3AF" ? "transparent" : color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  </AnimatedContainer>
);

export default AssessmentStageCard;
