export type MemberNoticeTag =
  | "ACTION REQUIRED"
  | "PINNED"
  | "REPORTS"
  | "CONTINUUM"
  | "ORGANIZATION"
  | "SYSTEM";

export type MemberNoticePriority = "High" | "Medium" | "Low";

export type MemberNotice = {
  id: string;
  title: string;
  shortTitle: string;
  body: string;
  preview: string;
  time: string;
  ago: string;
  priority: MemberNoticePriority;
  tags: MemberNoticeTag[];
  unread: boolean;
  icon: "alert" | "report" | "milestone" | "announce" | "system";
  actionLabel?: string;
  actionHref?: string;
  actionVariant?: "primary" | "secondary" | "ghost";
};

const SEED: MemberNotice[] = [
  {
    id: "reflection-due",
    title: "Reflection Due Soon: Leadership Growth",
    shortTitle: "Reflection Due Soon",
    body: "Your Q3 Leadership Reflection milestone is approaching its deadline in 2 days. Complete your self-reflection to stay on track for the annual review cycle.",
    preview: "Your Q3 Leadership Reflection milestone is approaching its deadline in 2 days.",
    time: "Today, 09:45 AM",
    ago: "2m ago",
    priority: "High",
    tags: ["ACTION REQUIRED", "PINNED"],
    unread: true,
    icon: "alert",
    actionLabel: "Take Action",
    actionHref: "reflection-room",
    actionVariant: "primary",
  },
  {
    id: "report-ready",
    title: "Report Ready: Cycle 2 Leadership Development",
    shortTitle: "Report Ready",
    body: "The comprehensive analysis of the Cycle 2 Leadership program has been finalized. Your personal growth metrics are now available for review.",
    preview: "Cycle 2 Leadership program analysis has been finalized and is ready for review.",
    time: "Yesterday, 04:20 PM",
    ago: "1h ago",
    priority: "Medium",
    tags: ["REPORTS"],
    unread: true,
    icon: "report",
    actionLabel: "View Report",
    actionHref: "report",
    actionVariant: "secondary",
  },
  {
    id: "milestone",
    title: "New Milestone Achieved: 5 Reflections Completed",
    shortTitle: "New Milestone Achieved",
    body: "Congratulations Sarah! You've maintained a 5-week streak of deep reflections. This milestone has been added to your Employee Continuum™ profile.",
    preview: "Congratulations Sarah! You've maintained a 5-week streak of deep reflections.",
    time: "Oct 24, 11:30 AM",
    ago: "4h ago",
    priority: "Medium",
    tags: ["CONTINUUM"],
    unread: true,
    icon: "milestone",
    actionLabel: "Dismiss",
    actionVariant: "ghost",
  },
  {
    id: "hr",
    title: "HR Announcement: New Training Schedule",
    shortTitle: "HR Announcement",
    body: "ABC Healthcare has released the new mandatory training modules for the upcoming quarter. Please review and sync your calendar.",
    preview: "ABC Healthcare has released the new mandatory training modules for the upcoming quarter.",
    time: "Oct 22, 09:15 AM",
    ago: "Yesterday",
    priority: "Low",
    tags: ["ORGANIZATION"],
    unread: false,
    icon: "announce",
    actionLabel: "Details",
    actionVariant: "ghost",
  },
  {
    id: "platform",
    title: "Platform Update: Version 2.4 Now Live",
    shortTitle: "Platform Update v2.4",
    body: "We've introduced enhanced analytics in Reports and a smoother interface for Reflections. Explore the new features now.",
    preview: "We've introduced enhanced analytics and a smoother interface for Reflections.",
    time: "Oct 20, 02:45 PM",
    ago: "Yesterday",
    priority: "Low",
    tags: ["SYSTEM"],
    unread: false,
    icon: "system",
    actionLabel: "What's New",
    actionVariant: "ghost",
  },
];

const MODAL_IDS = ["reflection-due", "report-ready", "milestone", "platform"];

let notices = SEED;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());

export const subscribeMemberNotices = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getMemberNotices = () => notices;

export const memberUnreadCount = () => notices.filter((notice) => notice.unread).length;

export const memberModalNotices = () =>
  MODAL_IDS.map((id) => notices.find((notice) => notice.id === id)).filter(
    (notice): notice is MemberNotice => Boolean(notice)
  );

export const markMemberNoticeRead = (id: string) => {
  notices = notices.map((notice) => (notice.id === id ? { ...notice, unread: false } : notice));
  emit();
};

export const markAllMemberNoticesRead = () => {
  notices = notices.map((notice) => ({ ...notice, unread: false }));
  emit();
};

export const dismissMemberNotice = (id: string) => {
  notices = notices.filter((notice) => notice.id !== id);
  emit();
};

export const archiveAllMemberNotices = () => {
  notices = [];
  emit();
};
