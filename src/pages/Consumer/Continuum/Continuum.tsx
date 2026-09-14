import { Link } from "react-router-dom";
import { FileText, Play, Users } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import { cn } from "@/lib/utils";

const Continuum = () => {
  return (
    <div className="relative flex min-h-[calc(100vh-12rem)] md:min-h-[calc(100vh-10rem)] w-full items-center justify-center overflow-hidden rounded-xl bg-black">
      {/* Main Content - vertically centered */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center p-4 text-center sm:px-6 -mt-20">
        <AnimatedContainer delay={0.05}>
          <h1 className="font-playfair text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl 3xl:text-6xl">
            Welcome back, Michel.
          </h1>
          <p className="mt-3 text-base text-white/75 sm:text-lg md:text-xl 3xl:text-2xl">
            What brings you back here?
          </p>
          <div className="mx-auto mt-4 h-0.5 w-14 rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </AnimatedContainer>

        {/* Previous Blueprint Card */}
        <AnimatedContainer delay={0.12} className="mt-8 w-full max-w-md sm:mt-10">
          <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
              Previous Blueprint
            </p>

            <div className="mt-4 flex flex-wrap md:flex-nowrap items-center gap-4 ">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
                <Users className="size-5" />
              </div>

              <div className="min-w-0 md:flex-1 text-left ">
                <p className="truncate font-medium text-white">
                  Relationship Blueprint<sup className="text-[9px] ">™</sup>
                </p>
                <p className="text-xs text-white/55">Completed Mar 15, 2026</p>
              </div>

              <Link
                to="/consumer/reports"
                className=" mx-auto w-full md:w-fit  flex items-center justify-center shrink-0 item-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:bg-white/10"
              >
                <FileText className="size-3.5 " />
                View Report
              </Link>
            </div>
          </div>
        </AnimatedContainer>

        {/* Primary CTA */}
        <AnimatedContainer delay={0.18} className="mt-8 sm:mt-10">
          <Link to="/consumer/reflection-room">
            <button
              type="button"
              className={cn(
                "group relative inline-flex items-center gap-3 rounded-full",
                "border-2 border-amber-400/70 bg-black/90 px-7 py-3.5 sm:px-8 sm:py-4",
                "text-sm font-bold uppercase tracking-wide sm:text-base",
                "shadow-[0_0_40px_rgba(251,191,36,0.35)]",
                "transition hover:scale-[1.03] hover:shadow-[0_0_55px_rgba(251,191,36,0.5)]",
                "cursor-pointer"
              )}
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-amber-400/15">
                <Play className="size-4 fill-amber-400 text-amber-400" />
              </span>
              <span className="flex flex-col items-start leading-none text-amber-400">
                <span>Continue My Reflection</span>
                <span className="mt-1.5 text-[11px] font-medium tracking-normal text-white/70">
                  35:00 Conversation Session
                </span>
              </span>
            </button>
          </Link>
        </AnimatedContainer>
      </div>
    </div>
  );
};

export default Continuum;