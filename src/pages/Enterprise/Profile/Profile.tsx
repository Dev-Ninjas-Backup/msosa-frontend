import { useState } from "react";
import CropPhotoModal from "./components/CropPhotoModal";
import EncryptionFooter from "./components/EncryptionFooter";
import ProfileTabs from "./components/ProfileTabs";
import AccountSettingsTab from "./components/account/AccountSettingsTab";
import ActivityLogTab from "./components/activity/ActivityLogTab";
import LoginSessionsTab from "./components/activity/LoginSessionsTab";
import NotificationPreferencesTab from "./components/notifications/NotificationPreferencesTab";
import MyProfileTab from "./components/overview/MyProfileTab";
import SecurityTab from "./components/security/SecurityTab";
import type { ProfileTabId } from "./data";

const Profile = () => {
  const [tab, setTab] = useState<ProfileTabId>("profile");
  const [cropOpen, setCropOpen] = useState(false);

  return (
    <div className="space-y-5 pb-8">
      <ProfileTabs active={tab} onChange={setTab} />

      {tab === "profile" ? (
        <MyProfileTab
          onEdit={() => {
            document
              .querySelector("main")
              ?.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onChangePassword={() => setTab("security")}
          onUpload={() => setCropOpen(true)}
        />
      ) : null}
      {tab === "account" ? <AccountSettingsTab /> : null}
      {tab === "security" ? <SecurityTab /> : null}
      {tab === "notifications" ? <NotificationPreferencesTab /> : null}
      {tab === "sessions" ? <LoginSessionsTab /> : null}
      {tab === "activity" ? <ActivityLogTab /> : null}

      <EncryptionFooter />
      <CropPhotoModal open={cropOpen} onClose={() => setCropOpen(false)} />
    </div>
  );
};

export default Profile;
