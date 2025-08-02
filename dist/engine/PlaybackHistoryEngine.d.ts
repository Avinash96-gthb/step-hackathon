import { Song, PlaybackEntry } from '../types';
/**
 * Playback History Engine using Stack
 * Manages playback history with undo functionality using LIFO (Last In, First Out) behavior
 *
 * Time Complexity Analysis:
 * - play_song: O(1) - push to stack
 * - undo_last_play: O(1) - pop from stack
 * - get_history: O(n) - convert stack to array
 * - clear_history: O(1) - clear stack
 *
 * Space Complexity: O(n) where n is the maximum history size
 */
export declare class PlaybackHistoryEngine {
    private playbackStack;
    private maxHistorySize;
    constructor(maxHistorySize?: number);
    /**
     * Record a song play in the history
     * Time Complexity: O(1) - stack push operation
     * Space Complexity: O(1)
     */
    playSong(song: Song, playlistPosition?: number): PlaybackEntry;
    /**
     * Undo the last played song (returns it for re-queuing)
     * Time Complexity: O(1) - stack pop operation
     * Space Complexity: O(1)
     */
    undoLastPlay(): PlaybackEntry | null;
    /**
     * Get the last played song without removing it
     * Time Complexity: O(1) - stack peek operation
     * Space Complexity: O(1)
     */
    getLastPlayed(): PlaybackEntry | null;
    /**
     * Get complete playback history (most recent first)
     * Time Complexity: O(n) - convert stack to array
     * Space Complexity: O(n) - create new array
     */
    getPlaybackHistory(limit?: number): PlaybackEntry[];
    /**
     * Get recent playback history (last N songs)
     * Time Complexity: O(min(n, limit))
     * Space Complexity: O(min(n, limit))
     */
    getRecentHistory(limit?: number): PlaybackEntry[];
    /**
     * Get playback history for a specific time range
     * Time Complexity: O(n) - need to check all entries
     * Space Complexity: O(k) where k is the number of matching entries
     */
    getHistoryByTimeRange(startTime: Date, endTime: Date): PlaybackEntry[];
    /**
     * Get playback history for a specific song
     * Time Complexity: O(n) - need to check all entries
     * Space Complexity: O(k) where k is the number of matching entries
     */
    getHistoryForSong(songId: string): PlaybackEntry[];
    /**
     * Get most frequently played songs
     * Time Complexity: O(n) - need to count all plays
     * Space Complexity: O(k) where k is the number of unique songs
     */
    getMostPlayedSongs(limit?: number): Array<{
        song: Song;
        playCount: number;
    }>;
    /**
     * Get playback statistics
     * Time Complexity: O(n) - need to analyze all entries
     * Space Complexity: O(1)
     */
    getPlaybackStats(): {
        totalPlays: number;
        uniqueSongs: number;
        averagePlaysPerSong: number;
        firstPlayTime: Date | null;
        lastPlayTime: Date | null;
        totalListeningTime: number;
    };
    /**
     * Clear all playback history
     * Time Complexity: O(1) - stack clear operation
     * Space Complexity: O(1)
     */
    clearHistory(): void;
    /**
     * Check if history is empty
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty(): boolean;
    /**
     * Get current history size
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getHistorySize(): number;
    /**
     * Get maximum history capacity
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getMaxHistorySize(): number;
    /**
     * Check if a song was recently played
     * Time Complexity: O(min(n, limit))
     * Space Complexity: O(1)
     */
    wasRecentlyPlayed(songId: string, withinLastN?: number): boolean;
    /**
     * Get songs played in the last N minutes
     * Time Complexity: O(n)
     * Space Complexity: O(k) where k is the number of matching entries
     */
    getSongsPlayedInLastMinutes(minutes: number): PlaybackEntry[];
    /**
     * Export playback history for analysis
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    exportHistoryData(): {
        history: PlaybackEntry[];
        stats: {
            totalPlays: number;
            uniqueSongs: number;
            averagePlaysPerSong: number;
            firstPlayTime: Date | null;
            lastPlayTime: Date | null;
            totalListeningTime: number;
        };
        mostPlayed: Array<{
            song: Song;
            playCount: number;
        }>;
        exportedAt: Date;
    };
}
//# sourceMappingURL=PlaybackHistoryEngine.d.ts.map