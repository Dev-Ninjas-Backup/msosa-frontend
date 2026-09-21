import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import type { RelatedReflection } from "../data";

type RelatedReflectionsProps = {
  items: RelatedReflection[];
};

const RelatedReflections = ({ items }: RelatedReflectionsProps) => (
  <AnimatedContainer delay={0.14}>
    <div className="flex flex-col gap-4 h-full">
      {items.map((item) => (
        <Card
          key={item.title}
          className="p-4 flex flex-col sm:flex-row sm:items-center gap-3 flex-1"
        >
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-white">{item.title}</p>
            <p className="mt-0.5 text-[10px] text-white/60">{item.meta}</p>
          </div>
          <span className="rounded-full bg-[rgba(16,183,186,0.1)] px-2 py-0.5 text-[10px] font-bold text-[#10B7BA] shrink-0 self-start sm:self-center">
            {item.status}
          </span>
          <button
            type="button"
            onClick={() => toast.message(`Opening ${item.title}`)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#FBBF24] cursor-pointer hover:opacity-80 shrink-0 self-start sm:self-center"
          >
            View Reflection
            <ArrowRight className="size-3" />
          </button>
        </Card>
      ))}
    </div>
  </AnimatedContainer>
);

export default RelatedReflections;
