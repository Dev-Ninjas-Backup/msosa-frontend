export const WIZARD_STEPS = [
  { id: 1, key: "basic", label: "Basic Info", title: "Step 1 — Basic Information" },
  {
    id: 2,
    key: "reflection",
    label: "Reflection",
    title: "Step 2 — Reflection Configuration",
  },
  { id: 3, key: "protocol", label: "Protocol™", title: "Step 3 — Protocol™" },
  { id: 4, key: "workflow", label: "Workflow", title: "Step 4 — Workflow" },
  { id: 5, key: "ai", label: "AI Config", title: "Step 5 — AI Configuration" },
  { id: 6, key: "reports", label: "Reports", title: "Step 6 — Reports" },
  { id: 7, key: "dashboard", label: "Dashboard", title: "Step 7 — Dashboard" },
  {
    id: 8,
    key: "permissions",
    label: "Permissions",
    title: "Step 8 — Permissions",
  },
  { id: 9, key: "pricing", label: "Pricing", title: "Step 9 — Pricing" },
  { id: 10, key: "publish", label: "Publish", title: "Step 10 — Publish" },
] as const;

export type WizardStepId = (typeof WIZARD_STEPS)[number]["id"];

export type ProductStatus = "Published" | "Draft";

export type ListedProduct = {
  id: string;
  name: string;
  category: string;
  type: string;
  status: ProductStatus;
  price: string;
  created: string;
  publishedBy: string;
};

export const PRODUCT_LIST: ListedProduct[] = [
  {
    id: "PRD-001",
    name: "FAR Reflection™",
    category: "Consumer Products™",
    type: "Reflection",
    status: "Published",
    price: "$129",
    created: "Jan 12, 2024",
    publishedBy: "Michel Sossa",
  },
  {
    id: "PRD-002",
    name: "Leadership Reflection™",
    category: "Consumer Products™",
    type: "Reflection",
    status: "Published",
    price: "$189",
    created: "Feb 03, 2024",
    publishedBy: "Michel Sossa",
  },
  {
    id: "PRD-003",
    name: "Decision Clarity™",
    category: "Consumer Products™",
    type: "Reflection",
    status: "Draft",
    price: "$99",
    created: "Mar 18, 2024",
    publishedBy: "—",
  },
  {
    id: "PRD-004",
    name: "Executive Presence™",
    category: "Enterprise",
    type: "Dashboard",
    status: "Published",
    price: "$349",
    created: "Apr 02, 2024",
    publishedBy: "Michel Sossa",
  },
  {
    id: "PRD-005",
    name: "Team Alignment™",
    category: "Enterprise",
    type: "Workflow",
    status: "Draft",
    price: "$279",
    created: "May 11, 2024",
    publishedBy: "—",
  },
  {
    id: "PRD-006",
    name: "Mindset Protocol™",
    category: "Consumer Products™",
    type: "Protocol",
    status: "Draft",
    price: "$149",
    created: "Jun 22, 2024",
    publishedBy: "—",
  },
  {
    id: "PRD-007",
    name: "Growth Continuum™",
    category: "Consumer Products™",
    type: "Dashboard",
    status: "Published",
    price: "$199",
    created: "Jul 09, 2024",
    publishedBy: "Michel Sossa",
  },
  {
    id: "PRD-008",
    name: "Founder Protocol Pack™",
    category: "Enterprise",
    type: "Protocol",
    status: "Published",
    price: "$499",
    created: "Aug 14, 2024",
    publishedBy: "Michel Sossa",
  },
];

export type ProductDraft = {
  name: string;
  code: string;
  description: string;
  bgColor: string;
  textColor: string;
  buttonBg: string;
  buttonText: string;
  reflectionName: string;
  reflectionDescription: string;
  reflectionVersion: string;
  estimatedDuration: string;
  voiceSupport: boolean;
  textSupport: boolean;
  protocolName: string;
  protocolSummary: string;
  workflowName: string;
  workflowSteps: string;
  aiModel: string;
  aiPrompt: string;
  reportTemplate: string;
  dashboardLayout: string;
  roles: string;
  accessLevel: string;
  price: string;
  billingCycle: string;
  tier: string;
};

export const emptyDraft = (): ProductDraft => ({
  name: "",
  code: "",
  description: "",
  bgColor: "#303030",
  textColor: "#FFFFFF",
  buttonBg: "#fbbf24",
  buttonText: "#000000",
  reflectionName: "",
  reflectionDescription: "",
  reflectionVersion: "1.0.0",
  estimatedDuration: "30 Days",
  voiceSupport: false,
  textSupport: true,
  protocolName: "",
  protocolSummary: "",
  workflowName: "",
  workflowSteps: "",
  aiModel: "FAR Insight Core™",
  aiPrompt: "",
  reportTemplate: "Standard Narrative",
  dashboardLayout: "Consumer Default",
  roles: "Consumer, Founder",
  accessLevel: "Assigned Users",
  price: "129",
  billingCycle: "One-time",
  tier: "Standard",
});

export const draftFromVoice = (): ProductDraft => ({
  ...emptyDraft(),
  name: "Relationship Clarity™",
  code: "PRD-009",
  description:
    "A guided reflection experience focused on interpersonal connections, attachment patterns, and relational decision-making.",
  reflectionName: "30-Day Reflection Journey",
  reflectionDescription:
    "Voice and text reflections that surface relational patterns and actionable clarity.",
  protocolName: "Relational Insight Protocol™",
  protocolSummary: "Founder-authored protocol guiding reflection cadence and review.",
  workflowName: "Clarity Pathway",
  workflowSteps: "Intake → Reflect → Review → Report → Continuum",
  aiPrompt: "Guide users toward clarity without prescribing outcomes.",
  price: "129",
});

export const PROCESSING_ITEMS = [
  "Basic Information",
  "Blueprint",
  "Protocol",
  "Workflow",
  "AI",
  "Reports",
  "Dashboard",
  "Permissions",
  "Pricing",
  "Publish",
] as const;

export const PUBLISH_CHECKS = [
  {
    title: "Product Information",
    body: "Product name, code, description, category and type all configured",
  },
  {
    title: "Workflow",
    body: "Workflows configured and active with all steps defined",
  },
  {
    title: "AI Configuration",
    body: "AI model, prompts and behavior parameters fully configured",
  },
  {
    title: "Reports",
    body: "Report templates configured and ready for data collection",
  },
  {
    title: "Dashboard",
    body: "Dashboard widgets and layout configured for this product",
  },
  {
    title: "Pricing",
    body: "Pricing model, tiers and billing fields configured",
  },
  {
    title: "Permissions",
    body: "User roles, access levels and permission sets defined",
  },
] as const;
