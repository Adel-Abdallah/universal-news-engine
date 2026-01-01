import { loadConfigBySlug } from '../universal/utils/serverThemeLoader';
import { ThemeWrapper } from '../universal/components/ThemeWrapper';
import { UniversalLayout } from '../universal/components/UniversalLayout';
import { UniversalCard } from '../universal/components/UniversalCard';
import { UniversalGrid } from '../universal/components/UniversalGrid';

export const dynamic = 'force-dynamic';

export default async function LatestPage({ searchParams }: { searchParams: Promise<{ theme?: string }> }) {
    const resolvedParams = await searchParams;
    const themeSlug = resolvedParams?.theme || 'luxury';
    const config = await loadConfigBySlug(themeSlug);

    if (!config) return <div>Theme not found</div>;

    return (
        <ThemeWrapper config={config}>
            <UniversalLayout config={config}>
                <section>
                    <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Latest News</h1>
                        <p style={{ opacity: 0.7 }}>Fresh off the press.</p>
                    </header>
                    <UniversalGrid>
                        {[10, 11, 12, 13, 14, 15].map((i) => (
                            <UniversalCard
                                key={i}
                                title={`New Update ${i}`}
                                summary="Just released into the wild. Be the first to know."
                                category="Latest"
                                date="Just Now"
                                image={`https://picsum.photos/seed/latest${i}/800/600`}
                                styleVariant={config.cardStyle}
                                href={`/article/${i}?theme=${themeSlug}`}
                                actionLabel="Read Story"
                            />
                        ))}
                    </UniversalGrid>
                </section>
            </UniversalLayout>
        </ThemeWrapper>
    );
}
