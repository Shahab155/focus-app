"use client";

import { useState } from "react";
import { createGoalAction } from "@/lib/actions/tracking";

interface AddActionFormProps {
  goalId: string;
}

export function AddActionForm({ goalId }: AddActionFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [showForm, setShowForm] = useState(false);

  async function action(formData: FormData) {
    setIsPending(true);
    await createGoalAction(goalId, formData);
    setIsPending(false);
    setShowForm(false);
  }

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-full py-4 border border-dashed border-white/10 rounded-xl flex items-center justify-center gap-2 text-[13px] font-medium font-sans text-[#6b7280] hover:border-[#6366f1] hover:text-[#818cf8] transition-all duration-300 mt-4"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add habit / action
      </button>
    );
  }


  return (
    <form action={action} className="mt-8 p-8 bg-bg-card border border-border-subtle rounded-[2.5rem] space-y-6 shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="space-y-3 relative z-10">
        <label className="block text-[12px] font-medium tracking-[0.08em] uppercase text-text-secondary ml-1">New Action / Habit</label>
        <input
          name="name"
          placeholder="e.g. Read 50 pages of system design"
          required
          autoFocus
          className="w-full h-12 px-6 bg-bg-main border border-border-subtle rounded-xl text-sm text-text-primary placeholder:text-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-semibold shadow-inner"
        />
      </div>
      <div className="space-y-3 relative z-10">
        <label className="block text-[12px] font-medium tracking-[0.08em] uppercase text-text-secondary ml-1">Daily Target (Units)</label>
        <input
          name="targetValue"
          type="number"
          placeholder="e.g. 1"
          className="w-full h-12 px-6 bg-bg-main border border-border-subtle rounded-xl text-sm text-text-primary placeholder:text-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-semibold shadow-inner"
        />
      </div>
      <div className="flex justify-end gap-4 pt-2 relative z-10">
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="text-[12px] font-medium tracking-[0.08em] uppercase text-text-secondary hover:text-text-primary transition-colors"
        >
          Dismiss
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="h-12 px-10 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold uppercase transition-all disabled:opacity-50 shadow-lg shadow-primary/20 active:scale-[0.98]"
        >
          {isPending ? "Confirming..." : "Add Action"}
        </button>
      </div>
    </form>
  );
}
