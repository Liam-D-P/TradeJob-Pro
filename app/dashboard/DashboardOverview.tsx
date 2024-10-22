import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { DollarSign, Briefcase, Package, Activity, TrendingUp } from 'lucide-react'
import { useJobs } from "@/app/context/JobContext"
import { format } from "date-fns"

// You might want to move these data to a separate file or fetch from an API
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

export function DashboardOverview() {
  const { jobs } = useJobs()
  
  // Calculate revenue, materialCosts, and other metrics based on jobs
  const revenue = jobs.reduce((total, job) => total + (job.revenue || 0), 0)
  const materialCosts = jobs.reduce((total, job) => total + job.totalPrice, 0)
  const activeProjects = jobs.filter(job => job.status === 'active')
  const upcomingJobs = jobs.filter(job => job.status === 'scheduled')

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Profit</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">£{profitData[profitData.length - 1].value}</div>
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">£{revenue}</div>
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-sm font-medium">Material Costs</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">£{materialCosts}</div>
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-sm font-medium">Upcoming Jobs</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{upcomingJobs.length}</div>
          <ul className="mt-2 space-y-2">
            {upcomingJobs.map(job => (
              <li key={job.id} className="flex justify-between items-center text-sm">
                <span>{job.name}</span>
                <span>£{job.totalPrice.toFixed(2)} - {job.startDate ? format(job.startDate, 'MMM dd, yyyy') : 'Not scheduled'}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Active Jobs</CardTitle>
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
    </div>
  )
}
