// ── Reports ─────────────────────────────────────────────────────────────────

export const REPORT_STATUSES = [
  "Delivered",
  "Approved",
  "Pending Approval",
  "Failed",
  "Archived",
] as const;
export type ReportStatus = (typeof REPORT_STATUSES)[number];

export const REPORT_TYPES = [
  "Financial",
  "Compliance",
  "Incident",
  "Strategic",
  "Assessment",
] as const;
export type ReportType = (typeof REPORT_TYPES)[number];

export const REPORT_DIVISIONS = ["Consumer", "Organization", "Founder", "Enterprise"] as const;
export type ReportDivision = (typeof REPORT_DIVISIONS)[number];

export const DATE_RANGES = ["7D", "30D", "90D", "All"] as const;
export type DateRange = (typeof DATE_RANGES)[number];

export const REPORT_PRODUCTS = [
  "FAR Platform Engine™",
  "FAR Core Protocol™",
  "User Control Matrix",
  "Mindstate Readiness™",
  "Illumination Bridge™",
] as const;

export const REPORT_ORGANIZATIONS = [
  "Global Tech Solutions",
  "Quantum Systems",
  "Internal Operations",
  "Stellar Tech Corp",
  "Boutique Consulting",
  "Individual",
] as const;

export interface Report {
  id: string;
  title: string;
  product: string;
  organization: string;
  type: ReportType;
  division: ReportDivision;
  /** ISO date (yyyy-mm-dd). */
  createdAt: string;
  status: ReportStatus;
  sizeMb: number | null;
  note?: string;
}

const isoDaysAgo = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
};

export const INITIAL_REPORTS: Report[] = [
  { id: "REP-2901-X", title: "Q4 Market Growth Analysis", product: "FAR Platform Engine™", organization: "Global Tech Solutions", type: "Financial", division: "Enterprise", createdAt: isoDaysAgo(1), status: "Delivered", sizeMb: 2.8 },
  { id: "REP-2905-K", title: "Security Compliance Audit", product: "FAR Core Protocol™", organization: "Quantum Systems", type: "Compliance", division: "Organization", createdAt: isoDaysAgo(0), status: "Pending Approval", sizeMb: null },
  { id: "REP-2882-M", title: "User Activity Incident Report", product: "User Control Matrix", organization: "Internal Operations", type: "Incident", division: "Founder", createdAt: isoDaysAgo(3), status: "Failed", sizeMb: null, note: "Data generation error" },
  { id: "REP-2876-A", title: "Leadership Continuum Review", product: "Mindstate Readiness™", organization: "Stellar Tech Corp", type: "Assessment", division: "Organization", createdAt: isoDaysAgo(4), status: "Approved", sizeMb: 1.9 },
  { id: "REP-2870-Q", title: "Founder Strategy Brief", product: "FAR Platform Engine™", organization: "Internal Operations", type: "Strategic", division: "Founder", createdAt: isoDaysAgo(6), status: "Delivered", sizeMb: 3.4 },
  { id: "REP-2864-D", title: "Decision Clarity Report", product: "Illumination Bridge™", organization: "Individual", type: "Assessment", division: "Consumer", createdAt: isoDaysAgo(8), status: "Delivered", sizeMb: 1.2 },
  { id: "REP-2851-R", title: "Revenue Forecast FY24", product: "FAR Platform Engine™", organization: "Global Tech Solutions", type: "Financial", division: "Enterprise", createdAt: isoDaysAgo(11), status: "Pending Approval", sizeMb: null },
  { id: "REP-2847-T", title: "Team Alignment Summary", product: "Mindstate Readiness™", organization: "Stellar Tech Corp", type: "Assessment", division: "Organization", createdAt: isoDaysAgo(14), status: "Delivered", sizeMb: 3.1 },
  { id: "REP-2839-P", title: "Data Retention Policy Check", product: "FAR Core Protocol™", organization: "Quantum Systems", type: "Compliance", division: "Enterprise", createdAt: isoDaysAgo(18), status: "Approved", sizeMb: 0.9 },
  { id: "REP-2830-L", title: "Access Anomaly Investigation", product: "User Control Matrix", organization: "Internal Operations", type: "Incident", division: "Founder", createdAt: isoDaysAgo(22), status: "Delivered", sizeMb: 2.2 },
  { id: "REP-2822-B", title: "Personal Reflection Digest", product: "Illumination Bridge™", organization: "Individual", type: "Assessment", division: "Consumer", createdAt: isoDaysAgo(26), status: "Pending Approval", sizeMb: null },
  { id: "REP-2815-H", title: "Boutique Growth Playbook", product: "FAR Platform Engine™", organization: "Boutique Consulting", type: "Strategic", division: "Organization", createdAt: isoDaysAgo(41), status: "Delivered", sizeMb: 4.2 },
  { id: "REP-2790-C", title: "Q3 Compliance Snapshot", product: "FAR Core Protocol™", organization: "Global Tech Solutions", type: "Compliance", division: "Enterprise", createdAt: isoDaysAgo(63), status: "Archived", sizeMb: 2.1 },
  { id: "REP-2754-F", title: "Founder Review Pack", product: "FAR Platform Engine™", organization: "Boutique Consulting", type: "Strategic", division: "Founder", createdAt: isoDaysAgo(120), status: "Archived", sizeMb: 4.8 },
];

