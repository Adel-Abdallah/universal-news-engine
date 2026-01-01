'use client';

import React from 'react';

interface UniversalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function UniversalInput({ label, error, style, ...props }: UniversalInputProps) {
    return (
        <div style={{ marginBottom: '1rem', width: '100%' }}>
            {label && (
                <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    fontFamily: 'var(--font-main)'
                }}>
                    {label}
                </label>
            )}
            <input
                style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius)',
                    border: `var(--border-width) solid ${error ? 'red' : 'var(--border)'}`,
                    backgroundColor: 'var(--bg)',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-main)',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    ...style
                }}
                {...props}
            />
            {error && (
                <span style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>
                    {error}
                </span>
            )}
            <style jsx>{`
                input:focus {
                    border-color: var(--primary) !important;
                }
            `}</style>
        </div>
    );
}
