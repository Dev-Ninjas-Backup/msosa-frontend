import { cn } from "@/lib/utils";
import { PROFILE_TABS, type ProfileTabId } from "../data";

type ProfileTabsProps = {
  active: ProfileTabId;
  onChange: (id: ProfileTabId) => void;
};

const ProfileTabs = ({ active, onChange }: ProfileTabsProps) => (
  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-white/10">
    {PROFILE_TABS.map((tab) => (
      <button
        key={tab.id}
        type="button"
        onClick={() => onChange(tab.id)}
        className={cn(
          "pb-2.5 text-sm cursor-pointer border-0 bg-transparent border-b-2 -mb-px transition-colors",
          active === tab.id
            ? "border-[#FBBF24] text-white font-semibold"
            : "border-transparent text-white/45 hover:text-white/70"
        )}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default ProfileTabs;
