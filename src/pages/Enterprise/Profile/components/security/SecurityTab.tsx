import { useState } from "react";
import {
  Check,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  Shield,
} from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import Input from "@/ui/Input";
import { Label } from "@/ui/Label";
import Toggle from "../Toggle";
import { PASSWORD_REQS, PROFILE_USER } from "../../data";

const fieldLabel =
  "text-[10px] font-semibold uppercase tracking-wide text-white/45";

const SecurityTab = () => {
  const [show, setShow] = useState({ cur: false, next: false, conf: false });
  const [deviceVerify, setDeviceVerify] = useState(true);
  const [loginAlert, setLoginAlert] = useState(true);
  const [recovery, setRecovery] = useState(PROFILE_USER.recoveryEmail);

  return (
    <div className="space-y-5">
      <AnimatedContainer delay={0.04}>
        <Card
          className="p-6 sm:p-7 space-y-4"
          backgroundColor="rgba(255,255,255,0.05)"
          shadow="none"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-white">Security Overview</h3>
              <p className="text-xs text-white/45 mt-1">
                Your account security status at a glance
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-center shrink-0">
              <p className="text-[10px] text-white/45 uppercase">Security Score</p>
              <p className="text-lg font-bold text-[#FBBF24]">85/100</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: KeyRound, label: "Password Strength", value: "Strong" },
              { icon: Shield, label: "Two-Factor Auth", value: "Enabled" },
              { icon: Mail, label: "Recovery Email", value: "Set" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-[rgba(251,191,36,0.12)] text-[#FBBF24]">
                  <s.icon className="size-4" />
                </span>
                <div>
                  <p className="text-[11px] text-white/45">{s.label}</p>
                  <p className="text-sm font-semibold text-white">{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </AnimatedContainer>

      <AnimatedContainer delay={0.06}>
        <Card
          className="p-6 sm:p-7 space-y-4"
          backgroundColor="rgba(255,255,255,0.05)"
          shadow="none"
        >
          <div>
            <h3 className="text-lg font-bold text-white">Password</h3>
            <p className="text-xs text-white/45 mt-1">
              Manage your account password and strength
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white/[0.03] border border-white/10 px-4 py-2.5">
            <p className="text-[11px] text-white/50">
              <span className="uppercase tracking-wide">Current Password Status:</span>{" "}
              Last changed 30 days ago
            </p>
            <span className="rounded-full bg-[rgba(34,197,94,0.15)] px-2 py-0.5 text-[10px] font-semibold text-[#22C55E]">
              Strong
            </span>
          </div>
          <div className="space-y-1.5">
            <p className={fieldLabel}>Password Strength</p>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-[85%] rounded-full bg-[#FBBF24]" />
            </div>
            <p className="text-[11px] text-[#FBBF24]">Strong — 85%</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-5">
            <div className="space-y-3">
              {(
                [
                  ["cur", "Current Password"],
                  ["next", "New Password"],
                  ["conf", "Confirm New Password"],
                ] as const
              ).map(([key, label]) => (
                <div key={key} className="space-y-1.5">
                  <Label className={fieldLabel}>{label}</Label>
                  <div className="relative">
                    <Input
                      variant="soft"
                      type={show[key] ? "text" : "password"}
                      defaultValue="••••••••••••"
                      className="pr-9"
                    />
                    <button
                      type="button"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white cursor-pointer border-0 bg-transparent p-0"
                      onClick={() =>
                        setShow((prev) => ({ ...prev, [key]: !prev[key] }))
                      }
                    >
                      {show[key] ? (
                        <EyeOff className="size-3.5" />
                      ) : (
                        <Eye className="size-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2.5 h-fit">
              <p className="text-[10px] font-semibold uppercase text-white/45">
                Requirements
              </p>
              {PASSWORD_REQS.map((r) => (
                <p
                  key={r}
                  className="flex items-center gap-2 text-[11px] text-white/70"
                >
                  <Check className="size-3 text-[#60A5FA]" />
                  {r}
                </p>
              ))}
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="w-full rounded-lg! bg-[#FBBF24]! text-black!"
            onClick={() => toast.success("Password updated.")}
          >
            Update Password
          </Button>
        </Card>
      </AnimatedContainer>

      <AnimatedContainer delay={0.08}>
        <Card
          className="p-6 sm:p-7 space-y-4"
          backgroundColor="rgba(255,255,255,0.05)"
          shadow="none"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-white">
              Two-Factor Authentication
            </h3>
            <span className="rounded-full bg-[rgba(16,183,186,0.15)] px-2.5 py-0.5 text-[10px] font-semibold text-[#10B7BA]">
              Enabled
            </span>
          </div>
          <div className="rounded-xl border border-[rgba(16,183,186,0.25)] bg-[rgba(16,183,186,0.06)] p-4 text-sm text-white/70">
            2FA is currently enabled. Your account is protected with two-factor
            authentication. You&apos;ll need your authenticator app to sign in.
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Authenticator App</p>
                <span className="text-[10px] font-semibold text-[#10B7BA]">
                  Configured
                </span>
              </div>
              <p className="text-[11px] text-white/45">
                Google Authenticator / Authy
              </p>
              <Button
                variant="soft"
                size="sm"
                className="rounded-lg!"
                onClick={() => toast.message("Reconfigure 2FA…")}
              >
                Reconfigure
              </Button>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
              <p className="text-sm font-medium text-white">Backup Recovery Codes</p>
              <p className="text-[11px] text-white/45">10 codes remaining</p>
              <div className="flex gap-2">
                <Button
                  variant="soft"
                  size="sm"
                  className="rounded-lg!"
                  onClick={() => toast.message("Showing codes…")}
                >
                  View Codes
                </Button>
                <Button
                  variant="soft"
                  size="sm"
                  className="rounded-lg!"
                  onClick={() => toast.success("Codes regenerated.")}
                >
                  Regenerate
                </Button>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="text-xs text-[#F87171] hover:underline cursor-pointer border-0 bg-transparent p-0"
            onClick={() => toast.error("Disabling 2FA reduces security.")}
          >
            Disable 2FA — Disabling two-factor authentication will reduce your
            account security.
          </button>
        </Card>
      </AnimatedContainer>

      <AnimatedContainer delay={0.1}>
        <Card
          className="p-6 sm:p-7 space-y-4"
          backgroundColor="rgba(255,255,255,0.05)"
          shadow="none"
        >
          <div>
            <h3 className="text-lg font-bold text-white">Recovery Email</h3>
            <p className="text-xs text-white/45 mt-1">
              Used to recover your account if you lose access
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              variant="soft"
              value={PROFILE_USER.recoveryEmail}
              readOnly
              className="flex-1 min-w-[200px]"
            />
            <span className="rounded-full bg-[rgba(34,197,94,0.15)] px-2 py-0.5 text-[10px] font-semibold text-[#22C55E]">
              Verified
            </span>
          </div>
          <div className="flex gap-2">
            <Input
              variant="soft"
              placeholder="Enter new recovery email address"
              value={recovery}
              onChange={(e) => setRecovery(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="primary"
              size="sm"
              className="rounded-lg! bg-[#FBBF24]! text-black! shrink-0"
              onClick={() => toast.success("Recovery email updated.")}
            >
              Update
            </Button>
          </div>
        </Card>
      </AnimatedContainer>

      <AnimatedContainer delay={0.12}>
        <Card
          className="p-6 sm:p-7 space-y-4"
          backgroundColor="rgba(255,255,255,0.05)"
          shadow="none"
        >
          <div>
            <h3 className="text-lg font-bold text-white">Login Verification</h3>
            <p className="text-xs text-white/45 mt-1">
              Control additional verification steps when signing in
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <div>
                <p className="text-sm text-white">
                  Require email verification on new device login
                </p>
                <p className="text-[11px] text-white/45 mt-0.5">
                  Send a one-time code when signing in from a new device
                </p>
              </div>
              <Toggle checked={deviceVerify} onChange={setDeviceVerify} />
            </div>
            <div className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <div>
                <p className="text-sm text-white">
                  Send security alert on unrecognized login
                </p>
                <p className="text-[11px] text-white/45 mt-0.5">
                  Notify you when a login occurs from an unusual location
                </p>
              </div>
              <Toggle checked={loginAlert} onChange={setLoginAlert} />
            </div>
          </div>
          <p className="text-xs text-white/40">Last updated: Today at 10:42 AM</p>
        </Card>
      </AnimatedContainer>
    </div>
  );
};

export default SecurityTab;
