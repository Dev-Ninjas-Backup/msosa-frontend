import AnimatedContainer from "@/common/AnimatedContainer";
import { cn } from "@/lib/utils";

type NotificationsPaginationProps = {
  page: number;
  totalPages: number;
  from: number;
  to: number;
  total: number;
  onPage: (p: number) => void;
};

const NotificationsPagination = ({
  page,
  totalPages,
  from,
  to,
  total,
  onPage,
}: NotificationsPaginationProps) => {
  const buttons = (() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    return [1, 2, 3, 4, 5, "…" as const, totalPages];
  })();

  return (
    <AnimatedContainer delay={0.08}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-xs text-white/50">
          Showing{" "}
          <span className="font-medium text-white">
            {from}–{to}
          </span>{" "}
          of <span className="font-medium text-white">{total}</span>{" "}
          notifications
        </p>
        <div className="flex items-center gap-1.5">
          {buttons.map((b, i) =>
            b === "…" ? (
              <span key={`e-${i}`} className="px-1 text-white/40 text-xs">
                …
              </span>
            ) : (
              <button
                key={b}
                type="button"
                onClick={() => onPage(b)}
                className={cn(
                  "size-8 rounded-lg text-xs font-medium cursor-pointer border transition-colors",
                  page === b
                    ? "bg-[rgba(251,191,36,0.15)] border-[rgba(251,191,36,0.5)] text-[#FBBF24]"
                    : "bg-white/[0.03] border-white/10 text-white/60 hover:text-white"
                )}
              >
                {b}
              </button>
            )
          )}
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default NotificationsPagination;
