import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { INVITE_KPIS } from "../data";
import { kpiIcon } from "./statusStyles";

const InviteKpiCards = () => (
  <AnimatedContainer delay={0.04}>
    <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3">
      {INVITE_KPIS.map((k) => {
        const Icon = kpiIcon(k.icon);
        return (
          <Card key={k.label} className="p-3.5">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-white/5 text-[#60A5FA]">
                <Icon className="size-3.5" />
              </span>
              {k.delta !== "—" ? (
                <span className="text-[10px] font-medium text-[#10B7BA]">
                  {k.delta}
                </span>
              ) : null}
            </div>
            <p className="text-xl font-bold text-white leading-none">{k.value}</p>
            <p className="mt-1.5 text-[10px] text-white/50 leading-tight">
              {k.label}
            </p>
          </Card>
        );
      })}
    </div>
  </AnimatedContainer>
);

export default InviteKpiCards;
