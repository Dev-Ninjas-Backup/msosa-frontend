import { cn } from "@/lib/utils";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { Label } from "@/ui/Label";
import {
    type ProductDraft,
    PRICING_TYPES,
    RENEWAL_CYCLES,
} from "./data";

type StepProps = {
    draft: ProductDraft;
    setDraft: (patch: Partial<ProductDraft>) => void;
};

const fieldInput =
    "h-11! rounded-lg! border-white/10! bg-white/[0.05]! px-4! text-sm placeholder:text-white/30";

export const StepPricing = ({ draft, setDraft }: StepProps) => {
    const pricingType = draft.pricingType ?? "consumer";
    const price = draft.price ?? "";
    const trialPeriod = draft.trialPeriod ?? "";
    const billingCycle = draft.billingCycle ?? "One-time";
    const currency = draft.currency ?? "USD";

    const displayPrice = price === "" ? "0.00" : Number(price).toFixed(2);
    const planLabel =
        pricingType === "consumer"
            ? "One-Time"
            : pricingType === "subscription"
                ? "Subscription"
                : pricingType === "enterprise"
                    ? "Enterprise"
                    : "Seat-Based";

    return (
        <div className="space-y-5">
            {/* ── Pricing Model ── */}
            <section className="space-y-5 rounded-xl border border-white/10 bg-white/[0.05] p-5">
                <p className="text-sm font-bold tracking-[0.35px] text-white">
                    Pricing Model
                </p>

                {/* Pricing Type cards */}
                <div className="space-y-1.5">
                    <Label className="text-xs font-semibold tracking-[0.3px] text-white">
                        Pricing Type <span className="text-[#ef4444]">*</span>
                    </Label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {PRICING_TYPES.map((type) => {
                            const selected = pricingType === type.id;
                            return (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => setDraft({ pricingType: type.id })}
                                    className={cn(
                                        "relative flex flex-col items-start rounded-xl border px-4 py-3 text-left cursor-pointer transition-colors",
                                        selected
                                            ? "border-[#fbbf24] bg-[#fbbf24]/10"
                                            : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                                    )}
                                >
                                    {selected && (
                                        <span className="absolute right-2 top-2 rounded bg-[#fbbf24] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black">
                                            Selected
                                        </span>
                                    )}
                                    <span className="flex items-center gap-2">
                                        <span
                                            className={cn(
                                                "size-2.5 rounded-full border-2",
                                                selected
                                                    ? "border-[#fbbf24] bg-[#fbbf24]"
                                                    : "border-white/40"
                                            )}
                                        />
                                        <span className="text-[13px] font-semibold text-white">
                                            {type.label}
                                        </span>
                                    </span>
                                    <span className="mt-1 pl-[18px] text-xs text-white/50">
                                        {type.description}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Price + Trial Period */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                        <Label className="text-xs font-semibold tracking-[0.3px] text-white">
                            Price <span className="text-[#ef4444]">*</span>
                        </Label>
                        <div className="relative">
                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-white/40">
                                $
                            </span>
                            <Input
                                variant="soft"
                                type="number"
                                min={0}
                                step="0.01"
                                placeholder="e.g. 0.00"
                                value={price}
                                onChange={(e) => setDraft({ price: e.target.value })}
                                className={cn(fieldInput, "pl-7!")}
                            />
                        </div>
                        <p className="text-[11px] text-white/50">
                            Set the base price for this product
                        </p>
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs font-semibold tracking-[0.3px] text-white">
                            Trial Period
                        </Label>
                        <div className="relative">
                            <Input
                                variant="soft"
                                type="number"
                                min={0}
                                placeholder="e.g. 14"
                                value={trialPeriod}
                                onChange={(e) => setDraft({ trialPeriod: e.target.value })}
                                className={cn(fieldInput, "pr-14!")}
                            />
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/40">
                                days
                            </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                            Free trial duration in days
                        </p>
                    </div>
                </div>

                {/* Renewal */}
                <div className="space-y-1.5">
                    <Label className="text-xs font-semibold tracking-[0.3px] text-white">
                        Renewal
                    </Label>
                    <Select
                        variant="soft"
                        placeholder="Select renewal cycle"
                        options={[...RENEWAL_CYCLES]}
                        value={billingCycle}
                        onChange={(v) => setDraft({ billingCycle: v })}
                    />
                    <p className="text-[11px] text-white/50">
                        Monthly, Quarterly, Annual
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                        {RENEWAL_CYCLES.map((cycle) => {
                            const on = billingCycle === cycle;
                            return (
                                <button
                                    key={cycle}
                                    type="button"
                                    onClick={() => setDraft({ billingCycle: cycle })}
                                    className={cn(
                                        "rounded-full px-3 py-1 text-xs font-medium cursor-pointer border-0 transition-colors",
                                        on
                                            ? "bg-[#fbbf24]/15 text-[#fbbf24]"
                                            : "bg-white/[0.05] text-white/50 hover:text-white"
                                    )}
                                >
                                    {cycle}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Pricing Summary ── */}
            <section className="space-y-4 rounded-xl border border-white/10 bg-white/[0.05] p-5">
                <div className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-md bg-[#fbbf24]/12 text-[#fbbf24]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="10"
                            viewBox="0 0 12 10"
                            fill="none"
                        >
                            <g clipPath="url(#clip0_1336_62373)">
                                <path
                                    d="M0.5564 1.01117C0.32495 0.779575 0.32495 0.405305 0.5564 0.173702C0.787849 -0.0579007 1.16372 -0.0579007 1.39518 0.173702L4.95026 3.73113C5.18169 3.96272 5.18169 4.33885 4.95026 4.57045L1.39518 8.12782C1.16372 8.35942 0.787849 8.35942 0.5564 8.12782C0.32495 7.89627 0.32495 7.52014 0.5564 7.28854L3.69116 4.14985L0.5564 1.01117ZM5.12244 7.11437H10.455C10.7828 7.11437 11.0475 7.37933 11.0475 7.70727C11.0475 8.03526 10.7828 8.3002 10.455 8.3002H5.12244C4.79472 8.3002 4.52993 8.03526 4.52993 7.70727C4.52993 7.37933 4.79472 7.11437 5.12244 7.11437Z"
                                    fill="#FBBF24"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_1336_62373">
                                    <rect width="11.7" height="9.11" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </span>
                    <p className="text-sm font-bold tracking-[0.35px] text-white">
                        Pricing Summary
                    </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    {/* Plan Type row */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-[0.5px] text-white/40">
                            Plan Type
                        </span>
                        <span className="rounded-full bg-[#fbbf24]/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#fbbf24]">
                            {planLabel}
                        </span>
                    </div>

                    {/* Divider */}
                    <div className="my-4 h-px bg-white/10" />

                    {/* Price + Currency */}
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-white/40">
                                Price
                            </p>
                            <p className="mt-1 text-2xl font-bold leading-none text-white">
                                ${displayPrice}
                            </p>
                            <p className="mt-1 text-xs text-white/40">
                                /{" "}
                                {billingCycle === "One-time"
                                    ? "one-time"
                                    : billingCycle.toLowerCase()}
                            </p>
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-white/40">
                                Currency
                            </p>
                            <p className="mt-1 text-2xl font-bold leading-none text-white">
                                {currency}
                            </p>
                            <p className="mt-1 text-xs text-white/40">billing</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StepPricing;