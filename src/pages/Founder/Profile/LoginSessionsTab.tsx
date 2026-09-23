import { useState } from "react";
import { Check, Info, Monitor, Shield, Smartphone } from "lucide-react";
import { toast } from "sonner";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Switch from "@/ui/Switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import ConfirmModal from "@/components/reuseable/ConfirmModal";
import { cn } from "@/lib/utils";

type Device = { id: string; name: string; detail: string; current?: boolean; lastActive?: string; trusted: boolean };
type History = { id: string; when: string; note: string; os: string; browser: string; ip: string; location: string; status: "Active" | "Blocked" | "Finished" };

const HISTORY: History[] = [
  { id: "h1", when: "Today, 10:42 AM", note: "Session Start", os: "macOS (14.2)", browser: "Chrome 121.0", ip: "192.168.1.1", location: "San Francisco, US", status: "Active" },
  { id: "h2", when: "Oct 24, 03:15 AM", note: "Unknown Device", os: "Windows 11", browser: "Edge 119.0", ip: "45.128.x.x", location: "Moscow, RU", status: "Blocked" },
  { id: "h3", when: "Oct 23, 09:20 PM", note: "Mobile Access", os: "iOS (17.0)", browser: "Mobile Safari", ip: "72.14.x.x", location: "London, UK", status: "Finished" },
];

const statusTone = {
  Active: "text-[#10b7ba]",
  Blocked: "text-[#ef4444]",
  Finished: "text-white/40",
};

