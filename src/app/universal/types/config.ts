export type Product = {
    id: number;
    name: string;
    price: string;
    image: string;
};

export type StyleConfig = {
    colors: {
        primary: string;
        onPrimary: string;
        secondary: string;
        onSecondary: string;
        background: string;
        text: string;
        border: string;
        cardBg: string;
    };
    typography: {
        fontFamily: string;
        headingsFamily?: string;
    };
    shape: {
        borderRadius: string;
        borderWidth: string;
    };
    effects?: {
        shadow: string;
    };
};

export type Config = {
    id?: string;
    theme?: string;
    title: string;
    subtitle?: string;
    style?: StyleConfig;
    products?: Product[];
    categories?: string[];
    tags?: string[];
    categoryLayout?: 'default' | 'tabs' | 'pills' | 'minimal' | 'bar';
    gridLayout?: 'grid' | 'list' | 'masonry' | 'slider';
    filterLayout?: 'sidebar-left' | 'sidebar-right' | 'top-bar' | 'modal' | 'dropdowns';
    layoutOptions?: {
        headerVisible?: boolean;
        footerVisible?: boolean;
        heroVisible?: boolean;
        animations?: boolean;
    };
    cardStyle?: 'standard' | 'blob' | 'minimal' | 'bordered';
    features: {
        hero: boolean;
    };
    apiConfig?: {
        endpoint: string;
        params: Record<string, string | number>;
    };
    header: {
        links: { label: string; href: string }[];
        cartIcon: boolean;
    };
    footer: {
        text: string;
        links: { label: string; href: string }[];
    };
};

export interface ThemeConfig {
    slug: string;
    config: Config;
}
