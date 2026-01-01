import { loadConfigBySlug } from '../universal/utils/serverThemeLoader';
import { ThemeWrapper } from '../universal/components/ThemeWrapper';
import { UniversalLayout } from '../universal/components/UniversalLayout';
import { DemoAuthWrapper } from '../universal/components/DemoAuthWrapper';

export const dynamic = 'force-dynamic';

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ theme?: string }> }) {
    const resolvedParams = await searchParams;
    const themeSlug = resolvedParams?.theme || 'luxury';
    const config = await loadConfigBySlug(themeSlug);

    if (!config) return <div>Theme not found</div>;

    const signupConfig = { ...config, features: { ...config.features, hero: false } };

    return (
        <ThemeWrapper config={signupConfig}>
            <UniversalLayout config={signupConfig}>
                <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Sign Up</h2>
                    <DemoAuthWrapper type="signup" />
                </div>
            </UniversalLayout>
        </ThemeWrapper>
    );
}
