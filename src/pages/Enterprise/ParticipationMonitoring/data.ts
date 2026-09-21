export type InviteStatus = "Invited" | "Accepted" | "Pending";

export type CurrentStage =
  | "In Progress"
  | "Completed"
  | "Not Started"
  | "Processing"
  | "Submitted"
  | "Reviewing";

export type ParticipationRow = {
  empId: string;
  name: string;
  department: string;
  inviteStatus: InviteStatus;
  startedDate: string;
  stage: CurrentStage;
  progress: number;
  lastActivity: string;
  completionLabel: string;
  reflection: string;
  campaign: string;
  inviteDate: string;
};

export type SectionProgress = {
  label: string;
  percent: number;
};

export type StageStep = {
  label: string;
  sublabel?: string;
  state: "done" | "current" | "pending";
  number?: number;
};

export type TimelineStep = {
  label: string;
  stamp?: string;
  detail?: string;
  state: "done" | "current" | "pending";
  number?: number;
};

export type ReminderItem = {
  title: string;
  stamp: string;
  status: string;
};

export type RelatedReflection = {
  title: string;
  meta: string;
  status: string;
};

export type ActivityEvent = {
  time: string;
  day: string;
  description: string;
  stage: string;
  channel: string;
  tone: "gold" | "teal" | "blue" | "gray";
};

export const PARTICIPATION_KPIS = [
  {
    label: "Total Invited",
    value: "325",
    badge: "Total",
    badgeTone: "teal" as const,
    icon: "users",
    border: "teal" as const,
    sub: "vs last cycle",
  },
  {
    label: "Started",
    value: "241",
    badge: "+9.2%",
    badgeTone: "gold" as const,
    icon: "check",
    border: "gold" as const,
    sub: "vs last cycle",
  },
  {
    label: "In Progress",
    value: "158",
    badge: "+5.1%",
    badgeTone: "white" as const,
    icon: "clock",
    border: "white" as const,
    sub: "vs last cycle",
  },
  {
    label: "Completed",
    value: "134",
    badge: "+12.4%",
    badgeTone: "teal" as const,
    icon: "spark",
    border: "teal" as const,
    sub: "vs last cycle",
  },
  {
    label: "Not Started",
    value: "84",
    badge: "2.1%",
    badgeTone: "orange" as const,
    icon: "square",
    border: "orange" as const,
    sub: "vs last cycle",
  },
] as const;

export const COMPLETION_RATE = {
  value: "41%",
  of: "134 of 325",
  badge: "On Track",
};

const NAMES = [
  "Masud J",
  "Masud J",
  "Masud J",
  "Masud J",
  "Masud J",
  "Masud J",
  "Masud J",
  "Masud J",
  "Masud J",
  "Masud J",
];

const DEPTS = [
  "HR",
  "Finance",
  "IT",
  "Operations",
  "Marketing",
  "Sales",
  "Legal",
  "Product",
  "Engineering",
  "Support",
];

const STAGES: {
  invite: InviteStatus;
  stage: CurrentStage;
  progress: number;
  started: string;
  activity: string;
  completion: string;
}[] = [
  {
    invite: "Invited",
    stage: "In Progress",
    progress: 62,
    started: "Jun 1, 2026",
    activity: "2h ago",
    completion: "Reflection In Progress",
  },
  {
    invite: "Accepted",
    stage: "Completed",
    progress: 100,
    started: "May 30, 2026",
    activity: "1d ago",
    completion: "Completed",
  },
  {
    invite: "Pending",
    stage: "Not Started",
    progress: 0,
    started: "—",
    activity: "3d ago",
    completion: "Not Started",
  },
  {
    invite: "Accepted",
    stage: "Processing",
    progress: 100,
    started: "May 28, 2026",
    activity: "5h ago",
    completion: "AI Processing",
  },
  {
    invite: "Accepted",
    stage: "Submitted",
    progress: 100,
    started: "May 25, 2026",
    activity: "12h ago",
    completion: "Submitted",
  },
  {
    invite: "Accepted",
    stage: "Reviewing",
    progress: 100,
    started: "May 20, 2026",
    activity: "1d ago",
    completion: "Human Review",
  },
  {
    invite: "Invited",
    stage: "Not Started",
    progress: 0,
    started: "—",
    activity: "4d ago",
    completion: "Not Started",
  },
  {
    invite: "Accepted",
    stage: "In Progress",
    progress: 45,
    started: "May 18, 2026",
    activity: "6h ago",
    completion: "Reflection In Progress",
  },
  {
    invite: "Accepted",
    stage: "Completed",
    progress: 100,
    started: "May 10, 2026",
    activity: "2d ago",
    completion: "Completed",
  },
  {
    invite: "Pending",
    stage: "In Progress",
    progress: 28,
    started: "Jun 2, 2026",
    activity: "30m ago",
    completion: "Reflection In Progress",
  },
];

