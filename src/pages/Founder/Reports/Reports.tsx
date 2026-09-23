import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Check,
  ClipboardCheck,
  Eye,
  FileText,
  Pencil,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  TrendingUp,
  TriangleAlert,
  UserPlus,
  Users,
  UserX,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Input from "@/ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateReport } from "@/store/features/FounderReports/founderReportsSlice";
import FilterChip from "@/pages/Founder/_shared/FilterChip";
import { downloadCsv, toggleIn } from "@/pages/Founder/_shared/utils";
import {
  IconAction,
  MiniMetric,
  Pagination,
  ProtocolBanner,
  StatusText,
  SummaryCard,
} from "@/pages/Founder/_shared/DashboardUi";
import ReportDetailsDrawer, { type ReportAction } from "./components/ReportDetailsDrawer";
import EditReportModal from "./components/EditReportModal";
import { REPORT_TEMPLATES_PATH, REPORTS_EXPORT_EVENT } from "./events";
import { openPrintableReport } from "./print";
import { columnHeaderClass, panelClass } from "./styles";
import {
  DATE_RANGES,
  REPORT_DIVISIONS,
  REPORT_STATUSES,
  REPORT_TOTALS,
  REPORT_TYPES,
  formatReportDate,
  reportStatusMeta,
  reportStatusNote,
  reportTypeBadge,
  reportTypeIconTone,
  withinRange,
  type DateRange,
  type Report,
  type ReportType,
} from "./data";

const PAGE_SIZE = 5;
const STATUS_OPTIONS = ["All", ...REPORT_STATUSES] as const;
const DIVISION_OPTIONS = ["All", ...REPORT_DIVISIONS] as const;

const TYPE_ICON: Record<ReportType, LucideIcon> = {
  Financial: FileText,
  Compliance: ShieldCheck,
  Incident: TriangleAlert,
  Strategic: TrendingUp,
  Assessment: ClipboardCheck,
};

const ACTION_TOAST: Record<Exclude<ReportAction, "download">, string> = {
  approve: "Report approved",
  reject: "Report rejected",
  retry: "Report queued for regeneration",
  deliver: "Report marked as delivered",
  archive: "Report archived",
};

