import { Toaster } from "@/components/ui/toaster"
import '../globals.css' // Updated path

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log('DashboardLayout rendering');
  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* <Sidebar /> */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
