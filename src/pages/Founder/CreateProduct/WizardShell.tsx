import { ArrowLeft, ArrowRight, Check, Mic, X } from "lucide-react";
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
  chrome?: "default" | "none";
};

const footerBtn =
  "h-9 gap-2 rounded-lg px-4 font-medium normal-case tracking-normal shadow-none";

const WizardShell = ({
  step,
  children,
  onBack,
  onCancel,
  onContinue,
  continueLabel = "Continue",
  onMic,
  chrome = "default",
}: WizardShellProps) => {
  const meta = WIZARD_STEPS.find((s) => s.id === step)!;
  const isFirst = step === 1;

  return (
    <div className="space-y-8">
      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-[720px] items-start justify-between">
          {WIZARD_STEPS.map((s, i) => {
            const done = s.id < step;
            const active = s.id === step;
            return (
              <div key={s.id} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex w-full items-center">
                  {i > 0 && (
                    <div
                      className={cn(
                        "h-px flex-1",
                        s.id <= step ? "bg-[#10b7ba]" : "bg-white/10"
                      )}
                    />
                  )}
                  <div
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-medium",
                      done && "border border-[#10b7ba] bg-[#10b7ba] text-black",
                      active &&
                        "border border-[#10b7ba] bg-black text-[#10b7ba] shadow-[0_0_7.5px_rgba(251,191,36,0.3)]",
                      !done &&
                        !active &&
                        "border-2 border-white/20 bg-black text-white"
                    )}
                  >
                    {done ? <Check className="size-4" /> : s.id}
                  </div>
                  {i < WIZARD_STEPS.length - 1 && (
                    <div
                      className={cn(
                        "h-px flex-1",
                        done ? "bg-[#10b7ba]" : "bg-white/10"
                      )}
                    />
                  )}
                </div>
                <span
                  className={cn(
                    "max-w-20 text-center text-xs uppercase tracking-[0.5px]",
                    active
                      ? "font-bold text-[#10b7ba]"
                      : "font-normal text-white/30"
                  )}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {chrome === "none" ? (
        children
      ) : (
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.05]">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#d4a854]/[0.04] px-6 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#fbbf24] text-sm font-bold text-black shadow-[0_0_6px_rgba(212,168,84,0.4)]">
              {step}
            </span>
            <div className="min-w-0">
              <h2 className="text-[17px] font-bold tracking-tight text-white sm:text-lg">
                {meta.title}
              </h2>
              {"description" in meta && meta.description ? (
                <p className="mt-0.5 text-xs text-white/60">{meta.description}</p>
              ) : null}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2.5">
            <span className="rounded-full bg-[#fbbf24]/10 px-3 py-1 text-xs font-semibold text-[#fbbf24]">
              Active
            </span>
            {onMic && (
              <button
                type="button"
                onClick={onMic}
                aria-label="Describe this step by voice"
                className="flex h-10 items-center justify-center rounded-lg bg-white/10 px-[15px] text-[#fbbf24] hover:bg-white/15 cursor-pointer border-0"
              >
                <Mic className="size-4" />
              </button>
            )}
          </div>
        </div>

        <div className="p-6 sm:p-8">{children}</div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-white/[0.05] px-6 py-4">
          <div>
            {isFirst ? (
              <Button
                variant="secondary"
                size="sm"
                className={cn(footerBtn, "bg-transparent text-[#888]")}
                onClick={onCancel}
                leftIcon={<X className="size-3.5" />}
                title="Cancel"
              />
            ) : onBack ? (
              <Button
                variant="secondary"
                size="sm"
                className={cn(footerBtn, "bg-transparent text-white/60")}
                onClick={onBack}
                leftIcon={<ArrowLeft className="size-3.5" />}
                title="Back"
              />
            ) : (
              <span />
            )}
          </div>
          <div className="flex items-center gap-3">
            {!isFirst && (
              <Button
                variant="secondary"
                size="sm"
                className={cn(footerBtn, "bg-transparent text-[#888]")}
                onClick={onCancel}
                leftIcon={<X className="size-3.5" />}
                title="Cancel"
              />
            )}
            <Button
              variant="primary"
              size="sm"
              className={cn(footerBtn, "px-5")}
              onClick={onContinue}
              title={continueLabel}
              rightIcon={
                continueLabel === "Continue" ? (
                  <ArrowRight className="size-3.5" />
                ) : undefined
              }
            />
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default WizardShell;