const LoginSessionsTab = () => {
  const [devices, setDevices] = useState<Device[]>([
    { id: "mac", name: 'MacBook Pro 16"', detail: "Chrome on macOS • San Francisco, US", current: true, trusted: true },
    { id: "phone", name: "iPhone 15 Pro", detail: "Safari on iOS • London, UK", lastActive: "Last active: 2 hours ago", trusted: true },
  ]);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [signOutId, setSignOutId] = useState<string | "others" | null>(null);
  const [suspiciousOnly, setSuspiciousOnly] = useState(false);

  const rows = suspiciousOnly ? HISTORY.filter((row) => row.status === "Blocked") : HISTORY;
  const target = devices.find((device) => device.id === signOutId);

  const commitRename = (id: string) => {
    const name = draft.trim();
    if (name) setDevices((current) => current.map((device) => (device.id === id ? { ...device, name } : device)));
    setRenaming(null);
  };

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-white/10 bg-white/5 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Connected Devices</h2>
            <p className="mt-1 text-xs text-white/45">Manage trusted devices that have access to your account</p>
          </div>
          <Button variant="secondary" size="sm" className="h-9 rounded-lg border-white/10 bg-white/5 text-xs text-white" title="Sign Out All Other Devices" onClick={() => setSignOutId("others")} />
        </div>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {devices.map((device) => (
            <article key={device.id} className={cn("rounded-xl border bg-black/30 p-4", device.current ? "border-[#fbbf24]/40" : "border-white/10")}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {device.current ? <Shield className="mt-1 size-4 text-[#fbbf24]" /> : <Check className="mt-1 size-4 text-[#10b7ba]" />}
                  <div>
                    {renaming === device.id ? (
                      <Input
                        variant="soft"
                        value={draft}
                        autoFocus
                        onChange={(event) => setDraft(event.target.value)}
                        onBlur={() => commitRename(device.id)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") commitRename(device.id);
                        }}
                        className="h-8 border-white/10 bg-black text-sm text-white"
                      />
                    ) : (
                      <p className="text-sm font-semibold text-white">
                        {device.name}
                        {device.current && <span className="ml-2 rounded bg-[#fbbf24]/20 px-1.5 py-0.5 text-[9px] font-bold uppercase text-[#fbbf24]">Current</span>}
                      </p>
                    )}
                    <p className="text-xs text-white/45">{device.detail}</p>
                    {device.lastActive && <p className="text-[11px] text-white/35">{device.lastActive}</p>}
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <button type="button" aria-label={`${device.name} details`} className="cursor-pointer border-0 bg-transparent p-1 text-white/40">
                      <Info className="size-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-56 rounded-xl border-white/10 bg-[#111] p-3 text-xs text-white/70">
                    {device.current ? <Monitor className="mb-2 size-4 text-[#fbbf24]" /> : <Smartphone className="mb-2 size-4 text-[#10b7ba]" />}
                    {device.trusted ? "This device is trusted for sign-in." : "This device is not trusted."}
                  </PopoverContent>
                </Popover>
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs">
                <button type="button" className="cursor-pointer border-0 bg-transparent p-0 text-white/70" onClick={() => { setRenaming(device.id); setDraft(device.name); }}>Rename</button>
                <span className="text-white/20">•</span>
                {device.current ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button type="button" className="cursor-pointer border-0 bg-transparent p-0 text-white/70">Trust Settings</button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="flex w-52 items-center justify-between rounded-xl border-white/10 bg-[#111] p-3">
                      <span className="text-xs text-white">Trust this device</span>
                      <Switch checked={device.trusted} onCheckedChange={(trusted) => setDevices((current) => current.map((item) => (item.id === device.id ? { ...item, trusted } : item)))} aria-label="Trust this device" />
                    </PopoverContent>
                  </Popover>
                ) : (
                  <button type="button" className="cursor-pointer border-0 bg-transparent p-0 text-[#ef4444]" onClick={() => setSignOutId(device.id)}>Sign Out Device</button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-white/10 bg-white/5 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Login History</h2>
            <p className="mt-1 text-xs text-white/45">Review recent access attempts and session status</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="h-9 rounded-lg border-[#ef4444]/30 bg-[#ef4444]/10 text-xs text-[#ef4444]"
            title={suspiciousOnly ? "Show All Attempts" : "Review 2 Suspicious Attempts"}
            onClick={() => setSuspiciousOnly((value) => !value)}
          />
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="text-[10px] font-bold uppercase tracking-[0.6px] text-white/35">
                <th className="pb-3 font-bold">Date & Time</th>
                <th className="pb-3 font-bold">Device / OS</th>
                <th className="pb-3 font-bold">Browser</th>
                <th className="pb-3 font-bold">IP Address</th>
                <th className="pb-3 font-bold">Location</th>
                <th className="pb-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className={cn("border-t border-white/5", row.status === "Blocked" && "bg-[#ef4444]/10")}>
                  <td className="py-3">
                    <p className="text-white">{row.when}</p>
                    <p className={cn("text-[11px]", row.status === "Blocked" ? "text-[#ef4444]" : "text-white/35")}>{row.note}</p>
                  </td>
                  <td className="text-white/70">{row.os}</td>
                  <td className="text-white/70">{row.browser}</td>
                  <td className={row.status === "Blocked" ? "text-[#ef4444]" : "text-white/70"}>{row.ip}</td>
                  <td className="text-white/70">{row.location}</td>
                  <td className={cn("text-[11px] font-bold uppercase", statusTone[row.status])}>{row.status}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-sm text-white/40">No attempts match this review.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <ConfirmModal
        isOpen={signOutId !== null}
        onClose={() => setSignOutId(null)}
        onConfirm={() => {
          setDevices((current) => current.filter((device) => (signOutId === "others" ? device.current : device.id !== signOutId)));
          setSignOutId(null);
          toast.success(signOutId === "others" ? "Signed out of other devices." : "Device signed out.");
        }}
        variant="danger"
        title={signOutId === "others" ? "Sign out other devices?" : `Sign out ${target?.name ?? "device"}?`}
        description="Those sessions will need to sign in again."
        confirmText="Sign Out"
        cancelText="Cancel"
      />
    </div>
  );
};

export default LoginSessionsTab;
