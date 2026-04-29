import { Container } from "@/components/ui/Container";

const steps = [
  {
    number: "01",
    title: "Set your top 3 goals",
    description: "Define the three most important things you want to achieve. Keeping it to three ensures you actually get them done.",
  },
  {
    number: "02",
    title: "Track daily actions",
    description: "Break your goals down into daily actions. Track your progress with measurable numbers or simple checklists.",
  },
  {
    number: "03",
    title: "Review your progress",
    description: "Use the weekly report to see your consistency. Adjust your actions and keep building your streaks.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#0a0c14] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-[36px] md:text-[52px] font-extrabold text-white mb-6 tracking-tight leading-tight font-heading">
            Simple, yet <br className="md:hidden" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">highly effective.</span>
          </h2>
          <p className="text-[#9ca3af] text-lg lg:text-xl font-normal leading-relaxed font-sans">
            We built Focus based on proven productivity methods used by high performers. No complex setups, just results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="group relative p-7 rounded-[24px] bg-white/[0.03] border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-2"
            >
              {/* Number Badge */}
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#6366f1] text-white font-bold text-lg mb-8 shadow-[0_8px_20px_rgba(99,102,241,0.25)] group-hover:scale-110 transition-transform duration-500">
                {step.number}
              </div>
              
              <h3 className="text-[20px] md:text-[22px] font-bold text-white mb-4 tracking-tight font-heading">
                {step.title}
              </h3>
              <p className="text-[#9ca3af] text-[16px] leading-[1.6] font-normal font-sans">
                {step.description}
              </p>
              
              {/* Subtle hover line at bottom */}
              <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
