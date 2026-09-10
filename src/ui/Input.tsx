import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Single source of truth for text inputs.
 * import Input from "@/ui/Input";
 */
const inputVariants = cva(
  "w-full min-w-0 rounded-xl text-base outline-none transition-all file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "h-11 px-4 bg-light-bg border border-border text-primary-text placeholder:text-secondary-text focus:border-primary-brand/60 focus:ring-1 focus:ring-primary-brand/40",
        auth: "h-13 px-4 bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:border-primary-brand/60 focus:ring-1 focus:ring-primary-brand/40",
        soft: "h-9 px-3 rounded-md border border-input bg-transparent shadow-xs text-primary-text placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm",
        ghost:
          "h-10 px-0 bg-transparent border-0 border-b border-border/80 rounded-none text-primary-text focus:border-primary-brand",
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
    const hasAffix = leftIcon || rightIcon;

    const field = (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          inputVariants({ variant, inputSize, error }),
          leftIcon && "pl-10",
          rightIcon && "pr-10",
          className
        )}
        {...props}
      />
    );

    if (!hasAffix) return field;

    return (
      <div className={cn("relative w-full", containerClassName)}>
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-text pointer-events-none">
            {leftIcon}
          </span>
        )}
        {field}
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-text">
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
