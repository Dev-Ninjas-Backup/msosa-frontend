import { useRef, useState, type ReactNode } from "react";
import { Ban, Check, ChevronDown, RotateCcw, SquarePen } from "lucide-react";
import { toast } from "sonner";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import Switch from "@/ui/Switch";
import { Label } from "@/ui/Label";
import { cn } from "@/lib/utils";
import ManagedUserAvatar from "../../components/ManagedUserAvatar";
import AuditLogTable from "../components/AuditLogTable";
import ProfilePanel from "../components/ProfilePanel";
import SubscriptionsPanel from "../components/SubscriptionsPanel";
import { fieldControlClass, fieldLabelClass } from "../styles";
import type { ProfileTabProps } from "../types";
import {
  COUNTRIES,
  DEPARTMENTS,
  ORGANIZATIONS,
  REPORTING_MANAGERS,
  ROLE_DISPLAY_NAME,
  TIME_ZONES,
  USER_ROLES,
  type ManagedUser,
  type UserRole,
} from "../../data";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PHOTO_BYTES = 2 * 1024 * 1024;

const chevron = <ChevronDown className="size-4 shrink-0 text-white/60" />;

type Draft = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  timeZone: string;
  organization: string;
  department: string;
  team: string;
  reportingManager: string;
  jobTitle: string;
  employeeId: string;
  username: string;
  role: UserRole;
};

type DraftErrors = Partial<Record<keyof Draft, string>>;

const draftFrom = (u: ManagedUser): Draft => ({
  firstName: u.profile.firstName,
  lastName: u.profile.lastName,
  email: u.email,
  phone: u.profile.phone,
  country: u.profile.country,
  timeZone: u.profile.timeZone,
  organization: u.organization,
  department: u.profile.department,
  team: u.profile.team,
  reportingManager: u.profile.reportingManager,
  jobTitle: u.profile.jobTitle,
  employeeId: u.profile.employeeId,
  username: u.profile.username,
  role: u.role,
});

const withCurrent = (options: string[], current: string) =>
  current && !options.includes(current) ? [current, ...options] : options;

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) => (
  <div className="space-y-2">
    <Label className={fieldLabelClass}>{label}</Label>
    {children}
    {error && <p className="text-xs text-[#ef4444]">{error}</p>}
  </div>
);

