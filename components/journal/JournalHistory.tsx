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
            <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-secondary flex items-center gap-2">
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={() => setSelectedEntry(null)} 
          />
          <div className="bg-[#111827] w-full max-w-2xl rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-white/10 animate-in zoom-in-95 duration-300 relative z-10">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/2">
              <h3 className="font-bold text-white text-xl flex items-center gap-4 tracking-tight font-heading">
                <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                {new Date(selectedEntry.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
              <button 
                onClick={() => setSelectedEntry(null)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-8 md:p-10 overflow-y-auto whitespace-pre-wrap leading-relaxed text-gray-300 text-base md:text-lg custom-scrollbar font-medium font-sans">
              {selectedEntry.content}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
