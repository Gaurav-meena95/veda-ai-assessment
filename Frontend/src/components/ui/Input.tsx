import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-lg border border-border-custom bg-white px-4 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-orange/50 focus:border-primary-orange disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-150",
              error && "border-badge-challenging-text focus:ring-badge-challenging-text/50 focus:border-badge-challenging-text",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-badge-challenging-text font-medium">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
export default Input;
