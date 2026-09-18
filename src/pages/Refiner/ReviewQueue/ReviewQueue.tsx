import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FileText, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { QUEUE_ROWS, queueCounts, type QueueStatus } from "./data";

const counts = queueCounts();

const TABS = [
  { id: "all", label: "All Report", count: counts.all },
  { id: "needs", label: "Need Review", count: counts.needs },
  { id: "in", label: "In Review", count: counts.inReview },
  {
    id: "approved",
    label: "Approved",
    count: QUEUE_ROWS.filter((r) => r.status === "Completed").length,
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

const statusText = (status: QueueStatus) => {
  if (status === "Needs Review") return "text-sky-300";
  if (status === "In Review") return "text-[#FBBF24]";
  return "text-teal-400";
};

const ReviewQueue = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab: TabId =
    TABS.find((t) => t.id === searchParams.get("tab"))?.id ?? "all";
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (tab === "needs")
      return QUEUE_ROWS.filter((r) => r.status === "Needs Review");
    if (tab === "in")
      return QUEUE_ROWS.filter((r) => r.status === "In Review");
    if (tab === "approved")
      return QUEUE_ROWS.filter((r) => r.status === "Completed");
    return QUEUE_ROWS;
  }, [tab]);

  const setTabAndUrl = (id: TabId) => {
    setPage(1);
    if (id === "all") setSearchParams({});
    else setSearchParams({ tab: id });
  };

  return (
    <div className="space-y-5 sm:space-y-6 pb-6">
      <AnimatedContainer delay={0.04}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-white tracking-tight">
              Reports Needing Review
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#a1a1aa] max-w-2xl">
              Review, refine, and approve AI-generated reports waiting for your
              attention.
            </p>
          </div>
          <button
            type="button"
            onClick={() => toast.success("Queue refreshed.")}
            className="inline-flex items-center gap-2 h-10 px-5 rounded-lg border border-white/10 bg-white/10 text-sm text-white hover:bg-white/15 cursor-pointer self-start lg:self-center"
          >
            <RefreshCw className="size-4" />
            Refresh
          </button>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.08}>
        <div className="flex flex-wrap gap-3 border-b border-white/20 pb-3">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTabAndUrl(t.id)}
              className={cn(
                "h-9 px-3 rounded-lg text-xs border cursor-pointer transition-colors",
                tab === t.id
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-black border-black text-[#9ca3af] hover:text-white hover:border-white/20"
              )}
            >
              {t.label} ({t.count})
            </button>
          ))}
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.1}>
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-left">
              <thead>
                <tr className="bg-white/[0.04] text-sm text-secondary-text border-b border-white/[0.08]">
                  <th className="px-4 py-3 font-medium">Report name</th>
                  <th className="px-4 py-3 font-medium">Client</th>
                  <th className="px-4 py-3 font-medium">Generated</th>
                  <th className="px-4 py-3 font-medium">AI confidence</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Waiting</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-primary-brand">
                          <FileText className="size-4" />
                        </span>
                        <span className="text-sm text-primary-text">
                          {row.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={row.avatar}
                          alt={row.client}
                          className="size-8 rounded-full object-cover border border-white/10"
                        />
                        <div>
                          <p className="text-sm text-primary-text">
                            {row.client}
                          </p>
                          <p className="text-xs text-secondary-text">
                            {row.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary-text whitespace-nowrap">
                      {row.generated}
                    </td>
                    <td className="px-4 py-3 text-sm text-primary-text">
                      {row.confidence}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          statusText(row.status)
                        )}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary-text whitespace-nowrap">
                      {row.waiting}
                    </td>
                    <td className="px-4 py-3">
                      {row.status === "Completed" ? (
                        <Link
                          to={`/refiner/review-queue/${row.id}`}
                          className="inline-flex items-center h-9 px-4 rounded-lg bg-sky-500/90 hover:bg-sky-400 text-white text-sm font-medium no-underline"
                        >
                          View →
                        </Link>
                      ) : (
                        <Link
                          to={`/refiner/review-queue/${row.id}`}
                          className="inline-flex items-center h-9 px-4 rounded-lg bg-[#F5C542] hover:bg-[#e8b93a] text-black text-sm font-semibold no-underline"
                        >
                          Review →
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-4 border-t border-white/[0.08]">
            <p className="text-xs text-secondary-text">
              Showing 1–{filtered.length} of {filtered.length} reports
            </p>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={cn(
                    "size-8 rounded-md text-xs font-medium cursor-pointer border-0",
                    page === n
                      ? "bg-[#F5C542] text-black"
                      : "bg-white/5 text-primary-text hover:bg-white/10 border border-white/10"
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </AnimatedContainer>
    </div>
  );
};

export default ReviewQueue;
