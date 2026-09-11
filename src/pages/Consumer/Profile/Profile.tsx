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
import Card from "@/pages/Consumer/Dashboard/Card";
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
      checked ? "bg-[#FBBF24]" : "bg-white/20"
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
  const [email, setEmail] = useState("masud@abchealthcare.com");
  const [phone, setPhone] = useState("+1 (555) 234-5678");
  const [timezone, setTimezone] = useState("UTC-5 Eastern Time");
  const [language, setLanguage] = useState("English (US)");
  const [country, setCountry] = useState("United States");
  const [bio, setBio] = useState(
    "Reflective practitioner focused on relationship clarity and long-term growth."
  );
  const [photo, setPhoto] = useState(AVATAR);
  const [prefs, setPrefs] = useState({
    reflectionInApp: true,
    reflectionEmail: true,
    systemInApp: true,
    systemEmail: false,
    founderInApp: true,
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
      { label: "8+ characters", ok: newPassword.length >= 8 },
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
    <div className="space-y-5 sm:space-y-6 pb-4 max-w-6xl">
      <AnimatedContainer delay={0.04}>
        <Card className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-5 lg:items-center">
            <img
              src={photo}
              alt={displayName}
              className="size-20 sm:size-24 rounded-full object-cover border border-white/10 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h2 className="font-playfair text-2xl sm:text-3xl text-primary-text">
                {displayName}
              </h2>
              <p className="mt-1 text-sm text-secondary-text">
                Project Manager • ABC Healthcare
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  Active Employee
                </span>
                <span className="text-muted-blue">Member since January 2024</span>
              </div>
            </div>
            <Button variant="primary" size="sm" className="shrink-0 self-start lg:self-center">
              Edit Profile
            </Button>
          </div>

          <div className="mt-6 pt-5 border-t border-white/[0.08]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <p className="text-sm text-secondary-text">
                Profile Completion{" "}
                <span className="text-[#14B8A6] font-semibold">85%</span>
              </p>
              <p className="text-xs text-muted-blue">2 actions remaining</p>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-[85%] rounded-full bg-[#14B8A6]" />
            </div>
            <ul className="mt-3 flex flex-wrap gap-4 text-xs">
              <li className="inline-flex items-center gap-1.5 text-[#14B8A6]">
                <Check className="size-3.5" />
                Add Profile Photo
              </li>
              <li className="inline-flex items-center gap-1.5 text-muted-blue">
                <span className="size-3.5 rounded-full border border-white/25" />
                Verify Phone Number
              </li>
            </ul>
          </div>
        </Card>
      </AnimatedContainer>

      <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-5">
        <AnimatedContainer delay={0.08}>
          <Card className="p-5 sm:p-6 h-full">
            <div className="flex flex-col items-center text-center">
              <img
                src={photo}
                alt={displayName}
                className="size-24 rounded-full object-cover border border-white/10"
              />
              <h3 className="mt-4 font-playfair text-xl text-primary-text">
                {displayName}
              </h3>
              <p className="mt-1 text-sm text-secondary-text">
                Individual Consumer
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Active
              </span>
            </div>

            <dl className="mt-6 space-y-3 text-sm border-t border-white/[0.08] pt-5">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-blue">Member Since</dt>
                <dd className="text-primary-text">Jan 2024</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-blue">Last Login</dt>
                <dd className="text-primary-text">2 hours ago</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-blue">Role</dt>
                <dd className="text-primary-brand">Individual Consumer</dd>
              </div>
            </dl>

            <div className="mt-6 space-y-2">
              <Button variant="primary" size="sm" fullWidth>
                Edit Profile
              </Button>
              <Button variant="outline" size="sm" fullWidth>
                Change Password
              </Button>
            </div>
          </Card>
        </AnimatedContainer>

        <AnimatedContainer delay={0.1}>
          <Card className="p-4 sm:p-6">
            <div className="mb-5">
              <h3 className="font-playfair text-xl text-primary-text">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-secondary-text">
                Manage your personal details and contact information
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>First Name</Label>
                <Input
                  variant="soft"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Last Name</Label>
                <Input
                  variant="soft"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Display Name</Label>
                <Input
                  variant="soft"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Work Email</Label>
                <Input
                  variant="soft"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  rightIcon={<BadgeCheck className="size-4 text-sky-400" />}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Phone Number</Label>
                <Input
                  variant="soft"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Time Zone</Label>
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
                <Label>Language</Label>
                <Select
                  variant="soft"
                  options={["English (US)", "English (UK)", "Español"]}
                  value={language}
                  onChange={setLanguage}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Country</Label>
                <Select
                  variant="soft"
                  options={["United States", "Canada", "United Kingdom"]}
                  value={country}
                  onChange={setCountry}
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Bio</Label>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-[110px] bg-light-bg border-border"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
              <p className="text-xs text-muted-blue">
                Last saved: Today at 10:42 AM
              </p>
              <div className="flex flex-col-reverse sm:flex-row gap-2">
                <Button variant="secondary" size="sm">
                  Cancel
                </Button>
                <Button variant="primary" size="sm">
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </AnimatedContainer>
      </div>

      <AnimatedContainer delay={0.12}>
        <Card className="p-4 sm:p-6">
          <h3 className="font-playfair text-xl text-primary-text mb-4">
            Profile Photo
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <img
                src={photo}
                alt="Current profile"
                className="size-20 rounded-2xl object-cover border border-white/10 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm text-primary-text">
                  Update your profile photo
                </p>
                <p className="mt-1 text-xs text-muted-blue">
                  JPG, PNG, WEBP · Max 5MB
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <label className="inline-flex">
                    <span className="inline-flex items-center gap-2 h-9 px-4 rounded-lg text-xs font-semibold text-black bg-[#FBBF24] cursor-pointer hover:opacity-90">
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
                    className="inline-flex items-center gap-1.5 h-9 px-3 text-xs text-red-400 hover:text-red-300 bg-transparent border-0 cursor-pointer"
                  >
                    <Trash2 className="size-3.5" />
                    Remove Photo
                  </button>
                </div>
              </div>
            </div>

            <label className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 bg-white/[0.03] min-h-[140px] px-4 text-center cursor-pointer hover:bg-white/[0.05] transition-colors">
              <CloudUpload className="size-6 text-primary-brand" />
              <p className="text-sm text-secondary-text">
                Drag & drop or browse files
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

      <AnimatedContainer delay={0.14}>
        <Card className="p-4 sm:p-6 overflow-x-auto">
          <h3 className="font-playfair text-xl text-primary-text mb-1">
            Notification Preferences
          </h3>
          <p className="text-sm text-secondary-text mb-5">
            Choose how you want to stay informed
          </p>

          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-blue border-b border-white/[0.08]">
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
        </Card>
      </AnimatedContainer>

      <AnimatedContainer delay={0.16}>
        <Card className="p-4 sm:p-6">
          <h3 className="font-playfair text-xl text-primary-text mb-1">
            Change Password
          </h3>
          <p className="text-sm text-secondary-text mb-5">
            Keep your account secure with a strong password
          </p>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-blue">
                Current Password Status
              </p>
              <p className="mt-1 text-sm text-primary-text">
                Last changed 30 days ago
              </p>
            </div>
            <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400">
              Strong
            </span>
          </div>

          <div className="mb-5">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-secondary-text">Password Strength</span>
              <span className="text-primary-brand">
                {strength >= 80 ? "Strong" : strength >= 40 ? "Medium" : "Weak"}{" "}
                — {strength || 85}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#FBBF24] transition-all"
                style={{ width: `${newPassword ? strength : 85}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-5">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Current Password</Label>
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
                      aria-label="Toggle current password"
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
                <Label>New Password</Label>
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
                      aria-label="Toggle new password"
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
                <Label>Confirm New Password</Label>
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
                        aria-label="Toggle confirm password"
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
              <p className="text-xs uppercase tracking-wider text-muted-blue mb-3">
                Requirements
              </p>
              <ul className="space-y-2.5">
                {passwordChecks.map((c) => (
                  <li
                    key={c.label}
                    className={cn(
                      "flex items-center gap-2 text-xs",
                      c.ok || !newPassword
                        ? "text-[#14B8A6]"
                        : "text-muted-blue"
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
            <Button variant="primary" size="md">
              Update Password
            </Button>
          </div>
        </Card>
      </AnimatedContainer>
    </div>
  );
};

export default Profile;
