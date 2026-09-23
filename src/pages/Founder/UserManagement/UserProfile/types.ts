import type { AuditKind, ManagedUser, UserProfile } from "../data";

export const PROFILE_TABS = [
  { id: "identity", label: "Identity & Context" },
  { id: "products", label: "Products & Assets" },
  { id: "access", label: "Access & Toggles" },
  { id: "security", label: "Security & Audit" },
] as const;

export type ProfileTab = (typeof PROFILE_TABS)[number]["id"];

export type ProfileActions = {
  save: (
    changes: {
      patch?: Partial<Omit<ManagedUser, "profile" | "id">>;
      profilePatch?: Partial<UserProfile>;
    },
    auditAction: string,
    successMessage?: string
  ) => void;
  log: (action: string, kind?: AuditKind) => void;
  goToTab: (tab: ProfileTab) => void;
  requestSuspendToggle: () => void;
  requestResetKeys: () => void;
  requestForcePasswordReset: () => void;
  openAssignProduct: () => void;
  openAssignAsset: () => void;
};

export type ProfileTabProps = {
  user: ManagedUser;
  actions: ProfileActions;
};
