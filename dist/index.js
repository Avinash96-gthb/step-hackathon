"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const PlayWiseEngine_1 = require("./engine/PlayWiseEngine");
const playlists_1 = require("./routes/playlists");
const songs_1 = require("./routes/songs");
const playback_1 = require("./routes/playback");
const dashboard_1 = require("./routes/dashboard");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Initialize PlayWise Engine
const playWiseEngine = new PlayWiseEngine_1.PlayWiseEngine();
// Essential middleware only
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
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
const dashboardRouter = (0, dashboard_1.createDashboardRoutes)(playWiseEngine);
app.use('/api/dashboard', dashboardRouter);
console.log('🔧 Mounting playlist routes...');
const playlistRouter = (0, playlists_1.createPlaylistRoutes)(playWiseEngine);
app.use('/api/playlists', playlistRouter);
console.log('🔧 Mounting song routes...');
const songRouter = (0, songs_1.createSongRoutes)(playWiseEngine);
app.use('/api/songs', songRouter);
console.log('🔧 Mounting playback routes...');
const playbackRouter = (0, playback_1.createPlaybackRoutes)(playWiseEngine);
app.use('/api/playback', playbackRouter);
// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.url}`);
    next();
});
// Seed sample data
const seedSampleData = () => {
    const sampleSongs = [
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
exports.default = app;
//# sourceMappingURL=index.js.map