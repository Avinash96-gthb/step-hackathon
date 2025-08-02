import { Song, RatingBucket } from '../types';
import { BinarySearchTree } from '../dataStructures';

/**
 * Song Rating System using Binary Search Tree
 * Manages songs indexed by user ratings (1-5 stars) for fast retrieval and recommendations
 * 
 * Time Complexity Analysis:
 * - insert_song: O(log n) average, O(n) worst case
 * - search_by_rating: O(log n) average, O(n) worst case
 * - delete_song: O(log n) average, O(n) worst case
 * - get_songs_by_rating_range: O(n) - need to traverse tree
 * 
 * Space Complexity: O(n) where n is the number of unique ratings with songs
 */
export class SongRatingEngine {
  private ratingTree: BinarySearchTree<Song>;
  private songToRatingMap: Map<string, number>; // For O(1) lookup of song ratings

  constructor() {
    this.ratingTree = new BinarySearchTree<Song>();
    this.songToRatingMap = new Map();
  }

  /**
   * Insert or update a song rating
   * Time Complexity: O(log n) average, O(n) worst case for BST insertion
   * Space Complexity: O(1)
   */
  insertSong(song: Song, rating: number): boolean {
    try {
      if (rating < 1 || rating > 5) {
        throw new Error('Rating must be between 1 and 5 stars');
      }

      // Remove old rating if exists
      if (this.songToRatingMap.has(song.id)) {
        const oldRating = this.songToRatingMap.get(song.id)!;
        this.ratingTree.deleteSong(song, oldRating);
      }

      // Insert with new rating
      const success = this.ratingTree.insert(rating, song);
      if (success) {
        this.songToRatingMap.set(song.id, rating);
        
        // Update the song object's rating
        song.rating = rating;
      }

      return success;
    } catch (error) {
      console.error('Error inserting song rating:', error);
      return false;
    }
  }

  /**
   * Search for all songs with a specific rating
   * Time Complexity: O(log n) average, O(n) worst case
   * Space Complexity: O(k) where k is the number of songs with that rating
   */
  searchByRating(rating: number): Song[] {
    try {
      return this.ratingTree.searchByRating(rating);
    } catch (error) {
      console.error('Error searching songs by rating:', error);
      return [];
    }
  }

  /**
   * Delete a song from the rating system
   * Time Complexity: O(log n) average, O(n) worst case
   * Space Complexity: O(1)
   */
  deleteSong(songId: string): boolean {
    try {
      const rating = this.songToRatingMap.get(songId);
      if (!rating) {
        return false; // Song not found
      }

      // Find the song object in the BST
      const songsWithRating = this.ratingTree.searchByRating(rating);
      const song = songsWithRating.find(s => s.id === songId);
      
      if (!song) {
        return false;
      }

      const success = this.ratingTree.deleteSong(song, rating);
      if (success) {
        this.songToRatingMap.delete(songId);
      }

      return success;
    } catch (error) {
      console.error('Error deleting song from rating system:', error);
      return false;
    }
  }

  /**
   * Get a song's current rating
   * Time Complexity: O(1) - hash map lookup
   * Space Complexity: O(1)
   */
  getSongRating(songId: string): number | null {
    return this.songToRatingMap.get(songId) || null;
  }

  /**
   * Get songs with rating greater than or equal to minimum
   * Time Complexity: O(n) - may need to check all nodes
   * Space Complexity: O(k) where k is the number of matching songs
   */
  getSongsWithMinimumRating(minRating: number): Song[] {
    try {
      if (minRating < 1 || minRating > 5) {
        return [];
      }
      return this.ratingTree.getSongsWithRatingAtLeast(minRating);
    } catch (error) {
      console.error('Error getting songs with minimum rating:', error);
      return [];
    }
  }

  /**
   * Get songs with rating less than or equal to maximum
   * Time Complexity: O(n) - may need to check all nodes
   * Space Complexity: O(k) where k is the number of matching songs
   */
  getSongsWithMaximumRating(maxRating: number): Song[] {
    try {
      if (maxRating < 1 || maxRating > 5) {
        return [];
      }
      return this.ratingTree.getSongsWithRatingAtMost(maxRating);
    } catch (error) {
      console.error('Error getting songs with maximum rating:', error);
      return [];
    }
  }

  /**
   * Get songs within a rating range
   * Time Complexity: O(n) - may need to traverse entire tree
   * Space Complexity: O(k) where k is the number of matching songs
   */
  getSongsByRatingRange(minRating: number, maxRating: number): Song[] {
    try {
      if (minRating < 1 || maxRating > 5 || minRating > maxRating) {
        return [];
      }

      const songs: Song[] = [];
      for (let rating = minRating; rating <= maxRating; rating++) {
        songs.push(...this.searchByRating(rating));
      }

      return songs;
    } catch (error) {
      console.error('Error getting songs by rating range:', error);
      return [];
    }
  }

  /**
   * Get all songs sorted by rating (ascending)
   * Time Complexity: O(n) - in-order traversal
   * Space Complexity: O(n)
   */
  getAllSongsByRatingAsc(): RatingBucket[] {
    try {
      const ratingBuckets = this.ratingTree.getAllSongsByRatingAsc();
      return ratingBuckets.map(bucket => ({
        rating: bucket.rating,
        songs: bucket.songs
      }));
    } catch (error) {
      console.error('Error getting all songs by rating ascending:', error);
      return [];
    }
  }

