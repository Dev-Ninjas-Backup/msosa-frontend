import { useMemo, useState } from "react";
import { Cloud, Clock3, LayoutGrid, Plus, MoreVertical } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import {
  DataPanel,
  FilterSelect,
  GhostAction,
  IntegrityBanner,
  MiniStat,
  PageToolbar,
  PrimaryAction,
  StatCard,
  StatusPill,
} from "../_shared/FounderPageKit";

const WIDGETS = [
  {
    id: "WID-FIN-8821",
    name: "Revenue Stream Chart",
    category: "Analytics",
    type: "Real-time Plotly Stream",
    status: "Published" as const,
    version: "v4.2.1-stable",
    deployment: "12 Dashboards · 3 Products",
    updated: "Oct 12, 2023",
  },
  {
    id: "WID-SYS-1102",
    name: "Data Table V4",
    category: "System",
    type: "Paginated Data Grid",
    status: "Active" as const,
    version: "v1.1.0-RC2",
    deployment: "28 Dashboards · 8 Products",
    updated: "Today, 10:45 AM",
  },
  {
    id: "WID-UTL-4401",
    name: "Theme Configurator",
    category: "Utility",
    type: "Configuration Tool",
    status: "Draft" as const,
    version: "v0.8.4-alpha",
    deployment: "0 Dashboards",
    updated: "Sep 28, 2023",
  },
  {
    id: "WID-KPI-2209",
    name: "KPI Strip Compact",
    category: "Analytics",
    type: "Metric Strip",
    status: "Published" as const,
    version: "v2.0.0-stable",
    deployment: "19 Dashboards · 5 Products",
    updated: "Aug 14, 2023",
  },
  {
    id: "WID-ACT-3308",
    name: "Activity Feed",
    category: "System",
    type: "Event Timeline",
    status: "Active" as const,
    version: "v3.1.2-stable",
    deployment: "9 Dashboards · 2 Products",
    updated: "Jul 02, 2023",
  },
];

const statusTone = {
  Published: "success",
  Active: "gold",
  Draft: "neutral",
} as const;

const WidgetLibrary = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Published");
  const [category, setCategory] = useState("All");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return WIDGETS.filter((w) => {
      const matchQ =
        !q ||
        w.name.toLowerCase().includes(q) ||
        w.id.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q);
      const matchS = status === "All" || w.status === status;
      const matchC = category === "All" || w.category === category;
      return matchQ && matchS && matchC;
    });
  }, [query, status, category]);

  return (
    <AnimatedContainer className="space-y-6 pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10px] uppercase tracking-[0.14em] text-white/40">
          Founder Control Center™ · Dashboard Builder™ · Widget Library™
        </p>
        <div className="flex flex-wrap gap-2">
          <GhostAction title="Bulk Actions" />
          <PrimaryAction title="Create New Widget" leftIcon={<Plus className="size-4" />} />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Widgets" value="142" hint="+8 new this week" hintTone="up" icon={<LayoutGrid className="size-5" />} />
        <StatCard label="Active" value="128" hint="90.1% deployment rate" hintTone="muted" icon={<span className="size-2.5 rounded-full bg-emerald-400 block mt-1" />} />
        <StatCard label="Published" value="115" hint="Syncing to global CDN" hintTone="muted" icon={<Cloud className="size-5" />} />
        <StatCard label="Recently Updated" value="12" hint="Last 24 hours" hintTone="gold" icon={<Clock3 className="size-5" />} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MiniStat label="Draft" value="14" />
        <MiniStat label="Most Used" value="Data Table V4" tone="gold" />
        <MiniStat label="Categories" value="8" />
        <MiniStat label="Dashboards Linked" value="42" />
      </div>

      <PageToolbar
        search={query}
        onSearch={setQuery}
        searchPlaceholder="Search by name, ID, or category..."
        filters={
          <>
            <FilterSelect label="Status" value={status} options={["All", "Published", "Active", "Draft"]} onChange={setStatus} />
            <FilterSelect label="Category" value={category} options={["All", "Analytics", "System", "Utility"]} onChange={setCategory} />
            <FilterSelect label="Division" value="All" options={["All"]} onChange={() => {}} />
          </>
        }
      />

      <DataPanel footer={`Showing 1 – ${rows.length} of 142 widgets`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wide text-white/45">
                <th className="px-4 py-3 font-medium">Widget Name</th>
                <th className="px-4 py-3 font-medium">Category / Type</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Version</th>
                <th className="px-4 py-3 font-medium">Deployment</th>
                <th className="px-4 py-3 font-medium">Last Updated</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {rows.map((w) => (
                <tr key={w.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{w.name}</p>
                    <p className="text-xs text-white/40">{w.id}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-white/80">{w.category}</p>
                    <p className="text-xs text-white/40">{w.type}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill label={w.status} tone={statusTone[w.status]} />
                  </td>
                  <td className="px-4 py-3 text-white/70">{w.version}</td>
                  <td className="px-4 py-3 text-white/60">{w.deployment}</td>
                  <td className="px-4 py-3 text-white/60">{w.updated}</td>
                  <td className="px-4 py-3">
                    <button type="button" className="text-white/40 hover:text-white cursor-pointer border-0 bg-transparent" aria-label="Actions">
                      <MoreVertical className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataPanel>

      <IntegrityBanner text="All widget source code is validated against the FAR™ Security Schema. Unauthorized scripts or external dependencies are automatically quarantined." />
    </AnimatedContainer>
  );
};

export default WidgetLibrary;
