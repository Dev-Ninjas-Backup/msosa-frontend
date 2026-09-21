import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  Check,
  CloudUpload,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { REFINER_PROFILE } from "@/pages/Refiner/ReviewQueue/data";
import { Button } from "@/ui";

type Tab = "profile" | "security" | "notifications";

type NotifPrefs = {
  newReportForReview: boolean;
  reviewReminder: boolean;
  newReports: boolean;
  quarterlyComparison: boolean;
};

type StoredProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timezone: string;
  language: string;
  avatar?: string | null;
  notifs: NotifPrefs;
  lastSavedAt?: string;
};

const STORAGE_KEY = "far-refiner-profile-settings";

const DEFAULT_NOTIFS: NotifPrefs = {
  newReportForReview: true,
  reviewReminder: true,
  newReports: true,
  quarterlyComparison: true,
};

const loadStored = (): StoredProfile | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredProfile;
  } catch {
    return null;
  }
};

const formatSavedLabel = (iso?: string) => {
  if (!iso) return "Never";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Never";
  const now = new Date();
  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
  const time = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return sameDay
    ? `Today at ${time}`
    : d.toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
};

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

const ProfileSettings = () => {
  const stored = useMemo(() => loadStored(), []);

  const [tab, setTab] = useState<Tab>("profile");

  const [firstName, setFirstName] = useState<string>(
    stored?.firstName ?? REFINER_PROFILE.firstName
  );
  const [lastName, setLastName] = useState<string>(
    stored?.lastName ?? REFINER_PROFILE.lastName
  );
  const [email, setEmail] = useState<string>(
    stored?.email ?? REFINER_PROFILE.email
  );
  const [phone, setPhone] = useState<string>(
    stored?.phone ?? REFINER_PROFILE.phone
  );
  const [timezone, setTimezone] = useState<string>(
    stored?.timezone ?? REFINER_PROFILE.timezone
  );
  const [language, setLanguage] = useState<string>(
    stored?.language ?? REFINER_PROFILE.language
  );
  const [avatar, setAvatar] = useState<string | null>(
    stored?.avatar ?? REFINER_PROFILE.avatar
  );
  const [lastSavedAt, setLastSavedAt] = useState<string | undefined>(
    stored?.lastSavedAt
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [notifs, setNotifs] = useState<NotifPrefs>(
    stored?.notifs ?? DEFAULT_NOTIFS
  );

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

  const tabs: { id: Tab; label: string }[] = [
    { id: "profile", label: "My Profile" },
    { id: "security", label: "Security" },
    { id: "notifications", label: "Notification Preferences" },
  ];

  const persist = (patch?: Partial<StoredProfile>) => {
    const next: StoredProfile = {
      firstName,
      lastName,
      email,
      phone,
      timezone,
      language,
      avatar,
      notifs,
      lastSavedAt,
      ...patch,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  };

  const resetProfile = () => {
    const snap = loadStored();
    setFirstName(snap?.firstName ?? REFINER_PROFILE.firstName);
    setLastName(snap?.lastName ?? REFINER_PROFILE.lastName);
    setEmail(snap?.email ?? REFINER_PROFILE.email);
    setPhone(snap?.phone ?? REFINER_PROFILE.phone);
    setTimezone(snap?.timezone ?? REFINER_PROFILE.timezone);
    setLanguage(snap?.language ?? REFINER_PROFILE.language);
    setAvatar(snap?.avatar ?? REFINER_PROFILE.avatar);
    toast.info("Changes discarded.");
  };

  const saveProfile = () => {
    if (!email.trim()) {
      toast.error("Email is required.");
      return;
    }
    const savedAt = new Date().toISOString();
    persist({ lastSavedAt: savedAt });
    setLastSavedAt(savedAt);
    toast.success("Profile saved locally.");
  };

  const updatePassword = () => {
    if (!currentPassword) {
      toast.error("Enter your current password.");
      return;
    }
    if (!passwordChecks.every((c) => c.ok)) {
      toast.error("New password does not meet requirements.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    localStorage.setItem(
      `${STORAGE_KEY}:password-updated`,
      new Date().toISOString()
    );
    toast.success("Password updated locally.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    const existing = loadStored();
    if (!existing) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...existing, notifs })
    );
  }, [notifs]);

  const onPickPhoto = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Max size is 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      setAvatar(dataUrl);
      persist({ avatar: dataUrl });
      toast.success("Photo updated locally.");
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setAvatar(null);
    persist({ avatar: null });
    toast.info("Photo removed.");
  };

  const avatarSrc = avatar || REFINER_PROFILE.avatar;

  return (
    <div className="w-full space-y-0 pb-8">
      <AnimatedContainer delay={0.04}>
        <div className="pb-12">
          <h2 className="mt-4 text-xl sm:text-2xl font-semibold text-white">
            Refiner Profile & Settings
          </h2>
          <p className="mt-1.5 text-sm text-secondary-text">
            Role authorizations and performance metrics
          </p>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.06}>
        <div className="flex items-center gap-8 border-b border-white/10 mb-6 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "relative pb-3.5 text-sm font-medium transition-colors cursor-pointer border-0 bg-transparent whitespace-nowrap",
                tab === t.id
                  ? "text-[#F5C542]"
                  : "text-secondary-text hover:text-primary-text"
              )}
            >
              {t.label}
              {tab === t.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F5C542] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </AnimatedContainer>

      {tab === "profile" && (
        <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-5 w-full">
          <AnimatedContainer delay={0.08}>
            <Card className="p-5 h-fit w-full">
              <div className="flex flex-col items-center text-center">
                <img
                  src={avatarSrc}
                  alt={`${firstName} ${lastName}`}
                  className="size-16 rounded-full object-cover ring-2 ring-[#F5C542]/30"
                />
                <h3 className="mt-4 text-lg font-medium text-white">
                  {firstName} {lastName}
                </h3>
                <p className="mt-0.5 text-sm text-secondary-text">
                  {REFINER_PROFILE.role}
                </p>
                <p className="text-xs text-secondary-text/70">
                  {REFINER_PROFILE.org}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] text-emerald-400 font-medium">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  Active
                </span>
              </div>

              <dl className="mt-6 space-y-3 text-sm border-t border-white/[0.08] pt-5">
                <div className="flex justify-between gap-3">
                  <dt className="text-secondary-text">Member Since</dt>
                  <dd className="text-white">{REFINER_PROFILE.memberSince}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-secondary-text">Last Login</dt>
                  <dd className="text-white">{REFINER_PROFILE.lastLogin}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-secondary-text">Role</dt>
                  <dd className="text-[#F5C542]">{REFINER_PROFILE.role}</dd>
                </div>
              </dl>

              <div className="mt-6 space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    document
                      .getElementById("refiner-personal-info")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full h-10 rounded-xl bg-[#F5C542] hover:bg-[#e8b93a] text-black text-sm font-semibold transition-colors cursor-pointer border-0"
                >
                  Edit Profile
                </button>
                <button
                  type="button"
                  onClick={() => setTab("security")}
                  className="w-full h-10 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Change Password
                </button>
              </div>
            </Card>
          </AnimatedContainer>

          <div className="space-y-5 w-full min-w-0">
            <AnimatedContainer delay={0.1}>
              <div id="refiner-personal-info">
                <Card className="p-5 sm:p-6 w-full">
                  <div className="mb-5">
                    <h3 className="text-base font-medium text-white">
                      Personal Information
                    </h3>
                    <p className="mt-1 text-sm text-secondary-text">
                      Manage your personal details and contact information
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-secondary-text">
                        First Name
                      </label>
                      <Input
                        variant="soft"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-secondary-text">
                        Last Name
                      </label>
                      <Input
                        variant="soft"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-secondary-text">
                        Work Email
                      </label>
                      <Input
                        variant="soft"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        rightIcon={<BadgeCheck className="size-4 text-sky-400" />}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-secondary-text">
                        Phone Number
                      </label>
                      <Input
                        variant="soft"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-secondary-text">
                        Time Zone
                      </label>
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
                      <label className="text-[11px] uppercase tracking-wider text-secondary-text">
                        Language
                      </label>
                      <Select
                        variant="soft"
                        options={["English (US)", "English (UK)", "Español"]}
                        value={language}
                        onChange={setLanguage}
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-white/[0.06]">
                    <p className="text-xs text-secondary-text">
                      Last saved: {formatSavedLabel(lastSavedAt)}
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={resetProfile}
                        className="h-9 px-4 rounded-lg border border-white/15 bg-transparent hover:bg-white/5 text-secondary-text text-xs font-medium transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={saveProfile}
                        className="h-9 px-4 rounded-lg bg-[#F5C542] hover:bg-[#e8b93a] text-black text-xs font-semibold transition-colors cursor-pointer border-0 inline-flex items-center gap-1.5"
                      >
                        <Check className="size-3.5" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            </AnimatedContainer>

            <AnimatedContainer delay={0.12}>
              <Card className="p-5 sm:p-6 w-full">
                <div className="mb-4">
                  <h3 className="text-base font-medium text-white">
                    Profile Photo
                  </h3>
                  <p className="mt-1 text-sm text-secondary-text">
                    Update your profile photo displayed across the platform
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-5">
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <img
                      src={avatarSrc}
                      alt=""
                      className="size-14 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm text-white font-medium">
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
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              onPickPhoto(e.target.files?.[0])
                            }
                          />
                        </label>
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="inline-flex items-center gap-1.5 h-9 px-3 text-xs text-rose-400 hover:text-rose-300 bg-transparent border border-rose-400/25 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="size-3.5" />
                          Remove Photo
                        </button>
                      </div>
                    </div>
                  </div>

                  <label className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-white/[0.03] min-h-[110px] px-4 text-center cursor-pointer hover:bg-white/[0.05] transition-colors">
                    <CloudUpload className="size-5 text-[#F5C542]" />
                    <p className="text-xs text-secondary-text">
                      Drag & drop or
                      <br />
                      browse files
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => onPickPhoto(e.target.files?.[0])}
                    />
                  </label>
                </div>
              </Card>
            </AnimatedContainer>
          </div>
        </div>
      )}

      {tab === "security" && (
        <AnimatedContainer delay={0.08}>
          <Card className="p-5 sm:p-6 w-full">
            <div className="mb-5">
              <h3 className="text-base font-medium text-white">Password</h3>
              <p className="mt-1 text-sm text-secondary-text">
                Manage your account password and strength
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-5 max-w-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-secondary-text">
                  Current Password Status
                </p>
                <p className="mt-1 text-sm text-white">Last changed 30 days ago</p>
              </div>
              <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400 font-medium">
                Strong
              </span>
            </div>

            <div className="mb-5 max-w-xl space-y-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-secondary-text">Password Strength</span>
                <span className="text-teal-400">
                  Strong — {newPassword ? strength : 85}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-white transition-all"
                  style={{ width: `${newPassword ? strength : 85}%` }}
                />
              </div>
            </div>

            <Button variant='ghost' className="mb-6! bg-[#FBBF241A]! text-[#FBBF24 text-[#FBBF24]!">Change Password</Button>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 w-full">
              <h4 className="text-sm font-medium text-white mb-4">
                Change Password
              </h4>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 w-full">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-secondary-text">
                      Current Password
                    </label>
                    <Input
                      variant="soft"
                      type={showCurrent ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      rightIcon={
                        <button
                          type="button"
                          onClick={() => setShowCurrent((v) => !v)}
                          className="border-0 bg-transparent p-0 cursor-pointer text-secondary-text"
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
                    <label className="text-[11px] uppercase tracking-wider text-secondary-text">
                      New Password
                    </label>
                    <Input
                      variant="soft"
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      rightIcon={
                        <button
                          type="button"
                          onClick={() => setShowNew((v) => !v)}
                          className="border-0 bg-transparent p-0 cursor-pointer text-secondary-text"
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
                    <label className="text-[11px] uppercase tracking-wider text-secondary-text">
                      Confirm New Password
                    </label>
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
                            className="border-0 bg-transparent p-0 cursor-pointer text-secondary-text"
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

                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={updatePassword}
                      className="w-full h-11 rounded-xl bg-[#F5C542] hover:bg-[#e8b93a] text-black text-sm font-semibold transition-colors cursor-pointer border-0"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="rounded-xl   p-4 h-fit">
                  <p className="text-[11px] uppercase tracking-wider text-secondary-text mb-3">
                    Password Requirements
                  </p>
                  <ul className="space-y-6">
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


            </div>
          </Card>
        </AnimatedContainer>
      )}

      {tab === "notifications" && (
        <AnimatedContainer delay={0.08}>
          <Card className="p-5 sm:p-6 w-full">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h3 className="text-base font-medium text-white">
                  Platform Activity
                </h3>
                <p className="mt-1 text-sm text-secondary-text">
                  Notifications related to platform activity and assessments
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setNotifs({
                    newReportForReview: true,
                    reviewReminder: true,
                    newReports: true,
                    quarterlyComparison: true,
                  });
                  toast.success("All notifications enabled.");
                }}
                className="text-xs font-medium text-[#F5C542] hover:text-[#e8b93a] cursor-pointer border-0 bg-transparent shrink-0"
              >
                Enable All
              </button>
            </div>

            <p className="text-[11px] uppercase tracking-wider text-secondary-text text-right mb-2 pr-1">
              In-App
            </p>

            <div className="space-y-2 w-full">
              {(
                [
                  {
                    key: "newReportForReview" as const,
                    title: "New Report for Review",
                    desc: "When report are invited to review",
                  },
                  {
                    key: "reviewReminder" as const,
                    title: "Review Reminder",
                    desc: "When you miss to complete review",
                  },
                  {
                    key: "newReports" as const,
                    title: "New Reports",
                    desc: "When new reports are generated",
                  },
                  {
                    key: "quarterlyComparison" as const,
                    title: "Quarterly Comparison Reports",
                    desc: "Quarterly performance comparison ready",
                  },
                ] as const
              ).map((row) => (
                <div
                  key={row.key}
                  className="flex items-center justify-between gap-4 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3.5 w-full"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">{row.title}</p>
                    <p className="text-xs text-secondary-text mt-0.5">
                      {row.desc}
                    </p>
                  </div>
                  <Toggle
                    label={row.title}
                    checked={notifs[row.key]}
                    onChange={(v) =>
                      setNotifs((p) => ({ ...p, [row.key]: v }))
                    }
                  />
                </div>
              ))}
            </div>
          </Card>
        </AnimatedContainer>
      )}
    </div>
  );
};

export default ProfileSettings;
