import { Check, Infinity as InfinityIcon, Lock, X } from "lucide-react";
import Button from "@/ui/Button";

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
