import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="pt-20 px-4 pb-8 lg:pt-6 lg:ml-56 lg:px-10 lg:pb-10">{children}</main>
    </div>
  );
}
