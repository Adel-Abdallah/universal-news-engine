
interface Article {
    id: string;
    title: string;
    summary: string;
    category: string;
    image: string;
    date: string;
    author: string;
}

const CATEGORY_TITLES: Record<string, string> = {
    'ai': 'Artificial Intelligence',
    'artificial-intelligence': 'Artificial Intelligence',
    'hardware': 'Hardware',
    'security': 'Security',
    'blockchain': 'Blockchain',
    'quantum-computing': 'Quantum Computing',
    'space-tech': 'Space Tech',
    'tech': 'Technology'
};

export async function getArticles(slug: string): Promise<{ title: string; articles: Article[] }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const categoryTitle = CATEGORY_TITLES[slug.toLowerCase()] || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');

    // Generate deterministic dummy data based on slug
    const articles = Array.from({ length: 9 }).map((_, i) => ({
        id: `${slug}-${i + 1}`,
        title: `The Future of ${categoryTitle}: Report ${i + 1}`,
        summary: `Exploring the latest breakthroughs in ${categoryTitle.toLowerCase()} and what they mean for the future of humanity. Expert analysis and deep dives.`,
        category: categoryTitle,
        image: `https://picsum.photos/seed/${slug}${i}/800/600`, // Consistent seed
        date: new Date(Date.now() - i * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        author: 'Tech Analyst'
    }));

    return {
        title: categoryTitle,
        articles
    };
}
