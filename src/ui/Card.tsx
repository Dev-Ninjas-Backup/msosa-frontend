import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  backgroundColor?: string;
  shadow?: string;
  backdropBlur?: string;
  id?: string;
};

const Card = ({
  children,
  className,
  borderColor = "var(--border-color)",
  backgroundColor = "var(--card-bg)",
  shadow = "0 0 40px rgba(255, 255, 255, 0.05)",
  backdropBlur = "6px",
  id,
}: CardProps) => {
  return (
    <div
      id={id}
      className={cn("rounded-[16px] border", className)}
      style={{
        borderColor,
        backgroundColor,
        backdropFilter: `blur(${backdropBlur})`,
        boxShadow: shadow,
      }}
    >
      {children}
    </div>
  );
};

export default Card;
