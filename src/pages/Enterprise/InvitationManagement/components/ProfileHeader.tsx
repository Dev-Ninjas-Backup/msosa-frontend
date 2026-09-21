import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { resendInvitation, type InvitationRow } from "../data";

type ProfileHeaderProps = {
  inv: InvitationRow;
  avatarColor: string;
  onCancel: () => void;
};

const ProfileHeader = ({ inv, avatarColor, onCancel }: ProfileHeaderProps) => (
  <AnimatedContainer delay={0.04}>
    <Card className="p-5 sm:p-6">
      <div className="flex flex-col xl:flex-row xl:items-center gap-5">
        <div className="flex items-start gap-4 min-w-0 flex-1">
          <span
            className="flex size-16 sm:size-[72px] items-center justify-center rounded-full text-xl font-black text-black shrink-0"
            style={{ backgroundColor: avatarColor }}
          >
            {inv.initials}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[22px] font-bold text-white">{inv.name}</h2>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-bold",
                  inv.inviteStatus === "Accepted"
                    ? "bg-[rgba(16,183,186,0.1)] text-[#10B7BA]"
                    : inv.inviteStatus === "Cancelled" ||
                        inv.inviteStatus === "Suspended"
                      ? "bg-red-500/10 text-[#EF4444]"
                      : "bg-[rgba(251,191,36,0.15)] text-[#FBBF24]"
                )}
              >
                {inv.inviteStatus}
              </span>
              <span className="rounded-full bg-[rgba(251,191,36,0.12)] border border-[rgba(251,191,36,0.25)] px-2 py-0.5 text-[10px] font-bold text-[#FBBF24]">
                #{inv.inviteId}
              </span>
            </div>
            <p className="mt-1.5 text-[13px] text-white/60 flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span>{inv.role}</span>
              <span className="text-white/30">|</span>
              <span>{inv.department}</span>
              <span className="text-white/30">|</span>
              <span>#{inv.employeeId}</span>
              <span className="text-white/30">|</span>
              <span>{inv.blueprint}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              resendInvitation(inv.inviteId);
              toast.success("Invitation resent.");
            }}
            className="h-9 px-4 rounded-lg border border-white/15 text-sm font-medium text-white/70 hover:text-white hover:border-white/30 cursor-pointer inline-flex items-center gap-1.5"
          >
            <RefreshCw className="size-3.5" />
            Resend
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="h-9 px-4 rounded-lg border border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.08)] text-sm font-medium text-[#EF4444] hover:bg-[rgba(239,68,68,0.15)] cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </Card>
  </AnimatedContainer>
);

export default ProfileHeader;
