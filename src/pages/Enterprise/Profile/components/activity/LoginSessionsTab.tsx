import { Monitor, Smartphone } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import { LOGIN_SESSIONS } from "../../data";

const LoginSessionsTab = () => (
  <AnimatedContainer delay={0.04}>
    <Card
      className="p-6 sm:p-7 space-y-5"
      backgroundColor="rgba(255,255,255,0.05)"
      shadow="none"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white">Login Sessions</h3>
          <p className="text-xs text-white/45 mt-1">
            Devices and browsers currently signed in to your account
          </p>
        </div>
        <Button
          variant="soft"
          size="sm"
          className="rounded-lg! text-[#F87171]! shrink-0"
          onClick={() => toast.success("Other sessions signed out.")}
        >
          Sign Out All Other Sessions
        </Button>
      </div>

      <div className="space-y-3">
        {LOGIN_SESSIONS.map((s) => (
          <div
            key={s.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
          >
            <div className="flex items-start gap-3 min-w-0">
              <span className="flex size-9 items-center justify-center rounded-lg bg-white/5 text-white/50 shrink-0">
                {s.device.includes("iPhone") ? (
                  <Smartphone className="size-4" />
                ) : (
                  <Monitor className="size-4" />
                )}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white flex items-center gap-2 flex-wrap">
                  {s.device}
                  {s.current ? (
                    <span className="rounded-full bg-[rgba(16,183,186,0.15)] px-2 py-0.5 text-[10px] font-semibold text-[#10B7BA]">
                      Current
                    </span>
                  ) : null}
                </p>
                <p className="text-[11px] text-white/45 mt-0.5">
                  {s.location} · {s.ip}
                </p>
                <p className="text-[11px] text-white/35 mt-0.5">{s.lastActive}</p>
              </div>
            </div>
            {!s.current ? (
              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg! text-[#F87171]! shrink-0 self-start"
                onClick={() => toast.success(`Signed out: ${s.device}`)}
              >
                Sign Out
              </Button>
            ) : null}
          </div>
        ))}
      </div>
    </Card>
  </AnimatedContainer>
);

export default LoginSessionsTab;
