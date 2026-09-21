export type BlueprintCard = {
  id: string;
  name: string;
  description: string;
  target: string;
  duration: string;
  version: string;
  price: string;
  status: "available" | "in_progress" | "purchased";
  progress?: number;
  started?: string;
  lastActivity?: string;
  estRemaining?: string;
  purpose?: string;
  outcomes?: string[];
  benefits?: string[];
};

export const BLUEPRINTS: BlueprintCard[] = [
  {
    id: "bp-mindstate",
    name: "MindState™ Reflection",
    description:
      "Deep reflective assessment for individual awareness and growth alignment.",
    target: "All Employees",
    duration: "45–60 min",
    version: "v3.2 · May 2026",
    price: "$12",
    status: "available",
    purpose:
      "Help employees surface emotional patterns, leadership readiness, and personal growth priorities through structured reflection.",
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
  },
  {
    id: "bp-org-readiness",
    name: "Org Readiness™",
    description:
      "Assess organizational culture and readiness for strategic change.",
    target: "All Employees",
    duration: "45–60 min",
    version: "v3.2 · May 2026",
    price: "$12",
    status: "in_progress",
    progress: 65,
    started: "Oct 12, 2023",
    lastActivity: "Oct 24, 2023",
    estRemaining: "~15 Minutes",
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
  },
  {
    id: "bp-leadership",
    name: "Leadership Alignment™",
    description:
      "Align leadership behaviors with organizational strategy and values.",
    target: "All Employees",
    duration: "45–60 min",
    version: "v3.2 · May 2026",
    price: "$12",
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
  },
  {
    id: "bp-culture",
    name: "Organizational Culture Blueprint™",
    description:
      "Map cultural health, belonging, and psychological safety across the org.",
    target: "All Employees",
    duration: "30–45 min",
    version: "v2.8 · Apr 2026",
    price: "$10",
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
  },
];

export const getBlueprint = (id: string) =>
  BLUEPRINTS.find((b) => b.id === id);
