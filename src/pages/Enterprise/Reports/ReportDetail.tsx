import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";

const REPORTS: Record<
  string,
  {
    title: string;
    blueprint: string;
    period: string;
    status: string;
    version: string;
    department: string;
    generated: string;
    body: string;
  }
> = {
  "RPT-2026-0041": {
    title: "Leadership Visibility Report",
    blueprint: "Leadership Blueprint",
    period: "Q3 2026",
    status: "Approved",
    version: "v1.2",
    department: "Executive",
    generated: "Jun 1, 2026",
    body: "This report presents the organizational leadership visibility assessment results for Acme Corporation's Executive Department. Findings highlight strengths in strategic communication and opportunities in cross-functional alignment.",
  },
  "RPT-2026-0040": {
    title: "MindState™ Q3 2026",
    blueprint: "MindState™ Reflection",
    period: "Q3 2026",
    status: "Approved",
    version: "v2.0",
    department: "All Depts",
    generated: "Jun 1, 2026",
    body: "MindState™ Q3 results summarize reflective participation across the organization, with emphasis on emotional intelligence trends and growth themes.",
  },
  "RPT-2026-0039": {
    title: "Team Assessment Report",
    blueprint: "Team Health Blueprint",
    period: "Q3 2026",
    status: "Approved",
    version: "v1.0",
    department: "Engineering",
    generated: "May 31, 2026",
    body: "Engineering team health assessment covering collaboration, psychological safety, and delivery rhythm indicators.",
  },
  "RPT-2026-0038": {
    title: "Sales Performance Report",
    blueprint: "Leadership Blueprint",
    period: "Q2 2026",
    status: "Pending",
    version: "v0.9",
    department: "Sales",
    generated: "May 15, 2026",
    body: "Draft sales leadership performance report awaiting final refinement and approval.",
  },
  "RPT-2025-0120": {
    title: "Org Readiness™ Q4 2025",
    blueprint: "Org Readiness™",
    period: "Q4 2025",
    status: "Archived",
    version: "v1.0",
    department: "All Depts",
    generated: "Dec 31, 2025",
    body: "Archived organizational readiness assessment for Q4 2025 change initiatives.",
  },
};

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[10px] uppercase tracking-[0.08em] text-secondary-text">
      {label}
    </p>
    <p className="mt-1 text-sm text-primary-text">{value}</p>
  </div>
);

const ReportDetail = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const report = reportId ? REPORTS[reportId] : undefined;

  if (!report) {
    return <Navigate to="/enterprise/reports" replace />;
  }

  return (
    <div className="space-y-5 sm:space-y-6 pb-8">
      <AnimatedContainer delay={0.02}>
        <Link
          to="/enterprise/reports"
          className="inline-flex items-center gap-1.5 text-xs text-secondary-text hover:text-[#F5C542] no-underline"
        >
          <ArrowLeft className="size-3.5" />
          Reports™
          <span className="text-white/30 mx-1">/</span>
          <span className="text-primary-text">{reportId}</span>
        </Link>
      </AnimatedContainer>

      <AnimatedContainer delay={0.04}>
        <Card className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-xs text-secondary-text mb-1">
                Report ID: {reportId}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {report.title}
              </h2>
            </div>
            <Button
              variant="primary"
              size="md"
              className="rounded-xl! bg-[#FBBF24]! self-start"
              onClick={() => toast.success("PDF download started.")}
            >
              <Download className="size-4" />
              PDF Report
            </Button>
          </div>
          <h3 className="text-sm text-secondary-text mb-4">Report Metadata</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            <Field label="Report Title" value={report.title} />
            <Field label="Blueprint" value={report.blueprint} />
            <Field label="Reporting Period" value={report.period} />
            <Field label="Report Status" value={report.status} />
            <Field label="Report Version" value={report.version} />
            <Field label="Department" value={report.department} />
            <Field label="Generated Date" value={report.generated} />
          </div>
          <h3 className="text-lg text-primary-text mb-3">Report Timeline</h3>
          <p className="text-sm text-secondary-text leading-relaxed max-w-3xl">
            {report.body}
          </p>
        </Card>
      </AnimatedContainer>
    </div>
  );
};

export default ReportDetail;
