import fs from 'fs';
import path from 'path';
import { Config, ThemeConfig } from '../types/config';

const CONFIGS_DIR = path.join(process.cwd(), 'src/app/universal/configs');

export async function loadConfigs(): Promise<ThemeConfig[]> {
    try {
        // Ensure directory exists
        if (!fs.existsSync(CONFIGS_DIR)) {
            return [];
        }

        const files = await fs.promises.readdir(CONFIGS_DIR);
        const jsonFiles = files.filter(file => file.endsWith('.json'));

        const configs = await Promise.all(jsonFiles.map(async (file) => {
            const filePath = path.join(CONFIGS_DIR, file);
            const content = await fs.promises.readFile(filePath, 'utf-8');
            const slug = file.replace('.json', '');
            try {
                const config = JSON.parse(content);
                return { slug, config };
            } catch (e) {
                console.error(`Error parsing config for ${file}`, e);
                return null;
            }
        }));

        return configs.filter(Boolean) as ThemeConfig[];
    } catch (error) {
        console.error('Error loading configs:', error);
        return [];
    }
}

export async function loadConfigBySlug(slug: string): Promise<Config | null> {
    try {
        const filePath = path.join(CONFIGS_DIR, `${slug}.json`);
        const content = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(content);
    } catch (e) {
        return null;
    }
}

// Map slug to styles import - in a real dynamic scenario we might need a different strategy 
// but for Next.js explicit imports are safer for bundling.
const stylesMap: Record<string, () => Promise<{ default: Record<string, string> }>> = {
    // We will populate this as we create themes
    luxury: () => import('../styles/luxury.module.css'),
};

export async function loadThemeData(slug: string) {
    const config = await loadConfigBySlug(slug);
    if (!config) return null;

    // If we have a static map, use it. Otherwise we rely on global css variables set by the layout.
    // The user's example had a huge map. checking if we can just skip the explicit map 
    // and rely on the config to generate variables. 
    // The user wants "centralized json file and css file".

    // For now, let's just return the config and we'll handle styles via CSS variables generation
    // instead of necessarily importing a module if standard CSS.
    // However, the user specifically mentioned importing style modules in their example.

    const loadStyles = stylesMap[slug];

    let styles = {};
    if (loadStyles) {
        try {
            const styleModule = await loadStyles();
            styles = styleModule.default || {};
        } catch (e) {
            console.warn(`Style module not found for ${slug}`);
        }
    }

    return {
        config,
        styles,
    };
}

// getThemeVariables has been moved to themeUtils.ts to avoid leaking 'fs' to client components.
