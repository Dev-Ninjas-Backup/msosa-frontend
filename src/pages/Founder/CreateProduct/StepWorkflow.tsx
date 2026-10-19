import { GitBranch, GripVertical, Lock, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import {
  COMPLETION_TRIGGERS,
  DEFAULT_JOURNEY,
  JOURNEY_TAG_TONE,
  type JourneyStep,
  type ProductDraft,
} from "./data";

type StepWorkflowProps = {
  draft: ProductDraft;
  setDraft: (patch: Partial<ProductDraft>) => void;
};

const lockedIds = new Set(DEFAULT_JOURNEY.map((step) => step.id));

const StepWorkflow = ({ draft, setDraft }: StepWorkflowProps) => {
  const steps = draft.workflowJourney;

  const updateStep = (id: string, name: string) => {
    setDraft({
      workflowJourney: steps.map((s) => (s.id === id ? { ...s, name } : s)),
      workflowSteps: steps
        .map((s) => (s.id === id ? name : s.name))
        .join(" → "),
    });
  };

  const removeStep = (id: string) => {
    const journey = steps.filter((step) => step.id !== id);
    setDraft({
      workflowJourney: journey,
      workflowSteps: journey.map((step) => step.name).join(" → "),
    });
  };

  const addStep = () => {
    const next: JourneyStep = {
      id: String(Date.now()),
      name: "New Step",
      tag: "Content",
    };
    const journey = [...steps, next];
    setDraft({
      workflowJourney: journey,
      workflowSteps: journey.map((s) => s.name).join(" → "),
    });
  };

  return (
    <div className="space-y-5">
      <div className="space-y-5 rounded-xl border border-white/10 bg-white/[0.05] p-5">
        <p className="text-sm font-bold tracking-[0.35px] text-white">
          Workflow Journey
        </p>
        <div>
          {steps.map((step, i) => (
            <div key={step.id}>
              <div className="flex items-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.05] px-3 py-2.5">
                <GripVertical className="size-3.5 shrink-0 text-white/40" />
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-[#fbbf24]/30 bg-[#fbbf24]/15 text-[11px] font-bold text-[#fbbf24]">
                  {i + 1}
                </span>
                <Input
                  variant="soft"
                  value={step.name}
                  onChange={(e) => updateStep(step.id, e.target.value)}
                  className="h-7! min-w-0 flex-1 rounded-none! border-0! bg-transparent! px-0! text-[13px] font-semibold shadow-none"
                  aria-label={`Step ${i + 1} name`}
                />
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                    JOURNEY_TAG_TONE[step.tag] ?? "bg-white/10 text-white/70"
                  )}
                >
                  {step.tag}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] text-white">
                  <GitBranch className="size-2.5" />
                  Condition
                </span>
                {lockedIds.has(step.id) ? (
                  <span className="flex size-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.05] text-white/50">
                    <Lock className="size-3" />
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => removeStep(step.id)}
                    className="flex size-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.05] text-white/50 hover:border-red-400/40 hover:text-red-400 cursor-pointer"
                    aria-label={`Delete ${step.name}`}
                  >
                    <Trash2 className="size-3" />
                  </button>
                )}
              </div>
              {i < steps.length - 1 && (
                <div className="flex flex-col items-center py-1">
                  <span className="h-3.5 w-px bg-white/60" />
                  <span className="text-[8px] leading-none text-white/50">▾</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addStep}
          className="flex w-full items-center justify-center gap-2 rounded-[10px] border-2 border-dashed border-[#fbbf24]/25 bg-[#fbbf24]/[0.02] px-4 py-3 text-[13px] font-semibold text-[#fbbf24] hover:bg-[#fbbf24]/5 cursor-pointer"
        >
          <Plus className="size-3.5" />
          Add Step
        </button>
      </div>

      <div className="space-y-5 rounded-xl border border-white/10 bg-white/[0.05] p-5">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-md bg-[#fbbf24]/12 text-[#fbbf24]">
            <GitBranch className="size-3" />
          </span>
          <p className="text-sm font-bold tracking-[0.35px] text-white">
            Completion Logic
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              {
                id: "all" as const,
                title: "All Steps Required",
                body: "Every step must be completed before marking as done.",
              },
              {
                id: "conditional" as const,
                title: "Conditional Completion",
                body: "Define custom conditions for workflow completion.",
              },
            ] as const
          ).map((opt) => {
            const on = draft.completionLogic === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setDraft({ completionLogic: opt.id })}
                className={cn(
                  "flex items-center gap-3 rounded-[10px] border border-white/10 bg-white/[0.05] p-4 text-left cursor-pointer",
                  on && "shadow-[0_0_12px_rgba(212,168,84,0.1)]"
                )}
              >
                <span
                  className={cn(
                    "flex size-[18px] shrink-0 items-center justify-center rounded-full border-2",
                    on ? "border-[#fbbf24] bg-[#fbbf24]" : "border-white"
                  )}
                >
                  {on && <span className="size-1.5 rounded-full bg-black" />}
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-white">
                    {opt.title}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-white/60">
                    {opt.body}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <div className="space-y-1.5">
          <p className="text-xs font-semibold tracking-[0.3px] text-white">
            Completion Trigger
          </p>
          <Select
            variant="soft"
            placeholder="Select trigger"
            options={COMPLETION_TRIGGERS}
            value={draft.completionTrigger}
            onChange={(v) => setDraft({ completionTrigger: v })}
          />
          <p className="text-[11px] text-white/60">
            Choose what triggers the final completion state of this product
            workflow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepWorkflow;
