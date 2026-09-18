export type QueueStatus = "Needs Review" | "In Review" | "Completed";

export type QueueRow = {
  id: string;
  title: string;
  client: string;
  email: string;
  company: string;
  avatar: string;
  generated: string;
  confidence: string;
  status: QueueStatus;
  waiting: string;
  model: string;
  approvedAt?: string;
};

export const REFINER_PROFILE = {
  firstName: "Masud",
  lastName: "Jahan",
  displayName: "Masud J",
  email: "masud.j@farsystems.io",
  phone: "+1 (555) 882-4410",
  role: "Refiner",
  org: "FAR Systems",
  memberSince: "Mar 2025",
  lastLogin: "2 hours ago",
  timezone: "UTC-5 Eastern Time",
  language: "English (US)",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
} as const;

export const QUEUE_ROWS: QueueRow[] = [
  {
    id: "1041",
    title: "FAR Assessment Report #1041",
    client: "Sophia Chen",
    email: "sophia@chenqc.com",
    company: "Chen Quantum Computing",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80",
    generated: "Aug 29, 2026 · 11:15 AM",
    confidence: "93.8%",
    status: "Needs Review",
    waiting: "45m",
    model: "GPT-3.7",
  },
  {
    id: "1042",
    title: "FAR Assessment Report #1042",
    client: "Michael Hall",
    email: "m.hall@example.com",
    company: "Hall Logistics",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80",
    generated: "Aug 29, 2026 · 10:02 AM",
    confidence: "91.2%",
    status: "Needs Review",
    waiting: "2h 45m",
    model: "GPT-3.7",
  },
  {
    id: "1043",
    title: "FAR Assessment Report #1043",
    client: "Priya Nair",
    email: "priya@nair.health",
    company: "Nair Health Systems",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&h=80&q=80",
    generated: "Aug 28, 2026 · 4:40 PM",
    confidence: "88.4%",
    status: "In Review",
    waiting: "1d 2h",
    model: "GPT-4.0",
  },
  {
    id: "1044",
    title: "FAR Assessment Report #1044",
    client: "James Okonkwo",
    email: "james@atlas.vc",
    company: "Atlas Ventures",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80&q=80",
    generated: "Aug 28, 2026 · 1:18 PM",
    confidence: "95.1%",
    status: "In Review",
    waiting: "2d",
    model: "GPT-3.7",
  },
  {
    id: "1045",
    title: "FAR Assessment Report #1045",
    client: "Elena Rossi",
    email: "elena@rossi.io",
    company: "Rossi Design",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&h=80&q=80",
    generated: "Aug 27, 2026 · 2:22 PM",
    confidence: "97.0%",
    status: "Completed",
    waiting: "—",
    model: "GPT-4.0",
    approvedAt: "Aug 28, 2026 · 6:02 AM",
  },
  {
    id: "1046",
    title: "FAR Assessment Report #1046",
    client: "David Kim",
    email: "david@kim.co",
    company: "Kim Collective",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80",
    generated: "Aug 27, 2026 · 10:11 AM",
    confidence: "90.6%",
    status: "Completed",
    waiting: "—",
    model: "GPT-3.7",
    approvedAt: "Aug 27, 2026 · 4:18 PM",
  },
  {
    id: "1047",
    title: "FAR Assessment Report #1047",
    client: "Sarah Wilson",
    email: "swilson@wilsonhealth.io",
    company: "Wilson Healthtech Systems",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&h=80&q=80",
    generated: "Aug 29, 2026 · 1:02 PM",
    confidence: "88.8%",
    status: "In Review",
    waiting: "45m",
    model: "GPT-3.7",
  },
  {
    id: "1040",
    title: "FAR Assessment Report #1040",
    client: "Amira Hassan",
    email: "amira@northstar.io",
    company: "Northstar Labs",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80",
    generated: "Aug 26, 2026 · 9:30 AM",
    confidence: "94.2%",
    status: "Completed",
    waiting: "—",
    model: "GPT-4.0",
    approvedAt: "Aug 29, 2026 · 8:42 AM",
  },
  {
    id: "1038",
    title: "FAR Assessment Report #1038",
    client: "Tom Bradley",
    email: "tom@bradley.co",
    company: "Bradley Group",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&h=80&q=80",
    generated: "Aug 25, 2026 · 3:12 PM",
    confidence: "92.0%",
    status: "Completed",
    waiting: "—",
    model: "GPT-3.7",
    approvedAt: "Aug 28, 2026 · 11:05 AM",
  },
];

