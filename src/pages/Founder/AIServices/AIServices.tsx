import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Sparkles } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import {
  DataPanel,
  FilterSelect,
  MiniStat,
  PrimaryAction,
  StatCard,
  StatusPill,
} from "../_shared/FounderPageKit";
import { cn } from "@/lib/utils";

// ── Data ────────────────────────────────────────────────────────────────────

const PROVIDERS = [
  {
    name: "ChatGPT",
    subtitle: "Primary Orchestrator",
    status: "Connected" as const,
    apiKey: "sk-••••••••8291",
    models: 12,
    usage: "4.2M Tokens",
    cost: "$1,240.45",
  },
  {
    name: "Claude",
    subtitle: "Advanced Reasoning",
    status: "Connected" as const,
    apiKey: "sk-••••••••8291",
    models: 8,
    usage: "1.8M Tokens",
    cost: "$542.10",
  },
  {
    name: "Google Gemini",
    subtitle: "Multimodal Search",
    status: "Connected" as const,
    apiKey: "sk-••••••••8291",
    models: 4,
    usage: "142K Tokens",
    cost: "$59.57",
  },
];

const PROMPTS = [
  {
    name: "Executive Summary Generator",
    product: "FAR Engine™",
    purpose: "Generates high-level summaries for founders",
    version: "v2.4",
    status: "Active" as const,
    updated: "10/24 14:22",
  },
  {
    name: "Reflection Analyzer",
    product: "Knowledge Processing™",
    purpose: "Analyzes user reflections for key insights",
    version: "v1.8",
    status: "Active" as const,
    updated: "10/24 12:15",
  },
  {
    name: "Coaching Content Draft",
    product: "Illumination Bridge™",
    purpose: "Draft coaching responses based on protocol",
    version: "v0.9",
    status: "Draft" as const,
    updated: "10/23 16:45",
  },
  {
    name: "Organizational Health Check",
    product: "Analytics & Insights™",
    purpose: "Assesses organizational health metrics",
    version: "v3.1",
    status: "Active" as const,
    updated: "10/22 09:30",
  },
  {
    name: "Recommendation Engine v2",
    product: "Product Protocol™",
    purpose: "Provides strategic recommendations",
    version: "v2.0",
    status: "Archived" as const,
    updated: "10/20 11:00",
  },
];

