import { Link } from "react-router-dom";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { QCV_SIDE_NOTIFS } from "../data";

const QcvNotifications = () => (
  <AnimatedContainer delay={0.16}>
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-white">Notifications</h3>
        <button
          type="button"
          onClick={() => toast.success("All notifications marked as read.")}
          className="text-xs text-white/50 hover:text-white cursor-pointer border-0 bg-transparent p-0"
        >
          Mark All Read
        </button>
      </div>

      <div className="divide-y divide-white/10">
        {QCV_SIDE_NOTIFS.map((n, i) => (
          <div
            key={`${n.title}-${i}`}
            className="flex items-start gap-2 py-3 first:pt-0"
          >
            <span
              className={cn(
                "mt-1.5 size-2 rounded-full shrink-0",
                n.unread ? "bg-[#F97316]" : "bg-white/20"
              )}
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white">{n.title}</p>
              <p className="text-[10px] text-white/45 mt-0.5">{n.sub}</p>
            </div>
            <Link
              to="/enterprise/notifications"
              className="text-[11px] text-[#10B7BA] hover:underline shrink-0"
            >
              Open
            </Link>
          </div>
        ))}
      </div>
    </Card>
  </AnimatedContainer>
);

export default QcvNotifications;
