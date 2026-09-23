import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, UserX } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import ConfirmModal from "@/components/reuseable/ConfirmModal";
import Button from "@/ui/Button";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  logUserActivity,
  updateUser,
} from "@/store/features/FounderUsers/founderUsersSlice";
import AssignAssetModal, { type NewAsset } from "./components/AssignAssetModal";
import AssignProductModal from "./components/AssignProductModal";
import MessageUserModal from "./components/MessageUserModal";
import AccessTab from "./tabs/AccessTab";
import IdentityTab from "./tabs/IdentityTab";
import ProductsTab from "./tabs/ProductsTab";
import SecurityTab from "./tabs/SecurityTab";
import {
  USER_PROFILE_MESSAGE_EVENT,
  USER_PROFILE_QUICK_ACTION_EVENT,
  type UserProfileQuickAction,
} from "./events";
import { PROFILE_TABS, type ProfileActions, type ProfileTab } from "./types";
import { createId, type AuditKind } from "../data";

type PendingConfirm = "suspend" | "reset-keys" | "force-password-reset" | null;

const isProfileTab = (v: string | null): v is ProfileTab =>
  PROFILE_TABS.some((t) => t.id === v);

const randomKeySuffix = () => Math.random().toString(36).slice(2, 6).toUpperCase();

