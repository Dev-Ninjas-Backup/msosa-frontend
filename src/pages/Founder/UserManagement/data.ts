import sophiaAvatar from "@/assets/enterprise/avatar-1.jpg";
import elenaAvatar from "@/assets/enterprise/avatar-2.jpg";
import marcusAvatar from "@/assets/founder/users/marcus-thorne.jpg";

// ── Enums ───────────────────────────────────────────────────────────────────

export const USER_ROLES = [
  "Enterprise Admin",
  "Founder / Admin",
  "Employee",
  "Consumer",
] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const USER_STATUSES = ["Active", "Invited", "Suspended"] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

export const VERIFICATION_STATES = ["Verified", "Unverified"] as const;
export type VerificationState = (typeof VERIFICATION_STATES)[number];

export const ORGANIZATIONS = [
  "Global Tech Solutions",
  "FAR Platform Engine™",
  "Boutique Consulting",
  "Stellar Tech Corp",
  "Independent",
];

export const COUNTRIES = [
  "United States (USA)",
  "United Kingdom (UK)",
  "Canada",
  "Germany",
  "Italy",
  "Nigeria",
  "Singapore",
];

export const TIME_ZONES = [
  "PST (GMT-8)",
  "EST (GMT-5)",
  "GMT (GMT+0)",
  "CET (GMT+1)",
  "WAT (GMT+1)",
  "SGT (GMT+8)",
];

export const DEPARTMENTS = [
  "Corporate Strategy",
  "Engineering",
  "Operations",
  "Finance",
  "Customer Success",
  "—",
];

export const REPORTING_MANAGERS = ["Michel Sossa", "Marcus Thorne", "Sophia Loren", "—"];

export const REGISTRATION_PERIODS = [
  "Any Time",
  "Last 30 Days",
  "Last 12 Months",
  "Older Than 12 Months",
] as const;
export type RegistrationPeriod = (typeof REGISTRATION_PERIODS)[number];

// ── Access control ──────────────────────────────────────────────────────────

export const PERMISSIONS = [
  {
    key: "dashboard",
    label: "Dashboard Access",
    description: "Enable high-level overview and real-time visualization panels.",
  },
  {
    key: "auditLogs",
    label: "Audit Logs View",
    description: "Access immutable security logs and system activity trails.",
  },
  {
    key: "financialReporting",
    label: "Financial Reporting",
    description: "Permission to view revenue data and export fiscal reports.",
  },
  {
    key: "aiModelTraining",
    label: "AI Model Training",
    description: "Initiate neural network retraining and parameter tuning.",
  },
  {
    key: "billing",
    label: "Billing Protocol",
    description: "Manage subscription tiers and payment gateway endpoints.",
  },
  {
    key: "apiManagement",
    label: "API Management",
    description: "Generate and revoke environment-specific API tokens.",
  },
  {
    key: "userProvisioning",
    label: "User Provisioning",
    description: "Invite new members and assign initial access roles.",
  },
  {
    key: "securitySettings",
    label: "Security Settings",
    description: "Configure 2FA requirements and IP whitelist rules.",
  },
] as const;
export type PermissionKey = (typeof PERMISSIONS)[number]["key"];
export type PermissionMap = Record<PermissionKey, boolean>;

const allPermissions = (value: boolean) =>
  Object.fromEntries(PERMISSIONS.map((p) => [p.key, value])) as PermissionMap;

export const defaultPermissionsFor = (role: UserRole): PermissionMap => {
  switch (role) {
    case "Founder / Admin":
      return allPermissions(true);
    case "Enterprise Admin":
      return { ...allPermissions(true), aiModelTraining: false };
    case "Employee":
      return { ...allPermissions(false), dashboard: true, auditLogs: true };
    default:
      return { ...allPermissions(false), dashboard: true };
  }
};

export const ROLE_DISPLAY_NAME: Record<UserRole, string> = {
  "Enterprise Admin": "Enterprise Administrator",
  "Founder / Admin": "Founder Administrator",
  Employee: "Enterprise Employee",
  Consumer: "Consumer",
};

export const ROLE_DESCRIPTION: Record<UserRole, string> = {
  "Enterprise Admin":
    "This role grants full administrative control over all system modules and user provisioning protocols.",
  "Founder / Admin":
    "This role grants unrestricted platform ownership, including AI model training and financial controls.",
  Employee:
    "This role grants access to assigned Reflections™, personal dashboards and read-only audit trails.",
  Consumer:
    "This role grants access to purchased products and the personal dashboard only.",
};

// ── Products & assets ───────────────────────────────────────────────────────

