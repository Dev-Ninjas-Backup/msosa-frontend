import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import { getBlueprint } from "./data";

const BlueprintDetail = () => {
  const { blueprintId } = useParams<{ blueprintId: string }>();
  const bp = blueprintId ? getBlueprint(blueprintId) : undefined;

  if (!bp) {
    return <Navigate to="/enterprise/blueprint-management" replace />;
  }

  return (
    <div className="space-y-5 sm:space-y-6 pb-8">
      <AnimatedContainer delay={0.02}>
        <Link
          to="/enterprise/blueprint-management"
          className="inline-flex items-center gap-1.5 text-xs text-secondary-text hover:text-[#F5C542] no-underline"
        >
          <ArrowLeft className="size-3.5" />
          Blueprint Management
          <span className="text-white/30 mx-1">/</span>
          <span className="text-primary-text">{bp.name}</span>
        </Link>
      </AnimatedContainer>

      <AnimatedContainer delay={0.04}>
        <Card className="p-5 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <span className="flex size-24 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-secondary-text shrink-0">
              <ImageIcon className="size-10" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {bp.name}
                </h2>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-medium bg-white/10 text-secondary-text">
                  Self-Assessment
                </span>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-medium bg-[#F5C542]/15 text-[#F5C542]">
                  {bp.version.split(" · ")[0]}
                </span>
              </div>
              <p className="text-xs text-secondary-text mb-4">
                Last Updated: {bp.version.includes("·") ? bp.version.split(" · ")[1] : "May 2026"}
              </p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-secondary-text mb-5">
                <span>
                  Target:{" "}
                  <span className="text-primary-text">{bp.target}</span>
                </span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span>
                  Duration:{" "}
                  <span className="text-primary-text">{bp.duration}</span>
                </span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span>
                  Assessment Type:{" "}
                  <span className="text-primary-text">Reflective + AI</span>
                </span>
              </div>
              <div className="flex flex-wrap items-end gap-4">
                <div>
                  <p className="text-3xl font-bold text-[#F5C542]">
                    {bp.price}
                    <span className="text-base font-normal text-secondary-text">
                      /seat
                    </span>
                  </p>
                  <p className="text-xs text-secondary-text">
                    Per Seat · Unlimited Seats
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  className="rounded-xl! bg-[#FBBF24]!"
                  onClick={() =>
                    toast.success(
                      bp.status === "available"
                        ? "Purchase started."
                        : "Already purchased."
                    )
                  }
                >
                  {bp.status === "available"
                    ? "Purchase Blueprint"
                    : "Purchased"}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </AnimatedContainer>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <AnimatedContainer delay={0.08}>
          <Card className="p-5 sm:p-6 h-full">
            <h3 className="text-lg text-primary-text mb-3">Purpose</h3>
            <p className="text-sm text-secondary-text leading-relaxed">
              {bp.purpose}
            </p>
            <h3 className="text-lg text-primary-text mt-6 mb-3">Description</h3>
            <p className="text-sm text-secondary-text leading-relaxed">
              {bp.description}
            </p>
          </Card>
        </AnimatedContainer>

        <AnimatedContainer delay={0.1}>
          <Card className="p-5 sm:p-6 h-full">
            <h3 className="text-lg text-primary-text mb-4">Outcomes</h3>
            <ul className="space-y-2.5 mb-6">
              {(bp.outcomes ?? []).map((o) => (
                <li
                  key={o}
                  className="flex items-start gap-2 text-sm text-primary-text"
                >
                  <Check className="size-4 text-teal-400 shrink-0 mt-0.5" />
                  {o}
                </li>
              ))}
            </ul>
            <h3 className="text-lg text-primary-text mb-4">Benefits</h3>
            <ul className="space-y-2.5">
              {(bp.benefits ?? []).map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-sm text-primary-text"
                >
                  <Check className="size-4 text-[#F5C542] shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
          </Card>
        </AnimatedContainer>
      </div>
    </div>
  );
};

export default BlueprintDetail;
