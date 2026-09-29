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
  /** What the reader is told this report concludes. */
  summary: string;
  /** One finding per line. */
  findings: string;
  recommendation: string;
  /** Cycle the report covers, e.g. Q4 2024. */
  period: string;
  owner: string;
  /** Internal note. It is not printed on the delivered file. */
  founderNote: string;
}

const isoDaysAgo = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
};

type ReportSeed = Omit<
  Report,
  "summary" | "findings" | "recommendation" | "period" | "owner" | "founderNote"
>;

const REPORT_SEEDS: ReportSeed[] = [
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

type ReportBrief = Pick<
  Report,
  "summary" | "findings" | "recommendation" | "period" | "owner"
>;

const REPORT_BRIEFS: Record<string, ReportBrief> = {
  "REP-2901-X": {
    period: "Q4 2024",
    owner: "Enterprise Finance",
    summary:
      "Global Tech Solutions closed the quarter ahead of the platform plan. Enterprise seats and reflection completions both rose, while token cost stayed inside the forecast band.",
    findings:
      "Net revenue finished 6.2% above the Q4 plan.\nEnterprise reflection completions rose 11% against Q3.\nToken cost per delivered report held at $0.42.",
    recommendation:
      "Keep the current enterprise price and brief the account team on the three organizations driving the gain before the January renewal cycle.",
  },
  "REP-2905-K": {
    period: "January 2025",
    owner: "Protocol Office",
    summary:
      "Quantum Systems meets the current FAR Core control set, with one open item: session logs older than 18 months are still stored in the primary region.",
    findings:
      "Access reviews for privileged roles are complete and current.\nEncryption at rest and in transit matches the protocol.\nRetention for session logs exceeds the 18-month rule in one region.",
    recommendation:
      "Approve after Quantum confirms a purge date for the oversized log store. Do not deliver until that date is on the record.",
  },
  "REP-2882-M": {
    period: "Last 14 days",
    owner: "Founder Operations",
    summary:
      "The incident file did not finish. Source activity for three internal accounts stopped mid-export, so the report has no reliable timeline yet.",
    findings:
      "Generation stopped while reading User Control Matrix events.\nThree accounts are missing the second half of the window.\nNo file was produced, so nothing has been delivered.",
    recommendation:
      "Retry once the activity export is whole. Leave the report failed until that export is confirmed.",
  },
  "REP-2876-A": {
    period: "H2 2024",
    owner: "People & Culture",
    summary:
      "Stellar Tech’s leadership cohort shows a clear strength in decision clarity and a gap in follow-through after reflection sessions.",
    findings:
      "Decision clarity scored in the top quartile of organization assessments.\nFollow-through 30 days after a session is 18 points below the cohort median.\nManagers asked for a shorter action plan in the delivered report.",
    recommendation:
      "Deliver the approved file with the shorter action plan, and schedule a 30-day continuum check for the same cohort.",
  },
  "REP-2870-Q": {
    period: "FY 2025 outlook",
    owner: "Founder Office",
    summary:
      "The platform can carry another enterprise tier without a new product, provided protocol review capacity grows with the sales pipeline.",
    findings:
      "Pipeline coverage is 3.1× the current quarter target.\nRefiner queue time is the constraint, not product availability.\nTwo regions account for most of the waiting reviews.",
    recommendation:
      "Hold new product work. Add review capacity in those two regions before the next enterprise launch.",
  },
  "REP-2864-D": {
    period: "Single session",
    owner: "Member Success",
    summary:
      "The member’s reflection points to one decision that has been deferred for three sessions. The report names that decision and the cost of leaving it open.",
    findings:
      "The same decision appears in three consecutive sessions.\nThe member can state the options clearly and has not chosen one.\nNo risk flag was raised by the protocol.",
    recommendation:
      "Deliver as written. The next session should start from the named decision rather than a new prompt.",
  },
  "REP-2851-R": {
    period: "FY 2024",
    owner: "Enterprise Finance",
    summary:
      "The forecast puts Global Tech 4% under the annual plan if January renewals slip, and 2% over the plan if the two pending expansions close on time.",
    findings:
      "Base case assumes both expansions close in January.\nA 30-day slip moves the account under plan.\nServices revenue is steady and does not close the gap alone.",
    recommendation:
      "Hold approval until finance confirms the expansion dates. The brief should not ship with an unconfirmed close.",
  },
  "REP-2847-T": {
    period: "Q4 2024",
    owner: "People & Culture",
    summary:
      "Stellar Tech’s product and delivery teams are aligned on priorities and split on how quickly a reflection should become an action.",
    findings:
      "Priority ranking matches across both teams.\nDelivery wants actions inside 14 days. Product plans on 45.\nThe gap shows up as reopened reflections, not as conflict in the sessions.",
    recommendation:
      "Publish the summary and ask the organization admin to set one action window for the next cycle.",
  },
  "REP-2839-P": {
    period: "Policy year 2024",
    owner: "Protocol Office",
    summary:
      "Quantum Systems now deletes reflection media on the schedule in the data retention policy. The earlier exception has been closed.",
    findings:
      "Media older than the policy window has been removed.\nDeletion events are present in the audit log.\nNo consumer record was retained past the stated period.",
    recommendation:
      "Mark delivered. No further founder action is required for this cycle.",
  },
  "REP-2830-L": {
    period: "12–22 January",
    owner: "Founder Operations",
    summary:
      "An internal account opened report files outside its usual hours. The access was traced to a scheduled export, not to a compromised session.",
    findings:
      "The account belongs to the reporting job, not a person.\nThe export window matches the new nightly schedule.\nNo data left the platform.",
    recommendation:
      "Close the incident. Name the job account in the control matrix so the next export does not read as an anomaly.",
  },
  "REP-2822-B": {
    period: "Last 30 days",
    owner: "Member Success",
    summary:
      "The member’s month shows steadier language around one relationship and a new concern about workload. The digest is ready for a founder read before it is released.",
    findings:
      "Relational language is more specific than in the prior month.\nWorkload appears as a new theme in the last four sessions.\nThe member has not asked for the digest to be shared.",
    recommendation:
      "Approve for the member only. Do not copy an organization admin on a consumer digest.",
  },
  "REP-2815-H": {
    period: "2025 plan",
    owner: "Organization Success",
    summary:
      "Boutique Consulting can grow on the current reflection set. The constraint is invitation follow-through, not the product itself.",
    findings:
      "Invited employees finish at half the rate of the founder’s own sessions.\nCompleted sessions produce reports the leadership team actually uses.\nA second product would split a team that has not finished the first.",
    recommendation:
      "Stay on one product for the next two quarters and review invitation completion before any expansion.",
  },
  "REP-2790-C": {
    period: "Q3 2024",
    owner: "Protocol Office",
    summary:
      "Global Tech’s third-quarter controls were met. This snapshot is kept for comparison and is no longer part of the active approval queue.",
    findings:
      "All required controls were evidenced at the time of issue.\nTwo items were later superseded by the Q4 audit.\nThe file remains available to the enterprise admin.",
    recommendation:
      "Leave archived. Use the Q4 audit for any current decision.",
  },
  "REP-2754-F": {
    period: "Annual review",
    owner: "Founder Office",
    summary:
      "The annual pack for Boutique Consulting records the decisions already taken. It is archived so later briefs can be read against it.",
    findings:
      "Three strategic bets from the pack were funded.\nOne bet was declined and is marked as such in the file.\nNo open action from this pack remains.",
    recommendation:
      "Keep archived. Do not reissue. The current plan lives in the growth playbook.",
  },
};

const fallbackBrief = (seed: ReportSeed): ReportBrief => ({
  period: "Current cycle",
  owner: "Founder Office",
  summary: `${seed.title} was prepared for ${seed.organization} from ${seed.product}.`,
  findings: "Findings will appear here when generation completes.",
  recommendation: "Read the brief before changing status.",
});

export const INITIAL_REPORTS: Report[] = REPORT_SEEDS.map((seed) => ({
  ...seed,
  founderNote: "",
  ...(REPORT_BRIEFS[seed.id] ?? fallbackBrief(seed)),
}));

export const reportFindings = (findings: string) =>
  findings
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export const reportStatusMeaning: Record<ReportStatus, string> = {
  Delivered:
    "Released to the organization. A later edit updates the record the next file is built from. It does not rewrite the file already sent.",
  Approved: "Accepted by the founder. It can be delivered, or archived if it should not go out.",
  "Pending Approval":
    "Waiting on a founder decision. People outside this office cannot see it yet.",
  Failed: "No file was produced. Retry uses this same brief once the source data is whole.",
  Archived: "Kept for the record and removed from the active delivery cycle.",
};

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
  /** What this template is for, in the language a reader will recognize. */
  purpose: string;
  /** Sections this template includes when a report is generated from it. */
  sections: TemplateSectionId[];
}

