import React, { useState } from "react";

interface MicrophoneAcousticVisualizerProps {
  micSrc: string;
  altText?: string;
  totalBars?: number;
}

export const MicrophoneAcousticVisualizer: React.FC<MicrophoneAcousticVisualizerProps> = ({
  micSrc,
  altText = "FAR Systems Voice Intelligence Microphone",
  totalBars = 56,
}) => {
  const [barConfigs] = useState(() => {
    return Array.from({ length: totalBars }, (_, index) => {
      const centerDist = Math.abs(index - totalBars / 2) / (totalBars / 2);
      const heightFactor = Math.max(0.12, Math.pow(1 - Math.pow(centerDist, 1.35), 0.85));
      const duration = 0.9 + Math.random() * 0.65;
      const delay = Math.random() * -2.5;
      return {
        heightFactor,
        duration,
        delay,
      };
    });
  });

  return (
    <div className="relative flex items-center justify-center w-full max-w-[min(100%,420px)] md:max-w-[min(100%,460px)] lg:max-w-[min(100%,380px)] xl:max-w-[min(100%,540px)] 2xl:max-w-[min(100%,580px)] aspect-square select-none pointer-events-none overflow-visible">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-radial from-[#FFAA00]/10 via-[#FF7700]/5 to-transparent blur-3xl pointer-events-none transform-gpu scale-130 sm:scale-140 md:scale-150 lg:scale-140 xl:scale-170 2xl:scale-180" />

      {/* Concentric ripples */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={`wave-circle-${index}`}
            className="wave-ripple-circle absolute rounded-full pointer-events-none w-[110%] h-[110%] sm:w-[115%] sm:h-[115%] md:w-[120%] md:h-[120%] lg:w-[125%] lg:h-[125%] xl:w-[180%] xl:h-[180%] max-w-[600px] max-h-[600px]"
            style={{
              animationDelay: `-${index * 2.25}s`,
              animationDuration: "9s",
            }}
          />
        ))}
      </div>

      {/* Sound-wave bars */}
      <div className="absolute inset-x-0 sm:-inset-x-5 md:-inset-x-7 lg:-inset-x-6 xl:-inset-x-12 2xl:-inset-x-16 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-10 px-1">
        {barConfigs.map((bar, i) => {
          const isMiddleHidden = i > totalBars * 0.42 && i < totalBars * 0.58;
          // Slightly shorter bars at lg (1024) because column is narrower
          const baseHeight = 20 + bar.heightFactor * 175;

          return (
            <span
              key={`wave-bar-${i}`}
              className="inline-block pointer-events-none transform-gpu will-change-transform"
              style={{
                width: "clamp(1.3px, 0.4vw, 3px)",
                height: `clamp(${baseHeight * 0.3}px, ${baseHeight * 0.1}vw, ${baseHeight}px)`,
                margin: "0 clamp(0.35px, 0.12vw, 1.6px)",
                opacity: isMiddleHidden ? 0.35 : 1,
                clipPath: "polygon(50% 0%, 100% 10%, 100% 90%, 50% 100%, 0% 90%, 0% 10%)",
                background:
                  "linear-gradient(180deg, rgba(255, 140, 0, 0.25) 0%, rgba(255, 185, 30, 0.9) 15%, rgba(255, 235, 110, 1) 35%, #FFFFFF 50%, rgba(255, 235, 110, 1) 65%, rgba(255, 185, 30, 0.9) 85%, rgba(255, 140, 0, 0.25) 100%)",
                boxShadow:
                  "0 0 9px rgba(255, 255, 255, 0.9), 0 0 18px rgba(255, 210, 60, 0.85), 0 0 28px rgba(255, 140, 10, 0.65)",
                animation: `soundWaveBar ${bar.duration}s ease-in-out infinite alternate`,
                animationDelay: `${bar.delay}s`,
                transformOrigin: "center center",
              }}
            />
          );
        })}
      </div>

      {/* Microphone */}
      <div className="relative z-20 flex items-center justify-center pointer-events-none w-[72%] sm:w-[78%] md:w-[80%] lg:w-[90%] xl:w-full">
        <div className="absolute top-[22%] w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-36 lg:h-36 xl:w-48 xl:h-48 2xl:w-56 2xl:h-56 rounded-full bg-radial from-[#FFE680]/50 via-[#FFAA00]/40 to-transparent blur-2xl pointer-events-none transform-gpu" />

        <img
          src={micSrc}
          alt={altText}
          className="w-full h-auto max-h-[220px] sm:max-h-[280px] md:max-h-[320px] lg:max-h-[340px] xl:max-h-[400px] 2xl:max-h-[520px] object-contain relative z-20 transform-gpu"
        />
      </div>

      <style>{`
        .wave-ripple-circle {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.04) translateZ(0);
          border: 1.5px solid rgba(255, 190, 45, 0.7);
          box-shadow: 0 0 16px rgba(255, 175, 30, 0.4), inset 0 0 10px rgba(255, 185, 40, 0.25);
          animation-name: rippleWave;
          animation-timing-function: cubic-bezier(0, 0.2, 0.8, 1);
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }

        @keyframes rippleWave {
          0% {
            transform: translate(-50%, -50%) scale(0.04) translateZ(0);
            opacity: 1;
          }
          45% {
            opacity: 0.9;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.25) translateZ(0);
            opacity: 0;
          }
        }

        @keyframes soundWaveBar {
          0% {
            transform: scaleY(0.2) translateZ(0);
            opacity: 0.45;
          }
          100% {
            transform: scaleY(1.2) translateZ(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default MicrophoneAcousticVisualizer;