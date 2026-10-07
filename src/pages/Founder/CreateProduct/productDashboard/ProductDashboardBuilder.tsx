import { useEffect, useMemo, useState } from "react";
import { GripVertical, Plus, Save, Settings2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { Label } from "@/ui/Label";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { saveLayoutTemplate } from "@/store/features/FounderProducts/founderProductsSlice";
import {
  categoryTone,
  widgetCategory,
  WIDGET_TYPE_META,
} from "@/pages/Founder/WidgetLibrary/data";
import { cloneDashboard, newWidgetInstance } from "./defaults";
import type {
  DashboardLayoutTemplate,
  LayoutPreviewKind,
  LayoutSlot,
  LayoutSlotSpan,
  ProductAudience,
  ProductDashboardConfig,
  ProductDashboardWidget,
} from "./types";
import ProductDashboardCanvas from "./ProductDashboardCanvas";
import WidgetStyleEditor from "./WidgetStyleEditor";

const SLOT_SPANS: LayoutSlotSpan[] = ["full", "half", "third", "sidebar"];

type Props = {
  value: ProductDashboardConfig;
  onChange: (next: ProductDashboardConfig) => void;
  /** Show save-template / audience preview chrome */
  showChrome?: boolean;
  productName?: string;
};

const PREVIEW_KINDS: LayoutPreviewKind[] = [
  "one",
  "two",
  "three",
  "four",
  "custom",
];

const MiniPreview = ({
  kind,
  active,
}: {
  kind: LayoutPreviewKind;
  active: boolean;
}) => {
  const tone = active ? "bg-white" : "bg-white/15";
  if (kind === "three") {
    return (
      <div className="flex h-14 w-full gap-1">
        <div className={cn("flex-1 rounded", tone)} />
        <div className={cn("w-3 rounded", tone)} />
      </div>
    );
  }
  if (kind === "four") {
    return (
      <div className="flex h-14 w-full gap-1">
        <div className={cn("flex-1 rounded", tone)} />
        <div className="flex flex-1 flex-col gap-1">
          <div className={cn("flex-1 rounded", tone)} />
          <div className={cn("h-5 rounded", tone)} />
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-14 w-full flex-col gap-1">
      <div className={cn("h-3 rounded", tone)} />
      <div className="flex min-h-0 flex-1 gap-1">
        <div className={cn("flex-1 rounded", tone)} />
        <div className={cn("w-3 rounded", tone)} />
      </div>
    </div>
  );
};

const ProductDashboardBuilder = ({
  value,
  onChange,
  showChrome = true,
  productName,
}: Props) => {
  const dispatch = useAppDispatch();
  const library = useAppSelector((s) => s.founderWidgets.widgets);
  const templates = useAppSelector((s) => s.founderProducts.layoutTemplates);
  const [audience, setAudience] = useState<ProductAudience>("Consumer User");
  const [styleId, setStyleId] = useState<string | null>(null);
  const [saveName, setSaveName] = useState("");
  const [libraryOpen, setLibraryOpen] = useState(true);
  const [libraryQuery, setLibraryQuery] = useState("");
  const [slotDraft, setSlotDraft] = useState<LayoutSlot[]>([]);
  const [renameDraft, setRenameDraft] = useState("");

  const config = value;
  const template = templates.find((t) => t.id === config.templateId);

  useEffect(() => {
    if (!template) {
      setSlotDraft([]);
      setRenameDraft("");
      return;
    }
    setSlotDraft(template.slots.map((s) => ({ ...s })));
    setRenameDraft(template.name);
  }, [template?.id]);

  const publishedLibrary = useMemo(() => {
    const q = libraryQuery.trim().toLowerCase();
    return library.filter((w) => {
      if (w.status !== "Published" && w.status !== "Active") return false;
      if (!q) return true;
      return (
        w.name.toLowerCase().includes(q) ||
        w.id.toLowerCase().includes(q) ||
        w.type.toLowerCase().includes(q) ||
        w.visibility.toLowerCase().includes(q)
      );
    });
  }, [library, libraryQuery]);

  const patch = (next: Partial<ProductDashboardConfig>) =>
    onChange({
      ...config,
      ...next,
      updatedAt: new Date().toISOString(),
    });

  const updateWidget = (id: string, next: ProductDashboardWidget) =>
    patch({
      widgets: config.widgets.map((w) => (w.id === id ? next : w)),
    });

  const moveWidget = (id: string, dir: -1 | 1) => {
    const idx = config.widgets.findIndex((w) => w.id === id);
    if (idx < 0) return;
    const next = idx + dir;
    if (next < 0 || next >= config.widgets.length) return;
    const widgets = [...config.widgets];
    const [item] = widgets.splice(idx, 1);
    widgets.splice(next, 0, item);
    patch({ widgets });
  };

  const addWidget = (libraryId: string, title: string) => {
    if (config.widgets.some((w) => w.widgetLibraryId === libraryId)) {
      toast.message("Widget already on this dashboard");
      return;
    }
    patch({ widgets: [...config.widgets, newWidgetInstance(libraryId, title)] });
    toast.success("Widget added to Product Dashboard");
  };

  const workingSlots =
    slotDraft.length > 0
      ? slotDraft
      : (template?.slots.map((s) => ({ ...s })) ?? []);

  const saveAsTemplate = () => {
    const name = saveName.trim() || renameDraft.trim();
    if (!name) {
      toast.error("Enter a layout name");
      return;
    }
    if (workingSlots.length === 0) {
      toast.error("Add at least one layout slot");
      return;
    }
    const id = `layout-${Date.now().toString(36)}`;
    const next: DashboardLayoutTemplate = {
      id,
      name,
      preview: "custom",
      isStarter: false,
      slots: workingSlots.map((s, i) => ({
        id: `${id}-s${i + 1}`,
        span: s.span,
      })),
    };
    dispatch(saveLayoutTemplate(next));
    patch({ templateId: id });
    setSaveName("");
    toast.success(`Saved layout “${name}”`);
  };

  const overwriteTemplate = () => {
    if (!template) return;
    if (workingSlots.length === 0) {
      toast.error("Add at least one layout slot");
      return;
    }
    const name = renameDraft.trim() || template.name;
    const next: DashboardLayoutTemplate = {
      ...template,
      name,
      preview: template.isStarter ? template.preview : "custom",
      slots: workingSlots.map((s, i) => ({
        id: s.id || `${template.id}-s${i + 1}`,
        span: s.span,
      })),
    };
    dispatch(saveLayoutTemplate(next));
    toast.success(`Updated “${name}”`);
  };

  const addSlot = () => {
    setSlotDraft((prev) => [
      ...prev,
      {
        id: `slot-${Date.now().toString(36)}`,
        span: "half" as LayoutSlotSpan,
      },
    ]);
  };

  const updateSlotSpan = (id: string, span: LayoutSlotSpan) => {
    setSlotDraft((prev) =>
      prev.map((s) => (s.id === id ? { ...s, span } : s))
    );
  };

  const removeSlot = (id: string) => {
    setSlotDraft((prev) => (prev.length <= 1 ? prev : prev.filter((s) => s.id !== id)));
  };

  // Preview uses in-progress slot edits before they are saved to the template store
  const previewTemplate: DashboardLayoutTemplate | undefined = template
    ? { ...template, name: renameDraft || template.name, slots: workingSlots }
    : undefined;

  const styleWidget = config.widgets.find((w) => w.id === styleId) ?? null;

  return (
    <div className="space-y-5">
      <section className="space-y-3 rounded-xl border border-white/10 bg-white/[0.05] p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold tracking-[0.35px] text-white">
              Layout templates
            </p>
            <p className="mt-1 text-xs text-white/45">
              Dashboard 1–4 are starter templates. Modify them or save new reusable layouts.
            </p>
          </div>
          {showChrome && (
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9! gap-1.5!"
                onClick={overwriteTemplate}
              >
                <Save className="size-3.5" />
                Update template
              </Button>
            </div>
          )}
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1">
          {templates.map((t) => {
            const active = t.id === config.templateId;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => patch({ templateId: t.id })}
                className={cn(
                  "shrink-0 w-[140px] rounded-xl border p-3 text-left cursor-pointer bg-transparent transition-colors",
                  active
                    ? "border-[#fbbf24]"
                    : "border-white/15 hover:border-white/30"
                )}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={cn(
                      "text-xs font-medium truncate",
                      active ? "text-white" : "text-white/50"
                    )}
                  >
                    {t.name}
                  </span>
                  {t.isStarter && (
                    <span className="text-[9px] uppercase tracking-wide text-[#fbbf24]/80">
                      Starter
                    </span>
                  )}
                </div>
                <MiniPreview
                  kind={
                    PREVIEW_KINDS.includes(t.preview) ? t.preview : "custom"
                  }
                  active={active}
                />
                <p className="mt-2 text-[10px] text-white/35">
                  {t.slots.length} slots
                </p>
              </button>
            );
          })}
        </div>

        {showChrome && template && (
          <div className="space-y-3 rounded-lg border border-white/10 bg-black/30 p-3">
            <div className="flex flex-wrap items-end gap-2">
              <div className="space-y-1.5 flex-1 min-w-[160px]">
                <Label className="text-[10px] font-bold uppercase tracking-[1px] text-white/45">
                  Template name
                </Label>
                <Input
                  value={renameDraft}
                  onChange={(e) => setRenameDraft(e.target.value)}
                  placeholder="Layout name"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-10! gap-1.5!"
                onClick={addSlot}
              >
                <Plus className="size-3.5" />
                Add slot
              </Button>
            </div>
            <div className="space-y-2">
              {workingSlots.map((slot, index) => (
                <div
                  key={slot.id}
                  className="flex flex-wrap items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
                >
                  <span className="text-xs text-white/40 w-14">
                    Slot {index + 1}
                  </span>
                  <select
                    value={slot.span}
                    onChange={(e) =>
                      updateSlotSpan(
                        slot.id,
                        e.target.value as LayoutSlotSpan
                      )
                    }
                    className="h-9 rounded-lg border border-white/10 bg-white/5 px-2 text-xs text-white outline-none"
                  >
                    {SLOT_SPANS.map((span) => (
                      <option key={span} value={span} className="bg-[#121212]">
                        {span}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    disabled={workingSlots.length <= 1}
                    onClick={() => removeSlot(slot.id)}
                    className="ml-auto size-8 rounded-lg border border-white/10 bg-white/5 text-red-400/80 disabled:opacity-30 cursor-pointer flex items-center justify-center"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-white/35">
              Edit slots, then Update template — or Save as new layout to keep the starter intact.
            </p>
            <div className="flex flex-wrap items-end gap-2">
              <div className="space-y-1.5 flex-1 min-w-[180px]">
                <Label className="text-[10px] font-bold uppercase tracking-[1px] text-white/45">
                  Save as new layout
                </Label>
                <Input
                  value={saveName}
                  onChange={(e) => setSaveName(e.target.value)}
                  placeholder="e.g. Reflection Focus"
                />
              </div>
              <Button
                type="button"
                variant="primary"
                size="sm"
                className="h-10!"
                onClick={saveAsTemplate}
              >
                Save layout
              </Button>
            </div>
          </div>
        )}
      </section>

      <section className="space-y-4 rounded-xl border border-white/10 bg-white/[0.05] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold tracking-[0.35px] text-white">
              Widget Library™
            </p>
            <p className="mt-1 text-xs text-white/45">
              Add reusable widgets to{" "}
              {productName ? (
                <span className="text-white/70">{productName}</span>
              ) : (
                "this Product Dashboard"
              )}
              . Order matches layout slots top-to-bottom.
            </p>
          </div>
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="h-9! gap-1.5!"
            onClick={() => setLibraryOpen((o) => !o)}
          >
            <Plus className="size-3.5" />
            {libraryOpen ? "Hide library" : "Browse library"}
          </Button>
        </div>

        {libraryOpen && (
          <div className="space-y-3 rounded-lg border border-white/10 p-3 bg-black/40">
            <Input
              value={libraryQuery}
              onChange={(e) => setLibraryQuery(e.target.value)}
              placeholder="Search widgets by name, id, type, visibility…"
              variant="search"
            />
            <div className="grid gap-2 sm:grid-cols-2 max-h-64 overflow-y-auto">
              {publishedLibrary.map((w) => {
                const onDash = config.widgets.some(
                  (x) => x.widgetLibraryId === w.id
                );
                return (
                  <button
                    key={w.id}
                    type="button"
                    disabled={onDash}
                    onClick={() => addWidget(w.id, w.title || w.name)}
                    className={cn(
                      "flex flex-col items-start gap-1.5 rounded-lg border px-3 py-2.5 text-left cursor-pointer",
                      onDash
                        ? "border-white/5 bg-white/[0.02] opacity-40 cursor-not-allowed"
                        : "border-white/10 bg-white/[0.03] hover:border-[#fbbf24]/40"
                    )}
                  >
                    <div className="flex w-full items-start justify-between gap-2">
                      <span className="text-sm text-white font-medium truncate">
                        {w.name}
                      </span>
                      <span className="text-[10px] text-white/35 shrink-0">
                        {w.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/40 line-clamp-2">
                      {w.description || w.subtitle || WIDGET_TYPE_META[w.type].detail}
                    </p>
                    <span
                      className={cn(
                        "text-[10px] rounded-full border px-2 py-0.5",
                        categoryTone[widgetCategory(w)]
                      )}
                    >
                      {widgetCategory(w)} · {w.visibility} · {w.id}
                    </span>
                  </button>
                );
              })}
              {publishedLibrary.length === 0 && (
                <p className="sm:col-span-2 text-sm text-white/40 py-6 text-center">
                  No matching published/active widgets.
                </p>
              )}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.7px] text-white/50">
            Assigned widgets ({config.widgets.length})
          </p>
          <div className="space-y-2">
            {config.widgets.map((w, index) => {
              const lib = library.find((x) => x.id === w.widgetLibraryId);
              return (
                <div
                  key={w.id}
                  className={cn(
                    "flex flex-wrap items-center gap-3 rounded-xl border px-3 py-3",
                    w.enabled
                      ? "border-white/10 bg-white/[0.03]"
                      : "border-white/5 bg-white/[0.015] opacity-70"
                  )}
                >
                  <div className="flex items-center gap-1 text-white/30">
                    <GripVertical className="size-4" />
                    <span className="text-xs tabular-nums w-5">{index + 1}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white font-medium truncate">
                      {w.title || lib?.name || w.widgetLibraryId}
                    </p>
                    <p className="text-[11px] text-white/40 truncate">
                      {lib
                        ? `${lib.type} · ${lib.visibility} · ${lib.id}`
                        : `${w.widgetLibraryId} (missing from library)`}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      title="Move up"
                      disabled={index === 0}
                      onClick={() => moveWidget(w.id, -1)}
                      className="h-8 px-2 rounded-lg border border-white/10 bg-white/5 text-xs text-white/70 disabled:opacity-30 cursor-pointer"
                    >
                      Up
                    </button>
                    <button
                      type="button"
                      title="Move down"
                      disabled={index === config.widgets.length - 1}
                      onClick={() => moveWidget(w.id, 1)}
                      className="h-8 px-2 rounded-lg border border-white/10 bg-white/5 text-xs text-white/70 disabled:opacity-30 cursor-pointer"
                    >
                      Down
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        updateWidget(w.id, { ...w, enabled: !w.enabled })
                      }
                      className={cn(
                        "h-8 px-2.5 rounded-lg border text-xs cursor-pointer",
                        w.enabled
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-white/10 bg-white/5 text-white/45"
                      )}
                    >
                      {w.enabled ? "On" : "Off"}
                    </button>
                    <button
                      type="button"
                      title="Style widget"
                      onClick={() => setStyleId(w.id)}
                      className="size-8 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-[#fbbf24] cursor-pointer flex items-center justify-center"
                    >
                      <Settings2 className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      title="Remove"
                      onClick={() =>
                        patch({
                          widgets: config.widgets.filter((x) => x.id !== w.id),
                        })
                      }
                      className="size-8 rounded-lg border border-white/10 bg-white/5 text-red-400/80 hover:text-red-400 cursor-pointer flex items-center justify-center"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
            {config.widgets.length === 0 && (
              <p className="text-sm text-white/40 py-4 text-center rounded-xl border border-dashed border-white/10">
                No widgets assigned. Browse the Widget Library™ above to add some.
              </p>
            )}
          </div>
        </div>
      </section>

      {showChrome && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-white/40 uppercase tracking-[0.5px]">
            Preview as
          </span>
          {(
            [
              "Consumer User",
              "Enterprise Admin",
              "Employee User",
              "Founder Account",
            ] as ProductAudience[]
          ).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAudience(a)}
              className={cn(
                "rounded-full px-3 py-1 text-xs border cursor-pointer",
                audience === a
                  ? "border-[#10b7ba] bg-[#10b7ba]/15 text-[#10b7ba]"
                  : "border-white/10 bg-white/5 text-white/50"
              )}
            >
              {a.replace(" Account", "").replace(" User", "").replace(" Admin", "")}
            </button>
          ))}
        </div>
      )}

      <section className="space-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-sm font-bold tracking-[0.35px] text-white">
              Product Dashboard preview
            </p>
            <p className="mt-1 text-xs text-white/45">
              Layout: {previewTemplate?.name ?? config.templateId}
              {previewTemplate
                ? ` · ${previewTemplate.slots.length} slots`
                : ""}
              {" · "}
              Showing as {audience}
            </p>
          </div>
        </div>
        <ProductDashboardCanvas
          config={config}
          template={previewTemplate}
          library={library}
          audience={audience}
          editable
          onToggle={(id) => {
            const w = config.widgets.find((x) => x.id === id);
            if (!w) return;
            updateWidget(id, { ...w, enabled: !w.enabled });
          }}
          onStyle={setStyleId}
          onRemove={(id) =>
            patch({ widgets: config.widgets.filter((w) => w.id !== id) })
          }
        />
      </section>

      {styleWidget && (
        <WidgetStyleEditor
          widget={styleWidget}
          onChange={(next) => updateWidget(next.id, next)}
          onClose={() => setStyleId(null)}
        />
      )}
    </div>
  );
};

export const ensureDashboardConfig = (
  value: ProductDashboardConfig | undefined
): ProductDashboardConfig =>
  value ? cloneDashboard(value) : cloneDashboard({
    templateId: "dashboard-1",
    widgets: [],
    updatedAt: new Date().toISOString(),
  });

export default ProductDashboardBuilder;
