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
        className="text-[10px] uppercase font-bold text-text-secondary hover:text-secondary flex items-center gap-2 mt-4 transition-all group"
      >
        <div className="w-5 h-5 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center group-hover:border-green-500/50 transition-all">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        Add habit/action
      </button>
    );
  }

  return (
    <form action={action} className="mt-8 p-8 bg-bg-card border border-border-subtle rounded-[2.5rem] space-y-6 shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="space-y-3 relative z-10">
        <label className="block text-xs uppercase font-bold text-text-secondary ml-1">New Action / Habit</label>
        <input
          name="name"
          placeholder="e.g. Read 50 pages of system design"
          required
          autoFocus
          className="w-full h-12 px-6 bg-bg-main border border-border-subtle rounded-xl text-sm text-text-primary placeholder:text-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-semibold shadow-inner"
        />
      </div>
      <div className="space-y-3 relative z-10">
        <label className="block text-xs uppercase font-bold text-text-secondary ml-1">Daily Target (Units)</label>
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
          className="text-xs uppercase font-bold text-text-secondary hover:text-text-primary transition-colors"
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
