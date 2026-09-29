import { Archive, Check, Download, Pencil, RotateCcw, Send, X } from "lucide-react";
import Button from "@/ui/Button";
import { cn } from "@/lib/utils";
import ModalShell from "@/pages/Founder/_shared/ModalShell";
import { StatusText } from "@/pages/Founder/_shared/DashboardUi";
import {
  formatReportDate,
  reportFindings,
  reportStatusMeaning,
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
  const findings = reportFindings(report.findings);
  const facts: [string, string][] = [
    ["Report ID", report.id],
    ["Period", report.period],
    ["Prepared by", report.owner],
    ["Product", report.product],
    ["Organization", report.organization],
    ["Division", report.division],
    ["Generated", formatReportDate(report.createdAt)],
    ["File", report.sizeMb ? `${report.sizeMb} MB PDF` : "Not produced yet"],
  ];

  return (
    <ModalShell
      open
      onClose={onClose}
      placement="right"
      panelClassName="max-w-xl"
      title={report.title}
      description={`${report.organization} · ${report.period}`}
      footer={
        <>
          <Button
            variant="ghost"
            size="md"
            className="mr-auto border-0 font-medium normal-case tracking-normal"
            leftIcon={<Pencil className="size-3.5" />}
            title="Edit brief"
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
        <div className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-black/40 p-4">
          <StatusText
            label={report.status}
            dot={status.dot}
            text={status.text}
            note={reportStatusNote(report)}
          />
          <span
            className={cn(
              "shrink-0 rounded border px-2 py-0.5 text-[10px] font-bold uppercase leading-[15px]",
              reportTypeBadge[report.type]
            )}
          >
            {report.type}
          </span>
        </div>
        <p className="text-sm leading-6 text-white/70">{reportStatusMeaning[report.status]}</p>

        <section className="space-y-2">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#eab308]">
            Executive summary
          </h3>
          <p className="text-sm leading-6 text-white">{report.summary}</p>
        </section>

        <section className="space-y-2">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#6b7280]">
            Findings
          </h3>
          {findings.length ? (
            <ul className="space-y-2">
              {findings.map((line) => (
                <li key={line} className="flex gap-2 text-sm leading-6 text-white/85">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-[#eab308]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-white/45">No findings recorded yet.</p>
          )}
        </section>

        <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#6b7280]">
            Recommended action
          </h3>
          <p className="mt-2 text-sm leading-6 text-white">{report.recommendation}</p>
        </section>

        {report.founderNote ? (
          <section className="rounded-xl border border-[#eab308]/20 bg-[#eab308]/5 p-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#eab308]">
              Founder note
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/80">{report.founderNote}</p>
            <p className="mt-2 text-[11px] text-white/40">Internal. This note is not printed on the file.</p>
          </section>
        ) : null}

        <dl className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-3 border-t border-white/10 pt-5 text-sm">
          {facts.map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="text-[11px] uppercase tracking-[0.5px] text-[#6b7280]">{label}</dt>
              <dd className="text-white">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </ModalShell>
  );
};

export default ReportDetailsDrawer;
