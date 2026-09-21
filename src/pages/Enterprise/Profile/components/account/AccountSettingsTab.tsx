import { useState } from "react";
import { Copy, Info, Trash2 } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import Input from "@/ui/Input";
import { Label } from "@/ui/Label";
import Toggle from "../Toggle";
import {
  ACCOUNT_TOGGLES,
  PROFILE_USER,
  THEME_COLORS,
} from "../../data";

const fieldLabel =
  "text-[10px] font-semibold uppercase tracking-wide text-white/45";

const AccountSettingsTab = () => {
  const [toggles, setToggles] = useState(
    Object.fromEntries(ACCOUNT_TOGGLES.map((t) => [t.key, t.on]))
  );
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  return (
    <div className="space-y-5">
      <AnimatedContainer delay={0.04}>
        <Card
          className="p-6 sm:p-7 space-y-5"
          backgroundColor="rgba(255,255,255,0.05)"
          shadow="none"
        >
          <div>
            <h3 className="text-lg font-bold text-white">Account Overview</h3>
            <p className="text-xs text-white/45 mt-1">
              Your account status and key identifiers at a glance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-1">
              <p className={fieldLabel}>Account Status</p>
              <p className="text-sm font-semibold text-white inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#22C55E]" />
                Active
              </p>
              <p className="text-[11px] text-white/40">All systems operational</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-1">
              <p className={fieldLabel}>Member Since</p>
              <p className="text-sm font-semibold text-white">Jan 15, 2024</p>
              <p className="text-[11px] text-white/40">365 days active</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-1">
              <p className={fieldLabel}>Last Login</p>
              <p className="text-sm font-semibold text-white">Today</p>
              <p className="text-[11px] text-white/40">
                at 10:42 AM · Chrome/macOS
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className={fieldLabel}>Account ID</Label>
              <div className="relative">
                <Input variant="soft" readOnly value={PROFILE_USER.accountId} className="pr-9" />
                <button
                  type="button"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white cursor-pointer border-0 bg-transparent p-0"
                  onClick={() => {
                    navigator.clipboard?.writeText(PROFILE_USER.accountId);
                    toast.success("Copied.");
                  }}
                >
                  <Copy className="size-3.5" />
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className={fieldLabel}>User Role</Label>
              <div className="flex items-center gap-2 h-9 px-3 rounded-md border border-white/10 bg-white/[0.03]">
                <span className="text-sm text-white flex-1 truncate">
                  Organization Administrator
                </span>
                <span className="rounded bg-[rgba(251,191,36,0.15)] px-1.5 py-0.5 text-[10px] font-semibold text-[#FBBF24]">
                  Admin
                </span>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className={fieldLabel}>Organization</Label>
              <Input variant="soft" readOnly value={PROFILE_USER.org} />
            </div>
            <div className="space-y-1.5">
              <Label className={fieldLabel}>Email Verification</Label>
              <div className="flex items-center gap-2 h-9 px-3 rounded-md border border-white/10 bg-white/[0.03]">
                <span className="text-sm text-white flex-1 truncate">
                  {PROFILE_USER.email}
                </span>
                <span className="text-[10px] font-semibold text-[#10B7BA]">
                  Verified
                </span>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className={fieldLabel}>Contact Number</Label>
              <Input variant="soft" readOnly value={PROFILE_USER.phone} />
            </div>
            <div className="space-y-1.5">
              <Label className={fieldLabel}>Account Type</Label>
              <div className="flex items-center gap-2 h-9 px-3 rounded-md border border-white/10 bg-white/[0.03]">
                <span className="size-3 rounded-sm bg-[#FBBF24]" />
                <span className="text-sm text-white">Enterprise</span>
              </div>
            </div>
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
            <h3 className="text-lg font-bold text-white">Email Address</h3>
            <p className="text-xs text-white/45 mt-1">
              Manage your login and notification email address
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex items-center justify-between gap-3">
            <div>
              <p className={fieldLabel}>Current Email</p>
              <p className="text-sm text-white mt-1">{PROFILE_USER.email}</p>
              <p className="text-[11px] text-white/40 mt-0.5">
                This email is used for login and notifications
              </p>
            </div>
            <span className="rounded-full bg-[rgba(16,183,186,0.15)] px-2 py-0.5 text-[10px] font-semibold text-[#10B7BA]">
              Verified
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className={fieldLabel}>New Email Address</Label>
              <Input
                variant="soft"
                placeholder="Enter new email address"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className={fieldLabel}>Confirm New Email</Label>
              <Input
                variant="soft"
                placeholder="Confirm new email address"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-[11px] text-white/45 inline-flex items-center gap-1.5">
              <Info className="size-3" />
              A verification link will be sent to the new email address
            </p>
            <Button
              variant="primary"
              size="sm"
              className="rounded-lg! bg-[#FBBF24]! text-black!"
              onClick={() => toast.success("Verification email sent.")}
            >
              Send Verification Email
            </Button>
          </div>
        </Card>
      </AnimatedContainer>

      <AnimatedContainer delay={0.08}>
        <Card
          className="p-6 sm:p-7 space-y-4"
          backgroundColor="rgba(255,255,255,0.05)"
          shadow="none"
        >
          <div>
            <h3 className="text-lg font-bold text-white">Contact Number</h3>
            <p className="text-xs text-white/45 mt-1">
              Update your phone number for account recovery and alerts
            </p>
          </div>
          <div className="space-y-1.5">
            <Label className={fieldLabel}>Current Contact Number</Label>
            <Input variant="soft" readOnly value={PROFILE_USER.phone} />
          </div>
          <div className="space-y-1.5">
            <Label className={fieldLabel}>New Phone Number</Label>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1 h-9 px-3 rounded-md border border-white/10 bg-white/[0.03] text-xs text-white/70 shrink-0">
                🇺🇸 +1
              </span>
              <Input
                variant="soft"
                placeholder="(555) 000-0000"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="text-xs text-white/50 hover:text-white cursor-pointer border-0 bg-transparent p-0"
              onClick={() => setNewPhone("")}
            >
              Cancel
            </button>
            <Button
              variant="primary"
              size="sm"
              className="rounded-lg! bg-[#FBBF24]! text-black!"
              onClick={() => toast.success("Contact number updated.")}
            >
              Update Contact Number
            </Button>
          </div>
        </Card>
      </AnimatedContainer>

      <AnimatedContainer delay={0.1}>
        <Card
          className="p-6 sm:p-7 space-y-4"
          backgroundColor="rgba(255,255,255,0.05)"
          shadow="none"
        >
          <div>
            <h3 className="text-lg font-bold text-white">
              Theme Color Preferences
            </h3>
            <p className="text-xs text-white/45 mt-1">
              Customize your visibility and platform experience
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {THEME_COLORS.map((c) => (
              <div
                key={c.label}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <div>
                  <p className="text-xs text-white/50">{c.label}</p>
                  <p className="text-sm font-medium text-white mt-0.5 uppercase">
                    {c.value}
                  </p>
                </div>
                <span
                  className="size-8 rounded-lg border border-white/15 shrink-0"
                  style={{ backgroundColor: c.value }}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-white/10">
            <p className="text-xs text-white/40">Last saved: Today at 10:42 AM</p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="text-xs text-white/50 hover:text-white cursor-pointer border-0 bg-transparent p-0"
              >
                Cancel
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
        </Card>
      </AnimatedContainer>

      <AnimatedContainer delay={0.12}>
        <Card
          className="p-6 sm:p-7 space-y-4"
          backgroundColor="rgba(255,255,255,0.05)"
          shadow="none"
        >
          <h3 className="text-lg font-bold text-white">Account Preferences</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ACCOUNT_TOGGLES.map((t) => (
              <div
                key={t.key}
                className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">{t.title}</p>
                  <p className="text-[11px] text-white/45 mt-0.5">{t.desc}</p>
                </div>
                <Toggle
                  checked={!!toggles[t.key]}
                  onChange={(v) =>
                    setToggles((prev) => ({ ...prev, [t.key]: v }))
                  }
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              className="text-xs text-white/50 hover:text-white cursor-pointer border-0 bg-transparent p-0"
            >
              Cancel
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
        </Card>
      </AnimatedContainer>

      <AnimatedContainer delay={0.14}>
        <Card
          className="p-6 sm:p-7 space-y-4 border border-[rgba(239,68,68,0.25)]!"
          backgroundColor="rgba(239,68,68,0.04)"
          shadow="none"
          borderColor="rgba(239,68,68,0.25)"
        >
          <h3 className="text-lg font-bold text-[#F87171]">Danger Zone</h3>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-[rgba(239,68,68,0.2)] bg-black/20 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">
                  Deactivate Account
                </p>
                <p className="text-[11px] text-white/45 mt-0.5">
                  Temporarily disable access. You can reactivate later.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg! border-[#F87171]! text-[#F87171]! shrink-0"
                onClick={() => toast.message("Deactivation requires confirmation.")}
              >
                Deactivate
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-[rgba(239,68,68,0.2)] bg-black/20 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">Delete Account</p>
                <p className="text-[11px] text-white/45 mt-0.5">
                  Permanently delete your account. This cannot be undone.
                </p>
              </div>
              <Button
                variant="danger"
                size="sm"
                className="rounded-lg! shrink-0"
                onClick={() => toast.error("Deletion requires owner confirmation.")}
              >
                <Trash2 className="size-3.5" />
                Delete Account
              </Button>
            </div>
          </div>
          <p className="text-[11px] text-white/40">
            Account deletion requires organization owner confirmation and includes
            a 30-day grace period.
          </p>
        </Card>
      </AnimatedContainer>
    </div>
  );
};

export default AccountSettingsTab;