const COST_BREAKDOWN = [
  { label: "Chat GPT", value: 67, color: "#fbbf24" },
  { label: "Gemini", value: 8, color: "#e5e7eb" },
  { label: "Claude", value: 25, color: "#6b7280" },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

const statusTone = (s: string) => {
  if (s === "Active" || s === "Connected") return "success";
  if (s === "Draft") return "neutral";
  if (s === "Archived") return "danger";
  return "warn";
};

// Simple SVG donut
const CostDonut = () => {
  const radius = 54;
  const stroke = 18;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="relative flex flex-col items-center">
      <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
        {COST_BREAKDOWN.map((seg) => {
          const dash = (seg.value / 100) * circumference;
          const el = (
            <circle
              key={seg.label}
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
          offset += dash;
          return el;
        })}
      </svg>
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-[11px] text-white/60">
        {COST_BREAKDOWN.map((s) => (
          <span key={s.label} className="flex items-center gap-1.5">
            <span
              className="size-2.5 rounded-sm"
              style={{ backgroundColor: s.color }}
            />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
};

// ── Component ───────────────────────────────────────────────────────────────

const AIServices = () => {
  const navigate = useNavigate();
  const [productFilter, setProductFilter] = useState("All Products");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("Any");

  const promptRows = useMemo(
    () =>
      PROMPTS.filter(
        (p) =>
          (productFilter === "All Products" || p.product === productFilter) &&
          (statusFilter === "Any" || p.status === statusFilter)
      ),
    [productFilter, statusFilter]
  );

  return (
    <AnimatedContainer className="space-y-6 pb-8">
      {/* ── Top KPI row ── */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="AI Providers Connected"
          value="8"
          hint="+1 New"
          hintTone="up"
        />
        <StatCard
          label="Active AI Models"
          value="24"
          hint="All Online"
          hintTone="up"
        />
        <StatCard
          label="AI Requests Today"
          value="142.5k"
          hint="↑ 12%"
          hintTone="up"
        />
        <StatCard
          label="Success Rate"
          value="99.8%"
          hint="Healthy"
          hintTone="up"
        />
      </div>

      {/* ── Secondary stats ── */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MiniStat label="Failed Requests" value="284" tone="red" />
        <MiniStat label="Avg Response Time" value="412ms" />
        <MiniStat label="Monthly AI Cost" value="$1,842.12" tone="gold" />
        <MiniStat label="AI System Health" value="Operational" tone="green" />
      </div>

      {/* ── Active AI Providers ── */}
      <DataPanel
        title="Active AI Providers"
        subtitle="3 Connected"
        action={
          <span className="rounded-full bg-[#10b7ba]/15 px-2.5 py-1 text-[11px] font-semibold text-[#10b7ba]">
            3 Connected
          </span>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wide text-white/45">
                <th className="px-4 py-3 font-medium">Provider Name</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">API Connection</th>
                <th className="px-4 py-3 font-medium">Active Models</th>
                <th className="px-4 py-3 font-medium">API Usage</th>
                <th className="px-4 py-3 font-medium">Monthly Cost</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {PROVIDERS.map((p) => (
                <tr
                  key={p.name}
                  className="border-b border-white/5 hover:bg-white/[0.03]"
                >
                  <td className="px-4 py-3.5">
                    <p className="font-medium text-white">{p.name}</p>
                    <p className="text-xs text-white/45">{p.subtitle}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusPill label={p.status} tone="success" />
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-white/60">
                    {p.apiKey}
                  </td>
                  <td className="px-4 py-3.5 text-white/70">{p.models}</td>
                  <td className="px-4 py-3.5 text-white/70">{p.usage}</td>
                  <td className="px-4 py-3.5 font-medium text-[#fbbf24]">
                    {p.cost}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        className="rounded p-1 text-white/40 hover:bg-white/10 hover:text-white border-0 bg-transparent cursor-pointer"
                        aria-label="Copy"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="rounded p-1 text-white/40 hover:bg-white/10 hover:text-white border-0 bg-transparent cursor-pointer"
                        aria-label="Actions"
                      >
                        <MoreVertical className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataPanel>

      {/* ── Health + Cost Monitoring ── */}
      <div className="grid gap-4 xl:grid-cols-[1fr_280px]">
        {/* AI Health Monitoring */}
        <DataPanel
          title="AI Health Monitoring"
          action={
            <span className="rounded-full bg-[#10b7ba]/15 px-2.5 py-1 text-[11px] font-semibold text-[#10b7ba]">
              All Services Healthy
            </span>
          }
        >
          <div className="space-y-3">
            {/* API Availability bar */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-white/70 px-5 pt-2">API Availability</span>
              <div className="flex items-center gap-3 ">
                <div className="h-1.5 w-40 overflow-hidden rounded-full bg-white/10 ">
                  <div
                    className="h-full rounded-full bg-[#10b7ba] "
                    style={{ width: "99.9%" }}
                  />
                </div>
                <span className="text-sm font-medium text-white pr-5 pt-1">99.9%</span>
              </div>
            </div>

            {[
              {
                label: "Provider Status: UX Pilot AI",
                value: "HEALTHY",
                tone: "success" as const,
              },
              {
                label: "Provider Status: UX Pilot AI",
                value: "HEALTHY",
                tone: "success" as const,
              },
              {
                label: "Error Rate (Global)",
                value: "0.02%",
                tone: "muted" as const,
              },
              {
                label: "Queue Status",
                value: "WARNING (HIGH LOAD)",
                tone: "warn" as const,
              },
              {
                label: "Service Uptime",
                value: "32 Days, 4h",
                tone: "muted" as const,
              },
            ].map((row) => (
              <div
                key={row.label + row.value}
                className="flex items-center justify-between px-5 py-1 gap-4 border-t border-white/5 pt-3"
              >
                <span className="text-sm text-white/70 ">{row.label}</span>
                {row.tone === "success" || row.tone === "warn" ? (
                  <StatusPill label={row.value} tone={row.tone} />
                ) : (
                  <span className="text-sm text-white/60 pr-1">{row.value}</span>
                )}
              </div>
            ))}
          </div>
        </DataPanel>

        {/* Cost Monitoring */}
        <DataPanel title="Cost Monitoring">
          <div className="flex flex-col items-center py-2">
            <CostDonut />
          </div>
        </DataPanel>
      </div>

      {/* ── AI Prompt Management ── */}
      <DataPanel
        title="AI Prompt Management"
        action={
          <PrimaryAction
            title="Create New Prompt"
            leftIcon={<Sparkles className="size-3.5" />}
            onClick={() => navigate("/founder/ai-services/create-new-prompt")}
          />
        }
      >
        {/* Filters */}
        <div className="mb-4 flex flex-wrap items-center gap-3 pt-5 px-3">
          <FilterSelect
            label="Product"
            value={productFilter}
            options={[
              "All Products",
              "FAR Engine™",
              "Knowledge Processing™",
              "Illumination Bridge™",
            ]}
            onChange={setProductFilter}
          />
          <FilterSelect
            label="Category"
            value={categoryFilter}
            options={["All Categories", "Summary", "Analysis", "Coaching"]}
            onChange={setCategoryFilter}
          />
          <FilterSelect
            label="Status"
            value={statusFilter}
            options={["Any", "Active", "Draft", "Archived"]}
            onChange={setStatusFilter}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wide text-white/45">
                <th className="px-4 py-3 font-medium">Prompt Name</th>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Purpose</th>
                <th className="px-4 py-3 font-medium">Version</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {promptRows.map((p) => (
                <tr
                  key={p.name}
                  className="border-b border-white/5 hover:bg-white/[0.03]"
                >
                  <td className="px-4 py-3.5">
                    <span
                      className={cn(
                        "font-medium",
                        p.status === "Active"
                          ? "text-[#fbbf24]"
                          : "text-white"
                      )}
                    >
                      {p.name}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-white/70">{p.product}</td>
                  <td className="px-4 py-3.5 max-w-[220px] truncate text-white/55">
                    {p.purpose}
                  </td>
                  <td className="px-4 py-3.5 text-white/60">{p.version}</td>
                  <td className="px-4 py-3.5">
                    <StatusPill
                      label={p.status}
                      tone={statusTone(p.status)}
                    />
                  </td>
                  <td className="px-4 py-3.5 text-white/50">{p.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataPanel>
    </AnimatedContainer>
  );
};

export default AIServices;