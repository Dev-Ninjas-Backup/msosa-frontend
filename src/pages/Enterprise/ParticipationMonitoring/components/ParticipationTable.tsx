import { Link } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/Popover";
import { cn } from "@/lib/utils";
import type { ParticipationRow } from "../data";
import { inviteClass, stageClass } from "./statusStyles";

type ParticipationTableProps = {
  pageRows: ParticipationRow[];
  selected: Set<string>;
  filteredCount: number;
  safePage: number;
  pageSize: number;
  pageButtons: (number | "…")[];
  onToggleAll: () => void;
  onToggleOne: (empId: string) => void;
  onPage: (page: number) => void;
};

const ParticipationTable = ({
  pageRows,
  selected,
  filteredCount,
  safePage,
  pageSize,
  pageButtons,
  onToggleAll,
  onToggleOne,
  onPage,
}: ParticipationTableProps) => (
  <AnimatedContainer delay={0.1}>
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-left">
          <thead>
            <tr className="border-b border-white/[0.06] text-[11px] font-semibold uppercase tracking-[0.8px] text-white/60">
              <th className="px-4 py-3.5 w-9">
                <input
                  type="checkbox"
                  checked={
                    pageRows.length > 0 &&
                    pageRows.every((r) => selected.has(r.empId))
                  }
                  onChange={onToggleAll}
                  className="size-3.5 rounded-[3px] accent-[#FBBF24]"
                />
              </th>
              <th className="px-3 py-3.5">EMP ID</th>
              <th className="px-3 py-3.5">Department</th>
              <th className="px-3 py-3.5">Invitation Status</th>
              <th className="px-3 py-3.5">Started Date</th>
              <th className="px-3 py-3.5">Current Stage</th>
              <th className="px-3 py-3.5">Progress %</th>
              <th className="px-3 py-3.5">Last Activity</th>
              <th className="px-3 py-3.5">Completion</th>
              <th className="px-3 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => (
              <tr
                key={row.empId}
                className="border-b border-white/[0.06] hover:bg-white/[0.02]"
              >
                <td className="px-4 py-3.5">
                  <input
                    type="checkbox"
                    checked={selected.has(row.empId)}
                    onChange={() => onToggleOne(row.empId)}
                    className="size-3.5 rounded-[3px] accent-[#FBBF24]"
                  />
                </td>
                <td className="px-3 py-3.5">
                  <Link
                    to={`/enterprise/participation-monitoring/${row.empId}`}
                    className="text-[11px] text-white/60 no-underline hover:text-[#FBBF24]"
                  >
                    {row.name}
                  </Link>
                </td>
                <td className="px-3 py-3.5 text-[11px] font-semibold text-white">
                  {row.department}
                </td>
                <td className="px-3 py-3.5">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold",
                      inviteClass(row.inviteStatus)
                    )}
                  >
                    {row.inviteStatus}
                  </span>
                </td>
                <td className="px-3 py-3.5 text-[11px] text-white/60">
                  {row.startedDate}
                </td>
                <td className="px-3 py-3.5">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold",
                      stageClass(row.stage)
                    )}
                  >
                    {row.stage}
                  </span>
                </td>
                <td className="px-3 py-3.5 min-w-[120px]">
                  <p className="text-[11px] font-bold text-white tabular-nums mb-1">
                    {row.progress}%
                  </p>
                  <div className="h-1 w-full rounded-sm bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-sm bg-white"
                      style={{ width: `${row.progress}%` }}
                    />
                  </div>
                </td>
                <td className="px-3 py-3.5 text-[10px] text-white/60">
                  {row.lastActivity}
                </td>
                <td className="px-3 py-3.5 text-[11px] font-medium text-white">
                  {row.completionLabel}
                </td>
                <td className="px-3 py-3.5 text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex size-8 items-center justify-center rounded-lg text-white/50 hover:bg-white/5 hover:text-white cursor-pointer"
                        aria-label="Row actions"
                      >
                        <MoreVertical className="size-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      className="w-[160px] p-0 overflow-hidden bg-[#191919] border border-white/10 rounded-[12px]"
                    >
                      <div className="flex flex-col gap-1 px-4 py-4">
                        <p className="text-[14px] font-semibold text-white/40 mb-2">
                          Options
                        </p>
                        <Link
                          to={`/enterprise/participation-monitoring/${row.empId}`}
                          className="py-1.5 text-[14px] font-semibold text-white no-underline hover:text-[#FBBF24]"
                        >
                          Detail
                        </Link>
                      </div>
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            ))}
            {pageRows.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-12 text-center text-sm text-secondary-text"
                >
                  No participants in this filter.
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
          employees
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

export default ParticipationTable;
