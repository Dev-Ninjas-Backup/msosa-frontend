import { useCallback, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowUp,
  Check,
  ChevronDown,
  Eye,
  Search,
  SlidersHorizontal,
  SquarePen,
  UserPlus,
  Users,
  UserX,
  X,
} from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { addUser, updateUser } from "@/store/features/FounderUsers/founderUsersSlice";
import FilterChip from "@/pages/Founder/_shared/FilterChip";
import ManagedUserAvatar from "./components/ManagedUserAvatar";
import UserFormModal from "./components/UserFormModal";
import {
  INITIAL_USERS,
  ORGANIZATIONS,
  PLATFORM_TOTALS,
  REGISTRATION_PERIODS,
  USER_ROLES,
  USER_STATUSES,
  VERIFICATION_STATES,
  buildProfile,
  formatRegDate,
  matchesPeriod,
  nextUserId,
  roleBadgeClass,
  statusColorClass,
  userProfilePath,
  type ManagedUser,
  type RegistrationPeriod,
  type UserFormValues,
} from "./data";

const ROLE_FILTERS = ["All", ...USER_ROLES] as const;
const STATUS_FILTERS = ["All", ...USER_STATUSES] as const;
const VERIFICATION_FILTERS = ["All", ...VERIFICATION_STATES] as const;
const ORG_FILTERS = ["All Organizations", ...ORGANIZATIONS];

type RoleFilter = (typeof ROLE_FILTERS)[number];
type StatusFilter = (typeof STATUS_FILTERS)[number];
type VerificationFilter = (typeof VERIFICATION_FILTERS)[number];

const formatCount = (n: number) => n.toLocaleString("en-US");

const formatCompact = (n: number) =>
  n >= 10000 ? `${(n / 1000).toFixed(1)}k` : formatCount(n);

const countBy = (list: ManagedUser[], pred: (u: ManagedUser) => boolean) =>
  list.filter(pred).length;

// ── Stat cards ──────────────────────────────────────────────────────────────

const KpiCard = ({
  label,
  value,
  icon,
  hint,
}: {
  label: string;
  value: string;
  icon: ReactNode;
  hint: ReactNode;
}) => (
  <div className="flex min-w-0 flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6">
    <div className="flex items-start justify-between gap-2">
      <p className="text-[10px] font-bold uppercase leading-[15px] tracking-[1px] text-[#6b7280]">
        {label}
      </p>
      {icon}
    </div>
    <p className="text-[30px] font-bold leading-[45px] text-white tabular-nums">
      {value}
    </p>
    <div className="flex items-center gap-1 text-[11px] leading-[16.5px]">{hint}</div>
  </div>
);

