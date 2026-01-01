import { loadConfigBySlug } from '../universal/utils/serverThemeLoader';
import { ThemeWrapper } from '../universal/components/ThemeWrapper';
import { UniversalLayout } from '../universal/components/UniversalLayout';
import { UniversalInput } from '../universal/components/UniversalInput';
import { UniversalButton } from '../universal/components/UniversalButton';

export const dynamic = 'force-dynamic';

export default async function ForgotPasswordPage({ searchParams }: { searchParams: Promise<{ theme?: string }> }) {
    const resolvedParams = await searchParams;
    const themeSlug = resolvedParams?.theme || 'luxury';
    const config = await loadConfigBySlug(themeSlug);

    if (!config) return <div>Theme not found</div>;

    const pageConfig = { ...config, features: { ...config.features, hero: false } };

    return (
        <ThemeWrapper config={pageConfig}>
            <UniversalLayout config={pageConfig}>
                <div style={{ maxWidth: '400px', margin: '4rem auto', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Forgot Password?</h2>
                    <p style={{ marginBottom: '2rem', opacity: 0.8 }}>Enter your email address and we'll send you a link to reset your password.</p>

                    <form style={{ textAlign: 'left' }}>
                        <UniversalInput label="Email Address" type="email" placeholder="you@example.com" />
                        <UniversalButton label="Send Reset Link" style={{ width: '100%', marginTop: '1rem' }} />
                    </form>

                    <div style={{ marginTop: '1.5rem' }}>
                        <a href="/login" style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>Back to Login</a>
                    </div>
                </div>
            </UniversalLayout>
        </ThemeWrapper>
    );
}
