import { loadConfigBySlug } from '../universal/utils/serverThemeLoader';
import { ThemeWrapper } from '../universal/components/ThemeWrapper';
import { UniversalLayout } from '../universal/components/UniversalLayout';
import { UniversalCard } from '../universal/components/UniversalCard';
import { UniversalGrid } from '../universal/components/UniversalGrid';

export const dynamic = 'force-dynamic';

export default async function TrendingPage({ searchParams }: { searchParams: Promise<{ theme?: string }> }) {
    const resolvedParams = await searchParams;
    const themeSlug = resolvedParams?.theme || 'luxury';
    const config = await loadConfigBySlug(themeSlug);

    if (!config) return <div>Theme not found</div>;

    return (
        <ThemeWrapper config={config}>
            <UniversalLayout config={config}>
                <section>
                    <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Trending Now</h1>
                        <p style={{ opacity: 0.7 }}>The most frequently read stories this week.</p>
                    </header>
                    <UniversalGrid>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <UniversalCard
                                key={i}
                                title={`Trending Story ${i}`}
                                summary="This story is catching everyone's attention right now."
                                category="Trending"
                                date="Today"
                                image={`https://picsum.photos/seed/trend${i}/800/600`}
                                styleVariant={config.cardStyle}
                                href={`/article/${i}?theme=${themeSlug}`}
                                actionLabel="Read Now"
                            />
                        ))}
                    </UniversalGrid>
                </section>
            </UniversalLayout>
        </ThemeWrapper>
    );
}
