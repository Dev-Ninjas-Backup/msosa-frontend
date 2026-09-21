import { Info, Plus } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import type { ReminderItem } from "../data";

type ReminderHistoryProps = {
  reminders: ReminderItem[];
  onSend: () => void;
};

const ReminderHistory = ({ reminders, onSend }: ReminderHistoryProps) => (
  <AnimatedContainer delay={0.14}>
    <Card className="p-5 space-y-3.5 h-full">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[13px] font-bold text-white">Reminder History</h3>
        <button
          type="button"
          onClick={onSend}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#FBBF24] cursor-pointer hover:opacity-80"
        >
          <Plus className="size-2.5" />
          Send Reminder
        </button>
      </div>

      {reminders.map((r) => (
        <div
          key={r.title}
          className="rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="size-2 rounded-full bg-[#10B7BA] shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-white">{r.title}</p>
              <p className="text-[10px] text-white/60">{r.stamp}</p>
            </div>
          </div>
          <span className="rounded-full bg-[rgba(16,183,186,0.1)] px-2 py-0.5 text-[9px] font-bold text-[#10B7BA] shrink-0">
            {r.status}
          </span>
        </div>
      ))}

      <div className="rounded-lg border border-[rgba(251,191,36,0.15)] bg-[rgba(251,191,36,0.04)] px-2.5 py-1.5 flex gap-1.5 items-center">
        <Info className="size-2.5 text-[#FBBF24]/60 shrink-0" />
        <p className="text-[10px] text-white/40">
          No follow-up reminders have been sent. Click &quot;Send Reminder&quot;
          to notify this participant.
        </p>
      </div>
    </Card>
  </AnimatedContainer>
);

export default ReminderHistory;
