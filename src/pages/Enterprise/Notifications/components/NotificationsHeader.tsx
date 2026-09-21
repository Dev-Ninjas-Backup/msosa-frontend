import { CheckCheck, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";

type NotificationsHeaderProps = {
  onMarkAllRead: () => void;
};

const NotificationsHeader = ({ onMarkAllRead }: NotificationsHeaderProps) => (
  <AnimatedContainer delay={0.02}>
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
      <p className="text-sm text-[#6B7280]">
        Notification Center ·{" "}
        <span className="font-medium text-[#FBBF24]">
          Organization Administrator
        </span>
      </p>
      <div className="flex flex-wrap items-center gap-2.5">
        <p className="text-xs text-[#6B7280] pr-1">
          Last Updated: Jun 2, 2026 10:20 AM
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-lg! h-8! text-xs! text-[#FBBF24]! hover:text-[#FBBF24]!"
          onClick={onMarkAllRead}
        >
          <CheckCheck className="size-2.5" />
          Mark All as Read
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-lg! h-8! text-xs! text-[#6B7280]!"
          onClick={() => toast.success("Notifications refreshed.")}
        >
          <RefreshCw className="size-2.5" />
          Refresh
        </Button>
      </div>
    </div>
  </AnimatedContainer>
);

export default NotificationsHeader;
