"use client";

import { useState } from "react";
import { deleteGoal, updateGoal } from "@/lib/actions/goals";
import { ActionItem } from "../tracking/ActionItem";
import { AddActionForm } from "../tracking/AddActionForm";

interface Goal {
  id: string;
  title: string;
  description: string | null;
}

interface GoalItemProps {
  goal: Goal;
  actions: any[];
}

export function GoalItem({ goal, actions }: GoalItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this goal?")) return;
    setIsPending(true);
    await deleteGoal(goal.id);
    setIsPending(false);
  }

  async function handleUpdate(formData: FormData) {
    setIsPending(true);
    await updateGoal(goal.id, formData);
    setIsEditing(false);
    setIsPending(false);
  }

  if (isEditing) {
    return (
      <form action={handleUpdate} className="p-10 bg-bg-card border border-border-subtle rounded-[2.5rem] space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <div className="space-y-3 relative z-10">
          <label className="block text-[11px] font-medium tracking-[0.08em] uppercase text-text-secondary opacity-70">Focus Goal Title</label>
          <input
            name="title"
            defaultValue={goal.title}
            required
            autoFocus
            className="w-full bg-bg-main border border-border-subtle rounded-xl px-6 py-4 text-sm text-text-primary placeholder:text-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-bold shadow-inner"
          />
        </div>
        <div className="space-y-3 relative z-10">
          <label className="block text-[11px] font-medium tracking-[0.08em] uppercase text-text-secondary opacity-70">Context / Motivation</label>
          <textarea
            name="description"
            defaultValue={goal.description || ""}
            className="w-full bg-bg-main border border-border-subtle rounded-xl px-6 py-4 text-sm text-text-primary placeholder:text-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium leading-relaxed resize-none shadow-inner"
            rows={3}
          />
        </div>
        <div className="flex gap-4 justify-end pt-4 relative z-10">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="text-[11px] font-medium tracking-[0.08em] uppercase text-text-secondary hover:text-text-primary transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-primary/20 active:scale-95"
          >
            {isPending ? "Syncing..." : "Update Focus Goal"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="group p-5 md:p-7 bg-[#111827] border border-white/6 rounded-[16px] shadow-sm hover:shadow-primary/5 hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
      {/* Subtle hover gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

      <div className="flex justify-between items-start relative z-10">
        <div>
          <h4 className="text-lg md:text-[20px] font-semibold text-white font-heading tracking-tight leading-tight">{goal.title}</h4>
          {goal.description && (
            <p className="text-[13px] md:text-[14px] text-text-secondary mt-2 leading-relaxed font-medium">{goal.description}</p>
          )}
        </div>
        <div className="flex gap-1 lg:opacity-0 group-hover:opacity-100 transition-all duration-300">

          <button
            onClick={() => setIsEditing(true)}
            className="p-2.5 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
            title="Edit"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="p-1.5 text-text-secondary hover:text-warning rounded-lg transition-colors"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Daily Tracking Section */}
      <div className="mt-6 pt-5 border-t border-border-subtle relative z-10">
        <div className="space-y-1 mb-4">
          {actions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 border border-dashed border-border-subtle rounded-2xl bg-bg-main/30 group/empty">
              <div className="w-10 h-10 rounded-full bg-bg-card flex items-center justify-center mb-3 group-hover/empty:scale-110 transition-transform duration-500">
                <svg className="w-5 h-5 text-text-secondary opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-[10px] text-text-secondary uppercase font-bold tracking-[0.2em]">
                No daily actions defined
              </p>
            </div>
          ) : (
            actions.map((action) => (
              <ActionItem key={action.action_id} action={action} />
            ))
          )}
        </div>
        <AddActionForm goalId={goal.id} />
      </div>
    </div>
  );
}
