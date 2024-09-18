"use client";

import { useEffect } from 'react';
import Dashboard from '@/components/dashboard';

export default function DashboardPage() {
    console.log('DashboardPage component rendering started');

    useEffect(() => {
        console.log('Dashboard page mounted');
    }, []);

    console.log('About to render Dashboard component');
    return <Dashboard />;
}