import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { auth } from '@/auth';
import { getUserGoals } from '@/lib/actions/goals';
import { getTodayProgress } from '@/lib/actions/tracking';
import { GoalItem } from '@/components/goals/GoalItem';
import { AddGoalForm } from '@/components/goals/AddGoalForm';
import { getTodayJournalEntry } from '@/lib/actions/journal';
import { getAvoidItemsWithLogs } from '@/lib/actions/avoid';
import { AvoidItem } from '@/components/avoid/AvoidItem';
import { AddAvoidItem } from '@/components/avoid/AddAvoidItem';
import { ActionItem } from '@/components/tracking/ActionItem';
import { DailySummary } from '@/components/tracking/DailySummary';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await auth();
  const goals = await getUserGoals();
  const progress = await getTodayProgress();
  const todayEntry = await getTodayJournalEntry();
  const avoidList = await getAvoidItemsWithLogs();
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="py-8 lg:py-16 relative min-h-screen">
      {/* Dashboard subtle ambient background */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/10 via-bg-main to-transparent -z-10 pointer-events-none blur-3xl opacity-50" />

      <Container>
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1">
            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-gray-50 flex items-center gap-4 leading-tight">
              Hello, {session?.user?.name || session?.user?.email?.split('@')[0] || 'User'}
            </h1>
            <p className="text-text-secondary font-medium tracking-wide uppercase text-[10px] ml-1">{currentDate}</p>
          </div>
          <div className="flex gap-4">
            {/* Optional quick actions or status badges could go here */}
          </div>
        </header>

        <div className="relative z-10">
          <DailySummary progress={progress} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          {/* Main Column: Goals */}
          <div className="lg:col-span-8 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-6 px-2">
                <h2 className="text-sm uppercase font-bold text-text-secondary flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                  Top 3 Goals
                </h2>
              </div>
              <div className="grid gap-6">
                {goals.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-gray-700 rounded-2xl bg-gray-900/50">
                    <div className="w-12 h-12 bg-bg-card rounded-full flex items-center justify-center mb-4 border border-border-subtle">
                      <svg className="w-6 h-6 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-gray-50 mb-1">No goals set</h3>
                    <p className="text-xs text-text-secondary max-w-sm">Focus on what matters most. Set up to 3 goals to track daily.</p>
                  </div>
                ) : (
                  goals.map((goal) => (
                    <GoalItem 
                      key={goal.id} 
                      goal={goal as any} 
                      actions={progress.filter((p: any) => p.goal_id === goal.id)}
                    />
                  ))
                )}
                <AddGoalForm disabled={goals.length >= 3} />
              </div>
            </section>
          </div>

          {/* Sidebar Column: Avoid List, Journal Preview, Checklist */}
          <div className="lg:col-span-4 space-y-8">
            {/* Avoid List */}
            <Card title="Things to Avoid Today" className="border-red-900/20 bg-red-950/10">
              <div className="space-y-4">
                <div className="space-y-2">
                  {avoidList.length === 0 ? (
                    <div className="text-center py-6 text-text-secondary italic text-sm border border-dashed border-border-subtle rounded-xl">
                      No distractions listed yet.
                    </div>
                  ) : (
                    avoidList.map((item) => (
                      <AvoidItem key={item.id} item={item as any} />
                    ))
                  )}
                </div>
                <AddAvoidItem />
              </div>
            </Card>

            {/* Today's Checklist */}
            <Card title="Today's Checklist">
              <div className="space-y-4">
                {progress.length === 0 ? (
                  <div className="text-center py-8 text-text-secondary italic text-sm border border-dashed border-border-subtle rounded-xl">
                    No actions to track today.
                  </div>
                ) : (
                  <div className="space-y-1">
                    {progress.map((action: any) => (
                      <ActionItem key={`summary-${action.action_id}`} action={action} />
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* Journal Preview */}
            <Card title="Journal Preview">
              <div className="space-y-6">
                {todayEntry?.content ? (
                  <div className="p-6 bg-bg-main border border-border-subtle rounded-2xl shadow-inner">
                    <p className="text-sm text-text-secondary line-clamp-4 italic leading-relaxed font-medium">
                      "{todayEntry.content}"
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-12 text-text-secondary italic text-sm border border-dashed border-border-subtle rounded-2xl">
                    No journal entry yet today.
                  </div>
                )}
                <Link 
                  href="/dashboard/journal" 
                  className="block w-full py-4 text-center text-xs font-bold uppercase bg-bg-main border border-border-subtle text-text-primary rounded-xl hover:bg-bg-card hover:border-primary/50 transition-all active:scale-95 shadow-sm"
                >
                  Open Full Journal
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
