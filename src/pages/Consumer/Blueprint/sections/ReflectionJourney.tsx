// src/components/consumer/marketplace/ReflectionJourney.tsx
import { ShoppingCart, Mic, Sparkles, FileText, Infinity, User } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    icon: ShoppingCart,
    label: "Purchase",
    sub: "SELECT\nREFLECTION",
    active: true,
  },
  {
    icon: Mic,
    label: "Reflect",
    sub: "VOICE & TEXT",
    active: false,
  },
  {
    icon: User ,
    label: "Illumination Bridge™",
    sub: "HUMAN & AI\nTRANSFORMATION STAGE",
    active: false,
  },
  {
    icon: FileText,
    label: "Deliver",
    sub: "PDF NARRATIVE",
    active: false,
  },
  {
    icon: Infinity,
    label: "Evolve",
    sub: "CONTINUUM UPDATED",
    active: true,
  },
];

const ReflectionJourney = () => {
  return (
    <div className="text-center">
      <h2 className="font-playfair text-2xl sm:text-3xl text-primary-text mb-2">
        The Reflection Journey
      </h2>
      <p className="text-sm text-secondary-text max-w-2xl mx-auto mb-10">
        A seamless flow from initial reflection to transformative insight, powered by
        FAR Systems™ Continuum architecture.
      </p>

      <div className="relative flex items-start justify-between max-w-3xl mx-auto px-2">
        {/* Connecting line */}
        <div className="absolute top-6 left-[10%] right-[10%] h-px bg-white/10 hidden sm:block" />

        {STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.label}
              className="flex flex-col items-center gap-3 relative z-[1] flex-1"
            >
              <div
                className={cn(
                  "size-12 rounded-full border flex items-center justify-center",
                  step.active
                    ? "border-[#10B7BA] bg-[#10B7BA]/15 text-[#10B7BA]"
                    : "border-white/15 bg-black/40 text-secondary-text"
                )}
              >
                <Icon className="size-5" />
              </div>
              <div>
                <p
                  className={cn(
                    "text-sm font-medium",
                    step.active ? "text-primary-text" : "text-secondary-text"
                  )}
                >
                  {step.label}
                </p>
                <p className="text-[10px] text-secondary-text mt-0.5 whitespace-pre-line leading-tight">
                  {step.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReflectionJourney;