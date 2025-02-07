"use client"

import React, { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, MinusCircle, Trash2, Save, FileDown, ChevronDown, Package, Calculator as CalcIcon } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
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
  status: 'pending' | 'active' | 'completed'
  startDate?: Date
  revenue?: number
  profit?: number
}

export function Calculator() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [newMaterial, setNewMaterial] = useState<Omit<Material, 'id' | 'quantity'>>({ name: '', cost: 0, unit: '' })
  const [totalPrice, setTotalPrice] = useState(0)
  const [jobName, setJobName] = useState('')
  const { toast } = useToast()
  const { addJob } = useJobs()

  React.useEffect(() => {
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

  React.useEffect(() => {
    calculatePrice()
  }, [calculatePrice])

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
      addJob(newJob)
      setJobName('')
      setMaterials(materials.map(m => ({ ...m, quantity: 0 })))
      setTotalPrice(0)
      toast({
        title: "Job Saved",
        description: `${newJob.name} has been added to saved jobs.`,
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

    // Add total cost with type checking
    const totalCost = typeof job.totalPrice === 'number' ? job.totalPrice.toFixed(2) : '0.00'
    doc.text(`Total Cost: £${totalCost}`, 20, 30)
    
    const tableData = job.materials.map(m => [
      m.name,
      m.quantity.toString(),
      m.unit,
      `£${m.cost.toFixed(2)}`,
      `£${(m.quantity * m.cost).toFixed(2)}`
    ])
    
    // @ts-expect-error: jsPDF types are not fully compatible with the autoTable plugin
    doc.autoTable({
      head: [['Material', 'Quantity', 'Unit', 'Cost per Unit', 'Total']],
      body: tableData,
      startY: 40,
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: { fillColor: [0, 102, 204], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
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

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setNewMaterial({...newMaterial, cost: value === '' ? 0 : parseFloat(value)});
    }
  };

  const handleGeneratePDF = () => {
    // Create a job object from current state
    const currentJob = {
      id: Math.random().toString(36).substr(2, 9), // Generate a temporary ID
      name: jobName || 'Untitled Job',
      materials: materials,
      totalPrice: totalPrice,
      status: 'pending' as const
    };

    generatePDF(currentJob);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Job Calculator</h2>
          <p className="text-muted-foreground">Create and manage job estimates with ease.</p>
        </div>
        <Button 
          onClick={handleGeneratePDF} 
          className="flex items-center gap-2"
          disabled={materials.length === 0}
        >
          <FileDown className="h-4 w-4" /> Export PDF
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Materials Input Card */}
        <Card className="md:row-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Materials</CardTitle>
                <CardDescription>Add materials and their costs</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Add Material Form */}
              <div className="grid gap-4 p-4 border rounded-lg bg-muted/50">
                <div className="grid gap-2">
                  <Label htmlFor="material-name">Material Name</Label>
                  <Input
                    id="material-name"
                    value={newMaterial.name}
                    onChange={(e) => setNewMaterial({...newMaterial, name: e.target.value})}
                    placeholder="e.g., Brick, Cement"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="material-cost">Cost</Label>
                    <Input
                      id="material-cost"
                      type="text"
                      value={newMaterial.cost || ''}
                      onChange={handleCostChange}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="material-unit">Unit</Label>
                    <Input
                      id="material-unit"
                      value={newMaterial.unit}
                      onChange={(e) => setNewMaterial({...newMaterial, unit: e.target.value})}
                      placeholder="e.g., bag, sqm"
                    />
                  </div>
                </div>
                <Button onClick={addMaterial} className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Material
                </Button>
              </div>

              {/* Materials List */}
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Material</TableHead>
                      <TableHead>Cost/Unit</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {materials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">{material.name}</TableCell>
                        <TableCell>£{material.cost.toFixed(2)}/{material.unit}</TableCell>
                        <TableCell>{material.quantity}</TableCell>
                        <TableCell>£{(material.cost * material.quantity).toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => updateQuantity(material.id, -1)}
                              className="hover:text-red-500"
                            >
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => updateQuantity(material.id, 1)}
                              className="hover:text-green-500"
                            >
                              <PlusCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => deleteMaterial(material.id)}
                              className="hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {materials.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                          No materials added. Add your first material above.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CalcIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Job Summary</CardTitle>
                <CardDescription>Overview and total costs</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Collapsible>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Cost</p>
                  <p className="text-3xl font-bold">£{totalPrice.toFixed(2)}</p>
                </div>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent>
                <div className="space-y-4">
                  {materials.filter(m => m.quantity > 0).map((material) => (
                    <div key={material.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{material.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {material.quantity} {material.unit} × £{material.cost.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-medium">£{(material.cost * material.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Save Job Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Save className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Save Job</CardTitle>
                <CardDescription>Save this estimate as a job</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="job-name">Job Name</Label>
                <Input
                  id="job-name"
                  value={jobName}
                  onChange={(e) => setJobName(e.target.value)}
                  placeholder="Enter job name"
                />
              </div>
              <Button 
                onClick={saveJob} 
                disabled={!jobName || totalPrice === 0}
                className="w-full"
              >
                <Save className="mr-2 h-4 w-4" /> Save Job
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
