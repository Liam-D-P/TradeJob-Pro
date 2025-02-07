"use client"

import React, { useState, useEffect } from 'react'
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs"
import { DashboardOverview } from "@/app/dashboard/DashboardOverview"
import { JobProvider } from "@/app/context/JobContext"

export default function Dashboard() {
  const { isAuthenticated, user } = useKindeAuth();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      setUserName(user.given_name || user.family_name || user.email || 'User');
    }
  }, [isAuthenticated, user]);

  return (
    <JobProvider>
      <div className="w-full">
        <h2 className="text-3xl font-bold tracking-tight mb-8">
          Welcome back, {userName}
        </h2>
        <DashboardOverview />
      </div>
    </JobProvider>
  );
}
