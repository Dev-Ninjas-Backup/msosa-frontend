// src/components/consumer/dashboard/Card.tsx  (or your shared Card)
import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => (
  <div
    className={cn(
      "rounded-2xl border border-[#FBBF2433] bg-gradient-to-br from-[#FBBF241A] to-[#FBBF2400]",
      className
    )}
    style={{
      background: "linear-gradient(105deg, rgba(251, 191, 36, 0.10) 5.29%, rgba(251, 191, 36, 0.00) 129.15%)",
    }}
  >
    {children}
  </div>
);

export default Card;