import { useState } from "react";
import { Filter, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Button from "@/ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import {
  PRODUCT_KPI,
  PRODUCT_LIST,
  PRODUCT_TOTAL,
  type ListedProduct,
  type ProductStatus,
} from "./data";

type ProductListProps = {
  query: string;
  statusFilter: "All" | ProductStatus;
  onStatusFilter: (v: "All" | ProductStatus) => void;
  onEdit?: (product: ListedProduct) => void;
};

const STATUS_TONE: Record<ProductStatus, string> = {
  Published: "bg-[#10b7ba]/12 text-[#10b7ba]",
  Draft: "bg-[#fbbf24]/12 text-[#fbbf24]",
  Active: "bg-sky-400/12 text-sky-400",
  Archived: "bg-white/10 text-white/50",
  Upcoming: "bg-violet-400/12 text-violet-300",
};

const HINT_TONE = {
  up: "text-emerald-400",
  down: "text-red-400",
  muted: "text-white/45",
  gold: "text-[#fbbf24]",
} as const;

const COLS = [
  "#",
  "Product Name",
  "Product ID",
  "Division",
  "Type",
  "Ver.",
  "Status",
  "Price",
  "Created",
  "Updated",
  "Published By",
  "Actions",
] as const;

const ProductList = ({
  query,
  statusFilter,
  onStatusFilter,
  onEdit,
}: ProductListProps) => {
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = PRODUCT_LIST.filter((p) => {
    const q = query.trim().toLowerCase();
    const matchQ =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.division.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q);
    const matchS = statusFilter === "All" || p.status === statusFilter;
    return matchQ && matchS;
  });

  const pages = [1, 2, 3, "…", 6] as const;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {PRODUCT_KPI.map((k) => (
          <div
            key={k.label}
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
          >
            <div className="flex items-center gap-2">
              <span className={cn("size-2 rounded-full shrink-0", k.dot)} />
              <p className="text-[11px] text-white/50 truncate">{k.label}</p>
            </div>
            <p className="mt-2 text-[28px] font-semibold leading-none text-white tabular-nums">
              {k.value}
            </p>
            <p className={cn("mt-2 text-xs", HINT_TONE[k.hintTone])}>{k.hint}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <div className="flex items-baseline gap-2 min-w-0">
            <h2 className="text-sm font-semibold text-white">Product List</h2>
            <p className="text-xs text-white/40">{filtered.length} products</p>
          </div>
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="soft"
                size="sm"
                className="rounded-full!"
                leftIcon={<Filter className="size-3.5" />}
                title="Filter"
              />
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-44 bg-[#121212] border-white/10 p-2"
            >
              {(["All", "Published", "Draft", "Active", "Archived", "Upcoming"] as const).map(
                (s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      onStatusFilter(s);
                      setFilterOpen(false);
                    }}
                    className={cn(
                      "w-full rounded-lg px-3 py-2 text-left text-sm border-0 cursor-pointer",
                      statusFilter === s
                        ? "bg-white/10 text-white"
                        : "bg-transparent text-white/70 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {s}
                  </button>
                )
              )}
            </PopoverContent>
          </Popover>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1180px] text-left">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-medium uppercase tracking-wide text-white/40">
                {COLS.map((c) => (
                  <th key={c} className="px-3 py-3 whitespace-nowrap">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr
                  key={p.id}
                  className="border-b border-white/5 hover:bg-white/[0.03]"
                >
                  <td className="px-3 py-3.5 text-xs text-white/25 tabular-nums">
                    {i + 1}
                  </td>
                  <td className="px-3 py-3.5 text-sm font-medium text-white whitespace-nowrap">
                    {p.name}
                  </td>
                  <td className="px-3 py-3.5 text-xs text-white/55">{p.id}</td>
                  <td className="px-3 py-3.5 text-xs text-white/55 max-w-[140px]">
                    {p.division}
                  </td>
                  <td className="px-3 py-3.5 text-xs text-white/55">{p.type}</td>
                  <td className="px-3 py-3.5 text-xs text-white/55">{p.version}</td>
                  <td className="px-3 py-3.5">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        STATUS_TONE[p.status]
                      )}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-sm font-semibold text-white">
                    {p.price}
                  </td>
                  <td className="px-3 py-3.5 text-xs text-white/55 whitespace-nowrap">
                    {p.created}
                  </td>
                  <td className="px-3 py-3.5 text-xs text-white/55 whitespace-nowrap">
                    {p.updated}
                  </td>
                  <td className="px-3 py-3.5 text-xs text-white/55 whitespace-nowrap">
                    {p.publishedBy}
                  </td>
                  <td className="px-3 py-3.5">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          aria-label={`Actions for ${p.name}`}
                          className="flex size-8 items-center justify-center rounded-lg text-white/40 hover:bg-white/5 hover:text-white border-0 bg-transparent cursor-pointer"
                        >
                          <MoreVertical className="size-4" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="end"
                        className="w-40 bg-[#121212] border-white/10 p-1.5"
                      >
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5 border-0 bg-transparent cursor-pointer"
                          onClick={() => onEdit?.(p)}
                        >
                          <Pencil className="size-3.5" />
                          Edit
                        </button>
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-white/5 border-0 bg-transparent cursor-pointer"
                          onClick={() => toast.error(`${p.name} marked for delete`)}
                        >
                          <Trash2 className="size-3.5" />
                          Delete
                        </button>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <p className="text-xs text-white/40">
            Showing {filtered.length} of {PRODUCT_TOTAL} products
          </p>
          <div className="flex items-center gap-1">
            {pages.map((n) => (
              <button
                key={n}
                type="button"
                disabled={n === "…"}
                onClick={() => typeof n === "number" && setPage(n)}
                className={cn(
                  "flex size-8 items-center justify-center rounded-full text-xs border-0 cursor-pointer",
                  n === page
                    ? "bg-[#fbbf24] text-black font-semibold"
                    : n === "…"
                      ? "bg-transparent text-white/40 cursor-default"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
