import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import type { InviteHistoryEvent } from "../data";
import { toneDot } from "./statusStyles";

type InvitationHistoryProps = {
  history: InviteHistoryEvent[];
};

const InvitationHistory = ({ history }: InvitationHistoryProps) => (
  <AnimatedContainer delay={0.14}>
    <Card className="p-6 sm:p-8 overflow-hidden">
      <h3 className="text-[15px] font-bold text-white mb-5">
        Invitation History
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left">
          <thead>
            <tr className="border-b border-white/10 text-[10px] uppercase tracking-wider text-white/40">
              <th className="pb-3 font-semibold">Event</th>
              <th className="pb-3 font-semibold">Date / Time</th>
              <th className="pb-3 font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h) => (
              <tr
                key={h.event}
                className="border-b border-white/[0.06] last:border-0"
              >
                <td className="py-3 pr-3">
                  <span className="inline-flex items-center gap-2 text-[13px] text-white">
                    <span
                      className={cn(
                        "size-2 rounded-full shrink-0",
                        toneDot(h.tone)
                      )}
                    />
                    {h.event}
                  </span>
                </td>
                <td className="py-3 pr-3 text-[12px] text-white/50 whitespace-nowrap">
                  {h.date} · {h.time}
                </td>
                <td className="py-3 text-[12px] text-white/50">{h.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </AnimatedContainer>
);

export default InvitationHistory;
