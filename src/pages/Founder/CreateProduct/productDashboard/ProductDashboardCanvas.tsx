import { Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Widget } from "@/pages/Founder/WidgetLibrary/data";
import {
  isVisibleTo,
  type PreviewRole,
} from "@/pages/Founder/WidgetLibrary/data";
import WidgetLiveContent from "@/pages/Founder/WidgetLibrary/components/WidgetLiveContent";
import type {
  DashboardLayoutTemplate,
  ProductAudience,
  ProductDashboardConfig,
  ProductDashboardWidget,
} from "./types";
import { resolveFontFamily, widgetCardStyle } from "./widgetStyleCss";

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
    if (!inst.enabled && !editable) return false;
    const lib = byId.get(inst.widgetLibraryId);
    if (!lib) return editable;
    const visibility = inst.visibility ?? lib.visibility;
    return isVisibleTo({ ...lib, visibility }, role);
  });

  const slots = template?.slots ?? [];
  const placed: { slotSpan: string; widget: ProductDashboardWidget | null }[] =
    slots.map((slot, i) => ({
      slotSpan: slot.span,
      widget: visible[i] ?? null,
    }));

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
                  "min-h-[160px] rounded-xl border border-dashed border-white/10 bg-white/[0.02] flex items-center justify-center",
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
          No widgets assigned for this view. Add widgets from the Widget
          Library™.
        </p>
      )}
      {(editable || config.widgets.some((w) => w.enabled)) &&
        visible.length <
          config.widgets.filter((w) => w.enabled || editable).length && (
          <p className="text-[11px] text-white/35 text-center">
            Some widgets are hidden for{" "}
            <span className="text-white/55">{audience}</span> by Widget Library™
            visibility. Switch preview audience or manage them in the assigned
            list.
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
  return (
    <div
      className={cn(
        "relative flex flex-col min-h-[220px] overflow-hidden transition-opacity",
        !instance.enabled && "opacity-50",
        className
      )}
      style={widgetCardStyle(instance.style)}
    >
      {editable && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1">
          <button
            type="button"
            title="Style"
            onClick={() => onStyle?.(instance.id)}
            className="size-8 rounded-lg bg-black/50 border border-white/10 text-white/80 hover:text-[#fbbf24] cursor-pointer flex items-center justify-center"
          >
            <Settings2 className="size-3.5" />
          </button>
        </div>
      )}

      {library ? (
        <div
          className="min-w-0 flex-1"
          style={{
            color: instance.style.titleColor,
            fontFamily: resolveFontFamily(instance.style.fontFamily),
          }}
        >
          <WidgetLiveContent
            widget={library}
            density="dashboard"
            titleOverride={instance.title || undefined}
            fontFamily={resolveFontFamily(instance.style.fontFamily)}
          />
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-1 text-center py-8">
          <p className="text-sm text-white/70">Widget unavailable</p>
          <p className="text-xs text-white/35 font-mono">
            {instance.widgetLibraryId}
          </p>
        </div>
      )}

      {editable && (
        <div className="mt-3 flex items-center gap-3 pt-1 border-t border-white/10">
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
          <span className="ml-auto text-[10px] text-white/30 font-mono">
            {instance.widgetLibraryId}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductDashboardCanvas;
