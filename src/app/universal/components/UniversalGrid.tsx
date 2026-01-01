import React from 'react';

interface UniversalGridProps {
    children: React.ReactNode;
    cols?: number;
    gap?: string;
}

export function UniversalGrid({ children, cols = 3, gap = '2rem' }: UniversalGridProps) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr))`,
            gap: gap
        }}>
            {children}
        </div>
    );
}
