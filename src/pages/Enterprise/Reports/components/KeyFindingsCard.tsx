import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import type { ReportDetailData } from "../data";

type KeyFindingsCardProps = {
  findings: ReportDetailData["findings"];
};

const KeyFindingsCard = ({ findings }: KeyFindingsCardProps) => (
  <AnimatedContainer delay={0.12}>
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-[15px] font-bold text-white">Key Findings</h3>
        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white">
          {findings.length} Findings
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {findings.map((f) => (
          <div
            key={f.title}
            className="rounded-r-lg bg-white/5 px-4 py-4 space-y-2.5 border-l-2"
            style={{ borderLeftColor: f.color }}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[13px] font-bold text-white">{f.title}</p>
              <p
                className="text-lg font-bold shrink-0"
                style={{ color: f.color }}
              >
                {f.percent}%
              </p>
            </div>
            <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
              {f.detail}
            </p>
            <div className="h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${f.percent}%`,
                  backgroundColor: f.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  </AnimatedContainer>
);

export default KeyFindingsCard;
