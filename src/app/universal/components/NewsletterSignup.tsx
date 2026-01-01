'use client';

import React from 'react';
import { UniversalButton } from './UniversalButton';
import { UniversalInput } from './UniversalInput';

export function NewsletterSignup() {
    return (
        <div style={{
            padding: '2rem',
            backgroundColor: 'var(--card-bg)',
            border: 'var(--border-width) solid var(--border)',
            borderRadius: 'var(--radius)',
            margin: '2rem 0'
        }}>
            <h3 style={{ marginTop: 0 }}>Subscribe to our Newsletter</h3>
            <p style={{ opacity: 0.8, marginBottom: '1.5rem' }}>Get the latest updates directly in your inbox.</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <UniversalInput placeholder="Enter your email" style={{ margin: 0 }} />
                </div>
                <UniversalButton label="Subscribe" />
            </div>
        </div>
    );
}
