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
    <div className="relative">
      <header className="mb-6 md:mb-10 flex flex-col gap-1 relative z-10">
        <h1 className="text-[28px] md:text-[36px] font-extrabold tracking-tight text-white font-heading leading-tight">
          Hello, {session?.user?.name || session?.user?.email?.split('@')[0] || 'User'}
        </h1>
        <p className="text-[10px] md:text-[12px] font-medium tracking-[0.1em] uppercase text-[#6b7280] font-sans">
          {currentDate}
        </p>
      </header>

      <div className="relative z-10 mb-10">
        <DailySummary progress={progress} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Main Column: Goals */}
        <div className="lg:col-span-8 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-6 px-2">
              <h2 className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#6b7280] flex items-center gap-3 font-sans">
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                Top 3 Goals
              </h2>
            </div>
            <div className="grid gap-6">
              {goals.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-gray-700 rounded-2xl bg-gray-900/50">
                  <div className="w-12 h-12 bg-[#111827] rounded-full flex items-center justify-center mb-4 border border-white/5">
                    <svg className="w-6 h-6 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1 font-heading">No goals set</h3>
                  <p className="text-[13px] text-text-secondary max-w-sm font-sans">Focus on what matters most. Set up to 3 goals to track daily.</p>
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
        <div className="lg:col-span-4 space-y-6">
          {/* Avoid List */}
          <div className="bg-[#111827] border border-white/5 rounded-[16px] p-6">
            <header className="mb-6 flex items-center justify-between">
              <h3 className="text-[12px] font-semibold text-[#d97706] uppercase tracking-wider flex items-center gap-2 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]"></span>
                Things to Avoid Today
              </h3>
            </header>
            <div className="space-y-3">
              {avoidList.length === 0 ? (
                <div className="text-center py-6 text-[#6b7280] italic text-[13px] border border-dashed border-white/10 rounded-[12px]">
                  No distractions listed yet.
                </div>
              ) : (
                avoidList.map((item, index) => (
                  <AvoidItem key={item.id} item={item as any} index={index + 1} />
                ))
              )}
              <AddAvoidItem />
            </div>
          </div>

          {/* Journal Preview */}
          <div className="bg-[#111827] border border-white/5 rounded-[16px] p-6">
            <header className="mb-6">
              <h3 className="section-label !text-white !font-semibold">Journal Preview</h3>
            </header>
            <div className="space-y-6">
              {todayEntry?.content ? (
                <div className="p-4 bg-[#0c0f1a] border border-white/5 rounded-xl">
                  <p className="text-[14px] text-[#9ca3af] line-clamp-4 italic leading-relaxed font-medium">
                    "{todayEntry.content}"
                  </p>
                </div>
              ) : (
                <div className="text-center py-10 text-[#6b7280] italic text-[13px] border border-dashed border-white/10 rounded-xl">
                  No journal entry yet today.
                </div>
              )}
              <Link 
                href="/dashboard/journal" 
                className="block w-full py-3 text-center text-[12px] font-medium tracking-[0.08em] uppercase bg-white/5 border border-white/5 text-white rounded-[8px] hover:bg-white/10 hover:border-[#6366f1]/50 transition-all active:scale-95 shadow-sm font-sans"
              >
                Open Full Journal
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
