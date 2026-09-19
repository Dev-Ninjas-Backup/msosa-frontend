import { Link } from "react-router-dom";
import { ArrowRight, FileText, ImageIcon, Info, Plus } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";
import { useMemberPortal } from "@/pages/shared/member/MemberPortalContext";

const ActiveReflections = () => {
  const { path } = useMemberPortal();

  return (
    <AnimatedContainer delay={0.1}>
      <Card className="p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-5">
          <h2 className="font-playfair text-xl text-primary-text">
            Active Reflections
          </h2>
          <Info className="size-4.5 text-black fill-[#FFFFFF99]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5 flex flex-col">
            <div className="w-full h-[88px] rounded-xl bg-[#0a0c10] border border-white/[0.06] flex items-center justify-center mb-4">
              <div className="flex flex-col items-center gap-1 text-secondary-text/70">
                <ImageIcon className="size-5" />
                <span className="text-[11px]">Cover Image</span>
              </div>
            </div>

            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="size-4 text-secondary-text shrink-0" />
                <h3 className="text-[15px] font-medium text-primary-text truncate">
                  Relationship Reflection
                  <sup className="text-[9px] ml-0.5 text-secondary-text">™</sup>
                </h3>
              </div>
              <span className="shrink-0 rounded-full bg-[#F5C542]/20 text-[#F5C542] text-[10px] font-semibold px-2.5 py-1 tracking-wide uppercase">
                In Progress
              </span>
            </div>

            <p className="text-sm text-secondary-text leading-relaxed mb-4">
              Examine the underlying dynamics of your interpersonal connections
              and attachment.
            </p>

            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-secondary-text">Progress</span>
                <span className="text-primary-text font-medium">65%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: "65%" }}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-secondary-text mb-1.5">
              <span>
                Started:{" "}
                <span className="text-primary-text">Oct 12, 2023</span>
              </span>
              <span>
                LAST ACTIVITY:{" "}
                <span className="text-primary-text">Oct 24, 2023</span>
              </span>
            </div>

            <p className="text-xs text-secondary-text mb-5">
              EST. REMAINING:{" "}
              <span className="text-primary-text">~11 Minutes</span>
            </p>

            <Link to={path("reflection-room")} className="mt-auto">
              <button
                type="button"
                className="w-full h-11 rounded-xl bg-[#F5C542] hover:bg-[#e8b93a] text-black text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border-0"
              >
                Continue Reflection
                <ArrowRight className="size-4" />
              </button>
            </Link>
          </div>

          <div className="rounded-2xl border border-dashed border-white/15 bg-transparent flex flex-col items-center justify-center text-center min-h-[340px] p-4 sm:p-5">
            <div className="size-11 rounded-full border border-white/15 bg-white/5 flex items-center justify-center mb-4">
              <Plus className="size-5 text-secondary-text" />
            </div>

            <h3 className="text-base font-medium text-primary-text mb-1.5">
              New Reflection
            </h3>
            <p className="text-sm text-secondary-text mb-6 max-w-[220px] leading-relaxed">
              Start a new journey of personal discovery.
            </p>

            <Link to={path("customer-products")}>
              <button
                type="button"
                className="h-10 px-6 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-primary-text text-sm font-medium transition-colors cursor-pointer"
              >
                Explore Library
              </button>
            </Link>
          </div>
        </div>
      </Card>
    </AnimatedContainer>
  );
};

export default ActiveReflections;
