import { Link } from "react-router-dom";
import { Download, Filter, Search } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "Total Reports", value: "8" },
  { label: "In Progress", value: "0" },
  { label: "Under Review", value: "1" },
  { label: "Delivered", value: "7" },
  { label: "Last Report", value: "Mar 15, 2026" },
] as const;

const REPORTS = [
  {
    id: "relationship-v2",
    name: "Professional Evolution Report",
    category: "Relationship Blueprint™",
    tag: "Strategy",
    date: "Mar 15, 2026",
    status: "Delivered",
  },
  {
    id: "core-dynamics",
    name: "Core Dynamics Mapping",
    category: "Clarity Series",
    tag: "Clarity",
    date: "Feb 28, 2026",
    status: "Archived",
  },
] as const;

const THEMES = [
  { report: "Professional Evolution Report", theme: "Decision Uncertainty" },
  {
    report: "Professional Evolution Report",
    theme: "Resource Scarcity Anxiety",
  },
] as const;

const Report = () => {
  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8 pb-4">
      <AnimatedContainer delay={0.05}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-light-bg/50 p-4"
            >
              <p className="text-xs text-muted-blue">{stat.label}</p>
              <p className="mt-2 font-playfair text-xl sm:text-2xl text-primary-text">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </AnimatedContainer>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-5 lg:gap-6">
        <AnimatedContainer delay={0.1}>
          <div className="rounded-2xl border border-white/10 bg-light-bg/50 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
              <h2 className="font-playfair text-xl sm:text-2xl text-primary-text flex-1">
                Report Library
              </h2>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="flex-1 sm:w-56">
                  <Input
                    variant="search"
                    placeholder="Search reports..."
                    leftIcon={<Search className="size-4 text-muted-blue" />}
                  />
                </div>
                <Button variant="secondary" size="sm" leftIcon={<Filter className="size-3.5" />}>
                  Filter
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto -mx-1 px-1">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-muted-blue">
                    <th className="py-3 pr-3 font-medium">Report Name</th>
                    <th className="py-3 pr-3 font-medium">Category</th>
                    <th className="py-3 pr-3 font-medium">Completion</th>
                    <th className="py-3 pr-3 font-medium">Status</th>
                    <th className="py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {REPORTS.map((report) => (
                    <tr
                      key={report.id}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="py-4 pr-3">
                        <p className="text-primary-text font-medium">{report.name}</p>
                        <p className="text-xs text-muted-blue mt-0.5">
                          {report.category}
                        </p>
                      </td>
                      <td className="py-4 pr-3">
                        <span className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-xs text-secondary-text">
                          {report.tag}
                        </span>
                      </td>
                      <td className="py-4 pr-3 text-secondary-text">{report.date}</td>
                      <td className="py-4 pr-3">
                        <span
                          className={cn(
                            "text-xs font-medium",
                            report.status === "Delivered"
                              ? "text-emerald-400"
                              : "text-muted-blue"
                          )}
                        >
                          {report.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Link to={`/consumer/report/${report.id}`}>
                            <Button variant="secondary" size="sm">
                              View
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Download"
                            className="h-9 w-9"
                          >
                            <Download className="size-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex justify-center">
              <Button variant="secondary" size="sm">
                Load More History
              </Button>
            </div>
          </div>
        </AnimatedContainer>

        <div className="space-y-5">
          <AnimatedContainer delay={0.12} direction="left">
            <div className="rounded-2xl border border-white/10 bg-light-bg/50 p-4 sm:p-5">
              <h3 className="font-playfair text-lg text-primary-text mb-4">
                Continuity Themes
              </h3>
              <ul className="space-y-3">
                {THEMES.map((t) => (
                  <li
                    key={t.theme}
                    className="rounded-lg border border-white/10 bg-black/30 p-3"
                  >
                    <p className="text-sm text-primary-text">{t.theme}</p>
                    <p className="text-xs text-muted-blue mt-1">{t.report}</p>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedContainer>

          <AnimatedContainer delay={0.15} direction="left">
            <div className="rounded-2xl border border-white/10 bg-light-bg/50 p-4 sm:p-5">
              <h3 className="font-playfair text-lg text-primary-text mb-2">
                Next Actions
              </h3>
              <p className="text-sm text-secondary-text mb-4">
                Professional Evolution Report
              </p>
              <Link to="/consumer/report/relationship-v2">
                <Button variant="outline" size="sm" fullWidth>
                  Go to section
                </Button>
              </Link>
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
};

export default Report;
