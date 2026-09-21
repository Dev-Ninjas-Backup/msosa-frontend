import { useMemo, useState, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import ConfirmModal from "@/components/reuseable/ConfirmModal";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import Select from "@/ui/Select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/Popover";
import { cn } from "@/lib/utils";
import EmployeeFormModal from "./EmployeeFormModal";
import {
  AVATAR_COLORS,
  addEmployee,
  getEmployeesSnapshot,
  removeEmployee,
  subscribeEmployees,
  updateEmployee,
  type AssessmentStatus,
  type EmployeeFormValues,
  type EmployeeRow,
  type InviteStatus,
} from "./data";

const inviteClass = (s: InviteStatus) =>
  s === "Accepted"
    ? "bg-[rgba(16,183,186,0.1)] text-[#10B7BA]"
    : s === "Invited"
      ? "bg-orange-500/10 text-[#F97316]"
      : s === "Suspended"
        ? "bg-red-500/10 text-[#EF4444]"
        : "bg-white/5 text-[#9CA3AF]";

const assessmentClass = (s: AssessmentStatus) =>
  s === "Completed"
    ? "text-[#10B7BA]"
    : s === "In Progress"
      ? "text-sky-300"
      : s === "Started"
        ? "text-[#F97316]"
        : s === "Suspended"
          ? "text-[#EF4444]"
          : s === "Pending"
            ? "text-[#F97316]"
            : "text-[#9CA3AF]";

const PAGE_SIZE = 10;

const EmployeeManagement = () => {
  const employees = useSyncExternalStore(
    subscribeEmployees,
    getEmployeesSnapshot,
    getEmployeesSnapshot
  );
  const [statusFilter, setStatusFilter] = useState<"Active" | "Suspended">(
    "Active"
  );
  const [inviteFilter, setInviteFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [editing, setEditing] = useState<EmployeeRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EmployeeRow | null>(null);

  const filtered = useMemo(
    () =>
      employees.filter((e) => {
        if (e.accountStatus !== statusFilter) return false;
        if (inviteFilter !== "all" && e.inviteStatus !== inviteFilter)
          return false;
        return true;
      }),
    [employees, statusFilter, inviteFilter]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

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

  const openAdd = () => {
    setFormMode("add");
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (row: EmployeeRow) => {
    setFormMode("edit");
    setEditing(row);
    setFormOpen(true);
  };

  const handleFormSubmit = (values: EmployeeFormValues) => {
    if (formMode === "add") {
      const row = addEmployee(values);
      toast.success(`${row.name} added.`);
    } else if (editing) {
      updateEmployee(editing.id, values);
      toast.success("Employee updated.");
    }
    setFormOpen(false);
    setEditing(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    removeEmployee(deleteTarget.id);
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(deleteTarget.id);
      return next;
    });
    toast.success(`${deleteTarget.name} removed.`);
    setDeleteTarget(null);
  };

  const pageButtons = (() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    return [1, 2, 3, "…" as const, totalPages];
  })();

  return (
    <div className="space-y-6 pb-8">
      <AnimatedContainer delay={0.04}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-end gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Select
              variant="soft"
              title="Status"
              className="w-[130px]"
              options={[
                { label: "All Statuses", value: "all" },
                { label: "Accepted", value: "Accepted" },
                { label: "Invited", value: "Invited" },
                { label: "Pending", value: "Pending" },
                { label: "Suspended", value: "Suspended" },
              ]}
              value={inviteFilter}
              onChange={(v) => {
                setInviteFilter(v);
                setPage(1);
              }}
              placeholder="Status"
            />
            <Select
              variant="soft"
              title="Date Range"
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
            <div className="flex items-center gap-0.5 rounded-lg border border-white/10 bg-black p-1.5">
              {(["Active", "Suspended"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setStatusFilter(s);
                    setPage(1);
                  }}
                  className={cn(
                    "h-7 px-2.5 rounded-md text-[11px] cursor-pointer transition-colors",
                    statusFilter === s
                      ? s === "Active"
                        ? "bg-[rgba(16,183,186,0.2)] text-[#10B7BA] font-semibold"
                        : "bg-white/10 text-white font-semibold"
                      : "text-[#9CA3AF] font-normal hover:text-white"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="rounded-lg! self-start sm:self-auto bg-[#FBBF24]! text-black! hover:bg-[#e8b93a]! h-8! px-3.5! text-xs!"
            onClick={openAdd}
          >
            + Add Employee
          </Button>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.08}>
        <Card
          className="overflow-hidden p-0"
          backgroundColor="rgba(255,255,255,0.05)"
          borderColor="rgba(255,255,255,0.1)"
          shadow="none"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1180px] text-left">
              <thead>
                <tr className="border-b border-black text-[11px] font-semibold uppercase tracking-[0.8px] text-white/60">
                  <th className="px-4 py-3 w-9">
                    <input
                      type="checkbox"
                      checked={
                        pageRows.length > 0 &&
                        pageRows.every((r) => selected.has(r.id))
                      }
                      onChange={toggleAll}
                      className="size-3.5 rounded-[3px] border border-white/40 bg-transparent accent-[#FBBF24]"
                    />
                  </th>
                  <th className="px-3 py-3">Employee Name</th>
                  <th className="px-3 py-3">Employee ID</th>
                  <th className="px-3 py-3">Department</th>
                  <th className="px-3 py-3">Email</th>
                  <th className="px-3 py-3">Reflection™</th>
                  <th className="px-3 py-3">Invitation Status</th>
                  <th className="px-3 py-3">Assessment Status</th>
                  <th className="px-3 py-3">Completion</th>
                  <th className="px-3 py-3">Last Activity</th>
                  <th className="px-3 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((row, idx) => {
                  const colorIdx =
                    employees.findIndex((e) => e.id === row.id) %
                    AVATAR_COLORS.length;
                  return (
                    <tr
                      key={row.id}
                      className="border-b border-black bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                    >
                      <td className="px-4 py-[15px]">
                        <input
                          type="checkbox"
                          checked={selected.has(row.id)}
                          onChange={() => toggleOne(row.id)}
                          className="size-3.5 rounded-[3px] border border-white/40 bg-transparent accent-[#FBBF24]"
                        />
                      </td>
                      <td className="px-3 py-[15px]">
                        <Link
                          to={`/enterprise/employee-management/${row.id}`}
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
                            <span className="block text-[13px] font-semibold text-white group-hover:text-[#FBBF24] transition-colors leading-[19.5px]">
                              {row.name}
                            </span>
                            <span className="block text-[11px] text-white/60 leading-[16.5px]">
                              {row.role}
                            </span>
                          </span>
                        </Link>
                      </td>
                      <td className="px-3 py-[15px] text-xs text-white/60">
                        #{row.id}
                      </td>
                      <td className="px-3 py-[15px] text-[10px] font-semibold text-white">
                        {row.department}
                      </td>
                      <td className="px-3 py-[15px] text-[11px] text-white/60">
                        {row.email}
                      </td>
                      <td className="px-3 py-[15px] text-[11px] font-medium text-white">
                        {row.blueprint}
                      </td>
                      <td className="px-3 py-[15px]">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold",
                            inviteClass(row.inviteStatus)
                          )}
                        >
                          {row.inviteStatus}
                        </span>
                      </td>
                      <td
                        className={cn(
                          "px-3 py-[15px] text-[10px] font-bold",
                          assessmentClass(row.assessmentStatus)
                        )}
                      >
                        {row.assessmentStatus}
                      </td>
                      <td className="px-3 py-[15px] min-w-[120px]">
                        <p className="text-[11px] font-medium text-white tabular-nums mb-1.5">
                          {row.completion}%
                        </p>
                        <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#10B7BA]"
                            style={{ width: `${row.completion}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-3 py-[15px] text-[11px] text-white/60 whitespace-nowrap">
                        {row.lastActivity}
                      </td>
                      <td className="px-3 py-[15px] text-right">
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
                            className="w-[160px] p-0 overflow-hidden bg-[#191919] border border-white/10 rounded-[12px] shadow-lg"
                          >
                            <div className="flex flex-col gap-1 px-4 py-4">
                              <p className="text-[14px] font-semibold text-white/40 mb-2">
                                Options
                              </p>
                              <Link
                                to={`/enterprise/employee-management/${row.id}`}
                                className="py-1.5 text-[14px] font-semibold text-white no-underline hover:text-[#FBBF24]"
                              >
                                Detail
                              </Link>
                              <button
                                type="button"
                                onClick={() => openEdit(row)}
                                className="py-1.5 text-left text-[14px] font-semibold text-white hover:text-[#FBBF24] cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteTarget(row)}
                                className="py-1.5 text-left text-[14px] font-semibold text-[#CA4A3D] hover:text-red-400 cursor-pointer"
                              >
                                Delete
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
                      colSpan={11}
                      className="px-4 py-12 text-center text-sm text-secondary-text"
                    >
                      No employees in this filter.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-white/10">
            <p className="text-xs text-white/60">
              Showing{" "}
              {filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–
              {Math.min(safePage * PAGE_SIZE, filtered.length)} of{" "}
              <span className="font-semibold text-white">
                {filtered.length}
              </span>{" "}
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
                    onClick={() => setPage(p)}
                    className={cn(
                      "size-8 rounded-lg text-xs cursor-pointer transition-colors border",
                      safePage === p
                        ? "bg-[#FBBF24] text-black font-semibold border-transparent"
                        : "bg-white/5 text-white/60 border-white/10 hover:text-white hover:bg-white/10"
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

      <div className="rounded-lg bg-white/[0.02] px-4 py-4 flex justify-center">
        <p className="text-[11px] text-white/40 text-center tracking-tight">
          FAR Systems™ uses enterprise-grade encryption. Your personal
          reflection data is private and secure.
        </p>
      </div>

      <EmployeeFormModal
        isOpen={formOpen}
        mode={formMode}
        employee={editing}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSubmit={handleFormSubmit}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        variant="danger"
        title="Remove employee?"
        description={
          deleteTarget
            ? `Permanently remove ${deleteTarget.name} from the organization roster. This cannot be undone.`
            : ""
        }
        confirmText="Remove"
        cancelText="Cancel"
      />
    </div>
  );
};

export default EmployeeManagement;
