import { Container } from "@/components/ui/Container";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-20 bg-[#0B0F19] border-t border-gray-800/50">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 text-gray-50 font-bold text-2xl tracking-tighter">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            Focus
          </div>
          
          <div className="flex items-center gap-8 text-sm font-bold text-gray-400">
            <Link href="/login" className="hover:text-gray-50 transition-colors">Login</Link>
            <Link href="/login" className="hover:text-gray-50 transition-colors">Sign up</Link>
            <Link href="#features" className="hover:text-gray-50 transition-colors">Features</Link>
          </div>
        </div>
        
        <div className="mt-16 text-center text-[10px] font-bold text-text-secondary uppercase">
          &copy; {new Date().getFullYear()} Focus. Built for high performers.
        </div>
      </Container>
    </footer>
  );
}
