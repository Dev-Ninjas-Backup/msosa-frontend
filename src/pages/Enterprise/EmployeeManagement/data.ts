export type InviteStatus = "Accepted" | "Invited" | "Pending" | "Suspended";
export type AssessmentStatus =
  | "Completed"
  | "In Progress"
  | "Started"
  | "Not Started"
  | "Pending"
  | "Suspended";

export type EmployeeRow = {
  id: string;
  initials: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  team: string;
  dateAdded: string;
  blueprint: string;
  inviteStatus: InviteStatus;
  assessmentStatus: AssessmentStatus;
  completion: number;
  lastActivity: string;
  accountStatus: "Active" | "Suspended";
  inviteDate?: string;
  startDate?: string;
  completedDate?: string;
  duration?: string;
  totalSessions: number;
  prevAssessments: number;
  reportAvailable: boolean;
};

export const EMPLOYEES: EmployeeRow[] = [
  {
    id: "EMP-0041",
    initials: "JR",
    name: "James Robertson",
    role: "Senior Engineer",
    department: "Engineering",
    email: "j.robertson@acme.com",
    phone: "+1 555-0142",
    team: "Platform Team",
    dateAdded: "Jan 15, 2025",
    blueprint: "MindState™ Reflection",
    inviteStatus: "Accepted",
    assessmentStatus: "Completed",
    completion: 100,
    lastActivity: "2h ago",
    accountStatus: "Active",
    inviteDate: "Feb 1, 2025",
    startDate: "Feb 3, 2025",
    completedDate: "Feb 28, 2025",
    duration: "25 days",
    totalSessions: 8,
    prevAssessments: 2,
    reportAvailable: true,
  },
  {
    id: "EMP-0078",
    initials: "SC",
    name: "Sarah Chen",
    role: "Product Manager",
    department: "Product",
    email: "s.chen@acme.com",
    phone: "+1 555-0188",
    team: "Product Ops",
    dateAdded: "Mar 2, 2025",
    blueprint: "Leadership Align™",
    inviteStatus: "Accepted",
    assessmentStatus: "In Progress",
    completion: 72,
    lastActivity: "5h ago",
    accountStatus: "Active",
    inviteDate: "Mar 10, 2025",
    startDate: "Mar 12, 2025",
    totalSessions: 5,
    prevAssessments: 1,
    reportAvailable: false,
  },
  {
    id: "EMP-0023",
    initials: "MK",
    name: "Michael Kim",
    role: "Sales Director",
    department: "Sales",
    email: "m.kim@acme.com",
    phone: "+1 555-0110",
    team: "Enterprise Sales",
    dateAdded: "Nov 8, 2024",
    blueprint: "MindState™ Reflection",
    inviteStatus: "Invited",
    assessmentStatus: "Started",
    completion: 30,
    lastActivity: "1d ago",
    accountStatus: "Active",
    inviteDate: "May 1, 2026",
    startDate: "May 3, 2026",
    totalSessions: 2,
    prevAssessments: 0,
    reportAvailable: false,
  },
  {
    id: "EMP-0112",
    initials: "AT",
    name: "Amanda Torres",
    role: "HR Specialist",
    department: "HR",
    email: "a.torres@acme.com",
    phone: "+1 555-0199",
    team: "People Ops",
    dateAdded: "Jan 20, 2025",
    blueprint: "Org Readiness™",
    inviteStatus: "Accepted",
    assessmentStatus: "Completed",
    completion: 100,
    lastActivity: "3h ago",
    accountStatus: "Active",
    inviteDate: "Feb 5, 2025",
    startDate: "Feb 6, 2025",
    completedDate: "Feb 20, 2025",
    duration: "14 days",
    totalSessions: 6,
    prevAssessments: 3,
    reportAvailable: true,
  },
  {
    id: "EMP-0057",
    initials: "DL",
    name: "David Lee",
    role: "Finance Analyst",
    department: "Finance",
    email: "d.lee@acme.com",
    phone: "+1 555-0133",
    team: "FP&A",
    dateAdded: "Apr 4, 2025",
    blueprint: "MindState™ Reflection",
    inviteStatus: "Pending",
    assessmentStatus: "Not Started",
    completion: 0,
    lastActivity: "3d ago",
    accountStatus: "Active",
    totalSessions: 0,
    prevAssessments: 0,
    reportAvailable: false,
  },
  {
    id: "EMP-0034",
    initials: "RP",
    name: "Rachel Park",
    role: "Operations Lead",
    department: "Operations",
    email: "r.park@acme.com",
    phone: "+1 555-0177",
    team: "Ops Core",
    dateAdded: "Sep 12, 2024",
    blueprint: "None Assigned",
    inviteStatus: "Suspended",
    assessmentStatus: "Suspended",
    completion: 45,
    lastActivity: "7d ago",
    accountStatus: "Suspended",
    totalSessions: 3,
    prevAssessments: 1,
    reportAvailable: false,
  },
  {
    id: "EMP-0091",
    initials: "TN",
    name: "Tyler Nguyen",
    role: "Marketing Mgr",
    department: "Marketing",
    email: "t.nguyen@acme.com",
    phone: "+1 555-0155",
    team: "Brand",
    dateAdded: "Jun 1, 2025",
    blueprint: "Leadership Align™",
    inviteStatus: "Invited",
    assessmentStatus: "Pending",
    completion: 0,
    lastActivity: "2d ago",
    accountStatus: "Active",
    inviteDate: "Jun 10, 2025",
    totalSessions: 0,
    prevAssessments: 0,
    reportAvailable: false,
  },
  {
    id: "EMP-0147",
    initials: "PW",
    name: "Patricia Walsh",
    role: "Legal Counsel",
    department: "Legal",
    email: "p.walsh@acme.com",
    phone: "+1 555-0166",
    team: "Corporate Legal",
    dateAdded: "Feb 18, 2025",
    blueprint: "MindState™ Reflection",
    inviteStatus: "Accepted",
    assessmentStatus: "In Progress",
    completion: 58,
    lastActivity: "6h ago",
    accountStatus: "Active",
    inviteDate: "Mar 1, 2025",
    startDate: "Mar 3, 2025",
    totalSessions: 4,
    prevAssessments: 1,
    reportAvailable: false,
  },
];

export const getEmployee = (id: string) =>
  EMPLOYEES.find((e) => e.id === id || e.id === id.replace(/^#/, ""));

export const AVATAR_COLORS = [
  "#F5C542",
  "#2DD4BF",
  "#60A5FA",
  "#FB923C",
  "#A78BFA",
  "#F472B6",
  "#34D399",
  "#F87171",
] as const;