export const PRODUCT_CATALOG = [
  "Far Core Engine™",
  "MindState™ Pro",
  "Reflection™ Suite",
  "Illumination Bridge™",
  "Knowledge Processing™",
];

export type Subscription = {
  id: string;
  product: string;
  expiresAt: string;
  status: "Active" | "Expired";
};

export const ACCESS_LEVELS = [
  "Full Admin",
  "Read/Write",
  "Read Only",
  "Scheduled",
  "Enterprise",
] as const;
export type AccessLevel = (typeof ACCESS_LEVELS)[number];

export const ASSET_KINDS = ["API Key", "Storage", "Compute", "License"] as const;
export type AssetKind = (typeof ASSET_KINDS)[number];

export type AssetStatus = "Valid" | "Allocated" | "Suspended" | "Active";

export type DigitalAsset = {
  id: string;
  name: string;
  kind: AssetKind;
  resourceId: string;
  assignedAt: string;
  accessLevel: AccessLevel;
  status: AssetStatus;
};

// ── Audit ───────────────────────────────────────────────────────────────────

export type AuditKind = "purchase" | "protocol" | "security" | "auth" | "admin";

export type AuditEntry = {
  id: string;
  at: string;
  action: string;
  kind: AuditKind;
  device: string;
  location: string;
  ip: string;
  result: "Success" | "Blocked";
};

// ── User ────────────────────────────────────────────────────────────────────

export type UserProfile = {
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  timeZone: string;
  username: string;
  department: string;
  team: string;
  reportingManager: string;
  jobTitle: string;
  employeeId: string;
  mfaEnabled: boolean;
  passwordChangedAt: string;
  session: { device: string; browser: string; location: string; ip: string };
  permissions: PermissionMap;
  subscriptions: Subscription[];
  assets: DigitalAsset[];
  audit: AuditEntry[];
};

export type ManagedUser = {
  id: string;
  name: string;
  subtitle: string;
  email: string;
  role: UserRole;
  organization: string;
  status: UserStatus;
  verification: VerificationState;
  registeredAt: string;
  lastActive: string;
  avatar?: string;
  profile: UserProfile;
};

export type UserFormValues = Pick<
  ManagedUser,
  "name" | "email" | "role" | "organization"
> &
  Partial<Pick<ManagedUser, "status" | "verification">>;

// ── Builders ────────────────────────────────────────────────────────────────

const DAY_MS = 24 * 60 * 60 * 1000;

const isoDaysAgo = (days: number, hours = 0, minutes = 0) =>
  new Date(Date.now() - days * DAY_MS - hours * 3_600_000 - minutes * 60_000).toISOString();

export const createId = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

const splitName = (name: string) => {
  const [firstName = "", ...rest] = name.trim().split(/\s+/);
  return { firstName, lastName: rest.join(" ") };
};

export const buildProfile = (
  user: Pick<ManagedUser, "name" | "email" | "role" | "id">,
  overrides: Partial<UserProfile> = {}
): UserProfile => {
  const { firstName, lastName } = splitName(user.name);
  const handle = user.email.split("@")[0].replace(/[^a-z0-9]/gi, "_").toLowerCase();
  return {
    firstName,
    lastName,
    phone: "",
    country: COUNTRIES[0],
    timeZone: TIME_ZONES[1],
    username: `${handle}_${user.id.slice(-2)}`,
    department: "—",
    team: "",
    reportingManager: "—",
    jobTitle: "",
    employeeId: `#${(firstName[0] ?? "U").toUpperCase()}${(lastName[0] ?? "X").toUpperCase()}-${user.id.slice(-4)}`,
    mfaEnabled: false,
    passwordChangedAt: isoDaysAgo(30),
    session: {
      device: "Unknown Device",
      browser: "—",
      location: "—",
      ip: "—",
    },
    permissions: defaultPermissionsFor(user.role),
    subscriptions: [],
    assets: [],
    audit: [],
    ...overrides,
  };
};

const DEMO_SUBSCRIPTIONS: Subscription[] = [
  { id: "sub-core", product: "Far Core Engine™", expiresAt: "2026-01-31", status: "Active" },
  { id: "sub-mind", product: "MindState™ Pro", expiresAt: "2026-10-31", status: "Active" },
];

