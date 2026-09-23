import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, Lock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { pageList } from "./utils";
import { panelClass } from "./dashboardStyles";

export const SummaryCard = ({
  label,
  value,
  icon,
  footer,
}: {
  label: string;
  value: string;
  icon: ReactNode;
  footer: ReactNode;
}) => (
  <div className={cn(panelClass, "flex min-w-0 flex-col gap-3 p-6")}>
    <div className="flex items-start justify-between gap-2">
      <p className="text-[10px] font-bold uppercase leading-[15px] tracking-[0.5px] text-[#6b7280]">
        {label}
      </p>
      {icon}
    </div>
    <p className="text-[30px] font-bold leading-[45px] text-white tabular-nums">{value}</p>
    <div className="flex items-center gap-1 text-[11px] leading-[16.5px]">{footer}</div>
  </div>
);

export const MiniMetric = ({
  label,
  value,
  valueClassName = "text-white",
  onClick,
}: {
  label: string;
  value: string;
  valueClassName?: string;
  onClick?: () => void;
}) => {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      {...(onClick ? { type: "button" as const, onClick } : {})}
      className={cn(
        "flex min-w-0 flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-4",
        onClick && "cursor-pointer transition-colors hover:border-white/20 hover:bg-white/[0.07]"
      )}
    >
      <span className="text-[9px] font-bold uppercase leading-[13.5px] text-[#6b7280]">
        {label}
      </span>
      <span className={cn("truncate text-lg font-bold leading-[27px]", valueClassName)}>
        {value}
      </span>
    </Tag>
  );
};

export const IconAction = ({
  label,
  onClick,
  children,
  className,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    onClick={onClick}
    className={cn(
      "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border-0 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white",
      className
    )}
  >
    {children}
  </button>
);

export const StatusText = ({
  label,
  dot,
  text,
  note,
}: {
  label: string;
  dot: string;
  text: string;
  note?: string;
}) => (
  <div className="flex flex-col gap-1">
    <span className="flex items-center gap-2">
      <span className={cn("size-1.5 shrink-0 rounded-full", dot)} />
      <span className={cn("text-[11px] font-medium leading-[16.5px]", text)}>{label}</span>
    </span>
    {note && <span className="text-[9px] leading-[13.5px] text-[#6b7280]">{note}</span>}
  </div>
);

export const Pagination = ({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}) => {
  if (pageCount <= 1) return null;
  const btn =
    "flex size-8 cursor-pointer items-center justify-center rounded-lg border text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40";
  return (
    <nav aria-label="Pagination" className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className={cn(btn, "border-white/10 bg-white/5 text-white/60 hover:bg-white/10")}
      >
        <ChevronLeft className="size-3.5" />
      </button>
      {pageList(page, pageCount).map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="px-1 text-xs text-white/60">
            ...
          </span>
        ) : (
          <button
            key={p}
            type="button"
            aria-current={p === page ? "page" : undefined}
            onClick={() => onChange(p)}
            className={cn(
              btn,
              p === page
                ? "border-transparent bg-[#fbbf24] font-semibold text-black"
                : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
            )}
          >
            {p}
          </button>
        )
      )}
      <button
        type="button"
        aria-label="Next page"
        disabled={page === pageCount}
        onClick={() => onChange(page + 1)}
        className={cn(btn, "border-white/10 bg-white/5 text-white/60 hover:bg-white/10")}
      >
        <ChevronRight className="size-3.5" />
      </button>
    </nav>
  );
};

export const ProtocolBanner = ({
  title,
  lines,
  authority,
  label = "Founder View",
}: {
  title: string;
  lines: string;
  authority: string;
  label?: string;
}) => (
  <div
    className={cn(
      panelClass,
      "flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between"
    )}
  >
    <div className="flex items-start gap-6 sm:items-center">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[rgba(34,197,94,0.2)] bg-[rgba(34,197,94,0.1)] text-[#22c55e]">
        <ShieldCheck className="size-6" />
      </span>
      <div className="flex max-w-[672px] flex-col gap-1">
        <p className="text-sm font-bold uppercase leading-[21px] tracking-[0.7px] text-white">
          {title}
        </p>
        <p className="text-xs leading-[19.5px] text-[#6b7280]">{lines}</p>
      </div>
    </div>
    <div className="flex shrink-0 items-center gap-4 self-start rounded-xl border border-white/10 bg-black p-4 lg:self-auto">
      <span className="flex size-10 items-center justify-center rounded-lg bg-[#0f172a] text-white">
        <Lock className="size-4" />
      </span>
      <div>
        <p className="text-[10px] font-bold uppercase leading-[15px] tracking-[1px] text-[#eab308]">
          {label}
        </p>
        <p className="text-xs font-bold leading-[18px] text-white">{authority}</p>
      </div>
    </div>
  </div>
);
