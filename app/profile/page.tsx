"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

export default function ProfileRedirectPage() {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useKindeAuth();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                console.log('User not authenticated, redirecting to login');
                router.push('/login');
            } else {
                console.log('User authenticated, redirecting to dashboard profile');
                router.push('/dashboard/profile');
            }
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return null;
} 