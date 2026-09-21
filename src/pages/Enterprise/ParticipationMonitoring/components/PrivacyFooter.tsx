import { Info } from "lucide-react";

const PrivacyFooter = () => (
  <div className="rounded-lg bg-white/[0.02] px-4 py-4 flex justify-center gap-2 items-start">
    <Info className="size-3.5 text-white/30 shrink-0 mt-0.5" />
    <p className="text-[11px] text-white/40 text-center tracking-tight max-w-2xl leading-relaxed">
      Reflection responses and personal assessment data are never exposed —
      Participation Monitoring™ displays participation status only.
    </p>
  </div>
);

export default PrivacyFooter;
