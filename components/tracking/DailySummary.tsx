"use client";

interface DailySummaryProps {
  progress: any[];
}

export function DailySummary({ progress }: DailySummaryProps) {
  const totalActions = progress.length;
  if (totalActions === 0) return null;

  const averagePercentage = Math.round(
    progress.reduce((acc, curr) => acc + curr.percentage, 0) / totalActions
  );

  const completedActions = progress.filter(p => p.percentage === 100).length;

  return (
    <div className="mb-10 bg-bg-card backdrop-blur-xl border border-border-subtle rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 lg:p-12 shadow-2xl hover:shadow-primary/5 transition-all duration-700 overflow-hidden relative group">
      {/* Decorative gradient backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/5 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-secondary/10 to-primary/5 rounded-full blur-3xl group-hover:scale-110 group-hover:bg-secondary/20 transition-all duration-1000 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-to-tr from-primary/10 to-secondary/5 rounded-full blur-3xl group-hover:scale-110 transition-all duration-1000 pointer-events-none" />

      <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-1000 transform group-hover:scale-110 group-hover:rotate-12 pointer-events-none text-secondary">
        <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-[11px] font-medium tracking-[0.08em] uppercase text-secondary ml-2 opacity-80">Overall Score</h2>
            <div className="flex items-center gap-4 md:gap-6">
              <span className="text-6xl md:text-8xl lg:text-9xl font-bold text-secondary tracking-tighter drop-shadow-[0_0_30px_rgba(16,185,129,0.4)] animate-pulse-subtle">
                {averagePercentage}%
              </span>
              <div className="h-12 md:h-20 w-px bg-secondary/20 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-text-primary font-bold uppercase text-[9px] md:text-[10px] tracking-[0.3em] mb-1">Daily</span>
                <span className="text-[10px] md:text-[11px] font-medium tracking-[0.08em] uppercase text-text-secondary">Performance</span>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-lg w-full space-y-6">
            <div className="flex justify-between text-xs font-bold uppercase tracking-[0.2em] mb-2">
              <span className="text-text-secondary">
                {completedActions} of {totalActions} tasks completed
              </span>
              <span className="text-secondary bg-secondary/10 px-3 py-1.5 rounded-xl border border-secondary/20">{averagePercentage}%</span>
            </div>
            <div className="w-full bg-bg-main h-10 rounded-2xl overflow-hidden p-2 shadow-inner border border-border-subtle/50 relative">
              <div 
                className="h-full bg-gradient-to-r from-secondary via-secondary-hover to-secondary rounded-xl transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(16,185,129,0.3)] relative overflow-hidden"
                style={{ width: `${averagePercentage}%` }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10" />
              </div>
            </div>
            <p className="text-sm text-text-secondary font-medium">
              {averagePercentage === 100 
                ? "Perfect day! You've crushed all your goals." 
                : averagePercentage > 70 
                  ? "Great momentum! Keep pushing to the finish line." 
                  : "Keep going! Small steps lead to big changes."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
