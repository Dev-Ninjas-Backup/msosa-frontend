import {
  CalendarDays,
  CheckCircle2,
  FileText,
  FolderOpen,
  Hourglass,
  PieChart,
} from "lucide-react";
import type { ReportStatus } from "../data";

export const statusClass = (s: ReportStatus) =>
  s === "Approved"
    ? "bg-[rgba(16,185,129,0.15)] text-[#10B981]"
    : s === "Processing"
      ? "bg-[rgba(249,115,22,0.15)] text-[#F97316]"
      : "bg-white/10 text-[#9CA3AF]";

export const kpiIcon = (icon: string) => {
  switch (icon) {
    case "completed":
      return CheckCircle2;
    case "pending":
      return Hourglass;
    case "quarter":
    case "prev":
      return CalendarDays;
    case "org":
      return PieChart;
    case "pdf":
      return FolderOpen;
    default:
      return FileText;
  }
};
