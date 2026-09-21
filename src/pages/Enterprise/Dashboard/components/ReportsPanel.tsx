import { Link } from "react-router-dom";
import { Download, FileText } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { REPORTS, reportStatusClass } from "../data";
import SectionLink from "./SectionLink";

const ReportsPanel = () => (
  <AnimatedContainer delay={0.14}>
    <Card className="p-6 sm:p-8" backgroundColor="#0D1117">
      <div className="flex items-center justify-between gap-3 mb-5">
        <h3 className="text-xl font-semibold text-white">Reports</h3>
        <SectionLink to="/enterprise/reports">View All Reports</SectionLink>
      </div>
      <ul className="space-y-3">
        {REPORTS.map((report) => (
          <li
            key={report.title}
            className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 flex flex-col sm:flex-row sm:items-center gap-3"
          >
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#FBBF24]">
                <FileText className="size-4" />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-white">{report.title}</p>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-medium",
                      reportStatusClass(report.status)
                    )}
                  >
                    {report.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/55">{report.meta}</p>
              </div>
            </div>
            {report.status !== "Pending" ? (
              <div className="flex items-center gap-2 shrink-0 sm:pl-2">
                <Button variant="soft" size="sm" asChild className="rounded-lg!">
                  <Link to="/enterprise/reports">View Report</Link>
                </Button>
                <Button variant="soft" size="sm" className="rounded-lg!">
                  <Download className="size-3.5" />
                  PDF
                </Button>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </Card>
  </AnimatedContainer>
);

export default ReportsPanel;
