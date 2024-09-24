// This is the profile page for the landing page if the user hits the profile link in the navigation bar

'use client'

import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs"
import { LoginLink, RegisterLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Building } from "lucide-react"
import { useState, useEffect } from "react"

export default function ProfilePage() {
  const { user, isAuthenticated } = useKindeAuth()
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated && user) {
      setUserName(user.given_name || user.family_name || user.email || 'User');
    }
  }, [isAuthenticated, user])

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background-dark">
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/0 backdrop-blur-sm" />
        <div className="relative px-4 lg:px-6 h-14 flex items-center">
          <Link className="flex items-center justify-center" href="#">
            <Building className="h-6 w-6 mr-2" />
            <span className="font-bold">TradeJob Pro</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
              Features
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
              Pricing
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#faq">
              FAQ
            </Link>
            {isAuthenticated ? (
              <>
                <span className="text-sm font-medium">
                  Welcome, {userName}!
                </span>
                <Link href="/dashboard/profile" className="text-sm font-medium">
                  Profile
                </Link>
                <Link href="/dashboard" className="text-sm font-medium">
                  Go to Dashboard
                </Link>
                <LogoutLink className="text-sm font-medium bg-black text-white dark:bg-white dark:text-black rounded-full px-4 py-2 transition-colors hover:bg-gray-800 dark:hover:bg-gray-200">
                  Log out
                </LogoutLink>
              </>
            ) : (
              <>
                <LoginLink className="text-sm font-medium bg-black text-white dark:bg-white dark:text-black rounded-full px-4 py-2 transition-colors hover:bg-gray-800 dark:hover:bg-gray-200">
                  Sign In
                </LoginLink>
                <RegisterLink className="text-sm font-medium">
                  Sign Up
                </RegisterLink>
              </>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-grow pt-20"> {/* Add padding-top to account for fixed header */}
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Basic Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
              <div>
                  <p className="font-semibold">Name: <span className="font-normal">{user?.given_name} {user?.family_name}</span></p>
                  <p className="font-semibold">Email: <span className="font-normal">{user?.email}</span></p>
              </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Plan</span>
                  <span className="bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded-full text-xs">Basic</span>
                </div>
                <Button 
                  className="w-full transition duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  Upgrade to Pro
                </Button>
                <Button 
                  asChild
                  className="w-full transition duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  <Link href="/dashboard/subscription">Manage Subscription</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Projects</span>
                    <span>3 / 10</span>
                  </div>
                  <Progress value={30} />
                </div>
                <p className="text-sm text-gray-500">
                  {"You're using 3 out of 10 projects in your current plan. Upgrade to the Pro plan for unlimited projects."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}