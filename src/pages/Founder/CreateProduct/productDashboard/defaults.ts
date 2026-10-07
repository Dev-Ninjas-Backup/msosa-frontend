import type {
  DashboardLayoutTemplate,
  ProductDashboardConfig,
  ProductDashboardWidget,
  ProductWidgetStyle,
} from "./types";

export const DEFAULT_WIDGET_STYLE = (): ProductWidgetStyle => ({
  fontFamily: "Playfair Display",
  fontSize: 14,
  titleColor: "#FFFFFF",
  descriptionColor: "#A3A3A3",
  backgroundColor: "#121212",
  borderColor: "rgba(255,255,255,0.1)",
  borderWidth: 1,
  borderRadius: 12,
  padding: 16,
  gap: 8,
  backgroundImage: "",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundOverlay: 0.45,
  backgroundCrop: { x: 50, y: 50, scale: 1 },
});

export const STARTER_LAYOUT_TEMPLATES: DashboardLayoutTemplate[] = [
  {
    id: "dashboard-1",
    name: "Dashboard 1",
    preview: "one",
    isStarter: true,
    slots: [
      { id: "s1", span: "full" },
      { id: "s2", span: "half" },
      { id: "s3", span: "half" },
      { id: "s4", span: "sidebar" },
      { id: "s5", span: "sidebar" },
    ],
  },
  {
    id: "dashboard-2",
    name: "Dashboard 2",
    preview: "two",
    isStarter: true,
    slots: [
      { id: "s1", span: "full" },
      { id: "s2", span: "half" },
      { id: "s3", span: "third" },
      { id: "s4", span: "third" },
      { id: "s5", span: "sidebar" },
      { id: "s6", span: "sidebar" },
    ],
  },
  {
    id: "dashboard-3",
    name: "Dashboard 3",
    preview: "three",
    isStarter: true,
    slots: [
      { id: "s1", span: "full" },
      { id: "s2", span: "half" },
      { id: "s3", span: "sidebar" },
    ],
  },
  {
    id: "dashboard-4",
    name: "Dashboard 4",
    preview: "four",
    isStarter: true,
    slots: [
      { id: "s1", span: "half" },
      { id: "s2", span: "half" },
      { id: "s3", span: "full" },
      { id: "s4", span: "half" },
    ],
  },
];

export const FONT_OPTIONS = [
  "Playfair Display",
  "Georgia",
  "Merriweather",
  "Source Serif Pro",
  "IBM Plex Sans",
  "DM Sans",
] as const;

const instanceId = () =>
  `pdw-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

/** Seed widgets from published Widget Library ids for a new product dashboard */
export const defaultProductWidgets = (
  libraryIds: string[] = [
    "WID-FIN-2209",
    "WID-SYS-3308",
    "WID-FIN-8821",
    "WID-UI-4401",
  ]
): ProductDashboardWidget[] =>
  libraryIds.map((widgetLibraryId, i) => ({
    id: instanceId() + i,
    widgetLibraryId,
    title: "",
    enabled: true,
    style: DEFAULT_WIDGET_STYLE(),
  }));

export const emptyProductDashboard = (
  templateId = "dashboard-1"
): ProductDashboardConfig => ({
  templateId,
  widgets: defaultProductWidgets(),
  updatedAt: new Date().toISOString(),
});

export const cloneDashboard = (
  config: ProductDashboardConfig
): ProductDashboardConfig => ({
  templateId: config.templateId,
  updatedAt: config.updatedAt,
  widgets: config.widgets.map((w) => ({
    ...w,
    style: {
      ...w.style,
      backgroundCrop: { ...w.style.backgroundCrop },
    },
  })),
});

export const newWidgetInstance = (
  widgetLibraryId: string,
  title = ""
): ProductDashboardWidget => ({
  id: instanceId(),
  widgetLibraryId,
  title,
  enabled: true,
  style: DEFAULT_WIDGET_STYLE(),
});
