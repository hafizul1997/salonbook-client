
import AdminSidebar from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FCFAF7] md:flex">
      <AdminSidebar />

      <main className="min-w-0 flex-1 p-5 md:p-8">
        {children}
      </main>
    </div>
  );
}
