
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

import { siteContent } from '../data/siteContent';

// Helper to map JSONPlaceholder post to our Article format
const mapPostToArticle = (post: any, category: string, index: number): Article => ({
    id: post.id.toString(),
    title: post.title,
    summary: post.body.replace(/\n/g, ' '), // Flatten body for summary
    category: category,
    image: `https://picsum.photos/seed/${post.id}/800/600`, // Consistent random image
    date: new Date(Date.now() - index * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    author: `User ${post.userId}`
});

export async function getHeroArticle(categorySlug?: string): Promise<Article> {
    try {
        // Fetch a random post for the hero
        const randomId = Math.floor(Math.random() * 10) + 1;
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${randomId}`);
        const post = await res.json();

        // Determine category
        const categories = siteContent.categories;
        const category = categorySlug
            ? CATEGORY_TITLES[categorySlug.toLowerCase()] || categorySlug
            : categories[Math.floor(Math.random() * categories.length)];

        return mapPostToArticle(post, category, 0);
    } catch (e) {
        console.error("Failed to fetch hero article", e);
        // Fallback
        return {
            id: 'error',
            title: 'Error loading content',
            summary: 'Please try again later.',
            category: 'Error',
            image: '',
            date: '',
            author: ''
        };
    }
}

export async function getLatestArticles(): Promise<Article[]> {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=9');
        const posts = await res.json();

        const categories = siteContent.categories;

        return posts.map((post: any, index: number) => {
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            return mapPostToArticle(post, randomCategory, index);
        });
    } catch (e) {
        console.error("Failed to fetch latest articles", e);
        return [];
    }
}

export async function getArticles(slug: string): Promise<{ title: string; articles: Article[] }> {
    try {
        // We fetch generic posts but assign them the requested category to simulate a real category page
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=12');
        const posts = await res.json();

        const categoryTitle = CATEGORY_TITLES[slug.toLowerCase()] || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');

        const articles = posts.map((post: any, index: number) =>
            mapPostToArticle(post, categoryTitle, index)
        );

        return {
            title: categoryTitle,
            articles
        };
    } catch (e) {
        return { title: slug, articles: [] };
    }
}
