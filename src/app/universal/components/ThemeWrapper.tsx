'use client';

import React from 'react';
import { Config } from '../types/config';
import { getThemeVariables } from '../utils/themeUtils';
import crazyStyles from '../styles/crazy.module.css';
import organicStyles from '../styles/organic.module.css';

interface ThemeWrapperProps {
    config: Config;
    children: React.ReactNode;
    className?: string; // Allow passing standard class names
}

export function ThemeWrapper({ config, children, className = '' }: ThemeWrapperProps) {
    const variables = getThemeVariables(config);

    // Convert variables record to React CSSProperties
    const style = variables as React.CSSProperties;

    let themeClass = '';
    if (config.id === 'crazy') {
        themeClass = crazyStyles.pageWrapper;
    } else if (config.id === 'organic') {
        themeClass = organicStyles.pageWrapper;
    }

    return (
        <div
            style={style}
            className={`universal-theme-root ${className} ${themeClass}`}
            // We can also attach data attributes for specific styling hooks if needed
            data-theme={config.id}
            data-card-style={config.cardStyle}
        >
            {children}
        </div>
    );
}
