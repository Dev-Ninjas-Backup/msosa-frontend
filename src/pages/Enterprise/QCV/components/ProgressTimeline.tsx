import { Check, Clock3 } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { TIMELINE } from "../data";

const ProgressTimeline = () => (
  <AnimatedContainer delay={0.12}>
    <Card className="p-6 space-y-6">
      <h3 className="text-xl font-bold text-white">Progress Timeline</h3>
      <div className="relative flex items-start justify-between gap-2 overflow-x-auto pb-1">
        <div className="absolute top-6 left-[8%] right-[8%] h-0.5 bg-white/10" />
        {TIMELINE.map((step) => (
          <div
            key={step.quarter}
            className="relative z-10 flex flex-col items-center text-center flex-1 min-w-[100px]"
          >
            <span
              className={cn(
                "flex size-12 items-center justify-center rounded-full border-2 bg-[#0D1117]",
                step.state === "done"
                  ? "border-[#10B7BA] bg-[rgba(16,183,186,0.3)]"
                  : step.state === "current"
                    ? "border-[#10B7BA] shadow-[0_0_12px_rgba(16,183,186,0.5)]"
                    : "border-white/20 border-dashed"
              )}
            >
              {step.state === "pending" ? (
                <Clock3 className="size-4 text-white/40" />
              ) : (
                <Check className="size-4 text-[#10B7BA]" strokeWidth={3} />
              )}
            </span>
            <p className="mt-3 text-sm font-semibold text-white">{step.quarter}</p>
            <p className="text-[10px] text-white/50">{step.range}</p>
            <span
              className={cn(
                "mt-2 rounded-full px-2 py-0.5 text-[10px] font-medium",
                step.state === "current"
                  ? "bg-[rgba(16,183,186,0.15)] text-[#10B7BA]"
                  : step.state === "pending"
                    ? "bg-white/5 text-white/40"
                    : "bg-white/5 text-white/60"
              )}
            >
              {step.badge}
            </span>
          </div>
        ))}
      </div>
    </Card>
  </AnimatedContainer>
);

export default ProgressTimeline;
