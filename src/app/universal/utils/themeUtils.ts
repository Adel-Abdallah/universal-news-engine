import { Config } from '../types/config';

export function getThemeVariables(config: Config): Record<string, string> {
    if (!config.style) return {};

    const variables: Record<string, string> = {
        '--primary': config.style.colors.primary,
        '--on-primary': config.style.colors.onPrimary,
        '--secondary': config.style.colors.secondary,
        '--on-secondary': config.style.colors.onSecondary,
        '--bg': config.style.colors.background,
        '--text': config.style.colors.text,
        '--border': config.style.colors.border,
        '--card-bg': config.style.colors.cardBg,
        '--radius': config.style.shape.borderRadius,
        '--border-width': config.style.shape.borderWidth,
        '--font-main': config.style.typography.fontFamily,
        '--font-heading': config.style.typography.headingsFamily || config.style.typography.fontFamily,
    };

    if (config.style.effects?.shadow) {
        variables['--shadow-md'] = config.style.effects.shadow;
    }

    return variables;
}
