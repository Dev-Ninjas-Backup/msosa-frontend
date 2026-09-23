import { useMemo, useState } from "react";
import {
  Link2,
  Plus,
  QrCode,
  Share2,
  Ban,
  BarChart3,
  MoreVertical,
} from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
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

const LINKS = [
  {
    id: "LNK-99201",
    name: "Enterprise Onboarding Invite",
    type: "Invitation",
    status: "Active" as const,
    visits: 1284,
    created: "Oct 12, 2023",
    expires: "Nov 12, 2023",
  },
  {
    id: "LNK-99180",
    name: "FAR Reflection™ Product",
    type: "Product",
    status: "Active" as const,
    visits: 8420,
    created: "Sep 28, 2023",
    expires: "Never",
  },
  {
    id: "LNK-99110",
    name: "Q4 Growth Report Share",
    type: "Report",
    status: "Active" as const,
    visits: 392,
    created: "Oct 01, 2023",
    expires: "Oct 31, 2023",
  },
  {
    id: "LNK-99002",
    name: "Stellar Org Portal",
    type: "Organization",
    status: "Expired" as const,
    visits: 1102,
    created: "Jul 14, 2023",
    expires: "Sep 14, 2023",
  },
  {
    id: "LNK-98950",
    name: "Consumer Trial QR",
    type: "QR",
    status: "Active" as const,
    visits: 560,
    created: "Oct 08, 2023",
    expires: "Dec 08, 2023",
  },
];

const ACTIONS = [
  { title: "Create New Link", icon: Plus },
  { title: "Generate Invitation", icon: Share2 },
  { title: "Generate Product Link", icon: Link2 },
  { title: "Share Report", icon: Share2 },
  { title: "Generate QR Code", icon: QrCode },
  { title: "Disable Link", icon: Ban },
  { title: "View Link Analytics", icon: BarChart3 },
];

const LinkCenter = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LINKS.filter((l) => {
      const matchQ =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.id.toLowerCase().includes(q) ||
        l.type.toLowerCase().includes(q);
      const matchT = type === "All" || l.type === type;
      const matchS = status === "All" || l.status === status;
      return matchQ && matchT && matchS;
    });
  }, [query, type, status]);

  return (
    <AnimatedContainer className="space-y-6 pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/55">
          Manage external integrations, invitation portals, and shareable FAR links.
        </p>
        <div className="flex flex-wrap gap-2">
          <GhostAction title="Export Link List" />
          <PrimaryAction title="Create New Link" leftIcon={<Plus className="size-4" />} />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Active Links" value="1,284" hint="+5.1% vs last month" hintTone="up" icon={<Link2 className="size-5" />} />
        <StatCard label="Links Created Today" value="47" hint="Real-time generation rate" />
        <StatCard label="Active Invitation Links" value="312" hint="Trending Higher" hintTone="up" />
        <StatCard label="Total Link Visits" value="48,392" hint="+12.8% total engagement" hintTone="up" />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MiniStat label="Product Links" value="428" />
        <MiniStat label="Organization Links" value="156" />
        <MiniStat label="Report Links" value="203" />
        <MiniStat label="Expired Links" value="89" tone="red" />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs uppercase tracking-wide text-white/40 mb-3">Quick Actions</p>
        <div className="flex flex-wrap gap-2">
          {ACTIONS.map((a) => (
            <Button
              key={a.title}
              variant="soft"
              size="sm"
              title={a.title}
              leftIcon={<a.icon className="size-3.5" />}
            />
          ))}
        </div>
      </div>

      <PageToolbar
        search={query}
        onSearch={setQuery}
        searchPlaceholder="Search links..."
        filters={
          <>
            <FilterSelect label="Link Type" value={type} options={["All", "Invitation", "Product", "Report", "Organization", "QR"]} onChange={setType} />
            <FilterSelect label="Status" value={status} options={["All", "Active", "Expired"]} onChange={setStatus} />
            <FilterSelect label="Created Date" value="All" options={["All", "7D", "30D"]} onChange={() => {}} />
          </>
        }
      />

      <DataPanel title="Recent Activity" footer={`Showing ${rows.length} links`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wide text-white/45">
                <th className="px-4 py-3 font-medium">Link</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Visits</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Expiration</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {rows.map((l) => (
                <tr key={l.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{l.name}</p>
                    <p className="text-xs text-white/40">{l.id}</p>
                  </td>
                  <td className="px-4 py-3 text-white/70">{l.type}</td>
                  <td className="px-4 py-3">
                    <StatusPill
                      label={l.status}
                      tone={l.status === "Active" ? "success" : "danger"}
                    />
                  </td>
                  <td className="px-4 py-3 text-white/70 tabular-nums">{l.visits.toLocaleString()}</td>
                  <td className="px-4 py-3 text-white/60">{l.created}</td>
                  <td className="px-4 py-3 text-white/60">{l.expires}</td>
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

export default LinkCenter;
