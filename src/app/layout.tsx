import React from 'react';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Universal News Engine',
    description: 'Config-driven universal news site',
};

import { ProgressBar } from './universal/components/ProgressBar';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ProgressBar />
                {children}
            </body>
        </html>
    );
}
