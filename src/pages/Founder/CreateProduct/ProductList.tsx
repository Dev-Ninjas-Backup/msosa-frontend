import { Filter, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { PRODUCT_LIST, type ListedProduct, type ProductStatus } from "./data";

type ProductListProps = {
  query: string;
  onQueryChange: (v: string) => void;
  statusFilter: "All" | ProductStatus;
  onStatusFilter: (v: "All" | ProductStatus) => void;
  onCreate: () => void;
  onOpenDraft?: (product: ListedProduct) => void;
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 min-w-[120px]">
    <p className="text-2xl font-semibold text-white">{value}</p>
    <p className="text-xs text-white/50 mt-0.5">{label}</p>
  </div>
);

const StatusPill = ({ status }: { status: ProductStatus }) => (
  <span
    className={cn(
      "inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium",
      status === "Published"
        ? "bg-emerald-500/15 text-emerald-400"
        : "bg-white/10 text-white/60"
    )}
  >
    {status}
  </span>
);

const ProductList = ({
  query,
  onQueryChange,
  statusFilter,
  onStatusFilter,
  onCreate,
  onOpenDraft,
}: ProductListProps) => {
  const filtered = PRODUCT_LIST.filter((p) => {
    const q = query.trim().toLowerCase();
    const matchQ =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    const matchS = statusFilter === "All" || p.status === statusFilter;
    return matchQ && matchS;
  });

  const published = PRODUCT_LIST.filter((p) => p.status === "Published").length;
  const drafts = PRODUCT_LIST.filter((p) => p.status === "Draft").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-wrap gap-3">
          <Stat label="Total Products" value={String(PRODUCT_LIST.length)} />
          <Stat label="Published" value={String(published)} />
          <Stat label="Draft" value={String(drafts)} />
        </div>
        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="size-4" />}
          title="Create New Product"
          onClick={onCreate}
        />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 px-4 py-3">
          <div>
            <h2 className="text-sm font-semibold text-white">Product List</h2>
            <p className="text-xs text-white/45">{filtered.length} products</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              variant="soft"
              inputSize="sm"
              placeholder="Search…"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              leftIcon={<Search className="size-3.5 text-white/40" />}
              containerClassName="w-full sm:w-56"
            />
            <div className="relative">
              <Button
                variant="soft"
                size="sm"
                leftIcon={<Filter className="size-3.5" />}
                title={statusFilter === "All" ? "Filter" : statusFilter}
                onClick={() =>
                  onStatusFilter(
                    statusFilter === "All"
                      ? "Published"
                      : statusFilter === "Published"
                        ? "Draft"
                        : "All"
                  )
                }
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wide text-white/45">
                <th className="px-4 py-3 font-medium">Product Name</th>
                <th className="px-4 py-3 font-medium">Product ID</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Published By</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className={cn(
                    "border-b border-white/5 hover:bg-white/[0.03]",
                    p.status === "Draft" && onOpenDraft && "cursor-pointer"
                  )}
                  onClick={() => {
                    if (p.status === "Draft" && onOpenDraft) onOpenDraft(p);
                  }}
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{p.name}</p>
                    <p className="text-xs text-white/45">
                      {p.category} · {p.type}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-white/70">{p.id}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={p.status} />
                  </td>
                  <td className="px-4 py-3 text-white/80">{p.price}</td>
                  <td className="px-4 py-3 text-white/60">{p.created}</td>
                  <td className="px-4 py-3 text-white/60">{p.publishedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 text-xs text-white/40">
          Showing {filtered.length} of {PRODUCT_LIST.length} products
        </div>
      </div>
    </div>
  );
};

export default ProductList;
