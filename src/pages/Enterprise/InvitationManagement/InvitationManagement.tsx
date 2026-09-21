import { useMemo, useState } from "react";
import { toast } from "sonner";
import ConfirmModal from "@/components/reuseable/ConfirmModal";
import CreateInvitationModal from "./CreateInvitationModal";
import EncryptionFooter from "./components/EncryptionFooter";
import InvitationTable from "./components/InvitationTable";
import InviteKpiCards from "./components/InviteKpiCards";
import InviteToolbar from "./components/InviteToolbar";
import {
  cancelInvitation,
  useInvitations,
  type InvitationRow,
} from "./data";

const PAGE_SIZE = 10;

const InvitationManagement = () => {
  const invitations = useInvitations();
  const [filter, setFilter] = useState<"Active" | "Expired">("Active");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [createOpen, setCreateOpen] = useState(false);
  const [cancelTarget, setCancelTarget] = useState<InvitationRow | null>(null);

  const filtered = useMemo(
    () =>
      invitations.filter((i) => {
        if (i.accountFilter !== filter) return false;
        if (statusFilter !== "all" && i.inviteStatus !== statusFilter)
          return false;
        return true;
      }),
    [invitations, filter, statusFilter]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const toggleAll = () => {
    if (pageRows.every((r) => selected.has(r.inviteId))) {
      setSelected((prev) => {
        const next = new Set(prev);
        pageRows.forEach((r) => next.delete(r.inviteId));
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        pageRows.forEach((r) => next.add(r.inviteId));
        return next;
      });
    }
  };

  const toggleOne = (inviteId: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(inviteId)) next.delete(inviteId);
      else next.add(inviteId);
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
      <InviteKpiCards />

      <InviteToolbar
        statusFilter={statusFilter}
        dateRange={dateRange}
        filter={filter}
        onStatusFilter={(v) => {
          setStatusFilter(v);
          setPage(1);
        }}
        onDateRange={setDateRange}
        onFilter={(v) => {
          setFilter(v);
          setPage(1);
        }}
        onCreate={() => setCreateOpen(true)}
      />

      <InvitationTable
        invitations={invitations}
        pageRows={pageRows}
        selected={selected}
        filteredCount={filtered.length}
        safePage={safePage}
        pageSize={PAGE_SIZE}
        pageButtons={pageButtons}
        onToggleAll={toggleAll}
        onToggleOne={toggleOne}
        onPage={setPage}
        onCancel={setCancelTarget}
      />

      <EncryptionFooter />

      <CreateInvitationModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={(count) =>
          toast.success(
            `Sent ${count} invitation${count === 1 ? "" : "s"}.`
          )
        }
      />

      <ConfirmModal
        isOpen={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={() => {
          if (!cancelTarget) return;
          cancelInvitation(cancelTarget.inviteId);
          toast.success(`Cancelled invitation for ${cancelTarget.name}.`);
          setCancelTarget(null);
        }}
        variant="danger"
        title="Cancel invitation?"
        description={
          cancelTarget
            ? `Cancel the invitation for ${cancelTarget.name}? They will no longer be able to use the secure link.`
            : ""
        }
        confirmText="Cancel Invitation"
        cancelText="Keep"
      />
    </div>
  );
};

export default InvitationManagement;
