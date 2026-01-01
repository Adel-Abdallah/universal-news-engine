import { loadConfigBySlug } from '../universal/utils/serverThemeLoader';
import { ThemeWrapper } from '../universal/components/ThemeWrapper';
import { UniversalLayout } from '../universal/components/UniversalLayout';
import { UniversalInput } from '../universal/components/UniversalInput';
import { UniversalButton } from '../universal/components/UniversalButton';

export const dynamic = 'force-dynamic';

export default async function Verify2FAPage({ searchParams }: { searchParams: Promise<{ theme?: string }> }) {
    const resolvedParams = await searchParams;
    const themeSlug = resolvedParams?.theme || 'luxury';
    const config = await loadConfigBySlug(themeSlug);

    if (!config) return <div>Theme not found</div>;

    const pageConfig = { ...config, features: { ...config.features, hero: false } };

    return (
        <ThemeWrapper config={pageConfig}>
            <UniversalLayout config={pageConfig}>
                <div style={{ maxWidth: '400px', margin: '4rem auto', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Two-Factor Authentication</h2>
                    <p style={{ marginBottom: '2rem', opacity: 0.8 }}>Please enter the 6-digit code sent to your device.</p>

                    <form style={{ textAlign: 'left' }}>
                        <UniversalInput label="Verification Code" placeholder="000000" style={{ letterSpacing: '0.5em', textAlign: 'center', fontSize: '1.2rem' }} />
                        <UniversalButton label="Verify" style={{ width: '100%', marginTop: '1rem' }} />
                    </form>

                    <div style={{ marginTop: '1.5rem' }}>
                        <a href="#" style={{ fontSize: '0.9rem', opacity: 0.6 }}>Resend Code</a>
                    </div>
                </div>
            </UniversalLayout>
        </ThemeWrapper>
    );
}
