import React from "react";
import { Lock, ShieldCheck, Globe2, Users2, LockKeyhole } from "lucide-react";
import CommonWrapper from "@/common/CommonWrapper";

const footerTrustItems = [
  { icon: Lock, label: "Built for Security" },
  { icon: ShieldCheck, label: "Engineered for Reliability" },
  { icon: Globe2, label: "Designed for Scale" },
  { icon: Users2, label: "Focused on Impact" },
];

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-primary-bg border-t border-border/40 py-10 select-none">
      <CommonWrapper className="">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-6">
          {/* Trust Pillars */}
          <div className="flex flex-wrap items-center justify-center xl:justify-start gap-6">
            {footerTrustItems.map((badge, idx) => {
              const BadgeIcon = badge.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <BadgeIcon
                    size={20}
                    className="text-secondary-text shrink-0"
                    strokeWidth={1.75}
                  />
                  <span className="text-secondary-text text-sm font-semibold uppercase tracking-[0.16em] whitespace-nowrap">
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Vertical Glowing Separator (visible on desktop) */}
          <div className="hidden xl:block w-[2px] h-16 bg-gradient-to-b from-transparent via-primary-brand/50 to-transparent shrink-0" />

          {/* Legal / IP Notice */}
          <div className="flex items-start gap-2 max-w-2xl text-left">
            <div className="flex items-start justify-center text-secondary-brand shrink-0">
              <LockKeyhole size={24} className="text-secondary-brand" strokeWidth={2} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-secondary-brand text-xs font-semibold uppercase tracking-wider">
                Privacy &amp; Intellectual Property
              </span>
              <p className="text-secondary-text text-xs leading-relaxed tracking-wider">
                FAR Systems™ protects user privacy, platform information, proprietary protocols,
                methodologies, and intellectual property. Access is governed by applicable privacy,
                security, and ownership policies.
              </p>
            </div>
          </div>
        </div>
      </CommonWrapper>
    </footer>
  );
};

export default Footer;
