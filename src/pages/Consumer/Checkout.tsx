// src/pages/consumer/Checkout.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mic,
  Cloud,
  FileText,
  Users,
  Infinity,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";

const INCLUDED = [
  {
    icon: Mic,
    title: "Voice & Text",
    desc: "MULTI-MODAL INPUT",
  },
  {
    icon: Cloud,
    title: "Auto Save",
    desc: "CLOUD SYNCHRONIZATION",
  },
  {
    icon: FileText,
    title: "PDF Report",
    desc: "EXECUTIVE SUMMARY",
  },
  {
    icon: Users,
    title: "FAR Methodology",
    desc: "FOCUS, ACCELERATION, REFINEMENT",
  },
  {
    icon: Infinity,
    title: "Continuity Awareness™ Support",
    desc: "LONGITUDINAL PATTERN TRACKING OVER TIME",
  },
];

const Checkout = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("Encounters Corp");
  const [email, setEmail] = useState("admin@organization.com");
  const [cardNumber, setCardNumber] = useState("1234 1234 1234 1234");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardholder, setCardholder] = useState("Encounters Corp");

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // For now → go directly to success
    navigate("/consumer/checkout/success");
  };

  return (
    <div className="pb-10">
      {/* Breadcrumb */}
      <p className="text-[11px] tracking-[0.14em] text-secondary-text uppercase mb-4">
        Blueprint <span className="mx-1.5">›</span> Checkout
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_400px] gap-8 lg:gap-10">
        {/* Left Column */}
        <AnimatedContainer delay={0.05}>
          <div>
            <span className="inline-block rounded-full bg-[#FBBF24]/15 text-[#FBBF24] text-[11px] font-semibold px-3 py-1 tracking-wide mb-4">
              REFLECTIVE FRAMEWORK
            </span>

            <h1 className="font-playfair text-3xl sm:text-4xl text-primary-text mb-3">
              FuturePath Blueprint
              <sup className="text-[#FBBF24] text-lg">™</sup>
            </h1>

            <p className="text-sm sm:text-base text-secondary-text max-w-xl mb-8">
              Designed to improve relationship awareness, communication, and
              emotional understanding through guided reflection.
            </p>

            {/* What's Included */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <h2 className="text-base font-medium text-primary-text mb-5">
                What&apos;s Included
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {INCLUDED.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <Icon className="size-4 text-secondary-text" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary-text">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-secondary-text mt-0.5 tracking-wide">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </AnimatedContainer>

        {/* Right Column – Purchase Summary */}
        <AnimatedContainer delay={0.1} direction="left">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 sticky top-24">
            <h2 className="text-lg font-medium text-primary-text mb-5">
              Purchase Summary
            </h2>

            {/* Line items */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary-text">
                  Relationship
                  <sup className="text-[#FBBF24] text-[10px]">™</sup>
                </span>
                <span className="text-primary-text">$99.00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary-text">Tax (Calculated)</span>
                <span className="text-primary-text">$0.00</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 mb-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[11px] tracking-[0.12em] text-secondary-text uppercase">
                    Total Amount
                  </p>
                  <p className="text-3xl font-semibold text-primary-text mt-1">
                    $99.00
                  </p>
                </div>
                <span className="text-xs text-secondary-text">
                  One-time payment
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handlePayment} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] tracking-[0.1em] text-secondary-text uppercase mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-sm text-primary-text outline-none focus:border-[#FBBF24]/40 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] tracking-[0.1em] text-secondary-text uppercase mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-sm text-primary-text outline-none focus:border-[#FBBF24]/40 transition-colors"
                />
              </div>

              {/* Card Details Box */}
              <div className="rounded-xl border border-white/10 bg-black/30 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded bg-[#635BFF] flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white">S</span>
                    </div>
                    <span className="text-sm font-medium text-primary-text">
                      Card Details
                    </span>
                  </div>
                  <span className="text-[10px] text-secondary-text bg-white/5 px-2 py-0.5 rounded-full">
                    Powered by Stripe
                  </span>
                </div>

                {/* Card Number */}
                <div>
                  <label className="block text-[10px] tracking-[0.1em] text-secondary-text uppercase mb-1.5">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full h-11 pl-4 pr-12 rounded-xl border border-white/10 bg-white/5 text-sm text-primary-text outline-none focus:border-[#FBBF24]/40 transition-colors"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                      <div className="size-6 rounded bg-red-500/80" />
                      <div className="size-6 rounded bg-amber-400/80" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] tracking-[0.1em] text-secondary-text uppercase mb-1.5">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-sm text-primary-text placeholder:text-secondary-text outline-none focus:border-[#FBBF24]/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.1em] text-secondary-text uppercase mb-1.5">
                      CVC
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="CVC"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className="w-full h-11 px-4 pr-10 rounded-xl border border-white/10 bg-white/5 text-sm text-primary-text placeholder:text-secondary-text outline-none focus:border-[#FBBF24]/40 transition-colors"
                      />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-secondary-text" />
                    </div>
                  </div>
                </div>

                {/* Cardholder */}
                <div>
                  <label className="block text-[10px] tracking-[0.1em] text-secondary-text uppercase mb-1.5">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardholder}
                    onChange={(e) => setCardholder(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-sm text-primary-text outline-none focus:border-[#FBBF24]/40 transition-colors"
                  />
                </div>
              </div>

              {/* Continue Payment */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#FBBF24] hover:bg-[#e5a820] text-black text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border-0 mt-2"
              >
                Continue Payment →
              </button>

              <button
                type="button"
                onClick={() => navigate("/consumer/blueprint")}
                className="w-full text-center text-sm text-secondary-text hover:text-primary-text transition-colors border-0 bg-transparent cursor-pointer py-1"
              >
                Cancel Purchase
              </button>

              <p className="flex items-center justify-center gap-1.5 text-[11px] text-secondary-text pt-1">
                <ShieldCheck className="size-3.5" />
                Secure Checkout · PCI Compliant
              </p>
            </form>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
};

export default Checkout;