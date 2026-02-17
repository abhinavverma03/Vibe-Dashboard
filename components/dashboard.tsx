'use client';

import { useState, useCallback, useEffect } from 'react';
import SearchBar from './search-bar';
import ItemGrid from './item-grid';
import { Loader2 } from 'lucide-react';

interface Item {
  id: number;
  title: string;
  category: string;
  description: string;
  icon: string;
  rating: number;
  users: number;
}

interface ApiResponse {
  success: boolean;
  data: Item[];
  total: number;
  limit: number;
  offset: number;
}

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const fetchItems = useCallback(
    async (query: string = '') => {
      setLoading(true);
      setError(null);
      try {
        const url = new URL(`${API_URL}/api/items`);
        if (query) {
          url.searchParams.append('search', query);
        }

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }

        const data: ApiResponse = await response.json();
        setItems(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setItems([]);
      } finally {
        setLoading(false);
      }
    },
    [API_URL]
  );

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchItems(query);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-4">
            <div className="glass-dark px-4 py-2 rounded-full">
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                ✨ Explore & Discover
              </span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            <span className="text-balance">Vibe Dashboard</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover amazing items with our modern search experience. Find exactly what you need with our intelligent filtering system.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Error State */}
        {error && (
          <div className="glass-dark border-red-500/50 mb-8 p-4">
            <p className="text-red-200">Error: {error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-400 animate-spin mb-4" />
            <p className="text-gray-300">Loading items...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="glass-dark p-12 text-center">
            <p className="text-gray-300 text-lg">
              {searchQuery
                ? 'No items found matching your search'
                : 'No items available'}
            </p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-300">
                Found <span className="font-semibold text-blue-400">{items.length}</span> items
                {searchQuery && (
                  <span> matching <span className="font-semibold">"{searchQuery}"</span></span>
                )}
              </p>
            </div>

            {/* Items Grid */}
            <ItemGrid items={items} />
          </>
        )}
      </div>
    </main>
  );
}
