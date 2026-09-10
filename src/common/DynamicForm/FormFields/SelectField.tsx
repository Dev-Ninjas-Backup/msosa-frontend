import type { SelectOption } from "@/ui/Select";
import Select from "@/ui/Select";

interface SelectFieldProps {
  options: SelectOption[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  error?: boolean;
  className?: string;
}

/** Form-field wrapper around `@/ui/Select`. Prefer importing Select directly. */
export const SelectField = ({
  options = [],
  value,
  onChange,
  placeholder = "Select option...",
  error,
  className,
}: SelectFieldProps) => (
  <Select
    searchable
    variant="soft"
    options={options}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    error={error}
    className={className}
  />
);
