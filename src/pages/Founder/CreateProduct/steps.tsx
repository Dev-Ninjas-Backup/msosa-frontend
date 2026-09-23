import { CloudUpload, Eye, ImageIcon, Keyboard, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import { Label } from "@/ui/Label";
import { type ProductDraft } from "./data";

type StepProps = {
  draft: ProductDraft;
  setDraft: (patch: Partial<ProductDraft>) => void;
  onOpenReflectRoom?: () => void;
};

const fieldInput =
  "h-11! rounded-lg! border-white/10! bg-white/[0.05]! px-4! text-sm placeholder:text-white/30";

const fieldTextarea =
  "rounded-lg! border-white/10! bg-white/[0.05]! px-4! py-3! text-sm placeholder:text-white/30 shadow-none";

const Field = ({
  label,
  required,
  hint,
  muted,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  muted?: boolean;
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={cn("space-y-1.5", className)}>
    <Label
      className={cn(
        "text-xs font-semibold tracking-[0.3px]",
        muted ? "text-white/30" : "text-white"
      )}
    >
      {label} {required && <span className="text-[#ef4444]">*</span>}
    </Label>
    {children}
    {hint && <p className="text-[11px] text-white/60">{hint}</p>}
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
    <div className="flex items-center gap-3 min-w-0">
      <span className="text-[#fbbf24]">{icon}</span>
      <div>
        <p className="text-[13px] font-semibold text-white">{title}</p>
        <p className="text-xs text-white/60">{description}</p>
      </div>
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={cn(
        "relative h-5 w-9 shrink-0 rounded-full border-0 px-1 transition-colors cursor-pointer",
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
  <label className="flex h-12 cursor-pointer items-center justify-between rounded-lg bg-white/[0.05] p-3">
    <span className="flex items-center gap-3">
      <span
        className="size-6 shrink-0 rounded border border-white/20"
        style={{ backgroundColor: value }}
      />
      <span className="text-sm text-white">{label}</span>
    </span>
    <span className="text-xs text-white/40">{value}</span>
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="sr-only"
      aria-label={label}
    />
  </label>
);

const pickImage = (
  file: File | undefined,
  onUrl: (url: string) => void
) => {
  if (!file) return;
  if (file.size > 4 * 1024 * 1024) return;
  onUrl(URL.createObjectURL(file));
};

const UploadBox = ({
  label,
  compact,
  preview,
  onPick,
}: {
  label: string;
  compact?: boolean;
  preview?: string;
  onPick: (file: File) => void;
}) => (
  <label
    className={cn(
      "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/10 bg-white/[0.05] text-center hover:bg-white/[0.07]",
      compact ? "h-full min-h-[88px] w-[112px] px-2" : "min-h-[88px] w-full px-4 py-4"
    )}
  >
    {preview ? (
      <img
        src={preview}
        alt=""
        className="max-h-16 w-full rounded-md object-contain"
      />
    ) : compact ? (
      <>
        <ImageIcon className="size-5 text-white/70" />
        <span className="text-xs text-white">Upload Icon</span>
      </>
    ) : (
      <>
        <CloudUpload className="size-5 text-white/70" />
        <span className="text-sm text-white">
          Drag & drop or <span className="text-[#fbbf24]">click to upload</span>
        </span>
        <span className="text-xs text-white/60">PNG, JPG, WebP — max 4MB</span>
      </>
    )}
    <input
      type="file"
      accept="image/png,image/jpeg,image/webp"
      className="sr-only"
      aria-label={label}
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) onPick(file);
      }}
    />
  </label>
);

export const StepBasic = ({ draft, setDraft }: StepProps) => (
  <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(280px,610px)]">
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <Field label="Product Name" required className="min-w-0 flex-1">
          <Input
            variant="soft"
            placeholder="Enter product name..."
            value={draft.name}
            onChange={(e) => setDraft({ name: e.target.value })}
            className={fieldInput}
          />
        </Field>
        <Field label="Product Code" required muted className="sm:w-[170px] shrink-0">
          <Input
            variant="soft"
            placeholder="e.g. PRD-009"
            value={draft.code}
            onChange={(e) => setDraft({ code: e.target.value })}
            className={fieldInput}
          />
        </Field>
      </div>

      <Field label="Description" required>
        <Textarea
          variant="soft"
          placeholder="Describe this product, its purpose, and the value it delivers to users..."
          maxLength={500}
          value={draft.description}
          onChange={(e) => setDraft({ description: e.target.value })}
          className={cn(fieldTextarea, "min-h-[104px]")}
        />
        <p className="text-right text-xs text-white/30">
          {draft.description.length} / 500 characters
        </p>
      </Field>

      <div className="flex items-stretch gap-4">
        <Field label="Product Icon">
          <UploadBox
            label="Product Icon"
            compact
            preview={draft.iconUrl}
            onPick={(file) =>
              pickImage(file, (url) => setDraft({ iconUrl: url }))
            }
          />
        </Field>
        <Field label="Cover Image">
          <UploadBox
            label="Cover Image"
            preview={draft.coverUrl}
            onPick={(file) =>
              pickImage(file, (url) => setDraft({ coverUrl: url }))
            }
          />
        </Field>
      </div>

      <div className="space-y-1.5">
        <p className="text-xs font-bold tracking-[0.7px] text-white">Colors</p>
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
    </div>

    <div className="h-fit space-y-5 rounded-xl border border-white/10 bg-black p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold uppercase text-white">
          Product Preview
        </p>
        <Eye className="size-3.5 text-white/50" />
      </div>
      <div
        className="space-y-6 overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-6"
        style={{ backgroundColor: draft.bgColor, color: draft.textColor }}
      >
        <div
          className="flex h-[90px] items-center justify-center overflow-hidden rounded-xl"
          style={{
            backgroundImage:
              "linear-gradient(103deg, rgb(26, 26, 26) 61%, rgb(13, 13, 13) 85%)",
          }}
        >
          {draft.coverUrl ? (
            <img src={draft.coverUrl} alt="" className="size-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-1 text-white">
              <ImageIcon className="size-6 opacity-70" />
              <span className="text-xs">Cover Image</span>
            </div>
          )}
        </div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/10">
              {draft.iconUrl ? (
                <img src={draft.iconUrl} alt="" className="size-full object-cover" />
              ) : (
                <ImageIcon className="size-3.5 opacity-60" />
              )}
            </span>
            <h3 className="truncate text-base font-semibold">
              {draft.name || "Product Name™"}
            </h3>
          </div>
          <span className="shrink-0 rounded-full bg-[#fbbf24]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.5px] text-[#fbbf24]">
            In Progress
          </span>
        </div>
        <p className="text-sm leading-5 opacity-60">
          {draft.description ||
            "Examine the underlying dynamics of your interpersonal connections and attachment."}
        </p>
        <div className="space-y-2.5 text-sm">
          <div className="grid grid-cols-2 gap-4 py-2.5">
            <p>
              <span className="text-white/60">Started:</span>{" "}
              <span>Oct 12, 2023</span>
            </p>
            <p>
              <span className="text-white/60 uppercase tracking-[0.25px]">
                Last Activity:
              </span>{" "}
              <span>Oct 24, 2023</span>
            </p>
          </div>
          <p>
            <span className="text-white/60 uppercase tracking-[0.25px]">
              Est. Remaining:
            </span>{" "}
            <span>~11 Minutes</span>
          </p>
        </div>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-lg font-medium cursor-default"
          style={{
            backgroundColor: draft.buttonBg,
            color: draft.buttonText,
          }}
        >
          Button <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  </div>
);

export const StepReflection = ({ draft, setDraft }: StepProps) => (
  <div className="space-y-4">
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
        className={fieldInput}
      />
    </Field>
    <Field label="Reflection Description" required>
      <Textarea
        variant="soft"
        maxLength={500}
        placeholder="Describe what this Reflection does, its structure and purpose..."
        value={draft.reflectionDescription}
        onChange={(e) => setDraft({ reflectionDescription: e.target.value })}
        className={cn(fieldTextarea, "min-h-[112px]")}
      />
      <p className="text-right text-[11px] text-white/60">
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
          className={fieldInput}
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
          className={fieldInput}
        />
      </Field>
    </div>
    <div className="space-y-3 pt-1">
      <ToggleRow
        icon={<Mic className="size-[18px]" />}
        title="Voice Support"
        description="Enable voice input and audio responses"
        on={draft.voiceSupport}
        onToggle={() => setDraft({ voiceSupport: !draft.voiceSupport })}
      />
      <ToggleRow
        icon={<Keyboard className="size-[18px]" />}
        title="Text Support"
        description="Enable text-based input and responses"
        on={draft.textSupport}
        onToggle={() => setDraft({ textSupport: !draft.textSupport })}
      />
    </div>
  </div>
);
