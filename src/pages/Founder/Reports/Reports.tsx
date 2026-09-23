import { useMemo, useState } from "react";
import { Download, FileBarChart, MoreVertical } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import {
  DataPanel,
  FilterSelect,
  GhostAction,
  MiniStat,
  PageToolbar,
  PrimaryAction,
  StatCard,
  StatusPill,
} from "../_shared/FounderPageKit";

const REPORTS = [
  {
    id: "RPT-88421",
    name: "Q4 Growth Narrative",
    user: "Sophia Loren",
    org: "Global Tech Solutions",
    status: "Approved" as const,
    size: "2.8 MB",
    generated: "Today, 9:12 AM",
  },
  {
    id: "RPT-88402",
    name: "Leadership Continuum",
    user: "Marcus Thorne",
    org: "FAR Platform Engine™",
    status: "Pending" as const,
    size: "1.9 MB",
    generated: "Today, 8:40 AM",
  },
  {
    id: "RPT-88390",
    name: "Team Alignment Summary",
    user: "James Okonkwo",
    org: "Stellar Tech Corp",
    status: "Delivered" as const,
    size: "3.1 MB",
    generated: "Yesterday",
  },
  {
    id: "RPT-88311",
    name: "Decision Clarity Report",
    user: "Ava Chen",
    org: "Individual",
    status: "Failed" as const,
    size: "—",
    generated: "Oct 11, 2023",
  },
  {
    id: "RPT-88250",
    name: "Founder Review Pack",
    user: "Elena Rossi",
    org: "Boutique Consulting",
    status: "Archived" as const,
    size: "4.2 MB",
    generated: "Oct 02, 2023",
  },
];

const tone = {
  Approved: "success",
  Pending: "warn",
  Delivered: "info",
  Failed: "danger",
  Archived: "neutral",
} as const;

const Reports = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return REPORTS.filter((r) => {
      const matchQ =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.user.toLowerCase().includes(q) ||
        r.org.toLowerCase().includes(q);
      const matchS = status === "All" || r.status === status;
      return matchQ && matchS;
    });
  }, [query, status]);

  return (
    <AnimatedContainer className="space-y-6 pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Report Management™</h2>
          <p className="text-sm text-white/55">
            Monitor analytics delivery, approval workflows, and report generation cycles.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <GhostAction title="Templates" />
          <PrimaryAction title="Export Reports" leftIcon={<Download className="size-4" />} />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Reports" value="42,892" hint="+5.4% growth" hintTone="up" icon={<FileBarChart className="size-5" />} />
        <StatCard label="Generated Today" value="1,248" hint="84.2% delivery rate" />
        <StatCard label="Pending Approval" value="18" hint="Priority: High" hintTone="warn" />
        <StatCard label="Failed Reports" value="7" hint="Action required" hintTone="warn" />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <MiniStat label="Approved" value="38.2k" tone="green" />
        <MiniStat label="Delivered" value="36.1k" />
        <MiniStat label="Archived" value="4.2k" />
        <MiniStat label="Templates" value="84" tone="gold" />
        <MiniStat label="Avg. Size" value="2.4 MB" />
        <MiniStat label="Most Generated" value="Q4 Growth" tone="gold" />
      </div>

      <PageToolbar
        search={query}
        onSearch={setQuery}
        searchPlaceholder="Search by ID, Name, User, Org..."
        filters={
          <>
            <FilterSelect label="Status" value={status} options={["All", "Approved", "Pending", "Delivered", "Failed", "Archived"]} onChange={setStatus} />
            <FilterSelect label="Division" value="All" options={["All", "Consumer", "Enterprise"]} onChange={() => {}} />
            <FilterSelect label="Date" value="30D" options={["7D", "30D", "90D"]} onChange={() => {}} />
          </>
        }
      />

      <DataPanel footer={`Showing ${rows.length} reports`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wide text-white/45">
                <th className="px-4 py-3 font-medium">Report</th>
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Organization</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Size</th>
                <th className="px-4 py-3 font-medium">Generated</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{r.name}</p>
                    <p className="text-xs text-white/40">{r.id}</p>
                  </td>
                  <td className="px-4 py-3 text-white/80">{r.user}</td>
                  <td className="px-4 py-3 text-white/60">{r.org}</td>
                  <td className="px-4 py-3">
                    <StatusPill label={r.status} tone={tone[r.status]} />
                  </td>
                  <td className="px-4 py-3 text-white/60">{r.size}</td>
                  <td className="px-4 py-3 text-white/60">{r.generated}</td>
                  <td className="px-4 py-3">
                    <button type="button" className="text-white/40 hover:text-white border-0 bg-transparent cursor-pointer" aria-label="Actions">
                      <MoreVertical className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataPanel>
    </AnimatedContainer>
  );
};

export default Reports;
