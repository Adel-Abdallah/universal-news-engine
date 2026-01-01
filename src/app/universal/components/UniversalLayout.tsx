'use client';

import React from 'react';
import { Config } from '../types/config';
import { UniversalHeader } from './UniversalHeader';
import { UniversalFooter } from './UniversalFooter';
import { ThemeSwitcher } from './ThemeSwitcher';
import { FavoriteButton } from './FavoriteButton';

interface UniversalLayoutProps {
    config: Config;
    children: React.ReactNode;
}

export function UniversalLayout({ config, children }: UniversalLayoutProps) {
    const { layoutOptions, features, filterLayout } = config;

    // Determine layout structure
    const isSidebarLeft = filterLayout === 'sidebar-left';
    const isSidebarRight = filterLayout === 'sidebar-right';

    // Sidebar content (mockup or configurable)
    const Sidebar = () => {
        // Simple slugify - in real app import from utils
        const toSlug = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

        return (
            <aside style={{
                width: '250px',
                padding: '2rem',
                borderRight: isSidebarLeft ? '1px solid var(--border)' : 'none',
                borderLeft: isSidebarRight ? '1px solid var(--border)' : 'none',
                flexShrink: 0,
                display: 'none', // Hidden on mobile by default in this simple example
            }} className="desktop-sidebar">
                <h3 style={{ marginTop: 0 }}>Categories</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {config.categories?.map(cat => (
                        <li key={cat} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <a
                                href={`/${toSlug(cat)}?theme=${config.id}`}
                                style={{ opacity: 0.8, transition: 'color 0.2s', textDecoration: 'none', color: 'var(--text)' }}
                                className="hover:text-primary"
                            >
                                {cat}
                            </a>
                            <FavoriteButton
                                id={toSlug(cat)}
                                title={cat}
                                type="category"
                                url={`/${toSlug(cat)}?theme=${config.id}`}
                                compact={true}
                            />
                        </li>
                    )) || <p>No categories</p>}
                </ul>

                <h3 style={{ marginTop: '2rem' }}>Tags</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {['Trending', 'New', 'Featured', 'Deep Dive'].map(tag => (
                        <div key={tag} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{
                                padding: '0.25rem 0.5rem',
                                backgroundColor: 'var(--card-bg)',
                                borderRadius: '4px',
                                fontSize: '0.8rem',
                                border: '1px solid var(--border)',
                                opacity: 0.8
                            }}>
                                {tag}
                            </span>
                            <FavoriteButton
                                id={toSlug(tag)}
                                title={tag}
                                type="tag"
                                url={`#${toSlug(tag)}`}
                                compact={true}
                            />
                        </div>
                    ))}
                </div>

                <style jsx>{`
                    @media (min-width: 768px) {
                        .desktop-sidebar { display: block !important; }
                    }
                `}</style>
            </aside>
        );
    };

    return (
        <div className="layout-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {layoutOptions?.headerVisible !== false && (
                <UniversalHeader config={config} />
            )}

            {/* Main Content Area with potential sidebar */}
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                {isSidebarLeft && <Sidebar />}

                <main style={{ flex: 1, padding: '2rem', overflow: 'hidden' }}>
                    {features.hero && layoutOptions?.heroVisible !== false && (
                        <section className="hero" style={{
                            marginBottom: '3rem',
                            textAlign: 'center',
                            padding: '4rem 0',
                            borderBottom: '1px solid var(--border)'
                        }}>
                            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{config.title}</h1>
                            {config.subtitle && <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>{config.subtitle}</p>}
                        </section>
                    )}
                    {children}
                </main>

                {isSidebarRight && <Sidebar />}
            </div>

            {layoutOptions?.footerVisible !== false && (
                <UniversalFooter config={config} />
            )}

            {/* Global Theme Switcher */}
            <div className="hidden-print">
                <ThemeSwitcher
                    themes={['luxury', 'tech', 'minimalist', 'crazy', 'organic']}
                    currentTheme={config.id || 'luxury'}
                />
            </div>
        </div>
    );
}
