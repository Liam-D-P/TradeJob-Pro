"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import Dashboard from '@/app/dashboard/dashboard';

export default function DashboardPage() {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useKindeAuth();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            console.log('User not authenticated, redirecting to login');
            router.push('/login');
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return <Dashboard />;
}