import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { Search, SlidersHorizontal } from "lucide-react";

export const StatCard = ({
  label,
  value,
  hint,
  hintTone = "muted",
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  hintTone?: "muted" | "up" | "down" | "warn" | "gold";
  icon?: ReactNode;
}) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 min-w-0">
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-white/45">{label}</p>
        <p className="mt-1 text-2xl font-semibold text-white tabular-nums">{value}</p>
        {hint && (
          <p
            className={cn(
              "mt-1 text-xs",
              hintTone === "up" && "text-emerald-400",
              hintTone === "down" && "text-red-400",
              hintTone === "warn" && "text-red-400",
              hintTone === "gold" && "text-[#fbbf24]",
              hintTone === "muted" && "text-white/45"
            )}
          >
            {hint}
          </p>
        )}
      </div>
      {icon && <span className="shrink-0 text-white/40">{icon}</span>}
    </div>
  </div>
);

export const MiniStat = ({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "blue" | "green" | "red" | "gold";
}) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 min-w-0">
    <p className="text-[10px] uppercase tracking-wide text-white/40">{label}</p>
    <p
      className={cn(
        "mt-1 text-lg font-semibold tabular-nums",
        tone === "default" && "text-white",
        tone === "blue" && "text-sky-400",
        tone === "green" && "text-emerald-400",
        tone === "red" && "text-red-400",
        tone === "gold" && "text-[#fbbf24]"
      )}
    >
      {value}
    </p>
  </div>
);

export const StatusPill = ({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "success" | "warn" | "danger" | "gold" | "info";
}) => (
  <span
    className={cn(
      "inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide",
      tone === "neutral" && "border-white/15 bg-white/10 text-white/60",
      tone === "success" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
      tone === "warn" && "border-amber-500/30 bg-amber-500/10 text-amber-400",
      tone === "danger" && "border-red-500/30 bg-red-500/10 text-red-400",
      tone === "gold" && "border-[#fbbf24]/30 bg-[#fbbf24]/10 text-[#fbbf24]",
      tone === "info" && "border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
    )}
  >
    {label}
  </span>
);

export const DotStatus = ({
  label,
  on = true,
}: {
  label: string;
  on?: boolean;
}) => (
  <span className="inline-flex items-center gap-1.5 text-sm text-white/80">
    <span
      className={cn(
        "size-1.5 rounded-full",
        on ? "bg-emerald-400" : "bg-red-400"
      )}
    />
    {label}
  </span>
);

export const PageToolbar = ({
  search,
  onSearch,
  searchPlaceholder = "Search…",
  filters,
  actions,
}: {
  search?: string;
  onSearch?: (v: string) => void;
  searchPlaceholder?: string;
  filters?: ReactNode;
  actions?: ReactNode;
}) => (
  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
    <div className="flex flex-1 flex-wrap items-center gap-2">
      {onSearch && (
        <Input
          variant="soft"
          inputSize="sm"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          leftIcon={<Search className="size-3.5 text-white/40" />}
          containerClassName="w-full sm:w-72"
        />
      )}
      {filters}
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-[#fbbf24] hover:bg-white/5 cursor-pointer"
      >
        <SlidersHorizontal className="size-3.5" />
        Advanced Filters
      </button>
    </div>
    {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
  </div>
);

export const FilterSelect = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) => (
  <label className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70">
    <span className="uppercase tracking-wide text-white/40">{label}:</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border-0 bg-transparent text-white outline-none cursor-pointer"
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-black text-white">
          {o}
        </option>
      ))}
    </select>
  </label>
);

export const DataPanel = ({
  title,
  subtitle,
  children,
  footer,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
    {(title || subtitle) && (
      <div className="border-b border-white/10 px-4 py-3">
        {title && <h2 className="text-sm font-semibold text-white">{title}</h2>}
        {subtitle && <p className="text-xs text-white/45 mt-0.5">{subtitle}</p>}
      </div>
    )}
    {children}
    {footer && (
      <div className="border-t border-white/10 px-4 py-3 text-xs text-white/40">
        {footer}
      </div>
    )}
  </div>
);

export const IntegrityBanner = ({
  text,
  badge = "FOUNDER PROTOCOL",
}: {
  text: string;
  badge?: string;
}) => (
  <div className="flex flex-col gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
    <p className="text-xs text-emerald-200/80 leading-relaxed max-w-3xl">{text}</p>
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-white/10 bg-black px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/70">
      {badge}
    </span>
  </div>
);

export const PrimaryAction = ({
  title,
  onClick,
  leftIcon,
}: {
  title: string;
  onClick?: () => void;
  leftIcon?: ReactNode;
}) => (
  <Button variant="primary" size="md" title={title} onClick={onClick} leftIcon={leftIcon} />
);

export const GhostAction = ({
  title,
  onClick,
}: {
  title: string;
  onClick?: () => void;
}) => <Button variant="ghost" size="md" title={title} onClick={onClick} />;
