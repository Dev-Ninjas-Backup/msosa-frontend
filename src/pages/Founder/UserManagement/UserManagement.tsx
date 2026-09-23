import { useMemo, useState } from "react";
import { Eye, Pencil, UserPlus, Users } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import {
  DataPanel,
  DotStatus,
  FilterSelect,
  MiniStat,
  PageToolbar,
  PrimaryAction,
  StatCard,
  StatusPill,
} from "../_shared/FounderPageKit";

const USERS = [
  {
    name: "Sophia Loren",
    subtitle: "Verified User",
    id: "USR-10482",
    email: "sophia@globaltech.io",
    role: "Enterprise Admin",
    org: "Global Tech Solutions",
    status: "Active" as const,
    reg: "Jan 12, 2024",
  },
  {
    name: "Marcus Thorne",
    subtitle: "Internal Audit",
    id: "USR-10001",
    email: "marcus@farsystems.com",
    role: "Founder / Admin",
    org: "FAR Platform Engine™",
    status: "Active" as const,
    reg: "Nov 03, 2023",
  },
  {
    name: "Elena Rossi",
    subtitle: "Unverified Account",
    id: "USR-11890",
    email: "elena@boutique.co",
    role: "Consumer",
    org: "Boutique Consulting",
    status: "Suspended" as const,
    reg: "Mar 22, 2024",
  },
  {
    name: "James Okonkwo",
    subtitle: "Verified User",
    id: "USR-12044",
    email: "james@stellar.tech",
    role: "Enterprise Admin",
    org: "Stellar Tech Corp",
    status: "Active" as const,
    reg: "Apr 08, 2024",
  },
  {
    name: "Ava Chen",
    subtitle: "Verified User",
    id: "USR-12110",
    email: "ava.chen@mail.com",
    role: "Consumer",
    org: "—",
    status: "Active" as const,
    reg: "May 16, 2024",
  },
];

const roleTone = {
  "Enterprise Admin": "info",
  "Founder / Admin": "gold",
  Consumer: "neutral",
} as const;

const UserManagement = () => {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("Active");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return USERS.filter((u) => {
      const matchQ =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.org.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q);
      const matchR = role === "All" || u.role === role;
      const matchS = status === "All" || u.status === status;
      return matchQ && matchR && matchS;
    });
  }, [query, role, status]);

  return (
    <AnimatedContainer className="space-y-6 pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/55">
          Founder Operating System for the{" "}
          <span className="text-[#fbbf24]">FAR Platform Engine™</span>
        </p>
        <PrimaryAction title="Invite User" leftIcon={<UserPlus className="size-4" />} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Users" value="18,420" hint="+3.2% vs last month" hintTone="up" icon={<Users className="size-5" />} />
        <StatCard label="Active Now" value="17,950" hint="97.4% platform engagement" />
        <StatCard label="Suspended" value="45" hint="Requires Review" hintTone="warn" />
        <StatCard label="New (30d)" value="612" hint="Trending Higher" hintTone="up" />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <MiniStat label="Consumers" value="16,204" />
        <MiniStat label="Employees" value="1,842" />
        <MiniStat label="Active Enterprise" value="184" />
        <MiniStat label="Invites" value="89" tone="blue" />
        <MiniStat label="Verified" value="17.8k" tone="green" />
        <MiniStat label="Suspended" value="45" tone="red" />
      </div>

      <PageToolbar
        search={query}
        onSearch={setQuery}
        searchPlaceholder="Search by name, email, organization, or ID..."
        filters={
          <>
            <FilterSelect label="Role" value={role} options={["All", "Enterprise Admin", "Founder / Admin", "Consumer"]} onChange={setRole} />
            <FilterSelect label="Status" value={status} options={["All", "Active", "Suspended"]} onChange={setStatus} />
            <FilterSelect label="Verification" value="All" options={["All", "Verified", "Unverified"]} onChange={() => {}} />
          </>
        }
      />

      <DataPanel footer={`Showing ${rows.length} users`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wide text-white/45">
                <th className="px-4 py-3 font-medium">User Name</th>
                <th className="px-4 py-3 font-medium">ID / Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Organization</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Reg. Date</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-[#fbbf24]">
                        {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </span>
                      <div>
                        <p className="font-medium text-white">{u.name}</p>
                        <p className="text-xs text-white/40">{u.subtitle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-white/50 text-xs">{u.id}</p>
                    <p className="text-white/80">{u.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill label={u.role} tone={roleTone[u.role]} />
                  </td>
                  <td className="px-4 py-3 text-white/80">{u.org}</td>
                  <td className="px-4 py-3">
                    <DotStatus label={u.status} on={u.status === "Active"} />
                  </td>
                  <td className="px-4 py-3 text-white/60">{u.reg}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button type="button" className="text-white/45 hover:text-white border-0 bg-transparent cursor-pointer" aria-label="View">
                        <Eye className="size-4" />
                      </button>
                      <button type="button" className="text-white/45 hover:text-white border-0 bg-transparent cursor-pointer" aria-label="Edit">
                        <Pencil className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataPanel>
    </AnimatedContainer>
  );
};

export default UserManagement;
