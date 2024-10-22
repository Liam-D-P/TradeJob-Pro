import React, { useState} from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import { Calendar as CalendarIcon, Play, Square, Eye } from 'lucide-react'
import { useJobs } from "@/app/context/JobContext"

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
  status: 'pending' | 'scheduled' | 'active' | 'completed'
  startDate?: Date
  revenue?: number
  profit?: number
}

const StatusBadge = ({ status }: { status: Job['status'] }) => {
  const colorMap = {
    pending: 'bg-yellow-500',
    scheduled: 'bg-blue-500',
    active: 'bg-green-500',
    completed: 'bg-gray-500'
  }

  return (
    <Badge className={`${colorMap[status]} text-white`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

export function Jobs() {
  const { jobs, updateJob } = useJobs()
  const { toast } = useToast()
  const [tempRevenue, setTempRevenue] = useState('');

  const startJob = (jobId: string) => {
    const job = jobs.find(job => job.id === jobId)
    if (job) {
      updateJob({ ...job, status: 'active' })
      toast({
        title: "Job Started",
        description: `${job.name} has been started.`,
      })
    }
  }

  const endJob = (jobId: string) => {
    const job = jobs.find(job => job.id === jobId)
    if (job) {
      updateJob({ ...job, status: 'completed' })
      toast({
        title: "Job Completed",
        description: `${job.name} has been marked as completed.`,
      })
    }
  }

  const scheduleJob = (jobId: string, date: Date) => {
    const job = jobs.find(job => job.id === jobId)
    if (job) {
      updateJob({ ...job, startDate: date, status: 'scheduled' })
      toast({
        title: "Job Scheduled",
        description: `${job.name} has been scheduled for ${format(date, 'MMM dd, yyyy')}.`,
      })
    }
  }

  const updateJobRevenue = (jobId: string, revenue: number) => {
    const job = jobs.find(job => job.id === jobId)
    if (job) {
      updateJob({ ...job, revenue, profit: revenue - job.totalPrice })
      toast({
        title: "Revenue Updated",
        description: `Revenue for the job has been updated.`,
      })
    }
  }

  const generatePDF = (job: Job) => {
    const doc = new jsPDF()

    // Set font styles
    doc.setFont("helvetica", "bold")
    doc.setFontSize(18)
    doc.setTextColor(0, 102, 204) // RGB color for blue

    // Add title
    doc.text(`Job Breakdown: ${job.name}`, 20, 20)

    // Reset font for normal text
    doc.setFont("helvetica", "normal")
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0) // Black color

    // Add total cost
    doc.text(`Total Cost: £${job.totalPrice.toFixed(2)}`, 20, 30)
    
    const tableData = job.materials.map(m => [m.name, m.quantity, m.unit, `£${m.cost.toFixed(2)}`, `£${(m.quantity * m.cost).toFixed(2)}`])
    
    // @ts-expect-error: jsPDF types are not fully compatible with the autoTable plugin
    doc.autoTable({
      head: [['Material', 'Quantity', 'Unit', 'Cost per Unit', 'Total']],
      body: tableData,
      startY: 40,
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: { fillColor: [0, 102, 204], textColor: 255 }, // Blue background, white text
      alternateRowStyles: { fillColor: [240, 240, 240] }, // Light gray for alternate rows
      margin: { top: 40 },
    })
    // Add footer
    const pageCount = doc.internal.pages.length
    for (let i = 1; i <= pageCount; i++) {
      doc.setFontSize(10)
      doc.setTextColor(150)
      doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' })
    }
    
    doc.save(`${job.name}_breakdown.pdf`)
    
    toast({
      title: "PDF Generated",
      description: `Job breakdown for ${job.name} has been saved as a PDF.`,
    })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Jobs</h2>
      <Card>
        <CardHeader>
          <CardTitle>Saved Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map(job => (
                <TableRow key={job.id}>
                  <TableCell>{job.name}</TableCell>
                  <TableCell>£{job.totalPrice.toFixed(2)}</TableCell>
                  <TableCell><StatusBadge status={job.status} /></TableCell>
                  <TableCell>{job.startDate ? format(job.startDate, 'MMM dd, yyyy') : 'Not scheduled'}</TableCell>
                  <TableCell>{job.revenue ? `£${job.revenue.toFixed(2)}` : '-'}</TableCell>
                  <TableCell>{job.profit ? `£${job.profit.toFixed(2)}` : '-'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {(job.status === 'pending' || job.status === 'scheduled') && (
                        <>
                          <Button
                            onClick={() => startJob(job.id)}
                            className="hover:bg-green-600 transition-colors duration-200"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Start
                          </Button>
                          
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                className="hover:bg-blue-600/80 transition-colors duration-200"
                              >
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                Schedule
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={job.startDate}
                                onSelect={(date) => date && scheduleJob(job.id, date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </>
                      )}
                      {job.status === 'active' && (
                        <Button
                          onClick={() => endJob(job.id)}
                          className="hover:bg-red-600 transition-colors duration-200"
                        >
                          <Square className="h-4 w-4 mr-2" />
                          End
                        </Button>
                      )}
                      {job.status === 'completed' && !job.revenue && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="hover:bg-purple-600/50 transition-colors duration-200"
                            >
                              £ Add Revenue
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Revenue for {job.name}</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="revenue" className="text-right">
                                  Revenue
                                </Label>
                                <Input
                                  id="revenue"
                                  type="text"
                                  className="col-span-3"
                                  onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9.]/g, '');
                                    const numericValue = parseFloat(value);
                                    if (!isNaN(numericValue) && numericValue >= 0) {
                                      updateJobRevenue(job.id, numericValue);
                                    }
                                  }}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={() => {
                                const numericValue = parseFloat(tempRevenue);
                                if (!isNaN(numericValue) && numericValue >= 0) {
                                  updateJobRevenue(job.id, numericValue);
                                  setTempRevenue('');
                                } else {
                                  toast({
                                    title: "Invalid Input",
                                    description: "Please enter a valid non-negative number.",
                                    variant: "destructive"
                                  });
                                }
                              }}>
                                Confirm
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="hover:bg-gray-700/50 transition-colors duration-200"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{job.name} Details</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">Job Summary</h3>
                            <Table>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium">Total Cost</TableCell>
                                  <TableCell>£{job.totalPrice.toFixed(2)}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">Revenue</TableCell>
                                  <TableCell>{job.revenue ? `£${job.revenue.toFixed(2)}` : '-'}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">Profit</TableCell>
                                  <TableCell>{job.profit ? `£${job.profit.toFixed(2)}` : '-'}</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>

                            <h3 className="text-lg font-semibold mb-2 mt-4">Materials</h3>
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
                                    <TableCell>£{(material.cost * material.quantity).toFixed(2)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                            <Button className="mt-4" onClick={() => generatePDF(job)}>Save as PDF</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
