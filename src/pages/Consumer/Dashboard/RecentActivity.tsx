// src/components/consumer/dashboard/RecentActivity.tsx
import { Info } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";

const ACTIVITIES = [
  {
    text: "Relationship Reflection™ available",
    time: "14 minutes ago",
    active: true,
  },
  {
    text: "Continuum data synchronized",
    time: "3 hours ago",
    active: true,
  },
  {
    text: "Subscription renewed",
    time: "Yesterday",
    active: false,
  },
];

const RecentActivity = () => {
  return (
    <AnimatedContainer delay={0.18} direction="left">
      <Card className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-semibold tracking-[0.12em] text-secondary-text uppercase">
              Recent Activity
            </h3>
            <Info className="size-3.5 text-secondary-text" />
          </div>
          <button
            type="button"
            className="text-[12px] text-[#FBBF24] font-bold transition-colors border-0 bg-transparent cursor-pointer"
          >
            CLEAR ALL
          </button>
        </div>

        <ul className="space-y-4">
          {ACTIVITIES.map((item) => (
            <li key={item.text} className="flex gap-3">
              <span
                className={cn(
                  "mt-1.5 size-2 rounded-full shrink-0",
                  item.active ? "bg-[#FBBF24]" : "bg-white/20"
                )}
              />
              <div>
                <p className="text-sm text-primary-text leading-snug">
                  {item.text}
                </p>
                <p className="text-xs text-secondary-text mt-0.5">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </AnimatedContainer>
  );
};

export default RecentActivity;