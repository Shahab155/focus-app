import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function CTASection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-bg-main">
      <Container>
        <div className="relative rounded-[32px] lg:rounded-[48px] overflow-hidden bg-[#0c0f1a] border border-white/10 p-12 lg:p-24 text-center">
          {/* Ambient Glows inside the card */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-[36px] md:text-[52px] font-extrabold text-white mb-8 tracking-tight leading-tight font-heading">
              Ready to <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-300 to-emerald-400">master your day?</span>
            </h2>
            <p className="text-lg lg:text-xl text-[#9ca3af] mb-12 font-normal leading-relaxed font-sans">
              Join high performers who use Focus to prioritize their lives and achieve their most important goals. Simple, powerful, and effective.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/login" 
                className="w-full sm:w-auto px-8 py-4 text-lg font-bold bg-[#6366f1] text-white rounded-2xl hover:brightness-110 transition-all active:scale-[0.98] shadow-[0_12px_32px_rgba(99,102,241,0.3)]"
              >
                Start focusing for free
              </Link>
              <Link 
                href="/login" 
                className="w-full sm:w-auto px-8 py-4 text-lg font-bold bg-white/5 text-white border border-white/10 rounded-2xl hover:bg-white/10 transition-all active:scale-[0.98]"
              >
                Sign in to your account
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
