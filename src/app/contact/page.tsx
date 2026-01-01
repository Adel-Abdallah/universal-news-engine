import { loadConfigBySlug } from '../universal/utils/serverThemeLoader';
import { ThemeWrapper } from '../universal/components/ThemeWrapper';
import { UniversalLayout } from '../universal/components/UniversalLayout';
import { UniversalInput } from '../universal/components/UniversalInput';
import { UniversalButton } from '../universal/components/UniversalButton';

export const dynamic = 'force-dynamic';

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ theme?: string }> }) {
    const resolvedParams = await searchParams;
    const themeSlug = resolvedParams?.theme || 'luxury';
    const config = await loadConfigBySlug(themeSlug);

    if (!config) return <div>Theme not found</div>;

    return (
        <ThemeWrapper config={config}>
            <UniversalLayout config={config}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h1>Contact Us</h1>
                    <p style={{ marginBottom: '2rem' }}>We'd love to hear from you. Send us a message below.</p>

                    <form style={{
                        padding: '2rem',
                        border: 'var(--border-width) solid var(--border)',
                        borderRadius: 'var(--radius)',
                        backgroundColor: 'var(--card-bg)'
                    }}>
                        <UniversalInput label="Subject" placeholder="General Inquiry" />
                        <UniversalInput label="Email" type="email" placeholder="you@example.com" />

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                            <textarea style={{
                                width: '100%',
                                minHeight: '150px',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius)',
                                border: 'var(--border-width) solid var(--border)',
                                backgroundColor: 'var(--bg)',
                                color: 'var(--text)',
                                fontFamily: 'var(--font-main)'
                            }} />
                        </div>

                        <UniversalButton label="Send Message" style={{ width: '100%' }} />
                    </form>
                </div>
            </UniversalLayout>
        </ThemeWrapper>
    );
}
