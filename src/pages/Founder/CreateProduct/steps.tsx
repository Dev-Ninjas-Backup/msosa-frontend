import { Eye, Keyboard, Mic, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import { Label } from "@/ui/Label";
import Button from "@/ui/Button";
import { PUBLISH_CHECKS, type ProductDraft } from "./data";

type StepProps = {
  draft: ProductDraft;
  setDraft: (patch: Partial<ProductDraft>) => void;
  onOpenReflectRoom?: () => void;
};

const Field = ({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <Label className="text-sm text-white/80">
      {label}
      {required && <span className="text-red-400">*</span>}
    </Label>
    {children}
    {hint && <p className="text-[11px] text-white/40">{hint}</p>}
  </div>
);

const ToggleRow = ({
  icon,
  title,
  description,
  on,
  onToggle,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  on: boolean;
  onToggle: () => void;
}) => (
  <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.05] p-4">
    <div className="flex items-start gap-3 min-w-0">
      <span className="mt-0.5 text-[#fbbf24]">{icon}</span>
      <div>
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-xs text-white/45">{description}</p>
      </div>
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={cn(
        "relative h-5 w-10 shrink-0 rounded-full border-0 transition-colors cursor-pointer",
        on ? "bg-[#fbbf24]" : "bg-white/15"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-4 rounded-full bg-white transition-transform",
          on ? "left-5" : "left-0.5"
        )}
      />
    </button>
  </div>
);

const ColorSwatch = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="space-y-1.5">
    <p className="text-xs text-white/60">{label}</p>
    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-2 py-1.5">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="size-8 cursor-pointer rounded border-0 bg-transparent p-0"
        aria-label={label}
      />
      <Input
        variant="soft"
        inputSize="sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-0! bg-transparent! shadow-none! px-1!"
      />
    </div>
  </div>
);

