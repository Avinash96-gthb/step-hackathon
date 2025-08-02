"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayWiseEngine = void 0;
const index_1 = require("./index");
/**
 * PlayWise Core Engine
 * Main orchestrator that coordinates all sub-engines and provides unified API
 * Implements all required functionality with proper data structure integration
 *
 * This is the main entry point for all PlayWise operations
 */
class PlayWiseEngine {
    constructor(playlistId = 'default-playlist', playlistName = 'My Playlist', autoReplayConfig) {
        // State management
        this.currentPlayingIndex = -1;
        this.isPlaying = false;
        this.isAutoReplayMode = false;
        // Initialize all engines
        this.playlistEngine = new index_1.PlaylistEngine(playlistId, playlistName);
        this.playbackHistoryEngine = new index_1.PlaybackHistoryEngine(50); // Max 50 history entries
        this.songRatingEngine = new index_1.SongRatingEngine();
        this.lookupEngine = new index_1.InstantSongLookupEngine(200); // Initial capacity for 200 songs
        this.autoReplayEngine = new index_1.AutoReplayEngine(autoReplayConfig);
        this.skippedTracker = new index_1.RecentlySkippedTracker(10); // Track last 10 skipped songs
        // Initialize dashboard engine with all sub-engines
        this.dashboardEngine = new index_1.SystemDashboardEngine(this.playlistEngine, this.playbackHistoryEngine, this.songRatingEngine, this.lookupEngine, this.autoReplayEngine, this.skippedTracker);
    }
    // ======= SONG MANAGEMENT =======
    /**
     * Add a song to the system and optionally to the current playlist
     * Time Complexity: O(1) average - hash map insertion + linked list append
     * Space Complexity: O(1)
     */
    addSong(song, addToPlaylist = true) {
        try {
            // Add to lookup system first
            const lookupSuccess = this.lookupEngine.addSong(song);
            if (!lookupSuccess) {
                return false;
            }
            // Optionally add to current playlist
            if (addToPlaylist) {
                this.playlistEngine.addSong(song);
            }
            return true;
        }
        catch (error) {
            console.error('Error adding song:', error);
            return false;
        }
    }
    /**
     * Remove a song from the entire system
     * Time Complexity: O(n) - need to remove from all data structures
     * Space Complexity: O(1)
     */
    removeSong(songId) {
        try {
            const song = this.lookupEngine.getSongById(songId);
            if (!song) {
                return false;
            }
            // Remove from all engines
            this.lookupEngine.removeSong(songId);
            this.playlistEngine.deleteSongBySong(song);
            this.songRatingEngine.deleteSong(songId);
            this.autoReplayEngine.removeSong(songId);
            this.skippedTracker.removeSongFromSkipList(songId);
            return true;
        }
        catch (error) {
            console.error('Error removing song:', error);
            return false;
        }
    }
    /**
     * Get song by ID
     * Time Complexity: O(1) average
     * Space Complexity: O(1)
     */
    getSong(songId) {
        return this.lookupEngine.getSongById(songId);
    }
    /**
     * Search songs with advanced criteria
     * Time Complexity: O(n) - need to check all songs
     * Space Complexity: O(k) where k is the number of matching songs
     */
    searchSongs(criteria) {
        return this.lookupEngine.advancedSearch(criteria);
    }
    // ======= PLAYLIST OPERATIONS =======
    /**
     * Add song to playlist at specific position
     * Time Complexity: O(n) - linked list insertion
     * Space Complexity: O(1)
     */
    addSongToPlaylist(songId, position) {
        const song = this.getSong(songId);
        if (!song) {
            return false;
        }
        if (position !== undefined) {
            return this.playlistEngine.addSongAtPosition(song, position);
        }
        else {
            return this.playlistEngine.addSong(song);
        }
    }
    /**
     * Remove song from playlist by index
     * Time Complexity: O(n) - linked list traversal
     * Space Complexity: O(1)
     */
    removeSongFromPlaylist(index) {
        return this.playlistEngine.deleteSong(index);
    }
    /**
     * Move song within playlist
     * Time Complexity: O(n) - linked list operations
     * Space Complexity: O(1)
     */
    moveSongInPlaylist(fromIndex, toIndex) {
        return this.playlistEngine.moveSong(fromIndex, toIndex);
    }
    /**
     * Reverse entire playlist
     * Time Complexity: O(n) - linked list reversal
     * Space Complexity: O(1)
     */
    reversePlaylist() {
        this.playlistEngine.reversePlaylist();
    }
    /**
     * Sort playlist by criteria
     * Time Complexity: O(n log n) - sorting algorithm
     * Space Complexity: O(n)
     */
    sortPlaylist(criteria, algorithm = 'merge') {
        return this.playlistEngine.sortPlaylist(criteria, algorithm);
    }
    /**
     * Shuffle playlist randomly
     * Time Complexity: O(n) - Fisher-Yates shuffle
     * Space Complexity: O(n)
     */
    shufflePlaylist() {
        return this.playlistEngine.shufflePlaylist();
    }
    /**
     * Get current playlist
     * Time Complexity: O(n) - convert linked list to array
     * Space Complexity: O(n)
     */
    getCurrentPlaylist() {
        return this.playlistEngine.getAllSongs();
    }
    // ======= PLAYBACK OPERATIONS =======
    /**
     * Play a song and track it in history
     * Time Complexity: O(1) - stack push + hash map updates
     * Space Complexity: O(1)
     */
    playSong(songId) {
        try {
            const song = this.getSong(songId);
            if (!song) {
                return false;
            }
            // Find song position in playlist
            const playlist = this.getCurrentPlaylist();
            const position = playlist.findIndex(s => s.id === songId);
            // Record in playback history
            this.playbackHistoryEngine.playSong(song, position);
            // Track for auto-replay
            this.autoReplayEngine.trackPlay(song);
            // Update current playing state
            this.currentPlayingIndex = position;
            this.isPlaying = true;
            return true;
        }
        catch (error) {
            console.error('Error playing song:', error);
            return false;
        }
    }
    /**
     * Skip current song and track it
     * Time Complexity: O(1) - queue enqueue
     * Space Complexity: O(1)
     */
    skipSong(songId) {
        try {
            const song = this.getSong(songId);
            if (!song) {
                return false;
            }
            // Track the skip
            this.skippedTracker.trackSkip(song);
            // Play next song if available
            return this.playNext();
        }
        catch (error) {
            console.error('Error skipping song:', error);
            return false;
        }
    }
    /**
     * Play next song in playlist
     * Time Complexity: O(1) average
     * Space Complexity: O(1)
     */
    playNext() {
        try {
            const playlist = this.getCurrentPlaylist();
            if (this.currentPlayingIndex + 1 < playlist.length) {
                // Play next song in playlist
                const nextSong = playlist[this.currentPlayingIndex + 1];
                return this.playSong(nextSong.id);
            }
            else if (this.autoReplayEngine.shouldAutoReplay()) {
                // End of playlist - trigger auto-replay
                return this.startAutoReplay();
            }
            // End of playlist and no auto-replay
            this.isPlaying = false;
            return false;
        }
        catch (error) {
            console.error('Error playing next song:', error);
            return false;
        }
    }
    /**
     * Play previous song
     * Time Complexity: O(1) average
     * Space Complexity: O(1)
     */
    playPrevious() {
        try {
            const playlist = this.getCurrentPlaylist();
            if (this.currentPlayingIndex > 0) {
                const prevSong = playlist[this.currentPlayingIndex - 1];
                return this.playSong(prevSong.id);
            }
            return false;
        }
        catch (error) {
            console.error('Error playing previous song:', error);
            return false;
        }
    }
    /**
     * Undo last play operation
     * Time Complexity: O(1) - stack pop
     * Space Complexity: O(1)
     */
    undoLastPlay() {
        try {
            const lastPlay = this.playbackHistoryEngine.undoLastPlay();
            if (lastPlay) {
                // Re-add to playlist if it was removed or play it again
                return this.playSong(lastPlay.song.id);
            }
            return false;
        }
        catch (error) {
            console.error('Error undoing last play:', error);
            return false;
        }
    }
    /**
     * Start auto-replay mode with calming songs
     * Time Complexity: O(n log n) - getting and sorting replay songs
     * Space Complexity: O(k) where k is the number of replay songs
     */
    startAutoReplay() {
        try {
            const replaySongs = this.autoReplayEngine.getReplaySongs();
            if (replaySongs.length === 0) {
                return false;
            }
            // Filter out recently skipped songs
            const filteredSongs = this.skippedTracker.filterOutRecentlySkipped(replaySongs);
            if (filteredSongs.length > 0) {
                this.isAutoReplayMode = true;
                return this.playSong(filteredSongs[0].id);
            }
            return false;
        }
        catch (error) {
            console.error('Error starting auto-replay:', error);
            return false;
        }
    }
    // ======= RATING OPERATIONS =======
    /**
     * Rate a song
     * Time Complexity: O(log n) average - BST insertion
     * Space Complexity: O(1)
     */
    rateSong(songId, rating) {
        try {
            const song = this.getSong(songId);
            if (!song) {
                return false;
            }
            const success = this.songRatingEngine.insertSong(song, rating);
            // Update the song object in lookup system
            if (success) {
                song.rating = rating;
                this.lookupEngine.updateSong(song);
            }
            return success;
        }
        catch (error) {
            console.error('Error rating song:', error);
            return false;
        }
    }
    /**
     * Get songs by rating
     * Time Complexity: O(log n) average - BST search
     * Space Complexity: O(k) where k is the number of songs with that rating
     */
    getSongsByRating(rating) {
        return this.songRatingEngine.searchByRating(rating);
    }
    /**
     * Get recommended songs (highly rated)
     * Time Complexity: O(k log k) where k is the number of recommended songs
     * Space Complexity: O(k)
     */
    getRecommendedSongs(limit) {
        return this.songRatingEngine.getRecommendedSongs(limit);
    }
    // ======= DASHBOARD AND ANALYTICS =======
    /**
     * Get live dashboard snapshot
     * Time Complexity: O(n log n) - sorting operations
     * Space Complexity: O(n)
     */
    getDashboard() {
        return this.dashboardEngine.getLiveDashboard();
    }
    /**
     * Export complete system snapshot
     * Time Complexity: O(n log n) - comprehensive data aggregation
     * Space Complexity: O(n)
     */
    exportSnapshot() {
        return this.dashboardEngine.exportSnapshot();
    }
    /**
     * Get system performance metrics
     * Time Complexity: O(1) - metadata collection
     * Space Complexity: O(1)
     */
    getPerformanceMetrics() {
        return this.dashboardEngine.getPerformanceMetrics();
    }
    /**
     * Get personalized recommendations
     * Time Complexity: O(n log n) - analysis and sorting
     * Space Complexity: O(k) where k is the number of recommendations
     */
    getPersonalizedRecommendations() {
        return this.dashboardEngine.generateRecommendations();
    }
    // ======= CONFIGURATION =======
    /**
     * Update auto-replay configuration
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    updateAutoReplayConfig(config) {
        this.autoReplayEngine.updateConfig(config);
    }
    /**
     * Update skip tracking settings
     * Time Complexity: O(n) if reducing size
     * Space Complexity: O(1)
     */
    updateSkipTrackingSize(newSize) {
        this.skippedTracker.updateMaxHistorySize(newSize);
    }
    // ======= UTILITY METHODS =======
    /**
     * Get current playing song
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getCurrentlyPlaying() {
        if (this.currentPlayingIndex >= 0) {
            const playlist = this.getCurrentPlaylist();
            return playlist[this.currentPlayingIndex] || null;
        }
        return null;
    }
    /**
     * Check if system is currently playing
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isCurrentlyPlaying() {
        return this.isPlaying;
    }
    /**
     * Check if in auto-replay mode
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isInAutoReplayMode() {
        return this.isAutoReplayMode;
    }
    /**
     * Get comprehensive system status
     * Time Complexity: O(n) - aggregating from multiple engines
     * Space Complexity: O(1)
     */
    getSystemStatus() {
        return {
            currentlyPlaying: this.getCurrentlyPlaying(),
            isPlaying: this.isPlaying,
            isAutoReplay: this.isAutoReplayMode,
            playlistSize: this.playlistEngine.getSize(),
            totalSongs: this.lookupEngine.getCount(),
            historySize: this.playbackHistoryEngine.getHistorySize(),
            ratedSongs: this.songRatingEngine.getTotalRatedSongs(),
            recentSkips: this.skippedTracker.getSkipStats().currentHistorySize,
            systemStats: this.dashboardEngine.getSystemStats()
        };
    }
    /**
     * Reset entire system (for testing or fresh start)
     * Time Complexity: O(1) - clearing all data structures
     * Space Complexity: O(1)
     */
    resetSystem() {
        try {
            this.playlistEngine.clearPlaylist();
            this.playbackHistoryEngine.clearHistory();
            this.songRatingEngine.clearAllRatings();
            this.lookupEngine.clearAll();
            this.autoReplayEngine.clearAll();
            this.skippedTracker.clearSkipHistory();
            this.currentPlayingIndex = -1;
            this.isPlaying = false;
            this.isAutoReplayMode = false;
        }
        catch (error) {
            console.error('Error resetting system:', error);
        }
    }
}
exports.PlayWiseEngine = PlayWiseEngine;
//# sourceMappingURL=PlayWiseEngine.js.map