import { Download, Mail, Printer } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import { INVOICE_DETAIL } from "../data";

const InvoiceDetailPanel = () => {
  const d = INVOICE_DETAIL;

  return (
    <AnimatedContainer delay={0.08}>
      <Card className="p-0 overflow-hidden">
        <div className="flex items-start justify-between gap-3 px-5 py-5 border-b border-white/10">
          <div>
            <p className="text-sm font-semibold text-white">Invoice Detail</p>
            <p className="text-xs text-white/45 mt-0.5">{d.id}</p>
          </div>
          <span className="rounded-md border border-[rgba(251,191,36,0.4)] bg-[rgba(251,191,36,0.15)] px-2.5 py-1 text-[11px] font-bold text-[#FBBF24]">
            {d.status}
          </span>
        </div>

        <div className="px-5 py-4 space-y-5 max-h-[720px] overflow-y-auto">
          <section className="space-y-2 border-b border-white/10 pb-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/40">
              Billed To
            </p>
            <p className="text-xs font-semibold text-white">{d.billedTo.name}</p>
            <p className="text-[11px] text-white/45">
              Organization ID: {d.billedTo.orgId}
            </p>
            <p className="text-[11px] text-white/45">{d.billedTo.address1}</p>
            <p className="text-[11px] text-white/45">{d.billedTo.address2}</p>
            <p className="text-[11px] text-white/45">{d.billedTo.email}</p>
          </section>

          <section className="space-y-2 border-b border-white/10 pb-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/40">
              Invoice Info
            </p>
            {d.info.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-2 text-[11px]"
              >
                <span className="text-white/45">{row.label}</span>
                <span className="text-white font-medium">{row.value}</span>
              </div>
            ))}
          </section>

          <section className="space-y-2 border-b border-white/10 pb-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/40">
              Plan Details
            </p>
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <span className="text-white/45">Plan</span>
              <span className="rounded bg-[rgba(251,191,36,0.15)] px-1.5 py-0.5 text-[10px] font-semibold text-[#FBBF24]">
                {d.plan.name}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <span className="text-white/45">Seats Licensed</span>
              <span className="text-white font-medium">{d.plan.seats}</span>
            </div>
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <span className="text-white/45">Cycle</span>
              <span className="text-white font-medium">{d.plan.cycle}</span>
            </div>
          </section>

          <section className="space-y-2 border-b border-white/10 pb-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/40">
              Amount Breakdown
            </p>
            {d.amounts.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-2 text-[11px]"
              >
                <span className="text-white/45">{row.label}</span>
                <span className="text-white font-medium">{row.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
              <span className="text-xs font-semibold text-white">Total</span>
              <span className="text-lg font-bold text-[#FBBF24]">{d.total}</span>
            </div>
          </section>

          <section className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/40">
              Payment Info
            </p>
            {d.payment.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-2 text-[11px]"
              >
                <span className="text-white/45">{row.label}</span>
                <span className="text-white font-medium">{row.value}</span>
              </div>
            ))}
          </section>

          <div className="space-y-2 pt-2">
            <Button
              variant="primary"
              size="sm"
              className="w-full rounded-lg! bg-[#FBBF24]! text-black! hover:bg-[#e8b93a]!"
              onClick={() => toast.success("PDF download started.")}
            >
              <Download className="size-3.5" />
              Download PDF
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="soft"
                size="sm"
                className="rounded-lg!"
                onClick={() => toast.message("Print dialog…")}
              >
                <Printer className="size-3.5" />
                Print
              </Button>
              <Button
                variant="soft"
                size="sm"
                className="rounded-lg!"
                onClick={() => toast.success("Invoice emailed.")}
              >
                <Mail className="size-3.5" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </AnimatedContainer>
  );
};

export default InvoiceDetailPanel;
