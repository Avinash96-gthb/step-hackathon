"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentlySkippedTracker = void 0;
const dataStructures_1 = require("../dataStructures");
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
class RecentlySkippedTracker {
    constructor(maxSkipHistorySize = 10) {
        this.maxSkipHistorySize = maxSkipHistorySize;
        this.skippedQueue = new dataStructures_1.Queue(maxSkipHistorySize);
        this.skipCountMap = new Map();
    }
    /**
     * Track a song skip
     * Time Complexity: O(1) - queue enqueue operation
     * Space Complexity: O(1)
     */
    trackSkip(song) {
        try {
            const skippedSong = {
                song,
                skippedAt: new Date()
            };
            // If queue is full, the oldest entry will be automatically removed
            const removedSong = this.skippedQueue.isFull() ? this.skippedQueue.peek() : null;
            this.skippedQueue.enqueue(skippedSong);
            // Update skip count
            const currentCount = this.skipCountMap.get(song.id) || 0;
            this.skipCountMap.set(song.id, currentCount + 1);
            // If we removed an old entry, decrease its skip count
            if (removedSong) {
                const oldCount = this.skipCountMap.get(removedSong.song.id) || 0;
                if (oldCount > 1) {
                    this.skipCountMap.set(removedSong.song.id, oldCount - 1);
                }
                else {
                    this.skipCountMap.delete(removedSong.song.id);
                }
            }
        }
        catch (error) {
            console.error('Error tracking song skip:', error);
        }
    }
    /**
     * Check if a song was recently skipped
     * Time Complexity: O(n) where n is the current skip history size
     * Space Complexity: O(1)
     */
    isRecentlySkipped(songId) {
        try {
            return this.skipCountMap.has(songId);
        }
        catch (error) {
            console.error('Error checking if song was recently skipped:', error);
            return false;
        }
    }
    /**
     * Check if a song was skipped within a specific time window
     * Time Complexity: O(n) where n is the current skip history size
     * Space Complexity: O(1)
     */
    isSkippedWithinTimeWindow(songId, windowMinutes) {
        try {
            const cutoffTime = new Date(Date.now() - windowMinutes * 60 * 1000);
            const skipHistory = this.skippedQueue.toArray();
            return skipHistory.some(skippedSong => skippedSong.song.id === songId && skippedSong.skippedAt >= cutoffTime);
        }
        catch (error) {
            console.error('Error checking if song was skipped within time window:', error);
            return false;
        }
    }
    /**
     * Get complete skip history (most recent first)
     * Time Complexity: O(n) - convert queue to array and reverse
     * Space Complexity: O(n)
     */
    getSkipHistory() {
        try {
            const history = this.skippedQueue.toArray();
            return history.reverse(); // Most recent first
        }
        catch (error) {
            console.error('Error getting skip history:', error);
            return [];
        }
    }
    /**
     * Get recently skipped songs (last N)
     * Time Complexity: O(min(n, limit))
     * Space Complexity: O(min(n, limit))
     */
    getRecentlySkippedSongs(limit) {
        try {
            const history = this.getSkipHistory();
            return limit ? history.slice(0, limit) : history;
        }
        catch (error) {
            console.error('Error getting recently skipped songs:', error);
            return [];
        }
    }
    /**
     * Get skip count for a specific song
     * Time Complexity: O(1) - map lookup
     * Space Complexity: O(1)
     */
    getSkipCount(songId) {
        return this.skipCountMap.get(songId) || 0;
    }
    /**
     * Get songs skipped within the last N minutes
     * Time Complexity: O(n)
     * Space Complexity: O(k) where k is the number of matching songs
     */
    getSongsSkippedInLastMinutes(minutes) {
        try {
            const cutoffTime = new Date(Date.now() - minutes * 60 * 1000);
            const skipHistory = this.skippedQueue.toArray();
            return skipHistory.filter(skippedSong => skippedSong.skippedAt >= cutoffTime);
        }
        catch (error) {
            console.error('Error getting songs skipped in last minutes:', error);
            return [];
        }
    }
    /**
     * Get most frequently skipped songs
     * Time Complexity: O(k log k) where k is the number of unique skipped songs
     * Space Complexity: O(k)
     */
    getMostSkippedSongs(limit = 5) {
        try {
            const skipCounts = [];
            const processedSongs = new Set();
            // Get unique songs from skip history with their counts
            for (const skippedSong of this.skippedQueue.toArray()) {
                if (!processedSongs.has(skippedSong.song.id)) {
                    processedSongs.add(skippedSong.song.id);
                    const skipCount = this.getSkipCount(skippedSong.song.id);
                    skipCounts.push({ song: skippedSong.song, skipCount });
                }
            }
            // Sort by skip count (descending)
            skipCounts.sort((a, b) => b.skipCount - a.skipCount);
            return skipCounts.slice(0, limit);
        }
        catch (error) {
            console.error('Error getting most skipped songs:', error);
            return [];
        }
    }
    /**
     * Remove a song from the skip tracking (for explicit user requests)
     * Time Complexity: O(n) - need to rebuild queue without the song
     * Space Complexity: O(n)
     */
    removeSongFromSkipList(songId) {
        try {
            const currentHistory = this.skippedQueue.toArray();
            const filteredHistory = currentHistory.filter(skippedSong => skippedSong.song.id !== songId);
            if (filteredHistory.length === currentHistory.length) {
                return false; // Song was not in the skip list
            }
            // Rebuild the queue without the specified song
            this.skippedQueue.clear();
            for (const skippedSong of filteredHistory) {
                this.skippedQueue.enqueue(skippedSong);
            }
            // Remove from skip count map
            this.skipCountMap.delete(songId);
            return true;
        }
        catch (error) {
            console.error('Error removing song from skip list:', error);
            return false;
        }
    }
    /**
     * Filter out recently skipped songs from a given list
     * Time Complexity: O(m) where m is the number of songs to filter
     * Space Complexity: O(k) where k is the number of non-skipped songs
     */
    filterOutRecentlySkipped(songs) {
        try {
            return songs.filter(song => !this.isRecentlySkipped(song.id));
        }
        catch (error) {
            console.error('Error filtering out recently skipped songs:', error);
            return songs; // Return original list if error occurs
        }
    }
    /**
     * Filter out songs skipped within a time window
     * Time Complexity: O(m * n) where m is songs to filter, n is skip history size
     * Space Complexity: O(k) where k is the number of non-skipped songs
     */
    filterOutSkippedInTimeWindow(songs, windowMinutes) {
        try {
            return songs.filter(song => !this.isSkippedWithinTimeWindow(song.id, windowMinutes));
        }
        catch (error) {
            console.error('Error filtering out songs skipped in time window:', error);
            return songs;
        }
    }
    /**
     * Get skip statistics
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    getSkipStats() {
        try {
            const skipHistory = this.skippedQueue.toArray();
            const totalSkips = skipHistory.length;
            const uniqueSongs = this.skipCountMap.size;
            let oldestSkipTime = null;
            let newestSkipTime = null;
            if (skipHistory.length > 0) {
                const sortedByTime = [...skipHistory].sort((a, b) => a.skippedAt.getTime() - b.skippedAt.getTime());
                oldestSkipTime = sortedByTime[0].skippedAt;
                newestSkipTime = sortedByTime[sortedByTime.length - 1].skippedAt;
            }
            return {
                totalSkipsTracked: totalSkips,
                uniqueSongsSkipped: uniqueSongs,
                averageSkipsPerSong: uniqueSongs > 0 ? totalSkips / uniqueSongs : 0,
                oldestSkipTime,
                newestSkipTime,
                maxHistorySize: this.maxSkipHistorySize,
                currentHistorySize: this.skippedQueue.size()
            };
        }
        catch (error) {
            console.error('Error getting skip statistics:', error);
            return {
                totalSkipsTracked: 0,
                uniqueSongsSkipped: 0,
                averageSkipsPerSong: 0,
                oldestSkipTime: null,
                newestSkipTime: null,
                maxHistorySize: this.maxSkipHistorySize,
                currentHistorySize: 0
            };
        }
    }
    /**
     * Clear all skip history
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    clearSkipHistory() {
        try {
            this.skippedQueue.clear();
            this.skipCountMap.clear();
        }
        catch (error) {
            console.error('Error clearing skip history:', error);
        }
    }
    /**
     * Update maximum skip history size
     * Time Complexity: O(n) if reducing size (need to trim history)
     * Space Complexity: O(1)
     */
    updateMaxHistorySize(newSize) {
        try {
            if (newSize < 1) {
                throw new Error('Max history size must be at least 1');
            }
            this.maxSkipHistorySize = newSize;
            // If reducing size, need to rebuild queue with new capacity
            if (this.skippedQueue.size() > newSize) {
                const currentHistory = this.skippedQueue.toArray();
                const trimmedHistory = currentHistory.slice(-newSize); // Keep the most recent entries
                this.skippedQueue = new dataStructures_1.Queue(newSize);
                // Rebuild skip count map for trimmed history
                this.skipCountMap.clear();
                for (const skippedSong of trimmedHistory) {
                    this.skippedQueue.enqueue(skippedSong);
                    const currentCount = this.skipCountMap.get(skippedSong.song.id) || 0;
                    this.skipCountMap.set(skippedSong.song.id, currentCount + 1);
                }
            }
            else {
                // Just update the queue's max size (create new queue with current data)
                const currentHistory = this.skippedQueue.toArray();
                this.skippedQueue = new dataStructures_1.Queue(newSize);
                for (const skippedSong of currentHistory) {
                    this.skippedQueue.enqueue(skippedSong);
                }
            }
        }
        catch (error) {
            console.error('Error updating max history size:', error);
        }
    }
    /**
     * Get current maximum history size
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getMaxHistorySize() {
        return this.maxSkipHistorySize;
    }
    /**
     * Check if skip history is empty
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty() {
        return this.skippedQueue.isEmpty();
    }
    /**
     * Check if skip history is at maximum capacity
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isFull() {
        return this.skippedQueue.isFull();
    }
    /**
     * Export skip tracking data for analysis
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    exportSkipData() {
        try {
            const skipCounts = {};
            for (const [songId, count] of this.skipCountMap.entries()) {
                skipCounts[songId] = count;
            }
            return {
                skipHistory: this.getSkipHistory(),
                skipCounts,
                stats: this.getSkipStats(),
                exportedAt: new Date()
            };
        }
        catch (error) {
            console.error('Error exporting skip data:', error);
            return {
                skipHistory: [],
                skipCounts: {},
                stats: {
                    totalSkipsTracked: 0,
                    uniqueSongsSkipped: 0,
                    averageSkipsPerSong: 0,
                    oldestSkipTime: null,
                    newestSkipTime: null,
                    maxHistorySize: this.maxSkipHistorySize,
                    currentHistorySize: 0
                },
                exportedAt: new Date()
            };
        }
    }
}
exports.RecentlySkippedTracker = RecentlySkippedTracker;
//# sourceMappingURL=RecentlySkippedTracker.js.map