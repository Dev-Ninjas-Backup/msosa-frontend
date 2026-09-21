import WelcomeBanner from "./components/WelcomeBanner";
import KpiCards from "./components/KpiCards";
import EmployeeOverview from "./components/EmployeeOverview";
import ActiveReflections from "./components/ActiveReflections";
import ReportsPanel from "./components/ReportsPanel";
import QcvAnalysis from "./components/QcvAnalysis";
import BillingSubscription from "./components/BillingSubscription";
import TrustFooter from "./components/TrustFooter";
import QuickActions from "./components/QuickActions";
import RecentActivity from "./components/RecentActivity";

const EnterpriseDashboard = () => {
  return (
    <div className="space-y-8 pb-8">
      <WelcomeBanner />
      <KpiCards />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_336px] gap-8 items-start">
        <div className="space-y-8 min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <EmployeeOverview />
            <ActiveReflections />
          </div>
          <ReportsPanel />
          <QcvAnalysis />
          <BillingSubscription />
          <TrustFooter />
        </div>

        <div className="space-y-8 xl:sticky xl:top-4">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default EnterpriseDashboard;
