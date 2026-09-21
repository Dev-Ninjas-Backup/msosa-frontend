import { Link } from "react-router-dom";
import AnimatedContainer from "@/common/AnimatedContainer";

type DetailBreadcrumbProps = {
  name: string;
};

const DetailBreadcrumb = ({ name }: DetailBreadcrumbProps) => (
  <AnimatedContainer delay={0.02}>
    <div className="flex flex-wrap items-center gap-1.5 text-xs text-white/50">
      <Link
        to="/enterprise/invitation-management"
        className="hover:text-[#FBBF24] no-underline text-white/50"
      >
        Invitation Management
      </Link>
      <span className="text-white/30 mx-0.5">&gt;</span>
      <span className="text-white/50">{name}</span>
    </div>
  </AnimatedContainer>
);

export default DetailBreadcrumb;
