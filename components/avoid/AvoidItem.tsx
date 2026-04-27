"use client";

import { useState, useEffect } from "react";
import { updateAvoidStatus, deleteAvoidItem } from "@/lib/actions/avoid";

interface AvoidItemProps {
  item: {
    id: string;
    name: string;
    avoided: boolean;
  };
}

export function AvoidItem({ item }: AvoidItemProps) {
  const [avoided, setAvoided] = useState(item.avoided);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setAvoided(item.avoided);
  }, [item.avoided]);

  async function handleToggle() {
    const newValue = !avoided;
    setAvoided(newValue);
    setIsPending(true);
    await updateAvoidStatus(item.id, newValue);
    setIsPending(false);
  }

  async function handleDelete() {
    if (confirm("Remove this from your avoid list?")) {
      await deleteAvoidItem(item.id);
    }
  }

  return (
    <div className="flex items-center justify-between group py-4 px-6 bg-bg-main border border-border-subtle rounded-2xl transition-all hover:border-red-900/40 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={handleToggle}
          disabled={isPending}
          className={`w-10 h-10 rounded-xl border-2 transition-all flex items-center justify-center shrink-0 ${
            avoided 
              ? "bg-secondary border-secondary text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
              : "bg-bg-card border-red-500/30 text-red-500/50 hover:border-red-500 hover:text-red-500 shadow-sm"
          }`}
        >
          {avoided ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
        <div className="flex flex-col">
          <span className={`text-sm font-bold transition-all ${avoided ? "text-secondary/60 line-through decoration-secondary/30" : "text-text-primary"}`}>
            {item.name}
          </span>
          <span className="text-[9px] uppercase font-bold text-text-secondary opacity-50 tracking-widest">
            {avoided ? "Avoided Successfully" : "Potential Distraction"}
          </span>
        </div>
      </div>

      <button 
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 p-1 text-zinc-300 hover:text-red-500 transition-opacity"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}
