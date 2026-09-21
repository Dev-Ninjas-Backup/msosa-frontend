import { cn } from "@/lib/utils";

type ToggleProps = {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
};

export const Toggle = ({ checked, onChange, disabled }: ToggleProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => !disabled && onChange(!checked)}
    className={cn(
      "relative h-5 w-9 rounded-full border-0 transition-colors shrink-0",
      disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
      checked ? "bg-[#FBBF24]" : "bg-white/20"
    )}
  >
    <span
      className={cn(
        "absolute top-0.5 size-3.5 rounded-full bg-black transition-all",
        checked ? "left-[18px]" : "left-0.5"
      )}
    />
  </button>
);

export default Toggle;
