import { Container } from "@/components/ui/Container";

const features = [
  {
    title: "Top 3 Focus System",
    description: "Only focus on what matters most. Force prioritization and eliminate choice paralysis.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    title: "Daily Progress Tracking",
    description: "Track your actions and measure real progress. Watch your consistency grow with visual streaks.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Avoid List",
    description: "Stay away from distractions that slow you down. Consciously track what you shouldn't be doing.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
  {
    title: "Daily Journal",
    description: "Reflect and improve every day. Log your thoughts, wins, and areas for growth.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-32 bg-[#0B0F19] border-y border-gray-800/50">
      <Container>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-50 mb-6 tracking-tight leading-[1.2]">
            Everything you need to <br className="hidden md:block" /> stay on track
          </h2>
          <p className="text-text-secondary text-lg font-medium">
            A complete system designed to help you focus on what matters and eliminate the noise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-10 rounded-[2.5rem] bg-bg-card/40 border border-border-subtle/50 hover:bg-bg-card hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 shadow-2xl shadow-black/20"
            >
              <div className="w-16 h-16 rounded-3xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl shadow-primary/5 group-hover:shadow-primary/20">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-50 mb-4 tracking-tight group-hover:text-secondary transition-colors">
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed text-lg font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
