import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/ui/Button";
import Select from "@/ui/Select";
import Switch from "@/ui/Switch";
import { cn } from "@/lib/utils";
import ProfilePanel from "../components/ProfilePanel";
import type { ProfileTabProps } from "../types";
import {
  PERMISSIONS,
  ROLE_DESCRIPTION,
  ROLE_DISPLAY_NAME,
  USER_ROLES,
  defaultPermissionsFor,
  type PermissionMap,
  type UserRole,
} from "../../data";

const samePermissions = (a: PermissionMap, b: PermissionMap) =>
  PERMISSIONS.every((p) => a[p.key] === b[p.key]);

const AccessTab = ({ user, actions }: ProfileTabProps) => {
  const [role, setRole] = useState<UserRole>(user.role);
  const [permissions, setPermissions] = useState<PermissionMap>(user.profile.permissions);

  const isDirty = role !== user.role || !samePermissions(permissions, user.profile.permissions);
  const isDefault = samePermissions(permissions, defaultPermissionsFor(role));

  const changeRole = (next: UserRole) => {
    setRole(next);
    setPermissions(defaultPermissionsFor(next));
  };

  const save = () => {
    const granted = PERMISSIONS.filter((p) => permissions[p.key]).length;
    actions.save(
      { patch: { role }, profilePatch: { permissions } },
      role !== user.role
        ? `Role Changed to ${ROLE_DISPLAY_NAME[role]}`
        : `Access Permissions Updated (${granted}/${PERMISSIONS.length})`,
      "Access settings saved"
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <ProfilePanel title="Role-Based Access Level™">
        <div className="relative max-w-sm">
          <span className="pointer-events-none absolute left-4 top-1/2 z-10 size-1.5 -translate-y-1/2 rounded-full bg-[#eab308]" />
          <Select
            variant="soft"
            options={USER_ROLES.map((r) => ({ label: ROLE_DISPLAY_NAME[r], value: r }))}
            value={role}
            onChange={(v) => v && changeRole(v as UserRole)}
            className="h-11! rounded-md! border-[#222]! bg-black! pl-9! pr-4! text-sm font-semibold text-white"
            rightIcon={<ChevronDown className="size-4 shrink-0 text-white/60" />}
          />
        </div>
        <p className="mt-3 text-[11px] text-[#6b7280]">{ROLE_DESCRIPTION[role]}</p>
      </ProfilePanel>

      <ProfilePanel title="System Access Control™">
        <div className="grid gap-3 md:grid-cols-2">
          {PERMISSIONS.map((p) => {
            const on = permissions[p.key];
            return (
              <label
                key={p.key}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-4 rounded-lg border bg-black px-4 py-3.5 transition-colors",
                  on ? "border-[#222]" : "border-[#1a1a1a] opacity-80"
                )}
              >
                <span className="min-w-0">
                  <span className="block text-xs font-semibold text-white">{p.label}</span>
                  <span className="mt-0.5 block text-[10px] text-[#6b7280]">
                    {p.description}
                  </span>
                </span>
                <Switch
                  aria-label={p.label}
                  checked={on}
                  onCheckedChange={(v) => setPermissions((prev) => ({ ...prev, [p.key]: v }))}
                />
              </label>
            );
          })}
        </div>
      </ProfilePanel>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <Button
          variant="secondary"
          size="md"
          className="h-10 rounded-md border-[#333] bg-black px-5 text-[11px] font-bold uppercase tracking-[0.5px] text-white"
          title="Reset to Default"
          disabled={isDefault}
          onClick={() => setPermissions(defaultPermissionsFor(role))}
        />
        <Button
          variant="primary"
          size="md"
          className="h-10 rounded-md px-6 text-[11px] font-bold uppercase tracking-[0.5px]"
          title="Save Changes"
          disabled={!isDirty}
          onClick={save}
        />
      </div>
    </div>
  );
};

export default AccessTab;
