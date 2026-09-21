import { useMemo, useState } from "react";
import EncryptionFooter from "./components/EncryptionFooter";
import HistoryKpiCards from "./components/HistoryKpiCards";
import HistoryTable from "./components/HistoryTable";
import HistoryToolbar from "./components/HistoryToolbar";
import InvoiceDetailPanel from "./components/InvoiceDetailPanel";
import { HISTORY_INVOICES } from "./data";

const PAGE_SIZE = 10;

const HistoricalReports = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [period, setPeriod] = useState("all");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState("INV-00126");

  const activeFilters = useMemo(() => {
    const chips: string[] = [];
    if (status !== "all") chips.push(status);
    if (period !== "all") chips.push(period);
    if (type !== "all") chips.push(type);
    return chips;
  }, [status, period, type]);

  const filtered = useMemo(() => {
    return HISTORY_INVOICES.filter((r) => {
      if (status !== "all" && r.status !== status) return false;
      if (
        period !== "all" &&
        !r.period.includes(period) &&
        !r.paymentDate.includes(period)
      ) {
        return false;
      }
      if (type !== "all" && r.type !== type) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        if (
          !r.id.toLowerCase().includes(q) &&
          !r.description.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [search, status, period, type]);

  const totalPages = Math.max(1, Math.ceil(Math.max(filtered.length, 1) / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );
  const from = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const to = Math.min(safePage * PAGE_SIZE, filtered.length);

  const toggleAll = () => {
    if (pageRows.every((r) => selected.has(r.id))) {
      setSelected((prev) => {
        const next = new Set(prev);
        pageRows.forEach((r) => next.delete(r.id));
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        pageRows.forEach((r) => next.add(r.id));
        return next;
      });
    }
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const removeFilter = (f: string) => {
    if (f === status) setStatus("all");
    else if (f === period) setPeriod("all");
    else if (f === type) setType("all");
    setPage(1);
  };

  return (
    <div className="space-y-5 pb-8">
      <HistoryKpiCards />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_336px] gap-5 items-start">
        <div className="space-y-4 min-w-0">
          <HistoryToolbar
            search={search}
            status={status}
            period={period}
            type={type}
            activeFilters={activeFilters}
            onSearch={(v) => {
              setSearch(v);
              setPage(1);
            }}
            onStatus={(v) => {
              setStatus(v);
              setPage(1);
            }}
            onPeriod={(v) => {
              setPeriod(v);
              setPage(1);
            }}
            onType={(v) => {
              setType(v);
              setPage(1);
            }}
            onRemoveFilter={removeFilter}
            onClearFilters={() => {
              setStatus("all");
              setPeriod("all");
              setType("all");
              setSearch("");
              setPage(1);
            }}
          />
          <HistoryTable
            rows={pageRows}
            selected={selected}
            activeId={activeId}
            onToggleAll={toggleAll}
            onToggleOne={toggleOne}
            onSelect={setActiveId}
            page={safePage}
            totalPages={totalPages}
            from={from}
            to={to}
            total={filtered.length || 34}
            onPage={setPage}
          />
        </div>
        <InvoiceDetailPanel />
      </div>

      <EncryptionFooter />
    </div>
  );
};

export default HistoricalReports;
