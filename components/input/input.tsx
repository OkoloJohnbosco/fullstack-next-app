import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";

const inputClasses = cva(
  [
    "rounded-md",
    "focus:ring-[2px]",
    "transition",
    "font-light",
    "duration-200",
    "ease-in-out",
    "outline-none",
    "w-full",
    "border",
    "ring-blue-500",
    "border-gray-300",
    "hover:border-gray-400",
    "placeholder:text-slate-600",
  ],
  {
    variants: {
      variant: {
        primary: ["bg-transparent", "text-slate-600"],
        secondary: ["bg-gray-100", "text-slate-900"],
      },
      inputSize: {
        xs: ["h-6", "text-xs", "px-2", "py-0"],
        sm: ["h-8", "text-sm", "px-2", "py-2"],
        md: ["h-10", "text-md", "px-2", "py-2"],
        lg: ["h-12", "text-lg", "px-2", "py-2"],
      },
    },
    defaultVariants: {
      variant: "primary",
      inputSize: "md",
    },
  }
);

export interface InputProps
  extends DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    VariantProps<typeof inputClasses> {}

const Input = ({ className, variant, inputSize, ...props }: InputProps) => {
  return (
    <input
      className={inputClasses({ variant, inputSize, className })}
      {...props}
    />
  );
};

export default Input;
