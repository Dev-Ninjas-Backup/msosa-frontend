import { CheckCircle2, Circle } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import type { StatusStep } from "../data";

type StatusTrackerProps = {
  steps: StatusStep[];
};

const StatusTracker = ({ steps }: StatusTrackerProps) => (
  <AnimatedContainer delay={0.1}>
    <Card className="p-6">
      <h3 className="text-[15px] font-bold text-white mb-5">Status Tracker</h3>
      <ul>
        {steps.map((step, i) => (
          <li key={step.label} className="flex gap-3">
            <div className="flex flex-col items-center">
              {step.state === "pending" ? (
                <Circle className="size-4 text-white/30 shrink-0" />
              ) : (
                <CheckCircle2
                  className={cn(
                    "size-4 shrink-0",
                    step.state === "current"
                      ? "text-[#10B7BA]"
                      : "text-[#10B7BA]/70"
                  )}
                />
              )}
              {i < steps.length - 1 ? (
                <span className="w-px flex-1 min-h-6 bg-white/10 my-1" />
              ) : null}
            </div>
            <div className="flex-1 pb-4">
              <p
                className={cn(
                  "text-sm",
                  step.state === "pending"
                    ? "text-white/40"
                    : step.state === "current"
                      ? "text-white font-semibold"
                      : "text-white"
                )}
              >
                {step.label}
                {step.state === "current" ? (
                  <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-[#10B7BA]">
                    Current
                  </span>
                ) : null}
                {step.state === "pending" ? (
                  <span className="ml-2 text-[10px] text-white/30">Pending</span>
                ) : null}
              </p>
              {step.stamp ? (
                <p className="mt-0.5 text-[10px] text-[#10B7BA]/80">
                  {step.stamp}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  </AnimatedContainer>
);

export default StatusTracker;
