import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/hooks/useRedux";
import { continuePath } from "@/store/features/MemberJourney/memberJourneySlice";
import { useMemberPortal } from "@/pages/shared/member/MemberPortalContext";

const HISTORY = [
  {
    id: "8",
    title: "Reflection #8: Leadership Development™",
    date: "July 20, 2026",
    status: "Completed",
  },
  {
    id: "7",
    title: "Reflection #7: Strategic Thinking™",
    date: "June 15, 2026",
    status: "Completed",
  },
  {
    id: "6",
    title: "Reflection #6: Relationship™",
    date: "May 2, 2026",
    status: "Completed",
  },
];

const STATUS = [
  { label: "Blueprint Assigned", detail: "Done · Jan 12", done: true },
  { label: "Reflection Completed", detail: "Done · July 20", done: true },
  { label: "Knowledge Processed", detail: "Done · July 21", done: true },
  { label: "Report Delivered", detail: "Done · July 22", done: true },
  { label: "Continuity Updated", detail: "In Progress", done: false },
  { label: "Next Reflection", detail: "Upcoming · Aug 20", done: false },
];

const EmployeeContinuum = () => {
  const { path, basePath } = useMemberPortal();
  const stage = useAppSelector((s) => s.memberJourney.stages.leadership);
  const [filter, setFilter] = useState("All");
  const [loaded, setLoaded] = useState(false);
  const rows = loaded ? HISTORY : HISTORY.slice(0, 2);
  const visible =
    filter === "All" ? rows : rows.filter((row) => row.status === filter);

  return (
    <div className="space-y-5 px-4 py-6 sm:px-6 lg:px-8">
      <AnimatedContainer delay={0.04}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <p className="text-sm text-secondary-text">
            Sarah Johnson · Project Manager · ABC Healthcare
          </p>
          <p className="text-xs text-secondary-text">Last updated: July 26, 2026</p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            ["Reflection Cycles", "8"],
            ["Reports Generated", "8"],
            ["Active Blueprint™", "Leadership"],
            ["Journey Started", "Jan 2026"],
          ].map(([label, value]) => (
            <Card key={label} className="px-4 py-5">
              <p className="text-xl font-semibold text-primary-text">{value}</p>
              <p className="mt-1 text-xs text-secondary-text">{label}</p>
            </Card>
          ))}
        </div>
      </AnimatedContainer>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <AnimatedContainer delay={0.08}>
          <Card className="p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-playfair text-xl text-primary-text">Reflection History</h2>
              <label className="text-xs text-secondary-text">
                Filter{" "}
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="ml-2 rounded-lg border border-white/10 bg-[#1C1C1F] px-2 py-1 text-primary-text"
                >
                  <option>All</option>
                  <option>Completed</option>
                </select>
              </label>
            </div>
            <ul className="space-y-3">
              {visible.map((row) => (
                <li
                  key={row.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-primary-text">{row.title}</p>
                    <p className="text-xs text-secondary-text">{row.date}</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                    {row.status}
                  </span>
                </li>
              ))}
            </ul>
            {!loaded && (
              <button
                type="button"
                onClick={() => setLoaded(true)}
                className="mt-4 border-0 bg-transparent p-0 text-sm font-medium text-[#F5C542] cursor-pointer"
              >
                Load Full Journey
              </button>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                to={continuePath(basePath, "leadership", stage)}
                className="inline-flex h-10 items-center rounded-xl bg-[#FBBF24] px-4 text-sm font-semibold text-black"
              >
                Continue Reflection
              </Link>
              <Link to={path("report")} className="inline-flex h-10 items-center rounded-xl border border-white/15 px-4 text-sm text-primary-text">
                View Reports
              </Link>
              <Link to={path("dashboard")} className="inline-flex h-10 items-center rounded-xl border border-white/15 px-4 text-sm text-primary-text">
                Open Dashboard
              </Link>
              <Link to={path("customer-products")} className="inline-flex h-10 items-center rounded-xl border border-white/15 px-4 text-sm text-primary-text">
                View Blueprint
              </Link>
              <Link to={path("report/relationship-v2")} className="inline-flex h-10 items-center rounded-xl border border-white/15 px-4 text-sm text-primary-text">
                Download Latest
              </Link>
            </div>
          </Card>
        </AnimatedContainer>

        <div className="space-y-5">
          <AnimatedContainer delay={0.1}>
            <Card className="p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary-text">
                Journey Status
              </h3>
              <ol className="mt-4 space-y-3">
                {STATUS.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-1 size-2.5 shrink-0 rounded-full",
                        item.done ? "bg-emerald-400" : "bg-[#F5C542]"
                      )}
                    />
                    <div>
                      <p className="text-sm text-primary-text">{item.label}</p>
                      <p className="text-xs text-secondary-text">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={0.14}>
            <Card className="p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary-text">
                AI Recommendations
              </h3>
              <div className="mt-3 space-y-2 text-sm">
                <Link to={continuePath(basePath, "leadership", stage)} className="block text-[#F5C542]">
                  Continue Blueprint
                </Link>
                <Link to={path("report/relationship-v2")} className="block text-[#F5C542]">
                  Review Previous Report
                </Link>
              </div>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={0.16}>
            <Card className="p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary-text">
                Milestones
              </h3>
              <p className="mt-3 text-sm text-primary-text">5 Reflections Completed</p>
              <p className="text-xs text-secondary-text">Achieved April 2026</p>
            </Card>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
};

export default EmployeeContinuum;
