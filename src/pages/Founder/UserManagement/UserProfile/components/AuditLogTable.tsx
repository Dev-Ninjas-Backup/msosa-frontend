import { FileCode2, KeyRound, Lock, ShieldCheck, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatAuditTime, type AuditEntry, type AuditKind } from "../../data";

const KIND_ICON: Record<AuditKind, { icon: typeof Lock; className: string }> = {
  purchase: { icon: Lock, className: "text-[#eab308]" },
  protocol: { icon: FileCode2, className: "text-[#22d3ee]" },
  security: { icon: KeyRound, className: "text-[#ef4444]" },
  auth: { icon: ShieldCheck, className: "text-[#22d3ee]" },
  admin: { icon: UserCog, className: "text-[#a78bfa]" },
};

const AuditLogTable = ({
  entries,
  emptyText = "No activity recorded yet.",
}: {
  entries: AuditEntry[];
  emptyText?: string;
}) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[820px] text-left">
      <thead>
        <tr className="border-b border-[#222] text-[9px] font-bold uppercase tracking-[0.5px] text-[#6b7280]">
          <th className="px-6 py-4 font-bold">Timestamp</th>
          <th className="px-6 py-4 font-bold">Action Tracking</th>
          <th className="px-6 py-4 font-bold">Device Info</th>
          <th className="px-6 py-4 font-bold">Location / IP</th>
          <th className="px-6 py-4 text-center font-bold">Result</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((e) => {
          const { icon: Icon, className } = KIND_ICON[e.kind];
          return (
            <tr key={e.id} className="border-b border-[#1a1a1a] last:border-0">
              <td className="px-6 py-5 text-xs text-white">{formatAuditTime(e.at)}</td>
              <td className="px-6 py-5">
                <span className="inline-flex items-center gap-2 text-xs text-white">
                  <Icon className={cn("size-3.5 shrink-0", className)} />
                  {e.action}
                </span>
              </td>
              <td className="px-6 py-5 text-xs text-[#9ca3af]">{e.device}</td>
              <td className="px-6 py-5 text-xs text-[#6b7280]">
                {e.location} • {e.ip}
              </td>
              <td
                className={cn(
                  "px-6 py-5 text-center text-xs font-bold",
                  e.result === "Success" ? "text-[#10b981]" : "text-[#ef4444]"
                )}
              >
                {e.result}
              </td>
            </tr>
          );
        })}
        {entries.length === 0 && (
          <tr>
            <td colSpan={5} className="px-6 py-10 text-center text-sm text-white/50">
              {emptyText}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default AuditLogTable;
