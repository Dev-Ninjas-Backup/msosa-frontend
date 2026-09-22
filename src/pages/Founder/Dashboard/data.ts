import kpi1 from "./assets/kpi-1.svg";
import kpi2 from "./assets/kpi-2.svg";
import kpi3 from "./assets/kpi-3.svg";
import kpi4 from "./assets/kpi-4.svg";
import kpi5 from "./assets/kpi-5.svg";
import kpi6 from "./assets/kpi-6.svg";
import tabConsumer from "./assets/tab-consumer.svg";
import tabEnterprise from "./assets/tab-enterprise.svg";

export const SOLUTION_TABS = [
  { id: "consumer", label: "Consumer Solutions™", iconSrc: tabConsumer },
  { id: "enterprise", label: "Enterprise", iconSrc: tabEnterprise },
] as const;

export type TrendTone = "up" | "down" | "flat";

export const KPI_CARDS = [
  {
    value: "27",
    label: "Active Products™",
    change: "12.5%",
    tone: "up" as TrendTone,
    iconSrc: kpi1,
  },
  {
    value: "18",
    label: "Organizations™",
    change: "5.6%",
    tone: "flat" as TrendTone,
    iconSrc: kpi2,
  },
  {
    value: "278",
    label: "Founder Protocols™",
    change: "8.3%",
    tone: "up" as TrendTone,
    iconSrc: kpi3,
  },
  {
    value: "12",
    label: "Active Live Exp.™",
    change: "9.1%",
    tone: "down" as TrendTone,
    iconSrc: kpi4,
  },
  {
    value: "46",
    label: "Products Purchased™",
    change: "18.4%",
    tone: "up" as TrendTone,
    iconSrc: kpi5,
  },
  {
    value: "312",
    label: "Reports Generated™",
    change: "22.6%",
    tone: "up" as TrendTone,
    iconSrc: kpi6,
  },
] as const;

export const SNAPSHOT_STATS = [
  { value: "23", label: "New Customers", change: "12.5%", tone: "up" as TrendTone },
  { value: "2", label: "New Organizations", change: "8.3%", tone: "down" as TrendTone },
  { value: "46", label: "Products Purchased", change: "5.6%", tone: "up" as TrendTone },
  { value: "5", label: "Renewals", change: "9.1%", tone: "down" as TrendTone },
  { value: "$2,986", label: "Revenue", change: "18.4%", tone: "down" as TrendTone },
  { value: "18", label: "Reports Pending", change: "18.4%", tone: "down" as TrendTone },
] as const;

export const GROWTH_DATA = [
  { label: "1st Jan", value: 42000 },
  { label: "3d Jan", value: 48000 },
  { label: "5th Jan", value: 51000 },
  { label: "7th Jan", value: 47000 },
  { label: "9th Jan", value: 62000 },
  { label: "11th Jan", value: 58000 },
  { label: "13th Jan", value: 71000 },
  { label: "15th Jan", value: 68000 },
  { label: "17th Jan", value: 79000 },
  { label: "19th Jan", value: 86000 },
  { label: "21th Jan", value: 82000 },
  { label: "23th Jan", value: 94000 },
];

export const PRODUCTS = [
  {
    id: 1,
    name: "Blueprint 1",
    division: "Division 1",
    purchases: 186,
    completion: 82,
    reports: 186,
    revenue: "$6,120",
  },
  {
    id: 2,
    name: "Blueprint 4",
    division: "Division 1",
    purchases: 97,
    completion: 76,
    reports: 97,
    revenue: "$2,450",
  },
  {
    id: 3,
    name: "Blueprint 5",
    division: "Division 1",
    purchases: 58,
    completion: 74,
    reports: 58,
    revenue: "$1,420",
  },
  {
    id: 4,
    name: "Readiness Product 1",
    division: "Division 2",
    purchases: 156,
    completion: 81,
    reports: 156,
    revenue: "$6,860",
  },
  {
    id: 5,
    name: "Readiness Product 2",
    division: "Division 2",
    purchases: 112,
    completion: 80,
    reports: 112,
    revenue: "$4,180",
  },
  {
    id: 6,
    name: "Readiness Product 6",
    division: "Division 2",
    purchases: 71,
    completion: 75,
    reports: 71,
    revenue: "$2,429",
  },
] as const;

