import { Link } from "react-router-dom";
import {
  Download,
  Filter,
  Info,
  Link2,
  Search,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Input from "@/ui/Input";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "TOTAL REPORTS", value: "8" },
  { label: "IN PROGRESS", value: "0" },
  { label: "UNDER REVIEW", value: "1" },
  { label: "DELIVERED", value: "7" },
  { label: "LAST REPORT", value: "March 15, 2026" },
] as const;

const REPORTS = [
  {
    id: "relationship-v2",
    name: "Professional Evolution Report",
    category: "RELATIONSHIP REFLECTION™",
    tag: "Strategy",
    date: "Mar 15, 2026",
    status: "DELIVERED",
  },
  {
    id: "core-dynamics",
    name: "Core Dynamics Mapping",
    category: "CLARITY SERIES",
    tag: "Clarity",
    date: "Feb 28, 2026",
    status: "UNDER REVIEW",
  },
] as const;

const ghostBtn =
  "h-9 px-4 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-primary-text text-xs font-medium transition-colors cursor-pointer";

const Report = () => {
  return (
    <div className="space-y-5 sm:space-y-6 pb-6">
      {/* Page Title */}
      <AnimatedContainer delay={0.02}>
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl text-primary-text">
            Reports
          </h1>
          <p className="mt-1.5 text-sm text-secondary-text max-w-2xl">
            Access your reflection reports, historical insights, recommendations,
            and continuity-based progress tracking.
          </p>
        </div>
      </AnimatedContainer>

      {/* Stats */}
      <AnimatedContainer delay={0.05}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {STATS.map((stat) => (
            <Card key={stat.label} className="p-4 sm:p-5">
              <p className="text-[11px] font-medium tracking-wider text-secondary-text uppercase">
                {stat.label}
              </p>
              <p className="mt-2.5 font-playfair text-2xl sm:text-[28px] text-primary-text leading-none">
                {stat.value}
              </p>
            </Card>
          ))}
        </div>
      </AnimatedContainer>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] 2xl:grid-cols-[minmax(0,1fr)_320px] gap-5 lg:gap-6">
        {/* Report Library */}
        <AnimatedContainer delay={0.1}>
          <Card className="p-4 sm:p-5 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <div className="flex items-center gap-2 flex-1">
                <h2 className="font-playfair text-xl text-primary-text">
                  Report Library
                </h2>
                <Info className="size-3.5 text-secondary-text/70" />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="flex-1 sm:w-52">
                  <Input
                    variant="search"
                    placeholder="Search reports..."
                    leftIcon={<Search className="size-4 text-secondary-text" />}
                  />
                </div>
                <button type="button" className={ghostBtn}>
                  <span className="inline-flex items-center gap-1.5">
                    <Filter className="size-3.5" />
                    Filter
                  </span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto -mx-1 px-1">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08] text-[11px] uppercase tracking-wider text-secondary-text">
                    <th className="py-3 pr-4 font-medium">Report Name</th>
                    <th className="py-3 pr-4 font-medium">Category</th>
                    <th className="py-3 pr-4 font-medium">Completion</th>
                    <th className="py-3 pr-4 font-medium">Status</th>
                    <th className="py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {REPORTS.map((report) => (
                    <tr
                      key={report.id}
                      className="border-b border-white/[0.05] last:border-0"
                    >
                      <td className="py-4 pr-4">
                        <p className="text-primary-text font-medium">
                          {report.name}
                        </p>
                        <p className="text-[11px] text-secondary-text mt-0.5 tracking-wide">
                          {report.category}
                        </p>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="inline-flex rounded-md bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs text-secondary-text">
                          {report.tag}
                        </span>
                      </td>
                      <td className="py-4 pr-4 text-secondary-text">
                        {report.date}
                      </td>
                      <td className="py-4 pr-4">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide",
                            report.status === "DELIVERED"
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                              : "bg-white/5 text-secondary-text border border-white/10"
                          )}
                        >
                          {report.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/consumer/report/${report.id}`}>
                            <button
                              type="button"
                              aria-label="Open report"
                              className="flex size-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-secondary-text hover:bg-white/10 hover:text-primary-text transition-colors"
                            >
                              <Link2 className="size-3.5" />
                            </button>
                          </Link>
                          <button
                            type="button"
                            aria-label="Download PDF"
                            className="flex size-8 items-center justify-center rounded-lg bg-[#F5C542] text-black hover:bg-[#e8b93a] transition-colors"
                          >
                            <Download className="size-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-center">
              <button type="button" className={ghostBtn}>
                LOAD MORE HISTORY
              </button>
            </div>
          </Card>
        </AnimatedContainer>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Continuity Themes */}
          <AnimatedContainer delay={0.12} direction="left">
            <Card className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-playfair text-base text-primary-text">
                  Continuity Themes
                </h3>
                <Info className="size-3.5 text-secondary-text/70" />
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300">
                      <Sparkles className="size-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-primary-text uppercase">
                        Decision Uncertainty
                      </p>
                      <p className="mt-1 text-[11px] text-secondary-text leading-relaxed">
                        Future Path Reflection
                      </p>
                      <p className="mt-1.5 text-[11px] text-secondary-text/80 leading-relaxed">
                        Recurring theme detected across 3 recent reports during
                        reflection sessions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-rose-400/10 text-rose-300">
                      <ShieldAlert className="size-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-primary-text uppercase">
                        Resource Scarcity Anxiety
                      </p>
                      <p className="mt-1 text-[11px] text-secondary-text leading-relaxed">
                        Future Path Reflection
                      </p>
                      <p className="mt-1.5 text-[11px] text-secondary-text/80 leading-relaxed">
                        Identified as a secondary stressor in the last 14-day
                        cycle.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedContainer>

          {/* Next Actions */}
          <AnimatedContainer delay={0.15} direction="left">
            <div className="rounded-2xl border border-amber-400/25 bg-gradient-to-b from-amber-400/10 to-transparent p-4 sm:p-5 shadow-[0_0_30px_rgba(245,197,66,0.08)]">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="size-4 text-amber-300" />
                <h3 className="font-playfair text-base text-primary-text">
                  Next Actions
                </h3>
              </div>

              <p className="text-xs font-medium text-amber-200/90">
                Future Path Reflection
              </p>
              <p className="mt-2 text-sm text-secondary-text leading-relaxed">
                “Review the ‘Impact Calibration’ section in your latest report
                to address rising decision fatigue scores.”
              </p>

              <Link
                to="/consumer/report/relationship-v2"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-amber-300 hover:text-amber-200 transition-colors"
              >
                GO TO SECTION →
              </Link>
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
};

export default Report;