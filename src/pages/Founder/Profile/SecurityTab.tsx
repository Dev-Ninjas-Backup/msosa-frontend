import { useMemo, useState, type ReactNode } from "react";
import { AlertTriangle, Check, Eye, EyeOff, KeyRound, Shield } from "lucide-react";
import { toast } from "sonner";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { Label } from "@/ui/Label";
import Switch from "@/ui/Switch";
import ConfirmModal from "@/components/reuseable/ConfirmModal";

const REQS = [
  { label: "Minimum 8 characters", test: (value: string) => value.length >= 8 },
  { label: "Uppercase letter", test: (value: string) => /[A-Z]/.test(value) },
  { label: "Lowercase letter", test: (value: string) => /[a-z]/.test(value) },
  { label: "Number", test: (value: string) => /\d/.test(value) },
  { label: "Special character", test: (value: string) => /[^A-Za-z0-9]/.test(value) },
];

const SEED = "FarSystem1!";
const panel = "rounded-xl border border-white/10 bg-white/5 p-6";
const fieldLabel = "text-[10px] font-bold uppercase tracking-[0.6px] text-white/45";

const makeCodes = () =>
  Array.from({ length: 10 }, () => Math.random().toString(36).slice(2, 6).toUpperCase() + "-" + Math.random().toString(36).slice(2, 6).toUpperCase());

