import { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  FileText,
  Lock,
  Shield,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import Textarea from "@/ui/Textarea";
import { Label } from "@/ui/Label";
import {
  AI_MODELS,
  AI_STYLES,
  DEFAULT_AI_SAFETY,
  type ProductDraft,
} from "./data";

type StepAiProps = {
  draft: ProductDraft;
  setDraft: (patch: Partial<ProductDraft>) => void;
};

const PROVIDERS = [
  { id: "openai" as const, label: "GPT-4" },
  { id: "gemini" as const, label: "Gemini" },
  { id: "claude" as const, label: "Claude" },
];

const TOKEN_PRESETS = [512, 1024, 2048, 4096];
const PROMPT_VARS = ["{user}", "{response}", "{user_name}", "{context}"];

const tempLabel = (v: number) => {
  if (v <= 0.3) return "Deterministic";
  if (v >= 0.8) return "Creative";
  return "Balanced";
};

const RangeField = ({
  label,
  value,
  min,
  max,
  step,
  badge,
  goldValue,
  hintLeft,
  hintRight,
  hint,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  badge?: string;
  goldValue?: boolean;
  hintLeft?: string;
  hintRight?: string;
  hint?: string;
  onChange: (v: number) => void;
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between gap-2">
      <p className="text-xs font-semibold text-white">{label}</p>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "rounded px-2 py-0.5 text-xs font-bold",
            goldValue
              ? "bg-[#fbbf24]/12 text-[#fbbf24]"
              : "bg-white/12 text-white"
          )}
        >
          {value}
        </span>
        {badge && <span className="text-xs text-white/60">{badge}</span>}
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-xs text-white/60">{min.toFixed(1)}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/5 accent-white [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-white"
        aria-label={label}
      />
      <span className="text-xs text-white/60">{max.toFixed(1)}</span>
    </div>
    {(hintLeft || hintRight) && (
      <div className="flex justify-between text-xs text-white/60">
        <span>{hintLeft}</span>
        <span>{hintRight}</span>
      </div>
    )}
    {hint && <p className="text-xs text-white/60">{hint}</p>}
  </div>
);

