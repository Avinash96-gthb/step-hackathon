import express from 'express';
import cors from 'cors';
import { PlayWiseEngine } from './engine/PlayWiseEngine';
import { Song } from './types';
import { createPlaylistRoutes } from './routes/playlists';
import { createSongRoutes } from './routes/songs';
import { createPlaybackRoutes } from './routes/playback';
import { createDashboardRoutes } from './routes/dashboard';

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize PlayWise Engine
const playWiseEngine = new PlayWiseEngine();

// Essential middleware only
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Mount API routes with debug logging
console.log('🔧 Mounting dashboard routes...');
const dashboardRouter = createDashboardRoutes(playWiseEngine);
app.use('/api/dashboard', dashboardRouter);

console.log('🔧 Mounting playlist routes...');
const playlistRouter = createPlaylistRoutes(playWiseEngine);
app.use('/api/playlists', playlistRouter);

console.log('🔧 Mounting song routes...');
const songRouter = createSongRoutes(playWiseEngine);
app.use('/api/songs', songRouter);

console.log('🔧 Mounting playback routes...');
const playbackRouter = createPlaybackRoutes(playWiseEngine);
app.use('/api/playback', playbackRouter);

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

// Seed sample data
const seedSampleData = () => {
  const sampleSongs: Song[] = [
    {
      id: 'song1',
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'A Night at the Opera',
      duration: 355,
      genre: 'Rock',
      year: 1975,
      fileUrl: 'https://example.com/bohemian-rhapsody.mp3',
      playCount: 0,
      dateAdded: new Date()
    },
    {
      id: 'song2',
      title: 'Stairway to Heaven',
      artist: 'Led Zeppelin',
      album: 'Led Zeppelin IV',
      duration: 482,
      genre: 'Rock',
      year: 1971,
      fileUrl: 'https://example.com/stairway-to-heaven.mp3',
      playCount: 0,
      dateAdded: new Date()
    },
    {
      id: 'song3',
      title: 'Hotel California',
      artist: 'Eagles',
      album: 'Hotel California',
      duration: 391,
      genre: 'Rock',
      year: 1976,
      fileUrl: 'https://example.com/hotel-california.mp3',
      playCount: 0,
      dateAdded: new Date()
    }
  ];

  // Add songs to the system
  sampleSongs.forEach(song => {
    playWiseEngine.addSong(song);
  });

  // Add some songs to the default playlist
  sampleSongs.forEach((song, index) => {
    playWiseEngine.addSongToPlaylist(song.id);
  });

  // Add some sample ratings
  playWiseEngine.rateSong('song1', 5.0);
  playWiseEngine.rateSong('song2', 4.8);
  playWiseEngine.rateSong('song3', 4.9);

  console.log('✅ Sample data seeded successfully');
  console.log(`📊 Added ${sampleSongs.length} songs`);
};

// Start server
app.listen(PORT, () => {
  console.log('🎵 PlayWise Music Platform Backend Ready!');
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  
  // Seed sample data after server starts
  seedSampleData();
  
  console.log('📋 Available endpoints:');
  console.log(`  GET  /health`);
  console.log(`  GET  /api/dashboard`);
  console.log(`  GET  /api/playlists/current`);
  console.log(`  GET  /api/playback/status`);
});

export default app;
