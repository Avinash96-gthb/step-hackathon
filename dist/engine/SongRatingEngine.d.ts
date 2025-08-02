import { Song, RatingBucket } from '../types';
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
export declare class SongRatingEngine {
    private ratingTree;
    private songToRatingMap;
    constructor();
    /**
     * Insert or update a song rating
     * Time Complexity: O(log n) average, O(n) worst case for BST insertion
     * Space Complexity: O(1)
     */
    insertSong(song: Song, rating: number): boolean;
    /**
     * Search for all songs with a specific rating
     * Time Complexity: O(log n) average, O(n) worst case
     * Space Complexity: O(k) where k is the number of songs with that rating
     */
    searchByRating(rating: number): Song[];
    /**
     * Delete a song from the rating system
     * Time Complexity: O(log n) average, O(n) worst case
     * Space Complexity: O(1)
     */
    deleteSong(songId: string): boolean;
    /**
     * Get a song's current rating
     * Time Complexity: O(1) - hash map lookup
     * Space Complexity: O(1)
     */
    getSongRating(songId: string): number | null;
    /**
     * Get songs with rating greater than or equal to minimum
     * Time Complexity: O(n) - may need to check all nodes
     * Space Complexity: O(k) where k is the number of matching songs
     */
    getSongsWithMinimumRating(minRating: number): Song[];
    /**
     * Get songs with rating less than or equal to maximum
     * Time Complexity: O(n) - may need to check all nodes
     * Space Complexity: O(k) where k is the number of matching songs
     */
    getSongsWithMaximumRating(maxRating: number): Song[];
    /**
     * Get songs within a rating range
     * Time Complexity: O(n) - may need to traverse entire tree
     * Space Complexity: O(k) where k is the number of matching songs
     */
    getSongsByRatingRange(minRating: number, maxRating: number): Song[];
    /**
     * Get all songs sorted by rating (ascending)
     * Time Complexity: O(n) - in-order traversal
     * Space Complexity: O(n)
     */
    getAllSongsByRatingAsc(): RatingBucket[];
    /**
     * Get all songs sorted by rating (descending)
     * Time Complexity: O(n) - reverse in-order traversal
     * Space Complexity: O(n)
     */
    getAllSongsByRatingDesc(): RatingBucket[];
    /**
     * Get top-rated songs (4-5 stars)
     * Time Complexity: O(k) where k is the number of top-rated songs
     * Space Complexity: O(k)
     */
    getTopRatedSongs(): Song[];
    /**
     * Get poorly-rated songs (1-2 stars)
     * Time Complexity: O(k) where k is the number of poorly-rated songs
     * Space Complexity: O(k)
     */
    getPoorlyRatedSongs(): Song[];
    /**
     * Get rating distribution statistics
     * Time Complexity: O(1) - BST already maintains counts
     * Space Complexity: O(1)
     */
    getRatingDistribution(): Record<number, number>;
    /**
     * Get average rating across all songs
     * Time Complexity: O(n) - need to count all songs and their ratings
     * Space Complexity: O(1)
     */
    getAverageRating(): number;
    /**
     * Get songs recommended based on rating (4+ stars, sorted by rating)
     * Time Complexity: O(k log k) where k is the number of recommended songs
     * Space Complexity: O(k)
     */
    getRecommendedSongs(limit?: number): Song[];
    /**
     * Get songs that need rating (unrated songs)
     * Time Complexity: O(n) - need to check all songs in system
     * Space Complexity: O(k) where k is the number of unrated songs
     */
    getUnratedSongs(allSongs: Song[]): Song[];
    /**
     * Bulk update ratings for multiple songs
     * Time Complexity: O(m log n) where m is the number of songs to update
     * Space Complexity: O(1)
     */
    bulkUpdateRatings(songRatings: Array<{
        song: Song;
        rating: number;
    }>): boolean;
    /**
     * Clear all ratings
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    clearAllRatings(): void;
    /**
     * Get total number of rated songs
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getTotalRatedSongs(): number;
    /**
     * Check if rating system is empty
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty(): boolean;
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
    };
}
//# sourceMappingURL=SongRatingEngine.d.ts.map