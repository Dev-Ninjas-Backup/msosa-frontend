import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowDown, ArrowUp, Bell, Building2, Download, FileText, Filter, RotateCcw, Search, Star, TrendingUp } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import { cn } from "@/lib/utils";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import { FINANCIAL_EXPORT_EVENT, FINANCIAL_TRANSACTIONS_EVENT, INVOICES_PATH, invoicePath } from "./events";
import { PAYMENT_METHODS, REVENUE, TRANSACTIONS, downloadReport, formatMoney, type Transaction } from "./data";

const RANGES = ["30 Days", "6 Months", "1 Year"] as const;
type Range = (typeof RANGES)[number];

const SUBS = [
  { label: "Active", value: "248", tone: "text-[#10b7ba]" },
  { label: "New", value: "14", tone: "text-[#fbbf24]" },
  { label: "Renewals", value: "182", tone: "text-white" },
  { label: "Expired", value: "8", tone: "text-white/20" },
  { label: "Cancelled", value: "3", tone: "text-[#ef4444]/50" },
];

const ENTERPRISES = [
  { name: "Global Dynamics", plan: "Platinum Enterprise Plan", price: "$4,200", status: "Active" as const, next: "Next: Oct 12, 2024" },
  { name: "CyberCore Systems", plan: "Diamond Enterprise Plan", price: "$8,500", status: "Active" as const, next: "Next: Oct 28, 2024" },
  { name: "Horizon Robotics", plan: "Custom Scale Plan", price: "$2,100", status: "Due Soon" as const, next: "Next: Tomorrow" },
  { name: "Northwind Labs", plan: "Growth Enterprise Plan", price: "$1,800", status: "Active" as const, next: "Next: Nov 04, 2024", extra: true },
  { name: "Atlas Foundry", plan: "Scale Enterprise Plan", price: "$3,400", status: "Active" as const, next: "Next: Nov 18, 2024", extra: true },
];

const REFUNDS = [
  { id: "RF-8821", name: "Marcus Webb", amount: "$299.00", status: "Under Review" as const, note: "Unused Basic AI License. Review requested today." },
  { id: "RF-8819", name: "Sarah Lane", amount: "$49.00", status: "Completed" as const, note: "Refund settled to the original Stripe method." },
];

const panel = "rounded-xl border border-white/10 bg-white/5";

