import { Song, SkippedSong } from '../types';
/**
 * Recently Skipped Tracker Engine
 * Maintains a record of recently skipped songs to prevent them from auto-playing
 * Uses circular buffer with sliding window for efficient memory usage
 *
 * Time Complexity Analysis:
 * - track_skip: O(1) - queue enqueue operation
 * - is_recently_skipped: O(n) where n is the max skip history size
 * - remove_from_skip_list: O(n) - need to search through skip history
 * - get_skip_history: O(n) - convert queue to array
 *
 * Space Complexity: O(k) where k is the maximum skip history size
 */
export declare class RecentlySkippedTracker {
    private skippedQueue;
    private maxSkipHistorySize;
    private skipCountMap;
    constructor(maxSkipHistorySize?: number);
    /**
     * Track a song skip
     * Time Complexity: O(1) - queue enqueue operation
     * Space Complexity: O(1)
     */
    trackSkip(song: Song): void;
    /**
     * Check if a song was recently skipped
     * Time Complexity: O(n) where n is the current skip history size
     * Space Complexity: O(1)
     */
    isRecentlySkipped(songId: string): boolean;
    /**
     * Check if a song was skipped within a specific time window
     * Time Complexity: O(n) where n is the current skip history size
     * Space Complexity: O(1)
     */
    isSkippedWithinTimeWindow(songId: string, windowMinutes: number): boolean;
    /**
     * Get complete skip history (most recent first)
     * Time Complexity: O(n) - convert queue to array and reverse
     * Space Complexity: O(n)
     */
    getSkipHistory(): SkippedSong[];
    /**
     * Get recently skipped songs (last N)
     * Time Complexity: O(min(n, limit))
     * Space Complexity: O(min(n, limit))
     */
    getRecentlySkippedSongs(limit?: number): SkippedSong[];
    /**
     * Get skip count for a specific song
     * Time Complexity: O(1) - map lookup
     * Space Complexity: O(1)
     */
    getSkipCount(songId: string): number;
    /**
     * Get songs skipped within the last N minutes
     * Time Complexity: O(n)
     * Space Complexity: O(k) where k is the number of matching songs
     */
    getSongsSkippedInLastMinutes(minutes: number): SkippedSong[];
    /**
     * Get most frequently skipped songs
     * Time Complexity: O(k log k) where k is the number of unique skipped songs
     * Space Complexity: O(k)
     */
    getMostSkippedSongs(limit?: number): Array<{
        song: Song;
        skipCount: number;
    }>;
    /**
     * Remove a song from the skip tracking (for explicit user requests)
     * Time Complexity: O(n) - need to rebuild queue without the song
     * Space Complexity: O(n)
     */
    removeSongFromSkipList(songId: string): boolean;
    /**
     * Filter out recently skipped songs from a given list
     * Time Complexity: O(m) where m is the number of songs to filter
     * Space Complexity: O(k) where k is the number of non-skipped songs
     */
    filterOutRecentlySkipped(songs: Song[]): Song[];
    /**
     * Filter out songs skipped within a time window
     * Time Complexity: O(m * n) where m is songs to filter, n is skip history size
     * Space Complexity: O(k) where k is the number of non-skipped songs
     */
    filterOutSkippedInTimeWindow(songs: Song[], windowMinutes: number): Song[];
    /**
     * Get skip statistics
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    getSkipStats(): {
        totalSkipsTracked: number;
        uniqueSongsSkipped: number;
        averageSkipsPerSong: number;
        oldestSkipTime: Date | null;
        newestSkipTime: Date | null;
        maxHistorySize: number;
        currentHistorySize: number;
    };
    /**
     * Clear all skip history
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    clearSkipHistory(): void;
    /**
     * Update maximum skip history size
     * Time Complexity: O(n) if reducing size (need to trim history)
     * Space Complexity: O(1)
     */
    updateMaxHistorySize(newSize: number): void;
    /**
     * Get current maximum history size
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getMaxHistorySize(): number;
    /**
     * Check if skip history is empty
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty(): boolean;
    /**
     * Check if skip history is at maximum capacity
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isFull(): boolean;
    /**
     * Export skip tracking data for analysis
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    exportSkipData(): {
        skipHistory: SkippedSong[];
        skipCounts: Record<string, number>;
        stats: {
            totalSkipsTracked: number;
            uniqueSongsSkipped: number;
            averageSkipsPerSong: number;
            oldestSkipTime: Date | null;
            newestSkipTime: Date | null;
            maxHistorySize: number;
            currentHistorySize: number;
        };
        exportedAt: Date;
    };
}
//# sourceMappingURL=RecentlySkippedTracker.d.ts.map