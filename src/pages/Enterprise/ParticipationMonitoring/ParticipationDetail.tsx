import { Navigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ActivityLog from "./components/ActivityLog";
import AssessmentStageCard from "./components/AssessmentStageCard";
import DetailBreadcrumb from "./components/DetailBreadcrumb";
import DetailHeader from "./components/DetailHeader";
import EncryptionFooter from "./components/EncryptionFooter";
import IdentityCard from "./components/IdentityCard";
import ProgressTimeline from "./components/ProgressTimeline";
import RelatedReflections from "./components/RelatedReflections";
import ReminderHistory from "./components/ReminderHistory";
import {
  getActivityLog,
  getParticipation,
  getRelatedReflections,
  getReminders,
  getSectionProgress,
  getStageSteps,
  getTimelineSteps,
} from "./data";

const ParticipationDetail = () => {
  const { participationId } = useParams<{ participationId: string }>();
  const row = participationId ? getParticipation(participationId) : undefined;

  if (!row) {
    return <Navigate to="/enterprise/participation-monitoring" replace />;
  }

  const sendReminder = () => {
    toast.success(`Reminder sent to ${row.name}.`);
  };

  return (
    <div className="space-y-6 pb-8">
      <DetailBreadcrumb empId={row.empId} />

      <DetailHeader row={row} onReminder={sendReminder} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <IdentityCard row={row} />
        <AssessmentStageCard
          campaign={row.campaign}
          steps={getStageSteps()}
          sections={getSectionProgress()}
        />
      </div>

      <ProgressTimeline steps={getTimelineSteps()} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <ReminderHistory reminders={getReminders()} onSend={sendReminder} />
        <RelatedReflections items={getRelatedReflections()} />
      </div>

      <ActivityLog events={getActivityLog()} />

      <EncryptionFooter />
    </div>
  );
};

export default ParticipationDetail;
