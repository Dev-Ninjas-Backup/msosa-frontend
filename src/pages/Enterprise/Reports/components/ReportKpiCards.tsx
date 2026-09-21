import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { REPORT_KPIS } from "../data";
import { kpiIcon } from "./statusStyles";

const ReportKpiCards = () => (
  <AnimatedContainer delay={0.04}>
    <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-3">
      {REPORT_KPIS.map((k) => {
        const Icon = kpiIcon(k.icon);
        return (
          <Card key={k.label} className="p-4 relative min-h-[120px]">
            {k.delta ? (
              <span className="absolute top-3 right-3 rounded-full bg-[rgba(16,185,129,0.4)] px-1.5 py-0.5 text-[10px] font-medium text-[#10B981]">
                {k.delta}
              </span>
            ) : null}
            <span className="flex text-white/50 mb-2">
              <Icon className="size-[18px]" />
            </span>
            <div className="flex items-center gap-1.5">
              <p
                className={cn(
                  "font-bold text-white leading-none",
                  "compact" in k && k.compact ? "text-[22px]" : "text-[26px]",
                  k.accent && "text-[#FBBF24]"
                )}
              >
                {k.value}
              </p>
              {"progress" in k && k.progress ? (
                <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden ml-1">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{ width: `${k.progress}%` }}
                  />
                </div>
              ) : null}
            </div>
            <p className="mt-2 text-[10px] text-[#6B7280]">{k.label}</p>
          </Card>
        );
      })}
    </div>
  </AnimatedContainer>
);

export default ReportKpiCards;
