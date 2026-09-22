import { Check, Lock, Database, X } from "lucide-react";
import Button from "@/ui/Button";

type WidgetAddedModalProps = {
  open: boolean;
  widgetTitle?: string;
  onClose: () => void;
  onGoDashboard: () => void;
};

const WidgetAddedModal = ({
  open,
  widgetTitle,
  onClose,
  onGoDashboard,
}: WidgetAddedModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm border-0 cursor-pointer"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-[560px] rounded-2xl border border-border bg-primary-bg p-8 sm:p-10 text-center shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg border border-border bg-primary-text/5 text-secondary-text cursor-pointer"
        >
          <X className="size-3.5" />
        </button>

        <div className="relative mx-auto mb-8 size-20">
          <span className="absolute inset-0 rounded-full bg-button-bg/20 blur-xl" />
          <span className="relative flex size-20 items-center justify-center rounded-full border border-button-bg bg-button-bg/10 text-button-bg">
            <Check className="size-9" strokeWidth={2.5} />
          </span>
        </div>

        <h2 className="font-playfair text-2xl sm:text-[32px] text-primary-text leading-tight">
          The Widget is Successfully Added
        </h2>
        <p className="mt-4 text-base text-secondary-text max-w-sm mx-auto">
          Your {widgetTitle || "Widget"} is now live on the FAR Platform.
        </p>

        <Button
          type="button"
          variant="primary"
          className="mt-8 w-full max-w-[338px] h-12! rounded-xl!"
          onClick={onGoDashboard}
        >
          Go to Dashboard
        </Button>

        <div className="mt-8 pt-8 border-t border-border flex items-center justify-center gap-6 text-[10px] uppercase tracking-[0.1em] text-primary-text">
          <span className="inline-flex items-center gap-2">
            <Lock className="size-4 text-secondary-text" />
            Encrypted
          </span>
          <span className="inline-flex items-center gap-2">
            <Database className="size-4 text-secondary-text" />
            Eternal Storage
          </span>
        </div>
      </div>
    </div>
  );
};

export default WidgetAddedModal;
