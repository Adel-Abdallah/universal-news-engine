'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface ThemeSwitcherProps {
    themes: string[];
    currentTheme: string;
}

export function ThemeSwitcher({ themes, currentTheme }: ThemeSwitcherProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Use current pathname to preserve the current page
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';

    React.useEffect(() => {
        if (typeof window === 'undefined') return;

        const themeParam = searchParams?.get('theme');
        const savedTheme = localStorage.getItem('universal_theme');

        // 1. If URL has theme, save it as preference
        if (themeParam) {
            if (themeParam !== savedTheme) {
                localStorage.setItem('universal_theme', themeParam);
            }
        }
        // 2. If URL has NO theme, but we have a saved one, apply it
        else if (savedTheme) {
            const params = new URLSearchParams(searchParams?.toString());
            params.set('theme', savedTheme);
            router.replace(`${pathname}?${params.toString()}`);
        }
    }, [searchParams, pathname, router]);

    const handleThemeChange = (theme: string) => {
        const params = new URLSearchParams(searchParams?.toString());
        params.set('theme', theme);
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px',
            backgroundColor: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '12px', // Enforce safe radius for UI controls
            boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            maxHeight: '300px',
            overflowY: 'auto'
        }}>
            <small style={{ fontWeight: 'bold', marginBottom: '4px' }}>Theme Switcher</small>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {themes.map(t => (
                    <button
                        key={t}
                        onClick={() => handleThemeChange(t)}
                        style={{
                            padding: '6px 12px',
                            cursor: 'pointer',
                            backgroundColor: currentTheme === t ? 'var(--primary)' : 'transparent',
                            color: currentTheme === t ? 'var(--on-primary)' : 'var(--text)',
                            border: '1px solid var(--border)',
                            borderRadius: '4px',
                            fontSize: '12px'
                        }}
                    >
                        {t}
                    </button>
                ))}
            </div>
        </div>
    );
}
