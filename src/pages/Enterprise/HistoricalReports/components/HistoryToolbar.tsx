import { Search } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { cn } from "@/lib/utils";

type HistoryToolbarProps = {
  search: string;
  status: string;
  period: string;
  type: string;
  activeFilters: string[];
  onSearch: (v: string) => void;
  onStatus: (v: string) => void;
  onPeriod: (v: string) => void;
  onType: (v: string) => void;
  onRemoveFilter: (f: string) => void;
  onClearFilters: () => void;
};

const HistoryToolbar = ({
  search,
  status,
  period,
  type,
  activeFilters,
  onSearch,
  onStatus,
  onPeriod,
  onType,
  onRemoveFilter,
  onClearFilters,
}: HistoryToolbarProps) => (
  <AnimatedContainer delay={0.04}>
    <div className="rounded-xl border border-white/10 bg-white/[0.05] p-5 space-y-3">
      <div className="flex flex-col lg:flex-row gap-2">
        <Input
          variant="search"
          leftIcon={<Search className="size-3" />}
          placeholder="Search by invoice number, transaction ID..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="flex-1"
        />
        <Select
          variant="soft"
          className="w-full lg:w-[140px]"
          options={[
            { label: "Status", value: "all" },
            { label: "Paid", value: "Paid" },
            { label: "Failed", value: "Failed" },
            { label: "Pending", value: "Pending" },
          ]}
          value={status}
          onChange={onStatus}
          placeholder="Status"
        />
        <Select
          variant="soft"
          className="w-full lg:w-[150px]"
          options={[
            { label: "Period", value: "all" },
            { label: "2026", value: "2026" },
            { label: "2025", value: "2025" },
          ]}
          value={period}
          onChange={onPeriod}
          placeholder="Period"
        />
        <Select
          variant="soft"
          className="w-full lg:w-[130px]"
          options={[
            { label: "Type", value: "all" },
            { label: "Subscription", value: "Subscription" },
            { label: "Add-on", value: "Add-on" },
          ]}
          value={type}
          onChange={onType}
          placeholder="Type"
        />
      </div>

      {activeFilters.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-white/45">Active filters:</span>
          {activeFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => onRemoveFilter(f)}
              className={cn(
                "inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-white/70 hover:text-white cursor-pointer"
              )}
            >
              {f}
              <span className="text-white/40">×</span>
            </button>
          ))}
          <button
            type="button"
            onClick={onClearFilters}
            className="text-[#FBBF24] hover:underline cursor-pointer border-0 bg-transparent p-0"
          >
            Clear all
          </button>
        </div>
      ) : null}
    </div>
  </AnimatedContainer>
);

export default HistoryToolbar;
