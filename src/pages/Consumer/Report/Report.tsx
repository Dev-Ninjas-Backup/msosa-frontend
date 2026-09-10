import { Link } from "react-router-dom";
import { Download, Filter, Search } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Input from "@/ui/Input";
import Card from "@/pages/Consumer/Dashboard/Card";
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

const ghostBtn =
  "h-9 px-4 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-primary-text text-xs font-medium transition-colors cursor-pointer";
const goldBtn =
  "h-9 px-4 rounded-lg bg-[#F5C542] hover:bg-[#e8b93a] text-black text-xs font-semibold transition-colors cursor-pointer border-0";

const Report = () => {
  return (
    <div className="space-y-5 sm:space-y-6 pb-6">
      <AnimatedContainer delay={0.05}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {STATS.map((stat) => (
            <Card key={stat.label} className="p-4">
              <p className="text-xs text-secondary-text">{stat.label}</p>
              <p className="mt-2 font-playfair text-xl sm:text-2xl text-primary-text">
                {stat.value}
              </p>
            </Card>
          ))}
        </div>
      </AnimatedContainer>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] 2xl:grid-cols-[minmax(0,1fr)_320px] gap-5 lg:gap-6">
        <AnimatedContainer delay={0.1}>
          <Card className="p-4 sm:p-5 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
              <h2 className="font-playfair text-xl text-primary-text flex-1">
                Report Library
              </h2>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="flex-1 sm:w-56">
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
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08] text-xs uppercase tracking-wide text-secondary-text">
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
                      className="border-b border-white/[0.05] last:border-0"
                    >
                      <td className="py-4 pr-3">
                        <p className="text-primary-text font-medium">
                          {report.name}
                        </p>
                        <p className="text-xs text-secondary-text mt-0.5">
                          {report.category}
                        </p>
                      </td>
                      <td className="py-4 pr-3">
                        <span className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-xs text-secondary-text">
                          {report.tag}
                        </span>
                      </td>
                      <td className="py-4 pr-3 text-secondary-text">
                        {report.date}
                      </td>
                      <td className="py-4 pr-3">
                        <span
                          className={cn(
                            "text-xs font-medium",
                            report.status === "Delivered"
                              ? "text-emerald-400"
                              : "text-secondary-text"
                          )}
                        >
                          {report.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Link to={`/consumer/report/${report.id}`}>
                            <button type="button" className={ghostBtn}>
                              View
                            </button>
                          </Link>
                          <button
                            type="button"
                            aria-label="Download PDF"
                            className={goldBtn}
                          >
                            <span className="inline-flex items-center gap-1.5">
                              <Download className="size-3.5" />
                              PDF
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex justify-center">
              <button type="button" className={ghostBtn}>
                Load More History
              </button>
            </div>
          </Card>
        </AnimatedContainer>

        <div className="space-y-5">
          <AnimatedContainer delay={0.12} direction="left">
            <Card className="p-4 sm:p-5">
              <h3 className="font-playfair text-lg text-primary-text mb-4">
                Continuity Themes
              </h3>
              <ul className="space-y-3">
                {THEMES.map((t) => (
                  <li
                    key={t.theme}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3"
                  >
                    <p className="text-sm text-primary-text">{t.theme}</p>
                    <p className="text-xs text-secondary-text mt-1">{t.report}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={0.15} direction="left">
            <Card className="p-4 sm:p-5">
              <h3 className="font-playfair text-lg text-primary-text mb-2">
                Next Actions
              </h3>
              <p className="text-sm text-secondary-text mb-4">
                Professional Evolution Report
              </p>
              <Link to="/consumer/report/relationship-v2" className="block">
                <button type="button" className={`${ghostBtn} w-full`}>
                  Go to section
                </button>
              </Link>
            </Card>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
};

export default Report;
