import React from 'react';

interface UniversalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    label: string;
}

export function UniversalButton({ variant = 'primary', label, style, ...props }: UniversalButtonProps) {

    const baseStyle: React.CSSProperties = {
        padding: '0.75rem 1.5rem',
        borderRadius: 'var(--radius)',
        fontFamily: 'var(--font-main)',
        fontSize: '1rem',
        cursor: 'pointer',
        border: 'var(--border-width) solid transparent',
        transition: 'opacity 0.2s',
        ...style
    };

    let variantStyle: React.CSSProperties = {};

    switch (variant) {
        case 'primary':
            variantStyle = {
                backgroundColor: 'var(--primary)',
                color: 'var(--on-primary)',
            };
            break;
        case 'secondary':
            variantStyle = {
                backgroundColor: 'var(--secondary)',
                color: 'var(--on-secondary)',
            };
            break;
        case 'outline':
            variantStyle = {
                backgroundColor: 'transparent',
                borderColor: 'var(--primary)',
                color: 'var(--primary)',
            };
            break;
    }

    if ((props as any).href) {
        return (
            <a href={(props as any).href} style={{ ...baseStyle, ...variantStyle, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }} className="button-hover-effect">
                {label}
            </a>
        );
    }

    return (
        <button
            style={{ ...baseStyle, ...variantStyle }}
            {...props}
            className="button-hover-effect"
        >
            {label}
        </button>
    );

}
