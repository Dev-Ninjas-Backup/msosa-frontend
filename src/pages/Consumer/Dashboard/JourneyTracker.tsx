// src/components/consumer/dashboard/JourneyTracker.tsx
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";

import { cn } from "@/lib/utils";

const JOURNEY = [
  {
    label: "PRODUCT\nSELECTED",
    desc: "Your journey is ready to begin.",
    done: true,
  },
  {
    label: "REFLECTION\nROOM™",
    desc: "Your guided reflection is underway.",
    done: true,
  },
  {
    label: "REFLECTION\nSUBMITTED",
    desc: "",
    done: true,
  },
  {
    label: "ILLUMINATION\nBRIDGE™",
    desc: "Transforming reflection into personalized insight.",
    done: false,
    active: true,
  },
  {
    label: "REPORT/DASHBOARD OR\nOTHER EXTERNAL\nOUTPUT",
    desc: "Your personalized report is available.",
    done: false,
  },
  {
    label: "CONTINUUM™",
    desc: "Your path forward remains open.",
    done: false,
  },
];

const REFLECTIONS = [
  "Relationship",
  "Leadership",
  "Executive Function & Clarity",
  "Personal Values",
];

const JourneyTracker = () => {
  const [selected, setSelected] = useState("Relationship");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <AnimatedContainer delay={0.05}>
      <Card className="p-5 sm:p-6 lg:p-7 bg-[#0d1117] border border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Left: Title + Steps */}
          <div className="flex-1 min-w-0">
            {/* Dropdown */}
            <div className="relative inline-block mb-6" ref={ref}>
              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-1.5 text-base font-medium text-primary-text hover:text-white transition-colors border-0 bg-transparent cursor-pointer p-0"
              >
                <span>
                  {selected}
                  <sup className="text-[#10B7BA] text-[10px]">™</sup>
                </span>
                <ChevronDown
                  className={cn(
                    "size-4 text-secondary-text transition-transform duration-200",
                    open && "rotate-180"
                  )}
                />
              </button>

              {open && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-white/10 bg-[#0d1117] py-1.5 shadow-xl z-50">
                  {REFLECTIONS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setSelected(item);
                        setOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2.5 text-sm transition-colors border-0 bg-transparent cursor-pointer",
                        selected === item
                          ? "text-[#10B7BA] bg-white/5"
                          : "text-primary-text hover:bg-white/5"
                      )}
                    >
                      {item}
                      <sup className="text-[#10B7BA] text-[10px]">™</sup>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Steps */}
            <div className="relative">
              <div className="hidden md:block absolute top-4 left-[8%] right-[8%] h-[1px] bg-white/10" />
              <div className="hidden md:block absolute top-4 left-[8%] w-[42%] h-[1px] bg-[#10B7BA]" />

              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-2">
                {JOURNEY.map((step, i) => (
                  <div
                    key={step.label}
                    className="flex flex-col items-center text-center gap-2 relative z-[1]"
                  >
                    <span
                      className={cn(
                        "flex size-8 items-center justify-center rounded-full border text-xs font-semibold shrink-0",
                        step.done
                          ? "border-[#10B7BA] bg-[#10B7BA] text-black"
                          : step.active
                            ? "border-[#10B7BA] bg-[#10B7BA]/20 text-[#10B7BA]"
                            : "border-white/20 bg-black/40 text-secondary-text"
                      )}
                    >
                      {step.done ? (
                        <svg
                          className="size-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </span>
                    <div>
                      <p
                        className={cn(
                          "text-[10px] sm:text-[11px] font-semibold leading-tight whitespace-pre-line tracking-wide",
                          step.done || step.active
                            ? "text-primary-text"
                            : "text-secondary-text"
                        )}
                      >
                        {step.label}
                      </p>
                      {step.desc && (
                        <p className="mt-1 text-[10px] text-secondary-text leading-snug hidden sm:block">
                          {step.desc}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Expected Completion */}
          <div className="lg:border-l lg:border-white/10 lg:pl-6 shrink-0">
            <p className="text-[10px] font-semibold tracking-[0.12em] text-secondary-text uppercase">
              Expected Completion
            </p>
            <p className="mt-1 text-lg font-medium text-primary-text">
              Oct 28, 2026
            </p>
            <p className="mt-2 text-xs text-[#10B7BA] flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#10B7BA] animate-pulse" />
              In processing · ~12 mins remaining
            </p>
          </div>
        </div>
      </Card>
    </AnimatedContainer>
  );
};

export default JourneyTracker;