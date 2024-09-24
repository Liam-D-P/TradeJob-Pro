"use client";

import { useEffect } from 'react';
import Dashboard from '@/app/dashboard/dashboard';

export default function DashboardPage() {
    console.log('DashboardPage component rendering started');

    useEffect(() => {
        console.log('Dashboard page mounted');
    }, []);

    console.log('About to render Dashboard component');
    return <Dashboard />;
}