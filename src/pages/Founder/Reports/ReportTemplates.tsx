import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  Bookmark,
  Bot,
  Check,
  ChevronDown,
  Crown,
  Eye,
  Factory,
  FileBarChart,
  Gem,
  Pencil,
  Search,
  Send,
  Settings2,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  User,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Input from "@/ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  addTemplate,
  publishAllTemplates,
  setWorkflow,
  toggleSection,
  updatePdfConfig,
  updateTemplate,
} from "@/store/features/FounderReports/founderReportsSlice";
import { IconAction, ProtocolBanner, StatusText } from "@/pages/Founder/_shared/DashboardUi";
import PdfConfigPanel from "./components/PdfConfigPanel";
import PdfPreviewModal, { type PreviewDocument } from "./components/PdfPreviewModal";
import TemplateFormModal, { type TemplateValues } from "./components/TemplateFormModal";
import { REPORT_TEMPLATES_CREATE_EVENT, REPORT_TEMPLATES_PUBLISH_ALL_EVENT } from "./events";
import { openPrintableReport } from "./print";
import { columnHeaderClass, panelClass, sectionLabelClass } from "./styles";
import {
  APPROVAL_WORKFLOWS,
  TEMPLATE_AUDIENCES,
  TEMPLATE_SECTIONS,
  TEMPLATE_STATUSES,
  WORKFLOW_STAGES,
  bumpVersion,
  templateAudienceMeta,
  templateIdFrom,
  templateStatusMeta,
  type ReportTemplate,
  type TemplateAudience,
  type WorkflowStageId,
} from "./data";

const STAGE_STYLE: Record<WorkflowStageId, { circle: string; label: string; icon: LucideIcon }> = {
  "ai-draft": { circle: "border-[#6b7280] bg-[#080808] text-[#9ca3af]", label: "text-[#9ca3af]", icon: Bot },
  "far-consulting": { circle: "border-[#eab308] bg-[#1e1908] text-[#eab308]", label: "text-[#eab308]", icon: Shield },
  "illumination-bridge": { circle: "border-[#22d3ee] bg-[#0a1c1f] text-[#22d3ee]", label: "text-[#22d3ee]", icon: Zap },
  "knowledge-asset": { circle: "border-[#10b981] bg-[#091914] text-[#10b981]", label: "text-[#10b981]", icon: Gem },
  approved: { circle: "border-[#10b981] bg-[#091914] text-[#10b981]", label: "text-[#10b981]", icon: BadgeCheck },
  delivered: { circle: "border-transparent bg-white text-black", label: "font-bold text-white", icon: Send },
};

const AUDIENCE_ICON: Record<TemplateAudience, LucideIcon> = {
  Consumer: User,
  Org: Bookmark,
  Founder: Crown,
  Enterprise: Factory,
};

const CATEGORY_ICON: Record<string, { icon: LucideIcon; tone: string }> = {
  "Financial Analysis": { icon: FileBarChart, tone: "bg-[rgba(234,179,8,0.1)] text-[#eab308]" },
  Compliance: { icon: ShieldCheck, tone: "bg-[rgba(34,211,238,0.1)] text-[#22d3ee]" },
  Leadership: { icon: Users, tone: "bg-[rgba(59,130,246,0.1)] text-[#60a5fa]" },
  Reflection: { icon: Sparkles, tone: "bg-[rgba(168,85,247,0.1)] text-[#c084fc]" },
  Operations: { icon: Settings2, tone: "bg-[rgba(16,185,129,0.1)] text-[#10b981]" },
};

const STATUS_FILTERS = ["All", ...TEMPLATE_STATUSES] as const;

