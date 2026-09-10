import React from "react";
import CommonWrapper from "@/common/CommonWrapper";
import Skeleton from "@/common/Skeleton";

/**
 * Exact layout skeleton for the Home page.
 * Includes Navbar placeholder so UI never jumps, and exact Banner + Reflection Room grid.
 */
export const HomeSkeleton: React.FC = () => {
  return (
    <CommonWrapper>
      <div className="w-full text-primary-text space-y-16 animate-pulse select-none pointer-events-none">
        {/* =========================================================================
            1. Banner Skeleton (Matches Banner.tsx 1:1)
           ========================================================================= */}
        <section className="bg-primary-bg text-primary-text min-h-screen pt-22 flex items-center justify-center overflow-visible">
          <div className="w-full grid grid-cols-1 lg:grid-cols-13 gap-10 items-center">
            {/* Left Column: Headlines & Call-to-Actions (exact match to Banner.tsx) */}
            <div className="lg:col-span-4 flex flex-col gap-18">
              {/* 3 lines of H1 text: leading-[1.4] text-3xl sm:text-4xl lg:text-[42px] xl:text-5xl */}
              <div className="flex flex-col gap-2 sm:gap-3">
                <Skeleton className="h-10 sm:h-12 lg:h-13 xl:h-14 w-full bg-white/15 rounded-md" />
                <Skeleton className="h-10 sm:h-12 lg:h-13 xl:h-14 w-4/5 bg-primary-brand/30 rounded-md" />
                <Skeleton className="h-10 sm:h-12 lg:h-13 xl:h-14 w-full bg-white/15 rounded-md" />
              </div>

              {/* Subtle Gradient Accent Divider: h-0.5 w-24 mt-3 */}
              <div className="h-0.5 w-24 bg-primary-brand/40 mt-3 rounded-full" />

              {/* Subtitle block: flex flex-col gap-6, text-xl leading-relaxed */}
              <div className="flex flex-col gap-6">
                <Skeleton className="h-7 w-64 bg-white/10 rounded-md" />
                <Skeleton className="h-7 w-88 max-w-full bg-white/10 rounded-md" />
              </div>

              {/* Action Buttons: pt-2, h-13 buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Skeleton className="h-13 w-52 rounded-lg bg-primary-brand/35 shadow-lg" />
                <Skeleton className="h-13 w-48 rounded-lg bg-white/5 border border-primary-brand/30" />
              </div>
            </div>

            {/* Center Column: Microphone Visualizer Ambient Glow Placeholder (lg:col-span-5) */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <div className="relative flex items-center justify-center w-full max-w-[580px] aspect-square">
                {/* Ambient Background Glow (identical to visualizer) */}
                <div className="absolute inset-0 bg-radial from-[#FFAA00]/15 via-[#FF7700]/10 to-transparent blur-3xl scale-150 pointer-events-none" />

                {/* Central soft halo core */}
                <div className="w-56 h-56 rounded-full bg-radial from-[#FFAA00]/30 to-transparent blur-2xl pointer-events-none" />
              </div>
            </div>

            {/* Right Column: Platform Logo, Tagline & 4 Feature Pillars (lg:col-span-4 flex flex-col justify-between self-stretch py-4 gap-10 lg:gap-14) */}
            <div className="lg:col-span-4 flex flex-col justify-between self-stretch py-4 gap-10 lg:gap-14">
              {/* Logo & Headline */}
              <div className="flex flex-col gap-6">
                <div className="w-full max-w-[300px]">
                  <Skeleton className="h-14 w-64 bg-white/15 rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-7 w-full bg-white/10 rounded-md" />
                  <Skeleton className="h-7 w-4/5 bg-white/10 rounded-md" />
                </div>
              </div>

              {/* 4 Feature Columns / Pillars with glowing vertical dividers (exact match) */}
              <div className="relative pt-6 border-t border-white/10">
                <div className="flex items-center justify-between w-full">
                  {[0, 1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className="relative flex-1 flex flex-col items-center text-center px-3 sm:px-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[1px] before:h-24 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent first:before:hidden"
                    >
                      <Skeleton className="size-12 rounded-full bg-primary-brand/20 mb-3" />
                      <Skeleton className="h-4 w-14 bg-white/10 rounded-xs mb-1" />
                      <Skeleton className="h-4 w-12 bg-white/10 rounded-xs" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. Reflection Room Section Skeleton (Header Flare Beam + 8 Solution Cards)
           ========================================================================= */}
        <section className="w-full py-16 lg:py-24">
          {/* Header Divider & Title Pill */}
          <div className="relative w-full flex items-center justify-center mb-12 sm:mb-16">
            <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-white/10 to-primary-brand/30" />
            <div className="px-6 py-2 bg-primary-bg z-10 shrink-0">
              <Skeleton className="h-6 w-80 max-w-full bg-white/15 rounded-md" />
            </div>
            <div className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-white/10 to-primary-brand/30" />
          </div>

          {/* 8-Card Grid (4x2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center h-48 sm:h-52 rounded-xl bg-[#0b0f15] border border-white/10 p-6 space-y-5"
              >
                {/* Icon circle placeholder */}
                <Skeleton className="size-18 rounded-full bg-white/10 border border-white/10" />

                {/* Title badge placeholder */}
                <Skeleton className="h-4 w-36 bg-white/10 rounded-sm" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </CommonWrapper>
  );
};

export default HomeSkeleton;
