import { loadConfigBySlug } from '../universal/utils/serverThemeLoader';
import { ThemeWrapper } from '../universal/components/ThemeWrapper';
import { UniversalLayout } from '../universal/components/UniversalLayout';
import { DemoAuthWrapper } from '../universal/components/DemoAuthWrapper';

export const dynamic = 'force-dynamic';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ theme?: string }> }) {
    const resolvedParams = await searchParams;
    const themeSlug = resolvedParams?.theme || 'luxury';
    const config = await loadConfigBySlug(themeSlug);

    if (!config) return <div>Theme not found</div>;

    // Use a modified config for cleaner login page (optional)
    const loginConfig = { ...config, features: { ...config.features, hero: false } };

    return (
        <ThemeWrapper config={loginConfig}>
            <UniversalLayout config={loginConfig}>
                <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Login</h2>
                    <DemoAuthWrapper type="login" />
                </div>
            </UniversalLayout>
        </ThemeWrapper>
    );
}
