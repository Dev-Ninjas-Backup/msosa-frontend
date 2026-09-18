import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  CheckCircle2,
  Download,
  FileText,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import Input from "@/ui/Input";
import { cn } from "@/lib/utils";
import { HISTORY_ROWS } from "@/pages/Refiner/ReviewQueue/data";

const ReviewHistory = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      HISTORY_ROWS.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.client.toLowerCase().includes(query.toLowerCase()) ||
          item.company.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <div className="space-y-5 sm:space-y-6 pb-6">
      <AnimatedContainer delay={0.04}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="mt-3 text-xl sm:text-2xl font-semibold text-white">
              Review & Approval History
            </h2>
            <p className="mt-1.5 text-sm text-secondary-text max-w-xl">
              Complete audit trail of finalized reports, refiner sign-offs, and
              client deliveries.
            </p>
          </div>

          <div className="w-full sm:w-64 shrink-0">
            <Input
              variant="search"
              placeholder="Search..."
              leftIcon={<Search className="size-4 text-secondary-text" />}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.08}>
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <Card className="p-8 text-center text-sm text-secondary-text">
              No approved reports match your search.
            </Card>
          ) : (
            filtered.map((item) => (
              <Card
                key={item.id}
                className="p-4 sm:px-5 sm:py-4 flex flex-col lg:flex-row lg:items-center gap-4"
              >
                <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-secondary-text">
                    <FileText className="size-4" />
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm sm:text-[15px] font-medium text-primary-text">
                        {item.title}
                      </p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/20 px-2 py-0.5 text-[10px] font-semibold tracking-wide">
                        <CheckCircle2 className="size-3" />
                        Approved & Certified
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-secondary-text">
                      Client:{" "}
                      <span className="text-sky-400 font-medium">
                        {item.client}
                      </span>{" "}
                      <span className="text-secondary-text/80">
                        ({item.company})
                      </span>
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-secondary-text">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-3 opacity-70" />
                        Generated: {item.generated}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-3 opacity-70" />
                        Approved: {item.approvedAt ?? "—"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                  <button
                    type="button"
                    onClick={() =>
                      toast.success(`Exporting PDF for ${item.title}…`)
                    }
                    className="h-9 px-3.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-primary-text text-xs font-medium transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Download className="size-3.5" />
                    Export PDF
                  </button>
                  <Link
                    to={`/refiner/review-queue/${item.id}`}
                    className="h-9 px-4 rounded-lg bg-[#F5C542] hover:bg-[#e8b93a] text-black text-xs font-semibold transition-colors border-0 inline-flex items-center gap-1.5 no-underline"
                  >
                    View Report
                    <span className="text-sm">→</span>
                  </Link>
                </div>
              </Card>
            ))
          )}
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.12}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          <p className="text-xs text-secondary-text">
            Showing 1–{filtered.length} of{" "}
            <span className="text-primary-text font-medium">
              {filtered.length}
            </span>{" "}
            reports
          </p>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={cn(
                  "size-8 rounded-lg text-xs font-medium transition-colors cursor-pointer border-0",
                  page === n
                    ? "bg-[#F5C542] text-black"
                    : "bg-white/5 text-secondary-text hover:bg-white/10 hover:text-primary-text"
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default ReviewHistory;
