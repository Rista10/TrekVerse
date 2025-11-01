# TrekGuider 🏔️

A modern web application for discovering and exploring hiking trails in Nepal. TrekGuider helps trekkers find the perfect trail, view detailed information, see checkpoint routes on interactive maps, and share their hiking experiences.

## Features

### 🗺️ Interactive Trail Maps
- **Live Trail Visualization**: View trails on interactive Leaflet maps with real-time marker placement
- **Checkpoint Routing**: See all checkpoints along your trek route connected by polylines
- **Auto-fitted Views**: Maps automatically zoom and center to show all waypoints
- **Trail Information**: Detailed trek descriptions, difficulty levels, and duration

### 📸 Photo Gallery
- **Trek Photo Carousel**: Browse beautiful photos from different sections of each trek
- **Auto-rotating Galleries**: Smooth transitions between images with 3-second intervals
- **Photo Progress Indicators**: Visual feedback on which photo you're viewing

### 🔍 Trail Discovery
- **Search & Filter**: Find trails by name with URL-based navigation
- **Trail Ratings**: View user ratings and reviews for each trail
- **Difficulty Classifications**: Easy, Moderate, and Hard trek levels

### 👥 Community Features
- **User Reviews**: Read and share trekking experiences
- **Trail Statistics**: View trail duration, elevation, and season information

## Tech Stack

### Frontend
- **Framework**: [Next.js 15+](https://nextjs.org/) - React with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Maps**: [Leaflet](https://leafletjs.com/) + [React-Leaflet](https://react-leaflet.js.org/) - Interactive mapping
- **UI Components**: Custom components + Shadcn UI elements
- **Language**: TypeScript for type safety

### Backend
- Node.js with Express (optional for weather data, user profiles)
- Ready for MongoDB/PostgreSQL integration

## Project Structure

```
trek-guider/
├── app/
│   ├── (auth)/                    # Authentication routes
│   ├── (landing_page)/            # Hero section & main landing
│   ├── explore/                   # Trail discovery & search
│   ├── trails/[trailId]/          # Individual trail pages
│   │   ├── _components/
│   │   │   ├── Map.tsx            # Interactive map with checkpoints
│   │   │   ├── TrailDetail.tsx    # Trail info tabs
│   │   │   └── ...
│   │   └── page.tsx
│   ├── context/
│   │   └── AuthContext.tsx        # Authentication context
│   └── layout.tsx
├── components/
│   ├── myPhotosCarousel.tsx       # Trek photo carousel
│   ├── trail/
│   │   └── trailCarousel.tsx
│   └── ui/                        # Shadcn UI components
├── data/
│   └── index.ts                   # Trail data with checkpoints
├── lib/
│   ├── api.ts
│   └── utils.ts
├── types/
│   └── trail.ts                   # TypeScript interfaces
├── public/                        # Static assets & images
└── backend/                       # Optional backend server
```

## Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Rista10/TrekVerse.git
cd trek-guider

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Exploring Trails
1. Navigate to the **Explore** page
2. Search for a trail by name
3. Click a trail to view details
4. Explore the trail page with:
   - Interactive map showing all checkpoints and route
   - Trail description, difficulty, and duration
   - Photo galleries from different trek sections
   - User reviews and ratings

### Map Features
- **Numbered Markers**: Shows checkpoint sequence (1, 2, 3...)
- **Route Polyline**: Red dashed line connecting all checkpoints
- **Auto-zoom**: Map automatically fits all waypoints
- **Popup Info**: Click markers for checkpoint details

### Photo Carousel
- Auto-rotates every 3 seconds
- 5 trek-themed photo sections
- Smooth fade transitions
- Progress indicators for navigation

## Key Components

### `Map.tsx` 
Interactive Leaflet map with dynamic checkpoint rendering and polyline routing.

### `PhotoCarousel.tsx`
Auto-rotating gallery with 5 trek sections, progress dots, and photo counters.

### `SearchBar.tsx`
Trail discovery with client-side navigation using `next/navigation`.

## Trail Data Format

```typescript
interface Trail {
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  checkpoints: Checkpoint[];
}

interface Checkpoint {
  name: string;
  latitude: number;
  longitude: number;
  description: string;
}
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Performance Highlights

- ✅ Dynamic imports for Leaflet (prevents SSR issues)
- ✅ Next.js Image optimization
- ✅ Route-based code splitting
- ✅ Tailwind CSS tree-shaking
- ✅ Responsive design

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Future Enhancements

- [ ] User authentication system
- [ ] Advanced trail filtering
- [ ] Real-time weather integration
- [ ] Community difficulty ratings
- [ ] GPX route downloads
- [ ] Trail completion tracking
- [ ] Mobile app

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss proposed changes.

```bash
git checkout -b feature/AmazingFeature
git commit -am 'Add AmazingFeature'
git push origin feature/AmazingFeature
```

## License

MIT License - see LICENSE file for details

## Contact

- **GitHub**: [Rista10/TrekVerse](https://github.com/Rista10/TrekVerse)
- **Issues**: Report bugs or suggest features via GitHub Issues

---

**Happy Trekking! 🥾⛰️**
