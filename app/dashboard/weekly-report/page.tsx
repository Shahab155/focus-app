import { Container } from '@/components/ui/Container';
import { getWeeklyReport } from '@/lib/actions/goals';
import { GoalReportCard } from '@/components/tracking/GoalReportCard';

export default async function WeeklyReportPage() {
  const report = await getWeeklyReport();

  return (
    <div className="py-8 lg:py-12">
      <Container>
        <header className="mb-12 space-y-2">
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-gray-50 leading-tight">
            Weekly Report
          </h1>
          <p className="text-text-secondary font-medium tracking-wide uppercase text-[10px] ml-1">Your performance over the last 7 days</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {report.length === 0 ? (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-800 rounded-3xl text-gray-500">
              No data available for the last 7 days.
            </div>
          ) : (
            report.map((goal: any) => (
              <GoalReportCard key={goal.title} goal={goal} />
            ))
          )}
        </div>
      </Container>
    </div>
  );
}
