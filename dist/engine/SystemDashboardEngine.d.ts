import { Song, DashboardSnapshot, PlaybackEntry } from '../types';
import { PlaylistEngine } from './PlaylistEngine';
import { PlaybackHistoryEngine } from './PlaybackHistoryEngine';
import { SongRatingEngine } from './SongRatingEngine';
import { InstantSongLookupEngine } from './InstantSongLookupEngine';
import { AutoReplayEngine } from './AutoReplayEngine';
import { RecentlySkippedTracker } from './RecentlySkippedTracker';
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
export declare class SystemDashboardEngine {
    private playlistEngine;
    private playbackHistoryEngine;
    private songRatingEngine;
    private lookupEngine;
    private autoReplayEngine;
    private skippedTracker;
    constructor(playlistEngine: PlaylistEngine, playbackHistoryEngine: PlaybackHistoryEngine, songRatingEngine: SongRatingEngine, lookupEngine: InstantSongLookupEngine, autoReplayEngine: AutoReplayEngine, skippedTracker: RecentlySkippedTracker);
    /**
     * Get top N longest songs from the system
     * Time Complexity: O(n log n) - sorting by duration
     * Space Complexity: O(n)
     */
    getTopLongestSongs(limit?: number): Song[];
    /**
     * Get most recently played songs
     * Time Complexity: O(k) where k is the limit
     * Space Complexity: O(k)
     */
    getMostRecentlyPlayed(limit?: number): PlaybackEntry[];
    /**
     * Get song count by rating
     * Time Complexity: O(1) - already maintained by rating engine
     * Space Complexity: O(1)
     */
    getSongCountByRating(): Record<number, number>;
    /**
     * Get total number of songs in the system
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getTotalSongs(): number;
    /**
     * Get total number of playlists (simplified - assuming single playlist for now)
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getTotalPlaylists(): number;
    /**
     * Get average rating across all songs
     * Time Complexity: O(n) - calculated by rating engine
     * Space Complexity: O(1)
     */
    getAverageRating(): number;
    /**
     * Get most played songs across the system
     * Time Complexity: O(n log n) - sorting by play count
     * Space Complexity: O(k) where k is the limit
     */
    getMostPlayedSongs(limit?: number): Array<{
        song: Song;
        playCount: number;
    }>;
    /**
     * Get most skipped songs
     * Time Complexity: O(k log k) where k is unique skipped songs
     * Space Complexity: O(k)
     */
    getMostSkippedSongs(limit?: number): Array<{
        song: Song;
        skipCount: number;
    }>;
    /**
     * Get top-rated songs
     * Time Complexity: O(k) where k is the number of top-rated songs
     * Space Complexity: O(k)
     */
    getTopRatedSongs(limit?: number): Song[];
    /**
     * Get songs recommended for auto-replay
     * Time Complexity: O(n log n) - sorting by play count
     * Space Complexity: O(k) where k is the number of recommended songs
     */
    getAutoReplaySongs(): Song[];
    /**
     * Get recently skipped songs
     * Time Complexity: O(k) where k is the limit
     * Space Complexity: O(k)
     */
    getRecentlySkippedSongs(limit?: number): Array<{
        song: Song;
        skippedAt: Date;
    }>;
    /**
     * Get comprehensive system statistics
     * Time Complexity: O(n) - aggregating from multiple engines
     * Space Complexity: O(1)
     */
    getSystemStats(): {
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
    /**
     * Get live dashboard snapshot
     * Time Complexity: O(n log n) - dominated by sorting operations
     * Space Complexity: O(n)
     */
    getLiveDashboard(): DashboardSnapshot;
    /**
     * Export comprehensive system snapshot for analysis
     * Time Complexity: O(n log n) - sorting operations across multiple data sets
     * Space Complexity: O(n)
     */
    exportSnapshot(): {
        basicSnapshot: DashboardSnapshot;
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
     * Get performance metrics for all engines
     * Time Complexity: O(1) - just collecting metadata
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
     * Generate recommendations based on system analysis
     * Time Complexity: O(n log n) - sorting and analysis
     * Space Complexity: O(k) where k is the number of recommendations
     */
    generateRecommendations(): {
        suggestedRatings: Song[];
        popularUnrated: Song[];
        undervalued: Song[];
        overlooked: Song[];
    };
}
//# sourceMappingURL=SystemDashboardEngine.d.ts.map