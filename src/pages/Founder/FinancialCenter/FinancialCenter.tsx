import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Download, FileText, Receipt } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import { cn } from "@/lib/utils";
import {
  DataPanel,
  GhostAction,
  MiniStat,
  PrimaryAction,
  StatCard,
  StatusPill,
} from "../_shared/FounderPageKit";

const REVENUE = [
  { label: "Week 1", value: 8200 },
  { label: "Week 2", value: 9400 },
  { label: "Week 3", value: 11200 },
  { label: "Week 4", value: 12850 },
];

const INVOICES = [
  {
    id: "INV-1092-B",
    customer: "Stellar Tech Corp",
    amount: "$14,250",
    status: "Paid" as const,
    date: "Oct 10, 2023",
  },
  {
    id: "INV-1091-A",
    customer: "Global Tech Solutions",
    amount: "$8,900",
    status: "Paid" as const,
    date: "Oct 08, 2023",
  },
  {
    id: "INV-1090-C",
    customer: "Boutique Consulting",
    amount: "$2,180",
    status: "Pending" as const,
    date: "Oct 06, 2023",
  },
  {
    id: "INV-1088-D",
    customer: "Northwind Labs",
    amount: "$5,640",
    status: "Overdue" as const,
    date: "Sep 28, 2023",
  },
];

const RANGES = ["30 Days", "6 Months", "1 Year"] as const;

const FinancialCenter = () => {
  const [range, setRange] = useState<(typeof RANGES)[number]>("30 Days");

  return (
    <AnimatedContainer className="space-y-6 pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-white/40">Last Updated: Today · 9:30 AM</p>
          <p className="text-sm text-white/55 mt-1">
            Revenue operations, transactions, and fiscal metrics.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <GhostAction title="View Transactions" />
          <GhostAction title="View Invoices" />
          <PrimaryAction title="Export Report" leftIcon={<Download className="size-4" />} />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Monthly Revenue" value="$42,850" hintTone="gold" hint="Current cycle" />
        <StatCard label="Active Subs" value="248" hint="+14 new" hintTone="up" />
        <StatCard label="Transactions" value="1,942" hint="Last 30 days" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Revenue" value="$1,248,390" hint="12.5% vs last year" hintTone="up" />
        <StatCard label="Product Sales" value="$324,500" hint="Direct sales from store" />
        <StatCard label="Enterprise Revenue" value="$642,100" hint="Top growth sector" hintTone="up" />
        <StatCard label="Individual Consumer" value="$232,410" hint="Growing sector" />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MiniStat label="Token Cost" value="$52,410" tone="red" />
        <MiniStat label="Active Subs" value="248" tone="green" />
        <MiniStat label="New Subs" value="14" tone="gold" />
        <MiniStat label="Churn Risk" value="3.1%" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.85fr]">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h2 className="text-sm font-semibold text-white">Revenue Trends</h2>
            <div className="inline-flex rounded-full border border-white/10 bg-black/30 p-1">
              {RANGES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRange(r)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs cursor-pointer border-0",
                    range === r
                      ? "bg-[#fbbf24] text-black font-semibold"
                      : "bg-transparent text-white/60 hover:text-white"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE}>
                <defs>
                  <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="label" stroke="rgba(255,255,255,0.35)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.35)" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: "#0a0a0a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#fbbf24"
                  fill="url(#revFill)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[11px] uppercase tracking-wide text-white/40">Financial Insights</p>
            <div className="mt-3 space-y-3">
              <div className="flex items-start gap-3">
                <Receipt className="size-4 text-[#fbbf24] mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">Highest Selling Product</p>
                  <p className="text-xs text-white/50">FAR Protocol Pro X · +18% growth this month</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="size-4 text-cyan-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">Top Enterprise Customer</p>
                  <p className="text-xs text-white/50">Stellar Tech Corp · LTV: $142,500</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[11px] uppercase tracking-wide text-white/40 mb-3">
              Payment Methods Distribution
            </p>
            <div className="space-y-2 text-sm">
              {[
                { label: "Card", pct: 58 },
                { label: "ACH / Wire", pct: 27 },
                { label: "Invoice", pct: 15 },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs text-white/60 mb-1">
                    <span>{m.label}</span>
                    <span>{m.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#fbbf24]"
                      style={{ width: `${m.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <DataPanel title="Invoice Listing" subtitle="Recent billing activity" footer="Showing 4 invoices">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wide text-white/45">
                <th className="px-4 py-3 font-medium">Invoice</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {INVOICES.map((inv) => (
                <tr key={inv.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                  <td className="px-4 py-3 text-white font-medium">{inv.id}</td>
                  <td className="px-4 py-3 text-white/80">{inv.customer}</td>
                  <td className="px-4 py-3 text-[#fbbf24]">{inv.amount}</td>
                  <td className="px-4 py-3">
                    <StatusPill
                      label={inv.status}
                      tone={
                        inv.status === "Paid"
                          ? "success"
                          : inv.status === "Pending"
                            ? "warn"
                            : "danger"
                      }
                    />
                  </td>
                  <td className="px-4 py-3 text-white/60">{inv.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataPanel>
    </AnimatedContainer>
  );
};

export default FinancialCenter;
