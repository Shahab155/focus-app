import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Card = ({ children, title, className = '' }: CardProps) => {
  return (
    <div className={`bg-bg-card/40 backdrop-blur-md border border-border-subtle rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20 hover:border-primary/20 transition-all duration-500 ${className}`}>
      {title && (
        <div className="px-6 py-5 md:px-10 md:py-7 border-b border-border-subtle/50 bg-bg-card/20">
          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-text-heading flex items-center gap-4 tracking-tight">
            <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            {title}
          </h3>
        </div>
      )}
      <div className="p-6 md:p-10">
        {children}
      </div>
    </div>
  );
};
