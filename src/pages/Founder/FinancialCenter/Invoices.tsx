import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, FileText, Filter, Pencil, Search } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import { cn } from "@/lib/utils";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import { INVOICES_CREATE_EVENT, INVOICES_EXPORT_EVENT, invoicePath } from "./events";
import {
  addInvoice,
  downloadInvoices,
  formatMoney,
  getInvoices,
  subscribeInvoices,
  updateInvoice,
  type InvoiceStatus,
  type UserKind,
} from "./data";

const PAGE_SIZE = 3;
const STATUSES: InvoiceStatus[] = ["Paid", "Pending", "Overdue"];
const USERS: UserKind[] = ["Consumer", "Enterprise", "Agency", "Individual"];

const tone = {
  Paid: { tile: "bg-[#10b981]/10 text-[#10b981]", dot: "bg-[#10b981]", text: "text-[#10b981]" },
  Pending: { tile: "bg-[#eab308]/10 text-[#eab308]", dot: "bg-[#eab308]", text: "text-[#eab308]" },
  Overdue: { tile: "bg-[#ef4444]/10 text-[#ef4444]", dot: "bg-[#ef4444]", text: "text-[#ef4444]" },
};

const Invoices = () => {
  const navigate = useNavigate();
  const invoices = useSyncExternalStore(subscribeInvoices, getInvoices);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | InvoiceStatus>("All");
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState({ client: "", user: "Consumer" as UserKind, amount: "", status: "Pending" as InvoiceStatus });

  const filtered = useMemo(
    () =>
      invoices.filter((invoice) => {
        const haystack = `${invoice.id} ${invoice.client} ${invoice.user}`.toLowerCase();
        return haystack.includes(query.trim().toLowerCase()) && (status === "All" || invoice.status === status);
      }),
    [invoices, query, status],
  );

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const slice = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const start = filtered.length === 0 ? 0 : (current - 1) * PAGE_SIZE + 1;
  const end = Math.min(current * PAGE_SIZE, filtered.length);

  useEffect(() => {
    const onExport = () => downloadInvoices(filtered);
    const onCreate = () => setCreating(true);
    window.addEventListener(INVOICES_EXPORT_EVENT, onExport);
    window.addEventListener(INVOICES_CREATE_EVENT, onCreate);
    return () => {
      window.removeEventListener(INVOICES_EXPORT_EVENT, onExport);
      window.removeEventListener(INVOICES_CREATE_EVENT, onCreate);
    };
  }, [filtered]);

  const submit = () => {
    const amount = Number(draft.amount);
    if (!draft.client.trim() || !Number.isFinite(amount) || amount <= 0) return;
    addInvoice({ client: draft.client.trim(), user: draft.user, amount, status: draft.status });
    setDraft({ client: "", user: "Consumer", amount: "", status: "Pending" });
    setCreating(false);
    setPage(1);
  };

  return (
    <AnimatedContainer className="space-y-6 pb-8">
      {creating && (
        <form
          className="grid gap-3 rounded-xl border border-white/10 bg-white/5 p-5 md:grid-cols-5"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <Input variant="soft" value={draft.client} onChange={(event) => setDraft({ ...draft, client: event.target.value })} placeholder="Client" className="border-white/10 bg-black/40 text-white" />
          <Select variant="soft" value={draft.user} onChange={(value) => setDraft({ ...draft, user: String(value) as UserKind })} options={USERS} />
          <Input variant="soft" type="number" min="1" step="0.01" value={draft.amount} onChange={(event) => setDraft({ ...draft, amount: event.target.value })} placeholder="Amount" className="border-white/10 bg-black/40 text-white" />
          <Select variant="soft" value={draft.status} onChange={(value) => setDraft({ ...draft, status: String(value) as InvoiceStatus })} options={STATUSES} />
          <div className="flex gap-2">
            <Button type="submit" variant="primary" size="sm" className="h-11 flex-1 rounded-lg bg-[#eab308] text-sm font-bold text-black" title="Create" />
            <Button type="button" variant="secondary" size="sm" className="h-11 rounded-lg border-white/10 bg-white/5 text-white" title="Close" onClick={() => setCreating(false)} />
          </div>
        </form>
      )}

      <section className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <div className="flex flex-col gap-3 border-b border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[10px] font-bold uppercase tracking-[1px] text-[#6b7280]">Recent Invoices</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Input
              variant="soft"
              inputSize="sm"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search invoices..."
              leftIcon={<Search className="size-3.5 text-[#9ca3af]" />}
              containerClassName="w-full sm:w-60"
              className="border-white/10 bg-black/40 text-white placeholder:text-[#9ca3af]"
            />
            <Popover open={filterOpen} onOpenChange={setFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="secondary" size="sm" className="h-9 rounded-lg border-white/10 bg-white/5 px-4 text-xs font-bold text-white" leftIcon={<Filter className="size-3" />} title="Filters" />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-40 rounded-xl border-white/10 bg-[#111] p-1">
                {(["All", ...STATUSES] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="block w-full cursor-pointer rounded-lg border-0 bg-transparent px-3 py-2 text-left text-sm text-white hover:bg-white/5"
                    onClick={() => {
                      setStatus(option);
                      setPage(1);
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
          <div className="min-w-[860px]">
            <div className="flex border-b border-white/10 px-0 py-4 text-[10px] font-bold uppercase tracking-[0.5px] text-[#6b7280]">
              <p className="flex-1 px-6">Invoice # & Client</p>
              <p className="w-[150px] px-6">User</p>
              <p className="w-[150px] px-6">Date</p>
              <p className="w-[150px] px-6">Status</p>
              <p className="w-[150px] px-6 text-right">Amount</p>
              <p className="w-[150px] px-6 text-right">Actions</p>
            </div>
            {slice.map((invoice) => (
              <div key={invoice.id} className="flex items-center border-b border-white/5">
                <div className="flex min-w-0 flex-1 items-center gap-3 px-6 py-4">
                  <span className={cn("flex size-8 items-center justify-center rounded", tone[invoice.status].tile)}>
                    <FileText className="size-3" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold text-white">{invoice.id}</span>
                    <span className="block truncate text-[10px] text-[#6b7280]">{invoice.client}</span>
                  </span>
                </div>
                <p className="w-[150px] px-6 text-xs text-[#9ca3af]">{invoice.user}</p>
                <p className="w-[150px] px-6 text-xs text-[#9ca3af]">{invoice.date}</p>
                <p className={cn("flex w-[150px] items-center gap-2 px-6 text-[11px] font-medium", tone[invoice.status].text)}>
                  <span className={cn("size-1.5 rounded-full", tone[invoice.status].dot)} />
                  {invoice.status}
                </p>
                <p className="w-[150px] px-6 text-right text-xs font-semibold text-white">{formatMoney(invoice.listAmount)}</p>
                <div className="flex w-[150px] justify-end gap-2 px-6">
                  <button type="button" aria-label={`View ${invoice.id}`} className="flex size-7 cursor-pointer items-center justify-center rounded-md border border-white/10 bg-white/5 text-white" onClick={() => navigate(invoicePath(invoice.id))}>
                    <Eye className="size-3" />
                  </button>
                  <Popover open={editing === invoice.id} onOpenChange={(open) => setEditing(open ? invoice.id : null)}>
                    <PopoverTrigger asChild>
                      <button type="button" aria-label={`Edit ${invoice.id}`} className="flex size-7 cursor-pointer items-center justify-center rounded-md border border-white/10 bg-white/5 text-white">
                        <Pencil className="size-3" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-44 rounded-xl border-white/10 bg-[#111] p-1">
                      {STATUSES.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className="block w-full cursor-pointer rounded-lg border-0 bg-transparent px-3 py-2 text-left text-sm text-white hover:bg-white/5"
                          onClick={() => {
                            updateInvoice(invoice.id, { status: option });
                            setEditing(null);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ))}
            {slice.length === 0 && <p className="px-6 py-10 text-center text-sm text-white/40">No invoices match this search.</p>}
          </div>
        </div>

        <div className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-[#6b7280]">Showing {start} - {end} of {filtered.length} invoices</p>
          <div className="flex items-center gap-1">
            {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => setPage(number)}
                className={cn(
                  "size-8 cursor-pointer rounded-md text-xs",
                  number === current ? "bg-[#eab308] font-bold text-black" : "text-white/60 hover:bg-white/5",
                )}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </section>
    </AnimatedContainer>
  );
};

export default Invoices;
