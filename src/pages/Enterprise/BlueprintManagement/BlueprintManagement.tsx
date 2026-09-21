import { Link } from "react-router-dom";
import { ArrowRight, ImageIcon, Plus } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import { BLUEPRINTS } from "./data";

const BlueprintManagement = () => {
  return (
    <div className="space-y-5 sm:space-y-6 pb-8">
      <AnimatedContainer delay={0.04}>
        <div className="flex justify-end">
          <Button
            variant="primary"
            size="md"
            className="rounded-xl! bg-[#FBBF24]!"
            onClick={() => toast.success("Purchase Blueprint flow coming soon.")}
          >
            <Plus className="size-4" />
            Purchase Blueprint
          </Button>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.08}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {BLUEPRINTS.map((bp) => (
            <Card key={bp.id} className="p-5 flex flex-col h-full relative">
              {bp.status === "in_progress" ? (
                <span className="absolute top-4 right-4 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-[#F5C542]/15 text-[#F5C542]">
                  In Progress
                </span>
              ) : null}

              <div className="flex items-start gap-3 mb-4 pr-16">
                <span className="flex size-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-secondary-text shrink-0">
                  <ImageIcon className="size-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-primary-text leading-snug">
                    {bp.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-secondary-text leading-relaxed">
                    {bp.description}
                  </p>
                </div>
              </div>

              {bp.status === "in_progress" ? (
                <>
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-secondary-text">Progress</span>
                      <span className="text-primary-text font-medium">
                        {bp.progress}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-white"
                        style={{ width: `${bp.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 text-xs text-secondary-text mb-5">
                    <p>
                      Started:{" "}
                      <span className="text-primary-text">{bp.started}</span>
                    </p>
                    <p>
                      Last Activity:{" "}
                      <span className="text-primary-text">{bp.lastActivity}</span>
                    </p>
                    <p className="text-[#F5C542]">
                      Est. Remaining: {bp.estRemaining}
                    </p>
                  </div>
                  <div className="mt-auto flex flex-col gap-2">
                    <Button
                      variant="success"
                      size="md"
                      className="rounded-xl! w-full bg-teal-500! border-teal-500!"
                      asChild
                    >
                      <Link
                        to={`/enterprise/blueprint-management/${bp.id}`}
                        className="inline-flex items-center justify-center gap-1"
                      >
                        Assign to Employees
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="soft"
                      size="sm"
                      className="rounded-xl! w-full"
                      asChild
                    >
                      <Link to={`/enterprise/blueprint-management/${bp.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <dl className="space-y-2 text-xs mb-5">
                    <div className="flex justify-between gap-3">
                      <dt className="text-secondary-text">Target</dt>
                      <dd className="text-primary-text">{bp.target}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-secondary-text">Duration</dt>
                      <dd className="text-primary-text">{bp.duration}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-secondary-text">Version</dt>
                      <dd className="text-primary-text">{bp.version}</dd>
                    </div>
                  </dl>
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-[#F5C542]">
                      {bp.price}
                      <span className="text-sm font-normal text-secondary-text">
                        /seat
                      </span>
                    </p>
                    <p className="text-[10px] text-secondary-text mt-0.5">
                      Per Seat · Unlimited Seats
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    className={cn("rounded-xl! w-full mt-auto bg-[#FBBF24]!")}
                    asChild
                  >
                    <Link
                      to={`/enterprise/blueprint-management/${bp.id}`}
                      className="inline-flex items-center justify-center gap-1"
                    >
                      Purchase Reflection
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </>
              )}
            </Card>
          ))}
        </div>
      </AnimatedContainer>

      <p className="text-center text-[10px] text-secondary-text/60 tracking-wide max-w-xl mx-auto">
        FAR Systems™ uses enterprise-grade encryption. Your personal reflection
        data is private and secure.
      </p>
    </div>
  );
};

export default BlueprintManagement;
