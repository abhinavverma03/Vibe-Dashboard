'use client';

import ItemCard from './item-card';

interface Item {
  id: number;
  title: string;
  category: string;
  description: string;
  icon: string;
  rating: number;
  users: number;
}

interface ItemGridProps {
  items: Item[];
}

export default function ItemGrid({ items }: ItemGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
      {items.map((item, index) => (
        <div key={item.id} style={{ animationDelay: `${index * 50}ms` }}>
          <ItemCard item={item} />
        </div>
      ))}
    </div>
  );
}
