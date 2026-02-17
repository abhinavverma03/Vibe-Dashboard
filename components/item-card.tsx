'use client';

import { Star, Users } from 'lucide-react';

interface ItemCardProps {
  item: {
    id: number;
    title: string;
    category: string;
    description: string;
    icon: string;
    rating: number;
    users: number;
  };
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="group h-full">
      <div className="glass-card-dark h-full p-6 flex flex-col hover:shadow-2xl hover:shadow-blue-500/20">
        {/* Icon and Category */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{item.icon}</div>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 rounded-full border border-blue-400/30">
            {item.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-6 flex-grow line-clamp-3">
          {item.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(item.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-500'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-yellow-400">{item.rating.toFixed(1)}</span>
          </div>

          {/* Users */}
          <div className="flex items-center gap-1.5 text-gray-300">
            <Users className="w-3.5 h-3.5" />
            <span className="text-sm font-medium">{(item.users / 1000).toFixed(1)}K</span>
          </div>
        </div>
      </div>
    </div>
  );
}
