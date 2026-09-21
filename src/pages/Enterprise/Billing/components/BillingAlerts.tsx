import { AlertTriangle, FileText } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";

const BillingAlerts = () => (
  <AnimatedContainer delay={0.06}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between rounded-xl border border-[rgba(251,191,36,0.25)] bg-[rgba(251,191,36,0.06)] p-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(251,191,36,0.15)]">
            <AlertTriangle className="size-3.5 text-[#FBBF24]" />
          </span>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-[#FBBF24]">
              Subscription Expiring Soon
            </p>
            <p className="text-[11px] text-[#9CA3AF]">
              38 days until renewal — December 31, 2026
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => toast.success("Auto-renewal enabled.")}
          className="shrink-0 rounded-lg border border-[rgba(251,191,36,0.3)] bg-[rgba(251,191,36,0.15)] px-3.5 py-1.5 text-xs font-semibold text-[#FBBF24] cursor-pointer hover:bg-[rgba(251,191,36,0.22)]"
        >
          Enable Auto-Renewal
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between rounded-xl border border-[rgba(96,165,250,0.2)] bg-[rgba(96,165,250,0.06)] p-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(96,165,250,0.15)]">
            <FileText className="size-3.5 text-[#60A5FA]" />
          </span>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-white">
              Invoice Available
            </p>
            <p className="text-[11px] text-[#9CA3AF]">
              INV-00126 February 2026 is ready for download
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => toast.success("Invoice download started.")}
          className="shrink-0 rounded-lg border border-[rgba(96,165,250,0.3)] bg-[rgba(96,165,250,0.15)] px-3.5 py-1.5 text-xs font-semibold text-[#60A5FA] cursor-pointer hover:bg-[rgba(96,165,250,0.22)]"
        >
          Download Invoice
        </button>
      </div>
    </div>
  </AnimatedContainer>
);

export default BillingAlerts;
