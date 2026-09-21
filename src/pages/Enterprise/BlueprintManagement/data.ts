import {
  Brain,
  Mic,
  Type,
  Save,
  PlayCircle,
  Sparkles,
  FileText,
  Infinity,
  LayoutDashboard,
  Users,
  Eye,
  Shield,
  BarChart3,
  Building2,
  Target,
  Clock,
  Layers,
  Crosshair,
  Award,
  BookOpen,
  ImageIcon,
} from "lucide-react";

export type BlueprintCard = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  target: string;
  duration: string;
  version: string;
  lastUpdated: string;
  pricePerSeat: number;
  status: "available" | "in_progress" | "purchased";
  progress?: number;
  started?: string;
  lastActivity?: string;
  estRemaining?: string;
  purpose: string;
  outcomes: string[];
  benefits: string[];
  assessmentType: string;
  tag: string;
};

export const FEATURES = [
  {
    title: "Reflection Experience",
    detail: "Full guided journey",
    icon: Brain,
  },
  {
    title: "Voice Support",
    detail: "Audio response capture",
    icon: Mic,
  },
  {
    title: "Text Support",
    detail: "Written input mode",
    icon: Type,
  },
  {
    title: "Save Progress",
    detail: "Auto-save session",
    icon: Save,
  },
  {
    title: "Resume Later",
    detail: "Continue any time",
    icon: PlayCircle,
  },
  {
    title: "AI Report",
    detail: "AI-generated insights",
    icon: Sparkles,
  },
  {
    title: "PDF Report",
    detail: "Exportable document",
    icon: FileText,
  },
  {
    title: "Continuum Support",
    detail: "Ongoing journey tracking",
    icon: Infinity,
  },
  {
    title: "Dashboard Support",
    detail: "Admin visibility",
    icon: LayoutDashboard,
  },
] as const;

export const ORG_BENEFITS = [
  {
    title: "Team Assessment",
    detail:
      "Understand collective mindset trends across your entire workforce",
    icon: Users,
    tone: "teal" as const,
  },
  {
    title: "Leadership Visibility",
    detail:
      "Surface leadership gaps and opportunities before they become issues",
    icon: Eye,
    tone: "gold" as const,
  },
  {
    title: "Anonymous Participation",
    detail:
      "Encourage honest reflection with fully anonymized response handling",
    icon: Shield,
    tone: "blue" as const,
  },
  {
    title: "Quarterly Comparison",
    detail: "Track progress over time with built-in quarterly trend analysis",
    icon: BarChart3,
    tone: "orange" as const,
  },
  {
    title: "Organizational Reports",
    detail:
      "Consolidated org-level insights in shareable, exportable reports",
    icon: Building2,
    tone: "teal" as const,
  },
] as const;

export const SEAT_OPTIONS = [10, 25, 50, 100, 250] as const;

