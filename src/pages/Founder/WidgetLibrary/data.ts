export const WIDGET_STATUSES = ["Published", "Active", "Draft"] as const;
export type WidgetStatus = (typeof WIDGET_STATUSES)[number];

export const WIDGET_TYPES = [
  "Interactive Chart",
  "KPI Metric",
  "Data Grid",
  "Event Timeline",
  "Configuration Tool",
] as const;
export type WidgetType = (typeof WIDGET_TYPES)[number];

export const WIDGET_CATEGORIES = ["Analytics", "System", "Utility"] as const;
export type WidgetCategory = (typeof WIDGET_CATEGORIES)[number];

export const WIDGET_TYPE_META: Record<WidgetType, { category: WidgetCategory; detail: string }> = {
  "Interactive Chart": { category: "Analytics", detail: "Real-time Plotly Stream" },
  "KPI Metric": { category: "Analytics", detail: "Metric Strip" },
  "Data Grid": { category: "System", detail: "Paginated Data Grid" },
  "Event Timeline": { category: "System", detail: "Event Timeline" },
  "Configuration Tool": { category: "Utility", detail: "Configuration Tool" },
};

export const ENVIRONMENTS = ["Consumer", "Enterprise"] as const;
export type WidgetEnvironment = (typeof ENVIRONMENTS)[number];

export const VISIBILITY_RULES = [
  { id: "All", label: "All", description: "Visible to all authorized roles" },
  { id: "Consumer", label: "Consumer Specific", description: "Restricted to consumer accounts only" },
  { id: "Enterprise", label: "Enterprise Specific", description: "Restricted to enterprise accounts only" },
  { id: "Founder", label: "Founder Only", description: "High-security administrative access" },
] as const;
export type VisibilityRule = (typeof VISIBILITY_RULES)[number]["id"];

export const PREVIEW_ROLES = ["Founder Account", "Enterprise Admin", "Consumer User"] as const;
export type PreviewRole = (typeof PREVIEW_ROLES)[number];

export const COLOR_THEMES = ["#EAB308", "#3B82F6", "#10B981", "#EF4444"] as const;

export const WIDTH_OPTIONS = ["Auto", "1/3", "1/2", "2/3", "Full"] as const;
export const HEIGHT_OPTIONS = ["Auto", "Small", "Medium", "Large"] as const;

export const REFRESH_OPTIONS = [
  "Real-time (WebSocket)",
  "Every 30 seconds",
  "Every 5 minutes",
  "Hourly",
  "Daily",
  "Manual",
] as const;

export const DATA_SOURCES = [
  "Protocol-V1-Stream-772",
  "Revenue-Ledger-Primary",
  "User-Events-Firehose",
  "Audit-Log-Archive",
  "Theme-Registry",
];

export const UPDATED_RANGES = ["24H", "7D", "30D", "All"] as const;
export type UpdatedRange = (typeof UPDATED_RANGES)[number];

export interface WidgetHistoryEntry {
  id: string;
  at: string;
  version: string;
  note: string;
}

export interface Widget {
  id: string;
  name: string;
  description: string;
  type: WidgetType;
  tags: string[];
  title: string;
  subtitle: string;
  color: string;
  width: string;
  height: string;
  dataSource: string;
  refresh: string;
  autoRefresh: boolean;
  realtime: boolean;
  quickNav: boolean;
  environments: WidgetEnvironment[];
  visibility: VisibilityRule;
  status: WidgetStatus;
  version: string;
  deployedVersion: string | null;
  dashboards: number;
  products: number;
  usage: number;
  engagement: number;
  sessionDepthMin: number;
  /** ISO datetime. */
  updatedAt: string;
  history: WidgetHistoryEntry[];
}

export type WidgetDraft = Pick<
  Widget,
  | "name"
  | "description"
  | "type"
  | "tags"
  | "title"
  | "subtitle"
  | "color"
  | "width"
  | "height"
  | "dataSource"
  | "refresh"
  | "autoRefresh"
  | "realtime"
  | "quickNav"
  | "environments"
  | "visibility"
>;

export const EMPTY_WIDGET_DRAFT: WidgetDraft = {
  name: "",
  description: "",
  type: "Interactive Chart",
  tags: ["Priority: High"],
  title: "",
  subtitle: "",
  color: COLOR_THEMES[0],
  width: "Auto",
  height: "Auto",
  dataSource: "",
  refresh: REFRESH_OPTIONS[0],
  autoRefresh: true,
  realtime: false,
  quickNav: true,
  environments: ["Consumer", "Enterprise"],
  visibility: "All",
};

