import { Check, Infinity as InfinityIcon, Lock, X } from "lucide-react";
import Button from "@/ui/Button";
import { PROCESSING_ITEMS } from "./data";

type ProcessingModalProps = {
  progress: number;
  onSkip?: () => void;
};

export const ProcessingModal = ({ progress, onSkip }: ProcessingModalProps) => {
  const doneCount = Math.min(
    PROCESSING_ITEMS.length,
    Math.floor((progress / 100) * PROCESSING_ITEMS.length)
  );

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#0c0c0c] p-8 shadow-[0_0_60px_rgba(251,191,36,0.08)]">
        <p className="font-[family-name:var(--font-display,Cormorant_Garamond,serif)] text-3xl italic font-bold text-white text-center">
          Take your time.
        </p>
        <p className="mt-2 text-center text-sm text-white/70">
          Assembling your product configuration…
        </p>
        <div className="mt-8 space-y-2">
          {PROCESSING_ITEMS.map((item, i) => {
            const done = i < doneCount;
            return (
              <div
                key={item}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm"
              >
                <span
                  className={
                    done
                      ? "text-[#10b7ba]"
                      : "text-white/30"
                  }
                >
                  {done ? <Check className="size-4" /> : <span className="size-4 block rounded-full border border-white/20" />}
                </span>
                <span className={done ? "text-white" : "text-white/45"}>{item}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[#fbbf24] transition-all duration-300"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
        {onSkip && progress >= 100 && (
          <div className="mt-6 flex justify-center">
            <Button variant="primary" title="Continue" onClick={onSkip} />
          </div>
        )}
      </div>
    </div>
  );
};

type SuccessModalProps = {
  onClose: () => void;
  onGoList: () => void;
};

export const SuccessModal = ({ onClose, onGoList }: SuccessModalProps) => (
  <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
    <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-black p-10 text-center shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white cursor-pointer"
      >
        <X className="size-4" />
      </button>
      <div className="mx-auto flex size-20 items-center justify-center rounded-full border border-[#fbbf24] bg-[#fbbf24]/10 shadow-[0_0_40px_rgba(251,191,36,0.2)]">
        <Check className="size-9 text-[#fbbf24]" />
      </div>
      <h2 className="mt-8 font-[family-name:var(--font-display,Cormorant_Garamond,serif)] text-3xl font-bold text-[#f5f5f0]">
        Product Successfully Published!
      </h2>
      <p className="mt-4 text-sm text-white/60 max-w-sm mx-auto">
        Your product is now live on the FAR Platform and available to all assigned
        users.
      </p>
      <Button
        className="mt-8 w-full"
        variant="primary"
        size="lg"
        title="Go to Product List"
        onClick={onGoList}
      />
      <div className="mt-8 flex items-center justify-center gap-6 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.12em] text-white/70">
        <span className="inline-flex items-center gap-2">
          <Lock className="size-3.5" /> Encrypted
        </span>
        <span className="inline-flex items-center gap-2">
          <InfinityIcon className="size-3.5" /> Eternal Storage
        </span>
      </div>
    </div>
  </div>
);
