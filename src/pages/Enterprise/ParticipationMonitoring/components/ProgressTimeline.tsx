import { Check, Mic } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import type { TimelineStep } from "../data";

type ProgressTimelineProps = {
  steps: TimelineStep[];
};

const ProgressTimeline = ({ steps }: ProgressTimelineProps) => (
  <AnimatedContainer delay={0.12}>
    <Card className="p-6">
      <h3 className="text-sm font-bold text-white mb-5">Progress Timeline</h3>
      <div className="relative">
        <div className="absolute top-5 left-5 right-10 h-px bg-gradient-to-r from-[#10B7BA] via-[#10B7BA] to-white/10" />
        <div className="relative flex gap-4 xl:gap-6 overflow-x-auto pb-1">
          {steps.map((step) => (
            <div
              key={step.label}
              className="flex flex-col gap-3 min-w-[140px] flex-1"
            >
              {step.state === "done" ? (
                <span className="flex size-10 items-center justify-center rounded-full bg-[#10B7BA] shadow-[0_0_8px_rgba(251,191,36,0.3)] shrink-0">
                  <Check className="size-3 text-black" strokeWidth={3} />
                </span>
              ) : step.state === "current" ? (
                <span className="flex size-12 items-center justify-center rounded-full border-2 border-[#10B7BA] bg-black shadow-[0_0_8px_rgba(16,183,186,0.5)] shrink-0 -mt-1">
                  <Mic className="size-4 text-[#10B7BA]" />
                </span>
              ) : (
                <span className="flex size-10 items-center justify-center rounded-full border-2 border-white/20 bg-black text-sm font-medium text-white shrink-0">
                  {step.number}
                </span>
              )}
              <div className="space-y-1">
                <p
                  className={cn(
                    "text-sm font-semibold",
                    step.state === "current"
                      ? "text-[#FBBF24]"
                      : step.state === "done"
                        ? "text-white"
                        : "text-white/40"
                  )}
                >
                  {step.label}
                </p>
                {step.stamp ? (
                  <p className="text-[10px] text-[#9CA3AF]">{step.stamp}</p>
                ) : (
                  <p className="text-xs text-white/20">Pending</p>
                )}
                {step.detail ? (
                  <p className="text-xs text-white/40 leading-snug">
                    {step.detail}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  </AnimatedContainer>
);

export default ProgressTimeline;
