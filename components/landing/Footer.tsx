import { Container } from "@/components/ui/Container";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-20 bg-bg-main border-t border-white/5">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 text-white font-extrabold text-2xl tracking-tighter mb-6 font-heading">
              <div className="w-10 h-10 bg-[#6366f1] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              Focus
            </div>
            <p className="text-[#9ca3af] text-[16px] leading-relaxed max-w-[320px] font-sans">
              The ultimate productivity system for high performers who want to master their day and achieve their most important goals.
            </p>
          </div>
          
          {/* Links Column 1 */}
          <div>
            <h4 className="text-white font-bold text-[14px] uppercase tracking-wider mb-6 font-heading">Product</h4>
            <ul className="space-y-4">
              <li><Link href="#features" className="text-[#9ca3af] hover:text-[#6366f1] transition-colors text-[16px]">Features</Link></li>
              <li><Link href="#how-it-works" className="text-[#9ca3af] hover:text-[#6366f1] transition-colors text-[16px]">How it works</Link></li>
              <li><Link href="/login" className="text-[#9ca3af] hover:text-[#6366f1] transition-colors text-[16px]">Pricing</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white font-bold text-[14px] uppercase tracking-wider mb-6 font-heading">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/login" className="text-[#9ca3af] hover:text-[#6366f1] transition-colors text-[16px]">About</Link></li>
              <li><Link href="/login" className="text-[#9ca3af] hover:text-[#6366f1] transition-colors text-[16px]">Privacy</Link></li>
              <li><Link href="/login" className="text-[#9ca3af] hover:text-[#6366f1] transition-colors text-[16px]">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#4b5563] text-[14px] font-medium font-sans">
            &copy; {new Date().getFullYear()} Focus. Built for high performers.
          </p>
          <div className="flex items-center gap-6">
            {/* Social Placeholders */}
            <div className="w-5 h-5 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer" />
            <div className="w-5 h-5 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer" />
            <div className="w-5 h-5 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer" />
          </div>
        </div>
      </Container>
    </footer>
  );
}
