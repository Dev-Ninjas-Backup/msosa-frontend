import { ArrowRight, Play, Mic, Brain, Shield, BarChart3 } from 'lucide-react';
import Button from "@/common/Button";
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
    <section className="bg-primary-bg text-primary-text min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-5rem)] lg:min-h-screen pt-16 sm:pt-20 lg:pt-22 flex items-center justify-center overflow-visible py-10 lg:py-0">
      <div className="w-full grid grid-cols-1 lg:grid-cols-13 gap-8 lg:gap-10 items-center">

        {/* Left Column: Headlines & Call-to-Actions */}
        <div className="lg:col-span-4 flex flex-col gap-8 sm:gap-12 lg:gap-18 order-1">

          <h1 className="text-2xl py-4 sm:text-3xl md:text-4xl lg:text-[42px] xl:text-5xl font-bold uppercase tracking-tight leading-[1.35] sm:leading-[1.4]">
            <span className="block text-white">VOICE INTELLIGENCE.</span>
            <span className="block text-gradient">REAL VISIBILITY.</span>
            <span className="block text-white">MEANINGFUL IMPACT.</span>
          </h1>

          <div className="h-0.5 w-24 bg-linear-to-r from-primary-brand/80 via-primary-brand/30 to-transparent" />

          <div className="flex flex-col gap-3 sm:gap-6">
            <p className="text-secondary-text text-base sm:text-lg lg:text-xl leading-relaxed">Speak naturally. See clearly.</p>
            <p className="text-secondary-text text-base sm:text-lg lg:text-xl leading-relaxed">Move forward with confidence and purpose.</p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              className="text-black! h-12! sm:h-13! w-full sm:w-auto justify-center"
              rightIcon={<ArrowRight size={16} className="text-black stroke-[2.5]" />}
            >
              EXPLORE SOLUTIONS
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-12! sm:h-13! w-full sm:w-auto justify-center"
              leftIcon={
                <span className="flex items-center justify-center w-5 h-5 rounded-full border border-primary-brand text-primary-brand">
                  <Play size={10} fill="currentColor" className="ml-0.5" />
                </span>
              }
            >
              WATCH OVERVIEW
            </Button>
          </div>

        </div>

        {/* Center Column: Microphone */}
        <div className="lg:col-span-5 flex items-center justify-center relative order-2 my-4 lg:my-0 max-w-[420px] sm:max-w-[520px] lg:max-w-none mx-auto w-full">
          <MicrophoneAcousticVisualizer micSrc={micHeroImg} />
        </div>

        {/* Right Column: Platform Logo & Feature Pillars */}
        <div className="lg:col-span-4 flex flex-col justify-between self-stretch py-2 lg:py-4 gap-8 lg:gap-14 order-3">
          <div className="flex flex-col gap-4 sm:gap-6 select-none items-center lg:items-start text-center lg:text-left">
            <div className="w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[300px] select-none">
              <img
                src={farSystemsLogo}
                alt="FAR SYSTEMS"
                className="w-full h-auto object-contain pointer-events-none"
              />
            </div>

            <p className="text-gray-300! text-base sm:text-lg lg:text-2xl font-normal leading-snug">
              The Voice Intelligence Platform for{" "}
              <br className="hidden sm:block" />
              Reflection-Driven Results.
            </p>
          </div>

          {/* Feature pillars — 2x2 on mobile/tablet, 4-across on lg+ */}
          <div className="relative pt-6 border-t border-white/10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:flex lg:items-center lg:justify-between w-full">
              {features.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="relative flex flex-col items-center text-center group cursor-pointer px-2 sm:px-3 lg:px-4 lg:flex-1 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-px before:h-24 before:bg-gradient-to-b before:from-transparent before:via-secondary-brand before:to-transparent before:opacity-80 before:hidden lg:before:block first:before:hidden"
                  >
                    <div className="text-primary-brand group-hover:scale-110 transition-transform duration-200 mb-2 sm:mb-3">
                      <Icon className="size-8 sm:size-10 lg:size-[46px]" strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] sm:text-xs lg:text-base font-semibold tracking-wider text-secondary-text uppercase leading-tight">
                      {item.label}
                    </span>
                    <span className="text-[10px] sm:text-xs lg:text-base font-semibold tracking-wider text-secondary-text uppercase leading-tight">
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
