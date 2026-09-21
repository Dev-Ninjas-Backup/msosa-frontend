import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import AssignEmployeesModal from "./AssignEmployeesModal";
import {
  FEATURES,
  ORG_BENEFITS,
  SEAT_OPTIONS,
  getBlueprint,
  toneClass,
} from "./data";

const BlueprintDetail = () => {
  const { blueprintId } = useParams<{ blueprintId: string }>();
  const bp = blueprintId ? getBlueprint(blueprintId) : undefined;

  const [seats, setSeats] = useState(50);
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [subscriptionOn, setSubscriptionOn] = useState(true);
  const [assignOpen, setAssignOpen] = useState(false);

  const unit = bp?.pricePerSeat ?? 12;
  const monthly = useMemo(() => seats * unit, [seats, unit]);
  const annualRaw = monthly * 12;
  const annual =
    billing === "annual" ? Math.round(annualRaw * 0.85) : annualRaw;
  const displayMonthly =
    billing === "annual" ? Math.round(monthly * 0.85) : monthly;

  if (!bp) {
    return <Navigate to="/enterprise/blueprint-management" replace />;
  }

  const adjustSeats = (delta: number) => {
    setSeats((s) => Math.max(1, Math.min(9999, s + delta)));
  };

  return (
    <div className="space-y-6 pb-8">
      <AnimatedContainer delay={0.02}>
        <div className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/50">
          <Link
            to="/enterprise/blueprint-management"
            className="hover:text-[#FBBF24] no-underline text-white/50"
          >
            Enterprise Management
          </Link>
          <span className="text-white/30 mx-0.5">&gt;</span>
          <span className="text-white/50">{bp.name}</span>
        </div>
      </AnimatedContainer>

      {/* Hero */}
      <AnimatedContainer delay={0.04}>
        <Card className="p-6 sm:p-8 space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="min-w-0 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[rgba(16,183,186,0.12)] border border-[rgba(16,183,186,0.2)] px-2.5 py-1 text-[12px] font-medium text-[#10B7BA]">
                  {bp.tag}
                </span>
                <span className="rounded-full bg-white/[0.06] border border-white/10 px-2.5 py-1 text-[12px] font-medium text-white/60">
                  {bp.version}
                </span>
                <span className="rounded-full bg-white/[0.06] border border-white/10 px-2.5 py-1 text-[12px] font-medium text-white/60 inline-flex items-center gap-1.5">
                  Last Updated: {bp.lastUpdated}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="leading-none">
                <span className="text-[31px] font-black text-[#FBBF24] tracking-tight">
                  ${bp.pricePerSeat}
                </span>
                <span className="text-[16px] text-[#9CA3AF]">/seat</span>
              </p>
              <p className="mt-1 text-[12px] text-white/40">
                Per Seat · Unlimited Seats
              </p>
            </div>
          </div>

          <p className="text-[14px] text-[#9CA3AF] leading-6 max-w-4xl">
            {bp.longDescription}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            {[
              { label: "Target", value: bp.target },
              { label: "Duration", value: bp.duration },
              { label: "Assessment Type", value: bp.assessmentType },
            ].map((m, i) => (
              <div key={m.label} className="flex items-center gap-6">
                {i > 0 ? (
                  <span className="hidden sm:block w-px h-7 bg-white/10" />
                ) : null}
                <div className="flex items-center gap-2">
                  <span className="flex size-[26px] items-center justify-center rounded-md bg-[rgba(16,183,186,0.1)] text-[#10B7BA] text-[11px] font-bold">
                    {m.label[0]}
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-white/35">
                      {m.label}
                    </p>
                    <p className="text-[12px] font-semibold text-white">
                      {m.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="primary"
            className="rounded-[10px]! bg-[#FBBF24]! text-black! hover:bg-[#e8b93a]! px-[22px]! py-[11px]! text-[14px]! h-auto!"
            onClick={() =>
              document
                .getElementById("purchase-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {bp.status === "available"
              ? "Purchase Reflection"
              : "Manage Purchase"}
          </Button>
        </Card>
      </AnimatedContainer>

      {/* Purpose / Outcomes / Benefits / Description */}
      <AnimatedContainer delay={0.08}>
        <Card className="py-5 overflow-hidden">
          <div className="flex justify-end px-5 mb-2">
            <Button
              variant="primary"
              size="sm"
              className="rounded-[10px]! bg-[#FBBF24]! text-black! hover:bg-[#e8b93a]! px-[22px]! py-3! text-[15px]! h-auto!"
              onClick={() => toast.message("Preview coming soon.")}
            >
              Preview
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-6 pt-2">
            <div className="space-y-3">
              <div className="rounded-xl border border-[#FFFFFF14] bg-[#0D1117] p-5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-lg border border-[rgba(16,183,186,0.2)] bg-[rgba(16,183,186,0.12)] text-[#10B7BA] text-[13px] font-bold">
                    P
                  </span>
                  <h3 className="text-[15px] font-bold text-white">Purpose</h3>
                </div>
                <p className="text-[13px] text-[#9CA3AF] leading-5">
                  {bp.purpose}
                </p>
              </div>
              <div className="rounded-xl border border-[#FFFFFF14] bg-[#0D1117] p-5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-lg border border-[rgba(16,183,186,0.2)] bg-[rgba(16,183,186,0.12)] text-[#10B7BA] text-[13px] font-bold">
                    O
                  </span>
                  <h3 className="text-[15px] font-bold text-white">Outcomes</h3>
                </div>
                <ul className="space-y-2.5">
                  {bp.outcomes.map((o) => (
                    <li key={o} className="flex items-center gap-2.5">
                      <span className="flex size-4 items-center justify-center rounded-full bg-[rgba(16,183,186,0.15)]">
                        <Check
                          className="size-2.5 text-[#10B7BA]"
                          strokeWidth={3}
                        />
                      </span>
                      <span className="text-[13px] text-white/80">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl border border-[#FFFFFF14] bg-[#0D1117] p-5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-lg border border-[rgba(251,191,36,0.2)] bg-[rgba(251,191,36,0.12)] text-[#FBBF24] text-[13px] font-bold">
                    B
                  </span>
                  <h3 className="text-[15px] font-bold text-white">Benefits</h3>
                </div>
                <ul className="space-y-2.5">
                  {bp.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2.5">
                      <span className="flex size-4 items-center justify-center rounded-full bg-[rgba(251,191,36,0.15)]">
                        <Check
                          className="size-2.5 text-[#FBBF24]"
                          strokeWidth={3}
                        />
                      </span>
                      <span className="text-[13px] text-white/80">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-[#FFFFFF14] bg-[#0D1117] p-5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-lg border border-[rgba(96,165,250,0.2)] bg-[rgba(96,165,250,0.12)] text-[#60A5FA] text-[13px] font-bold">
                    D
                  </span>
                  <h3 className="text-[15px] font-bold text-white">
                    Description
                  </h3>
                </div>
                <p className="text-[13px] text-[#9CA3AF] leading-5">
                  {bp.longDescription}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </AnimatedContainer>

      {/* Features */}
      <AnimatedContainer delay={0.1}>
        <Card className="p-8 space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h3 className="text-[17px] font-bold text-white">Features</h3>
              <p className="text-[13px] text-[#9CA3AF] mt-0.5">
                Included capabilities with {bp.name}
              </p>
            </div>
            <span className="rounded-full bg-[rgba(16,183,186,0.1)] px-2.5 py-1 text-[12px] font-semibold text-[#10B7BA]">
              9/9 Features Included
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="flex items-center gap-2.5 rounded-[10px] border border-[#FFFFFF14] bg-[#0D1117] px-4 py-3"
                >
                  <span className="flex size-[30px] shrink-0 items-center justify-center rounded-lg border border-[rgba(16,183,186,0.2)] bg-[rgba(16,183,186,0.12)] text-[#10B7BA]">
                    <Icon className="size-3" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-white">
                      {f.title}
                    </p>
                    <p className="text-[11px] text-white/40">{f.detail}</p>
                  </div>
                  <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[rgba(16,183,186,0.15)]">
                    <Check className="size-2.5 text-[#10B7BA]" strokeWidth={3} />
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </AnimatedContainer>

      {/* Org Benefits */}
      <AnimatedContainer delay={0.12}>
        <Card className="p-8 space-y-4">
          <div>
            <h3 className="text-[17px] font-bold text-white">
              Organization Benefits
            </h3>
            <p className="text-[13px] text-[#9CA3AF] mt-0.5">
              How {bp.name} serves your organization at scale
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
            {ORG_BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="rounded-xl border border-[#FFFFFF14] bg-[#0D1117] p-[18px] space-y-3"
                >
                  <span
                    className={cn(
                      "flex size-[38px] items-center justify-center rounded-[10px] border",
                      toneClass(b.tone)
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-white">{b.title}</p>
                    <p className="mt-1 text-[12px] text-white/45 leading-4">
                      {b.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </AnimatedContainer>

      {/* Purchase */}
      <AnimatedContainer delay={0.14}>
        <Card id="purchase-section" className="p-8 space-y-4">
          <div>
            <h3 className="text-[17px] font-bold text-white">
              Purchase Information
            </h3>
            <p className="text-[13px] text-[#9CA3AF] mt-0.5">
              Licensing details and seat configuration for your organization
            </p>
          </div>

          <div className="flex flex-col xl:flex-row gap-5">
            <div className="flex-1 rounded-[14px] border border-[#FFFFFF14] bg-[#0D1117] p-6 space-y-[18px]">
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-lg border border-[rgba(251,191,36,0.2)] bg-[rgba(251,191,36,0.12)] text-[#FBBF24] text-[13px] font-bold">
                  $
                </span>
                <h4 className="text-[16px] font-bold text-white">
                  Pricing Details
                </h4>
              </div>

              <div>
                <div className="flex items-center justify-between py-[11px] border-b border-white/[0.06]">
                  <span className="text-[13px] text-white/50">Base Price</span>
                  <p className="leading-none">
                    <span className="text-[17px] font-black text-[#FBBF24]">
                      ${bp.pricePerSeat}
                    </span>
                    <span className="text-[12px] text-[#9CA3AF]">
                      /seat/month
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-between py-[11px] border-b border-white/[0.06] gap-3 flex-wrap">
                  <span className="text-[13px] text-white/50">Seat Options</span>
                  <div className="flex flex-wrap gap-1.5">
                    {SEAT_OPTIONS.map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setSeats(n === 250 ? 250 : n)}
                        className={cn(
                          "rounded px-1.5 py-0.5 text-[11px] font-semibold cursor-pointer transition-colors",
                          seats === n || (n === 250 && seats >= 250)
                            ? "bg-[rgba(16,183,186,0.25)] text-[#10B7BA] ring-1 ring-[#10B7BA]/40"
                            : "bg-[rgba(16,183,186,0.1)] text-[#10B7BA]"
                        )}
                      >
                        {n === 250 ? "250+" : n}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between py-[11px] border-b border-white/[0.06] gap-3 flex-wrap">
                  <span className="text-[13px] text-white/50">Billing Cycle</span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setBilling("monthly")}
                      className={cn(
                        "rounded-[5px] px-2 py-0.5 text-[12px] cursor-pointer transition-colors",
                        billing === "monthly"
                          ? "bg-[rgba(16,183,186,0.15)] text-[#10B7BA] font-semibold"
                          : "bg-white/5 text-white/50"
                      )}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setBilling("annual")}
                      className={cn(
                        "rounded-[5px] px-2 py-0.5 text-[12px] cursor-pointer transition-colors",
                        billing === "annual"
                          ? "bg-[rgba(16,183,186,0.15)] text-[#10B7BA] font-semibold"
                          : "bg-white/5 text-white/50"
                      )}
                    >
                      Annual (−15%)
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between py-[11px] border-b border-white/[0.06]">
                  <span className="text-[13px] text-white/50">
                    Organization License
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white">
                    <Check className="size-3 text-[#10B7BA]" strokeWidth={3} />
                    Yes
                  </span>
                </div>
                <div className="flex items-center justify-between py-[11px]">
                  <span className="text-[13px] text-white/50">Subscription</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={subscriptionOn}
                    onClick={() => setSubscriptionOn((v) => !v)}
                    className={cn(
                      "relative h-5 w-9 rounded-full transition-colors cursor-pointer",
                      subscriptionOn ? "bg-[#FBBF24]" : "bg-white/20"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 size-3.5 rounded-full bg-black transition-all",
                        subscriptionOn ? "right-0.5" : "left-0.5"
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full xl:w-[340px] shrink-0 rounded-[14px] border border-[#FFFFFF14] bg-[#0D1117] p-6 space-y-5">
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-lg border border-[rgba(16,183,186,0.2)] bg-[rgba(16,183,186,0.12)] text-[#10B7BA] text-[13px] font-bold">
                  #
                </span>
                <h4 className="text-[16px] font-bold text-white">
                  Seat Calculator
                </h4>
              </div>

              <div className="space-y-1.5">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-white/50">
                  How many seats?
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="inline-flex items-center overflow-hidden rounded-lg border border-white/10 bg-black">
                    <button
                      type="button"
                      onClick={() => adjustSeats(-1)}
                      className="px-3 py-3.5 text-white/60 hover:text-white cursor-pointer"
                      aria-label="Decrease seats"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="px-5 py-2.5 text-[19px] font-bold text-white tabular-nums min-w-[3ch] text-center">
                      {seats}
                    </span>
                    <button
                      type="button"
                      onClick={() => adjustSeats(1)}
                      className="px-3 py-3.5 text-white/60 hover:text-white cursor-pointer"
                      aria-label="Increase seats"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <span className="text-[12px] text-white/40">
                    seats selected
                  </span>
                </div>
              </div>

              <div className="rounded-[10px] border border-[#FFFFFF14] bg-[#0D1117] p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-white/50">
                    {seats} seats × ${bp.pricePerSeat}
                  </span>
                  <span className="text-[13px] font-semibold text-white/70">
                    ${monthly.toLocaleString()}/mo
                  </span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-white/50">Annual total</span>
                  <span className="text-[13px] font-semibold text-white/70">
                    ${annual.toLocaleString()}/yr
                  </span>
                </div>
                <div className="h-px bg-white/[0.07]" />
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-white">
                    Total Monthly
                  </span>
                  <span className="text-[21px] font-black text-[#FBBF24]">
                    ${displayMonthly.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full rounded-[10px]! bg-[#FBBF24]! text-black! hover:bg-[#e8b93a]! h-11! text-[14px]! font-bold!"
                onClick={() =>
                  toast.success(
                    `Added ${seats} seats — $${displayMonthly}/mo to cart.`
                  )
                }
              >
                Add to Cart — ${displayMonthly.toLocaleString()}/mo
              </Button>
              <p className="text-[11px] text-white/30 text-center">
                Cancel anytime · No setup fee · Invoiced monthly
              </p>
            </div>
          </div>
        </Card>
      </AnimatedContainer>

      {bp.status === "in_progress" ? (
        <AnimatedContainer delay={0.16}>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="success"
              className="rounded-xl! bg-[#10B7BA]! border-[#10B7BA]! text-black! h-11! px-5!"
              onClick={() => setAssignOpen(true)}
            >
              Assign to Employees
              <ChevronRight className="size-4" />
            </Button>
            <Button variant="soft" className="rounded-xl! h-11!" asChild>
              <Link to="/enterprise/blueprint-management">
                <ChevronLeft className="size-4" />
                Back to catalog
              </Link>
            </Button>
          </div>
        </AnimatedContainer>
      ) : (
        <AnimatedContainer delay={0.16}>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="success"
              className="rounded-xl! bg-[#10B7BA]! border-[#10B7BA]! text-black! h-11! px-5!"
              onClick={() => setAssignOpen(true)}
            >
              Assign to Employees
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </AnimatedContainer>
      )}

      <div className="rounded-lg bg-white/[0.02] px-4 py-4 flex justify-center">
        <p className="text-[12px] text-white/40 text-center tracking-tight">
          FAR Systems™ uses enterprise-grade encryption. Your personal
          reflection data is private and secure.
        </p>
      </div>

      <AssignEmployeesModal
        isOpen={assignOpen}
        reflectionName={bp.name}
        onClose={() => setAssignOpen(false)}
        onAssigned={(count) =>
          toast.success(
            `Assigned ${bp.name} to ${count} employee${count === 1 ? "" : "s"}.`
          )
        }
      />
    </div>
  );
};

export default BlueprintDetail;
