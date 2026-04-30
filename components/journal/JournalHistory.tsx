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
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-text-secondary italic text-sm">
        No past entries found.
      </div>
    );
  }

  // Show only 3 recent entries in the sidebar preview
  const previewEntries = entries.slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Sidebar Preview List */}
      <div className="space-y-3">
        {previewEntries.map((entry) => (
          <div 
            key={entry.id}
            className="group p-4 bg-bg-main/50 border border-border-subtle rounded-xl cursor-pointer hover:border-primary/50 transition-all duration-300"
            onClick={() => {
              setSelectedEntry(entry);
            }}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold tracking-widest uppercase text-secondary">
                {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <p className="text-xs text-gray-500 line-clamp-1 font-medium">
              {entry.content}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsHistoryModalOpen(true)}
        className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[11px] font-bold uppercase tracking-widest text-text-secondary hover:text-white transition-all flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
        View All History
      </button>

      {/* Full History List Modal (Centered) */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsHistoryModalOpen(false)} 
          />
          <div className="bg-[#090C14] w-full max-w-6xl rounded-[2rem] shadow-[0_0_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col h-[85vh] relative z-10 animate-in zoom-in-95 duration-300">
            {/* Absolute Floating Close Button */}
            <button 
              onClick={() => setIsHistoryModalOpen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-[#1f2937]/80 hover:bg-[#374151] rounded-full flex items-center justify-center text-white transition-all z-20 shadow-lg backdrop-blur-sm border border-white/10 group"
            >
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8 md:p-12 pb-6 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-heading mb-1">Journal History</h2>
              <p className="text-text-secondary text-xs font-bold uppercase tracking-widest">A timeline of your growth</p>
            </div>

            <div className="flex-1 overflow-y-auto px-8 md:px-12 pb-8 md:pb-12 custom-scrollbar bg-gradient-to-b from-transparent to-primary/5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {entries.map((entry) => (
                  <div 
                    key={entry.id}
                    className="group p-8 bg-bg-card/80 backdrop-blur-sm border border-border-subtle rounded-3xl cursor-pointer hover:shadow-2xl hover:-translate-y-1 hover:border-primary/40 transition-all duration-500 relative overflow-hidden"
                    onClick={() => setSelectedEntry(entry)}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="flex justify-between items-center mb-4 relative z-10">
                      <span className="text-[12px] font-bold tracking-widest uppercase text-secondary flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-secondary"></span>
                        {new Date(entry.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-base text-gray-400 line-clamp-3 leading-relaxed relative z-10 font-medium">
                      {entry.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Entry Detail Modal (Centered, Video-style popup) */}
      {selectedEntry && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedEntry(null)} 
          />
          <div className="bg-[#090C14] w-full max-w-4xl rounded-[2rem] shadow-[0_0_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col max-h-[85vh] relative z-10 animate-in zoom-in-95 duration-300">
            {/* Absolute Floating Close Button */}
            <button 
              onClick={() => setSelectedEntry(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-[#1f2937]/80 hover:bg-[#374151] rounded-full flex items-center justify-center text-white transition-all z-20 shadow-lg backdrop-blur-sm border border-white/10 group"
            >
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8 md:p-12 pb-6 relative z-10 pr-16">
              <h3 className="font-bold text-white text-xl md:text-2xl flex items-center gap-4 tracking-tight font-heading">
                <span className="w-3 h-3 rounded-full bg-secondary shadow-[0_0_15px_rgba(16,185,129,0.5)]"></span>
                {new Date(selectedEntry.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
            </div>
            <div className="px-8 md:px-12 pb-10 md:pb-14 overflow-y-auto whitespace-pre-wrap leading-relaxed text-gray-300 text-lg custom-scrollbar font-medium font-sans relative z-10">
              {selectedEntry.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


