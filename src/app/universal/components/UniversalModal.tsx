'use client';

import React from 'react';
import { UniversalButton } from './UniversalButton';

interface UniversalModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
}

export function UniversalModal({ isOpen, onClose, title, children, actions }: UniversalModalProps) {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'var(--card-bg)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                width: '100%',
                maxWidth: '500px',
                padding: '2rem',
                margin: '1rem',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                position: 'relative',
                animation: 'slideUp 0.3s ease-out'
            }} onClick={e => e.stopPropagation()}>

                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{title}</h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            color: 'var(--text)',
                            opacity: 0.6,
                            padding: '0.5rem',
                            lineHeight: 1
                        }}
                    >
                        ×
                    </button>
                </header>

                <div style={{ marginBottom: '2rem' }}>
                    {children}
                </div>

                {actions && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        {actions}
                    </div>
                )}
            </div>
            <style jsx>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
