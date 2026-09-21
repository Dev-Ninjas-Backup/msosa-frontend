import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import SectionLink from "./SectionLink";

const BillingSubscription = () => (
  <AnimatedContainer delay={0.18}>
    <Card className="p-6 sm:p-8" backgroundColor="#0D1117">
      <div className="flex items-center justify-between gap-3 mb-6">
        <h3 className="text-xl font-semibold text-white font-playfair">
          Billing & Subscription
        </h3>
        <SectionLink to="/enterprise/billing">Upgrade</SectionLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <p className="text-xs text-white/55">Current Plan</p>
          <p className="mt-1 text-base font-semibold text-white">
            Professional Plan
          </p>
        </div>
        <div>
          <p className="text-xs text-white/55">Renewal Date</p>
          <p className="mt-1 text-base font-semibold text-white">Aug 15, 2026</p>
          <p className="mt-0.5 text-xs text-white/55">31 days remaining</p>
        </div>
        <div>
          <p className="text-xs text-white/55">Current Invoice</p>
          <p className="mt-1 text-base font-semibold text-white">INV-2026-042</p>
          <p className="mt-0.5 text-xs text-white/55">
            <span className="text-[#FBBF24]">$2,400/mo</span> · Due Aug 1
          </p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className="text-sm text-white">Seats Used</p>
          <p className="text-sm font-medium text-white tabular-nums">
            198 / 250
          </p>
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-white"
            style={{ width: "79%" }}
          />
        </div>
        <p className="mt-1.5 text-xs text-white/55">79% of seats used</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="soft"
          size="md"
          asChild
          className="rounded-xl! flex-1 bg-transparent! border-[#000000]"
        >
          <Link to="/enterprise/billing">Payment History</Link>
        </Button>
        <Button
          variant="soft"
          size="md"
          className="rounded-xl! flex-1 bg-transparent! border-[#000000]"
        >
          <Download className="size-4" />
          Download Invoice
        </Button>
      </div>
    </Card>
  </AnimatedContainer>
);

export default BillingSubscription;
