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
    <div className="flex items-center justify-between group py-[10px] px-[14px] bg-[#1f2937] rounded-[8px] transition-all hover:bg-[#2d3748] shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggle}
          disabled={isPending}
          className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center shrink-0 ${
            avoided 
              ? "bg-[#10b981] border-[#10b981] text-white" 
              : "border-[#374151] hover:border-[#d97706] bg-transparent"
          }`}
        >
          {avoided && (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <span className={`text-[14px] font-medium font-sans transition-all ${avoided ? "text-[#6b7280] line-through decoration-[#6b7280]" : "text-[#d1d5db]"}`}>
          {item.name}
        </span>
      </div>

      <button 
        onClick={handleDelete}
        className="lg:opacity-0 group-hover:opacity-100 p-1 text-[#6b7280] hover:text-[#ef4444] transition-opacity"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

