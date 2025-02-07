"use client"

import { useState } from "react"
import { Calendar, Play, Eye, Search, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useJobs } from "@/app/context/JobContext"
import { format } from 'date-fns'

interface Job {
  id: string
  name: string
  status: "pending" | "completed" | "scheduled" | "active"
  startDate: Date | null
  revenue?: number
  profit?: number
  completionDate?: Date
  materials: Array<{
    id: string
    name: string
    cost: number
    quantity: number
    unit: string
  }>
  totalPrice?: number
  progress?: number
}

export function Jobs() {
  const { jobs, updateJob } = useJobs()
  const [sortBy, setSortBy] = useState<"date" | "name" | "cost">("date")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const parseDate = (dateString: string | Date | null | undefined) => {
    if (!dateString) return null;
    if (dateString instanceof Date) return dateString;
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  };

  const filteredJobs = jobs
    .filter((job) => {
      if (filterStatus === "all") return true
      return job.status === filterStatus
    })
    .filter((job) => job.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          const dateA = parseDate(a.startDate)
          const dateB = parseDate(b.startDate)
          if (!dateA && !dateB) return 0
          if (!dateA) return 1
          if (!dateB) return -1
          return dateB.getTime() - dateA.getTime()
        case "name":
          return a.name.localeCompare(b.name)
        case "cost":
          const aCost = a.materials.reduce((sum, m) => sum + m.cost * m.quantity, 0)
          const bCost = b.materials.reduce((sum, m) => sum + m.cost * m.quantity, 0)
          return bCost - aCost
        default:
          return 0
      }
    })

  const getStatusColor = (status: "pending" | "completed" | "scheduled" | "active") => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "active":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      case "scheduled":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleViewDetails = (job: Job) => {
    console.log("View details for job:", job)
  }
  const handleStartJob = (job: Job) => {
    updateJob({
      ...job,
      status: "active", 
      startDate: new Date(),
      totalPrice: job.materials.reduce((sum, m) => sum + m.cost * m.quantity, 0)
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="px-2">
          <div className="mb-6 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Jobs</h1>
              <Badge variant="secondary" className="h-7 rounded-full px-1">
                {jobs.length} total
              </Badge>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative md:max-w-xs">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="md:max-w-xs">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={(value: "date" | "name" | "cost") => setSortBy(value)}>
                <SelectTrigger className="md:max-w-xs">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      Sort by Date
                    </div>
                  </SelectItem>
                  <SelectItem value="name">
                    <div className="flex items-center">
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      Sort by Name
                    </div>
                  </SelectItem>
                  <SelectItem value="cost">
                    <div className="flex items-center">
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      Sort by Cost
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No jobs found. Add jobs from the calculator page.
              </div>
            ) : (
              filteredJobs.map((job) => (
                <Card key={job.id} className="bg-white">
                  <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl break-words">{job.name}</CardTitle>
                    <Badge variant="secondary" className={`${getStatusColor(job.status)} text-white`}>
                      {job.status.replace("_", " ")}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground break-words">Total Cost</p>
                          <p className="text-lg font-semibold break-words">£{(job.materials.reduce((sum, m) => sum + m.cost * m.quantity, 0)).toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground break-words">Start Date</p>
                          <p className="text-lg font-semibold break-words">
                            {job.startDate ? format(parseDate(job.startDate) || new Date(), 'PPP') : "Not scheduled"}
                          </p>
                        </div>
                        {job.revenue !== undefined && (
                          <>
                            <div>
                              <p className="text-sm text-muted-foreground break-words">Revenue</p>
                              <p className="text-lg font-semibold break-words">£{job.revenue.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground break-words">Profit</p>
                              <p className="text-lg font-semibold break-words">£{job.profit?.toFixed(2)}</p>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        {job.status === "pending" && (
                          <>
                            <Button className="w-full" size="lg" onClick={() => handleStartJob(job as any)}>
                              <Play className="mr-2 h-4 w-4" />
                              Start
                            </Button>
                            <Button variant="outline" className="w-full" size="lg">
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule
                            </Button>
                          </>
                        )}
                        <Button variant="secondary" className="w-full" size="lg" onClick={() => handleViewDetails(job as any)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                        {job.status === "completed" && (
                          <div className="mt-4">
                            <p className="text-sm text-muted-foreground mb-2">Completion Progress</p>
                            <Progress value={100} className="w-full" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
