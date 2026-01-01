import { loadConfigBySlug } from '../universal/utils/serverThemeLoader';
import { ThemeWrapper } from '../universal/components/ThemeWrapper';
import { UniversalLayout } from '../universal/components/UniversalLayout';
import { UniversalCard } from '../universal/components/UniversalCard';
import { UniversalGrid } from '../universal/components/UniversalGrid';
import { getArticles } from '../universal/utils/mockApi';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ category: string }>;
    searchParams: Promise<{ theme?: string }>;
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    // Safety check: if the category looks like a file extension or Next.js internal, ignore or 404
    // This catches things like favicon.ico if handled by this route, though specific files usually win.
    if (resolvedParams.category.includes('.')) {
        notFound();
    }

    const themeSlug = resolvedSearchParams?.theme || 'luxury';
    const config = await loadConfigBySlug(themeSlug);

    if (!config) return <div>Theme not found</div>;

    const { title, articles } = await getArticles(resolvedParams.category);

    return (
        <ThemeWrapper config={config}>
            <UniversalLayout config={config}>
                <section>
                    <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                        <span style={{
                            color: 'var(--primary)',
                            textTransform: 'uppercase',
                            fontSize: '0.9rem',
                            letterSpacing: '0.1em',
                            display: 'block',
                            marginBottom: '0.5rem'
                        }}>
                            Topic
                        </span>
                        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{title}</h1>
                        <p style={{ opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>
                            Curated news and insights regarding {title}.
                        </p>
                    </header>

                    <UniversalGrid>
                        {articles.map((article) => (
                            <UniversalCard
                                key={article.id}
                                title={article.title}
                                summary={article.summary}
                                category={article.category}
                                date={article.date}
                                image={article.image}
                                styleVariant={config.cardStyle}
                                href={`/article/${article.id}?theme=${themeSlug}`}
                                actionLabel="Read Article"
                            />
                        ))}
                    </UniversalGrid>
                </section>
            </UniversalLayout>
        </ThemeWrapper>
    );
}
