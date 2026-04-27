"use client";

import { useState } from "react";

interface Entry {
  id: string;
  date: string;
  content: string;
}

interface JournalHistoryProps {
  entries: any[];
}

export function JournalHistory({ entries }: JournalHistoryProps) {
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-text-secondary italic text-sm">
        No past entries found.
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
      {entries.map((entry) => (
        <div 
          key={entry.id}
          className="group p-6 bg-bg-main backdrop-blur-sm border border-border-subtle rounded-2xl cursor-pointer hover:shadow-2xl hover:-translate-y-1 hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
          onClick={() => setSelectedEntry(entry)}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="flex justify-between items-center mb-2 relative z-10">
            <span className="text-[10px] uppercase font-bold text-secondary flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <p className="text-sm text-gray-400 line-clamp-2 break-words leading-relaxed relative z-10 font-medium">
            {entry.content}
          </p>
        </div>
      ))}

      {/* Entry Detail Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-bg-main/90 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="bg-bg-card backdrop-blur-xl w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-border-subtle animate-in slide-in-from-bottom-8 duration-700">
            <div className="p-10 border-b border-border-subtle/50 flex justify-between items-center bg-bg-card/20">
              <h3 className="font-bold text-gray-50 text-xl flex items-center gap-4 tracking-tight">
                <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                {new Date(selectedEntry.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
              <button 
                onClick={() => setSelectedEntry(null)}
                className="p-2 text-gray-400 hover:text-gray-50 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-10 md:p-12 overflow-y-auto whitespace-pre-wrap leading-relaxed text-text-secondary text-base md:text-lg custom-scrollbar font-medium">
              {selectedEntry.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
