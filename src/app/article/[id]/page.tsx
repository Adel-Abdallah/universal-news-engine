import { loadConfigBySlug } from '../../universal/utils/serverThemeLoader';
import { ThemeWrapper } from '../../universal/components/ThemeWrapper';
import { UniversalLayout } from '../../universal/components/UniversalLayout';
import { UniversalCard } from '../../universal/components/UniversalCard';
import { UniversalGrid } from '../../universal/components/UniversalGrid';
import { UniversalButton } from '../../universal/components/UniversalButton';
import { UniversalAdSlot } from '../../universal/components/UniversalAdSlot';
import { FavoriteButton } from '../../universal/components/FavoriteButton';

export const dynamic = 'force-dynamic';

export default async function ArticlePage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ theme?: string }> }) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const themeSlug = resolvedSearchParams?.theme || 'luxury';
    const config = await loadConfigBySlug(themeSlug);

    if (!config) return <div>Theme not found</div>;

    const articleId = resolvedParams.id;

    return (
        <ThemeWrapper config={config}>
            <UniversalLayout config={config}>
                <article style={{ maxWidth: '800px', margin: '0 auto 4rem auto' }}>
                    <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{
                            color: 'var(--primary)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontWeight: 'bold',
                            fontSize: '0.9rem'
                        }}>
                            {config.categories?.[0] || 'Feature'}
                        </span>
                        <h1 style={{ fontSize: '3rem', margin: '1rem 0' }}>The Future of {config.title} {articleId}</h1>
                        <div style={{ opacity: 0.6 }}>
                            <span>By <strong>Jane Editor</strong></span> • <span>Oct 24, 2024</span>
                        </div>
                    </header>

                    <div style={{
                        width: '100%',
                        height: '400px',
                        backgroundColor: '#333',
                        marginBottom: '3rem',
                        borderRadius: 'var(--radius)',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <img
                            src={`https://picsum.photos/seed/${themeSlug}${articleId}/1200/800`}
                            alt="Article Cover"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    <div style={{ fontSize: '1.2rem', lineHeight: 1.8 }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <UniversalAdSlot type="banner" label="Advertisement" />

                        <h3 style={{ margin: '2rem 0 1rem 0' }}>A New Era of Design</h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>

                        <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
                            <FavoriteButton
                                id={articleId}
                                title={`The Future of ${config.title} ${articleId}`}
                                type="article"
                                url={`/article/${articleId}?theme=${themeSlug}`}
                                metadata="Oct 24, 2024"
                            />
                            <UniversalButton label="Share Article" variant="primary" />
                        </div>
                    </div>
                </article>

                <section style={{ borderTop: '1px solid var(--border)', paddingTop: '3rem' }}>
                    <h2 style={{ marginBottom: '2rem' }}>Related Stories</h2>
                    <UniversalGrid>
                        {[1, 2, 3].map((i) => (
                            <UniversalCard
                                key={i}
                                title={`Related Story ${i}`}
                                summary="More insightful content just for you."
                                category="Related"
                                date="Oct 20, 2024"
                                image={`https://picsum.photos/seed/related${i}/800/600`}
                                styleVariant={config.cardStyle}
                                actionLabel="Read"
                                href={`/article/${100 + i}?theme=${themeSlug}`} // Link to another dummy article
                            />
                        ))}
                    </UniversalGrid>
                </section>
            </UniversalLayout>
        </ThemeWrapper>
    );
}
