import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { ACTIVITY } from "../data";
import SectionLink from "./SectionLink";

const RecentActivity = () => (
  <AnimatedContainer delay={0.14}>
    <Card className="p-8" backgroundColor="rgba(255,255,255,0.05)">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="text-sm font-bold text-white">Recent Activity</h3>
        <SectionLink to="/enterprise/participation-monitoring">
          View All
        </SectionLink>
      </div>
      <ul className="space-y-3">
        {ACTIVITY.map((item) => (
          <li
            key={item.title + item.time}
            className="flex items-center gap-2.5"
          >
            <img
              src={item.avatar}
              alt=""
              className="size-7 rounded-full object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-white leading-[18px]">{item.title}</p>
              <p className="text-[10px] text-[#9ca3af]">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  </AnimatedContainer>
);

export default RecentActivity;