export const LINK_ACTIONS = [
  { label: "Create New Link™", to: "/founder/link-center" },
  { label: "Manage Links™", to: "/founder/link-center" },
  { label: "Link Templates™", to: "/founder/link-center" },
  { label: "QR Code Generator™", to: "/founder/link-center" },
] as const;

export const ACTIVITIES = [
  { text: 'New organization "Apex Corp" registered', time: "5 min ago" },
  { text: "Blueprint 1 report generated for user #4821", time: "12 min ago" },
  { text: "Readiness Product 1 purchased — 3 seats", time: "18 min ago" },
  { text: "Protocol #112 updated by admin", time: "25 min ago" },
  { text: "Live Experience session ended", time: "35 min ago" },
] as const;

export const ALERTS = [
  { text: "Storage usage approaching 80% threshold", tone: "warn" as const },
  { text: "API rate limit at 85% for endpoint /reports", tone: "warn" as const },
  { text: "Payment gateway timeout — 3 failed txns", tone: "danger" as const },
  { text: "Email delivery failure for 2 org accounts", tone: "danger" as const },
  { text: "Backup completed successfully", tone: "ok" as const },
  { text: "Platform update v1.0.1 available", tone: "info" as const },
] as const;

export const OPEN_DASHBOARD_SETTINGS_EVENT = "far:open-dashboard-settings";
export const OPEN_LAYOUT_EDIT_EVENT = "far:open-layout-edit";
export const LAYOUT_EDITING_CHANGED_EVENT = "far:layout-editing-changed";
export const LAYOUT_CANCEL_EVENT = "far:layout-cancel";
export const LAYOUT_RESUME_EVENT = "far:layout-resume";
export const LAYOUT_PENDING_KEY = "far-pending-layout-edit";
export const LAYOUT_STORAGE_KEY = "far-founder-dashboard-layout";
export const LAYOUT_PRESET_KEY = "far-founder-dashboard-preset";

export function readLayoutPreset():
  | "dashboard-1"
  | "dashboard-2"
  | "dashboard-3"
  | "dashboard-4" {
  if (typeof window === "undefined") return "dashboard-1";
  const raw = localStorage.getItem(LAYOUT_PRESET_KEY);
  if (
    raw === "dashboard-1" ||
    raw === "dashboard-2" ||
    raw === "dashboard-3" ||
    raw === "dashboard-4"
  ) {
    return raw;
  }
  return "dashboard-1";
}

export function saveLayoutPreset(
  preset: "dashboard-1" | "dashboard-2" | "dashboard-3" | "dashboard-4"
) {
  localStorage.setItem(LAYOUT_PRESET_KEY, preset);
}

export function setLayoutEditingBroadcast(editing: boolean) {
  window.dispatchEvent(
    new CustomEvent(LAYOUT_EDITING_CHANGED_EVENT, { detail: { editing } })
  );
}

export type WidgetCategory = "all" | "analytics" | "progress" | "actions";

export type WidgetTemplate = {
  id: string;
  title: string;
  description: string;
  category: Exclude<WidgetCategory, "all">;
  preview: "chart" | "bars" | "actions" | "ai" | "html" | "log" | "reports" | "resume";
};

export type WidgetInstance = {
  id: string;
  templateId: string;
  title: string;
  enabled: boolean;
  showProgress: boolean;
  enableAi: boolean;
  dataSource: string;
  colors: {
    background: string;
    title: string;
    description: string;
    buttonBg: string;
    buttonText: string;
  };
};

export const WIDGET_TEMPLATES: WidgetTemplate[] = [
  {
    id: "continuum-growth",
    title: "Continuum Growth",
    description:
      "Visualize longitudinal data from your reflection journey over time.",
    category: "analytics",
    preview: "chart",
  },
  {
    id: "active-reflections",
    title: "Active Reflections",
    description:
      "Track progress of your current active coaching and reflection paths.",
    category: "progress",
    preview: "bars",
  },
  {
    id: "quick-actions",
    title: "Quick Actions",
    description:
      "Instantly access common tasks like starting a new Reflection or viewing reports.",
    category: "actions",
    preview: "actions",
  },
  {
    id: "ai-recommendations",
    title: "AI Recommendations",
    description:
      "Personalized MOVR™ AI insights based on your recent activity and patterns.",
    category: "analytics",
    preview: "ai",
  },
  {
    id: "custom-html",
    title: "Custom HTML",
    description:
      "Embed custom markdown or HTML content directly into your dashboard.",
    category: "actions",
    preview: "html",
  },
  {
    id: "activity-log",
    title: "Activity Log",
    description:
      "A chronological list of recent events and updates within your organization.",
    category: "progress",
    preview: "log",
  },
  {
    id: "completed-reports",
    title: "Completed Reports",
    description:
      "A chronological list of recent events and updates within your organization.",
    category: "analytics",
    preview: "reports",
  },
  {
    id: "resume-session",
    title: "Resume Session",
    description:
      "Personalized MOVR™ AI insights based on your recent activity and patterns.",
    category: "actions",
    preview: "resume",
  },
];

