import { LucideIcon } from "lucide-react";
import Select from "@/ui/Select";

interface FilterSelectProps {
  icon?: LucideIcon;
  title: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  variant?: "primary" | "outline";
}

/** Filter bar wrapper around `@/ui/Select`. Prefer importing Select directly. */
export function FilterSelect({
  icon,
  title,
  options,
  value,
  onChange,
  className,
  variant = "primary",
}: FilterSelectProps) {
  return (
    <Select
      icon={icon}
      title={title}
      options={options}
      value={value}
      onChange={onChange}
      className={className}
      variant={variant === "outline" ? "filterOutline" : "filter"}
    />
  );
}
