# PlayWise Music Platform - Backend

## 🎵 Overview

PlayWise is a comprehensive music platform backend built with Express.js and TypeScript, focusing on advanced data structures and algorithms implementation. This project demonstrates real-world application of computer science fundamentals with performance-optimized operations.

## 🏗️ Architecture Overview

### Core Components

```
PlayWise Engine (Main Orchestrator)
├── PlaylistEngine (DoublyLinkedList) - O(1) add/remove
├── PlaybackHistoryEngine (Stack) - LIFO operations
├── SongRatingEngine (BinarySearchTree) - O(log n) rating operations
├── InstantSongLookupEngine (HashMap) - O(1) average lookup
├── AutoReplayEngine - Smart recommendations
├── RecentlySkippedTracker (Queue) - FIFO tracking
└── SystemDashboardEngine - Analytics aggregation
```

### 📊 Data Structures & Complexity

| Component | Data Structure | Primary Operations | Time Complexity | Space Complexity |
|-----------|----------------|-------------------|-----------------|------------------|
| **Playlist Management** | DoublyLinkedList | Insert, Delete, Move | O(1) | O(n) |
| **Playback History** | Stack | Push, Pop, Peek | O(1) | O(n) |
| **Song Ratings** | Binary Search Tree | Search, Insert, Delete | O(log n) | O(n) |
| **Song Lookup** | HashMap | Get, Put, Remove | O(1) avg, O(n) worst | O(n) |
| **Skip Tracking** | Queue/Deque | Enqueue, Dequeue | O(1) | O(n) |
| **Sorting** | Merge/Quick/Heap Sort | Sort Operations | O(n log n) | O(n) |

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone and setup:**
```bash
cd step-hackathon
npm install
```

2. **Build the project:**
```bash
npm run build
```

3. **Start the server:**
```bash
# Kill any existing processes on port 3000 (if needed)
pkill -f "node.*3000"

# Start the server
npm start
```

4. **Access the API:**
- **Server**: http://localhost:3000
- **Swagger Documentation**: http://localhost:3000/api-docs
- **Health Check**: http://localhost:3000/health
## 📚 API Documentation

### Base URL: `http://localhost:3000`

### 🏥 Health Check
- **GET** `/health` - Check server status

### 📊 Dashboard Endpoints

| Method | Endpoint | Description | Complexity |
|--------|----------|-------------|------------|
| **GET** | `/api/dashboard` | Live system dashboard | O(n log n) |
| **GET** | `/api/dashboard/export` | Export system snapshot | O(n log n) |
| **GET** | `/api/dashboard/stats` | System statistics | O(n) |
| **GET** | `/api/dashboard/performance` | Performance metrics | O(1) |
| **GET** | `/api/dashboard/recommendations` | Personalized recommendations | O(n log n) |
| **GET** | `/api/dashboard/analytics/most-played` | Most played songs | O(n log n) |
| **GET** | `/api/dashboard/analytics/most-skipped` | Most skipped songs | O(n log n) |
| **GET** | `/api/dashboard/analytics/top-rated` | Top rated songs | O(n log n) |
| **GET** | `/api/dashboard/analytics/top-longest` | Longest songs | O(n log n) |
| **POST** | `/api/dashboard/reset` | Reset system (testing) | O(n) |

### 🎵 Song Management

| Method | Endpoint | Description | Complexity |
|--------|----------|-------------|------------|
| **POST** | `/api/songs` | Add new song | O(log n) |
| **GET** | `/api/songs/search` | Search songs with criteria | O(n) |
| **GET** | `/api/songs/recommended` | Get recommended songs | O(n log n) |
| **GET** | `/api/songs/rating/:rating` | Get songs by rating | O(k) |
| **GET** | `/api/songs/:id` | Get specific song | O(1) avg |
| **PUT** | `/api/songs/:id/rating` | Rate a song | O(log n) |
| **DELETE** | `/api/songs/:id` | Remove song | O(n) |

### 📋 Playlist Management