export const draftFromWidget = (w: Widget): WidgetDraft => ({
  name: w.name,
  description: w.description,
  type: w.type,
  tags: [...w.tags],
  title: w.title,
  subtitle: w.subtitle,
  color: w.color,
  width: w.width,
  height: w.height,
  dataSource: w.dataSource,
  refresh: w.refresh,
  autoRefresh: w.autoRefresh,
  realtime: w.realtime,
  quickNav: w.quickNav,
  environments: [...w.environments],
  visibility: w.visibility,
});

export type DraftErrors = Partial<Record<"name" | "title" | "dataSource" | "environments", string>>;

/** `strict` applies publish-level rules; drafts only need a name. */
export const validateDraft = (d: WidgetDraft, existingNames: string[], strict: boolean) => {
  const errors: DraftErrors = {};
  const name = d.name.trim();
  if (!name) errors.name = "Widget name is required";
  else if (existingNames.some((n) => n.toLowerCase() === name.toLowerCase()))
    errors.name = "A widget with this name already exists";
  if (strict) {
    if (!d.title.trim()) errors.title = "Widget title is required to publish";
    if (!d.dataSource.trim()) errors.dataSource = "Connect a data source to publish";
    if (d.environments.length === 0) errors.environments = "Select at least one environment";
  }
  return errors;
};

// ── Versions & status ───────────────────────────────────────────────────────

const CHANNEL: Record<WidgetStatus, string> = {
  Published: "stable",
  Active: "RC1",
  Draft: "alpha",
};

const versionCore = (version: string) => version.replace(/^v/, "").split("-")[0];

export const withChannel = (version: string, status: WidgetStatus) =>
  `v${versionCore(version)}-${CHANNEL[status]}`;

export const bumpWidgetVersion = (version: string, status: WidgetStatus, part: "minor" | "patch" = "patch") => {
  const [major = 0, minor = 0, patch = 0] = versionCore(version).split(".").map(Number);
  const next = part === "minor" ? `${major}.${minor + 1}.0` : `${major}.${minor}.${patch + 1}`;
  return withChannel(next, status);
};

export const shortVersion = (version: string) => `v${versionCore(version)}`;

export const widgetStatusMeta: Record<WidgetStatus, { pill: string; dot: string }> = {
  Published: {
    pill: "border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.1)] text-[#10b981]",
    dot: "bg-[#10b981]",
  },
  Active: {
    pill: "border-[rgba(234,179,8,0.2)] bg-[rgba(234,179,8,0.1)] text-[#eab308]",
    dot: "bg-[#eab308]",
  },
  Draft: {
    pill: "border-white/10 bg-white/5 text-[#6b7280]",
    dot: "bg-[#6b7280]",
  },
};

export const categoryTone: Record<WidgetCategory, string> = {
  Analytics: "border-[rgba(59,130,246,0.2)] bg-[rgba(59,130,246,0.1)] text-[#3b82f6]",
  System: "border-[rgba(234,179,8,0.2)] bg-[rgba(234,179,8,0.1)] text-[#eab308]",
  Utility: "border-white/10 bg-white/5 text-white/80",
};

export const widgetCategory = (w: Pick<Widget, "type">) => WIDGET_TYPE_META[w.type].category;

export const widgetDivisions = (w: Pick<Widget, "environments" | "visibility">) =>
  w.visibility === "Founder" ? ["Founder"] : w.environments;

export const isVisibleTo = (w: Pick<Widget, "visibility" | "environments">, role: PreviewRole) => {
  if (role === "Founder Account") return true;
  if (w.visibility === "Founder") return false;
  const env: WidgetEnvironment = role === "Enterprise Admin" ? "Enterprise" : "Consumer";
  if (!w.environments.includes(env)) return false;
  return w.visibility === "All" || w.visibility === env;
};

// ── Formatting ──────────────────────────────────────────────────────────────

export const formatUpdated = (iso: string) => {
  const d = new Date(iso);
  const today = new Date();
  const time = d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  if (d.toDateString() === today.toDateString()) return `Today, ${time}`;
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return `Yesterday, ${time}`;
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
};

export const formatHistoryTime = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const RANGE_HOURS: Record<UpdatedRange, number> = {
  "24H": 24,
  "7D": 24 * 7,
  "30D": 24 * 30,
  All: Number.POSITIVE_INFINITY,
};

export const updatedWithin = (iso: string, range: UpdatedRange) =>
  (Date.now() - new Date(iso).getTime()) / 3_600_000 <= RANGE_HOURS[range];

