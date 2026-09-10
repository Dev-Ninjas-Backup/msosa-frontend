import { Link } from "react-router-dom";
import {
  Check,
  Cloud,
  FileText,
  Mic,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { Label } from "@/ui/Label";

const INCLUDED = [
  {
    icon: Mic,
    title: "Voice & Text",
    subtitle: "Multi-modal input",
  },
  {
    icon: FileText,
    title: "PDF Report",
    subtitle: "Executive Summary",
  },
  {
    icon: ShieldCheck,
    title: "Continuity Awareness™ Support",
    subtitle: "Longitudinal pattern tracking over time",
  },
  {
    icon: Cloud,
    title: "Auto Save",
    subtitle: "Cloud synchronization",
  },
  {
    icon: UserCheck,
    title: "Founder Expert Review",
    subtitle: "Human Oversight",
  },
] as const;

const Checkout = () => {
  return (
    <div className="pb-4">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-blue">
        <Link to="/consumer/blueprint" className="hover:text-primary-brand">
          Marketplace
        </Link>
        <span>/</span>
        <span className="text-primary-text">Checkout</span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] gap-6 lg:gap-8">
        <AnimatedContainer delay={0.05}>
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-light-bg/50 p-4 sm:p-6">
              <p className="text-xs uppercase tracking-wider text-primary-brand">
                Reflective Framework
              </p>
              <h2 className="mt-2 font-playfair text-2xl sm:text-3xl text-primary-text">
                FuturePath Blueprint™
              </h2>

              <h3 className="mt-6 text-sm font-semibold text-primary-text">
                What&apos;s Included
              </h3>
              <ul className="mt-4 space-y-3">
                {INCLUDED.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.title} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-8 items-center justify-center rounded-lg bg-primary-brand/10 text-primary-brand shrink-0">
                        <Icon className="size-4" />
                      </span>
                      <div>
                        <p className="text-sm text-primary-text font-medium">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-blue">{item.subtitle}</p>
                      </div>
                      <Check className="size-4 text-emerald-400 ml-auto mt-1 shrink-0" />
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-light-bg/50 p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-playfair text-xl text-primary-text">
                  Card Details
                </h3>
                <span className="text-xs text-muted-blue">Powered by Stripe</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <Label>Full Name</Label>
                  <Input variant="soft" placeholder="Acme Corp" defaultValue="Sarah Jenkins" />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <Label>Email Address</Label>
                  <Input
                    variant="soft"
                    type="email"
                    placeholder="you@example.com"
                    defaultValue="sarah@example.com"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <Label>Card Number</Label>
                  <Input variant="soft" placeholder="1234 1234 1234 1234" />
                </div>
                <div className="space-y-1.5">
                  <Label>Expiry Date</Label>
                  <Input variant="soft" placeholder="MM / YY" />
                </div>
                <div className="space-y-1.5">
                  <Label>CVC</Label>
                  <Input variant="soft" placeholder="CVC" />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <Label>Cardholder Name</Label>
                  <Input variant="soft" placeholder="Name on card" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button variant="primary" className="flex-1">
                  Continue Payment
                </Button>
                <Link to="/consumer/blueprint" className="flex-1 sm:flex-none">
                  <Button variant="secondary" fullWidth>
                    Cancel Purchase
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-muted-blue text-center sm:text-left">
                Secure Checkout · PCI Compliant
              </p>
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.1} direction="left">
          <div className="rounded-2xl border border-white/10 bg-light-bg/60 p-5 sm:p-6 xl:sticky xl:top-28">
            <h3 className="font-playfair text-xl text-primary-text">
              Purchase Summary
            </h3>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-secondary-text">Relationship™</span>
                <span className="text-primary-text">$99.00</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-secondary-text">Tax (Calculated)</span>
                <span className="text-primary-text">$0.00</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between gap-3">
                <span className="text-primary-text font-semibold">Total Amount</span>
                <span className="font-playfair text-2xl text-primary-brand">
                  $99.00
                </span>
              </div>
              <p className="text-xs text-muted-blue">One-time payment</p>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
};

export default Checkout;
