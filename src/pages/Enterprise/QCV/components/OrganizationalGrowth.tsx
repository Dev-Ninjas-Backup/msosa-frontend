import { ChevronRight, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { GROWTH_CARDS } from "../data";

const toneIcon = (tone: string) => {
  switch (tone) {
    case "gold":
      return "bg-[rgba(251,191,36,0.15)] text-[#FBBF24]";
    case "blue":
      return "bg-[rgba(59,130,246,0.15)] text-[#60A5FA]";
    default:
      return "bg-[rgba(16,183,186,0.15)] text-[#10B7BA]";
  }
};

const OrganizationalGrowth = () => (
  <AnimatedContainer delay={0.12}>
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-white">Organizational Growth</h3>
        <button
          type="button"
          onClick={() => toast.message("Opening growth details…")}
          className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-white cursor-pointer border-0 bg-transparent p-0"
        >
          Details
          <ChevronRight className="size-3" />
        </button>
      </div>

      <div className="space-y-3">
        {GROWTH_CARDS.map((g) => (
          <div
            key={g.label}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex items-center justify-between gap-3"
          >
            <div>
              <p className="text-xs text-white/55">{g.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{g.value}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full",
                  toneIcon(g.tone)
                )}
              >
                <TrendingUp className="size-3.5" />
              </span>
              <span className="text-[10px] text-white/50">{g.delta}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </AnimatedContainer>
);

export default OrganizationalGrowth;
