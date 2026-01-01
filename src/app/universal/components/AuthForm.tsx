'use client';

import React, { useState } from 'react';
import { UniversalInput } from './UniversalInput';
import { UniversalButton } from './UniversalButton';

interface AuthFormProps {
    type: 'login' | 'signup';
    onSubmit: (data: any) => void;
}

export function AuthForm({ type, onSubmit }: AuthFormProps) {
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                padding: '2rem',
                backgroundColor: 'var(--card-bg)',
                border: 'var(--border-width) solid var(--border)',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-md, none)',
                maxWidth: '400px',
                width: '100%',
                margin: '0 auto'
            }}
        >
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', borderBottom: 'none' }}>
                {type === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>

            {type === 'signup' && (
                <UniversalInput
                    label="Full Name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                />
            )}

            <UniversalInput
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
            />

            <UniversalInput
                label="Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                required
            />

            <div style={{ marginTop: '1.5rem' }}>
                <UniversalButton
                    label={type === 'login' ? 'Sign In' : 'Sign Up'}
                    type="submit"
                    style={{ width: '100%' }}
                />
            </div>

            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem', opacity: 0.8 }}>
                {type === 'login' ? "Don't have an account? " : "Already have an account? "}
                <a href={type === 'login' ? '/signup' : '/login'} style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                    {type === 'login' ? 'Sign Up' : 'Log In'}
                </a>
            </p>
        </form>
    );
}
