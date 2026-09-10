import React from "react";
import { Hammer, Sparkles } from "lucide-react";
import CommonWrapper from "@/common/CommonWrapper";

interface WorkInProgressProps {
  title: string;
  subtitle?: string;
}

const WorkInProgress: React.FC<WorkInProgressProps> = ({
  title,
  subtitle = "This section is currently under development. Stay tuned for updates!",
}) => {
  return (
    <CommonWrapper>
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="relative mb-6">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-primary-brand/20 blur-2xl rounded-full" />
          
          <div className="relative size-20 sm:size-24 rounded-2xl bg-light-bg border border-border flex items-center justify-center shadow-lg">
            <Hammer className="size-10 text-primary-brand animate-bounce" />
            <Sparkles className="size-4 text-primary-brand absolute -top-1 -right-1" />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-brand/10 border border-primary-brand/30 text-primary-brand text-xs font-semibold uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-primary-brand animate-ping" />
          Work in Progress
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-primary-text mb-3">
          {title}
        </h1>

        <p className="text-secondary-text text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          {subtitle}
        </p>

        <div className="mt-8 flex items-center gap-2 text-xs text-secondary-text">
          <span className="w-1.5 h-1.5 rounded-full bg-border" />
          <span>FAR SYSTEMS™ Platform</span>
          <span className="w-1.5 h-1.5 rounded-full bg-border" />
        </div>
      </div>
    </CommonWrapper>
  );
};

export default WorkInProgress;
