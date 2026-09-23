import { TriangleAlert } from "lucide-react";
import Button from "@/ui/Button";
import ModalShell from "@/pages/Founder/_shared/ModalShell";
import type { Widget } from "../data";

type DeleteWidgetsModalProps = {
  widgets: Widget[];
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteWidgetsModal = ({ widgets, onClose, onConfirm }: DeleteWidgetsModalProps) => {
  const linked = widgets.reduce((sum, w) => sum + w.dashboards, 0);
  const single = widgets.length === 1;

  return (
    <ModalShell
      open={widgets.length > 0}
      onClose={onClose}
      title={single ? `Delete ${widgets[0].name}?` : `Delete ${widgets.length} widgets?`}
      description="This permanently removes the widget definition and its version history."
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={onConfirm}>
            Delete
          </Button>
        </>
      }
    >
      {linked > 0 ? (
        <div className="flex items-start gap-3 rounded-xl border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.08)] p-4">
          <TriangleAlert className="mt-0.5 size-4 shrink-0 text-[#ef4444]" />
          <p className="text-sm leading-5 text-white/80">
            {single ? "This widget is" : "These widgets are"} linked to{" "}
            <span className="font-semibold text-white">
              {linked} dashboard{linked === 1 ? "" : "s"}
            </span>
            . Those dashboards will show an empty slot until a replacement is assigned.
          </p>
        </div>
      ) : (
        <p className="text-sm text-white/70">
          {single ? "This widget isn't" : "None of these widgets are"} linked to any dashboard.
        </p>
      )}
      {!single && (
        <ul className="mt-4 flex max-h-40 flex-col gap-1 overflow-y-auto text-xs text-[#9ca3af]">
          {widgets.map((w) => (
            <li key={w.id}>
              <span className="text-white/80">{w.name}</span> · {w.id}
            </li>
          ))}
        </ul>
      )}
    </ModalShell>
  );
};

export default DeleteWidgetsModal;
