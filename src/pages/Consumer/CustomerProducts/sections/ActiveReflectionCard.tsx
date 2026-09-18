// src/pages/consumer/sections/ActiveReflectionCard.tsx
import { Link } from "react-router-dom";
import { ArrowRight, FileText, ImageIcon } from "lucide-react";
import Card from "@/ui/Card"; // or relative path
import { useMemberPortal } from "@/pages/shared/member/MemberPortalContext";

type ActiveReflectionCardProps = {
  title: string;
  description: string;
  progress: number;
  started: string;
  lastActivity: string;
  remaining: string;
};

const ActiveReflectionCard = ({
  title,
  description,
  progress,
  started,
  lastActivity,
  remaining,
}: ActiveReflectionCardProps) => {
  const { path } = useMemberPortal();

  return (
    <Card className="p-4 sm:p-5 flex flex-col " borderColor="#FFFFFF1A" >

      {/* Cover */}
      <div className="w-full h-28 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center mb-4">
        <div className="flex flex-col items-center gap-1.5 text-white/50">
          <ImageIcon className="size-6 opacity-60" />
          <span className="text-xs">Cover Image</span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-[#FBBF24] shrink-0" />
          <h3 className="text-base font-medium text-white">
            {title}
            <sup className="text-[#FBBF24] text-[10px]">™</sup>
          </h3>
        </div>
        <span className="shrink-0 rounded-full bg-[#FBBF24]/20 text-[#FBBF24] text-[10px] font-semibold px-2.5 py-1 tracking-wide">
          IN PROGRESS
        </span>
      </div>

      <p className="text-sm text-white/60 leading-relaxed mb-4">{description}</p>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-white/50">Progress</span>
          <span className="text-white font-medium">{progress}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#FBBF24]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/50 mb-2">
        <span>
          Started: <span className="text-white">{started}</span>
        </span>
        <span>
          LAST ACTIVITY: <span className="text-white">{lastActivity}</span>
        </span>
      </div>
      <p className="text-xs text-white/50 mb-4">
        EST. REMAINING: <span className="text-white">{remaining}</span>
      </p>

      <Link to={path("reflection-room")} className="mt-auto">
        <button
          type="button"
          className="w-full h-11 rounded-xl bg-[#FBBF24] hover:bg-[#e5a820] text-black text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border-0"
        >
          Continue Reflection
          <ArrowRight className="size-4" />
        </button>
      </Link>
    </Card>
  );
};

export default ActiveReflectionCard;