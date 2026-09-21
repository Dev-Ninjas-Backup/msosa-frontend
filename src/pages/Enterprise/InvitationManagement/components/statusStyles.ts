import {
  AlertCircle,
  FileCheck2,
  Minus,
  PieChart,
  Send,
  TrendingUp,
  Users,
} from "lucide-react";
import type { InvitationRow } from "../data";

export const inviteClass = (s: InvitationRow["inviteStatus"]) =>
  s === "Accepted"
    ? "bg-[rgba(16,183,186,0.1)] text-[#10B7BA]"
    : s === "Invited"
      ? "bg-[rgba(251,191,36,0.15)] text-[#FBBF24]"
      : s === "Suspended" || s === "Cancelled"
        ? "bg-red-500/10 text-[#EF4444]"
        : "bg-white/5 text-[#9CA3AF]";

export const completionClass = (s: InvitationRow["assessmentStatus"]) =>
  s === "Completed"
    ? "bg-[rgba(16,183,186,0.1)] text-[#10B7BA]"
    : s === "In Progress"
      ? "text-[#10B7BA]"
      : s === "Started"
        ? "bg-[rgba(251,191,36,0.15)] text-[#FBBF24]"
        : s === "Suspended"
          ? "bg-red-500/10 text-[#EF4444]"
          : "bg-white/5 text-[#9CA3AF]";

export const kpiIcon = (icon: string) => {
  switch (icon) {
    case "sent":
      return Send;
    case "accepted":
      return Users;
    case "started":
      return PieChart;
    case "completed":
      return FileCheck2;
    case "pending":
      return AlertCircle;
    case "cancelled":
      return Minus;
    case "rate":
      return TrendingUp;
    default:
      return Users;
  }
};

export const toneDot = (tone: string) => {
  switch (tone) {
    case "gold":
      return "bg-[#FBBF24]";
    case "blue":
      return "bg-[#60A5FA]";
    case "orange":
      return "bg-[#F97316]";
    case "gray":
      return "bg-white/40";
    default:
      return "bg-[#10B7BA]";
  }
};
