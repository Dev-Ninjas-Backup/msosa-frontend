import { MoreVertical } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import { cn } from "@/lib/utils";
import {
  categoryStyle,
  priorityStyle,
  type EnterpriseNotification,
} from "../data";

type NotificationsTableProps = {
  rows: EnterpriseNotification[];
  selected: Set<string>;
  onToggleAll: () => void;
  onToggleOne: (id: string) => void;
  onOpen: (id: string) => void;
};

const NotificationsTable = ({
  rows,
  selected,
  onToggleAll,
  onToggleOne,
  onOpen,
}: NotificationsTableProps) => {
  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.id));

  return (
    <AnimatedContainer delay={0.06}>
      <div className="rounded-xl border border-white/10 bg-white/[0.05] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-2.5 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={onToggleAll}
                    className="size-3.5 rounded-[3px] border border-white/40 bg-transparent accent-[#FBBF24] cursor-pointer"
                  />
                </th>
                <th className="px-2 py-2.5 text-[10px] font-semibold uppercase tracking-[0.5px] text-white/60">
                  Notification
                </th>
                <th className="px-2 py-2.5 w-[120px] text-[10px] font-semibold uppercase tracking-[0.5px] text-white/60">
                  Category
                </th>
                <th className="px-2 py-2.5 w-[90px] text-[10px] font-semibold uppercase tracking-[0.5px] text-white/60">
                  Priority
                </th>
                <th className="px-2 py-2.5 w-[130px] text-[10px] font-semibold uppercase tracking-[0.5px] text-white/60 text-right">
                  Date & Time
                </th>
                <th className="px-2 py-2.5 w-[50px] text-[10px] font-semibold uppercase tracking-[0.5px] text-white/60 text-center">
                  Status
                </th>
                <th className="px-4 py-2.5 w-[90px] text-[10px] font-semibold uppercase tracking-[0.5px] text-white/60 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const cat = categoryStyle[row.category];
                return (
                  <tr
                    key={row.id}
                    className="border-b border-white/10 last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3 align-middle">
                      <input
                        type="checkbox"
                        checked={selected.has(row.id)}
                        onChange={() => onToggleOne(row.id)}
                        className="size-3.5 rounded-[3px] border border-white/40 bg-transparent accent-[#FBBF24] cursor-pointer"
                      />
                    </td>
                    <td className="px-2 py-3 align-middle">
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={cn(
                            "flex size-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold",
                            cat.avatar
                          )}
                        >
                          {row.letter}
                        </span>
                        <div className="min-w-0">
                          <p
                            className={cn(
                              "text-xs truncate",
                              row.unread
                                ? "font-semibold text-white"
                                : "font-medium text-white/60"
                            )}
                          >
                            {row.title}
                          </p>
                          <p className="text-[11px] text-white/60 truncate mt-0.5">
                            {row.body}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3 align-middle">
                      <span
                        className={cn(
                          "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold",
                          cat.badge
                        )}
                      >
                        {row.category}
                      </span>
                    </td>
                    <td className="px-2 py-3 align-middle">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          priorityStyle[row.priority]
                        )}
                      >
                        {row.priority}
                      </span>
                    </td>
                    <td className="px-2 py-3 align-middle text-right text-[11px] text-white/60 whitespace-nowrap">
                      {row.datetime}
                    </td>
                    <td className="px-2 py-3 align-middle text-center">
                      <span
                        className={cn(
                          "inline-block size-2 rounded-full",
                          row.unread ? "bg-[#F97316]" : "border border-white/30"
                        )}
                      />
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onOpen(row.id)}
                          className="text-[11px] text-white/70 hover:text-white cursor-pointer border-0 bg-transparent p-0 whitespace-nowrap"
                        >
                          Open →
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            toast.success(`Marked “${row.title}” as read.`);
                            onOpen(row.id);
                          }}
                          className="text-white/40 hover:text-white cursor-pointer border-0 bg-transparent p-0"
                        >
                          <MoreVertical className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default NotificationsTable;
