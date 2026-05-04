import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function HeroSection() {



  return (
    <section className="relative py-10 lg:py-16 overflow-hidden bg-bg-main">
      {/* Premium Background Effects */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] opacity-20 blur-[120px] bg-primary -z-10 pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] opacity-10 blur-[120px] bg-secondary -z-10 rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side: Content */}
          <div className="flex flex-col items-start text-left">
            <div className="relative mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 group cursor-default">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">AI Powered Focus System</span>
              </div>
              <h1 className="text-[48px] md:text-[72px] font-extrabold tracking-tight text-white leading-[1.1] relative z-10 font-heading">
                Focus on <br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#818cf8] to-[#10b981]">
                    What Matters.
                  </span>
                  {/* Soft radial glow behind gradient text */}
                  <div className="absolute inset-0 blur-2xl bg-indigo-500/20 -z-10 rounded-full scale-110 opacity-50" />
                </span>
              </h1>
            </div>

            <p className="text-[18px] text-[#9ca3af] mb-10 max-w-[480px] leading-[1.6] font-normal font-sans">
              Track your top priorities, eliminate distractions, and improve daily. Now with an <span className="relative inline-block px-2 ">
                <span className="relative z-10 text-white font-bold">AI Agent</span>
                
              </span> to help you manage your journey effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-3.5 text-white font-semibold rounded-[10px] bg-[#6366f1] transition-all duration-300 hover:brightness-[1.15] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(99,102,241,0.35)] active:scale-[0.98] text-center"
              >
                Get Started
              </Link>

              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-3.5 text-white font-semibold rounded-[10px] bg-transparent border border-white/15 transition-all duration-300 hover:bg-white/5 active:scale-[0.98] text-center"
              >
                View Dashboard Preview
              </Link>
            </div>
          </div>

          {/* Right Side: Floating Mockup */}
          <div className="relative group perspective-1000">
            <div className="relative rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-4 md:p-8 shadow-2xl transition-all duration-1000 group-hover:rotate-x-3 group-hover:rotate-y-[-2deg] group-hover:shadow-indigo-500/20 animate-float">
              {/* Dashboard Content Container */}
              <div className="relative rounded-2xl border border-white/10 bg-[#0c0f1a] overflow-hidden shadow-2xl">
                {/* Fake Browser Header */}
                <div className="h-10 border-b border-white/5 flex items-center px-4 gap-1.5 bg-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  </div>
                  <div className="mx-auto w-24 h-1.5 bg-white/5 rounded-full" />
                </div>

                {/* Real Dashboard Screenshot */}
                {/* Interactive Dashboard Mockup */}
                <div className="relative aspect-[16/10] w-full bg-[#0c0f1a] p-3 md:p-6 overflow-hidden">
                  <div className="flex gap-4 h-full">
                    {/* Mock Sidebar */}
                    <div className="w-12 md:w-16 flex flex-col gap-4 items-center py-2 border-r border-white/5 h-full shrink-0">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={`w-8 h-8 rounded-lg ${i === 1 ? 'bg-primary/20 border border-primary/30' : 'bg-white/5'} flex items-center justify-center`}>
                          <div className={`w-3 h-3 rounded-sm ${i === 1 ? 'bg-primary' : 'bg-white/20'}`} />
                        </div>
                      ))}
                    </div>

                    {/* Mock Main Content */}
                    <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                      {/* Header */}
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <div className="h-4 w-32 bg-white/10 rounded-full" />
                          <div className="h-2 w-20 bg-white/5 rounded-full" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10" />
                      </div>

                      {/* Daily Progress */}
                      <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="h-2 w-24 bg-white/10 rounded-full" />
                          <div className="h-2 w-8 bg-primary/40 rounded-full" />
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full w-[65%] bg-gradient-to-r from-primary to-secondary animate-pulse" />
                        </div>
                      </div>

                      {/* Goals Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {[1, 2].map((i) => (
                          <div key={i} className="p-3 rounded-xl border border-white/5 bg-white/[0.02] space-y-3">
                            <div className="flex gap-2 items-center">
                              <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-primary' : 'bg-secondary'}`} />
                              <div className="h-2 w-16 bg-white/10 rounded-full" />
                            </div>
                            <div className="space-y-1.5">
                              <div className="h-1.5 w-full bg-white/5 rounded-full" />
                              <div className="h-1.5 w-[80%] bg-white/5 rounded-full" />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Avoid List Preview */}
                      <div className="flex-1 p-3 rounded-xl border border-white/5 bg-white/[0.02] space-y-3">
                         <div className="h-2 w-20 bg-amber-500/20 rounded-full" />
                         <div className="space-y-2">
                           {[1, 2, 3].map((i) => (
                             <div key={i} className="flex gap-2 items-center">
                               <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40" />
                               <div className={`h-1.5 rounded-full bg-white/5 ${i === 1 ? 'w-24' : i === 2 ? 'w-32' : 'w-16'}`} />
                             </div>
                           ))}
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Ambient Glows Inside Mockup */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[100px] pointer-events-none" />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-500/20 blur-2xl rounded-full -z-10 animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-500/10 blur-2xl rounded-full -z-10 animate-pulse" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