| Method | Endpoint | Description | Complexity |
|--------|----------|-------------|------------|
| **GET** | `/api/playlists/current` | Get current playlist | O(n) |
| **POST** | `/api/playlists/songs` | Add song to playlist | O(1) |
| **DELETE** | `/api/playlists/songs/:index` | Remove song by index | O(n) |
| **PUT** | `/api/playlists/songs/move` | Move song position | O(1) |
| **PUT** | `/api/playlists/reverse` | Reverse playlist | O(n) |
| **PUT** | `/api/playlists/sort` | Sort playlist | O(n log n) |
| **PUT** | `/api/playlists/shuffle` | Shuffle playlist | O(n) |
| **DELETE** | `/api/playlists/clear` | Clear playlist | O(1) |

### ⏯️ Playback Control

| Method | Endpoint | Description | Complexity |
|--------|----------|-------------|------------|
| **POST** | `/api/playback/play` | Play specific song | O(1) |
| **POST** | `/api/playback/next` | Play next song | O(1) |
| **POST** | `/api/playback/previous` | Play previous song | O(1) |
| **POST** | `/api/playback/undo` | Undo last play | O(1) |
| **GET** | `/api/playback/status` | Get playback status | O(1) |
| **GET** | `/api/playback/history` | Get play history | O(k) |
| **POST** | `/api/playback/auto-replay` | Start auto-replay | O(1) |
| **PUT** | `/api/playback/auto-replay/config` | Update auto-replay config | O(1) |

## 🧪 API Testing Examples

### 1. Get System Dashboard
```bash
curl -X GET http://localhost:3000/api/dashboard | jq .
```

### 2. Add a New Song
```bash
curl -X POST http://localhost:3000/api/songs \
  -H "Content-Type: application/json" \
  -d '{
    "id": "song4",
    "title": "Imagine",
    "artist": "John Lennon",
    "album": "Imagine",
    "duration": 183,
    "genre": "Rock",
    "year": 1971,
    "fileUrl": "https://example.com/imagine.mp3"
  }'
```

### 3. Get Current Playlist
```bash
curl -X GET http://localhost:3000/api/playlists/current | jq .
```

### 4. Rate a Song
```bash
curl -X PUT http://localhost:3000/api/songs/song1/rating \
  -H "Content-Type: application/json" \
  -d '{"rating": 4.5}'
```

### 5. Play a Song
```bash
curl -X POST http://localhost:3000/api/playback/play \
  -H "Content-Type: application/json" \
  -d '{"songId": "song1"}'
```

### 6. Sort Playlist
```bash
curl -X PUT http://localhost:3000/api/playlists/sort \
  -H "Content-Type: application/json" \
  -d '{
    "field": "rating",
    "order": "desc",
    "algorithm": "merge"
  }'
```

### 7. Search Songs
```bash
curl -X GET "http://localhost:3000/api/songs/search?artist=Queen&minRating=4" | jq .
```

### 8. Get Analytics
```bash
# Most played songs
curl -X GET "http://localhost:3000/api/dashboard/analytics/most-played?limit=5" | jq .

# Top rated songs
curl -X GET "http://localhost:3000/api/dashboard/analytics/top-rated?limit=10" | jq .

# Export system snapshot
curl -X GET http://localhost:3000/api/dashboard/export | jq . > system-snapshot.json
```

## 🔧 Data Structure Details

### 1. **DoublyLinkedList** (Playlist Management)
- **Purpose**: Maintains song order with efficient insertions/deletions
- **Operations**: O(1) add/remove at any position, O(n) search
- **Features**: Bidirectional traversal, memory efficient

### 2. **Stack** (Playback History)
- **Purpose**: LIFO playback history for undo operations
- **Operations**: O(1) push/pop, O(n) search
- **Features**: Last-played song tracking, undo functionality

### 3. **Binary Search Tree** (Song Ratings)
- **Purpose**: Maintains songs sorted by rating for fast queries
- **Operations**: O(log n) insert/delete/search on average
- **Features**: Range queries, top-rated song retrieval

### 4. **HashMap** (Instant Song Lookup)
- **Purpose**: Fast song retrieval by ID, title, or artist
- **Operations**: O(1) average access, O(n) worst case
- **Features**: Multiple key mappings, collision handling

### 5. **Queue/Deque** (Skip Tracking)
- **Purpose**: Track recently skipped songs with FIFO behavior
- **Operations**: O(1) enqueue/dequeue
- **Features**: Skip pattern analysis, user behavior insights

