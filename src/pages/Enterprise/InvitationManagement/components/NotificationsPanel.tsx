import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { NOTIFICATIONS } from "../data";

const NotificationsPanel = () => (
  <AnimatedContainer delay={0.12}>
    <Card className="p-5 sm:p-6">
      <h3 className="text-[15px] font-medium text-white mb-4">Notifications</h3>

      <ul className="divide-y divide-white/[0.06]">
        {NOTIFICATIONS.map((n) => (
          <li
            key={n.title}
            className="flex items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0"
          >
            <div className="flex items-start gap-2.5 min-w-0">
              <span
                className={cn(
                  "mt-1.5 size-2 rounded-full shrink-0",
                  n.tone === "gold" ? "bg-[#F5C542]" : "bg-[#10B7BA]"
                )}
              />
              <div className="min-w-0">
                <p className="text-sm font-medium text-white">{n.title}</p>
                <p className="mt-0.5 text-[11px] text-white/40">{n.stamp}</p>
              </div>
            </div>

            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[10px] font-semibold shrink-0",
                n.tone === "gold"
                  ? "bg-[#F5C542]/15 text-[#F5C542]"
                  : "bg-[#10B7BA]/15 text-[#10B7BA]"
              )}
            >
              Auto
            </span>
          </li>
        ))}
      </ul>
    </Card>
  </AnimatedContainer>
);

export default NotificationsPanel;
