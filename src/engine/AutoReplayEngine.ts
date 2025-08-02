import { Song, AutoReplayConfig, SkippedSong } from '../types';
import { Queue, HashMap } from '../dataStructures';

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
export class AutoReplayEngine {
  private config: AutoReplayConfig;
  private songPlayCounts: HashMap<string, number>; // songId -> play count
  private songGenreMap: HashMap<string, string>; // songId -> genre
  private songObjectMap: HashMap<string, Song>; // songId -> song object

  constructor(config: AutoReplayConfig = {
    enabled: true,
    calmingGenres: ['lo-fi', 'jazz', 'ambient', 'classical', 'chill'],
    topSongsCount: 3
  }) {
    this.config = config;
    this.songPlayCounts = new HashMap<string, number>();
    this.songGenreMap = new HashMap<string, string>();
    this.songObjectMap = new HashMap<string, Song>();
  }

  /**
   * Track a song play for auto-replay calculations
   * Time Complexity: O(1) - hash map operations
   * Space Complexity: O(1)
   */
  trackPlay(song: Song): void {
    try {
      // Update play count
      const currentCount = this.songPlayCounts.get(song.id) || 0;
      this.songPlayCounts.set(song.id, currentCount + 1);

      // Store genre mapping
      this.songGenreMap.set(song.id, song.genre.toLowerCase());

      // Store song object
      this.songObjectMap.set(song.id, song);
    } catch (error) {
      console.error('Error tracking song play for auto-replay:', error);
    }
  }

  /**
   * Check if auto-replay should be triggered
   * Time Complexity: O(1) - configuration check
   * Space Complexity: O(1)
   */
  shouldAutoReplay(): boolean {
    return this.config.enabled;
  }

  /**
   * Get songs for auto-replay (top played calming songs)
   * Time Complexity: O(n log n) - sorting by play count
   * Space Complexity: O(k) where k is the number of calming songs
   */
  getReplaySongs(): Song[] {
    try {
      if (!this.config.enabled) {
        return [];
      }

      const calmingSongs: Array<{ song: Song; playCount: number }> = [];

      // Find all songs with calming genres
      for (const [songId, genre] of this.songGenreMap.entries()) {
        if (this.isCalmingGenre(genre)) {
          const song = this.songObjectMap.get(songId);
          const playCount = this.songPlayCounts.get(songId) || 0;
          
          if (song && playCount > 0) {
            calmingSongs.push({ song, playCount });
          }
        }
      }

      // Sort by play count (descending) and take top N
      calmingSongs.sort((a, b) => b.playCount - a.playCount);
      
      return calmingSongs
        .slice(0, this.config.topSongsCount)
        .map(item => item.song);
    } catch (error) {
      console.error('Error getting replay songs:', error);
      return [];
    }
  }

  /**
   * Get replay songs for a specific genre
   * Time Complexity: O(n log n) - filtering and sorting
   * Space Complexity: O(k) where k is the number of songs in that genre
   */
  getReplaySongsByGenre(genre: string): Song[] {
    try {
      if (!this.config.enabled) {
        return [];
      }

      const genreSongs: Array<{ song: Song; playCount: number }> = [];
      const normalizedGenre = genre.toLowerCase();

      for (const [songId, songGenre] of this.songGenreMap.entries()) {
        if (songGenre === normalizedGenre) {
          const song = this.songObjectMap.get(songId);
          const playCount = this.songPlayCounts.get(songId) || 0;
          
          if (song && playCount > 0) {
            genreSongs.push({ song, playCount });
          }
        }
      }

      // Sort by play count and take top N
      genreSongs.sort((a, b) => b.playCount - a.playCount);
      
      return genreSongs
        .slice(0, this.config.topSongsCount)
        .map(item => item.song);
    } catch (error) {
      console.error('Error getting replay songs by genre:', error);
      return [];
    }
  }

