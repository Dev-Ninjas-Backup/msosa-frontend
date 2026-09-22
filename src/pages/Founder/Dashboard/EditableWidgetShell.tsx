import { cn } from "@/lib/utils";
import dragIcon from "./assets/widget-drag.svg";
import eyeIcon from "./assets/widget-eye.svg";
import pencilIcon from "./assets/widget-pencil.svg";

type EditableWidgetShellProps = {
  editing: boolean;
  title?: string;
  onEdit?: () => void;
  onRemove?: () => void;
  children: React.ReactNode;
  className?: string;
};

/** Figma 1336:65446 — widget edit chrome: drag · hide · edit */
const EditableWidgetShell = ({
  editing,
  title,
  onEdit,
  onRemove,
  children,
  className,
}: EditableWidgetShellProps) => {
  if (!editing) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn("relative", className)}>
      <div className="absolute right-3 top-3 z-20 flex items-center gap-2 rounded-lg bg-black/20 backdrop-blur-[5px] p-0.5">
        <span
          className="flex size-8 items-center justify-center rounded-lg border border-primary-text/10 bg-primary-text/10 cursor-grab"
          title="Drag to reorder"
        >
          <span className="flex items-center gap-0.5">
            <img src={dragIcon} alt="" className="h-[15px] w-1 object-contain opacity-80" />
            <img src={dragIcon} alt="" className="h-[15px] w-1 object-contain opacity-80" />
          </span>
        </span>

        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex size-8 items-center justify-center rounded-lg border border-primary-text/10 bg-primary-text/10 cursor-pointer hover:bg-primary-text/15"
            title="Hide widget"
          >
            <img src={eyeIcon} alt="" className="h-[10px] w-[12.5px] object-contain" />
          </button>
        )}

        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="flex size-8 items-center justify-center rounded-lg bg-button-bg cursor-pointer hover:opacity-90 border-0"
            title={title ? `Edit ${title}` : "Edit widget"}
          >
            <img src={pencilIcon} alt="" className="size-[9.5px] object-contain" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default EditableWidgetShell;