const DEMO_ASSETS: DigitalAsset[] = [
  {
    id: "as-1",
    name: "Primary API Access Key",
    kind: "API Key",
    resourceId: "AK-9842-XF-112",
    assignedAt: "2023-10-12",
    accessLevel: "Full Admin",
    status: "Valid",
  },
  {
    id: "as-2",
    name: "Storage Volume: 'Delta-Node'",
    kind: "Storage",
    resourceId: "SV-VOL-00921-A",
    assignedAt: "2023-11-05",
    accessLevel: "Read/Write",
    status: "Allocated",
  },
  {
    id: "as-3",
    name: "Compute Cluster 'Titan-01'",
    kind: "Compute",
    resourceId: "CC-TI-PRD-8821",
    assignedAt: "2024-01-14",
    accessLevel: "Scheduled",
    status: "Suspended",
  },
  {
    id: "as-4",
    name: "Dev Protocol SDK License",
    kind: "License",
    resourceId: "LIC-SDK-V2-THORNE",
    assignedAt: "2024-02-01",
    accessLevel: "Enterprise",
    status: "Active",
  },
];

const DEMO_AUDIT: AuditEntry[] = [
  {
    id: "au-1",
    at: isoDaysAgo(0, 1, 12),
    action: "Product Purchased: MindState™ Pro",
    kind: "purchase",
    device: "MacBook Pro (Chrome)",
    location: "New York, US",
    ip: "192.168.1.1",
    result: "Success",
  },
  {
    id: "au-2",
    at: isoDaysAgo(1, 3, 40),
    action: "Reflection™ Protocol Modified",
    kind: "protocol",
    device: "iPhone 15 (Safari)",
    location: "New York, US",
    ip: "172.16.0.42",
    result: "Success",
  },
  {
    id: "au-3",
    at: isoDaysAgo(3, 5, 5),
    action: "Unauthorized Login Attempt",
    kind: "security",
    device: "Unknown Device (Linux)",
    location: "London, UK",
    ip: "84.21.19.102",
    result: "Blocked",
  },
  {
    id: "au-4",
    at: isoDaysAgo(4, 2, 18),
    action: "MFA Authentication Successful",
    kind: "auth",
    device: "MacBook Pro (Chrome)",
    location: "New York, US",
    ip: "192.168.1.1",
    result: "Success",
  },
  {
    id: "au-5",
    at: isoDaysAgo(6, 7, 30),
    action: "Password Changed",
    kind: "security",
    device: "MacBook Pro (Chrome)",
    location: "New York, US",
    ip: "192.168.1.1",
    result: "Success",
  },
  {
    id: "au-6",
    at: isoDaysAgo(9, 1, 2),
    action: "Product Purchased: Far Core Engine™",
    kind: "purchase",
    device: "MacBook Pro (Chrome)",
    location: "New York, US",
    ip: "192.168.1.1",
    result: "Success",
  },
];

const withIds = <T extends { id: string }>(list: T[], userId: string): T[] =>
  list.map((item) => ({ ...item, id: `${userId}-${item.id}` }));

const DEMO_SESSION = {
  device: 'MacBook Pro 16"',
  browser: "Chrome v118.0.2",
  location: "New York, US",
  ip: "84.21.19.102",
};

const seed = (
  base: Omit<ManagedUser, "profile">,
  overrides: Partial<UserProfile> = {},
  withDemoData = true
): ManagedUser => ({
  ...base,
  profile: buildProfile(base, {
    ...(withDemoData
      ? {
          subscriptions: withIds(DEMO_SUBSCRIPTIONS, base.id),
          assets: withIds(DEMO_ASSETS, base.id),
          audit: withIds(DEMO_AUDIT, base.id),
          session: DEMO_SESSION,
          mfaEnabled: true,
          passwordChangedAt: isoDaysAgo(14),
        }
      : {}),
    ...overrides,
  }),
});

