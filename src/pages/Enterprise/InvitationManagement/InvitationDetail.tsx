import { useState, useSyncExternalStore } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ConfirmModal from "@/components/reuseable/ConfirmModal";
import { AVATAR_COLORS } from "../EmployeeManagement/data";
import AssessmentProgressCard from "./components/AssessmentProgressCard";
import DetailBreadcrumb from "./components/DetailBreadcrumb";
import EncryptionFooter from "./components/EncryptionFooter";
import InvitationDetailsCard from "./components/InvitationDetailsCard";
import InvitationHistory from "./components/InvitationHistory";
import NotificationsPanel from "./components/NotificationsPanel";
import ProfileHeader from "./components/ProfileHeader";
import SecureLinkCard from "./components/SecureLinkCard";
import StatusTracker from "./components/StatusTracker";
import {
  cancelInvitation,
  getInviteHistory,
  getInvitation,
  getInvitationsSnapshot,
  getStatusSteps,
  subscribeInvitations,
} from "./data";

const InvitationDetail = () => {
  const { invitationId } = useParams<{ invitationId: string }>();
  useSyncExternalStore(
    subscribeInvitations,
    getInvitationsSnapshot,
    getInvitationsSnapshot
  );
  const inv = invitationId ? getInvitation(invitationId) : undefined;
  const [cancelOpen, setCancelOpen] = useState(false);

  if (!inv) {
    return <Navigate to="/enterprise/invitation-management" replace />;
  }

  const history = getInviteHistory(inv);
  const steps = getStatusSteps(inv);
  const avatarColor =
    AVATAR_COLORS[
      Math.max(
        0,
        getInvitationsSnapshot().findIndex((i) => i.inviteId === inv.inviteId)
      ) % AVATAR_COLORS.length
    ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        inv.secureLink.includes("•")
          ? `https://app.farsystems.io/invite/${inv.inviteId.toLowerCase()}`
          : inv.secureLink
      );
      toast.success("Secure link copied.");
    } catch {
      toast.message(inv.secureLink);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <DetailBreadcrumb name={inv.name} />

      <ProfileHeader
        inv={inv}
        avatarColor={avatarColor}
        onCancel={() => setCancelOpen(true)}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.75fr)] gap-6">
        <div className="space-y-6">
          <InvitationDetailsCard inv={inv} />
          <SecureLinkCard inv={inv} onCopy={copyLink} />
          <AssessmentProgressCard inv={inv} />
          <InvitationHistory history={history} />
        </div>

        <div className="space-y-6">
          <StatusTracker steps={steps} />
          <NotificationsPanel />
        </div>
      </div>

      <EncryptionFooter />

      <ConfirmModal
        isOpen={cancelOpen}
        onClose={() => setCancelOpen(false)}
        onConfirm={() => {
          cancelInvitation(inv.inviteId);
          toast.success("Invitation cancelled.");
          setCancelOpen(false);
        }}
        variant="danger"
        title="Cancel invitation?"
        description={`Cancel the invitation for ${inv.name}? The secure link will expire.`}
        confirmText="Cancel Invitation"
        cancelText="Keep"
      />
    </div>
  );
};

export default InvitationDetail;