export const PARTICIPATION_ROWS: ParticipationRow[] = Array.from(
  { length: 10 },
  (_, i) => {
    const s = STAGES[i % STAGES.length];
    return {
      empId: `EMP-${String(i + 1).padStart(3, "0")}`,
      name: NAMES[i],
      department: DEPTS[i],
      inviteStatus: s.invite,
      startedDate: s.started,
      stage: s.stage,
      progress: s.progress,
      lastActivity: s.activity,
      completionLabel: s.completion,
      reflection: "MindState™ Reflection",
      campaign: "Q2 2026",
      inviteDate: "June 1, 2026",
    };
  }
);

export const getParticipation = (empId: string) =>
  PARTICIPATION_ROWS.find((r) => r.empId === empId);

export const getSectionProgress = (): SectionProgress[] => [
  { label: "Section 1 — Personal Reflection", percent: 100 },
  { label: "Section 2 — Workplace Dynamics", percent: 100 },
  { label: "Section 3 — Growth & Goals", percent: 40 },
  { label: "Section 4 — Future Vision", percent: 0 },
];

export const getStageSteps = (): StageStep[] => [
  {
    label: "Invitation Sent",
    sublabel: "Jun 1, 9:00am",
    state: "done",
  },
  { label: "Reflection In Progress", state: "current", number: 2 },
  { label: "Reflection Submitted", state: "pending", number: 3 },
  { label: "Human Review", state: "pending", number: 4 },
  { label: "Completed", state: "pending", number: 5 },
];

export const getTimelineSteps = (): TimelineStep[] => [
  {
    label: "Invitation Sent",
    stamp: "Jun 1, 2026 · 9:00 AM",
    detail: "Invitation email delivered to employee",
    state: "done",
  },
  {
    label: "Assessment Started",
    stamp: "Jun 1, 2026 · 9:15 AM",
    detail: "Employee opened and began assessment",
    state: "done",
  },
  {
    label: "Reflection In Progress",
    stamp: "Jun 1, 2026 · 9:20 AM",
    detail: "Currently completing reflection sections",
    state: "current",
  },
  { label: "Reflection Submitted", state: "pending", number: 4 },
  { label: "AI Processing", state: "pending", number: 5 },
  { label: "Human Review", state: "pending", number: 6 },
  { label: "Completed", state: "pending", number: 7 },
];

export const getReminders = (): ReminderItem[] => [
  {
    title: "Initial invitation sent via email",
    stamp: "Jun 1, 2026 · 9:00 AM · Email Channel",
    status: "Delivered",
  },
];

export const getRelatedReflections = (): RelatedReflection[] => [
  {
    title: "MindState™ Reflection Q2 2026",
    meta: "Reflection Active Since May 1, 2026 · Cycle Deadline: Aug 31, 2026",
    status: "Active",
  },
  {
    title: "Management™ Reflection Q2 2026",
    meta: "Reflection Active Since May 1, 2026 · Cycle Deadline: Aug 31, 2026",
    status: "Active",
  },
];

export const getActivityLog = (): ActivityEvent[] => [
  {
    time: "9:20 AM",
    day: "Today",
    description: "Reflection Section 3 accessed",
    stage: "In Progress",
    channel: "Platform",
    tone: "gold",
  },
  {
    time: "9:15 AM",
    day: "Today",
    description: "Assessment opened and started",
    stage: "Started",
    channel: "Platform",
    tone: "teal",
  },
  {
    time: "9:00 AM",
    day: "Today",
    description: "Invitation email opened",
    stage: "Invited",
    channel: "Email",
    tone: "blue",
  },
  {
    time: "8:55 AM",
    day: "Jun 1, 2026",
    description: "Invitation sent via email",
    stage: "Sent",
    channel: "Email",
    tone: "gray",
  },
];
