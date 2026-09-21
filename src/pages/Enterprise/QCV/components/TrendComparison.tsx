import { ArrowUp } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { TREND_METRICS } from "../data";

const TrendComparison = () => (
  <AnimatedContainer delay={0.1}>
    <Card className="p-6 space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-white">Trend Comparison</h3>
        <span className="text-xs text-white/50">Q2 vs Q3 2026</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {TREND_METRICS.map((m) => (
          <div
            key={m.title}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-4"
          >
            <p className="text-xs font-medium text-white/70">{m.title}</p>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-2xl font-bold text-white/50">{m.from}</p>
                <p className="text-[10px] text-white/40 text-center">Q2</p>
              </div>
              <div className="flex flex-col items-center text-[#10B7BA]">
                <ArrowUp className="size-3.5" />
                <span className="text-[10px] font-medium">{m.delta}</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{m.to}</p>
                <p className="text-[10px] text-white/40 text-center">Q3</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] text-white/50">
                <span className="w-6">Q2</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-white/40"
                    style={{ width: `${m.fromBar}%` }}
                  />
                </div>
                <span className="w-8 text-right">
                  {"fromLabel" in m ? m.fromLabel : m.from}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-white/50">
                <span className="w-6">Q3</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#10B7BA]"
                    style={{ width: `${m.toBar}%` }}
                  />
                </div>
                <span className="w-8 text-right">
                  {"toLabel" in m ? m.toLabel : m.to}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </AnimatedContainer>
);

export default TrendComparison;
