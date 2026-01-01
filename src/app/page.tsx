import { loadConfigBySlug } from './universal/utils/serverThemeLoader';
import { ThemeWrapper } from './universal/components/ThemeWrapper';
import { UniversalLayout } from './universal/components/UniversalLayout';
import { UniversalCard } from './universal/components/UniversalCard';
import { UniversalGrid } from './universal/components/UniversalGrid';
import { DemoAuthWrapper } from './universal/components/DemoAuthWrapper';
import { UniversalAdSlot } from './universal/components/UniversalAdSlot';
import { NewsletterSignup } from './universal/components/NewsletterSignup';

import Link from 'next/link';

import fs from 'fs';
import path from 'path';

// Force dynamic behavior
export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }: { searchParams: Promise<{ theme?: string }> }) {
    const resolvedParams = await searchParams;
    const themeSlug = resolvedParams?.theme || 'luxury';

    // Load config
    const config = await loadConfigBySlug(themeSlug);

    // Get all available themes for the switcher
    const configsDir = path.join(process.cwd(), 'src/app/universal/configs');
    let themes: string[] = [];
    try {
        const files = await fs.promises.readdir(configsDir);
        themes = files.filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
    } catch (e) {
        // ignore
    }

    if (!config) {
        return (
            <div style={{ padding: 20 }}>
                <h1>Theme "{themeSlug}" not found.</h1>
                <p>Available themes: {themes.join(', ')}</p>
            </div>
        );
    }

    return (
        <ThemeWrapper config={config}>
            <UniversalLayout config={config}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

                    <section>
                        <h2 style={{ marginBottom: '2rem' }}>Latest Stories</h2>
                        <UniversalGrid>
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <UniversalCard
                                    key={i}
                                    title={`The Future of ${config.title} ${i}`}
                                    summary="Experience the pinnacle of design and technology with our latest update. Config-driven interfaces are the future."
                                    category={config.categories?.[0] || 'News'}
                                    date="Oct 24, 2024"
                                    image={`https://picsum.photos/seed/${themeSlug}${i}/800/600`}
                                    styleVariant={config.cardStyle}
                                    href={`/article/${i}?theme=${themeSlug}`}
                                    actionLabel="Read Story"
                                />
                            ))}
                        </UniversalGrid>
                    </section>

                    <UniversalAdSlot type="banner" label="Sponsored" />

                    <section style={{
                        padding: '4rem 2rem',
                        backgroundColor: 'var(--card-bg)',
                        borderRadius: 'var(--radius)',
                        border: '1px solid var(--border)',
                        textAlign: 'center',
                        marginTop: 'auto'
                    }}>
                        <h2 style={{ marginBottom: '1rem' }}>Join Our Community</h2>
                        <p style={{ maxWidth: '600px', margin: '0 auto 2rem auto', opacity: 0.8 }}>
                            Get exclusive access to premium content, customize your reading experience, and save your favorite stories.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <a href="/signup" style={{
                                padding: '0.75rem 2rem',
                                backgroundColor: 'var(--primary)',
                                color: 'var(--on-primary)',
                                borderRadius: 'var(--radius)',
                                fontWeight: 'bold'
                            }}>
                                Get Started
                            </a>
                            <a href="/login" style={{
                                padding: '0.75rem 2rem',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius)'
                            }}>
                                Log In
                            </a>
                        </div>
                    </section>

                    <NewsletterSignup />
                </div>

            </UniversalLayout>
        </ThemeWrapper>
    );
}
