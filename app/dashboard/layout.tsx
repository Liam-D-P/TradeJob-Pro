"use client"

import { useState } from 'react'
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { 
  LayoutDashboard, 
  Calculator, 
  ClipboardList, 
  Settings,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import '../globals.css'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const { user } = useKindeAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const NavButton = ({ 
    icon: Icon, 
    label, 
    onClick,
    isActive = false
  }: { 
    icon: any, 
    label: string, 
    onClick: () => void,
    isActive?: boolean
  }) => {
    const button = (
      <Button 
        variant="ghost" 
        className={`w-full relative group transition-all duration-200 ease-in-out h-10 overflow-hidden
          ${isActive ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'hover:bg-primary/5'}
        `}
        onClick={onClick}
      >
        <div className="flex items-center w-full h-full">
          {/* Fixed position container for icon */}
          <div className="w-[40px] flex justify-center items-center">
            <Icon className={`h-4 w-4 shrink-0 transition-all duration-200
              ${isActive ? 'text-primary' : 'group-hover:text-primary'}
              ${isCollapsed ? 'hover:scale-125' : ''}
              ${isCollapsed && !isActive ? 'hover:text-primary/80' : ''}
            `} />
          </div>
          {/* Animated container for text */}
          <div className={`flex-1 transition-all duration-500 ease-in-out transform
            ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 transition-delay-[300ms]'}
          `}>
            <span className={`whitespace-nowrap
              ${isActive ? 'text-primary' : 'group-hover:text-primary'}
              hover:scale-105 origin-left font-medium
              hover:text-primary/80 hover:underline hover:underline-offset-4
              hover:decoration-primary/30 hover:decoration-2
            `}>
              {label}
            </span>
          </div>
        </div>
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
        )}
      </Button>
    );

    if (isCollapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            {button}
          </TooltipTrigger>
          <TooltipContent side="right">
            {label}
          </TooltipContent>
        </Tooltip>
      );
    }

    return button;
  };

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <TooltipProvider>
      <div className="flex min-h-screen">
        {/* Sidebar Background - This is the expanding part */}
        <div className={`hidden md:block fixed h-full 
          bg-gradient-to-b from-background via-background to-background/50 
          border-r border-border/50 backdrop-blur-xl shadow-xl
          transition-all duration-500 ease-in-out overflow-hidden
          ${isCollapsed ? 'w-[70px]' : 'w-[240px]'}
        `}>
          {/* Logo Section with expanding border */}
          <div className={`h-[72px] border-b border-border/50 relative
            transition-all duration-500 ease-in-out
            ${isCollapsed ? 'w-[70px]' : 'w-[240px]'}
          `}>
            <div className="absolute inset-0 flex items-center p-6">
              <div className="flex items-center gap-3 w-full">
                <div className="p-2 rounded-xl bg-primary/10 shadow-inner shrink-0">
                  <LayoutDashboard className="h-5 w-5 text-primary" />
                </div>
                <div className="overflow-hidden">
                  <span className={`transition-all duration-500 ease-in-out transform whitespace-nowrap
                    ${isCollapsed 
                      ? 'opacity-0 -translate-x-full' 
                      : 'opacity-100 translate-x-0 transition-delay-[300ms]'
                    }
                  `}>
                    TradeJob Pro
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Content - This stays fixed width */}
          <div className="flex flex-col h-full w-[240px]">
            {/* Navigation Section */}
            <div className={`flex-1 ${isCollapsed ? 'px-0' : 'px-3'} py-8`}>
              <div className="mb-8">
                <div className="h-6">
                  <h3 className={`text-xs uppercase text-muted-foreground/60 font-medium px-4 
                    transition-all duration-500 ease-in-out transform
                    ${isCollapsed 
                      ? 'opacity-0 -translate-x-full' 
                      : 'opacity-100 translate-x-0 transition-delay-[400ms]'
                    }
                  `}>
                    Navigation
                  </h3>
                </div>
                <nav className="space-y-1 mt-2">
                  <NavButton 
                    icon={LayoutDashboard}
                    label="Dashboard"
                    onClick={() => router.push('/dashboard')}
                    isActive={currentPath === '/dashboard'}
                  />
                  <NavButton 
                    icon={Calculator}
                    label="Calculator"
                    onClick={() => router.push('/dashboard/calculator')}
                    isActive={currentPath === '/dashboard/calculator'}
                  />
                  <NavButton 
                    icon={ClipboardList}
                    label="Jobs"
                    onClick={() => router.push('/dashboard/jobs')}
                    isActive={currentPath === '/dashboard/jobs'}
                  />
                </nav>
              </div>
            </div>

            {/* User Section */}
            <div className="mt-auto">
              <div className={`px-3 py-4 transition-all duration-500 ease-in-out transform
                ${isCollapsed ? 'opacity-0 scale-0 h-0' : 'opacity-100 scale-100 h-auto'}
              `}>
                <div className="p-3 rounded-xl bg-muted/50 backdrop-blur-xl border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {user?.given_name || user?.email}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Settings & Logout */}
              <div className="px-3 py-4 border-t border-border/50 backdrop-blur-xl bg-muted/5">
                <div className="space-y-1">
                  <NavButton 
                    icon={Settings}
                    label="Settings"
                    onClick={() => router.push('/dashboard/profile')}
                    isActive={currentPath === '/dashboard/profile'}
                  />
                  <LogoutLink className="w-full">
                    <Button 
                      variant="ghost" 
                      className={`w-full relative group transition-all duration-200 ease-in-out h-10
                        hover:bg-red-500/10
                      `}
                    >
                      <div className="absolute inset-0 flex items-center">
                        <div className={`flex items-center ${isCollapsed ? 'w-full justify-center' : 'pl-4'}`}>
                          <LogOut className="h-4 w-4 shrink-0 text-red-500 group-hover:text-red-600" />
                          <div className="overflow-hidden">
                            <span className={`ml-2 transition-all duration-500 ease-in-out transform whitespace-nowrap text-red-500 group-hover:text-red-600
                              ${isCollapsed 
                                ? 'opacity-0 -translate-x-full' 
                                : 'opacity-100 translate-x-0 transition-delay-[500ms]'
                              }
                            `}>
                              Logout
                            </span>
                          </div>
                        </div>
                      </div>
                    </Button>
                  </LogoutLink>
                </div>
              </div>
            </div>

            {/* Collapse Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute -right-4 top-6 h-8 w-8 rounded-full border shadow-md bg-background
                transition-transform duration-500 ease-in-out
              "
            >
              {isCollapsed ? (
                <Menu className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-500 ease-in-out ${
          isCollapsed ? 'md:pl-[70px]' : 'md:pl-[240px]'
        }`}>
          <main className="min-h-screen bg-background">
            <div className="container mx-auto p-8">
              {children}
            </div>
          </main>
        </div>
        <Toaster />
      </div>
    </TooltipProvider>
  );
}
