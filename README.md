# PlayWise Music Platform Backend

A highly optimized backend engine for the PlayWise music platform that intelligently leverages data structures like Linked Lists, Stacks, Trees, HashMaps, and Sorting algorithms.

## Features

### Core Data Structures Implementation
- **Playlist Engine**: Doubly linked list for playlist manipulation
- **Playback History**: Stack-based undo functionality  
- **Song Rating System**: Binary Search Tree for rating-based indexing
- **Instant Lookup**: HashMap for O(1) song retrieval
- **Smart Sorting**: Merge/Quick sort for various criteria
- **Auto-replay**: Genre-based mood replay system
- **Skip Tracker**: Recently skipped songs management

### API Endpoints
- Playlist management (CRUD operations)
- Song rating and search
- Playback history and undo
- System dashboard and analytics
- Auto-replay configuration
- Skip tracking

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Production
```bash
npm start
```

## Architecture

The system is built with modular architecture focusing on:
- **Time Complexity**: All operations are optimized with documented complexity
- **Space Efficiency**: Memory-conscious data structure implementations
- **Real-time Performance**: Live dashboard and instant operations
- **Scalability**: Modular design for easy extension

## Technical Design

See `/docs/technical-design.md` for detailed architecture, complexity analysis, and algorithm justification.

## API Documentation

### Playlist Operations
- `POST /api/playlists` - Create playlist
- `PUT /api/playlists/:id/songs` - Add song
- `DELETE /api/playlists/:id/songs/:index` - Remove song
- `PUT /api/playlists/:id/songs/move` - Reorder songs
- `PUT /api/playlists/:id/reverse` - Reverse playlist

### Song Management
- `POST /api/songs` - Add song to system
- `GET /api/songs/search` - Search songs by title/ID
- `PUT /api/songs/:id/rating` - Rate song
- `GET /api/songs/rating/:rating` - Get songs by rating

### Playback Control
- `POST /api/playback/play` - Play song
- `POST /api/playback/undo` - Undo last play
- `GET /api/playback/history` - Get play history

### System Analytics
- `GET /api/dashboard` - Live system snapshot
- `GET /api/dashboard/export` - Export full dashboard data

## Performance

All core operations are documented with time and space complexity:
- Playlist operations: O(1) - O(n)
- Song lookup: O(1) average
- Rating search: O(log n)
- Sorting: O(n log n)
