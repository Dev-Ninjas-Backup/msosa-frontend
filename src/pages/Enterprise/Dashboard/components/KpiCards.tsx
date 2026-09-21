import { TrendingDown, TrendingUp } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import { cn } from "@/lib/utils";
import { KPIS } from "../data";

const KpiCards = () => (
  <AnimatedContainer delay={0.08}>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {KPIS.map(({ label, value, delta, up, icon: Icon }) => (
        <div
          key={label}
          className="rounded-2xl border border-white/10 bg-[#0D1117] p-6 min-h-[200px] flex flex-col "
        >
          <div className="flex items-center justify-between gap-3">
            <span className="flex size-14 items-center justify-center rounded-xl bg-white/10 text-[#FBBF24]">
              <Icon className="size-5" />
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold",
                up
                  ? "bg-[#FBBF24]/10 text-[#FBBF24]"
                  : "bg-orange-500/10 text-orange-300"
              )}
            >
              {up ? (
                <TrendingUp className="size-2.5" />
              ) : (
                <TrendingDown className="size-2.5" />
              )}
              {delta}
            </span>
          </div>
          <p className="mt-8 text-[28px] font-bold text-white leading-none tracking-tight">
            {value}
          </p>
          <p className="mt-3.5 text-base font-medium text-white">{label}</p>
          <p className="mt-2 text-[13px] text-white/60">vs last cycle</p>
        </div>
      ))}
    </div>
  </AnimatedContainer>
);

export default KpiCards;
