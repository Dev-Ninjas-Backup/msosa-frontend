// src/components/consumer/dashboard/CompletedReports.tsx
import { Link } from "react-router-dom";
import { Download, FileText, Info } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "./Card";

const CompletedReports = () => {
  return (
    <AnimatedContainer delay={0.15}>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-playfair text-xl text-primary-text">
          Completed Reports
        </h2>
        <Info className="size-4 text-secondary-text" />
      </div>

      <Card className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <FileText className="size-4 text-secondary-text" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-primary-text truncate">
                Relationship Reflection™ Report
              </p>
              <p className="text-xs text-secondary-text mt-0.5">
                Oct 24, 2023 · 12 Page Detailed Analysis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link to="/consumer/report/relationship">
              <button
                type="button"
                className="h-9 px-4 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-primary-text text-xs font-medium transition-colors cursor-pointer"
              >
                View Report
              </button>
            </Link>
            <button
              type="button"
              className="h-9 px-4 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-primary-text text-xs font-medium transition-colors cursor-pointer"
            >
              View History
            </button>
            <button
              type="button"
              className="h-9 px-4 rounded-lg bg-[#F5C542] hover:bg-[#e8b93a] text-black text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border-0"
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