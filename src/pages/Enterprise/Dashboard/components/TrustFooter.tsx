import AnimatedContainer from "@/common/AnimatedContainer";
import { TRUST } from "../data";

const TrustFooter = () => (
  <AnimatedContainer delay={0.2}>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 pt-2">
      {TRUST.map(({ title, body, icon: Icon }) => (
        <div key={title} className="flex gap-3 items-start">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white">
            <Icon
              className={`size-3.5 ${title === "Emotionally Intelligent" ? "fill-[#9CA3AF]" : ""}`}
            />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-white/90">
              {title}
            </p>
            <p className="mt-1 text-[11px] leading-snug text-white/45">{body}</p>
          </div>
        </div>
      ))}
    </div>
  </AnimatedContainer>
);

export default TrustFooter;