const ReportTemplates = () => {
  const dispatch = useAppDispatch();
  const { templates, pdfConfig, enabledSections, workflow } = useAppSelector(
    (s) => s.founderReports
  );

  const [workflowOpen, setWorkflowOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_FILTERS)[number]>("All");
  const [audience, setAudience] = useState<TemplateAudience | null>(null);
  const [form, setForm] = useState<{ template?: ReportTemplate } | null>(null);
  const [preview, setPreview] = useState<PreviewDocument | null>(null);

  const skipped = APPROVAL_WORKFLOWS.find((w) => w.name === workflow)?.skipped ?? [];

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return templates.filter(
      (t) =>
        (!q || [t.name, t.id, t.category, t.division].some((f) => f.toLowerCase().includes(q))) &&
        (statusFilter === "All" || t.status === statusFilter) &&
        (!audience || t.audience === audience)
    );
  }, [templates, query, statusFilter, audience]);

  useEffect(() => {
    const onPublishAll = () => {
      const drafts = templates.filter((t) => t.status === "Drafting").length;
      if (!drafts) {
        toast.info("Every template is already published");
        return;
      }
      dispatch(publishAllTemplates());
      toast.success(`Published ${drafts} template${drafts === 1 ? "" : "s"}`);
    };
    const onCreate = () => setForm({});
    window.addEventListener(REPORT_TEMPLATES_PUBLISH_ALL_EVENT, onPublishAll);
    window.addEventListener(REPORT_TEMPLATES_CREATE_EVENT, onCreate);
    return () => {
      window.removeEventListener(REPORT_TEMPLATES_PUBLISH_ALL_EVENT, onPublishAll);
      window.removeEventListener(REPORT_TEMPLATES_CREATE_EVENT, onCreate);
    };
  }, [templates, dispatch]);

  const submitTemplate = (values: TemplateValues) => {
    const existing = form?.template;
    if (existing) {
      const changed = (Object.keys(values) as (keyof TemplateValues)[]).some(
        (k) => values[k] !== existing[k]
      );
      if (changed) {
        dispatch(
          updateTemplate({
            id: existing.id,
            patch: { ...values, version: bumpVersion(existing.version) },
          })
        );
        toast.success(`${values.name} updated`);
      }
    } else {
      dispatch(
        addTemplate({ ...values, id: templateIdFrom(values.name, templates), version: "v1.0.0" })
      );
      toast.success(`${values.name} created`);
    }
    setForm(null);
  };

  const printPreview = (doc: PreviewDocument) => {
    const opened = openPrintableReport(
      { ...doc, meta: [["Typography", pdfConfig.typography], ["Workflow", workflow]] },
      pdfConfig,
      enabledSections
    );
    if (!opened) toast.error("Allow pop-ups for this site to print the preview");
  };

  return (
    <AnimatedContainer className="flex flex-col gap-6 pb-8 lg:gap-8">
      {/* Approval workflow */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex flex-col gap-2.5 pb-6">
          <p className={sectionLabelClass}>Approval Workflow Protocol</p>
          <Popover open={workflowOpen} onOpenChange={setWorkflowOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex w-fit cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-sm font-medium text-white"
              >
                {workflow}
                <ChevronDown className={cn("size-4 transition-transform", workflowOpen && "rotate-180")} />
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" sideOffset={6} className="w-60 rounded-lg border-white/10 bg-[#111] p-1">
              {APPROVAL_WORKFLOWS.map((w) => (
                <button
                  key={w.name}
                  type="button"
                  onClick={() => {
                    dispatch(setWorkflow(w.name));
                    setWorkflowOpen(false);
                    if (w.name !== workflow) toast.success(`Approval workflow set to ${w.name}`);
                  }}
                  className="flex w-full cursor-pointer items-center justify-between rounded-md border-0 bg-transparent px-3 py-2 text-left text-sm text-[#9ca3af] hover:bg-white/5 hover:text-white"
                >
                  <span>
                    {w.name}
                    <span className="block text-[10px] text-[#6b7280]">
                      {WORKFLOW_STAGES.length - w.skipped.length} stages
                    </span>
                  </span>
                  {w.name === workflow && <Check className="size-3.5 text-[#eab308]" />}
                </button>
              ))}
            </PopoverContent>
          </Popover>
        </div>
        <div className="overflow-x-auto">
          <ol className="relative flex min-w-[640px] items-start justify-between px-4">
            <span className="absolute left-10 right-10 top-5 h-px bg-white/10" aria-hidden />
            {WORKFLOW_STAGES.map((stage) => {
              const style = STAGE_STYLE[stage.id];
              const Icon = style.icon;
              const isSkipped = skipped.includes(stage.id);
              return (
                <li key={stage.id} className="relative flex flex-col items-center gap-3">
                  <span
                    className={cn(
                      "flex size-10 items-center justify-center rounded-full border",
                      isSkipped ? "border-dashed border-white/20 bg-[#080808] text-white/25" : style.circle
                    )}
                  >
                    <Icon className="size-3.5" />
                  </span>
                  <span className={cn("text-center text-[10px] font-medium leading-[15px]", isSkipped ? "text-white/25 line-through" : style.label)}>
                    {stage.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[341px_1fr]">
        <PdfConfigPanel
          config={pdfConfig}
          onChange={(patch, message) => {
            dispatch(updatePdfConfig(patch));
            if (message) toast.success(message);
          }}
          onPreview={() =>
            setPreview({ id: "TMPL-PREVIEW", title: "Sample Founder Report", subtitle: `${workflow} workflow` })
          }
        />

        <div className="flex min-w-0 flex-col gap-6">
          <div className={cn(panelClass, "p-6")}>
            <p className={cn(sectionLabelClass, "pb-6")}>Template Structure &amp; Section Configuration</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TEMPLATE_SECTIONS.map((s) => {
                const on = enabledSections.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={on}
                    title={on ? "Included — click to exclude" : "Excluded — click to include"}
                    onClick={() => dispatch(toggleSection(s.id))}
                    className={cn(
                      "flex cursor-pointer flex-col gap-2 rounded-xl border bg-black/40 p-4 text-left transition-colors",
                      on ? "border-white/5 hover:border-[#eab308]/30" : "border-white/5 opacity-60 hover:opacity-90"
                    )}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-[13px] font-medium leading-[19.5px] text-white">{s.title}</span>
                      <Users className={cn("size-4 shrink-0", on ? "text-[#eab308]" : "text-[#6b7280]")} />
                    </span>
                    <span className="text-[10px] leading-[15px] text-[#6b7280]">{s.description}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {TEMPLATE_AUDIENCES.map((a) => {
              const meta = templateAudienceMeta[a];
              const Icon = AUDIENCE_ICON[a];
              const active = audience === a;
              const count = templates.filter((t) => t.audience === a).length;
              return (
                <button
                  key={a}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setAudience(active ? null : a)}
                  className={cn(
                    "flex cursor-pointer flex-col items-start rounded-xl border px-4 pb-4 pt-5 text-left transition-shadow",
                    meta.card,
                    active && cn("ring-2", meta.active)
                  )}
                >
                  <span className="flex w-full items-center justify-between">
                    <Icon className={cn("size-4", meta.icon)} />
                    <span className="text-[10px] text-[#6b7280]">{count}</span>
                  </span>
                  <span className="pt-1 text-xs font-bold leading-[18px] text-white">{meta.label}</span>
                  <span className="text-[10px] leading-[15px] text-[#6b7280]">{meta.subtitle}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Template library */}
      <div className={cn(panelClass, "overflow-hidden")}>
        <div className="flex flex-col gap-3 border-b border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className={sectionLabelClass}>
            Template Library
            {audience && (
              <button
                type="button"
                onClick={() => setAudience(null)}
                className="ml-2 cursor-pointer rounded border-0 bg-white/5 px-1.5 py-0.5 normal-case tracking-normal text-[#9ca3af] hover:text-white"
              >
                {templateAudienceMeta[audience].label} ✕
              </button>
            )}
          </p>
          <div className="flex items-center gap-4">
            <Input
              variant="soft"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search templates..."
              leftIcon={<Search className="size-3 text-[#9ca3af]" />}
              containerClassName="w-full sm:w-64"
              className="h-9! rounded-lg! border-white/10! bg-black/40! pl-9! text-xs text-white placeholder:text-[#9ca3af]"
            />
            <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "flex h-9 shrink-0 cursor-pointer items-center gap-2 rounded-lg border bg-white/5 px-4 text-[11px] font-bold text-[#9ca3af] hover:text-white",
                    statusFilter !== "All" ? "border-[#eab308]/50" : "border-white/10"
                  )}
                >
                  <SlidersHorizontal className="size-3" />
                  {statusFilter === "All" ? "Filters" : statusFilter}
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" sideOffset={6} className="w-44 rounded-lg border-white/10 bg-[#111] p-1">
                <p className="px-3 pb-1 pt-2 text-[9px] font-bold uppercase text-[#6b7280]">Status</p>
                {STATUS_FILTERS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setStatusFilter(s);
                      setFiltersOpen(false);
                    }}
                    className="flex w-full cursor-pointer items-center justify-between rounded-md border-0 bg-transparent px-3 py-2 text-left text-sm text-[#9ca3af] hover:bg-white/5 hover:text-white"
                  >
                    {s}
                    {s === statusFilter && <Check className="size-3.5 text-[#eab308]" />}
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead className="bg-white/[0.02]">
              <tr>
                <th className={columnHeaderClass}>Template Name &amp; ID</th>
                <th className={columnHeaderClass}>Category</th>
                <th className={columnHeaderClass}>Division</th>
                <th className={columnHeaderClass}>Version</th>
                <th className={columnHeaderClass}>Status</th>
                <th className={cn(columnHeaderClass, "text-right")}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => {
                const cat = CATEGORY_ICON[t.category] ?? CATEGORY_ICON["Financial Analysis"];
                const Icon = cat.icon;
                const s = templateStatusMeta[t.status];
                return (
                  <tr key={t.id} className="border-t border-white/5 transition-colors hover:bg-white/[0.02]">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <span className={cn("flex size-8 shrink-0 items-center justify-center rounded", cat.tone)}>
                          <Icon className="size-3.5" />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-semibold leading-[19.5px] text-white">{t.name}</p>
                          <p className="text-[10px] leading-[15px] text-[#6b7280]">{t.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-xs text-[#9ca3af]">{t.category}</td>
                    <td className="px-6 py-6 text-xs text-[#9ca3af]">{t.division}</td>
                    <td className="px-6 py-6 text-xs text-[#9ca3af]">{t.version}</td>
                    <td className="px-6 py-6">
                      <StatusText label={t.status} dot={s.dot} text={s.text} />
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex justify-end gap-2">
                        <IconAction
                          label={`Preview ${t.name}`}
                          className="border border-white/5 bg-black/40"
                          onClick={() =>
                            setPreview({ id: t.id, title: t.name, subtitle: `${t.category} · ${t.division}` })
                          }
                        >
                          <Eye className="size-3" />
                        </IconAction>
                        <IconAction
                          label={`Edit ${t.name}`}
                          className="border border-white/5 bg-black/40"
                          onClick={() => setForm({ template: t })}
                        >
                          <Pencil className="size-3" />
                        </IconAction>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-14 text-center text-sm text-white/60">
                    No templates match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProtocolBanner
        title="Visual Architecture Integrity Locked"
        lines="Changes to PDF templates affect all future report generations. Branding consistency is enforced across all divisions. Templates marked with FAR™ are system-protected and require Multi-Founder Approval to modify."
        authority="Full Configuration Access"
      />

      {form && (
        <TemplateFormModal
          key={form.template?.id ?? "new"}
          template={form.template}
          existingNames={templates.map((t) => t.name)}
          onClose={() => setForm(null)}
          onSubmit={submitTemplate}
        />
      )}
      {preview && (
        <PdfPreviewModal
          doc={preview}
          config={pdfConfig}
          sections={enabledSections}
          onClose={() => setPreview(null)}
          onPrint={() => printPreview(preview)}
        />
      )}
    </AnimatedContainer>
  );
};

export default ReportTemplates;
