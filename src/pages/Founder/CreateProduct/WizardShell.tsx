import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/ui/Button";
import { WIZARD_STEPS, type WizardStepId } from "./data";

type WizardShellProps = {
  step: WizardStepId;
  children: React.ReactNode;
  onBack?: () => void;
  onCancel: () => void;
  onContinue: () => void;
  continueLabel?: string;
  onMic?: () => void;
};

const WizardShell = ({
  step,
  children,
  onBack,
  onCancel,
  onContinue,
  continueLabel = "Continue",
  onMic,
}: WizardShellProps) => {
  const meta = WIZARD_STEPS.find((s) => s.id === step)!;

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-[720px] items-start justify-between gap-1">
          {WIZARD_STEPS.map((s, i) => {
            const done = s.id < step;
            const active = s.id === step;
            return (
              <div key={s.id} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full items-center">
                  {i > 0 && (
                    <div
                      className={cn(
                        "h-0.5 flex-1 rounded-full",
                        done || active ? "bg-[#10b7ba]" : "bg-white/15"
                      )}
                    />
                  )}
                  <div
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold",
                      done && "border-[#10b7ba] bg-[#10b7ba] text-black",
                      active &&
                        "border-[#10b7ba] bg-black text-[#10b7ba] shadow-[0_0_12px_rgba(16,183,186,0.45)]",
                      !done &&
                        !active &&
                        "border-white/20 bg-black text-white/50"
                    )}
                  >
                    {done ? <Check className="size-4" /> : s.id}
                  </div>
                  {i < WIZARD_STEPS.length - 1 && (
                    <div
                      className={cn(
                        "h-0.5 flex-1 rounded-full",
                        done ? "bg-[#10b7ba]" : "bg-white/15"
                      )}
                    />
                  )}
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium uppercase tracking-wide text-center",
                    active ? "text-[#10b7ba]" : "text-white/45"
                  )}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#fbbf24] text-sm font-bold text-black shadow-[0_0_12px_rgba(251,191,36,0.35)]">
              {step}
            </span>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-semibold text-white truncate">
                {meta.title}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="rounded-full bg-[#fbbf24]/10 px-3 py-1 text-[11px] font-medium text-[#fbbf24]">
              Active
            </span>
            {onMic && (
              <button
                type="button"
                onClick={onMic}
                aria-label="Open Reflection Room"
                className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-[#fbbf24] hover:bg-white/5 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                  <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.93V21h2v-3.07A7 7 0 0 0 19 11h-2Z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="p-5 sm:p-6">{children}</div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-white/[0.03] px-5 py-4">
          <div>
            {onBack ? (
              <Button variant="ghost" size="sm" onClick={onBack} title="Back" />
            ) : (
              <span />
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onCancel} title="Cancel" />
            <Button
              variant="primary"
              size="sm"
              onClick={onContinue}
              title={continueLabel}
              rightIcon={
                continueLabel === "Continue" ? (
                  <span aria-hidden>→</span>
                ) : undefined
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardShell;
