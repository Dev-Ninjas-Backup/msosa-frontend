export type InvoiceStatus = "Paid" | "Pending" | "Overdue";
export type UserKind = "Consumer" | "Enterprise" | "Agency" | "Individual";

export type InvoiceItem = {
  name: string;
  description: string;
  employees: number;
  price: number;
  total: number;
};

export type Invoice = {
  id: string;
  client: string;
  user: UserKind | "—";
  date: string;
  status: InvoiceStatus;
  amount: number;
  listAmount: number;
  issued: string;
  billToName: string;
  billToRole: string;
  billToEmail: string;
  live: boolean;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
};

export type Transaction = {
  id: string;
  customer: string;
  kind: string;
  product: string;
  method: string;
  amount: number;
  status: "Completed" | "Pending";
  date: string;
};

const money = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

export const formatMoney = money;

const itemFor = (amount: number): InvoiceItem => ({
  name: "Enterprise Reflection Suite",
  description: "Annual subscription for high-reflection environments",
  employees: 100,
  price: amount,
  total: amount,
});

const buildInvoice = (
  partial: Pick<Invoice, "id" | "client" | "user" | "date" | "status" | "amount"> &
    Partial<Pick<Invoice, "billToName" | "billToRole" | "billToEmail" | "issued" | "live" | "subtotal" | "tax" | "items" | "listAmount">>,
): Invoice => {
  const tax = partial.tax ?? Math.round(partial.amount * 0.1 * 100) / 100;
  const subtotal = partial.subtotal ?? Math.round((partial.amount - tax) * 100) / 100;
  return {
    ...partial,
    issued: partial.issued ?? partial.date,
    billToName: partial.billToName ?? partial.client,
    billToRole: partial.billToRole ?? "Finance Lead",
    billToEmail: partial.billToEmail ?? "billing@client.com",
    live: partial.live ?? false,
    items: partial.items ?? [itemFor(subtotal)],
    subtotal,
    tax,
    listAmount: partial.listAmount ?? partial.amount,
  };
};

const INITIAL: Invoice[] = [
  buildInvoice({
    id: "INV-2024-001",
    client: "Stellar Tech Solutions",
    user: "Consumer",
    date: "Jan 24, 2024",
    status: "Paid",
    amount: 4250,
    listAmount: 12450,
    issued: "October 24, 2024",
    billToName: "Liza Fernandes",
    billToRole: "Creative Director, Design Co.",
    billToEmail: "liza@designco.com",
    live: true,
    items: [
      {
        name: "Enterprise Reflection Suite",
        description: "Annual subscription for high-reflection environments",
        employees: 100,
        price: 3500,
        total: 3500,
      },
    ],
    subtotal: 3863.64,
    tax: 386.36,
  }),
  buildInvoice({
    id: "INV-2024-002",
    client: "Global Nexus Corp",
    user: "—",
    date: "Jan 22, 2024",
    status: "Pending",
    amount: 8200,
  }),
  buildInvoice({
    id: "INV-2024-003",
    client: "Cyberdyne Systems",
    user: "—",
    date: "Jan 05, 2024",
    status: "Overdue",
    amount: 5400,
  }),
  buildInvoice({
    id: "INV-2024-004",
    client: "Horizon Robotics",
    user: "Enterprise",
    date: "Feb 02, 2024",
    status: "Paid",
    amount: 2100,
  }),
  buildInvoice({
    id: "INV-2024-005",
    client: "Nova Solutions",
    user: "Agency",
    date: "Feb 11, 2024",
    status: "Pending",
    amount: 1250,
  }),
  buildInvoice({
    id: "INV-2024-006",
    client: "Northwind Labs",
    user: "Consumer",
    date: "Feb 18, 2024",
    status: "Overdue",
    amount: 960,
  }),
  buildInvoice({
    id: "INV-2024-007",
    client: "Atlas Foundry",
    user: "Enterprise",
    date: "Mar 01, 2024",
    status: "Paid",
    amount: 6400,
  }),
  buildInvoice({
    id: "INV-2024-008",
    client: "Lumen Collective",
    user: "Individual",
    date: "Mar 09, 2024",
    status: "Pending",
    amount: 490,
  }),
  buildInvoice({
    id: "INV-2024-009",
    client: "Kepler Works",
    user: "Agency",
    date: "Mar 14, 2024",
    status: "Paid",
    amount: 3100,
  }),
  buildInvoice({
    id: "INV-2024-010",
    client: "Orbit Health",
    user: "Enterprise",
    date: "Mar 21, 2024",
    status: "Overdue",
    amount: 7800,
  }),
  buildInvoice({
    id: "INV-2024-011",
    client: "Brightline Studio",
    user: "Consumer",
    date: "Apr 02, 2024",
    status: "Paid",
    amount: 1500,
  }),
  buildInvoice({
    id: "INV-2024-012",
    client: "Vanta Systems",
    user: "Enterprise",
    date: "Apr 16, 2024",
    status: "Pending",
    amount: 9200,
  }),
  buildInvoice({
    id: "INV-2024-013",
    client: "Marble & Co",
    user: "Agency",
    date: "Apr 28, 2024",
    status: "Paid",
    amount: 2750,
  }),
  buildInvoice({
    id: "INV-2024-014",
    client: "Sable Logistics",
    user: "Enterprise",
    date: "May 06, 2024",
    status: "Overdue",
    amount: 4100,
  }),
  buildInvoice({
    id: "INV-2024-015",
    client: "Pioneer Grid",
    user: "Consumer",
    date: "May 19, 2024",
    status: "Paid",
    amount: 860,
  }),
  buildInvoice({
    id: "INV-2024-016",
    client: "Helio Research",
    user: "Individual",
    date: "Jun 01, 2024",
    status: "Pending",
    amount: 640,
  }),
  buildInvoice({
    id: "INV-2024-017",
    client: "Copperline",
    user: "Agency",
    date: "Jun 12, 2024",
    status: "Paid",
    amount: 5300,
  }),
  buildInvoice({
    id: "INV-2024-018",
    client: "Fieldnote",
    user: "Consumer",
    date: "Jun 24, 2024",
    status: "Overdue",
    amount: 1880,
  }),
];