const Reports = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { reports, pdfConfig, enabledSections } = useAppSelector((s) => s.founderReports);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>("All");
  const [division, setDivision] = useState<(typeof DIVISION_OPTIONS)[number]>("All");
  const [range, setRange] = useState<DateRange>("30D");
  const [types, setTypes] = useState<ReportType[]>([]);
  const [orgs, setOrgs] = useState<string[]>([]);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const organizations = useMemo(
    () => [...new Set(reports.map((r) => r.organization))].sort(),
    [reports]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reports.filter(
      (r) =>
        (!q ||
          [r.id, r.title, r.product, r.organization].some((f) => f.toLowerCase().includes(q))) &&
        (status === "All" || r.status === status) &&
        (division === "All" || r.division === division) &&
        withinRange(r.createdAt, range) &&
        (types.length === 0 || types.includes(r.type)) &&
        (orgs.length === 0 || orgs.includes(r.organization))
    );
  }, [reports, query, status, division, range, types, orgs]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);
  const advancedCount = types.length + orgs.length;

  const viewing = reports.find((r) => r.id === viewingId) ?? null;
  const editing = reports.find((r) => r.id === editingId) ?? null;

  const withReset =
    <T,>(setter: (v: T) => void) =>
    (v: T) => {
      setter(v);
      setPage(1);
    };

  useEffect(() => {
    const onExport = () => {
      if (!filtered.length) {
        toast.error("No reports match the current filters");
        return;
      }
      downloadCsv(`far-reports-${new Date().toISOString().slice(0, 10)}.csv`, [
        ["Report ID", "Title", "Product", "Organization", "Type", "Division", "Date", "Status", "Size (MB)"],
        ...filtered.map((r) => [
          r.id,
          r.title,
          r.product,
          r.organization,
          r.type,
          r.division,
          r.createdAt,
          r.status,
          r.sizeMb ?? "",
        ]),
      ]);
      toast.success(`Exported ${filtered.length} report${filtered.length === 1 ? "" : "s"}`);
    };
    window.addEventListener(REPORTS_EXPORT_EVENT, onExport);
    return () => window.removeEventListener(REPORTS_EXPORT_EVENT, onExport);
  }, [filtered]);

  const handleAction = (report: Report, action: ReportAction) => {
    if (action === "download") {
      const opened = openPrintableReport(
        {
          id: report.id,
          title: report.title,
          subtitle: `${report.product} · ${report.organization}`,
          meta: [
            ["Organization", report.organization],
            ["Division", report.division],
            ["Report Type", report.type],
            ["Generated", formatReportDate(report.createdAt)],
            ["Status", report.status],
          ],
        },
        pdfConfig,
        enabledSections
      );
      if (!opened) toast.error("Allow pop-ups for this site to download the PDF");
      return;
    }
    const patch: Partial<Report> = {
      approve: { status: "Approved" as const, note: undefined },
      reject: { status: "Failed" as const, note: "Rejected by Founder" },
      retry: {
        status: "Pending Approval" as const,
        note: undefined,
        createdAt: new Date().toISOString().slice(0, 10),
      },
      deliver: {
        status: "Delivered" as const,
        note: undefined,
        sizeMb: report.sizeMb ?? Math.round((1 + Math.random() * 3) * 10) / 10,
      },
      archive: { status: "Archived" as const, note: undefined },
    }[action];
    dispatch(updateReport({ id: report.id, patch }));
    toast.success(ACTION_TOAST[action]);
  };

  const clearAll = () => {
    setQuery("");
    setStatus("All");
    setDivision("All");
    setRange("All");
    setTypes([]);
    setOrgs([]);
    setPage(1);
  };

  const chipClass = (active: boolean) =>
    cn(
      "cursor-pointer rounded-md border px-2.5 py-1 text-[11px] transition-colors",
      active
        ? "border-[#eab308]/50 bg-[#eab308]/10 text-[#eab308]"
        : "border-white/10 bg-white/5 text-[#9ca3af] hover:text-white"
    );

  return (
    <AnimatedContainer className="flex flex-col gap-6 pb-8 lg:gap-10">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
        <SummaryCard
          label="Total Reports"
          value={REPORT_TOTALS.total}
          icon={<Users className="size-4 text-[#3b82f6]" />}
          footer={
            <>
              <Check className="size-3 text-[#10b981]" />
              <span className="text-[#10b981]">{REPORT_TOTALS.growth}</span>
            </>
          }
        />
        <SummaryCard
          label="Generated Today"
          value={REPORT_TOTALS.generatedToday}
          icon={<span className="size-2 rounded-full bg-[#10b981]" />}
          footer={<span className="text-[#6b7280]">{REPORT_TOTALS.deliveryRate}</span>}
        />
        <SummaryCard
          label="Pending Approval"
          value={REPORT_TOTALS.pendingApproval}
          icon={<UserX className="size-4 text-[#f87171]" />}
          footer={
            <button
              type="button"
              onClick={() => {
                withReset(setStatus)("Pending Approval");
                setRange("All");
              }}
              className="flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-[#f87171] hover:underline"
            >
              <TriangleAlert className="size-2.5" />
              Priority: High
            </button>
          }
        />
        <SummaryCard
          label="Failed Reports"
          value={REPORT_TOTALS.failed}
          icon={<UserPlus className="size-4 text-[#eab308]" />}
          footer={
            <button
              type="button"
              onClick={() => {
                withReset(setStatus)("Failed");
                setRange("All");
              }}
              className="flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-[#22d3ee] hover:underline"
            >
              <ArrowUpRight className="size-3" />
              Action required
            </button>
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        <MiniMetric label="Approved" value={REPORT_TOTALS.approved} />
        <MiniMetric label="Delivered" value={REPORT_TOTALS.delivered} />
        <MiniMetric label="Archived" value={REPORT_TOTALS.archived} />
        <MiniMetric
          label="Templates"
          value={REPORT_TOTALS.templates}
          valueClassName="text-[#22d3ee]"
          onClick={() => navigate(REPORT_TEMPLATES_PATH)}
        />
        <MiniMetric label="Avg. Size" value={REPORT_TOTALS.avgSize} valueClassName="text-[#10b981]" />
        <MiniMetric
          label="Most Generated"
          value={REPORT_TOTALS.mostGenerated}
          valueClassName="text-[#eab308]"
        />
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-4">
          <Input
            variant="soft"
            value={query}
            onChange={(e) => withReset(setQuery)(e.target.value)}
            placeholder="Search by ID, Name, User, Org..."
            leftIcon={<Search className="size-4 text-[#9ca3af]" />}
            containerClassName="w-full sm:w-[289px]"
            className="h-11! rounded-lg! border-white/10! bg-black/40! pl-12! text-sm text-white placeholder:text-[#9ca3af]"
          />
          <div className="flex flex-wrap gap-2">
            <FilterChip label="Status" value={status} options={STATUS_OPTIONS} onChange={withReset(setStatus)} />
            <FilterChip label="Division" value={division} options={DIVISION_OPTIONS} onChange={withReset(setDivision)} />
            <FilterChip label="Date" value={range} options={DATE_RANGES} onChange={withReset(setRange)} />
          </div>
        </div>
        <Popover open={advancedOpen} onOpenChange={setAdvancedOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex cursor-pointer items-center gap-2 self-start rounded-lg border-0 bg-transparent px-4 py-2 text-sm font-semibold text-[#eab308] hover:bg-white/5 lg:self-auto"
            >
              <SlidersHorizontal className="size-4" />
              Advanced Filters
              {advancedCount > 0 && (
                <span className="rounded-full bg-[#eab308] px-1.5 text-[10px] font-bold text-black">
                  {advancedCount}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            sideOffset={6}
            className="w-80 rounded-xl border-white/10 bg-[#111] p-4"
          >
            <div className="flex flex-col gap-4">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.5px] text-[#6b7280]">
                  Report Type
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {REPORT_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => withReset(setTypes)(toggleIn(types, t))}
                      className={chipClass(types.includes(t))}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.5px] text-[#6b7280]">
                  Organization
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {organizations.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => withReset(setOrgs)(toggleIn(orgs, o))}
                      className={chipClass(orgs.includes(o))}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <button
                  type="button"
                  onClick={clearAll}
                  className="cursor-pointer border-0 bg-transparent p-0 text-xs text-[#9ca3af] hover:text-white"
                >
                  Clear all filters
                </button>
                <button
                  type="button"
                  onClick={() => setAdvancedOpen(false)}
                  className="cursor-pointer border-0 bg-transparent p-0 text-xs font-semibold text-[#eab308]"
                >
                  Done
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className={cn(panelClass, "overflow-hidden shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]")}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] table-fixed text-left">
            <colgroup>
              <col className="w-32" />
              <col />
              <col className="w-48" />
              <col className="w-40" />
              <col className="w-32" />
              <col className="w-40" />
              <col className="w-40" />
            </colgroup>
            <thead className="border-b border-white/5 bg-white/[0.02]">
              <tr>
                <th className={columnHeaderClass}>Report ID</th>
                <th className={columnHeaderClass}>Report Title &amp; Product</th>
                <th className={columnHeaderClass}>Organization</th>
                <th className={columnHeaderClass}>Type</th>
                <th className={columnHeaderClass}>Date</th>
                <th className={columnHeaderClass}>Status</th>
                <th className={cn(columnHeaderClass, "text-right")}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => {
                const Icon = TYPE_ICON[r.type];
                const s = reportStatusMeta[r.status];
                return (
                  <tr key={r.id} className="border-b border-white/5 transition-colors hover:bg-white/[0.02]">
                    <td className="p-6 text-[11px] text-[#9ca3af]">{r.id}</td>
                    <td className="p-6">
                      <button
                        type="button"
                        onClick={() => setViewingId(r.id)}
                        className="flex cursor-pointer items-center gap-3 border-0 bg-transparent p-0 text-left"
                      >
                        <span
                          className={cn(
                            "flex size-9 shrink-0 items-center justify-center rounded-lg border",
                            reportTypeIconTone[r.type]
                          )}
                        >
                          <Icon className="size-3.5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold leading-[21px] text-white hover:underline">
                            {r.title}
                          </span>
                          <span className="block text-[10px] leading-[15px] text-[#6b7280]">
                            {r.product}
                          </span>
                        </span>
                      </button>
                    </td>
                    <td className="p-6 text-sm leading-[21px] text-[#9ca3af]">{r.organization}</td>
                    <td className="p-6">
                      <span
                        className={cn(
                          "inline-flex rounded border px-2 py-0.5 text-[10px] font-bold uppercase leading-[15px]",
                          reportTypeBadge[r.type]
                        )}
                      >
                        {r.type}
                      </span>
                    </td>
                    <td className="p-6 text-[11px] text-[#6b7280]">{formatReportDate(r.createdAt)}</td>
                    <td className="p-6">
                      <StatusText label={r.status} dot={s.dot} text={s.text} note={reportStatusNote(r)} />
                    </td>
                    <td className="p-6">
                      <div className="flex justify-end gap-2">
                        <IconAction label={`View ${r.title}`} onClick={() => setViewingId(r.id)}>
                          <Eye className="size-3.5" />
                        </IconAction>
                        <IconAction label={`Edit ${r.title}`} onClick={() => setEditingId(r.id)}>
                          <Pencil className="size-3" />
                        </IconAction>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <p className="text-sm text-white/60">No reports match your filters.</p>
                    <button
                      type="button"
                      onClick={clearAll}
                      className="mt-2 cursor-pointer border-0 bg-transparent text-xs font-semibold text-[#eab308] hover:underline"
                    >
                      Clear all filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-3 bg-white/[0.01] p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-[#6b7280]">
            {filtered.length
              ? `Showing ${start + 1} - ${start + visible.length} of ${filtered.length} reports`
              : "Showing 0 reports"}
          </p>
          <Pagination page={currentPage} pageCount={pageCount} onChange={setPage} />
        </div>
      </div>

      <ProtocolBanner
        title="Secure Access Protocol Active"
        lines="All report distributions are logged and encrypted. Access is restricted to authorized roles as per the Founder's Control Matrix. Any unauthorized attempts to bypass PDF security will trigger a system-wide audit."
        authority="Total Platform Authority"
      />

      <ReportDetailsDrawer
        report={viewing}
        onClose={() => setViewingId(null)}
        onAction={handleAction}
        onEdit={(r) => {
          setViewingId(null);
          setEditingId(r.id);
        }}
      />
      {editing && (
        <EditReportModal
          key={editing.id}
          report={editing}
          onClose={() => setEditingId(null)}
          onSave={(patch) => {
            dispatch(updateReport({ id: editing.id, patch }));
            toast.success("Report updated");
            setEditingId(null);
          }}
        />
      )}
    </AnimatedContainer>
  );
};

export default Reports;
