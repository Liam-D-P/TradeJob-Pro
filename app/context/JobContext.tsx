import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export type Job = {
  id: string;
  name: string;
  materials: Array<{
    id: string;
    name: string;
    cost: number;
    unit: string;
    quantity: number;
  }>;
  totalPrice: number;
  status: 'pending' | 'scheduled' | 'active' | 'completed';
  startDate?: Date;
  revenue?: number;
  profit?: number;
};

type JobContextType = {
  jobs: Job[];
  addJob: (job: Job) => void;
  updateJob: (job: Job) => void;
};

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>(() => {
    if (typeof window !== 'undefined') {
      const savedJobs = localStorage.getItem('jobs');
      return savedJobs ? JSON.parse(savedJobs) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jobs', JSON.stringify(jobs));
    }
  }, [jobs]);

  const addJob = (job: Job) => {
    setJobs((prevJobs) => [...prevJobs, job]);
  };

  const updateJob = (updatedJob: Job) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, updateJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};
