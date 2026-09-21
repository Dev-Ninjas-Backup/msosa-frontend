import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { EMPLOYEE_BREAKDOWN } from "../data";
import SectionLink from "./SectionLink";

const EmployeeOverview = () => (
  <AnimatedContainer delay={0.1}>
    <Card className="p-8 h-full" backgroundColor="#0D1117">
      <div className="flex items-center justify-between gap-3 mb-6">
        <h3 className="text-xl font-semibold text-white font-playfair">
          Employee Overview
        </h3>
        <SectionLink to="/enterprise/employee-management">
          View All Tools
        </SectionLink>
      </div>
      <ul className="space-y-5">
        {EMPLOYEE_BREAKDOWN.map((row) => (
          <li
            key={row.label}
            className="flex items-center justify-between gap-3"
          >
            <span className="inline-flex items-center gap-2 text-sm text-white/70 min-w-0">
              <span
                className="size-2 rounded-full shrink-0"
                style={{ backgroundColor: row.color }}
              />
              <span className="truncate">{row.label}</span>
            </span>
            <div className="flex items-center gap-2.5 shrink-0">
              <span className="text-sm font-medium text-white tabular-nums w-7 text-right">
                {row.value}
              </span>
              <div className="h-1.5 w-20 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${row.pct}%`,
                    backgroundColor: row.color,
                  }}
                />
              </div>
              <span className="text-xs text-white/60 tabular-nums w-8 text-right">
                {row.pct}%
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  </AnimatedContainer>
);

export default EmployeeOverview;
