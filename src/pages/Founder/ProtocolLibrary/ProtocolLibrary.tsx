import { useMemo, useState } from "react";
import { BookOpen, Plus, MoreVertical, Shield } from "lucide-react";
import { toast } from "sonner";
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

const PROTOCOLS = [
  {
    id: "PRT-112",
    name: "FAR Core Protocol™",
    category: "Founder",
    version: "v3.4.0",
    status: "Published" as const,
    products: 18,
    updated: "Oct 10, 2023",
    owner: "Sourav Debnath",
  },
  {
    id: "PRT-208",
    name: "Market Growth Protocol™",
    category: "Growth",
    version: "v1.2.1",
    status: "Active" as const,
    products: 7,
    updated: "Sep 22, 2023",
    owner: "Sourav Debnath",
  },
  {
    id: "PRT-301",
    name: "Relational Insight Protocol™",
    category: "Reflection",
    version: "v2.0.0",
    status: "Published" as const,
    products: 12,
    updated: "Aug 30, 2023",
    owner: "FAR Labs",
  },
  {
    id: "PRT-415",
    name: "Approval Workflow Protocol",
    category: "Ops",
    version: "v0.9.3",
    status: "Draft" as const,
    products: 0,
    updated: "Jul 18, 2023",
    owner: "Sourav Debnath",
  },
  {
    id: "PRT-520",
    name: "Secure Access Protocol",
    category: "Security",
    version: "v1.8.2",
    status: "Active" as const,
    products: 24,
    updated: "Today, 8:12 AM",
    owner: "Security Team",
  },
];

const tone = {
  Published: "success",
  Active: "gold",
  Draft: "neutral",
} as const;

