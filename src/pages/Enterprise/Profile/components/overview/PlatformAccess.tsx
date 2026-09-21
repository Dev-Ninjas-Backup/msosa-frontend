import {
  BookOpen,
  CreditCard,
  FileSpreadsheet,
  Mail,
  Settings,
  Users,
  Crown,
} from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { PERMISSIONS } from "../../data";

const iconMap = {
  users: Users,
  book: BookOpen,
  chart: FileSpreadsheet,
  mail: Mail,
  card: CreditCard,
  settings: Settings,
} as const;

const PlatformAccess = () => (
  <AnimatedContainer delay={0.1}>
    <Card
      className="p-6 sm:p-7 space-y-5"
      backgroundColor="rgba(255,255,255,0.05)"
      shadow="none"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white">
            Platform Access & Permissions
          </h3>
          <p className="text-xs text-white/45 mt-1">
            Your current role and access level within FAR Systems™
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(251,191,36,0.12)] border border-[rgba(251,191,36,0.3)] px-2.5 py-1 text-[11px] font-semibold text-[#FBBF24] shrink-0">
          <Crown className="size-3" />
          Administrator
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PERMISSIONS.map((p) => {
          const Icon = iconMap[p.icon];
          return (
            <div
              key={p.name}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-white/5 text-white/50">
                <Icon className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-white">{p.name}</p>
                <p className="text-[11px] text-[#10B7BA]">{p.access}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  </AnimatedContainer>
);

export default PlatformAccess;
