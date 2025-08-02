import { Song, AutoReplayConfig } from '../types';
/**
 * Auto Replay Engine for Genre-based Mood Management
 * Automatically loops top played calming songs when playlist ends
 *
 * Time Complexity Analysis:
 * - track_play: O(1) - hash map insertion
 * - should_auto_replay: O(1) - simple checks
 * - get_replay_songs: O(n log n) - sorting by play count
 * - update_config: O(1) - configuration update
 *
 * Space Complexity: O(n) where n is the number of unique songs
 */
export declare class AutoReplayEngine {
    private config;
    private songPlayCounts;
    private songGenreMap;
    private songObjectMap;
    constructor(config?: AutoReplayConfig);
    /**
     * Track a song play for auto-replay calculations
     * Time Complexity: O(1) - hash map operations
     * Space Complexity: O(1)
     */
    trackPlay(song: Song): void;
    /**
     * Check if auto-replay should be triggered
     * Time Complexity: O(1) - configuration check
     * Space Complexity: O(1)
     */
    shouldAutoReplay(): boolean;
    /**
     * Get songs for auto-replay (top played calming songs)
     * Time Complexity: O(n log n) - sorting by play count
     * Space Complexity: O(k) where k is the number of calming songs
     */
    getReplaySongs(): Song[];
    /**
     * Get replay songs for a specific genre
     * Time Complexity: O(n log n) - filtering and sorting
     * Space Complexity: O(k) where k is the number of songs in that genre
     */
    getReplaySongsByGenre(genre: string): Song[];
    /**
     * Update auto-replay configuration
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    updateConfig(newConfig: Partial<AutoReplayConfig>): void;
    /**
     * Get current configuration
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getConfig(): AutoReplayConfig;
    /**
     * Add a calming genre to the configuration
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    addCalmingGenre(genre: string): void;
    /**
     * Remove a calming genre from the configuration
     * Time Complexity: O(n) where n is the number of calming genres
     * Space Complexity: O(1)
     */
    removeCalmingGenre(genre: string): boolean;
    /**
     * Check if a genre is considered calming
     * Time Complexity: O(n) where n is the number of calming genres
     * Space Complexity: O(1)
     */
    private isCalmingGenre;
    /**
     * Get most played songs across all genres
     * Time Complexity: O(n log n) - sorting by play count
     * Space Complexity: O(n)
     */
    getMostPlayedSongs(limit?: number): Array<{
        song: Song;
        playCount: number;
    }>;
    /**
     * Get play count for a specific song
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getSongPlayCount(songId: string): number;
    /**
     * Get total play count across all songs
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    getTotalPlayCount(): number;
    /**
     * Get play statistics by genre
     * Time Complexity: O(n)
     * Space Complexity: O(k) where k is the number of unique genres
     */
    getPlayStatsByGenre(): Record<string, {
        songCount: number;
        totalPlays: number;
        avgPlaysPerSong: number;
    }>;
    /**
     * Reset play counts for all songs
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    resetPlayCounts(): void;
    /**
     * Remove song from auto-replay tracking
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    removeSong(songId: string): boolean;
    /**
     * Clear all tracking data
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    clearAll(): void;
    /**
     * Get auto-replay engine statistics
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    getStats(): {
        enabled: boolean;
        totalTrackedSongs: number;
        totalPlays: number;
        calmingGenresCount: number;
        topSongsCount: number;
        playStatsByGenre: Record<string, {
            songCount: number;
            totalPlays: number;
            avgPlaysPerSong: number;
        }>;
    };
}
//# sourceMappingURL=AutoReplayEngine.d.ts.map