const IdentityTab = ({
  user,
  actions,
  existingEmails,
}: ProfileTabProps & { existingEmails: string[] }) => {
  const [draft, setDraft] = useState<Draft>(() => draftFrom(user));
  const [errors, setErrors] = useState<DraftErrors>({});
  const firstNameRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  const baseline = draftFrom(user);
  const isDirty = (Object.keys(draft) as (keyof Draft)[]).some(
    (k) => draft[k] !== baseline[k]
  );

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const text = (key: keyof Draft, placeholder = "") => (
    <Input
      variant="soft"
      value={draft[key]}
      placeholder={placeholder}
      onChange={(e) => set(key, e.target.value)}
      error={!!errors[key]}
      className={fieldControlClass}
    />
  );

  const select = (key: keyof Draft, options: string[], className?: string) => (
    <Select
      variant="soft"
      options={withCurrent(options, draft[key])}
      value={draft[key]}
      onChange={(v) => v && set(key, v as Draft[typeof key])}
      className={cn(fieldControlClass, className)}
      rightIcon={chevron}
    />
  );

  const handleSave = () => {
    const next: DraftErrors = {};
    const email = draft.email.trim().toLowerCase();
    if (!draft.firstName.trim()) next.firstName = "First name is required";
    if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address";
    else if (email !== user.email.toLowerCase() && existingEmails.includes(email))
      next.email = "Another user already uses this email";
    if (!draft.username.trim()) next.username = "Username is required";
    setErrors(next);
    if (Object.keys(next).length) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    const clean: Draft = {
      ...draft,
      firstName: draft.firstName.trim(),
      lastName: draft.lastName.trim(),
      email,
      phone: draft.phone.trim(),
      team: draft.team.trim(),
      jobTitle: draft.jobTitle.trim(),
      employeeId: draft.employeeId.trim(),
      username: draft.username.trim(),
    };
    const { email: cleanEmail, organization, role, ...profilePatch } = clean;
    actions.save(
      {
        patch: {
          name: [clean.firstName, clean.lastName].filter(Boolean).join(" "),
          email: cleanEmail,
          organization,
          role,
        },
        profilePatch,
      },
      "Identity & Context Updated",
      "Profile saved"
    );
    setDraft(clean);
  };

  const handlePhoto = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      toast.error("Photo must be smaller than 2 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () =>
      actions.save(
        { patch: { avatar: String(reader.result) } },
        "Profile Photo Updated",
        "Photo updated"
      );
    reader.readAsDataURL(file);
  };

  const togglePermission = (key: "dashboard" | "auditLogs", label: string) => {
    const value = !user.profile.permissions[key];
    actions.save(
      { profilePatch: { permissions: { ...user.profile.permissions, [key]: value } } },
      `${label} ${value ? "Granted" : "Revoked"}`,
      `${label} ${value ? "enabled" : "disabled"}`
    );
  };

  const isSuspended = user.status === "Suspended";
  const headline = [user.profile.jobTitle, user.profile.department]
    .filter((v) => v && v !== "—")
    .join(" • ");

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        {/* ── Left column ── */}
        <div className="flex min-w-0 flex-col gap-6">
          <ProfilePanel
            title="Personal Information"
            action={
              <button
                type="button"
                aria-label="Edit personal information"
                onClick={() => firstNameRef.current?.focus()}
                className="cursor-pointer border-0 bg-transparent p-0 text-white/50 hover:text-white"
              >
                <SquarePen className="size-3.5" />
              </button>
            }
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="relative">
                <ManagedUserAvatar
                  user={user}
                  className="size-14 rounded-lg border-2 border-[#eab308] [&_*]:rounded-md"
                />
                <button
                  type="button"
                  aria-label="Change photo"
                  onClick={() => photoRef.current?.click()}
                  className="absolute -bottom-1.5 -right-1.5 flex size-5 cursor-pointer items-center justify-center rounded border-0 bg-[#eab308] text-black"
                >
                  <SquarePen className="size-3" />
                </button>
              </div>
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-white">{user.name}</p>
                {headline && <p className="text-[11px] text-[#6b7280]">{headline}</p>}
                <button
                  type="button"
                  onClick={() => photoRef.current?.click()}
                  className="mt-1 cursor-pointer border-0 bg-transparent p-0 text-[9px] font-bold uppercase tracking-[0.5px] text-[#eab308] hover:underline"
                >
                  Update Photo
                </button>
                <input
                  ref={photoRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    handlePhoto(e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="First Name" error={errors.firstName}>
                <Input
                  ref={firstNameRef}
                  variant="soft"
                  value={draft.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                  error={!!errors.firstName}
                  className={fieldControlClass}
                />
              </Field>
              <Field label="Last Name">{text("lastName")}</Field>
              <Field label="Email Address" error={errors.email}>
                {text("email", "name@company.com")}
              </Field>
              <Field label="Phone Number">{text("phone", "+1 (555) 000-0000")}</Field>
              <Field label="Country">{select("country", COUNTRIES)}</Field>
              <Field label="Time Zone">{select("timeZone", TIME_ZONES)}</Field>
            </div>
          </ProfilePanel>

          <ProfilePanel title="Organization Context">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Organization">
                {select("organization", ORGANIZATIONS, "text-[#eab308]!")}
              </Field>
              <Field label="Department">{select("department", DEPARTMENTS)}</Field>
              <Field label="Team">{text("team", "e.g. Core Architecture Group")}</Field>
              <Field label="Reporting Manager">
                {select("reportingManager", REPORTING_MANAGERS)}
              </Field>
              <Field label="Job Title">{text("jobTitle", "e.g. Principal Architect")}</Field>
              <Field label="Employee ID">{text("employeeId")}</Field>
            </div>
          </ProfilePanel>

          <SubscriptionsPanel
            subscriptions={user.profile.subscriptions}
            onAssign={actions.openAssignProduct}
          />
        </div>

        {/* ── Right column ── */}
        <div className="flex flex-col gap-6">
          <ProfilePanel title="Account Protocol">
            <div className="flex flex-col gap-5">
              <Field label="Username" error={errors.username}>
                {text("username")}
              </Field>
              <Field label="Primary Role">
                <Select
                  variant="soft"
                  options={USER_ROLES.map((r) => ({ label: ROLE_DISPLAY_NAME[r], value: r }))}
                  value={draft.role}
                  onChange={(v) => v && set("role", v as UserRole)}
                  className={fieldControlClass}
                  rightIcon={chevron}
                />
              </Field>
              <div className="flex flex-col gap-3 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#9ca3af]">Email Verification</span>
                  {user.verification === "Verified" ? (
                    <span className="inline-flex items-center gap-1 font-bold uppercase text-[#10b981]">
                      <Check className="size-3" /> Verified
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        actions.save(
                          {
                            patch: {
                              verification: "Verified",
                              subtitle:
                                user.subtitle === "Unverified Account"
                                  ? "Verified User"
                                  : user.subtitle,
                            },
                          },
                          "Email Manually Verified",
                          "Email marked as verified"
                        )
                      }
                      className="cursor-pointer border-0 bg-transparent p-0 font-bold uppercase text-[#f59e0b] hover:underline"
                    >
                      Unverified · Verify
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9ca3af]">MFA Security Status</span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 font-bold uppercase",
                      user.profile.mfaEnabled ? "text-[#10b981]" : "text-[#ef4444]"
                    )}
                  >
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        user.profile.mfaEnabled ? "bg-[#10b981]" : "bg-[#ef4444]"
                      )}
                    />
                    {user.profile.mfaEnabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>
            </div>
          </ProfilePanel>

          <ProfilePanel title="Control">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs text-[#d1d5db]">
                Dashboard Access
                <Switch
                  aria-label="Dashboard access"
                  checked={user.profile.permissions.dashboard}
                  onCheckedChange={() => togglePermission("dashboard", "Dashboard Access")}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-[#d1d5db]">
                Audit Logs View
                <Switch
                  aria-label="Audit logs view"
                  checked={user.profile.permissions.auditLogs}
                  onCheckedChange={() => togglePermission("auditLogs", "Audit Logs View")}
                />
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="h-9 rounded-md border-[#333] bg-[#1a1a1a] text-[10px] font-bold uppercase tracking-[0.5px] text-white"
                title="Update Permissions"
                onClick={() => actions.goToTab("access")}
              />
            </div>
          </ProfilePanel>

          <div className="flex flex-col gap-3">
            <Button
              variant="secondary"
              size="sm"
              className={cn(
                "h-10 rounded-md text-[10px] font-bold uppercase tracking-[0.5px]",
                isSuspended
                  ? "border-[#10b981]/30 bg-[#10b981]/10 text-[#10b981] hover:bg-[#10b981]/15"
                  : "border-[#ef4444]/30 bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444]/15"
              )}
              leftIcon={
                isSuspended ? <RotateCcw className="size-3.5" /> : <Ban className="size-3.5" />
              }
              title={isSuspended ? "Reactivate Account" : "Suspend Account"}
              onClick={actions.requestSuspendToggle}
            />
            <Button
              variant="secondary"
              size="sm"
              className="h-10 rounded-md border-[#222] bg-[#111] text-[10px] font-bold uppercase tracking-[0.5px] text-[#9ca3af]"
              title="Reset Security Keys"
              onClick={actions.requestResetKeys}
            />
          </div>
        </div>
      </div>

      <ProfilePanel
        title="User Activity Audit Log"
        bodyClassName="p-0"
        action={
          <button
            type="button"
            onClick={() => actions.goToTab("security")}
            className="cursor-pointer border-0 bg-transparent p-0 text-[10px] font-bold uppercase tracking-[0.5px] text-[#eab308] hover:underline"
          >
            View All
          </button>
        }
      >
        <AuditLogTable entries={user.profile.audit.slice(0, 3)} />
      </ProfilePanel>

      {isDirty && (
        <div className="sticky bottom-4 z-20 flex flex-col gap-3 rounded-xl border border-[#eab308]/30 bg-[#111]/95 px-5 py-3 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/80">You have unsaved changes.</p>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 border-0 font-medium normal-case tracking-normal"
              title="Discard"
              onClick={() => {
                setDraft(draftFrom(user));
                setErrors({});
              }}
            />
            <Button
              variant="primary"
              size="sm"
              className="h-9 rounded-lg px-5 font-medium normal-case"
              title="Save Changes"
              onClick={handleSave}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default IdentityTab;
