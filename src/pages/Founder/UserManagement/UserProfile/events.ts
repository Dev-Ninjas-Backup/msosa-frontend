export const USER_PROFILE_MESSAGE_EVENT = "founder:user-profile:message";
export const USER_PROFILE_QUICK_ACTION_EVENT = "founder:user-profile:quick-action";

export const USER_PROFILE_QUICK_ACTIONS = [
  { id: "edit-identity", label: "Edit Identity & Context" },
  { id: "manage-access", label: "Manage Access & Toggles" },
  { id: "assign-product", label: "Assign Product" },
  { id: "reset-keys", label: "Reset Security Keys" },
  { id: "force-password-reset", label: "Force Password Reset" },
  { id: "toggle-suspend", label: "Suspend / Reactivate Account" },
] as const;

export type UserProfileQuickAction = (typeof USER_PROFILE_QUICK_ACTIONS)[number]["id"];
