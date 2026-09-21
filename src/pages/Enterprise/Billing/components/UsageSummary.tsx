import { ChevronRight } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { USAGE_METRICS } from "../data";

const UsageSummary = () => (
  <AnimatedContainer delay={0.1}>
    <Card
      className="p-7 space-y-5"
      backgroundColor="rgba(255,255,255,0.05)"
      shadow="none"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-white">Usage Summary</h3>
        <button
          type="button"
          onClick={() => toast.message("Opening analytics…")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FBBF24] hover:underline cursor-pointer border-0 bg-transparent p-0"
        >
          View Detailed Analytics
          <ChevronRight className="size-3" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {USAGE_METRICS.map((m) => (
          <div key={m.label} className="space-y-2.5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-[#9CA3AF]">{m.label}</p>
              <p className="text-xs font-bold text-white">{m.value}</p>
            </div>
            <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-white"
                style={{ width: `${m.barPct}%` }}
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <p
                className={cn(
                  "text-[11px] font-medium",
                  m.usedTone === "gold" ? "text-[#FBBF24]" : "text-[#10B7BA]"
                )}
              >
                {m.usedLabel}
              </p>
              <p className="text-[11px] text-[#9CA3AF]">{m.rightLabel}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </AnimatedContainer>
);

export default UsageSummary;
