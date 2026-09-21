import { Link } from "react-router-dom";
import { Check, Download, Eye, FileText } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import type { ReportRow } from "../data";
import { statusClass } from "./statusStyles";

type ReportsTableProps = {
  pageRows: ReportRow[];
  selected: Set<string>;
  filteredCount: number;
  safePage: number;
  pageSize: number;
  pageButtons: (number | "…")[];
  onToggleAll: () => void;
  onToggleOne: (id: string) => void;
  onPage: (page: number) => void;
};

const ReportsTable = ({
  pageRows,
  selected,
  filteredCount,
  safePage,
  pageSize,
  pageButtons,
  onToggleAll,
  onToggleOne,
  onPage,
}: ReportsTableProps) => (
  <AnimatedContainer delay={0.1}>
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-left">
          <thead>
            <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-[0.5px] text-[#6B7280]">
              <th className="px-4 py-3 w-9">
                <input
                  type="checkbox"
                  checked={
                    pageRows.length > 0 &&
                    pageRows.every((r) => selected.has(r.id))
                  }
                  onChange={onToggleAll}
                  className="size-3.5 rounded-[3px] accent-[#FBBF24]"
                />
              </th>
              <th className="px-3 py-3">Report Name</th>
              <th className="px-3 py-3">Reflection</th>
              <th className="px-3 py-3">Department</th>
              <th className="px-3 py-3">Reporting Period</th>
              <th className="px-3 py-3">Generated Date</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">PDF</th>
              <th className="px-3 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((r) => (
              <tr
                key={r.id}
                className="border-b border-white/10 hover:bg-white/[0.02]"
              >
                <td className="px-4 py-3.5">
                  <input
                    type="checkbox"
                    checked={selected.has(r.id)}
                    onChange={() => onToggleOne(r.id)}
                    className="size-3.5 rounded-[3px] accent-[#FBBF24]"
                  />
                </td>
                <td className="px-3 py-3.5">
                  <Link
                    to={`/enterprise/reports/${r.id}`}
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white no-underline hover:text-[#FBBF24]"
                  >
                    <FileText className="size-3.5 text-[#FBBF24] shrink-0" />
                    {r.name}
                  </Link>
                </td>
                <td className="px-3 py-3.5 text-[11px] text-[#9CA3AF]">
                  {r.reflection}
                </td>
                <td className="px-3 py-3.5 text-[11px] text-[#9CA3AF]">
                  {r.department}
                </td>
                <td className="px-3 py-3.5 text-[11px] text-[#9CA3AF]">
                  {r.period}
                </td>
                <td className="px-3 py-3.5 text-[11px] text-[#9CA3AF]">
                  {r.generated}
                </td>
                <td className="px-3 py-3.5">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold",
                      statusClass(r.status)
                    )}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-3 py-3.5">
                  {r.pdf ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#10B981]">
                      <Check className="size-3" strokeWidth={3} />
                      PDF
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-[#F97316]">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-3 py-3.5">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      to={`/enterprise/reports/${r.id}`}
                      className="inline-flex size-7 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/60 hover:text-white no-underline"
                      aria-label="View report"
                    >
                      <Eye className="size-3.5" />
                    </Link>
                    <button
                      type="button"
                      disabled={!r.pdf}
                      onClick={() => toast.success("PDF download started.")}
                      className={cn(
                        "inline-flex size-7 items-center justify-center rounded-md border border-white/10 bg-white/5 cursor-pointer",
                        r.pdf
                          ? "text-white/60 hover:text-white"
                          : "text-white/20 cursor-not-allowed"
                      )}
                      aria-label="Download PDF"
                    >
                      <Download className="size-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {pageRows.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-12 text-center text-sm text-secondary-text"
                >
                  No reports in this filter.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-white/10">
        <p className="text-xs text-white/60">
          Showing {filteredCount === 0 ? 0 : (safePage - 1) * pageSize + 1}–
          {Math.min(safePage * pageSize, filteredCount)} of{" "}
          <span className="font-semibold text-white">{filteredCount}</span>{" "}
          reports
        </p>
        <div className="flex items-center gap-2">
          {pageButtons.map((p, i) =>
            p === "…" ? (
              <span
                key={`ellipsis-${i}`}
                className="px-1 text-xs text-white/60"
              >
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPage(p)}
                className={cn(
                  "size-8 rounded-lg text-xs cursor-pointer border transition-colors",
                  safePage === p
                    ? "bg-[#FBBF24] text-black font-semibold border-transparent"
                    : "bg-white/5 text-white/60 border-white/10 hover:text-white"
                )}
              >
                {p}
              </button>
            )
          )}
        </div>
      </div>
    </Card>
  </AnimatedContainer>
);

export default ReportsTable;