export const INITIAL_USERS: ManagedUser[] = [
  seed(
    {
      id: "FAR-US-9921",
      name: "Sophia Loren",
      subtitle: "Verified User",
      email: "sophia.l@enterprise.com",
      role: "Enterprise Admin",
      organization: "Global Tech Solutions",
      status: "Active",
      verification: "Verified",
      registeredAt: "2023-10-12",
      lastActive: "2 hours ago",
      avatar: sophiaAvatar,
    },
    {
      phone: "+1 (555) 214-7781",
      department: "Operations",
      team: "Enterprise Enablement",
      reportingManager: "Michel Sossa",
      jobTitle: "Enterprise Administrator",
      timeZone: "PST (GMT-8)",
    }
  ),
  seed(
    {
      id: "FAR-US-1042",
      name: "Marcus Thorne",
      subtitle: "Internal Audit",
      email: "m.thorne@far-engine.tech",
      role: "Founder / Admin",
      organization: "FAR Platform Engine™",
      status: "Active",
      verification: "Verified",
      registeredAt: "2021-01-05",
      lastActive: "Just now",
      avatar: marcusAvatar,
    },
    {
      phone: "+1 (555) 012-9932",
      username: "mthor_xt_99",
      department: "Corporate Strategy",
      team: "Core Architecture Group",
      reportingManager: "Michel Sossa",
      jobTitle: "Principal Architect",
      employeeId: "#TH-0042",
    }
  ),
  seed(
    {
      id: "FAR-US-8821",
      name: "Elena Rossi",
      subtitle: "Unverified Account",
      email: "e.rossi@contractor.io",
      role: "Consumer",
      organization: "Boutique Consulting",
      status: "Suspended",
      verification: "Unverified",
      registeredAt: "2023-12-20",
      lastActive: "3 weeks ago",
      avatar: elenaAvatar,
    },
    {
      country: "Italy",
      timeZone: "CET (GMT+1)",
      phone: "+39 02 555 0199",
      subscriptions: [],
      assets: [],
      mfaEnabled: false,
    }
  ),
  seed(
    {
      id: "FAR-US-1207",
      name: "James Okonkwo",
      subtitle: "Operations Lead",
      email: "james@stellar.tech",
      role: "Employee",
      organization: "Stellar Tech Corp",
      status: "Active",
      verification: "Verified",
      registeredAt: "2024-04-08",
      lastActive: "Yesterday",
    },
    {
      country: "Nigeria",
      timeZone: "WAT (GMT+1)",
      department: "Operations",
      team: "Delivery",
      reportingManager: "Sophia Loren",
      jobTitle: "Operations Lead",
    }
  ),
  seed(
    {
      id: "FAR-US-1311",
      name: "Ava Chen",
      subtitle: "Verified User",
      email: "ava.chen@mail.com",
      role: "Consumer",
      organization: "Independent",
      status: "Active",
      verification: "Verified",
      registeredAt: "2024-05-16",
      lastActive: "5 days ago",
    },
    { country: "Singapore", timeZone: "SGT (GMT+8)" },
    false
  ),
];

/** Platform-wide totals; list changes are applied on top of these as deltas. */
export const PLATFORM_TOTALS = {
  total: 18420,
  active: 17950,
  suspended: 45,
  newLast30: 612,
  consumers: 16204,
  employees: 1842,
  activeEnterprise: 184,
  invites: 89,
  verified: 17800,
};

// ── Presentation helpers ────────────────────────────────────────────────────

export const roleBadgeClass: Record<UserRole, string> = {
  "Enterprise Admin": "border-[#06b6d4]/20 bg-[#06b6d4]/10 text-[#22d3ee]",
  "Founder / Admin": "border-[#eab308]/20 bg-[#eab308]/10 text-[#eab308]",
  Employee: "border-[#8b5cf6]/20 bg-[#8b5cf6]/10 text-[#a78bfa]",
  Consumer: "border-[#6b7280]/20 bg-[#6b7280]/10 text-[#9ca3af]",
};

export const statusColorClass: Record<UserStatus, { dot: string; text: string }> =
  {
    Active: { dot: "bg-[#10b981]", text: "text-[#10b981]" },
    Invited: { dot: "bg-[#22d3ee]", text: "text-[#22d3ee]" },
    Suspended: { dot: "bg-[#ef4444]", text: "text-[#ef4444]" },
  };

export const formatRegDate = (iso: string) =>
  new Date(iso.length === 10 ? `${iso}T00:00:00` : iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

export const formatMonthYear = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

const timeOf = (d: Date) =>
  d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

export const formatAuditTime = (iso: string) => {
  const d = new Date(iso);
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((startOfToday.getTime() - d.getTime()) / DAY_MS) + 1;
  if (d >= startOfToday) return `Today, ${timeOf(d)}`;
  if (diffDays === 1) return `Yesterday, ${timeOf(d)}`;
  return `${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}, ${timeOf(d)}`;
};

export const daysSince = (iso: string) =>
  Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / DAY_MS));

export const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const matchesPeriod = (iso: string, period: RegistrationPeriod) => {
  if (period === "Any Time") return true;
  const ageDays = (Date.now() - new Date(`${iso}T00:00:00`).getTime()) / DAY_MS;
  if (period === "Last 30 Days") return ageDays <= 30;
  if (period === "Last 12 Months") return ageDays <= 365;
  return ageDays > 365;
};

export const nextUserId = (users: ManagedUser[]) => {
  const max = users.reduce((acc, u) => {
    const n = Number(u.id.replace(/\D/g, ""));
    return Number.isFinite(n) ? Math.max(acc, n) : acc;
  }, 0);
  return `FAR-US-${max + 1}`;
};

export const userProfilePath = (id: string) => `/founder/user-management/${id}`;
