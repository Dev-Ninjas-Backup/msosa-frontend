import { cn } from "@/lib/utils";

export const ToolbarAction = ({
  icon,
  title,
  subtitle,
  onClick,
  disabled,
  tone,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
  disabled?: boolean;
  tone?: "danger";
  className?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "flex flex-col items-center justify-center gap-1 px-2 sm:px-3 xl:px-3 py-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border-0 bg-transparent disabled:opacity-35 disabled:cursor-not-allowed min-w-[56px] sm:min-w-[88px] xl:min-w-[96px] flex-1",
      className
    )}
  >
    <span
      className={cn(
        "flex size-8 items-center justify-center",
        tone === "danger" ? "text-rose-500" : "text-[#FBBF24]"
      )}
    >
      {icon}
    </span>
    <span className="text-center leading-tight">
      <span
        className={cn(
          "block text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide",
          tone === "danger" ? "text-rose-400" : "text-[#FBBF24]"
        )}
      >
        {title}
      </span>
      <span
        className={cn(
          "block text-[9px] sm:text-[10px]",
          tone === "danger" ? "text-rose-400/70" : "text-[#FBBF24]/70"
        )}
      >
        {subtitle}
      </span>
    </span>
  </button>
);
