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
    <div className="flex flex-col py-4 border-b border-white/5 last:border-0 group">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          {/* Status Circle */}
          <button
            onClick={handleToggle}
            disabled={isPending}
            className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center shrink-0 ${
              isCompleted 
                ? "bg-[#10b981] border-[#10b981] text-white" 
                : "border-[#374151] hover:border-[#6366f1] bg-transparent"
            }`}
          >
            {isCompleted && (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1">
            <span className={`text-[15px] font-medium font-sans transition-colors ${isCompleted ? "text-[#6b7280] line-through decoration-[#6b7280]" : "text-[#d1d5db]"}`}>
              {action.name}
            </span>
            {action.streak > 0 && (
              <span className="inline-flex items-center gap-1.5 px-[10px] py-[3px] bg-indigo-500/15 border border-indigo-500/25 text-[#818cf8] text-[11px] font-semibold font-sans rounded-full whitespace-nowrap">
                ⚡ {action.streak} DAY STREAK
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
                className="w-10 text-right bg-transparent text-[13px] font-semibold text-[#10b981] border-none focus:ring-0 p-0 tabular-nums"
              />
              <span className="text-[13px] text-[#6b7280]">/ {action.target_value}</span>
            </div>
          )}

          <button 
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 p-1 text-text-secondary hover:text-warning transition-opacity"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {!isCheckbox && (
        <div className="mt-3 pl-9">
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-[#1f2937] h-[6px] rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-[#10b981] to-[#34d399] transition-all duration-700 ease-out shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-[13px] font-semibold text-[#10b981] w-10 text-right font-sans tabular-nums">{percentage}%</span>
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
                className="flex-1 h-1.5 bg-[#1f2937] rounded-lg appearance-none cursor-pointer accent-[#10b981]"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

