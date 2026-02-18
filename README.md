# Vibe Dashboard

A modern, full-stack dashboard application with glassmorphism design and real-time search. Built with Next.js, Express.js, and Tailwind CSS.

## Features

- Modern glassmorphism UI with smooth animations
- Responsive design for all screen sizes
- Real-time search with debouncing
- Express.js REST API with filtering
- Dark mode support
- TypeScript throughout

## Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

This starts:
- Frontend on `http://localhost:3000`
- API on `http://localhost:5000`

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css        # Global styles with design tokens
├── components/            # React components
│   ├── dashboard.tsx
│   ├── search-bar.tsx
│   ├── item-grid.tsx
│   └── item-card.tsx
├── backend/server.js     # Express.js API
├── package.json
└── .env.local            # Environment config
```

## API

### GET /api/items

Search and filter items.

```bash
curl "http://localhost:5000/api/items?search=react"
```

**Query Parameters:**
- `search`: Filter by title, description, or category
- `limit`: Max results (default: 10)
- `offset`: Pagination offset (default: 0)

### GET /api/health

Health check endpoint.

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend:** Express.js, Node.js
- **Styling:** Tailwind CSS 4 with glassmorphism effects

## Development

### Adding Items

Edit the `items` array in `backend/server.js`:

```javascript
const items = [
  {
    id: 9,
    title: 'New Item',
    category: 'Category',
    description: 'Description',
    icon: '🎉',
    rating: 4.5,
    users: 5000,
  },
];
```

### Customizing Styles

Edit design tokens in `app/globals.css`:

```css
:root {
  --primary: oklch(0.55 0.18 255);
  --background: oklch(0.95 0 0);
}
```

## Deployment

### Frontend (Vercel)

Push to GitHub, connect to Vercel, and set `NEXT_PUBLIC_API_URL` to your backend URL.

### Backend

Deploy `backend/server.js` to services like Heroku, Railway, or Render.

## License

MIT

