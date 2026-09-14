// src/components/consumer/dashboard/QuickActions.tsx
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Info, Plus } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";


const QuickActions = () => {
  return (
    <AnimatedContainer delay={0.12} direction="left">
      <Card className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-xs font-semibold tracking-[0.12em] text-secondary-text uppercase">
            Quick Actions
          </h3>
          <Info className="size-3.5 text-secondary-text" />
        </div>

        <div className="space-y-2.5">
          <Link
            to="/consumer/blueprint"
            className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 hover:bg-white/[0.06] transition-colors no-underline!"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-lg bg-white/5 flex items-center justify-center text-secondary-text">
                <Plus className="size-4" />
              </span>
              <span className="text-sm text-primary-text font-medium">
                Start New Reflection
              </span>
            </div>
            <ArrowRight className="size-4 text-secondary-text" />
          </Link>

          <Link
            to="/consumer/report"
            className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 hover:bg-white/[0.06] transition-colors no-underline!"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-lg bg-white/5 flex items-center justify-center text-secondary-text">
                <FileText className="size-4" />
              </span>
              <span className="text-sm text-primary-text font-medium">
                View All Reports
              </span>
            </div>
            <ArrowRight className="size-4 text-secondary-text" />
          </Link>
        </div>
      </Card>
    </AnimatedContainer>
  );
};

export default QuickActions;