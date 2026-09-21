import { useSyncExternalStore } from "react";
import {
  getEmployeesSnapshot,
  subscribeEmployees,
  type AssessmentStatus,
  type InviteStatus,
} from "../EmployeeManagement/data";

export type InvitationRow = {
  id: string;
  inviteId: string;
  employeeId: string;
  initials: string;
  name: string;
  role: string;
  department: string;
  email: string;
  blueprint: string;
  inviteStatus: InviteStatus | "Cancelled";
  assessmentStatus: AssessmentStatus;
  completion: number;
  lastActivity: string;
  accountFilter: "Active" | "Expired";
  inviteDate: string;
  expirationDate: string;
  campaign: string;
  deliveryMethod: string;
  customMessage: string;
  secureLink: string;
  token: string;
  linkStatus: "Active" | "Used" | "Expired";
};

export type InviteHistoryEvent = {
  event: string;
  date: string;
  time: string;
  details: string;
  tone: "teal" | "gold" | "blue" | "orange" | "gray";
};

export type StatusStep = {
  label: string;
  state: "done" | "current" | "pending";
  stamp?: string;
};

const formatToday = () =>
  new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const buildFromEmployees = (): InvitationRow[] => {
  const employees = getEmployeesSnapshot();
  return employees.map((e, i) => ({
    id: e.id,
    inviteId: `INV-2025-${String(80 + i).padStart(4, "0")}`,
    employeeId: e.id,
    initials: e.initials,
    name: e.name,
    role: e.role,
    department: e.department,
    email: e.email,
    blueprint: e.blueprint === "None Assigned" ? "MindState™ Reflection" : e.blueprint,
    inviteStatus: e.inviteStatus,
    assessmentStatus: e.assessmentStatus,
    completion: e.completion,
    lastActivity: e.lastActivity,
    accountFilter: e.inviteStatus === "Suspended" ? "Expired" : "Active",
    inviteDate: e.inviteDate ?? "Feb 1, 2025",
    expirationDate: "Mar 1, 2025",
    campaign: "Q2 2025",
    deliveryMethod: "Email",
    customMessage:
      "Please complete your FAR Systems™ reflection before the campaign deadline. Your responses remain confidential.",
    secureLink: "https://far.app/inv/••••••••••••",
    token: `tok_${e.id.toLowerCase().replace(/-/g, "")}`,
    linkStatus:
      e.inviteStatus === "Accepted"
        ? "Used"
        : e.inviteStatus === "Suspended"
          ? "Expired"
          : "Active",
  }));
};

let invitations: InvitationRow[] = buildFromEmployees();
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

// Keep invitations in sync when employees change (new employees etc.)
subscribeEmployees(() => {
  const currentIds = new Set(invitations.map((i) => i.employeeId));
  const employees = getEmployeesSnapshot();
  const missing = employees.filter((e) => !currentIds.has(e.id));
  if (missing.length === 0) return;
  const start = invitations.length;
  invitations = [
    ...missing.map((e, i) => ({
      id: e.id,
      inviteId: `INV-2025-${String(80 + start + i).padStart(4, "0")}`,
      employeeId: e.id,
      initials: e.initials,
      name: e.name,
      role: e.role,
      department: e.department,
      email: e.email,
      blueprint:
        e.blueprint === "None Assigned"
          ? "MindState™ Reflection"
          : e.blueprint,
      inviteStatus: "Pending" as const,
      assessmentStatus: "Not Started" as const,
      completion: 0,
      lastActivity: "Just now",
      accountFilter: "Active" as const,
      inviteDate: formatToday(),
      expirationDate: "Mar 1, 2025",
      campaign: "Q2 2025",
      deliveryMethod: "Email",
      customMessage:
        "Please complete your FAR Systems™ reflection before the campaign deadline.",
      secureLink: "https://far.app/inv/••••••••••••",
      token: `tok_${e.id.toLowerCase().replace(/-/g, "")}`,
      linkStatus: "Active" as const,
    })),
    ...invitations,
  ];
  emit();
});

export const subscribeInvitations = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getInvitationsSnapshot = () => invitations;

export const useInvitations = () =>
  useSyncExternalStore(
    subscribeInvitations,
    getInvitationsSnapshot,
    getInvitationsSnapshot
  );

