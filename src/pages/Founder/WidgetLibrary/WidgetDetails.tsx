import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { GitCommitHorizontal, Layers, PieChart, Rocket } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Select from "@/ui/Select";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateWidget } from "@/store/features/FounderWidgets/founderWidgetsSlice";
import WidgetPreview from "./components/WidgetPreview";
import { WidgetIcon, WidgetStatusPill } from "./components/WidgetBits";
import { WIDGET_DEPLOY_EVENT, WIDGETS_PATH } from "./events";
import {
  INTERACTION_HOURS,
  PREVIEW_ROLES,
  VISIBILITY_RULES,
  WIDGET_TYPE_META,
  formatHistoryTime,
  isVisibleTo,
  seedSeries,
  shortVersion,
  widgetCategory,
  withChannel,
  type PreviewRole,
} from "./data";

const panelLabel = "text-[10px] font-bold uppercase leading-[15px] tracking-[1px] text-[#6b7280]";

const Stat = ({
  label,
  value,
  icon,
  badge,
}: {
  label: string;
  value: string;
  icon: ReactNode;
  badge?: string;
}) => (
  <div className="flex items-center gap-4">
    {icon}
    <div className="min-w-0 flex-1">
      <p className={panelLabel}>{label}</p>
      <p className="text-2xl font-bold leading-8 text-white tabular-nums">{value}</p>
    </div>
    {badge && (
      <span className="rounded bg-[rgba(16,185,129,0.1)] px-2 py-0.5 text-[11px] font-bold text-[#10b981]">
        {badge}
      </span>
    )}
  </div>
);

const Row = ({ label, value }: { label: string; value: ReactNode }) => (
  <div className="flex items-center justify-between gap-4 text-sm">
    <span className="text-[#9ca3af]">{label}</span>
    <span className="text-right font-semibold text-white">{value}</span>
  </div>
);

