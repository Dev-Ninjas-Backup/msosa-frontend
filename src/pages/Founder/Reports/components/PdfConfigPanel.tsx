import { useRef, useState } from "react";
import { ChevronDown, FolderOpen, X } from "lucide-react";
import { toast } from "sonner";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { Switch } from "@/ui";
import { cn } from "@/lib/utils";
import { fieldLabelClass, panelClass, sectionLabelClass } from "../styles";
import { HEX_COLOR_RE, TYPOGRAPHY_OPTIONS, type PdfConfig } from "../data";

const MAX_LOGO_BYTES = 1024 * 1024;

const ColorField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}) => {
  const [draft, setDraft] = useState(value);
  const [synced, setSynced] = useState(value);
  if (synced !== value) {
    setSynced(value);
    setDraft(value);
  }
  const invalid = !HEX_COLOR_RE.test(draft);

  const commit = () => {
    if (invalid) {
      setDraft(value);
      return;
    }
    if (draft.toUpperCase() !== value) onChange(draft.toUpperCase());
  };

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <span className={fieldLabelClass}>{label}</span>
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg border bg-black p-2",
          invalid ? "border-[#ef4444]/60" : "border-white/10"
        )}
      >
        <label className="relative size-4 shrink-0 cursor-pointer overflow-hidden rounded" style={{ backgroundColor: value }}>
          <input
            type="color"
            aria-label={`${label} picker`}
            value={value}
            onChange={(e) => onChange(e.target.value.toUpperCase())}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </label>
        <Input
          variant="ghost"
          aria-label={`${label} hex`}
          value={draft}
          maxLength={7}
          onChange={(e) => setDraft(e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`)}
          onBlur={commit}
          onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
          containerClassName="min-w-0"
          className="h-auto! border-0! bg-transparent! p-0! text-[11px] uppercase text-white shadow-none! ring-0!"
        />
      </div>
    </div>
  );
};

const PdfConfigPanel = ({
  config,
  onChange,
  onPreview,
}: {
  config: PdfConfig;
  onChange: (patch: Partial<PdfConfig>, message?: string) => void;
  onPreview: () => void;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const onLogo = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("Logo must be an image file");
    if (file.size > MAX_LOGO_BYTES) return toast.error("Logo must be under 1 MB");
    const reader = new FileReader();
    reader.onload = () =>
      onChange({ logoName: file.name, logoUrl: String(reader.result) }, "Company logo updated");
    reader.readAsDataURL(file);
  };

  return (
    <div className={cn(panelClass, "flex flex-col gap-6 p-6")}>
      <div className="flex items-center justify-between">
        <p className={sectionLabelClass}>PDF Configuration</p>
        <button
          type="button"
          onClick={onPreview}
          className="cursor-pointer border-0 bg-transparent p-0 text-[11px] font-bold text-[#eab308] hover:underline"
        >
          Preview Styles
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <span className={fieldLabelClass}>Company Logo</span>
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileRef.current?.click()}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            onLogo(e.dataTransfer.files[0]);
          }}
          className="group relative flex h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-white/10 bg-black transition-colors hover:border-[#eab308]/40"
        >
          {config.logoUrl ? (
            <img src={config.logoUrl} alt="Company logo" className="h-8 max-w-[160px] object-contain" />
          ) : (
            <FolderOpen className="size-7 fill-[#eab308] text-[#eab308]" />
          )}
          <span className="max-w-[90%] truncate text-[10px] text-[#6b7280]">{config.logoName}</span>
          {config.logoUrl && (
            <button
              type="button"
              aria-label="Remove logo"
              onClick={(e) => {
                e.stopPropagation();
                onChange({ logoUrl: undefined, logoName: "far_logo_dark.svg" }, "Logo reset to default");
              }}
              className="absolute right-2 top-2 cursor-pointer rounded border-0 bg-white/5 p-1 text-white/50 hover:text-white"
            >
              <X className="size-3" />
            </button>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            onLogo(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ColorField
          label="Primary Color"
          value={config.primaryColor}
          onChange={(primaryColor) => onChange({ primaryColor })}
        />
        <ColorField
          label="Accent Color"
          value={config.accentColor}
          onChange={(accentColor) => onChange({ accentColor })}
        />
      </div>

      <div className="flex flex-col gap-4">
        <span className={fieldLabelClass}>Design &amp; Layout</span>
        <div className="flex flex-col gap-3">
          {(
            [
              ["watermark", "Watermark Protection"],
              ["pageNumbering", "Page Numbering"],
            ] as const
          ).map(([key, label]) => (
            <div
              key={key}
              className="flex items-center justify-between rounded-lg border border-white/5 bg-black/40 p-3"
            >
              <span className="text-xs leading-[18px] text-white">{label}</span>
              <Switch
                aria-label={label}
                checked={config[key]}
                onCheckedChange={(v) =>
                  onChange({ [key]: v }, `${label} ${v ? "enabled" : "disabled"}`)
                }
              />
            </div>
          ))}
          <div className="flex flex-col gap-2 rounded-lg border border-white/5 bg-black/40 p-3">
            <span className="text-xs leading-[18px] text-white">Typography</span>
            <Select
              variant="soft"
              options={[...TYPOGRAPHY_OPTIONS]}
              value={config.typography}
              onChange={(typography) => onChange({ typography }, "Typography updated")}
              className="h-8! border-0! bg-transparent! px-1! text-[11px] text-[#9ca3af]"
              rightIcon={<ChevronDown className="size-3.5 shrink-0 text-white/40" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfConfigPanel;
