"use client";

import { useState, useEffect } from "react";
import { saveJournalEntry } from "@/lib/actions/journal";

interface JournalEditorProps {
  initialContent: string;
}

export function JournalEditor({ initialContent }: JournalEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [isPending, setIsPending] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    if (content.trim().length === 0) {
      setError("Please write something before saving.");
      return;
    }

    setIsPending(true);
    setError(null);
    const result = await saveJournalEntry(content);
    
    if (result.success) {
      setLastSaved(new Date());
    } else if (result.error) {
      setError(result.error);
    }
    
    setIsPending(false);
  }

  return (
    <div className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Document your journey... What did you learn today?"
        className="w-full h-[500px] p-10 bg-bg-main border border-border-subtle rounded-[2.5rem] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-text-primary leading-relaxed text-lg font-medium shadow-inner placeholder:text-gray-700"
      />
      
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase font-bold text-text-secondary">
          {error ? (
            <span className="text-red-500">{error}</span>
          ) : lastSaved ? (
            <span className="text-secondary flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              Saved at {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          ) : (
            <span>Unsaved changes</span>
          )}
        </div>
        
        <button
          onClick={handleSave}
          disabled={isPending || content === initialContent}
          className="px-10 py-4 bg-primary text-white rounded-2xl font-bold text-xs uppercase hover:bg-primary-hover transition-all disabled:opacity-50 active:scale-[0.98] shadow-lg shadow-primary/20"
        >
          {isPending ? "Saving..." : "Save Entry"}
        </button>
      </div>
    </div>
  );
}