/** Platform-wide figures shown in the summary cards (the table holds a sample). */
export const REPORT_TOTALS = {
  total: "42,892",
  growth: "+5.4% growth",
  generatedToday: "1,248",
  deliveryRate: "84.2% delivery rate",
  pendingApproval: "18",
  failed: "4",
  approved: "38.2k",
  delivered: "36.1k",
  archived: "4.2k",
  templates: "84",
  avgSize: "2.4 MB",
  mostGenerated: "Q4 Growth",
};

export const reportStatusMeta: Record<ReportStatus, { dot: string; text: string }> = {
  Delivered: { dot: "bg-[#10b981]", text: "text-[#10b981]" },
  Approved: { dot: "bg-[#22d3ee]", text: "text-[#22d3ee]" },
  "Pending Approval": { dot: "bg-[#eab308]", text: "text-[#eab308]" },
  Failed: { dot: "bg-[#ef4444]", text: "text-[#ef4444]" },
  Archived: { dot: "bg-[#6b7280]", text: "text-[#9ca3af]" },
};

export const reportTypeBadge: Record<ReportType, string> = {
  Financial: "border-[rgba(6,182,212,0.2)] bg-[rgba(6,182,212,0.1)] text-[#22d3ee]",
  Compliance: "border-[rgba(234,179,8,0.2)] bg-[rgba(234,179,8,0.1)] text-[#eab308]",
  Incident: "border-[rgba(107,114,128,0.2)] bg-[rgba(107,114,128,0.1)] text-[#9ca3af]",
  Strategic: "border-[rgba(59,130,246,0.2)] bg-[rgba(59,130,246,0.1)] text-[#60a5fa]",
  Assessment: "border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.1)] text-[#10b981]",
};

export const reportTypeIconTone: Record<ReportType, string> = {
  Financial: "border-[rgba(34,211,238,0.2)] bg-[rgba(34,211,238,0.1)] text-[#22d3ee]",
  Compliance: "border-[rgba(234,179,8,0.2)] bg-[rgba(234,179,8,0.1)] text-[#eab308]",
  Incident: "border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.1)] text-[#ef4444]",
  Strategic: "border-[rgba(59,130,246,0.2)] bg-[rgba(59,130,246,0.1)] text-[#60a5fa]",
  Assessment: "border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.1)] text-[#10b981]",
};

export const reportStatusNote = (r: Report) => {
  if (r.note) return r.note;
  switch (r.status) {
    case "Delivered":
      return `PDF Ready • ${r.sizeMb ?? 0} MB`;
    case "Approved":
      return "Queued for delivery";
    case "Pending Approval":
      return "Drafting PDF...";
    case "Failed":
      return "Generation failed";
    case "Archived":
      return r.sizeMb ? `Archived • ${r.sizeMb} MB` : "Archived";
  }
};

