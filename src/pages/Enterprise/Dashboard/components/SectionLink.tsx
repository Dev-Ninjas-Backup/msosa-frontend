import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const SectionLink = ({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) => (
  <Link
    to={to}
    className="text-xs font-semibold text-[#FBBF24] hover:text-[#e8b93a] no-underline inline-flex items-center gap-1.5 shrink-0"
  >
    {children}
    <ArrowRight className="size-2.5" />
  </Link>
);

export default SectionLink;
