import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  CircleCheck,
  Database,
  Plus,
  ShieldAlert,
  User,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Checkbox from "@/ui/Checkbox";
import Input from "@/ui/Input";
import { Label } from "@/ui/Label";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import Select from "@/ui/Select";
import Textarea from "@/ui/Textarea";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { addWidget, updateWidget } from "@/store/features/FounderWidgets/founderWidgetsSlice";
import { toggleIn } from "@/pages/Founder/_shared/utils";
import {
  WIDGET_FORM_EVENT,
  WIDGETS_PATH,
  widgetPath,
  type WidgetFormAction,
} from "./events";
import {
  COLOR_THEMES,
  DATA_SOURCES,
  EMPTY_WIDGET_DRAFT,
  ENVIRONMENTS,
  HEIGHT_OPTIONS,
  REFRESH_OPTIONS,
  VISIBILITY_RULES,
  WIDGET_TYPES,
  WIDTH_OPTIONS,
  bumpWidgetVersion,
  createWidget,
  draftFromWidget,
  validateDraft,
  type DraftErrors,
  type WidgetDraft,
  type WidgetEnvironment,
} from "./data";
import {
  choiceCardClass,
  formControlClass,
  formErrorClass,
  formErrorControlClass,
  formLabelClass,
} from "./styles";

const MAX_TAGS = 8;

const ENV_META: Record<WidgetEnvironment, { icon: LucideIcon; tone: string; note: string }> = {
  Consumer: { icon: User, tone: "text-[#ef4444]", note: "Individual reflection workspaces" },
  Enterprise: { icon: Users, tone: "text-[#3b82f6]", note: "Organization dashboards & seats" },
};

const SECTION_TONE = [
  "bg-[rgba(234,179,8,0.1)] text-[#eab308]",
  "bg-[rgba(59,130,246,0.1)] text-[#3b82f6]",
  "bg-[rgba(34,211,238,0.1)] text-[#22d3ee]",
  "bg-[rgba(16,185,129,0.1)] text-[#10b981]",
];

const Section = ({ index, title, children }: { index: number; title: string; children: ReactNode }) => (
  <section className="flex flex-col gap-6 border-b border-white/10 pb-10 last:border-b-0 last:pb-0">
    <div className="flex items-center gap-4">
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
          SECTION_TONE[index]
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h2 className="text-base font-bold uppercase leading-[27px] tracking-[1.8px] text-white sm:text-lg">
        {title}
      </h2>
    </div>
    {children}
  </section>
);

const Field = ({
  label,
  htmlFor,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) => (
  <div className={cn("flex min-w-0 flex-col gap-2", className)}>
    <Label htmlFor={htmlFor} className={formLabelClass}>
      {label}
    </Label>
    {children}
    {error && <p className={formErrorClass}>{error}</p>}
  </div>
);

const GeometryPicker = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex flex-1 cursor-pointer flex-col items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 transition-colors hover:bg-white/10"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.9px] text-[#6b7280]">{label}</span>
          <span className="text-sm font-semibold text-white">{value}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="center" sideOffset={6} className="w-36 rounded-lg border-white/10 bg-[#111] p-1">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => {
              onChange(o);
              setOpen(false);
            }}
            className={cn(
              "flex w-full cursor-pointer rounded-md border-0 bg-transparent px-3 py-2 text-left text-sm transition-colors hover:bg-white/5",
              o === value ? "text-[#eab308]" : "text-[#9ca3af] hover:text-white"
            )}
          >
            {o}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

