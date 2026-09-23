export const NOTIFICATIONS_PATH = "/founder/notifications";

export type NoticeFilter = "Reflection Updates" | "Reports" | "Organization" | "System" | "Action Required";
export type NoticePriority = "High Priority" | "Medium Priority" | "Low Priority";

export type FounderNotice = {
  id: string;
  title: string;
  shortTitle: string;
  body: string;
  preview: string;
  time: string;
  ago: string;
  priority?: NoticePriority;
  tag?: string;
  pinned?: boolean;
  action: string;
  filter: NoticeFilter;
  read: boolean;
  sort: number;
};

const SEED: FounderNotice[] = [
  {
    id: "reflection-due",
    title: "Reflection Due Soon: Leadership Growth",
    shortTitle: "Reflection Due Soon",
    body: "Your Q3 Leadership Reflection milestone is approaching its deadline in 2 days. Complete your self-reflection to stay on track for the annual review cycle.",
    preview: "Your Q3 Leadership Reflection milestone is approaching its deadline in 2 days.",
    time: "Today, 09:45 AM",
    ago: "2m ago",
    priority: "High Priority",
    tag: "Action Required",
    pinned: true,
    action: "Take Action",
    filter: "Action Required",
    read: false,
    sort: 5,
  },
  {
    id: "report-ready",
    title: "Report Ready: Cycle 2 Leadership Development",
    shortTitle: "Report Ready",
    body: "The comprehensive analysis of the Cycle 2 Leadership program has been finalized. Your personal growth metrics are now available for review.",
    preview: "Cycle 2 Leadership program analysis has been finalized and is ready for review.",
    time: "Yesterday, 04:20 PM",
    ago: "1h ago",
    priority: "Medium Priority",
    tag: "Reports",
    action: "View Report",
    filter: "Reports",
    read: false,
    sort: 4,
  },
  {
    id: "milestone",
    title: "New Milestone Achieved: 5 Reflections Completed",
    shortTitle: "New Milestone Achieved",
    body: "Congratulations Sarah! You've maintained a 5-week streak of deep reflections. This milestone has been added to your Employee Continuum™ profile.",
    preview: "Congratulations Sarah! You've maintained a 5-week streak of deep reflections.",
    time: "Oct 24, 11:30 AM",
    ago: "4h ago",
    priority: "Medium Priority",
    tag: "Continuum™",
    action: "Dismiss",
    filter: "Reflection Updates",
    read: false,
    sort: 3,
  },
  {
    id: "hr",
    title: "HR Announcement: New Training Schedule",
    shortTitle: "HR Announcement",
    body: "ABC Healthcare has released the new mandatory training modules for the upcoming quarter. Please review and sync your calendar.",
    preview: "ABC Healthcare has released the new mandatory training modules for the upcoming quarter.",
    time: "Oct 22, 09:15 AM",
    ago: "Yesterday",
    priority: "Low Priority",
    tag: "Organization",
    action: "Details",
    filter: "Organization",
    read: false,
    sort: 2,
  },
  {
    id: "platform",
    title: "Platform Update: Version 2.4 Now Live",
    shortTitle: "Platform Update v2.4",
    body: "We've introduced enhanced analytics in Reports and a smoother interface for Reflections. Explore the new features now.",
    preview: "We've introduced enhanced analytics and a smoother interface for Reflections.",
    time: "Oct 20, 02:45 PM",
    ago: "Yesterday",
    priority: "Low Priority",
    tag: "System",
    action: "What's New",
    filter: "System",
    read: false,
    sort: 1,
  },
];

const OLDER: FounderNotice[] = [
  {
    id: "older-digest",
    title: "Weekly Reflection Digest",
    shortTitle: "Weekly Reflection Digest",
    body: "Your weekly summary of completed reflections is ready in Reports.",
    preview: "Your weekly summary of completed reflections is ready in Reports.",
    time: "Oct 12, 08:00 AM",
    ago: "Last week",
    priority: "Low Priority",
    tag: "Reports",
    action: "View Report",
    filter: "Reports",
    read: true,
    sort: 0,
  },
  {
    id: "older-org",
    title: "Organization Calendar Sync",
    shortTitle: "Organization Calendar Sync",
    body: "Training dates for the next quarter were added to the organization calendar.",
    preview: "Training dates for the next quarter were added to the organization calendar.",
    time: "Oct 08, 01:10 PM",
    ago: "2 weeks ago",
    priority: "Low Priority",
    tag: "Organization",
    action: "Details",
    filter: "Organization",
    read: true,
    sort: -1,
  },
];

let notices = SEED;
let olderLoaded = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());

export const subscribeNotices = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getNotices = () => notices;

export const unreadCount = () => notices.filter((notice) => !notice.read).length;

export const totalCount = () => 37 + notices.length;

export const markNoticeRead = (id: string) => {
  notices = notices.map((notice) => (notice.id === id ? { ...notice, read: true } : notice));
  emit();
};

export const markAllNoticesRead = () => {
  notices = notices.map((notice) => ({ ...notice, read: true }));
  emit();
};

export const dismissNotice = (id: string) => {
  notices = notices.filter((notice) => notice.id !== id);
  emit();
};

export const loadOlderNotices = () => {
  if (olderLoaded) return;
  olderLoaded = true;
  notices = [...notices, ...OLDER];
  emit();
};
