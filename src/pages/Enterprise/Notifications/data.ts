export type NotifCategory =
  | "Assessment"
  | "Report"
  | "Invitation"
  | "Participation"
  | "Employee"
  | "System"
  | "Organization";

export type NotifPriority = "Critical" | "High" | "Medium" | "Low";

export type EnterpriseNotification = {
  id: string;
  title: string;
  body: string;
  category: NotifCategory;
  priority: NotifPriority;
  datetime: string;
  unread: boolean;
  letter: string;
};

export const NOTIF_FILTERS = [
  { key: "all", label: "All", count: 148 },
  { key: "unread", label: "Unread", count: 18 },
  { key: "read", label: "Read", count: 130 },
] as const;

export const NOTIF_CATEGORIES = [
  "Assessment",
  "Employee",
  "Invitation",
  "Report",
  "Participation",
  "System",
] as const;

export const NOTIFICATION_ROWS: EnterpriseNotification[] = [
  {
    id: "n1",
    title: "Assessment Completed",
    body: "MindState™ Reflection submitted by Sarah Chen",
    category: "Assessment",
    priority: "High",
    datetime: "Today 10:15 AM",
    unread: true,
    letter: "A",
  },
  {
    id: "n2",
    title: "New Report Available",
    body: "Q2 2026 Organizational Culture Report is ready",
    category: "Report",
    priority: "High",
    datetime: "Today 09:30 AM",
    unread: true,
    letter: "R",
  },
  {
    id: "n3",
    title: "Invitation Accepted",
    body: "James Robertson accepted MindState™ invitation",
    category: "Invitation",
    priority: "Medium",
    datetime: "Today 08:45 AM",
    unread: true,
    letter: "I",
  },
  {
    id: "n4",
    title: "Participation Below Target",
    body: "Engineering dept at 61% — target 80%",
    category: "Participation",
    priority: "High",
    datetime: "Today 08:00 AM",
    unread: true,
    letter: "P",
  },
  {
    id: "n5",
    title: "Assessment Deadline Near",
    body: "Leadership Alignment™ closes in 2 days",
    category: "Assessment",
    priority: "Critical",
    datetime: "Yesterday 5:30 PM",
    unread: true,
    letter: "A",
  },
  {
    id: "n6",
    title: "Report Ready",
    body: "PDF generated for Org Readiness™ Q3 2025",
    category: "Report",
    priority: "Medium",
    datetime: "Yesterday 3:12 PM",
    unread: false,
    letter: "R",
  },
  {
    id: "n7",
    title: "Employee Joined",
    body: "Tyler Nguyen joined Operations department",
    category: "Employee",
    priority: "Low",
    datetime: "Yesterday 2:00 PM",
    unread: false,
    letter: "E",
  },
  {
    id: "n8",
    title: "Security Alert",
    body: "New login from unrecognized device detected",
    category: "System",
    priority: "Critical",
    datetime: "Yesterday 11:44 AM",
    unread: true,
    letter: "S",
  },
  {
    id: "n9",
    title: "Reflection Assigned",
    body: "MindState™ assigned to 42 employees",
    category: "Organization",
    priority: "Medium",
    datetime: "Jun 1, 4:20 PM",
    unread: false,
    letter: "O",
  },
  {
    id: "n10",
    title: "Invitation Expired",
    body: "3 invitations expired for Finance dept",
    category: "Invitation",
    priority: "High",
    datetime: "Jun 1, 2:10 PM",
    unread: false,
    letter: "I",
  },
  {
    id: "n11",
    title: "Quarterly Report Published",
    body: "QCV™ Q1–Q2 2026 comparison report published",
    category: "Report",
    priority: "High",
    datetime: "May 30, 11:00 AM",
    unread: false,
    letter: "R",
  },
  {
    id: "n12",
    title: "Employee Completed Assessment",
    body: "Patricia Walsh completed Leadership Alignment™",
    category: "Employee",
    priority: "Low",
    datetime: "May 29, 3:45 PM",
    unread: false,
    letter: "E",
  },
  {
    id: "n13",
    title: "Scheduled Maintenance",
    body: "Platform maintenance: Jun 10, 2:00–4:00 AM",
    category: "System",
    priority: "Medium",
    datetime: "May 28, 9:00 AM",
    unread: false,
    letter: "S",
  },
  {
    id: "n14",
    title: "Participation Rate Increased",
    body: "Overall participation rose to 73% (+8.4%)",
    category: "Participation",
    priority: "Low",
    datetime: "May 27, 6:15 PM",
    unread: false,
    letter: "P",
  },
  {
    id: "n15",
    title: "Organization Settings Updated",
    body: "Notification preferences updated by Admin",
    category: "Organization",
    priority: "Low",
    datetime: "May 26, 1:30 PM",
    unread: false,
    letter: "O",
  },
];

export const categoryStyle: Record<
  NotifCategory,
  { badge: string; avatar: string }
> = {
  Assessment: {
    badge:
      "bg-[rgba(16,183,186,0.1)] border-[rgba(16,183,186,0.2)] text-[#10B7BA]",
    avatar:
      "bg-[rgba(16,183,186,0.2)] border-[rgba(16,183,186,0.3)] text-[#10B7BA]",
  },
  Report: {
    badge:
      "bg-[rgba(251,191,36,0.1)] border-[rgba(251,191,36,0.2)] text-[#FBBF24]",
    avatar:
      "bg-[rgba(251,191,36,0.2)] border-[rgba(251,191,36,0.3)] text-[#FBBF24]",
  },
  Invitation: {
    badge:
      "bg-[rgba(59,130,246,0.1)] border-[rgba(59,130,246,0.2)] text-[#60A5FA]",
    avatar:
      "bg-[rgba(59,130,246,0.2)] border-[rgba(59,130,246,0.3)] text-[#60A5FA]",
  },
  Participation: {
    badge:
      "bg-[rgba(168,85,247,0.1)] border-[rgba(168,85,247,0.2)] text-[#C084FC]",
    avatar:
      "bg-[rgba(168,85,247,0.2)] border-[rgba(168,85,247,0.3)] text-[#C084FC]",
  },
  Employee: {
    badge:
      "bg-[rgba(34,197,94,0.1)] border-[rgba(34,197,94,0.2)] text-[#22C55E]",
    avatar:
      "bg-[rgba(34,197,94,0.2)] border-[rgba(34,197,94,0.3)] text-[#22C55E]",
  },
  System: {
    badge:
      "bg-[rgba(239,68,68,0.1)] border-[rgba(239,68,68,0.2)] text-[#F87171]",
    avatar:
      "bg-[rgba(239,68,68,0.2)] border-[rgba(239,68,68,0.3)] text-[#F87171]",
  },
  Organization: {
    badge: "bg-white/5 border-white/10 text-white/60",
    avatar: "bg-white/10 border-white/15 text-white/70",
  },
};

export const priorityStyle: Record<NotifPriority, string> = {
  Critical: "bg-[rgba(239,68,68,0.1)] text-[#F87171]",
  High: "bg-[rgba(251,191,36,0.1)] text-[#FBBF24]",
  Medium: "bg-[rgba(59,130,246,0.1)] text-[#60A5FA]",
  Low: "bg-white/5 text-white/50",
};
