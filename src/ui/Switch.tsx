import { cn } from "@/lib/utils";

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

/**
 * Single source of truth for on/off toggles.
 * import Switch from "@/ui/Switch";
 */
const Switch = ({
  checked,
  onCheckedChange,
  disabled,
  className,
  "aria-label": ariaLabel,
}: SwitchProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={ariaLabel}
    disabled={disabled}
    onClick={() => onCheckedChange(!checked)}
    className={cn(
      "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-0 p-0 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
      checked ? "bg-[#eab308]" : "bg-white/15",
      className
    )}
  >
    <span
      className={cn(
        "pointer-events-none inline-block size-3.5 rounded-full shadow transition-transform duration-200",
        checked ? "translate-x-[18px] bg-black" : "translate-x-[3px] bg-white/60"
      )}
    />
  </button>
);

export { Switch };
export default Switch;
