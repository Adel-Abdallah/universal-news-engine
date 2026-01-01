import React from 'react';
import { Config } from '../types/config';

interface UniversalHeaderProps {
    config: Config;
}

export function UniversalHeader({ config }: UniversalHeaderProps) {
    const { header } = config;
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    React.useEffect(() => {
        // Check initial state
        const checkAuth = () => {
            const token = localStorage.getItem('demo_auth_token');
            setIsLoggedIn(!!token);
        };

        checkAuth();

        // Listen for our custom event from DemoAuthWrapper
        window.addEventListener('auth-change', checkAuth);
        return () => window.removeEventListener('auth-change', checkAuth);
    }, []);

    // Simple demo toggle helper
    const handleLoginToggle = () => {
        if (isLoggedIn) {
            localStorage.removeItem('demo_auth_token');
        } else {
            localStorage.setItem('demo_auth_token', 'mock_token_123');
        }
        setIsLoggedIn(!isLoggedIn);
        // Dispatch event for other listeners if any (though currently we are just toggling local state mostly)
        window.dispatchEvent(new Event('auth-change'));
    };

    return (
        <header style={{
            padding: '1rem 2rem',
            borderBottom: 'var(--border-width) solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--bg)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                <a href="/">{config.title}</a>
            </div>
            <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                {header.links.map(link => (
                    <a key={link.href} href={link.href} style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                        {link.label}
                    </a>
                ))}
                {/* Fixed Auth Links for now, could be configurable */}
                <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {isLoggedIn ? (
                        <>
                            <a href="/settings" style={{ fontSize: '0.9rem', fontWeight: 500 }}>Dashboard</a>
                            <button
                                onClick={handleLoginToggle}
                                style={{
                                    fontSize: '0.9rem',
                                    padding: '0.5rem 1.5rem',
                                    border: '1px solid var(--border)',
                                    backgroundColor: 'transparent',
                                    color: 'var(--text)',
                                    borderRadius: 'var(--radius)',
                                    fontWeight: 500,
                                    cursor: 'pointer'
                                }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="/login" style={{
                                fontSize: '0.9rem',
                                padding: '0.5rem 1.5rem',
                                border: '1px solid var(--primary)',
                                color: 'var(--primary)',
                                borderRadius: 'var(--radius)',
                                fontWeight: 500
                            }}>Login</a>
                            <a href="/signup" style={{
                                fontSize: '0.9rem',
                                padding: '0.5rem 1.5rem',
                                backgroundColor: 'var(--primary)',
                                color: 'var(--on-primary)',
                                borderRadius: 'var(--radius)',
                                fontWeight: 500
                            }}>Sign Up</a>

                            {/* Hidden dev toggle for easier demo-ing */}
                            <button
                                onClick={handleLoginToggle}
                                style={{ opacity: 0.2, fontSize: '0.7rem', border: 'none', background: 'none', cursor: 'pointer' }}
                                title="Toggle Demo Auth State"
                            >
                                (Dev Only: Toggle Auth)
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
