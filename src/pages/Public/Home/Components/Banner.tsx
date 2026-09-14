import { ArrowRight, Play, Mic, Brain, Shield, BarChart3 } from 'lucide-react';
import Button from "@/ui/Button";
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
    <section className="bg-primary-bg text-primary-text min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-5rem)] lg:min-h-screen pt-16 sm:pt-20 lg:pt-16 xl:pt-20 2xl:pt-22 flex items-center justify-center overflow-visible py-10 lg:py-0">
      <div className="w-full grid grid-cols-1 lg:grid-cols-13 gap-6 md:gap-7 lg:gap-6 xl:gap-9 2xl:gap-10 items-center">

        {/* Left Column - Text */}
        <div className="lg:col-span-5  2xl:col-span-4 flex flex-col gap-6 sm:gap-10 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-18 order-1 justify-center">

          <h1 className="text-2xl py-3 sm:text-3xl md:text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-5xl font-bold uppercase tracking-tight leading-[1.3] sm:leading-[1.35] md:leading-[1.3] 2xl:leading-[1.4]">
            <span className="block text-white">VOICE INTELLIGENCE.</span>
            <span className="block text-gradient">REAL VISIBILITY.</span>
            <span className="block text-white">MEANINGFUL IMPACT.</span>
          </h1>

          <div className="h-0.5 w-20 md:w-22 lg:w-24 bg-linear-to-r from-primary-brand/80 via-primary-brand/30 to-transparent" />

          <div className="flex flex-col gap-2.5 sm:gap-4 md:gap-5 lg:gap-5 2xl:gap-6">
            <p className="text-secondary-text text-base sm:text-lg md:text-[17px] lg:text-lg xl:text-xl 2xl:text-xl leading-relaxed">
              Speak naturally. See clearly. Move forward with confidence and purpose.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-3.5 md:gap-4 pt-1 2xl:pt-2">
            <Button
              variant="primary"
              size="lg"
              className="text-black! h-11! sm:h-12! md:h-12! lg:h-12! xl:h-13! 2xl:h-13! w-full sm:w-auto justify-center text-sm md:text-[15px]"
              rightIcon={<ArrowRight size={15} className="text-black stroke-[2.5]" />}
            >
              EXPLORE SOLUTIONS
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-11! sm:h-12! md:h-12! lg:h-12! xl:h-13! 2xl:h-13! w-full sm:w-auto justify-center text-sm md:text-[15px]"
              leftIcon={
                <span className="flex items-center justify-center w-5 h-5 rounded-full border border-primary-brand text-primary-brand">
                  <Play size={9} fill="currentColor" className="ml-0.5" />
                </span>
              }
            >
              WATCH OVERVIEW
            </Button>
          </div>
        </div>

        {/* Center Column - Microphone */}
        <div className="lg:col-span-3  2xl:col-span-5 flex items-center justify-center relative order-2 my-3 md:my-4 lg:my-0 max-w-[340px] sm:max-w-[400px] md:max-w-[420px] lg:max-w-[380px] xl:max-w-[500px] 2xl:max-w-none min-w-450vw!  mx-auto w-full overflow-visible">
          <MicrophoneAcousticVisualizer micSrc={micHeroImg} />
        </div>

        {/* Right Column - Logo + Features */}
        <div className="lg:col-span-5 xl:ml-22 2xl:ml-0  2xl:col-span-4 flex flex-col justify-between self-stretch py-2 lg:py-3 xl:py-4 2xl:py-4 gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14 order-3">
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-5 xl:gap-6 2xl:gap-6 select-none items-center lg:items-start text-center lg:text-left">
            <div className="w-full max-w-[180px] sm:max-w-[210px] md:max-w-[230px] lg:max-w-[260px] xl:max-w-[280px] 2xl:max-w-[300px] select-none">
              <img
                src={farSystemsLogo}
                alt="FAR SYSTEMS"
                className="w-full h-auto object-contain pointer-events-none"
              />
            </div>

            <p className="text-gray-300! text-base sm:text-lg md:text-[17px] lg:text-xl xl:text-xl 2xl:text-2xl font-normal leading-snug">
              The Visibility Intelligence Platform™ {" "}
              <br className="hidden sm:block" />
              Powered by Voice. Built for Continuity.
            </p>
          </div>

          {/* Feature pillars */}
          <div className="relative pt-5 md:pt-6 border-t border-white/10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-0 lg:flex lg:items-center lg:justify-between w-full">
              {features.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="relative flex flex-col items-center text-center group cursor-pointer px-1.5 sm:px-2 md:px-3 lg:px-3 xl:px-3.5 2xl:px-4 lg:flex-1 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-px before:h-20 md:before:h-22 lg:before:h-22 xl:before:h-24 2xl:before:h-24 before:bg-gradient-to-b before:from-transparent before:via-secondary-brand before:to-transparent before:opacity-80 before:hidden lg:before:block first:before:hidden"
                  >
                    <div className="text-primary-brand group-hover:scale-110 transition-transform duration-200 mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-2.5 xl:mb-3 2xl:mb-3">
                      <Icon className="size-7 sm:size-8 md:size-9 lg:size-10 xl:size-11 2xl:size-[46px]" strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm xl:text-sm 2xl:text-base font-semibold tracking-wider text-secondary-text uppercase leading-tight whitespace-nowrap">
                      {item.label}
                    </span>
                    <span className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm xl:text-sm 2xl:text-base font-semibold tracking-wider text-secondary-text uppercase leading-tight whitespace-nowrap">
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