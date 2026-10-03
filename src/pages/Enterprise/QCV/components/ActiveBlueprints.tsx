import { BookOpen, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { ACTIVE_BLUEPRINTS } from "../data";

const statusClass = (status: string) => {
  switch (status) {
    case "Active":
      return "border-[rgba(16,183,186,0.4)] text-[#10B7BA] bg-[rgba(16,183,186,0.1)]";
    case "Assigned":
      return "border-[rgba(251,191,36,0.4)] text-[#FBBF24] bg-[rgba(251,191,36,0.1)]";
    default:
      return "border-white/20 text-white/60 bg-white/5";
  }
};

const ActiveBlueprints = () => (
  <AnimatedContainer delay={0.14}>
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-bold text-white">Active Products™</h3>
        <Link
          to="/enterprise/blueprint-management"
          className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-white"
        >
          Assign Reflection
          <ChevronRight className="size-3" />
        </Link>
      </div>

      <div className="space-y-2">
        {ACTIVE_BLUEPRINTS.map((bp) => (
          <div
            key={bp.name}
            className="flex items-center justify-between gap-2 rounded-lg bg-white/[0.03] px-3 py-2.5"
          >
            <div className="flex items-center gap-2 min-w-0">
              <BookOpen className="size-3.5 text-white/40 shrink-0" />
              <p className="text-xs text-white truncate">{bp.name}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span
                className={cn(
                  "rounded-full border px-1.5 py-0.5 text-[9px] font-medium",
                  statusClass(bp.status)
                )}
              >
                {bp.status}
              </span>
              <button
                type="button"
                onClick={() => toast.message(`${bp.action}: ${bp.name}`)}
                className="rounded-full border border-white/15 px-1.5 py-0.5 text-[9px] text-white/60 hover:text-white cursor-pointer bg-transparent"
              >
                {bp.action}
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => toast.message("Purchase flow coming soon.")}
        className="w-full flex items-center justify-between border-t border-white/10 pt-3 text-xs text-white/50 hover:text-white cursor-pointer border-x-0 border-b-0 bg-transparent"
      >
        Purchase New Blueprint
        <ChevronRight className="size-3" />
      </button>
    </Card>
  </AnimatedContainer>
);

export default ActiveBlueprints;
