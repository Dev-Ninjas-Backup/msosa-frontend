// src/pages/consumer/CheckoutSuccess.tsx
import { Link } from "react-router-dom";
import { Check, Plus } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";

const PURCHASE_HISTORY = [
  {
    title: "FuturePath Reflection™",
    order: "ORDER #FS-88291 · OCT 24, 2023",
    price: "$99.00",
    status: "IN PROGRESS (60%)",
    statusColor: "text-[#FBBF24]",
    primaryAction: "START REFLECTION",
    primaryTo: "/consumer/reflection-room",
  },
  {
    title: "Relationship Reflection™",
    order: "ORDER #FS-77102 · SEP 12, 2023",
    price: "$99.00",
    status: "COMPLETED",
    statusColor: "text-emerald-400",
    secondaryAction: "VIEW REPORT",
    secondaryTo: "/consumer/report",
    primaryAction: "CONTINUE REFLECTION",
    primaryTo: "/consumer/reflection-room",
  },
];

const EXPLORE_NEXT = [
  {
    title: "Decision Reflection™",
    description:
      "Master the art of extreme focus and neurological endurance with our proprietary flow-state framework.",
    price: "$129.00",
  },
  {
    title: "Love Reflection™",
    description:
      "Map your social capital and learn to navigate complex organizational hierarchies with ethical precision.",
    price: "$149.00",
  },
  {
    title: "Executive Function & Clarity Reflection™",
    description:
      "Map your social capital and learn to navigate complex organizational hierarchies with ethical precision.",
    price: "$149.00",
  },
];

const CheckoutSuccess = () => {
  return (
    <div className="space-y-10 sm:space-y-12 pb-10">
      {/* Breadcrumb */}
      <p className="text-[11px] tracking-[0.14em] text-secondary-text uppercase">
        Reflection <span className="mx-1.5">›</span> Checkout{" "}
        <span className="mx-1.5">›</span> Purchase
      </p>

      {/* Success Banner */}
      <AnimatedContainer delay={0.05}>
        <div
          className="relative overflow-hidden flex flex-col items-center text-center"
          style={{
            padding: "64px",
            borderRadius: "40px",
            border: "1px solid rgba(251, 191, 36, 0.20)",
            background: "rgba(255, 255, 255, 0.05)",
            boxShadow: "0 0 40px 0 rgba(16, 185, 129, 0.10)",
            backdropFilter: "blur(6px)",
          }}
        >
          {/* Soft gold glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FBBF24]/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-[220px] bg-[#FBBF24]/20 blur-[110px] rounded-full pointer-events-none" />
          <div className="absolute top-0 right-0 w-2/4 h-full   pointer-events-none" >
            <img
              src="/checkoutSuccess/torch.png"
              alt="Checkout Success Banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 ">
            <div className="mx-auto size-20 border border-[#FBBF2410] p-4 rounded-full bg-[#FBBF240] backdrop-filter backdrop-blur-sm flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(251,191,36,0.45)]">
              <div className="mx-auto size-12 my-auto rounded-full bg-[#FBBF24] flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(251,191,36,0.45)]">
              <Check className="size-8 text-black" strokeWidth={3} />
            </div>
            </div>


            <h1 className="font-playfair text-3xl sm:text-4xl text-primary-text mb-3">
              CONGRATULATIONS!
            </h1>

            <p className="text-sm sm:text-base text-secondary-text max-w-lg mx-auto mb-8 leading-relaxed">
              Your{" "}
              <span className="text-primary-text font-medium">
                FuturePath Reflection™
              </span>{" "}
              has been successfully purchased. You can now begin your guided
              reflection journey and unlock the potential of your cognitive
              patterns.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/consumer/reflection-room">
                <button
                  type="button"
                  className="h-11 px-6 rounded-xl bg-[#FBBF24] hover:bg-[#e5a820] text-black text-sm font-semibold transition-colors cursor-pointer border-0"
                >
                  Start Reflection
                </button>
              </Link>

              <Link to="/consumer/dashboard">
                <button
                  type="button"
                  className="h-11 px-6 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-primary-text text-sm font-medium transition-colors cursor-pointer"
                >
                  Go to Dashboard
                </button>
              </Link>

              <Link
                to="/consumer/blueprint"
                className="text-sm text-secondary-text hover:text-primary-text transition-colors"
              >
                View All Reflections →
              </Link>
            </div>
          </div>
        </div>
      </AnimatedContainer>

      {/* Purchase History */}
      <AnimatedContainer delay={0.1}>
        <div>
          <h2 className="font-playfair text-xl text-primary-text mb-4">
            Purchase History
          </h2>

          <div className="space-y-3">
            {PURCHASE_HISTORY.map((item) => (
              <div
                key={item.title}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                style={{
                  borderRadius: "16px",
                  border: "1px solid rgba(255, 255, 255, 0.10)",
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <div className="size-4 rounded-full border-2 border-secondary-text" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-primary-text truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-secondary-text mt-0.5">
                      {item.order}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary-text">
                      {item.price}
                    </p>
                    <p className={`text-[11px] font-medium ${item.statusColor}`}>
                      {item.status}
                    </p>
                  </div>

                  {item.secondaryAction && (
                    <Link to={item.secondaryTo || "#"}>
                      <button
                        type="button"
                        className="h-9 px-4 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-primary-text text-xs font-medium transition-colors cursor-pointer"
                      >
                        {item.secondaryAction}
                      </button>
                    </Link>
                  )}

                  <Link to={item.primaryTo}>
                    <button
                      type="button"
                      className="h-9 px-4 rounded-lg bg-[#FBBF24] hover:bg-[#e5a820] text-black text-xs font-semibold transition-colors cursor-pointer border-0 whitespace-nowrap"
                    >
                      {item.primaryAction}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedContainer>

      {/* Explore Next */}
      <AnimatedContainer delay={0.15}>
        <div>
          <h2 className="font-playfair text-xl text-primary-text mb-1">
            Explore Next
          </h2>
          <p className="text-xs tracking-[0.12em] text-secondary-text uppercase mb-4">
            Based on your recent journey
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXPLORE_NEXT.map((item) => (
              <div
                key={item.title}
                className="p-5 flex flex-col"
                style={{
                  borderRadius: "16px",
                  border: "1px solid rgba(255, 255, 255, 0.10)",
                  background: "rgba(255, 255, 255, 0.05)",
                  boxShadow: "0 0 40px 0 rgba(99, 102, 241, 0.10)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <h3 className="text-base font-medium text-primary-text mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-secondary-text leading-relaxed mb-4 flex-1">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary-text">
                    {item.price}
                  </span>
                  <Link to="/consumer/checkout">
                    <button
                      type="button"
                      className="size-9 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center text-secondary-text hover:text-primary-text transition-colors cursor-pointer"
                    >
                      <Plus className="size-4" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default CheckoutSuccess;