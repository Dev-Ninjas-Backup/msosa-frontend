import { Check } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import type { ReportDetailData } from "../data";

type ReportTimelineCardProps = {
  steps: ReportDetailData["timeline"];
};

const ReportTimelineCard = ({ steps }: ReportTimelineCardProps) => (
  <AnimatedContainer delay={0.08}>
    <Card className="p-5 h-full space-y-4">
      <h3 className="text-sm font-bold text-white">Report Timeline</h3>
      <ul>
        {steps.map((step, i) => (
          <li key={step.label} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-full shrink-0",
                  step.state === "current"
                    ? "border-2 border-[#10B7BA] bg-[rgba(16,183,186,0.2)]"
                    : "border border-[rgba(16,183,186,0.5)] bg-[rgba(16,183,186,0.4)]"
                )}
              >
                <Check className="size-2.5 text-[#10B7BA]" strokeWidth={3} />
              </span>
              {i < steps.length - 1 ? (
                <span className="w-px flex-1 min-h-4 bg-black my-1" />
              ) : null}
            </div>
            <div className="pb-4">
              <p
                className={cn(
                  "text-xs",
                  step.state === "current"
                    ? "font-bold text-[#10B7BA]"
                    : "font-semibold text-white"
                )}
              >
                {step.label}
              </p>
              <p className="mt-0.5 text-[10px] text-[#6B7280]">{step.date}</p>
              {step.active ? (
                <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[rgba(16,183,186,0.1)] px-2 py-0.5 text-[9px] font-medium text-[#10B7BA]">
                  <span className="size-1 rounded-full bg-[#10B7BA]" />
                  Active
                </span>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  </AnimatedContainer>
);

export default ReportTimelineCard;
