import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  /** Renders a dash, e.g. for a "select all" header when only some rows are selected. */
  indeterminate?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
}

/**
 * Single source of truth for checkboxes.
 * import Checkbox from "@/ui/Checkbox";
 */
const Checkbox = ({
  checked,
  onCheckedChange,
  indeterminate,
  disabled,
  className,
  id,
  "aria-label": ariaLabel,
}: CheckboxProps) => {
  const on = checked || indeterminate;
  return (
    <button
      type="button"
      role="checkbox"
      id={id}
      aria-checked={indeterminate ? "mixed" : checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onCheckedChange(!checked);
      }}
      className={cn(
        "inline-flex size-[18px] shrink-0 cursor-pointer items-center justify-center rounded border-2 p-0 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        on ? "border-[#eab308] bg-[#eab308] text-black" : "border-[#6b7280] bg-transparent",
        className
      )}
    >
      {indeterminate ? (
        <Minus className="size-3" strokeWidth={3} />
      ) : checked ? (
        <Check className="size-3" strokeWidth={3} />
      ) : null}
    </button>
  );
};

export { Checkbox };
export default Checkbox;
