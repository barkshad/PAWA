import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', isLoading, fullWidth, children, disabled, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-[var(--radius-btn)] text-sm px-4 py-2.5";
    
    const variants = {
      primary: "bg-pawa-red text-white hover:bg-pawa-red-hover focus:ring-pawa-red",
      secondary: "bg-pawa-blue text-white hover:bg-pawa-blue-hover focus:ring-pawa-blue",
      outline: "border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700 focus:ring-slate-400",
      ghost: "bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-slate-400",
    };

    const widthStyles = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${widthStyles} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
