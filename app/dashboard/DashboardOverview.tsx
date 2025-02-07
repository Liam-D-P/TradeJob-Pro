"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { DollarSign, Briefcase, Activity, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { useJobs } from "@/app/context/JobContext"
import { format } from "date-fns"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const profitData = Array.from({ length: 12 }, (_, i) => ({
  name: format(new Date(2024, i, 1), 'MMM'),
  value: Math.floor(Math.random() * 3000) + 1000
}))

const revenueData = Array.from({ length: 12 }, (_, i) => ({
  name: format(new Date(2024, i, 1), 'MMM'),
  value: Math.floor(Math.random() * 5000) + 3000
}))

export function DashboardOverview() {
  const { jobs } = useJobs()
  
  const revenue = jobs.reduce((total, job) => total + (job.revenue || 0), 0)
  const materialCosts = jobs.reduce((total, job) => total + job.totalPrice, 0)
  const profit = revenue - materialCosts
  const activeProjects = jobs.filter(job => job.status === 'active')
  const upcomingJobs = jobs.filter(job => job.status === 'scheduled')
  const completedJobs = jobs.filter(job => job.status === 'completed')

  const monthlyGrowth = 20 // Replace with actual calculation
  const projectCompletion = (completedJobs.length / jobs.length) * 100

  return (
    <div className="w-full space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              {monthlyGrowth > 0 ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  {monthlyGrowth}%
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  {Math.abs(monthlyGrowth)}%
                </Badge>
              )}
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1">£{revenue.toLocaleString()}</h3>
            </div>
            <div className="mt-4 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData.slice(-6)}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                15%
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
              <h3 className="text-2xl font-bold mt-1">£{profit.toLocaleString()}</h3>
            </div>
            <div className="mt-4 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={profitData.slice(-6)}>
                  <defs>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#22c55e" fillOpacity={1} fill="url(#colorProfit)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                Active
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
              <h3 className="text-2xl font-bold mt-1">{activeProjects.length}</h3>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{projectCompletion.toFixed(0)}%</span>
              </div>
              <Progress value={projectCompletion} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <Badge className="bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                Upcoming
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">Upcoming Jobs</p>
              <h3 className="text-2xl font-bold mt-1">{upcomingJobs.length}</h3>
            </div>
            <div className="mt-4">
              <div className="space-y-2">
                {upcomingJobs.slice(0, 2).map(job => (
                  <div key={job.id} className="text-sm flex justify-between">
                    <span className="truncate flex-1">{job.name}</span>
                    <span className="text-muted-foreground ml-2">
                      £{job.totalPrice.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart - Updated height */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]"> {/* Increased height */}
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenueMain" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#colorRevenueMain)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Active Projects - Updated layout */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Active Projects Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6"> {/* Increased spacing */}
              {activeProjects.map(job => (
                <div key={job.id} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-lg">{job.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {job.startDate ? format(new Date(job.startDate), 'MMM dd, yyyy') : 'Not started'}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-base px-4 py-1">
                      £{job.totalPrice.toLocaleString()}
                    </Badge>
                  </div>
                  <Progress value={Math.random() * 100} className="h-3" /> {/* Increased height */}
                </div>
              ))}
              {activeProjects.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-lg">
                  No active projects
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
