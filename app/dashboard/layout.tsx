import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import '../globals.css' // Updated path

const inter = Inter({ subsets: ['latin'] })

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log('DashboardLayout rendering');
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}