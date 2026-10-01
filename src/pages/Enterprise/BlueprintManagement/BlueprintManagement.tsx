import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, BookOpen, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import Card from "@/ui/Card";
import { cn } from "@/lib/utils";
import AssignEmployeesModal from "./AssignEmployeesModal";
import { BLUEPRINTS, type BlueprintCard } from "./data";

const Cover = () => (
  <div
    className="flex h-[90px] w-full items-center justify-center rounded-xl"
    style={{
      backgroundImage:
        "linear-gradient(101deg, rgb(26, 26, 26) 60%, rgb(13, 13, 13) 85%)",
    }}
  >
    <div className="flex flex-col items-center gap-1  ">
      <ImageIcon className="size-6 text-white/50" />
      <span className="text-xs text-white">Cover Image</span>
    </div>
  </div>
);

const AvailableCard = ({ bp }: { bp: BlueprintCard }) => (
  <Card
    className="p-6 flex flex-col gap-6 h-full"
    shadow="none"
  >
    <Cover />
    <div className="flex items-center gap-2">
      <span className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white/70">
        <BookOpen className="size-3.5" />
      </span>
      <h3 className="text-base font-semibold text-white tracking-tight">
        {bp.name}
      </h3>
    </div>
    <p className="text-sm text-white/60 leading-5">{bp.description}</p>
    <div className="flex flex-col gap-2.5 text-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="text-white/40">Target</span>
        <span className="font-medium text-white">{bp.target}</span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-white/40">Duration</span>
        <span className="font-medium text-white">{bp.duration}</span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-white/40">Version</span>
        <span className="text-white/60">
          {bp.version} · {bp.lastUpdated}
        </span>
      </div>
    </div>
    <div className="h-px w-full bg-white/10" />
    <div>
      <p className="leading-none">
        <span className="text-2xl font-bold text-[#FBBF24]">
          ${bp.pricePerSeat}
        </span>
        <span className="text-base text-[#9CA3AF]">/seat</span>
      </p>
      <p className="mt-1.5 text-xs text-white/40">Per Seat · Unlimited Seats</p>
    </div>
    <Button
      variant="primary"
      className="mt-auto w-full rounded-xl! bg-[#FBBF24]! text-black! hover:bg-[#e8b93a]! h-12! text-base! font-medium!"
      asChild
    >
      <Link
        to={`/enterprise/blueprint-management/${bp.id}`}
        className="inline-flex items-center justify-center gap-2"
      >
        Purchase Products
        <ArrowRight className="size-4" />
      </Link>
    </Button>
  </Card>
);

const ProgressCard = ({
  bp,
  onAssign,
}: {
  bp: BlueprintCard;
  onAssign: (bp: BlueprintCard) => void;
}) => (
  <Card
    className="p-6 flex flex-col gap-6 h-full"
    shadow="none"
  >
    <Cover />
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <span className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white/70 shrink-0">
          <BookOpen className="size-3.5" />
        </span>
        <h3 className="text-base font-semibold text-white tracking-tight truncate">
          {bp.name}
        </h3>
      </div>
      <span className="shrink-0 rounded-full bg-[rgba(251,191,36,0.2)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FBBF24]">
        In Progress
      </span>
    </div>
    <p className="text-sm text-white/60 leading-5">{bp.description}</p>
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/60">Progress</span>
        <span className="text-white">{bp.progress}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full bg-white"
          style={{ width: `${bp.progress ?? 0}%` }}
        />
      </div>
    </div>
    <div className="flex-1 space-y-2.5 text-sm">
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        <p className="text-white/60">
          Started:
          <span className="text-white"> {bp.started}</span>
        </p>
        <p className="text-white/60 uppercase tracking-wide text-[13px]">
          Last Activity:
          <span className="normal-case text-white"> {bp.lastActivity}</span>
        </p>
      </div>
      <p className="text-white/60 uppercase tracking-wide text-[13px]">
        Est. Remaining:
        <span className="normal-case text-white"> {bp.estRemaining}</span>
      </p>
    </div>
    <div className="mt-auto flex gap-2.5 items-stretch">
      <button
        type="button"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#10B7BA] py-3 text-md font-medium text-black hover:bg-[#0ea5a8] cursor-pointer transition-colors"
        onClick={() => onAssign(bp)}
      >
        Assign to Employees
        <ArrowRight className="size-4" />
      </button>
      <Link
        to={`/enterprise/blueprint-management/${bp.id}`}
        className={cn(
          "inline-flex w-[150px] shrink-0 items-center justify-center rounded-xl",
          "border border-white/[0.12] bg-white/5 px-3.5 text-sm font-medium text-white/70",
          "hover:text-white hover:bg-white/10 no-underline transition-colors"
        )}
      >
        View Details
      </Link>
    </div>
  </Card>
);

const BlueprintManagement = () => {
  const [assignTarget, setAssignTarget] = useState<BlueprintCard | null>(null);

  return (
    <div className="space-y-8 pb-8">
      <AnimatedContainer delay={0.08}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {BLUEPRINTS.map((bp) =>
            bp.status === "in_progress" ? (
              <ProgressCard
                key={bp.id}
                bp={bp}
                onAssign={setAssignTarget}
              />
            ) : (
              <AvailableCard key={bp.id} bp={bp} />
            )
          )}
        </div>
      </AnimatedContainer>

      <div className="rounded-lg bg-white/[0.02] px-4 py-4 flex justify-center">
        <p className="text-[11px] text-white/40 text-center tracking-tight">
          FAR Systems™ uses enterprise-grade encryption. Your personal
          reflection data is private and secure.
        </p>
      </div>

      <AssignEmployeesModal
        isOpen={!!assignTarget}
        reflectionName={assignTarget?.name ?? ""}
        onClose={() => setAssignTarget(null)}
        onAssigned={(count) =>
          toast.success(
            `Assigned ${assignTarget?.name} to ${count} employee${count === 1 ? "" : "s"}.`
          )
        }
      />
    </div>
  );
};

export default BlueprintManagement;
