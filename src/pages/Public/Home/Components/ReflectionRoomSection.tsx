import {
  User,
  Users,
  GraduationCap,
  Building2,
  Plus,
} from "lucide-react";
import starFlareImg from "@/assets/image12.png";

interface SolutionItem {
  title: string;
  trademark?: boolean;
  isComingSoon?: boolean;
  icon: typeof User;
  iconBgClass: string;
  iconColorClass: string;
  borderClass: string;
  shadowClass: string;
}

const solutions: SolutionItem[] = [
  {
    title: "CONSUMER SOLUTIONS",
    trademark: true,
    isComingSoon: false,
    icon: User,
    iconBgClass: "bg-primary-purple/15",
    iconColorClass: "text-primary-purple",
    borderClass: "border-primary-purple/40",
    shadowClass: "shadow-[0_0_20px_rgba(168,85,247,0.35)]",
  },
  {
    title: "ORGANIZATIONAL SOLUTIONS",
    trademark: true,
    isComingSoon: false,
    icon: Users,
    iconBgClass: "bg-primary-green/15",
    iconColorClass: "text-primary-green",
    borderClass: "border-primary-green/40",
    shadowClass: "shadow-[0_0_20px_rgba(34,197,94,0.35)]",
  },
  {
    title: "READINESS SOLUTIONS",
    trademark: true,
    isComingSoon: false,
    icon: GraduationCap,
    iconBgClass: "bg-primary-orange/15",
    iconColorClass: "text-primary-orange",
    borderClass: "border-primary-orange/40",
    shadowClass: "shadow-[0_0_20px_rgba(249,115,22,0.35)]",
  },
  {
    title: "ENTERPRISE SOLUTIONS",
    trademark: true,
    isComingSoon: false,
    icon: Building2,
    iconBgClass: "bg-light-blue/15",
    iconColorClass: "text-light-blue",
    borderClass: "border-light-blue/40",
    shadowClass: "shadow-[0_0_20px_rgba(59,130,246,0.35)]",
  },
  {
    title: "COMING SOON",
    trademark: false,
    isComingSoon: true,
    icon: Plus,
    iconBgClass: "bg-transparent",
    iconColorClass: "text-secondary-brand",
    borderClass: "border-secondary-brand/40",
    shadowClass: "shadow-none",
  },
  {
    title: "COMING SOON",
    trademark: false,
    isComingSoon: true,
    icon: Plus,
    iconBgClass: "bg-transparent",
    iconColorClass: "text-secondary-brand",
    borderClass: "border-secondary-brand/40",
    shadowClass: "shadow-none",
  },
  {
    title: "COMING SOON",
    trademark: false,
    isComingSoon: true,
    icon: Plus,
    iconBgClass: "bg-transparent",
    iconColorClass: "text-secondary-brand",
    borderClass: "border-secondary-brand/40",
    shadowClass: "shadow-none",
  },
  {
    title: "COMING SOON",
    trademark: false,
    isComingSoon: true,
    icon: Plus,
    iconBgClass: "bg-transparent",
    iconColorClass: "text-secondary-brand",
    borderClass: "border-secondary-brand/40",
    shadowClass: "shadow-none",
  },
];

const ReflectionRoomSection = () => {
  return (
    <section className="w-full text-primary-text py-16 lg:py-24 select-none">
      {/* 1. Header Banner with Golden Light Beam & Star Accents (Image 12 on border) */}
      <div className="relative w-full flex items-center justify-center mb-12 sm:mb-16">
        {/* Full-width continuous horizontal gold beam line */}
        {/* Left glowing border segment & flare */}
        <div className="flex-1 relative flex items-center justify-end h-14 overflow-visible">
          {/* Left star flare: oriented towards text, perfectly centered on the line */}
          <img
            src={starFlareImg}
            alt=""
            className="absolute right-0 object-contain pointer-events-none select-none z-10"
          />
        </div>

        {/* Center Header Text */}
        <div className="relative px-4 sm:px-6 py-2 bg-primary-bg z-20 shrink-0">
          <h2 className="text-xs sm:text-sm md:text-base lg:text-xl font-medium leading-5
tracking-[5.60px] text-secondary-brand uppercase text-center font-['Inter'] whitespace-nowrap">
            FEATURING THE UNIVERSAL FAR REFLECTION ROOM
            <sup className="text-[10px] ml-1 tracking-normal font-normal">TM</sup>
          </h2>
        </div>

        {/* Right glowing border segment & flare */}
        <div className="flex-1 relative flex items-center justify-start h-14 overflow-visible">
          {/* Right star flare: flipped horizontally so larger burst faces inward, perfectly centered on line */}
          <img
            src={starFlareImg}
            alt=""
            className=" object-contain -scale-x-100 pointer-events-none select-none z-10"
          />
        </div>
      </div>

      {/* 2. Solutions 8-Card Grid (4x2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {solutions.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="group relative flex flex-col items-center justify-center h-48 sm:h-52 rounded-xl bg-[#0b0f15] border border-border hover:border-white/20 transition-all duration-300 cursor-pointer overflow-hidden p-6 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
              {/* Subtle radial inner glow on card hover */}
              <div className="absolute inset-0 bg-radial from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Icon Circle */}
              <div className="mb-6 relative flex items-center justify-center">
                {item.isComingSoon ? (
                  // Dashed coming soon circle
                  <div className={`size-18 rounded-full border border-dashed ${item.borderClass} flex items-center justify-center ${item.iconColorClass} group-hover:scale-110 group-hover:border-secondary-brand transition-all duration-300`}>
                    <Icon size={28} strokeWidth={1.8} />
                  </div>
                ) : (
                  // Glowing colored solution icon circle
                  <div
                    className={`size-18 rounded-full flex items-center justify-center border ${item.borderClass} ${item.iconBgClass} ${item.shadowClass} group-hover:scale-110 transition-all duration-300`}
                  >
                    <Icon size={34} className={item.iconColorClass} strokeWidth={1.75} />
                  </div>
                )}
              </div>

              {/* Title & Trademark */}
              <div className="relative z-10 text-center">
                <span
                  className={`text-xs sm:text-sm font-semibold tracking-wider uppercase leading-snug ${item.isComingSoon
                    ? "text-secondary-brand group-hover:text-primary-brand"
                    : "text-primary-text/90 group-hover:text-primary-text"
                    }`}
                >
                  {item.title}
                  {item.trademark && (
                    <sup className="text-[10px] ml-0.5 font-normal text-secondary-text">
                      TM
                    </sup>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ReflectionRoomSection;
