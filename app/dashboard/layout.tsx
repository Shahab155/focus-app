import { Sidebar } from "@/components/ui/Sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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
    <div className="flex min-h-screen bg-[#090c14] font-sans text-text-primary selection:bg-primary/30 selection:text-white">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden p-10">
        {children}
      </main>
    </div>
  );
}

