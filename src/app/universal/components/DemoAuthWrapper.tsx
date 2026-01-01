'use client';

import React from 'react';
import { AuthForm } from './AuthForm';

import { useRouter } from 'next/navigation';

export function DemoAuthWrapper({ type }: { type: 'login' | 'signup' }) {
    const router = useRouter();

    const handleAuth = (data: any) => {
        // Simulate API call delay
        console.log('Authenticating...', data);

        // "Log in" by setting a mock token
        // In a real app this would be a secure HTTP-only cookie
        if (typeof window !== 'undefined') {
            localStorage.setItem('demo_auth_token', 'mock_token_12345');
            // Trigger a custom event so the header knows to update immediately
            window.dispatchEvent(new Event('auth-change'));
        }

        // Redirect to dashboard
        router.push('/settings');
    };

    return (
        <AuthForm
            type={type}
            onSubmit={handleAuth}
        />
    );
}
