export const ANALYTICS_PATH = "/founder/analytics-insights";
export const ANALYTICS_RANGE_EVENT = "founder:analytics:range";
export const ANALYTICS_EXPORT_EVENT = "founder:analytics:export";

export const ANALYTICS_WINDOWS = ["Last 30 Days", "6 Months", "1 Year"] as const;
export type AnalyticsWindow = (typeof ANALYTICS_WINDOWS)[number];
