import {
  CalendarDays,
  CheckCircle2,
  FileText,
  Target,
  TrendingUp,
} from "lucide-react";

export const QCV_META = [
  "Organization: Encounters Corporation",
  "Current Quarter: Q3 2026",
  "Previous Quarter: Q2 2026",
  "Comparison Period: Q2–Q3 2026",
  "Last Updated: Jun 2, 2026",
] as const;

export const QCV_KPIS = [
  {
    label: "Current Quarter",
    value: "Q3 2026",
    sub: "Jul — Sep, 2026",
    badge: "Active",
    badgeTone: "teal" as const,
    icon: "calendar",
  },
  {
    label: "Previous Quarter",
    value: "Q2 2026",
    sub: "Apr — Jun, 2026",
    badge: "Closed",
    badgeTone: "gray" as const,
    icon: "calendar",
  },
  {
    label: "Reports Compared",
    value: "18 Reports",
    sub: "vs last cycle",
    badge: "+2.1%",
    badgeTone: "gold" as const,
    icon: "file",
  },
  {
    label: "Overall Progress",
    value: "+12%",
    sub: "vs last quarter",
    badge: "+12%",
    badgeTone: "blue" as const,
    icon: "trend",
  },
  {
    label: "Improvement Score",
    value: "84%",
    sub: "vs last cycle",
    badge: "5.2%↑",
    badgeTone: "gold" as const,
    icon: "target",
  },
  {
    label: "Comparison Status",
    value: "Done",
    sub: "Q2–Q3 2026",
    badge: "Completed",
    badgeTone: "teal" as const,
    icon: "check",
  },
] as const;

export const RADAR_COMPARE = [
  { axis: "Business Growth", q3: 90, q2: 78 },
  { axis: "Leadership Growth", q3: 86, q2: 72 },
  { axis: "Employee Growth", q3: 88, q2: 74 },
  { axis: "Team Growth", q3: 82, q2: 70 },
  { axis: "Innovation Growth", q3: 91, q2: 75 },
];

export const RADAR_OVERVIEW = [
  { axis: "Business Growth", q2: 87, q1: 72 },
  { axis: "Leadership Growth", q2: 84, q1: 70 },
  { axis: "Employee Growth", q2: 86, q1: 68 },
  { axis: "Team Growth", q2: 80, q1: 66 },
  { axis: "Innovation Growth", q2: 89, q1: 71 },
];

export const TREND_METRICS = [
  {
    title: "Participation Rate",
    from: "72%",
    to: "88%",
    delta: "+16%",
    fromBar: 72,
    toBar: 88,
  },
  {
    title: "Assessment Completion",
    from: "68%",
    to: "91%",
    delta: "+23%",
    fromBar: 68,
    toBar: 91,
  },
  {
    title: "Organizational Progress",
    from: "Good",
    to: "Very Good",
    delta: "↑ Level",
    fromBar: 60,
    toBar: 84,
    fromLabel: "Good",
    toLabel: "V.Gd",
  },
] as const;

export const TIMELINE = [
  { quarter: "Q1 2026", range: "Jan–Mar", badge: "72%", state: "done" as const },
  { quarter: "Q2 2026", range: "Apr–Jun", badge: "84%", state: "done" as const },
  { quarter: "Q3 2026", range: "Jul–Sep", badge: "Active", state: "current" as const },
  { quarter: "Q4 2026", range: "Oct–Dec", badge: "Pending", state: "pending" as const },
];

export const RECOMMENDATIONS = [
  {
    name: "Leadership Communication",
    status: "Recommended",
    progress: "In Progress",
    tone: "gold" as const,
  },
  {
    name: "Team Collaboration",
    status: "In Progress",
    progress: "Improved",
    tone: "teal" as const,
  },
  {
    name: "Workflow Optimization",
    status: "Planned",
    progress: "Completed",
    tone: "green" as const,
  },
] as const;

export const GROWTH_CARDS = [
  { label: "Assessment Completion", value: "+23%", delta: "+23%", tone: "teal" },
  { label: "Department Progress", value: "+18%", delta: "+18%", tone: "gold" },
  {
    label: "Historical Recommendations",
    value: "+31%",
    delta: "+31%",
    tone: "blue",
  },
] as const;

export const ACTIVE_BLUEPRINTS = [
  {
    name: "MindState™ Reflection",
    status: "Active",
    action: "View",
  },
  {
    name: "Leadership Alignment™",
    status: "Assigned",
    action: "View",
  },
  {
    name: "Org Readiness™",
    status: "Available",
    action: "Assign",
  },
] as const;

export const QCV_SIDE_NOTIFS = [
  {
    title: "New Report Ready",
    sub: "MindState™ submitted · 5 min ago",
    unread: true,
  },
  {
    title: "New Report Ready",
    sub: "MindState™ submitted · 5 min ago",
    unread: true,
  },
  {
    title: "New Report Ready",
    sub: "MindState™ submitted · 5 min ago",
    unread: false,
  },
  {
    title: "New Report Ready",
    sub: "MindState™ submitted · 5 min ago",
    unread: false,
  },
] as const;

export const SUMMARY_TEXT =
  "Overall organizational performance has improved significantly compared to the previous quarter. Participation rates increased from 72% to 88%. Assessment completion improved from 68% to 91%. Several previous recommendations have been successfully implemented and the organization shows strong momentum toward its Q4 goals.";

export const kpiIcon = (icon: string) => {
  switch (icon) {
    case "file":
      return FileText;
    case "trend":
      return TrendingUp;
    case "target":
      return Target;
    case "check":
      return CheckCircle2;
    default:
      return CalendarDays;
  }
};
