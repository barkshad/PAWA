import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  footerAction?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, maxWidth = 'lg', footerAction }) => {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className={`flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 ${maxWidthClasses[maxWidth]}`}>
        {children}
      </main>
      <footer className="py-8 text-center border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4 space-y-2">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Progressive Action Welfare Alliance (PAWA). All rights reserved.
          </p>
          {footerAction && (
            <div className="text-xs text-slate-400">
              {footerAction}
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};
