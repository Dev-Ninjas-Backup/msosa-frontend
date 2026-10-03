import { useState, useSyncExternalStore } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import AnimatedContainer from "@/common/AnimatedContainer";
import ConfirmModal from "@/components/reuseable/ConfirmModal";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import EmployeeFormModal from "./EmployeeFormModal";
import {
  AVATAR_COLORS,
  getEmployee,
  getEmployeesSnapshot,
  reactivateEmployee,
  removeEmployee,
  subscribeEmployees,
  suspendEmployee,
  updateEmployee,
  type EmployeeFormValues,
} from "./data";

const STATUS_BREAKDOWN = [
  { name: "Completed", value: 100, color: "#10B7BA" },
  { name: "In Progress", value: 0, color: "#60A5FA" },
  { name: "Not Started", value: 0, color: "#71717A" },
  { name: "Pending Review", value: 0, color: "#FB923C" },
];

const TIMELINE = [
  {
    title: "Employee Added",
    detail: "Account created in the system",
    date: "Jan 15, 2025",
  },
  {
    title: "Reflection Assigned",
    detail: "MindState™ Reflection assigned",
    date: "Feb 1, 2025",
  },
  {
    title: "Invitation Sent via Email",
    detail: "Secure invitation link delivered",
    date: "Feb 1, 2025",
  },
  {
    title: "Invitation Accepted",
    detail: "Employee confirmed participation",
    date: "Feb 2, 2025",
  },
  {
    title: "Started Reflection",
    detail: "Assessment session began",
    date: "Feb 3, 2025",
  },
  {
    title: "Completed Reflection",
    detail: "All modules submitted",
    date: "Feb 28, 2025",
    highlight: true,
  },
  {
    title: "Report Generated",
    detail: "Organizational report ready",
    date: "Mar 1, 2025",
    highlight: true,
  },
] as const;

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-0.5">
    <p className="text-[10px] font-semibold uppercase tracking-[0.8px] text-white/40">
      {label}
    </p>
    <p className="text-[13px] font-medium text-white leading-[19.5px]">
      {value}
    </p>
  </div>
);

