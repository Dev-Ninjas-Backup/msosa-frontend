import AnimatedContainer from "@/common/AnimatedContainer";
import type { ReportDetailData } from "../data";

type DetailStatusBarProps = {
  report: ReportDetailData;
};

const DetailStatusBar = ({ report }: DetailStatusBarProps) => (
  <AnimatedContainer delay={0.02}>
    <div className="flex flex-wrap items-center gap-3">
      <span className="rounded-lg border border-[rgba(16,183,186,0.5)] bg-[rgba(16,183,186,0.1)] px-4 py-2 text-xs font-semibold text-[#10B7BA]">
        {report.status}
      </span>
      {report.pdf ? (
        <span className="rounded-lg border border-[rgba(16,183,186,0.4)] bg-[rgba(16,183,186,0.1)] px-4 py-2 text-xs font-medium text-[#10B7BA]">
          PDF Generated
        </span>
      ) : null}
      <span className="rounded-lg border border-[rgba(16,183,186,0.3)] bg-[rgba(16,183,186,0.1)] px-4 py-2 text-xs font-medium text-[#10B7BA]">
        Available
      </span>
      <span className="pl-2 text-[11px] text-[#6B7280]">
        Report ID: {report.id}
      </span>
      <span className="text-[11px] text-[#6B7280]">
        Version: {report.version}
      </span>
    </div>
  </AnimatedContainer>
);

export default DetailStatusBar;
