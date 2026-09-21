import { Link } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/Popover";
import { cn } from "@/lib/utils";
import { AVATAR_COLORS } from "../../EmployeeManagement/data";
import { resendInvitation, type InvitationRow } from "../data";
import { completionClass, inviteClass } from "./statusStyles";

type InvitationTableProps = {
  invitations: InvitationRow[];
  pageRows: InvitationRow[];
  selected: Set<string>;
  filteredCount: number;
  safePage: number;
  pageSize: number;
  pageButtons: (number | "…")[];
  onToggleAll: () => void;
  onToggleOne: (inviteId: string) => void;
  onPage: (page: number) => void;
  onCancel: (row: InvitationRow) => void;
};

const InvitationTable = ({
  invitations,
  pageRows,
  selected,
  filteredCount,
  safePage,
  pageSize,
  pageButtons,
  onToggleAll,
  onToggleOne,
  onPage,
  onCancel,
}: InvitationTableProps) => (
  <AnimatedContainer delay={0.1}>
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] text-left">
          <thead>
            <tr className="border-b border-white/[0.08] text-[11px] font-semibold uppercase tracking-[0.8px] text-white/60">
              <th className="px-4 py-3 w-9">
                <input
                  type="checkbox"
                  checked={
                    pageRows.length > 0 &&
                    pageRows.every((r) => selected.has(r.inviteId))
                  }
                  onChange={onToggleAll}
                  className="size-3.5 rounded-[3px] accent-[#FBBF24]"
                />
              </th>
              <th className="px-3 py-3">Employee Name</th>
              <th className="px-3 py-3">Employee ID</th>
              <th className="px-3 py-3">Department</th>
              <th className="px-3 py-3">Invite Date</th>
              <th className="px-3 py-3">Expiration Date</th>
              <th className="px-3 py-3">Reflection™</th>
              <th className="px-3 py-3">Invitation Status</th>
              <th className="px-3 py-3">Completion Status</th>
              <th className="px-3 py-3">Progress</th>
              <th className="px-3 py-3">Last Activity</th>
              <th className="px-3 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row, idx) => {
              const colorIdx =
                invitations.findIndex((i) => i.inviteId === row.inviteId) %
                AVATAR_COLORS.length;
              const pill = completionClass(row.assessmentStatus);
              const isPlainProgress = row.assessmentStatus === "In Progress";
              return (
                <tr
                  key={row.inviteId}
                  className="border-b border-white/[0.06] hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={selected.has(row.inviteId)}
                      onChange={() => onToggleOne(row.inviteId)}
                      className="size-3.5 rounded-[3px] accent-[#FBBF24]"
                    />
                  </td>
                  <td className="px-3 py-3.5">
                    <Link
                      to={`/enterprise/invitation-management/${row.inviteId}`}
                      className="flex items-center gap-2.5 no-underline group"
                    >
                      <span
                        className="flex size-8 items-center justify-center rounded-full text-[11px] font-bold text-black shrink-0"
                        style={{
                          backgroundColor:
                            AVATAR_COLORS[
                              (colorIdx >= 0 ? colorIdx : idx) %
                                AVATAR_COLORS.length
                            ],
                        }}
                      >
                        {row.initials}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[13px] font-semibold text-white group-hover:text-[#FBBF24]">
                          {row.name}
                        </span>
                        <span className="block text-[11px] text-white/60">
                          {row.role}
                        </span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-3 py-3.5 text-xs text-white/60">
                    #{row.employeeId}
                  </td>
                  <td className="px-3 py-3.5 text-[10px] font-semibold text-white">
                    {row.department}
                  </td>
                  <td className="px-3 py-3.5 text-[11px] text-white/60">
                    {row.inviteDate}
                  </td>
                  <td className="px-3 py-3.5 text-[11px] text-white/60">
                    {row.expirationDate}
                  </td>
                  <td className="px-3 py-3.5 text-[11px] font-medium text-white">
                    {row.blueprint}
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
                  <td className="px-3 py-3.5">
                    {isPlainProgress ? (
                      <span className="text-[10px] font-bold text-[#10B7BA]">
                        {row.assessmentStatus}
                      </span>
                    ) : (
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold",
                          pill
                        )}
                      >
                        {row.assessmentStatus}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3.5 min-w-[110px]">
                    <p className="text-[11px] font-medium text-white tabular-nums mb-1.5">
                      {row.completion}%
                    </p>
                    <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-white"
                        style={{ width: `${row.completion}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-[11px] text-white/60 whitespace-nowrap">
                    {row.lastActivity}
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
                            to={`/enterprise/invitation-management/${row.inviteId}`}
                            className="py-1.5 text-[14px] font-semibold text-white no-underline hover:text-[#FBBF24]"
                          >
                            Detail
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              resendInvitation(row.inviteId);
                              toast.success("Invitation resent.");
                            }}
                            className="py-1.5 text-left text-[14px] font-semibold text-white hover:text-[#FBBF24] cursor-pointer"
                          >
                            Resend
                          </button>
                          <button
                            type="button"
                            onClick={() => onCancel(row)}
                            className="py-1.5 text-left text-[14px] font-semibold text-[#CA4A3D] hover:text-red-400 cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              );
            })}
            {pageRows.length === 0 ? (
              <tr>
                <td
                  colSpan={12}
                  className="px-4 py-12 text-center text-sm text-secondary-text"
                >
                  No invitations in this filter.
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

export default InvitationTable;
