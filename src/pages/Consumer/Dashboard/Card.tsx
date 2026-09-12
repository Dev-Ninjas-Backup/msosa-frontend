// src/components/consumer/dashboard/Card.tsx
import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => (
  <div
    className={cn(
      "rounded-[16px] border border-white/[0.08] bg-white/[0.06] backdrop-blur-[6px] shadow-[0_0_40px_rgba(255,255,255,0.05)]",
      className
    )}
  >
    {children}
  </div>
);

export default Card;