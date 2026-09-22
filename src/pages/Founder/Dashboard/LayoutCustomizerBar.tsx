import layersIcon from "./assets/layout-layers.svg";

type LayoutCustomizerBarProps = {
  onCancel: () => void;
  onResume: () => void;
  /** When true, bar fills the sticky header row (Figma Edit Dashboard). */
  embedded?: boolean;
};

/** Figma 1336:64646 — Layout Customizer top bar */
const LayoutCustomizerBar = ({
  onCancel,
  onResume,
  embedded = false,
}: LayoutCustomizerBarProps) => {
  return (
    <div
      className={
        embedded
          ? "flex flex-wrap items-center justify-between gap-3 sm:gap-4 w-full"
          : "sticky top-0 z-50 mb-5 border border-border bg-card shadow-[0_4px_24px_rgba(0,0,0,0.45)] px-4 sm:px-6 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-3 sm:gap-4 rounded-none"
      }
    >
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-primary-text/10 shrink-0">
          <img
            src={layersIcon}
            alt=""
            className="w-[18px] h-4 object-contain opacity-90"
          />
        </span>
        <div className="min-w-0 flex flex-col gap-1">
          <p className="text-sm font-bold uppercase tracking-[1.2px] text-primary-text leading-none">
            Layout Customizer
          </p>
          <p className="text-sm font-light text-secondary-text truncate leading-none">
            Founder • Dashboard Framework™
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
        <button
          type="button"
          onClick={onCancel}
          className="h-11 sm:h-[54px] px-5 sm:px-10 rounded-xl text-base sm:text-lg font-medium tracking-[0.35px] text-secondary-text hover:text-primary-text border-0 bg-transparent cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onResume}
          className="h-11 sm:h-[54px] min-w-[140px] sm:min-w-[244px] px-6 sm:px-10 rounded-xl bg-button-bg text-base sm:text-lg font-medium tracking-[0.35px] text-black hover:opacity-95 cursor-pointer border-0"
        >
          RESUME NOW
        </button>
      </div>
    </div>
  );
};

export default LayoutCustomizerBar;
