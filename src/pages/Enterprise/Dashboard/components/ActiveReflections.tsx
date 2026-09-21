import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { BLUEPRINTS, blueprintStatusClass } from "../data";
import SectionLink from "./SectionLink";

const ActiveReflections = () => (
  <AnimatedContainer delay={0.12}>
    <Card
      className="p-8 h-full flex flex-col"
      backgroundColor="#0D1117"
    >
      <div className="flex items-center justify-between gap-3 mb-6">
        <h3 className="text-xl font-semibold text-white font-playfair">
          Active Reflections™
        </h3>
        <SectionLink to="/enterprise/blueprint-management">
          View All Tools
        </SectionLink>
      </div>
      <ul className="space-y-3 flex-1">
        {BLUEPRINTS.map((bp) => (
          <li
            key={bp.name}
            className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 flex items-center gap-3"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-[#FBBF24]">
              <FileText className="size-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white truncate">{bp.name}</p>
              <span
                className={cn(
                  "mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium",
                  blueprintStatusClass(bp.status)
                )}
              >
                {bp.status}
              </span>
            </div>
            <Button
              variant={bp.action === "Assign" ? "primary" : "soft"}
              size="sm"
              asChild
              className={cn(
                "shrink-0 rounded-lg!",
                bp.action === "Assign" &&
                  "bg-[#FBBF24]! text-black! hover:bg-[#e8b93a]!"
              )}
            >
              <Link to={bp.to}>{bp.action}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  </AnimatedContainer>
);

export default ActiveReflections;
