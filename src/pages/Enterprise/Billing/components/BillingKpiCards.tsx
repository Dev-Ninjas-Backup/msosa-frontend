import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { BILLING_KPIS, kpiIcon } from "../data";

const badgeClass = (tone: string) => {
  switch (tone) {
    case "gold":
      return "bg-[rgba(251,191,36,0.12)] border-[rgba(251,191,36,0.3)] text-[#FBBF24]";
    case "teal":
      return "bg-[rgba(16,183,186,0.1)] border-[rgba(16,183,186,0.3)] text-[#10B7BA]";
    case "orange":
      return "bg-[rgba(249,115,22,0.1)] border-transparent text-[#F97316]";
    default:
      return "bg-white/10 border-transparent text-white/50";
  }
};

const iconBoxClass = (tone: string) => {
  switch (tone) {
    case "gold":
      return "bg-[rgba(251,191,36,0.12)] text-[#FBBF24]";
    case "teal":
      return "bg-[rgba(16,183,186,0.12)] text-[#10B7BA]";
    default:
      return "bg-white/[0.07] text-white/60";
  }
};

const BillingKpiCards = () => (
  <AnimatedContainer delay={0.04}>
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {BILLING_KPIS.map((k) => {
        const Icon = kpiIcon(k.icon);
        return (
          <Card
            key={k.label}
            className="p-6 flex flex-col gap-3.5"
            backgroundColor="rgba(255,255,255,0.05)"
            shadow="none"
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className={cn(
                  "flex size-11 items-center justify-center rounded-[10px]",
                  iconBoxClass(k.iconTone)
                )}
              >
                <Icon className="size-4" />
              </span>
              {k.badge ? (
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold",
                    badgeClass(k.badgeTone)
                  )}
                >
                  {"badgeDot" in k && k.badgeDot ? (
                    <span className="size-1.5 rounded-full bg-[#10B7BA]" />
                  ) : null}
                  {k.badge}
                </span>
              ) : (
                <span />
              )}
            </div>

            <div className="space-y-0.5">
              <p className="text-[11px] text-[#9CA3AF]">{k.label}</p>
              <p className="text-lg font-bold text-white leading-6">
                {k.valueLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              {k.sub ? (
                <p
                  className={cn(
                    "text-[11px] pt-0.5",
                    k.subTone === "gold"
                      ? "text-[#FBBF24]"
                      : k.subTone === "orange"
                        ? "text-[#F97316]"
                        : "text-[#9CA3AF]"
                  )}
                >
                  {k.sub}
                </p>
              ) : null}
              {"progress" in k && k.progress != null ? (
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden mt-1">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{ width: `${k.progress}%` }}
                  />
                </div>
              ) : null}
            </div>
          </Card>
        );
      })}
    </div>
  </AnimatedContainer>
);

export default BillingKpiCards;
