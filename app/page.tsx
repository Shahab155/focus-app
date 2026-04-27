import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';

export default async function Home() {
  const session = await auth();

  // Redirect authenticated users straight to the dashboard
  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-main font-sans selection:bg-primary/30 selection:text-white">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}
