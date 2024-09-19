'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Zap, Building, BarChart, Calculator, ClipboardList, FileDown, PoundSterling } from "lucide-react"
import ShimmerButton from "@/components/magicui/shimmer-button"
import GradualSpacing from "@/components/magicui/gradual-spacing"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import DotPattern from "@/components/magicui/dot-pattern"
import BlurFade from "@/components/magicui/blur-fade"
import WordFadeIn from "@/components/magicui/word-fade-in"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function LandingPage() {
  const router = useRouter()

  const handleTryCalculator = () => {
    router.push('/login')
  }

  const handleSignIn = () => {
    router.push('/login')  // This assumes your login form is at the '/login' route
  }

  // Sample data for the chart
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
            <Button
              variant="outline"
              className="text-sm font-medium bg-black text-white dark:bg-white dark:text-black rounded-full px-4 py-2 transition-colors hover:bg-gray-800 dark:hover:bg-gray-200"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
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
              <ShimmerButton 
                onClick={handleTryCalculator} 
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
                <Card>
                  <CardHeader>
                    <Calculator className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Advanced Job Costing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    Precise calculations for materials, labor, and overhead costs. Customize and save your frequently used materials.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Zap className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Efficient Workflow</CardTitle>
                  </CardHeader>
                  <CardContent>
                    Streamline your estimating process and save valuable time. Manage multiple projects with ease.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <BarChart className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Profit Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    Visualize your profit margins and make informed decisions. Track revenue and costs for each project.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <ClipboardList className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Job Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    Easily manage and track the status of your jobs from pending to completed. Schedule start dates and monitor progress.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <PoundSterling className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Revenue Reporting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    Report and analyze revenue for completed jobs. Get insights into your most profitable projects.
                  </CardContent>
                </Card>
                <Card>
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
          <section id="dashboard-preview" className="py-12 md:py-24 bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold text-center mb-8">Powerful Tools at Your Fingertips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Dashboard Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Profit Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={profitData}>
                          <Line type="monotone" dataKey="value" stroke="#8884d8" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Job Calculator Preview */}
                <Card>
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
                        {materials.map((material) => (
                          <TableRow key={material.id}>
                            <TableCell>{material.name}</TableCell>
                            <TableCell>£{material.cost.toFixed(2)}</TableCell>
                            <TableCell>{material.unit}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-12 md:py-24">
            <h2 className="text-3xl font-bold text-center mb-8">Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>For small businesses</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">£29/mo</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Basic job costing</li>
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Up to 10 projects</li>
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Email support</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For growing businesses</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">£79/mo</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Advanced job costing</li>
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Unlimited projects</li>
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Priority support</li>
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Profit analysis tools</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large organizations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">Custom</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Custom features</li>
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Dedicated account manager</li>
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> 24/7 premium support</li>
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> On-site training</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Contact Sales</Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-12 md:py-24">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>How accurate is the job cost calculator?</AccordionTrigger>
                <AccordionContent>
                  Our job cost calculator is highly accurate, using up-to-date pricing data and customizable inputs. However, the final accuracy depends on the information you provide. We recommend regularly updating your material and labor costs to ensure the most precise estimates.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I customize the calculator for my specific trade?</AccordionTrigger>
                <AccordionContent>
                  Yes, the job cost calculator is fully customizable. You can add your own materials, adjust labor rates, and set custom overhead and profit margins. This flexibility ensures that the calculator works for your unique business needs, regardless of your specific trade.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is my data secure with TradeJob Pro?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. We take data security very seriously. All your information, including your job costs and financial data, is encrypted and stored securely. We use industry-standard security protocols to ensure your business data remains private and protected.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I try the job cost calculator before subscribing?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer a free trial that includes access to our job cost calculator. This allows you to test the accuracy and ease of use before committing to a subscription. Sign up for the trial to see how TradeJob Pro can benefit your business.
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