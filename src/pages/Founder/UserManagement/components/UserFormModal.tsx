import { useEffect, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { Label } from "@/ui/Label";
import ModalShell from "./ModalShell";
import {
  ORGANIZATIONS,
  USER_ROLES,
  USER_STATUSES,
  VERIFICATION_STATES,
  type ManagedUser,
  type UserFormValues,
  type UserRole,
  type UserStatus,
  type VerificationState,
} from "../data";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const labelClass =
  "text-[10px] font-bold uppercase leading-[15px] tracking-[0.5px] text-[#888]";
const controlClass =
  "rounded-lg! border-[#222]! bg-[#0d0d0d]! px-4! text-sm text-white";
const chevron = <ChevronDown className="size-4 shrink-0 text-white/60" />;

type Errors = Partial<Record<"name" | "email", string>>;

type UserFormModalProps = {
  open: boolean;
  mode: "invite" | "edit";
  user?: ManagedUser | null;
  existingEmails: string[];
  onClose: () => void;
  onSubmit: (values: UserFormValues) => void;
};

const emptyValues: UserFormValues = {
  name: "",
  email: "",
  role: "Consumer",
  organization: ORGANIZATIONS[0],
};

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
    <Label className={labelClass}>{label}</Label>
    {children}
    {error && <p className="text-xs text-[#ef4444]">{error}</p>}
  </div>
);

const UserFormModal = ({
  open,
  mode,
  user,
  existingEmails,
  onClose,
  onSubmit,
}: UserFormModalProps) => {
  const [values, setValues] = useState<UserFormValues>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setValues(
      mode === "edit" && user
        ? {
            name: user.name,
            email: user.email,
            role: user.role,
            organization: user.organization,
            status: user.status,
            verification: user.verification,
          }
        : emptyValues
    );
  }, [open, mode, user]);

  const set = <K extends keyof UserFormValues>(key: K, v: UserFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    if (key === "name" || key === "email") {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSubmit = () => {
    const next: Errors = {};
    const email = values.email.trim().toLowerCase();
    if (!values.name.trim()) next.name = "Full name is required";
    if (!email) next.email = "Email is required";
    else if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address";
    else if (
      existingEmails.includes(email) &&
      email !== user?.email.toLowerCase()
    )
      next.email = "A user with this email already exists";

    setErrors(next);
    if (Object.keys(next).length) return;

    onSubmit({ ...values, name: values.name.trim(), email });
  };

  const isEdit = mode === "edit";

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit User" : "Invite User"}
      description={
        isEdit
          ? "Update profile, role and access for this user."
          : "Send an invitation to join the FAR Platform Engine™."
      }
      footer={
        <>
          <Button
            variant="ghost"
            size="md"
            className="normal-case tracking-normal border-0 font-medium"
            title="Cancel"
            onClick={onClose}
          />
          <Button
            variant="primary"
            size="md"
            className="rounded-lg px-6 font-medium"
            title={isEdit ? "Save Changes" : "Send Invite"}
            onClick={handleSubmit}
          />
        </>
      }
    >
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Field label="Full Name" error={errors.name}>
          <Input
            variant="soft"
            autoFocus
            placeholder="e.g. Jordan Hayes"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            error={!!errors.name}
            className={`h-11! ${controlClass}`}
          />
        </Field>
        <Field label="Email Address" error={errors.email}>
          <Input
            variant="soft"
            type="email"
            placeholder="name@company.com"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            error={!!errors.email}
            className={`h-11! ${controlClass}`}
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Role">
            <Select
              variant="soft"
              options={[...USER_ROLES]}
              value={values.role}
              onChange={(v) => set("role", v as UserRole)}
              className={controlClass}
              rightIcon={chevron}
            />
          </Field>
          <Field label="Organization">
            <Select
              variant="soft"
              searchable
              options={ORGANIZATIONS}
              value={values.organization}
              onChange={(v) => set("organization", v || ORGANIZATIONS[0])}
              className={controlClass}
              rightIcon={chevron}
            />
          </Field>
        </div>
        {isEdit && (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Status">
              <Select
                variant="soft"
                options={[...USER_STATUSES]}
                value={values.status}
                onChange={(v) => set("status", v as UserStatus)}
                className={controlClass}
                rightIcon={chevron}
              />
            </Field>
            <Field label="Verification">
              <Select
                variant="soft"
                options={[...VERIFICATION_STATES]}
                value={values.verification}
                onChange={(v) => set("verification", v as VerificationState)}
                className={controlClass}
                rightIcon={chevron}
              />
            </Field>
          </div>
        )}
        <button type="submit" hidden />
      </form>
    </ModalShell>
  );
};

export default UserFormModal;
