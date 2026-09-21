import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { HISTORY_KPIS } from "../data";

const dotClass = (tone: string) => {
  switch (tone) {
    case "teal":
      return "bg-[#10B7BA]";
    case "red":
      return "bg-[#F87171]";
    case "gold":
      return "bg-[#FBBF24]";
    default:
      return "bg-white/40";
  }
};

const HistoryKpiCards = () => (
  <AnimatedContainer delay={0.02}>
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
      {HISTORY_KPIS.map((k) => (
        <Card key={k.label} className="p-5 space-y-2">
          <p className="text-xs text-white/50">{k.label}</p>
          <p
            className={cn(
              "text-2xl font-bold",
              k.tone === "red" ? "text-[#F87171]" : "text-white"
            )}
          >
            {k.value}
          </p>
          <p className="text-[11px] text-white/45 inline-flex items-center gap-1.5">
            <span className={cn("size-1.5 rounded-full", dotClass(k.tone))} />
            {k.sub}
          </p>
        </Card>
      ))}
    </div>
  </AnimatedContainer>
);

export default HistoryKpiCards;
