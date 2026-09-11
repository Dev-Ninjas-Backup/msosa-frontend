import { useRef, useState } from "react";
import { X, Upload, Info } from "lucide-react";
import Input from "@/ui/Input";
import { Label } from "@/ui/Label";
import {
  DEFAULT_SETTINGS,
  RoomSettings,
  WALLPAPER_PRESETS,
} from "./types";
import { cn } from "@/lib/utils";

type SettingsPanelProps = {
  open: boolean;
  draft: RoomSettings;
  onDraftChange: (next: RoomSettings) => void;
  onClose: () => void;
  onSave: () => void;
  onPreview: () => void;
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
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 cursor-pointer text-left relative overflow-hidden"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span
          className="size-8 rounded-lg border border-white/15 shrink-0"
          style={{ backgroundColor: value }}
        />
        <span className="text-sm text-primary-text truncate">{label}</span>
      </div>
      <span className="text-xs text-secondary-text font-mono uppercase shrink-0">
        {value}
      </span>
      {/* Visually hidden native picker — clipped inside row so it never overflows modal */}
      <input
        ref={inputRef}
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        tabIndex={-1}
        aria-label={label}
      />
    </button>
  );
};

const SettingsPanel = ({
  open,
  draft,
  onDraftChange,
  onClose,
  onSave,
  onPreview,
}: SettingsPanelProps) => {
  if (!open) return null;

  const set = <K extends keyof RoomSettings>(key: K, value: RoomSettings[K]) =>
    onDraftChange({ ...draft, [key]: value });

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6">
      <button
        type="button"
        aria-label="Close settings backdrop"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm border-0 cursor-pointer"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rr-settings-title"
        className="relative z-[1] w-full max-w-[520px] max-h-[min(92vh,900px)] overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] shadow-2xl flex flex-col"
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4 shrink-0">
          <h2
            id="rr-settings-title"
            className="text-sm font-bold tracking-[0.18em] uppercase"
            style={{ color: draft.primaryColor }}
          >
            Settings
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full border border-white/15 text-secondary-text hover:text-primary-text bg-transparent cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <div
          className="overflow-y-auto overscroll-contain px-5 py-5 space-y-6 flex-1 min-h-0"
          data-lenis-prevent
        >
          <div>
            <h3 className="text-base font-medium text-primary-text">
              Reflection Room™ Branding
            </h3>
            <p className="mt-1.5 text-sm text-secondary-text leading-relaxed">
              Customize your product&apos;s visual identity. Changes affect
              appearance only and do not modify functionality.
            </p>
          </div>

          <section className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-secondary-text uppercase">
                Wallpaper
              </p>
              <span className="text-[10px] text-secondary-text">
                JPG, PNG, WEBP
              </span>
            </div>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <img
                src={draft.wallpaper}
                alt="Wallpaper preview"
                className="h-36 w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {WALLPAPER_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => set("wallpaper", preset.url)}
                  className={cn(
                    "relative overflow-hidden rounded-lg border h-14 cursor-pointer p-0",
                    draft.wallpaper === preset.url
                      ? "border-[#FBBF24] ring-1 ring-[#FBBF24]/40"
                      : "border-white/10 hover:border-white/25"
                  )}
                  title={preset.label}
                >
                  <img
                    src={preset.url}
                    alt={preset.label}
                    className="size-full object-cover"
                  />
                </button>
              ))}
            </div>
            <label className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 text-sm text-primary-text hover:bg-white/10 cursor-pointer">
              <Upload className="size-4" />
              Upload
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  set("wallpaper", URL.createObjectURL(file));
                }}
              />
            </label>
          </section>

          <section className="space-y-3">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-secondary-text uppercase">
              Reflection Branding
            </p>
            <div className="space-y-1.5">
              <Label className="text-[11px] uppercase tracking-wider text-secondary-text">
                Product Title
              </Label>
              <Input
                variant="soft"
                value={draft.productTitle}
                onChange={(e) => set("productTitle", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] uppercase tracking-wider text-secondary-text">
                Subtitle
              </Label>
              <Input
                variant="soft"
                value={draft.subtitle}
                onChange={(e) => set("subtitle", e.target.value)}
              />
            </div>
          </section>

          <section className="space-y-3">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-secondary-text uppercase">
              Content Configuration
            </p>
            {(
              [
                ["mainText", "Main Text"],
                ["subText", "Sub Text"],
                ["instructionText", "Instruction Text"],
              ] as const
            ).map(([key, label]) => (
              <div key={key} className="space-y-1.5">
                <Label className="text-[11px] uppercase tracking-wider text-secondary-text">
                  {label}
                </Label>
                <Input
                  variant="soft"
                  value={draft[key]}
                  onChange={(e) => set(key, e.target.value)}
                />
              </div>
            ))}
          </section>

          <section className="space-y-3">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-secondary-text uppercase">
              Theme Colors
            </p>
            <ColorRow
              label="Primary Color"
              value={draft.primaryColor}
              onChange={(v) => set("primaryColor", v)}
            />
            <ColorRow
              label="Secondary Color"
              value={draft.secondaryColor}
              onChange={(v) => set("secondaryColor", v)}
            />
            <ColorRow
              label="Accent Color"
              value={draft.accentColor}
              onChange={(v) => set("accentColor", v)}
            />
          </section>

          <section className="space-y-4">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-secondary-text uppercase">
              Overlay & Readability
            </p>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-primary-text">Background Brightness</span>
                <span style={{ color: draft.primaryColor }}>
                  {draft.brightness}%
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={100}
                value={draft.brightness}
                onChange={(e) => set("brightness", Number(e.target.value))}
                className="w-full accent-[#FBBF24]"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-primary-text">Background Blur</span>
                <span style={{ color: draft.primaryColor }}>{draft.blur}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                value={draft.blur}
                onChange={(e) => set("blur", Number(e.target.value))}
                className="w-full accent-[#FBBF24]"
              />
            </div>
            <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3">
              <div>
                <p className="text-sm text-primary-text">Dark Mode</p>
                <p className="text-xs text-secondary-text mt-0.5">
                  Optimized for low-light reflection
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={draft.darkMode}
                onClick={() => set("darkMode", !draft.darkMode)}
                className={cn(
                  "relative h-7 w-12 rounded-full transition-colors border-0 cursor-pointer shrink-0",
                  draft.darkMode ? "bg-[#FBBF24]" : "bg-white/20"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 size-6 rounded-full bg-black transition-transform",
                    draft.darkMode ? "left-5" : "left-0.5"
                  )}
                />
              </button>
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-secondary-text uppercase">
                Live Preview
              </p>
              <span className="rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold px-2 py-0.5">
                REAL-TIME
              </span>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-white/10 h-36">
              <img
                src={draft.wallpaper}
                alt=""
                className="absolute inset-0 size-full object-cover"
                style={{
                  filter: `brightness(${draft.brightness / 100}) blur(${Math.min(draft.blur / 4, 6)}px)`,
                }}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-[1] flex h-full flex-col items-center justify-center text-center px-4">
                <p className="text-xs text-white/80">Welcome, Sarah.</p>
                <p className="mt-1 text-sm text-white font-medium">
                  {draft.mainText}
                </p>
                <p
                  className="mt-2 text-[10px]"
                  style={{ color: draft.primaryColor }}
                >
                  {draft.instructionText}
                </p>
              </div>
            </div>
          </section>

          <div className="rounded-xl border border-sky-500/20 bg-sky-500/10 p-3 flex gap-2.5">
            <Info className="size-4 text-sky-400 shrink-0 mt-0.5" />
            <p className="text-xs text-sky-100/90 leading-relaxed">
              Only the visual appearance is customized. The Reflection Room™
              layout, controls, workflow, and functionality remain unchanged.
            </p>
          </div>
        </div>

        <div className="shrink-0 border-t border-white/10 px-5 py-4 space-y-2 bg-[#0c0c0c]">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onSave}
              className="flex-1 h-12 rounded-xl text-black text-sm font-semibold border-0 cursor-pointer"
              style={{ backgroundColor: draft.primaryColor }}
            >
              SAVE CHANGES
            </button>
            <button
              type="button"
              onClick={onPreview}
              className="h-12 px-5 rounded-xl border border-white/15 bg-white/5 text-primary-text text-sm font-medium cursor-pointer"
            >
              Preview
            </button>
          </div>
          <button
            type="button"
            onClick={() => onDraftChange({ ...DEFAULT_SETTINGS })}
            className="w-full text-center text-xs text-secondary-text hover:text-primary-text border-0 bg-transparent cursor-pointer py-1"
          >
            Reset to defaults
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
