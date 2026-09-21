import { EMPLOYEES, type InviteStatus, type AssessmentStatus } from "../EmployeeManagement/data";

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
  inviteStatus: InviteStatus;
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

export const INVITATIONS: InvitationRow[] = EMPLOYEES.map((e, i) => ({
  id: e.id,
  inviteId: `INV-2025-${String(80 + i).padStart(4, "0")}`,
  employeeId: e.id,
  initials: e.initials,
  name: e.name,
  role: e.role,
  department: e.department,
  email: e.email,
  blueprint: e.blueprint,
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
    "You are invited to complete your FAR Systems™ Blueprint reflection. This assessment is confidential and supports your growth.",
  secureLink: "https://far.app/inv/••••••••••••",
  token: "tok_••••••••••••••••",
  linkStatus:
    e.inviteStatus === "Accepted"
      ? "Used"
      : e.inviteStatus === "Suspended"
        ? "Expired"
        : "Active",
}));

export const INVITE_KPIS = [
  { label: "Total Invitations", value: "247", delta: "4.1%", up: true },
  { label: "Sent", value: "198", delta: "8.3%", up: true },
  { label: "Accepted", value: "156", delta: "12.4%", up: true },
  { label: "Started", value: "89", delta: "6.7%", up: true },
  { label: "Completed", value: "112", delta: "5.2%", up: true },
  { label: "Pending", value: "42", delta: "2.1%", up: false },
  { label: "Cancelled", value: "3", delta: "—", up: true },
  { label: "Participation Rate", value: "68%", delta: "9.7%", up: true },
] as const;

export const getInvitation = (id: string) =>
  INVITATIONS.find(
    (inv) =>
      inv.inviteId === id ||
      inv.inviteId === id.replace(/^#/, "") ||
      inv.employeeId === id ||
      inv.employeeId === id.replace(/^#/, "")
  );
