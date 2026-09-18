import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Play } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import { cn } from "@/lib/utils";

const BLUEPRINTS = [
  {
    id: "1",
    title: "Blueprint 1",
    date: "Completed Mar 15, 2026",
    description:
      "Return to your insights, explore new questions, and continue your growth.",
    color: "bg-blue-500/20 text-blue-300",
  },
  {
    id: "2",
    title: "Blueprint 2",
    date: "Completed Feb 2, 2026",
    description:
      "Revisit your reflection, gain new perspective, and go deeper.",
    color: "bg-violet-500/20 text-violet-300",
  },
  {
    id: "3",
    title: "Blueprint 3",
    date: "Completed Jan 10, 2026",
    description:
      "Continue your journey, reflect on your progress, and explore what's next.",
    color: "bg-emerald-500/20 text-emerald-300",
  },
] as const;

const Continuum = () => {
  const [selected, setSelected] = useState("1");

  return (
    <div className="relative flex min-h-[calc(100vh-12rem)] w-full items-center justify-center overflow-hidden rounded-xl bg-black">
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-4 py-6 text-center sm:px-8">
        {/* Header - tighter */}
        <AnimatedContainer delay={0.05}>
          <h1 className="font-playfair text-2xl font-medium tracking-tight text-white sm:text-3xl md:text-4xl">
            FRC<sup className="text-xl sm:text-2xl">™</sup> Continuum
          </h1>
          <p className="mt-1.5 text-base font-medium text-[#F5C542] sm:text-lg md:text-xl">
            Your journey continues here.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
            FRC<sup className="text-[10px]">™</sup> (Follow-up Reflection
            Continuum) gives you a dedicated 35-minute AI conversation to
            revisit your previous Blueprint(s), explore new insights, ask deeper
            questions, gain fresh perspectives, and stay aligned with your goals.
          </p>
          <p className="mt-2 text-sm text-white/60">
            Choose the Blueprint you would like to continue exploring.
          </p>
          <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </AnimatedContainer>

        {/* Completed Blueprints - wider */}
        <AnimatedContainer delay={0.1} className="mt-6 w-full">
          <p className="mb-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
            Your Completed Blueprints ({BLUEPRINTS.length})
          </p>

          <div className="space-y-2.5">
            {BLUEPRINTS.map((bp) => {
              const isSelected = selected === bp.id;
              return (
                <button
                  key={bp.id}
                  type="button"
                  onClick={() => setSelected(bp.id)}
                  className={cn(
                    "w-full rounded-xl border px-4 py-3 text-left transition-all cursor-pointer",
                    isSelected
                      ? "border-[#F5C542]/60 bg-[#F5C542]/5 shadow-[0_0_20px_rgba(245,197,66,0.12)]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                  )}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-lg",
                        bp.color
                      )}
                    >
                      <FileText className="size-4.5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <p className="text-sm font-medium text-white">
                          {bp.title}
                        </p>
                        <p className="text-xs text-white/50">{bp.date}</p>
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-white/50">
                        {bp.description}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2.5">
                      <span
                        className={cn(
                          "flex size-5 items-center justify-center rounded-full border-2",
                          isSelected
                            ? "border-[#F5C542] bg-[#F5C542]"
                            : "border-white/30 bg-transparent"
                        )}
                      >
                        {isSelected && (
                          <span className="size-2 rounded-full bg-black" />
                        )}
                      </span>

                      <Link
                        to="/consumer/report"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:bg-white/10"
                      >
                        <FileText className="size-3.5" />
                        View Report
                      </Link>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </AnimatedContainer>

        {/* Primary CTA - tighter spacing */}
        <AnimatedContainer delay={0.14} className="mt-6">
          <Link to="/consumer/reflection-room">
            <button
              type="button"
              className={cn(
                "group relative inline-flex items-center gap-3 rounded-full",
                "bg-gradient-to-r from-[#F5C542] via-[#F5C542] to-[#e8b93a]",
                "px-8 py-3.5",
                "text-sm font-bold uppercase tracking-wide text-black",
                "shadow-[0_0_36px_rgba(245,197,66,0.4)]",
                "transition hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(245,197,66,0.55)]",
                "cursor-pointer border-0"
              )}
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-black/15">
                <Play className="size-3.5 fill-current" />
              </span>
              <span className="flex flex-col items-start leading-none">
                <span>Continue My Reflection</span>
                <span className="mt-1 text-[11px] font-medium tracking-normal opacity-80">
                  35:00 Conversation Session
                </span>
              </span>
            </button>
          </Link>
        </AnimatedContainer>

        {/* Footer note */}
        <AnimatedContainer delay={0.18} className="mt-4">
          <p className="max-w-lg text-xs text-white/45">
            Your conversation will be focused on the selected Blueprint and your
            previous reflections.
          </p>
        </AnimatedContainer>
      </div>
    </div>
  );
};

export default Continuum;