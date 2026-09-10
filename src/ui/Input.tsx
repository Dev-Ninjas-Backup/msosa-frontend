import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Single source of truth for text inputs.
 * import Input from "@/ui/Input";
 *
 * Always use this instead of raw <input> for text/email/password/search/number.
 * Keep native <input> only for checkbox, radio, file, and color pickers.
 */
const inputVariants = cva(
  "w-full min-w-0 text-base outline-none transition-all duration-200 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "h-11 px-4 rounded-xl bg-light-bg border border-border text-primary-text placeholder:text-secondary-text focus:border-primary-brand/60 focus:ring-1 focus:ring-primary-brand/40",
        auth: "h-13 px-4 rounded-xl bg-white/10 hover:bg-white/[0.13] focus:bg-white/[0.14] border border-white/10 text-white placeholder:text-white/40 focus:border-primary-brand/60 focus:ring-1 focus:ring-primary-brand/40",
        soft: "h-9 px-3 rounded-md border border-input bg-transparent shadow-xs text-primary-text placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm",
        ghost:
          "h-10 px-0 bg-transparent border-0 border-b border-border/80 rounded-none text-primary-text focus:border-primary-brand",
        search:
          "h-11 pl-9 pr-4 rounded-lg bg-light-bg border border-border text-sm text-primary-text placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/5 focus:border-blue-500",
        otp: "h-12 sm:h-14 md:h-16 flex-1 min-w-0 px-0 rounded-[10px] bg-white/10 border border-white/10 text-center text-lg sm:text-xl font-bold text-white focus:border-primary-brand/60 focus:ring-1 focus:ring-primary-brand/40",
      },
      inputSize: {
        sm: "h-9 text-sm",
        md: "",
        lg: "h-13 text-base",
      },
      error: {
        true: "border-red-500 focus:border-red-500 focus:ring-red-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      variant,
      inputSize,
      error,
      leftIcon,
      rightIcon,
      type = "text",
      ...props
    },
    ref
  ) => {
    const hasAffix = Boolean(leftIcon || rightIcon);
    const isOtp = variant === "otp";

    const field = (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          inputVariants({ variant, inputSize, error }),
          leftIcon && !isOtp && "pl-10",
          rightIcon && !isOtp && "pr-12",
          className
        )}
        {...props}
      />
    );

    if (!hasAffix) return field;

    return (
      <div className={cn("relative w-full", isOtp && "flex-1 min-w-0", containerClassName)}>
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-text pointer-events-none flex items-center">
            {leftIcon}
          </span>
        )}
        {field}
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-text flex items-center">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
export default Input;
