'use client';

import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');

  // Debounced search handler
  const handleChange = useCallback(
    (value: string) => {
      setInputValue(value);
      onSearch(value);
    },
    [onSearch]
  );

  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="glass-dark px-6 py-4 flex items-center gap-3 group hover:border-blue-400/50 transition-colors">
          <Search className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
          <input
            type="text"
            placeholder="Search items, categories, or descriptions..."
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
          />
          {inputValue && (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-gray-300" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
