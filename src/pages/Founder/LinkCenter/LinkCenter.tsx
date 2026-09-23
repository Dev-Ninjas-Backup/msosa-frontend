import { useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  Ban,
  BarChart3,
  Box,
  Crown,
  Download,
  Eye,
  FileText,
  Link2,
  Pencil,
  Plus,
  QrCode,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  TriangleAlert,
  User,
  Users,
} from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import { cn } from "@/lib/utils";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import {
  disableLink,
  downloadLinkList,
  getLinks,
  presentationStats,
  subscribeLinks,
  type LinkStatus,
  type LinkType,
  type PlatformLink,
} from "./data";
import { LINK_CREATE_PATH } from "./events";

const PAGE_SIZE = 5;

const TYPE_STYLE: Record<LinkType, { chip: string; tile: string; Icon: typeof Link2 }> = {
  Invitation: {
    chip: "border-[rgba(234,179,8,0.2)] bg-[rgba(234,179,8,0.1)] text-[#eab308]",
    tile: "bg-[rgba(234,179,8,0.1)] text-[#eab308]",
    Icon: Link2,
  },
  "User Invite": {
    chip: "border-[rgba(34,211,238,0.2)] bg-[rgba(34,211,238,0.1)] text-[#22d3ee]",
    tile: "bg-[rgba(34,211,238,0.1)] text-[#22d3ee]",
    Icon: User,
  },
  "Report Link": {
    chip: "border-[rgba(59,130,246,0.2)] bg-[rgba(59,130,246,0.1)] text-[#3b82f6]",
    tile: "bg-[rgba(59,130,246,0.1)] text-[#3b82f6]",
    Icon: FileText,
  },
  "Product Link": {
    chip: "border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.1)] text-[#10b981]",
    tile: "bg-[rgba(16,185,129,0.1)] text-[#10b981]",
    Icon: Box,
  },
  "Org Link": {
    chip: "border-[rgba(234,179,8,0.2)] bg-[rgba(234,179,8,0.1)] text-[#eab308]",
    tile: "bg-[rgba(234,179,8,0.1)] text-[#eab308]",
    Icon: Users,
  },
};

const STATUS_STYLE: Record<LinkStatus, string> = {
  Active: "text-[#10b981]",
  Expired: "text-[#ef4444]",
  Disabled: "text-[#6b7280]",
};

const STATUS_DOT: Record<LinkStatus, string> = {
  Active: "bg-[#10b981]",
  Expired: "bg-[#ef4444]",
  Disabled: "bg-[#6b7280]",
};

const MetricCard = ({
  label,
  value,
  hint,
  hintClass,
  icon,
  large = false,
}: {
  label: string;
  value: string;
  hint: string;
  hintClass?: string;
  icon: ReactNode;
  large?: boolean;
}) => (
  <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6">
    <div className="flex items-start justify-between gap-3">
      <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#6b7280]">{label}</p>
      <span className="shrink-0 text-white/70">{icon}</span>
    </div>
    <p className={cn("font-bold tracking-tight text-white", large ? "text-[30px] leading-none" : "text-2xl leading-none")}>
      {value}
    </p>
    <p className={cn("text-[11px] leading-[16.5px]", hintClass ?? "text-[#6b7280]")}>{hint}</p>
  </div>
);

const pageItems = (current: number, total: number) => {
  if (total <= 5) return Array.from({ length: total }, (_, index) => index + 1);
  const items: Array<number | "..."> = [1];
  if (current > 3) items.push("...");
  for (let page = Math.max(2, current - 1); page <= Math.min(total - 1, current + 1); page += 1) {
    items.push(page);
  }
  if (current < total - 2) items.push("...");
  items.push(total);
  return items;
};