export const DEFAULT_WIDGET_COLORS = {
  background: "#000000",
  title: "#FFFFFF",
  description: "#A3A3A3",
  buttonBg: "#fbbf24",
  buttonText: "#000000",
};

/** Core dashboard sections that can be toggled in layout edit mode */
export const CORE_LAYOUT_WIDGETS: WidgetInstance[] = [
  {
    id: "core-kpis",
    templateId: "active-reflections",
    title: "KPI Overview",
    enabled: true,
    showProgress: true,
    enableAi: false,
    dataSource: "Platform Metrics",
    colors: { ...DEFAULT_WIDGET_COLORS },
  },
  {
    id: "core-snapshot",
    templateId: "continuum-growth",
    title: "Business Snapshot",
    enabled: true,
    showProgress: true,
    enableAi: false,
    dataSource: "Business Analytics",
    colors: { ...DEFAULT_WIDGET_COLORS },
  },
  {
    id: "core-growth",
    templateId: "continuum-growth",
    title: "FRC™ Continuum Growth",
    enabled: true,
    showProgress: true,
    enableAi: true,
    dataSource: "Historical Emotional Analysis (HE-A)",
    colors: { ...DEFAULT_WIDGET_COLORS },
  },
  {
    id: "core-performance",
    templateId: "completed-reports",
    title: "Product Performance (MTD)",
    enabled: true,
    showProgress: true,
    enableAi: false,
    dataSource: "Product Metrics",
    colors: { ...DEFAULT_WIDGET_COLORS },
  },
  {
    id: "core-links",
    templateId: "quick-actions",
    title: "Link Center™",
    enabled: true,
    showProgress: false,
    enableAi: false,
    dataSource: "Link Center",
    colors: { ...DEFAULT_WIDGET_COLORS },
  },
  {
    id: "core-health",
    templateId: "activity-log",
    title: "Platform Health",
    enabled: true,
    showProgress: false,
    enableAi: false,
    dataSource: "System Health",
    colors: { ...DEFAULT_WIDGET_COLORS },
  },
  {
    id: "core-activity",
    templateId: "activity-log",
    title: "Recent Activity",
    enabled: true,
    showProgress: false,
    enableAi: false,
    dataSource: "Activity Feed",
    colors: { ...DEFAULT_WIDGET_COLORS },
  },
  {
    id: "core-alerts",
    templateId: "ai-recommendations",
    title: "System Alerts™",
    enabled: true,
    showProgress: false,
    enableAi: true,
    dataSource: "Alerts",
    colors: { ...DEFAULT_WIDGET_COLORS },
  },
  {
    id: "core-ai",
    templateId: "ai-recommendations",
    title: "AI Recommendation",
    enabled: true,
    showProgress: false,
    enableAi: true,
    dataSource: "MOVR™ AI",
    colors: { ...DEFAULT_WIDGET_COLORS },
  },
];

export function readLayoutWidgets(): WidgetInstance[] {
  if (typeof window === "undefined") return CORE_LAYOUT_WIDGETS.map((w) => ({ ...w, colors: { ...w.colors } }));
  try {
    const raw = localStorage.getItem(LAYOUT_STORAGE_KEY);
    if (!raw) return CORE_LAYOUT_WIDGETS.map((w) => ({ ...w, colors: { ...w.colors } }));
    const parsed = JSON.parse(raw) as WidgetInstance[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return CORE_LAYOUT_WIDGETS.map((w) => ({ ...w, colors: { ...w.colors } }));
    }
    return parsed;
  } catch {
    return CORE_LAYOUT_WIDGETS.map((w) => ({ ...w, colors: { ...w.colors } }));
  }
}

export function saveLayoutWidgets(widgets: WidgetInstance[]) {
  localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(widgets));
}
