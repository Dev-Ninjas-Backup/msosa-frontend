import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MoreHorizontal, Plus, Trash2, Pencil, Eye } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import Select from "@/ui/Select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/Popover";
import { cn } from "@/lib/utils";
import {
  AVATAR_COLORS,
  EMPLOYEES,
  type AssessmentStatus,
  type InviteStatus,
} from "./data";

const inviteClass = (s: InviteStatus) =>
  s === "Accepted"
    ? "bg-teal-500/15 text-teal-300"
    : s === "Invited"
      ? "bg-orange-500/15 text-orange-300"
      : s === "Suspended"
        ? "bg-red-500/15 text-red-300"
        : "bg-white/10 text-secondary-text";

const assessmentClass = (s: AssessmentStatus) =>
  s === "Completed"
    ? "text-teal-300"
    : s === "In Progress"
      ? "text-sky-300"
      : s === "Started"
        ? "text-orange-300"
        : s === "Suspended"
          ? "text-red-300"
          : "text-secondary-text";

const blueprintClass = (bp: string) =>
  bp === "None Assigned"
    ? "text-secondary-text"
    : bp.includes("Leadership")
      ? "text-orange-300"
      : "text-teal-300";

const PAGE_SIZE = 10;

const EmployeeManagement = () => {
  const [statusFilter, setStatusFilter] = useState<"Active" | "Suspended">(
    "Active"
  );
  const [dateRange, setDateRange] = useState("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(
    () => EMPLOYEES.filter((e) => e.accountStatus === statusFilter),
    [statusFilter]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleAll = () => {
    if (pageRows.every((r) => selected.has(r.id))) {
      setSelected((prev) => {
        const next = new Set(prev);
        pageRows.forEach((r) => next.delete(r.id));
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        pageRows.forEach((r) => next.add(r.id));
        return next;
      });
    }
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-5 sm:space-y-6 pb-8">
      <AnimatedContainer delay={0.04}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Select
              variant="soft"
              title="Status"
              className="w-[140px]"
              options={[
                { label: "All Time", value: "all" },
                { label: "Last 30 days", value: "30d" },
                { label: "This quarter", value: "q" },
              ]}
              value={dateRange}
              onChange={setDateRange}
              placeholder="Date Range"
            />
            <div className="flex items-center gap-2">
              {(["Active", "Suspended"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setStatusFilter(s);
                    setPage(1);
                  }}
                  className={cn(
                    "h-9 px-4 rounded-lg text-xs font-medium border cursor-pointer transition-colors",
                    statusFilter === s
                      ? s === "Active"
                        ? "bg-teal-500/15 border-teal-500/40 text-teal-300"
                        : "bg-white/10 border-white/20 text-white"
                      : "bg-transparent border-white/10 text-secondary-text hover:text-white"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <Button
            variant="primary"
            size="md"
            className="rounded-xl! self-start lg:self-center bg-[#FBBF24]!"
            onClick={() => toast.success("Add Employee flow coming soon.")}
          >
            <Plus className="size-4" />
            Add Employee
          </Button>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.08}>
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">
              <thead>
                <tr className="border-b border-white/[0.08] text-xs text-secondary-text">
                  <th className="px-4 py-3.5 w-10">
                    <input
                      type="checkbox"
                      checked={
                        pageRows.length > 0 &&
                        pageRows.every((r) => selected.has(r.id))
                      }
                      onChange={toggleAll}
                      className="size-3.5 rounded border-white/20 bg-transparent accent-[#F5C542]"
                    />
                  </th>
                  <th className="px-3 py-3.5 font-medium">Employee Name</th>
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
                {pageRows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className="border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3.5">
                      <input
                        type="checkbox"
                        checked={selected.has(row.id)}
                        onChange={() => toggleOne(row.id)}
                        className="size-3.5 rounded border-white/20 bg-transparent accent-[#F5C542]"
                      />
                    </td>
                    <td className="px-3 py-3.5">
                      <Link
                        to={`/enterprise/employee-management/${row.id}`}
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
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-primary-text group-hover:text-[#F5C542] transition-colors">
                            {row.name}
                          </span>
                          <span className="block text-xs text-secondary-text">
                            {row.role}
                          </span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-3 py-3.5 text-sm text-secondary-text">
                      #{row.id}
                    </td>
                    <td className="px-3 py-3.5 text-sm text-primary-text">
                      {row.department}
                    </td>
                    <td className="px-3 py-3.5 text-xs text-secondary-text">
                      {row.email}
                    </td>
                    <td
                      className={cn(
                        "px-3 py-3.5 text-sm",
                        blueprintClass(row.blueprint)
                      )}
                    >
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
                    <td
                      className={cn(
                        "px-3 py-3.5 text-sm font-medium",
                        assessmentClass(row.assessmentStatus)
                      )}
                    >
                      {row.assessmentStatus}
                    </td>
                    <td className="px-3 py-3.5 min-w-[120px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              row.completion === 100
                                ? "bg-teal-400"
                                : row.completion > 0
                                  ? "bg-sky-400"
                                  : "bg-white/20"
                            )}
                            style={{ width: `${row.completion}%` }}
                          />
                        </div>
                        <span className="text-xs text-secondary-text tabular-nums w-8">
                          {row.completion}%
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3.5 text-xs text-secondary-text whitespace-nowrap">
                      {row.lastActivity}
                    </td>
                    <td className="px-3 py-3.5 text-right">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className="inline-flex size-8 items-center justify-center rounded-lg text-secondary-text hover:bg-white/5 hover:text-white cursor-pointer"
                            aria-label="Row actions"
                          >
                            <MoreHorizontal className="size-4" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          align="end"
                          className="w-40 p-1.5 bg-[#0D1117] border border-white/10"
                        >
                          <p className="px-2.5 py-1.5 text-[10px] uppercase tracking-wider text-secondary-text">
                            Options
                          </p>
                          <Link
                            to={`/enterprise/employee-management/${row.id}`}
                            className="flex items-center gap-2 rounded-md px-2.5 py-2 text-sm text-primary-text hover:bg-white/5 no-underline"
                          >
                            <Eye className="size-3.5" />
                            Detail
                          </Link>
                          <button
                            type="button"
                            onClick={() => toast.message("Edit coming soon.")}
                            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm text-primary-text hover:bg-white/5 cursor-pointer"
                          >
                            <Pencil className="size-3.5" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              toast.error("Delete requires confirmation.")
                            }
                            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm text-red-400 hover:bg-red-500/10 cursor-pointer"
                          >
                            <Trash2 className="size-3.5" />
                            Delete
                          </button>
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3.5 border-t border-white/[0.08]">
            <p className="text-xs text-secondary-text">
              Showing {(page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}{" "}
              employees
            </p>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={cn(
                    "size-8 rounded-lg text-xs font-medium cursor-pointer transition-colors",
                    page === p
                      ? "bg-[#F5C542] text-black"
                      : "text-secondary-text hover:bg-white/5 hover:text-white"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </AnimatedContainer>

      <p className="text-center text-[10px] text-secondary-text/60 tracking-wide">
        Protected with enterprise-grade encryption
      </p>
    </div>
  );
};

export default EmployeeManagement;
