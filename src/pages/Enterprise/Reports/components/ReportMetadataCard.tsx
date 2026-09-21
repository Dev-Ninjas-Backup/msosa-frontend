import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import type { ReportDetailData } from "../data";

type MetaFieldProps = {
  label: string;
  value: React.ReactNode;
  accent?: boolean;
  muted?: boolean;
};

const MetaField = ({ label, value, accent, muted }: MetaFieldProps) => (
  <div className="space-y-0.5">
    <p className="text-[10px] font-medium uppercase tracking-[0.5px] text-[#6B7280]">
      {label}
    </p>
    <div
      className={cn(
        "text-xs font-semibold",
        accent ? "text-[#10B7BA]" : muted ? "text-[#9CA3AF]" : "text-white"
      )}
    >
      {value}
    </div>
  </div>
);

type ReportMetadataCardProps = {
  report: ReportDetailData;
};

const ReportMetadataCard = ({ report }: ReportMetadataCardProps) => (
  <AnimatedContainer delay={0.06}>
    <Card className="p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">Report Metadata</h3>
        <span className="rounded bg-black px-2 py-1 text-[10px] text-[#6B7280]">
          {report.id}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-4">
        <MetaField label="Report Title" value={report.name} />
        <MetaField label="Reflection" value={report.reflection} />
        <MetaField label="Assessment Date" value={report.assessmentDate} />
        <MetaField label="Reporting Period" value={report.period} accent />
        <MetaField
          label="Report Status"
          value={
            <span className="inline-flex items-center gap-1 text-[#10B7BA]">
              <span className="size-1.5 rounded-full bg-[#10B7BA]" />
              {report.status}
            </span>
          }
        />
        <MetaField label="Generated Date" value={report.generated} />
        <MetaField label="Organization" value={report.organization} />
        <MetaField label="Department" value={report.department} />
        <MetaField label="Assessment Campaign" value={report.campaign} />
        <MetaField label="Report Version" value={report.version} />
        <MetaField label="Approval Date" value={report.approvalDate} />
        <MetaField label="Report ID" value={report.id} muted />
      </div>
    </Card>
  </AnimatedContainer>
);

export default ReportMetadataCard;
