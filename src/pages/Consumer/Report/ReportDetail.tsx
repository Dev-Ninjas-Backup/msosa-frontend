import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Download,
  Info,
  Mic2,
  Share2,
  Sparkles,
  Target,
} from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { useMemberPortal } from "@/pages/shared/member/MemberPortalContext";

const ReportDetail = () => {
  const { reportId } = useParams();
  const { path } = useMemberPortal();

  return (
    <div className="space-y-5 sm:space-y-6 pb-8">
      {/* Breadcrumb + Back */}
      <AnimatedContainer delay={0.02}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-secondary-text">
            <Link to={path("dashboard")} className="hover:text-[#F5C542] transition-colors">
              HOME
            </Link>
            <span className="text-white/30">›</span>
            <Link to={path("report")} className="hover:text-[#F5C542] transition-colors">
              REPORTS
            </Link>
            <span className="text-white/30">›</span>
            <span className="text-[#F5C542] font-medium tracking-wide">
              RELATIONSHIP REFLECTION™ V2
            </span>
          </div>

          <Link
            to={path("report")}
            className="inline-flex items-center gap-1.5 text-sm text-secondary-text hover:text-primary-text transition-colors w-fit"
          >
            <ArrowLeft className="size-3.5" />
            Back
          </Link>
        </div>
      </AnimatedContainer>

      {/* Title Row */}
      <AnimatedContainer delay={0.05}>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-playfair text-2xl sm:text-3xl md:text-[34px] text-primary-text leading-tight">
                Relationship Reflection<sup className="text-lg">™</sup>
              </h1>
              <span className="inline-flex items-center rounded-md bg-[#F5C542] px-2.5 py-0.5 text-xs font-bold text-black">
                V2
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Status: Delivered
              </span>
              <span className="inline-flex items-center gap-1.5 text-secondary-text">
                <Calendar className="size-3.5" />
                March 15, 2026
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              className="h-9 px-4 rounded-lg bg-[#F5C542] hover:bg-[#e8b93a] text-black text-xs font-semibold transition-colors cursor-pointer border-0 inline-flex items-center gap-1.5"
            >
              <Download className="size-3.5" />
              Download PDF
            </button>
            <button
              type="button"
              className="h-9 w-9 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-primary-text transition-colors cursor-pointer flex items-center justify-center"
              aria-label="Share"
            >
              <Share2 className="size-3.5" />
            </button>
            <button
              type="button"
              className="h-9 px-4 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-primary-text text-xs font-medium transition-colors cursor-pointer"
            >
              VERSION HISTORY
            </button>
          </div>
        </div>
      </AnimatedContainer>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] 2xl:grid-cols-[minmax(0,1fr)_320px] gap-5 lg:gap-6">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Executive Summary */}
          <AnimatedContainer delay={0.08}>
            <Card className="p-5 sm:p-6 lg:p-7">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-1 h-5 rounded-full bg-[#F5C542]" />
                <h2 className="text-sm font-semibold tracking-[0.14em] text-primary-text uppercase">
                  Executive Summary
                </h2>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
                <p className="text-sm text-secondary-text leading-relaxed">
                  Your reflection cycle for March 2026 indicates a significant shift
                  towards “Strategic Harmonization” within your professional
                  relationships. The data suggests that while operational efficiency
                  remains high, there is an emerging need to re-calibrate emotional
                  boundaries to sustain long-term collaborative growth. Your primary
                  focus should transition from task-oriented management to
                  legacy-based mentorship.
                </p>
              </div>
            </Card>
          </AnimatedContainer>

          {/* Core Insights */}
          <AnimatedContainer delay={0.1}>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-secondary-text uppercase mb-3">
                Core Insights
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/[0.08] bg-[#0d1117] p-4 sm:p-5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300 mb-3">
                    <Sparkles className="size-4" />
                  </div>
                  <h3 className="text-sm font-medium text-primary-text">
                    Empathetic Leadership High
                  </h3>
                  <p className="mt-2 text-xs text-secondary-text leading-relaxed">
                    Your responses reflect a 24% increase in empathetic resonance
                    markers compared to Q4 2025.
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.08] bg-[#0d1117] p-4 sm:p-5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-rose-400/10 text-rose-300 mb-3">
                    <Target className="size-4" />
                  </div>
                  <h3 className="text-sm font-medium text-primary-text">
                    Boundary Attrition Risk
                  </h3>
                  <p className="mt-2 text-xs text-secondary-text leading-relaxed">
                    High-engagement reflections show a slight correlation with
                    increased evening reflection fatigue.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedContainer>

          {/* Themes & Patterns */}
          <AnimatedContainer delay={0.12}>
            <Card className="p-5 sm:p-6 lg:p-7">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-secondary-text uppercase mb-5">
                Themes & Patterns
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="font-playfair text-2xl text-[#F5C542] shrink-0 leading-none pt-0.5">
                    01
                  </span>
                  <div>
                    <h3 className="text-base font-medium text-primary-text">
                      The “Legacy vs. Logic” Paradox
                    </h3>
                    <p className="mt-2 text-sm text-secondary-text leading-relaxed">
                      A recurring tension exists between your desire for immediate
                      logical outcomes and the long-term legacy impact of your
                      decisions. This appeared in 68% of your March reflections.
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/[0.06] pt-6 flex gap-4">
                  <span className="font-playfair text-2xl text-[#F5C542] shrink-0 leading-none pt-0.5">
                    02
                  </span>
                  <div>
                    <h3 className="text-base font-medium text-primary-text">
                      Communicative Reticence
                    </h3>
                    <p className="mt-2 text-sm text-secondary-text leading-relaxed">
                      Pattern of withholding critical feedback during high-stakes
                      collaborations to preserve team harmony, often leading to
                      internal reflection “looping”.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedContainer>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Recommendations */}
          <AnimatedContainer delay={0.1} direction="left">
            <div className="rounded-2xl border border-amber-400/30 bg-gradient-to-b from-amber-400/10 to-transparent p-5 shadow-[0_0_30px_rgba(245,197,66,0.08)]">
              <div className="flex items-center gap-2 mb-4">
                <Mic2 className="size-4 text-amber-300" />
                <h3 className="text-sm font-semibold tracking-[0.12em] text-primary-text uppercase">
                  Recommendations
                </h3>
              </div>

              <ul className="space-y-4">
                <li className="flex gap-2.5">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-400" />
                  <p className="text-sm text-secondary-text leading-relaxed">
                    <span className="text-primary-text font-medium">Action 01:</span>{" "}
                    Revisit your long-term legacy goals before the Q2 strategic
                    planning session.
                  </p>
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-400" />
                  <p className="text-sm text-secondary-text leading-relaxed">
                    <span className="text-primary-text font-medium">Action 02:</span>{" "}
                    Implement a “48-hour feedback window” to address reticence
                    patterns in team meetings.
                  </p>
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-400" />
                  <p className="text-sm text-secondary-text leading-relaxed">
                    <span className="text-primary-text font-medium">Action 03:</span>{" "}
                    Explore the “Conflict Resolution” module in the Executive
                    Reflection next.
                  </p>
                </li>
              </ul>
            </div>
          </AnimatedContainer>

          {/* Reflection Highlights */}
          <AnimatedContainer delay={0.13} direction="left">
            <Card className="p-5">
              <h3 className="text-[11px] font-semibold tracking-[0.16em] text-secondary-text uppercase mb-4">
                Reflection Highlights
              </h3>

              <div className="space-y-5">
                <div>
                  <p className="text-[11px] font-semibold tracking-wide text-amber-300 mb-1.5">
                    MARCH 12
                  </p>
                  <p className="text-sm text-secondary-text leading-relaxed italic">
                    “I realized that my silence during the board meeting wasn’t
                    patience, it was protection — of my ego, not the team’s
                    harmony.”
                  </p>
                </div>

                <div className="border-t border-white/[0.06] pt-4">
                  <p className="text-[11px] font-semibold tracking-wide text-secondary-text mb-1.5">
                    MARCH 04
                  </p>
                  <p className="text-sm text-secondary-text leading-relaxed italic">
                    “The transition to legacy-focused leadership feels daunting,
                    like I’m giving up the control that got me here.”
                  </p>
                </div>
              </div>
            </Card>
          </AnimatedContainer>

          {/* Continuity Notes */}
          <AnimatedContainer delay={0.16} direction="left">
            <Card className="p-5">
              <h3 className="text-[11px] font-semibold tracking-[0.16em] text-secondary-text uppercase mb-5">
                Continuity Notes
              </h3>

              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <p className="text-xs text-secondary-text">Baseline (Q1 2025)</p>
                    <p className="text-xs font-medium text-primary-text">
                      42% Alignment
                    </p>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#F5C542]/60"
                      style={{ width: "42%" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <p className="text-xs text-secondary-text">
                      Current (March 2026)
                    </p>
                    <p className="text-xs font-medium text-[#F5C542]">
                      78% Alignment
                    </p>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#F5C542]"
                      style={{ width: "78%" }}
                    />
                  </div>
                </div>
              </div>

              <p className="mt-5 text-xs text-secondary-text leading-relaxed">
                You are maintaining a 3.2× faster alignment trajectory than the
                global peer average for Relationship Reflection™ participants.
              </p>
            </Card>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;