import { useMemo, useState } from "react";
import { toast } from "sonner";
import EncryptionFooter from "./components/EncryptionFooter";
import NotificationsHeader from "./components/NotificationsHeader";
import NotificationsPagination from "./components/NotificationsPagination";
import NotificationsTable from "./components/NotificationsTable";
import NotificationsToolbar from "./components/NotificationsToolbar";
import { NOTIFICATION_ROWS, type EnterpriseNotification } from "./data";

const PAGE_SIZE = 15;

const Notifications = () => {
  const [rows, setRows] =
    useState<EnterpriseNotification[]>(NOTIFICATION_ROWS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("Newest First");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let list = rows.filter((r) => {
      if (filter === "unread" && !r.unread) return false;
      if (filter === "read" && r.unread) return false;
      if (category !== "all" && r.category !== category) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        if (
          !r.title.toLowerCase().includes(q) &&
          !r.body.toLowerCase().includes(q) &&
          !r.category.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });

    if (sort === "Oldest First") {
      list = [...list].reverse();
    } else if (sort === "Priority") {
      const rank = { Critical: 0, High: 1, Medium: 2, Low: 3 };
      list = [...list].sort(
        (a, b) => rank[a.priority] - rank[b.priority]
      );
    }
    return list;
  }, [rows, filter, category, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
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

  const markAllRead = () => {
    setRows((prev) => prev.map((r) => ({ ...r, unread: false })));
    toast.success("All notifications marked as read.");
  };

  const onBulk = (v: string) => {
    if (!v) return;
    if (selected.size === 0) {
      toast.message("Select notifications first.");
      return;
    }
    if (v === "read") {
      setRows((prev) =>
        prev.map((r) =>
          selected.has(r.id) ? { ...r, unread: false } : r
        )
      );
      toast.success("Marked as read.");
    } else if (v === "unread") {
      setRows((prev) =>
        prev.map((r) =>
          selected.has(r.id) ? { ...r, unread: true } : r
        )
      );
      toast.success("Marked as unread.");
    } else {
      toast.message("Archived (demo).");
    }
    setSelected(new Set());
  };

  return (
    <div className="space-y-4 pb-8">
      <NotificationsHeader onMarkAllRead={markAllRead} />
      <NotificationsToolbar
        search={search}
        filter={filter}
        category={category}
        sort={sort}
        onSearch={(v) => {
          setSearch(v);
          setPage(1);
        }}
        onFilter={(v) => {
          setFilter(v);
          setPage(1);
        }}
        onCategory={(v) => {
          setCategory(v);
          setPage(1);
        }}
        onSort={setSort}
        onBulk={onBulk}
      />
      <NotificationsTable
        rows={pageRows}
        selected={selected}
        onToggleAll={toggleAll}
        onToggleOne={toggleOne}
        onOpen={(id) => {
          setRows((prev) =>
            prev.map((r) => (r.id === id ? { ...r, unread: false } : r))
          );
          toast.message("Opening notification…");
        }}
      />
      <NotificationsPagination
        page={safePage}
        totalPages={totalPages}
        from={from}
        to={to}
        total={148}
        onPage={setPage}
      />
      <EncryptionFooter />
    </div>
  );
};

export default Notifications;
