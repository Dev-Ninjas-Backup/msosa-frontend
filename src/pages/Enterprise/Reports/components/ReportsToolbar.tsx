import AnimatedContainer from "@/common/AnimatedContainer";
import Select from "@/ui/Select";
import { cn } from "@/lib/utils";

type ReportsToolbarProps = {
  total: number;
  statusFilter: string;
  dateRange: string;
  tab: "Active" | "Archived";
  onStatus: (v: string) => void;
  onDateRange: (v: string) => void;
  onTab: (v: "Active" | "Archived") => void;
};

const ReportsToolbar = ({
  total,
  statusFilter,
  dateRange,
  tab,
  onStatus,
  onDateRange,
  onTab,
}: ReportsToolbarProps) => (
  <AnimatedContainer delay={0.08}>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <h3 className="text-base font-bold text-white">
        All Reports <span className="text-[#10B7BA]">({total})</span>
      </h3>
      <div className="flex flex-wrap items-center gap-2">
        <Select
          variant="soft"
          title="Status"
          className="w-[110px]"
          options={[
            { label: "Status", value: "all" },
            { label: "Approved", value: "Approved" },
            { label: "Processing", value: "Processing" },
            { label: "Archived", value: "Archived" },
          ]}
          value={statusFilter}
          onChange={onStatus}
          placeholder="Status"
        />
        <Select
          variant="soft"
          title="Date Range"
          className="w-[120px]"
          options={[
            { label: "Date Range", value: "all" },
            { label: "This quarter", value: "q" },
            { label: "Last 90 days", value: "90d" },
          ]}
          value={dateRange}
          onChange={onDateRange}
          placeholder="Date Range"
        />
        {(["Active", "Archived"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onTab(t)}
            className={cn(
              "h-7 px-2.5 rounded text-[10px] font-medium cursor-pointer border transition-colors",
              tab === t
                ? "bg-white/20 border-white/40 text-white"
                : "bg-white/[0.02] border-white/5 text-[#9CA3AF] hover:text-white"
            )}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  </AnimatedContainer>
);

export default ReportsToolbar;
