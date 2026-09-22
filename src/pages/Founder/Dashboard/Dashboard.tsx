import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Box,
  ChevronDown,
  Link2,
  Plus,
  QrCode,
  Sparkles,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AnimatedContainer from "@/common/AnimatedContainer";
import { cn } from "@/lib/utils";
import { getCssVarValue, DASHBOARD_THEME_APPLIED_EVENT } from "@/lib/dashboardTheme";
import { useDashboardTheme } from "@/hooks/useDashboardTheme";
import DashboardSettingsModal from "./DashboardSettingsModal";
import EditableWidgetShell from "./EditableWidgetShell";
import AddWidgetModal from "./AddWidgetModal";
import EditWidgetPanel from "./EditWidgetPanel";
import WidgetAddedModal from "./WidgetAddedModal";
import LayoutPresetsStrip, {
  type LayoutPresetId,
} from "./LayoutPresetsStrip";
import trendUp from "./assets/trend-up.svg";
import trendDown from "./assets/trend-down.svg";
import trendFlat from "./assets/trend-flat.svg";
import {
  ACTIVITIES,
  ALERTS,
  DEFAULT_WIDGET_COLORS,
  GROWTH_DATA,
  KPI_CARDS,
  LAYOUT_CANCEL_EVENT,
  LAYOUT_PENDING_KEY,
  LAYOUT_RESUME_EVENT,
  LINK_ACTIONS,
  OPEN_DASHBOARD_SETTINGS_EVENT,
  OPEN_LAYOUT_EDIT_EVENT,
  PRODUCTS,
  SNAPSHOT_STATS,
  SOLUTION_TABS,
  readLayoutPreset,
  readLayoutWidgets,
  saveLayoutPreset,
  saveLayoutWidgets,
  setLayoutEditingBroadcast,
  type TrendTone,
  type WidgetInstance,
  type WidgetTemplate,
} from "./data";
import { toast } from "sonner";

const LINK_ICONS = [Plus, Link2, Box, QrCode] as const;

const TrendBadge = ({
  change,
  tone,
  compact,
}: {
  change: string;
  tone: TrendTone;
  compact?: boolean;
}) => {
  const icon =
    tone === "up" ? trendUp : tone === "down" ? trendDown : trendFlat;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold",
        tone === "up" && "bg-button-bg/10 text-button-bg",
        tone === "down" && "bg-primary-orange/10 text-primary-orange",
        tone === "flat" && "bg-primary-text/10 text-primary-text",
        compact && "px-1.5 py-0.5"
      )}
    >
      <img src={icon} alt="" className="size-2 object-contain" />
      {change}
    </span>
  );
};

const Panel = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "rounded-2xl border border-border bg-card backdrop-blur-sm",
      className
    )}
  >
    {children}
  </div>
);

