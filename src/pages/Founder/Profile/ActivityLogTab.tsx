import { useState } from "react";
import { Filter } from "lucide-react";
import Button from "@/ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import { cn } from "@/lib/utils";

type Kind = "Login" | "Profile" | "Security" | "Device" | "Notifications";
type Event = { id: string; title: string; detail: string; meta?: string; time: string; tone: string; kind: Kind; alert?: boolean };

const TODAY: Event[] = [
  { id: "t1", title: "Login Successful", detail: "New session started via Chrome on macOS", meta: "IP: 192.168.1.1 • San Francisco, US", time: "10:42 AM", tone: "bg-[#10b7ba]", kind: "Login" },
  { id: "t2", title: "Profile Updated", detail: "Avatar image and biography were modified", time: "08:15 AM", tone: "bg-[#fbbf24]", kind: "Profile" },
];

const YESTERDAY: Event[] = [
  { id: "y1", title: "Login Failed", detail: "Invalid password attempt from unknown device", meta: "Suspicious location: Moscow, RU", time: "03:15 AM", tone: "bg-[#ef4444]", kind: "Login", alert: true },
  { id: "y2", title: "Notification Preferences Updated", detail: "Email alerts for 'New Device Login' enabled", time: "Oct 24, 08:30 PM", tone: "bg-white/30", kind: "Notifications" },
  { id: "y3", title: "MFA Enabled", detail: "Authenticator App (TOTP) successfully configured", time: "Oct 24, 06:12 PM", tone: "bg-white/30", kind: "Security" },
  { id: "y4", title: "Device Removed", detail: "iPad Air (Office) was revoked from trusted devices", time: "Oct 24, 11:05 AM", tone: "bg-white/30", kind: "Device" },
  { id: "y5", title: "Password Changed", detail: "Security credentials updated via verified session", time: "Oct 24, 09:40 AM", tone: "bg-[#10b7ba]", kind: "Security" },
];

const OLDER: Event[] = [
  { id: "o1", title: "Login Successful", detail: "New session started via Safari on iOS", meta: "IP: 72.14.x.x • London, UK", time: "Oct 23, 09:20 PM", tone: "bg-[#10b7ba]", kind: "Login" },
  { id: "o2", title: "Profile Updated", detail: "Display name saved", time: "Oct 22, 02:10 PM", tone: "bg-[#fbbf24]", kind: "Profile" },
];

const FILTERS = ["All", "Login", "Profile", "Security", "Device", "Notifications"] as const;

const ActivityLogTab = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [open, setOpen] = useState(false);
  const [older, setOlder] = useState(false);

  const match = (event: Event) => filter === "All" || event.kind === filter;
  const today = TODAY.filter(match);
  const yesterday = YESTERDAY.filter(match);
  const olderRows = older ? OLDER.filter(match) : [];

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">Activity Log</h2>
          <p className="mt-1 text-sm text-white/45">Review all security and account-level events performed on your account.</p>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="secondary" size="sm" className="h-9 rounded-lg border-white/10 bg-white/5 text-xs text-white" leftIcon={<Filter className="size-3.5" />} title="Filter Events" />
          </PopoverTrigger>
          <PopoverContent align="end" className="w-44 rounded-xl border-white/10 bg-[#111] p-1">
            {FILTERS.map((option) => (
              <button
                key={option}
                type="button"
                className="block w-full cursor-pointer rounded-lg border-0 bg-transparent px-3 py-2 text-left text-sm text-white hover:bg-white/5"
                onClick={() => {
                  setFilter(option);
                  setOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      <Group label="Today" events={today} />
      <Group label="Yesterday" events={yesterday} />
      {older && <Group label="Earlier" events={olderRows} />}

      <div className="mt-8 flex items-center justify-between text-xs text-white/40">
        <p>Viewing the last 50 activities</p>
        {!older && (
          <button type="button" className="cursor-pointer border-0 bg-transparent p-0 text-white/70" onClick={() => setOlder(true)}>
            Older Activities
          </button>
        )}
      </div>
    </div>
  );
};

const Group = ({ label, events }: { label: string; events: Event[] }) => {
  if (events.length === 0) return null;
  return (
    <section className="mt-6">
      <p className="text-[10px] font-bold uppercase tracking-[1px] text-white/35">{label}</p>
      <div className="mt-3 space-y-4">
        {events.map((event) => (
          <article key={event.id} className={cn("flex items-start justify-between gap-4", event.alert && "rounded-lg bg-[#ef4444]/10 px-3 py-3")}>
            <div className="flex gap-3">
              <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", event.tone)} />
              <div>
                <p className="text-sm font-semibold text-white">{event.title}</p>
                <p className="text-xs text-white/45">{event.detail}</p>
                {event.meta && <p className={cn("mt-1 text-[11px]", event.alert ? "text-[#ef4444]" : "text-white/35")}>{event.meta}</p>}
              </div>
            </div>
            <p className="shrink-0 text-[11px] text-white/35">{event.time}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ActivityLogTab;
