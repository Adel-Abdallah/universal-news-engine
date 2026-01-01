'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function ProgressBar() {
    const pathname = usePathname();
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Start progress on path change
        setVisible(true);
        setProgress(30);

        const timer1 = setTimeout(() => setProgress(60), 100);
        const timer2 = setTimeout(() => setProgress(80), 300);
        const timer3 = setTimeout(() => {
            setProgress(100);
            setTimeout(() => setVisible(false), 200);
        }, 500); // Simulate completion quickly since Next.js is fast

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [pathname]);

    if (!visible) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${progress}%`,
            height: '3px',
            backgroundColor: 'var(--primary, #0070f3)',
            zIndex: 10000,
            transition: 'width 0.2s ease, opacity 0.2s ease'
        }} />
    );
}
