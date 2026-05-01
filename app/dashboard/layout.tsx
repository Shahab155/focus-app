import { Sidebar } from "@/components/ui/Sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ChatAssistant from "@/components/chat/ChatAssistant";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#090c14] font-sans text-text-primary selection:bg-primary/30 selection:text-white">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden p-4 md:p-8 lg:p-10">
        {children}
      </main>
      <ChatAssistant />
    </div>
  );
}

