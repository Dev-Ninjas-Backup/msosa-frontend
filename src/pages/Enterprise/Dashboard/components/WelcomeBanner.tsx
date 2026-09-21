import AnimatedContainer from "@/common/AnimatedContainer";
import encountersLive from "@/assets/enterprise/encounters-live.jpg";
import bookBadge from "@/assets/enterprise/book-badge.svg";

const WelcomeBanner = () => (
  <AnimatedContainer delay={0.04}>
    <div className="rounded-2xl border border-white/10 bg-[#0D1117] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
      <div className="min-w-0 space-y-3">
        <h2 className="text-[28px] sm:text-[32px] font-bold text-white tracking-tight leading-10">
          Good Morning, <span className="text-[#FBBF24]">Team !</span> 👋
        </h2>
        <p className="text-sm text-white/60 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>Monday, June 2, 2026</span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span>
            Current Cycle:{" "}
            <span className="font-semibold text-white">Q2 2026</span>
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center">
        <div className="text-right">
          <p className="text-sm font-semibold text-white">Encounters</p>
          <div className="mt-1 inline-flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-[#10b7ba]" />
            <span className="text-xs font-medium text-[#10b7ba] tracking-wide">
              LIVE SESSION
            </span>
          </div>
        </div>
        <div className="relative size-12 rounded-full border border-white/20 p-2.5 overflow-hidden">
          <img
            src={encountersLive}
            alt=""
            className="size-full object-cover rounded-full"
          />
          <img
            src={bookBadge}
            alt=""
            className="absolute bottom-0 right-0 size-[22px]"
          />
        </div>
      </div>
    </div>
  </AnimatedContainer>
);

export default WelcomeBanner;
