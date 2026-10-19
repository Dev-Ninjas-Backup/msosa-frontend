import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  ImageIcon,
  Sparkles,
} from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { useAppSelector } from "@/hooks/useRedux";
import { continuePath } from "@/store/features/MemberJourney/memberJourneySlice";
import { useMemberPortal } from "@/pages/shared/member/MemberPortalContext";

const ACTIVITIES = [
  { id: "assigned", text: "A new Blueprint has been assigned", time: "14 minutes ago" },
  { id: "report", text: "Report is now available", time: "3 hours ago" },
];

const EmployeeDashboard = () => {
  const { path, basePath } = useMemberPortal();
  const stages = useAppSelector((s) => s.memberJourney.stages);
  const [activity, setActivity] = useState(ACTIVITIES);
  const [showJourney, setShowJourney] = useState(false);
  const continueHref = continuePath(basePath, "relationship", stages.relationship);

  return (
    <div className="space-y-5 pb-6">
      <AnimatedContainer delay={0.04}>
        <Card className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F5C542]">
                Relationship™
              </p>
              <p className="mt-2 text-3xl font-semibold text-primary-text">
                7 <span className="text-lg text-secondary-text">/ 8</span>
              </p>
              <p className="mt-1 text-sm text-secondary-text">
                Expected completion Oct 28, 2023
              </p>
            </div>
            <p className="text-sm text-amber-300">In processing: ~12 mins remaining</p>
          </div>
        </Card>
      </AnimatedContainer>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] gap-5">
        <div className="space-y-5 min-w-0">
          <AnimatedContainer delay={0.08}>
            <Card className="p-5 sm:p-6">
              <h2 className="font-playfair text-xl text-primary-text mb-4">
                Assigned Blueprints
              </h2>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
                <div className="mb-4 flex h-[88px] items-center justify-center rounded-xl border border-white/[0.06] bg-[#0a0c10] text-secondary-text/70">
                  <div className="flex flex-col items-center gap-1">
                    <ImageIcon className="size-5" />
                    <span className="text-[11px]">Cover Image</span>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-medium text-primary-text">
                      Product Name™
                    </p>
                    <p className="text-xs text-secondary-text">PRD-009</p>
                  </div>
                  <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold text-amber-300">
                    In Progress
                  </span>
                </div>
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
                  to={continueHref}
                  className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#FBBF24] text-sm font-semibold text-black hover:bg-[#e5a820]"
                >
                  Continue Reflection
                  <ArrowRight className="size-4" />
                </Link>
              </div>
              <button
                type="button"
                onClick={() => setShowJourney((v) => !v)}
                className="mt-4 border-0 bg-transparent p-0 text-sm font-medium text-[#F5C542] cursor-pointer"
              >
                {showJourney ? "Hide journey" : "Load Full Journey"}
              </button>
              {showJourney && (
                <ul className="mt-3 space-y-2 text-sm text-secondary-text">
                  <li>Leadership Blueprint™ · {stages.leadership ?? "reflection"}</li>
                  <li>Relationship™ · {stages.relationship ?? "reflection"}</li>
                  <li>Next cycle · Aug 20, 2026</li>
                </ul>
              )}
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={0.12}>
            <Card className="p-5 sm:p-6">
              <h2 className="font-playfair text-xl text-primary-text mb-4">
                Completed Reports
              </h2>
              <div className="flex flex-col gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="size-5 text-[#F5C542]" />
                  <div>
                    <p className="text-sm font-medium text-primary-text">
                      Leadership Core Analysis™
                    </p>
                    <p className="text-xs text-secondary-text">12 page detailed analysis</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={path("report/relationship-v2")}
                    className="inline-flex h-9 items-center rounded-lg bg-[#FBBF24] px-3 text-xs font-semibold text-black"
                  >
                    View Report
                  </Link>
                  <Link
                    to={path("report/relationship-v2")}
                    className="inline-flex h-9 items-center rounded-lg border border-white/15 px-3 text-xs text-primary-text"
                  >
                    PDF
                  </Link>
                </div>
              </div>
            </Card>
          </AnimatedContainer>
        </div>

        <div className="space-y-5">
          <AnimatedContainer delay={0.1}>
            <Card className="p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary-text">
                Quick Actions
              </h3>
              <div className="mt-4 space-y-2">
                <Link to={continueHref} className="block rounded-xl bg-[#FBBF24] px-4 py-3 text-sm font-semibold text-black">
                  Start Assigned Blueprint
                </Link>
                <Link to={path("report")} className="block rounded-xl border border-white/10 px-4 py-3 text-sm text-primary-text">
                  View Reports
                </Link>
                <Link to={path("continuum")} className="block rounded-xl border border-white/10 px-4 py-3 text-sm text-primary-text">
                  Open Continuum
                </Link>
              </div>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={0.14}>
            <Card className="p-5">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-[#F5C542]" />
                <h3 className="text-sm font-semibold text-primary-text">AI Recommendation</h3>
              </div>
              <Link
                to={path("customer-products")}
                className="mt-3 inline-flex text-sm text-[#F5C542]"
              >
                Explore suggestion
              </Link>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={0.16}>
            <Card className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary-text">
                  Activity
                </h3>
                <button
                  type="button"
                  onClick={() => setActivity([])}
                  className="border-0 bg-transparent p-0 text-[11px] font-semibold text-[#F5C542] cursor-pointer"
                >
                  Clear all
                </button>
              </div>
              {activity.length === 0 ? (
                <p className="text-sm text-secondary-text">No recent activity.</p>
              ) : (
                <ul className="space-y-3">
                  {activity.map((item) => (
                    <li key={item.id}>
                      <p className="text-sm text-primary-text">{item.text}</p>
                      <p className="text-xs text-secondary-text">{item.time}</p>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
