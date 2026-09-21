import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { toast } from "sonner";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { AVATAR_COLORS, getEmployee } from "./data";

const STATUS_BREAKDOWN = [
  { name: "Completed", value: 100, color: "#2DD4BF" },
  { name: "In Progress", value: 0, color: "#60A5FA" },
  { name: "Not Started", value: 0, color: "#71717A" },
  { name: "Pending Review", value: 0, color: "#FB923C" },
];

const TIMELINE = [
  {
    title: "Employee Added",
    detail: "Account created in the system",
    date: "Jan 15, 2025",
    done: true,
  },
  {
    title: "Blueprint Assigned",
    detail: "MindState™ Reflection assigned",
    date: "Feb 1, 2025",
    done: true,
  },
  {
    title: "Invitation Sent via Email",
    detail: "Secure invitation link delivered",
    date: "Feb 1, 2025",
    done: true,
  },
  {
    title: "Invitation Accepted",
    detail: "Employee confirmed participation",
    date: "Feb 2, 2025",
    done: true,
  },
  {
    title: "Started Reflection",
    detail: "Assessment session began",
    date: "Feb 3, 2025",
    done: true,
  },
  {
    title: "Completed Reflection",
    detail: "All modules submitted",
    date: "Feb 28, 2025",
    done: true,
    highlight: true,
  },
  {
    title: "Report Generated",
    detail: "Organizational report ready",
    date: "Mar 1, 2025",
    done: true,
    highlight: true,
  },
] as const;

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[10px] uppercase tracking-[0.08em] text-secondary-text">
      {label}
    </p>
    <p className="mt-1 text-sm text-primary-text">{value}</p>
  </div>
);

