import { useMemo, useState } from "react";
import ParticipationKpiCards from "./components/ParticipationKpiCards";
import ParticipationTable from "./components/ParticipationTable";
import ParticipationToolbar from "./components/ParticipationToolbar";
import PrivacyFooter from "./components/PrivacyFooter";
import { PARTICIPATION_ROWS } from "./data";

const PAGE_SIZE = 10;

const ParticipationMonitoring = () => {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const [status, setStatus] = useState("all");
  const [reflection, setReflection] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const departments = useMemo(
    () => Array.from(new Set(PARTICIPATION_ROWS.map((r) => r.department))),
    []
  );

  const filtered = useMemo(
    () =>
      PARTICIPATION_ROWS.filter((r) => {
        if (dept !== "all" && r.department !== dept) return false;
        if (status !== "all" && r.stage !== status) return false;
        if (reflection !== "all" && r.reflection !== reflection) return false;
        if (
          q &&
          !`${r.empId} ${r.department} ${r.name}`
            .toLowerCase()
            .includes(q.toLowerCase())
        )
          return false;
        return true;
      }),
    [q, dept, status, reflection]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const toggleAll = () => {
    if (pageRows.every((r) => selected.has(r.empId))) {
      setSelected((prev) => {
        const next = new Set(prev);
        pageRows.forEach((r) => next.delete(r.empId));
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        pageRows.forEach((r) => next.add(r.empId));
        return next;
      });
    }
  };

  const toggleOne = (empId: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(empId)) next.delete(empId);
      else next.add(empId);
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
      <ParticipationKpiCards />

      <ParticipationToolbar
        q={q}
        dept={dept}
        status={status}
        reflection={reflection}
        dateRange={dateRange}
        activeCount={filtered.length}
        departments={departments}
        onQ={(v) => {
          setQ(v);
          setPage(1);
        }}
        onDept={(v) => {
          setDept(v);
          setPage(1);
        }}
        onStatus={(v) => {
          setStatus(v);
          setPage(1);
        }}
        onReflection={(v) => {
          setReflection(v);
          setPage(1);
        }}
        onDateRange={setDateRange}
      />

      <ParticipationTable
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

      <PrivacyFooter />
    </div>
  );
};

export default ParticipationMonitoring;