const WidgetDetails = () => {
  const { widgetId } = useParams();
  const dispatch = useAppDispatch();
  const widget = useAppSelector((s) => s.founderWidgets.widgets.find((w) => w.id === widgetId));
  const [role, setRole] = useState<PreviewRole>("Founder Account");
  const [expanded, setExpanded] = useState(false);

  const interactions = useMemo(
    () =>
      seedSeries(`${widgetId}-hours`)
        .slice(0, INTERACTION_HOURS.length)
        .map((p, i) => ({ hour: INTERACTION_HOURS[i], value: p.value })),
    [widgetId]
  );

  useEffect(() => {
    if (!widget) return;
    const onDeploy = () => {
      if (!widget.dataSource) {
        toast.error("Connect a data source before deploying");
        return;
      }
      const version = withChannel(widget.version, "Published");
      if (widget.status === "Published" && widget.deployedVersion === version) {
        toast.info(`${shortVersion(version)} is already live`);
        return;
      }
      dispatch(
        updateWidget({
          id: widget.id,
          patch: { status: "Published", version, deployedVersion: version },
          note: `Deployed ${shortVersion(version)} to production`,
        })
      );
      toast.success(`${widget.name} ${shortVersion(version)} deployed`);
    };
    window.addEventListener(WIDGET_DEPLOY_EVENT, onDeploy);
    return () => window.removeEventListener(WIDGET_DEPLOY_EVENT, onDeploy);
  }, [widget, dispatch]);

  if (!widget) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-center">
        <p className="text-lg font-semibold text-white">Widget not found</p>
        <p className="text-sm text-[#9ca3af]">It may have been deleted or the link is out of date.</p>
        <Link to={WIDGETS_PATH} className="text-sm font-semibold text-[#eab308] hover:underline">
          Back to Widget Library
        </Link>
      </div>
    );
  }

  const restricted = !isVisibleTo(widget, role);
  const pendingDeploy = widget.status !== "Draft" && widget.deployedVersion !== widget.version;
  const visibility = VISIBILITY_RULES.find((v) => v.id === widget.visibility);

  return (
    <AnimatedContainer className="flex flex-col gap-6 pb-8">
      <div className="flex flex-wrap items-center gap-3">
        <WidgetIcon widget={widget} />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">{widget.name}</p>
          <p className="text-[11px] text-[#6b7280]">
            {widgetCategory(widget)} · {WIDGET_TYPE_META[widget.type].detail}
          </p>
        </div>
        <WidgetStatusPill status={widget.status} />
        <span className="font-mono text-xs text-white/70">{widget.version}</span>
        {pendingDeploy && (
          <span className="rounded-full border border-[rgba(234,179,8,0.3)] bg-[rgba(234,179,8,0.1)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[1px] text-[#eab308]">
            Live: {widget.deployedVersion ? shortVersion(widget.deployedVersion) : "none"} · undeployed changes
          </span>
        )}
      </div>

      <div className={cn("grid gap-6", !expanded && "xl:grid-cols-[minmax(0,1fr)_380px]")}>
        <div className="overflow-hidden rounded-[20px] border border-white/10 bg-white/5">
          <div className="flex flex-col gap-3 border-b border-white/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-bold uppercase tracking-[1.2px] text-white">Live Preview State</p>
            <div className="flex items-center gap-3">
              <span className={panelLabel}>Preview Role</span>
              <Select
                variant="soft"
                options={[...PREVIEW_ROLES]}
                value={role}
                onChange={(v) => setRole(v as PreviewRole)}
                className="h-9! w-44! rounded-lg! border-white/10! bg-black/40! px-3! text-xs! text-white!"
              />
            </div>
          </div>
          <WidgetPreview
            key={widget.id}
            widget={widget}
            restricted={restricted}
            role={role}
            expanded={expanded}
            onToggleExpand={() => setExpanded((v) => !v)}
          />
        </div>

        {!expanded && (
          <aside className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <div>
              <p className={panelLabel}>Core Performance</p>
              <p className="text-lg font-bold text-white">Widget Analytics</p>
            </div>
            <Stat
              label="Total Usage"
              value={widget.usage.toLocaleString()}
              badge={widget.usage > 0 ? "+12%" : undefined}
              icon={
                <span className="flex size-10 items-center justify-center rounded-lg bg-[rgba(59,130,246,0.1)] text-[#3b82f6]">
                  <Layers className="size-4" />
                </span>
              }
            />
            <Stat
              label="Engagement Rate"
              value={`${widget.engagement.toFixed(1)}%`}
              icon={
                <span className="flex size-10 items-center justify-center rounded-lg bg-[rgba(16,185,129,0.1)] text-[#10b981]">
                  <PieChart className="size-4" />
                </span>
              }
            />
            <div className="h-px bg-white/10" />
            <div className="flex flex-col gap-3">
              <p className={panelLabel}>Assignments</p>
              <Row label="Dashboard Links" value={widget.dashboards} />
              <Row label="Product Embeds" value={widget.products} />
              <Row label="Avg. Session Depth" value={`${widget.sessionDepthMin.toFixed(1)}m`} />
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex flex-col gap-3">
              <p className={panelLabel}>Recent Interaction</p>
              {widget.usage > 0 ? (
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={interactions} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                      <XAxis dataKey="hour" tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 10 }} />
                      <Tooltip
                        cursor={{ fill: "rgba(255,255,255,0.04)" }}
                        contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
                        formatter={(v) => [`${v} sessions`, "Interactions"]}
                      />
                      <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} isAnimationActive={false} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="rounded-lg border border-dashed border-white/10 py-8 text-center text-xs text-[#6b7280]">
                  No interactions yet — deploy and assign this widget to collect analytics.
                </p>
              )}
            </div>
          </aside>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className={panelLabel}>Configuration</p>
          <Row label="Data Source" value={widget.dataSource || <span className="text-[#f87171]">Not connected</span>} />
          <Row label="Refresh" value={widget.refresh} />
          <Row label="Geometry" value={`${widget.width} × ${widget.height}`} />
          <Row
            label="Theme"
            value={
              <span className="inline-flex items-center gap-2">
                <span className="size-3 rounded-sm" style={{ backgroundColor: widget.color }} />
                {widget.color}
              </span>
            }
          />
          <Row label="Environments" value={widget.environments.map((e) => `${e}™`).join(", ") || "None"} />
          <Row label="Visibility" value={visibility?.label} />
          <Row
            label="Protocols"
            value={
              [widget.autoRefresh && "Auto Refresh", widget.realtime && "Real-Time", widget.quickNav && "Quick Nav"]
                .filter(Boolean)
                .join(" · ") || "None"
            }
          />
          {widget.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {widget.tags.map((t) => (
                <span key={t} className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase text-white/70">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className={panelLabel}>Version History</p>
          <ol className="flex max-h-80 flex-col gap-4 overflow-y-auto pr-1">
            {widget.history.map((h, i) => {
              const isDeploy = h.note.toLowerCase().includes("deploy");
              return (
                <li key={h.id} className="flex gap-3">
                  <span
                    className={cn(
                      "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full",
                      isDeploy ? "bg-[rgba(16,185,129,0.1)] text-[#10b981]" : "bg-white/5 text-[#9ca3af]"
                    )}
                  >
                    {isDeploy ? <Rocket className="size-3.5" /> : <GitCommitHorizontal className="size-3.5" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white">
                      {h.note}
                      {i === 0 && <span className="ml-2 text-[10px] font-bold uppercase text-[#eab308]">Latest</span>}
                    </p>
                    <p className="text-[11px] text-[#6b7280]">
                      <span className="font-mono text-white/60">{h.version}</span> · {formatHistoryTime(h.at)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default WidgetDetails;
