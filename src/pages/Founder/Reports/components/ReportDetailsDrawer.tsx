import { Archive, Check, Download, Pencil, RotateCcw, Send, X } from "lucide-react";
import Button from "@/ui/Button";
import { cn } from "@/lib/utils";
import ModalShell from "@/pages/Founder/_shared/ModalShell";
import { StatusText } from "@/pages/Founder/_shared/DashboardUi";
import {
  formatReportDate,
  reportStatusMeta,
  reportStatusNote,
  reportTypeBadge,
  type Report,
  type ReportStatus,
} from "../data";

export type ReportAction = "approve" | "reject" | "retry" | "deliver" | "archive" | "download";

const ACTIONS_BY_STATUS: Record<ReportStatus, ReportAction[]> = {
  "Pending Approval": ["reject", "approve"],
  Approved: ["archive", "deliver"],
  Delivered: ["archive", "download"],
  Failed: ["archive", "retry"],
  Archived: ["download"],
};

const ACTION_META: Record<
  ReportAction,
  { label: string; icon: typeof Check; primary?: boolean; danger?: boolean }
> = {
  approve: { label: "Approve", icon: Check, primary: true },
  reject: { label: "Reject", icon: X, danger: true },
  retry: { label: "Retry Generation", icon: RotateCcw, primary: true },
  deliver: { label: "Mark Delivered", icon: Send, primary: true },
  archive: { label: "Archive", icon: Archive },
  download: { label: "Download PDF", icon: Download, primary: true },
};

const ReportDetailsDrawer = ({
  report,
  onClose,
  onAction,
  onEdit,
}: {
  report: Report | null;
  onClose: () => void;
  onAction: (report: Report, action: ReportAction) => void;
  onEdit: (report: Report) => void;
}) => {
  if (!report) return null;
  const status = reportStatusMeta[report.status];
  const rows: [string, string][] = [
    ["Report ID", report.id],
    ["Product", report.product],
    ["Organization", report.organization],
    ["Division", report.division],
    ["Generated", formatReportDate(report.createdAt)],
    ["File Size", report.sizeMb ? `${report.sizeMb} MB` : "—"],
  ];

  return (
    <ModalShell
      open
      onClose={onClose}
      placement="right"
      title={report.title}
      description={report.product}
      footer={
        <>
          <Button
            variant="ghost"
            size="md"
            className="mr-auto border-0 font-medium normal-case tracking-normal"
            leftIcon={<Pencil className="size-3.5" />}
            title="Edit"
            onClick={() => onEdit(report)}
          />
          {ACTIONS_BY_STATUS[report.status].map((a) => {
            const meta = ACTION_META[a];
            const Icon = meta.icon;
            return (
              <Button
                key={a}
                variant={meta.primary ? "primary" : "secondary"}
                size="md"
                className={cn(
                  "rounded-lg px-4 font-medium",
                  meta.danger && "border-[#ef4444]/30 bg-[#ef4444]/10 text-[#ef4444]"
                )}
                leftIcon={<Icon className="size-3.5" />}
                title={meta.label}
                onClick={() => onAction(report, a)}
              />
            );
          })}
        </>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/40 p-4">
          <StatusText
            label={report.status}
            dot={status.dot}
            text={status.text}
            note={reportStatusNote(report)}
          />
          <span
            className={cn(
              "rounded border px-2 py-0.5 text-[10px] font-bold uppercase leading-[15px]",
              reportTypeBadge[report.type]
            )}
          >
            {report.type}
          </span>
        </div>
        <dl className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-3 text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-[11px] uppercase tracking-[0.5px] text-[#6b7280]">{k}</dt>
              <dd className="text-white">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </ModalShell>
  );
};

export default ReportDetailsDrawer;
