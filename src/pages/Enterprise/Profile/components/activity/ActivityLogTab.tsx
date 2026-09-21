import { Activity } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { ACTIVITY_LOG } from "../../data";

const ActivityLogTab = () => (
  <AnimatedContainer delay={0.04}>
    <Card
      className="p-6 sm:p-7 space-y-5"
      backgroundColor="rgba(255,255,255,0.05)"
      shadow="none"
    >
      <div>
        <h3 className="text-lg font-bold text-white">Activity Log</h3>
        <p className="text-xs text-white/45 mt-1">
          Recent account and security activity
        </p>
      </div>

      <div className="space-y-2">
        {ACTIVITY_LOG.map((row) => (
          <div
            key={row.id}
            className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-white/5 text-white/40 shrink-0 mt-0.5">
              <Activity className="size-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <p className="text-sm font-medium text-white">{row.action}</p>
                <p className="text-[11px] text-white/40 shrink-0">{row.time}</p>
              </div>
              <p className="text-[11px] text-white/45 mt-0.5">{row.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </AnimatedContainer>
);

export default ActivityLogTab;