const DATE_RANGE_DAYS: Record<DateRange, number> = {
  "7D": 7,
  "30D": 30,
  "90D": 90,
  All: Number.POSITIVE_INFINITY,
};

export const withinRange = (iso: string, range: DateRange) => {
  const ageMs = Date.now() - new Date(`${iso}T00:00:00`).getTime();
  return ageMs / 86_400_000 <= DATE_RANGE_DAYS[range];
};

export const formatReportDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

// ── Templates & configuration ───────────────────────────────────────────────

export const TEMPLATE_STATUSES = ["Published", "Drafting", "Archived"] as const;
export type TemplateStatus = (typeof TEMPLATE_STATUSES)[number];

export const TEMPLATE_AUDIENCES = ["Consumer", "Org", "Founder", "Enterprise"] as const;
export type TemplateAudience = (typeof TEMPLATE_AUDIENCES)[number];

export const TEMPLATE_CATEGORIES = [
  "Financial Analysis",
  "Compliance",
  "Leadership",
  "Reflection",
  "Operations",
] as const;

export const TEMPLATE_DIVISIONS = [
  "Global Operations",
  "Internal Labs",
  "Consumer Success",
  "Enterprise Delivery",
] as const;

export interface ReportTemplate {
  id: string;
  name: string;
  category: string;
  division: string;
  audience: TemplateAudience;
  version: string;
  status: TemplateStatus;
}

export const INITIAL_TEMPLATES: ReportTemplate[] = [
  { id: "TMPL-2023-MG", name: "Market Growth Protocol™", category: "Financial Analysis", division: "Global Operations", audience: "Founder", version: "v2.4.0", status: "Published" },
  { id: "TMPL-2023-SEC", name: "Security Integrity Audit", category: "Compliance", division: "Internal Labs", audience: "Enterprise", version: "v1.0.8", status: "Drafting" },
  { id: "TMPL-2023-LC", name: "Leadership Continuum", category: "Leadership", division: "Enterprise Delivery", audience: "Org", version: "v3.1.2", status: "Published" },
  { id: "TMPL-2024-RF", name: "Personal Reflection Digest", category: "Reflection", division: "Consumer Success", audience: "Consumer", version: "v1.2.0", status: "Published" },
  { id: "TMPL-2024-OPS", name: "Operational Readiness Brief", category: "Operations", division: "Global Operations", audience: "Enterprise", version: "v0.9.4", status: "Drafting" },
];

export const templateAudienceMeta: Record<
  TemplateAudience,
  { label: string; subtitle: string; card: string; active: string; icon: string }
> = {
  Consumer: {
    label: "Consumer Reports",
    subtitle: "Visibility & Reflection",
    card: "border-[rgba(34,211,238,0.2)] bg-[rgba(34,211,238,0.05)]",
    active: "ring-[#22d3ee]/60",
    icon: "text-[#22d3ee]",
  },
  Org: {
    label: "Org Reports",
    subtitle: "Team Dynamic Metrics",
    card: "border-[rgba(59,130,246,0.2)] bg-[rgba(59,130,246,0.05)]",
    active: "ring-[#3b82f6]/60",
    icon: "text-[#3b82f6]",
  },
  Founder: {
    label: "Founder Reports",
    subtitle: "Strategy & Authority",
    card: "border-[rgba(234,179,8,0.2)] bg-[rgba(234,179,8,0.05)]",
    active: "ring-[#eab308]/60",
    icon: "text-[#eab308]",
  },
  Enterprise: {
    label: "Enterprise Reports",
    subtitle: "Global Scaling Data",
    card: "border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.05)]",
    active: "ring-[#10b981]/60",
    icon: "text-[#10b981]",
  },
};

export const templateStatusMeta: Record<TemplateStatus, { dot: string; text: string }> = {
  Published: { dot: "bg-[#10b981]", text: "text-[#10b981]" },
  Drafting: { dot: "bg-[#eab308]", text: "text-[#eab308]" },
  Archived: { dot: "bg-[#6b7280]", text: "text-[#9ca3af]" },
};

