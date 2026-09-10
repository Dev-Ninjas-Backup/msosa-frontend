// src/components/consumer/dashboard/ActiveReflections.tsx
import { Link } from "react-router-dom";
import { ArrowRight, FileText, ImageIcon, Info, Plus } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "./Card";

const ActiveReflections = () => {
  return (
    <AnimatedContainer delay={0.1}>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-playfair text-xl text-primary-text">
          Active Reflections
        </h2>
        <Info className="size-4 text-secondary-text" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current Reflection */}
        <Card className="p-4 sm:p-5 flex flex-col">
          <div className="w-full h-28 rounded-xl bg-black/40 border border-white/8 flex items-center justify-center mb-4">
            <div className="flex flex-col items-center gap-1.5 text-secondary-text">
              <ImageIcon className="size-6 opacity-50" />
              <span className="text-xs">Cover Image</span>
            </div>
          </div>

          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-secondary-text shrink-0" />
              <h3 className="text-base font-medium text-primary-text">
                Relationship Reflection
                <sup className="text-[#10B7BA] text-[10px]">™</sup>
              </h3>
            </div>
            <span className="shrink-0 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-semibold px-2.5 py-1 tracking-wide">
              IN PROGRESS
            </span>
          </div>

          <p className="text-sm text-secondary-text leading-relaxed mb-4">
            Examine the underlying dynamics of your interpersonal connections
            and attachment.
          </p>

          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-secondary-text">Progress</span>
              <span className="text-primary-text font-medium">65%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#10B7BA]"
                style={{ width: "65%" }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-secondary-text mb-5">
            <span>
              Started: <span className="text-primary-text">Oct 12, 2023</span>
            </span>
            <span>
              LAST ACTIVITY:{" "}
              <span className="text-primary-text">Oct 24, 2023</span>
            </span>
          </div>
          <p className="text-xs text-secondary-text mb-4">
            EST. REMAINING:{" "}
            <span className="text-primary-text">~11 Minutes</span>
          </p>

          <Link to="/consumer/reflection-room" className="mt-auto">
            <button
              type="button"
              className="w-full h-11 rounded-xl bg-[#F5C542] hover:bg-[#e8b93a] text-black text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border-0"
            >
              Continue Reflection
              <ArrowRight className="size-4" />
            </button>
          </Link>
        </Card>

        {/* New Reflection */}
        <Card className="p-4 sm:p-5 border-dashed flex flex-col items-center justify-center text-center min-h-[320px]">
          <div className="size-12 rounded-full border border-white/15 bg-white/5 flex items-center justify-center mb-4">
            <Plus className="size-5 text-secondary-text" />
          </div>
          <h3 className="text-base font-medium text-primary-text mb-1">
            New Reflection
          </h3>
          <p className="text-sm text-secondary-text mb-5 max-w-[200px]">
            Start a new journey of personal discovery.
          </p>
          <Link to="/consumer/blueprint">
            <button
              type="button"
              className="h-10 px-5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-primary-text text-sm font-medium transition-colors cursor-pointer"
            >
              Explore Library
            </button>
          </Link>
        </Card>
      </div>
    </AnimatedContainer>
  );
};

export default ActiveReflections;