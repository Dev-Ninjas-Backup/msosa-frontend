import { useMemo, useState } from "react";
import ReportKpiCards from "./components/ReportKpiCards";
import ReportsTable from "./components/ReportsTable";
import ReportsToolbar from "./components/ReportsToolbar";
import { REPORT_ROWS } from "./data";

const PAGE_SIZE = 8;

const Reports = () => {
  const [tab, setTab] = useState<"Active" | "Archived">("Active");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(
    () =>
      REPORT_ROWS.filter((r) => {
        if (r.accountFilter !== tab) return false;
        if (statusFilter !== "all" && r.status !== statusFilter) return false;
        return true;
      }),
    [tab, statusFilter]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

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

  const pageButtons = (() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    return [1, 2, 3, "…" as const, totalPages];
  })();

  return (
    <div className="space-y-6 pb-8">
      <ReportKpiCards />

      <ReportsToolbar
        total={125}
        statusFilter={statusFilter}
        dateRange={dateRange}
        tab={tab}
        onStatus={(v) => {
          setStatusFilter(v);
          setPage(1);
        }}
        onDateRange={setDateRange}
        onTab={(v) => {
          setTab(v);
          setPage(1);
        }}
      />

      <ReportsTable
        pageRows={pageRows}
        selected={selected}
        filteredCount={filtered.length}
        safePage={safePage}
        pageSize={PAGE_SIZE}
        pageButtons={pageButtons}
        onToggleAll={toggleAll}
        onToggleOne={toggleOne}
        onPage={setPage}
      />
    </div>
  );
};

export default Reports;
