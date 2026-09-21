import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { QCV_KPIS, kpiIcon } from "../data";

const badgeClass = (tone: string) => {
  switch (tone) {
    case "teal":
      return "bg-[rgba(16,183,186,0.15)] text-[#10B7BA] border border-[rgba(16,183,186,0.3)]";
    case "gold":
      return "bg-[rgba(251,191,36,0.15)] text-[#FBBF24]";
    case "blue":
      return "bg-[rgba(59,130,246,0.15)] text-[#60A5FA] border border-[rgba(59,130,246,0.3)]";
    default:
      return "bg-white/10 text-[#9CA3AF]";
  }
};

const QcvKpiCards = () => (
  <AnimatedContainer delay={0.04}>
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      {QCV_KPIS.map((k) => {
        const Icon = kpiIcon(k.icon);
        return (
          <Card key={k.label} className="p-5 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <span className="flex size-11 items-center justify-center rounded-xl bg-white/5 text-white/60">
                <Icon className="size-4" />
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                  badgeClass(k.badgeTone)
                )}
              >
                {k.badgeTone === "teal" && k.badge === "Active" ? (
                  <span className="size-1.5 rounded-full bg-[#10B7BA]" />
                ) : null}
                {k.badge}
              </span>
            </div>
            <p className="text-xl font-bold text-white pt-1">{k.value}</p>
            <p className="text-sm text-white/80">{k.label}</p>
            <p className="text-[11px] text-[#9CA3AF]">{k.sub}</p>
          </Card>
        );
      })}
    </div>
  </AnimatedContainer>
);

export default QcvKpiCards;