const UserProfile = () => {
  const { userId = "" } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector((s) => s.founderUsers.users);
  const user = users.find((u) => u.id === userId);

  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const tab: ProfileTab = isProfileTab(tabParam) ? tabParam : "identity";

  const [messageOpen, setMessageOpen] = useState(false);
  const [assignProductOpen, setAssignProductOpen] = useState(false);
  const [assignAssetOpen, setAssignAssetOpen] = useState(false);
  const [pendingConfirm, setPendingConfirm] = useState<PendingConfirm>(null);

  const existingEmails = useMemo(
    () => users.map((u) => u.email.toLowerCase()),
    [users]
  );

  const goToTab = useCallback(
    (next: ProfileTab) =>
      setSearchParams(next === "identity" ? {} : { tab: next }, { replace: true }),
    [setSearchParams]
  );

  const actions: ProfileActions | null = useMemo(() => {
    if (!user) return null;
    return {
      save: ({ patch = {}, profilePatch }, auditAction, successMessage) => {
        dispatch(
          updateUser({ id: user.id, patch, profilePatch, audit: { action: auditAction } })
        );
        if (successMessage) toast.success(successMessage);
      },
      log: (action: string, kind: AuditKind = "admin") =>
        dispatch(logUserActivity({ id: user.id, action, kind })),
      goToTab,
      requestSuspendToggle: () => {
        if (user.status === "Suspended") {
          dispatch(
            updateUser({
              id: user.id,
              patch: { status: "Active" },
              audit: { action: "Account Reactivated by Founder" },
            })
          );
          toast.success(`${user.name} reactivated`);
        } else {
          setPendingConfirm("suspend");
        }
      },
      requestResetKeys: () => setPendingConfirm("reset-keys"),
      requestForcePasswordReset: () => setPendingConfirm("force-password-reset"),
      openAssignProduct: () => setAssignProductOpen(true),
      openAssignAsset: () => setAssignAssetOpen(true),
    };
  }, [user, dispatch, goToTab]);

  useEffect(() => {
    if (!actions) return;
    const onMessage = () => setMessageOpen(true);
    const onQuickAction = (e: Event) => {
      const action = (e as CustomEvent<UserProfileQuickAction>).detail;
      switch (action) {
        case "edit-identity":
          goToTab("identity");
          break;
        case "manage-access":
          goToTab("access");
          break;
        case "assign-product":
          actions.openAssignProduct();
          break;
        case "reset-keys":
          actions.requestResetKeys();
          break;
        case "force-password-reset":
          actions.requestForcePasswordReset();
          break;
        case "toggle-suspend":
          actions.requestSuspendToggle();
          break;
      }
    };
    window.addEventListener(USER_PROFILE_MESSAGE_EVENT, onMessage);
    window.addEventListener(USER_PROFILE_QUICK_ACTION_EVENT, onQuickAction);
    return () => {
      window.removeEventListener(USER_PROFILE_MESSAGE_EVENT, onMessage);
      window.removeEventListener(USER_PROFILE_QUICK_ACTION_EVENT, onQuickAction);
    };
  }, [actions, goToTab]);

  if (!user || !actions) {
    return (
      <AnimatedContainer className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-white/5 text-white/40">
          <UserX className="size-6" />
        </span>
        <div>
          <p className="text-lg font-semibold text-white">User not found</p>
          <p className="mt-1 text-sm text-white/50">
            No user with ID <span className="font-mono">{userId}</span> exists.
          </p>
        </div>
        <Button
          variant="secondary"
          size="md"
          leftIcon={<ArrowLeft className="size-4" />}
          title="Back to User Management"
          onClick={() => navigate("/founder/user-management")}
        />
      </AnimatedContainer>
    );
  }

  const confirmCopy = {
    suspend: {
      title: `Suspend ${user.name}?`,
      description:
        "They will lose access to the FAR Platform immediately. You can reactivate them at any time.",
      confirmText: "Suspend Account",
      variant: "danger" as const,
    },
    "reset-keys": {
      title: "Reset security keys?",
      description:
        "All API keys issued to this user will be rotated. Integrations using the old keys will stop working.",
      confirmText: "Reset Keys",
      variant: "warning" as const,
    },
    "force-password-reset": {
      title: "Force a password reset?",
      description:
        "The user will be signed out of every session and must set a new password on next login.",
      confirmText: "Force Reset",
      variant: "danger" as const,
    },
  };

  const handleConfirm = () => {
    if (pendingConfirm === "suspend") {
      dispatch(
        updateUser({
          id: user.id,
          patch: { status: "Suspended" },
          audit: { action: "Account Suspended by Founder", kind: "security" },
        })
      );
      toast.success(`${user.name} suspended`);
    } else if (pendingConfirm === "reset-keys") {
      dispatch(
        updateUser({
          id: user.id,
          patch: {},
          profilePatch: {
            assets: user.profile.assets.map((a) =>
              a.kind === "API Key"
                ? { ...a, resourceId: `AK-${randomKeySuffix()}-${randomKeySuffix()}` }
                : a
            ),
          },
          audit: { action: "Security Keys Rotated", kind: "security" },
        })
      );
      toast.success("Security keys rotated");
    } else if (pendingConfirm === "force-password-reset") {
      dispatch(
        updateUser({
          id: user.id,
          patch: {},
          profilePatch: {
            session: { device: "Signed out", browser: "—", location: "—", ip: "—" },
          },
          audit: { action: "Password Reset Forced", kind: "security" },
        })
      );
      toast.success(`Password reset link sent to ${user.email}`);
    }
    setPendingConfirm(null);
  };

  const handleAssignProduct = (product: string, expiresAt: string) => {
    dispatch(
      updateUser({
        id: user.id,
        patch: {},
        profilePatch: {
          subscriptions: [
            ...user.profile.subscriptions,
            { id: createId("sub"), product, expiresAt, status: "Active" },
          ],
        },
        audit: { action: `Product Assigned: ${product}`, kind: "purchase" },
      })
    );
    toast.success(`${product} assigned`);
    setAssignProductOpen(false);
  };

  const handleAssignAsset = ({ name, kind, accessLevel }: NewAsset) => {
    const prefix = { "API Key": "AK", Storage: "SV", Compute: "CC", License: "LIC" }[kind];
    dispatch(
      updateUser({
        id: user.id,
        patch: {},
        profilePatch: {
          assets: [
            ...user.profile.assets,
            {
              id: createId("as"),
              name,
              kind,
              accessLevel,
              resourceId: `${prefix}-${randomKeySuffix()}-${randomKeySuffix()}`,
              assignedAt: new Date().toISOString().slice(0, 10),
              status: kind === "Storage" ? "Allocated" : kind === "API Key" ? "Valid" : "Active",
            },
          ],
        },
        audit: { action: `Asset Assigned: ${name}` },
      })
    );
    toast.success(`${name} assigned`);
    setAssignAssetOpen(false);
  };

  const tabProps = { user, actions };
  const confirm = pendingConfirm ? confirmCopy[pendingConfirm] : null;

  return (
    <AnimatedContainer className="flex flex-col gap-6 pb-8">
      <nav
        role="tablist"
        aria-label="User profile sections"
        className="-mt-2 flex gap-6 overflow-x-auto border-b border-white/10"
      >
        {PROFILE_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => goToTab(t.id)}
            className={cn(
              "-mb-px cursor-pointer whitespace-nowrap border-0 border-b-2 bg-transparent px-0 pb-3 pt-1 text-xs font-medium transition-colors",
              tab === t.id
                ? "border-[#eab308] text-[#eab308]"
                : "border-transparent text-[#9ca3af] hover:text-white"
            )}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div key={`${user.id}-${tab}`} role="tabpanel">
        {tab === "identity" && <IdentityTab {...tabProps} existingEmails={existingEmails} />}
        {tab === "products" && <ProductsTab {...tabProps} />}
        {tab === "access" && <AccessTab {...tabProps} />}
        {tab === "security" && <SecurityTab {...tabProps} />}
      </div>

      <MessageUserModal
        open={messageOpen}
        recipient={user.name}
        onClose={() => setMessageOpen(false)}
        onSend={(subject) => {
          actions.log(`Message Sent: ${subject}`);
          toast.success(`Message sent to ${user.name}`);
          setMessageOpen(false);
        }}
      />
      <AssignProductModal
        open={assignProductOpen}
        assigned={user.profile.subscriptions}
        onClose={() => setAssignProductOpen(false)}
        onAssign={handleAssignProduct}
      />
      <AssignAssetModal
        open={assignAssetOpen}
        onClose={() => setAssignAssetOpen(false)}
        onAssign={handleAssignAsset}
      />
      <ConfirmModal
        isOpen={!!confirm}
        onClose={() => setPendingConfirm(null)}
        onConfirm={handleConfirm}
        variant={confirm?.variant ?? "info"}
        title={confirm?.title ?? ""}
        description={confirm?.description ?? ""}
        confirmText={confirm?.confirmText}
      />
    </AnimatedContainer>
  );
};

export default UserProfile;
