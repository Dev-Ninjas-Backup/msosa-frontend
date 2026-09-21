import { Download } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import { cn } from "@/lib/utils";
import { statusStyle, type HistoryInvoice } from "../data";

type HistoryTableProps = {
  rows: HistoryInvoice[];
  selected: Set<string>;
  activeId: string;
  onToggleAll: () => void;
  onToggleOne: (id: string) => void;
  onSelect: (id: string) => void;
  page: number;
  totalPages: number;
  from: number;
  to: number;
  total: number;
  onPage: (p: number) => void;
};

const HistoryTable = ({
  rows,
  selected,
  activeId,
  onToggleAll,
  onToggleOne,
  onSelect,
  page,
  totalPages,
  from,
  to,
  total,
  onPage,
}: HistoryTableProps) => {
  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.id));
  const buttons = (() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    return [1, 2, 3, "…" as const, totalPages];
  })();

  return (
    <AnimatedContainer delay={0.06}>
      <div className="rounded-xl border border-white/10 bg-white/[0.05] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/10">
                <th className="px-4 py-2.5 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={onToggleAll}
                    className="size-3.5 rounded-[3px] border border-white/40 bg-transparent accent-[#FBBF24] cursor-pointer"
                  />
                </th>
                <th className="px-2 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-white/50">
                  Invoice #
                </th>
                <th className="px-2 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-white/50">
                  Billing Period
                </th>
                <th className="px-2 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-white/50">
                  Description
                </th>
                <th className="px-2 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-white/50">
                  Amount
                </th>
                <th className="px-2 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-white/50">
                  Status
                </th>
                <th className="px-2 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-white/50">
                  Payment Date
                </th>
                <th className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-white/50 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onSelect(row.id)}
                  className={cn(
                    "border-b border-white/10 last:border-0 cursor-pointer hover:bg-white/[0.02]",
                    activeId === row.id && "bg-white/[0.04]"
                  )}
                >
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selected.has(row.id)}
                      onChange={() => onToggleOne(row.id)}
                      className="size-3.5 rounded-[3px] border border-white/40 bg-transparent accent-[#FBBF24] cursor-pointer"
                    />
                  </td>
                  <td className="px-2 py-3 text-xs font-medium text-white">
                    {row.id}
                  </td>
                  <td className="px-2 py-3 text-xs text-white/50">{row.period}</td>
                  <td className="px-2 py-3 text-xs text-white/60">
                    <span className="inline-flex items-center gap-2 flex-wrap">
                      {row.description}
                      {row.tag ? (
                        <span className="rounded bg-[rgba(251,191,36,0.15)] px-1.5 py-0.5 text-[9px] font-semibold text-[#FBBF24]">
                          {row.tag}
                        </span>
                      ) : null}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-xs font-medium text-white">
                    {row.amount}
                  </td>
                  <td className="px-2 py-3">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold",
                        statusStyle(row.status)
                      )}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-xs text-white/50">
                    {row.paymentDate}
                  </td>
                  <td
                    className="px-4 py-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      {row.status === "Failed" ? (
                        <Button
                          variant="soft"
                          size="sm"
                          className="rounded-lg! h-7! text-xs! text-[#F87171]!"
                          onClick={() => toast.message(`Retry ${row.id}`)}
                        >
                          Retry
                        </Button>
                      ) : (
                        <Button
                          variant="soft"
                          size="sm"
                          className="rounded-lg! h-7! text-xs!"
                          onClick={() => toast.success(`PDF: ${row.id}`)}
                        >
                          <Download className="size-3" />
                          PDF
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-lg! h-7! text-xs!"
                        onClick={() => onSelect(row.id)}
                      >
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-white/10">
          <p className="text-xs text-white/45">
            Showing {from}–{to} of {total} invoices
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
      </div>
    </AnimatedContainer>
  );
};

export default HistoryTable;
