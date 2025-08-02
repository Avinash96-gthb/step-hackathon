"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaybackHistoryEngine = void 0;
const dataStructures_1 = require("../dataStructures");
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
class PlaybackHistoryEngine {
    constructor(maxHistorySize = 50) {
        this.maxHistorySize = maxHistorySize;
        this.playbackStack = new dataStructures_1.Stack(maxHistorySize);
    }
    /**
     * Record a song play in the history
     * Time Complexity: O(1) - stack push operation
     * Space Complexity: O(1)
     */
    playSong(song, playlistPosition = -1) {
        const playbackEntry = {
            song,
            timestamp: new Date(),
            position: playlistPosition
        };
        this.playbackStack.push(playbackEntry);
        return playbackEntry;
    }
    /**
     * Undo the last played song (returns it for re-queuing)
     * Time Complexity: O(1) - stack pop operation
     * Space Complexity: O(1)
     */
    undoLastPlay() {
        const lastPlay = this.playbackStack.pop();
        return lastPlay || null;
    }
    /**
     * Get the last played song without removing it
     * Time Complexity: O(1) - stack peek operation
     * Space Complexity: O(1)
     */
    getLastPlayed() {
        const lastPlay = this.playbackStack.peek();
        return lastPlay || null;
    }
    /**
     * Get complete playback history (most recent first)
     * Time Complexity: O(n) - convert stack to array
     * Space Complexity: O(n) - create new array
     */
    getPlaybackHistory(limit) {
        try {
            const history = this.playbackStack.toArray();
            return limit ? history.slice(0, limit) : history;
        }
        catch (error) {
            console.error('Error getting playback history:', error);
            return [];
        }
    }
    /**
     * Get recent playback history (last N songs)
     * Time Complexity: O(min(n, limit))
     * Space Complexity: O(min(n, limit))
     */
    getRecentHistory(limit = 10) {
        try {
            return this.getPlaybackHistory(limit);
        }
        catch (error) {
            console.error('Error getting recent history:', error);
            return [];
        }
    }
    /**
     * Get playback history for a specific time range
     * Time Complexity: O(n) - need to check all entries
     * Space Complexity: O(k) where k is the number of matching entries
     */
    getHistoryByTimeRange(startTime, endTime) {
        try {
            const allHistory = this.getPlaybackHistory();
            return allHistory.filter(entry => entry.timestamp >= startTime && entry.timestamp <= endTime);
        }
        catch (error) {
            console.error('Error getting history by time range:', error);
            return [];
        }
    }
    /**
     * Get playback history for a specific song
     * Time Complexity: O(n) - need to check all entries
     * Space Complexity: O(k) where k is the number of matching entries
     */
    getHistoryForSong(songId) {
        try {
            const allHistory = this.getPlaybackHistory();
            return allHistory.filter(entry => entry.song.id === songId);
        }
        catch (error) {
            console.error('Error getting history for song:', error);
            return [];
        }
    }
    /**
     * Get most frequently played songs
     * Time Complexity: O(n) - need to count all plays
     * Space Complexity: O(k) where k is the number of unique songs
     */
    getMostPlayedSongs(limit = 10) {
        try {
            const allHistory = this.getPlaybackHistory();
            const playCountMap = new Map();
            // Count plays for each song
            for (const entry of allHistory) {
                const songId = entry.song.id;
                if (playCountMap.has(songId)) {
                    playCountMap.get(songId).count++;
                }
                else {
                    playCountMap.set(songId, { song: entry.song, count: 1 });
                }
            }
            // Convert to array and sort by play count
            const sortedSongs = Array.from(playCountMap.values())
                .sort((a, b) => b.count - a.count)
                .slice(0, limit)
                .map(item => ({ song: item.song, playCount: item.count }));
            return sortedSongs;
        }
        catch (error) {
            console.error('Error getting most played songs:', error);
            return [];
        }
    }
    /**
     * Get playback statistics
     * Time Complexity: O(n) - need to analyze all entries
     * Space Complexity: O(1)
     */
    getPlaybackStats() {
        try {
            const allHistory = this.getPlaybackHistory();
            const totalPlays = allHistory.length;
            if (totalPlays === 0) {
                return {
                    totalPlays: 0,
                    uniqueSongs: 0,
                    averagePlaysPerSong: 0,
                    firstPlayTime: null,
                    lastPlayTime: null,
                    totalListeningTime: 0
                };
            }
            const uniqueSongs = new Set(allHistory.map(entry => entry.song.id)).size;
            const averagePlaysPerSong = totalPlays / uniqueSongs;
            const sortedByTime = [...allHistory].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
            const firstPlayTime = sortedByTime[0].timestamp;
            const lastPlayTime = sortedByTime[sortedByTime.length - 1].timestamp;
            const totalListeningTime = allHistory.reduce((sum, entry) => sum + entry.song.duration, 0);
            return {
                totalPlays,
                uniqueSongs,
                averagePlaysPerSong,
                firstPlayTime,
                lastPlayTime,
                totalListeningTime
            };
        }
        catch (error) {
            console.error('Error getting playback stats:', error);
            return {
                totalPlays: 0,
                uniqueSongs: 0,
                averagePlaysPerSong: 0,
                firstPlayTime: null,
                lastPlayTime: null,
                totalListeningTime: 0
            };
        }
    }
    /**
     * Clear all playback history
     * Time Complexity: O(1) - stack clear operation
     * Space Complexity: O(1)
     */
    clearHistory() {
        try {
            this.playbackStack.clear();
        }
        catch (error) {
            console.error('Error clearing playback history:', error);
        }
    }
    /**
     * Check if history is empty
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty() {
        return this.playbackStack.isEmpty();
    }
    /**
     * Get current history size
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getHistorySize() {
        return this.playbackStack.size();
    }
    /**
     * Get maximum history capacity
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getMaxHistorySize() {
        return this.maxHistorySize;
    }
    /**
     * Check if a song was recently played
     * Time Complexity: O(min(n, limit))
     * Space Complexity: O(1)
     */
    wasRecentlyPlayed(songId, withinLastN = 5) {
        try {
            const recentHistory = this.getRecentHistory(withinLastN);
            return recentHistory.some(entry => entry.song.id === songId);
        }
        catch (error) {
            console.error('Error checking if song was recently played:', error);
            return false;
        }
    }
    /**
     * Get songs played in the last N minutes
     * Time Complexity: O(n)
     * Space Complexity: O(k) where k is the number of matching entries
     */
    getSongsPlayedInLastMinutes(minutes) {
        try {
            const cutoffTime = new Date(Date.now() - minutes * 60 * 1000);
            const allHistory = this.getPlaybackHistory();
            return allHistory.filter(entry => entry.timestamp >= cutoffTime);
        }
        catch (error) {
            console.error('Error getting songs played in last minutes:', error);
            return [];
        }
    }
    /**
     * Export playback history for analysis
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    exportHistoryData() {
        try {
            return {
                history: this.getPlaybackHistory(),
                stats: this.getPlaybackStats(),
                mostPlayed: this.getMostPlayedSongs(),
                exportedAt: new Date()
            };
        }
        catch (error) {
            console.error('Error exporting history data:', error);
            return {
                history: [],
                stats: {
                    totalPlays: 0,
                    uniqueSongs: 0,
                    averagePlaysPerSong: 0,
                    firstPlayTime: null,
                    lastPlayTime: null,
                    totalListeningTime: 0
                },
                mostPlayed: [],
                exportedAt: new Date()
            };
        }
    }
}
exports.PlaybackHistoryEngine = PlaybackHistoryEngine;
//# sourceMappingURL=PlaybackHistoryEngine.js.map