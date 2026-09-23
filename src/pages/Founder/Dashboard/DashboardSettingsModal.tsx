import { useEffect, useRef, useState } from "react";
import { Info, X } from "lucide-react";
import { toast } from "sonner";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { Label } from "@/ui/Label";
import Textarea from "@/ui/Textarea";
import {
  DEFAULT_DASHBOARD_THEME,
  pickDashboardThemeColors,
  THEME_COLOR_FIELDS,
  type DashboardTheme,
  type DashboardThemeColors,
} from "@/lib/dashboardTheme";
import { cn } from "@/lib/utils";

type DashboardSettingsModalProps = {
  open: boolean;
  initial: DashboardTheme;
  onClose: () => void;
  onPreview: (colors: DashboardThemeColors) => void;
  onSave: (theme: DashboardTheme) => void;
  onCancelPreview: () => void;
};

const toColorInputValue = (value: string) => {
  if (value.startsWith("#") && value.length >= 7) return value.slice(0, 7);
  return "#303030";
};

const ColorRow = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => {
  return (
    <label className="relative flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-primary-bg/40 px-3 py-2.5 text-left cursor-pointer hover:border-border-active/40 transition-colors">
      <div className="flex items-center gap-3 min-w-0 pointer-events-none">
        <span
          className="size-6 rounded-md border border-border shrink-0"
          style={{ backgroundColor: value }}
        />
        <span className="text-sm text-primary-text truncate">{label}</span>
      </div>
      <span className="text-xs text-secondary-text uppercase shrink-0 font-mono pointer-events-none">
        {value}
      </span>
      <input
        type="color"
        value={toColorInputValue(value)}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label={label}
      />
    </label>
  );
};

const DashboardSettingsModal = ({
  open,
  initial,
  onClose,
  onPreview,
  onSave,
  onCancelPreview,
}: DashboardSettingsModalProps) => {
  const [draft, setDraft] = useState<DashboardTheme>(initial);
  const savedOnCloseRef = useRef(false);

  useEffect(() => {
    if (open) {
      savedOnCloseRef.current = false;
      setDraft(initial);
    }
  }, [open, initial]);

  // Real-time: push draft colors to :root while modal open
  useEffect(() => {
    if (!open) return;
    onPreview(pickDashboardThemeColors(draft));
  }, [draft, open, onPreview]);

  if (!open) return null;

  const updateColor = <K extends keyof DashboardThemeColors>(
    key: K,
    value: DashboardThemeColors[K]
  ) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleClose = () => {
    if (!savedOnCloseRef.current) {
      onCancelPreview();
    }
    onClose();
  };

  const handlePreview = () => {
    onPreview(pickDashboardThemeColors(draft));
    toast.success("Theme preview applied");
  };

  const handleSave = () => {
    savedOnCloseRef.current = true;
    onSave(draft);
    toast.success("Dashboard theme saved");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close settings"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm border-0 cursor-pointer"
        onClick={handleClose}
      />
      <div
        role="dialog"
        aria-modal
        aria-labelledby="dashboard-settings-title"
        className="relative z-10 w-full max-w-[504px] max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-card px-6 py-5">
          <h2
            id="dashboard-settings-title"
            className="font-playfair text-xl text-primary-text"
          >
            Settings
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="flex size-8 items-center justify-center rounded-lg border-0 bg-white/5 text-secondary-text hover:text-primary-text cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-8 px-6 py-6">
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-primary-text">
              Dashboard Branding
            </h3>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-semibold uppercase tracking-wide text-secondary-text">
                  Dashboard Title
                </Label>
                <Input
                  value={draft.title}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, title: e.target.value }))
                  }
                  className="bg-primary-bg/50"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-semibold uppercase tracking-wide text-secondary-text">
                  Dashboard Subtitle
                </Label>
                <Textarea
                  value={draft.subtitle}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, subtitle: e.target.value }))
                  }
                  rows={2}
                  className="bg-primary-bg/50 resize-none"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-primary-text">
              Theme Colors
            </h3>
            <div className="space-y-2">
              {THEME_COLOR_FIELDS.map((field) => (
                <ColorRow
                  key={field.key}
                  label={field.label}
                  value={draft[field.key]}
                  onChange={(v) => updateColor(field.key, v)}
                />
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-primary-bg/40 p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-secondary-text">
                Live Preview
              </p>
              <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[10px] font-medium text-accent">
                Real-time
              </span>
            </div>
            <div
              className="rounded-lg border p-3 space-y-2"
              style={{
                backgroundColor: draft.dashboardBackground,
                borderColor: draft.cardBorder,
              }}
            >
              <p
                className="text-sm font-medium truncate"
                style={{ color: draft.titleText }}
              >
                {draft.title || DEFAULT_DASHBOARD_THEME.title}
              </p>
              <p
                className="text-[11px] line-clamp-2"
                style={{ color: draft.descriptionText }}
              >
                {draft.subtitle || DEFAULT_DASHBOARD_THEME.subtitle}
              </p>
              <div className="grid grid-cols-3 gap-2 pt-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-12 rounded-md border"
                    style={{
                      backgroundColor: draft.cardBackground,
                      borderColor: draft.cardBorder,
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-2 pt-1">
                <span
                  className="inline-flex h-7 items-center rounded-md px-3 text-[11px] font-semibold"
                  style={{
                    backgroundColor: draft.buttonBackground,
                    color: draft.buttonText,
                  }}
                >
                  Save
                </span>
                <span
                  className="h-1.5 flex-1 self-center rounded-full"
                  style={{ backgroundColor: draft.accent }}
                />
              </div>
            </div>
          </section>

          <div
            className={cn(
              "flex gap-3 rounded-xl border border-border bg-primary-bg/30 px-3 py-3 text-xs text-secondary-text"
            )}
          >
            <Info className="size-4 shrink-0 text-muted-blue mt-0.5" />
            <p>
              Only the visual appearance is customized. Layout, controls,
              workflow, and functionality remain unchanged.
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-border bg-card px-6 py-4">
          <Button type="button" variant="secondary" size="sm" onClick={handlePreview}>
            Preview
          </Button>
          <Button type="button" variant="primary" size="sm" onClick={handleSave} >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettingsModal;
