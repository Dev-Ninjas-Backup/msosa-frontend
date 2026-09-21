import {
  BookOpen,
  FileSpreadsheet,
  Heart,
  Infinity as InfinityIcon,
  Leaf,
  Receipt,
  Share2,
  Shield,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import avatar1 from "@/assets/enterprise/avatar-1.jpg";
import avatar2 from "@/assets/enterprise/avatar-2.jpg";
import avatar3 from "@/assets/enterprise/avatar-3.jpg";
import avatar4 from "@/assets/enterprise/avatar-4.jpg";

export const KPIS = [
  { label: "Employees", value: "145", delta: "5.2%", up: true, icon: Users },
  {
    label: "Active Participants",
    value: "98",
    delta: "8.3%",
    up: true,
    icon: UserPlus,
  },
  {
    label: "Completed",
    value: "112",
    delta: "12.4%",
    up: true,
    icon: BookOpen,
  },
  {
    label: "Pending",
    value: "33",
    delta: "2.1%",
    up: false,
    icon: FileSpreadsheet,
  },
] as const;

export const EMPLOYEE_BREAKDOWN = [
  { label: "Total Employees", value: 247, pct: 100, color: "#FFFFFF" },
  { label: "Invited", value: 198, pct: 80, color: "#FBBF24" },
  { label: "Accepted", value: 156, pct: 63, color: "#2DD4BF" },
  { label: "Pending", value: 42, pct: 17, color: "#FB923C" },
  { label: "Suspended", value: 8, pct: 3, color: "#F87171" },
] as const;

export const BLUEPRINTS = [
  {
    name: "MindState™ Reflection",
    status: "Active",
    action: "View",
    to: "/enterprise/blueprint-management",
  },
  {
    name: "Leadership Alignment™",
    status: "Assigned",
    action: "View",
    to: "/enterprise/blueprint-management",
  },
  {
    name: "Org Readiness™",
    status: "Available",
    action: "Assign",
    to: "/enterprise/blueprint-management",
  },
] as const;

export type ReportStatus = "Ready" | "Archived" | "Pending";

export const REPORTS = [
  {
    title: "MindState™ Q1 2026",
    meta: "Completed Mar 31 · v1.2",
    status: "Ready" as ReportStatus,
  },
  {
    title: "Leadership Alignment™ Q4 2025",
    meta: "Completed Dec 31 · v2.0",
    status: "Ready" as ReportStatus,
  },
  {
    title: "Org Readiness™ Q3 2025",
    meta: "Completed Sep 30 · v1.0",
    status: "Archived" as ReportStatus,
  },
  {
    title: "Q2 2026 Report",
    meta: "In progress · Q2 2026",
    status: "Pending" as ReportStatus,
  },
];

export const ACTIVITY = [
  { title: "John completed reflection", time: "5 min ago", avatar: avatar1 },
  { title: "Report approved by admin", time: "20 min ago", avatar: avatar2 },
  { title: "Assessment launched", time: "40 min ago", avatar: avatar3 },
  {
    title: "Employee invited to platform",
    time: "1 hr ago",
    avatar: avatar4,
  },
  { title: "Assessment launched", time: "4 hrs ago", avatar: avatar1 },
] as const;

export const QUICK_ACTIONS = [
  {
    label: "Add Employee",
    to: "/enterprise/employee-management",
    icon: UserPlus,
  },
  {
    label: "Invite Employee",
    to: "/enterprise/invitation-management",
    icon: Share2,
  },
  {
    label: "Assign Reflection",
    to: "/enterprise/blueprint-management",
    icon: BookOpen,
  },
  { label: "View Reports", to: "/enterprise/reports", icon: FileSpreadsheet },
  { label: "View QCV™", to: "/enterprise/qcv", icon: Zap },
  { label: "Manage Billing", to: "/enterprise/billing", icon: Receipt },
] as const;

export const QCV_DATA = [
  { axis: "Business Growth", q2: 92, q1: 78 },
  { axis: "Leadership Growth", q2: 85, q1: 70 },
  { axis: "Employee Growth", q2: 88, q1: 74 },
  { axis: "Team Growth", q2: 80, q1: 68 },
  { axis: "Innovation Growth", q2: 90, q1: 72 },
];

export const TRUST = [
  {
    title: "Private & Secure",
    body: "Your reflections are encrypted and never shared.",
    icon: Shield,
  },
  {
    title: "Emotionally Intelligent",
    body: "Designed to understand your values with depth.",
    icon: Heart,
  },
  {
    title: "Built For Growth",
    body: "Gain clarity today. Experience deep personal transformation over time.",
    icon: Leaf,
  },
  {
    title: "Always With You",
    body: "Your continuity never ends. This sacred space remains open for you.",
    icon: InfinityIcon,
  },
] as const;

export const reportStatusClass = (status: ReportStatus) =>
  status === "Ready"
    ? "bg-emerald-500/15 text-emerald-300"
    : status === "Archived"
      ? "bg-white/10 text-secondary-text"
      : "bg-orange-500/15 text-orange-300";

export const blueprintStatusClass = (status: string) =>
  status === "Active"
    ? "bg-teal-500/15 text-teal-300"
    : status === "Assigned"
      ? "bg-[#FBBF24]/15 text-[#FBBF24]"
      : "bg-white/10 text-secondary-text";
