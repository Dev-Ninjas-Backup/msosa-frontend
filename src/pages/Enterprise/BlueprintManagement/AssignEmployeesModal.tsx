import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Search, X } from "lucide-react";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { cn } from "@/lib/utils";
import {
  AVATAR_COLORS,
  assignReflectionToEmployees,
  getEmployeesSnapshot,
  subscribeEmployees,
  type EmployeeRow,
} from "../EmployeeManagement/data";

type AssignEmployeesModalProps = {
  isOpen: boolean;
  reflectionName: string;
  onClose: () => void;
  onAssigned?: (count: number) => void;
};

const AssignEmployeesModal = ({
  isOpen,
  reflectionName,
  onClose,
  onAssigned,
}: AssignEmployeesModalProps) => {
  const employees = useSyncExternalStore(
    subscribeEmployees,
    getEmployeesSnapshot,
    getEmployeesSnapshot
  );
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isOpen) return;
    setQuery("");
    setSelected(new Set());
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const activeEmployees = useMemo(
    () => employees.filter((e) => e.accountStatus === "Active"),
    [employees]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return activeEmployees;
    return activeEmployees.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q) ||
        e.id.toLowerCase().includes(q)
    );
  }, [activeEmployees, query]);

  if (!isOpen) return null;

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAllVisible = () => {
    const ids = filtered.map((e) => e.id);
    const allSelected = ids.length > 0 && ids.every((id) => selected.has(id));
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) ids.forEach((id) => next.delete(id));
      else ids.forEach((id) => next.add(id));
      return next;
    });
  };

  const handleAssign = () => {
    if (selected.size === 0) return;
    const ids = Array.from(selected);
    assignReflectionToEmployees(ids, reflectionName);
    onAssigned?.(ids.length);
    onClose();
  };

  const alreadyAssigned = (e: EmployeeRow) => e.blueprint === reflectionName;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xs"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-2xl border border-white/10 bg-black shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between gap-3 p-5 border-b border-white/10">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Assign to Employees
            </h3>
            <p className="mt-1 text-xs text-white/50">
              Assign{" "}
              <span className="text-[#FBBF24] font-medium">{reflectionName}</span>{" "}
              to selected employees.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-white/40 hover:bg-white/5 hover:text-white cursor-pointer"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="p-4 border-b border-white/10 space-y-3">
          <Input
            variant="soft"
            placeholder="Search employees…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leftIcon={<Search className="size-4 text-white/40" />}
          />
          <div className="flex items-center justify-between text-xs text-white/50">
            <button
              type="button"
              onClick={toggleAllVisible}
              className="text-[#10B7BA] hover:underline cursor-pointer"
            >
              {filtered.length > 0 &&
              filtered.every((e) => selected.has(e.id))
                ? "Deselect all"
                : "Select all visible"}
            </button>
            <span>
              <span className="text-white font-semibold">{selected.size}</span>{" "}
              selected
            </span>
          </div>
        </div>

        <ul className="flex-1 overflow-y-auto p-2 space-y-0.5 min-h-[200px]">
          {filtered.map((row, idx) => {
            const color =
              AVATAR_COLORS[
                employees.findIndex((e) => e.id === row.id) %
                  AVATAR_COLORS.length
              ] ?? AVATAR_COLORS[idx % AVATAR_COLORS.length];
            const checked = selected.has(row.id);
            return (
              <li key={row.id}>
                <button
                  type="button"
                  onClick={() => toggle(row.id)}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left cursor-pointer transition-colors",
                    checked ? "bg-white/10" : "hover:bg-white/5"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    readOnly
                    className="size-3.5 rounded accent-[#FBBF24] pointer-events-none"
                  />
                  <span
                    className="flex size-8 items-center justify-center rounded-full text-[11px] font-bold text-black shrink-0"
                    style={{ backgroundColor: color }}
                  >
                    {row.initials}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-white truncate">
                      {row.name}
                    </span>
                    <span className="block text-[11px] text-white/50 truncate">
                      {row.department} · {row.email}
                    </span>
                  </span>
                  {alreadyAssigned(row) ? (
                    <span className="shrink-0 text-[10px] font-semibold text-[#10B7BA]">
                      Assigned
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
          {filtered.length === 0 ? (
            <li className="px-3 py-10 text-center text-sm text-white/40">
              No active employees match.
            </li>
          ) : null}
        </ul>

        <div className="flex gap-3 p-4 border-t border-white/10">
          <Button
            type="button"
            variant="soft"
            className="flex-1 rounded-xl!"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            disabled={selected.size === 0}
            className="flex-1 rounded-xl! bg-[#10B7BA]! text-black! hover:bg-[#0ea5a8]! disabled:opacity-40"
            onClick={handleAssign}
          >
            Assign ({selected.size})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssignEmployeesModal;
