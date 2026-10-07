import type { VisibilityRule } from "@/pages/Founder/WidgetLibrary/data";

export type LayoutPreviewKind = "one" | "two" | "three" | "four" | "custom";

export type LayoutSlotSpan = "full" | "half" | "third" | "sidebar";

export type LayoutSlot = {
  id: string;
  span: LayoutSlotSpan;
};

export type DashboardLayoutTemplate = {
  id: string;
  name: string;
  preview: LayoutPreviewKind;
  slots: LayoutSlot[];
  /** Starter templates Dashboard 1–4 */
  isStarter: boolean;
};

export type WidgetBackgroundCrop = {
  x: number;
  y: number;
  scale: number;
};

export type ProductWidgetStyle = {
  fontFamily: string;
  fontSize: number;
  titleColor: string;
  descriptionColor: string;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  padding: number;
  gap: number;
  backgroundImage: string;
  backgroundPosition: "center" | "top" | "bottom" | "left" | "right";
  backgroundSize: "cover" | "contain" | "auto";
  backgroundOverlay: number;
  backgroundCrop: WidgetBackgroundCrop;
};

export type ProductDashboardWidget = {
  /** Instance id on this product dashboard */
  id: string;
  /** Widget Library™ source id */
  widgetLibraryId: string;
  title: string;
  enabled: boolean;
  style: ProductWidgetStyle;
  /** Optional override; defaults to Widget Library visibility for role-based views */
  visibility?: VisibilityRule;
};

export type ProductDashboardConfig = {
  templateId: string;
  widgets: ProductDashboardWidget[];
  updatedAt: string;
};

export type ProductAudience =
  | "Founder Account"
  | "Enterprise Admin"
  | "Consumer User"
  | "Employee User";
