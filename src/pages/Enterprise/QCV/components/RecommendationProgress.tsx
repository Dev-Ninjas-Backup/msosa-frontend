import { ChevronRight } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { RECOMMENDATIONS } from "../data";

const progressClass = (tone: string) => {
  switch (tone) {
    case "gold":
      return "border-[rgba(251,191,36,0.4)] text-[#FBBF24] bg-[rgba(251,191,36,0.1)]";
    case "teal":
      return "border-[rgba(16,183,186,0.4)] text-[#10B7BA] bg-[rgba(16,183,186,0.1)]";
    default:
      return "border-[rgba(34,197,94,0.4)] text-[#22C55E] bg-[rgba(34,197,94,0.1)]";
  }
};

const RecommendationProgress = () => (
  <AnimatedContainer delay={0.1}>
    <Card className="p-6 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-white leading-tight">
          Recommendation Progress
        </h3>
        <button
          type="button"
          onClick={() => toast.message("Opening recommendations…")}
          className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-white cursor-pointer border-0 bg-transparent p-0 shrink-0"
        >
          View All
          <ChevronRight className="size-3" />
        </button>
      </div>

      <div className="grid grid-cols-[1fr_72px_72px] gap-1 text-[10px] uppercase tracking-wide text-white/40 border-b border-white/10 pb-2">
        <span>Recommendation</span>
        <span className="text-center">Status</span>
        <span className="text-center">Progress</span>
      </div>

      <div className="divide-y divide-white/10">
        {RECOMMENDATIONS.map((r) => (
          <div
            key={r.name}
            className="grid grid-cols-[1fr_72px_72px] gap-1 py-3 items-center"
          >
            <div className="flex items-start gap-2 min-w-0">
              <span
                className={cn(
                  "mt-1.5 size-1.5 rounded-full shrink-0",
                  r.tone === "gold"
                    ? "bg-[#FBBF24]"
                    : r.tone === "teal"
                      ? "bg-[#10B7BA]"
                      : "bg-[#22C55E]"
                )}
              />
              <p className="text-xs text-white leading-snug">{r.name}</p>
            </div>
            <p className="text-[10px] text-white/50 text-center">{r.status}</p>
            <span
              className={cn(
                "justify-self-center rounded-full border px-1.5 py-0.5 text-[9px] font-medium whitespace-nowrap",
                progressClass(r.tone)
              )}
            >
              {r.progress}
            </span>
          </div>
        ))}
      </div>
    </Card>
  </AnimatedContainer>
);

export default RecommendationProgress;
