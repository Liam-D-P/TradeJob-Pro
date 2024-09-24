import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "next-themes"
import ClientProvider from './components/ClientProvider'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TradeJob Pro',
  description: 'Job management for trade professionals',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </ClientProvider>
      </body>
    </html>
  )
}