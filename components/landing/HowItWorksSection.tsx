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
    <section className="py-32 bg-bg-section">
      <Container>
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-12 items-start">
          <div className="lg:w-1/3 sticky top-32">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-50 mb-8 tracking-tight leading-[1.2]">
              Simple, yet <br /> highly effective.
            </h2>
            <p className="text-text-secondary text-lg font-medium leading-snug">
              We built Focus based on proven productivity methods used by high performers. No complex setups, just results.
            </p>
          </div>
          
          <div className="lg:w-2/3 space-y-16 relative">
            {/* Connecting line */}
            <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-gray-800 -z-10 hidden md:block" />
            
            {steps.map((step, index) => (
              <div key={index} className="flex gap-8 md:gap-12 relative group">
                <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.3)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all duration-500 ring-8 ring-bg-section">
                  {step.number}
                </div>
                <div className="pt-3">
                  <h3 className="text-2xl font-bold text-gray-50 mb-4 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-lg leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
