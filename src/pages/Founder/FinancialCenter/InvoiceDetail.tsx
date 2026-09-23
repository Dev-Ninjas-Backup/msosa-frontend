import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AnimatedContainer from "@/common/AnimatedContainer";
import { cn } from "@/lib/utils";
import logo from "@/assets/logoName.png";
import { INVOICE_DOWNLOAD_EVENT, INVOICE_PRINT_EVENT } from "./events";
import { formatMoney, getInvoice } from "./data";

const statusTone = {
  Paid: "bg-[#22c55e]/10 text-[#22c55e]",
  Pending: "bg-[#eab308]/10 text-[#eab308]",
  Overdue: "bg-[#ef4444]/10 text-[#ef4444]",
};

const dotTone = {
  Paid: "bg-[#22c55e]",
  Pending: "bg-[#eab308]",
  Overdue: "bg-[#ef4444]",
};

const InvoiceDetail = () => {
  const { invoiceId = "" } = useParams();
  const invoice = getInvoice(decodeURIComponent(invoiceId));

  useEffect(() => {
    const onPrint = () => window.print();
    const onDownload = () => {
      if (!invoice) return;
      const lines = [
        `Invoice #${invoice.id}`,
        `Issued on ${invoice.issued}`,
        `Status: ${invoice.status}`,
        "",
        "Bill From",
        "Far System Ltd.",
        "Reflection Square, Deep Valley",
        "billing@farsystem.ai",
        "",
        "Bill To",
        invoice.billToName,
        invoice.billToRole,
        invoice.billToEmail,
        "",
        ...invoice.items.map((item) => `${item.name} | ${item.employees} employees | ${formatMoney(item.price)} | ${formatMoney(item.total)}`),
        "",
        `Subtotal ${formatMoney(invoice.subtotal)}`,
        `Tax (10%) ${formatMoney(invoice.tax)}`,
        `Total Amount ${formatMoney(invoice.amount)}`,
      ];
      const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${invoice.id}.txt`;
      anchor.click();
      URL.revokeObjectURL(url);
    };
    window.addEventListener(INVOICE_PRINT_EVENT, onPrint);
    window.addEventListener(INVOICE_DOWNLOAD_EVENT, onDownload);
    return () => {
      window.removeEventListener(INVOICE_PRINT_EVENT, onPrint);
      window.removeEventListener(INVOICE_DOWNLOAD_EVENT, onDownload);
    };
  }, [invoice]);

  if (!invoice) {
    return <p className="text-sm text-white/50">This invoice is not in the current ledger.</p>;
  }

  const initials = invoice.billToName
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <AnimatedContainer className="pb-8">
      <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-10">
        <header className="flex items-start justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-[32px] font-bold tracking-[-0.8px] text-white">Invoice #{invoice.id}</h2>
            <p className="mt-2 text-sm text-[#94a3b8]">Issued on {invoice.issued}</p>
          </div>
          <img src={logo} alt="FAR" className="h-16 w-auto object-contain" />
        </header>

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1fr_auto]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[1.2px] text-[#64748b]">Bill From</p>
            <p className="mt-4 text-lg font-semibold text-white">Far System Ltd.</p>
            <p className="text-sm text-[#94a3b8]">Reflection Square, Deep Valley</p>
            <p className="text-sm text-[#94a3b8]">billing@farsystem.ai</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[1.2px] text-[#64748b]">Bill To</p>
            <div className="mt-4 flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-full border border-white/20 text-xs font-semibold text-white">{initials}</span>
              <span>
                <span className="block text-sm font-semibold text-white">{invoice.billToName}</span>
                {invoice.live && (
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-[#10b7ba]">
                    <span className="size-1.5 rounded-full bg-[#10b7ba]" />
                    Live Session
                  </span>
                )}
              </span>
            </div>
            <p className="mt-3 text-sm text-[#94a3b8]">{invoice.billToRole}</p>
            <p className="text-sm text-[#94a3b8]">{invoice.billToEmail}</p>
          </div>
          <span className={cn("inline-flex h-fit items-center gap-2 self-start rounded-full px-3 py-1 text-[10px] font-bold uppercase", statusTone[invoice.status])}>
            <span className={cn("size-2 rounded-full", dotTone[invoice.status])} />
            {invoice.status}
          </span>
        </div>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-white/5 text-xs font-semibold uppercase tracking-[0.6px] text-[#64748b]">
                <th className="py-4 font-semibold">Item & Description</th>
                <th className="py-4 text-center font-semibold">Employees</th>
                <th className="py-4 text-right font-semibold">Price</th>
                <th className="py-4 text-right font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr key={item.name} className="border-b border-white/5">
                  <td className="py-6">
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="text-xs text-[#94a3b8]">{item.description}</p>
                  </td>
                  <td className="text-center text-sm text-[#cbd5e1]">{item.employees}</td>
                  <td className="text-right text-sm text-[#cbd5e1]">{formatMoney(item.price)}</td>
                  <td className="text-right text-sm font-semibold text-white">{formatMoney(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 w-full">
          <div className="w-full  space-y-4 rounded-2xl border border-white/5 bg-white/5 p-6">
            <Row label="Subtotal" value={formatMoney(invoice.subtotal)} />
            <Row label="Tax (10%)" value={formatMoney(invoice.tax)} />
            <div className="h-px bg-white/10" />
            <div className="flex items-center justify-between">
              <p className="text-base font-bold text-white">Total Amount</p>
              <p className="text-base font-bold text-[#fbbf24]">{formatMoney(invoice.amount)}</p>
            </div>
          </div>
        </div>
      </article>
    </AnimatedContainer>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between text-sm">
    <p className="text-[#94a3b8]">{label}</p>
    <p className="text-white">{value}</p>
  </div>
);

export default InvoiceDetail;
