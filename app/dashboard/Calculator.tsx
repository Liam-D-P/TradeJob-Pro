import React, { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, MinusCircle, Trash2, Save, FileDown, ChevronDown } from 'lucide-react'
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

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setNewMaterial({...newMaterial, cost: value === '' ? 0 : parseFloat(value)});
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-700 shadow-md rounded-lg border border-gray-200 dark:border-gray-600">
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
                className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="material-cost">Cost</Label>
              <Input
                id="material-cost"
                type="text"
                value={newMaterial.cost || ''}
                onChange={handleCostChange}
                placeholder="Cost per unit"
                className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="material-unit">Unit</Label>
              <Input
                id="material-unit"
                value={newMaterial.unit}
                onChange={(e) => setNewMaterial({...newMaterial, unit: e.target.value})}
                placeholder="e.g., bag, sqm, hour"
                className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>
          <Button onClick={addMaterial} className="bg-blue-500 hover:bg-blue-600 text-white">Add New Material</Button>
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
                <TableCell>£{material.cost.toFixed(2)} per {material.unit}</TableCell>
                <TableCell>{material.quantity}</TableCell>
                <TableCell>£{(material.cost * material.quantity).toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => updateQuantity(material.id, -1)}
                      className="hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-200"
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => updateQuantity(material.id, 1)}
                      className="hover:bg-green-100 dark:hover:bg-green-900 transition-colors duration-200"
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                    <Button 
                      className="bg-red-500 text-white hover:bg-red-600 transition-colors duration-200" 
                      size="icon" 
                      onClick={() => deleteMaterial(material.id)}
                    >
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
              <div className="text-2xl font-bold">Total Price: £{totalPrice.toFixed(2)}</div>
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
                      <TableCell>£{(material.cost * material.quantity).toFixed(2)}</TableCell>
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
  )
}
