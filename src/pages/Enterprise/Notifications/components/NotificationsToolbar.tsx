import { Search } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { cn } from "@/lib/utils";
import { NOTIF_CATEGORIES, NOTIF_FILTERS } from "../data";

type NotificationsToolbarProps = {
  search: string;
  filter: string;
  category: string;
  sort: string;
  onSearch: (v: string) => void;
  onFilter: (v: string) => void;
  onCategory: (v: string) => void;
  onSort: (v: string) => void;
  onBulk: (v: string) => void;
};

const NotificationsToolbar = ({
  search,
  filter,
  category,
  sort,
  onSearch,
  onFilter,
  onCategory,
  onSort,
  onBulk,
}: NotificationsToolbarProps) => (
  <AnimatedContainer delay={0.04}>
    <div className="rounded-xl border border-white/10 bg-white/[0.05] px-4 pt-5 pb-4 space-y-3">
      <Input
        variant="search"
        leftIcon={<Search className="size-3" />}
        placeholder="Search notifications by title, employee, assessment…"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full"
      />

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {NOTIF_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => {
                onFilter(f.key);
                onCategory("all");
              }}
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-3 py-1 text-xs cursor-pointer border transition-colors",
                filter === f.key && category === "all"
                  ? "bg-[rgba(251,191,36,0.15)] border-[rgba(251,191,36,0.4)] text-[#FBBF24] font-semibold"
                  : "bg-white/[0.05] border-white/5 text-[#6B7280] font-medium hover:text-white"
              )}
            >
              {f.label}
              <span className="text-[10px] ml-0.5">{f.count}</span>
            </button>
          ))}

          <span className="mx-1 h-4 w-px bg-white/10" />

          {NOTIF_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                onCategory(c);
                onFilter("all");
              }}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium cursor-pointer border transition-colors",
                category === c
                  ? "bg-[rgba(251,191,36,0.15)] border-[rgba(251,191,36,0.4)] text-[#FBBF24]"
                  : "bg-white/[0.05] border-white/5 text-[#6B7280] hover:text-white"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Select
            variant="soft"
            className="w-[130px]"
            options={["Newest First", "Oldest First", "Priority"]}
            value={sort}
            onChange={onSort}
          />
          <Select
            variant="soft"
            className="w-[130px]"
            options={[
              { label: "Bulk Actions", value: "" },
              { label: "Mark as Read", value: "read" },
              { label: "Mark as Unread", value: "unread" },
              { label: "Archive", value: "archive" },
            ]}
            value=""
            onChange={onBulk}
            placeholder="Bulk Actions"
          />
        </div>
      </div>
    </div>
  </AnimatedContainer>
);

export default NotificationsToolbar;
