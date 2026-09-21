import { ChevronRight, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { INVOICE_HISTORY } from "../data";

const statusClass = (status: string) => {
  switch (status) {
    case "Paid":
      return "bg-[rgba(16,183,186,0.15)] text-[#10B7BA]";
    case "Pending":
      return "bg-[rgba(251,191,36,0.15)] text-[#FBBF24]";
    default:
      return "bg-white/10 text-[#9CA3AF]";
  }
};

const InvoiceHistory = () => (
  <AnimatedContainer delay={0.12}>
    <Card
      className="p-7 space-y-5"
      backgroundColor="rgba(255,255,255,0.05)"
      shadow="none"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-white">Invoice History</h3>
          <Info className="size-3.5 text-white/35" />
        </div>
        <Link
          to="/enterprise/billing/history"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FBBF24] hover:underline"
        >
          View All Invoices
          <ChevronRight className="size-3" />
        </Link>
      </div>

      <div className="overflow-x-auto -mx-1">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-white/10 text-[10px] font-semibold uppercase tracking-wide text-[#9CA3AF]">
              <th className="pb-3 pr-3 font-semibold">Invoice ID</th>
              <th className="pb-3 px-3 font-semibold">Date</th>
              <th className="pb-3 px-3 font-semibold">Description</th>
              <th className="pb-3 px-3 font-semibold">Amount</th>
              <th className="pb-3 px-3 font-semibold">Status</th>
              <th className="pb-3 pl-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {INVOICE_HISTORY.map((inv) => (
              <tr
                key={inv.id}
                className="border-b border-white/10 last:border-0"
              >
                <td className="py-3.5 pr-3 text-xs font-medium text-white">
                  {inv.id}
                </td>
                <td className="py-3.5 px-3 text-xs text-[#9CA3AF]">{inv.date}</td>
                <td className="py-3.5 px-3 text-xs text-[#9CA3AF]">
                  {inv.description}
                </td>
                <td className="py-3.5 px-3 text-xs font-medium text-white">
                  {inv.amount}
                </td>
                <td className="py-3.5 px-3">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      statusClass(inv.status)
                    )}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="py-3.5 pl-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => toast.message(`View ${inv.id}`)}
                      className="rounded-md border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/70 hover:text-white cursor-pointer"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => toast.success(`PDF: ${inv.id}`)}
                      className="rounded-md border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/70 hover:text-white cursor-pointer"
                    >
                      PDF
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </AnimatedContainer>
);

export default InvoiceHistory;
