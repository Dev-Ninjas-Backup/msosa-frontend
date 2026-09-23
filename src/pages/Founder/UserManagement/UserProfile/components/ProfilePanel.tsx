import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { panelTitleClass } from "../styles";

const ProfilePanel = ({
  title,
  action,
  children,
  className,
  bodyClassName,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) => (
  <section
    className={cn("overflow-hidden rounded-xl border border-[#222] bg-[#111]", className)}
  >
    <div className="flex items-center justify-between gap-3 border-b border-[#222] px-5 py-4">
      <h2 className={panelTitleClass}>{title}</h2>
      {action}
    </div>
    <div className={cn("p-5", bodyClassName)}>{children}</div>
  </section>
);

export default ProfilePanel;
