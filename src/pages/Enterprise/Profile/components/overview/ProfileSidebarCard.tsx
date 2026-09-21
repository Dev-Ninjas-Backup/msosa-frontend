import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import { PROFILE_USER } from "../../data";

type ProfileSidebarCardProps = {
  onEdit: () => void;
  onChangePassword: () => void;
};

const ProfileSidebarCard = ({
  onEdit,
  onChangePassword,
}: ProfileSidebarCardProps) => (
  <AnimatedContainer delay={0.04}>
    <Card
      className="p-6 space-y-5"
      backgroundColor="rgba(255,255,255,0.05)"
      shadow="none"
    >
      <div className="flex flex-col items-center text-center gap-3">
        <span className="flex size-24 items-center justify-center rounded-full bg-[#0a2a2a] border border-[#10B7BA]/30 text-4xl font-bold text-[#10B7BA]">
          {PROFILE_USER.avatarLetter}
        </span>
        <div>
          <p className="text-lg font-bold text-white">
            {PROFILE_USER.displayName}
          </p>
          <p className="text-sm text-white/55 mt-0.5">{PROFILE_USER.jobTitle}</p>
          <p className="text-xs text-white/40 mt-0.5">{PROFILE_USER.org}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(16,183,186,0.12)] border border-[rgba(16,183,186,0.3)] px-2.5 py-0.5 text-[10px] font-semibold text-[#10B7BA]">
          <span className="size-1.5 rounded-full bg-[#10B7BA]" />
          Active
        </span>
      </div>

      <div className="space-y-2.5 border-t border-white/10 pt-4">
        <div className="flex justify-between text-xs">
          <span className="text-white/45">Member Since</span>
          <span className="text-white font-medium">{PROFILE_USER.memberSince}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/45">Last Login</span>
          <span className="text-white font-medium">{PROFILE_USER.lastLogin}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/45">Role</span>
          <span className="text-[#FBBF24] font-semibold">{PROFILE_USER.role}</span>
        </div>
      </div>

      <div className="space-y-2 pt-1">
        <Button
          variant="primary"
          size="sm"
          className="w-full rounded-lg! bg-[#FBBF24]! text-black! font-semibold!"
          onClick={onEdit}
        >
          Edit Profile
        </Button>
        <Button
          variant="soft"
          size="sm"
          className="w-full rounded-lg!"
          onClick={() => {
            onChangePassword();
            toast.message("Switch to Security tab to change password.");
          }}
        >
          Change Password
        </Button>
      </div>
    </Card>
  </AnimatedContainer>
);

export default ProfileSidebarCard;
