import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MoreHorizontal, Plus, TrendingDown, TrendingUp, Eye, RefreshCw, X } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/Popover";
import { cn } from "@/lib/utils";
import { AVATAR_COLORS } from "../EmployeeManagement/data";
import { INVITATIONS, INVITE_KPIS, type InvitationRow } from "./data";

const inviteClass = (s: InvitationRow["inviteStatus"]) =>
  s === "Accepted"
    ? "bg-teal-500/15 text-teal-300"
    : s === "Invited"
      ? "bg-orange-500/15 text-orange-300"
      : s === "Suspended"
        ? "bg-red-500/15 text-red-300"
        : "bg-white/10 text-secondary-text";

const InvitationManagement = () => {
  const [filter, setFilter] = useState<"Active" | "Expired">("Active");
  const filtered = useMemo(
    () => INVITATIONS.filter((i) => i.accountFilter === filter),
    [filter]
  );

  return (
    <div className="space-y-5 sm:space-y-6 pb-8">
      <AnimatedContainer delay={0.04}>
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3">
          {INVITE_KPIS.map((k) => (
            <Card key={k.label} className="p-3.5">
              <div className="flex items-center justify-between gap-1 mb-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 text-[10px] font-medium",
                    k.delta === "—"
                      ? "text-secondary-text"
                      : k.up
                        ? "text-teal-300"
                        : "text-orange-300"
                  )}
                >
                  {k.delta !== "—" ? (
                    k.up ? (
                      <TrendingUp className="size-3" />
                    ) : (
                      <TrendingDown className="size-3" />
                    )
                  ) : null}
                  {k.delta}
                </span>
              </div>
              <p className="text-xl font-bold text-primary-text leading-none">
                {k.value}
              </p>
              <p className="mt-1.5 text-[10px] text-secondary-text leading-tight">
                {k.label}
              </p>
            </Card>
          ))}
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.08}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            {(["Active", "Expired"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFilter(s)}
                className={cn(
                  "h-9 px-4 rounded-lg text-xs font-medium border cursor-pointer",
                  filter === s
                    ? s === "Active"
                      ? "bg-teal-500/15 border-teal-500/40 text-teal-300"
                      : "bg-white/10 border-white/20 text-white"
                    : "border-white/10 text-secondary-text hover:text-white"
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <Button
            variant="primary"
            size="md"
            className="rounded-xl! bg-[#FBBF24]! self-start"
            onClick={() => toast.success("Create Invitation coming soon.")}
          >
            <Plus className="size-4" />
            Create Invitation
          </Button>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.1}>
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead>
                <tr className="border-b border-white/[0.08] text-xs text-secondary-text">
                  <th className="px-4 py-3.5 font-medium">Employee Name</th>
                  <th className="px-3 py-3.5 font-medium">Employee ID</th>
                  <th className="px-3 py-3.5 font-medium">Department</th>
                  <th className="px-3 py-3.5 font-medium">Email</th>
                  <th className="px-3 py-3.5 font-medium">Blueprint™</th>
                  <th className="px-3 py-3.5 font-medium">Invite Status</th>
                  <th className="px-3 py-3.5 font-medium">Assessment</th>
                  <th className="px-3 py-3.5 font-medium">Completion</th>
                  <th className="px-3 py-3.5 font-medium">Last Activity</th>
                  <th className="px-3 py-3.5 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, idx) => (
                  <tr
                    key={row.inviteId}
                    className="border-b border-white/[0.06] hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3.5">
                      <Link
                        to={`/enterprise/invitation-management/${row.inviteId}`}
                        className="flex items-center gap-3 no-underline group"
                      >
                        <span
                          className="flex size-9 items-center justify-center rounded-full text-xs font-semibold text-black shrink-0"
                          style={{
                            backgroundColor:
                              AVATAR_COLORS[idx % AVATAR_COLORS.length],
                          }}
                        >
                          {row.initials}
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-primary-text group-hover:text-[#F5C542]">
                            {row.name}
                          </span>
                          <span className="block text-xs text-secondary-text">
                            {row.role}
                          </span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-3 py-3.5 text-sm text-secondary-text">
                      #{row.employeeId}
                    </td>
                    <td className="px-3 py-3.5 text-sm text-primary-text">
                      {row.department}
                    </td>
                    <td className="px-3 py-3.5 text-xs text-secondary-text">
                      {row.email}
                    </td>
                    <td className="px-3 py-3.5 text-sm text-teal-300">
                      {row.blueprint}
                    </td>
                    <td className="px-3 py-3.5">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium",
                          inviteClass(row.inviteStatus)
                        )}
                      >
                        {row.inviteStatus}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-sm text-primary-text">
                      {row.assessmentStatus}
                    </td>
                    <td className="px-3 py-3.5 text-xs text-secondary-text tabular-nums">
                      {row.completion}%
                    </td>
                    <td className="px-3 py-3.5 text-xs text-secondary-text">
                      {row.lastActivity}
                    </td>
                    <td className="px-3 py-3.5 text-right">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className="inline-flex size-8 items-center justify-center rounded-lg text-secondary-text hover:bg-white/5 cursor-pointer"
                          >
                            <MoreHorizontal className="size-4" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          align="end"
                          className="w-44 p-1.5 bg-[#0D1117] border border-white/10"
                        >
                          <Link
                            to={`/enterprise/invitation-management/${row.inviteId}`}
                            className="flex items-center gap-2 rounded-md px-2.5 py-2 text-sm text-primary-text hover:bg-white/5 no-underline"
                          >
                            <Eye className="size-3.5" />
                            Detail
                          </Link>
                          <button
                            type="button"
                            onClick={() => toast.success("Invitation resent.")}
                            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm text-primary-text hover:bg-white/5 cursor-pointer"
                          >
                            <RefreshCw className="size-3.5" />
                            Resend
                          </button>
                          <button
                            type="button"
                            onClick={() => toast.message("Invitation cancelled.")}
                            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm text-red-400 hover:bg-red-500/10 cursor-pointer"
                          >
                            <X className="size-3.5" />
                            Cancel
                          </button>
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </AnimatedContainer>
    </div>
  );
};

export default InvitationManagement;
