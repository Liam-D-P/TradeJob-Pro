"use client"

import { useEffect } from "react"
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { LogOut } from "lucide-react"

export default function DashboardProfilePage() {
  const { user, isAuthenticated, isLoading } = useKindeAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login')
        return
      }
    }
  }, [isAuthenticated, isLoading, user, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Profile Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div>
                <p className="font-semibold">Name</p>
                <p className="text-muted-foreground">
                  {user.given_name} {user.family_name}
                </p>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              <div>
                <p className="font-semibold">ID</p>
                <p className="text-muted-foreground">{user.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Plan</span>
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs">
                Basic
              </span>
            </div>
            <Button 
              variant="outline"
              className="w-full"
              onClick={() => router.push('/pricing')}
            >
              Upgrade to Pro
            </Button>
            <div className="pt-4">
              <LogoutLink>
                <Button 
                  variant="destructive"
                  className="w-full"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Log Out
                </Button>
              </LogoutLink>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Notification Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Privacy Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Connected Accounts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 