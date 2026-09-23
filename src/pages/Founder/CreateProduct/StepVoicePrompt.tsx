import { motion } from "framer-motion";
import { Keyboard, Mic } from "lucide-react";
import Button from "@/ui/Button";

type StepVoicePromptProps = {
  open: boolean;
  stepTitle: string;
  onReflect: () => void;
  onType: () => void;
  onCancel: () => void;
};

const StepVoicePrompt = ({
  open,
  stepTitle,
  onReflect,
  onType,
  onCancel,
}: StepVoicePromptProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close voice prompt"
        className="absolute inset-0 border-0 bg-black/75 backdrop-blur-sm cursor-pointer"
        onClick={onCancel}
      />
      <div className="relative z-10 flex w-full max-w-[480px] flex-col items-center rounded-[20px] border border-white/20 bg-black/92 px-8 py-8 text-center shadow-[0_0_60px_rgba(251,191,36,0.08),0_8px_48px_rgba(0,0,0,0.7)]">
        <p className="font-[family-name:var(--font-display)] text-[42px] italic font-bold text-white leading-none">
          Take your time.
        </p>
        <p className="mt-3 text-xl text-white tracking-[0.5px] leading-7">
          Describe what {stepTitle} will be
        </p>

        <div className="mt-8 flex flex-col items-center">
          <button
            type="button"
            onClick={onReflect}
            aria-label="Start voice reflection"
            className="relative flex size-[264px] items-center justify-center rounded-full border border-white/20 bg-transparent cursor-pointer"
          >
            <span className="absolute inset-[20px] rounded-full border border-white/20" />
            <span className="flex size-[192px] items-center justify-center rounded-full border border-white/20 bg-[#af7626] shadow-[0_4px_2px_rgba(251,191,36,0.25),0_0_12px_rgba(251,191,36,0.5)]">
              <motion.span
                className="flex"
                initial={{ y: -10 }}
                animate={{ y: [-10, 0, 0] }}
                transition={{
                  duration: 2,
                  times: [0, 0.64, 1],
                  ease: ["easeOut", "linear"],
                  repeat: Infinity,
                }}
              >
                <Mic className="size-16 text-white drop-shadow-[0_0_18px_rgba(251,191,36,0.84)]" />
              </motion.span>
            </span>
          </button>
          <Button
            variant="primary"
            className="mt-2 h-12 rounded-full px-12 text-[21px] font-medium normal-case tracking-normal"
            title="Reflect"
            onClick={onReflect}
          />
        </div>

        <p className="mt-6 text-[11px] font-light uppercase tracking-[0.4em] text-white">
          or
        </p>

        <Button
          variant="secondary"
          className="mt-4 h-auto gap-3 rounded-[18px] border-white/10 bg-[#121212]/60 px-6 py-3 text-lg font-medium normal-case tracking-normal text-white/70 hover:bg-white/5 hover:text-white"
          leftIcon={<Keyboard className="size-4" />}
          title="Type"
          onClick={onType}
        />

        <div className="mt-8 h-px w-full bg-white/15" />
        <button
          type="button"
          onClick={onCancel}
          className="mt-5 w-full border-0 bg-transparent text-[#fbbf24] text-[15px] font-medium tracking-[0.5px] cursor-pointer hover:text-[#fcd34d]"
        >
          Cancel
        </button>
        <p className="mt-5 text-[9px] font-medium uppercase tracking-[0.25em] text-white/60">
          Voice System • Secure Processing
        </p>
      </div>
    </div>
  );
};

export default StepVoicePrompt;
