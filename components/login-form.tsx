"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(event: React.SyntheticEvent, action: 'signup' | 'signin') {
    console.log("onSubmit function called", action);
    event.preventDefault()
    setIsLoading(true)

    // Simulate API call with a moderate delay
    await new Promise(resolve => setTimeout(resolve, 500)) // Increased to 500ms

    setIsLoading(false)
    toast({
      title: action === 'signup' ? "Account created" : "Signed in",
      description: action === 'signup' ? "We've created your account for you." : "Welcome back!",
    })
    console.log("Attempting to navigate to dashboard");
    
    router.push('/dashboard');
    
    console.log("Navigation triggered");
  }

  async function onSocialSignIn(provider: string) {
    setIsLoading(true)
    // Simulate social sign-in with a moderate delay
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Signed in",
        description: `Successfully signed in with ${provider}`,
      })
      router.push('/dashboard')
    }, 1000) // Increased to 500ms
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome</CardTitle>
          <CardDescription className="text-center">
            Sign in or create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-200">
              <TabsTrigger 
                value="signin" 
                className="data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className="data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={(e) => onSubmit(e, 'signin')}>
                <div className="grid gap-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    className="placeholder:text-gray-400 placeholder:opacity-50" // Add this line
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    name="password"
                    type="password"
                    placeholder="Your password"
                    disabled={isLoading}
                    className="placeholder:text-gray-400 placeholder:opacity-50"
                  />
                </div>
                <Button className="w-full mt-4 dark:border dark:border-white" type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={(e) => onSubmit(e, 'signup')}>
                <div className="grid gap-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="Your email address" // Changed from m@example.com
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    className="placeholder:text-gray-400 placeholder:opacity-50" // Add this line
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    disabled={isLoading}
                  />
                </div>
                <Button className="w-full mt-4 dark:border dark:border-white" type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={() => onSocialSignIn('Facebook')} disabled={isLoading}>
              <Icons.facebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
            <Button variant="outline" onClick={() => onSocialSignIn('Instagram')} disabled={isLoading}>
              <Icons.instagram className="mr-2 h-4 w-4" />
              Instagram
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <a
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>
          {/* Direct link to Dashboard removed */}
        </CardFooter>
      </Card>
    </div>
  )
}

export default function LoginForm() {
  return (
    <LoginLink className="your-button-styles">
      Sign In with Kinde
    </LoginLink>
  );
}