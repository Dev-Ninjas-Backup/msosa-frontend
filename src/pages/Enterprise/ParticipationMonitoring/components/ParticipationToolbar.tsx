import { Search } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Input from "@/ui/Input";
import Select from "@/ui/Select";

type ParticipationToolbarProps = {
  q: string;
  dept: string;
  status: string;
  reflection: string;
  dateRange: string;
  activeCount: number;
  departments: string[];
  onQ: (v: string) => void;
  onDept: (v: string) => void;
  onStatus: (v: string) => void;
  onReflection: (v: string) => void;
  onDateRange: (v: string) => void;
};

const ParticipationToolbar = ({
  q,
  dept,
  status,
  reflection,
  dateRange,
  activeCount,
  departments,
  onQ,
  onDept,
  onStatus,
  onReflection,
  onDateRange,
}: ParticipationToolbarProps) => (
  <AnimatedContainer delay={0.08}>
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Select
        variant="soft"
        title="Department"
        className="w-[130px]"
        options={[
          { label: "Department", value: "all" },
          ...departments.map((d) => ({ label: d, value: d })),
        ]}
        value={dept}
        onChange={onDept}
        placeholder="Department"
      />
      <Select
        variant="soft"
        title="Status"
        className="w-[110px]"
        options={[
          { label: "Status", value: "all" },
          { label: "In Progress", value: "In Progress" },
          { label: "Completed", value: "Completed" },
          { label: "Not Started", value: "Not Started" },
          { label: "Processing", value: "Processing" },
          { label: "Submitted", value: "Submitted" },
          { label: "Reviewing", value: "Reviewing" },
        ]}
        value={status}
        onChange={onStatus}
        placeholder="Status"
      />
      <Select
        variant="soft"
        title="Reflection"
        className="w-[120px]"
        options={[
          { label: "Reflection", value: "all" },
          { label: "MindState™", value: "MindState™ Reflection" },
        ]}
        value={reflection}
        onChange={onReflection}
        placeholder="Reflection"
      />
      <Select
        variant="soft"
        title="Date Range"
        className="w-[120px]"
        options={[
          { label: "Date Range", value: "all" },
          { label: "Last 30 days", value: "30d" },
          { label: "This quarter", value: "q" },
        ]}
        value={dateRange}
        onChange={onDateRange}
        placeholder="Date Range"
      />
      <Input
        variant="soft"
        leftIcon={<Search className="size-3.5" />}
        placeholder="Search by Employee ID, Dept..."
        value={q}
        onChange={(e) => onQ(e.target.value)}
        className="w-[220px]"
      />
      <span className="inline-flex items-center rounded-lg border border-[rgba(16,183,186,0.3)] bg-[rgba(16,183,186,0.1)] px-2.5 py-1.5 text-[11px] font-semibold text-[#10B7BA]">
        {activeCount} Active
      </span>
    </div>
  </AnimatedContainer>
);

export default ParticipationToolbar;