const MiniToggle = ({
  on,
  onToggle,
}: {
  on: boolean;
  onToggle: () => void;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={on}
    onClick={onToggle}
    className={cn(
      "relative h-5 w-9 shrink-0 rounded-full border-0 cursor-pointer",
      on ? "bg-[#fbbf24]" : "bg-white/10"
    )}
  >
    <span
      className={cn(
        "absolute top-[3px] size-3.5 rounded-full transition-transform",
        on ? "left-[18px] bg-black" : "left-1 bg-white/60"
      )}
    />
  </button>
);

const StepAi = ({ draft, setDraft }: StepAiProps) => {
  const [tested, setTested] = useState(false);
  const checks = [
    { label: "AI Provider", value: "GPT-4", ok: true },
    { label: "AI Model", value: "GPT-4 Turbo", ok: Boolean(draft.aiModel) },
    {
      label: "System prompt",
      value: "Configured",
      ok: Boolean(draft.aiPrompt.trim()),
    },
    {
      label: "Safety Rules",
      value: draft.aiContentFilter ? "Active" : "Off",
      ok: draft.aiContentFilter,
    },
    { label: "Test Run", value: tested ? "Complete" : "Pending", ok: tested },
  ];
  const done = checks.filter((c) => c.ok).length;

  return (
    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_292px]">
      <div className="space-y-5">
        <section className="space-y-4 rounded-xl border border-white/10 bg-white/[0.05] p-5">
          <p className="text-sm font-bold tracking-[0.35px] text-white">
            AI Provider & Model
          </p>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold tracking-[0.3px] text-white">
              AI Provider <span className="text-[#ef4444]">*</span>
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {PROVIDERS.map((p) => {
                const on = draft.aiProvider === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setDraft({ aiProvider: p.id })}
                    className={cn(
                      "flex h-10 items-center justify-center gap-2 rounded-lg border text-sm cursor-pointer",
                      on
                        ? "border-[#fbbf24] bg-[#fbbf24]/8 font-semibold text-[#fbbf24]"
                        : "border-white/10 bg-white/[0.05] font-medium text-white/60"
                    )}
                  >
                    {p.label}
                    {on && <Check className="size-3" />}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold tracking-[0.3px] text-white">
                AI Model <span className="text-[#ef4444]">*</span>
              </Label>
              <Select
                variant="soft"
                options={AI_MODELS}
                value={draft.aiModel}
                onChange={(v) => setDraft({ aiModel: v })}
                className="border-[#fbbf24]!"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold tracking-[0.3px] text-white">
                Does this product require FAR Refiner™?{" "}
                <span className="text-[#ef4444]">*</span>
              </Label>
              <div
                className={cn(
                  "flex h-11 items-center justify-between rounded-lg border bg-white/[0.05] px-4",
                  draft.aiFarRefiner ? "border-[#fbbf24]" : "border-white/10"
                )}
              >
                <span className="text-sm text-white/60">
                  {draft.aiFarRefiner ? "Yes" : "No"}
                </span>
                <MiniToggle
                  on={draft.aiFarRefiner}
                  onToggle={() =>
                    setDraft({ aiFarRefiner: !draft.aiFarRefiner })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["GPT-4o", "Gemini 1.5 Pro"].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setDraft({ aiModel: m })}
                className="rounded-full bg-white/[0.05] px-2.5 py-1 text-xs text-white/60 hover:text-white cursor-pointer border-0"
              >
                {m}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-white/10 bg-white/[0.05] p-5">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-md bg-[#fbbf24]/12 text-[#fbbf24]">
              <Sparkles className="size-3" />
            </span>
            <p className="text-sm font-bold tracking-[0.35px] text-white">
              Prompt Configuration
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label className="text-xs font-semibold tracking-[0.3px] text-white">
              AI Prompt Template <span className="text-[#ef4444]">*</span>
            </Label>
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-white/45">
              <span>Variables:</span>
              {PROMPT_VARS.map((v) => (
                <span
                  key={v}
                  className="rounded-full bg-white/5 px-2 py-0.5 text-white/50"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 bg-black/30 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-[#ef4444]" />
                <span className="size-2.5 rounded-full bg-[#fbbf24]" />
                <span className="size-2.5 rounded-full bg-[#22c55e]" />
                <span className="ml-2 text-xs text-white/40">
                  system_prompt.txt
                </span>
              </div>
              <FileText className="size-3.5 text-white/30" />
            </div>
            <Textarea
              variant="soft"
              value={draft.aiPrompt}
              onChange={(e) => setDraft({ aiPrompt: e.target.value })}
              maxLength={2000}
              className="min-h-[220px] rounded-none! border-0! bg-black/40! px-4! py-3! font-mono text-xs leading-5"
            />
          </div>
          <p className="text-right text-[11px] text-white/40">
            {draft.aiPrompt.length} / 2000 characters
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-white">Response Style</p>
              <Select
                variant="soft"
                options={AI_STYLES}
                value={draft.aiResponseStyle}
                onChange={(v) => setDraft({ aiResponseStyle: v })}
              />
              <div className="flex flex-wrap gap-2">
                {AI_STYLES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setDraft({ aiResponseStyle: s })}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs cursor-pointer border-0",
                      draft.aiResponseStyle === s
                        ? "bg-[#fbbf24]/15 text-[#fbbf24]"
                        : "bg-white/[0.05] text-white/50"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-white">AI Instructions</p>
              <Textarea
                variant="soft"
                value={draft.aiInstructions}
                onChange={(e) => setDraft({ aiInstructions: e.target.value })}
                className="min-h-[90px] rounded-lg! border-white/10! bg-white/[0.05]! text-xs leading-5 text-white/70"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-white/10 bg-white/[0.05] p-5">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-md bg-[#fbbf24]/12 text-[#fbbf24]">
              <SlidersHorizontal className="size-3" />
            </span>
            <p className="text-sm font-bold tracking-[0.35px] text-white">
              Performance Settings
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <RangeField
              label="AI Temperature"
              value={draft.aiTemperature}
              min={0}
              max={1}
              step={0.1}
              goldValue
              badge={tempLabel(draft.aiTemperature)}
              hintLeft="Deterministic"
              hintRight="Creative"
              onChange={(v) => setDraft({ aiTemperature: v })}
            />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-white">
                  Max Token Limit
                </p>
                <span className="text-xs text-white/60">Output tokens</span>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  variant="soft"
                  type="number"
                  value={String(draft.aiMaxTokens)}
                  onChange={(e) =>
                    setDraft({
                      aiMaxTokens: Math.min(
                        4096,
                        Math.max(256, Number(e.target.value) || 0)
                      ),
                    })
                  }
                  className="h-11! rounded-lg! border-white/10! bg-white/[0.05]! text-center"
                />
                <div className="flex flex-col">
                  <button
                    type="button"
                    className="border-0 bg-transparent p-0 text-white/50 hover:text-white cursor-pointer"
                    aria-label="Increase tokens"
                    onClick={() =>
                      setDraft({
                        aiMaxTokens: Math.min(4096, draft.aiMaxTokens + 256),
                      })
                    }
                  >
                    <ChevronUp className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    className="border-0 bg-transparent p-0 text-white/50 hover:text-white cursor-pointer"
                    aria-label="Decrease tokens"
                    onClick={() =>
                      setDraft({
                        aiMaxTokens: Math.max(256, draft.aiMaxTokens - 256),
                      })
                    }
                  >
                    <ChevronDown className="size-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {TOKEN_PRESETS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setDraft({ aiMaxTokens: n })}
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs cursor-pointer border-0",
                      draft.aiMaxTokens === n
                        ? "bg-[#fbbf24]/15 text-[#fbbf24]"
                        : "bg-white/[0.05] text-white"
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <RangeField
              label="Top P (Nucleus Sampling)"
              value={draft.aiTopP}
              min={0}
              max={1}
              step={0.1}
              hint="Higher values = more diverse token selection"
              onChange={(v) => setDraft({ aiTopP: v })}
            />
            <RangeField
              label="Frequency Penalty"
              value={draft.aiFrequencyPenalty}
              min={0}
              max={2}
              step={0.1}
              hint="Reduces repetition of the same phrases"
              onChange={(v) => setDraft({ aiFrequencyPenalty: v })}
            />
          </div>
        </section>

        <section className="space-y-3 rounded-xl border border-white/10 bg-white/[0.05] p-5">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-md bg-[#fbbf24]/12 text-[#fbbf24]">
              <Shield className="size-3" />
            </span>
            <p className="text-sm font-bold tracking-[0.35px] text-white">
              Safety & Rules
            </p>
          </div>
          <p className="text-xs font-semibold tracking-[0.3px] text-white">
            Safety Rules & Guardrails
          </p>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-xs leading-5 text-white/55">
            {DEFAULT_AI_SAFETY}
          </div>
          {(
            [
              {
                icon: <Shield className="size-3.5" />,
                title: "Content Filtering",
                body: "Automatically filter harmful or inappropriate AI responses",
                on: draft.aiContentFilter,
                toggle: () =>
                  setDraft({ aiContentFilter: !draft.aiContentFilter }),
              },
              {
                icon: <Lock className="size-3.5" />,
                title: "PII Protection",
                body: "Prevent personally identifiable information from being sent to AI models",
                on: draft.aiPiiProtection,
                toggle: () =>
                  setDraft({ aiPiiProtection: !draft.aiPiiProtection }),
              },
              {
                icon: <FileText className="size-3.5" />,
                title: "AI Audit Logging",
                body: "Log all AI interactions for compliance and review",
                on: draft.aiAuditLog,
                toggle: () => setDraft({ aiAuditLog: !draft.aiAuditLog }),
              },
            ] as const
          ).map((row) => (
            <div
              key={row.title}
              className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-[#fbbf24]">{row.icon}</span>
                <div>
                  <p className="text-sm font-medium text-white">{row.title}</p>
                  <p className="text-xs text-white/50">{row.body}</p>
                </div>
              </div>
              <MiniToggle on={row.on} onToggle={row.toggle} />
            </div>
          ))}
        </section>
      </div>

      <aside className="space-y-4">
        <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.05] p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Model Overview</p>
            <span className="rounded-full bg-[#fbbf24]/12 px-2 py-0.5 text-[11px] font-medium text-[#fbbf24]">
              GPT-4 Turbo
            </span>
          </div>
          <dl className="space-y-2 text-xs">
            {[
              ["Context window", "128k tokens"],
              ["Training data", "Up to Apr 2024"],
              ["Cost / 1k input", "$0.01"],
              ["Cost / 1k output", "$0.03"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-2">
                <dt className="text-white/50">{k}</dt>
                <dd className="text-white">{v}</dd>
              </div>
            ))}
            <div className="flex justify-between">
              <dt className="text-white/50">Multimodal</dt>
              <dd className="text-[#10b7ba]">Yes</dd>
            </div>
          </dl>
          <p className="pt-1 text-xs font-semibold text-white">
            Model Capabilities
          </p>
          {[
            ["Reasoning", 95],
            ["Creativity", 88],
            ["Speed", 78],
          ].map(([label, pct]) => (
            <div key={String(label)} className="space-y-1">
              <div className="flex justify-between text-[11px] text-white/60">
                <span>{label}</span>
                <span className="text-white">{pct}%</span>
              </div>
              <div className="h-1 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-white/70"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.05] p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Prompt Preview</p>
            <span className="text-[11px] font-medium text-[#10b7ba]">Live</span>
          </div>
          <pre className="max-h-36 overflow-auto whitespace-pre-wrap rounded-lg bg-black/40 p-3 text-[11px] leading-4 text-white/55">
            {`// Assembled FAR Reflection™ prompt
${draft.aiPrompt.slice(0, 180)}

Model: GPT-4 Turbo · Temp: ${draft.aiTemperature} · Tokens: ${draft.aiMaxTokens}
Style: ${draft.aiResponseStyle} · Safety: Enabled`}
          </pre>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] text-white/40">
              ~420 tokens estimated
            </span>
            <Button
              variant="secondary"
              size="sm"
              className="h-7 px-2.5 text-[11px] font-medium normal-case tracking-normal"
              leftIcon={<Copy className="size-3" />}
              title="Copy prompt"
              onClick={() => {
                void navigator.clipboard.writeText(draft.aiPrompt);
                toast.success("Prompt copied");
              }}
            />
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.05] p-4">
          <p className="text-sm font-semibold text-white">
            Test AI Configuration
          </p>
          <p className="text-xs font-medium text-white/70">Sample input</p>
          <p className="rounded-lg bg-black/30 p-3 text-xs leading-5 text-white/50">
            I&apos;ve been feeling overwhelmed lately and struggling to find
            clarity in my decisions…
          </p>
          <Button
            variant="primary"
            size="sm"
            className="h-10 w-full font-medium normal-case tracking-normal"
            title="Run test prompt"
            onClick={() => {
              setTested(true);
              toast.success("Test used 1 credit · results shown below");
            }}
          />
          <p className="text-center text-[11px] text-white/35">
            Test used 1 credit · results shown below
          </p>
        </div>

        <div className="space-y-2.5 rounded-xl border border-white/10 bg-white/[0.05] p-4">
          <p className="text-sm font-semibold text-white">Step Completion</p>
          {checks.map((c) => (
            <div
              key={c.label}
              className="flex items-center justify-between text-xs"
            >
              <span className="text-white/55">{c.label}</span>
              <span className={c.ok ? "text-[#10b7ba]" : "text-white/35"}>
                {c.ok ? c.value : "Pending"}
              </span>
            </div>
          ))}
          <div className="pt-1">
            <p className="mb-1 text-[11px] text-white/50">
              Step progress {done}/5
            </p>
            <div className="h-1 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#fbbf24]"
                style={{ width: `${(done / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default StepAi;
