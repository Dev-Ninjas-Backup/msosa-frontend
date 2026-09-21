import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Search, TrendingDown, TrendingUp } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { cn } from "@/lib/utils";
import { EMPLOYEES } from "../EmployeeManagement/data";

const KPIS = [
  { label: "Total Invited", value: "325", delta: "+9.2%", up: true },
  { label: "Started", value: "241", delta: "+5.1%", up: true },
  { label: "In Progress", value: "158", delta: "+12.4%", up: true },
  { label: "Completed", value: "134", delta: "+12.4%", up: true },
  { label: "Not Started", value: "84", delta: "2.1%", up: false },
] as const;

const ROWS = EMPLOYEES.map((e, i) => ({
  empId: e.id,
  department: e.department,
  inviteStatus: e.inviteStatus,
  startedDate: e.startDate ?? "—",
  stage:
    e.assessmentStatus === "Completed"
      ? "Completed"
      : e.assessmentStatus === "In Progress" || e.assessmentStatus === "Started"
        ? "In Progress"
        : "Not Started",
  progress: e.completion,
  lastActivity: e.lastActivity,
  completionLabel:
    e.completion === 100
      ? "Completed"
      : e.completion > 0
        ? "Reflection In Progress"
        : "Awaiting Start",
  name: e.name,
}));

const ParticipationMonitoring = () => {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    return ROWS.filter((r) => {
      if (dept !== "all" && r.department !== dept) return false;
      if (status !== "all" && r.stage !== status) return false;
      if (
        q &&
        !`${r.empId} ${r.department} ${r.name}`
          .toLowerCase()
          .includes(q.toLowerCase())
      )
        return false;
      return true;
    });
  }, [q, dept, status]);

  return (
    <div className="space-y-5 sm:space-y-6 pb-8">
      <AnimatedContainer delay={0.04}>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
          {KPIS.map((k) => (
            <Card key={k.label} className="p-4">
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-[10px] font-medium",
                  k.up ? "text-teal-300" : "text-orange-300"
                )}
              >
                {k.up ? (
                  <TrendingUp className="size-3" />
                ) : (
                  <TrendingDown className="size-3" />
                )}
                {k.delta}
              </span>
              <p className="mt-2 text-2xl font-bold text-primary-text">{k.value}</p>
              <p className="mt-1 text-xs text-secondary-text">{k.label}</p>
              <p className="text-[10px] text-secondary-text/70">vs last cycle</p>
            </Card>
          ))}
          <Card className="p-4">
            <span className="inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium bg-teal-500/15 text-teal-300">
              On Track
            </span>
            <p className="mt-2 text-2xl font-bold text-primary-text">41%</p>
            <p className="mt-1 text-xs text-secondary-text">Completion Rate</p>
            <p className="text-[10px] text-secondary-text/70">134 of 325</p>
          </Card>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.08}>
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          <Input
            variant="soft"
            leftIcon={<Search className="size-4" />}
            placeholder="Search by Employee ID, Dept..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="lg:max-w-xs"
          />
          <Select
            variant="soft"
            className="w-full lg:w-40"
            options={[
              { label: "All Departments", value: "all" },
              ...Array.from(new Set(ROWS.map((r) => r.department))).map((d) => ({
                label: d,
                value: d,
              })),
            ]}
            value={dept}
            onChange={setDept}
            placeholder="Department"
          />
          <Select
            variant="soft"
            className="w-full lg:w-40"
            options={[
              { label: "All Status", value: "all" },
              { label: "In Progress", value: "In Progress" },
              { label: "Completed", value: "Completed" },
              { label: "Not Started", value: "Not Started" },
            ]}
            value={status}
            onChange={setStatus}
            placeholder="Status"
          />
          <span className="text-xs text-secondary-text lg:ml-auto">
            {filtered.length} Active
          </span>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.1}>
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-left">
              <thead>
                <tr className="border-b border-white/[0.08] text-xs text-secondary-text">
                  <th className="px-4 py-3.5 font-medium">EMP ID</th>
                  <th className="px-3 py-3.5 font-medium">Department</th>
                  <th className="px-3 py-3.5 font-medium">Invitation Status</th>
                  <th className="px-3 py-3.5 font-medium">Started Date</th>
                  <th className="px-3 py-3.5 font-medium">Current Stage</th>
                  <th className="px-3 py-3.5 font-medium">Progress %</th>
                  <th className="px-3 py-3.5 font-medium">Last Activity</th>
                  <th className="px-3 py-3.5 font-medium">Completion</th>
                  <th className="px-3 py-3.5 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr
                    key={row.empId}
                    className="border-b border-white/[0.06] hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3.5 text-sm text-primary-text">
                      #{row.empId}
                    </td>
                    <td className="px-3 py-3.5 text-sm text-primary-text">
                      {row.department}
                    </td>
                    <td className="px-3 py-3.5 text-sm text-secondary-text">
                      {row.inviteStatus}
                    </td>
                    <td className="px-3 py-3.5 text-sm text-secondary-text">
                      {row.startedDate}
                    </td>
                    <td className="px-3 py-3.5 text-sm text-primary-text">
                      {row.stage}
                    </td>
                    <td className="px-3 py-3.5 min-w-[110px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-teal-400"
                            style={{ width: `${row.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-secondary-text w-8">
                          {row.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3.5 text-xs text-secondary-text">
                      {row.lastActivity}
                    </td>
                    <td className="px-3 py-3.5 text-xs text-secondary-text">
                      {row.completionLabel}
                    </td>
                    <td className="px-3 py-3.5 text-right">
                      <Link
                        to={`/enterprise/employee-management/${row.empId}`}
                        className="inline-flex size-8 items-center justify-center rounded-lg text-secondary-text hover:bg-white/5 hover:text-[#F5C542] no-underline"
                        aria-label="View employee"
                      >
                        <Eye className="size-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </AnimatedContainer>

      <p className="text-center text-[10px] text-secondary-text/60 max-w-2xl mx-auto leading-relaxed">
        Reflection responses and personal assessment data are never exposed —
        Participation Monitoring™ displays participation status only.
      </p>
    </div>
  );
};

export default ParticipationMonitoring;