  /**
   * Get all songs sorted by rating (descending)
   * Time Complexity: O(n) - reverse in-order traversal
   * Space Complexity: O(n)
   */
  getAllSongsByRatingDesc(): RatingBucket[] {
    try {
      const ratingBuckets = this.ratingTree.getAllSongsByRatingDesc();
      return ratingBuckets.map(bucket => ({
        rating: bucket.rating,
        songs: bucket.songs
      }));
    } catch (error) {
      console.error('Error getting all songs by rating descending:', error);
      return [];
    }
  }

  /**
   * Get top-rated songs (4-5 stars)
   * Time Complexity: O(k) where k is the number of top-rated songs
   * Space Complexity: O(k)
   */
  getTopRatedSongs(): Song[] {
    try {
      const topRated: Song[] = [];
      topRated.push(...this.searchByRating(5));
      topRated.push(...this.searchByRating(4));
      return topRated;
    } catch (error) {
      console.error('Error getting top-rated songs:', error);
      return [];
    }
  }

  /**
   * Get poorly-rated songs (1-2 stars)
   * Time Complexity: O(k) where k is the number of poorly-rated songs
   * Space Complexity: O(k)
   */
  getPoorlyRatedSongs(): Song[] {
    try {
      const poorlyRated: Song[] = [];
      poorlyRated.push(...this.searchByRating(1));
      poorlyRated.push(...this.searchByRating(2));
      return poorlyRated;
    } catch (error) {
      console.error('Error getting poorly-rated songs:', error);
      return [];
    }
  }

  /**
   * Get rating distribution statistics
   * Time Complexity: O(1) - BST already maintains counts
   * Space Complexity: O(1)
   */
  getRatingDistribution(): Record<number, number> {
    try {
      return this.ratingTree.getSongCountByRating();
    } catch (error) {
      console.error('Error getting rating distribution:', error);
      return {};
    }
  }

  /**
   * Get average rating across all songs
   * Time Complexity: O(n) - need to count all songs and their ratings
   * Space Complexity: O(1)
   */
  getAverageRating(): number {
    try {
      const distribution = this.getRatingDistribution();
      let totalRating = 0;
      let totalSongs = 0;

      for (const [rating, count] of Object.entries(distribution)) {
        totalRating += parseInt(rating) * count;
        totalSongs += count;
      }

      return totalSongs > 0 ? totalRating / totalSongs : 0;
    } catch (error) {
      console.error('Error calculating average rating:', error);
      return 0;
    }
  }

  /**
   * Get songs recommended based on rating (4+ stars, sorted by rating)
   * Time Complexity: O(k log k) where k is the number of recommended songs
   * Space Complexity: O(k)
   */
  getRecommendedSongs(limit?: number): Song[] {
    try {
      const recommendedSongs = this.getSongsWithMinimumRating(4);
      
      // Sort by rating and then by play count for better recommendations
      recommendedSongs.sort((a, b) => {
        if (a.rating !== b.rating) {
          return (b.rating || 0) - (a.rating || 0);
        }
        return b.playCount - a.playCount;
      });

      return limit ? recommendedSongs.slice(0, limit) : recommendedSongs;
    } catch (error) {
      console.error('Error getting recommended songs:', error);
      return [];
    }
  }

  /**
   * Get songs that need rating (unrated songs)
   * Time Complexity: O(n) - need to check all songs in system
   * Space Complexity: O(k) where k is the number of unrated songs
   */
  getUnratedSongs(allSongs: Song[]): Song[] {
    try {
      return allSongs.filter(song => !this.songToRatingMap.has(song.id));
    } catch (error) {
      console.error('Error getting unrated songs:', error);
      return [];
    }
  }

  /**
   * Bulk update ratings for multiple songs
   * Time Complexity: O(m log n) where m is the number of songs to update
   * Space Complexity: O(1)
   */
  bulkUpdateRatings(songRatings: Array<{ song: Song; rating: number }>): boolean {
    try {
      let allSuccessful = true;
      
      for (const { song, rating } of songRatings) {
        const success = this.insertSong(song, rating);
        if (!success) {
          allSuccessful = false;
          console.warn(`Failed to update rating for song: ${song.title}`);
        }
      }

      return allSuccessful;
    } catch (error) {
      console.error('Error bulk updating ratings:', error);
      return false;
    }
  }

  /**
   * Clear all ratings
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  clearAllRatings(): void {
    try {
      this.ratingTree.clear();
      this.songToRatingMap.clear();
    } catch (error) {
      console.error('Error clearing all ratings:', error);
    }
  }

  /**
   * Get total number of rated songs
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  getTotalRatedSongs(): number {
    return this.songToRatingMap.size;
  }

  /**
   * Check if rating system is empty
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  isEmpty(): boolean {
    return this.songToRatingMap.size === 0;
  }

  /**
   * Export rating data for analysis
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  exportRatingData(): {
    ratingBuckets: RatingBucket[];
    distribution: Record<number, number>;
    averageRating: number;
    totalRatedSongs: number;
    topRated: Song[];
    exportedAt: Date;
  } {
    try {
      return {
        ratingBuckets: this.getAllSongsByRatingDesc(),
        distribution: this.getRatingDistribution(),
        averageRating: this.getAverageRating(),
        totalRatedSongs: this.getTotalRatedSongs(),
        topRated: this.getTopRatedSongs(),
        exportedAt: new Date()
      };
    } catch (error) {
      console.error('Error exporting rating data:', error);
      return {
        ratingBuckets: [],
        distribution: {},
        averageRating: 0,
        totalRatedSongs: 0,
        topRated: [],
        exportedAt: new Date()
      };
    }
  }
}
