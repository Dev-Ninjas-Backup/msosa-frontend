import { Info } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";

type ExecutiveSummaryCardProps = {
  summary: string;
};

const ExecutiveSummaryCard = ({ summary }: ExecutiveSummaryCardProps) => (
  <AnimatedContainer delay={0.1}>
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-[15px] font-bold text-white">Executive Summary</h3>
        <Info className="size-3 text-white/40" />
      </div>
      <div className="h-px w-12 rounded-full bg-[#10B7BA] mb-3" />
      <p className="text-[13px] text-[#9CA3AF] leading-[21px]">{summary}</p>
    </Card>
  </AnimatedContainer>
);

export default ExecutiveSummaryCard;
