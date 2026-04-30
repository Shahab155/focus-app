"use client";

import { useState, useEffect } from "react";
import { updateAvoidStatus, deleteAvoidItem } from "@/lib/actions/avoid";

interface AvoidItemProps {
  item: {
    id: string;
    name: string;
    avoided: boolean;
  };
  index?: number;
}

export function AvoidItem({ item, index }: AvoidItemProps) {
  const [avoided, setAvoided] = useState(item.avoided);
  const [isPending, setIsPending] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      setIsDeleting(true);
      await deleteAvoidItem(item.id);
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex items-center justify-between group py-[10px] px-[14px] bg-[#1f2937] rounded-[8px] transition-all hover:bg-[#2d3748] shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggle}
          disabled={isPending || isDeleting}
          className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center shrink-0 disabled:opacity-50 ${
            avoided 
              ? "bg-[#10b981] border-[#10b981] text-white" 
              : "border-[#374151] hover:border-[#d97706] bg-transparent"
          }`}
        >
          {isPending ? (
            <svg className="animate-spin w-3 h-3 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : avoided && (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        {index !== undefined && <span className="text-[#6b7280] font-bold text-[13px] w-4 shrink-0 text-right">{index}.</span>}
        <span className={`text-[14px] font-medium font-sans transition-all ${avoided ? "text-[#6b7280] line-through decoration-[#6b7280]" : "text-[#d1d5db]"}`}>
          {item.name}
        </span>
      </div>

      <button 
        onClick={handleDelete}
        disabled={isDeleting || isPending}
        className="lg:opacity-0 group-hover:opacity-100 p-1 text-[#6b7280] hover:text-[#ef4444] transition-opacity disabled:opacity-50"
      >
        {isDeleting ? (
          <svg className="animate-spin w-3.5 h-3.5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>
    </div>
  );
}