const widgetIdFrom = (category: WidgetCategory, existing: Widget[]) => {
  const prefix = { Analytics: "FIN", System: "SYS", Utility: "UI" }[category];
  let id: string;
  do {
    id = `WID-${prefix}-${1000 + Math.floor(Math.random() * 9000)}`;
  } while (existing.some((w) => w.id === id));
  return id;
};

export const historyId = () => `wh-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

export const createWidget = (draft: WidgetDraft, status: WidgetStatus, existing: Widget[]): Widget => {
  const now = new Date().toISOString();
  const version = withChannel("1.0.0", status);
  return {
    ...draft,
    name: draft.name.trim(),
    title: draft.title.trim() || draft.name.trim(),
    id: widgetIdFrom(WIDGET_TYPE_META[draft.type].category, existing),
    status,
    version,
    deployedVersion: status === "Published" ? version : null,
    dashboards: 0,
    products: 0,
    usage: 0,
    engagement: 0,
    sessionDepthMin: 0,
    updatedAt: now,
    history: [
      {
        id: historyId(),
        at: now,
        version,
        note: status === "Published" ? "Created and deployed to production" : "Widget created as draft",
      },
    ],
  };
};

export const duplicateWidget = (source: Widget, existing: Widget[]): Widget => {
  const names = new Set(existing.map((w) => w.name.toLowerCase()));
  let name = `${source.name} (Copy)`;
  for (let n = 2; names.has(name.toLowerCase()); n++) name = `${source.name} (Copy ${n})`;
  return createWidget({ ...draftFromWidget(source), name }, "Draft", existing);
};

/** The widget's trailing-week data, used by the live preview. */
export const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const seedSeries = (seed: string) => {
  let h = [...seed].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rand = () => ((h = (h * 1103515245 + 12345) >>> 0) % 1000) / 1000;
  let value = 38 + rand() * 12;
  return WEEK_DAYS.map((day) => {
    value = Math.max(10, Math.min(95, value + (rand() - 0.35) * 18));
    return { day, value: Math.round(value) };
  });
};
export const INTERACTION_HOURS = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

// ── Seed data ───────────────────────────────────────────────────────────────

const hoursAgo = (h: number) => new Date(Date.now() - h * 3_600_000).toISOString();

type Seed = Partial<Widget> & Pick<Widget, "id" | "name" | "type" | "status" | "version">;

const seed = (w: Seed): Widget => {
  const updatedAt = w.updatedAt ?? hoursAgo(48);
  return {
    description: "",
    tags: [],
    title: w.name,
    subtitle: "",
    color: COLOR_THEMES[0],
    width: "Auto",
    height: "Auto",
    dataSource: DATA_SOURCES[0],
    refresh: REFRESH_OPTIONS[0],
    autoRefresh: true,
    realtime: true,
    quickNav: false,
    environments: ["Consumer", "Enterprise"],
    visibility: "All",
    deployedVersion: w.status === "Draft" ? null : w.version,
    dashboards: 0,
    products: 0,
    usage: 0,
    engagement: 0,
    sessionDepthMin: 0,
    updatedAt,
    history: [
      { id: `${w.id}-h1`, at: updatedAt, version: w.version, note: w.status === "Draft" ? "Draft saved" : "Deployed to production" },
      { id: `${w.id}-h0`, at: new Date(new Date(updatedAt).getTime() - 30 * 86_400_000).toISOString(), version: "v1.0.0-alpha", note: "Widget created" },
    ],
    ...w,
  };
};

export const INITIAL_WIDGETS: Widget[] = [
  seed({ id: "WID-FIN-8821", name: "Financial Pulse Chart", type: "Interactive Chart", status: "Published", version: "v4.2.1-stable", title: "Revenue Velocity Matrix", subtitle: "Global Stream 772", description: "Streams weekly revenue velocity across every connected product.", tags: ["Priority: High", "Finance"], dashboards: 12, products: 3, usage: 14882, engagement: 68.4, sessionDepthMin: 4.2, updatedAt: hoursAgo(24 * 30), quickNav: true }),
  seed({ id: "WID-SYS-1042", name: "User Activity Log", type: "Data Grid", status: "Active", version: "v1.1.0-RC1", color: "#3B82F6", dataSource: "User-Events-Firehose", refresh: "Every 30 seconds", dashboards: 4, products: 1, usage: 6210, engagement: 51.2, sessionDepthMin: 3.1, updatedAt: hoursAgo(24 * 12), visibility: "Enterprise", environments: ["Enterprise"] }),
  seed({ id: "WID-UI-5520", name: "Theme Configurator", type: "Configuration Tool", status: "Draft", version: "v0.8.4-alpha", color: "#10B981", dataSource: "Theme-Registry", refresh: "Manual", realtime: false, updatedAt: hoursAgo(3), visibility: "Founder" }),
  seed({ id: "WID-FIN-2209", name: "KPI Strip Compact", type: "KPI Metric", status: "Published", version: "v2.0.0-stable", dataSource: "Revenue-Ledger-Primary", dashboards: 19, products: 5, usage: 22340, engagement: 72.9, sessionDepthMin: 2.4, updatedAt: hoursAgo(24 * 40) }),
  seed({ id: "WID-SYS-3308", name: "Activity Feed", type: "Event Timeline", status: "Published", version: "v3.1.2-stable", color: "#3B82F6", dataSource: "User-Events-Firehose", dashboards: 9, products: 2, usage: 9804, engagement: 44.7, sessionDepthMin: 1.8, updatedAt: hoursAgo(24 * 55) }),
  seed({ id: "WID-FIN-6630", name: "Churn Risk Radar", type: "Interactive Chart", status: "Active", version: "v1.4.0-RC1", color: "#EF4444", dataSource: "User-Events-Firehose", dashboards: 3, products: 1, usage: 2150, engagement: 58.1, sessionDepthMin: 3.7, updatedAt: hoursAgo(20), environments: ["Enterprise"], visibility: "Enterprise" }),
  seed({ id: "WID-SYS-7715", name: "Audit Trail Grid", type: "Data Grid", status: "Published", version: "v2.3.5-stable", dataSource: "Audit-Log-Archive", refresh: "Every 5 minutes", dashboards: 7, products: 2, usage: 4390, engagement: 39.5, sessionDepthMin: 5.6, updatedAt: hoursAgo(24 * 8), visibility: "Founder" }),
  seed({ id: "WID-UI-4401", name: "Layout Density Toggle", type: "Configuration Tool", status: "Published", version: "v1.0.3-stable", dataSource: "Theme-Registry", refresh: "Manual", realtime: false, dashboards: 22, products: 6, usage: 30112, engagement: 12.3, sessionDepthMin: 0.6, updatedAt: hoursAgo(24 * 90) }),
  seed({ id: "WID-FIN-9051", name: "Reflection Score Gauge", type: "KPI Metric", status: "Draft", version: "v0.3.0-alpha", color: "#10B981", dataSource: "", updatedAt: hoursAgo(26), environments: ["Consumer"], visibility: "Consumer" }),
  seed({ id: "WID-SYS-2280", name: "Session Timeline", type: "Event Timeline", status: "Active", version: "v0.9.2-RC1", dataSource: "User-Events-Firehose", dashboards: 2, products: 1, usage: 880, engagement: 61.0, sessionDepthMin: 6.2, updatedAt: hoursAgo(24 * 4), environments: ["Consumer"] }),
  seed({ id: "WID-FIN-3177", name: "Subscription MRR Trend", type: "Interactive Chart", status: "Published", version: "v3.0.1-stable", color: "#3B82F6", dataSource: "Revenue-Ledger-Primary", refresh: "Hourly", dashboards: 15, products: 4, usage: 17602, engagement: 64.8, sessionDepthMin: 3.3, updatedAt: hoursAgo(24 * 21) }),
  seed({ id: "WID-UI-6602", name: "Notification Rules Editor", type: "Configuration Tool", status: "Active", version: "v1.2.0-RC1", dataSource: "Theme-Registry", refresh: "Manual", realtime: false, dashboards: 1, products: 1, usage: 312, engagement: 22.4, sessionDepthMin: 2.2, updatedAt: hoursAgo(24 * 2), visibility: "Founder" }),
  seed({ id: "WID-SYS-8890", name: "Enterprise Seat Table", type: "Data Grid", status: "Published", version: "v1.6.4-stable", color: "#3B82F6", dataSource: "Revenue-Ledger-Primary", refresh: "Daily", dashboards: 6, products: 1, usage: 5120, engagement: 47.6, sessionDepthMin: 4.9, updatedAt: hoursAgo(24 * 33), environments: ["Enterprise"], visibility: "Enterprise" }),
];

/** Platform-wide figures shown in the summary cards (the table holds a sample). */
export const WIDGET_TOTALS = {
  total: "142",
  newThisWeek: "+8 new this week",
  active: "128",
  deploymentRate: "90.1% deployment rate",
  published: "115",
  recentlyUpdated: "12",
  draft: "14",
  mostUsed: "Data Table V4",
  categories: "8",
  dashboardsLinked: "42",
};
