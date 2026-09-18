import { Link } from "react-router-dom";
import { Calendar, Download, Info, Share2 } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { useMemberPortal } from "@/pages/shared/member/MemberPortalContext";

const CompletedReports = () => {
  const { path } = useMemberPortal();

  return (
    <AnimatedContainer delay={0.15}>
      <Card className="p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-5">
          <h2 className="font-playfair text-xl text-primary-text">
            Completed Reports
          </h2>
          <Info className="size-3.5 text-secondary-text/80" />
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#FFFFFF1A] px-4 py-3.5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="size-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <Share2 className="size-4 text-secondary-text" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-primary-text truncate">
                Relationship Reflection™ Report
              </p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1 text-xs text-secondary-text">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="size-3 opacity-70" />
                  Oct 24, 2023
                </span>
                <span className="text-white/30">•</span>
                <span>12 Page Detailed Analysis</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link to={path("report/relationship")}>
              <button
                type="button"
                className="h-9 px-3.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-primary-text text-xs font-medium transition-colors cursor-pointer"
              >
                View Report
              </button>
            </Link>
            <Link to={path("report")}>
              <button
                type="button"
                className="h-9 px-3.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-primary-text text-xs font-medium transition-colors cursor-pointer"
              >
                View History
              </button>
            </Link>
            <button
              type="button"
              className="h-9 px-3.5 rounded-lg bg-[#F5C542] hover:bg-[#e8b93a] text-black text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border-0"
            >
              <Download className="size-3.5" />
              PDF
            </button>
          </div>
        </div>
      </Card>
    </AnimatedContainer>
  );
};

export default CompletedReports;
