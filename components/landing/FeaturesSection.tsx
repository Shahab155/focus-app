"use client";

import { useEffect, useState, useRef } from "react";
import { Container } from "@/components/ui/Container";

const features = [
  {
    number: "01",
    title: "Top 3 Focus System",
    description: "Force prioritization by limiting your daily focus to just three core objectives. Eliminate choice paralysis and ensure your energy goes where it matters most. Build the habit of finishing what you start.",
    icon: (
      <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Daily Progress Tracking",
    description: "Track performance metrics as they happen with visual progress bars. Get instant insights into your consistency and streaks. Watch your progress grow as you commit to your daily habits and goals.",
    icon: (
      <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Avoid List",
    description: "Consciously stay away from distractions that slow you down. By tracking what you shouldn't be doing, you create more space for high-impact work. Master your environment and protect your deep focus.",
    icon: (
      <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Daily Journal",
    description: "Reflect on your wins and lessons every single day. A dedicated space to clear your mind, document your journey, and plan your next steps. Self-reflection is the key to consistent long-term growth.",
    icon: (
      <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
];

export function FeaturesSection() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (!mounted) return;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate progress dot position
      const featuresSection = document.getElementById("features-section");
      if (featuresSection) {
        const rect = featuresSection.getBoundingClientRect();
        const totalHeight = rect.height - windowHeight;
        const currentProgress = Math.max(0, Math.min(1, -rect.top / totalHeight));
        setScrollProgress(currentProgress);
      }

      // Detect active section
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);


  return (
    <section id="features-section" className="relative bg-bg-main py-10 lg:py-20">
      <Container>
        <div className="flex flex-col lg:flex-row items-start relative">
          {/* LEFT Column: Sticky on Desktop, Normal flow on Mobile */}
          <div className="w-full lg:w-[40%] lg:h-screen lg:sticky lg:top-18 lg:flex-shrink-0 flex flex-col justify-center p-8 md:p-[40px_24px_24px_24px] lg:p-0 lg:pr-20 z-10">
            
            <h2 className="text-[36px] md:text-[52px] font-extrabold text-white leading-[1.2] lg:leading-[1.1] mb-3 lg:mb-8 font-heading tracking-tight">
              Everything you need{"\n"}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
                to stay on track
              </span>
            </h2>
            <p className="text-[15px] lg:text-[16px] text-[#9ca3af] leading-relaxed mt-3 lg:mb-12 max-w-[420px] font-sans">
              I built a system that prioritizes clarity over complexity. No clutter, just the features you need to master your day.
            </p>

            {/* Vertical Progress Line - Hidden on Mobile */}
            <div className="hidden lg:block relative h-48 w-[2px] bg-[#1f2937] ml-1 mt-12">
              <div
                className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#6366f1] rounded-full shadow-[0_0_12px_rgba(99,102,241,0.6)] transition-all duration-100 ease-out"
                style={{ top: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>

          {/* RIGHT Column: Features list */}
          <div className="w-full lg:flex-1 lg:overflow-visible z-20">
            {features.map((feature, index) => (
              <section
                key={index}
                ref={(el) => { sectionRefs.current[index] = el; }}
                className={`min-h-auto lg:min-h-[60vh] relative transition-all duration-700 ease-out p-6 md:p-[32px_24px] lg:pt-32 lg:pb-20 border-t border-white/6 lg:border-t-0 ${
                  activeSection === index 
                    ? "opacity-100 translate-x-0" 
                    : "lg:opacity-40 lg:translate-x-10 opacity-100 translate-x-0"
                }`}
              >
                {/* Giant Number */}
                <span className="absolute top-4 lg:top-16 left-0 text-[64px] lg:text-[120px] font-extrabold text-[#6366f1] opacity-[0.06] lg:opacity-[0.08] leading-none pointer-events-none select-none font-heading">
                  {feature.number}
                </span>

                <div className="relative z-10 pl-2 lg:pl-4">
                 
                  {/* Title */}
                  <h3 className={`text-[20px] lg:text-[26px] font-bold mb-4 lg:mb-6 font-heading transition-colors duration-500 ${
                    activeSection === index ? "text-white" : "lg:text-[#4b5563] text-white"
                  }`}>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[15px] lg:text-[16px] text-[#9ca3af] leading-[1.7] lg:leading-[1.75] max-w-[520px] font-sans">
                    {feature.description}
                  </p>
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </section>

  );
}
