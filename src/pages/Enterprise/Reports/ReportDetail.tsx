import { Navigate, useParams } from "react-router-dom";
import DetailStatusBar from "./components/DetailStatusBar";
import DownloadOptionsCard from "./components/DownloadOptionsCard";
import ExecutiveSummaryCard from "./components/ExecutiveSummaryCard";
import KeyFindingsCard from "./components/KeyFindingsCard";
import RecommendationsCard from "./components/RecommendationsCard";
import ReportMetadataCard from "./components/ReportMetadataCard";
import ReportTimelineCard from "./components/ReportTimelineCard";
import { getReport } from "./data";

const ReportDetail = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const report = reportId ? getReport(reportId) : undefined;

  if (!report) {
    return <Navigate to="/enterprise/reports" replace />;
  }

  return (
    <div className="space-y-6 pb-8">
      <DetailStatusBar report={report} />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.9fr)_minmax(260px,1fr)] gap-5">
        <ReportMetadataCard report={report} />
        <ReportTimelineCard steps={report.timeline} />
      </div>

      <ExecutiveSummaryCard summary={report.summary} />
      <KeyFindingsCard findings={report.findings} />
      <RecommendationsCard items={report.recommendations} />
      <DownloadOptionsCard />
    </div>
  );
};

export default ReportDetail;
