export type ReportStatus = "Approved" | "Processing" | "Archived";

export type ReportRow = {
  id: string;
  name: string;
  reflection: string;
  department: string;
  period: string;
  generated: string;
  status: ReportStatus;
  pdf: boolean;
  accountFilter: "Active" | "Archived";
};

export type ReportDetailData = ReportRow & {
  version: string;
  organization: string;
  campaign: string;
  assessmentDate: string;
  approvalDate: string;
  summary: string;
  findings: {
    title: string;
    percent: number;
    detail: string;
    color: string;
  }[];
  recommendations: string[];
  timeline: {
    label: string;
    date: string;
    state: "done" | "current";
    active?: boolean;
  }[];
};

export const REPORT_KPIS = [
  {
    label: "Total Reports",
    value: "125",
    delta: "+5.2%",
    icon: "total",
    accent: false,
  },
  {
    label: "Completed Reports",
    value: "118",
    delta: "+2.1%",
    icon: "completed",
    accent: false,
  },
  {
    label: "Pending Reports",
    value: "7",
    delta: "",
    icon: "pending",
    accent: true,
  },
  {
    label: "This Quarter",
    value: "Q3 2026",
    delta: "",
    icon: "quarter",
    accent: false,
    compact: true,
  },
  {
    label: "Previous Quarter",
    value: "Q2 2026",
    delta: "",
    icon: "prev",
    accent: false,
    compact: true,
  },
  {
    label: "Org Completion",
    value: "91%",
    delta: "",
    icon: "org",
    accent: false,
    progress: 91,
  },
  {
    label: "PDF Available",
    value: "118",
    delta: "+1.8%",
    icon: "pdf",
    accent: false,
  },
] as const;

export const REPORT_ROWS: ReportRow[] = [
  {
    id: "RPT-2026-0041",
    name: "Leadership Visibility Report",
    reflection: "Leadership Reflection",
    department: "Executive",
    period: "Q3 2026",
    generated: "Jun 1, 2026",
    status: "Approved",
    pdf: true,
    accountFilter: "Active",
  },
  {
    id: "RPT-2026-0040",
    name: "MindState™ Q3 2026",
    reflection: "MindState™ Reflection",
    department: "All Depts",
    period: "Q3 2026",
    generated: "Jun 1, 2026",
    status: "Approved",
    pdf: true,
    accountFilter: "Active",
  },
  {
    id: "RPT-2026-0039",
    name: "Team Assessment Report",
    reflection: "Team Health Reflection",
    department: "Engineering",
    period: "Q3 2026",
    generated: "May 31, 2026",
    status: "Approved",
    pdf: true,
    accountFilter: "Active",
  },
  {
    id: "RPT-2026-0037",
    name: "Operations Health Report",
    reflection: "Ops Reflection",
    department: "Operations",
    period: "Q3 2026",
    generated: "May 28, 2026",
    status: "Approved",
    pdf: true,
    accountFilter: "Active",
  },
  {
    id: "RPT-2026-0036",
    name: "Product Alignment Report",
    reflection: "Leadership Reflection",
    department: "Product",
    period: "Q3 2026",
    generated: "May 22, 2026",
    status: "Approved",
    pdf: true,
    accountFilter: "Active",
  },
  {
    id: "RPT-2026-0035",
    name: "HR Culture Snapshot",
    reflection: "MindState™ Reflection",
    department: "HR",
    period: "Q3 2026",
    generated: "May 18, 2026",
    status: "Approved",
    pdf: true,
    accountFilter: "Active",
  },
  {
    id: "RPT-2026-0038",
    name: "Sales Performance Report",
    reflection: "Leadership Reflection",
    department: "Sales",
    period: "Q2 2026",
    generated: "May 15, 2026",
    status: "Processing",
    pdf: false,
    accountFilter: "Active",
  },
  {
    id: "RPT-2025-0120",
    name: "Org Readiness™ Q4 2025",
    reflection: "Org Readiness™",
    department: "All Depts",
    period: "Q4 2025",
    generated: "Dec 31, 2025",
    status: "Archived",
    pdf: true,
    accountFilter: "Archived",
  },
];

const DETAIL_DEFAULT: Omit<ReportDetailData, keyof ReportRow> = {
  version: "v1.0",
  organization: "Encounters Corporation",
  campaign: "Q3 2026 Campaign",
  assessmentDate: "May 15, 2026",
  approvalDate: "Jun 1, 2026",
  summary:
    "This report presents the organizational leadership visibility assessment results for Encounters Corporation's Executive Department for Q3 2026. The assessment utilized the Leadership Reflection to evaluate key leadership dimensions including vision clarity, communication effectiveness, decision-making quality, and team empowerment. Overall, the organization demonstrates strong leadership alignment with notable improvements across all measured dimensions compared to the previous quarter.",
  findings: [
    {
      title: "Leadership Alignment Score",
      percent: 87,
      detail:
        "Executive team demonstrates exceptional alignment with organizational vision and strategic objectives.",
      color: "#10B7BA",
    },
    {
      title: "Communication Effectiveness",
      percent: 92,
      detail:
        "Cross-departmental communication has improved significantly from Q2 baseline of 78%.",
      color: "#10B7BA",
    },
    {
      title: "Decision-Making Quality",
      percent: 81,
      detail:
        "Structured decision frameworks are being adopted with 81% consistency across leadership levels.",
      color: "#FBBF24",
    },
    {
      title: "Team Empowerment Index",
      percent: 79,
      detail:
        "Opportunities identified for increased delegation and autonomy within mid-level leadership.",
      color: "#3B82F6",
    },
  ],
  recommendations: [
    "Implement structured leadership coaching sessions for mid-level managers to address the 79% team empowerment score and increase delegation confidence.",
    "Establish quarterly leadership alignment workshops to maintain and improve the current 87% alignment score across all organizational layers.",
    "Develop a cross-departmental communication protocol to sustain the 92% communication effectiveness and extend these practices organization-wide.",
  ],
  timeline: [
    { label: "Assessment Started", date: "May 1, 2026", state: "done" },
    { label: "Assessment Completed", date: "May 15, 2026", state: "done" },
    { label: "Human Approved", date: "Jun 1, 2026", state: "done" },
    {
      label: "Published",
      date: "Jun 1, 2026",
      state: "current",
      active: true,
    },
  ],
};

export const getReport = (id: string): ReportDetailData | undefined => {
  const row = REPORT_ROWS.find((r) => r.id === id);
  if (!row) return undefined;
  return { ...row, ...DETAIL_DEFAULT, name: row.name, reflection: row.reflection };
};
