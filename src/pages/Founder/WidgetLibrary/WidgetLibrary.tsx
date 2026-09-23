import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Archive,
  Check,
  CloudUpload,
  Copy,
  Eye,
  History,
  MoreVertical,
  Pencil,
  Rocket,
  Search,
  SlidersHorizontal,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Checkbox from "@/ui/Checkbox";
import Input from "@/ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  addWidget,
  removeWidgets,
  setWidgetStatus,
} from "@/store/features/FounderWidgets/founderWidgetsSlice";
import FilterChip from "@/pages/Founder/_shared/FilterChip";
import { toggleIn } from "@/pages/Founder/_shared/utils";
import { columnHeaderClass, panelClass } from "@/pages/Founder/_shared/dashboardStyles";
import {
  MiniMetric,
  Pagination,
  ProtocolBanner,
  SummaryCard,
} from "@/pages/Founder/_shared/DashboardUi";
import DeleteWidgetsModal from "./components/DeleteWidgetsModal";
import { WidgetIcon, WidgetStatusPill } from "./components/WidgetBits";
import { WIDGETS_BULK_EVENT, widgetEditPath, widgetPath } from "./events";
import {
  UPDATED_RANGES,
  WIDGET_CATEGORIES,
  WIDGET_STATUSES,
  WIDGET_TOTALS,
  WIDGET_TYPES,
  WIDGET_TYPE_META,
  duplicateWidget,
  formatUpdated,
  updatedWithin,
  widgetCategory,
  widgetDivisions,
  type UpdatedRange,
  type Widget,
  type WidgetStatus,
  type WidgetType,
} from "./data";

const PAGE_SIZE = 10;
const STATUS_OPTIONS = ["All", ...WIDGET_STATUSES] as const;
const CATEGORY_OPTIONS = ["All", ...WIDGET_CATEGORIES] as const;
const DIVISION_OPTIONS = ["All", "Consumer", "Enterprise", "Founder"] as const;

const menuItemClass =
  "flex w-full cursor-pointer items-center gap-2.5 rounded-md border-0 bg-transparent px-3 py-2 text-left text-sm text-[#9ca3af] transition-colors hover:bg-white/5 hover:text-white";

const chipClass = (active: boolean) =>
  cn(
    "cursor-pointer rounded-md border px-2.5 py-1 text-[11px] transition-colors",
    active
      ? "border-[#eab308]/50 bg-[#eab308]/10 text-[#eab308]"
      : "border-white/10 bg-white/5 text-[#9ca3af] hover:text-white"
  );

