import { loadConfigBySlug } from '../universal/utils/serverThemeLoader';
import { ThemeWrapper } from '../universal/components/ThemeWrapper';
import { UniversalLayout } from '../universal/components/UniversalLayout';

export const dynamic = 'force-dynamic';

export default async function AboutPage({ searchParams }: { searchParams: Promise<{ theme?: string }> }) {
    const resolvedParams = await searchParams;
    const themeSlug = resolvedParams?.theme || 'luxury';
    const config = await loadConfigBySlug(themeSlug);

    if (!config) return <div>Theme not found</div>;

    return (
        <ThemeWrapper config={config}>
            <UniversalLayout config={config}>
                <article style={{ maxWidth: '800px', margin: '0 auto', lineHeight: 1.8 }}>
                    <h1>About {config.title}</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                        {config.subtitle}
                    </p>
                    <p>
                        We are a leading provider of news and articles in the {config.categories?.[0] || 'industry'}.
                        Our mission is to bring you the best content with a {config.id === 'luxury' ? 'luxurious' : config.id === 'tech' ? 'cutting-edge' : 'simple'} experience.
                    </p>
                    <p>
                        This site is built using our Universal News Engine, allowing us to rapidly deploy
                        beautiful, themed experiences without rewriting code.
                    </p>
                </article>
            </UniversalLayout>
        </ThemeWrapper>
    );
}
