'use client'

import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink, RegisterLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Zap, HardHat, BarChart, Calculator, ClipboardList, PoundSterling, Save, PlusCircle, Eye, FileDown, Quote, UserPlus, Package } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import WordFadeIn from "@/components/magicui/word-fade-in"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { BorderBeam } from "@/components/magicui/border-beam"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"

export default function LandingPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useKindeAuth();
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated && user) {
      setUserName(user.given_name || user.family_name || user.email || 'User');
    }
  }, [isAuthenticated, user])

  const handleTryCalculator = () => {
    router.push('/login')
  }

  // Sample data for the charts - keep only what's used
  const profitData = [
    { name: 'Jan', value: 1000 },
    { name: 'Feb', value: 1500 },
    { name: 'Mar', value: 1200 },
    { name: 'Apr', value: 1800 },
    { name: 'May', value: 2000 },
    { name: 'Jun', value: 2400 },
  ]

  // Sample materials data
  const materials = [
    { id: '1', name: 'Brick', cost: 0.5, unit: 'piece' },
    { id: '2', name: 'Cement', cost: 10, unit: 'bag' },
    { id: '3', name: 'Sand', cost: 25, unit: 'ton' },
  ]

  // Section Divider Component
  const SectionDivider = () => (
    <div className="relative h-32 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background-dark">
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/0 backdrop-blur-sm" />
        <div className="relative px-4 lg:px-6 h-14 flex items-center">
          <Link className="flex items-center justify-center" href="#">
            <HardHat className="h-6 w-6 mr-2" />
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
                <Link 
                  href="/profile" 
                  className="text-sm font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Profile link clicked, checking auth...');
                    if (isAuthenticated) {
                      console.log('User is authenticated, navigating to profile');
                      router.push('/dashboard/profile');
                    } else {
                      console.log('User is not authenticated, redirecting to login');
                      router.push('/login');
                    }
                  }}
                >
                  Profile
                </Link>
                <Link 
                  href="/dashboard" 
                  className="text-sm font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Dashboard link clicked, checking auth...');
                    if (isAuthenticated) {
                      console.log('User is authenticated, navigating to dashboard');
                      router.push('/dashboard');
                    } else {
                      console.log('User is not authenticated, redirecting to login');
                      router.push('/login');
                    }
                  }}
                >
                  Go to Dashboard
                </Link>
                <LogoutLink>
                  Log out
                </LogoutLink>
              </>
            ) : (
              <>
                <LoginLink>Sign In</LoginLink>
                <RegisterLink>Sign Up</RegisterLink>
              </>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="flex-grow pt-14"> {/* Add padding-top to account for fixed header */}
        <div className="container mx-auto px-4 md:px-6">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
            
            {/* Subtle gradient glow effects */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
            </div>

            {/* Optional: Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float" style={{ top: '20%', left: '10%' }} />
              <div className="absolute w-2 h-2 bg-secondary/20 rounded-full animate-float" style={{ top: '60%', right: '20%' }} />
              <div className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float" style={{ bottom: '20%', left: '30%' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto space-y-8">
              <div className="space-y-6 text-center">
                <div className="space-y-4 relative">
                  <div className="relative">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-black dark:text-white mx-auto max-w-[1100px] leading-tight dark:[text-shadow:0_1px_2px_rgba(255,255,255,0.1),0_2px_4px_rgba(255,255,255,0.05)]">
                      Transform Your Trade Business with Professional-Grade Job Costing
                    </h1>
                  </div>

                  <WordFadeIn
                    words="Join thousands of trade professionals who've eliminated pricing guesswork. Our intelligent platform helps you calculate costs, track projects, and maximize profits on every job - all in one place."
                    className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-400 text-xl md:text-2xl leading-relaxed"
                  />

                  <div className="grid grid-cols-3 gap-4 md:gap-8 py-8 animate-fade-in [--animation-delay:400ms]">
                    {[
                      { label: "Active Users", value: "2,000+" },
                      { label: "Projects Managed", value: "₤10M+" },
                      { label: "Time Saved", value: "1,000hrs" }
                    ].map((stat, i) => (
                      <div key={i} className="space-y-2">
                        <h4 className="text-2xl md:text-4xl font-bold text-primary">{stat.value}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in [--animation-delay:600ms]">
                    {isAuthenticated ? (
                      <Button
                        className="shadow-2xl h-14 px-8 sm:px-16 transition-all duration-300 ease-out hover:scale-105 hover:shadow-primary/25 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black"
                        onClick={() => {
                          console.log('Navigating to dashboard...');
                          router.push('/dashboard');
                        }}
                      >
                        Go to Dashboard
                      </Button>
                    ) : (
                      <LoginLink className="w-full sm:w-auto">
                        <Button
                          className="w-full shadow-2xl h-14 px-8 sm:px-16 transition-all duration-300 ease-out hover:scale-105 hover:shadow-primary/25 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black"
                        >
                          <span className="flex items-center gap-2 text-lg font-semibold">
                            Try Now
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M6.5 3.5l4 4.5-4 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        </Button>
                      </LoginLink>
                    )}
                    
                    <Button
                      variant="outline"
                      className="h-14 px-8 sm:px-16 text-lg font-semibold transition-all duration-300 ease-out hover:scale-105 hover:bg-primary/10"
                      onClick={() => router.push('/learn-more')}
                    >
                      See How It Works
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <SectionDivider />

          {/* Features Section */}
          <section id="features" className="py-24 md:py-32">
            <div className="container px-4 mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm dark:border-neutral-800 dark:bg-black mb-4">
                  <span className="text-sm font-medium">Powerful Features</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to manage your jobs</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Streamline your trade business with our comprehensive suite of tools designed for professionals like you.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Calculator className="h-8 w-8 text-primary" />,
                    title: "Advanced Job Costing",
                    description: "Precise calculations for materials, labor, and overhead costs. Customize and save your frequently used materials."
                  },
                  {
                    icon: <Zap className="h-8 w-8 text-primary" />,
                    title: "Efficient Workflow",
                    description: "Streamline your estimating process and save valuable time. Manage multiple projects with ease."
                  },
                  {
                    icon: <BarChart className="h-8 w-8 text-primary" />,
                    title: "Profit Analysis",
                    description: "Visualize your profit margins and make informed decisions. Track revenue and costs for each project."
                  },
                  {
                    icon: <ClipboardList className="h-8 w-8 text-primary" />,
                    title: "Job Management",
                    description: "Easily manage and track the status of your jobs from pending to completed. Schedule start dates and monitor progress."
                  },
                  {
                    icon: <PoundSterling className="h-8 w-8 text-primary" />,
                    title: "Revenue Reporting",
                    description: "Report and analyze revenue for completed jobs. Get insights into your most profitable projects."
                  },
                  {
                    icon: <FileDown className="h-8 w-8 text-primary" />,
                    title: "PDF Export",
                    description: "Generate professional PDF reports for your job breakdowns. Share detailed cost estimates with clients."
                  }
                ].map((feature, i) => (
                  <div 
                    key={i}
                    className="group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 p-2">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* Dashboard Preview Section */}
          <section id="dashboard-preview" className="py-24 relative overflow-hidden">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900" />
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
            <div className="absolute inset-0">
              <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
            </div>
            
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm dark:border-neutral-800 dark:bg-black mb-4">
                  <span className="block w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
                  <span className="text-sm font-medium">Live Preview</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Tools for Trade Professionals</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Experience how TradeJob Pro transforms your business operations.
                </p>
              </div>

              {/* Interactive Preview Tabs */}
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Calculator Preview */}
                  <Card className="group relative overflow-hidden border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                    {/* Border Beam Container */}
                    <div className="absolute inset-0">
                      <BorderBeam 
                        size={300}
                        duration={8}
                        anchor={90}
                        borderWidth={1.5}
                        colorFrom="#ffaa40"
                        colorTo="#9c40ff"
                        className="opacity-50"
                      />
                    </div>
                    
                    {/* Content Container */}
                    <div className="relative z-10">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <Calculator className="h-5 w-5 text-primary" />
                            Smart Calculator
                          </CardTitle>
                          <Badge variant="outline" className="bg-primary/10 text-primary">Live Demo</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {/* Quick Add Material Form */}
                          <div className="grid grid-cols-3 gap-4 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                            <Input placeholder="Material Name" className="bg-white dark:bg-gray-800" />
                            <Input placeholder="£0.00" className="bg-white dark:bg-gray-800" />
                            <Button className="bg-primary hover:bg-primary/90">
                              <PlusCircle className="h-4 w-4 mr-2" /> Add
                            </Button>
                          </div>

                          {/* Materials Table */}
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Material</TableHead>
                                <TableHead>Cost/Unit</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {[
                                { name: 'Premium Tiles', cost: 45, quantity: 20, total: 900 },
                                { name: 'Adhesive', cost: 15, quantity: 5, total: 75 },
                                { name: 'Labor', cost: 35, quantity: 8, total: 280 },
                              ].map((item, i) => (
                                <TableRow key={i} className="group/row">
                                  <TableCell className="font-medium">{item.name}</TableCell>
                                  <TableCell>£{item.cost}</TableCell>
                                  <TableCell className="text-right">£{item.total}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>

                          {/* Total and Actions */}
                          <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900">
                            <div>
                              <p className="text-sm text-muted-foreground">Total Cost</p>
                              <p className="text-2xl font-bold text-primary">£1,255.00</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline">
                                <FileDown className="h-4 w-4 mr-2" /> Export PDF
                              </Button>
                              <Button className="bg-primary">
                                <Save className="h-4 w-4 mr-2" /> Save Job
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>

                  {/* Jobs Management Preview */}
                  <Card className="group relative overflow-hidden border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                    {/* Border Beam Container */}
                    <div className="absolute inset-0">
                      <BorderBeam 
                        size={300}
                        duration={8}
                        anchor={90}
                        borderWidth={1.5}
                        colorFrom="#9c40ff"
                        colorTo="#ffaa40"
                        delay={2}
                        className="opacity-50"
                      />
                    </div>
                    
                    {/* Content Container */}
                    <div className="relative z-10">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <ClipboardList className="h-5 w-5 text-primary" />
                            Jobs Dashboard
                          </CardTitle>
                          <Badge variant="outline" className="bg-primary/10 text-primary">Live Demo</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Active Job Card */}
                          <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 space-y-3">
                            <div className="flex justify-between items-center">
                              <h3 className="font-semibold">Luxury Bathroom Renovation</h3>
                              <Badge className="bg-blue-500">In Progress</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Budget</p>
                                <p className="font-semibold">£8,500</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Timeline</p>
                                <p className="font-semibold">2 weeks</p>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>75%</span>
                              </div>
                              <Progress value={75} className="h-2" />
                            </div>
                          </div>

                          {/* Recent Jobs List */}
                          <div className="space-y-2">
                            {[
                              { name: 'Kitchen Remodel', status: 'completed', cost: '£12,000', date: '2 days ago' },
                              { name: 'Deck Installation', status: 'pending', cost: '£4,500', date: '5 days ago' },
                            ].map((job, i) => (
                              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-primary/50 transition-colors">
                                <div className="flex items-center gap-3">
                                  <div className={`w-2 h-2 rounded-full ${
                                    job.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                                  }`} />
                                  <div>
                                    <p className="font-medium">{job.name}</p>
                                    <p className="text-sm text-muted-foreground">{job.date}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">{job.cost}</p>
                                  <Badge variant="outline" className="text-xs">
                                    {job.status}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Quick Actions */}
                          <div className="flex gap-2 pt-2">
                            <Button className="flex-1 bg-primary">
                              <PlusCircle className="h-4 w-4 mr-2" /> New Job
                            </Button>
                            <Button variant="outline" className="flex-1">
                              <Eye className="h-4 w-4 mr-2" /> View All
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>

                {/* Feature Highlights - Below Previews */}
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { icon: Calculator, title: "Smart Calculations", desc: "Instant cost calculations with material and labor tracking" },
                    { icon: Save, title: "Auto-Save", desc: "Never lose your work with automatic progress saving" },
                    { icon: BarChart, title: "Real-time Analytics", desc: "Track job progress and profitability instantly" },
                    { icon: FileDown, title: "PDF Export", desc: "Generate professional reports with one click" },
                  ].map((feature, i) => (
                    <div key={i} className="group relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 hover:border-primary/50 transition-colors">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <feature.icon className="h-8 w-8 text-primary mb-4" />
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* Pricing Section */}
          <section id="pricing" className="py-24 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900" />
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
            
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm dark:border-neutral-800 dark:bg-black mb-4">
                  <span className="text-sm font-medium">Simple Pricing</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose the plan that&apos;s right for you</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  All plans include core features. Upgrade anytime as your business grows.
                </p>
              </div>

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Starter Plan */}
                <Card className="relative group overflow-hidden border-2 border-neutral-200 dark:border-neutral-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <CardHeader>
                    <CardTitle>Starter</CardTitle>
                    <div className="flex items-baseline mt-2">
                      <span className="text-3xl font-bold">£9</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {[
                        'Up to 10 jobs per month',
                        'Basic job calculator',
                        'PDF exports',
                        'Email support'
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>

                {/* Pro Plan */}
                <Card className="relative group overflow-hidden border-2 border-primary transform scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-0 right-0">
                    <Badge className="m-2 bg-primary text-white">Most Popular</Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle>Pro</CardTitle>
                    <div className="flex items-baseline mt-2">
                      <span className="text-3xl font-bold">£29</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {[
                        'Unlimited jobs',
                        'Advanced job calculator',
                        'Custom material library',
                        'Priority support',
                        'Revenue tracking',
                        'Team collaboration'
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>

                {/* Enterprise Plan */}
                <Card className="relative group overflow-hidden border-2 border-neutral-200 dark:border-neutral-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <CardHeader>
                    <CardTitle>Enterprise</CardTitle>
                    <div className="flex items-baseline mt-2">
                      <span className="text-3xl font-bold">£99</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {[
                        'Everything in Pro',
                        'Custom integrations',
                        'Dedicated account manager',
                        'Custom reporting',
                        'API access',
                        'SSO & advanced security'
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black">
                      Contact Sales
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* Testimonials Section */}
          <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm dark:border-neutral-800 dark:bg-black mb-4">
                  <span className="text-sm font-medium">Testimonials</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Trade Professionals</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    quote: "TradeJob Pro has transformed how I price jobs. No more guesswork, just accurate quotes every time.",
                    author: "Mike Johnson",
                    role: "Construction Manager",
                    company: "MJ Building Services"
                  },
                  {
                    quote: "The calculator feature alone has saved me hours of work. Best investment for my business this year.",
                    author: "Sarah Williams",
                    role: "Interior Designer",
                    company: "SW Interiors"
                  },
                  {
                    quote: "Finally, software that understands what trades people actually need. Customer support is excellent too.",
                    author: "David Chen",
                    role: "Electrical Contractor",
                    company: "Chen Electrics"
                  }
                ].map((testimonial, i) => (
                  <Card key={i} className="relative group">
                    <CardContent className="pt-6">
                      <div className="absolute -top-4 left-6">
                        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                          <Quote className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <blockquote className="mb-6 text-gray-600 dark:text-gray-400">
                        &quot;{testimonial.quote}&quot;
                      </blockquote>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                          <p className="text-sm text-primary">{testimonial.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* FAQ Section */}
          <section id="faq" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm dark:border-neutral-800 dark:bg-black mb-4">
                  <span className="text-sm font-medium">FAQ</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Everything you need to know about TradeJob Pro.
                </p>
              </div>

              {/* FAQ Accordion */}
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  {[
                    {
                      question: "How does the job calculator work?",
                      answer: "Our job calculator allows you to input materials, quantities, and labor costs. It automatically calculates total costs and generates detailed breakdowns. You can save frequently used materials and export calculations as professional PDF reports."
                    },
                    {
                      question: "Can I track multiple jobs simultaneously?",
                      answer: "Yes! You can manage multiple jobs at once, tracking their progress, costs, and status. The Pro and Enterprise plans offer unlimited jobs with advanced tracking features."
                    },
                    {
                      question: "Is there a free trial available?",
                      answer: "Yes, we offer a 14-day free trial of our Pro plan. No credit card required. You&apos;ll have access to all Pro features during the trial period."
                    },
                    {
                      question: "Can I export my calculations and reports?",
                      answer: "Yes, all plans include PDF export functionality. You can generate professional reports for your clients, including detailed cost breakdowns and material lists."
                    },
                    {
                      question: "How do I get started?",
                      answer: "Simply sign up for an account, choose your plan, and you can start using the calculator immediately. We provide onboarding guidance and tutorial videos to help you get started."
                    }
                  ].map((item, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border border-neutral-200 dark:border-neutral-800 rounded-lg">
                      <AccordionTrigger className="px-4 hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Call to Action */}
              <div className="mt-16 text-center">
                <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  We&apos;re here to help. Contact our support team anytime.
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  Contact Support
                </Button>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* Quick Start Guide Section */}
          <section className="py-24 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900" />
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
            
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm dark:border-neutral-800 dark:bg-black mb-4">
                  <span className="text-sm font-medium">Quick Start Guide</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started in Minutes</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Follow these simple steps to start managing your jobs more efficiently
                </p>
              </div>

              {/* Steps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    step: 1,
                    title: "Create Your Account",
                    description: "Sign up in seconds with your email or Google account. No credit card required for trial.",
                    icon: <UserPlus className="h-6 w-6" />,
                    action: "Sign Up Free",
                    hint: "2-minute setup"
                  },
                  {
                    step: 2,
                    title: "Set Up Your Materials",
                    description: "Add your commonly used materials and their costs to your personal library.",
                    icon: <Package className="h-6 w-6" />,
                    action: "Watch Demo",
                    hint: "Pre-loaded templates"
                  },
                  {
                    step: 3,
                    title: "Create Your First Job",
                    description: "Use the calculator to create accurate quotes and manage your first project.",
                    icon: <Calculator className="h-6 w-6" />,
                    action: "Try Calculator",
                    hint: "Guided walkthrough"
                  }
                ].map((item, i) => (
                  <div key={i} className="relative group">
                    {/* Connector Lines (only between items) */}
                    {i < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200 dark:bg-gray-800">
                        <div className="absolute top-1/2 right-0 w-2 h-2 -translate-y-1/2 bg-primary rounded-full animate-pulse" />
                      </div>
                    )}

                    <Card className="relative overflow-hidden border-2 hover:border-primary transition-colors duration-300">
                      <CardContent className="pt-6">
                        {/* Step Number Bubble */}
                        <div className="absolute -top-4 left-6">
                          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold">
                            {item.step}
                          </div>
                        </div>

                        <div className="mt-4 space-y-4">
                          {/* Icon and Title */}
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-primary/10">
                              {item.icon}
                            </div>
                            <h3 className="font-semibold text-xl">{item.title}</h3>
                          </div>

                          {/* Description */}
                          <p className="text-gray-600 dark:text-gray-400">
                            {item.description}
                          </p>

                          {/* Action and Hint */}
                          <div className="flex items-center justify-between pt-4">
                            <Button className="bg-primary hover:bg-primary/90">
                              {item.action}
                            </Button>
                            <Badge variant="secondary" className="bg-primary/10">
                              {item.hint}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="mt-16 text-center">
                <Card className="max-w-2xl mx-auto border-2 border-primary/20 bg-primary/5">
                  <CardContent className="py-8">
                    <h3 className="text-2xl font-bold mb-4">Ready to streamline your trade business?</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Join thousands of professionals already using TradeJob Pro
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button className="bg-primary hover:bg-primary/90">
                        Start Free Trial
                      </Button>
                      <Button variant="outline">
                        Schedule Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2023 TradeJob Pro. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
