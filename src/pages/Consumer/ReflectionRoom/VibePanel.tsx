import { Check, Music2, X } from "lucide-react";
import { Language, VibeId, VIBES } from "./types";
import { cn } from "@/lib/utils";

type VibePanelProps = {
  open: boolean;
  language: Language;
  selected: VibeId;
  primaryColor: string;
  onSelect: (id: VibeId) => void;
  onClose: () => void;
};

const VibePanel = ({
  open,
  language,
  selected,
  primaryColor,
  onSelect,
  onClose,
}: VibePanelProps) => {
  if (!open) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close vibe panel"
        className="fixed inset-0 z-[50] bg-black/40 border-0 cursor-pointer"
        onClick={onClose}
      />
      <div className="fixed left-4 sm:left-8 top-1/2 -translate-y-1/2 z-[55] w-[min(100%-2rem,360px)] rounded-2xl border border-white/15 bg-black/80 backdrop-blur-xl p-4 sm:p-5 shadow-2xl">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span
              className="flex size-9 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${primaryColor}22`, color: primaryColor }}
            >
              <Music2 className="size-4" />
            </span>
            <div>
              <p className="text-sm font-medium text-primary-text">
                {language === "en" ? "Music / Vibe" : "Música / Ambiente"}
              </p>
              <p className="text-xs text-secondary-text">
                {language === "en"
                  ? "Set the mood: Focus, calm, or inspire."
                  : "Elige el ánimo."}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-secondary-text hover:text-primary-text border-0 bg-transparent cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-2">
          {VIBES.map((vibe) => {
            const active = selected === vibe.id;
            return (
              <button
                key={vibe.id}
                type="button"
                onClick={() => {
                  onSelect(vibe.id);
                  onClose();
                }}
                className={cn(
                  "w-full text-left rounded-xl border px-4 py-3 transition-colors cursor-pointer",
                  active
                    ? "bg-white/10"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                )}
                style={
                  active
                    ? { borderColor: primaryColor }
                    : undefined
                }
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-primary-text">
                      {language === "en" ? vibe.label : vibe.labelEs}
                    </p>
                    <p className="text-xs text-secondary-text mt-0.5">
                      {vibe.description}
                    </p>
                  </div>
                  {active && (
                    <Check className="size-4 shrink-0" style={{ color: primaryColor }} />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default VibePanel;
