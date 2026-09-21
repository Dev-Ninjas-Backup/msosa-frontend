export type InvoiceStatus = "Paid" | "Failed" | "Pending";

export type HistoryInvoice = {
  id: string;
  period: string;
  description: string;
  amount: string;
  status: InvoiceStatus;
  paymentDate: string;
  tag?: "BLUEPRINT" | "REFLECTION";
  type: "Subscription" | "Add-on";
};

export const HISTORY_KPIS = [
  {
    label: "Total Paid (YTD)",
    value: "$6,394.00",
    sub: "All payments cleared",
    tone: "teal" as const,
  },
  {
    label: "Pending Payments",
    value: "$0.00",
    sub: "No pending invoices",
    tone: "gray" as const,
  },
  {
    label: "Failed Payments",
    value: "1",
    sub: "Requires attention",
    tone: "red" as const,
  },
  {
    label: "Total Invoices",
    value: "34",
    sub: "All time records",
    tone: "gold" as const,
  },
] as const;

export const HISTORY_INVOICES: HistoryInvoice[] = [
  {
    id: "INV-00126",
    period: "Feb 2026",
    description: "Enterprise Professional — Monthly",
    amount: "$499.00",
    status: "Paid",
    paymentDate: "Feb 1, 2026",
    type: "Subscription",
  },
  {
    id: "INV-00125",
    period: "Jan 2026",
    description: "Enterprise Professional — Monthly",
    amount: "$499.00",
    status: "Paid",
    paymentDate: "Jan 1, 2026",
    type: "Subscription",
  },
  {
    id: "INV-00124",
    period: "Dec 2025",
    description: "Enterprise Professional — Monthly",
    amount: "$499.00",
    status: "Paid",
    paymentDate: "Dec 1, 2025",
    type: "Subscription",
  },
  {
    id: "INV-00123",
    period: "Nov 2025",
    description: "Enterprise Professional — Monthly",
    amount: "$499.00",
    status: "Paid",
    paymentDate: "Nov 1, 2025",
    type: "Subscription",
  },
  {
    id: "INV-00122",
    period: "Oct 2025",
    description: "MindState™ Reflection — Blueprint Package",
    amount: "$800.00",
    status: "Paid",
    paymentDate: "Oct 15, 2025",
    tag: "BLUEPRINT",
    type: "Add-on",
  },
  {
    id: "INV-00121",
    period: "Oct 2025",
    description: "Enterprise Professional — Monthly",
    amount: "$499.00",
    status: "Paid",
    paymentDate: "Oct 1, 2025",
    type: "Subscription",
  },
  {
    id: "INV-00120",
    period: "Sep 2025",
    description: "MindState™ Reflection — Blueprint Package",
    amount: "$800.00",
    status: "Paid",
    paymentDate: "Sep 12, 2025",
    tag: "BLUEPRINT",
    type: "Add-on",
  },
  {
    id: "INV-00119",
    period: "Sep 2025",
    description: "Enterprise Professional — Monthly",
    amount: "$499.00",
    status: "Paid",
    paymentDate: "Sep 1, 2025",
    type: "Subscription",
  },
  {
    id: "INV-00118",
    period: "Aug 2025",
    description: "Enterprise Professional — Monthly",
    amount: "$499.00",
    status: "Failed",
    paymentDate: "—",
    type: "Subscription",
  },
  {
    id: "INV-00117",
    period: "Jul 2025",
    description: "Enterprise Professional — Monthly",
    amount: "$499.00",
    status: "Paid",
    paymentDate: "Jul 1, 2025",
    type: "Subscription",
  },
];

export const INVOICE_DETAIL = {
  id: "INV-00126",
  status: "PAID" as const,
  billedTo: {
    name: "FAR Systems™ Inc.",
    orgId: "ORG-2024-FAR-0041",
    address1: "123 Enterprise Blvd, Suite 400",
    address2: "San Francisco, CA 94107",
    email: "billing@farsystems.com",
  },
  info: [
    { label: "Invoice #", value: "INV-00126" },
    { label: "Issue Date", value: "Feb 1, 2026" },
    { label: "Due Date", value: "Feb 7, 2026" },
    { label: "Billing Period", value: "Feb 2026" },
    { label: "Sub ID", value: "SUB-ENT-9812-PRO" },
  ],
  plan: {
    name: "Enterprise Pro",
    seats: "100 seats",
    cycle: "Monthly",
  },
  amounts: [
    { label: "Subtotal", value: "$465.42" },
    { label: "Tax (7.25%)", value: "$33.74" },
    { label: "Discount", value: "—$0.16" },
  ],
  total: "$499.00",
  payment: [
    { label: "Method", value: "•••• 4242" },
    { label: "Paid On", value: "Feb 1, 2026" },
  ],
};

export const statusStyle = (status: InvoiceStatus) => {
  switch (status) {
    case "Paid":
      return "bg-[rgba(16,183,186,0.15)] text-[#10B7BA]";
    case "Failed":
      return "bg-[rgba(239,68,68,0.15)] text-[#F87171]";
    default:
      return "bg-[rgba(251,191,36,0.15)] text-[#FBBF24]";
  }
};
