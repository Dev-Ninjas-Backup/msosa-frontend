import { Lock, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Widget } from "../data";
import WidgetLiveContent from "./WidgetLiveContent";

type WidgetPreviewProps = {
  widget: Widget;
  restricted: boolean;
  role: string;
  expanded: boolean;
  onToggleExpand: () => void;
};

const StreamPill = ({ widget, live }: { widget: Widget; live: boolean }) => {
  const [label, tone, dot] =
    widget.status === "Draft"
      ? [
          "Draft Preview",
          "border-white/10 bg-white/5 text-[#9ca3af]",
          "bg-[#6b7280]",
        ]
      : live
        ? [
            "Active Stream",
            "border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.1)] text-[#10b981]",
            "bg-[#10b981] animate-pulse",
          ]
        : [
            "Snapshot",
            "border-[rgba(34,211,238,0.3)] bg-[rgba(34,211,238,0.1)] text-[#22d3ee]",
            "bg-[#22d3ee]",
          ];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[1px]",
        tone
      )}
    >
      <span className={cn("size-1.5 rounded-full", dot)} />
      {label}
    </span>
  );
};

const WidgetPreview = ({
  widget,
  restricted,
  role,
  expanded,
  onToggleExpand,
}: WidgetPreviewProps) => {
  const live =
    widget.status !== "Draft" && widget.realtime && Boolean(widget.dataSource);

  return (
    <div className="relative flex min-h-[440px] flex-col gap-6 bg-black/50 p-5 sm:p-8">
      <div className="flex justify-center">
        <StreamPill widget={widget} live={live} />
      </div>
      <div
        className={cn(
          "flex flex-col gap-6 rounded-2xl border border-white/10 bg-[#0d0d0d] p-6",
          restricted && "pointer-events-none blur-sm"
        )}
      >
        <div className="flex items-start justify-end">
          <button
            type="button"
            aria-label={expanded ? "Collapse preview" : "Expand preview"}
            onClick={onToggleExpand}
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg border-0 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
          >
            {expanded ? (
              <Minimize2 className="size-4" />
            ) : (
              <Maximize2 className="size-4" />
            )}
          </button>
        </div>
        <WidgetLiveContent widget={widget} density="detail" />
      </div>
      {restricted && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 p-6 text-center">
          <span className="flex size-12 items-center justify-center rounded-xl border border-white/10 bg-[#111] text-[#eab308]">
            <Lock className="size-5" />
          </span>
          <p className="text-sm font-bold uppercase tracking-[1px] text-white">
            Hidden for {role}
          </p>
          <p className="max-w-xs text-xs text-[#9ca3af]">
            The widget&apos;s visibility rules and target environments exclude
            this role.
          </p>
        </div>
      )}
    </div>
  );
};

export default WidgetPreview;