export const templateIconTone: Record<TemplateAudience, string> = {
  Consumer: "bg-[rgba(34,211,238,0.1)] text-[#22d3ee]",
  Org: "bg-[rgba(59,130,246,0.1)] text-[#60a5fa]",
  Founder: "bg-[rgba(234,179,8,0.1)] text-[#eab308]",
  Enterprise: "bg-[rgba(16,185,129,0.1)] text-[#10b981]",
};

export const bumpVersion = (version: string) => {
  const [major = 0, minor = 0, patch = 0] = version.replace(/^v/, "").split(".").map(Number);
  return `v${major}.${minor}.${patch + 1}`;
};

export const templateIdFrom = (name: string, existing: ReportTemplate[]) => {
  const initials =
    name
      .replace(/[^A-Za-z ]/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w[0].toUpperCase())
      .join("")
      .slice(0, 4) || "NEW";
  const base = `TMPL-${new Date().getFullYear()}-${initials}`;
  let id = base;
  for (let i = 2; existing.some((t) => t.id === id); i++) id = `${base}${i}`;
  return id;
};

export const WORKFLOW_STAGES = [
  { id: "ai-draft", label: "AI Draft" },
  { id: "far-consulting", label: "FAR Consulting™" },
  { id: "illumination-bridge", label: "Illumination Bridge™" },
  { id: "knowledge-asset", label: "Knowledge Asset" },
  { id: "approved", label: "Approved" },
  { id: "delivered", label: "Delivered" },
] as const;
export type WorkflowStageId = (typeof WORKFLOW_STAGES)[number]["id"];

export const APPROVAL_WORKFLOWS: { name: string; skipped: WorkflowStageId[] }[] = [
  { name: "Mindstate Readiness", skipped: [] },
  { name: "Leadership Continuum", skipped: ["illumination-bridge"] },
  { name: "Rapid Compliance", skipped: ["far-consulting", "knowledge-asset"] },
];

export const TEMPLATE_SECTIONS = [
  { id: "cover", title: "Cover Page", description: "Full-page branding with dynamic report title and ID." },
  { id: "summary", title: "Executive Summary", description: "High-level narrative generated by Founder AI." },
  { id: "results", title: "Assessment Results", description: "Detailed breakdown of protocol performance." },
  { id: "charts", title: "Charts & Visuals", description: "Plotly SVG exports for financial analytics." },
  { id: "action-plan", title: "Action Plan", description: "Step-by-step optimization recommendations." },
  { id: "history", title: "Continuity History", description: "Archive comparison data from previous cycles." },
] as const;
export type TemplateSectionId = (typeof TEMPLATE_SECTIONS)[number]["id"];

export const TYPOGRAPHY_OPTIONS = [
  "Inter Display / TWK Everett",
  "Playfair Display / Inter",
  "IBM Plex Sans / IBM Plex Mono",
] as const;

export interface PdfConfig {
  logoName: string;
  logoUrl?: string;
  primaryColor: string;
  accentColor: string;
  watermark: boolean;
  pageNumbering: boolean;
  typography: string;
}

export const INITIAL_PDF_CONFIG: PdfConfig = {
  logoName: "far_logo_dark.svg",
  primaryColor: "#EAB308",
  accentColor: "#22D3EE",
  watermark: true,
  pageNumbering: true,
  typography: TYPOGRAPHY_OPTIONS[0],
};

export const HEX_COLOR_RE = /^#[0-9A-Fa-f]{6}$/;

// ── Shared helpers ──────────────────────────────────────────────────────────

/** Page numbers with "…" gaps, e.g. [1, 2, 3, "…", 6]. */
export const pageList = (current: number, total: number): (number | "…")[] => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current - 1, current, current + 1]);
  if (current <= 3) [2, 3].forEach((p) => pages.add(p));
  if (current >= total - 2) [total - 1, total - 2].forEach((p) => pages.add(p));
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  return sorted.flatMap((p, i) => (i > 0 && p - sorted[i - 1] > 1 ? ["…" as const, p] : [p]));
};

export const downloadCsv = (filename: string, rows: (string | number)[][]) => {
  const csv = rows
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