const WidgetForm = () => {
  const { widgetId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const widgets = useAppSelector((s) => s.founderWidgets.widgets);
  const editing = widgetId ? widgets.find((w) => w.id === widgetId) : undefined;
  const isEdit = Boolean(widgetId);

  const [draft, setDraft] = useState<WidgetDraft>(() =>
    editing ? draftFromWidget(editing) : EMPTY_WIDGET_DRAFT
  );
  const [errors, setErrors] = useState<DraftErrors>({});
  const [validated, setValidated] = useState<"valid" | "invalid" | null>(null);
  const [addingTag, setAddingTag] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const otherNames = useMemo(
    () => widgets.filter((w) => w.id !== widgetId).map((w) => w.name),
    [widgets, widgetId]
  );

  const set = <K extends keyof WidgetDraft>(key: K, value: WidgetDraft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setValidated(null);
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const commitTag = () => {
    const tag = tagInput.trim().replace(/\s+/g, " ");
    if (tag) {
      if (draft.tags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
        toast.info(`"${tag}" is already added`);
      } else if (draft.tags.length >= MAX_TAGS) {
        toast.error(`Up to ${MAX_TAGS} tags per widget`);
      } else {
        set("tags", [...draft.tags, tag]);
      }
    }
    setTagInput("");
    setAddingTag(false);
  };

  useEffect(() => {
    const check = (strict: boolean) => {
      const found = validateDraft(draft, otherNames, strict);
      setErrors(found);
      const ok = Object.keys(found).length === 0;
      if (!ok) toast.error(Object.values(found)[0]);
      return ok;
    };

    const onAction = (e: Event) => {
      const action = (e as CustomEvent<WidgetFormAction>).detail;

      if (action === "cancel") {
        navigate(editing ? widgetPath(editing.id) : WIDGETS_PATH);
        return;
      }

      if (action === "validate") {
        const ok = check(true);
        setValidated(ok ? "valid" : "invalid");
        if (ok) toast.success("Schema valid — widget is ready to publish");
        return;
      }

      if (action === "save" && editing) {
        if (!check(editing.status !== "Draft")) return;
        const before = JSON.stringify(draftFromWidget(editing));
        if (before === JSON.stringify(draft)) {
          toast.info("No changes to save");
          return;
        }
        dispatch(
          updateWidget({
            id: editing.id,
            patch: {
              ...draft,
              name: draft.name.trim(),
              title: draft.title.trim() || draft.name.trim(),
              version: bumpWidgetVersion(editing.version, editing.status),
            },
            note: "Configuration updated",
          })
        );
        toast.success(
          editing.status === "Published"
            ? "Changes saved — deploy to push them live"
            : "Changes saved"
        );
        navigate(widgetPath(editing.id));
        return;
      }

      if (action === "draft" || action === "publish") {
        const publish = action === "publish";
        if (!check(publish)) return;
        const widget = createWidget(draft, publish ? "Published" : "Draft", widgets);
        dispatch(addWidget(widget));
        toast.success(publish ? `${widget.name} published` : "Draft saved");
        navigate(widgetPath(widget.id));
      }
    };

    window.addEventListener(WIDGET_FORM_EVENT, onAction);
    return () => window.removeEventListener(WIDGET_FORM_EVENT, onAction);
  }, [draft, editing, widgets, otherNames, dispatch, navigate]);

  if (isEdit && !editing) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-center">
        <p className="text-lg font-semibold text-white">Widget not found</p>
        <p className="text-sm text-[#9ca3af]">It may have been deleted.</p>
        <Link to={WIDGETS_PATH} className="text-sm font-semibold text-[#eab308] hover:underline">
          Back to Widget Library
        </Link>
      </div>
    );
  }

  return (
    <AnimatedContainer className="flex flex-col gap-6 pb-8">
      {validated && (
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl border px-5 py-3 text-sm",
            validated === "valid"
              ? "border-[rgba(34,211,238,0.3)] bg-[rgba(34,211,238,0.08)] text-[#22d3ee]"
              : "border-[rgba(239,68,68,0.3)] bg-[rgba(239,68,68,0.08)] text-[#f87171]"
          )}
        >
          {validated === "valid" ? <CircleCheck className="size-4" /> : <ShieldAlert className="size-4" />}
          {validated === "valid"
            ? "Schema validated against the FAR™ Security Schema. No violations found."
            : `${Object.keys(errors).length} schema violation${Object.keys(errors).length === 1 ? "" : "s"} — fix the highlighted fields.`}
        </div>
      )}

      <div className="flex flex-col gap-10 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-8">
        <Section index={0} title="Basic Information">
          <div className="grid gap-6 lg:grid-cols-2">
            <Field label="Widget Name" htmlFor="widget-name" error={errors.name}>
              <Input
                id="widget-name"
                value={draft.name}
                maxLength={60}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. Revenue Velocity Matrix"
                className={cn(formControlClass, errors.name && formErrorControlClass)}
              />
            </Field>
            <Field label="Widget Type">
              <Select
                variant="soft"
                options={[...WIDGET_TYPES]}
                value={draft.type}
                onChange={(v) => set("type", v as WidgetDraft["type"])}
                className="h-[50px]! rounded-lg! border-white/10! bg-white/5! px-4! text-sm! text-white!"
              />
            </Field>
            <Field label="Description" htmlFor="widget-description">
              <Textarea
                id="widget-description"
                value={draft.description}
                maxLength={400}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Outline the purpose and core functionality of this widget..."
                className={cn(formControlClass, "min-h-[118px]! resize-none")}
              />
            </Field>
            <Field label="Tags">
              <div className="flex flex-wrap items-center gap-2">
                {draft.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded border px-3 py-1.5 text-[10px] font-bold uppercase leading-[15px] tracking-[0.5px]",
                      i === 0
                        ? "border-[rgba(234,179,8,0.3)] bg-[rgba(234,179,8,0.1)] text-[#eab308]"
                        : "border-white/10 bg-white/5 text-white/80"
                    )}
                  >
                    {tag}
                    <button
                      type="button"
                      aria-label={`Remove ${tag}`}
                      onClick={() => set("tags", draft.tags.filter((t) => t !== tag))}
                      className="flex cursor-pointer border-0 bg-transparent p-0 opacity-60 hover:opacity-100"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
                {addingTag ? (
                  <Input
                    autoFocus
                    value={tagInput}
                    maxLength={24}
                    onChange={(e) => setTagInput(e.target.value)}
                    onBlur={commitTag}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        commitTag();
                      }
                      if (e.key === "Escape") {
                        setTagInput("");
                        setAddingTag(false);
                      }
                    }}
                    placeholder="Tag name"
                    containerClassName="w-32"
                    className="h-8! rounded! border! border-[#eab308]/40! bg-white/5! px-2! text-[11px]! uppercase text-white!"
                  />
                ) : (
                  draft.tags.length < MAX_TAGS && (
                    <button
                      type="button"
                      onClick={() => setAddingTag(true)}
                      className="inline-flex cursor-pointer items-center gap-1 rounded border border-dashed border-white/20 bg-transparent px-3 py-1.5 text-[10px] font-bold uppercase leading-[15px] tracking-[0.5px] text-[#6b7280] hover:border-white/40 hover:text-white"
                    >
                      <Plus className="size-3" /> Add Tag
                    </button>
                  )
                )}
              </div>
            </Field>
          </div>
        </Section>

        <Section index={1} title="Display Settings">
          <div className="grid gap-6 lg:grid-cols-2">
            <Field label="Widget Title" htmlFor="widget-title" error={errors.title}>
              <Input
                id="widget-title"
                value={draft.title}
                maxLength={60}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Visual Title"
                className={cn(formControlClass, errors.title && formErrorControlClass)}
              />
            </Field>
            <Field label="Subtitle" htmlFor="widget-subtitle">
              <Input
                id="widget-subtitle"
                value={draft.subtitle}
                maxLength={80}
                onChange={(e) => set("subtitle", e.target.value)}
                placeholder="Support Text"
                className={formControlClass}
              />
            </Field>
            <Field label="Color Theme">
              <div role="radiogroup" aria-label="Color theme" className="flex gap-3">
                {COLOR_THEMES.map((color) => (
                  <button
                    key={color}
                    type="button"
                    role="radio"
                    aria-checked={draft.color === color}
                    aria-label={color}
                    onClick={() => set("color", color)}
                    style={{ backgroundColor: color }}
                    className={cn(
                      "size-10 cursor-pointer rounded-lg border-2 transition-transform hover:scale-105",
                      draft.color === color ? "border-white" : "border-transparent"
                    )}
                  />
                ))}
              </div>
            </Field>
            <Field label="Layout Geometry">
              <div className="flex gap-3">
                <GeometryPicker label="Width" value={draft.width} options={WIDTH_OPTIONS} onChange={(v) => set("width", v)} />
                <GeometryPicker label="Height" value={draft.height} options={HEIGHT_OPTIONS} onChange={(v) => set("height", v)} />
              </div>
            </Field>
          </div>
        </Section>

        <Section index={2} title="Data & Behavior">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <Field label="Data Source" error={errors.dataSource}>
                <Select
                  variant="soft"
                  searchable
                  options={DATA_SOURCES}
                  value={draft.dataSource}
                  onChange={(v) => set("dataSource", v)}
                  placeholder="Select a data stream"
                  searchPlaceholder="Search streams..."
                  rightIcon={<Database className="size-4 shrink-0 text-[#6b7280]" />}
                  className={cn(
                    "h-[50px]! rounded-lg! border-white/10! bg-white/5! px-4! text-sm! text-white!",
                    errors.dataSource && formErrorControlClass
                  )}
                />
              </Field>
              <Field label="Refresh Frequency">
                <Select
                  variant="soft"
                  options={[...REFRESH_OPTIONS]}
                  value={draft.refresh}
                  onChange={(v) => set("refresh", v)}
                  className="h-[50px]! rounded-lg! border-white/10! bg-white/5! px-4! text-sm! text-white!"
                />
              </Field>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-black/30 p-6">
              <p className={formLabelClass}>Interaction Protocols</p>
              {(
                [
                  ["autoRefresh", "Auto Refresh Enabled", "Reload data on the selected frequency"],
                  ["realtime", "Real-Time Updates", "Stream changes over WebSocket as they happen"],
                  ["quickNav", "Quick Navigation™", "Allow drill-through to the source view"],
                ] as const
              ).map(([key, label, note]) => (
                <label key={key} className="flex cursor-pointer items-start gap-3">
                  <Checkbox
                    className="mt-0.5"
                    aria-label={label}
                    checked={draft[key]}
                    onCheckedChange={(v) => set(key, v)}
                  />
                  <span>
                    <span className="block text-sm font-medium text-white">{label}</span>
                    <span className="block text-[11px] text-[#6b7280]">{note}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </Section>

        <Section index={3} title="Visibility & Assignment">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <Field label="Target Environments" error={errors.environments}>
              <div className="flex flex-col gap-3">
                {ENVIRONMENTS.map((env) => {
                  const { icon: Icon, tone, note } = ENV_META[env];
                  const on = draft.environments.includes(env);
                  return (
                    <label
                      key={env}
                      className={cn(
                        "flex cursor-pointer items-center gap-4 rounded-xl border bg-white/5 p-4 transition-colors",
                        on ? "border-white/20" : "border-white/10 hover:bg-white/[0.08]"
                      )}
                    >
                      <span className="flex size-9 items-center justify-center rounded-lg bg-white/5">
                        <Icon className={cn("size-4", tone)} />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold text-white">{env}™</span>
                        <span className="block text-[11px] text-[#6b7280]">{note}</span>
                      </span>
                      <Checkbox
                        aria-label={`${env} environment`}
                        checked={on}
                        onCheckedChange={() => set("environments", toggleIn(draft.environments, env))}
                      />
                    </label>
                  );
                })}
              </div>
            </Field>
            <Field label="Visibility Rules">
              <div role="radiogroup" aria-label="Visibility rules" className="grid gap-3 sm:grid-cols-2">
                {VISIBILITY_RULES.map((rule) => {
                  const active = draft.visibility === rule.id;
                  return (
                    <button
                      key={rule.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => set("visibility", rule.id)}
                      className={choiceCardClass(active)}
                    >
                      <span className={cn("text-sm font-bold", active ? "text-[#eab308]" : "text-white")}>
                        {rule.label}
                      </span>
                      <span className="text-[11px] leading-4 text-[#6b7280]">{rule.description}</span>
                    </button>
                  );
                })}
              </div>
            </Field>
          </div>
        </Section>
      </div>
    </AnimatedContainer>
  );
};

export default WidgetForm;
