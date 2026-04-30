"use client";

import { useState, useEffect, useRef } from "react";
import { saveJournalEntry } from "@/lib/actions/journal";

interface JournalEditorProps {
  initialContent: string;
}

const LANGUAGES = [
  { label: "English", code: "en-US" },
  { label: "Urdu", code: "ur-PK" },
  { label: "Arabic", code: "ar-SA" },
];

export function JournalEditor({ initialContent }: JournalEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [isPending, setIsPending] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  
  // Speech Recognition States
  const [isRecording, setIsRecording] = useState(false);
  const [interimText, setInterimText] = useState("");
  const [selectedLang, setSelectedLang] = useState("en-US");
  const recognitionRef = useRef<any>(null);

  // Browser support check
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);

  useEffect(() => {
    setIsSpeechSupported(
      'webkitSpeechRecognition' in window || 
      'SpeechRecognition' in window
    );
  }, []);

  // Auto-dismiss "no-speech" error
  useEffect(() => {
    if (error?.includes('No speech')) {
      const t = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(t);
    }
  }, [error]);

  // Lazy initialization of Speech Recognition
  const initRecognition = (lang: string) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;

    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      let currentInterim = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          currentInterim += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        setContent((prev) => prev + (prev.length > 0 ? " " : "") + finalTranscript);
      }
      setInterimText(currentInterim);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);

      if (event.error === 'not-allowed') {
        setError(
          "Microphone access denied. Click the 🔒 lock icon in your address bar → allow Microphone → refresh the page."
        );
        setIsRecording(false);
        try { recognition.stop(); } catch (_) {}
      } 
      else if (event.error === 'network') {
        setError("Network error. Speech recognition requires an internet connection.");
        setIsRecording(false);
        try { recognition.stop(); } catch (_) {}
      } 
      else if (event.error === 'no-speech') {
        setError("No speech detected. Please try speaking again.");
      }
      else if (event.error === 'audio-capture') {
        setError("No microphone found. Please connect a microphone and try again.");
        setIsRecording(false);
        try { recognition.stop(); } catch (_) {}
      }
      else {
        setError(`Something went wrong: ${event.error}. Please try again.`);
        setIsRecording(false);
        try { recognition.stop(); } catch (_) {}
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
      setInterimText("");
    };

    return recognition;
  };

  // Update language on the fly
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = selectedLang;
    }
  }, [selectedLang]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  // Auto-save draft to localStorage every 30 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        localStorage.setItem("journal_draft", content);
      }, 30000);
    }
    return () => clearInterval(interval);
  }, [isRecording, content]);

  const toggleRecording = async () => {
    if (isRecording) {
      try {
        recognitionRef.current?.stop();
      } catch (_) {}
      setIsRecording(false);
    } else {
      setError(null);
      
      try {
        // Explicitly check for microphone permission first
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Initialize if not already done
        if (!recognitionRef.current) {
          const recognition = initRecognition(selectedLang);
          if (!recognition) return;
          recognitionRef.current = recognition;
        }

        recognitionRef.current.start();
        setIsRecording(true);
        setError(null);
      } catch (err) {
        console.error("Microphone access failed:", err);
        setError(
          "Microphone access denied. Click the 🔒 lock icon in your address bar → allow Microphone → refresh the page."
        );
        setIsRecording(false);
      }
    }
  };

  const clearContent = () => {
    if (window.confirm("Are you sure you want to clear your entry?")) {
      setContent("");
      localStorage.removeItem("journal_draft");
    }
  };

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
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
      localStorage.removeItem("journal_draft");
    } else if (result.error) {
      setError(result.error);
    }
    
    setIsPending(false);
  }

  return (
    <div className="space-y-6">
       {/* Language Selector */}
       <div className="flex justify-end items-center gap-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6b7280]">Input Language</span>
          <select 
            value={selectedLang} 
            onChange={(e) => setSelectedLang(e.target.value)}
            className="bg-[#111827] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-[#d1d5db] focus:outline-none focus:border-indigo-500 cursor-pointer transition-colors"
          >
            {LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.label}</option>
            ))}
          </select>
       </div>

      <div className="relative group">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start speaking or type your journal entry..."
          className="w-full min-h-[300px] p-[20px] bg-[#111827] border border-white/7 rounded-[12px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none text-[#d1d5db] leading-[1.8] text-[16px] font-normal placeholder:text-[#6b7280] custom-scrollbar font-sans"
        />
        
        {/* Interim Text Display Overlay */}
        {isRecording && interimText && (
          <div className="mt-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
             <p className="text-[#6b7280] italic text-sm leading-relaxed">
               {interimText}...
             </p>
          </div>
        )}
      </div>

      {/* Mic Control Bar */}
      <div className="flex flex-col items-center gap-4 py-8 bg-[#0c0f1a]/80 rounded-[2rem] border border-white/5 backdrop-blur-md">
        {error && (
          <div className="w-full max-w-md mx-auto mb-4 bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-lg p-4 flex items-start gap-3 relative animate-in fade-in slide-in-from-top-1">
            <span className="text-lg">⚠️</span>
            <p className="text-[13px] text-[#f87171] leading-tight pr-6">
              {error}
            </p>
            <button 
              onClick={() => setError(null)}
              className="absolute top-2 right-2 text-[#f87171] hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <div className="flex items-center gap-12">
          {/* STOP Button (only while recording) */}
          <div className="w-12 h-12 flex items-center justify-center">
            {isRecording && (
              <button 
                onClick={() => {
                  try { recognitionRef.current?.stop(); } catch (_) {}
                  setIsRecording(false);
                }}
                className="w-12 h-12 rounded-full bg-[#1f2937] flex items-center justify-center text-white hover:bg-[#374151] transition-all active:scale-95 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              </button>
            )}
          </div>

          {/* Main MIC Button / Support Check */}
          <div className="flex flex-col items-center gap-3">
            {!isSpeechSupported ? (
              <p className="text-[14px] text-[#6b7280] font-normal font-sans">
                Voice input is not supported in your browser. Please use Chrome or Edge.
              </p>
            ) : (
              <>
                <button
                  onClick={toggleRecording}
                  className={`w-[56px] h-[56px] rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl relative ${
                    isRecording 
                      ? "bg-[#10b981] animate-mic-pulse ring-8 ring-[#10b981]/20" 
                      : "bg-[#6366f1] hover:bg-[#818cf8] shadow-indigo-500/30"
                  }`}
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                <span className="text-[12px] font-medium text-[#9ca3af] uppercase tracking-[0.1em] font-sans">
                  {isRecording ? "Recording..." : "Tap to speak"}
                </span>
              </>
            )}
          </div>

          {/* CLEAR Button */}
          <div className="w-12 h-12 flex items-center justify-center">
            <button 
              onClick={clearContent}
              className="text-[13px] font-medium text-[#6b7280] hover:text-[#ef4444] transition-colors uppercase tracking-wider"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer / Save Section */}
      <div className="flex items-center justify-between pt-6">
        <div className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#6b7280] flex items-center gap-2">
          {lastSaved ? (
            <span className="text-[#10b981] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
              Entry saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          ) : (
            <span className="opacity-50">Drafting entry...</span>
          )}
        </div>
        
        <button
          onClick={handleSave}
          disabled={isPending || (content === initialContent && !isSaved && content.length === 0)}
          className={`relative min-w-[160px] px-10 py-4 bg-[#6366f1] text-white rounded-2xl font-bold text-[14px] transition-all disabled:opacity-40 active:scale-[0.98] shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 overflow-hidden group`}
        >
          {isSaved ? (
            <>
              <svg className="w-5 h-5 text-white animate-checkmark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span>Entry saved!</span>
            </>
          ) : (
            <>
              <span className="group-hover:translate-x-[-4px] transition-transform duration-300 flex items-center gap-2">
                {isPending && (
                  <svg className="animate-spin w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isPending ? "Saving..." : "Save Entry"}
              </span>
              {!isPending && (
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
