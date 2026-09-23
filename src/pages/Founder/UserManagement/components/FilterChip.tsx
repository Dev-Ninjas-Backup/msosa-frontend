import { useState } from "react";
import { Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import { cn } from "@/lib/utils";

type FilterChipProps<T extends string> = {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
};

const FilterChip = <T extends string>({
  label,
  value,
  options,
  onChange,
}: FilterChipProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "cursor-pointer whitespace-nowrap rounded-lg border bg-white/5 px-4 py-2 text-[11px] font-bold uppercase leading-[16.5px] tracking-[0.55px] transition-colors hover:bg-white/10",
            open ? "border-[#eab308]/40 text-white" : "border-white/10 text-[#9ca3af]"
          )}
        >
          {label}: {value}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-48 rounded-lg border-white/10 bg-[#111] p-1"
      >
        {options.map((opt) => {
          const selected = opt === value;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={cn(
                "flex w-full cursor-pointer items-center justify-between rounded-md border-0 bg-transparent px-3 py-2 text-left text-sm transition-colors",
                selected
                  ? "bg-white/5 text-white"
                  : "text-[#9ca3af] hover:bg-white/5 hover:text-white"
              )}
            >
              {opt}
              {selected && <Check className="size-3.5 text-[#eab308]" />}
            </button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export default FilterChip;
