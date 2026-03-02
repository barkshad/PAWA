import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          className={`
            w-full px-3 py-2.5 text-sm rounded-[var(--radius-input)] border bg-white transition-colors resize-y min-h-[120px]
            placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-0
            ${error 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
              : 'border-slate-300 focus:border-pawa-blue focus:ring-blue-100'
            }
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600 animate-in slide-in-from-top-1 fade-in duration-200">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
