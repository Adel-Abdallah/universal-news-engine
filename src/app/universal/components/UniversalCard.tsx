'use client';

import React from 'react';
import { UniversalButton } from './UniversalButton';

interface UniversalCardProps {
    title: string;
    summary?: string;
    image?: string;
    category?: string;
    date?: string;
    actionLabel?: string;
    onAction?: () => void;
    href?: string;
    styleVariant?: 'standard' | 'blob' | 'minimal' | 'bordered';
}

export function UniversalCard({
    title,
    summary,
    image,
    category,
    date,
    actionLabel = "Read More",
    onAction,
    href,
    styleVariant = 'standard'
}: UniversalCardProps) {

    const baseStyle: React.CSSProperties = {
        backgroundColor: 'var(--card-bg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'transform 0.2s',
    };

    let variantStyle: React.CSSProperties = {};
    let contentStyle: React.CSSProperties = { padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' };

    switch (styleVariant) {
        case 'bordered':
            variantStyle = {
                border: 'var(--border-width) solid var(--border)',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-md, none)',
            };
            break;
        case 'minimal':
            variantStyle = {
                border: 'none',
                boxShadow: 'none',
                backgroundColor: 'transparent', // Minimal might not have a card bg
            };
            contentStyle = { padding: '1.5rem 0', flex: 1, display: 'flex', flexDirection: 'column' };
            break;
        case 'blob':
            variantStyle = {
                borderRadius: 'var(--radius)', // Use theme config for shape
                border: 'none',
                boxShadow: 'var(--shadow-md, 0 10px 20px rgba(0,0,0,0.1))',
            };
            break;
        case 'standard':
        default:
            variantStyle = {
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-md, 0 4px 6px rgba(0,0,0,0.1))',
            };
            break;
    }

    return (
        <article className={`universal-card card-${styleVariant}`} style={{ ...baseStyle, ...variantStyle }}>
            {image && (
                <div style={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#333', overflow: 'hidden' }}>
                    <img
                        src={image}
                        alt={title}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s'
                        }}
                    />
                </div>
            )}

            <div style={contentStyle}>
                <div style={{ marginBottom: 'auto' }}>
                    {category && (
                        <span style={{
                            color: 'var(--primary)',
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            fontWeight: 'bold',
                            display: 'block',
                            marginBottom: '0.5rem'
                        }}>
                            {category}
                        </span>
                    )}

                    <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', lineHeight: 1.3 }}>{title}</h3>

                    {summary && (
                        <p style={{ margin: '0 0 1.5rem 0', opacity: 0.8, lineHeight: 1.6 }}>
                            {summary}
                        </p>
                    )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <UniversalButton
                        label={actionLabel}
                        onClick={onAction}
                        variant="outline"
                        {...(href ? { href } : {})}
                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                    />
                    {date && <span style={{ fontSize: '0.85rem', opacity: 0.5 }}>{date}</span>}
                </div>
            </div>
        </article>
    );
}