export const INITIAL_TEMPLATES: ReportTemplate[] = [
  {
    id: "TMPL-2023-MG",
    name: "Market Growth Protocol™",
    category: "Financial Analysis",
    division: "Global Operations",
    audience: "Founder",
    version: "v2.4.0",
    status: "Published",
    purpose:
      "Explains whether an organization is ahead of, on, or behind its growth plan, and what the founder should do before the next renewal cycle.",
    sections: ["cover", "summary", "results", "charts", "action-plan"],
  },
  {
    id: "TMPL-2023-SEC",
    name: "Security Integrity Audit",
    category: "Compliance",
    division: "Internal Labs",
    audience: "Enterprise",
    version: "v1.0.8",
    status: "Drafting",
    purpose:
      "States which controls an organization meets, which exception is still open, and whether the file is safe to deliver.",
    sections: ["cover", "summary", "results", "action-plan"],
  },
  {
    id: "TMPL-2023-LC",
    name: "Leadership Continuum",
    category: "Leadership",
    division: "Enterprise Delivery",
    audience: "Org",
    version: "v3.1.2",
    status: "Published",
    purpose:
      "Shows a leadership cohort where it is strong, where follow-through drops after a session, and the one action window to set next.",
    sections: ["cover", "summary", "results", "action-plan", "history"],
  },
  {
    id: "TMPL-2024-RF",
    name: "Personal Reflection Digest",
    category: "Reflection",
    division: "Consumer Success",
    audience: "Consumer",
    version: "v1.2.0",
    status: "Published",
    purpose:
      "Gives a member a clear reading of the month: what stayed the same, what appeared, and where the next session should begin.",
    sections: ["cover", "summary", "results", "history"],
  },
  {
    id: "TMPL-2024-OPS",
    name: "Operational Readiness Brief",
    category: "Operations",
    division: "Global Operations",
    audience: "Enterprise",
    version: "v0.9.4",
    status: "Drafting",
    purpose:
      "Tells an enterprise admin whether the organization can run the next cycle on the current product, invitations, and review capacity.",
    sections: ["cover", "summary", "results", "charts", "action-plan"],
  },
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
