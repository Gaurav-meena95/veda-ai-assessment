import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-98 cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary: "bg-primary-orange text-white hover:bg-orange-600 focus-visible:ring-primary-orange",
        dark: "bg-dark-btn text-white hover:bg-black focus-visible:ring-dark-btn",
        outline: "border border-border-custom bg-transparent text-text-primary hover:bg-gray-50 focus-visible:ring-gray-400",
        ghost: "hover:bg-gray-100 hover:text-text-primary text-text-secondary focus-visible:ring-gray-400",
        danger: "bg-badge-challenging-bg text-badge-challenging-text hover:bg-red-100 focus-visible:ring-badge-challenging-text",
      },
      size: {
        default: "h-11 px-6 rounded-lg text-sm",
        sm: "h-9 px-4 rounded-md text-xs",
        lg: "h-12 px-8 rounded-xl text-base",
        icon: "h-10 w-10 rounded-lg p-0",
        full: "w-full h-11 px-6 rounded-full text-sm",
        "pill-dark": "h-11 px-6 rounded-full bg-dark-btn text-white hover:bg-black focus-visible:ring-dark-btn text-sm",
        "pill-outline": "h-11 px-6 rounded-full border border-border-custom bg-transparent text-text-primary hover:bg-gray-50 focus-visible:ring-gray-400 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
export default Button;
