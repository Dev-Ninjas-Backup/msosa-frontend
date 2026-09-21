import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { cn } from "@/lib/utils";
import type { ActivityEvent } from "../data";
import { activityDot, activityStageClass } from "./statusStyles";

type ActivityLogProps = {
  events: ActivityEvent[];
};

const ActivityLog = ({ events }: ActivityLogProps) => {
  const [stage, setStage] = useState("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () =>
      events.filter((e) => {
        if (stage !== "all" && e.stage !== stage) return false;
        if (q && !e.description.toLowerCase().includes(q.toLowerCase()))
          return false;
        return true;
      }),
    [events, stage, q]
  );

  return (
    <AnimatedContainer delay={0.16}>
      <Card className="overflow-hidden p-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-3.5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <h3 className="text-sm font-bold text-white">Activity Log</h3>
            <span className="rounded-full bg-[rgba(16,183,186,0.1)] px-2 py-0.5 text-[10px] font-bold text-[#10B7BA]">
              {filtered.length} Events
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select
              variant="soft"
              title="Filter by Stage"
              className="w-[140px]"
              options={[
                { label: "Filter by Stage", value: "all" },
                { label: "In Progress", value: "In Progress" },
                { label: "Started", value: "Started" },
                { label: "Invited", value: "Invited" },
                { label: "Sent", value: "Sent" },
              ]}
              value={stage}
              onChange={setStage}
              placeholder="Filter by Stage"
            />
            <Input
              variant="soft"
              leftIcon={<Search className="size-3.5" />}
              placeholder="Search events..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-[200px]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/[0.04] text-[10px] font-semibold uppercase tracking-[0.8px] text-white/50">
                <th className="px-5 py-2.5">Timestamp</th>
                <th className="px-3 py-2.5">Event Description</th>
                <th className="px-3 py-2.5">Stage</th>
                <th className="px-3 py-2.5">Channel</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr
                  key={`${e.time}-${e.description}`}
                  className="border-b border-white/[0.06] last:border-0"
                >
                  <td className="px-5 py-3.5">
                    <p className="text-[11px] font-semibold text-white">
                      {e.time}
                    </p>
                    <p className="text-[10px] text-white/60">{e.day}</p>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="inline-flex items-center gap-2 text-[11px] font-medium text-white">
                      <span
                        className={cn(
                          "size-1.5 rounded-full shrink-0",
                          activityDot(e.tone)
                        )}
                      />
                      {e.description}
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold",
                        activityStageClass(e.stage)
                      )}
                    >
                      {e.stage}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-[10px] text-white/60">
                    {e.channel}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AnimatedContainer>
  );
};

export default ActivityLog;
