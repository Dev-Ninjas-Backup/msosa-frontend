import { useState } from "react";
import { Bell, Mail } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import Toggle from "../Toggle";
import { NOTIF_CATEGORIES, PROFILE_USER } from "../../data";

type RowState = Record<string, { email: boolean; inApp: boolean }>;

const buildInitial = (): RowState => {
  const state: RowState = {};
  NOTIF_CATEGORIES.forEach((cat) => {
    cat.items.forEach((item) => {
      state[item.name] = { email: item.email, inApp: item.inApp };
    });
  });
  return state;
};

const NotificationPreferencesTab = () => {
  const [emailOn, setEmailOn] = useState(true);
  const [inAppOn, setInAppOn] = useState(true);
  const [rows, setRows] = useState<RowState>(buildInitial);

  const setRow = (
    name: string,
    key: "email" | "inApp",
    value: boolean,
    locked?: boolean
  ) => {
    if (locked) return;
    setRows((prev) => ({
      ...prev,
      [name]: { ...prev[name], [key]: value },
    }));
  };

  return (
    <div className="space-y-5">
      <AnimatedContainer delay={0.04}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card
            className="p-5 flex items-center justify-between gap-3 border border-[rgba(251,191,36,0.25)]!"
            backgroundColor="rgba(255,255,255,0.05)"
            shadow="none"
            borderColor="rgba(251,191,36,0.25)"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[rgba(251,191,36,0.12)] text-[#FBBF24]">
                <Mail className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">
                  Email Notifications
                </p>
                <p className="text-[11px] text-white/45 truncate">
                  Receive notifications to {PROFILE_USER.email}
                </p>
              </div>
            </div>
            <Toggle checked={emailOn} onChange={setEmailOn} />
          </Card>
          <Card
            className="p-5 flex items-center justify-between gap-3 border border-[rgba(251,191,36,0.25)]!"
            backgroundColor="rgba(255,255,255,0.05)"
            shadow="none"
            borderColor="rgba(251,191,36,0.25)"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[rgba(251,191,36,0.12)] text-[#FBBF24]">
                <Bell className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">
                  In-App Notifications
                </p>
                <p className="text-[11px] text-white/45">
                  Receive notifications within the platform
                </p>
              </div>
            </div>
            <Toggle checked={inAppOn} onChange={setInAppOn} />
          </Card>
        </div>
      </AnimatedContainer>

      {NOTIF_CATEGORIES.map((cat, i) => (
        <AnimatedContainer key={cat.title} delay={0.06 + i * 0.02}>
          <Card
            className="p-6 sm:p-7 space-y-4"
            backgroundColor="rgba(255,255,255,0.05)"
            shadow="none"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                {"recommended" in cat && cat.recommended ? (
                  <span className="rounded-full bg-[rgba(239,68,68,0.15)] px-2 py-0.5 text-[10px] font-semibold text-[#F87171]">
                    Recommended
                  </span>
                ) : null}
              </div>
              {"enableAll" in cat && cat.enableAll ? (
                <button
                  type="button"
                  className="text-xs text-[#FBBF24] hover:underline cursor-pointer border-0 bg-transparent p-0"
                  onClick={() => {
                    setRows((prev) => {
                      const next = { ...prev };
                      cat.items.forEach((item) => {
                        if (!("locked" in item && item.locked)) {
                          next[item.name] = { email: true, inApp: true };
                        }
                      });
                      return next;
                    });
                  }}
                >
                  Enable All
                </button>
              ) : null}
            </div>

            <div className="space-y-2">
              <div className="hidden sm:grid grid-cols-[1fr_70px_70px] gap-2 text-[10px] uppercase tracking-wide text-white/40 px-1">
                <span>Type</span>
                <span className="text-center">Email</span>
                <span className="text-center">In-App</span>
              </div>
              {cat.items.map((item) => {
                const locked = "locked" in item && item.locked;
                const state = rows[item.name];
                return (
                  <div
                    key={item.name}
                    className="grid grid-cols-1 sm:grid-cols-[1fr_70px_70px] gap-2 items-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                  >
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-white">{item.name}</p>
                      {locked ? (
                        <span className="rounded bg-[rgba(239,68,68,0.15)] px-1.5 py-0.5 text-[9px] font-semibold text-[#F87171]">
                          Locked
                        </span>
                      ) : null}
                    </div>
                    <div className="flex sm:justify-center items-center gap-2">
                      <span className="sm:hidden text-[10px] text-white/40">
                        Email
                      </span>
                      <Toggle
                        checked={state?.email ?? false}
                        disabled={locked}
                        onChange={(v) => setRow(item.name, "email", v, locked)}
                      />
                    </div>
                    <div className="flex sm:justify-center items-center gap-2">
                      <span className="sm:hidden text-[10px] text-white/40">
                        In-App
                      </span>
                      <Toggle
                        checked={state?.inApp ?? false}
                        disabled={locked}
                        onChange={(v) => setRow(item.name, "inApp", v, locked)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </AnimatedContainer>
      ))}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-xs text-white/40">Last saved: Today at 10:42 AM</p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-xs text-white/50 hover:text-white cursor-pointer border-0 bg-transparent p-0"
            onClick={() => {
              setRows(buildInitial());
              toast.message("Reset to defaults.");
            }}
          >
            Reset to Defaults
          </button>
          <Button
            variant="primary"
            size="sm"
            className="rounded-lg! bg-[#FBBF24]! text-black!"
            onClick={() => toast.success("Preferences saved.")}
          >
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferencesTab;
