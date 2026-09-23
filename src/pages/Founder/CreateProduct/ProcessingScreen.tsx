import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROCESSING_ITEMS } from "./data";
import { ROOM_BG } from "@/pages/Consumer/ReflectionRoom/types";

type ProcessingScreenProps = {
  progress: number;
  onSkip: () => void;
};

const ProcessingScreen = ({ progress, onSkip }: ProcessingScreenProps) => {
  const clamped = Math.min(100, Math.max(0, progress));
  const current = Math.min(
    PROCESSING_ITEMS.length - 1,
    Math.floor((clamped / 100) * PROCESSING_ITEMS.length)
  );

  return (
    <div className="relative h-dvh w-full overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${ROOM_BG})` }}
      />
      <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.75)_100%)]" />

      <div className="relative z-10 flex h-full items-center justify-center p-4">
        <div className="w-full max-w-[380px] rounded-2xl border border-white/10 bg-black/80 px-8 py-9 shadow-[0_0_80px_rgba(0,0,0,0.65)]">
          <p className="text-center text-[10px] font-medium uppercase tracking-[0.28em] text-[#fbbf24]">
            Product Creation Room™
          </p>
          <h1 className="mt-3 text-center font-[family-name:var(--font-display,Cormorant_Garamond,serif)] text-[28px] italic font-semibold text-white">
            Processing Your Voice
          </h1>

          <div className="mt-6">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-white/45">
              <span>Processing Voice</span>
              <span>{Math.round(clamped)}%</span>
            </div>
            <div className="mt-2 h-px overflow-hidden bg-white/15">
              <div
                className="h-full bg-white transition-[width] duration-500 ease-out"
                style={{ width: `${clamped}%` }}
              />
            </div>
          </div>

          <ul className="mt-7 space-y-2.5">
            {PROCESSING_ITEMS.map((item, i) => {
              const done = i < current || clamped >= 100;
              const active = i === current && clamped < 100;
              return (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <span
                    className={cn(
                      "flex size-4 items-center justify-center rounded-full border shrink-0",
                      done && "border-[#10b7ba] bg-[#10b7ba] text-black",
                      active && "border-[#10b7ba] bg-transparent",
                      !done && !active && "border-white/25 bg-transparent"
                    )}
                  >
                    {done ? (
                      <Check className="size-2.5" strokeWidth={3} />
                    ) : active ? (
                      <span className="size-1.5 rounded-full bg-[#10b7ba] animate-pulse" />
                    ) : null}
                  </span>
                  <span
                    className={cn(
                      done && "text-white/90",
                      active && "text-[#10b7ba]",
                      !done && !active && "text-white/35"
                    )}
                  >
                    {item}
                  </span>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={onSkip}
            className="mt-8 w-full border-0 bg-transparent text-center text-sm text-[#fbbf24] hover:text-[#fcd34d] cursor-pointer"
          >
            Skip it
          </button>

          <p className="mt-6 text-center text-[9px] uppercase tracking-[0.22em] text-white/35">
            Voice System • Secure Processing
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessingScreen;
