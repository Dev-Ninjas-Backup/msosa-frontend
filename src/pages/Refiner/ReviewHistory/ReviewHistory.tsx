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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 2.5C14.25 2.4337 14.2237 2.37011 14.1768 2.32322C14.1299 2.27634 14.0663 2.25 14 2.25H7C6.27065 2.25 5.57118 2.53973 5.05546 3.05546C4.53973 3.57118 4.25 4.27065 4.25 5V19C4.25 19.7293 4.53973 20.4288 5.05546 20.9445C5.57118 21.4603 6.27065 21.75 7 21.75H17C17.7293 21.75 18.4288 21.4603 18.9445 20.9445C19.4603 20.4288 19.75 19.7293 19.75 19V9.147C19.75 9.0807 19.7237 9.01711 19.6768 8.97022C19.6299 8.92334 19.5663 8.897 19.5 8.897H15C14.8011 8.897 14.6103 8.81798 14.4697 8.67733C14.329 8.53668 14.25 8.34591 14.25 8.147V2.5ZM15 12.25C15.1989 12.25 15.3897 12.329 15.5303 12.4697C15.671 12.6103 15.75 12.8011 15.75 13C15.75 13.1989 15.671 13.3897 15.5303 13.5303C15.3897 13.671 15.1989 13.75 15 13.75H9C8.80109 13.75 8.61032 13.671 8.46967 13.5303C8.32902 13.3897 8.25 13.1989 8.25 13C8.25 12.8011 8.32902 12.6103 8.46967 12.4697C8.61032 12.329 8.80109 12.25 9 12.25H15ZM15 16.25C15.1989 16.25 15.3897 16.329 15.5303 16.4697C15.671 16.6103 15.75 16.8011 15.75 17C15.75 17.1989 15.671 17.3897 15.5303 17.5303C15.3897 17.671 15.1989 17.75 15 17.75H9C8.80109 17.75 8.61032 17.671 8.46967 17.5303C8.32902 17.3897 8.25 17.1989 8.25 17C8.25 16.8011 8.32902 16.6103 8.46967 16.4697C8.61032 16.329 8.80109 16.25 9 16.25H15Z" fill="white" />
                      <path d="M15.75 2.82542C15.75 2.64142 15.943 2.52442 16.086 2.63942C16.2073 2.73742 16.315 2.85142 16.409 2.98142L19.422 7.17842C19.49 7.27442 19.416 7.39842 19.298 7.39842H16C15.9337 7.39842 15.8701 7.37208 15.8232 7.3252C15.7763 7.27831 15.75 7.21473 15.75 7.14842V2.82542Z" fill="white" />
                    </svg>
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
