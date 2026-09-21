import {
  Download,
  FileSpreadsheet,
  FileText,
  Printer,
  Table2,
} from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";

const OPTIONS = [
  {
    title: "PDF Report",
    desc: "Full professional report",
    action: "Download PDF",
    icon: FileText,
    iconBg: "bg-[rgba(239,68,68,0.1)] text-[#EF4444]",
  },
  {
    title: "CSV Summary",
    desc: "Key metrics data",
    action: "Download CSV",
    icon: Table2,
    iconBg: "bg-[rgba(16,183,186,0.1)] text-[#10B7BA]",
  },
  {
    title: "Excel Metrics",
    desc: "Detailed spreadsheet",
    action: "Download Excel",
    icon: FileSpreadsheet,
    iconBg: "bg-[rgba(59,130,246,0.1)] text-[#3B82F6]",
  },
  {
    title: "Print Version",
    desc: "Printer-friendly layout",
    action: "Print",
    icon: Printer,
    iconBg: "bg-white/10 text-white/70",
  },
] as const;

const DownloadOptionsCard = () => (
  <AnimatedContainer delay={0.16}>
    <Card className="p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Download className="size-3.5 text-white/50" />
        <h3 className="text-sm font-bold text-white">Download Options</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3">
        {OPTIONS.map((o) => {
          const Icon = o.icon;
          return (
            <div
              key={o.title}
              className="rounded-lg border border-white/10 bg-white/5 p-3 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`flex size-8 items-center justify-center rounded-lg shrink-0 ${o.iconBg}`}
                >
                  <Icon className="size-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white">{o.title}</p>
                  <p className="text-[10px] text-[#6B7280]">{o.desc}</p>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                className="rounded! bg-[#FBBF24]! text-black! hover:bg-[#e8b93a]! h-7! px-3! text-[10px]! shrink-0"
                onClick={() => toast.success(`${o.action} started.`)}
              >
                {o.action}
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  </AnimatedContainer>
);

export default DownloadOptionsCard;
