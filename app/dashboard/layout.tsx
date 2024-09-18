import { Toaster } from "@/components/ui/toaster"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log('DashboardLayout rendering');
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}