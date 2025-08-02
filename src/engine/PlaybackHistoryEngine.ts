import { Song, PlaybackEntry } from '../types';
import { Stack } from '../dataStructures';

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
export class PlaybackHistoryEngine {
  private playbackStack: Stack<PlaybackEntry>;
  private maxHistorySize: number;

  constructor(maxHistorySize: number = 50) {
    this.maxHistorySize = maxHistorySize;
    this.playbackStack = new Stack<PlaybackEntry>(maxHistorySize);
  }

  /**
   * Record a song play in the history
   * Time Complexity: O(1) - stack push operation
   * Space Complexity: O(1)
   */
  playSong(song: Song, playlistPosition: number = -1): PlaybackEntry {
    const playbackEntry: PlaybackEntry = {
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
  undoLastPlay(): PlaybackEntry | null {
    const lastPlay = this.playbackStack.pop();
    return lastPlay || null;
  }

  /**
   * Get the last played song without removing it
   * Time Complexity: O(1) - stack peek operation
   * Space Complexity: O(1)
   */
  getLastPlayed(): PlaybackEntry | null {
    const lastPlay = this.playbackStack.peek();
    return lastPlay || null;
  }

  /**
   * Get complete playback history (most recent first)
   * Time Complexity: O(n) - convert stack to array
   * Space Complexity: O(n) - create new array
   */
  getPlaybackHistory(limit?: number): PlaybackEntry[] {
    try {
      const history = this.playbackStack.toArray();
      return limit ? history.slice(0, limit) : history;
    } catch (error) {
      console.error('Error getting playback history:', error);
      return [];
    }
  }

  /**
   * Get recent playback history (last N songs)
   * Time Complexity: O(min(n, limit))
   * Space Complexity: O(min(n, limit))
   */
  getRecentHistory(limit: number = 10): PlaybackEntry[] {
    try {
      return this.getPlaybackHistory(limit);
    } catch (error) {
      console.error('Error getting recent history:', error);
      return [];
    }
  }

  /**
   * Get playback history for a specific time range
   * Time Complexity: O(n) - need to check all entries
   * Space Complexity: O(k) where k is the number of matching entries
   */
  getHistoryByTimeRange(startTime: Date, endTime: Date): PlaybackEntry[] {
    try {
      const allHistory = this.getPlaybackHistory();
      return allHistory.filter(entry => 
        entry.timestamp >= startTime && entry.timestamp <= endTime
      );
    } catch (error) {
      console.error('Error getting history by time range:', error);
      return [];
    }
  }

  /**
   * Get playback history for a specific song
   * Time Complexity: O(n) - need to check all entries
   * Space Complexity: O(k) where k is the number of matching entries
   */
  getHistoryForSong(songId: string): PlaybackEntry[] {
    try {
      const allHistory = this.getPlaybackHistory();
      return allHistory.filter(entry => entry.song.id === songId);
    } catch (error) {
      console.error('Error getting history for song:', error);
      return [];
    }
  }

  /**
   * Get most frequently played songs
   * Time Complexity: O(n) - need to count all plays
   * Space Complexity: O(k) where k is the number of unique songs
   */
  getMostPlayedSongs(limit: number = 10): Array<{ song: Song; playCount: number }> {
    try {
      const allHistory = this.getPlaybackHistory();
      const playCountMap = new Map<string, { song: Song; count: number }>();

      // Count plays for each song
      for (const entry of allHistory) {
        const songId = entry.song.id;
        if (playCountMap.has(songId)) {
          playCountMap.get(songId)!.count++;
        } else {
          playCountMap.set(songId, { song: entry.song, count: 1 });
        }
      }

      // Convert to array and sort by play count
      const sortedSongs = Array.from(playCountMap.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, limit)
        .map(item => ({ song: item.song, playCount: item.count }));

      return sortedSongs;
    } catch (error) {
      console.error('Error getting most played songs:', error);
      return [];
    }
  }

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
  } {
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
      
      const sortedByTime = [...allHistory].sort((a, b) => 
        a.timestamp.getTime() - b.timestamp.getTime()
      );
      
      const firstPlayTime = sortedByTime[0].timestamp;
      const lastPlayTime = sortedByTime[sortedByTime.length - 1].timestamp;
      
      const totalListeningTime = allHistory.reduce((sum, entry) => 
        sum + entry.song.duration, 0
      );

      return {
        totalPlays,
        uniqueSongs,
        averagePlaysPerSong,
        firstPlayTime,
        lastPlayTime,
        totalListeningTime
      };
    } catch (error) {
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
  clearHistory(): void {
    try {
      this.playbackStack.clear();
    } catch (error) {
      console.error('Error clearing playback history:', error);
    }
  }

  /**
   * Check if history is empty
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  isEmpty(): boolean {
    return this.playbackStack.isEmpty();
  }

  /**
   * Get current history size
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  getHistorySize(): number {
    return this.playbackStack.size();
  }

  /**
   * Get maximum history capacity
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  getMaxHistorySize(): number {
    return this.maxHistorySize;
  }

  /**
   * Check if a song was recently played
   * Time Complexity: O(min(n, limit))
   * Space Complexity: O(1)
   */
  wasRecentlyPlayed(songId: string, withinLastN: number = 5): boolean {
    try {
      const recentHistory = this.getRecentHistory(withinLastN);
      return recentHistory.some(entry => entry.song.id === songId);
    } catch (error) {
      console.error('Error checking if song was recently played:', error);
      return false;
    }
  }

  /**
   * Get songs played in the last N minutes
   * Time Complexity: O(n)
   * Space Complexity: O(k) where k is the number of matching entries
   */
  getSongsPlayedInLastMinutes(minutes: number): PlaybackEntry[] {
    try {
      const cutoffTime = new Date(Date.now() - minutes * 60 * 1000);
      const allHistory = this.getPlaybackHistory();
      
      return allHistory.filter(entry => entry.timestamp >= cutoffTime);
    } catch (error) {
      console.error('Error getting songs played in last minutes:', error);
      return [];
    }
  }

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
    mostPlayed: Array<{ song: Song; playCount: number }>;
    exportedAt: Date;
  } {
    try {
      return {
        history: this.getPlaybackHistory(),
        stats: this.getPlaybackStats(),
        mostPlayed: this.getMostPlayedSongs(),
        exportedAt: new Date()
      };
    } catch (error) {
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
