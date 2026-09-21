import { Link } from "react-router-dom";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import type { ParticipationRow } from "../data";

type DetailHeaderProps = {
  row: ParticipationRow;
  onReminder: () => void;
};

const DetailHeader = ({ row, onReminder }: DetailHeaderProps) => (
  <AnimatedContainer delay={0.04}>
    <Card className="px-6 sm:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg font-bold text-white">{row.empId}</h2>
          <span className="rounded-full border border-[rgba(16,183,186,0.3)] bg-[rgba(16,183,186,0.1)] px-2 py-0.5 text-[10px] font-bold text-[#10B7BA]">
            Live
          </span>
        </div>
        <p className="mt-1 text-xs text-[#9CA3AF]">
          {row.department} Department · {row.reflection} · {row.campaign}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Link
          to="/enterprise/participation-monitoring"
          className="h-8 px-3.5 rounded-lg border border-transparent text-xs font-medium text-[#9CA3AF] hover:text-white no-underline inline-flex items-center"
        >
          ← Back
        </Link>
        <Button
          variant="soft"
          size="sm"
          className="rounded-lg! h-8! px-3.5! text-xs! text-[#9CA3AF]!"
          onClick={() => toast.success("Export started.")}
        >
          Export Detail
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="rounded-lg! bg-[#FBBF24]! text-black! hover:bg-[#e8b93a]! h-8! px-3.5! text-xs!"
          onClick={onReminder}
        >
          Send Reminder
        </Button>
      </div>
    </Card>
  </AnimatedContainer>
);

export default DetailHeader;