const CountCard = ({
  label,
  value,
  valueClass = "text-white",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) => (
  <div className="flex min-w-0 flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-4 text-center">
    <p className="text-[9px] font-bold uppercase leading-[13.5px] text-[#6b7280]">
      {label}
    </p>
    <p className={cn("text-lg font-bold leading-[27px] tabular-nums", valueClass)}>
      {value}
    </p>
  </div>
);

const RowAction = ({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    onClick={onClick}
    className="flex size-8 cursor-pointer items-center justify-center rounded-lg border-0 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
  >
    {children}
  </button>
);

// ── Page ────────────────────────────────────────────────────────────────────

const UserManagement = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector((s) => s.founderUsers.users);

  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Active");
  const [verificationFilter, setVerificationFilter] =
    useState<VerificationFilter>("All");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [orgFilter, setOrgFilter] = useState(ORG_FILTERS[0]);
  const [periodFilter, setPeriodFilter] = useState<RegistrationPeriod>("Any Time");

  const [formMode, setFormMode] = useState<"invite" | "edit" | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const editingUser = users.find((u) => u.id === editingId) ?? null;

  const stats = useMemo(() => {
    const delta = (pred: (u: ManagedUser) => boolean) =>
      countBy(users, pred) - countBy(INITIAL_USERS, pred);
    const total = PLATFORM_TOTALS.total + (users.length - INITIAL_USERS.length);
    const active = PLATFORM_TOTALS.active + delta((u) => u.status === "Active");
    return {
      total,
      active,
      engagement: ((active / total) * 100).toFixed(1),
      suspended: PLATFORM_TOTALS.suspended + delta((u) => u.status === "Suspended"),
      newLast30:
        PLATFORM_TOTALS.newLast30 +
        delta((u) => matchesPeriod(u.registeredAt, "Last 30 Days")),
      consumers: PLATFORM_TOTALS.consumers + delta((u) => u.role === "Consumer"),
      employees: PLATFORM_TOTALS.employees + delta((u) => u.role === "Employee"),
      activeEnterprise: PLATFORM_TOTALS.activeEnterprise,
      invites: PLATFORM_TOTALS.invites + delta((u) => u.status === "Invited"),
      verified:
        PLATFORM_TOTALS.verified + delta((u) => u.verification === "Verified"),
    };
  }, [users]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      const matchQ =
        !q ||
        [u.name, u.email, u.organization, u.id].some((f) =>
          f.toLowerCase().includes(q)
        );
      return (
        matchQ &&
        (roleFilter === "All" || u.role === roleFilter) &&
        (statusFilter === "All" || u.status === statusFilter) &&
        (verificationFilter === "All" || u.verification === verificationFilter) &&
        (orgFilter === ORG_FILTERS[0] || u.organization === orgFilter) &&
        matchesPeriod(u.registeredAt, periodFilter)
      );
    });
  }, [users, query, roleFilter, statusFilter, verificationFilter, orgFilter, periodFilter]);

  const hasActiveFilters =
    !!query ||
    roleFilter !== "All" ||
    statusFilter !== "All" ||
    verificationFilter !== "All" ||
    orgFilter !== ORG_FILTERS[0] ||
    periodFilter !== "Any Time";

  const clearFilters = () => {
    setQuery("");
    setRoleFilter("All");
    setStatusFilter("All");
    setVerificationFilter("All");
    setOrgFilter(ORG_FILTERS[0]);
    setPeriodFilter("Any Time");
  };

  const openInvite = () => {
    setEditingId(null);
    setFormMode("invite");
  };

  const openEdit = (user: ManagedUser) => {
    setEditingId(user.id);
    setFormMode("edit");
  };

  const closeForm = useCallback(() => {
    setFormMode(null);
    setEditingId(null);
  }, []);

  const handleFormSubmit = (values: UserFormValues) => {
    if (formMode === "edit" && editingUser) {
      const [firstName = "", ...rest] = values.name.split(/\s+/);
      dispatch(
        updateUser({
          id: editingUser.id,
          patch: {
            ...values,
            subtitle:
              values.verification === "Unverified"
                ? "Unverified Account"
                : editingUser.subtitle === "Unverified Account"
                  ? "Verified User"
                  : editingUser.subtitle,
          },
          profilePatch: { firstName, lastName: rest.join(" ") },
          audit: { action: "Profile Updated by Founder" },
        })
      );
      toast.success(`${values.name} updated`);
    } else {
      const id = nextUserId(users);
      dispatch(
        addUser({
          id,
          name: values.name,
          subtitle: "Pending Invitation",
          email: values.email,
          role: values.role,
          organization: values.organization,
          status: "Invited",
          verification: "Unverified",
          registeredAt: new Date().toISOString().slice(0, 10),
          lastActive: "Never",
          profile: buildProfile({ ...values, id }),
        })
      );
      if (statusFilter !== "All" && statusFilter !== "Invited") setStatusFilter("All");
      toast.success(`Invitation sent to ${values.email}`);
    }
    closeForm();
  };

  const selectClass =
    "h-10! rounded-lg! border-white/10! bg-black/40! px-4! text-sm text-white";
  const chevron = <ChevronDown className="size-4 shrink-0 text-white/60" />;

  return (
    <AnimatedContainer className="flex flex-col gap-8 pb-8">
      <div className="flex justify-end">
        <Button
          variant="primary"
          size="md"
          className="h-[42px] rounded-lg bg-[#eab308] px-5 text-sm font-medium text-black shadow-[0_0_15px_rgba(234,179,8,0.2)] hover:bg-[#eab308]/90"
          leftIcon={<UserPlus className="size-4" />}
          title="Invite User"
          onClick={openInvite}
        />
      </div>

      {/* ── KPI cards ── */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total Users"
          value={formatCount(stats.total)}
          icon={<Users className="size-5 text-[#3b82f6]" />}
          hint={
            <>
              <Check className="size-3 text-[#10b981]" />
              <span className="text-[#10b981]">+3.2% vs last month</span>
            </>
          }
        />
        <KpiCard
          label="Active Now"
          value={formatCount(stats.active)}
          icon={<span className="mt-1 size-2 rounded-full bg-[#10b981]" />}
          hint={
            <span className="text-[#6b7280]">
              {stats.engagement}% platform engagement
            </span>
          }
        />
        <KpiCard
          label="Suspended"
          value={formatCount(stats.suspended)}
          icon={<UserX className="size-5 text-[#ef4444]" />}
          hint={
            <>
              <AlertTriangle className="size-2.5 text-[#f87171]" />
              <span className="text-[#f87171]">Requires Review</span>
            </>
          }
        />
        <KpiCard
          label="New (30d)"
          value={formatCount(stats.newLast30)}
          icon={<UserPlus className="size-5 text-[#eab308]" />}
          hint={
            <>
              <ArrowUp className="size-3 text-[#22d3ee]" />
              <span className="text-[#22d3ee]">Trending Higher</span>
            </>
          }
        />
      </div>

      {/* ── Segment counts ── */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        <CountCard label="Consumers" value={formatCount(stats.consumers)} />
        <CountCard label="Employees" value={formatCount(stats.employees)} />
        <CountCard
          label="Active Enterprise"
          value={formatCount(stats.activeEnterprise)}
        />
        <CountCard
          label="Invites"
          value={formatCount(stats.invites)}
          valueClass="text-[#22d3ee]"
        />
        <CountCard
          label="Verified"
          value={formatCompact(stats.verified)}
          valueClass="text-[#10b981]"
        />
        <CountCard
          label="Suspended"
          value={formatCount(stats.suspended)}
          valueClass="text-[#ef4444]"
        />
      </div>

      {/* ── Users table ── */}
      <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
        <div className="flex flex-col gap-3 border-b border-white/10 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Input
              variant="soft"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, organization, or ID..."
              leftIcon={<Search className="size-3.5 text-[#6b7280]" />}
              containerClassName="flex-1"
              className="h-[42px]! rounded-lg! border-white/10! bg-black/40! pl-11! text-sm text-white placeholder:text-[#4b5563]"
            />
            <div className="flex flex-wrap items-center gap-2">
              <FilterChip
                label="Role"
                value={roleFilter}
                options={ROLE_FILTERS}
                onChange={setRoleFilter}
              />
              <FilterChip
                label="Status"
                value={statusFilter}
                options={STATUS_FILTERS}
                onChange={setStatusFilter}
              />
              <FilterChip
                label="Verification"
                value={verificationFilter}
                options={VERIFICATION_FILTERS}
                onChange={setVerificationFilter}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            aria-expanded={showAdvanced}
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 self-start rounded-lg border-0 bg-transparent px-4 py-2 text-sm font-semibold text-[#eab308] transition-colors hover:bg-white/5 lg:self-auto"
          >
            <SlidersHorizontal className="size-3.5" />
            Advanced Filters
          </button>
        </div>

        {showAdvanced && (
          <div className="flex flex-col gap-3 border-b border-white/10 bg-black/20 p-4 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#6b7280]">
                Organization
              </p>
              <Select
                variant="soft"
                searchable
                options={ORG_FILTERS}
                value={orgFilter}
                onChange={(v) => setOrgFilter(v || ORG_FILTERS[0])}
                className={selectClass}
                rightIcon={chevron}
              />
            </div>
            <div className="flex-1 space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#6b7280]">
                Registered
              </p>
              <Select
                variant="soft"
                options={[...REGISTRATION_PERIODS]}
                value={periodFilter}
                onChange={(v) => setPeriodFilter(v as RegistrationPeriod)}
                className={selectClass}
                rightIcon={chevron}
              />
            </div>
            <Button
              variant="ghost"
              size="md"
              className="normal-case tracking-normal font-medium text-[#9ca3af]"
              leftIcon={<X className="size-3.5" />}
              title="Clear Filters"
              disabled={!hasActiveFilters}
              onClick={clearFilters}
            />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead>
              <tr className="bg-white/[0.02] text-[10px] font-bold uppercase leading-[15px] tracking-[0.5px] text-[#6b7280]">
                <th className="px-6 py-6 font-bold">User Name</th>
                <th className="px-6 py-6 font-bold">ID / Email</th>
                <th className="px-6 py-6 font-bold">Role</th>
                <th className="px-6 py-6 font-bold">Organization</th>
                <th className="px-6 py-6 font-bold">Status</th>
                <th className="px-6 py-6 font-bold">Reg. Date</th>
                <th className="px-6 py-6 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => {
                const status = statusColorClass[u.status];
                return (
                  <tr
                    key={u.id}
                    className="border-t border-white/5 odd:bg-white/5 transition-colors hover:bg-white/[0.07]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-[11px]">
                        <ManagedUserAvatar user={u} />
                        <div className="min-w-0">
                          <button
                            type="button"
                            onClick={() => navigate(userProfilePath(u.id))}
                            className="cursor-pointer border-0 bg-transparent p-0 text-left text-sm font-semibold leading-5 text-white hover:text-[#eab308]"
                          >
                            {u.name}
                          </button>
                          <p className="text-[10px] leading-[15px] text-[#6b7280]">
                            {u.subtitle}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[11px] leading-[16.5px]">
                      <p className="text-[#9ca3af]">{u.id}</p>
                      <p className="break-all text-[#6b7280]">{u.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-block max-w-[110px] rounded border px-2 py-1 text-[10px] font-bold uppercase leading-[15px]",
                          roleBadgeClass[u.role]
                        )}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="max-w-[160px] px-6 py-4 text-sm leading-5 text-[#9ca3af]">
                      {u.organization}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2">
                        <span className={cn("size-1.5 rounded-full", status.dot)} />
                        <span className={cn("text-[11px] font-medium", status.text)}>
                          {u.status}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[11px] leading-[16.5px] text-[#6b7280]">
                      {formatRegDate(u.registeredAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <RowAction label={`View ${u.name}`} onClick={() => navigate(userProfilePath(u.id))}>
                          <Eye className="size-3.5" />
                        </RowAction>
                        <RowAction label={`Edit ${u.name}`} onClick={() => openEdit(u)}>
                          <SquarePen className="size-3" />
                        </RowAction>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-14 text-center">
                    <p className="text-sm text-white/60">
                      No users match the current filters.
                    </p>
                    {hasActiveFilters && (
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="mt-2 cursor-pointer border-0 bg-transparent text-sm font-semibold text-[#eab308] hover:underline"
                      >
                        Clear all filters
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 px-6 py-3 text-xs text-[#6b7280]">
          <span>
            Showing {rows.length} of {users.length} users
          </span>
        </div>
      </section>

      <UserFormModal
        open={formMode !== null}
        mode={formMode ?? "invite"}
        user={editingUser}
        existingEmails={users.map((u) => u.email.toLowerCase())}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
      />

    </AnimatedContainer>
  );
};

export default UserManagement;
