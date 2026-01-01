import React from 'react';
import { Config } from '../types/config';

interface UniversalFooterProps {
    config: Config;
}

export function UniversalFooter({ config }: UniversalFooterProps) {
    const { footer } = config;

    return (
        <footer style={{
            padding: '2rem',
            borderTop: 'var(--border-width) solid var(--border)',
            textAlign: 'center',
            opacity: 0.7,
            marginTop: 'auto'
        }}>
            <p>{footer.text}</p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <a href="/about">About Us</a>
                <a href="/contact">Contact</a>
            </div>
        </footer>
    );
}
