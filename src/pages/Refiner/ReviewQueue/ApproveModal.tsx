import { BadgeCheck, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QueueRow } from "./data";

type ApproveModalProps = {
  open: boolean;
  report: QueueRow;
  confirmed: boolean;
  onConfirmChange: (v: boolean) => void;
  onClose: () => void;
  onApprove: () => void;
};

const ApproveModal = ({
  open,
  report,
  confirmed,
  onConfirmChange,
  onClose,
  onApprove,
}: ApproveModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close approve dialog"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm border-0 cursor-pointer"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="approve-report-title"
        className="relative z-[1] w-full max-w-3xl rounded-2xl border border-white/10 bg-[#0d1117] p-5 sm:p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-lg text-secondary-text hover:text-primary-text hover:bg-white/5 border-0 bg-transparent cursor-pointer"
        >
          <X className="size-4" />
        </button>

        <div className="flex items-start gap-3 pr-8 border-b pb-2 border-[#FFFFFF1A] px-[4px]">
          <span className="flex size-11 items-center justify-center justify-center  text-emerald-400 shrink-0">
            <BadgeCheck className="size-10 text-black fill-emerald-400 mt-2" />
          </span>
          <div>
            <h2
              id="approve-report-title"
              className="text-xl font-semibold text-primary-text"
            >
              Approve Report
            </h2>
            <p className="mt-1 text-sm text-secondary-text">
              Refiner Executive Authorization
            </p>
          </div>
        </div>

        <p className="mt-5 text-sm text-secondary-text leading-relaxed">
          You are about to approve and finalize{" "}
          <span className="text-[#FFFFFFD9] font-semibold">{report.title}</span>{" "}
          for client{" "}
          <span className="text-[#FFFFFFD9] font-medium">
            {report.client} ({report.company})
          </span>
          . Once approved, the final PDF will be generated and authorized for
          delivery.
        </p>

        <div className="mt-5 rounded-xl border border-[#FBBF2433] bg-[#FBBF240D] px-4 py-3.5 space-y-2.5 text-sm">
          <div className="flex justify-between gap-3">
            <span className="text-secondary-text">Report ID</span>
            <span className="text-[#FFFFFFCA] font-medium">#{report.id}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-secondary-text">Lead Refiner</span>
            <span className="text-[#FFFFFFCA] font-medium">You</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-secondary-text">Generated</span>
            <span className="text-[#FFFFFFCA] font-medium">
              {report.generated}
            </span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-secondary-text">Time Waiting</span>
            <span className="text-[#e05a7a] font-medium">{report.waiting}</span>
          </div>
        </div>

        <label
          className={cn(
            "mt-5 flex items-start gap-3 justify-center  rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 cursor-pointer"
          )}
        >
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => onConfirmChange(e.target.checked)}
            className="mt-0.5 size-6 pt-2 accent-[#3B82F6] cursor-pointer"
          />
          <span className="text-sm text-secondary-text leading-relaxed">
            I confirm that I have rigorously reviewed, refined, and validated
            this report according to FAR Refiner™ Quality Control Standards.
          </span>
        </label>

        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-11 px-5 rounded-xl border border-white/10 bg-[#FFFFFF4D] text-sm font-medium text-primary-text hover:bg-white/10 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!confirmed}
            onClick={onApprove}
            className="h-11 px-5 rounded-xl bg-[#3B6CF6] hover:bg-[#2563EB] text-sm font-semibold text-white border-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Approve & Generate Final PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveModal;
