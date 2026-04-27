import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function CTASection() {
  return (
    <section className="py-40 relative overflow-hidden bg-[#0B0F19]">
      <div className="absolute inset-0 bg-secondary/5 -z-20" />
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-secondary/10 blur-[150px] -z-10 rounded-full" />
      
      <Container>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold text-gray-50 mb-8 tracking-tight">
            Start today.
          </h2>
          <p className="text-xl text-text-secondary mb-12 font-medium leading-relaxed">
            Join high performers who use Focus to prioritize their lives and achieve their most important goals. Simple, powerful, and effective.
          </p>
          <Link 
            href="/login" 
            className="px-12 py-6 text-lg font-bold bg-primary text-white rounded-2xl hover:bg-primary-hover transition-all active:scale-[0.98] shadow-[0_0_30px_rgba(99,102,241,0.4)]"
          >
            Start focusing for free
          </Link>
        </div>
      </Container>
    </section>
  );
}
