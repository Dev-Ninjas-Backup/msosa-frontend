import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ModalShellProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  /** "center" renders a dialog, "right" renders a side drawer. */
  placement?: "center" | "right";
  /** Extra classes for the panel, such as a wider max width. */
  panelClassName?: string;
};

const ModalShell = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  placement = "center",
  panelClassName,
}: ModalShellProps) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const isDrawer = placement === "right";

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex",
        isDrawer ? "justify-end" : "items-center justify-center p-4"
      )}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xs"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative flex w-full flex-col border border-white/10 bg-[#111] shadow-2xl",
          isDrawer
            ? "h-full max-w-md animate-in slide-in-from-right duration-200"
            : "max-h-[90vh] max-w-lg rounded-2xl animate-in fade-in zoom-in-95 duration-150",
          panelClassName
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold leading-7 text-white">{title}</h2>
            {description && (
              <p className="mt-1 text-[13px] text-[#888]">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 cursor-pointer rounded-lg border-0 bg-transparent p-1 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
        {footer && (
          <div
            className={cn(
              "flex flex-wrap items-center justify-end gap-3 border-t border-white/10 bg-[#0d0d0d] px-6 py-4",
              !isDrawer && "rounded-b-2xl"
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalShell;
