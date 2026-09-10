import { useState, ReactNode } from "react";
import { Check, ChevronsUpDown, Search, type LucideIcon } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/Popover";

export type SelectOption = string | { label: string; value: string | number };

/**
 * Single source of truth for selects.
 * import Select from "@/ui/Select";
 */
const triggerVariants = cva(
  "flex items-center justify-between gap-2 w-full rounded-lg text-left transition-all outline-none",
  {
    variants: {
      variant: {
        default:
          "h-11 px-4 bg-light-bg border border-border text-primary-text hover:bg-light-bg/80 font-normal",
        auth: "h-13 px-4 bg-white/10 border border-white/10 text-white hover:bg-white/[0.13] font-normal",
        filter:
          "h-12 px-2 sm:px-4 bg-brand-gradient text-white! shadow-sm hover:opacity-90 font-normal! active:scale-[0.98]",
        filterOutline:
          "h-12 px-2 sm:px-4 bg-slate-50 dark:bg-slate-800 text-body surface hover:bg-slate-100 dark:hover:bg-slate-700",
        soft: "h-11 px-4 bg-light-bg border border-border text-primary-text font-normal hover:bg-light-bg/80",
      },
      error: {
        true: "border-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function getOptionLabel(opt: SelectOption): string {
  return typeof opt === "string" ? opt : opt.label;
}

function getOptionValue(opt: SelectOption): string {
  return typeof opt === "string" ? opt : String(opt.value);
}

export interface SelectProps extends VariantProps<typeof triggerVariants> {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  className?: string;
  icon?: LucideIcon;
  title?: string;
  disabled?: boolean;
  emptyText?: string;
  rightIcon?: ReactNode;
}

const Select = ({
  options = [],
  value,
  onChange,
  placeholder = "Select option...",
  searchable = false,
  searchPlaceholder = "Search...",
  className,
  variant = "default",
  error,
  icon: Icon,
  title,
  disabled,
  emptyText = "No results found.",
  rightIcon,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = searchable
    ? options.filter((opt) =>
        getOptionLabel(opt).toLowerCase().includes(search.toLowerCase())
      )
    : options;

  const selected = options.find((opt) => getOptionValue(opt) === value);
  const display =
    selected != null ? getOptionLabel(selected) : title || placeholder;

  const isFilter = variant === "filter" || variant === "filterOutline";

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        {isFilter ? (
          <button
            type="button"
            disabled={disabled}
            className={cn(
              triggerVariants({ variant, error }),
              open && "pointer-events-none",
              className
            )}
          >
            {Icon && <Icon className="size-4 sm:size-5 shrink-0" />}
            <span className="truncate flex-1">{display}</span>
            {rightIcon ?? (
              <FaCaretDown className="size-4 sm:size-5 shrink-0 ml-1" />
            )}
          </button>
        ) : (
          <Button
            type="button"
            variant="soft"
            disabled={disabled}
            role="combobox"
            aria-expanded={open}
            className={cn(
              triggerVariants({ variant, error }),
              !value && "text-secondary-text",
              className
            )}
          >
            <span className="truncate flex-1 text-left">{display}</span>
            {rightIcon ?? (
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            )}
          </Button>
        )}
      </PopoverTrigger>

      <PopoverContent
        className={cn(
          "p-0 shadow-xl border-border bg-primary-bg rounded-lg overflow-hidden",
          isFilter && "bg-white dark:bg-slate-900 p-1.5"
        )}
        align="start"
        sideOffset={isFilter ? 8 : 4}
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        {searchable && (
          <div className="flex items-center border-b border-border px-3 h-10">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              variant="soft"
              className="h-full border-0 shadow-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-transparent"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        <div
          className={cn(
            "max-h-60 overflow-y-auto",
            searchable ? "p-1 space-y-1" : "flex flex-col gap-0.5"
          )}
        >
          {filtered.length === 0 && (
            <div className="py-6 text-center text-sm text-secondary-text">
              {emptyText}
            </div>
          )}

          {filtered.map((opt) => {
            const val = getOptionValue(opt);
            const label = getOptionLabel(opt);
            const isSelected = value === val;

            return (
              <button
                key={val}
                type="button"
                onClick={() => {
                  onChange?.(isSelected && searchable ? "" : val);
                  setOpen(false);
                  setSearch("");
                }}
                className={cn(
                  "relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2.5 text-sm outline-none transition-colors text-left",
                  isSelected
                    ? "bg-primary-brand/10 text-primary-text font-medium"
                    : "text-secondary-text hover:bg-primary-brand/5 hover:text-primary-text"
                )}
              >
                {searchable && (
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      isSelected ? "opacity-100" : "opacity-0"
                    )}
                  />
                )}
                {label}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { Select, triggerVariants as selectTriggerVariants };
export default Select;
