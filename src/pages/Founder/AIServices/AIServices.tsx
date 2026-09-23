import { useMemo, useState } from "react";
import { Activity, Plus, Sparkles, MoreVertical } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import {
  DataPanel,
  DotStatus,
  FilterSelect,
  MiniStat,
  PageToolbar,
  PrimaryAction,
  StatCard,
  StatusPill,
} from "../_shared/FounderPageKit";

const PROVIDERS = [
  {
    name: "ChatGPT",
    status: "Online" as const,
    connection: "Connected",
    models: 8,
    usage: "62.4k req",
    cost: "$842.10",
  },
  {
    name: "Claude",
    status: "Online" as const,
    connection: "Connected",
    models: 5,
    usage: "41.2k req",
    cost: "$612.40",
  },
  {
    name: "FAR Insight Core™",
    status: "Online" as const,
    connection: "Connected",
    models: 11,
    usage: "38.9k req",
    cost: "$387.62",
  },
  {
    name: "Speech Synthesis",
    status: "Degraded" as const,
    connection: "Limited",
    models: 2,
    usage: "4.1k req",
    cost: "$48.20",
  },
];

const AIServices = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROVIDERS.filter((p) => {
      const matchQ = !q || p.name.toLowerCase().includes(q);
      const matchS = status === "All" || p.status === status;
      return matchQ && matchS;
    });
  }, [query, status]);

  return (
    <AnimatedContainer className="space-y-6 pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/55">
          Configure AI models, speech synthesis, and natural language endpoints.
        </p>
        <PrimaryAction title="Create New Prompt" leftIcon={<Plus className="size-4" />} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="AI Providers Connected" value="3" hint="+1 New" hintTone="up" icon={<Sparkles className="size-5" />} />
        <StatCard label="Active AI Models" value="24" hint="All Online" hintTone="up" />
        <StatCard label="AI Requests Today" value="142.5k" hint="↑ 12%" hintTone="up" />
        <StatCard label="Success Rate" value="99.8%" hint="Healthy" hintTone="up" />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MiniStat label="Failed Requests" value="284" tone="red" />
        <MiniStat label="Avg Response Time" value="412ms" />
        <MiniStat label="Monthly AI Cost" value="$1,842.12" tone="gold" />
        <MiniStat label="AI System Health" value="Operational" tone="green" />
      </div>

      <PageToolbar
        search={query}
        onSearch={setQuery}
        searchPlaceholder="Search providers or models..."
        filters={
          <>
            <FilterSelect label="Status" value={status} options={["All", "Online", "Degraded"]} onChange={setStatus} />
            <FilterSelect label="Type" value="All" options={["All", "LLM", "Speech", "Vision"]} onChange={() => {}} />
          </>
        }
      />

      <DataPanel title="Active AI Providers" subtitle="3 Connected" footer={`Showing ${rows.length} providers`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wide text-white/45">
                <th className="px-4 py-3 font-medium">Provider Name</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">API Connection</th>
                <th className="px-4 py-3 font-medium">Active Models</th>
                <th className="px-4 py-3 font-medium">API Usage</th>
                <th className="px-4 py-3 font-medium">Monthly Cost</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.name} className="border-b border-white/5 hover:bg-white/[0.03]">
                  <td className="px-4 py-3 font-medium text-white">{p.name}</td>
                  <td className="px-4 py-3">
                    <DotStatus label={p.status} on={p.status === "Online"} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill
                      label={p.connection}
                      tone={p.connection === "Connected" ? "success" : "warn"}
                    />
                  </td>
                  <td className="px-4 py-3 text-white/70">{p.models}</td>
                  <td className="px-4 py-3 text-white/70">{p.usage}</td>
                  <td className="px-4 py-3 text-[#fbbf24]">{p.cost}</td>
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

      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 flex items-center gap-2 text-xs text-white/50">
        <Activity className="size-4 text-[#fbbf24]" />
        Budget utilization at 72% of monthly AI allocation.
      </div>
    </AnimatedContainer>
  );
};

export default AIServices;