const FounderDashboard = () => {
  const [activeTab, setActiveTab] =
    useState<(typeof SOLUTION_TABS)[number]["id"]>("consumer");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [layoutEditing, setLayoutEditing] = useState(false);
  const [layoutPreset, setLayoutPreset] = useState<LayoutPresetId>(() =>
    readLayoutPreset()
  );
  const [layoutPresetSnapshot, setLayoutPresetSnapshot] =
    useState<LayoutPresetId>(() => readLayoutPreset());
  const [widgets, setWidgets] = useState<WidgetInstance[]>(() =>
    readLayoutWidgets()
  );
  const [widgetsSnapshot, setWidgetsSnapshot] = useState<WidgetInstance[]>(
    () => readLayoutWidgets()
  );
  const [addWidgetOpen, setAddWidgetOpen] = useState(false);
  const [editWidget, setEditWidget] = useState<WidgetInstance | null>(null);
  const [addedTitle, setAddedTitle] = useState<string | null>(null);
  const { theme, save, preview, cancelPreview } = useDashboardTheme();
  const [chartColors, setChartColors] = useState({
    accent: "#10b7ba",
    muted: "#94A3B8",
    card: "#0f172a",
    border: "#FFFFFF1A",
    text: "#FFFFFF",
  });

  const isVisible = (id: string) =>
    widgets.find((w) => w.id === id)?.enabled !== false;

  const syncChartColors = () => {
    setChartColors({
      accent: getCssVarValue("--accent", "#10b7ba"),
      muted: getCssVarValue("--muted-blue", "#94A3B8"),
      card: getCssVarValue("--card-bg", "#0f172a"),
      border: getCssVarValue("--border-color", "#FFFFFF1A"),
      text: getCssVarValue("--primary-text", "#FFFFFF"),
    });
  };

  useEffect(() => {
    syncChartColors();
    const onApplied = () => syncChartColors();
    window.addEventListener(DASHBOARD_THEME_APPLIED_EVENT, onApplied);
    return () =>
      window.removeEventListener(DASHBOARD_THEME_APPLIED_EVENT, onApplied);
  }, [theme]);

  const resumeLayoutRef = useRef(() => {});
  const cancelLayoutRef = useRef(() => {});

  const handleResume = () => {
    saveLayoutWidgets(widgets);
    saveLayoutPreset(layoutPreset);
    setLayoutEditing(false);
    setLayoutEditingBroadcast(false);
    toast.success("Dashboard layout saved");
  };

  const handleCancelLayout = () => {
    setWidgets(widgetsSnapshot.map((w) => ({ ...w, colors: { ...w.colors } })));
    setLayoutPreset(layoutPresetSnapshot);
    setLayoutEditing(false);
    setLayoutEditingBroadcast(false);
  };

  resumeLayoutRef.current = handleResume;
  cancelLayoutRef.current = handleCancelLayout;

  useEffect(() => {
    const enterLayoutEdit = () => {
      setWidgets((current) => {
        setWidgetsSnapshot(
          current.map((w) => ({ ...w, colors: { ...w.colors } }))
        );
        return current;
      });
      setLayoutPreset((current) => {
        setLayoutPresetSnapshot(current);
        return current;
      });
      setLayoutEditing(true);
      setLayoutEditingBroadcast(true);
      requestAnimationFrame(() => {
        const scroller = document
          .getElementById("far-dashboard-theme")
          ?.querySelector(".overflow-y-auto");
        if (scroller instanceof HTMLElement) scroller.scrollTop = 0;
      });
    };

    const openSettings = () => setSettingsOpen(true);
    const onCancel = () => cancelLayoutRef.current();
    const onResume = () => resumeLayoutRef.current();

    window.addEventListener(OPEN_DASHBOARD_SETTINGS_EVENT, openSettings);
    window.addEventListener(OPEN_LAYOUT_EDIT_EVENT, enterLayoutEdit);
    window.addEventListener(LAYOUT_CANCEL_EVENT, onCancel);
    window.addEventListener(LAYOUT_RESUME_EVENT, onResume);

    if (sessionStorage.getItem(LAYOUT_PENDING_KEY) === "1") {
      sessionStorage.removeItem(LAYOUT_PENDING_KEY);
      enterLayoutEdit();
    }

    return () => {
      window.removeEventListener(OPEN_DASHBOARD_SETTINGS_EVENT, openSettings);
      window.removeEventListener(OPEN_LAYOUT_EDIT_EVENT, enterLayoutEdit);
      window.removeEventListener(LAYOUT_CANCEL_EVENT, onCancel);
      window.removeEventListener(LAYOUT_RESUME_EVENT, onResume);
    };
  }, []);

  const removeWidget = (id: string) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, enabled: false } : w))
    );
    toast.success("Widget removed from layout");
  };

  const handleAddTemplate = (tpl: WidgetTemplate) => {
    const instance: WidgetInstance = {
      id: `custom-${tpl.id}-${Date.now()}`,
      templateId: tpl.id,
      title: tpl.title,
      enabled: true,
      showProgress: true,
      enableAi: tpl.category === "analytics",
      dataSource: "Historical Emotional Analysis (HE-A)",
      colors: { ...DEFAULT_WIDGET_COLORS },
    };
    setWidgets((prev) => [...prev, instance]);
    setAddWidgetOpen(false);
    setAddedTitle(tpl.title);
  };

  const gradientId = useMemo(() => "founderGrowthGrad", []);

  return (
    <div className="space-y-6 lg:space-y-8 pb-8">
      <DashboardSettingsModal
        open={settingsOpen}
        initial={theme}
        onClose={() => setSettingsOpen(false)}
        onPreview={preview}
        onSave={save}
        onCancelPreview={cancelPreview}
      />
      <AddWidgetModal
        open={addWidgetOpen}
        onClose={() => setAddWidgetOpen(false)}
        onAdd={handleAddTemplate}
      />
      <EditWidgetPanel
        open={!!editWidget}
        widget={editWidget}
        onClose={() => setEditWidget(null)}
        onApply={(next) => {
          setWidgets((prev) =>
            prev.map((w) => (w.id === next.id ? next : w))
          );
          setEditWidget(null);
          toast.success("Widget updated");
        }}
      />
      <WidgetAddedModal
        open={!!addedTitle}
        widgetTitle={addedTitle ?? undefined}
        onClose={() => setAddedTitle(null)}
        onGoDashboard={() => setAddedTitle(null)}
      />

      {layoutEditing && (
        <LayoutPresetsStrip
          selected={layoutPreset}
          onSelect={setLayoutPreset}
        />
      )}

      {/* Solution tabs — Figma: 2 equal tabs */}
      <AnimatedContainer delay={0.05}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SOLUTION_TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex h-[72px] items-center gap-3 rounded-2xl border px-4 text-left transition-all cursor-pointer",
                  active
                    ? "border-button-bg/50 bg-button-bg/10 shadow-[0_0_20px_color-mix(in_srgb,var(--button-bg)_12%,transparent)]"
                    : "border-border bg-primary-text/5 hover:border-button-bg/30 hover:bg-primary-text/[0.07]"
                )}
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary-text/10 shrink-0">
                  <img
                    src={tab.iconSrc}
                    alt=""
                    className="size-[18px] object-contain"
                  />
                </span>
                <span className="text-base font-semibold text-primary-text truncate">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </AnimatedContainer>

      {/* KPI row */}
      {isVisible("core-kpis") && (
      <AnimatedContainer delay={0.1}>
        <EditableWidgetShell
          editing={layoutEditing}
          title="KPI Overview"
          onEdit={() =>
            setEditWidget(widgets.find((w) => w.id === "core-kpis") ?? null)
          }
          onRemove={() => removeWidget("core-kpis")}
        >
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {KPI_CARDS.map((kpi) => (
            <Panel
              key={kpi.label}
              className="p-6 sm:p-8 flex flex-col gap-4 min-h-[200px] sm:min-h-[242px]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex size-12 sm:size-14 items-center justify-center rounded-[12px] bg-primary-text/10 shrink-0">
                  <img
                    src={kpi.iconSrc}
                    alt=""
                    className="size-5 object-contain"
                  />
                </span>
                <TrendBadge change={kpi.change} tone={kpi.tone} />
              </div>
              <p className="text-[28px] font-bold text-primary-text leading-[35px]">
                {kpi.value}
              </p>
              <div className="mt-auto space-y-1">
                <p className="text-sm sm:text-base font-medium text-primary-text leading-snug">
                  {kpi.label}
                </p>
                <p className="text-[13px] text-secondary-text">vs yesterday</p>
              </div>
            </Panel>
          ))}
        </div>
        </EditableWidgetShell>
      </AnimatedContainer>
      )}

      <div
        className={cn(
          "grid grid-cols-1 gap-5 lg:gap-6",
          layoutPreset === "dashboard-4"
            ? "xl:grid-cols-[280px_minmax(0,1fr)] 2xl:grid-cols-[320px_minmax(0,1fr)]"
            : layoutPreset === "dashboard-3"
              ? "xl:grid-cols-[minmax(0,1fr)_280px] 2xl:grid-cols-[minmax(0,1fr)_300px]"
              : "xl:grid-cols-[minmax(0,1fr)_320px] 2xl:grid-cols-[minmax(0,1fr)_360px]"
        )}
      >
        <div
          className={cn(
            "space-y-5 lg:space-y-6 min-w-0",
            layoutPreset === "dashboard-4" && "xl:order-2"
          )}
        >
          {/* Business Snapshot */}
          {isVisible("core-snapshot") && (
          <AnimatedContainer delay={0.12}>
            <EditableWidgetShell
              editing={layoutEditing}
              title="Business Snapshot"
              onEdit={() =>
                setEditWidget(
                  widgets.find((w) => w.id === "core-snapshot") ?? null
                )
              }
              onRemove={() => removeWidget("core-snapshot")}
            >
            <Panel className="p-4 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-playfair text-xl sm:text-2xl text-primary-text">
                      Business Snapshot
                    </h2>
                    <ChevronDown className="size-3.5 text-muted-blue" />
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-base sm:text-lg text-primary-text font-medium">
                      Relationship
                      <sup className="text-button-bg text-xs">™</sup>
                    </h3>
                    <ChevronDown className="size-3 text-muted-blue" />
                  </div>
                </div>
                <Link
                  to="/founder/analytics-insights"
                  className="inline-flex items-center gap-1.5 text-sm text-button-bg hover:opacity-80"
                >
                  View Business Analytics
                  <ArrowRight className="size-3" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {SNAPSHOT_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border bg-primary-bg/50 p-3 sm:p-4"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <p className="text-xl sm:text-2xl font-bold text-primary-text">
                        {stat.value}
                      </p>
                      <TrendBadge change={stat.change} tone={stat.tone} compact />
                    </div>
                    <p className="mt-2 text-xs text-secondary-text leading-snug">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>
            </EditableWidgetShell>
          </AnimatedContainer>
          )}

          {/* Growth chart — accent line */}
          {isVisible("core-growth") && (
          <AnimatedContainer delay={0.14}>
            <EditableWidgetShell
              editing={layoutEditing}
              title="FRC™ Continuum Growth"
              onEdit={() =>
                setEditWidget(
                  widgets.find((w) => w.id === "core-growth") ?? null
                )
              }
              onRemove={() => removeWidget("core-growth")}
            >
            <Panel className="p-4 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">
                <div>
                  <h2 className="font-playfair text-xl sm:text-2xl text-primary-text flex items-center gap-2">
                    FRC™ Continuum Growth
                    <Sparkles className="size-4 text-button-bg" />
                  </h2>
                  <p className="mt-1 text-sm text-secondary-text">
                    Longitudinal data from your reflection journey
                  </p>
                </div>
                <p className="font-playfair text-2xl sm:text-3xl text-button-bg shrink-0">
                  $22,779
                </p>
              </div>

              <div className="h-[220px] sm:h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={GROWTH_DATA}
                    margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor={chartColors.accent}
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="95%"
                          stopColor={chartColors.accent}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="color-mix(in srgb, var(--primary-text) 6%, transparent)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: chartColors.muted, fontSize: 10 }}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: chartColors.muted, fontSize: 10 }}
                      tickFormatter={(v) => `${Math.round(v / 1000)}K`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: chartColors.card,
                        border: `1px solid ${chartColors.border}`,
                        borderRadius: 8,
                        color: chartColors.text,
                      }}
                      formatter={(value) => [
                        `$${Number(value || 0).toLocaleString()}`,
                        "Value",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={chartColors.accent}
                      strokeWidth={2.5}
                      fill={`url(#${gradientId})`}
                      dot={{
                        r: 3,
                        fill: chartColors.accent,
                        stroke: chartColors.card,
                        strokeWidth: 2,
                      }}
                      activeDot={{ r: 5, fill: chartColors.accent }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-border pt-4">
                <div className="flex flex-wrap gap-4 sm:gap-8">
                  <div>
                    <p className="text-xs text-muted-blue">Avg Daily</p>
                    <p className="text-sm font-semibold text-primary-text">$758</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-blue">Best Day (Jul 8)</p>
                    <p className="text-sm font-semibold text-primary-text">$1,135</p>
                  </div>
                </div>
                <Link
                  to="/founder/financial-center"
                  className="inline-flex items-center gap-1.5 text-sm text-button-bg hover:opacity-80"
                >
                  View Financial Dashboard
                  <ArrowRight className="size-3" />
                </Link>
              </div>
            </Panel>
            </EditableWidgetShell>
          </AnimatedContainer>
          )}

          {/* Continuum + Product performance */}
          {isVisible("core-performance") && (
          <AnimatedContainer delay={0.16}>
            <EditableWidgetShell
              editing={layoutEditing}
              title="Product Performance"
              onEdit={() =>
                setEditWidget(
                  widgets.find((w) => w.id === "core-performance") ?? null
                )
              }
              onRemove={() => removeWidget("core-performance")}
            >
            <div className="grid grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)] gap-4">
              <Panel className="p-5 flex flex-col justify-between min-h-[140px]">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-blue">
                    August 2023
                  </p>
                  <p className="mt-2 text-4xl font-bold text-primary-text">72</p>
                </div>
                <p className="text-sm text-secondary-text mt-4">
                  Continuum Growth:{" "}
                  <span className="text-status-success font-medium">+12%</span>
                </p>
              </Panel>

              <Panel className="p-4 sm:p-6 overflow-hidden">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-4">
                  <div>
                    <h2 className="font-playfair text-xl sm:text-2xl text-primary-text">
                      Product Performance (MTD)
                    </h2>
                    <p className="mt-1 text-sm text-secondary-text">
                      Performance metrics for all products this month.
                    </p>
                  </div>
                  <Link
                    to="/founder/analytics-insights"
                    className="inline-flex items-center gap-1.5 text-sm text-button-bg hover:opacity-80 whitespace-nowrap"
                  >
                    View All Products Analytics
                    <ArrowRight className="size-3" />
                  </Link>
                </div>

                <div className="overflow-x-auto -mx-1 px-1">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-border text-muted-blue text-xs uppercase tracking-wide">
                        <th className="py-3 pr-3 font-medium">#</th>
                        <th className="py-3 pr-3 font-medium">Product Name</th>
                        <th className="py-3 pr-3 font-medium">Purchases</th>
                        <th className="py-3 pr-3 font-medium">Completion</th>
                        <th className="py-3 pr-3 font-medium">Reports</th>
                        <th className="py-3 font-medium">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PRODUCTS.map((product) => (
                        <tr
                          key={product.id}
                          className="border-b border-border/50 last:border-0 hover:bg-primary-bg/40"
                        >
                          <td className="py-3.5 pr-3 text-muted-blue">
                            {product.id}
                          </td>
                          <td className="py-3.5 pr-3">
                            <p className="text-primary-text font-medium">
                              {product.name}
                            </p>
                            <p className="text-xs text-muted-blue">
                              {product.division}
                            </p>
                          </td>
                          <td className="py-3.5 pr-3 text-primary-text">
                            {product.purchases}
                          </td>
                          <td className="py-3.5 pr-3">
                            <div className="flex items-center gap-2 min-w-[100px]">
                              <div className="h-1.5 flex-1 rounded-full bg-border overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-accent"
                                  style={{ width: `${product.completion}%` }}
                                />
                              </div>
                              <span className="text-xs text-secondary-text w-8">
                                {product.completion}%
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 pr-3 text-primary-text">
                            {product.reports}
                          </td>
                          <td className="py-3.5 text-button-bg font-medium">
                            {product.revenue}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Panel>
            </div>
            </EditableWidgetShell>
          </AnimatedContainer>
          )}

          {/* Link Center */}
          {isVisible("core-links") && (
          <AnimatedContainer delay={0.18}>
            <EditableWidgetShell
              editing={layoutEditing}
              title="Link Center™"
              onEdit={() =>
                setEditWidget(
                  widgets.find((w) => w.id === "core-links") ?? null
                )
              }
              onRemove={() => removeWidget("core-links")}
            >
            <Panel className="p-4 sm:p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
                <h2 className="font-playfair text-xl sm:text-2xl text-primary-text">
                  Link Center™
                </h2>
                <Link
                  to="/founder/link-center"
                  className="inline-flex items-center gap-1.5 text-sm text-button-bg hover:opacity-80"
                >
                  View All Links
                  <ArrowRight className="size-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {LINK_ACTIONS.map((action, i) => {
                  const Icon = LINK_ICONS[i] ?? Plus;
                  return (
                    <Link
                      key={action.label}
                      to={action.to}
                      className="flex items-center gap-3 rounded-xl border border-border bg-primary-bg/40 px-4 py-4 hover:border-button-bg/40 hover:bg-button-bg/5 transition-colors"
                    >
                      <span className="flex size-9 items-center justify-center rounded-lg bg-button-bg/10 text-button-bg">
                        <Icon className="size-4" />
                      </span>
                      <span className="text-sm text-primary-text font-medium">
                        {action.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </Panel>
            </EditableWidgetShell>
          </AnimatedContainer>
          )}

          {layoutEditing && (
          <AnimatedContainer delay={0.2}>
            <button
              type="button"
              onClick={() => setAddWidgetOpen(true)}
              className="w-full rounded-2xl border border-dashed border-button-bg/40 bg-button-bg/5 py-5 text-sm font-semibold tracking-wider text-button-bg hover:bg-button-bg/10 transition-colors cursor-pointer"
            >
              + ADD NEW WIDGET
            </button>
          </AnimatedContainer>
          )}

          {/* Custom widgets added via library */}
          {widgets
            .filter((w) => w.id.startsWith("custom-") && w.enabled)
            .map((w) => (
              <EditableWidgetShell
                key={w.id}
                editing={layoutEditing}
                title={w.title}
                onEdit={() => setEditWidget(w)}
                onRemove={() => removeWidget(w.id)}
              >
                <div
                  className="rounded-2xl border border-border p-5 sm:p-6 backdrop-blur-sm"
                  style={{ backgroundColor: w.colors.background }}
                >
                  <h3
                    className="font-playfair text-xl"
                    style={{ color: w.colors.title }}
                  >
                    {w.title}
                  </h3>
                  <p
                    className="mt-2 text-sm"
                    style={{ color: w.colors.description }}
                  >
                    {w.dataSource}
                    {w.enableAi ? " · AI insights on" : ""}
                  </p>
                </div>
              </EditableWidgetShell>
            ))}
        </div>

        {/* Right rail */}
        <div
          className={cn(
            "space-y-5 lg:space-y-6",
            layoutPreset === "dashboard-4" && "xl:order-1"
          )}
        >
          {isVisible("core-health") && (
          <AnimatedContainer delay={0.12} direction="left">
            <EditableWidgetShell
              editing={layoutEditing}
              title="Platform Health"
              onEdit={() =>
                setEditWidget(
                  widgets.find((w) => w.id === "core-health") ?? null
                )
              }
              onRemove={() => removeWidget("core-health")}
            >
            <Panel className="p-4 sm:p-5">
              <h3 className="font-playfair text-lg text-primary-text mb-4">
                Platform Health
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "System Uptime", value: "99.99%", ok: true },
                  { label: "AI Services", value: "Operational", ok: true },
                  { label: "Storage", value: "72% Used", ok: false },
                  { label: "Response Time", value: "412ms", ok: true },
                ].map((row) => (
                  <li
                    key={row.label}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-secondary-text">{row.label}</span>
                    <span
                      className={cn(
                        "font-medium",
                        row.ok ? "text-status-success" : "text-status-warning"
                      )}
                    >
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                to="/founder/ai-services"
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-button-bg hover:opacity-80"
              >
                View System Health
                <ArrowRight className="size-3" />
              </Link>
            </Panel>
            </EditableWidgetShell>
          </AnimatedContainer>
          )}

          {isVisible("core-activity") && (
          <AnimatedContainer delay={0.14} direction="left">
            <EditableWidgetShell
              editing={layoutEditing}
              title="Recent Activity"
              onEdit={() =>
                setEditWidget(
                  widgets.find((w) => w.id === "core-activity") ?? null
                )
              }
              onRemove={() => removeWidget("core-activity")}
            >
            <Panel className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-playfair text-lg text-primary-text">
                  Recent Activity
                </h3>
                <button
                  type="button"
                  className="text-xs text-button-bg hover:opacity-80 cursor-pointer border-0 bg-transparent"
                >
                  View All
                </button>
              </div>
              <ul className="space-y-4">
                {ACTIVITIES.map((item) => (
                  <li key={item.text} className="flex gap-3">
                    <span className="mt-1.5 size-2 rounded-full bg-button-bg shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-primary-text leading-snug">
                        {item.text}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-blue">{item.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
            </EditableWidgetShell>
          </AnimatedContainer>
          )}

          {isVisible("core-alerts") && (
          <AnimatedContainer delay={0.16} direction="left">
            <EditableWidgetShell
              editing={layoutEditing}
              title="System Alerts™"
              onEdit={() =>
                setEditWidget(
                  widgets.find((w) => w.id === "core-alerts") ?? null
                )
              }
              onRemove={() => removeWidget("core-alerts")}
            >
            <Panel className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-playfair text-lg text-primary-text">
                  System Alerts™
                </h3>
                <span className="flex size-5 items-center justify-center rounded-full bg-status-danger/20 text-[11px] font-semibold text-status-danger">
                  6
                </span>
              </div>
              <ul className="space-y-3">
                {ALERTS.map((alert) => (
                  <li
                    key={alert.text}
                    className={cn(
                      "rounded-lg border px-3 py-2.5 text-xs leading-snug",
                      alert.tone === "warn" &&
                        "border-status-warning/20 bg-status-warning/5 text-status-warning",
                      alert.tone === "danger" &&
                        "border-status-danger/20 bg-status-danger/5 text-status-danger",
                      alert.tone === "ok" &&
                        "border-status-success/20 bg-status-success/5 text-status-success",
                      alert.tone === "info" &&
                        "border-light-blue/20 bg-light-blue/5 text-light-blue"
                    )}
                  >
                    {alert.text}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-button-bg hover:opacity-80 cursor-pointer border-0 bg-transparent p-0"
              >
                View All Alerts
                <ArrowRight className="size-3" />
              </button>
            </Panel>
            </EditableWidgetShell>
          </AnimatedContainer>
          )}

          {isVisible("core-ai") && (
          <AnimatedContainer delay={0.18} direction="left">
            <EditableWidgetShell
              editing={layoutEditing}
              title="AI Recommendation"
              onEdit={() =>
                setEditWidget(widgets.find((w) => w.id === "core-ai") ?? null)
              }
              onRemove={() => removeWidget("core-ai")}
            >
            <Panel className="p-4 sm:p-5 border-button-bg/30 bg-gradient-to-b from-button-bg/10 to-transparent">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-button-bg">
                AI RECOMMENDATION
              </p>
              <p className="mt-3 text-sm text-primary-text leading-relaxed">
                &ldquo;Storage is at 72% capacity. Consider archiving unused
                protocol drafts or upgrading storage before peak reporting
                week.&rdquo;
              </p>
              <Link
                to="/founder/ai-services"
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-button-bg hover:opacity-80"
              >
                Explore suggestion
                <ArrowRight className="size-3" />
              </Link>
            </Panel>
            </EditableWidgetShell>
          </AnimatedContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default FounderDashboard;
