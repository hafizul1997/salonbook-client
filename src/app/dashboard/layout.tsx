
import DashboardSidebar from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FCFAF7] md:flex">
      <DashboardSidebar />

      <main className="min-w-0 flex-1 p-5 md:p-8">
        {children}
      </main>
    </div>
  );
}
