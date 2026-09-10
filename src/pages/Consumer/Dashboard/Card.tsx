// src/components/consumer/dashboard/Card.tsx
import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => (
  <div
    className={cn(
      "rounded-[24px] border border-white/[0.08] bg-white/[0.05] backdrop-blur-[6px]",
      className
    )}
  >
    {children}
  </div>
);

export default Card;