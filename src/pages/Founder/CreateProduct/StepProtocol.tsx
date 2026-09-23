import { useState } from "react";
import { ArrowLeft, ArrowRight, Mic, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/ui/Button";
import Textarea from "@/ui/Textarea";
import { WIZARD_STEPS, type ProductDraft } from "./data";
import VoiceToTextModal from "./VoiceToTextModal";

type StepProtocolProps = {
  draft: ProductDraft;
  setDraft: (patch: Partial<ProductDraft>) => void;
  onBack: () => void;
  onCancel: () => void;
  onContinue: () => void;
};

const footerBtn =
  "h-9 gap-2 rounded-lg px-4 font-medium normal-case tracking-normal shadow-none";

const StepProtocol = ({
  draft,
  setDraft,
  onBack,
  onCancel,
  onContinue,
}: StepProtocolProps) => {
  const meta = WIZARD_STEPS.find((s) => s.id === 3)!;
  const [mode, setMode] = useState<"idle" | "type">("idle");
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [text, setText] = useState(draft.protocolSummary);
  const hasText = text.trim().length > 0;

  const send = (override?: string) => {
    const summary = (override ?? text).trim();
    if (!summary) return;
    setText(summary);
    setDraft({
      protocolSummary: summary,
      protocolName: draft.protocolName || "Product Protocol™",
    });
    setMode("idle");
    setVoiceOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-[#333] bg-[#1a1a1a] shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div
          className={cn(
            "bg-gradient-to-r from-[#1a1a1a] to-black/20 p-6",
            mode === "type" ? "border-b border-[#333]" : ""
          )}
        >
          <div className="flex items-center gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#eab308] text-lg font-bold text-black">
              3
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold text-white">{meta.title}</h2>
              <p className="text-xs text-[#6b7280]">{meta.description}</p>
            </div>
            {mode === "idle" && (
              <div className="flex shrink-0 items-center gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  className="h-9 rounded-lg px-5 font-medium normal-case tracking-normal"
                  title="Type here"
                  onClick={() => setMode("type")}
                />
                <button
                  type="button"
                  onClick={() => setVoiceOpen(true)}
                  aria-label="Describe protocol by voice"
                  className="flex size-8 items-center justify-center rounded-full border border-[#d4a017] bg-transparent text-[#d4a017] hover:bg-[#d4a017]/10 cursor-pointer"
                >
                  <Mic className="size-4" />
                </button>
              </div>
            )}
          </div>

          {mode === "type" && (
            <div className="mt-12 flex min-h-[402px] flex-col rounded-2xl border border-[#333] bg-gradient-to-r from-[#1a1a1a] to-black/20 p-[17px]">
              <Textarea
                variant="soft"
                autoFocus
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type here"
                className="min-h-0 flex-1 resize-none rounded-none! border-0! bg-transparent! px-0! py-0! text-base leading-6 text-[#8890a4] placeholder:text-[#8890a4] shadow-none focus-visible:ring-0"
              />
              <div className="flex justify-end pt-6">
                <Button
                  variant={hasText ? "primary" : "secondary"}
                  className={cn(
                    "h-10 gap-2 rounded-[10px] px-4 text-base font-medium normal-case tracking-normal",
                    !hasText &&
                      "border-0 bg-[#6b7280] text-[#1c1f24] hover:bg-[#6b7280]"
                  )}
                  title="Send"
                  rightIcon={<Send className="size-5" />}
                  onClick={() => send()}
                />
              </div>
            </div>
          )}
        </div>

        {mode === "idle" && draft.protocolSummary && (
          <div className="border-t border-[#333] px-6 py-5">
            <p className="whitespace-pre-wrap text-sm leading-6 text-white/70">
              {draft.protocolSummary}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="secondary"
          size="sm"
          className={cn(footerBtn, "bg-transparent text-white/60")}
          onClick={onBack}
          leftIcon={<ArrowLeft className="size-3.5" />}
          title="Back"
        />
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            className={cn(footerBtn, "bg-transparent text-[#888]")}
            onClick={onCancel}
            leftIcon={<X className="size-3.5" />}
            title="Cancel"
          />
          <Button
            variant="primary"
            size="sm"
            className={cn(footerBtn, "px-5")}
            onClick={onContinue}
            title="Continue"
            rightIcon={<ArrowRight className="size-3.5" />}
          />
        </div>
      </div>

      <VoiceToTextModal
        open={voiceOpen}
        initialValue={text}
        onSend={(v) => send(v)}
        onType={() => {
          setVoiceOpen(false);
          setMode("type");
        }}
        onClose={() => setVoiceOpen(false)}
      />
    </div>
  );
};

export default StepProtocol;