export const INVITE_KPIS = [
  {
    label: "Total Invitations",
    value: "247",
    delta: "+4.1%",
    up: true,
    icon: "users",
  },
  {
    label: "Sent",
    value: "198",
    delta: "+8.3%",
    up: true,
    icon: "sent",
  },
  {
    label: "Accepted",
    value: "156",
    delta: "+12.4%",
    up: true,
    icon: "accepted",
  },
  {
    label: "Started",
    value: "89",
    delta: "+6.7%",
    up: true,
    icon: "started",
  },
  {
    label: "Completed",
    value: "112",
    delta: "+5.2%",
    up: true,
    icon: "completed",
  },
  {
    label: "Pending",
    value: "42",
    delta: "+2.1%",
    up: true,
    icon: "pending",
  },
  {
    label: "Cancelled",
    value: "3",
    delta: "—",
    up: true,
    icon: "cancelled",
  },
  {
    label: "Participation Rate",
    value: "68%",
    delta: "+0.7%",
    up: true,
    icon: "rate",
  },
] as const;

export const REFLECTION_CHOICES = [
  "Future Path Reflection™",
  "MindState™ Reflection",
  "Leadership Align™",
  "Org Readiness™",
] as const;

export const getInvitation = (id: string) =>
  invitations.find(
    (inv) =>
      inv.inviteId === id ||
      inv.inviteId === id.replace(/^#/, "") ||
      inv.employeeId === id ||
      inv.employeeId === id.replace(/^#/, "")
  );

export const createInvitations = (payload: {
  emails: string[];
  reflection: string;
  link: string;
}) => {
  const employees = getEmployeesSnapshot();
  const created: InvitationRow[] = [];

  payload.emails.forEach((email) => {
    const normalized = email.trim().toLowerCase();
    if (!normalized) return;
    const match = employees.find((e) => e.email.toLowerCase() === normalized);
    const existing = invitations.find(
      (i) => i.email.toLowerCase() === normalized
    );
    if (existing) {
      invitations = invitations.map((i) =>
        i.inviteId === existing.inviteId
          ? {
              ...i,
              blueprint: payload.reflection,
              inviteStatus: "Invited" as const,
              assessmentStatus: "Not Started" as const,
              lastActivity: "Just now",
              accountFilter: "Active" as const,
              inviteDate: formatToday(),
              secureLink: payload.link,
              linkStatus: "Active" as const,
            }
          : i
      );
      created.push(getInvitation(existing.inviteId)!);
      return;
    }

    const nums = invitations.map(
      (i) => Number(i.inviteId.replace(/\D/g, "")) || 0
    );
    const nextNum = Math.max(89, ...nums) + 1;
    const inviteId = `INV-2025-${String(nextNum).padStart(4, "0")}`;
    const initials = match
      ? match.initials
      : normalized
          .split("@")[0]
          .split(/[._-]/)
          .filter(Boolean)
          .slice(0, 2)
          .map((p) => p[0]?.toUpperCase() ?? "")
          .join("") || "??";

    const row: InvitationRow = {
      id: match?.id ?? inviteId,
      inviteId,
      employeeId: match?.id ?? `EMP-${String(nextNum).padStart(4, "0")}`,
      initials,
      name: match?.name ?? normalized.split("@")[0].replace(/[._]/g, " "),
      role: match?.role ?? "Invitee",
      department: match?.department ?? "—",
      email: normalized,
      blueprint: payload.reflection,
      inviteStatus: "Invited",
      assessmentStatus: "Not Started",
      completion: 0,
      lastActivity: "Just now",
      accountFilter: "Active",
      inviteDate: formatToday(),
      expirationDate: "Mar 1, 2025",
      campaign: "Q2 2025",
      deliveryMethod: "Email",
      customMessage:
        "Please complete your FAR Systems™ reflection before the campaign deadline.",
      secureLink: payload.link,
      token: `tok_${inviteId.toLowerCase().replace(/-/g, "")}`,
      linkStatus: "Active",
    };
    invitations = [row, ...invitations];
    created.push(row);
  });

  emit();
  return created;
};

export const resendInvitation = (inviteId: string) => {
  invitations = invitations.map((i) =>
    i.inviteId === inviteId
      ? {
          ...i,
          inviteStatus:
            i.inviteStatus === "Cancelled" || i.inviteStatus === "Suspended"
              ? "Invited"
              : i.inviteStatus === "Pending"
                ? "Invited"
                : i.inviteStatus,
          lastActivity: "Just now",
          accountFilter: "Active",
          linkStatus: "Active",
        }
      : i
  );
  emit();
};

export const cancelInvitation = (inviteId: string) => {
  invitations = invitations.map((i) =>
    i.inviteId === inviteId
      ? {
          ...i,
          inviteStatus: "Cancelled",
          accountFilter: "Expired",
          linkStatus: "Expired",
          lastActivity: "Just now",
        }
      : i
  );
  emit();
};

export const regenerateInviteLink = (inviteId: string) => {
  const suffix = Math.random().toString(36).slice(2, 10);
  const link = `https://app.farsystems.io/invite/ref-${suffix}`;
  invitations = invitations.map((i) =>
    i.inviteId === inviteId
      ? {
          ...i,
          secureLink: link,
          linkStatus: "Active",
          lastActivity: "Just now",
        }
      : i
  );
  emit();
  return link;
};

export const getInviteHistory = (inv: InvitationRow): InviteHistoryEvent[] => [
  {
    event: "Invitation Created",
    date: inv.inviteDate,
    time: "09:12 AM",
    details: "Invitation drafted in system",
    tone: "gray",
  },
  {
    event: "Sent via Email",
    date: inv.inviteDate,
    time: "09:14 AM",
    details: "Secure invitation email dispatched",
    tone: "blue",
  },
  {
    event: "Delivered",
    date: inv.inviteDate,
    time: "09:15 AM",
    details: "Email delivered successfully",
    tone: "teal",
  },
  {
    event: "Link Opened",
    date: inv.inviteDate,
    time: "02:40 PM",
    details: "Recipient opened secure link",
    tone: "gold",
  },
  {
    event: "Invitation Accepted",
    date: inv.inviteDate,
    time: "03:05 PM",
    details: "Employee confirmed participation",
    tone: "teal",
  },
  {
    event: "Assessment Started",
    date: "Feb 3, 2025",
    time: "10:22 AM",
    details: "First reflection session began",
    tone: "orange",
  },
  {
    event: "Reflection Completed",
    date: "Feb 28, 2025",
    time: "04:18 PM",
    details: "All modules submitted",
    tone: "teal",
  },
  {
    event: "Report Generated",
    date: "Mar 1, 2025",
    time: "08:01 AM",
    details: "Organizational report ready",
    tone: "gold",
  },
];

export const getStatusSteps = (inv: InvitationRow): StatusStep[] => {
  const accepted =
    inv.inviteStatus === "Accepted" || inv.completion > 0;
  const started =
    inv.assessmentStatus === "Started" ||
    inv.assessmentStatus === "In Progress" ||
    inv.assessmentStatus === "Completed" ||
    inv.completion > 0;
  const inProgress =
    inv.assessmentStatus === "In Progress" ||
    inv.assessmentStatus === "Completed";
  const completed = inv.assessmentStatus === "Completed" || inv.completion === 100;

  const steps: StatusStep[] = [
    { label: "Draft", state: "done", stamp: `${inv.inviteDate} · 09:12 AM` },
    { label: "Generated", state: "done", stamp: `${inv.inviteDate} · 09:13 AM` },
    { label: "Sent", state: "done", stamp: `${inv.inviteDate} · 09:14 AM` },
    { label: "Delivered", state: "done", stamp: `${inv.inviteDate} · 09:15 AM` },
    { label: "Opened", state: "done", stamp: `${inv.inviteDate} · 02:40 PM` },
    {
      label: "Accepted",
      state: accepted ? (started ? "done" : "current") : "pending",
      stamp: accepted ? `${inv.inviteDate} · 03:05 PM` : undefined,
    },
    {
      label: "Started",
      state: started ? (inProgress || completed ? "done" : "current") : "pending",
      stamp: started ? "Feb 3, 2025 · 10:22 AM" : undefined,
    },
    {
      label: "In Progress",
      state: inProgress ? (completed ? "done" : "current") : "pending",
    },
    {
      label: "Completed",
      state: completed ? "done" : "pending",
      stamp: completed ? "Feb 28, 2025 · 04:18 PM" : undefined,
    },
  ];
  return steps;
};

export const NOTIFICATIONS = [
  {
    title: "Invitation Delivered",
    stamp: "2h ago",
    tone: "teal" as const,
  },
  {
    title: "Reminder Sent",
    stamp: "1d ago",
    tone: "gold" as const,
  },
  {
    title: "Assessment Started",
    stamp: "3d ago",
    tone: "teal" as const,
  },
  {
    title: "Completion Alert",
    stamp: "5d ago",
    tone: "gold" as const,
  },
];

/** @deprecated */
export const INVITATIONS = invitations;