const FinancialCenter = () => {
  const navigate = useNavigate();
  const [range, setRange] = useState<Range>("6 Months");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | Transaction["status"]>("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [reminded, setReminded] = useState<string | null>(null);
  const [openRefund, setOpenRefund] = useState<string | null>(null);

  useEffect(() => {
    const onExport = () => downloadReport();
    const onTransactions = () => document.getElementById("recent-transactions")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.addEventListener(FINANCIAL_EXPORT_EVENT, onExport);
    window.addEventListener(FINANCIAL_TRANSACTIONS_EVENT, onTransactions);
    return () => {
      window.removeEventListener(FINANCIAL_EXPORT_EVENT, onExport);
      window.removeEventListener(FINANCIAL_TRANSACTIONS_EVENT, onTransactions);
    };
  }, []);

  const rows = useMemo(
    () =>
      TRANSACTIONS.filter((row) => {
        const haystack = `${row.id} ${row.customer} ${row.product} ${row.method}`.toLowerCase();
        return haystack.includes(query.trim().toLowerCase()) && (status === "All" || row.status === status);
      }),
    [query, status],
  );

  const series = REVENUE[range];
  const domainMax = range === "30 Days" ? 15000 : 50000;
  const enterprises = ENTERPRISES.filter((item) => showAll || !item.extra);

  return (
    <AnimatedContainer className="space-y-6 pb-8">
      <div className="flex justify-end">
        <div className="flex gap-8 rounded-xl border border-white/10 bg-white/5 px-8 py-4">
          {[
            { label: "Monthly Revenue", value: "$42,850", tone: "text-white" },
            { label: "Active Subs", value: "248", tone: "text-[#10b7ba]" },
            { label: "Transactions", value: "1,942", tone: "text-white" },
          ].map((item, index) => (
            <div key={item.label} className={cn("text-center", index < 2 && "border-r border-white/10 pr-8")}>
              <p className="text-[10px] font-bold uppercase tracking-[1px] text-white/40">{item.label}</p>
              <p className={cn("text-2xl font-black leading-8", item.tone)}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Kpi label="Total Revenue" value="$1,248,390" hint={<span className="inline-flex items-center gap-2 text-[#10b7ba]"><ArrowUp className="size-2.5" />12.5% vs last year</span>} />
        <Kpi label="Product Sales" value="$324,500" valueClass="text-[#fbbf24]" hint="Direct sales from store" />
        <Kpi label="Enterprise Revenue" value="$642,100" hint={<span className="inline-flex items-center gap-2 text-[#fbbf24]"><Star className="size-2.5" />Top growth sector</span>} />
        <Kpi label="Individual Consumer Revenue" value="$232,410" hint={<span className="inline-flex items-center gap-2 text-[#fbbf24]"><Star className="size-2.5" />Growing sector</span>} />
        <Kpi label="Token cost" value="$52,410" valueClass="text-[#ef4444]" hint={<span className="inline-flex items-center gap-2 text-white/60"><ArrowDown className="size-2.5" />Increasing</span>} />
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_336px]">
        <section className={cn(panel, "p-6")}>
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-white">Revenue Trends</h2>
            <div className="flex gap-2">
              {RANGES.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRange(option)}
                  className={cn(
                    "cursor-pointer rounded border px-3 py-1 text-[10px] font-bold uppercase",
                    option === range
                      ? "border-[#fbbf24]/20 bg-[#fbbf24]/10 text-[#fbbf24]"
                      : "border-white/10 bg-white/5 text-white",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={series} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis
                  domain={[0, domainMax]}
                  ticks={range === "30 Days" ? [0, 5000, 10000, 15000] : [0, 10000, 20000, 30000, 40000, 50000]}
                  tickFormatter={(value) => (value === 0 ? "0" : `${value / 1000}k`)}
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />
                <Tooltip
                  formatter={(value) => formatMoney(Number(value))}
                  contentStyle={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
                />
                <Line type="monotone" dataKey="value" stroke="#fbbf24" strokeWidth={2} dot={{ r: 3, fill: "#fbbf24" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className={cn(panel, "flex flex-col gap-6 p-6")}>
          <h2 className="text-lg font-bold text-white">Financial Insights</h2>
          <Insight icon={<TrendingUp className="size-4 text-[#10b7ba]" />} iconClass="bg-[#10b7ba]/20" kicker="Highest Selling Product" title="FAR Protocol Pro X" detail="+18% growth this month" detailClass="text-[#10b7ba]" />
          <Insight icon={<Building2 className="size-4 text-[#fbbf24]" />} iconClass="bg-[#fbbf24]/20" kicker="Top Enterprise Customer" title="Stellar Tech Corp" detail="LTV: $142,500" />
          <div>
            <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[1px] text-white/40">Payment Methods Distribution</p>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={PAYMENT_METHODS} dataKey="value" nameKey="name" innerRadius={52} outerRadius={78} stroke="none">
                    {PAYMENT_METHODS.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>

      <Overview title="Subscription Overview" />
      <Overview title="Purched Reflection Overview" />

      <section className={cn(panel, "p-6")}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Enterprise Billing</h2>
          <button type="button" className="cursor-pointer text-xs font-bold uppercase tracking-[1.2px] text-[#fbbf24]" onClick={() => setShowAll((value) => !value)}>
            {showAll ? "Show Featured" : "View All Enterprises"}
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {enterprises.map((item) => (
            <article key={item.name} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start justify-between">
                <span className={cn("rounded px-2 py-0.5 text-xs font-bold uppercase", item.status === "Due Soon" ? "bg-[#f97316]/20 text-[#f97316]" : "bg-white/10 text-white")}>
                  {item.status}
                </span>
                <span className={cn("text-[10px] font-bold uppercase", item.status === "Due Soon" ? "text-[#fb923c]" : "text-white/40")}>{item.next}</span>
              </div>
              <p className="mt-3 text-base font-bold text-white">{item.name}</p>
              <p className="pb-3 text-xs text-white/60">{item.plan}</p>
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <p className="text-lg font-black text-white">
                  {item.price}
                  <span className="ml-1 text-[10px] font-normal text-white/40">/mo</span>
                </p>
                <div className="flex gap-2">
                  <Button variant="secondary" size="icon" className="size-8 rounded bg-white/5 text-white hover:bg-white/10" aria-label="Open invoices" onClick={() => navigate(INVOICES_PATH)}>
                    <FileText className="size-3.5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-8 rounded bg-[#fbbf24]/10 text-[#fbbf24] hover:bg-[#fbbf24]/20"
                    aria-label="Send reminder"
                    onClick={() => setReminded(item.name)}
                  >
                    <Bell className="size-3.5" />
                  </Button>
                </div>
              </div>
              {reminded === item.name && <p className="mt-3 text-xs text-[#fbbf24]">Billing reminder queued for {item.name}.</p>}
            </article>
          ))}
        </div>
      </section>

      <section id="recent-transactions" className={cn(panel, "scroll-mt-24 p-6")}>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold text-white">Recent Transaction History</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Input
              variant="soft"
              inputSize="sm"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search transactions..."
              leftIcon={<Search className="size-3.5 text-[#9ca3af]" />}
              containerClassName="w-full sm:w-64"
              className="border-white/10 bg-black/40 text-xs text-white placeholder:text-[#9ca3af]"
            />
            <Popover open={filterOpen} onOpenChange={setFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="secondary" size="sm" className="h-9 rounded-lg border-white/10 bg-white/5 px-4 text-xs font-bold uppercase tracking-[0.6px] text-white" leftIcon={<Filter className="size-3" />} title="Filter" />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-40 rounded-xl border-white/10 bg-[#111] p-1">
                {(["All", "Completed", "Pending"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="block w-full cursor-pointer rounded-lg border-0 bg-transparent px-3 py-2 text-left text-sm text-white hover:bg-white/5"
                    onClick={() => {
                      setStatus(option);
                      setFilterOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-[1px] text-white/40">
                <th className="pb-4 font-bold">Transaction ID</th>
                <th className="pb-4 font-bold">Customer / Org</th>
                <th className="pb-4 font-bold">Product</th>
                <th className="pb-4 font-bold">Method</th>
                <th className="pb-4 text-right font-bold">Amount</th>
                <th className="pb-4 text-center font-bold">Status</th>
                <th className="pb-4 text-center font-bold">Date</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-white/5 first:border-0">
                  <td className="py-6 text-xs text-white/60">{row.id}</td>
                  <td className="py-4">
                    <p className="text-sm font-bold text-white">{row.customer}</p>
                    <p className="text-[10px] text-white/40">{row.kind}</p>
                  </td>
                  <td className="text-sm text-white">{row.product}</td>
                  <td className="text-sm text-white">{row.method}</td>
                  <td className="text-right text-sm font-black text-white">{formatMoney(row.amount)}</td>
                  <td className="text-center">
                    <span className={cn("rounded-full px-3 py-1 text-[10px] font-bold uppercase", row.status === "Completed" ? "bg-[#10b7ba]/10 text-[#10b7ba]" : "bg-[#fbbf24]/20 text-[#fbbf24]")}>
                      {row.status}
                    </span>
                  </td>
                  <td className="text-center text-sm text-white/40">{row.date}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-sm text-white/40">No transactions match this search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className={cn(panel, "p-6")}>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Latest Invoices</h2>
            <button type="button" className="cursor-pointer text-[10px] font-bold uppercase tracking-[0.5px] text-[#eab308]" onClick={() => navigate(INVOICES_PATH)}>
              See All
            </button>
          </div>
          <div className="space-y-3">
            <InvoiceRow id="INV-2024-001" meta="Stellar Tech • $4,200" badge="Oct 1, 2024" badgeClass="bg-white/10 text-white" onOpen={() => navigate(invoicePath("INV-2024-001"))} />
            <InvoiceRow id="INV-2024-002" meta="Nova Solutions • $1,250" badge="Pending" badgeClass="bg-[#fbbf24]/20 text-[#fbbf24]" onOpen={() => navigate(invoicePath("INV-2024-002"))} />
          </div>
        </section>
        <section className={cn(panel, "p-6")}>
          <h2 className="mb-6 text-lg font-bold text-white">Refund Management</h2>
          <div className="space-y-3">
            {REFUNDS.map((refund) => (
              <div key={refund.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex gap-2 justify-center">
                    <div className="flex size-10 items-center  justify-center rounded bg-[#EF44441A] text-white">
                      <RotateCcw className="size-5 font-bold text-[#EF4444]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Refund #{refund.id}</p>
                      <p className="text-xs text-white/50">{refund.name} • {refund.amount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn("text-[10px] font-bold uppercase", refund.status === "Completed" ? "text-[#10b7ba]" : "text-[#f97316]")}>{refund.status}</span>
                    <Button variant="secondary" size="sm" className="h-8 rounded-md border-white/10 bg-white/5 px-3 text-xs text-white" title="Details" onClick={() => setOpenRefund((current) => (current === refund.id ? null : refund.id))} />
                  </div>
                </div>
                {openRefund === refund.id && <p className="mt-3 text-sm text-white/60">{refund.note}</p>}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer stats bar */}
      <div className="flex flex-wrap items-center justify-between gap-6 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
        {/* Left group – metrics */}
        <div className="flex flex-wrap items-center gap-8 sm:gap-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[1px] text-white/40">
              Avg Purchase Value
            </p>
            <p className="mt-1 text-xl font-black text-white">$482.00</p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[1px] text-white/40">
              Outstanding Payments
            </p>
            <p className="mt-1 text-xl font-black text-[#f97316]">$12,400</p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[1px] text-white/40">
              Subscription Revenue
            </p>
            <p className="mt-1 text-xl font-black text-white">
              $84,200
              <span className="ml-1.5 text-sm font-bold text-[#10b7ba]">+8%</span>
            </p>
          </div>
        </div>

        {/* Right – operational status */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[1px] text-white/40">
            Operational Status:
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#10b7ba]/10 px-2.5 py-1 text-[11px] font-semibold text-[#10b7ba]">
            <span className="size-1.5 rounded-full bg-[#10b7ba]" />
            Systems Normal
          </span>
        </div>
      </div>
    </AnimatedContainer>
  );
};

const Kpi = ({ label, value, hint, valueClass = "text-white" }: { label: string; value: string; hint: ReactNode; valueClass?: string }) => (
  <article className={cn(panel, "flex flex-col gap-2 p-5")}>
    <p className="text-[10px] font-bold uppercase tracking-[1px] text-white/60">{label}</p>
    <p className={cn("text-[30px] font-black leading-9", valueClass)}>{value}</p>
    <div className="pt-1 text-[10px] font-bold text-white/60">{hint}</div>
  </article>
);

const Insight = ({ icon, iconClass, kicker, title, detail, detailClass = "text-white/60" }: { icon: ReactNode; iconClass: string; kicker: string; title: string; detail: string; detailClass?: string }) => (
  <div className="flex gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
    <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-full", iconClass)}>{icon}</div>
    <div>
      <p className="text-[10px] font-bold uppercase text-white/40">{kicker}</p>
      <p className="text-sm font-bold text-white">{title}</p>
      <p className={cn("pt-1 text-xs", detailClass)}>{detail}</p>
    </div>
  </div>
);

const Overview = ({ title }: { title: string }) => (
  <section className={cn(panel, "p-6")}>
    <h2 className="mb-6 text-lg font-bold text-white">{title}</h2>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
      {SUBS.map((item) => (
        <div key={item.label} className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
          <p className="text-[10px] font-bold uppercase text-white/40">{item.label}</p>
          <p className={cn("text-2xl font-black leading-8", item.tone)}>{item.value}</p>
        </div>
      ))}
    </div>
  </section>
);

const InvoiceRow = ({ id, meta, badge, badgeClass, onOpen }: { id: string; meta: string; badge: string; badgeClass: string; onOpen: () => void }) => (
  <button type="button" onClick={onOpen} className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left">
    <span className="flex items-center gap-4">
      <span className="flex size-10 items-center justify-center rounded bg-white/5 text-white">
        <FileText className="size-4" />
      </span>
      <span>
        <span className="block text-xs font-bold text-white">{id}</span>
        <span className="block text-[10px] font-bold uppercase text-white/40">{meta}</span>
      </span>
    </span>
    <span className="flex items-center gap-2">
      <span className={cn("rounded px-2 py-1 text-[9px] font-bold uppercase", badgeClass)}>{badge}</span>
      <Download className="size-4 text-primary-brand" />
    </span>
  </button>
);

export default FinancialCenter;
