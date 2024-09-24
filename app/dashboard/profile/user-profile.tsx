// This is the profile page for the dashboard

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { LogOut } from 'lucide-react'

interface UserProfileProps {
  user: {
    name: string
    email: string
    avatar: string
  }
  activeProjects: any[] // Replace 'any' with the actual type of your projects
  handleLogout: () => void
}

export function UserProfile({ user, activeProjects, handleLogout }: UserProfileProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>

          {/* Subscription Management */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Subscription</h3>
            <div className="flex items-center mb-4">
              <span className="mr-2">Current Plan:</span>
              <span className="font-semibold bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md">Basic</span>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="default" 
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Upgrade to Pro
              </Button>
              <Button 
                variant="outline" 
                className="transition duration-200 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                Manage Subscription
              </Button>
            </div>
          </div>

          {/* Project Usage */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Project Usage</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="mr-2">Active Projects:</span>
                <span className="font-semibold bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md">
                  {activeProjects.length} / 10
                </span>
              </div>
              <Progress value={(activeProjects.length / 10) * 100} className="w-full" />
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Notification Settings</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className="flex items-center space-x-2">
                  <Switch 
                    id="email-notifications" 
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                  />
                  <span>Email Notifications</span>
                </Label>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications" className="flex items-center space-x-2">
                  <Switch 
                    id="sms-notifications" 
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                  />
                  <span>SMS Notifications</span>
                </Label>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
            <div className="space-y-2">
              <Button 
                variant="outline"
                className="transition duration-200 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                Change Password
              </Button>
              <div className="pt-2">
                <Button 
                  className="bg-red-500 text-white hover:bg-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Log Out
                </Button>
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}