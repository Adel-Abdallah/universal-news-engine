'use client';

import React, { useState, useEffect } from 'react';

interface FavoriteButtonProps {
    id: string;
    title: string;
    type: 'article' | 'category' | 'tag';
    url?: string;
    metadata?: string; // Date for articles, count for tags etc
    compact?: boolean; // For sidebar
}

interface FavoriteItem {
    id: string;
    title: string;
    type: 'article' | 'category' | 'tag';
    url?: string;
    metadata?: string;
    timestamp: number;
}

export function FavoriteButton({ id, title, type, url, metadata, compact = false }: FavoriteButtonProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('universal_favorites') || '[]');
        setIsFavorite(favorites.some((item: FavoriteItem) => item.id === id && item.type === type));
    }, [id, type]);

    const toggleFavorite = (e?: React.MouseEvent) => {
        e?.preventDefault(); // Prevent link clicking if inside a link
        e?.stopPropagation();

        const favorites: FavoriteItem[] = JSON.parse(localStorage.getItem('universal_favorites') || '[]');

        if (isFavorite) {
            const newFavorites = favorites.filter(item => !(item.id === id && item.type === type));
            localStorage.setItem('universal_favorites', JSON.stringify(newFavorites));
            setIsFavorite(false);
        } else {
            favorites.push({
                id,
                title,
                type,
                url,
                metadata,
                timestamp: Date.now()
            });
            localStorage.setItem('universal_favorites', JSON.stringify(favorites));
            setIsFavorite(true);
        }

        window.dispatchEvent(new Event('favorites-change'));
    };

    if (compact) {
        return (
            <button
                onClick={toggleFavorite}
                title={isFavorite ? "Unfollow" : "Follow"}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0 0.5rem',
                    color: isFavorite ? 'var(--primary)' : 'var(--text)',
                    opacity: isFavorite ? 1 : 0.3,
                    fontSize: '1.2rem',
                    lineHeight: 1,
                    transition: 'all 0.2s'
                }}
            >
                {isFavorite ? '★' : '☆'}
            </button>
        );
    }

    return (
        <button
            onClick={toggleFavorite}
            style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: isFavorite ? 'var(--primary)' : 'transparent',
                color: isFavorite ? 'var(--on-primary)' : 'var(--text)',
                border: '1px solid ' + (isFavorite ? 'var(--primary)' : 'var(--border)'),
                borderRadius: 'var(--radius)',
                cursor: 'pointer',
                fontWeight: 500,
                minWidth: '180px',
                transition: 'all 0.2s'
            }}
        >
            {isFavorite ? (type === 'article' ? "Saved" : "Following") : (type === 'article' ? "Add to Favorites" : "Follow")}
        </button>
    );
}
