import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { getTodayJournalEntry, getJournalHistory } from '@/lib/actions/journal';
import { JournalEditor } from '@/components/journal/JournalEditor';
import { JournalHistory } from '@/components/journal/JournalHistory';

export default async function JournalPage() {
  const todayEntry = await getTodayJournalEntry();
  const history = await getJournalHistory();

  return (
    <div className="py-8 lg:py-12">
      <Container>
        <header className="mb-12 space-y-2">
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-gray-50 leading-tight">
            Journal
          </h1>
          <p className="text-text-secondary font-medium tracking-wide uppercase text-[10px] ml-1">Reflect on your day, log your wins, and plan for tomorrow</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <Card title="Today's Entry" className="h-full">
              <JournalEditor initialContent={todayEntry?.content || ''} />
            </Card>
          </div>
          
          <div className="lg:col-span-4">
            <Card title="History">
              <JournalHistory entries={history} />
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
