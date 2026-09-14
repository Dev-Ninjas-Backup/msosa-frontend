import { useMemo, useState } from "react";
import {
  BadgeCheck,
  Check,
  CloudUpload,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { Textarea } from "@/ui/Textarea";
import { Label } from "@/ui/Label";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";

const AVATAR =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80";

const Toggle = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={() => onChange(!checked)}
    className={cn(
      "relative h-6 w-11 rounded-full border-0 cursor-pointer transition-colors",
      checked ? "bg-[#F5C542]" : "bg-white/20"
    )}
  >
    <span
      className={cn(
        "absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform",
        checked && "translate-x-5"
      )}
    />
  </button>
);

const Profile = () => {
  const [firstName, setFirstName] = useState("Masud");
  const [lastName, setLastName] = useState("J");
  const [displayName, setDisplayName] = useState("Masud J");
  const [email, setEmail] = useState("liza.fernandes@Encounters.com");
  const [phone, setPhone] = useState("+1 (555) 234-5678");
  const [timezone, setTimezone] = useState("UTC-5 Eastern Time");
  const [language, setLanguage] = useState("English (US)");
  const [country, setCountry] = useState("United States");
  const [bio, setBio] = useState(
    "Enterprise platform administrator responsible for user management, system configuration, and organizational compliance at Encounters Corporation."
  );
  const [photo, setPhoto] = useState(AVATAR);
  const [prefs, setPrefs] = useState({
    reflectionInApp: true,
    reflectionEmail: true,
    systemInApp: true,
    systemEmail: false,
    founderInApp: false,
    founderEmail: true,
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordChecks = useMemo(
    () => [
      { label: "Minimum 8 characters", ok: newPassword.length >= 8 },
      { label: "Uppercase letter", ok: /[A-Z]/.test(newPassword) },
      { label: "Lowercase letter", ok: /[a-z]/.test(newPassword) },
      { label: "Number", ok: /\d/.test(newPassword) },
      { label: "Special character", ok: /[^A-Za-z0-9]/.test(newPassword) },
    ],
    [newPassword]
  );

  const strength = Math.round(
    (passwordChecks.filter((c) => c.ok).length / passwordChecks.length) * 100
  );

  return (
    <div className="space-y-5 sm:space-y-6 pb-6">
      {/* Top Profile Header */}
      <AnimatedContainer delay={0.04}>
        <Card className="p-5 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-5 lg:items-center">
            <img
              src={photo}
              alt={displayName}
              className="size-16 sm:size-18 rounded-full object-cover border-2 border-[#F5C542]/40 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h2 className="font-playfair text-2xl sm:text-3xl text-primary-text">
                {displayName}
              </h2>
              <p className="mt-1 text-sm text-secondary-text">
                Project Manager • ABC Healthcare
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2.5 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-400 font-medium">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  ACTIVE EMPLOYEE
                </span>
                <span className="text-secondary-text">
                  Member since January 2026
                </span>
              </div>
            </div>
            <button
              type="button"
              className="h-10 px-5 rounded-xl bg-[#F5C542] hover:bg-[#e8b93a] text-black text-sm font-semibold transition-colors cursor-pointer border-0 shrink-0 self-start lg:self-center"
            >
              Edit Profile
            </button>
          </div>

          {/* Profile Completion */}
          <div className="mt-6 pt-5 border-t border-white/[0.08]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <p className="text-sm text-secondary-text">
                Profile Completion{" "}
                <span className="text-primary-text font-semibold">85%</span>
              </p>
              <p className="text-xs text-secondary-text">2 actions remaining</p>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-[85%] rounded-full bg-white" />
            </div>
            <ul className="mt-3 flex flex-wrap gap-5 text-xs">
              <li className="inline-flex items-center gap-1.5 text-teal-400">
                <span className="size-3.5 rounded-full bg-teal-400/20 flex items-center justify-center">
                  <Check className="size-2.5" />
                </span>
                Add Profile Photo
              </li>
              <li className="inline-flex items-center gap-1.5 text-secondary-text">
                <span className="size-3.5 rounded-full border border-white/25" />
                Verify Phone Number
              </li>
            </ul>
          </div>
        </Card>
      </AnimatedContainer>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[260px_1fr] gap-5">
        {/* Left Sidebar Card */}
        <AnimatedContainer delay={0.08}>
          <Card className="p-5 h-fit">
            <div className="flex flex-col items-center text-center">
              <img
                src={photo}
                alt={displayName}
                className="size-20 rounded-full object-cover border border-white/10"
              />
              <h3 className="mt-4 text-lg font-medium text-primary-text">
                {displayName}
              </h3>
              <p className="mt-0.5 text-sm text-secondary-text">
                Individual Consumer
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] text-emerald-400 font-medium">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Active
              </span>
            </div>

            <dl className="mt-6 space-y-3 text-sm border-t border-white/[0.08] pt-5">
              <div className="flex justify-between gap-3">
                <dt className="text-secondary-text">Member Since</dt>
                <dd className="text-primary-text">Jan 2024</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-secondary-text">Last Login</dt>
                <dd className="text-primary-text">2 hours ago</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-secondary-text">Role</dt>
                <dd className="text-[#F5C542]">Individual Consumer</dd>
              </div>
            </dl>

            <div className="mt-6 space-y-2.5">
              <button
                type="button"
                className="w-full h-10 rounded-xl bg-[#F5C542] hover:bg-[#e8b93a] text-black text-sm font-semibold transition-colors cursor-pointer border-0"
              >
                Edit Profile
              </button>
              <button
                type="button"
                className="w-full h-10 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-primary-text text-sm font-medium transition-colors cursor-pointer"
              >
                Change Password
              </button>
            </div>
          </Card>
        </AnimatedContainer>

        {/* Personal Information */}
        <AnimatedContainer delay={0.1}>
          <Card className="p-5 sm:p-6">
            <div className="mb-5">
              <h3 className="text-base font-medium text-primary-text">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-secondary-text">
                Manage your personal details and contact information
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[11px] uppercase tracking-wider text-secondary-text">
                  First Name
                </Label>
                <Input
                  variant="soft"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] uppercase tracking-wider text-secondary-text">
                  Last Name
                </Label>
                <Input
                  variant="soft"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] uppercase tracking-wider text-secondary-text">
                  Display Name
                </Label>
                <Input
                  variant="soft"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] uppercase tracking-wider text-secondary-text">
                  Work Email
                </Label>
                <Input
                  variant="soft"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  rightIcon={<BadgeCheck className="size-4 text-sky-400" />}
                  className="ring-1 ring-[#F5C542]/40"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] uppercase tracking-wider text-secondary-text">
                  Phone Number
                </Label>
                <Input
                  variant="soft"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] uppercase tracking-wider text-secondary-text">
                  Time Zone
                </Label>
                <Select
                  variant="soft"
                  options={[
                    "UTC-5 Eastern Time",
                    "UTC-6 Central Time",
                    "UTC-7 Mountain Time",
                    "UTC-8 Pacific Time",
                  ]}
                  value={timezone}
                  onChange={setTimezone}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] uppercase tracking-wider text-secondary-text">
                  Language
                </Label>
                <Select
                  variant="soft"
                  options={["English (US)", "English (UK)", "Español"]}
                  value={language}
                  onChange={setLanguage}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] uppercase tracking-wider text-secondary-text">
                  Country
                </Label>
                <Select
                  variant="soft"
                  options={["United States", "Canada", "United Kingdom"]}
                  value={country}
                  onChange={setCountry}
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-[11px] uppercase tracking-wider text-secondary-text">
                  Bio
                </Label>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-[100px] bg-white/[0.03] border-white/10"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-white/[0.06]">
              <p className="text-xs text-secondary-text">
                Last saved: Today at 10:42 AM
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="h-9 px-4 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-primary-text text-xs font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="h-9 px-4 rounded-lg bg-[#F5C542] hover:bg-[#e8b93a] text-black text-xs font-semibold transition-colors cursor-pointer border-0"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </Card>
        </AnimatedContainer>
      </div>

      {/* Profile Photo */}
      <AnimatedContainer delay={0.12}>
        <Card className="p-5 sm:p-6">
          <div className="mb-4">
            <h3 className="text-base font-medium text-primary-text">
              Profile Photo
            </h3>
            <p className="mt-1 text-sm text-secondary-text">
              Update your profile photo displayed across the platform
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-5">
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <img
                src={photo}
                alt="Current profile"
                className="size-16 rounded-full object-cover border border-white/10 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm text-primary-text font-medium">
                  Update your profile photo
                </p>
                <p className="mt-1 text-xs text-secondary-text">
                  JPG, PNG, WEBP · Max 5MB · Recommended 400×400px
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <label className="inline-flex">
                    <span className="inline-flex items-center gap-2 h-9 px-4 rounded-lg text-xs font-semibold text-black bg-[#F5C542] cursor-pointer hover:bg-[#e8b93a] transition-colors">
                      <CloudUpload className="size-3.5" />
                      Upload Photo
                    </span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setPhoto(URL.createObjectURL(file));
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setPhoto(AVATAR)}
                    className="inline-flex items-center gap-1.5 h-9 px-3 text-xs text-rose-400 hover:text-rose-300 bg-transparent border border-rose-400/20 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="size-3.5" />
                    Remove Photo
                  </button>
                </div>
              </div>
            </div>

            <label className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-white/[0.03] min-h-[120px] px-4 text-center cursor-pointer hover:bg-white/[0.05] transition-colors">
              <CloudUpload className="size-5 text-[#F5C542]" />
              <p className="text-xs text-secondary-text">
                Drag & drop or
                <br />
                browse files
              </p>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setPhoto(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>
        </Card>
      </AnimatedContainer>

      {/* Notification Preferences */}
      <AnimatedContainer delay={0.14}>
        <Card className="p-5 sm:p-6">
          <h3 className="text-base font-medium text-primary-text mb-5 uppercase tracking-wider text-sm">
            Notification Preferences
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-secondary-text border-b border-white/[0.08]">
                  <th className="pb-3 font-medium">Notification Type</th>
                  <th className="pb-3 font-medium text-center w-28">In-App</th>
                  <th className="pb-3 font-medium text-center w-28">Email</th>
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    {
                      label: "Reflection Reminders",
                      inApp: "reflectionInApp",
                      emailKey: "reflectionEmail",
                    },
                    {
                      label: "System Updates",
                      inApp: "systemInApp",
                      emailKey: "systemEmail",
                    },
                    {
                      label: "Founder Announcements",
                      inApp: "founderInApp",
                      emailKey: "founderEmail",
                    },
                  ] as const
                ).map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-white/[0.06] last:border-0"
                  >
                    <td className="py-4 text-primary-text">{row.label}</td>
                    <td className="py-4">
                      <div className="flex justify-center">
                        <Toggle
                          label={`${row.label} in-app`}
                          checked={prefs[row.inApp]}
                          onChange={(v) =>
                            setPrefs((p) => ({ ...p, [row.inApp]: v }))
                          }
                        />
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex justify-center">
                        <Toggle
                          label={`${row.label} email`}
                          checked={prefs[row.emailKey]}
                          onChange={(v) =>
                            setPrefs((p) => ({ ...p, [row.emailKey]: v }))
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </AnimatedContainer>

      {/* Password */}
      <AnimatedContainer delay={0.16}>
        <Card className="p-5 sm:p-6">
          <div className="mb-5">
            <h3 className="text-base font-medium text-primary-text">Password</h3>
            <p className="mt-1 text-sm text-secondary-text">
              Manage your account password and strength
            </p>
          </div>

          {/* Current Status */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-secondary-text">
                Current Password Status
              </p>
              <p className="mt-1 text-sm text-primary-text">
                Last changed 30 days ago
              </p>
            </div>
            <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400 font-medium">
              Strong
            </span>
          </div>

          {/* Strength bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-secondary-text">Password Strength</span>
              <span className="text-[#F5C542]">
                Strong — {newPassword ? strength : 85}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#F5C542] transition-all"
                style={{ width: `${newPassword ? strength : 85}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            className="h-9 px-4 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-primary-text text-xs font-medium transition-colors cursor-pointer mb-6"
          >
            Change Password
          </button>

          {/* Change Password Form */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
            <h4 className="text-sm font-medium text-primary-text mb-4">
              Change Password
            </h4>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-5">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[11px] uppercase tracking-wider text-secondary-text">
                    Current Password
                  </Label>
                  <Input
                    variant="soft"
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowCurrent((v) => !v)}
                        className="border-0 bg-transparent p-0 cursor-pointer text-secondary-text hover:text-primary-text"
                      >
                        {showCurrent ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[11px] uppercase tracking-wider text-secondary-text">
                    New Password
                  </Label>
                  <Input
                    variant="soft"
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowNew((v) => !v)}
                        className="border-0 bg-transparent p-0 cursor-pointer text-secondary-text hover:text-primary-text"
                      >
                        {showNew ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[11px] uppercase tracking-wider text-secondary-text">
                    Confirm New Password
                  </Label>
                  <Input
                    variant="soft"
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    rightIcon={
                      confirmPassword && confirmPassword === newPassword ? (
                        <BadgeCheck className="size-4 text-sky-400" />
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowConfirm((v) => !v)}
                          className="border-0 bg-transparent p-0 cursor-pointer text-secondary-text hover:text-primary-text"
                        >
                          {showConfirm ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      )
                    }
                  />
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 h-fit">
                <p className="text-[11px] uppercase tracking-wider text-secondary-text mb-3">
                  Password Requirements
                </p>
                <ul className="space-y-2.5">
                  {passwordChecks.map((c) => (
                    <li
                      key={c.label}
                      className={cn(
                        "flex items-center gap-2 text-xs",
                        c.ok || !newPassword
                          ? "text-teal-400"
                          : "text-secondary-text"
                      )}
                    >
                      <Check className="size-3.5 shrink-0" />
                      {c.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5">
              <button
                type="button"
                className="w-full sm:w-auto h-10 px-6 rounded-xl bg-[#F5C542] hover:bg-[#e8b93a] text-black text-sm font-semibold transition-colors cursor-pointer border-0"
              >
                Update Password
              </button>
            </div>
          </div>
        </Card>
      </AnimatedContainer>
    </div>
  );
};

export default Profile;