const WidgetLibrary = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const widgets = useAppSelector((s) => s.founderWidgets.widgets);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>("All");
  const [category, setCategory] = useState<(typeof CATEGORY_OPTIONS)[number]>("All");
  const [division, setDivision] = useState<(typeof DIVISION_OPTIONS)[number]>("All");
  const [types, setTypes] = useState<WidgetType[]>([]);
  const [range, setRange] = useState<UpdatedRange>("All");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [deleteIds, setDeleteIds] = useState<string[]>([]);

  useEffect(() => {
    const onBulk = () => {
      setSelecting((v) => !v);
      setSelected([]);
    };
    window.addEventListener(WIDGETS_BULK_EVENT, onBulk);
    return () => window.removeEventListener(WIDGETS_BULK_EVENT, onBulk);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return widgets.filter(
      (w) =>
        (!q ||
          [w.name, w.id, widgetCategory(w), w.type, ...w.tags].some((f) =>
            f.toLowerCase().includes(q)
          )) &&
        (status === "All" || w.status === status) &&
        (category === "All" || widgetCategory(w) === category) &&
        (division === "All" || widgetDivisions(w).includes(division)) &&
        (types.length === 0 || types.includes(w.type)) &&
        updatedWithin(w.updatedAt, range)
    );
  }, [widgets, query, status, category, division, types, range]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);
  const advancedCount = types.length + (range === "All" ? 0 : 1);

  const visibleIds = visible.map((w) => w.id);
  const selectedOnPage = visibleIds.filter((id) => selected.includes(id));
  const allOnPage = visibleIds.length > 0 && selectedOnPage.length === visibleIds.length;
  const deleting = widgets.filter((w) => deleteIds.includes(w.id));

  const withReset =
    <T,>(setter: (v: T) => void) =>
    (v: T) => {
      setter(v);
      setPage(1);
    };

  const clearAll = () => {
    setQuery("");
    setStatus("All");
    setCategory("All");
    setDivision("All");
    setTypes([]);
    setRange("All");
    setPage(1);
  };

  const exitSelection = () => {
    setSelecting(false);
    setSelected([]);
  };

  const changeStatus = (ids: string[], next: WidgetStatus) => {
    const affected = widgets.filter((w) => ids.includes(w.id) && w.status !== next);
    if (!affected.length) {
      toast.info(`Already ${next.toLowerCase()}`);
      return;
    }
    if (next === "Published") {
      const blocked = affected.filter((w) => !w.dataSource);
      if (blocked.length) {
        toast.error(
          `${blocked.map((w) => w.name).join(", ")} ${blocked.length === 1 ? "has" : "have"} no data source — edit before publishing`
        );
        return;
      }
    }
    dispatch(setWidgetStatus({ ids: affected.map((w) => w.id), status: next }));
    toast.success(
      affected.length === 1
        ? `${affected[0].name} ${next === "Published" ? "published" : `moved to ${next}`}`
        : `${affected.length} widgets ${next === "Published" ? "published" : `moved to ${next}`}`
    );
  };

  const duplicate = (w: Widget) => {
    const copy = duplicateWidget(w, widgets);
    dispatch(addWidget(copy));
    toast.success(`Duplicated as ${copy.name}`, {
      action: { label: "Edit", onClick: () => navigate(widgetEditPath(copy.id)) },
    });
  };

  const confirmDelete = () => {
    const count = deleting.length;
    dispatch(removeWidgets(deleteIds));
    setSelected((s) => s.filter((id) => !deleteIds.includes(id)));
    setDeleteIds([]);
    toast.success(count === 1 ? "Widget deleted" : `${count} widgets deleted`);
  };

  const runRowAction = (action: () => void) => {
    setMenuFor(null);
    action();
  };

  return (
    <AnimatedContainer className="flex flex-col gap-6 pb-8 lg:gap-10">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
        <SummaryCard
          label="Total Widgets"
          value={WIDGET_TOTALS.total}
          icon={<Users className="size-4 text-[#3b82f6]" />}
          footer={
            <>
              <Check className="size-3 text-[#10b981]" />
              <span className="text-[#10b981]">{WIDGET_TOTALS.newThisWeek}</span>
            </>
          }
        />
        <SummaryCard
          label="Active"
          value={WIDGET_TOTALS.active}
          icon={<span className="size-2 rounded-full bg-[#10b981]" />}
          footer={<span className="text-[#6b7280]">{WIDGET_TOTALS.deploymentRate}</span>}
        />
        <SummaryCard
          label="Published"
          value={WIDGET_TOTALS.published}
          icon={<CloudUpload className="size-4 text-[#22d3ee]" />}
          footer={
            <button
              type="button"
              onClick={() => withReset(setStatus)("Published")}
              className="cursor-pointer border-0 bg-transparent p-0 text-[#22d3ee] hover:underline"
            >
              Syncing to global CDN
            </button>
          }
        />
        <SummaryCard
          label="Recently Updated"
          value={WIDGET_TOTALS.recentlyUpdated}
          icon={<History className="size-4 text-[#eab308]" />}
          footer={
            <button
              type="button"
              onClick={() => withReset(setRange)("24H")}
              className="cursor-pointer border-0 bg-transparent p-0 text-[#6b7280] hover:text-white hover:underline"
            >
              Last 24 hours
            </button>
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MiniMetric label="Draft" value={WIDGET_TOTALS.draft} onClick={() => withReset(setStatus)("Draft")} />
        <MiniMetric label="Most Used" value={WIDGET_TOTALS.mostUsed} />
        <MiniMetric label="Categories" value={WIDGET_TOTALS.categories} valueClassName="text-[#22d3ee]" />
        <MiniMetric
          label="Dashboards Linked"
          value={WIDGET_TOTALS.dashboardsLinked}
          valueClassName="text-[#10b981]"
        />
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-4">
          <Input
            variant="soft"
            value={query}
            onChange={(e) => withReset(setQuery)(e.target.value)}
            placeholder="Search by name, ID, or category..."
            leftIcon={<Search className="size-4 text-[#9ca3af]" />}
            containerClassName="w-full sm:w-[289px]"
            className="h-11! rounded-lg! border-white/10! bg-black/40! pl-12! text-sm text-white placeholder:text-[#9ca3af]"
          />
          <div className="flex flex-wrap gap-2">
            <FilterChip label="Status" value={status} options={STATUS_OPTIONS} onChange={withReset(setStatus)} />
            <FilterChip label="Category" value={category} options={CATEGORY_OPTIONS} onChange={withReset(setCategory)} />
            <FilterChip label="Division" value={division} options={DIVISION_OPTIONS} onChange={withReset(setDivision)} />
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
          <PopoverContent align="end" sideOffset={6} className="w-80 rounded-xl border-white/10 bg-[#111] p-4">
            <div className="flex flex-col gap-4">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.5px] text-[#6b7280]">
                  Widget Type
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {WIDGET_TYPES.map((t) => (
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
                  Last Updated
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {UPDATED_RANGES.map((r) => (
                    <button key={r} type="button" onClick={() => withReset(setRange)(r)} className={chipClass(range === r)}>
                      {r === "All" ? "Any time" : r}
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
        {selecting && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[rgba(234,179,8,0.06)] px-6 py-3">
            <p className="text-xs text-white/80">
              <span className="font-bold text-[#eab308]">{selected.length}</span> selected
              {selected.length === 0 && " — tick rows to apply bulk actions"}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { label: "Publish", icon: Rocket, run: () => changeStatus(selected, "Published") },
                  { label: "Move to Draft", icon: Archive, run: () => changeStatus(selected, "Draft") },
                  { label: "Delete", icon: Trash2, run: () => setDeleteIds(selected), danger: true },
                ] as const
              ).map(({ label, icon: Icon, run, ...rest }) => (
                <button
                  key={label}
                  type="button"
                  disabled={selected.length === 0}
                  onClick={run}
                  className={cn(
                    "flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.5px] transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40",
                    "danger" in rest ? "text-[#f87171]" : "text-white"
                  )}
                >
                  <Icon className="size-3.5" />
                  {label}
                </button>
              ))}
              <button
                type="button"
                onClick={exitSelection}
                aria-label="Exit bulk selection"
                className="flex size-8 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent text-white/60 hover:bg-white/5 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] table-fixed text-left">
            <colgroup>
              {selecting && <col className="w-14" />}
              <col  className="min-w-52"/>
              <col className="w-60" />
              <col className="w-52" />
              <col className="w-40" />
              <col className="w-52" />
              <col className="w-52" />
              <col className="w-24" />
            </colgroup>
            <thead className="border-b border-white/5 bg-white/[0.02]">
              <tr>
                {selecting && (
                  <th className="py-4 pl-6">
                    <Checkbox
                      aria-label="Select all widgets on this page"
                      checked={allOnPage}
                      indeterminate={!allOnPage && selectedOnPage.length > 0}
                      onCheckedChange={(v) =>
                        setSelected((s) =>
                          v ? [...new Set([...s, ...visibleIds])] : s.filter((id) => !visibleIds.includes(id))
                        )
                      }
                    />
                  </th>
                )}
                <th className={columnHeaderClass}>Widget Name</th>
                <th className={columnHeaderClass}>Category / Type</th>
                <th className={columnHeaderClass}>Status</th>
                <th className={columnHeaderClass}>Version</th>
                <th className={cn(columnHeaderClass, "text-center")}>Deployment</th>
                <th className={columnHeaderClass}>Last Updated</th>
                <th className={cn(columnHeaderClass, "text-right")}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((w) => {
                const isSelected = selected.includes(w.id);
                return (
                  <tr
                    key={w.id}
                    onClick={() => (selecting ? setSelected((s) => toggleIn(s, w.id)) : navigate(widgetPath(w.id)))}
                    className={cn(
                      "cursor-pointer border-b border-white/5 transition-colors hover:bg-white/[0.02]",
                      isSelected && "bg-[rgba(234,179,8,0.04)]"
                    )}
                  >
                    {selecting && (
                      <td className="py-5 pl-6">
                        <Checkbox
                          aria-label={`Select ${w.name}`}
                          checked={isSelected}
                          onCheckedChange={() => setSelected((s) => toggleIn(s, w.id))}
                        />
                      </td>
                    )}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <WidgetIcon widget={w} />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold leading-[21px] text-white">{w.name}</p>
                          <p className="text-[11px] leading-[16.5px] text-[#6b7280]">ID: {w.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-[11px] font-bold uppercase leading-[16.5px] tracking-[0.55px] text-[#9ca3af]">
                        {widgetCategory(w)}
                      </p>
                      <p className="truncate text-xs leading-[18px] text-[#6b7280]">
                        {WIDGET_TYPE_META[w.type].detail}
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <WidgetStatusPill status={w.status} />
                    </td>
                    <td className="px-6 py-5 font-mono text-xs text-white/80">{w.version}</td>
                    <td className="px-6 py-5 text-center">
                      <p className="text-sm font-semibold leading-[21px] text-white">
                        {w.dashboards} Dashboard{w.dashboards === 1 ? "" : "s"}
                      </p>
                      <p className="text-[10px] uppercase leading-[15px] tracking-[0.5px] text-[#6b7280]">
                        {w.dashboards > 0
                          ? `Across ${w.products} Product${w.products === 1 ? "" : "s"}`
                          : w.status === "Draft"
                            ? "Stage: Development"
                            : "Awaiting Assignment"}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-xs text-[#9ca3af]">{formatUpdated(w.updatedAt)}</td>
                    <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end">
                        <Popover open={menuFor === w.id} onOpenChange={(o) => setMenuFor(o ? w.id : null)}>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              aria-label={`Actions for ${w.name}`}
                              className="flex size-8 cursor-pointer items-center justify-center rounded-lg border-0 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                            >
                              <MoreVertical className="size-4" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent align="end" sideOffset={6} className="w-48 rounded-lg border-white/10 bg-[#111] p-1">
                            <button type="button" className={menuItemClass} onClick={() => runRowAction(() => navigate(widgetPath(w.id)))}>
                              <Eye className="size-3.5" /> View Details
                            </button>
                            <button type="button" className={menuItemClass} onClick={() => runRowAction(() => navigate(widgetEditPath(w.id)))}>
                              <Pencil className="size-3.5" /> Edit Config
                            </button>
                            <button type="button" className={menuItemClass} onClick={() => runRowAction(() => duplicate(w))}>
                              <Copy className="size-3.5" /> Duplicate
                            </button>
                            {w.status !== "Published" && (
                              <button type="button" className={menuItemClass} onClick={() => runRowAction(() => changeStatus([w.id], "Published"))}>
                                <Rocket className="size-3.5" /> Publish
                              </button>
                            )}
                            {w.status !== "Draft" && (
                              <button type="button" className={menuItemClass} onClick={() => runRowAction(() => changeStatus([w.id], "Draft"))}>
                                <Archive className="size-3.5" /> Move to Draft
                              </button>
                            )}
                            <div className="my-1 h-px bg-white/10" />
                            <button
                              type="button"
                              className={cn(menuItemClass, "text-[#f87171] hover:text-[#f87171]")}
                              onClick={() => runRowAction(() => setDeleteIds([w.id]))}
                            >
                              <Trash2 className="size-3.5" /> Delete
                            </button>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={selecting ? 8 : 7} className="px-6 py-16 text-center">
                    <p className="text-sm text-white/60">No widgets match your filters.</p>
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
              ? `Showing ${start + 1} - ${start + visible.length} of ${filtered.length} widgets`
              : "Showing 0 widgets"}
          </p>
          <Pagination page={currentPage} pageCount={pageCount} onChange={setPage} />
        </div>
      </div>

      <ProtocolBanner
        title="Integrity Verification Active"
        lines="All widget source code is validated against the FAR™ Security Schema. Unauthorized scripts or external dependencies are automatically quarantined."
        authority="Full Dev Capability Enabled"
        label="Founder Protocol"
      />

      <DeleteWidgetsModal
        widgets={deleting}
        onClose={() => setDeleteIds([])}
        onConfirm={confirmDelete}
      />
    </AnimatedContainer>
  );
};

export default WidgetLibrary;
