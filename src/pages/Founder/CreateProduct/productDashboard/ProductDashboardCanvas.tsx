import { Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Widget } from "@/pages/Founder/WidgetLibrary/data";
import {
  isVisibleTo,
  type PreviewRole,
  WIDGET_TYPE_META,
} from "@/pages/Founder/WidgetLibrary/data";
import type {
  DashboardLayoutTemplate,
  ProductAudience,
  ProductDashboardConfig,
  ProductDashboardWidget,
} from "./types";
import { widgetCardStyle } from "./widgetStyleCss";

type Props = {
  config: ProductDashboardConfig;
  template: DashboardLayoutTemplate | undefined;
  library: Widget[];
  audience?: ProductAudience;
  editable?: boolean;
  onToggle?: (id: string) => void;
  onStyle?: (id: string) => void;
  onRemove?: (id: string) => void;
};

const audienceToPreview = (a: ProductAudience): PreviewRole => {
  if (a === "Founder Account") return "Founder Account";
  if (a === "Enterprise Admin") return "Enterprise Admin";
  if (a === "Employee User") return "Employee User";
  return "Consumer User";
};

const spanClass = (span: string) => {
  if (span === "full") return "col-span-6";
  if (span === "half") return "col-span-6 sm:col-span-3";
  if (span === "third") return "col-span-6 sm:col-span-2";
  return "col-span-6 sm:col-span-2";
};

const ProductDashboardCanvas = ({
  config,
  template,
  library,
  audience = "Founder Account",
  editable = false,
  onToggle,
  onStyle,
  onRemove,
}: Props) => {
  const role = audienceToPreview(audience);
  const byId = new Map(library.map((w) => [w.id, w]));

  const visible = config.widgets.filter((inst) => {
    // Keep disabled widgets on the edit canvas (dimmed) so they can be re-enabled.
    if (!inst.enabled && !editable) return false;
    const lib = byId.get(inst.widgetLibraryId);
    if (!lib) return editable;
    const visibility = inst.visibility ?? lib.visibility;
    // Audience preview: hide widgets that role cannot see (even while editing).
    return isVisibleTo({ ...lib, visibility }, role);
  });

  const slots = template?.slots ?? [];
  const placed: { slotSpan: string; widget: ProductDashboardWidget | null }[] =
    slots.map((slot, i) => ({
      slotSpan: slot.span,
      widget: visible[i] ?? null,
    }));

  // Extra widgets beyond slot count still render in a fluid row
  const overflow = visible.slice(slots.length);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-6 gap-3">
        {placed.map((cell, i) => {
          if (!cell.widget) {
            return (
              <div
                key={`empty-${i}`}
                className={cn(
                  "min-h-[120px] rounded-xl border border-dashed border-white/10 bg-white/[0.02] flex items-center justify-center",
                  spanClass(cell.slotSpan)
                )}
              >
                <span className="text-xs text-white/25">Empty slot</span>
              </div>
            );
          }
          return (
            <WidgetTile
              key={cell.widget.id}
              instance={cell.widget}
              library={byId.get(cell.widget.widgetLibraryId)}
              className={spanClass(cell.slotSpan)}
              editable={editable}
              onToggle={onToggle}
              onStyle={onStyle}
              onRemove={onRemove}
            />
          );
        })}
        {overflow.map((w) => (
          <WidgetTile
            key={w.id}
            instance={w}
            library={byId.get(w.widgetLibraryId)}
            className="col-span-6 sm:col-span-3"
            editable={editable}
            onToggle={onToggle}
            onStyle={onStyle}
            onRemove={onRemove}
          />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="text-sm text-white/40 text-center py-8">
          No widgets assigned for this view. Add widgets from the Widget Library™.
        </p>
      )}
      {(editable || config.widgets.some((w) => w.enabled)) &&
        visible.length <
          config.widgets.filter((w) => w.enabled || editable).length && (
          <p className="text-[11px] text-white/35 text-center">
            Some widgets are hidden for <span className="text-white/55">{audience}</span> by
            Widget Library™ visibility. Switch preview audience or manage them in the assigned list.
          </p>
        )}
    </div>
  );
};

const WidgetTile = ({
  instance,
  library,
  className,
  editable,
  onToggle,
  onStyle,
  onRemove,
}: {
  instance: ProductDashboardWidget;
  library?: Widget;
  className?: string;
  editable?: boolean;
  onToggle?: (id: string) => void;
  onStyle?: (id: string) => void;
  onRemove?: (id: string) => void;
}) => {
  const title = instance.title || library?.title || library?.name || "Widget";
  const subtitle = library?.subtitle || library?.description || "";
  const typeLabel = library ? WIDGET_TYPE_META[library.type].detail : "Widget";

  return (
    <div
      className={cn(
        "relative flex flex-col min-h-[140px] overflow-hidden transition-opacity",
        !instance.enabled && "opacity-50",
        className
      )}
      style={widgetCardStyle(instance.style)}
    >
      <div className="flex items-start justify-between gap-2" style={{ gap: instance.style.gap }}>
        <div className="min-w-0">
          <p
            className="text-[10px] font-bold uppercase tracking-[1px] truncate"
            style={{ color: instance.style.descriptionColor }}
          >
            {typeLabel}
          </p>
          <h3
            className="mt-1 font-medium truncate"
            style={{
              color: instance.style.titleColor,
              fontFamily: instance.style.fontFamily,
              fontSize: instance.style.fontSize + 2,
            }}
          >
            {title}
          </h3>
        </div>
        {editable && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              title="Style"
              onClick={() => onStyle?.(instance.id)}
              className="size-8 rounded-lg bg-black/40 border border-white/10 text-white/80 hover:text-[#fbbf24] cursor-pointer flex items-center justify-center"
            >
              <Settings2 className="size-3.5" />
            </button>
          </div>
        )}
      </div>
      <p
        className="mt-2 text-xs leading-relaxed line-clamp-3"
        style={{ color: instance.style.descriptionColor }}
      >
        {subtitle}
      </p>
      {library && (
        <div
          className="mt-auto pt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.5px]"
          style={{ color: instance.style.descriptionColor, opacity: 0.7 }}
        >
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: library.color }}
          />
          {library.id}
        </div>
      )}
      {editable && (
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggle?.(instance.id)}
            className="text-xs text-[#fbbf24] bg-transparent border-0 cursor-pointer p-0"
          >
            {instance.enabled ? "Disable" : "Enable"}
          </button>
          <button
            type="button"
            onClick={() => onRemove?.(instance.id)}
            className="text-xs text-red-400 bg-transparent border-0 cursor-pointer p-0"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDashboardCanvas;
