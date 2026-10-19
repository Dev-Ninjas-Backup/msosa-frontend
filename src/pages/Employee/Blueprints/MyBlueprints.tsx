import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ImageIcon } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { useAppSelector } from "@/hooks/useRedux";
import { continuePath } from "@/store/features/MemberJourney/memberJourneySlice";
import { useMemberPortal } from "@/pages/shared/member/MemberPortalContext";

const STEPS = [
  { title: "Purchase", detail: "Select Blueprint" },
  { title: "Reflect", detail: "Voice & Text" },
  { title: "Review", detail: "Founder Review" },
  { title: "Deliver", detail: "PDF Narrative" },
  { title: "Evolve", detail: "Continuum Updated" },
];

const QUESTIONS = [
  {
    q: "How long does each Blueprint take?",
    a: "A Blueprint session is about 35 minutes. You can leave and return from Continue.",
  },
  {
    q: "Can I pause a Blueprint once I've started?",
    a: "Yes. Resume Later keeps this browser session, and Continue opens the saved stage.",
  },
  {
    q: "Who exactly performs the 'Founder Review'?",
    a: "In this static demo the review step is shown as part of the journey. A live reviewer is Phase 3.",
  },
];

const STATS = [
  { label: "Assigned", value: "12" },
  { label: "Completed", value: "8" },
  { label: "Completion", value: "87%" },
];

const MyBlueprints = () => {
  const { basePath } = useMemberPortal();
  const stage = useAppSelector((s) => s.memberJourney.stages.relationship);
  const [open, setOpen] = useState<string | null>(QUESTIONS[0].q);

  return (
    <div className="space-y-5 pb-6">
      <AnimatedContainer delay={0.04}>
        <div className="grid grid-cols-3 gap-3">
          {STATS.map((stat) => (
            <Card key={stat.label} className="px-4 py-5 text-center">
              <p className="text-2xl font-semibold text-primary-text">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-secondary-text">
                {stat.label}
              </p>
            </Card>
          ))}
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.08}>
        <Card className="p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F5C542]">
            Featured Blueprint
          </p>
          <div className="mt-4 grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
            <div className="flex h-36 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-secondary-text">
              <div className="flex flex-col items-center gap-1">
                <ImageIcon className="size-5" />
                <span className="text-[11px]">Cover Image</span>
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-playfair text-2xl text-primary-text">Relationship™</h2>
                <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold text-amber-300">
                  In Progress
                </span>
              </div>
              <p className="mt-1 text-sm text-secondary-text">
                Personal Clarity Series · Sarah Johnson · ABC Healthcare
              </p>
              <div className="mt-4">
                <div className="mb-1 flex justify-between text-xs text-secondary-text">
                  <span>Progress</span>
                  <span>65%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[65%] rounded-full bg-[#F5C542]" />
                </div>
              </div>
              <p className="mt-3 text-xs text-secondary-text">
                Last activity Oct 24, 2023 · Est. remaining ~15 minutes
              </p>
              <Link
                to={continuePath(basePath, "relationship", stage)}
                className="mt-4 inline-flex h-11 items-center gap-2 rounded-xl bg-[#FBBF24] px-5 text-sm font-semibold text-black"
              >
                Continue Reflection
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Card>
      </AnimatedContainer>

      <AnimatedContainer delay={0.12}>
        <Card className="p-5 sm:p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary-text">
            The Reflection Journey
          </h3>
          <ol className="mt-4 grid gap-3 sm:grid-cols-5">
            {STEPS.map((step, index) => (
              <li key={step.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-[11px] text-[#F5C542]">0{index + 1}</p>
                <p className="mt-1 text-sm font-medium text-primary-text">{step.title}</p>
                <p className="text-xs text-secondary-text">{step.detail}</p>
              </li>
            ))}
          </ol>
        </Card>
      </AnimatedContainer>

      <AnimatedContainer delay={0.16}>
        <Card className="p-5 sm:p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary-text">
            Common Questions
          </h3>
          <div className="mt-4 divide-y divide-white/10">
            {QUESTIONS.map((item) => {
              const isOpen = open === item.q;
              return (
                <div key={item.q} className="py-3">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : item.q)}
                    className="w-full border-0 bg-transparent p-0 text-left text-sm font-medium text-primary-text cursor-pointer"
                  >
                    {item.q}
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-sm leading-relaxed text-secondary-text">{item.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </AnimatedContainer>
    </div>
  );
};

export default MyBlueprints;
