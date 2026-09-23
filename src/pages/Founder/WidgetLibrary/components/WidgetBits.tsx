import { LayoutGrid, LineChart, PenTool, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  categoryTone,
  widgetCategory,
  widgetStatusMeta,
  type Widget,
  type WidgetCategory,
  type WidgetStatus,
} from "../data";

const CATEGORY_ICON: Record<WidgetCategory, LucideIcon> = {
  Analytics: LineChart,
  System: LayoutGrid,
  Utility: PenTool,
};

export const WidgetStatusPill = ({ status }: { status: WidgetStatus }) => {
  const meta = widgetStatusMeta[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase leading-[16.5px] tracking-[1.1px]",
        meta.pill
      )}
    >
      <span className={cn("size-1.5 rounded-full", meta.dot)} />
      {status}
    </span>
  );
};

export const WidgetIcon = ({
  widget,
  className,
}: {
  widget: Pick<Widget, "type">;
  className?: string;
}) => {
  const category = widgetCategory(widget);
  const Icon = CATEGORY_ICON[category];
  return (
    <span
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-lg border",
        categoryTone[category],
        className
      )}
    >
      <Icon className="size-4" />
    </span>
  );
};
