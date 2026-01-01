'use client';

import React, { useState } from 'react';
import { UniversalButton } from '../../universal/components/UniversalButton';
import { UniversalInput } from '../../universal/components/UniversalInput';
import { UniversalModal } from '../../universal/components/UniversalModal';
import { useRouter, useSearchParams } from 'next/navigation';

interface DashboardClientProps {
    currentTheme: string;
}

export function DashboardClient({ currentTheme }: DashboardClientProps) {
    const [activeTab, setActiveTab] = useState('customization'); // Defaulting to custom for demo
    const [favorites, setFavorites] = useState<any[]>([]);

    // Modal states
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    React.useEffect(() => {
        const loadFavorites = () => {
            const stored = localStorage.getItem('universal_favorites');
            if (stored) {
                setFavorites(JSON.parse(stored));
            } else {
                setFavorites([]);
            }
        };

        loadFavorites();
        window.addEventListener('favorites-change', loadFavorites);
        return () => window.removeEventListener('favorites-change', loadFavorites);
    }, []);

    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'customization', label: 'Customization' },
        { id: 'favorites', label: 'Favorites' },
        { id: 'account', label: 'Account' }
    ];

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTheme = e.target.value;
        const params = new URLSearchParams(searchParams.toString());
        params.set('theme', newTheme);
        router.push(`/settings?${params.toString()}`);
    };

    const handleDeleteAccount = () => {
        // Simulate deletion
        localStorage.removeItem('demo_auth_token');
        localStorage.removeItem('universal_favorites');
        window.dispatchEvent(new Event('auth-change'));
        router.push('/');
    };

    // Filter favorites by type
    const savedArticles = favorites.filter(f => !f.type || f.type === 'article');
    const followedTopics = favorites.filter(f => f.type === 'category' || f.type === 'tag');

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '2rem', minHeight: '60vh' }}>

            {/* Sidebar */}
            <aside style={{ width: '250px', flexShrink: 0, borderRight: '1px solid var(--border)', paddingRight: '1rem' }}>
                <h2 style={{ marginBottom: '1.5rem', paddingLeft: '0.5rem' }}>Dashboard</h2>
                <nav>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'block',
                                width: '100%',
                                textAlign: 'left',
                                padding: '0.75rem 1rem',
                                backgroundColor: activeTab === tab.id ? 'var(--card-bg)' : 'transparent',
                                color: activeTab === tab.id ? 'var(--primary)' : 'var(--text)',
                                border: 'none',
                                borderRadius: 'var(--radius)',
                                cursor: 'pointer',
                                marginBottom: '0.25rem',
                                fontWeight: activeTab === tab.id ? 600 : 400,
                                fontSize: '1rem',
                                transition: 'all 0.2s'
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1 }} className="animate-fade-in">

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <>
                        <header style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                            <h1 style={{ margin: 0, fontSize: '2rem' }}>Profile Settings</h1>
                            <p style={{ opacity: 0.6, marginTop: '0.5rem' }}>Update your personal details here.</p>
                        </header>
                        <section>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <UniversalInput label="First Name" placeholder="John" defaultValue="John" />
                                <UniversalInput label="Last Name" placeholder="Doe" defaultValue="Doe" />
                                <UniversalInput label="Email" placeholder="john@example.com" type="email" defaultValue="user@example.com" />
                                <UniversalInput label="Job Title" placeholder="Editor" defaultValue="Reader" />
                            </div>
                            <div style={{ marginTop: '1.5rem' }}>
                                <UniversalButton label="Save Changes" />
                            </div>
                        </section>
                    </>
                )}

                {/* Customization Tab */}
                {activeTab === 'customization' && (
                    <>
                        <header style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                            <h1 style={{ margin: 0, fontSize: '2rem' }}>Site Customization</h1>
                            <p style={{ opacity: 0.6, marginTop: '0.5rem' }}>Choose how you want the site to look and feel.</p>
                        </header>

                        <section style={{ marginBottom: '3rem' }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Appearance</h3>
                            <div style={{ backgroundColor: 'var(--card-bg)', padding: '2rem', borderRadius: 'var(--radius)' }}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Active Theme</label>
                                    <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '0.5rem' }}>
                                        Select a theme to instantly update the look of the entire application.
                                    </p>
                                    <select
                                        value={currentTheme}
                                        onChange={handleThemeChange}
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            borderRadius: 'var(--radius)',
                                            border: '1px solid var(--border)',
                                            backgroundColor: 'var(--bg)',
                                            color: 'var(--text)',
                                            fontSize: '1rem'
                                        }}
                                    >
                                        <option value="luxury">Luxury (Dark/Gold)</option>
                                        <option value="tech">Tech (Dark/Cyan)</option>
                                        <option value="minimalist">Minimalist (White/Black)</option>
                                        <option value="crazy">Crazy Mode (Black/Yellow)</option>
                                        <option value="organic">Organic (Soft/Blob)</option>
                                    </select>
                                </div>
                                <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', opacity: 0.8 }}>
                                    <strong>Note:</strong> In this demo, the theme selection persists in the URL. Bookmarking the page preserves your preference.
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {/* Favorites Tab */}
                {activeTab === 'favorites' && (
                    <>
                        <header style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                            <h1 style={{ margin: 0, fontSize: '2rem' }}>Your Favorites</h1>
                            <p style={{ opacity: 0.6, marginTop: '0.5rem' }}>Articles and topics you have saved.</p>
                        </header>

                        {/* Followed Topics Section */}
                        {followedTopics.length > 0 && (
                            <section style={{ marginBottom: '3rem' }}>
                                <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', opacity: 0.8 }}>Followed Topics</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                    {followedTopics.map(topic => (
                                        <div key={topic.id + topic.type} style={{
                                            padding: '0.75rem 1.25rem',
                                            backgroundColor: 'var(--card-bg)',
                                            border: '1px solid var(--border)',
                                            borderRadius: '50px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}>
                                            <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>{topic.type === 'tag' ? '#' : ''}</span>
                                            <span style={{ fontWeight: 500 }}>{topic.title}</span>
                                            <button
                                                onClick={() => {
                                                    const newFavs = favorites.filter(f => !(f.id === topic.id && f.type === topic.type));
                                                    localStorage.setItem('universal_favorites', JSON.stringify(newFavs));
                                                    window.dispatchEvent(new Event('favorites-change'));
                                                }}
                                                style={{ marginLeft: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', opacity: 0.4 }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Saved Articles Section */}
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {savedArticles.length === 0 && followedTopics.length === 0 && (
                                <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--card-bg)', borderRadius: 'var(--radius)' }}>
                                    <p>You haven't saved any articles or topics yet.</p>
                                    <UniversalButton label="Browse Trending" style={{ marginTop: '1rem' }} onClick={() => router.push('/trending')} />
                                </div>
                            )}

                            {savedArticles.map(fav => (
                                <div key={fav.id} style={{
                                    padding: '1.5rem',
                                    backgroundColor: 'var(--card-bg)',
                                    borderRadius: 'var(--radius)',
                                    border: '1px solid var(--border)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <span style={{
                                            fontSize: '0.8rem',
                                            color: 'var(--primary)',
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold'
                                        }}>
                                            {fav.category || 'Article'}
                                        </span>
                                        <h3 style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}>{fav.title}</h3>
                                        <span style={{ fontSize: '0.9rem', opacity: 0.6 }}>Saved on {new Date(fav.timestamp).toLocaleDateString()}</span>
                                    </div>
                                    <div>
                                        <UniversalButton
                                            label="Read"
                                            variant="outline"
                                            onClick={() => router.push(fav.url || `/article/${fav.id}?theme=${currentTheme}`)}
                                            style={{ marginRight: '1rem' }}
                                        />
                                        <button
                                            onClick={() => {
                                                const newFavs = favorites.filter(f => f.id !== fav.id);
                                                localStorage.setItem('universal_favorites', JSON.stringify(newFavs));
                                                window.dispatchEvent(new Event('favorites-change'));
                                            }}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: 'var(--text)',
                                                opacity: 0.5,
                                                cursor: 'pointer',
                                                textDecoration: 'underline'
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Account Tab */}
                {activeTab === 'account' && (
                    <>
                        <header style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                            <h1 style={{ margin: 0, fontSize: '2rem' }}>Account Settings</h1>
                            <p style={{ opacity: 0.6, marginTop: '0.5rem' }}>Manage your subscription and security.</p>
                        </header>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <UniversalButton
                                label="Change Password"
                                variant="outline"
                                onClick={() => setPasswordModalOpen(true)}
                            />
                        </div>
                        <div>
                            <UniversalButton
                                label="Delete Account"
                                style={{ backgroundColor: '#ef4444', color: 'white', border: 'none' }}
                                onClick={() => setDeleteModalOpen(true)}
                            />
                        </div>
                    </>
                )}

            </main>

            {/* Change Password Modal */}
            <UniversalModal
                isOpen={isPasswordModalOpen}
                onClose={() => setPasswordModalOpen(false)}
                title="Change Password"
                actions={
                    <>
                        <UniversalButton label="Cancel" variant="outline" onClick={() => setPasswordModalOpen(false)} />
                        <UniversalButton label="Update Password" onClick={() => setPasswordModalOpen(false)} />
                    </>
                }
            >
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <UniversalInput label="Current Password" type="password" placeholder="••••••" />
                    <UniversalInput label="New Password" type="password" placeholder="••••••" />
                    <UniversalInput label="Confirm New Password" type="password" placeholder="••••••" />
                </div>
            </UniversalModal>

            {/* Delete Account Modal */}
            <UniversalModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Delete Account"
                actions={
                    <>
                        <UniversalButton label="Cancel" variant="outline" onClick={() => setDeleteModalOpen(false)} />
                        <UniversalButton
                            label="Permanently Delete"
                            style={{ backgroundColor: '#ef4444', color: 'white', border: 'none' }}
                            onClick={handleDeleteAccount}
                        />
                    </>
                }
            >
                <div style={{ color: 'var(--text)' }}>
                    <p style={{ marginBottom: '1rem' }}>
                        Are you absolutely sure you want to delete your account?
                    </p>
                    <div style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid #ef4444',
                        color: '#ef4444',
                        padding: '1rem',
                        borderRadius: 'var(--radius)'
                    }}>
                        <strong>Warning:</strong> This action cannot be undone. All your saved articles, preferences, and personal data will be permanently removed.
                    </div>
                </div>
            </UniversalModal>

        </div>
    );
}
