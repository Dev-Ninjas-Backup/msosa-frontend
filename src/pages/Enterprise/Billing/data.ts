import {
  Building2,
  CalendarDays,
  CheckCircle2,
  FileText,
  Receipt,
  Users,
} from "lucide-react";

export const BILLING_KPIS = [
  {
    label: "Current Subscription",
    valueLines: ["Enterprise", "Professional"],
    badge: "ENTERPRISE",
    badgeTone: "gold" as const,
    icon: "building",
    iconTone: "gold" as const,
    sub: "",
    subTone: "muted" as const,
  },
  {
    label: "Subscription Status",
    valueLines: ["Active"],
    badge: "ACTIVE",
    badgeTone: "teal" as const,
    badgeDot: true,
    icon: "check",
    iconTone: "teal" as const,
    sub: "",
    subTone: "muted" as const,
  },
  {
    label: "Renewal Date",
    valueLines: ["Dec 31, 2026"],
    badge: "38 DAYS",
    badgeTone: "gold" as const,
    icon: "calendar",
    iconTone: "gray" as const,
    sub: "38 days remaining",
    subTone: "gold" as const,
  },
  {
    label: "Active Licenses",
    valueLines: ["85 / 100 Seats"],
    badge: "85%",
    badgeTone: "teal" as const,
    icon: "users",
    iconTone: "teal" as const,
    sub: "",
    subTone: "muted" as const,
    progress: 85,
  },
  {
    label: "Monthly Cost",
    valueLines: ["$499 / month"],
    badge: null,
    badgeTone: "gray" as const,
    icon: "receipt",
    iconTone: "gray" as const,
    sub: "Annual billing cycle",
    subTone: "muted" as const,
  },
  {
    label: "Next Invoice",
    valueLines: ["$499"],
    badge: "DUE SOON",
    badgeTone: "orange" as const,
    icon: "file",
    iconTone: "gold" as const,
    sub: "Due in 14 Days",
    subTone: "orange" as const,
  },
] as const;

export const SUBSCRIPTION_DETAILS = [
  {
    label: "Current Plan",
    value: "Enterprise Professional",
    planBadge: true,
  },
  { label: "Active Since", value: "January 1, 2024" },
  { label: "Renewal Date", value: "Dec 31, 2026", gold: true },
  { label: "Billing Cycle", value: "Annual" },
  { label: "Payment Status", value: "Paid", paid: true },
  { label: "Organization ID", value: "ORG-2024-FAR-0041", muted: true },
  { label: "Subscription ID", value: "SUB-ENT-9812-PRO", muted: true },
] as const;

export const USAGE_METRICS = [
  {
    label: "Employee Seats",
    value: "85 / 100",
    usedLabel: "85% used",
    usedTone: "teal" as const,
    rightLabel: "15 remaining",
    barPct: 85,
  },
  {
    label: "Active Assessments",
    value: "23 / 50",
    usedLabel: "46% used",
    usedTone: "teal" as const,
    rightLabel: "27 remaining",
    barPct: 46,
  },
  {
    label: "Completed Reports",
    value: "156",
    usedLabel: "This cycle",
    usedTone: "gold" as const,
    rightLabel: "All time: 412",
    barPct: 78,
  },
] as const;

export const INVOICE_HISTORY = [
  {
    id: "INV-2026-042",
    date: "Jun 1, 2026",
    description: "Enterprise Professional · Q2",
    amount: "$499.00",
    status: "Pending" as const,
  },
  {
    id: "INV-2026-031",
    date: "Mar 1, 2026",
    description: "Enterprise Professional · Q1",
    amount: "$499.00",
    status: "Paid" as const,
  },
  {
    id: "INV-2025-126",
    date: "Feb 1, 2026",
    description: "Enterprise Professional · Feb",
    amount: "$499.00",
    status: "Paid" as const,
  },
  {
    id: "INV-2025-094",
    date: "Sep 30, 2025",
    description: "Professional Plan · Q3 2025",
    amount: "$299.00",
    status: "Archived" as const,
  },
];

export const kpiIcon = (icon: string) => {
  switch (icon) {
    case "check":
      return CheckCircle2;
    case "calendar":
      return CalendarDays;
    case "users":
      return Users;
    case "receipt":
      return Receipt;
    case "file":
      return FileText;
    default:
      return Building2;
  }
};