const EmployeeDetail = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const employee = employeeId ? getEmployee(employeeId) : undefined;

  if (!employee) {
    return <Navigate to="/enterprise/employee-management" replace />;
  }

  const avatarColor = AVATAR_COLORS[0];
  const donutData =
    employee.completion === 100
      ? STATUS_BREAKDOWN
      : [
          {
            name: "Completed",
            value: employee.completion,
            color: "#2DD4BF",
          },
          {
            name: "Remaining",
            value: 100 - employee.completion,
            color: "#3f3f46",
          },
        ];

  return (
    <div className="space-y-5 sm:space-y-6 pb-8">
      <AnimatedContainer delay={0.02}>
        <Link
          to="/enterprise/employee-management"
          className="inline-flex items-center gap-1.5 text-xs text-secondary-text hover:text-[#F5C542] no-underline"
        >
          <ArrowLeft className="size-3.5" />
          Employee Management™
          <span className="text-white/30 mx-1">/</span>
          <span className="text-primary-text">{employee.name}</span>
        </Link>
      </AnimatedContainer>

      <AnimatedContainer delay={0.04}>
        <Card className="p-5 sm:p-6">
          <div className="flex flex-col xl:flex-row xl:items-center gap-5">
            <div className="flex items-start gap-4 min-w-0 flex-1">
              <span
                className="flex size-16 sm:size-20 items-center justify-center rounded-full text-lg sm:text-xl font-bold text-black shrink-0"
                style={{ backgroundColor: avatarColor }}
              >
                {employee.initials}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {employee.name}
                  </h2>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-medium",
                      employee.accountStatus === "Active"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-red-500/15 text-red-300"
                    )}
                  >
                    {employee.accountStatus}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-secondary-text">
                  {employee.role}
                  <span className="mx-2 text-white/20">|</span>
                  {employee.department}
                  <span className="mx-2 text-white/20">|</span>
                  #{employee.id}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <Button
                variant="soft"
                size="sm"
                className="rounded-lg!"
                onClick={() => toast.message("Edit coming soon.")}
              >
                Edit Employee
              </Button>
              <Button
                variant="soft"
                size="sm"
                className="rounded-lg! text-orange-300!"
                onClick={() => toast.message("Suspend coming soon.")}
              >
                Suspend
              </Button>
              <Button
                variant="soft"
                size="sm"
                className="rounded-lg! text-red-400!"
                onClick={() => toast.error("Remove requires confirmation.")}
              >
                Remove
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="rounded-lg! bg-[#FBBF24]!"
                onClick={() => toast.success("Assign Blueprint™ coming soon.")}
              >
                Assign Blueprint™
              </Button>
            </div>
          </div>
        </Card>
      </AnimatedContainer>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)] gap-4 sm:gap-6">
        <div className="space-y-4 sm:space-y-6">
          <AnimatedContainer delay={0.08}>
            <Card className="p-5 sm:p-6">
              <h3 className="text-lg text-primary-text mb-5">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                <Field label="Full Name" value={employee.name} />
                <Field label="Employee ID" value={`#${employee.id}`} />
                <Field label="Email Address" value={employee.email} />
                <Field label="Phone" value={employee.phone} />
                <Field label="Department" value={employee.department} />
                <Field label="Job Title" value={employee.role} />
                <Field label="Team" value={employee.team} />
                <Field label="Date Added" value={employee.dateAdded} />
              </div>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={0.1}>
            <Card className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3 mb-5">
                <h3 className="text-lg text-primary-text">
                  Assessment Information
                </h3>
                <Link
                  to="/enterprise/reports"
                  className="text-xs font-medium text-[#F5C542] hover:text-[#e8b93a] no-underline inline-flex items-center gap-1"
                >
                  View Full Report
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-primary-text">
                    {employee.blueprint}
                  </p>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-medium bg-teal-500/15 text-teal-300">
                    {employee.assessmentStatus}
                  </span>
                </div>
                <p className="mt-1 text-xs text-secondary-text">
                  Active Blueprint • FAR Systems™
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
                    className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-secondary-text">
                      {m.label}
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-sm font-medium",
                        m.accent ? "text-teal-300" : "text-primary-text"
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
            <Card className="p-5 sm:p-6">
              <h3 className="text-lg text-primary-text mb-5">
                Participation Summary
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
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
                  },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 text-center"
                  >
                    <p className="text-xl font-bold text-primary-text">
                      {m.value}
                    </p>
                    <p className="mt-1 text-[10px] text-secondary-text">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p className="text-sm text-primary-text">Overall Completion</p>
                  <p className="text-xs text-teal-300">
                    {employee.completion}% Complete
                  </p>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-300"
                    style={{ width: `${employee.completion}%` }}
                  />
                </div>
              </div>
            </Card>
          </AnimatedContainer>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <AnimatedContainer delay={0.1}>
            <Card className="p-5 sm:p-6">
              <h3 className="text-lg text-primary-text mb-4">
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
                  <p className="text-2xl font-bold text-primary-text">
                    {employee.completion}%
                  </p>
                </div>
              </div>
              <ul className="space-y-2 mt-2">
                {(employee.completion === 100
                  ? STATUS_BREAKDOWN
                  : [
                      {
                        name: "Completed",
                        value: employee.completion,
                        color: "#2DD4BF",
                      },
                      {
                        name: "In Progress",
                        value: Math.max(0, 100 - employee.completion),
                        color: "#60A5FA",
                      },
                      { name: "Not Started", value: 0, color: "#71717A" },
                      { name: "Pending Review", value: 0, color: "#FB923C" },
                    ]
                ).map((s) => (
                  <li
                    key={s.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="flex items-center gap-2 text-secondary-text">
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      {s.name}
                    </span>
                    <span className="text-primary-text tabular-nums">
                      {s.value}%
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <p className="text-xs text-secondary-text">Current Status</p>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-medium bg-teal-500/15 text-teal-300">
                  {employee.assessmentStatus}
                </span>
              </div>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={0.12}>
            <Card className="p-5 sm:p-6">
              <h3 className="text-lg text-primary-text mb-5">
                Activity Timeline
              </h3>
              <ul className="space-y-0">
                {TIMELINE.map((item, i) => (
                  <li key={item.title} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      {item.done ? (
                        <CheckCircle2
                          className={cn(
                            "size-4 shrink-0",
                            "highlight" in item && item.highlight
                              ? "text-teal-400"
                              : "text-primary-brand"
                          )}
                        />
                      ) : (
                        <Circle className="size-4 text-secondary-text shrink-0" />
                      )}
                      {i < TIMELINE.length - 1 ? (
                        <span className="w-px flex-1 min-h-6 bg-white/10 my-1" />
                      ) : null}
                    </div>
                    <div className="flex-1 pb-5 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm text-primary-text">{item.title}</p>
                        <p className="mt-0.5 text-xs text-secondary-text">
                          {item.detail}
                        </p>
                      </div>
                      <span className="text-[10px] text-muted-blue whitespace-nowrap shrink-0">
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

      <p className="text-center text-[10px] text-secondary-text/60 tracking-wide">
        Protected with enterprise-grade encryption
      </p>
    </div>
  );
};

export default EmployeeDetail;
