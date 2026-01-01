'use client';

import React from 'react';

interface UniversalAdSlotProps {
    type?: 'banner' | 'rectangle' | 'sidebar';
    label?: string;
}

export function UniversalAdSlot({ type = 'rectangle', label = 'Advertisement' }: UniversalAdSlotProps) {
    // Dimensions based on type
    const style: React.CSSProperties = {
        width: type === 'banner' ? '100%' : '300px',
        height: type === 'banner' ? '100px' : '250px',
        maxWidth: '100%',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #ddd',
        color: '#999',
        fontSize: '0.8rem',
        margin: '2rem auto',
        position: 'relative',
        overflow: 'hidden'
    };

    return (
        <div className="universal-ad-slot" style={style}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                padding: '0.2rem 0.5rem',
                backgroundColor: '#ddd',
                fontSize: '0.6rem',
                textTransform: 'uppercase'
            }}>
                {label}
            </div>
            <span>Ad Space ({type})</span>
            {/* Insert Google Ads Script Here */}
        </div>
    );
}
