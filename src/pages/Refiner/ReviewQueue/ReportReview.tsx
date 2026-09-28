import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  LogOut,
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
  className,
}: {
  label: string;
  value: string;
  danger?: boolean;
  className?: string;
}) => (
  <div className={cn("flex items-start justify-between gap-3 text-sm ", className)}>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M9 1C9 0.446875 8.55312 0 8 0C7.44688 0 7 0.446875 7 1V8.58438L4.70625 6.29063C4.31562 5.9 3.68125 5.9 3.29063 6.29063C2.9 6.68125 2.9 7.31562 3.29063 7.70625L7.29063 11.7063C7.68125 12.0969 8.31562 12.0969 8.70625 11.7063L12.7063 7.70625C13.0969 7.31562 13.0969 6.68125 12.7063 6.29063C12.3157 5.9 11.6813 5.9 11.2906 6.29063L9 8.58438V1ZM2 11C0.896876 11 0 11.8969 0 13V14C0 15.1031 0.896876 16 2 16H14C15.1031 16 16 15.1031 16 14V13C16 11.8969 15.1031 11 14 11H10.8281L9.4125 12.4157C8.63125 13.1969 7.36562 13.1969 6.58438 12.4157L5.17187 11H2ZM13.5 12.7499C13.6989 12.7499 13.8897 12.829 14.0303 12.9697C14.171 13.1103 14.2501 13.3011 14.2501 13.5C14.2501 13.6989 14.171 13.8897 14.0303 14.0303C13.8897 14.171 13.6989 14.2501 13.5 14.2501C13.3011 14.2501 13.1103 14.171 12.9697 14.0303C12.829 13.8897 12.7499 13.6989 12.7499 13.5C12.7499 13.3011 12.829 13.1103 12.9697 12.9697C13.1103 12.829 13.3011 12.7499 13.5 12.7499Z" fill="white" />
                  </svg>
                  Export PDF
                </button>
                {!readOnly && (
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-sm font-semibold text-white border-0 cursor-pointer"
                  >

                    Edit
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M13.7285 4.50652L15.4927 6.27069M14.8627 2.95236L10.0902 7.72486C9.84286 7.97056 9.67455 8.28453 9.60685 8.62652L9.16602 10.8332L11.3727 10.3915C11.7143 10.3232 12.0277 10.1557 12.2743 9.90902L17.0468 5.13652C17.1903 4.99311 17.304 4.82285 17.3816 4.63547C17.4593 4.44809 17.4992 4.24726 17.4992 4.04444C17.4992 3.84162 17.4593 3.64079 17.3816 3.45341C17.304 3.26603 17.1903 3.09577 17.0468 2.95236C16.9034 2.80894 16.7332 2.69518 16.5458 2.61756C16.3584 2.53995 16.1576 2.5 15.9548 2.5C15.7519 2.5 15.5511 2.53995 15.3637 2.61756C15.1764 2.69518 15.0061 2.80894 14.8627 2.95236Z" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M15.833 12.5013V15.0013C15.833 15.4433 15.6574 15.8673 15.3449 16.1798C15.0323 16.4924 14.6084 16.668 14.1663 16.668H4.99967C4.55765 16.668 4.13372 16.4924 3.82116 16.1798C3.5086 15.8673 3.33301 15.4433 3.33301 15.0013V5.83464C3.33301 5.39261 3.5086 4.96868 3.82116 4.65612C4.13372 4.34356 4.55765 4.16797 4.99967 4.16797H7.49967" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
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
                    Approve
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M17.5 10C17.5 5.85938 14.1406 2.5 10 2.5C5.85938 2.5 2.5 5.85938 2.5 10C2.5 14.1406 5.85938 17.5 10 17.5C14.1406 17.5 17.5 14.1406 17.5 10Z" stroke="white" stroke-miterlimit="10" />
                      <path d="M13.75 6.875L8.5 13.125L6.25 10.625" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </AnimatedContainer>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-5 items-start rounded-2xl border border-white/[0.08] bg-[#0d1117]">
        <div className="space-y-5 min-w-0">
          <AnimatedContainer delay={0.08}>
            <section className=" p-5 sm:p-6">
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

            <section className="border-white/[0.08] bg-[#0d1117] px-5 sm:px-6">
              <h3 className="text-[12px] uppercase font-Inter text-[#FFFFFF66] py-3 font-semibold">Core Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {content.insights.map((insight, idx) => (
                  <div
                    key={insight.title}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4"
                  >
                    <div className="  items-center gap-4 mb-4">
                      {insight.tone === "gold" ? (
                        <Sparkles className="size-4 text-[#F5C542] mb-4" />
                      ) : (
                        <LogOut className="size-4 text-secondary-text mb-4 " />
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

          {/* <AnimatedContainer delay={0.1}>
            
          </AnimatedContainer> */}

          <AnimatedContainer delay={0.12}>
            <section className="p-5 sm:p-6">
              <h3 className="text-[11px] uppercase tracking-[0.16em] font-semibold text-white/40 mb-5">
                Themes & Patterns
              </h3>

              <div className="space-y-0 divide-y divide-white/[0.06]">
                {content.themes.map((theme, idx) => (
                  <div key={theme.num} className="py-5 first:pt-0 last:pb-0 flex items-start gap-6 space-x-3 pl-5">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[#FBBF247A] text-[24px] font-semibold text-sm tabular-nums shrink-0">
                        {theme.num}
                      </span>
                    </div>

                     <div className="space-y-3"> 
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
                          className="flex-1 bg-transparent border-0 outline-none text-sm font-semibold text-white"
                        />
                      ) : (
                        <h4 className="text-sm font-semibold text-white">
                          {theme.title}
                        </h4>
                      )}

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
                        className="mt-2 min-h-20 text-sm leading-relaxed ml-7"
                      />
                    ) : (
                      <p className=" text-sm text-white/50 leading-relaxed ">
                        {theme.body}
                      </p>
                    )}
                     </div>
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
              <MetaRow className="pt-5" label="Report ID : " value={`#${report.id}`} />
              <MetaRow label="Client : " value={report.client} />
              <MetaRow label="Company : " value={report.company} />
              <MetaRow label="Generated : " value={report.generated} />
              <MetaRow label="Time Waiting : " value={report.waiting} danger />
            </div>
          </AnimatedContainer>

          <AnimatedContainer delay={0.11}>
            <div className="rounded-2xl border border-white/[0.08] bg-[#0d1117] p-4 sm:p-5 space-y-3">
              <h4 className="text-sm font-semibold text-primary-text mb-1">
                AI Generation Telemetry
              </h4>
              <MetaRow className="pt-5" label="Model Engine : " value={report.model} />
              <MetaRow label="Confidence Score : " value={report.confidence} />
              <MetaRow label="Company : " value={report.company} />
              <MetaRow label="Generated : " value={report.generated} />
              <MetaRow label="Time Waiting : " value={report.waiting} danger />
            </div>
          </AnimatedContainer>

          <AnimatedContainer delay={0.13}>
            <div className="rounded-2xl border border-white/[0.08] bg-[#0d1117] p-4 sm:p-5">
              <h4 className="text-sm font-semibold text-primary-text mb-3">
                Add note if need
              </h4>
              {/* <label className="block text-xs text-secondary-text mb-2">
                Model Engine:
              </label> */}
              <Textarea
                variant="auth"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Model Engine:"
                className="min-h-24 text-sm"
              />
              <p className="mt-2 text-xs text-secondary-text">
                Visible to Refiners & Admins only
              </p>
              <button
                type="button"
                onClick={handlePostNote}
                className="mt-3 inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-sm font-semibold text-white border-0 cursor-pointer w-full text-center justify-center"
              >
                Post note
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1.73378 6.94837L6.82711 9.17504L9.05378 14.2684C9.16045 14.515 9.40045 14.6684 9.66711 14.6684H9.70045C9.83527 14.6615 9.96482 14.6138 10.072 14.5316C10.1791 14.4495 10.2588 14.3368 10.3004 14.2084L13.9671 2.87504C14.0059 2.75896 14.0115 2.63439 13.9834 2.51529C13.9553 2.39618 13.8946 2.28726 13.8081 2.20073C13.7216 2.1142 13.6126 2.05349 13.4935 2.0254C13.3744 1.99731 13.2499 2.00296 13.1338 2.0417L1.79378 5.7017C1.52712 5.78837 1.34711 6.02837 1.33378 6.3017C1.32045 6.57504 1.48045 6.83504 1.73378 6.94837Z" fill="white" />
                </svg>
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
