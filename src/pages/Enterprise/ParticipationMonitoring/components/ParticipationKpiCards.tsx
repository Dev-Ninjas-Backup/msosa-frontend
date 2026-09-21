import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { COMPLETION_RATE, PARTICIPATION_KPIS } from "../data";
import { kpiBadge, kpiIcon, kpiIconBg } from "./statusStyles";

const borderHex = (tone: string) => {
  switch (tone) {
    case "teal":
      return "rgba(16,183,186,0.3)";
    case "gold":
      return "rgba(251,191,36,0.3)";
    case "orange":
      return "rgba(249,115,22,0.3)";
    default:
      return "rgba(255,255,255,0.3)";
  }
};

const ParticipationKpiCards = () => {
  const donut = [
    { name: "Done", value: 41, color: "#10B7BA" },
    { name: "Rest", value: 59, color: "#3f3f46" },
  ];

  return (
    <AnimatedContainer delay={0.04}>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {PARTICIPATION_KPIS.map((k) => {
          const Icon = kpiIcon(k.icon);
          return (
            <Card
              key={k.label}
              backgroundColor="#000000"
              borderColor={borderHex(k.border)}
              className="p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-lg",
                    kpiIconBg(k.border)
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold",
                    kpiBadge(k.badgeTone)
                  )}
                >
                  {k.badgeTone === "teal" && k.badge === "Total" ? (
                    <span className="size-1.5 rounded-full bg-[#10B7BA]" />
                  ) : null}
                  {k.badge}
                </span>
              </div>
              <p className="text-[28px] font-bold text-white leading-none">
                {k.value}
              </p>
              <p className="mt-1.5 text-[13px] font-medium text-white">
                {k.label}
              </p>
              <p className="mt-0.5 text-[11px] text-[#9CA3AF]">{k.sub}</p>
            </Card>
          );
        })}

        <Card
          backgroundColor="#000000"
          borderColor="rgba(16,183,186,0.3)"
          className="p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-medium text-[#9CA3AF]">
              Completion Rate
            </p>
            <span className="rounded-full border border-[rgba(16,183,186,0.3)] bg-[rgba(16,183,186,0.1)] px-2 py-0.5 text-[10px] font-bold text-[#10B7BA]">
              {COMPLETION_RATE.badge}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[28px] font-bold text-white leading-none">
                {COMPLETION_RATE.value}
              </p>
              <p className="mt-1.5 text-[11px] text-[#9CA3AF]">
                {COMPLETION_RATE.of}
              </p>
            </div>
            <div className="relative size-14 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donut}
                    dataKey="value"
                    innerRadius={18}
                    outerRadius={26}
                    stroke="none"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {donut.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>
    </AnimatedContainer>
  );
};

export default ParticipationKpiCards;