const LinkCenter = () => {
  const navigate = useNavigate();
  const links = useSyncExternalStore(subscribeLinks, getLinks, getLinks);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [notice, setNotice] = useState("");

  const openCreate = (preset?: LinkType) => {
    navigate(LINK_CREATE_PATH, { state: preset ? { preset } : undefined });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return links.filter((link) => {
      const matchesQuery =
        !q ||
        link.name.toLowerCase().includes(q) ||
        link.id.toLowerCase().includes(q) ||
        link.type.toLowerCase().includes(q);
      const matchesType = type === "All" || link.type === type;
      const matchesStatus = status === "All" || link.status === status;
      return matchesQuery && matchesType && matchesStatus;
    });
  }, [links, query, type, status]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const start = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE;
  const rows = filtered.slice(start, start + PAGE_SIZE);

  const stats = presentationStats(links);
  const visitTotal = stats.visits;

  const quickActions: Array<{
    title: string;
    icon: typeof Plus;
    className: string;
    onClick: () => void;
  }> = [
    {
      title: "Create New Link",
      icon: Plus,
      className: "border-[rgba(234,179,8,0.2)] bg-[rgba(234,179,8,0.08)] text-[#eab308]",
      onClick: () => openCreate(),
    },
    {
      title: "Generate Invitation",
      icon: Crown,
      className: "border-white/8 bg-white/5 text-[#9ca3af]",
      onClick: () => openCreate("Invitation"),
    },
    {
      title: "Generate Product Link",
      icon: Box,
      className: "border-white/8 bg-white/5 text-[#9ca3af]",
      onClick: () => openCreate("Product Link"),
    },
    {
      title: "Share Report",
      icon: FileText,
      className: "border-white/8 bg-white/5 text-[#9ca3af]",
      onClick: () => openCreate("Report Link"),
    },
    {
      title: "Generate QR Code",
      icon: QrCode,
      className: "border-white/8 bg-white/5 text-[#9ca3af]",
      onClick: () => openCreate("Product Link"),
    },
  ];

  return (
    <AnimatedContainer className="space-y-8 pb-8">
      {notice && (
        <p className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">{notice}</p>
      )}

      <div className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            large
            label="Total Active Links"
            value={stats.active.toLocaleString()}
            hint="↑ +5.1% vs last month"
            hintClass="text-[#10b981]"
            icon={<Link2 className="size-4 text-[#60a5fa]" />}
          />
          <MetricCard
            large
            label="Links Created Today"
            value={String(stats.createdToday)}
            hint="Real-time generation rate"
            icon={<span className="mt-1 size-2 rounded-full bg-[#10b981]" />}
          />
          <MetricCard
            large
            label="Active Invitation Links"
            value={String(stats.invitations)}
            hint="↑ Trending Higher"
            hintClass="text-[#22d3ee]"
            icon={<Crown className="size-4 text-[#eab308]" />}
          />
          <MetricCard
            large
            label="Product Links"
            value={stats.products.toLocaleString()}
            hint="↑ +2.4% vs last month"
            hintClass="text-[#10b981]"
            icon={<Box className="size-4 text-[#10b981]" />}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Organization Links"
            value={stats.organizations.toLocaleString()}
            hint="Active org portals"
            icon={<User className="size-4 text-[#93c5fd]" />}
          />
          <MetricCard
            label="Report Links"
            value={stats.reports.toLocaleString()}
            hint="Shared report portals"
            icon={<FileText className="size-4 text-[#60a5fa]" />}
          />
          <MetricCard
            label="Expired Links"
            value={String(stats.expired)}
            hint="▲ Requires Cleanup"
            hintClass="text-[#f87171]"
            icon={<TriangleAlert className="size-4 text-[#f87171]" />}
          />
          <MetricCard
            label="Total Link Visits"
            value={visitTotal.toLocaleString()}
            hint="↑ +12.8% total engagement"
            hintClass="text-[#10b981]"
            icon={<Users className="size-4 text-[#eab308]" />}
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#6b7280]">Quick Actions</p>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <button
              key={action.title}
              type="button"
              onClick={action.onClick}
              className={cn(
                "inline-flex cursor-pointer items-center gap-2 rounded-[10px] border border-solid px-3.5 py-2.5 text-[11px] font-bold",
                action.className,
              )}
            >
              <action.icon className="size-3.5" />
              {action.title}
            </button>
          ))}
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] border border-[rgba(239,68,68,0.15)] bg-[rgba(239,68,68,0.06)] px-3.5 py-2.5 text-[11px] font-bold text-[#ef4444]"
              >
                <Ban className="size-3.5" />
                Disable Link
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-72 rounded-xl border-white/10 bg-[#111] p-2">
              <p className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-[1px] text-[#6b7280]">
                Active links
              </p>
              {links.filter((link) => link.status === "Active").length === 0 ? (
                <p className="px-2 py-3 text-sm text-white/50">No active links to disable.</p>
              ) : (
                links
                  .filter((link) => link.status === "Active")
                  .map((link) => (
                    <button
                      key={link.id}
                      type="button"
                      className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border-0 bg-transparent px-2 py-2 text-left hover:bg-white/5"
                      onClick={() => {
                        disableLink(link.id);
                        setNotice(`${link.name} is now disabled.`);
                      }}
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm text-white">{link.name}</span>
                        <span className="block text-[10px] text-[#6b7280]">{link.id}</span>
                      </span>
                      <span className="shrink-0 text-[11px] font-bold text-[#ef4444]">Disable</span>
                    </button>
                  ))
              )}
            </PopoverContent>
          </Popover>
          <button
            type="button"
            onClick={() => downloadLinkList(filtered)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] border border-white/8 bg-white/5 px-3.5 py-2.5 text-[11px] font-bold text-[#9ca3af]"
          >
            <Download className="size-3.5" />
            Export Link List
          </button>
          <button
            type="button"
            onClick={() => setShowAnalytics((open) => !open)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] border border-[rgba(34,211,238,0.15)] bg-[rgba(34,211,238,0.06)] px-3.5 py-2.5 text-[11px] font-bold text-[#22d3ee]"
          >
            <BarChart3 className="size-3.5" />
            View Link Analytics
          </button>
        </div>
      </div>

      {showAnalytics && (
        <div className="rounded-2xl border border-[rgba(34,211,238,0.15)] bg-[rgba(34,211,238,0.04)] p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-bold text-white">Link Analytics</p>
            <p className="text-[11px] text-[#22d3ee]">{visitTotal.toLocaleString()} total clicks</p>
          </div>
          <div className="space-y-3">
            {(() => {
              const ranked = [...links].sort((a, b) => b.clicks - a.clicks).slice(0, 5);
              const peak = ranked[0]?.clicks || 1;
              return ranked.map((link) => {
                const width = Math.max(4, Math.round((link.clicks / peak) * 100));
                return (
                  <div key={link.id}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-white/80">{link.name}</span>
                      <span className="tabular-nums text-white">{link.clicks.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-[#22d3ee]" style={{ width: `${width}%` }} />
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="flex flex-col gap-3 border-b border-white/7 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#6b7280]">Recent Activity</p>
          <div className="flex flex-wrap items-center gap-3">
            <Input
              variant="soft"
              inputSize="sm"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search links..."
              leftIcon={<Search className="size-3.5 text-[#9ca3af]" />}
              containerClassName="w-full sm:w-60"
              className="border-white/10 bg-black/40 text-white placeholder:text-[#9ca3af]"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-9 rounded-lg border-white/10 bg-white/5 px-4 text-[11px] font-bold normal-case tracking-normal text-[#9ca3af]"
                  leftIcon={<SlidersHorizontal className="size-3.5" />}
                  title="Filters"
                />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-64 space-y-3 rounded-xl border-white/10 bg-[#111] p-3">
                <Select
                  variant="soft"
                  title="Link Type"
                  value={type}
                  onChange={(value) => {
                    setType(value);
                    setPage(1);
                  }}
                  options={["All", "Invitation", "User Invite", "Report Link", "Product Link", "Org Link"]}
                />
                <Select
                  variant="soft"
                  title="Status"
                  value={status}
                  onChange={(value) => {
                    setStatus(value);
                    setPage(1);
                  }}
                  options={["All", "Active", "Expired", "Disabled"]}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead className="bg-white/[0.02] text-[10px] font-bold uppercase tracking-[0.5px] text-[#6b7280]">
              <tr>
                <th className="px-6 py-4 font-bold">Link Name & ID</th>
                <th className="px-6 py-4 font-bold">Link Type</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Created Date</th>
                <th className="px-6 py-4 font-bold">Expiration</th>
                <th className="px-6 py-4 font-bold">Clicks</th>
                <th className="px-6 py-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-sm text-[#6b7280]">
                    No links match the current search or filters.
                  </td>
                </tr>
              )}
              {rows.map((link) => (
                <LinkRow
                  key={link.id}
                  link={link}
                  onEdit={() => navigate(LINK_CREATE_PATH, { state: { linkId: link.id } })}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/5 bg-white/[0.01] p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-[#6b7280]">
            {filtered.length === 0
              ? "Showing 0 links"
              : `Showing ${start + 1} - ${start + rows.length} of ${filtered.length} links`}
          </p>
          <div className="flex items-center gap-2">
            {pageItems(currentPage, pageCount).map((item, index) =>
              item === "..." ? (
                <span key={`ellipsis-${index}`} className="px-1 text-xs text-white/60">
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPage(item)}
                  className={cn(
                    "flex size-8 cursor-pointer items-center justify-center rounded-lg border text-xs",
                    item === currentPage
                      ? "border-transparent bg-[#fbbf24] font-semibold text-black"
                      : "border-white/10 bg-white/5 text-white/60",
                  )}
                >
                  {item}
                </button>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-6">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[rgba(34,211,238,0.2)] bg-[rgba(34,211,238,0.1)] text-[#22d3ee]">
            <ShieldCheck className="size-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold tracking-[0.7px] text-white">Link Distribution Integrity Locked</p>
            <p className="max-w-2xl text-xs leading-[19.5px] text-[#6b7280]">
              All links generated through FAR Platform Engine™ are cryptographically signed and tracked. Expired or
              disabled links are automatically purged from active distribution. Links marked with FAR™ require
              Multi-Founder Approval to modify or revoke.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-4 rounded-xl border border-white/10 bg-black p-4">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#0f172a] text-[#eab308]">
            <ShieldCheck className="size-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#eab308]">Founder View</p>
            <p className="text-xs font-bold text-white">Full Link Access</p>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

const LinkRow = ({ link, onEdit }: { link: PlatformLink; onEdit: () => void }) => {
  const meta = TYPE_STYLE[link.type];
  const [copied, setCopied] = useState(false);
  const url = `https://app.farplatform.com/${link.path}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <tr className="border-t border-white/5">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <span className={cn("flex size-8 items-center justify-center rounded", meta.tile)}>
            <meta.Icon className="size-3.5" />
          </span>
          <span>
            <span className="block text-[13px] font-semibold text-white">{link.name}</span>
            <span className="block text-[10px] text-[#6b7280]">{link.id}</span>
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={cn("inline-flex rounded border px-2 py-1 text-[10px] font-bold", meta.chip)}>
          {link.type}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className={cn("inline-flex items-center gap-2 text-[11px] font-medium", STATUS_STYLE[link.status])}>
          <span className={cn("size-1.5 rounded-full", STATUS_DOT[link.status])} />
          {link.status}
        </span>
      </td>
      <td className="px-6 py-4 text-xs text-[#9ca3af]">{link.created}</td>
      <td className={cn("px-6 py-4 text-xs", link.status === "Expired" ? "text-[#f87171]" : "text-[#9ca3af]")}>
        {link.expires}
      </td>
      <td className="px-6 py-4 text-xs font-semibold text-white">{link.clicks.toLocaleString()}</td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                aria-label={`View ${link.name}`}
                className="flex size-7 cursor-pointer items-center justify-center rounded-md border border-white/5 bg-black/40 text-white/70 hover:text-white"
              >
                <Eye className="size-3.5" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-72 rounded-xl border-white/10 bg-[#111] p-3">
              <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#6b7280]">Destination</p>
              <p className="mt-2 break-all text-sm text-white">{url}</p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-3 h-8 w-full text-xs"
                title={copied ? "Copied" : "Copy link"}
                onClick={copy}
              />
            </PopoverContent>
          </Popover>
          <button
            type="button"
            aria-label={`Edit ${link.name}`}
            onClick={onEdit}
            className="flex size-7 cursor-pointer items-center justify-center rounded-md border border-white/5 bg-black/40 text-white/70 hover:text-white"
          >
            <Pencil className="size-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default LinkCenter;
