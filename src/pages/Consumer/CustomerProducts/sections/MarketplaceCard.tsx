// src/components/consumer/marketplace/MarketplaceCard.tsx
import { Info, Mic } from "lucide-react";
import Card from "@/ui/Card";
import { Link } from "react-router-dom";
import { useMemberPortal } from "@/pages/shared/member/MemberPortalContext";

type MarketplaceCardProps = {
  image: string;
  category: string;
  duration: string;
  title: string;
  description: string;
  price: string;
};

const MarketplaceCard = ({
  image,
  category,
  duration,
  title,
  description,
  price,
}: MarketplaceCardProps) => {
  const { path } = useMemberPortal();

  return (
    <Card className="overflow-hidden flex flex-col" >
      {/* Image */}
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold tracking-[0.1em] text-[#10B7BA] uppercase">
            {category}
          </span>
          <span className="text-xs text-secondary-text">{duration}</span>
        </div>

        <h3 className="text-base font-medium text-primary-text mb-1.5">
          {title}
          <sup className="text-[#10B7BA] text-[10px]">™</sup>
        </h3>

        <p className="text-sm text-secondary-text leading-relaxed mb-3 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-1.5 mb-4">
          <span className="inline-flex items-center gap-1 rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[11px] text-secondary-text">
            <Mic className="size-3" />
            Voice & Text
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="text-lg font-semibold text-white">{price}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="size-8 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 transition-colors cursor-pointer"
            >
              <Info className="size-3.5" />
            </button>

            {/* Purchase → Checkout */}
            <Link to={path("checkout")}>
              <button
                type="button"
                className="h-9 px-4 rounded-lg bg-[#FBBF24] hover:bg-[#e5a820] text-black text-xs font-semibold transition-colors cursor-pointer border-0"
              >
                Purchase
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MarketplaceCard;