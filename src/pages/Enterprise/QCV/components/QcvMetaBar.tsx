import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import { QCV_META } from "../data";

const QcvMetaBar = () => (
  <AnimatedContainer delay={0.02}>
    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3 py-3 border-b border-white/10">
      <p className="text-xs text-white/60 flex flex-wrap items-center gap-x-2 gap-y-1">
        {QCV_META.map((m, i) => (
          <span key={m} className="inline-flex items-center gap-2">
            {i > 0 ? <span className="text-white/20 hidden sm:inline">|</span> : null}
            {m}
          </span>
        ))}
      </p>
      <Button
        variant="soft"
        size="sm"
        className="rounded-lg! h-8! text-xs! self-start"
        onClick={() => toast.success("Export PDF started.")}
      >
        Export PDF
      </Button>
    </div>
  </AnimatedContainer>
);

export default QcvMetaBar;
