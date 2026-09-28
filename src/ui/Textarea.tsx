import { forwardRef, TextareaHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex field-sizing-content w-full rounded-xl text-base outline-none transition-all disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "min-h-24 px-4 py-3 bg-[#0d1117] border border-border text-primary-text placeholder:text-secondary-text focus:border-primary-brand/60 focus:ring-1 focus:ring-primary-brand/40",
        auth: "min-h-24 px-4 py-3 bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:border-primary-brand/60 focus:ring-1 focus:ring-primary-brand/40",
        soft: "min-h-16 rounded-md border border-input bg-transparent px-3 py-2 shadow-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm",
      },
      error: {
        true: "border-red-500 focus:border-red-500 focus:ring-red-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(textareaVariants({ variant, error }), className)}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
export default Textarea;
