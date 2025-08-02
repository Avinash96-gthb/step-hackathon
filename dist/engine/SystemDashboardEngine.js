"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemDashboardEngine = void 0;
/**
 * System Dashboard Engine
 * Aggregates data from all engines to provide live statistics and system snapshot
 *
 * Time Complexity Analysis:
 * - get_top_longest_songs: O(n log n) - sorting by duration
 * - get_most_recently_played: O(k) where k is the limit
 * - get_song_count_by_rating: O(1) - already maintained by rating engine
 * - export_snapshot: O(n log n) - dominated by sorting operations
 *
 * Space Complexity: O(n) where n is the total number of songs
 */
class SystemDashboardEngine {
    constructor(playlistEngine, playbackHistoryEngine, songRatingEngine, lookupEngine, autoReplayEngine, skippedTracker) {
        this.playlistEngine = playlistEngine;
        this.playbackHistoryEngine = playbackHistoryEngine;
        this.songRatingEngine = songRatingEngine;
        this.lookupEngine = lookupEngine;
        this.autoReplayEngine = autoReplayEngine;
        this.skippedTracker = skippedTracker;
    }
    /**
     * Get top N longest songs from the system
     * Time Complexity: O(n log n) - sorting by duration
     * Space Complexity: O(n)
     */
    getTopLongestSongs(limit = 5) {
        try {
            const allSongs = this.lookupEngine.getAllSongs();
            // Sort by duration (descending) and take top N
            const sortedSongs = [...allSongs].sort((a, b) => b.duration - a.duration);
            return sortedSongs.slice(0, limit);
        }
        catch (error) {
            console.error('Error getting top longest songs:', error);
            return [];
        }
    }
    /**
     * Get most recently played songs
     * Time Complexity: O(k) where k is the limit
     * Space Complexity: O(k)
     */
    getMostRecentlyPlayed(limit = 5) {
        try {
            return this.playbackHistoryEngine.getRecentHistory(limit);
        }
        catch (error) {
            console.error('Error getting most recently played songs:', error);
            return [];
        }
    }
    /**
     * Get song count by rating
     * Time Complexity: O(1) - already maintained by rating engine
     * Space Complexity: O(1)
     */
    getSongCountByRating() {
        try {
            return this.songRatingEngine.getRatingDistribution();
        }
        catch (error) {
            console.error('Error getting song count by rating:', error);
            return {};
        }
    }
    /**
     * Get total number of songs in the system
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getTotalSongs() {
        return this.lookupEngine.getCount();
    }
    /**
     * Get total number of playlists (simplified - assuming single playlist for now)
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getTotalPlaylists() {
        return this.playlistEngine.isEmpty() ? 0 : 1;
    }
    /**
     * Get average rating across all songs
     * Time Complexity: O(n) - calculated by rating engine
     * Space Complexity: O(1)
     */
    getAverageRating() {
        try {
            return this.songRatingEngine.getAverageRating();
        }
        catch (error) {
            console.error('Error getting average rating:', error);
            return 0;
        }
    }
    /**
     * Get most played songs across the system
     * Time Complexity: O(n log n) - sorting by play count
     * Space Complexity: O(k) where k is the limit
     */
    getMostPlayedSongs(limit = 10) {
        try {
            return this.playbackHistoryEngine.getMostPlayedSongs(limit);
        }
        catch (error) {
            console.error('Error getting most played songs:', error);
            return [];
        }
    }
    /**
     * Get most skipped songs
     * Time Complexity: O(k log k) where k is unique skipped songs
     * Space Complexity: O(k)
     */
    getMostSkippedSongs(limit = 5) {
        try {
            return this.skippedTracker.getMostSkippedSongs(limit);
        }
        catch (error) {
            console.error('Error getting most skipped songs:', error);
            return [];
        }
    }
    /**
     * Get top-rated songs
     * Time Complexity: O(k) where k is the number of top-rated songs
     * Space Complexity: O(k)
     */
    getTopRatedSongs(limit = 10) {
        try {
            const topRated = this.songRatingEngine.getTopRatedSongs();
            return topRated.slice(0, limit);
        }
        catch (error) {
            console.error('Error getting top-rated songs:', error);
            return [];
        }
    }
    /**
     * Get songs recommended for auto-replay
     * Time Complexity: O(n log n) - sorting by play count
     * Space Complexity: O(k) where k is the number of recommended songs
     */
    getAutoReplaySongs() {
        try {
            return this.autoReplayEngine.getReplaySongs();
        }
        catch (error) {
            console.error('Error getting auto-replay songs:', error);
            return [];
        }
    }
    /**
     * Get recently skipped songs
     * Time Complexity: O(k) where k is the limit
     * Space Complexity: O(k)
     */
    getRecentlySkippedSongs(limit = 10) {
        try {
            const skippedSongs = this.skippedTracker.getRecentlySkippedSongs(limit);
            return skippedSongs.map(skipped => ({
                song: skipped.song,
                skippedAt: skipped.skippedAt
            }));
        }
        catch (error) {
            console.error('Error getting recently skipped songs:', error);
            return [];
        }
    }
    /**
     * Get comprehensive system statistics
     * Time Complexity: O(n) - aggregating from multiple engines
     * Space Complexity: O(1)
     */
    getSystemStats() {
        try {
            const lookupStats = this.lookupEngine.getStats();
            const playbackStats = this.playbackHistoryEngine.getPlaybackStats();
            const skipStats = this.skippedTracker.getSkipStats();
            const playlistStats = this.playlistEngine.getPlaylistStats();
            const autoReplayStats = this.autoReplayEngine.getStats();
            // Calculate average duration
            const allSongs = this.lookupEngine.getAllSongs();
            const averageDuration = allSongs.length > 0
                ? allSongs.reduce((sum, song) => sum + song.duration, 0) / allSongs.length
                : 0;
            // Calculate skip rate
            const skipRate = playbackStats.totalPlays > 0
                ? skipStats.totalSkipsTracked / playbackStats.totalPlays
                : 0;
            return {
                songs: {
                    total: lookupStats.totalSongs,
                    rated: this.songRatingEngine.getTotalRatedSongs(),
                    unrated: lookupStats.totalSongs - this.songRatingEngine.getTotalRatedSongs(),
                    averageRating: this.getAverageRating(),
                    averageDuration
                },
                playback: {
                    totalPlays: playbackStats.totalPlays,
                    uniqueSongsPlayed: playbackStats.uniqueSongs,
                    totalListeningTime: playbackStats.totalListeningTime
                },
                skipping: {
                    totalSkips: skipStats.totalSkipsTracked,
                    uniqueSongsSkipped: skipStats.uniqueSongsSkipped,
                    skipRate
                },
                playlists: {
                    totalPlaylists: this.getTotalPlaylists(),
                    totalSongsInPlaylists: playlistStats.totalSongs
                },
                autoReplay: {
                    enabled: autoReplayStats.enabled,
                    trackedSongs: autoReplayStats.totalTrackedSongs,
                    totalPlays: autoReplayStats.totalPlays
                }
            };
        }
        catch (error) {
            console.error('Error getting system stats:', error);
            return {
                songs: { total: 0, rated: 0, unrated: 0, averageRating: 0, averageDuration: 0 },
                playback: { totalPlays: 0, uniqueSongsPlayed: 0, totalListeningTime: 0 },
                skipping: { totalSkips: 0, uniqueSongsSkipped: 0, skipRate: 0 },
                playlists: { totalPlaylists: 0, totalSongsInPlaylists: 0 },
                autoReplay: { enabled: false, trackedSongs: 0, totalPlays: 0 }
            };
        }
    }
    /**
     * Get live dashboard snapshot
     * Time Complexity: O(n log n) - dominated by sorting operations
     * Space Complexity: O(n)
     */
    getLiveDashboard() {
        try {
            return {
                topLongestSongs: this.getTopLongestSongs(),
                mostRecentlyPlayed: this.getMostRecentlyPlayed(),
                songCountByRating: this.getSongCountByRating(),
                totalSongs: this.getTotalSongs(),
                totalPlaylists: this.getTotalPlaylists(),
                averageRating: this.getAverageRating(),
                timestamp: new Date()
            };
        }
        catch (error) {
            console.error('Error getting live dashboard:', error);
            return {
                topLongestSongs: [],
                mostRecentlyPlayed: [],
                songCountByRating: {},
                totalSongs: 0,
                totalPlaylists: 0,
                averageRating: 0,
                timestamp: new Date()
            };
        }
    }
    /**
     * Export comprehensive system snapshot for analysis
     * Time Complexity: O(n log n) - sorting operations across multiple data sets
     * Space Complexity: O(n)
     */
    exportSnapshot() {
        try {
            return {
                basicSnapshot: this.getLiveDashboard(),
                extendedStats: this.getSystemStats(),
                topAnalytics: {
                    mostPlayed: this.getMostPlayedSongs(),
                    mostSkipped: this.getMostSkippedSongs(),
                    topRated: this.getTopRatedSongs(),
                    autoReplaySongs: this.getAutoReplaySongs(),
                    recentlySkipped: this.getRecentlySkippedSongs()
                },
                engineStats: {
                    lookup: this.lookupEngine.getStats(),
                    playlist: this.playlistEngine.getPlaylistStats(),
                    playback: this.playbackHistoryEngine.getPlaybackStats(),
                    rating: this.songRatingEngine.exportRatingData(),
                    autoReplay: this.autoReplayEngine.getStats(),
                    skipping: this.skippedTracker.getSkipStats()
                },
                exportedAt: new Date()
            };
        }
        catch (error) {
            console.error('Error exporting system snapshot:', error);
            return {
                basicSnapshot: {
                    topLongestSongs: [],
                    mostRecentlyPlayed: [],
                    songCountByRating: {},
                    totalSongs: 0,
                    totalPlaylists: 0,
                    averageRating: 0,
                    timestamp: new Date()
                },
                extendedStats: {
                    songs: { total: 0, rated: 0, unrated: 0, averageRating: 0, averageDuration: 0 },
                    playback: { totalPlays: 0, uniqueSongsPlayed: 0, totalListeningTime: 0 },
                    skipping: { totalSkips: 0, uniqueSongsSkipped: 0, skipRate: 0 },
                    playlists: { totalPlaylists: 0, totalSongsInPlaylists: 0 },
                    autoReplay: { enabled: false, trackedSongs: 0, totalPlays: 0 }
                },
                topAnalytics: {
                    mostPlayed: [],
                    mostSkipped: [],
                    topRated: [],
                    autoReplaySongs: [],
                    recentlySkipped: []
                },
                engineStats: {
                    lookup: { totalSongs: 0, totalArtists: 0, totalGenres: 0, avgSongsPerArtist: 0, hashMapStats: { idMapStats: {}, titleMapStats: {}, artistMapStats: {} } },
                    playlist: { totalSongs: 0, totalDuration: 0, averageDuration: 0, averageRating: 0, songsByGenre: {}, createdAt: new Date(), updatedAt: new Date() },
                    playback: { totalPlays: 0, uniqueSongs: 0, averagePlaysPerSong: 0, firstPlayTime: null, lastPlayTime: null, totalListeningTime: 0 },
                    rating: { ratingBuckets: [], distribution: {}, averageRating: 0, totalRatedSongs: 0, topRated: [], exportedAt: new Date() },
                    autoReplay: { enabled: false, totalTrackedSongs: 0, totalPlays: 0, calmingGenresCount: 0, topSongsCount: 0, playStatsByGenre: {} },
                    skipping: { totalSkipsTracked: 0, uniqueSongsSkipped: 0, averageSkipsPerSong: 0, oldestSkipTime: null, newestSkipTime: null, maxHistorySize: 0, currentHistorySize: 0 }
                },
                exportedAt: new Date()
            };
        }
    }
    /**
     * Get performance metrics for all engines
     * Time Complexity: O(1) - just collecting metadata
     * Space Complexity: O(1)
     */
    getPerformanceMetrics() {
        try {
            const lookupStats = this.lookupEngine.getStats();
            const skipStats = this.skippedTracker.getSkipStats();
            return {
                memoryUsage: {
                    totalSongs: this.getTotalSongs(),
                    playlistSize: this.playlistEngine.getSize(),
                    historySize: this.playbackHistoryEngine.getHistorySize(),
                    ratedSongs: this.songRatingEngine.getTotalRatedSongs(),
                    skipHistorySize: skipStats.currentHistorySize
                },
                operationalStats: {
                    lookupEfficiency: lookupStats.hashMapStats.idMapStats.loadFactor || 0,
                    treeHeight: -1, // BST height would need to be implemented
                    cacheHitRate: 0.95 // Simulated - in real system would track actual cache hits
                }
            };
        }
        catch (error) {
            console.error('Error getting performance metrics:', error);
            return {
                memoryUsage: { totalSongs: 0, playlistSize: 0, historySize: 0, ratedSongs: 0, skipHistorySize: 0 },
                operationalStats: { lookupEfficiency: 0, treeHeight: 0, cacheHitRate: 0 }
            };
        }
    }
    /**
     * Generate recommendations based on system analysis
     * Time Complexity: O(n log n) - sorting and analysis
     * Space Complexity: O(k) where k is the number of recommendations
     */
    generateRecommendations() {
        try {
            const allSongs = this.lookupEngine.getAllSongs();
            const unratedSongs = this.songRatingEngine.getUnratedSongs(allSongs);
            const mostPlayed = this.getMostPlayedSongs(20);
            // Popular unrated songs
            const popularUnrated = unratedSongs.filter(song => mostPlayed.some(played => played.song.id === song.id));
            // Undervalued: Low-rated but frequently played
            const undervalued = mostPlayed
                .filter(played => played.song.rating && played.song.rating <= 2)
                .map(played => played.song);
            // Overlooked: High-rated but rarely played
            const topRated = this.getTopRatedSongs(50);
            const overlooked = topRated.filter(song => !mostPlayed.some(played => played.song.id === song.id));
            return {
                suggestedRatings: unratedSongs.slice(0, 10),
                popularUnrated: popularUnrated.slice(0, 5),
                undervalued: undervalued.slice(0, 5),
                overlooked: overlooked.slice(0, 5)
            };
        }
        catch (error) {
            console.error('Error generating recommendations:', error);
            return {
                suggestedRatings: [],
                popularUnrated: [],
                undervalued: [],
                overlooked: []
            };
        }
    }
}
exports.SystemDashboardEngine = SystemDashboardEngine;
//# sourceMappingURL=SystemDashboardEngine.js.map