const SecurityTab = () => {
  const [show, setShow] = useState({ current: false, next: false, confirm: false });
  const [current, setCurrent] = useState(SEED);
  const [next, setNext] = useState(SEED);
  const [confirm, setConfirm] = useState(SEED);
  const [twoFactor, setTwoFactor] = useState(true);
  const [disableOpen, setDisableOpen] = useState(false);
  const [codes, setCodes] = useState(makeCodes);
  const [showCodes, setShowCodes] = useState(false);
  const [deviceVerify, setDeviceVerify] = useState(true);
  const [loginAlert, setLoginAlert] = useState(true);

  const checks = useMemo(() => REQS.map((rule) => ({ ...rule, met: rule.test(next) })), [next]);
  const strength = Math.round((checks.filter((rule) => rule.met).length / REQS.length) * 100);

  const updatePassword = () => {
    if (!current || !checks.every((rule) => rule.met)) {
      toast.error("Enter the current password and a new password that meets every requirement.");
      return;
    }
    if (next !== confirm) {
      toast.error("New password and confirmation do not match.");
      return;
    }
    setCurrent(next);
    toast.success("Password updated.");
  };

  return (
    <div className="space-y-5">
      <section className={panel}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Security Overview</h2>
            <p className="mt-1 text-xs text-white/45">Your account security status at a glance</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-right">
            <p className="text-[10px] uppercase text-white/45">Security Score</p>
            <p className="text-lg font-bold text-white">85<span className="text-xs font-normal text-white/40">/100</span></p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Status icon={<KeyRound className="size-4 text-[#10b7ba]" />} label="Password Strength" value="Strong" />
          <Status icon={<Shield className="size-4 text-[#10b7ba]" />} label="Two-Factor Auth" value={twoFactor ? "Enabled" : "Off"} />
        </div>
      </section>

      <section className={panel}>
        <h2 className="text-lg font-bold text-white">Password</h2>
        <p className="mt-1 text-xs text-white/45">Manage your account password and strength</p>
        <div className="mt-4 flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-4 py-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.6px] text-white/40">Current Password Status</p>
            <p className="text-xs text-white/70">Last changed 30 days ago</p>
          </div>
          <span className="text-xs font-semibold text-[#10b7ba]">Strong</span>
        </div>
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-[11px]">
            <span className="font-bold uppercase tracking-[0.6px] text-white/40">Password Strength</span>
            <span className="text-[#10b7ba]">Strong — {strength}%</span>
          </div>
          <div className="h-1 rounded-full bg-white/10">
            <div className="h-full rounded-full bg-white" style={{ width: `${strength}%` }} />
          </div>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_600px]">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">Change Password</p>
            <Secret label="Current Password" value={current} shown={show.current} onChange={setCurrent} onToggle={() => setShow((prev) => ({ ...prev, current: !prev.current }))} />
            <Secret label="New Password" value={next} shown={show.next} onChange={setNext} onToggle={() => setShow((prev) => ({ ...prev, next: !prev.next }))} />
            <Secret label="Confirm New Password" value={confirm} shown={show.confirm} onChange={setConfirm} onToggle={() => setShow((prev) => ({ ...prev, confirm: !prev.confirm }))} matched={confirm.length > 0 && confirm === next} />
            <Button variant="primary" size="sm" className="mt-2 h-11 w-full rounded-lg bg-[#fbbf24] text-sm font-bold text-black" title="Update Password" onClick={updatePassword} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.6px] text-white/40">Password Requirements</p>
            <ul className="mt-3 space-y-2">
              {checks.map((rule) => (
                <li key={rule.label} className="flex items-center gap-2 text-xs text-white/70">
                  <Check className={rule.met ? "size-3.5 text-[#10b7ba]" : "size-3.5 text-white/25"} />
                  {rule.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={panel}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white">Two-Factor Authentication</h2>
            <p className="mt-1 text-xs text-white/45">Add an extra layer of security to your account</p>
          </div>
          <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${twoFactor ? "bg-[#10b7ba]/15 text-[#10b7ba]" : "bg-white/10 text-white/50"}`}>
            {twoFactor ? "Enabled" : "Off"}
          </span>
        </div>
        {twoFactor && (
          <div className="mt-4 flex gap-3 rounded-xl border border-white/10 bg-black/30 p-4">
            <Shield className="mt-0.5 size-4 shrink-0 text-[#10b7ba]" />
            <div>
              <p className="text-sm font-semibold text-white">2FA is currently enabled</p>
              <p className="text-xs text-white/50">Your account is protected with two-factor authentication. You&apos;ll need your authenticator app to sign in.</p>
            </div>
          </div>
        )}
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Authenticator App</p>
                <p className="text-[11px] text-white/40">Google Authenticator / Authy</p>
              </div>
              <span className="rounded-full bg-[#10b7ba]/15 px-2 py-0.5 text-[10px] font-semibold text-[#10b7ba]">Configured</span>
            </div>
            <p className="mt-3 text-xs text-white/45">Time-based one-time passwords generated by your authenticator app.</p>
            <Button variant="secondary" size="sm" className="mt-3 h-9 w-full rounded-lg border-white/10 bg-white/5 text-xs text-white" title="Reconfigure" onClick={() => toast.message("Scan a new authenticator code to finish reconfiguration.")} />
          </div>
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <p className="text-sm font-semibold text-white">Backup Recovery Codes</p>
            <p className="text-[11px] text-[#fbbf24]">{codes.length} codes remaining</p>
            <p className="mt-3 text-xs text-white/45">Use these single-use codes to access your account if you lose your authenticator device.</p>
            {showCodes && (
              <ul className="mt-3 grid grid-cols-2 gap-1 text-xs text-white/70">
                {codes.map((code) => <li key={code}>{code}</li>)}
              </ul>
            )}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button variant="secondary" size="sm" className="h-9 rounded-lg border-[#fbbf24]/40 bg-transparent text-xs font-semibold text-[#fbbf24]" title="View Codes" onClick={() => setShowCodes((value) => !value)} />
              <Button
                variant="secondary"
                size="sm"
                className="h-9 rounded-lg border-white/10 bg-white/5 text-xs text-white"
                title="Regenerate"
                onClick={() => {
                  setCodes(makeCodes());
                  setShowCodes(true);
                  toast.success("Recovery codes regenerated.");
                }}
              />
            </div>
          </div>
        </div>
        {twoFactor && (
          <button type="button" className="mt-4 inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-xs text-[#ef4444]" onClick={() => setDisableOpen(true)}>
            <AlertTriangle className="size-3.5" />
            Disable 2FA
            <span className="text-white/45">— Disabling two-factor authentication will reduce your account security.</span>
          </button>
        )}
      </section>

      <section className={panel}>
        <h2 className="text-lg font-bold text-white">Login Verification</h2>
        <p className="mt-1 text-xs text-white/45">Control additional verification steps when signing in</p>
        <div className="mt-4 space-y-3">
          <Toggle title="Require email verification on new device login" detail="You'll receive a confirmation email when signing in from an unrecognized device." checked={deviceVerify} onChange={setDeviceVerify} />
          <Toggle title="Send security alert on unrecognized login" detail="Receive an immediate email alert if someone signs in from an unknown location or device." checked={loginAlert} onChange={setLoginAlert} alert />
        </div>
        <p className="mt-4 text-[11px] text-white/35">Last updated: Today at 10:42 AM</p>
      </section>

      <ConfirmModal
        isOpen={disableOpen}
        onClose={() => setDisableOpen(false)}
        onConfirm={() => {
          setTwoFactor(false);
          setDisableOpen(false);
          toast.message("Two-factor authentication disabled.");
        }}
        variant="danger"
        title="Disable 2FA?"
        description="Disabling two-factor authentication will reduce your account security."
        confirmText="Disable 2FA"
        cancelText="Keep Enabled"
      />
    </div>
  );
};

const Status = ({ icon, label, value }: { icon: ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
    {icon}
    <div>
      <p className="text-[11px] text-white/45">{label}</p>
      <p className="text-sm font-semibold text-[#10b7ba]">{value}</p>
    </div>
  </div>
);

const Secret = ({ label, value, shown, onChange, onToggle, matched }: { label: string; value: string; shown: boolean; onChange: (value: string) => void; onToggle: () => void; matched?: boolean }) => (
  <div className="space-y-1.5">
    <Label className={fieldLabel}>{label}</Label>
    <Input
      variant="soft"
      type={shown ? "text" : "password"}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      rightIcon={
        <button type="button" className="cursor-pointer border-0 bg-transparent p-0 text-white/50" onClick={onToggle} aria-label={shown ? "Hide password" : "Show password"}>
          {matched ? <Check className="size-4 text-[#10b7ba]" /> : shown ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
        </button>
      }
      className={`bg-black/40 text-white ${matched ? "border-[#10b7ba]" : "border-white/10"}`}
    />
  </div>
);

const Toggle = ({ title, detail, checked, onChange, alert }: { title: string; detail: string; checked: boolean; onChange: (value: boolean) => void; alert?: boolean }) => (
  <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
    <div className="flex items-start gap-3">
      {alert ? <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[#ef4444]" /> : <Shield className="mt-0.5 size-4 shrink-0 text-[#fbbf24]" />}
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-white/45">{detail}</p>
      </div>
    </div>
    <Switch checked={checked} onCheckedChange={onChange} aria-label={title} />
  </div>
);

export default SecurityTab;
