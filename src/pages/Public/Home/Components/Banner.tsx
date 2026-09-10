import React from 'react';
import { ArrowRight, Play, Mic, Brain, Shield, BarChart3 } from 'lucide-react';
import PrimaryButton from "@/common/PrimaryButton";
import micHeroImg from "@/assets/microphone.png";
import farSystemsLogo from "@/assets/banner logo.png";
import MicrophoneAcousticVisualizer from "./MicrophoneAcousticVisualizer";

const features = [
  {
    icon: Mic,
    label: "VOICE",
    sublabel: "FIRST",
  },
  {
    icon: Brain,
    label: "INTELLIGENT",
    sublabel: "INSIGHT",
  },
  {
    icon: Shield,
    label: "SECURE &",
    sublabel: "PRIVATE",
  },
  {
    icon: BarChart3,
    label: "ACTIONABLE",
    sublabel: "VISIBILITY",
  },
];

const Banner = () => {
  return (
    <section className="bg-primary-bg text-primary-text min-h-screen pt-22 flex items-center justify-center overflow-visible">
      <div className="w-full grid grid-cols-1 lg:grid-cols-13 gap-10 items-center">

        {/* Left Column: Headlines & Call-to-Actions */}
        <div className="lg:col-span-4 flex flex-col gap-18 ">

          <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-5xl font-bold uppercase tracking-tight leading-[1.4]">
            <span className="block text-white">VOICE INTELLIGENCE.</span>
            <span className="block text-gradient">REAL VISIBILITY.</span>
            <span className="block text-white">MEANINGFUL IMPACT.</span>
          </h1>

          {/* Subtle Gradient Accent Divider */}
          <div className="h-0.5 w-24 bg-linear-to-r from-primary-brand/80 via-primary-brand/30 to-transparent mt-3"></div>


          <div className="flex flex-col gap-6 ">
            <p className='text-secondary-text text-xl leading-relaxed'>Speak naturally. See clearly.</p>
            <p className='text-secondary-text text-xl leading-relaxed'>Move forward with confidence and purpose.</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <PrimaryButton
              variant="primary"
              size="lg"
              className="text-black! h-13!"
              rightIcon={<ArrowRight size={16} className="text-black stroke-[2.5]" />}
            >
              EXPLORE SOLUTIONS
            </PrimaryButton>

            <PrimaryButton
              variant="outline"
              size="lg"
              className="h-13!"
              leftIcon={
                <span className="flex items-center justify-center w-5 h-5 rounded-full border border-primary-brand text-primary-brand">
                  <Play size={10} fill="currentColor" className="ml-0.5" />
                </span>
              }
            >
              WATCH OVERVIEW
            </PrimaryButton>

          </div>

        </div>

        {/* Center Column: Microphone Acoustic Ring & Sound Wave Visualizer */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <MicrophoneAcousticVisualizer micSrc={micHeroImg} />
        </div>

        {/* Right Column: Platform Logo, Tagline & 4 Feature Pillars */}
        <div className="lg:col-span-4 flex flex-col justify-between self-stretch py-4 gap-10 lg:gap-14">
          {/* Logo & Headline */}
          <div className="flex flex-col gap-6 select-none">
            <div className="w-full max-w-[300px] select-none">
              <img
                src={farSystemsLogo}
                alt="FAR SYSTEMS"
                className="w-full h-auto object-contain pointer-events-none"
              />
            </div>

            <p className="text-gray-300! text-lg lg:text-2xl font-normal leading-snug">
              The Voice Intelligence Platform for <br /> Reflection-Driven Results.
            </p>
          </div>

          {/* 4 Feature Columns / Pillars with glowing vertical dividers */}
          <div className="relative pt-6 border-t border-white/10">
            <div className="flex items-center justify-between w-full">
              {features.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="relative flex-1 flex flex-col items-center text-center group cursor-pointer px-3 sm:px-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[1px] before:h-24 before:bg-gradient-to-b before:from-transparent before:via-secondary-brand before:to-transparent before:opacity-80 first:before:hidden"
                  >
                    <div className="text-primary-brand group-hover:scale-110 transition-transform duration-200 mb-3">
                      <Icon size={46} strokeWidth={1.5} />
                    </div>
                    <span className="text-xs sm:text-base font-semibold tracking-wider text-secondary-text uppercase leading-tight">
                      {item.label}
                    </span>
                    <span className="text-xs sm:text-base font-semibold tracking-wider text-secondary-text uppercase leading-tight">
                      {item.sublabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Banner;
