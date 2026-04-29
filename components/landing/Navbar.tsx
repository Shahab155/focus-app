import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-bg-main/80 backdrop-blur-xl border-2 border-border-subtle/100">
      <Container>
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transition-all group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-2xl text-gray-50 tracking-tighter">Focus</span>
          </Link>
          
          <div className="flex items-center gap-8">
           
            <Link 
              href="/login" 
              className="text-xs font-bold bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary-hover transition-all active:scale-95 shadow-lg shadow-primary/20 uppercase"
            >
              Get Started
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
}
