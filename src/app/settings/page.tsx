import { loadConfigBySlug } from '../universal/utils/serverThemeLoader';
import { ThemeWrapper } from '../universal/components/ThemeWrapper';
import { UniversalLayout } from '../universal/components/UniversalLayout';
import { UniversalButton } from '../universal/components/UniversalButton';
import { UniversalInput } from '../universal/components/UniversalInput';
import { DashboardClient } from './components/DashboardClient';

export const dynamic = 'force-dynamic';

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ theme?: string }> }) {
    const resolvedParams = await searchParams;
    const themeSlug = resolvedParams?.theme || 'luxury';
    const config = await loadConfigBySlug(themeSlug);

    if (!config) return <div>Theme not found</div>;

    return (
        <ThemeWrapper config={config}>
            <UniversalLayout config={config}>
                <DashboardClient currentTheme={themeSlug} />
            </UniversalLayout>
        </ThemeWrapper>
    );
}