let invoices = INITIAL;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());

export const subscribeInvoices = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getInvoices = () => invoices;

export const getInvoice = (id: string) => invoices.find((invoice) => invoice.id === id);

export const updateInvoice = (id: string, patch: Partial<Pick<Invoice, "status" | "client" | "amount" | "listAmount">>) => {
  invoices = invoices.map((invoice) => (invoice.id === id ? { ...invoice, ...patch } : invoice));
  emit();
};

export const addInvoice = (draft: { client: string; user: UserKind; amount: number; status: InvoiceStatus }) => {
  const seq = String(invoices.length + 1).padStart(3, "0");
  const invoice = buildInvoice({
    id: `INV-2024-${seq}`,
    client: draft.client,
    user: draft.user,
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    status: draft.status,
    amount: draft.amount,
    issued: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  });
  invoices = [invoice, ...invoices];
  emit();
  return invoice;
};

export const downloadInvoices = (rows: Invoice[] = invoices) => {
  const lines = [
    "Invoice,Client,User,Date,Status,Amount",
    ...rows.map((row) =>
      [row.id, row.client, row.user, row.date, row.status, row.listAmount.toFixed(2)]
        .map((value) => `"${value}"`)
        .join(","),
    ),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "far-invoices.csv";
  anchor.click();
  URL.revokeObjectURL(url);
};

export const TRANSACTIONS: Transaction[] = [
  {
    id: "#TRX-948210",
    customer: "Stellar Tech",
    kind: "Enterprise",
    product: "FAR Protocol Pro",
    method: "Stripe",
    amount: 4200,
    status: "Completed",
    date: "Today, 08:42",
  },
  {
    id: "#TRX-948211",
    customer: "Alex Rivera",
    kind: "Individual",
    product: "Basic AI License",
    method: "Stripe",
    amount: 49,
    status: "Completed",
    date: "Today, 07:15",
  },
  {
    id: "#TRX-948212",
    customer: "Nova Solutions",
    kind: "Agency",
    product: "Workflow Automation",
    method: "Stripe",
    amount: 1250,
    status: "Pending",
    date: "Yesterday",
  },
];

export const downloadReport = () => {
  const lines = [
    "Metric,Value",
    "Total Revenue,$1,248,390",
    "Product Sales,$324,500",
    "Enterprise Revenue,$642,100",
    "Individual Consumer Revenue,$232,410",
    "Token Cost,$52,410",
    "",
    "Transaction,Customer,Product,Method,Amount,Status,Date",
    ...TRANSACTIONS.map((row) =>
      [row.id, row.customer, row.product, row.method, row.amount.toFixed(2), row.status, row.date]
        .map((value) => `"${value}"`)
        .join(","),
    ),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "far-financial-report.csv";
  anchor.click();
  URL.revokeObjectURL(url);
};

export const REVENUE: Record<"30 Days" | "6 Months" | "1 Year", { label: string; value: number }[]> = {
  "30 Days": [
    { label: "W1", value: 8200 },
    { label: "W2", value: 9400 },
    { label: "W3", value: 11200 },
    { label: "W4", value: 12850 },
  ],
  "6 Months": [
    { label: "Jan", value: 32000 },
    { label: "Feb", value: 38000 },
    { label: "Mar", value: 35000 },
    { label: "Apr", value: 42000 },
    { label: "May", value: 48000 },
    { label: "Jun", value: 44000 },
  ],
  "1 Year": [
    { label: "Jul", value: 28000 },
    { label: "Aug", value: 30000 },
    { label: "Sep", value: 31000 },
    { label: "Oct", value: 34000 },
    { label: "Nov", value: 36000 },
    { label: "Dec", value: 33000 },
    { label: "Jan", value: 32000 },
    { label: "Feb", value: 38000 },
    { label: "Mar", value: 35000 },
    { label: "Apr", value: 42000 },
    { label: "May", value: 48000 },
    { label: "Jun", value: 44000 },
  ],
};

export const PAYMENT_METHODS = [
  { name: "Card", value: 42, color: "#22d3ee" },
  { name: "Wire", value: 28, color: "#fbbf24" },
  { name: "ACH", value: 18, color: "#6b7280" },
  { name: "Other", value: 12, color: "#e5e7eb" },
];
