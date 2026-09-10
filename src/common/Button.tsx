import { ReactNode, forwardRef, ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shared branded Button — use this for all CTAs across the app.
 * Prefer variants (primary | outline | ghost | …) + sizes instead of one-off button styles.
 */
const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-lg text-base font-medium transition-all duration-300 ease-out focus:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-95 transform cursor-pointer! overflow-hidden select-none",
  {
    variants: {
      variant: {
        primary:
          "text-black font-semibold btn-gradient shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]",
        outline:
          "text-primary-brand bg-[linear-gradient(to_right,#77530a,#F0D448,#D4AF37,#77530a,#F0D448,#77530a)] bg-[length:250%_100%] bg-left hover:bg-right shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]",
        secondary:
          "bg-white/5 border border-white/10 text-white hover:bg-white/10",
        ghost:
          "bg-transparent text-white font-semibold uppercase tracking-[0.08em] hover:bg-white/5",
        danger:
          "bg-red-600 text-white border border-red-600 hover:bg-red-700 shadow-sm",
        success:
          "bg-emerald-600 text-white border border-emerald-600 hover:bg-emerald-700 shadow-sm",
        link: "bg-transparent text-white font-medium underline-offset-4 hover:underline px-0! h-auto!",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-10 px-6 text-sm",
        lg: "h-12! px-7 text-base",
        xl: "h-13! px-8 text-lg rounded-[10px]",
        icon: "h-10 w-10 p-0",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  title?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      title,
      leftIcon,
      rightIcon,
      isLoading = false,
      variant = "primary",
      size,
      fullWidth,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const showLeftIcon = leftIcon && !isLoading;
    const showRightIcon = rightIcon && !isLoading;
    const isPrimary = variant === "primary";
    const isOutline = variant === "outline";

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        {...props}
      >
        {isPrimary && (
          <span className="absolute -top-50 -left-40 size-50 rounded-full bg-white/55 blur-2xl pointer-events-none transition-transform duration-700 ease-in-out will-change-transform group-hover:translate-x-[360px] group-hover:translate-y-[220px] z-1" />
        )}

        {isOutline && (
          <span className="absolute inset-[1.5px] rounded-[inherit] bg-[#000307]/90 backdrop-blur-md transition-all duration-800 ease-in-out pointer-events-none z-0" />
        )}

        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin text-current relative z-10" />
        )}

        {showLeftIcon && (
          <span className="flex items-center shrink-0 relative z-10">
            {leftIcon}
          </span>
        )}

        {children ? (
          <span className="relative z-10 flex items-center gap-2">{children}</span>
        ) : (
          title && <span className="relative z-10">{title}</span>
        )}

        {showRightIcon && (
          <span className="flex items-center shrink-0 relative z-10">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export default Button;
