import { Download, Receipt } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";

const INVOICES = [
  {
    id: "INV-00126",
    period: "February 2026",
    amount: "$499",
    status: "Due Soon",
    date: "Feb 28, 2026",
  },
  {
    id: "INV-00125",
    period: "January 2026",
    amount: "$499",
    status: "Paid",
    date: "Jan 31, 2026",
  },
  {
    id: "INV-00124",
    period: "December 2025",
    amount: "$499",
    status: "Paid",
    date: "Dec 31, 2025",
  },
  {
    id: "INV-00123",
    period: "November 2025",
    amount: "$499",
    status: "Paid",
    date: "Nov 30, 2025",
  },
];

const Billing = () => {
  return (
    <div className="space-y-5 sm:space-y-6 pb-8">
      <AnimatedContainer delay={0.04}>
        <div className="flex flex-wrap gap-2 justify-end">
          <Button
            variant="primary"
            size="sm"
            className="rounded-xl! bg-[#FBBF24]!"
            onClick={() => toast.message("Upgrade plan coming soon.")}
          >
            Upgrade Plan
          </Button>
          <Button
            variant="soft"
            size="sm"
            className="rounded-xl!"
            onClick={() => toast.success("Renewal started.")}
          >
            Renew Subscription
          </Button>
          <Button
            variant="soft"
            size="sm"
            className="rounded-xl!"
            onClick={() => toast.success("Invoice download started.")}
          >
            <Download className="size-3.5" />
            Download Invoice
          </Button>
          <Button
            variant="soft"
            size="sm"
            className="rounded-xl!"
            onClick={() => toast.message("Support contacted.")}
          >
            Contact Support
          </Button>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.08}>
        <Card className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-[#F5C542]/15 text-[#F5C542]">
              Enterprise
            </span>
            <h3 className="text-lg text-primary-text">Current Subscription</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                badge: "ACTIVE",
                label: "Subscription Status",
                value: "Active",
                sub: "",
              },
              {
                badge: "38 DAYS",
                label: "Renewal Date",
                value: "Dec 31, 2026",
                sub: "38 days remaining",
              },
              {
                badge: "85%",
                label: "Active Licenses",
                value: "85 / 100 Seats",
                sub: "",
              },
              {
                badge: "MONTHLY",
                label: "Monthly Cost",
                value: "$499 / month",
                sub: "Annual billing cycle",
              },
              {
                badge: "DUE SOON",
                label: "Next Invoice",
                value: "$499",
                sub: "Due in 14 Days",
              },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4"
              >
                <span className="text-[10px] font-medium text-secondary-text">
                  {m.badge}
                </span>
                <p className="mt-2 text-base font-semibold text-primary-text">
                  {m.value}
                </p>
                <p className="mt-1 text-xs text-secondary-text">{m.label}</p>
                {m.sub ? (
                  <p className="mt-0.5 text-[10px] text-secondary-text/70">
                    {m.sub}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </Card>
      </AnimatedContainer>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatedContainer delay={0.1}>
          <Card className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div>
              <p className="text-sm font-medium text-orange-300">
                Subscription Expiring Soon
              </p>
              <p className="mt-1 text-xs text-secondary-text">
                38 days until renewal — December 31, 2026
              </p>
            </div>
            <Button
              variant="soft"
              size="sm"
              className="rounded-xl! shrink-0"
              onClick={() => toast.success("Auto-renewal enabled.")}
            >
              Enable Auto-Renewal
            </Button>
          </Card>
        </AnimatedContainer>
        <AnimatedContainer delay={0.12}>
          <Card className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div>
              <p className="text-sm font-medium text-primary-text">
                Invoice Available
              </p>
              <p className="mt-1 text-xs text-secondary-text">
                INV-00126 February 2026 is ready for download
              </p>
            </div>
            <Button
              variant="soft"
              size="sm"
              className="rounded-xl! shrink-0"
              onClick={() => toast.success("Invoice download started.")}
            >
              <Download className="size-3.5" />
              Download Invoice
            </Button>
          </Card>
        </AnimatedContainer>
      </div>

      <AnimatedContainer delay={0.14}>
        <Card className="overflow-hidden p-0">
          <div className="px-5 py-4 border-b border-white/[0.08]">
            <h3 className="text-lg text-primary-text flex items-center gap-2">
              <Receipt className="size-4 text-primary-brand" />
              Billing History & Invoices
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-white/[0.08] text-xs text-secondary-text">
                  <th className="px-5 py-3 font-medium">Invoice</th>
                  <th className="px-3 py-3 font-medium">Billing Period</th>
                  <th className="px-3 py-3 font-medium">Amount</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 font-medium">Date</th>
                  <th className="px-3 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {INVOICES.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-b border-white/[0.06] hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3.5 text-sm text-primary-text">
                      {inv.id}
                    </td>
                    <td className="px-3 py-3.5 text-sm text-secondary-text">
                      {inv.period}
                    </td>
                    <td className="px-3 py-3.5 text-sm text-[#F5C542] font-medium">
                      {inv.amount}
                    </td>
                    <td className="px-3 py-3.5">
                      <span
                        className={
                          inv.status === "Paid"
                            ? "text-teal-300 text-xs"
                            : "text-orange-300 text-xs"
                        }
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-sm text-secondary-text">
                      {inv.date}
                    </td>
                    <td className="px-3 py-3.5 text-right">
                      <Button
                        variant="soft"
                        size="sm"
                        className="rounded-lg!"
                        onClick={() => toast.success("Download started.")}
                      >
                        <Download className="size-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </AnimatedContainer>
    </div>
  );
};

export default Billing;
