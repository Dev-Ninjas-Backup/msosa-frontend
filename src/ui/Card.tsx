import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  backgroundColor?: string;
  shadow?: string;
  backdropBlur?: string;
};

const Card = ({
  children,
  className,
  borderColor = "#FFFFFF14",
  backgroundColor = "#0D1117",
  shadow = "0 0 40px rgba(255, 255, 255, 0.05)",
  backdropBlur = "6px",
}: CardProps) => {
  return (
    <div
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