### 6. **Custom Sorting Algorithms**
- **Merge Sort**: Stable, O(n log n), good for large datasets
- **Quick Sort**: In-place, O(n log n) average, faster for small datasets
- **Heap Sort**: O(n log n) guaranteed, good worst-case performance

## 🎯 Performance Features

### Real-time Analytics
- Live dashboard updates with system statistics
- Performance metrics tracking for all operations
- Memory usage and operation timing analysis

### Auto-Replay Engine
- Smart song recommendations based on listening patterns
- Calming genre detection for relaxation modes
- Play count and rating-based suggestions

### Optimized Operations
- Batch operations for multiple songs
- Lazy loading for large playlists
- Efficient memory management with proper cleanup

## 🚧 Development

### Project Structure
```
src/
├── dataStructures/     # Core data structure implementations
│   ├── DoublyLinkedList.ts
│   ├── Stack.ts
│   ├── BinarySearchTree.ts
│   ├── HashMap.ts
│   ├── Queue.ts
│   └── Sorting.ts
├── engine/            # Business logic engines
│   ├── PlayWiseEngine.ts          # Main orchestrator
│   ├── PlaylistEngine.ts          # Playlist management
│   ├── PlaybackHistoryEngine.ts   # History tracking
│   ├── SongRatingEngine.ts        # Rating system
│   ├── InstantSongLookupEngine.ts # Fast lookups
│   ├── AutoReplayEngine.ts        # Smart recommendations
│   ├── RecentlySkippedTracker.ts  # Skip tracking
│   └── SystemDashboardEngine.ts   # Analytics
├── routes/            # API endpoints
│   ├── dashboard.ts   # Dashboard routes
│   ├── songs.ts       # Song management
│   ├── playlists.ts   # Playlist operations
│   └── playback.ts    # Playback control
├── types.ts           # TypeScript interfaces
├── swagger.ts         # API documentation config
└── index.ts           # Express server setup
```

### Available Scripts
```bash
npm run build    # Compile TypeScript
npm start        # Start production server
npm run dev      # Start development with watch mode
npm test         # Run tests (if configured)
```

### Development Commands
```bash
# Kill existing server and restart
pkill -f "node.*3000" && npm run build && npm start

# View logs with debugging
npm start | grep "📨\|🔧\|📊"

# Test API endpoints
curl -s http://localhost:3000/health
curl -s http://localhost:3000/api/dashboard | jq .
```

## 📈 Monitoring

### Health Checks
- Server status: `/health`
- Performance metrics: `/api/dashboard/performance`
- System statistics: `/api/dashboard/stats`

### Debug Logging
The server includes comprehensive logging:
- 📨 Request logging for all API calls
- 🔧 System initialization messages
- 📊 Operation completion confirmations
- ❌ Error tracking with full stack traces

### Live Dashboard
Access real-time analytics at `/api/dashboard` including:
- Current playback status
- Song statistics (total, rated, average rating)
- Playlist metrics (size, composition)
- Playback history analysis
- Skip behavior patterns
- Auto-replay statistics

## 🔗 API Documentation

For detailed API documentation with interactive testing, visit:
**http://localhost:3000/api-docs**

This Swagger UI provides:
- Complete endpoint documentation
- Request/response schema definitions
- Interactive API testing
- Example requests and responses
- Authentication details (if applicable)

## 💡 Key Algorithmic Features

1. **O(1) Playlist Operations**: Using DoublyLinkedList for constant-time insertions/deletions
2. **O(log n) Rating Queries**: BST implementation for efficient rating-based operations
3. **O(1) Song Lookup**: HashMap with collision handling for instant access
4. **O(n log n) Sorting**: Multiple sorting algorithms with complexity guarantees
5. **Space-Optimized**: All data structures designed for minimal memory footprint

## 🎵 Sample Data

The system comes pre-seeded with sample songs:
- **Bohemian Rhapsody** by Queen (355s, Rating: 5.0)
- **Stairway to Heaven** by Led Zeppelin (482s, Rating: 4.8)
- **Hotel California** by Eagles (391s, Rating: 4.9)

These songs are automatically added to the default playlist for immediate testing.

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
