import { Play } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Select from "@/ui/Select";

type ComparisonControlsProps = {
  current: string;
  compare: string;
  onCurrent: (v: string) => void;
  onCompare: (v: string) => void;
};

const ComparisonControls = ({
  current,
  compare,
  onCurrent,
  onCompare,
}: ComparisonControlsProps) => (
  <AnimatedContainer delay={0.06}>
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-end gap-3">
      <div>
        <p className="text-[11px] text-[#9CA3AF] mb-1.5">Current Quarter</p>
        <Select
          variant="soft"
          className="w-[130px]"
          options={["Q3 2026", "Q2 2026", "Q1 2026"]}
          value={current}
          onChange={onCurrent}
        />
      </div>
      <span className="hidden lg:flex size-11 items-center justify-center rounded-lg border border-white/10 text-xs font-semibold text-white/50 mb-0.5">
        VS
      </span>
      <div>
        <p className="text-[11px] text-[#9CA3AF] mb-1.5">Compare With</p>
        <Select
          variant="soft"
          className="w-[130px]"
          options={["Q2 2026", "Q1 2026", "Q4 2025"]}
          value={compare}
          onChange={onCompare}
        />
      </div>
      <Button
        variant="primary"
        size="sm"
        className="rounded-lg! bg-[#FBBF24]! text-black! hover:bg-[#e8b93a]! h-9! px-4!"
        onClick={() => toast.success("Comparison updated.")}
      >
        <Play className="size-3 fill-black" />
        Run Comparison
      </Button>
    </div>
  </AnimatedContainer>
);

export default ComparisonControls;
