import { Link } from "react-router-dom";
import AnimatedContainer from "@/common/AnimatedContainer";

type DetailBreadcrumbProps = {
  empId: string;
};

const DetailBreadcrumb = ({ empId }: DetailBreadcrumbProps) => (
  <AnimatedContainer delay={0.02}>
    <div className="flex flex-wrap items-center gap-1.5 text-xs">
      <Link
        to="/enterprise/participation-monitoring"
        className="text-white/50 hover:text-[#FBBF24] no-underline"
      >
        Participation Monitoring™
      </Link>
      <span className="text-white/30 mx-0.5">&gt;</span>
      <span className="text-white">{empId}</span>
    </div>
  </AnimatedContainer>
);

export default DetailBreadcrumb;
