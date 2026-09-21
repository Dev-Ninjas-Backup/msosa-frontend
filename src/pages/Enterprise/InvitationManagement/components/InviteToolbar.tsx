import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Select from "@/ui/Select";
import { cn } from "@/lib/utils";

type InviteToolbarProps = {
  statusFilter: string;
  dateRange: string;
  filter: "Active" | "Expired";
  onStatusFilter: (v: string) => void;
  onDateRange: (v: string) => void;
  onFilter: (v: "Active" | "Expired") => void;
  onCreate: () => void;
};

const InviteToolbar = ({
  statusFilter,
  dateRange,
  filter,
  onStatusFilter,
  onDateRange,
  onFilter,
  onCreate,
}: InviteToolbarProps) => (
  <AnimatedContainer delay={0.08}>
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-end gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <Select
          variant="soft"
          title="Status"
          className="w-[130px]"
          options={[
            { label: "All Statuses", value: "all" },
            { label: "Accepted", value: "Accepted" },
            { label: "Invited", value: "Invited" },
            { label: "Pending", value: "Pending" },
            { label: "Suspended", value: "Suspended" },
            { label: "Cancelled", value: "Cancelled" },
          ]}
          value={statusFilter}
          onChange={onStatusFilter}
          placeholder="Status"
        />
        <Select
          variant="soft"
          title="Date Range"
          className="w-[140px]"
          options={[
            { label: "All Time", value: "all" },
            { label: "Last 30 days", value: "30d" },
            { label: "This quarter", value: "q" },
          ]}
          value={dateRange}
          onChange={onDateRange}
          placeholder="Date Range"
        />
        <div className="flex items-center gap-0.5 rounded-lg border border-white/10 bg-black p-1.5">
          {(["Active", "Expired"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onFilter(s)}
              className={cn(
                "h-7 px-2.5 rounded-md text-[11px] cursor-pointer transition-colors",
                filter === s
                  ? s === "Active"
                    ? "bg-[rgba(16,183,186,0.2)] text-[#10B7BA] font-semibold"
                    : "bg-white/10 text-white font-semibold"
                  : "text-[#9CA3AF] hover:text-white"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <Button
        variant="primary"
        size="sm"
        className="rounded-lg! bg-[#FBBF24]! text-black! hover:bg-[#e8b93a]! h-8! px-3.5! text-xs!"
        onClick={onCreate}
      >
        + Create Invitation
      </Button>
    </div>
  </AnimatedContainer>
);

export default InviteToolbar;
