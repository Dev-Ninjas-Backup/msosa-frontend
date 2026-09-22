import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { Label } from "@/ui/Label";
import { cn } from "@/lib/utils";
import {
  DEFAULT_WIDGET_COLORS,
  type WidgetInstance,
} from "./data";

type EditWidgetPanelProps = {
  open: boolean;
  widget: WidgetInstance | null;
  onClose: () => void;
  onApply: (next: WidgetInstance) => void;
};

const COLOR_FIELDS: {
  key: keyof WidgetInstance["colors"];
  label: string;
}[] = [
  { key: "background", label: "Background Color" },
  { key: "title", label: "Title Text Color" },
  { key: "description", label: "Description Text Color" },
  { key: "buttonBg", label: "Button Background Color" },
  { key: "buttonText", label: "Button Text Color" },
];

const DATA_SOURCES = [
  "Historical Emotional Analysis (HE-A)",
  "Platform Metrics",
  "Business Analytics",
  "Product Metrics",
  "Activity Feed",
  "MOVR™ AI",
];

/** Figma 1336:64534 — Widget Configuration Panel (centered modal) */
const EditWidgetPanel = ({
  open,
  widget,
  onClose,
  onApply,
}: EditWidgetPanelProps) => {
  const [draft, setDraft] = useState<WidgetInstance | null>(null);

  useEffect(() => {
    if (open && widget) setDraft({ ...widget, colors: { ...widget.colors } });
  }, [open, widget]);

  if (!open || !draft) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <button
        type="button"
        aria-label="Close panel"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm border-0 cursor-pointer"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-[600px] my-4 overflow-hidden rounded-[32px] border border-primary-text/10 bg-black shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between gap-4 border-b border-primary-text/[0.08] p-8">
          <div className="min-w-0">
            <p className="text-[12px] font-bold uppercase tracking-[2.4px] text-button-bg leading-4">
              Configuration
            </p>
            <h2 className="mt-1 font-playfair text-2xl text-primary-text leading-8 truncate">
              {draft.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-full border border-border bg-primary-text/10 text-secondary-text hover:text-primary-text cursor-pointer shrink-0"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-10 p-8 bg-primary-text/[0.05] max-h-[min(70vh,820px)] overflow-y-auto">
          <div className="flex flex-col items-center gap-2.5 rounded-xl border border-dashed border-primary-text/30 px-5 py-[30px] text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-primary-text/10 text-secondary-text">
              <Upload className="size-4" />
            </span>
            <p className="text-lg font-medium text-primary-text">Add Icon</p>
            <p className="text-sm text-secondary-text max-w-[255px]">
              PNG, JPG, and SVG. Files must not exceed 2 MB.
            </p>
          </div>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-4 w-1 rounded-full bg-button-bg" />
              <h3 className="text-sm font-bold uppercase tracking-[0.7px] text-primary-text">
                Visibility & Access
              </h3>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-primary-text/5 p-4">
              <div>
                <p className="text-sm font-medium text-primary-text">
                  Enable Widget
                </p>
                <p className="text-xs text-[#a1a1aa] mt-0.5">
                  Display this module on your primary dashboard.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={draft.enabled}
                onClick={() =>
                  setDraft((p) => (p ? { ...p, enabled: !p.enabled } : p))
                }
                className={cn(
                  "relative h-5 w-9 rounded-full transition-colors cursor-pointer border-0",
                  draft.enabled ? "bg-button-bg" : "bg-primary-text/20"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 size-3.5 rounded-full bg-black transition-all",
                    draft.enabled ? "right-0.5" : "left-0.5"
                  )}
                />
              </button>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-4 w-1 rounded-full bg-button-bg" />
              <h3 className="text-sm font-bold uppercase tracking-[0.7px] text-primary-text">
                Content Configuration
              </h3>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-[1px] text-[#a1a1aa]">
                  Widget Title
                </Label>
                <Input
                  value={draft.title}
                  onChange={(e) =>
                    setDraft((p) => (p ? { ...p, title: e.target.value } : p))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-[1px] text-[#a1a1aa]">
                  Primary Data Source
                </Label>
                <select
                  value={draft.dataSource}
                  onChange={(e) =>
                    setDraft((p) =>
                      p ? { ...p, dataSource: e.target.value } : p
                    )
                  }
                  className="w-full h-11 rounded-lg border border-border bg-primary-text/5 px-4 text-sm text-primary-text outline-none"
                >
                  {DATA_SOURCES.map((s) => (
                    <option key={s} value={s} className="bg-primary-bg">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(
                  [
                    ["showProgress", "Show Progress Bar"],
                    ["enableAi", "Enable AI Insights"],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() =>
                      setDraft((p) => (p ? { ...p, [key]: !p[key] } : p))
                    }
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-4 py-2.5 text-left cursor-pointer",
                      draft[key]
                        ? "border-border bg-primary-text/5"
                        : "border-border bg-primary-text/5"
                    )}
                  >
                    <span
                      className={cn(
                        "size-4 rounded-[2.5px] border border-border shrink-0",
                        draft[key] ? "bg-button-bg border-button-bg" : "bg-transparent"
                      )}
                    />
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        draft[key] && key === "enableAi"
                          ? "text-button-bg"
                          : "text-primary-text"
                      )}
                    >
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-4 w-1 rounded-full bg-button-bg" />
              <h3 className="text-sm font-bold uppercase tracking-[0.7px] text-primary-text">
                Widget Theme Colors
              </h3>
            </div>
            <div className="space-y-3">
              {COLOR_FIELDS.map((field) => (
                <label
                  key={field.key}
                  className="relative flex items-center justify-between gap-3 rounded-lg bg-primary-text/5 p-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="size-6 rounded border border-primary-text/20 shrink-0"
                      style={{ backgroundColor: draft.colors[field.key] }}
                    />
                    <span className="text-sm text-primary-text truncate">
                      {field.label}
                    </span>
                  </div>
                  <span className="text-xs text-primary-text/40 font-mono uppercase">
                    {draft.colors[field.key]}
                  </span>
                  <input
                    type="color"
                    value={draft.colors[field.key].slice(0, 7)}
                    onChange={(e) =>
                      setDraft((p) =>
                        p
                          ? {
                              ...p,
                              colors: {
                                ...p.colors,
                                [field.key]: e.target.value,
                              },
                            }
                          : p
                      )
                    }
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </section>
        </div>

        <div className="flex gap-2 p-8">
          <button
            type="button"
            className="flex-1 h-[54px] rounded-xl border border-primary-text/10 bg-primary-text/10 text-lg font-medium text-primary-text tracking-[0.35px] cursor-pointer"
            onClick={() =>
              setDraft((p) =>
                p
                  ? {
                      ...p,
                      colors: { ...DEFAULT_WIDGET_COLORS },
                      enabled: true,
                      showProgress: true,
                      enableAi: false,
                    }
                  : p
              )
            }
          >
            Reset to Default
          </button>
          <Button
            type="button"
            variant="primary"
            className="flex-1 h-[54px]! rounded-xl! text-lg! font-medium! tracking-[0.35px]!"
            onClick={() => onApply(draft)}
          >
            Apply Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditWidgetPanel;