export const StepBasic = ({ draft, setDraft }: StepProps) => (
  <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
    <div className="space-y-4">
      <Field label="Product Name" required>
        <Input
          variant="soft"
          placeholder="Enter product name..."
          value={draft.name}
          onChange={(e) => setDraft({ name: e.target.value })}
        />
      </Field>
      <Field label="Product Code" required>
        <Input
          variant="soft"
          placeholder="e.g. PRD-009"
          value={draft.code}
          onChange={(e) => setDraft({ code: e.target.value })}
        />
      </Field>
      <Field label="Description" required>
        <Textarea
          variant="soft"
          placeholder="Describe the product…"
          maxLength={500}
          value={draft.description}
          onChange={(e) => setDraft({ description: e.target.value })}
          className="min-h-28"
        />
        <p className="text-[11px] text-white/40 text-right">
          {draft.description.length} / 500 characters
        </p>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Product Icon">
          <div className="flex size-20 items-center justify-center rounded-lg border border-dashed border-white/20 bg-black/30 text-white/40">
            <Upload className="size-5" />
          </div>
        </Field>
        <Field label="Cover Image">
          <div className="flex min-h-20 items-center justify-center rounded-lg border border-dashed border-white/20 bg-black/30 px-3 text-center text-[11px] text-white/45">
            Drag & drop or click to upload. PNG, JPG, WebP — max 4MB
          </div>
        </Field>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <ColorSwatch
          label="Background Color"
          value={draft.bgColor}
          onChange={(v) => setDraft({ bgColor: v })}
        />
        <ColorSwatch
          label="Text Color"
          value={draft.textColor}
          onChange={(v) => setDraft({ textColor: v })}
        />
        <ColorSwatch
          label="Button Background Color"
          value={draft.buttonBg}
          onChange={(v) => setDraft({ buttonBg: v })}
        />
        <ColorSwatch
          label="Button Text Color"
          value={draft.buttonText}
          onChange={(v) => setDraft({ buttonText: v })}
        />
      </div>
    </div>

    <div className="rounded-xl border border-white/10 bg-black/40 p-4 h-fit">
      <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-wide text-white/50">
        <Eye className="size-3.5" /> Product Preview
      </div>
      <div
        className="overflow-hidden rounded-xl border border-white/10"
        style={{ backgroundColor: draft.bgColor, color: draft.textColor }}
      >
        <div className="flex h-28 items-center justify-center bg-white/5 text-xs opacity-50">
          Cover image
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold">
              {draft.name || "Product name"}
            </h3>
            <span className="rounded-full bg-[#fbbf24]/20 px-2 py-0.5 text-[10px] font-bold text-[#fbbf24]">
              IN PROGRESS
            </span>
          </div>
          <p className="text-xs opacity-70 line-clamp-3">
            {draft.description ||
              "Product description will appear here as you type."}
          </p>
          <div className="grid grid-cols-3 gap-2 text-[10px] uppercase tracking-wide opacity-60">
            <span>Started: Oct 12, 2023</span>
            <span>Last activity: Oct 24, 2023</span>
            <span>Est. remaining: ~11 Min</span>
          </div>
          <button
            type="button"
            className="w-full rounded-lg py-2.5 text-sm font-semibold cursor-default"
            style={{
              backgroundColor: draft.buttonBg,
              color: draft.buttonText,
            }}
          >
            Button →
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const StepReflection = ({
  draft,
  setDraft,
  onOpenReflectRoom,
}: StepProps) => (
  <div className="space-y-4 max-w-3xl">
    <p className="text-sm text-white/55">
      Configure Reflection parameters, completion rules and delivery settings.
    </p>
    <Field
      label="Reflection Name"
      required
      hint="The public-facing name of this Reflection"
    >
      <Input
        variant="soft"
        placeholder="e.g. 30-Day Reflection Journey"
        value={draft.reflectionName}
        onChange={(e) => setDraft({ reflectionName: e.target.value })}
      />
    </Field>
    <Field label="Reflection Description" required>
      <Textarea
        variant="soft"
        maxLength={500}
        placeholder="Describe the reflection experience…"
        value={draft.reflectionDescription}
        onChange={(e) => setDraft({ reflectionDescription: e.target.value })}
        className="min-h-28"
      />
      <p className="text-[11px] text-white/40 text-right">
        {draft.reflectionDescription.length} / 500 characters
      </p>
    </Field>
    <div className="grid gap-4 sm:grid-cols-2">
      <Field
        label="Reflection Version"
        required
        hint="Semantic versioning recommended"
      >
        <Input
          variant="soft"
          placeholder="e.g. 1.0.0"
          value={draft.reflectionVersion}
          onChange={(e) => setDraft({ reflectionVersion: e.target.value })}
        />
      </Field>
      <Field
        label="Estimated Duration"
        required
        hint="Total time to complete this Reflection"
      >
        <Input
          variant="soft"
          placeholder="e.g. 30 Days"
          value={draft.estimatedDuration}
          onChange={(e) => setDraft({ estimatedDuration: e.target.value })}
        />
      </Field>
    </div>
    <div className="space-y-3 pt-2">
      <ToggleRow
        icon={<Mic className="size-4" />}
        title="Voice Support"
        description="Enable voice input and audio responses"
        on={draft.voiceSupport}
        onToggle={() => setDraft({ voiceSupport: !draft.voiceSupport })}
      />
      <ToggleRow
        icon={<Keyboard className="size-4" />}
        title="Text Support"
        description="Enable text-based input and responses"
        on={draft.textSupport}
        onToggle={() => setDraft({ textSupport: !draft.textSupport })}
      />
    </div>
    {onOpenReflectRoom && (
      <Button
        variant="outline"
        size="md"
        className="mt-2"
        title="Open Reflection Room™"
        leftIcon={<Mic className="size-4" />}
        onClick={onOpenReflectRoom}
      />
    )}
  </div>
);

export const StepProtocol = ({ draft, setDraft }: StepProps) => (
  <div className="space-y-4 max-w-3xl">
    <p className="text-sm text-white/55">
      Attach a Founder Protocol™ that governs reflection cadence and review.
    </p>
    <Field label="Protocol Name" required>
      <Input
        variant="soft"
        placeholder="e.g. Relational Insight Protocol™"
        value={draft.protocolName}
        onChange={(e) => setDraft({ protocolName: e.target.value })}
      />
    </Field>
    <Field label="Protocol Summary" required>
      <Textarea
        variant="soft"
        placeholder="Summarize protocol intent and review rules…"
        value={draft.protocolSummary}
        onChange={(e) => setDraft({ protocolSummary: e.target.value })}
        className="min-h-28"
      />
    </Field>
  </div>
);

export const StepWorkflow = ({ draft, setDraft }: StepProps) => (
  <div className="space-y-4 max-w-3xl">
    <p className="text-sm text-white/55">
      Define the operational pathway users travel through this product.
    </p>
    <Field label="Workflow Name" required>
      <Input
        variant="soft"
        placeholder="e.g. Clarity Pathway"
        value={draft.workflowName}
        onChange={(e) => setDraft({ workflowName: e.target.value })}
      />
    </Field>
    <Field label="Workflow Steps" required hint="Use arrows to separate stages">
      <Textarea
        variant="soft"
        placeholder="Intake → Reflect → Review → Report → Continuum"
        value={draft.workflowSteps}
        onChange={(e) => setDraft({ workflowSteps: e.target.value })}
        className="min-h-24"
      />
    </Field>
  </div>
);

export const StepAi = ({ draft, setDraft }: StepProps) => (
  <div className="space-y-4 max-w-3xl">
    <p className="text-sm text-white/55">
      Configure AI model, prompts and behavior parameters for this product.
    </p>
    <Field label="AI Model" required>
      <Input
        variant="soft"
        value={draft.aiModel}
        onChange={(e) => setDraft({ aiModel: e.target.value })}
      />
    </Field>
    <Field label="System Prompt" required>
      <Textarea
        variant="soft"
        placeholder="Guide tone, boundaries, and insight style…"
        value={draft.aiPrompt}
        onChange={(e) => setDraft({ aiPrompt: e.target.value })}
        className="min-h-32"
      />
    </Field>
  </div>
);

export const StepReports = ({ draft, setDraft }: StepProps) => (
  <div className="space-y-4 max-w-3xl">
    <p className="text-sm text-white/55">
      Choose report templates ready for data collection and delivery.
    </p>
    <Field label="Report Template" required>
      <Input
        variant="soft"
        placeholder="e.g. Standard Narrative"
        value={draft.reportTemplate}
        onChange={(e) => setDraft({ reportTemplate: e.target.value })}
      />
    </Field>
  </div>
);

export const StepDashboard = ({ draft, setDraft }: StepProps) => (
  <div className="space-y-4 max-w-3xl">
    <p className="text-sm text-white/55">
      Select dashboard widgets and layout for this product experience.
    </p>
    <Field label="Dashboard Layout" required>
      <Input
        variant="soft"
        placeholder="e.g. Consumer Default"
        value={draft.dashboardLayout}
        onChange={(e) => setDraft({ dashboardLayout: e.target.value })}
      />
    </Field>
  </div>
);

export const StepPermissions = ({ draft, setDraft }: StepProps) => (
  <div className="space-y-4 max-w-3xl">
    <p className="text-sm text-white/55">
      Define user roles, access levels and permission sets.
    </p>
    <Field label="Roles" required>
      <Input
        variant="soft"
        placeholder="Consumer, Founder"
        value={draft.roles}
        onChange={(e) => setDraft({ roles: e.target.value })}
      />
    </Field>
    <Field label="Access Level" required>
      <Input
        variant="soft"
        placeholder="Assigned Users"
        value={draft.accessLevel}
        onChange={(e) => setDraft({ accessLevel: e.target.value })}
      />
    </Field>
  </div>
);

export const StepPricing = ({ draft, setDraft }: StepProps) => (
  <div className="space-y-4 max-w-3xl">
    <p className="text-sm text-white/55">
      Configure pricing model, tiers and billing fields.
    </p>
    <div className="grid gap-4 sm:grid-cols-3">
      <Field label="Price (USD)" required>
        <Input
          variant="soft"
          type="number"
          min={0}
          value={draft.price}
          onChange={(e) => setDraft({ price: e.target.value })}
        />
      </Field>
      <Field label="Billing Cycle" required>
        <Input
          variant="soft"
          value={draft.billingCycle}
          onChange={(e) => setDraft({ billingCycle: e.target.value })}
        />
      </Field>
      <Field label="Tier" required>
        <Input
          variant="soft"
          value={draft.tier}
          onChange={(e) => setDraft({ tier: e.target.value })}
        />
      </Field>
    </div>
  </div>
);

export const StepPublish = ({ draft }: { draft: ProductDraft }) => (
  <div className="space-y-5 max-w-3xl">
    <p className="text-sm text-white/55">
      Review your product and publish it to the platform.
    </p>
    <div className="rounded-xl border border-white/10 bg-white/[0.05] p-5 space-y-3">
      <h3 className="text-sm font-semibold text-white">Product Review Summary</h3>
      <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2.5">
        <p className="text-sm font-medium text-white">
          {draft.name || "Untitled Product"}{" "}
          <span className="text-white/40">· {draft.code || "—"}</span>
        </p>
        <p className="text-xs text-white/50 mt-1 line-clamp-2">
          {draft.description || "No description yet."}
        </p>
        <p className="text-xs text-[#fbbf24] mt-2">
          ${draft.price || "0"} · {draft.billingCycle} · {draft.tier}
        </p>
      </div>
      {PUBLISH_CHECKS.map((c) => (
        <div
          key={c.title}
          className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5"
        >
          <span className="mt-0.5 text-[#10b7ba]">✓</span>
          <div>
            <p className="text-sm font-medium text-white">{c.title}</p>
            <p className="text-xs text-white/45">{c.body}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
