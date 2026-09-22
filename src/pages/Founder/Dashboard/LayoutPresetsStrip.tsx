import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import gearIcon from "./assets/layout-gear.svg";
import gearMutedIcon from "./assets/layout-gear-muted.svg";

export type LayoutPresetId =
  | "dashboard-1"
  | "dashboard-2"
  | "dashboard-3"
  | "dashboard-4";

type LayoutPresetsStripProps = {
  selected: LayoutPresetId;
  onSelect: (id: LayoutPresetId) => void;
};

const PRESETS: {
  id: LayoutPresetId;
  label: string;
  preview: "one" | "two" | "three" | "four";
}[] = [
  { id: "dashboard-1", label: "Dashboard 1", preview: "one" },
  { id: "dashboard-2", label: "Dashboard 2", preview: "two" },
  { id: "dashboard-3", label: "Dashboard 3", preview: "three" },
  { id: "dashboard-4", label: "Dashboard 4", preview: "four" },
];

const Block = ({
  active,
  className,
}: {
  active: boolean;
  className?: string;
}) => (
  <div
    className={cn(
      "rounded-[7px]",
      active ? "bg-primary-text" : "bg-primary-text/10",
      className
    )}
  />
);

const Preview = ({
  kind,
  active,
}: {
  kind: (typeof PRESETS)[number]["preview"];
  active: boolean;
}) => {
  if (kind === "one") {
    return (
      <div className="flex h-[180px] w-[162px] flex-col gap-5">
        <Block active={active} className="h-[30px] w-full" />
        <div className="flex min-h-0 flex-1 gap-5">
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <Block active={active} className="min-h-0 flex-1 w-full" />
            <Block active={active} className="min-h-0 flex-1 w-full" />
          </div>
          <div className="flex w-[25px] shrink-0 flex-col gap-5">
            <Block active={active} className="min-h-0 flex-1 w-full" />
            <Block active={active} className="min-h-0 flex-1 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (kind === "two") {
    return (
      <div className="flex h-[180px] w-[162px] flex-col gap-5">
        <Block active={active} className="h-[30px] w-full" />
        <div className="flex min-h-0 flex-1 gap-2.5">
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <Block active={active} className="min-h-0 flex-1 w-full" />
            <div className="flex min-h-0 flex-1 gap-2.5">
              <Block active={active} className="min-h-0 flex-1" />
              <Block active={active} className="min-h-0 flex-1" />
            </div>
          </div>
          <div className="flex w-[25px] shrink-0 flex-col gap-5">
            <Block active={active} className="min-h-0 flex-1 w-full" />
            <Block active={active} className="min-h-0 flex-1 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (kind === "three") {
    return (
      <div className="flex h-[180px] w-[162px] flex-col gap-5">
        <Block active={active} className="h-[28px] w-full" />
        <div className="flex min-h-0 flex-1 gap-5">
          <Block active={active} className="min-h-0 flex-1" />
          <Block active={active} className="min-h-0 w-[25px] shrink-0" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[180px] w-[162px] gap-5">
      <Block active={active} className="min-h-0 flex-1" />
      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <Block active={active} className="min-h-0 flex-1" />
        <Block active={active} className="h-[107px] shrink-0" />
      </div>
    </div>
  );
};

/** Figma 1336:64662 — layout preset cards under Layout Customizer */
const LayoutPresetsStrip = ({ selected, onSelect }: LayoutPresetsStripProps) => {
  return (
    <div className="relative -mx-4 sm:-mx-6 bg-primary-bg px-4 sm:px-8 pt-6 sm:pt-8 pb-6 sm:pb-8 border-b border-border">
      <div className="flex gap-6 xl:gap-[100px] 2xl:gap-[150px] items-stretch justify-start xl:justify-center overflow-x-auto">
        {PRESETS.map((preset) => {
          const active = selected === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelect(preset.id)}
              className={cn(
                "shrink-0 flex flex-col gap-5 items-start justify-center p-5 rounded-[14px] border cursor-pointer transition-colors text-left bg-transparent",
                active
                  ? "border-button-bg"
                  : "border-primary-text/20 hover:border-button-bg/40"
              )}
            >
              <div className="flex w-full items-center justify-between gap-3">
                <span
                  className={cn(
                    "text-sm font-medium leading-4",
                    active ? "text-primary-text" : "text-primary-text/40"
                  )}
                >
                  {preset.label}
                </span>
                <img
                  src={active ? gearIcon : gearMutedIcon}
                  alt=""
                  className="h-4 w-[18px] object-contain"
                />
              </div>
              <Preview kind={preset.preview} active={active} />
            </button>
          );
        })}
      </div>
      <span className="absolute right-4 sm:right-6 top-4 text-secondary-text pointer-events-none">
        <Settings className="size-5" />
      </span>
    </div>
  );
};

export default LayoutPresetsStrip;
