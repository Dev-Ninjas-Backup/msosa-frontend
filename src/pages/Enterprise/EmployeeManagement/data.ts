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

export type EmployeeFormValues = {
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  team: string;
  blueprint: string;
};

const INITIAL_EMPLOYEES: EmployeeRow[] = [
  {
    id: "EMP-0041",
    initials: "JR",
    name: "James Robertson",
    role: "Senior Engineer",
    department: "Engineering",
    email: "j.robertson@Encounters.com",
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
    email: "s.chen@Encounters.com",
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
    email: "m.kim@Encounters.com",
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
    email: "a.torres@Encounters.com",
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
    email: "d.lee@Encounters.com",
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
    email: "r.park@Encounters.com",
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
    email: "t.nguyen@Encounters.com",
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
    email: "p.walsh@Encounters.com",
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

let employees: EmployeeRow[] = INITIAL_EMPLOYEES.map((e) => ({ ...e }));
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

export const subscribeEmployees = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getEmployeesSnapshot = () => employees;

export const getEmployee = (id: string) =>
  employees.find((e) => e.id === id || e.id === id.replace(/^#/, ""));

export const AVATAR_COLORS = [
  "#FBBF24",
  "#10B7BA",
  "#EF4444",
  "#60A5FA",
  "#9CA3AF",
  "#F97316",
  "#A78BFA",
  "#F472B6",
] as const;

export const DEPARTMENT_OPTIONS = [
  "Engineering",
  "Product",
  "Sales",
  "HR",
  "Finance",
  "Operations",
  "Marketing",
  "Legal",
].map((v) => ({ label: v, value: v }));

export const REFLECTION_OPTIONS = [
  "MindState™ Reflection",
  "Leadership Align™",
  "Org Readiness™",
  "None Assigned",
].map((v) => ({ label: v, value: v }));

const initialsFromName = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const nextEmployeeId = () => {
  const nums = employees.map((e) => Number(e.id.replace(/\D/g, "")) || 0);
  const next = Math.max(100, ...nums) + 1;
  return `EMP-${String(next).padStart(4, "0")}`;
};

const formatToday = () =>
  new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const addEmployee = (values: EmployeeFormValues): EmployeeRow => {
  const row: EmployeeRow = {
    id: nextEmployeeId(),
    initials: initialsFromName(values.name),
    name: values.name.trim(),
    role: values.role.trim(),
    department: values.department,
    email: values.email.trim(),
    phone: values.phone.trim() || "—",
    team: values.team.trim() || "—",
    dateAdded: formatToday(),
    blueprint: values.blueprint || "None Assigned",
    inviteStatus: "Pending",
    assessmentStatus: "Not Started",
    completion: 0,
    lastActivity: "Just now",
    accountStatus: "Active",
    totalSessions: 0,
    prevAssessments: 0,
    reportAvailable: false,
  };
  employees = [row, ...employees];
  emit();
  return row;
};

export const updateEmployee = (
  id: string,
  values: EmployeeFormValues
): EmployeeRow | undefined => {
  const idx = employees.findIndex((e) => e.id === id);
  if (idx < 0) return undefined;
  const prev = employees[idx];
  const next: EmployeeRow = {
    ...prev,
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim() || prev.phone,
    department: values.department,
    role: values.role.trim(),
    team: values.team.trim() || prev.team,
    blueprint: values.blueprint || prev.blueprint,
    initials: initialsFromName(values.name),
    lastActivity: "Just now",
  };
  employees = employees.map((e, i) => (i === idx ? next : e));
  emit();
  return next;
};

export const suspendEmployee = (id: string) => {
  employees = employees.map((e) =>
    e.id === id
      ? {
          ...e,
          accountStatus: "Suspended" as const,
          inviteStatus: "Suspended" as const,
          assessmentStatus: "Suspended" as const,
          lastActivity: "Just now",
        }
      : e
  );
  emit();
};

export const reactivateEmployee = (id: string) => {
  employees = employees.map((e) =>
    e.id === id
      ? {
          ...e,
          accountStatus: "Active" as const,
          inviteStatus:
            e.inviteStatus === "Suspended" ? "Pending" : e.inviteStatus,
          assessmentStatus:
            e.assessmentStatus === "Suspended"
              ? "Not Started"
              : e.assessmentStatus,
          lastActivity: "Just now",
        }
      : e
  );
  emit();
};

export const removeEmployee = (id: string) => {
  employees = employees.filter((e) => e.id !== id);
  emit();
};

export const assignReflectionToEmployees = (
  employeeIds: string[],
  reflectionName: string
) => {
  const idSet = new Set(employeeIds);
  employees = employees.map((e) =>
    idSet.has(e.id)
      ? {
          ...e,
          blueprint: reflectionName,
          inviteStatus:
            e.inviteStatus === "Suspended" ? e.inviteStatus : "Invited",
          assessmentStatus:
            e.assessmentStatus === "Suspended" ||
            e.assessmentStatus === "Completed"
              ? e.assessmentStatus
              : "Not Started",
          lastActivity: "Just now",
        }
      : e
  );
  emit();
};

/** @deprecated use getEmployeesSnapshot */
export const EMPLOYEES = employees;
