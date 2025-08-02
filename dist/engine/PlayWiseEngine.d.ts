import { Song, SortCriteria, AutoReplayConfig } from '../types';
/**
 * PlayWise Core Engine
 * Main orchestrator that coordinates all sub-engines and provides unified API
 * Implements all required functionality with proper data structure integration
 *
 * This is the main entry point for all PlayWise operations
 */
export declare class PlayWiseEngine {
    private playlistEngine;
    private playbackHistoryEngine;
    private songRatingEngine;
    private lookupEngine;
    private autoReplayEngine;
    private skippedTracker;
    private dashboardEngine;
    private currentPlayingIndex;
    private isPlaying;
    private isAutoReplayMode;
    constructor(playlistId?: string, playlistName?: string, autoReplayConfig?: AutoReplayConfig);
    /**
     * Add a song to the system and optionally to the current playlist
     * Time Complexity: O(1) average - hash map insertion + linked list append
     * Space Complexity: O(1)
     */
    addSong(song: Song, addToPlaylist?: boolean): boolean;
    /**
     * Remove a song from the entire system
     * Time Complexity: O(n) - need to remove from all data structures
     * Space Complexity: O(1)
     */
    removeSong(songId: string): boolean;
    /**
     * Get song by ID
     * Time Complexity: O(1) average
     * Space Complexity: O(1)
     */
    getSong(songId: string): Song | null;
    /**
     * Search songs with advanced criteria
     * Time Complexity: O(n) - need to check all songs
     * Space Complexity: O(k) where k is the number of matching songs
     */
    searchSongs(criteria: {
        title?: string;
        artist?: string;
        genre?: string;
        minRating?: number;
        maxRating?: number;
        minDuration?: number;
        maxDuration?: number;
    }): Song[];
    /**
     * Add song to playlist at specific position
     * Time Complexity: O(n) - linked list insertion
     * Space Complexity: O(1)
     */
    addSongToPlaylist(songId: string, position?: number): boolean;
    /**
     * Remove song from playlist by index
     * Time Complexity: O(n) - linked list traversal
     * Space Complexity: O(1)
     */
    removeSongFromPlaylist(index: number): Song | null;
    /**
     * Move song within playlist
     * Time Complexity: O(n) - linked list operations
     * Space Complexity: O(1)
     */
    moveSongInPlaylist(fromIndex: number, toIndex: number): boolean;
    /**
     * Reverse entire playlist
     * Time Complexity: O(n) - linked list reversal
     * Space Complexity: O(1)
     */
    reversePlaylist(): void;
    /**
     * Sort playlist by criteria
     * Time Complexity: O(n log n) - sorting algorithm
     * Space Complexity: O(n)
     */
    sortPlaylist(criteria: SortCriteria, algorithm?: 'merge' | 'quick'): boolean;
    /**
     * Shuffle playlist randomly
     * Time Complexity: O(n) - Fisher-Yates shuffle
     * Space Complexity: O(n)
     */
    shufflePlaylist(): boolean;
    /**
     * Get current playlist
     * Time Complexity: O(n) - convert linked list to array
     * Space Complexity: O(n)
     */
    getCurrentPlaylist(): Song[];
    /**
     * Play a song and track it in history
     * Time Complexity: O(1) - stack push + hash map updates
     * Space Complexity: O(1)
     */
    playSong(songId: string): boolean;
    /**
     * Skip current song and track it
     * Time Complexity: O(1) - queue enqueue
     * Space Complexity: O(1)
     */
    skipSong(songId: string): boolean;
    /**
     * Play next song in playlist
     * Time Complexity: O(1) average
     * Space Complexity: O(1)
     */
    playNext(): boolean;
    /**
     * Play previous song
     * Time Complexity: O(1) average
     * Space Complexity: O(1)
     */
    playPrevious(): boolean;
    /**
     * Undo last play operation
     * Time Complexity: O(1) - stack pop
     * Space Complexity: O(1)
     */
    undoLastPlay(): boolean;
    /**
     * Start auto-replay mode with calming songs
     * Time Complexity: O(n log n) - getting and sorting replay songs
     * Space Complexity: O(k) where k is the number of replay songs
     */
    startAutoReplay(): boolean;
    /**
     * Rate a song
     * Time Complexity: O(log n) average - BST insertion
     * Space Complexity: O(1)
     */
    rateSong(songId: string, rating: number): boolean;
    /**
     * Get songs by rating
     * Time Complexity: O(log n) average - BST search
     * Space Complexity: O(k) where k is the number of songs with that rating
     */
    getSongsByRating(rating: number): Song[];
    /**
     * Get recommended songs (highly rated)
     * Time Complexity: O(k log k) where k is the number of recommended songs
     * Space Complexity: O(k)
     */
    getRecommendedSongs(limit?: number): Song[];
    /**
     * Get live dashboard snapshot
     * Time Complexity: O(n log n) - sorting operations
     * Space Complexity: O(n)
     */
    getDashboard(): import("../types").DashboardSnapshot;
    /**
     * Export complete system snapshot
     * Time Complexity: O(n log n) - comprehensive data aggregation
     * Space Complexity: O(n)
     */
    exportSnapshot(): {
        basicSnapshot: import("../types").DashboardSnapshot;
        extendedStats: {
            songs: {
                total: number;
                rated: number;
                unrated: number;
                averageRating: number;
                averageDuration: number;
            };
            playback: {
                totalPlays: number;
                uniqueSongsPlayed: number;
                totalListeningTime: number;
            };
            skipping: {
                totalSkips: number;
                uniqueSongsSkipped: number;
                skipRate: number;
            };
            playlists: {
                totalPlaylists: number;
                totalSongsInPlaylists: number;
            };
            autoReplay: {
                enabled: boolean;
                trackedSongs: number;
                totalPlays: number;
            };
        };
        topAnalytics: {
            mostPlayed: Array<{
                song: Song;
                playCount: number;
            }>;
            mostSkipped: Array<{
                song: Song;
                skipCount: number;
            }>;
            topRated: Song[];
            autoReplaySongs: Song[];
            recentlySkipped: Array<{
                song: Song;
                skippedAt: Date;
            }>;
        };
        engineStats: {
            lookup: any;
            playlist: any;
            playback: any;
            rating: any;
            autoReplay: any;
            skipping: any;
        };
        exportedAt: Date;
    };
    /**
     * Get system performance metrics
     * Time Complexity: O(1) - metadata collection
     * Space Complexity: O(1)
     */
    getPerformanceMetrics(): {
        memoryUsage: {
            totalSongs: number;
            playlistSize: number;
            historySize: number;
            ratedSongs: number;
            skipHistorySize: number;
        };
        operationalStats: {
            lookupEfficiency: number;
            treeHeight: number;
            cacheHitRate: number;
        };
    };
    /**
     * Get personalized recommendations
     * Time Complexity: O(n log n) - analysis and sorting
     * Space Complexity: O(k) where k is the number of recommendations
     */
    getPersonalizedRecommendations(): {
        suggestedRatings: Song[];
        popularUnrated: Song[];
        undervalued: Song[];
        overlooked: Song[];
    };
    /**
     * Update auto-replay configuration
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    updateAutoReplayConfig(config: Partial<AutoReplayConfig>): void;
    /**
     * Update skip tracking settings
     * Time Complexity: O(n) if reducing size
     * Space Complexity: O(1)
     */
    updateSkipTrackingSize(newSize: number): void;
    /**
     * Get current playing song
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getCurrentlyPlaying(): Song | null;
    /**
     * Check if system is currently playing
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isCurrentlyPlaying(): boolean;
    /**
     * Check if in auto-replay mode
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isInAutoReplayMode(): boolean;
    /**
     * Get comprehensive system status
     * Time Complexity: O(n) - aggregating from multiple engines
     * Space Complexity: O(1)
     */
    getSystemStatus(): {
        currentlyPlaying: Song | null;
        isPlaying: boolean;
        isAutoReplay: boolean;
        playlistSize: number;
        totalSongs: number;
        historySize: number;
        ratedSongs: number;
        recentSkips: number;
        systemStats: {
            songs: {
                total: number;
                rated: number;
                unrated: number;
                averageRating: number;
                averageDuration: number;
            };
            playback: {
                totalPlays: number;
                uniqueSongsPlayed: number;
                totalListeningTime: number;
            };
            skipping: {
                totalSkips: number;
                uniqueSongsSkipped: number;
                skipRate: number;
            };
            playlists: {
                totalPlaylists: number;
                totalSongsInPlaylists: number;
            };
            autoReplay: {
                enabled: boolean;
                trackedSongs: number;
                totalPlays: number;
            };
        };
    };
    /**
     * Reset entire system (for testing or fresh start)
     * Time Complexity: O(1) - clearing all data structures
     * Space Complexity: O(1)
     */
    resetSystem(): void;
}
//# sourceMappingURL=PlayWiseEngine.d.ts.map