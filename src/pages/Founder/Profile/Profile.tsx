import { useState } from "react";
import { cn } from "@/lib/utils";
import AnimatedContainer from "@/common/AnimatedContainer";
import MyProfileTab from "./MyProfileTab";
import SecurityTab from "./SecurityTab";
import NotificationPreferencesTab from "./NotificationPreferencesTab";
import LoginSessionsTab from "./LoginSessionsTab";
import ActivityLogTab from "./ActivityLogTab";

const TABS = ["My Profile", "Security", "Notification Preferences", "Login Sessions", "Activity Log"] as const;
type Tab = (typeof TABS)[number];

const Profile = () => {
  const [tab, setTab] = useState<Tab>("My Profile");

  return (
    <AnimatedContainer className="space-y-6 pb-8">
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-white/10">
        {TABS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={cn(
              "-mb-px cursor-pointer border-0 border-b-2 bg-transparent pb-3 text-sm",
              tab === item ? "border-[#fbbf24] font-semibold text-white" : "border-transparent text-white/45 hover:text-white/70",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "My Profile" && <MyProfileTab onChangePassword={() => setTab("Security")} />}
      {tab === "Security" && <SecurityTab />}
      {tab === "Notification Preferences" && <NotificationPreferencesTab />}
      {tab === "Login Sessions" && <LoginSessionsTab />}
      {tab === "Activity Log" && <ActivityLogTab />}

      <p className="pt-4 text-center text-xs text-white/30">
        FAR Systems™ uses enterprise-grade encryption. Your personal reflection data is private and secure.
      </p>
    </AnimatedContainer>
  );
};

export default Profile;
