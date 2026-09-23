import { useMemo, useState } from "react";
import { Check, Filter, Search } from "lucide-react";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import { cn } from "@/lib/utils";
import AuditLogTable from "../components/AuditLogTable";
import ProfilePanel from "../components/ProfilePanel";
import { fieldLabelClass } from "../styles";
import type { ProfileTabProps } from "../types";
import { daysSince, formatRegDate, type AuditEntry } from "../../data";

const PAGE_SIZE = 4;
const RESULT_FILTERS = ["All", "Success", "Blocked"] as const;
type ResultFilter = (typeof RESULT_FILTERS)[number];

const SecurityTab = ({ user, actions }: ProfileTabProps) => {
  const { mfaEnabled, passwordChangedAt, session, audit } = user.profile;
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ResultFilter>("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return audit.filter(
      (e: AuditEntry) =>
        (result === "All" || e.result === result) &&
        (!q ||
          [e.action, e.device, e.location, e.ip].some((f) => f.toLowerCase().includes(q)))
    );
  }, [audit, query, result]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);
  const passwordAge = daysSince(passwordChangedAt);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <ProfilePanel title="Security Configuration™">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className={fieldLabelClass}>MFA Security Status</p>
              <p
                className={cn(
                  "mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold",
                  mfaEnabled ? "text-[#10b981]" : "text-[#ef4444]"
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    mfaEnabled ? "bg-[#10b981]" : "bg-[#ef4444]"
                  )}
                />
                {mfaEnabled ? "Enabled & Active" : "Disabled"}
              </p>
              <button
                type="button"
                onClick={() =>
                  actions.save(
                    { profilePatch: { mfaEnabled: !mfaEnabled } },
                    mfaEnabled ? "MFA Disabled by Founder" : "MFA Enforced by Founder",
                    mfaEnabled ? "MFA disabled" : "MFA enforced"
                  )
                }
                className="mt-1 cursor-pointer border-0 bg-transparent p-0 text-[10px] font-semibold text-[#eab308] hover:underline"
              >
                {mfaEnabled ? "Disable MFA" : "Enforce MFA"}
              </button>
            </div>
            <div className="text-right">
              <p className={fieldLabelClass}>Password Last Changed</p>
              <p className="mt-1.5 text-sm font-semibold text-white">
                {formatRegDate(passwordChangedAt)} ({passwordAge} day{passwordAge === 1 ? "" : "s"}{" "}
                ago)
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button
              variant="secondary"
              size="sm"
              className="h-10 rounded-xl border-[#333] bg-[#1a1a1a] text-[10px] font-bold uppercase tracking-[0.5px] text-[#9ca3af]"
              title="Reset Security Keys"
              onClick={actions.requestResetKeys}
            />
            <Button
              variant="secondary"
              size="sm"
              className="h-10 rounded-xl border-[#ef4444]/30 bg-[#ef4444]/10 text-[10px] font-bold uppercase tracking-[0.5px] text-[#ef4444] hover:bg-[#ef4444]/15"
              title="Force Password Reset"
              onClick={actions.requestForcePasswordReset}
            />
          </div>
        </ProfilePanel>

        <ProfilePanel title="Active Session Protocol">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-[#222] bg-black p-4">
              <p className={fieldLabelClass}>Primary Device</p>
              <p className="mt-2 text-sm font-semibold text-white">{session.device}</p>
              <p className="text-[10px] text-[#6b7280]">{session.browser}</p>
            </div>
            <div className="rounded-lg border border-[#222] bg-black p-4">
              <p className={fieldLabelClass}>Access Location</p>
              <p className="mt-2 text-sm font-semibold text-white">{session.location}</p>
              <p className="text-[10px] text-[#6b7280]">{session.ip}</p>
            </div>
          </div>
        </ProfilePanel>
      </div>

      <ProfilePanel
        title="User Activity Audit Log™"
        bodyClassName="p-0"
        action={
          <div className="flex items-center gap-2">
            <Input
              variant="soft"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(0);
              }}
              placeholder="Search logs..."
              leftIcon={<Search className="size-3 text-[#6b7280]" />}
              containerClassName="w-44"
              className="h-8! rounded-md! border-[#222]! bg-black! pl-8! text-xs text-white"
            />
            <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border bg-[#1a1a1a] px-3 text-[11px] text-white",
                    result !== "All" ? "border-[#eab308]/50" : "border-[#333]"
                  )}
                >
                  <Filter className="size-3" />
                  {result === "All" ? "Filters" : result}
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-40 rounded-lg border-white/10 bg-[#111] p-1">
                <p className="px-3 pb-1 pt-2 text-[9px] font-bold uppercase text-[#6b7280]">
                  Result
                </p>
                {RESULT_FILTERS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setResult(r);
                      setPage(0);
                      setFiltersOpen(false);
                    }}
                    className="flex w-full cursor-pointer items-center justify-between rounded-md border-0 bg-transparent px-3 py-2 text-left text-sm text-[#9ca3af] hover:bg-white/5 hover:text-white"
                  >
                    {r}
                    {r === result && <Check className="size-3.5 text-[#eab308]" />}
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        }
      >
        <AuditLogTable
          entries={visible}
          emptyText={audit.length ? "No log entries match your search." : undefined}
        />
        <div className="flex items-center justify-between border-t border-[#222] px-6 py-3">
          <p className="text-[11px] text-[#6b7280]">
            Showing {visible.length} of {filtered.length.toLocaleString("en-US")} entries
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="h-8 rounded-md border-[#333] bg-transparent px-3 text-[11px] text-white"
              title="Previous"
              disabled={currentPage === 0}
              onClick={() => setPage(currentPage - 1)}
            />
            <Button
              variant="secondary"
              size="sm"
              className="h-8 rounded-md border-[#333] bg-[#1a1a1a] px-3 text-[11px] text-white"
              title="Next"
              disabled={currentPage >= pageCount - 1}
              onClick={() => setPage(currentPage + 1)}
            />
          </div>
        </div>
      </ProfilePanel>
    </div>
  );
};

export default SecurityTab;
