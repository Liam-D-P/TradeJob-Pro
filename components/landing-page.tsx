'use client'

import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink, RegisterLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Zap, Building, BarChart, Calculator, ClipboardList, PoundSterling } from "lucide-react"
import ShimmerButton from "@/components/magicui/shimmer-button"
import GradualSpacing from "@/components/magicui/gradual-spacing"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import DotPattern from "@/components/magicui/dot-pattern"
import BlurFade from "@/components/magicui/blur-fade"
import WordFadeIn from "@/components/magicui/word-fade-in"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useState, useEffect } from "react"
import { DollarSign, Package, Activity } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Eye, FileDown } from 'lucide-react'
import { BorderBeam } from "@/components/magicui/border-beam"
import { Progress } from "@/components/ui/progress"
import { Marquee } from "@/components/magicui/marquee"

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

  // Sample data for the charts
  const profitData = [
    { name: 'Jan', value: 1000 },
    { name: 'Feb', value: 1500 },
    { name: 'Mar', value: 1200 },
    { name: 'Apr', value: 1800 },
    { name: 'May', value: 2000 },
    { name: 'Jun', value: 2400 },
  ]

  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
  ]

  const materialCostData = [
    { name: 'Jan', value: 2000 },
    { name: 'Feb', value: 2200 },
    { name: 'Mar', value: 1800 },
    { name: 'Apr', value: 2400 },
    { name: 'May', value: 2100 },
    { name: 'Jun', value: 2300 },
  ]

  // Sample materials data
  const materials = [
    { id: '1', name: 'Brick', cost: 0.5, unit: 'piece' },
    { id: '2', name: 'Cement', cost: 10, unit: 'bag' },
    { id: '3', name: 'Sand', cost: 25, unit: 'ton' },
  ]

  const sampleJobs = [
    { id: '1', name: 'Kitchen Renovation', totalCost: 5000, status: 'active' },
    { id: '2', name: 'Bathroom Remodel', totalCost: 3500, status: 'pending' },
    { id: '3', name: 'Deck Construction', totalCost: 2800, status: 'completed' },
  ]

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
                <Link href="/landing-page/profile" className="text-sm font-medium hover:underline underline-offset-4">
                  Profile
                </Link>
                <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
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
      <main className="flex-grow pt-14"> {/* Add padding-top to account for fixed header */}
        <div className="container mx-auto px-4 md:px-6">
          <section className="w-full py-12 md:py-24 relative overflow-hidden">
            <DotPattern 
              width={32}
              height={32}
              cx={1}
              cy={1}
              cr={3}
              className="absolute inset-0 h-full w-full text-gray-200 dark:text-gray-800 opacity-70"
            />
            <div className="space-y-4 text-center relative z-10">
              <GradualSpacing 
                text="Precise Job Costs for Trade Professionals"
                className="font-display text-center text-4xl font-bold tracking-[-0.1em] text-black dark:text-white md:text-7xl md:leading-[5rem] drop-shadow-lg"
                duration={0.7}
              />
              <WordFadeIn
                words="Streamline your estimates with our advanced job cost calculator. Boost accuracy and profitability in every project."
                className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
              />
            </div>
            <div className="z-10 flex justify-center space-x-4 mt-6 relative">
              <LoginLink>
                <ShimmerButton 
                  className="shadow-2xl h-13 px-16 transition-all duration-300 ease-in-out hover:scale-105"
                  shimmerSize="0.30em"
                  shimmerColor="rgba(255, 255, 255, 1.0)"
                  shimmerDuration="2.5s"
                  background="rgba(0, 0, 0, 1)"
                >
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                    Try Now
                  </span>
                </ShimmerButton>
              </LoginLink>
              <Button
                variant="outline"
                className="shadow-2xl h-12 px-12 py-6 text-sm lg:text-lg font-medium leading-none tracking-tight transition-all duration-300 ease-in-out hover:scale-105"
                onClick={() => router.push('/learn-more')}
              >
                Learn More
              </Button>
            </div>
          </section>
          
          {/* Features Section */}
          <BlurFade>
            <section id="features" className="py-12 md:py-24">
              <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"> {/* Added shadow and border */}
                  <CardHeader>
                    <Calculator className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Advanced Job Costing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    Precise calculations for materials, labor, and overhead costs. Customize and save your frequently used materials.
                  </CardContent>
                </Card>
                <Card className="shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"> {/* Added shadow and border */}
                  <CardHeader>
                    <Zap className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Efficient Workflow</CardTitle>
                  </CardHeader>
                  <CardContent>
                    Streamline your estimating process and save valuable time. Manage multiple projects with ease.
                  </CardContent>
                </Card>
                <Card className="shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"> {/* Added shadow and border */}
                  <CardHeader>
                    <BarChart className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Profit Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    Visualize your profit margins and make informed decisions. Track revenue and costs for each project.
                  </CardContent>
                </Card>
                <Card className="shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"> {/* Added shadow and border */}
                  <CardHeader>
                    <ClipboardList className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Job Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    Easily manage and track the status of your jobs from pending to completed. Schedule start dates and monitor progress.
                  </CardContent>
                </Card>
                <Card className="shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"> {/* Added shadow and border */}
                  <CardHeader>
                    <PoundSterling className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Revenue Reporting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    Report and analyze revenue for completed jobs. Get insights into your most profitable projects.
                  </CardContent>
                </Card>
                <Card className="shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"> {/* Added shadow and border */}
                  <CardHeader>
                    <FileDown className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>PDF Export</CardTitle>
                  </CardHeader>
                  <CardContent>
                    Generate professional PDF reports for your job breakdowns. Share detailed cost estimates with clients or team members.
                  </CardContent>
                </Card>
              </div>
            </section>
          </BlurFade>

            
          {/* New Dashboard Preview Section */}
          <BlurFade>
            <section id="dashboard-preview" className="py-12 md:py-24 bg-gray-100 dark:bg-gray-900">
              <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl font-bold text-center mb-8">Powerful Tools at Your Fingertips</h2>
                <div className="mb-8">
                  <Marquee className="py-4 [--gap:1rem]" pauseOnHover>
                    {['Revenue Tracking', 'Material Costs', 'Job Calculator', 'Active Projects', 'Job Management', 'PDF Job Breakdown'].map((tool) => (
                      <div key={tool} className="flex items-center gap-4 rounded-full border border-neutral-200 bg-white px-5 py-2 dark:border-neutral-800 dark:bg-black">
                        <span className="text-sm font-medium">{tool}</span>
                      </div>
                    ))}
                  </Marquee>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Revenue Card */}
                  <Card className="shadow-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 transition-transform transform hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="text-2xl font-bold text-primary">£22,222</div>
                      <p className="text-xs text-muted-foreground mt-1">+20% from last month</p>
                      <div className="h-[100px] mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={revenueData}>
                            <Line type="monotone" dataKey="value" stroke="#8884d8" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground font-bold">
                        Track your total revenue over time with our detailed charts. See how your revenue grows month by month and identify trends to make informed business decisions.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Material Costs Card */}
                  <Card className="shadow-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 transition-transform transform hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                      <CardTitle className="text-sm font-medium">Material Costs</CardTitle>
                      <Package className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="text-2xl font-bold text-primary">£12,222</div>
                      <p className="text-xs text-muted-foreground mt-1">+4.75% from last month</p>
                      <div className="h-[100px] mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={materialCostData}>
                            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground font-bold">
                        Monitor your material costs with precision. Our charts help you keep track of expenses and identify cost-saving opportunities.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Job Calculator Preview */}
                  <Card className="shadow-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 transition-transform transform hover:scale-105">
                    <CardHeader>
                      <CardTitle>Job Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Material</TableHead>
                            <TableHead>Cost per Unit</TableHead>
                            <TableHead>Unit</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Lime</TableCell>
                            <TableCell>£10.00</TableCell>
                            <TableCell>bag</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Sand</TableCell>
                            <TableCell>£5.00</TableCell>
                            <TableCell>bag</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Stone</TableCell>
                            <TableCell>£20.00</TableCell>
                            <TableCell>sqm</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <p className="mt-4 text-sm text-muted-foreground font-bold">
                        Use our job calculator to estimate costs accurately. Input your materials and labor to get a detailed breakdown of your project expenses.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Active Projects Card */}
                  <Card className="shadow-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 transition-transform transform hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle>Active Projects</CardTitle>
                      <Activity className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary mb-2">3</div>
                      <p className="text-sm text-muted-foreground mb-4">2 completed this month</p>
                      <ul className="space-y-2">
                        <li className="flex justify-between items-center">
                          <span>Project A</span>
                          <span className="text-sm text-muted-foreground">In Progress</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>Project B</span>
                          <span className="text-sm text-muted-foreground">Starting Soon</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>Project C</span>
                          <span className="text-sm text-muted-foreground">In Progress</span>
                        </li>
                      </ul>
                      <p className="mt-4 text-sm text-muted-foreground font-bold">
                        Keep track of all your active projects. See their status at a glance and manage your workflow efficiently.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Job Management Preview */}
                  <Card className="shadow-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 transition-transform transform hover:scale-105">
                    <CardHeader>
                      <CardTitle>Job Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Job Name</TableHead>
                            <TableHead>Total Cost</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sampleJobs.map((job) => (
                            <TableRow key={job.id}>
                              <TableCell>{job.name}</TableCell>
                              <TableCell>£{job.totalCost.toFixed(2)}</TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    job.status === 'active'
                                      ? 'bg-green-500'
                                      : job.status === 'pending'
                                      ? 'bg-yellow-500'
                                      : 'bg-blue-500'
                                  }
                                >
                                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-1" /> View
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <FileDown className="h-4 w-4 mr-1" /> PDF
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <p className="mt-4 text-sm text-muted-foreground font-bold">
                        Manage your jobs effectively with our job management tool. Track costs, statuses, and generate reports with ease.
                      </p>
                    </CardContent>
                  </Card>

                  {/* PDF Generation Card */}
                  <Card className="shadow-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 transition-transform transform hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle>PDF Job Breakdown</CardTitle>
                      <FileDown className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Job: Kitchen Renovation</span>
                          <Badge variant="outline">Ready for Export</Badge>
                        </div>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Material</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>Cost</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Tiles</TableCell>
                              <TableCell>50 sqm</TableCell>
                              <TableCell>£500</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Paint</TableCell>
                              <TableCell>10 L</TableCell>
                              <TableCell>£100</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Labor</TableCell>
                              <TableCell>40 hours</TableCell>
                              <TableCell>£1000</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                        <div className="flex justify-between items-center">
                          <span className="font-bold">Total Cost: £1600</span>
                          <Button variant="default" size="sm">
                            <FileDown className="h-4 w-4 mr-1" /> Generate PDF
                          </Button>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground font-bold">
                        Generate detailed PDF reports for your job breakdowns. Include material costs, quantities, and labor expenses. Perfect for sharing with clients or keeping for your records.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          </BlurFade>

          {/* Pricing Section */}
          <section id="pricing" className="py-12 md:py-24">
            <h2 className="text-3xl font-bold text-center mb-8">Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>For small businesses</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">£12/mo</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Up to 10 projects</li>
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Basic job costing</li>
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Email support</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              <Card className="relative">
                <BorderBeam duration={7} borderWidth={6} /> 
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For growing businesses</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">£20/mo</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Unlimited projects</li>
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Advanced job costing</li>
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Priority support</li>
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Profit analysis tools</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Feature Comparison Table Section */}
          <section id="feature-comparison" className="py-12 md:py-24 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold text-center mb-8">Compare Our Plans</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Feature</th>
                      <th className="py-2 px-4 border-b text-left">Basic</th>
                      <th className="py-2 px-4 border-b text-left">Pro</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b text-left">Job Costing</td>
                      <td className="py-2 px-4 border-b text-left">Basic</td>
                      <td className="py-2 px-4 border-b text-left">Advanced</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b text-left">Projects</td>
                      <td className="py-2 px-4 border-b text-left">Up to 10</td>
                      <td className="py-2 px-4 border-b text-left">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b text-left">Support</td>
                      <td className="py-2 px-4 border-b text-left">Email</td>
                      <td className="py-2 px-4 border-b text-left">Priority</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b text-left">Profit Analysis</td>
                      <td className="py-2 px-4 border-b text-left">No</td>
                      <td className="py-2 px-4 border-b text-left">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-12 md:py-24">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>How does TradeJob Pro help me manage my projects?</AccordionTrigger>
                <AccordionContent>
                  TradeJob Pro offers a comprehensive project management solution. You can create and track multiple jobs, estimate costs accurately, monitor project timelines, and analyze profitability. Our dashboard gives you a clear overview of all your active projects, helping you stay organized and efficient.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I customize material costs and labor rates?</AccordionTrigger>
                <AccordionContent>
                  Absolutely! TradeJob Pro allows you to input and customize your own material costs and labor rates. You can easily update these as prices change, ensuring your estimates and calculations are always based on the most current data. This flexibility makes our tool suitable for various trades and regions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How does the profit analysis feature work?</AccordionTrigger>
                <AccordionContent>
                  Our profit analysis tool provides detailed insights into your project finances. It compares estimated costs against actual expenses, calculates profit margins, and presents the data in easy-to-understand charts and reports. This feature helps you identify your most profitable jobs and areas where you can improve efficiency.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Is it easy to generate professional quotes for clients?</AccordionTrigger>
                <AccordionContent>
                  Yes, TradeJob Pro makes it simple to create professional quotes. Once you&apos;ve input your project details and costs, you can generate a detailed PDF report with a breakdown of materials, labor, and other expenses. This feature helps you present clear, professional estimates to your clients, potentially improving your chances of winning bids.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Can I access TradeJob Pro on my mobile device?</AccordionTrigger>
                <AccordionContent>
                  Yes, TradeJob Pro is designed to be responsive and work on various devices, including smartphones and tablets. This allows you to access your project information, update job statuses, and even create estimates while on the go, directly from the job site.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
