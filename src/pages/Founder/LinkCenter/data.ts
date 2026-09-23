export type LinkStatus = "Active" | "Expired" | "Disabled";

export type LinkType =
  | "Invitation"
  | "User Invite"
  | "Report Link"
  | "Product Link"
  | "Org Link";

export type LinkSecurity = {
  singleUse: boolean;
  emailVerification: boolean;
  passwordProtection: boolean;
  password: string;
  ipRestriction: boolean;
  ip: string;
};

export type ModulePermissions = {
  product: boolean;
  reflection: boolean;
  dashboard: boolean;
  report: boolean;
  continuum: boolean;
};

export type PlatformLink = {
  id: string;
  name: string;
  type: LinkType;
  status: LinkStatus;
  created: string;
  expires: string;
  clicks: number;
  path: string;
  description: string;
  product: string;
  roles: string[];
  permissions: ModulePermissions;
  security: LinkSecurity;
};

export const PRODUCTS = [
  "Growth Engine™",
  "FAR Reflection™",
  "Continuum™",
  "Enterprise Portal™",
] as const;

export const ROLE_OPTIONS = [
  "Founder",
  "Admin",
  "Employee",
  "Consumer",
  "Enterprise Admin",
] as const;

export const DEFAULT_PERMISSIONS: ModulePermissions = {
  product: true,
  reflection: true,
  dashboard: false,
  report: true,
  continuum: true,
};

export const DEFAULT_SECURITY: LinkSecurity = {
  singleUse: false,
  emailVerification: true,
  passwordProtection: false,
  password: "",
  ipRestriction: false,
  ip: "",
};

const TYPE_CODE: Record<LinkType, string> = {
  Invitation: "OB",
  "User Invite": "EI",
  "Report Link": "RS",
  "Product Link": "PL",
  "Org Link": "EA",
};

const seed = (
  partial: Pick<PlatformLink, "id" | "name" | "type" | "status" | "created" | "expires" | "clicks" | "path">,
): PlatformLink => ({
  description: "",
  product: "Growth Engine™",
  roles: ["Founder", "Admin"],
  permissions: { ...DEFAULT_PERMISSIONS },
  security: { ...DEFAULT_SECURITY },
  ...partial,
});

const INITIAL_LINKS: PlatformLink[] = [
  seed({
    id: "LNK-2024-OB-001",
    name: "Onboarding Flow Link",
    type: "Invitation",
    status: "Active",
    created: "Jan 15, 2024",
    expires: "Feb 15, 2024",
    clicks: 2847,
    path: "onboarding/flow",
  }),
  seed({
    id: "LNK-2024-EI-042",
    name: "Employee Invitation",
    type: "User Invite",
    status: "Active",
    created: "Jan 18, 2024",
    expires: "Mar 01, 2024",
    clicks: 914,
    path: "invite/employee",
  }),
  seed({
    id: "LNK-2023-RS-187",
    name: "Report Share Link",
    type: "Report Link",
    status: "Expired",
    created: "Nov 05, 2023",
    expires: "Dec 05, 2023",
    clicks: 5102,
    path: "reports/share",
  }),
  seed({
    id: "LNK-2024-PL-009",
    name: "Product Launch Portal",
    type: "Product Link",
    status: "Disabled",
    created: "Jan 02, 2024",
    expires: "—",
    clicks: 12431,
    path: "products/launch",
  }),
  seed({
    id: "LNK-2024-EA-055",
    name: "Enterprise Access Gate",
    type: "Org Link",
    status: "Active",
    created: "Jan 20, 2024",
    expires: "Jun 30, 2024",
    clicks: 7098,
    path: "org/access",
  }),
];

let links: PlatformLink[] = INITIAL_LINKS;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((listener) => listener());

export const subscribeLinks = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getLinks = () => links;

export const formatLinkDate = (value: string) => {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const nextId = (type: LinkType) => {
  const year = new Date().getFullYear();
  const code = TYPE_CODE[type];
  const seq = String(links.length + 1).padStart(3, "0");
  return `LNK-${year}-${code}-${seq}`;
};

export const addLink = (draft: Omit<PlatformLink, "id" | "clicks" | "created" | "status"> & { status?: LinkStatus }) => {
  const link: PlatformLink = {
    ...draft,
    id: nextId(draft.type),
    clicks: 0,
    created: formatLinkDate(new Date().toISOString().slice(0, 10)),
    status: draft.status ?? "Active",
    expires: draft.expires || "—",
  };
  links = [link, ...links];
  emit();
  return link;
};

export const updateLink = (id: string, patch: Partial<PlatformLink>) => {
  links = links.map((link) => (link.id === id ? { ...link, ...patch } : link));
  emit();
};

export const disableLink = (id: string) => {
  updateLink(id, { status: "Disabled" });
};

const BASE_STATS = {
  active: 1284,
  createdToday: 47,
  invitations: 312,
  products: 428,
  organizations: 156,
  reports: 203,
  expired: 89,
  visits: 48392,
};

const SEED_STATUS = new Map(INITIAL_LINKS.map((link) => [link.id, link.status]));

export const presentationStats = (rows: PlatformLink[] = links) => {
  const stats = { ...BASE_STATS };
  for (const link of rows) {
    const seedStatus = SEED_STATUS.get(link.id);
    if (!seedStatus) {
      stats.createdToday += 1;
      stats.visits += link.clicks;
      if (link.status === "Active") stats.active += 1;
      if (link.status === "Expired") stats.expired += 1;
      if (link.type === "Invitation" && link.status === "Active") stats.invitations += 1;
      if (link.type === "Product Link") stats.products += 1;
      if (link.type === "Org Link") stats.organizations += 1;
      if (link.type === "Report Link") stats.reports += 1;
      continue;
    }
    if (seedStatus === "Active" && link.status !== "Active") stats.active -= 1;
    if (seedStatus !== "Expired" && link.status === "Expired") stats.expired += 1;
  }
  return stats;
};

export const downloadLinkList = (rows: PlatformLink[] = links) => {
  const header = ["Name", "ID", "Type", "Status", "Created", "Expiration", "Clicks", "Destination"];
  const escape = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
  const body = rows.map((link) =>
    [
      link.name,
      link.id,
      link.type,
      link.status,
      link.created,
      link.expires,
      link.clicks,
      `https://app.farplatform.com/${link.path}`,
    ]
      .map(escape)
      .join(","),
  );
  const blob = new Blob([[header.join(","), ...body].join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "far-link-list.csv";
  anchor.click();
  URL.revokeObjectURL(url);
};
