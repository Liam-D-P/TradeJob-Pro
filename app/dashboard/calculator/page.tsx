"use client"

import { Calculator } from "../Calculator"
import { JobProvider } from "@/app/context/JobContext"

export default function CalculatorPage() {
  return (
    <JobProvider>
      <Calculator />
    </JobProvider>
  )
} 