  /**
   * Update auto-replay configuration
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  updateConfig(newConfig: Partial<AutoReplayConfig>): void {
    try {
      this.config = { ...this.config, ...newConfig };
    } catch (error) {
      console.error('Error updating auto-replay config:', error);
    }
  }

  /**
   * Get current configuration
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  getConfig(): AutoReplayConfig {
    return { ...this.config };
  }

  /**
   * Add a calming genre to the configuration
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  addCalmingGenre(genre: string): void {
    try {
      const normalizedGenre = genre.toLowerCase();
      if (!this.config.calmingGenres.includes(normalizedGenre)) {
        this.config.calmingGenres.push(normalizedGenre);
      }
    } catch (error) {
      console.error('Error adding calming genre:', error);
    }
  }

  /**
   * Remove a calming genre from the configuration
   * Time Complexity: O(n) where n is the number of calming genres
   * Space Complexity: O(1)
   */
  removeCalmingGenre(genre: string): boolean {
    try {
      const normalizedGenre = genre.toLowerCase();
      const index = this.config.calmingGenres.indexOf(normalizedGenre);
      
      if (index !== -1) {
        this.config.calmingGenres.splice(index, 1);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error removing calming genre:', error);
      return false;
    }
  }

  /**
   * Check if a genre is considered calming
   * Time Complexity: O(n) where n is the number of calming genres
   * Space Complexity: O(1)
   */
  private isCalmingGenre(genre: string): boolean {
    return this.config.calmingGenres.includes(genre.toLowerCase());
  }

  /**
   * Get most played songs across all genres
   * Time Complexity: O(n log n) - sorting by play count
   * Space Complexity: O(n)
   */
  getMostPlayedSongs(limit: number = 10): Array<{ song: Song; playCount: number }> {
    try {
      const allSongs: Array<{ song: Song; playCount: number }> = [];

      for (const [songId, playCount] of this.songPlayCounts.entries()) {
        const song = this.songObjectMap.get(songId);
        if (song && playCount > 0) {
          allSongs.push({ song, playCount });
        }
      }

      allSongs.sort((a, b) => b.playCount - a.playCount);
      return allSongs.slice(0, limit);
    } catch (error) {
      console.error('Error getting most played songs:', error);
      return [];
    }
  }

  /**
   * Get play count for a specific song
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  getSongPlayCount(songId: string): number {
    return this.songPlayCounts.get(songId) || 0;
  }

  /**
   * Get total play count across all songs
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  getTotalPlayCount(): number {
    try {
      let total = 0;
      for (const count of this.songPlayCounts.values()) {
        total += count;
      }
      return total;
    } catch (error) {
      console.error('Error getting total play count:', error);
      return 0;
    }
  }

  /**
   * Get play statistics by genre
   * Time Complexity: O(n)
   * Space Complexity: O(k) where k is the number of unique genres
   */
  getPlayStatsByGenre(): Record<string, { songCount: number; totalPlays: number; avgPlaysPerSong: number }> {
    try {
      const stats: Record<string, { songCount: number; totalPlays: number; avgPlaysPerSong: number }> = {};

      for (const [songId, genre] of this.songGenreMap.entries()) {
        const playCount = this.songPlayCounts.get(songId) || 0;
        
        if (!stats[genre]) {
          stats[genre] = { songCount: 0, totalPlays: 0, avgPlaysPerSong: 0 };
        }
        
        stats[genre].songCount++;
        stats[genre].totalPlays += playCount;
      }

      // Calculate averages
      for (const genre in stats) {
        const genreStats = stats[genre];
        genreStats.avgPlaysPerSong = genreStats.songCount > 0 
          ? genreStats.totalPlays / genreStats.songCount 
          : 0;
      }

      return stats;
    } catch (error) {
      console.error('Error getting play stats by genre:', error);
      return {};
    }
  }

  /**
   * Reset play counts for all songs
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  resetPlayCounts(): void {
    try {
      this.songPlayCounts.clear();
    } catch (error) {
      console.error('Error resetting play counts:', error);
    }
  }

  /**
   * Remove song from auto-replay tracking
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  removeSong(songId: string): boolean {
    try {
      let removed = false;
      
      if (this.songPlayCounts.has(songId)) {
        this.songPlayCounts.delete(songId);
        removed = true;
      }
      
      if (this.songGenreMap.has(songId)) {
        this.songGenreMap.delete(songId);
        removed = true;
      }
      
      if (this.songObjectMap.has(songId)) {
        this.songObjectMap.delete(songId);
        removed = true;
      }

      return removed;
    } catch (error) {
      console.error('Error removing song from auto-replay tracking:', error);
      return false;
    }
  }

  /**
   * Clear all tracking data
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  clearAll(): void {
    try {
      this.songPlayCounts.clear();
      this.songGenreMap.clear();
      this.songObjectMap.clear();
    } catch (error) {
      console.error('Error clearing auto-replay data:', error);
    }
  }

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
    playStatsByGenre: Record<string, { songCount: number; totalPlays: number; avgPlaysPerSong: number }>;
  } {
    try {
      return {
        enabled: this.config.enabled,
        totalTrackedSongs: this.songObjectMap.getSize(),
        totalPlays: this.getTotalPlayCount(),
        calmingGenresCount: this.config.calmingGenres.length,
        topSongsCount: this.config.topSongsCount,
        playStatsByGenre: this.getPlayStatsByGenre()
      };
    } catch (error) {
      console.error('Error getting auto-replay stats:', error);
      return {
        enabled: false,
        totalTrackedSongs: 0,
        totalPlays: 0,
        calmingGenresCount: 0,
        topSongsCount: 0,
        playStatsByGenre: {}
      };
    }
  }
}
