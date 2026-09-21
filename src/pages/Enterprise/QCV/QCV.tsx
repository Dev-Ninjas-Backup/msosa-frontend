import { useState } from "react";
import ActiveBlueprints from "./components/ActiveBlueprints";
import ComparisonCharts from "./components/ComparisonCharts";
import ComparisonControls from "./components/ComparisonControls";
import ComparisonSummary from "./components/ComparisonSummary";
import EncryptionFooter from "./components/EncryptionFooter";
import OrganizationalGrowth from "./components/OrganizationalGrowth";
import ProgressTimeline from "./components/ProgressTimeline";
import QcvKpiCards from "./components/QcvKpiCards";
import QcvMetaBar from "./components/QcvMetaBar";
import QcvNotifications from "./components/QcvNotifications";
import QcvOverview from "./components/QcvOverview";
import RecommendationProgress from "./components/RecommendationProgress";
import TrendComparison from "./components/TrendComparison";

const QCV = () => {
  const [current, setCurrent] = useState("Q3 2026");
  const [compare, setCompare] = useState("Q2 2026");

  return (
    <div className="space-y-5 sm:space-y-6 pb-8">
      <QcvMetaBar />
      <QcvKpiCards />
      <ComparisonControls
        current={current}
        compare={compare}
        onCurrent={setCurrent}
        onCompare={setCompare}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_336px] gap-5 items-start">
        <div className="space-y-5 min-w-0">
          <ComparisonSummary />
          <TrendComparison />
          <ProgressTimeline />
          <ComparisonCharts />
          <QcvOverview />
        </div>
        <div className="space-y-5">
          <RecommendationProgress />
          <OrganizationalGrowth />
          <ActiveBlueprints />
          <QcvNotifications />
        </div>
      </div>

      <EncryptionFooter />
    </div>
  );
};

export default QCV;
