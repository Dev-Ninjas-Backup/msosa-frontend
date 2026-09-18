import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Download,
  Send,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Textarea from "@/ui/Textarea";
import { cn } from "@/lib/utils";
import ApproveModal from "./ApproveModal";
import {
  getQueueRow,
  getReportContent,
  type ReportContent,
} from "./data";

const SectionHeading = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center gap-2.5 mb-4">
    <span className="w-1 h-5 rounded-full bg-[#F5C542] shrink-0" />
    <h3 className="font-playfair text-sm sm:text-base tracking-[0.12em] uppercase text-primary-text">
      {children}
    </h3>
  </div>
);

const MetaRow = ({
  label,
  value,
  danger,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) => (
  <div className="flex items-start justify-between gap-3 text-sm">
    <span className="text-secondary-text">{label}</span>
    <span
      className={cn(
        "text-right font-medium",
        danger ? "text-[#e05a7a]" : "text-primary-text"
      )}
    >
      {value}
    </span>
  </div>
);

const ReportReview = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const report = getQueueRow(reportId);
  const editing = searchParams.get("mode") === "edit";
  const readOnly = report.status === "Completed" && !editing;

  const [content, setContent] = useState<ReportContent>(() =>
    getReportContent(reportId)
  );
  const [note, setNote] = useState("");
  const [approveOpen, setApproveOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    setContent(getReportContent(reportId));
    setNote("");
    setApproveOpen(false);
    setConfirmed(false);
  }, [reportId]);

  const setEditing = (on: boolean) => {
    if (on) setSearchParams({ mode: "edit" });
    else setSearchParams({});
  };

  const handleUpdate = (section: string) => {
    toast.success(`${section} updated.`);
  };

  const handlePostNote = () => {
    if (!note.trim()) {
      toast.error("Write a note first.");
      return;
    }
    toast.success("Note posted.");
    setNote("");
  };

  const handleApprove = () => {
    toast.success("Report approved. Final PDF generating.");
    setApproveOpen(false);
    setConfirmed(false);
    navigate("/refiner/review-history");
  };

  const preparedFor = `Prepared for ${report.client} - ${report.company} (${report.email})`;

  return (
    <div className="space-y-5 sm:space-y-6 pb-8">
      <AnimatedContainer delay={0.03}>
        <nav className="flex items-center gap-2 text-sm text-secondary-text">
          <Link
            to="/refiner/review-queue"
            className="hover:text-primary-text transition-colors no-underline"
          >
            Review Queue
          </Link>
          <span className="text-white/30">›</span>
          <span className="text-primary-text">Report #{report.id}</span>
        </nav>
      </AnimatedContainer>

      <AnimatedContainer delay={0.05}>
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-white tracking-tight">
              {report.title}
            </h2>
            <p className="mt-2 text-sm text-secondary-text">{preparedFor}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {editing ? (
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-white/15 bg-white/5 text-sm text-primary-text hover:bg-white/10 cursor-pointer"
              >
                View AI generated
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => toast.info("PDF export started.")}
                  className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-[#F5C542]/50 bg-transparent text-sm font-medium text-[#F5C542] hover:bg-[#F5C542]/10 cursor-pointer"
                >
                  <Download className="size-4" />
                  Export PDF
                </button>
                {!readOnly && (
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-sm font-semibold text-white border-0 cursor-pointer"
                  >
                    <ArrowUpRight className="size-4" />
                    Edit
                  </button>
                )}
                {!readOnly && (
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmed(false);
                      setApproveOpen(true);
                    }}
                    className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-sm font-semibold text-white border-0 cursor-pointer"
                  >
                    <Check className="size-4" />
                    Approve
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </AnimatedContainer>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-5 items-start">
        <div className="space-y-5 min-w-0">
          <AnimatedContainer delay={0.08}>
            <section className="rounded-2xl border border-white/[0.08] bg-[#0d1117] p-5 sm:p-6">
              <SectionHeading>Executive Summary</SectionHeading>
              {editing ? (
                <Textarea
                  variant="auth"
                  value={content.executiveSummary}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      executiveSummary: e.target.value,
                    }))
                  }
                  className="min-h-36 text-sm leading-relaxed"
                />
              ) : (
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-4 text-sm text-secondary-text leading-relaxed">
                  {content.executiveSummary}
                </div>
              )}
              {editing && (
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleUpdate("Executive Summary")}
                    className="h-9 px-4 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-sm font-semibold text-white border-0 cursor-pointer"
                  >
                    Update
                  </button>
                </div>
              )}
            </section>
          </AnimatedContainer>

          <AnimatedContainer delay={0.1}>
            <section className="rounded-2xl border border-white/[0.08] bg-[#0d1117] p-5 sm:p-6">
              <SectionHeading>Core Insights</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {content.insights.map((insight, idx) => (
                  <div
                    key={insight.title}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {insight.tone === "gold" ? (
                        <Sparkles className="size-4 text-[#F5C542]" />
                      ) : (
                        <AlertTriangle className="size-4 text-secondary-text" />
                      )}
                      {editing ? (
                        <input
                          value={insight.title}
                          onChange={(e) =>
                            setContent((c) => {
                              const insights = [...c.insights];
                              insights[idx] = {
                                ...insights[idx],
                                title: e.target.value,
                              };
                              return { ...c, insights };
                            })
                          }
                          className={cn(
                            "flex-1 bg-transparent border-0 outline-none text-sm font-semibold",
                            insight.tone === "gold"
                              ? "text-[#F5C542]"
                              : "text-primary-text"
                          )}
                        />
                      ) : (
                        <h4
                          className={cn(
                            "text-sm font-semibold",
                            insight.tone === "gold"
                              ? "text-[#F5C542]"
                              : "text-primary-text"
                          )}
                        >
                          {insight.title}
                        </h4>
                      )}
                    </div>
                    {editing ? (
                      <Textarea
                        variant="auth"
                        value={insight.body}
                        onChange={(e) =>
                          setContent((c) => {
                            const insights = [...c.insights];
                            insights[idx] = {
                              ...insights[idx],
                              body: e.target.value,
                            };
                            return { ...c, insights };
                          })
                        }
                        className="min-h-20 text-xs leading-relaxed"
                      />
                    ) : (
                      <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
                        {insight.body}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              {editing && (
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleUpdate("Core Insights")}
                    className="h-9 px-4 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-sm font-semibold text-white border-0 cursor-pointer"
                  >
                    Update
                  </button>
                </div>
              )}
            </section>
          </AnimatedContainer>

          <AnimatedContainer delay={0.12}>
            <section className="rounded-2xl border border-white/[0.08] bg-[#0d1117] p-5 sm:p-6">
              <SectionHeading>Themes & Patterns</SectionHeading>
              <div className="space-y-5">
                {content.themes.map((theme, idx) => (
                  <div key={theme.num} className="space-y-1.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[#F5C542] font-semibold text-sm">
                        {theme.num}
                      </span>
                      {editing ? (
                        <input
                          value={theme.title}
                          onChange={(e) =>
                            setContent((c) => {
                              const themes = [...c.themes];
                              themes[idx] = {
                                ...themes[idx],
                                title: e.target.value,
                              };
                              return { ...c, themes };
                            })
                          }
                          className="flex-1 bg-transparent border-0 outline-none text-sm font-semibold text-[#F5C542]"
                        />
                      ) : (
                        <h4 className="text-sm font-semibold text-[#F5C542]">
                          {theme.title}
                        </h4>
                      )}
                    </div>
                    {editing ? (
                      <Textarea
                        variant="auth"
                        value={theme.body}
                        onChange={(e) =>
                          setContent((c) => {
                            const themes = [...c.themes];
                            themes[idx] = {
                              ...themes[idx],
                              body: e.target.value,
                            };
                            return { ...c, themes };
                          })
                        }
                        className="min-h-20 text-sm leading-relaxed"
                      />
                    ) : (
                      <p className="text-sm text-secondary-text leading-relaxed pl-7">
                        {theme.body}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              {editing && (
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleUpdate("Themes & Patterns")}
                    className="h-9 px-4 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-sm font-semibold text-white border-0 cursor-pointer"
                  >
                    Update
                  </button>
                </div>
              )}
            </section>
          </AnimatedContainer>

          {editing && (
            <AnimatedContainer delay={0.14}>
              <section className="rounded-2xl border border-white/[0.08] bg-[#0d1117] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="flex size-11 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 shrink-0">
                    <CheckCircle2 className="size-6" />
                  </span>
                  <div>
                    <p className="text-base font-semibold text-primary-text">
                      FAR Refiner™ Quality Certified
                    </p>
                    <p className="mt-1 text-sm text-secondary-text">
                      Ready for executive authorization and client delivery
                      generation.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmed(false);
                    setApproveOpen(true);
                  }}
                  className="h-11 px-5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-sm font-semibold text-white border-0 cursor-pointer shrink-0"
                >
                  Approved & Generate Final PDF
                </button>
              </section>
            </AnimatedContainer>
          )}
        </div>

        <aside className="space-y-4 xl:sticky xl:top-24">
          <AnimatedContainer delay={0.09}>
            <div className="rounded-2xl border border-white/[0.08] bg-[#0d1117] p-4 sm:p-5 space-y-3">
              <h4 className="text-sm font-semibold text-primary-text mb-1">
                Report Information
              </h4>
              <MetaRow label="Report ID" value={`#${report.id}`} />
              <MetaRow label="Client" value={report.client} />
              <MetaRow label="Company" value={report.company} />
              <MetaRow label="Generated" value={report.generated} />
              <MetaRow label="Time Waiting" value={report.waiting} danger />
            </div>
          </AnimatedContainer>

          <AnimatedContainer delay={0.11}>
            <div className="rounded-2xl border border-white/[0.08] bg-[#0d1117] p-4 sm:p-5 space-y-3">
              <h4 className="text-sm font-semibold text-primary-text mb-1">
                AI Generation Telemetry
              </h4>
              <MetaRow label="Model Engine" value={report.model} />
              <MetaRow label="Confidence Score" value={report.confidence} />
              <MetaRow label="Company" value={report.company} />
              <MetaRow label="Generated" value={report.generated} />
              <MetaRow label="Time Waiting" value={report.waiting} danger />
            </div>
          </AnimatedContainer>

          <AnimatedContainer delay={0.13}>
            <div className="rounded-2xl border border-white/[0.08] bg-[#0d1117] p-4 sm:p-5">
              <h4 className="text-sm font-semibold text-primary-text mb-3">
                Add note if need
              </h4>
              <label className="block text-xs text-secondary-text mb-2">
                Model Engine:
              </label>
              <Textarea
                variant="auth"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Internal note…"
                className="min-h-24 text-sm"
              />
              <p className="mt-2 text-xs text-secondary-text">
                Visible to Refiners & Admins only
              </p>
              <button
                type="button"
                onClick={handlePostNote}
                className="mt-3 inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-sm font-semibold text-white border-0 cursor-pointer"
              >
                <Send className="size-3.5" />
                Post note
              </button>
            </div>
          </AnimatedContainer>
        </aside>
      </div>

      <ApproveModal
        open={approveOpen}
        report={report}
        confirmed={confirmed}
        onConfirmChange={setConfirmed}
        onClose={() => setApproveOpen(false)}
        onApprove={handleApprove}
      />
    </div>
  );
};

export default ReportReview;