export const ACTIVITY = [
  {
    reportId: "1044",
    title: "Alex approved FAR Assessment #1044",
    detail: "Final PDF compiled & client seal....",
    time: "9:10 AM",
  },
  {
    reportId: "1040",
    title: "Alex approved FAR Assessment #1040",
    detail: "Final PDF compiled & client seal....",
    time: "8:42 AM",
  },
  {
    reportId: "1038",
    title: "Alex approved FAR Assessment #1038",
    detail: "Final PDF compiled & client seal....",
    time: "Yesterday",
  },
  {
    reportId: "1045",
    title: "Alex approved FAR Assessment #1045",
    detail: "Final PDF compiled & client seal....",
    time: "Yesterday",
  },
  {
    reportId: "1046",
    title: "Alex approved FAR Assessment #1046",
    detail: "Final PDF compiled & client seal....",
    time: "2 days ago",
  },
] as const;

export const getQueueRow = (id?: string) =>
  QUEUE_ROWS.find((r) => r.id === id) ?? QUEUE_ROWS[0];

export const filterByStatus = (status?: QueueStatus | "all") => {
  if (!status || status === "all") return QUEUE_ROWS;
  return QUEUE_ROWS.filter((r) => r.status === status);
};

export const queueCounts = () => {
  const needs = QUEUE_ROWS.filter((r) => r.status === "Needs Review").length;
  const inReview = QUEUE_ROWS.filter((r) => r.status === "In Review").length;
  const completed = QUEUE_ROWS.filter((r) => r.status === "Completed").length;
  return {
    needs,
    inReview,
    approvedToday: 2,
    totalCompleted: Math.max(completed, 24),
    all: QUEUE_ROWS.length,
  };
};

export type ReportContent = {
  executiveSummary: string;
  insights: { title: string; body: string; tone: "gold" | "neutral" }[];
  themes: { num: string; title: string; body: string }[];
};

const DEFAULT_CONTENT: ReportContent = {
  executiveSummary:
    "This reflection cycle reveals a strategic shift toward \"Strategic Harmonization\" — balancing operational excellence with relational intelligence. The subject demonstrates elevated empathetic leadership markers while navigating legacy decision frameworks against emerging logic-driven systems. Overall trajectory remains constructive, with clear opportunities to reduce evening cognitive load and strengthen communicative openness under pressure.",
  insights: [
    {
      title: "Empathetic Leadership High",
      body: "Your responses reflect a 24% increase in empathetic resonance markers compared to Q4 2025.",
      tone: "gold",
    },
    {
      title: "Boundary Attrition Risk",
      body: "High-engagement reflections show a slight correlation with increased evening reflection fatigue.",
      tone: "neutral",
    },
  ],
  themes: [
    {
      num: "01",
      title: 'The "Legacy vs. Logic" Paradox',
      body: "Recurring tension between inherited leadership scripts and data-informed decision pathways. The subject is actively renegotiating which narratives remain protective versus which constrain growth.",
    },
    {
      num: "02",
      title: "Communicative Reticence",
      body: "Under elevated stakes, verbal disclosure narrows even as internal clarity rises. Coaching focus: translate private insight into team-facing language without diluting authenticity.",
    },
  ],
};

export const getReportContent = (_id?: string): ReportContent => ({
  ...DEFAULT_CONTENT,
  insights: DEFAULT_CONTENT.insights.map((i) => ({ ...i })),
  themes: DEFAULT_CONTENT.themes.map((t) => ({ ...t })),
});

export const HISTORY_ROWS = QUEUE_ROWS.filter((r) => r.status === "Completed");
