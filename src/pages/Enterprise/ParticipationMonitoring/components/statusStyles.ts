import {
  CheckCircle2,
  Clock3,
  Sparkles,
  Square,
  Users,
} from "lucide-react";
import type { CurrentStage, InviteStatus } from "../data";

export const inviteClass = (s: InviteStatus) =>
  s === "Accepted"
    ? "bg-[rgba(16,185,129,0.1)] text-[#10B981]"
    : s === "Invited"
      ? "bg-[rgba(251,191,36,0.1)] text-[#FBBF24]"
      : "bg-[rgba(249,115,22,0.1)] text-[#F97316]";

export const stageClass = (s: CurrentStage) => {
  switch (s) {
    case "Completed":
    case "Submitted":
      return "bg-[rgba(16,185,129,0.1)] text-[#10B981]";
    case "In Progress":
    case "Processing":
      return "bg-[rgba(59,130,246,0.1)] text-[#3B82F6]";
    case "Reviewing":
      return "bg-[rgba(168,85,247,0.1)] text-[#A855F7]";
    default:
      return "bg-white/5 text-[#9CA3AF]";
  }
};

export const activityStageClass = (stage: string) => {
  switch (stage) {
    case "In Progress":
      return "bg-[rgba(251,191,36,0.1)] text-[#FBBF24]";
    case "Started":
    case "Invited":
      return "bg-[rgba(16,183,186,0.1)] text-[#10B7BA]";
    default:
      return "bg-white/5 text-[#9CA3AF]";
  }
};

export const activityDot = (tone: string) => {
  switch (tone) {
    case "gold":
      return "bg-[#FBBF24]";
    case "blue":
      return "bg-[#60A5FA]";
    case "gray":
      return "bg-white/40";
    default:
      return "bg-[#10B7BA]";
  }
};

export const kpiIcon = (icon: string) => {
  switch (icon) {
    case "check":
      return CheckCircle2;
    case "clock":
      return Clock3;
    case "spark":
      return Sparkles;
    case "square":
      return Square;
    default:
      return Users;
  }
};

export const kpiIconBg = (tone: string) => {
  switch (tone) {
    case "teal":
      return "bg-[rgba(16,183,186,0.1)] text-[#10B7BA]";
    case "gold":
      return "bg-[rgba(251,191,36,0.1)] text-[#FBBF24]";
    case "orange":
      return "bg-[rgba(249,115,22,0.1)] text-[#F97316]";
    default:
      return "bg-white/10 text-white";
  }
};

export const kpiBadge = (tone: string) => {
  switch (tone) {
    case "teal":
      return "bg-[rgba(16,183,186,0.1)] text-[#10B7BA]";
    case "gold":
      return "bg-[rgba(251,191,36,0.1)] text-[#FBBF24]";
    case "orange":
      return "bg-[rgba(249,115,22,0.1)] text-[#F97316]";
    default:
      return "bg-white/10 text-white";
  }
};
