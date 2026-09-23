export const WIZARD_STEPS = [
  {
    id: 1,
    key: "basic",
    label: "Basic Info",
    title: "Step 1 — Basic Information",
    description:
      "Define the core identity, classification and assets for your product",
  },
  {
    id: 2,
    key: "reflection",
    label: "Reflection",
    title: "Step 2 — Reflection Configuration",
    description:
      "Configure Reflection parameters, completion rules and delivery settings",
  },
  {
    id: 3,
    key: "protocol",
    label: "Protocol™",
    title: "Step 3 — Product Protocol™",
    description:
      "Attach the Product Protocol™ that defines your product's operational logic and execution framework.",
  },
  {
    id: 4,
    key: "workflow",
    label: "Workflow",
    title: "Step 4 — Workflow Configuration",
    description: "Configure the complete product journey.",
  },
  {
    id: 5,
    key: "ai",
    label: "AI Config",
    title: "Step 5 — AI Configuration",
    description:
      "Configure the AI engine that powers this product — model, prompts, performance and safety settings",
  },
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

export const OPEN_CREATE_PRODUCT_EVENT = "far:open-create-product";
export const CREATE_PRODUCT_SEARCH_EVENT = "far:create-product-search";

export type ProductStatus =
  | "Published"
  | "Draft"
  | "Active"
  | "Archived"
  | "Upcoming";

export type ListedProduct = {
  id: string;
  name: string;
  division: string;
  type: string;
  version: string;
  status: ProductStatus;
  price: string;
  created: string;
  updated: string;
  publishedBy: string;
};

export const PRODUCT_LIST: ListedProduct[] = [
  {
    id: "PRD-001",
    name: "FAR Reflection™",
    division: "Consumer Products™",
    type: "Reflection",
    version: "v2.1",
    status: "Published",
    price: "$97",
    created: "Jan 15, 2025",
    updated: "Mar 20, 2025",
    publishedBy: "Mike D.",
  },
  {
    id: "PRD-002",
    name: "Leadership Reflection™",
    division: "Professional Readiness™",
    type: "Reflection",
    version: "v1.3",
    status: "Published",
    price: "$197",
    created: "Feb 1, 2025",
    updated: "Mar 18, 2025",
    publishedBy: "Mike D.",
  },
  {
    id: "PRD-003",
    name: "Team Alignment™",
    division: "Organizational Solutions™",
    type: "Assessment",
    version: "v1.0",
    status: "Draft",
    price: "Free",
    created: "Mar 5, 2025",
    updated: "Mar 21, 2025",
    publishedBy: "Mike D.",
  },
  {
    id: "PRD-004",
    name: "Enterprise Readiness™",
    division: "Enterprise™",
    type: "Enterprise",
    version: "v3.2",
    status: "Published",
    price: "$499",
    created: "Nov 10, 2024",
    updated: "Feb 28, 2025",
    publishedBy: "Mike D.",
  },
  {
    id: "PRD-005",
    name: "Career Pathfinder™",
    division: "Consumer Products™",
    type: "Assessment",
    version: "v1.1",
    status: "Active",
    price: "$79",
    created: "Dec 20, 2024",
    updated: "Mar 10, 2025",
    publishedBy: "Mike D.",
  },
  {
    id: "PRD-006",
    name: "Organizational QCV™",
    division: "Enterprise™",
    type: "Dashboard",
    version: "v2.0",
    status: "Published",
    price: "$299",
    created: "Oct 5, 2024",
    updated: "Jan 30, 2025",
    publishedBy: "Mike D.",
  },
  {
    id: "PRD-007",
    name: "Mindset Protocol™",
    division: "Professional Readiness™",
    type: "Protocol",
    version: "v1.0",
    status: "Draft",
    price: "Free",
    created: "Mar 18, 2025",
    updated: "Mar 22, 2025",
    publishedBy: "Mike D.",
  },
  {
    id: "PRD-008",
    name: "Continuum Tracker™",
    division: "Consumer Products™",
    type: "Tracker",
    version: "v1.5",
    status: "Archived",
    price: "$49",
    created: "Aug 14, 2024",
    updated: "Dec 1, 2024",
    publishedBy: "Mike D.",
  },
];

export const PRODUCT_KPI = [
  {
    label: "Total Products",
    value: "46",
    hint: "+4 this month",
    hintTone: "up" as const,
    dot: "bg-[#10b7ba]",
  },
  {
    label: "Published",
    value: "31",
    hint: "+2 this week",
    hintTone: "up" as const,
    dot: "bg-emerald-400",
  },
  {
    label: "Draft",
    value: "8",
    hint: "No change",
    hintTone: "muted" as const,
    dot: "bg-[#fbbf24]",
  },
  {
    label: "Archived",
    value: "4",
    hint: "-1 this month",
    hintTone: "down" as const,
    dot: "bg-red-400",
  },
  {
    label: "Active",
    value: "28",
    hint: "+3 this week",
    hintTone: "up" as const,
    dot: "bg-sky-400",
  },
  {
    label: "Upcoming",
    value: "3",
    hint: "+1 scheduled",
    hintTone: "gold" as const,
    dot: "bg-violet-400",
  },
] as const;

export const PRODUCT_TOTAL = 46;

export type JourneyStep = {
  id: string;
  name: string;
  tag: string;
};

export const DEFAULT_JOURNEY: JourneyStep[] = [
  { id: "1", name: "Purchase", tag: "Entry" },
  { id: "2", name: "Account", tag: "Setup" },
  { id: "3", name: "Reflection", tag: "Content" },
  { id: "4", name: "Knowledge Processing™", tag: "Processing" },
  { id: "5", name: "Product Transformation™", tag: "Transformation" },
  { id: "6", name: "Illumination Bridge™", tag: "Bridge" },
  { id: "7", name: "Knowledge Asset™", tag: "Asset" },
  { id: "8", name: "Dashboard", tag: "Dashboard" },
  { id: "9", name: "Reports", tag: "Report" },
  { id: "10", name: "Continuity", tag: "Completion" },
];

export const JOURNEY_TAG_TONE: Record<string, string> = {
  Entry: "bg-[#10b7ba]/10 text-[#10b7ba]",
  Setup: "bg-[#fbbf24]/10 text-[#fbbf24]",
  Content: "bg-[#a855f7]/10 text-[#a855f7]",
  Processing: "bg-[#10b7ba]/10 text-[#10b7ba]",
  Transformation: "bg-emerald-400/10 text-emerald-400",
  Bridge: "bg-[#fbbf24]/10 text-[#fbbf24]",
  Asset: "bg-violet-400/10 text-violet-300",
  Dashboard: "bg-sky-400/10 text-sky-400",
  Report: "bg-[#fbbf24]/10 text-[#fbbf24]",
  Completion: "bg-[#10b7ba]/10 text-[#10b7ba]",
};

export const COMPLETION_TRIGGERS = [
  "Product completed",
  "All reflections submitted",
  "Manual founder approval",
  "Time elapsed",
];

export const DEFAULT_AI_PROMPT = `/ FAR Reflection™ System Prompt
You are a professional FAR Reflection™ coach and transformation guide.
Your role is to deeply analyze the user's inner world based on the user's response.

1. Validate their experience with empathy
2. Illuminate hidden patterns and beliefs
3. Offer actionable wisdom and next steps
4. Maintain a professional, coaching tone`;

export const DEFAULT_AI_INSTRUCTIONS =
  "Always address the user by name. Never provide medical or psychological diagnosis. Keep responses under 400 words unless the user requests expansion. Avoid jargon. Form responses with clear sections.";

export const DEFAULT_AI_SAFETY =
  "Do not provide medical advice, psychological diagnosis, or legal counsel. Never impersonate a licensed therapist or doctor. Do not collect or store personal health information. Refuse to generate harmful, discriminatory, or offensive content. Always recommend professional help for crisis situations.";

export const AI_MODELS = ["GPT-4", "GPT-4o", "Gemini 1.5 Pro"];

export const AI_STYLES = [
  "Coaching",
  "Professional",
  "Conversational",
  "Analytical",
];

export type ProductDraft = {
  name: string;
  code: string;
  description: string;
  iconUrl: string;
  coverUrl: string;
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
  workflowJourney: JourneyStep[];
  completionLogic: "all" | "conditional";
  completionTrigger: string;
  aiProvider: "openai" | "gemini" | "claude";
  aiModel: string;
  aiFarRefiner: boolean;
  aiPrompt: string;
  aiResponseStyle: string;
  aiInstructions: string;
  aiTemperature: number;
  aiMaxTokens: number;
  aiTopP: number;
  aiFrequencyPenalty: number;
  aiContentFilter: boolean;
  aiPiiProtection: boolean;
  aiAuditLog: boolean;
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
  iconUrl: "",
  coverUrl: "",
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
  workflowJourney: DEFAULT_JOURNEY.map((s) => ({ ...s })),
  completionLogic: "all",
  completionTrigger: "",
  aiProvider: "openai",
  aiModel: "GPT-4",
  aiFarRefiner: true,
  aiPrompt: DEFAULT_AI_PROMPT,
  aiResponseStyle: "Coaching",
  aiInstructions: DEFAULT_AI_INSTRUCTIONS,
  aiTemperature: 0.7,
  aiMaxTokens: 2048,
  aiTopP: 0.9,
  aiFrequencyPenalty: 0.3,
  aiContentFilter: true,
  aiPiiProtection: true,
  aiAuditLog: false,
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
  "Reflection Configuration",
  "Protocol Setup",
  "Workflow Configuration",
  "AI Behavior Config",
  "Reports Generation",
  "Dashboard Setup",
  "Permissions & Access",
  "Pricing & Plans",
  "Final Publishing",
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
