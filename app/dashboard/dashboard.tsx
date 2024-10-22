"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation'
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { UserProfile } from "@/app/dashboard/profile/user-profile"
import { Jobs } from "@/app/dashboard/Jobs"
import { Calculator } from "@/app/dashboard/Calculator"
import { ClipboardList, User, Calculator as CalculatorIcon } from 'lucide-react'
import { DashboardOverview } from "@/app/dashboard/DashboardOverview"
import { LayoutDashboard } from 'lucide-react'
import { JobProvider } from "@/app/context/JobContext"

export default function Dashboard() {
  console.log('Dashboard component rendered');

  const { isAuthenticated, user } = useKindeAuth();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    console.log('Dashboard component mounted');
    if (isAuthenticated && user) {
      setUserName(user.given_name || user.family_name || user.email || 'User');
    }
  }, [isAuthenticated, user]);

  return <DashboardComponent userName={userName} />;
}

function DashboardComponent({ userName }: { userName: string | null }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('DASHBOARD')
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const { toast } = useToast()

  const user = {
    name: userName || 'User',
    email: '', // You can add the email here if needed
    avatar: '/placeholder.svg?height=100&width=100',
  }

  const handleLogout = () => {
    // Implement logout logic here (e.g., clear tokens, reset state)
    
    // Redirect to the landing page
    router.push('/')
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
  }

  return (
    <JobProvider>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Side Menu */}
        <div 
          className={`bg-gray-800 dark:bg-black text-white flex flex-col items-start py-4 transition-all duration-300 ease-in-out ${
            isMenuExpanded ? 'w-48' : 'w-16'
          }`}
          onMouseEnter={() => setIsMenuExpanded(true)}
          onMouseLeave={() => setIsMenuExpanded(false)}
        >
          <nav className="space-y-4 w-full">
            <Button
              variant={activeTab === 'DASHBOARD' ? 'default' : 'ghost'}
              className={`w-full h-12 flex items-center justify-start px-4 transition-all duration-300 ease-in-out ${
                isMenuExpanded ? 'pl-4' : 'pl-4'
              } hover:bg-gray-700 dark:hover:bg-gray-700`}
              onClick={() => setActiveTab('DASHBOARD')}
            >
              <LayoutDashboard className="h-6 w-6 min-w-[24px]" />
              <span className={`ml-2 overflow-hidden transition-all duration-300 ease-in-out ${
                isMenuExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0'
              }`}>
                Dashboard
              </span>
            </Button>
            <Button
              variant={activeTab === 'JOBS' ? 'default' : 'ghost'}
              className={`w-full h-12 flex items-center justify-start px-4 transition-all duration-300 ease-in-out ${
                isMenuExpanded ? 'pl-4' : 'pl-4'
              } hover:bg-gray-700 dark:hover:bg-gray-700`}
              onClick={() => setActiveTab('JOBS')}
            >
              <ClipboardList className="h-6 w-6 min-w-[24px]" />
              <span className={`ml-2 overflow-hidden transition-all duration-300 ease-in-out ${
                isMenuExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0'
              }`}>
                Jobs
              </span>
            </Button>
            <Button
              variant={activeTab === 'CALCULATOR' ? 'default' : 'ghost'}
              className={`w-full h-12 flex items-center justify-start px-4 transition-all duration-300 ease-in-out ${
                isMenuExpanded ? 'pl-4' : 'pl-4'
              } hover:bg-gray-700 dark:hover:bg-gray-700`}
              onClick={() => setActiveTab('CALCULATOR')}
            >
              <CalculatorIcon className="h-6 w-6 min-w-[24px]" />
              <span className={`ml-2 overflow-hidden transition-all duration-300 ease-in-out ${
                isMenuExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0'
              }`}>
                Calculator
              </span>
            </Button>
            <Button
              variant={activeTab === 'PROFILE' ? 'default' : 'ghost'}
              className={`w-full h-12 flex items-center justify-start px-4 transition-all duration-300 ease-in-out ${
                isMenuExpanded ? 'pl-4' : 'pl-4'
              } hover:bg-gray-700 dark:hover:bg-gray-700`}
              onClick={() => setActiveTab('PROFILE')}
            >
              <User className="h-6 w-6 min-w-[24px]" />
              <span className={`ml-2 overflow-hidden transition-all duration-300 ease-in-out ${
                isMenuExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0'
              }`}>
                Profile
              </span>
            </Button>
          </nav>
          <div className="mt-auto px-4">
            <ThemeToggle />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 overflow-auto bg-white dark:bg-gray-800">
          {activeTab === 'DASHBOARD' && (
            <DashboardOverview />
          )}
          {activeTab === 'JOBS' && (
            <Jobs />
          )}
          {activeTab === 'CALCULATOR' && (
            <Calculator />
          )}
          {activeTab === 'PROFILE' && (
            <UserProfile
              user={user}
              activeProjects={[]} // You might want to pass actual active projects here
              handleLogout={handleLogout}
            />
          )}
        </div>
      </div>
    </JobProvider>
  )
}
