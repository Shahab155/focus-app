import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-32 overflow-hidden bg-[#0B0F19]">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] opacity-10 blur-[120px] bg-gradient-to-b from-primary via-transparent to-transparent -z-10 pointer-events-none rounded-full" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] opacity-10 blur-[100px] bg-secondary/20 -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-40 -left-40 w-[500px] h-[500px] opacity-10 blur-[100px] bg-primary/20 -z-10 rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          
          <div className="relative group">
            {/* Spotlight Glow Behind Headline */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-indigo-500/10 blur-[100px] -z-10 rounded-[100%] pointer-events-none" />
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-gray-50 mb-8 leading-[1.1] relative z-10">
              Focus on <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-300 to-secondary animate-gradient-x">
                What Matters.
              </span>
            </h1>
          </div>
          
          <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl leading-relaxed font-medium">
            Track your top priorities, eliminate distractions, and improve daily. The ultimate productivity system for high performers.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <Link 
              href="/login" 
              className="group relative w-full sm:w-auto px-10 py-5 text-base font-bold bg-primary text-white rounded-2xl hover:bg-primary-hover transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] active:scale-[0.98] overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </Link>
            
            <Link 
              href="/login" 
              className="w-full sm:w-auto px-10 py-5 text-base font-bold bg-gray-800 text-gray-300 rounded-2xl hover:bg-gray-700 hover:text-white transition-all border border-gray-700 active:scale-[0.98]"
            >
              View Dashboard Preview
            </Link>
          </div>
        </div>

        {/* Dashboard Mockup - Premium Glassmorphism */}
        <div className="mt-24 mx-auto max-w-5xl group perspective-1000">
          <div className="relative rounded-[2rem] border border-gray-700/50 bg-gray-800/40 backdrop-blur-2xl p-3 md:p-6 shadow-2xl transition-all duration-700 hover:rotate-x-2 hover:rotate-y-1 hover:shadow-indigo-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700/20 to-transparent pointer-events-none rounded-[2rem]" />
            
            <div className="relative rounded-2xl border border-gray-700 bg-gray-900 overflow-hidden shadow-2xl">
              {/* Fake Browser Header */}
              <div className="h-12 border-b border-gray-800 flex items-center px-5 gap-2 bg-gray-900/80">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                </div>
                <div className="mx-auto w-32 h-2 bg-gray-800 rounded-full" />
              </div>
              
              {/* Fake Dashboard Content */}
              <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10">
                {/* Main Content Area */}
                <div className="flex-1 space-y-8">
                  <div className="space-y-3">
                    <div className="h-10 w-56 bg-gray-800 rounded-xl" />
                    <div className="h-4 w-72 bg-gray-800/50 rounded-lg" />
                  </div>
                  
                  <div className="space-y-5">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-24 w-full bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5 flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <div className="h-5 w-40 bg-gray-700 rounded-lg" />
                          <div className="h-7 w-20 bg-secondary/10 border border-secondary/20 rounded-full" />
                        </div>
                        <div className="h-2.5 w-full bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-secondary rounded-full w-[70%] shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Sidebar Area */}
                <div className="w-full md:w-72 space-y-8 hidden lg:block">
                  <div className="h-48 w-full bg-gray-800 border border-gray-700 rounded-[2rem] p-6 flex flex-col items-center justify-center gap-4 shadow-xl">
                     <div className="text-5xl font-bold text-secondary tracking-tighter">85%</div>
                     <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Today's Score</div>
                  </div>
                  <div className="h-40 w-full bg-red-500/5 border border-red-500/10 rounded-[2rem] p-6">
                    <div className="h-5 w-32 bg-red-500/20 rounded-lg mb-5" />
                    <div className="space-y-3">
                      <div className="h-3.5 w-full bg-red-500/10 rounded-md" />
                      <div className="h-3.5 w-4/5 bg-red-500/10 rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
