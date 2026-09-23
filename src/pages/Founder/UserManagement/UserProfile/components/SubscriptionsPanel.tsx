import { FolderOpen, ListChecks, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import ProfilePanel from "./ProfilePanel";
import { formatMonthYear, type Subscription } from "../../data";

const SubscriptionsPanel = ({
  subscriptions,
  onAssign,
}: {
  subscriptions: Subscription[];
  onAssign: () => void;
}) => (
  <ProfilePanel
    title="Active Product Subscriptions™"
    action={
      <button
        type="button"
        onClick={onAssign}
        className="inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-[10px] font-bold uppercase tracking-[0.5px] text-[#eab308] hover:underline"
      >
        <Plus className="size-3" />
        Assign Product
      </button>
    }
  >
    {subscriptions.length === 0 ? (
      <p className="text-sm text-white/50">No products assigned to this user yet.</p>
    ) : (
      <div className="grid gap-3 md:grid-cols-2">
        {subscriptions.map((s, i) => {
          const Icon = i % 2 === 0 ? FolderOpen : ListChecks;
          const active = s.status === "Active";
          return (
            <div
              key={s.id}
              className="flex items-center gap-3 rounded-lg border border-[#222] bg-black px-4 py-3"
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-md",
                  i % 2 === 0
                    ? "bg-[#06b6d4]/10 text-[#22d3ee]"
                    : "bg-[#eab308]/10 text-[#eab308]"
                )}
              >
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{s.product}</p>
                <p className="text-[10px] text-[#6b7280]">
                  Expires: {formatMonthYear(s.expiresAt)}
                </p>
              </div>
              <span
                className={cn(
                  "rounded px-2 py-0.5 text-[9px] font-bold uppercase",
                  active ? "bg-[#10b981]/10 text-[#10b981]" : "bg-white/5 text-white/50"
                )}
              >
                {s.status}
              </span>
            </div>
          );
        })}
      </div>
    )}
  </ProfilePanel>
);

export default SubscriptionsPanel;