const EmployeeDetail = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams<{ employeeId: string }>();
  useSyncExternalStore(
    subscribeEmployees,
    getEmployeesSnapshot,
    getEmployeesSnapshot
  );
  const employee = employeeId ? getEmployee(employeeId) : undefined;

  const [editOpen, setEditOpen] = useState(false);
  const [confirm, setConfirm] = useState<"suspend" | "remove" | "reactivate" | null>(
    null
  );

  if (!employee) {
    return <Navigate to="/enterprise/employee-management" replace />;
  }

  const avatarColor =
    AVATAR_COLORS[
      Math.max(
        0,
        getEmployeesSnapshot().findIndex((e) => e.id === employee.id)
      ) % AVATAR_COLORS.length
    ];

  const donutData =
    employee.completion === 100
      ? STATUS_BREAKDOWN
      : [
          {
            name: "Completed",
            value: employee.completion,
            color: "#10B7BA",
          },
          {
            name: "Remaining",
            value: Math.max(0, 100 - employee.completion),
            color: "#3f3f46",
          },
        ];

  const legend =
    employee.completion === 100
      ? STATUS_BREAKDOWN
      : [
          {
            name: "Completed",
            value: employee.completion,
            color: "#10B7BA",
          },
          {
            name: "In Progress",
            value: Math.max(0, 100 - employee.completion),
            color: "#60A5FA",
          },
          { name: "Not Started", value: 0, color: "#71717A" },
          { name: "Pending Review", value: 0, color: "#FB923C" },
        ];

  const handleEdit = (values: EmployeeFormValues) => {
    updateEmployee(employee.id, values);
    toast.success("Employee updated.");
    setEditOpen(false);
  };

  const handleConfirm = () => {
    if (confirm === "suspend") {
      suspendEmployee(employee.id);
      toast.success(`${employee.name} suspended.`);
    } else if (confirm === "reactivate") {
      reactivateEmployee(employee.id);
      toast.success(`${employee.name} reactivated.`);
    } else if (confirm === "remove") {
      removeEmployee(employee.id);
      toast.success(`${employee.name} removed.`);
      navigate("/enterprise/employee-management");
    }
    setConfirm(null);
  };

  const isSuspended = employee.accountStatus === "Suspended";

  return (
    <div className="space-y-8 pb-8">
      <AnimatedContainer delay={0.02}>
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-white/50">
          <Link
            to="/enterprise/employee-management"
            className="hover:text-[#FBBF24] no-underline text-white/50"
          >
            Employee Management™
          </Link>
          <span className="text-white/30 mx-0.5">&gt;</span>
          <span className="text-white/50">{employee.name}</span>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.04}>
        <div className="flex flex-col xl:flex-row xl:items-center gap-5">
          <div className="flex items-start gap-4 min-w-0 flex-1">
            <span
              className="flex size-[72px] items-center justify-center rounded-full text-[22px] font-black text-black shrink-0 tracking-wide"
              style={{ backgroundColor: avatarColor }}
            >
              {employee.initials}
            </span>
            <div className="min-w-0 pt-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-[22px] font-bold text-white leading-[33px] tracking-tight">
                  {employee.name}
                </h2>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-bold",
                    isSuspended
                      ? "bg-red-500/10 text-[#EF4444]"
                      : "bg-[rgba(16,183,186,0.1)] text-[#10B7BA]"
                  )}
                >
                  {employee.accountStatus}
                </span>
              </div>
              <p className="mt-1.5 text-[13px] text-white/60 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <span>{employee.role}</span>
                <span className="text-white/30">|</span>
                <span>{employee.department}</span>
                <span className="text-white/30">|</span>
                <span>#{employee.id}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setEditOpen(true)}
              className="h-9 px-[15px] rounded-lg border border-white/15 text-sm font-medium text-white/60 hover:text-white hover:border-white/30 cursor-pointer transition-colors"
            >
              Edit Employee
            </button>
            <button
              type="button"
              onClick={() =>
                setConfirm(isSuspended ? "reactivate" : "suspend")
              }
              className="h-9 px-[15px] rounded-lg border border-[rgba(249,115,22,0.25)] bg-[rgba(249,115,22,0.08)] text-sm font-medium text-[#F97316] hover:bg-[rgba(249,115,22,0.15)] cursor-pointer transition-colors"
            >
              {isSuspended ? "Reactivate" : "Suspend"}
            </button>
            <button
              type="button"
              onClick={() => setConfirm("remove")}
              className="h-9 px-[15px] rounded-lg border border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.08)] text-sm font-medium text-[#EF4444] hover:bg-[rgba(239,68,68,0.15)] cursor-pointer transition-colors"
            >
              Remove
            </button>
            <Button
              variant="primary"
              size="sm"
              className="rounded-lg! bg-[#FBBF24]! text-black! hover:bg-[#e8b93a]! h-9! px-[15px]! text-sm!"
              onClick={() =>
                toast.success("Assign Reflection flow coming soon.")
              }
            >
              Assign Reflection
            </Button>
          </div>
        </div>
      </AnimatedContainer>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.85fr)] gap-8">
        <div className="space-y-8">
          <AnimatedContainer delay={0.08}>
            <Card
              className="p-8"
              backgroundColor="rgba(255,255,255,0.05)"
              borderColor="rgba(255,255,255,0.1)"
              shadow="none"
            >
              <h3 className="text-[15px] font-bold text-white tracking-wide mb-8">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-4">
                  <Field label="Full Name" value={employee.name} />
                  <Field label="Email Address" value={employee.email} />
                  <Field label="Department" value={employee.department} />
                  <Field label="Team" value={employee.team} />
                </div>
                <div className="space-y-4">
                  <Field label="Employee ID" value={`#${employee.id}`} />
                  <Field label="Phone" value={employee.phone} />
                  <Field label="Job Title" value={employee.role} />
                  <Field label="Date Added" value={employee.dateAdded} />
                </div>
              </div>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={0.1}>
            <Card
              className="px-8 py-5"
              backgroundColor="rgba(255,255,255,0.05)"
              borderColor="#000"
              shadow="none"
            >
              <div className="flex items-center justify-between gap-3 mb-8">
                <h3 className="text-[15px] font-bold text-white">
                  Assessment Information
                </h3>
                <Link
                  to="/enterprise/reports"
                  className="text-xs font-medium text-[#FBBF24] hover:text-[#e8b93a] no-underline inline-flex items-center gap-1"
                >
                  View Full Report
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/40 p-4 mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-white">
                    {employee.blueprint}
                  </p>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-bold bg-[rgba(16,183,186,0.1)] text-[#10B7BA]">
                    {employee.assessmentStatus}
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/50">
                  Active Products™ • FAR Systems™
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Invite Date", value: employee.inviteDate ?? "—" },
                  { label: "Start Date", value: employee.startDate ?? "—" },
                  {
                    label: "Completed",
                    value: employee.completedDate ?? "—",
                  },
                  {
                    label: "Duration",
                    value: employee.duration ?? "—",
                    accent: !!employee.duration,
                  },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">
                      {m.label}
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-sm font-medium",
                        m.accent ? "text-[#10B7BA]" : "text-white"
                      )}
                    >
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={0.12}>
            <Card
              className="p-8"
              backgroundColor="rgba(255,255,255,0.05)"
              borderColor="rgba(255,255,255,0.1)"
              shadow="none"
            >
              <h3 className="text-[15px] font-bold text-white mb-6">
                Participation Summary
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  {
                    label: "Total Sessions",
                    value: String(employee.totalSessions),
                  },
                  {
                    label: "Current Progress",
                    value: `${employee.completion}%`,
                  },
                  {
                    label: "Prev. Assessments",
                    value: String(employee.prevAssessments),
                  },
                  {
                    label: "Report Available",
                    value: employee.reportAvailable ? "Yes" : "No",
                    check: employee.reportAvailable,
                  },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center"
                  >
                    <p className="text-xl font-bold text-white inline-flex items-center justify-center gap-1.5">
                      {m.value}
                      {"check" in m && m.check ? (
                        <Check className="size-4 text-[#10B7BA]" strokeWidth={3} />
                      ) : null}
                    </p>
                    <p className="mt-1 text-[10px] text-white/50">{m.label}</p>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p className="text-sm text-white">Overall Completion</p>
                  <p className="text-xs text-[#10B7BA]">
                    {employee.completion}% Complete
                  </p>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{ width: `${employee.completion}%` }}
                  />
                </div>
              </div>
            </Card>
          </AnimatedContainer>
        </div>

        <div className="space-y-8">
          <AnimatedContainer delay={0.1}>
            <Card
              className="p-6"
              backgroundColor="rgba(255,255,255,0.05)"
              borderColor="rgba(255,255,255,0.1)"
              shadow="none"
            >
              <h3 className="text-[15px] font-bold text-white mb-4">
                Assessment Status
              </h3>
              <div className="relative h-[180px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData}
                      dataKey="value"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={2}
                      stroke="none"
                    >
                      {donutData.map((d) => (
                        <Cell key={d.name} fill={d.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <p className="text-2xl font-bold text-white">
                    {employee.completion}%
                  </p>
                </div>
              </div>
              <ul className="space-y-2 mt-2">
                {legend.map((s) => (
                  <li
                    key={s.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="flex items-center gap-2 text-white/50">
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      {s.name}
                    </span>
                    <span className="text-white tabular-nums">{s.value}%</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <p className="text-xs text-white/50">Current Status</p>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-[rgba(16,183,186,0.1)] text-[#10B7BA]">
                  {employee.assessmentStatus}
                </span>
              </div>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={0.12}>
            <Card
              className="p-6"
              backgroundColor="rgba(255,255,255,0.05)"
              borderColor="rgba(255,255,255,0.1)"
              shadow="none"
            >
              <h3 className="text-[15px] font-bold text-white mb-5">
                Activity Timeline
              </h3>
              <ul>
                {TIMELINE.map((item, i) => (
                  <li key={item.title} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className={cn(
                          "size-2.5 rounded-full shrink-0 mt-1.5 ring-2 ring-[#0D1117]",
                          "highlight" in item && item.highlight
                            ? "bg-[#10B7BA]"
                            : "bg-[#10B7BA]/70"
                        )}
                      />
                      {i < TIMELINE.length - 1 ? (
                        <span className="w-px flex-1 min-h-8 bg-white/10 my-1" />
                      ) : null}
                    </div>
                    <div className="flex-1 pb-5 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm text-white">{item.title}</p>
                        <p className="mt-0.5 text-xs text-white/50">
                          {item.detail}
                        </p>
                      </div>
                      <span className="text-[10px] text-white/40 whitespace-nowrap shrink-0">
                        {item.date}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </AnimatedContainer>
        </div>
      </div>

      <div className="rounded-lg bg-white/[0.02] px-4 py-4 flex justify-center">
        <p className="text-[11px] text-white/40 text-center tracking-tight">
          FAR Systems™ uses enterprise-grade encryption. Your personal
          reflection data is private and secure.
        </p>
      </div>

      <EmployeeFormModal
        isOpen={editOpen}
        mode="edit"
        employee={employee}
        onClose={() => setEditOpen(false)}
        onSubmit={handleEdit}
      />

      <ConfirmModal
        isOpen={confirm !== null}
        onClose={() => setConfirm(null)}
        onConfirm={handleConfirm}
        variant={
          confirm === "remove"
            ? "danger"
            : confirm === "suspend"
              ? "warning"
              : "success"
        }
        title={
          confirm === "remove"
            ? "Remove employee?"
            : confirm === "suspend"
              ? "Suspend employee?"
              : "Reactivate employee?"
        }
        description={
          confirm === "remove"
            ? `Permanently remove ${employee.name} from the organization. This cannot be undone.`
            : confirm === "suspend"
              ? `Suspend ${employee.name}? They will lose access until reactivated.`
              : `Restore access for ${employee.name}?`
        }
        confirmText={
          confirm === "remove"
            ? "Remove"
            : confirm === "suspend"
              ? "Suspend"
              : "Reactivate"
        }
      />
    </div>
  );
};

export default EmployeeDetail;
