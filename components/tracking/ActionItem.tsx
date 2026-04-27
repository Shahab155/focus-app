"use client";

import { useState, useEffect } from "react";
import { updateProgress, deleteAction } from "@/lib/actions/tracking";

interface ActionItemProps {
  action: {
    action_id: string;
    name: string;
    target_value: number | null;
    completed_value: number;
    percentage: number;
    streak: number;
  };
}

export function ActionItem({ action }: ActionItemProps) {
  const [value, setValue] = useState(action.completed_value);
  const [isPending, setIsPending] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  // Sync state with props when they change (due to revalidation)
  useEffect(() => {
    setValue(action.completed_value);
  }, [action.completed_value]);

  const isCheckbox = !action.target_value;
  const isCompleted = isCheckbox ? value >= 1 : (action.target_value ? value >= action.target_value : false);
  const percentage = action.target_value ? Math.min(Math.round((value / action.target_value) * 100), 100) : (value >= 1 ? 100 : 0);

  async function handleToggle() {
    const newValue = value >= 1 ? 0 : 1;
    setValue(newValue);
    setIsPending(true);
    await updateProgress(action.action_id, newValue);
    setIsPending(false);
  }

  async function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseInt(e.target.value) || 0;
    const clampedValue = action.target_value ? Math.min(newValue, action.target_value) : newValue;
    setValue(clampedValue);
  }

  async function handleUpdate(newValue: number) {
    if (newValue !== action.completed_value) {
      setIsPending(true);
      const result = await updateProgress(action.action_id, newValue);
      if (result.error) {
        // Revert on error
        setValue(action.completed_value);
      }
      setIsPending(false);
    }
  }

  async function handleDelete() {
    if (confirm("Delete this action?")) {
        await deleteAction(action.action_id);
    }
  }

  return (
    <div className="flex flex-col py-3 border-b border-gray-800 last:border-0 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          {isCheckbox ? (
            <button
              onClick={handleToggle}
              disabled={isPending}
              className={`w-6 h-6 rounded-lg border transition-all flex items-center justify-center shrink-0 ${
                isCompleted 
                  ? "bg-secondary border-secondary text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
                  : "border-border-subtle hover:border-gray-500 bg-bg-main/50"
              }`}
            >
              {isCompleted && (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ) : (
            <button
              onClick={() => setShowSlider(!showSlider)}
              className={`w-10 h-10 rounded-xl border transition-all flex items-center justify-center shrink-0 group/btn ${
                isCompleted 
                  ? "bg-secondary border-secondary text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
                  : "border-border-subtle hover:border-primary/50 bg-bg-main/50 text-text-secondary hover:text-primary"
              }`}
            >
              <span className="text-[10px] font-bold">{percentage}%</span>
            </button>
          )}
          
          <div className="flex items-center gap-2.5">
            <span className={`text-sm font-semibold transition-colors ${isCompleted ? "text-text-secondary line-through decoration-text-secondary/50" : "text-text-primary"}`}>
              {action.name}
            </span>
            {action.streak > 0 && (
              <span className="text-[9px] bg-secondary/10 text-secondary px-3 py-1 rounded-full font-bold flex items-center gap-1 border border-secondary/20 shadow-sm uppercase animate-pulse-subtle">
                <svg className="w-3 h-3 text-orange-500 fill-orange-500" viewBox="0 0 24 24">
                  <path d="M17.66 11.5c-.21 0-.41.01-.61.03.55-2.2-.52-4.42-2.3-5.63l-.36-.24-.2.39c-.59 1.15-1.47 2.01-2.52 2.62-1.03.6-2.12.82-3.21.82H8.31c-.38 0-.75.02-1.12.07.13-.65.41-1.26.83-1.78.36-.45.81-.82 1.32-1.09l.4-.22-.36-.29c-1.35-1.07-3.1-1.39-4.66-1.01-1.55.37-2.8 1.48-3.41 3.01C.64 10.38.33 11.9.43 13.43c.17 2.37.91 4.54 2.14 6.33.61.89 1.31 1.7 2.1 2.42 1.41 1.28 3.1 2.21 4.93 2.7 1.83.49 3.73.54 5.58.14 1.85-.4 3.53-1.25 4.96-2.48 1.43-1.23 2.5-2.8 3.12-4.57.62-1.77.78-3.69.45-5.55-.33-1.86-1.16-3.56-2.43-4.94L21 7.37l-.14.21c-.55.85-.92 1.83-1.08 2.87-.08.5-.12 1.01-.12 1.52v.03z" />
                </svg>
                {action.streak} Day Streak
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!isCheckbox && (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={value}
                onChange={handleValueChange}
                onBlur={() => handleUpdate(value)}
                className="w-10 text-right bg-transparent text-sm font-bold border-none focus:ring-0 p-0"
              />
              <span className="text-xs text-text-secondary">/ {action.target_value}</span>
            </div>
          )}

          <button 
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 p-1 text-text-secondary hover:text-red-500 transition-opacity"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {!isCheckbox && (
        <div className="mt-3 pl-8 pr-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-bg-main h-2 rounded-full overflow-hidden relative shadow-inner">
              <div 
                className={`h-full transition-all duration-700 ease-out ${isCompleted ? 'bg-secondary shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-secondary/40'}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-[11px] font-bold text-secondary w-10 text-right">{percentage}%</span>
          </div>
          
          {showSlider && (
            <div className="mt-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
              <input
                type="range"
                min="0"
                max={action.target_value || 1}
                value={value}
                onChange={handleValueChange}
                onMouseUp={() => handleUpdate(value)}
                onTouchEnd={() => handleUpdate(value)}
                className="flex-1 h-1.5 bg-bg-main rounded-lg appearance-none cursor-pointer accent-secondary"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
