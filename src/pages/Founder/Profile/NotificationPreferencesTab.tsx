import { useState, type ReactNode } from "react";
import { AlertTriangle, Bell, KeyRound, Mail, Monitor, Shield, Wrench } from "lucide-react";
import { toast } from "sonner";
import Button from "@/ui/Button";
import Checkbox from "@/ui/Checkbox";
import Switch from "@/ui/Switch";

type Row = { id: string; title: string; detail: string; email: boolean; inApp: boolean; locked?: boolean; icon: typeof Shield; tone: string };

const INITIAL: { title: string; detail: string; recommended?: boolean; rows: Row[] }[] = [
  {
    title: "Platform",
    detail: "Notifications related to core platform activity and updates",
    rows: [
      { id: "product", title: "Product Updates", detail: "When new features are launched", email: true, inApp: true, icon: Shield, tone: "text-[#10b7ba]" },
      { id: "announce", title: "Platform Announcements", detail: "Important system-wide news", email: true, inApp: true, icon: Monitor, tone: "text-[#60a5fa]" },
      { id: "maint", title: "Maintenance", detail: "Scheduled downtime and system health", email: false, inApp: true, icon: Wrench, tone: "text-white/50" },
    ],
  },
  {
    title: "AI Services™",
    detail: "Real-time monitoring of AI processing and output",
    rows: [
      { id: "ai-process", title: "AI Processing", detail: "Notifications when large AI tasks complete", email: true, inApp: true, icon: Shield, tone: "text-[#10b7ba]" },
      { id: "ai-fail", title: "AI Failures", detail: "Alerts for processing errors or quality drops", email: true, inApp: true, icon: AlertTriangle, tone: "text-[#ef4444]" },
      { id: "ai-usage", title: "AI Usage Alerts", detail: "Monthly token consumption and budget alerts", email: true, inApp: false, icon: Bell, tone: "text-[#60a5fa]" },
    ],
  },
  {
    title: "Security",
    detail: "Critical account and organization security notifications",
    recommended: true,
    rows: [
      { id: "login", title: "New Login", detail: "Signin attempts from unrecognized devices", email: true, inApp: true, locked: true, icon: AlertTriangle, tone: "text-[#ef4444]" },
      { id: "password", title: "Password Changes", detail: "When your account password is modified", email: true, inApp: true, icon: KeyRound, tone: "text-[#10b7ba]" },
    ],
  },
];

const clone = () => INITIAL.map((group) => ({ ...group, rows: group.rows.map((row) => ({ ...row })) }));
const panel = "rounded-xl border border-white/10 bg-white/5 p-5";

const NotificationPreferencesTab = () => {
  const [emailOn, setEmailOn] = useState(true);
  const [inAppOn, setInAppOn] = useState(true);
  const [groups, setGroups] = useState(clone);
  const [delivery, setDelivery] = useState({ email: true, dashboard: true, push: false });
  const [savedAt, setSavedAt] = useState("Today at 10:42 AM");

  const setRow = (id: string, key: "email" | "inApp", value: boolean) => {
    setGroups((current) =>
      current.map((group) => ({
        ...group,
        rows: group.rows.map((row) => (row.id === id && !row.locked ? { ...row, [key]: value } : row)),
      })),
    );
  };

  return (
    <div className="space-y-5">
      <section>
        <h2 className="text-lg font-bold text-white">Notification Channels</h2>
        <p className="mt-1 text-xs text-white/45">Choose how you receive notifications</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Channel icon={<Mail className="size-4 text-[#fbbf24]" />} title="Email Notifications" detail="Receive notifications to liza.fernandes@Encounters.com" checked={emailOn} onChange={setEmailOn} />
          <Channel icon={<Bell className="size-4 text-[#10b7ba]" />} title="In-App Notifications" detail="Receive notifications within the platform dashboard" checked={inAppOn} onChange={setInAppOn} />
        </div>
      </section>

      {groups.map((group) => (
        <section key={group.title} className={panel}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white">{group.title}</h2>
              <p className="mt-1 text-xs text-white/45">{group.detail}</p>
            </div>
            {group.recommended ? (
              <span className="rounded bg-[#ef4444]/15 px-2 py-0.5 text-[10px] font-bold uppercase text-[#ef4444]">Recommended</span>
            ) : (
              <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.6px] text-white/35">
                <span>Email</span>
                <span>In-App</span>
              </div>
            )}
          </div>
          <div className="mt-4 divide-y divide-white/5">
            {group.rows.map((row) => (
              <div key={row.id} className="flex items-center justify-between gap-4 py-3">
                <div className="flex items-start gap-3">
                  <row.icon className={`mt-0.5 size-4 ${row.tone}`} />
                  <div>
                    <p className="text-sm text-white">
                      {row.title}
                      {row.locked && <span className="ml-2 rounded bg-[#ef4444]/20 px-1.5 py-0.5 text-[9px] font-bold uppercase text-[#ef4444]">Locked</span>}
                    </p>
                    <p className="text-[11px] text-white/40">{row.detail}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <Switch checked={row.email} disabled={!emailOn || row.locked} onCheckedChange={(value) => setRow(row.id, "email", value)} aria-label={`${row.title} email`} />
                  <Switch checked={row.inApp} disabled={!inAppOn || row.locked} onCheckedChange={(value) => setRow(row.id, "inApp", value)} aria-label={`${row.title} in-app`} />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className={panel}>
        <h2 className="text-base font-bold text-white">Delivery Methods</h2>
        <div className="mt-4 flex flex-wrap gap-8">
          <label className="flex items-center gap-2 text-sm text-white">
            <Checkbox checked={delivery.email} onCheckedChange={(email) => setDelivery({ ...delivery, email })} aria-label="Email" />
            Email
          </label>
          <label className="flex items-center gap-2 text-sm text-white">
            <Checkbox checked={delivery.dashboard} onCheckedChange={(dashboard) => setDelivery({ ...delivery, dashboard })} aria-label="In-App Dashboard" />
            In-App Dashboard
          </label>
          <label className="flex items-center gap-2 text-sm text-white/35">
            <Checkbox checked={delivery.push} disabled onCheckedChange={() => undefined} aria-label="Push Notifications" />
            <span>
              Push Notifications
              <span className="mt-0.5 block text-[11px]">Future - Coming Soon</span>
            </span>
          </label>
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-white/40">Last saved: {savedAt}</p>
        <div className="flex items-center gap-3">
          <Button variant="link" size="sm" className="text-sm text-white/60" title="Reset to Defaults" onClick={() => { setGroups(clone()); setEmailOn(true); setInAppOn(true); setDelivery({ email: true, dashboard: true, push: false }); toast.message("Preferences reset."); }} />
          <Button
            variant="primary"
            size="sm"
            className="h-10 rounded-lg bg-[#fbbf24] px-5 text-sm font-bold text-black"
            title="Save Preferences"
            onClick={() => {
              setSavedAt("Today at " + new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }));
              toast.success("Notification preferences saved.");
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Channel = ({ icon, title, detail, checked, onChange }: { icon: ReactNode; title: string; detail: string; checked: boolean; onChange: (value: boolean) => void }) => (
  <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-4">
    <div className="flex items-center gap-3">
      <span className="flex size-9 items-center justify-center rounded-lg bg-white/5">{icon}</span>
      <span>
        <span className="block text-sm font-semibold text-white">{title}</span>
        <span className="block text-[11px] text-white/40">{detail}</span>
      </span>
    </div>
    <Switch checked={checked} onCheckedChange={onChange} aria-label={title} />
  </div>
);

export default NotificationPreferencesTab;
