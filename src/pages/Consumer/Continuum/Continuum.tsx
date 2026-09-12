import { Link } from "react-router-dom";
import { FileText, Play, Users } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import { cn } from "@/lib/utils";

const Continuum = () => {
  return (
    <div className="relative min-h-[calc(100vh-8rem)] w-full overflow-hidden rounded-xl">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center "
        style={{
          backgroundImage: `url('../../../../public/bg/sunset.jpg')`,
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75" />

      {/* Soft gold window frame glow */}
      <div className="pointer-events-none absolute rounded-3xl border border-amber-400/15 shadow-[0_0_80px_rgba(251,191,36,0.08)]" />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4 py-10 text-center sm:px-6">
        <AnimatedContainer delay={0.05}>
          {/* Welcome */}
          <h1 className="font-playfair text-3xl font-medium tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">
            Welcome back, Michel.
          </h1>
          <p className="mt-3 text-base text-white/80 sm:text-lg md:text-xl">
            What brings you back here?
          </p>
          <div className="mx-auto mt-4 h-0.5 w-14 rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </AnimatedContainer>

        {/* Previous Blueprint Card */}
        <AnimatedContainer delay={0.12} className="mt-8 w-full max-w-md sm:mt-10">
          <div className="rounded-2xl border border-white/15 bg-black/55 p-5 backdrop-blur-xl shadow-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
              Previous Blueprint
            </p>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
                <Users className="size-5" />
              </div>

              <div className="min-w-0 flex-1 text-left">
                <p className="truncate font-medium text-white">
                  Relationship Blueprint<sup className="text-[9px]">™</sup>
                </p>
                <p className="text-xs text-white/55">Completed Mar 15, 2026</p>
              </div>

              <Link
                to="/consumer/reports"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:bg-white/10"
              >
                <FileText className="size-3.5" />
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
                "bg-gradient-to-r from-black/90 via-black/90 to-black backdrop-blur-sm px-7 py-3.5 sm:px-8 sm:py-4",
                "px-7 py-3.5 sm:px-8 sm:py-4",
                "text-sm font-bold uppercase tracking-wide text-black sm:text-base",
                "shadow-[0_0_40px_rgba(251,191,36,0.45)]",
                "transition hover:scale-[1.03] hover:shadow-[0_0_55px_rgba(251,191,36,0.6)]",
                "border-2 border-amber-400/70 cursor-pointer"
              )}
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-black/15">
                <Play className="size-12 fill-amber-400" />
              </span>
              <span className="flex flex-col items-start leading-none text-amber-400">
                <span>Continue My Reflection</span>
                <span className="mt-1 text-[11px] text-white text-center justify-center pl-4 font-medium tracking-normal opacity-80">
                  35:00 Conversation Session
                </span>
              </span>
            </button>
          </Link>
        </AnimatedContainer>

        {/* Decorative lower area (bonsai + fire bowls) */}
        <div className="pointer-events-none absolute bottom-16 left-1/2 flex -translate-x-1/2 items-end gap-14 opacity-80 sm:gap-20">
          {/* Left fire */}
          <div className="relative">
            <div className="h-3 w-9 rounded-full bg-gradient-to-t from-orange-600 to-amber-400 opacity-80 blur-[1px]" />
            <div className="absolute -top-5 left-1/2 h-7 w-3.5 -translate-x-1/2 rounded-full bg-gradient-to-t from-orange-500 to-yellow-300 opacity-70 blur-sm" />
          </div>

          {/* Center platform */}
          <div className="relative flex flex-col items-center">
            <div className="mb-1.5 h-14 w-24 rounded-full bg-gradient-to-b from-emerald-800/50 to-emerald-950/70 shadow-inner" />
            <div className="h-1.5 w-32 rounded-full bg-stone-700/70" />
            <div className="h-1 w-40 rounded-full bg-stone-800/80" />
          </div>

          {/* Right fire */}
          <div className="relative">
            <div className="h-3 w-9 rounded-full bg-gradient-to-t from-orange-600 to-amber-400 opacity-80 blur-[1px]" />
            <div className="absolute -top-5 left-1/2 h-7 w-3.5 -translate-x-1/2 rounded-full bg-gradient-to-t from-orange-500 to-yellow-300 opacity-70 blur-sm" />
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="absolute bottom-5 left-0 right-0 z-20">
          <p className="text-[12px] font-medium uppercase tracking-[0.28em] text-white/65 sm:text-[14px]">
            Your Insights Create a Brighter Tomorrow
          </p>
        </div>
      </div>
    </div>
  );
};

export default Continuum;