"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { DollarSign, Briefcase, Package, Activity, PlusCircle, MinusCircle, Trash2, Save, Play, Square, Calendar, LayoutDashboard, Calculator, ClipboardList, X, ChevronDown, FileDown, Eye, TrendingUp, User, LogOut, Settings } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

const NumberTicker = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 1000
    const steps = 60
    const stepValue = (value - displayValue) / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      setDisplayValue(prev => {
        const newValue = prev + stepValue
        return currentStep === steps ? value : Math.round(newValue)
      })

      if (currentStep === steps) {
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value, displayValue])

  return <span>{displayValue}</span>
}

const profitData = [
  { name: 'Jan', value: 1000 },
  { name: 'Feb', value: 500 },
  { name: 'Mar', value: 1500 },
  { name: 'Apr', value: 1300 },
  { name: 'May', value: 2000 },
  { name: 'Jun', value: 1700 },
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

type Material = {
  id: string
  name: string
  cost: number
  unit: string
  quantity: number
}

type Job = {
  id: string
  name: string
  materials: Material[]
  totalPrice: number
  status: 'pending' | 'active' | 'completed'
  startDate?: Date
  revenue?: number
  profit?: number
}

const StatusBadge = ({ status }: { status: Job['status'] }) => {
  const colorMap = {
    pending: 'bg-yellow-500',
    active: 'bg-green-500',
    completed: 'bg-blue-500'
  }

  return (
    <Badge className={`${colorMap[status]} text-white`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

type DashboardItem = {
  id: string
  title: string
  component: React.ReactNode
}

export default function Dashboard() {
  console.log('Dashboard component rendered');

  useEffect(() => {
    console.log('Dashboard component mounted');
  }, []);

  return <DashboardComponent />;
}

function DashboardComponent() {
  const [activeTab, setActiveTab] = useState('DASH')
  const [materials, setMaterials] = useState<Material[]>([])
  const [newMaterial, setNewMaterial] = useState<Omit<Material, 'id' | 'quantity'>>({ name: '', cost: 0, unit: '' })
  const [totalPrice, setTotalPrice] = useState(0)
  const [jobName, setJobName] = useState('')
  const [savedJobs, setSavedJobs] = useState<Job[]>([])
  const [revenue, setRevenue] = useState(22222)
  const [materialCosts, setMaterialCosts] = useState(12222)
  const [activeProjects, setActiveProjects] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const { toast } = useToast()

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/placeholder.svg?height=100&width=100',
  }

  const dashboardItems: DashboardItem[] = [
    { id: 'profit', title: 'Profit', component: null },
    { id: 'revenue', title: 'Revenue', component: null },
    { id: 'materialCosts', title: 'Material Costs', component: null },
    { id: 'upcomingJobs', title: 'Upcoming Jobs', component: null },
    { id: 'activeProjects', title: 'Active Projects', component: null },
  ]

  const [visibleItems, setVisibleItems] = useState<string[]>([])

  useEffect(() => {
    // Move localStorage access to useEffect
    const savedVisibleItems = localStorage.getItem('visibleDashboardItems')
    setVisibleItems(savedVisibleItems ? JSON.parse(savedVisibleItems) : dashboardItems.map(item => item.id))
  }, [])

  useEffect(() => {
    setMaterials([
      { id: '1', name: 'Lime', cost: 10, unit: 'bag', quantity: 0 },
      { id: '2', name: 'Sand', cost: 5, unit: 'bag', quantity: 0 },
      { id: '3', name: 'Stone', cost: 20, unit: 'sqm', quantity: 0 },
      { id: '4', name: 'Labor', cost: 25, unit: 'hour', quantity: 0 },
    ])
  }, [])

  const calculatePrice = useCallback(() => {
    const price = materials.reduce((total, material) => {
      return total + (material.cost * material.quantity)
    }, 0)
    setTotalPrice(price)
  }, [materials])

  useEffect(() => {
    calculatePrice()
  }, [calculatePrice])

  useEffect(() => {
    // Only save to localStorage on the client side
    if (typeof window !== 'undefined') {
      localStorage.setItem('visibleDashboardItems', JSON.stringify(visibleItems))
    }
  }, [visibleItems])

  const addMaterial = () => {
    if (newMaterial.name && newMaterial.cost > 0) {
      const isDuplicate = materials.some(
        (material) => material.name.toLowerCase() === newMaterial.name.toLowerCase()
      )

      if (isDuplicate) {
        toast({
          title: "Duplicate Material",
          description: `${newMaterial.name} already exists in the list.`,
          variant: "destructive",
        })
        return
      }

      setMaterials([...materials, { ...newMaterial, id: Date.now().toString(), quantity: 0 }])
      setNewMaterial({ name: '', cost: 0, unit: '' })
      toast({
        title: "Material Added",
        description: `${newMaterial.name} has been added to the list.`,
      })
    }
  }

  const updateQuantity = (id: string, change: number) => {
    setMaterials(materials.map(material => 
      material.id === id ? { ...material, quantity: Math.max(0, material.quantity + change) } : material
    ))
  }

  const deleteMaterial = (id: string) => {
    const materialToDelete = materials.find(m => m.id === id)
    setMaterials(materials.filter(material => material.id !== id))
    if (materialToDelete) {
      toast({
        title: "Material Deleted",
        description: `${materialToDelete.name} has been removed from the list.`,
        variant: "destructive",
      })
    }
  }

  const saveJob = () => {
    if (jobName && totalPrice > 0) {
      const newJob: Job = {
        id: Date.now().toString(),
        name: jobName,
        materials: materials.filter(m => m.quantity > 0),
        totalPrice: totalPrice,
        status: 'pending'
      }
      setSavedJobs([...savedJobs, newJob])
      setJobName('')
      setMaterials(materials.map(m => ({ ...m, quantity: 0 })))
      setTotalPrice(0)
      toast({
        title: "Job Saved",
        description: `${newJob.name} has been added to saved jobs.`,
      })
    }
  }

  const startJob = (jobId: string) => {
    setSavedJobs(savedJobs.map(job => 
      job.id === jobId ? { ...job, status: 'active' } : job
    ))
    const startedJob = savedJobs.find(job => job.id === jobId)
    if (startedJob) {
      setActiveProjects(prev => [...prev, startedJob])
      toast({
        title: "Job Started",
        description: `${startedJob.name} has been started.`,
      })
    }
  }

  const endJob = (jobId: string) => {
    const job = savedJobs.find(job => job.id === jobId)
    if (job) {
      setSavedJobs(savedJobs.map(j => 
        j.id === jobId ? { ...j, status: 'completed' } : j
      ))
      setActiveProjects(prev => prev.filter(p => p.id !== jobId))
      setMaterialCosts(prev => prev + job.totalPrice)
      toast({
        title: "Job Completed",
        description: `${job.name} has been marked as completed.`,
      })
    }
  }

  const scheduleJob = (jobId: string, date: Date) => {
    setSavedJobs(savedJobs.map(job => 
      job.id === jobId ? { ...job, startDate: date, status: 'pending' } : job
    ))
    const scheduledJob = savedJobs.find(job => job.id === jobId)
    if (scheduledJob) {
      toast({
        title: "Job Scheduled",
        description: `${scheduledJob.name} has been scheduled for ${format(date, 'MMM dd, yyyy')}.`,
      })
    }
  }

  const getUpcomingJobs = () => {
    return savedJobs.filter(job => job.status === 'pending' && job.startDate)
  }

  const updateJobRevenue = (jobId: string, revenue: number) => {
    setSavedJobs(savedJobs.map(job => {
      if (job.id === jobId) {
        const updatedJob = { ...job, revenue, profit: revenue - job.totalPrice }
        if (job.status === 'completed' && !job.revenue) {
          setRevenue(prev => prev + revenue)
        }
        return updatedJob
      }
      return job
    }))
    setSelectedJob(null)
    toast({
      title: "Revenue Updated",
      description: `Revenue for the job has been updated.`,
    })
  }

  const generatePDF = (job: Job) => {
    const doc = new jsPDF()
    doc.text(`Job Breakdown: ${job.name}`, 20, 20)
    doc.text(`Total Cost: $${job.totalPrice.toFixed(2)}`, 20, 30)
    
    const tableData = job.materials.map(m => [m.name, m.quantity, m.unit, `$${m.cost.toFixed(2)}`, `$${(m.quantity * m.cost).toFixed(2)}`])
    
    // @ts-expect-error: jsPDF types are not fully compatible with the autoTable plugin
    doc.autoTable({
      head: [['Material', 'Quantity', 'Unit', 'Cost per Unit', 'Total']],
      body: tableData,
      startY: 40,
    })
    
    doc.save(`${job.name}_breakdown.pdf`)
    
    toast({
      title: "PDF Generated",
      description: `Job breakdown for ${job.name} has been saved as a PDF.`,
    })
  }

  const handleLogout = () => {
    // Implement logout logic here
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
  }

  const toggleItemVisibility = (itemId: string) => {
    setVisibleItems(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    )
  }

  const renderDashboardItem = (item: DashboardItem) => {
    switch (item.id) {
      case 'profit':
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£<NumberTicker value={profitData[profitData.length - 1].value} /></div>
              <p className="text-xs text-muted-foreground mt-1">+20% from last month</p>
              <div className="h-[100px] mt-4">
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
        )
      case 'revenue':
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-2xl font-bold">£<NumberTicker value={revenue} /></div>
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
            </CardContent>
          </Card>
        )
      case 'materialCosts':
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-sm font-medium">Material Costs</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-2xl font-bold">£<NumberTicker value={materialCosts} /></div>
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
            </CardContent>
          </Card>
        )
      case 'upcomingJobs':
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-sm font-medium">Upcoming Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-2xl font-bold">+<NumberTicker value={getUpcomingJobs().length} /></div>
              <ul className="mt-2 space-y-2">
                {getUpcomingJobs().map(job => (
                  <li key={job.id} className="flex justify-between items-center text-sm">
                    <span>{job.name}</span>
                    <span>£{job.totalPrice.toFixed(2)} - {format(job.startDate!, 'MMM dd, yyyy')}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )
      case 'activeProjects':
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Active Projects</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{activeProjects.length}</div>
              <p className="text-sm text-muted-foreground mb-4">2 completed this month</p>
              <ul className="space-y-2">
                {activeProjects.map(job => (
                  <li key={job.id} className="flex justify-between items-center">
                    <span>{job.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {job.startDate ? format(job.startDate, 'MMM dd, yyyy') : 'Not scheduled'}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Narrow Side Menu */}
      <div className="w-16 bg-black text-white flex flex-col items-center py-4">
        <nav className="space-y-4">
          <Button
            variant={activeTab === 'DASH' ? 'default' : 'ghost'}
            size="icon"
            className="w-12 h-12"
            onClick={() => setActiveTab('DASH')}
          >
            <LayoutDashboard className="h-6 w-6" />
          </Button>
          <Button
            variant={activeTab === 'CALC' ? 'default' : 'ghost'}
            size="icon"
            className="w-12 h-12"
            onClick={() => setActiveTab('CALC')}
          >
            <Calculator className="h-6 w-6" />
          </Button>
          <Button
            variant={activeTab === 'JOBS' ? 'default' : 'ghost'}
            size="icon"
            className="w-12 h-12"
            onClick={() => setActiveTab('JOBS')}
          >
            <ClipboardList className="h-6 w-6" />
          </Button>
          <Button
            variant={activeTab === 'PROFILE' ? 'default' : 'ghost'}
            size="icon"
            className="w-12 h-12"
            onClick={() => setActiveTab('PROFILE')}
          >
            <User className="h-6 w-6" />
          </Button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-auto">
        {activeTab === 'DASH' && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Dashboard</h2>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Layout
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <h4 className="font-medium leading-none">Dashboard Items</h4>
                    <div className="grid gap-2">
                      {dashboardItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={item.id}
                            checked={visibleItems.includes(item.id)}
                            onCheckedChange={() => toggleItemVisibility(item.id)}
                          />
                          <label
                            htmlFor={item.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {item.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {dashboardItems
                .filter((item) => visibleItems.includes(item.id))
                .map((item) => (
                  <div key={item.id} className="relative">
                    {renderDashboardItem(item)}
                  </div>
                ))}
            </div>
          </>
        )}

        {activeTab === 'CALC' && (
          <Card>
            <CardHeader>
              <CardTitle>Job Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="material-name">Material</Label>
                    <Input
                      id="material-name"
                      value={newMaterial.name}
                      onChange={(e) => setNewMaterial({...newMaterial, name: e.target.value})}
                      placeholder="e.g., Brick, Cement"
                    />
                  </div>
                  <div>
                    <Label htmlFor="material-cost">Cost</Label>
                    <Input
                      id="material-cost"
                      type="number"
                      value={newMaterial.cost || ''}
                      onChange={(e) => setNewMaterial({...newMaterial, cost: Number(e.target.value)})}
                      placeholder="Cost per unit"
                    />
                  </div>
                  <div>
                    <Label htmlFor="material-unit">Unit</Label>
                    <Input
                      id="material-unit"
                      value={newMaterial.unit}
                      onChange={(e) => setNewMaterial({...newMaterial, unit: e.target.value})}
                      placeholder="e.g., bag, sqm, hour"
                    />
                  </div>
                </div>
                <Button onClick={addMaterial}>Add New Material</Button>
              </div>

              <Table className="mt-6">
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>Cost per Unit</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materials.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell>{material.name}</TableCell>
                      <TableCell>${material.cost.toFixed(2)} per {material.unit}</TableCell>
                      <TableCell>{material.quantity}</TableCell>
                      <TableCell>${(material.cost * material.quantity).toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="icon" onClick={() => updateQuantity(material.id, -1)}>
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => updateQuantity(material.id, 1)}>
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" onClick={() => deleteMaterial(material.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6 space-y-4">
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center">
                    <div className="text-2xl font-bold">Total Price: ${totalPrice.toFixed(2)}</div>
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Material</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Cost</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {materials.filter(m => m.quantity > 0).map((material) => (
                          <TableRow key={material.id}>
                            <TableCell>{material.name}</TableCell>
                            <TableCell>{material.quantity} {material.unit}</TableCell>
                            <TableCell>${(material.cost * material.quantity).toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Button onClick={() => generatePDF({ id: 'temp', name: jobName || 'Unnamed Job', materials, totalPrice, status: 'pending' })} className="mt-2">
                      <FileDown className="mr-2 h-4 w-4" /> Save as PDF
                    </Button>
                  </CollapsibleContent>
                </Collapsible>
                <div className="flex space-x-4">
                  <Input
                    value={jobName}
                    onChange={(e) => setJobName(e.target.value)}
                    placeholder="Enter job name"
                    className="flex-grow"
                  />
                  <Button onClick={saveJob} disabled={!jobName || totalPrice === 0}>
                    <Save className="mr-2 h-4 w-4" /> Save Job
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'JOBS' && (
          <Card>
            <CardHeader>
              <CardTitle>Job Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Name</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Profit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {savedJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.name}</TableCell>
                      <TableCell>${job.totalPrice.toFixed(2)}</TableCell>
                      <TableCell>${job.revenue?.toFixed(2) || '0.00'}</TableCell>
                      <TableCell>${job.profit?.toFixed(2) || '0.00'}</TableCell>
                      <TableCell>
                        <StatusBadge status={job.status} />
                      </TableCell>
                      <TableCell>
                        {job.startDate ? format(job.startDate, 'MMM dd, yyyy') : 'Not scheduled'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="icon">
                                <Calendar className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={job.startDate}
                                onSelect={(date) => date && scheduleJob(job.id, date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          {job.status === 'pending' && (
                            <Button variant="outline" size="sm" onClick={() => startJob(job.id)}>
                              <Play className="mr-2 h-4 w-4" /> Start
                            </Button>
                          )}
                          {job.status === 'active' && (
                            <Button variant="outline" size="sm" onClick={() => endJob(job.id)}>
                              <Square className="mr-2 h-4 w-4" /> End
                            </Button>
                          )}
                          {job.status === 'completed' && (
                            <Button variant="outline" size="sm" onClick={() => setSelectedJob(job)}>
                              <DollarSign className="mr-2 h-4 w-4" /> Report Revenue
                            </Button>
                          )}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{job.name} Details</DialogTitle>
                              </DialogHeader>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Material</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Cost</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {job.materials.map((material) => (
                                    <TableRow key={material.id}>
                                      <TableCell>{material.name}</TableCell>
                                      <TableCell>{material.quantity} {material.unit}</TableCell>
                                      <TableCell>${(material.cost * material.quantity).toFixed(2)}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                              <Button onClick={() => generatePDF(job)} className="mt-2">
                                <FileDown className="mr-2 h-4 w-4" /> Save as PDF
                              </Button>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {selectedJob && (
                <div className="mt-6 p-4 border rounded-lg relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => setSelectedJob(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <h3 className="text-lg font-semibold mb-4">Report Revenue for {selectedJob.name}</h3>
                  <div className="flex items-center space-x-4">
                    <Input
                      type="number"
                      placeholder="Enter revenue"
                      onChange={(e) => {
                        const revenue = parseFloat(e.target.value)
                        if (!isNaN(revenue)) {
                          setSelectedJob({...selectedJob, revenue, profit: revenue - selectedJob.totalPrice})
                        }
                      }}
                    />
                    <Button onClick={() => updateJobRevenue(selectedJob.id, selectedJob.revenue || 0)}>
                      Save Revenue
                    </Button>
                  </div>
                  {selectedJob.revenue && (
                    <p className="mt-2">Estimated Profit: ${(selectedJob.revenue - selectedJob.totalPrice).toFixed(2)}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 'PROFILE' && (
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
            </CardHeader>
            <CardContent>
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

                <div className="flex justify-between items-center">
                  <Button variant="outline" onClick={() => setActiveTab('DASH')}>
                    Back to Dashboard
                  </Button>
                  <Button variant="destructive" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Log Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}