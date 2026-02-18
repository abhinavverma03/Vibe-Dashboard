import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock data - items database
const items = [
  {
    id: 1,
    title: 'React Patterns',
    category: 'Frontend',
    description: 'Master advanced React patterns and best practices',
    icon: '⚛️',
    rating: 4.8,
    users: 12500,
  },
  {
    id: 2,
    title: 'Next.js Mastery',
    category: 'Framework',
    description: 'Build production-ready apps with Next.js 16',
    icon: '▲',
    rating: 4.9,
    users: 15200,
  },
  {
    id: 3,
    title: 'Tailwind CSS Pro',
    category: 'Styling',
    description: 'Create beautiful designs with Tailwind CSS',
    icon: '🎨',
    rating: 4.7,
    users: 8900,
  },
  {
    id: 4,
    title: 'TypeScript Fundamentals',
    category: 'Language',
    description: 'Learn TypeScript from basics to advanced concepts',
    icon: '📘',
    rating: 4.6,
    users: 11000,
  },
  {
    id: 5,
    title: 'REST API Design',
    category: 'Backend',
    description: 'Design scalable and maintainable REST APIs',
    icon: '🔌',
    rating: 4.5,
    users: 7500,
  },
  {
    id: 6,
    title: 'Database Optimization',
    category: 'Database',
    description: 'Optimize queries and improve database performance',
    icon: '⚡',
    rating: 4.8,
    users: 6200,
  },
  {
    id: 7,
    title: 'Web Security Essentials',
    category: 'Security',
    description: 'Protect your applications from common vulnerabilities',
    icon: '🔒',
    rating: 4.9,
    users: 9800,
  },
  {
    id: 8,
    title: 'Testing Best Practices',
    category: 'Testing',
    description: 'Write effective tests for your applications',
    icon: '✅',
    rating: 4.4,
    users: 5400,
  },
  {
    id: 9,
    title: 'GraphQL Fundamentals',
    category: 'API',
    description: 'Build efficient APIs with GraphQL',
    icon: '📊',
    rating: 4.7,
    users: 8300,
  },
  {
    id: 10,
    title: 'Docker & Kubernetes',
    category: 'DevOps',
    description: 'Master containerization and orchestration',
    icon: '🐳',
    rating: 4.6,
    users: 10200,
  },
  {
    id: 11,
    title: 'State Management',
    category: 'Frontend',
    description: 'Handle complex state with Zustand and Redux',
    icon: '🎯',
    rating: 4.8,
    users: 13400,
  },
  {
    id: 12,
    title: 'Performance Optimization',
    category: 'Performance',
    description: 'Improve application speed and efficiency',
    icon: '⚙️',
    rating: 4.9,
    users: 11800,
  },
  {
    id: 13,
    title: 'CI/CD Pipelines',
    category: 'DevOps',
    description: 'Automate testing and deployment workflows',
    icon: '🔄',
    rating: 4.7,
    users: 7600,
  },
  {
    id: 14,
    title: 'Cloud Architecture',
    category: 'Cloud',
    description: 'Design scalable cloud-based systems',
    icon: '☁️',
    rating: 4.8,
    users: 9100,
  },
];

// GET /api/items endpoint with search support
app.get('/api/items', (req, res) => {
  const { search = '', limit = 10, offset = 0 } = req.query;

  // Simulate slight network delay for realism
  setTimeout(() => {
    let results = items;

    // Filter by search query (searches in title, description, and category)
    if (search) {
      const query = search.toLowerCase();
      results = items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    // Apply pagination
    const paginatedResults = results.slice(
      parseInt(offset),
      parseInt(offset) + parseInt(limit)
    );

    res.json({
      success: true,
      data: paginatedResults,
      total: results.length,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  }, 300);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Vibe Dashboard API running on http://localhost:${PORT}`);
  console.log(`📍 API endpoint: http://localhost:${PORT}/api/items`);
});
