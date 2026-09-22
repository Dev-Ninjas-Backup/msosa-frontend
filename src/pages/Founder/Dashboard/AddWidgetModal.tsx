import { useMemo, useState } from "react";
import { Search, X, ArrowRight, LifeBuoy } from "lucide-react";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { cn } from "@/lib/utils";
import {
  WIDGET_TEMPLATES,
  type WidgetCategory,
  type WidgetTemplate,
} from "./data";

type AddWidgetModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (template: WidgetTemplate) => void;
};

const CATEGORIES: { id: WidgetCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "analytics", label: "Analytics" },
  { id: "progress", label: "Progress" },
  { id: "actions", label: "Actions" },
];

const WidgetPreview = ({ kind }: { kind: WidgetTemplate["preview"] }) => {
  if (kind === "chart") {
    return (
      <div className="h-32 w-full rounded-xl border border-primary-text/5 bg-primary-text/[0.02] flex items-end justify-center gap-1 p-4 opacity-40">
        {[40, 55, 35, 70, 50, 80, 60].map((h, i) => (
          <span
            key={i}
            className="w-2 rounded-sm bg-button-bg/50"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    );
  }
  if (kind === "bars") {
    return (
      <div className="h-32 w-full rounded-xl border border-primary-text/5 bg-primary-text/[0.02] flex flex-col items-center justify-center gap-2 p-4">
        <span className="h-1 w-20 rounded-full bg-button-bg/40" />
        <span className="h-1 w-16 rounded-full bg-primary-text/10" />
      </div>
    );
  }
  if (kind === "actions") {
    return (
      <div className="h-32 w-full rounded-xl border border-primary-text/5 bg-primary-text/[0.02] flex items-center justify-center gap-3">
        <span className="size-8 rounded-lg bg-primary-text/10" />
        <span className="size-8 rounded-lg bg-primary-text/10" />
      </div>
    );
  }
  if (kind === "resume") {
    return (
      <div className="h-32 w-full rounded-xl border border-primary-text/5 bg-primary-text/[0.02] flex items-center justify-center">
        <span className="size-12 rounded-full border-2 border-accent" />
      </div>
    );
  }
  return (
    <div className="h-32 w-full rounded-xl border border-primary-text/5 bg-primary-text/[0.02] flex flex-col gap-2 p-4 justify-center">
      <span className="h-2 w-full rounded bg-primary-text/5" />
      <span className="h-2 w-3/4 rounded bg-primary-text/5" />
      <span className="h-2 w-full rounded bg-primary-text/5" />
    </div>
  );
};

/** Figma 1336:63877 — Widget Library Modal */
const AddWidgetModal = ({ open, onClose, onAdd }: AddWidgetModalProps) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<WidgetCategory>("all");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return WIDGET_TEMPLATES.filter((t) => {
      const catOk = category === "all" || t.category === category;
      const q = query.trim().toLowerCase();
      const qOk =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [category, query]);

  if (!open) return null;

  const handleContinue = () => {
    const tpl = WIDGET_TEMPLATES.find((t) => t.id === selected);
    if (!tpl) return;
    onAdd(tpl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm border-0 cursor-pointer"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-[989px] my-4 overflow-hidden rounded-[32px] border border-primary-text/10 bg-primary-text/[0.05] backdrop-blur-[12px] shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
        <div className="border-b border-primary-text/10 p-8 space-y-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-playfair text-2xl text-primary-text">
                Add New Widget
              </h2>
              <p className="mt-1 text-base text-primary-text/50 tracking-tight">
                Customize your Dashboard Framework™ workspace.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex size-10 items-center justify-center rounded-full border border-border bg-primary-text/10 text-secondary-text hover:text-primary-text cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                variant="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search widget templates..."
                leftIcon={<Search className="size-4 text-secondary-text" />}
              />
            </div>
            <div className="flex flex-wrap gap-2.5">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={cn(
                    "h-[50px] px-[30px] rounded-xl text-lg font-medium tracking-[0.35px] cursor-pointer transition-colors",
                    category === c.id
                      ? "bg-button-bg text-black border border-button-bg"
                      : "bg-primary-text/10 border border-primary-text/10 text-primary-text hover:border-button-bg/40"
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 max-h-[55vh] overflow-y-auto bg-primary-text/[0.05]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filtered.map((tpl) => {
              const active = selected === tpl.id;
              return (
                <div
                  key={tpl.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelected(tpl.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setSelected(tpl.id);
                  }}
                  className={cn(
                    "group relative text-left rounded-3xl border p-6 space-y-4 transition-all cursor-pointer bg-black",
                    active
                      ? "border-button-bg"
                      : "border-primary-text/10 hover:border-button-bg/50"
                  )}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAdd(tpl);
                    }}
                    className="absolute inset-0 rounded-3xl bg-button-bg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10 cursor-pointer border-0"
                  >
                    <span className="text-lg font-black uppercase tracking-tight text-black">
                      Add to Dashboard
                    </span>
                    <ArrowRight className="size-4 text-black" />
                  </button>
                  <WidgetPreview kind={tpl.preview} />
                  <div>
                    <h3 className="text-lg font-bold text-primary-text tracking-tight">
                      {tpl.title}
                    </h3>
                    <p className="mt-1 text-[13px] text-primary-text/50 leading-5">
                      {tpl.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-8 py-6">
          <div className="flex items-center gap-3 text-sm text-primary-text/60">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary-text/10">
              <LifeBuoy className="size-4" />
            </span>
            <p>
              Need a custom widget?{" "}
              <span className="text-button-bg">Contact Framework Support</span>
            </p>
          </div>
          <div className="flex items-center gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-[46px] w-[162px] text-lg font-medium tracking-[0.35px] text-primary-text/60 hover:text-primary-text border-0 bg-transparent cursor-pointer"
            >
              Cancel
            </button>
            <Button
              type="button"
              variant="primary"
              className="h-[54px]! px-[50px]! rounded-xl! text-lg! font-medium! tracking-[0.35px]!"
              disabled={!selected}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;
