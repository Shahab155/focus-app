"use client";

import { useState } from "react";
import { createGoal } from "@/lib/actions/goals";

interface AddGoalFormProps {
  disabled: boolean;
}

export function AddGoalForm({ disabled }: AddGoalFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [showForm, setShowForm] = useState(false);

  async function action(formData: FormData) {
    setIsPending(true);
    setError(null);
    const result = await createGoal(formData);
    if (result?.error) {
      setError(result.error);
    } else {
      (document.getElementById("add-goal-form") as HTMLFormElement)?.reset();
      setShowForm(false);
    }
    setIsPending(false);
  }

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-full py-6 border-2 border-dashed border-border-subtle rounded-[2rem] text-text-secondary font-bold hover:border-primary/50 hover:text-text-primary transition-all group flex flex-col items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-bg-card flex items-center justify-center border border-border-subtle group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        Establish New Focus Goal
      </button>
    );
  }

  if (disabled) {
    return (
      <div className="p-6 bg-bg-card border border-border-subtle rounded-[2rem] text-text-secondary text-sm italic text-center">
        Limit of 3 goals reached. Focus is about elimination.
      </div>
    );
  }

  return (
    <form id="add-goal-form" action={action} className="space-y-5 bg-gray-900 p-6 rounded-[2rem] border border-gray-800 shadow-xl">
      <div className="space-y-4">
        <div className="space-y-3">
          <label className="block text-xs uppercase font-bold text-text-secondary ml-1">Focus Goal Title</label>
          <input
            name="title"
            placeholder="e.g. Master React Performance"
            required
            className="w-full h-12 px-6 bg-bg-main border border-border-subtle rounded-xl text-sm text-text-primary placeholder:text-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-semibold shadow-inner"
          />
        </div>
        <div className="space-y-3">
          <label className="block text-xs uppercase font-bold text-text-secondary ml-1">Context / Why?</label>
          <textarea
            name="description"
            placeholder="Why is this important now?"
            className="w-full p-6 bg-bg-main border border-border-subtle rounded-xl text-sm text-text-primary placeholder:text-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium leading-relaxed resize-none shadow-inner"
            rows={3}
          />
        </div>
        
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-400 text-xs font-bold text-center">{error}</p>
          </div>
        )}

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="text-xs uppercase font-bold text-text-secondary hover:text-text-primary transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="h-12 px-10 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold uppercase transition-all disabled:opacity-50 shadow-lg shadow-primary/20 active:scale-[0.98]"
          >
            {isPending ? "Confirming..." : "Establish Focus Goal"}
          </button>
        </div>
      </div>
    </form>
  );
}
