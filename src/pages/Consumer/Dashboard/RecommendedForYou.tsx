// src/components/consumer/dashboard/RecommendedForYou.tsx
import { Link } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Card from "@/ui/Card";

const RecommendedForYou = () => {
  return (
    <AnimatedContainer delay={0.15} direction="left">
      <Card className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-xs font-semibold tracking-[0.12em] text-secondary-text uppercase">
            Recommended For You
          </h3>
          <Info className="size-3.5 text-secondary-text" />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <p className="text-sm font-medium text-primary-text">
            Relationship
            <sup className="text-[#10B7BA] text-[10px]">™</sup>
          </p>
        </div>

        <div className="rounded-xl border-2 border-[#FBBF241A] bg-[#FBBF240D] p-3.5 mb-3">
          <p className="text-sm text-primary-text leading-relaxed">
            &ldquo;Based on your recent reflections on leadership stressors, we
            suggest exploring the{" "}
            <span className="text-[#FBBF24]">
              Executive Function & Clarity Reflection™
            </span>{" "}
            next.&rdquo;
          </p>
        </div>

        <Link
          to="/consumer/customer-products"
          className="inline-flex items-center gap-1.5 text-sm text-[#FBBF24] hover:opacity-80 transition-opacity"
        >
          Explore suggestion
          <ArrowRight className="size-3.5" />
        </Link>
      </Card>
    </AnimatedContainer>
  );
};

export default RecommendedForYou;