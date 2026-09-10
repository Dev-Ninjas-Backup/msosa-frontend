// src/pages/consumer/ConsumerDashboard.tsx
import JourneyTracker from "./JourneyTracker";
import ActiveReflections from "./ActiveReflections";
import CompletedReports from "./CompletedReports";
import QuickActions from "./QuickActions";
import RecommendedForYou from "./RecommendedForYou";
import RecentActivity from "./RecentActivity";

const ConsumerDashboard = () => {
  return (
    <div className="space-y-5 sm:space-y-6 pb-6">
      <JourneyTracker />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] 2xl:grid-cols-[minmax(0,1fr)_320px] gap-5 lg:gap-6">
        {/* Left Column */}
        <div className="space-y-5 lg:space-y-6 min-w-0">
          <ActiveReflections />
          <CompletedReports />
        </div>

        {/* Right Rail */}
        <div className="space-y-5">
          <QuickActions />
          <RecommendedForYou />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;