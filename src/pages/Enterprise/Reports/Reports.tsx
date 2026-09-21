import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Download, Eye, FileText, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";

type ReportStatus = "Approved" | "Pending" | "Archived";

const REPORTS = [
  {
    id: "RPT-2026-0041",
    name: "Leadership Visibility Report",
    blueprint: "Leadership Blueprint",
    department: "Executive",
    period: "Q3 2026",
    generated: "Jun 1, 2026",
    status: "Approved" as ReportStatus,
    pdf: true,
  },
  {
    id: "RPT-2026-0040",
    name: "MindState™ Q3 2026",
    blueprint: "MindState™ Reflection",
    department: "All Depts",
    period: "Q3 2026",
    generated: "Jun 1, 2026",
    status: "Approved" as ReportStatus,
    pdf: true,
  },
  {
    id: "RPT-2026-0039",
    name: "Team Assessment Report",
    blueprint: "Team Health Blueprint",
    department: "Engineering",
    period: "Q3 2026",
    generated: "May 31, 2026",
    status: "Approved" as ReportStatus,
    pdf: true,
  },
  {
    id: "RPT-2026-0038",
    name: "Sales Performance Report",
    blueprint: "Leadership Blueprint",
    department: "Sales",
    period: "Q2 2026",
    generated: "May 15, 2026",
    status: "Pending" as ReportStatus,
    pdf: false,
  },
  {
    id: "RPT-2025-0120",
    name: "Org Readiness™ Q4 2025",
    blueprint: "Org Readiness™",
    department: "All Depts",
    period: "Q4 2025",
    generated: "Dec 31, 2025",
    status: "Archived" as ReportStatus,
    pdf: true,
  },
];

const KPIS = [
  { label: "Total Reports", value: "125", delta: "+5.2%" },
  { label: "Completed Reports", value: "118", delta: "+2.1%" },
  { label: "Pending Reports", value: "7", delta: "" },
  { label: "This Quarter", value: "Q3 2026", delta: "" },
  { label: "Previous Quarter", value: "Q2 2026", delta: "" },
  { label: "Org Completion", value: "91%", delta: "" },
  { label: "PDF Available", value: "118", delta: "+1.8%" },
] as const;

const statusClass = (s: ReportStatus) =>
  s === "Approved"
    ? "bg-teal-500/15 text-teal-300"
    : s === "Pending"
      ? "bg-orange-500/15 text-orange-300"
      : "bg-white/10 text-secondary-text";

const Reports = () => {
  const [tab, setTab] = useState<"Active" | "Archived">("Active");
  const filtered = useMemo(
    () =>
      REPORTS.filter((r) =>
        tab === "Active" ? r.status !== "Archived" : r.status === "Archived"
      ),
    [tab]
  );

  return (
    <div className="space-y-5 sm:space-y-6 pb-8">
      <AnimatedContainer delay={0.04}>
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-3">
          {KPIS.map((k) => (
            <Card key={k.label} className="p-3.5">
              {k.delta ? (
                <span className="inline-flex items-center gap-1 text-[10px] text-teal-300">
                  <TrendingUp className="size-3" />
                  {k.delta}
                </span>
              ) : (
                <span className="h-3.5 block" />
              )}
              <p className="mt-1.5 text-lg font-bold text-primary-text">{k.value}</p>
              <p className="mt-1 text-[10px] text-secondary-text">{k.label}</p>
            </Card>
          ))}
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.08}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-lg text-primary-text">
            All Reports ({REPORTS.length})
          </h3>
          <div className="flex items-center gap-2">
            {(["Active", "Archived"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "h-9 px-4 rounded-lg text-xs font-medium border cursor-pointer",
                  tab === t
                    ? "bg-white/10 border-white/20 text-white"
                    : "border-white/10 text-secondary-text hover:text-white"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.1}>
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-left">
              <thead>
                <tr className="border-b border-white/[0.08] text-xs text-secondary-text">
                  <th className="px-4 py-3.5 font-medium">Report Name</th>
                  <th className="px-3 py-3.5 font-medium">Blueprint</th>
                  <th className="px-3 py-3.5 font-medium">Department</th>
                  <th className="px-3 py-3.5 font-medium">Reporting Period</th>
                  <th className="px-3 py-3.5 font-medium">Generated Date</th>
                  <th className="px-3 py-3.5 font-medium">Status</th>
                  <th className="px-3 py-3.5 font-medium">PDF</th>
                  <th className="px-3 py-3.5 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-white/[0.06] hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <FileText className="size-4 text-primary-brand shrink-0" />
                        <span className="text-sm font-medium text-primary-text">
                          {r.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3.5 text-sm text-secondary-text">
                      {r.blueprint}
                    </td>
                    <td className="px-3 py-3.5 text-sm text-primary-text">
                      {r.department}
                    </td>
                    <td className="px-3 py-3.5 text-sm text-secondary-text">
                      {r.period}
                    </td>
                    <td className="px-3 py-3.5 text-sm text-secondary-text">
                      {r.generated}
                    </td>
                    <td className="px-3 py-3.5">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium",
                          statusClass(r.status)
                        )}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-xs text-teal-300">
                      {r.pdf ? "✓ PDF" : "—"}
                    </td>
                    <td className="px-3 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="soft"
                          size="sm"
                          className="rounded-lg!"
                          asChild
                        >
                          <Link to={`/enterprise/reports/${r.id}`}>
                            <Eye className="size-3.5" />
                            View
                          </Link>
                        </Button>
                        {r.pdf ? (
                          <Button
                            variant="soft"
                            size="sm"
                            className="rounded-lg!"
                            onClick={() => toast.success("PDF download started.")}
                          >
                            <Download className="size-3.5" />
                          </Button>
                        ) : null}
                      </div>
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

export default Reports;
