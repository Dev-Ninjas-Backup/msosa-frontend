import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { SUBSCRIPTION_DETAILS } from "../data";

const SubscriptionDetails = () => {
  const [autoRenew, setAutoRenew] = useState(true);

  return (
    <AnimatedContainer delay={0.08}>
      <Card
        className="p-7 space-y-5"
        backgroundColor="rgba(255,255,255,0.05)"
        shadow="none"
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-white">Subscription Details</h3>
          <button
            type="button"
            onClick={() => toast.message("Edit subscription details…")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FBBF24] hover:underline cursor-pointer border-0 bg-transparent p-0"
          >
            Edit Details
            <ChevronRight className="size-3" />
          </button>
        </div>

        <div>
          {SUBSCRIPTION_DETAILS.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-3 py-2.5 border-b border-white/10"
            >
              <p className="text-xs text-[#9CA3AF]">{row.label}</p>
              {"planBadge" in row && row.planBadge ? (
                <span className="rounded-full bg-[rgba(251,191,36,0.1)] px-2.5 py-0.5 text-[11px] font-bold text-[#FBBF24]">
                  {row.value}
                </span>
              ) : "paid" in row && row.paid ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#10B7BA]">
                  <span className="size-1.5 rounded-full bg-[#10B7BA]" />
                  {row.value}
                </span>
              ) : (
                <p
                  className={cn(
                    "text-xs",
                    "gold" in row && row.gold
                      ? "font-semibold text-[#FBBF24]"
                      : "muted" in row && row.muted
                        ? "font-normal text-white"
                        : "font-semibold text-white"
                  )}
                >
                  {row.value}
                </p>
              )}
            </div>
          ))}

          <div className="flex items-center justify-between gap-3 py-2.5">
            <p className="text-xs text-[#9CA3AF]">Auto Renewal</p>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                role="switch"
                aria-checked={autoRenew}
                onClick={() => {
                  setAutoRenew((v) => !v);
                  toast.success(
                    autoRenew
                      ? "Auto-renewal disabled."
                      : "Auto-renewal enabled."
                  );
                }}
                className={cn(
                  "relative h-5 w-9 rounded-full border-0 cursor-pointer transition-colors",
                  autoRenew ? "bg-[#FBBF24]" : "bg-white/20"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 size-3.5 rounded-full bg-black transition-all",
                    autoRenew ? "left-[18px]" : "left-0.5"
                  )}
                />
              </button>
              <span
                className={cn(
                  "text-xs font-semibold",
                  autoRenew ? "text-[#FBBF24]" : "text-white/50"
                )}
              >
                {autoRenew ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </AnimatedContainer>
  );
};

export default SubscriptionDetails;