export const BLUEPRINTS: BlueprintCard[] = [
  {
    id: "bp-org-readiness-a",
    name: "Org Readiness™",
    description:
      "Assess organizational culture and readiness for strategic change",
    longDescription:
      "A structured organizational assessment that measures culture health, change readiness, and team alignment across departments.",
    target: "All Employees",
    duration: "30 min",
    version: "v3.2",
    lastUpdated: "May 2026",
    pricePerSeat: 12,
    status: "available",
    purpose:
      "Measure collective readiness for transformation across teams and leadership layers so leaders can act with clarity.",
    outcomes: [
      "Culture baseline",
      "Change readiness score",
      "Team friction signals",
      "Leadership alignment map",
      "AI-generated insights",
    ],
    benefits: [
      "Anonymous participation",
      "AI-powered reporting",
      "Dashboard integration",
      "Exportable PDF reports",
      "Progress tracking",
    ],
    assessmentType: "Reflective + AI",
    tag: "Org Assessment",
  },
  {
    id: "bp-org-readiness",
    name: "Org Readiness™",
    description:
      "Assess organizational culture and readiness for strategic change",
    longDescription:
      "A structured organizational assessment that measures culture health, change readiness, and team alignment across departments.",
    target: "All Employees",
    duration: "30 min",
    version: "v3.2",
    lastUpdated: "May 2026",
    pricePerSeat: 12,
    status: "in_progress",
    progress: 65,
    started: "Oct 12, 2023",
    lastActivity: "Oct 24, 2023",
    estRemaining: "~11 Minutes",
    purpose:
      "Measure collective readiness for transformation across teams and leadership layers so leaders can act with clarity.",
    outcomes: [
      "Culture baseline",
      "Change readiness score",
      "Team friction signals",
      "Leadership alignment map",
      "AI-generated insights",
    ],
    benefits: [
      "Anonymous participation",
      "AI-powered reporting",
      "Dashboard integration",
      "Exportable PDF reports",
      "Progress tracking",
    ],
    assessmentType: "Reflective + AI",
    tag: "Org Assessment",
  },
  {
    id: "bp-mindstate",
    name: "MindState™ Reflection",
    description:
      "Deep reflective assessment for individual awareness and growth alignment.",
    longDescription:
      "A deep self-awareness assessment combining voice and text reflection to help employees understand their mindset, behavioral patterns, and emotional intelligence. Designed to be taken individually, this Reflection surfaces insights that power personal growth and team dynamics.",
    target: "All Employees",
    duration: "45–60 min",
    version: "v3.2",
    lastUpdated: "May 2026",
    pricePerSeat: 12,
    status: "available",
    purpose:
      "Empower employees with structured self-reflection to build self-awareness and emotional intelligence at scale. MindState™ creates a safe space for authentic introspection that translates into measurable growth.",
    outcomes: [
      "Increased self-awareness",
      "Improved emotional regulation",
      "Identified growth areas",
      "Personalized development roadmap",
      "AI-generated insights",
    ],
    benefits: [
      "Anonymous participation",
      "AI-powered reporting",
      "Dashboard integration",
      "Exportable PDF reports",
      "Progress tracking",
    ],
    assessmentType: "Reflective + AI",
    tag: "Self-Assessment",
  },
  {
    id: "bp-org-readiness-b",
    name: "Org Readiness™",
    description:
      "Assess organizational culture and readiness for strategic change",
    longDescription:
      "A structured organizational assessment that measures culture health, change readiness, and team alignment across departments.",
    target: "All Employees",
    duration: "30 min",
    version: "v3.2",
    lastUpdated: "May 2026",
    pricePerSeat: 12,
    status: "in_progress",
    progress: 65,
    started: "Oct 12, 2023",
    lastActivity: "Oct 24, 2023",
    estRemaining: "~11 Minutes",
    purpose:
      "Measure collective readiness for transformation across teams and leadership layers.",
    outcomes: [
      "Culture baseline",
      "Change readiness score",
      "Team friction signals",
      "Leadership alignment map",
      "AI-generated insights",
    ],
    benefits: [
      "Anonymous participation",
      "AI-powered reporting",
      "Dashboard integration",
      "Exportable PDF reports",
      "Progress tracking",
    ],
    assessmentType: "Reflective + AI",
    tag: "Org Assessment",
  },
  {
    id: "bp-org-readiness-c",
    name: "Org Readiness™",
    description:
      "Assess organizational culture and readiness for strategic change",
    longDescription:
      "A structured organizational assessment that measures culture health, change readiness, and team alignment across departments.",
    target: "All Employees",
    duration: "30 min",
    version: "v3.2",
    lastUpdated: "May 2026",
    pricePerSeat: 12,
    status: "in_progress",
    progress: 42,
    started: "Nov 1, 2025",
    lastActivity: "Nov 18, 2025",
    estRemaining: "~22 Minutes",
    purpose:
      "Give administrators a clear view of culture strengths and risk areas.",
    outcomes: [
      "Culture health score",
      "Belonging index",
      "Safety signals",
      "Department comparisons",
      "AI-generated insights",
    ],
    benefits: [
      "Anonymous participation",
      "AI-powered reporting",
      "Dashboard integration",
      "Exportable PDF reports",
      "Progress tracking",
    ],
    assessmentType: "Reflective + AI",
    tag: "Org Assessment",
  },
  {
    id: "bp-leadership",
    name: "Leadership Alignment™",
    description:
      "Align leadership behaviors with organizational strategy and values.",
    longDescription:
      "Create a shared leadership language and surface gaps between intent and practice across your leadership cohort.",
    target: "All Employees",
    duration: "45–60 min",
    version: "v3.2",
    lastUpdated: "May 2026",
    pricePerSeat: 12,
    status: "available",
    purpose:
      "Create a shared leadership language and surface gaps between intent and practice.",
    outcomes: [
      "Leadership visibility",
      "Behavioral alignment",
      "Team trust indicators",
      "Growth priorities",
      "AI-generated insights",
    ],
    benefits: [
      "Anonymous participation",
      "AI-powered reporting",
      "Dashboard integration",
      "Exportable PDF reports",
      "Progress tracking",
    ],
    assessmentType: "Reflective + AI",
    tag: "Leadership",
  },
];

export const getBlueprint = (id: string) =>
  BLUEPRINTS.find((b) => b.id === id);

export const META_ICONS = {
  target: Target,
  duration: Clock,
  type: Layers,
  cover: ImageIcon,
  card: BookOpen,
  purpose: Crosshair,
  outcomes: Award,
  benefits: Award,
  description: BookOpen,
} as const;

export const toneClass = (tone: "teal" | "gold" | "blue" | "orange") => {
  switch (tone) {
    case "gold":
      return "bg-[rgba(251,191,36,0.12)] border-[rgba(251,191,36,0.2)] text-[#FBBF24]";
    case "blue":
      return "bg-[rgba(96,165,250,0.12)] border-[rgba(96,165,250,0.2)] text-[#60A5FA]";
    case "orange":
      return "bg-[rgba(249,115,22,0.12)] border-[rgba(249,115,22,0.2)] text-[#F97316]";
    default:
      return "bg-[rgba(16,183,186,0.12)] border-[rgba(16,183,186,0.2)] text-[#10B7BA]";
  }
};
