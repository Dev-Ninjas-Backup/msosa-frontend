/**
 * App UI primitives — single source of truth under `@/ui`.
 *
 * Preferred imports:
 *   import Button from "@/ui/Button";
 *   import Input from "@/ui/Input";
 *   import Select from "@/ui/Select";
 */

export { default as Button, buttonVariants } from "./Button";
export type { ButtonProps } from "./Button";

export { default as Input, inputVariants } from "./Input";
export type { InputProps } from "./Input";

export { default as Select, selectTriggerVariants } from "./Select";
export type { SelectProps, SelectOption } from "./Select";

export { default as Textarea, textareaVariants } from "./Textarea";
export type { TextareaProps } from "./Textarea";

export { default as Switch } from "./Switch";
export type { SwitchProps } from "./Switch";

export { Label } from "./Label";
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "./Popover";
export { Separator } from "./Separator";
export { Avatar, AvatarImage, AvatarFallback } from "./Avatar";
export { Toaster } from "./Sonner";
