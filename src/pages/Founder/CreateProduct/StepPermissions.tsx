import { cn } from "@/lib/utils";
import {
    type ProductDraft,
    type PermissionKey,
    type RolePermission,
} from "./data";

type StepProps = {
    draft: ProductDraft;
    setDraft: (patch: Partial<ProductDraft>) => void;
};

const PERMISSION_COLUMNS: { key: PermissionKey; label: string }[] = [
    { key: "editing", label: "EDITING" },
    { key: "dashboard", label: "DASHBOARD" },
    { key: "reports", label: "REPORTS" },
    { key: "analytics", label: "ANALYTICS" },
];

const MiniToggle = ({
    on,
    onToggle,
}: {
    on: boolean;
    onToggle: () => void;
}) => (
    <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={onToggle}
        className={cn(
            "relative h-5 w-9 shrink-0 rounded-full border-0 cursor-pointer",
            on ? "bg-[#fbbf24]" : "bg-white/10"
        )}
    >
        <span
            className={cn(
                "absolute top-[3px] size-3.5 rounded-full transition-transform",
                on ? "left-[18px] bg-black" : "left-1 bg-white/60"
            )}
        />
    </button>
);

export const StepPermissions = ({ draft, setDraft }: StepProps) => {
    const roles = draft.rolePermissions ?? [];

    const togglePermission = (roleId: string, key: PermissionKey) => {
        setDraft({
            rolePermissions: roles.map((role) =>
                role.id === roleId
                    ? {
                        ...role,
                        permissions: {
                            ...role.permissions,
                            [key]: !role.permissions[key],
                        },
                    }
                    : role
            ),
        });
    };

    return (
        <div className="space-y-5">
            <section className="space-y-4 rounded-xl border border-white/10 bg-white/[0.05] p-5">
                <p className="text-sm font-bold tracking-[0.35px] text-white">
                    Role Access Control
                </p>

                {/* Column headers */}
                <div className="grid grid-cols-[1fr_repeat(4,72px)] items-center gap-2 px-1">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.6px] text-white/40">
                        Role
                    </span>
                    {PERMISSION_COLUMNS.map((col) => (
                        <span
                            key={col.key}
                            className="text-center text-[11px] font-semibold uppercase tracking-[0.6px] text-white/40"
                        >
                            {col.label}
                        </span>
                    ))}
                </div>

                {/* Role rows */}
                <div className="space-y-2">
                    {roles.map((role) => (
                        <div
                            key={role.id}
                            className={cn(
                                "grid grid-cols-[1fr_repeat(4,72px)] items-center gap-2 rounded-xl border px-3 py-3",
                                role.highlighted
                                    ? "border-[#fbbf24]/40 bg-[#fbbf24]/[0.06]"
                                    : "border-white/10 bg-white/[0.03]"
                            )}
                        >
                            {/* Role info */}
                            <div className="flex items-center gap-3 min-w-0">
                                <span
                                    className={cn(
                                        "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                                        role.avatarColor
                                    )}
                                >
                                    {role.avatarLetter}
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate text-[13px] font-semibold text-white">
                                        {role.name}
                                    </p>
                                    <p className="truncate text-xs text-white/50">
                                        {role.description}
                                    </p>
                                </div>
                            </div>

                            {/* Permission toggles */}
                            {PERMISSION_COLUMNS.map((col) => (
                                <div key={col.key} className="flex justify-center">
                                    <MiniToggle
                                        on={role.permissions[col.key]}
                                        onToggle={() => togglePermission(role.id, col.key)}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default StepPermissions;