const ProtocolLibrary = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [protocols, setProtocols] = useState(PROTOCOLS);
  const [creating, setCreating] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [draftCategory, setDraftCategory] = useState("Founder");
  const [menuId, setMenuId] = useState<string | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return protocols.filter((p) => {
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      const matchS = status === "All" || p.status === status;
      const matchC = category === "All" || p.category === category;
      return matchQ && matchS && matchC;
    });
  }, [protocols, query, status, category]);

  return (
    <AnimatedContainer className="space-y-6 pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/55 max-w-2xl">
          Manage voice intelligence protocols and behavioral schemas across the FAR Platform Engine™.
        </p>
        <div className="flex flex-wrap gap-2">
          <GhostAction
            title="Import Protocol"
            onClick={() => {
              const id = `PRT-${Date.now().toString().slice(-3)}`;
              setProtocols((current) => [
                {
                  id,
                  name: "Imported Protocol",
                  category: "Ops",
                  version: "v0.1.0",
                  status: "Draft",
                  products: 0,
                  updated: "Today",
                  owner: "Local import",
                },
                ...current,
              ]);
              toast.success("Protocol imported into this browser.");
            }}
          />
          <PrimaryAction
            title="Create Protocol"
            leftIcon={<Plus className="size-4" />}
            onClick={() => setCreating((open) => !open)}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Protocols" value="278" hint="+8.3% this quarter" hintTone="up" icon={<BookOpen className="size-5" />} />
        <StatCard label="Active" value="214" hint="Deployed in products" />
        <StatCard label="Published" value="186" hint="CDN synced" />
        <StatCard label="Draft" value="32" hint="Awaiting review" hintTone="gold" icon={<Shield className="size-5" />} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MiniStat label="Founder Protocols™" value="46" tone="gold" />
        <MiniStat label="Reflection Linked" value="112" />
        <MiniStat label="Security" value="18" tone="green" />
        <MiniStat label="Updated 24h" value="9" />
      </div>

      <PageToolbar
        search={query}
        onSearch={setQuery}
        searchPlaceholder="Search protocols by name or ID..."
        filters={
          <>
            <FilterSelect label="Status" value={status} options={["All", "Published", "Active", "Draft"]} onChange={setStatus} />
            <FilterSelect label="Category" value={category} options={["All", "Founder", "Growth", "Reflection", "Ops", "Security"]} onChange={setCategory} />
          </>
        }
      />

      {creating && (
        <form
          className="flex flex-wrap items-end gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          onSubmit={(e) => {
            e.preventDefault();
            const name = draftName.trim();
            if (!name) return;
            setProtocols((current) => [
              {
                id: `PRT-${Date.now().toString().slice(-3)}`,
                name,
                category: draftCategory,
                version: "v0.1.0",
                status: "Draft",
                products: 0,
                updated: "Today",
                owner: "You",
              },
              ...current,
            ]);
            setDraftName("");
            setCreating(false);
            toast.success("Protocol saved locally.");
          }}
        >
          <label className="text-xs text-white/60">
            Name
            <input
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              className="mt-1 block rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white"
            />
          </label>
          <label className="text-xs text-white/60">
            Category
            <select
              value={draftCategory}
              onChange={(e) => setDraftCategory(e.target.value)}
              className="mt-1 block rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white"
            >
              {["Founder", "Growth", "Reflection", "Ops", "Security"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="h-10 rounded-lg bg-[#FBBF24] px-4 text-sm font-semibold text-black border-0 cursor-pointer"
          >
            Save Protocol
          </button>
        </form>
      )}

      <DataPanel footer={`Showing ${rows.length} of ${protocols.length} protocols`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wide text-white/45">
                <th className="px-4 py-3 font-medium">Protocol</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Version</th>
                <th className="px-4 py-3 font-medium">Products</th>
                <th className="px-4 py-3 font-medium">Owner</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{p.name}</p>
                    <p className="text-xs text-white/40">{p.id}</p>
                  </td>
                  <td className="px-4 py-3 text-white/70">{p.category}</td>
                  <td className="px-4 py-3">
                    <StatusPill label={p.status} tone={tone[p.status]} />
                  </td>
                  <td className="px-4 py-3 text-white/70">{p.version}</td>
                  <td className="px-4 py-3 text-white/70">{p.products}</td>
                  <td className="px-4 py-3 text-white/60">{p.owner}</td>
                  <td className="px-4 py-3 text-white/60">{p.updated}</td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setMenuId((current) => (current === p.id ? null : p.id))}
                        className="text-white/40 hover:text-white cursor-pointer border-0 bg-transparent"
                        aria-label="Actions"
                      >
                        <MoreVertical className="size-4" />
                      </button>
                      {menuId === p.id && (
                        <div className="absolute right-0 z-10 mt-1 min-w-[140px] rounded-lg border border-white/10 bg-[#111] py-1 shadow-xl">
                          <button
                            type="button"
                            className="block w-full px-3 py-2 text-left text-xs text-white/80 hover:bg-white/5 border-0 bg-transparent cursor-pointer"
                            onClick={() => {
                              setProtocols((current) => [
                                {
                                  ...p,
                                  id: `${p.id}-copy`,
                                  name: `${p.name} Copy`,
                                  status: "Draft",
                                },
                                ...current,
                              ]);
                              setMenuId(null);
                            }}
                          >
                            Duplicate
                          </button>
                          <button
                            type="button"
                            className="block w-full px-3 py-2 text-left text-xs text-white/80 hover:bg-white/5 border-0 bg-transparent cursor-pointer"
                            onClick={() => {
                              setProtocols((current) =>
                                current.map((row) =>
                                  row.id === p.id ? { ...row, status: "Draft" } : row
                                )
                              );
                              setMenuId(null);
                              toast.success("Protocol archived as draft.");
                            }}
                          >
                            Archive
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataPanel>

      <IntegrityBanner text="Protocol schemas are encrypted at rest and version-locked before product deployment. Unauthorized edits are quarantined automatically." />
    </AnimatedContainer>
  );
};

export default ProtocolLibrary;
