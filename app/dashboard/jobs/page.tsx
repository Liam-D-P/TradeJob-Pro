"use client"

import { Jobs } from "../Jobs"
import { JobProvider } from "@/app/context/JobContext"

export default function JobsPage() {
  return (
    <JobProvider>
      <Jobs />
    </JobProvider>
  )
} 