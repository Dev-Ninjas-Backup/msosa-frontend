import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";

type RecommendationsCardProps = {
  items: string[];
};

const RecommendationsCard = ({ items }: RecommendationsCardProps) => (
  <AnimatedContainer delay={0.14}>
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[15px] font-bold text-white">Recommendations</h3>
        <span className="rounded-full bg-[rgba(20,83,45,0.3)] px-2.5 py-1 text-[10px] font-semibold text-[#10B7BA]">
          Approved
        </span>
      </div>
      <div className="space-y-3">
        {items.map((text, i) => (
          <div
            key={text}
            className="rounded-lg border border-white/10 bg-white/5 p-4 flex gap-4 items-start"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[rgba(16,183,186,0.4)] bg-[rgba(16,183,186,0.2)] text-[11px] font-bold text-[#10B7BA]">
              {i + 1}
            </span>
            <p className="text-xs text-[#D1D5DB] leading-[19.5px]">{text}</p>
          </div>
        ))}
      </div>
    </Card>
  </AnimatedContainer>
);

export default RecommendationsCard;
