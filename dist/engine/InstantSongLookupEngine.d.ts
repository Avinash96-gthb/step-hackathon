import { Song } from '../types';
/**
 * Instant Song Lookup Engine using HashMap
 * Provides O(1) average time song retrieval by ID or title
 * Maintains synchronization with other playlist operations
 *
 * Time Complexity Analysis:
 * - add_song: O(1) average, O(n) worst case
 * - get_song_by_id: O(1) average, O(n) worst case
 * - get_song_by_title: O(1) average, O(n) worst case
 * - remove_song: O(1) average, O(n) worst case
 * - search_songs: O(n) - need to check all songs for partial matches
 *
 * Space Complexity: O(n) where n is the number of songs
 */
export declare class InstantSongLookupEngine {
    private songsByIdMap;
    private songsByTitleMap;
    private songsByArtistMap;
    private songsCount;
    constructor(initialCapacity?: number);
    /**
     * Add a song to the lookup system
     * Time Complexity: O(1) average, O(n) worst case
     * Space Complexity: O(1)
     */
    addSong(song: Song): boolean;
    /**
     * Get song by ID
     * Time Complexity: O(1) average, O(n) worst case
     * Space Complexity: O(1)
     */
    getSongById(id: string): Song | null;
    /**
     * Get song by title (exact match, case-insensitive)
     * Time Complexity: O(1) average, O(n) worst case
     * Space Complexity: O(1)
     */
    getSongByTitle(title: string): Song | null;
    /**
     * Get all songs by artist
     * Time Complexity: O(1) average, O(n) worst case
     * Space Complexity: O(k) where k is the number of songs by that artist
     */
    getSongsByArtist(artist: string): Song[];
    /**
     * Remove song from lookup system
     * Time Complexity: O(k) where k is the number of songs by the same artist
     * Space Complexity: O(1)
     */
    removeSong(songId: string): boolean;
    /**
     * Update existing song information
     * Time Complexity: O(k) where k is the number of songs by artist
     * Space Complexity: O(1)
     */
    updateSong(updatedSong: Song): boolean;
    /**
     * Search songs by partial title match
     * Time Complexity: O(n) - need to check all songs
     * Space Complexity: O(k) where k is the number of matching songs
     */
    searchSongsByTitle(query: string): Song[];
    /**
     * Search songs by partial artist match
     * Time Complexity: O(n) - need to check all songs
     * Space Complexity: O(k) where k is the number of matching songs
     */
    searchSongsByArtist(query: string): Song[];
    /**
     * Search songs by genre
     * Time Complexity: O(n) - need to check all songs
     * Space Complexity: O(k) where k is the number of matching songs
     */
    searchSongsByGenre(genre: string): Song[];
    /**
     * Advanced search with multiple criteria
     * Time Complexity: O(n) - need to check all songs
     * Space Complexity: O(k) where k is the number of matching songs
     */
    advancedSearch(criteria: {
        title?: string;
        artist?: string;
        genre?: string;
        minDuration?: number;
        maxDuration?: number;
        minRating?: number;
        maxRating?: number;
    }): Song[];
    /**
     * Get all songs in the system
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    getAllSongs(): Song[];
    /**
     * Get all unique artists
     * Time Complexity: O(1) - already maintained in artist map
     * Space Complexity: O(k) where k is the number of unique artists
     */
    getAllArtists(): string[];
    /**
     * Get all unique genres
     * Time Complexity: O(n) - need to check all songs
     * Space Complexity: O(k) where k is the number of unique genres
     */
    getAllGenres(): string[];
    /**
     * Get lookup system statistics
     * Time Complexity: O(1) for most stats, O(n) for genre count
     * Space Complexity: O(1)
     */
    getStats(): {
        totalSongs: number;
        totalArtists: number;
        totalGenres: number;
        avgSongsPerArtist: number;
        hashMapStats: {
            idMapStats: any;
            titleMapStats: any;
            artistMapStats: any;
        };
    };
    /**
     * Check if a song exists by ID
     * Time Complexity: O(1) average
     * Space Complexity: O(1)
     */
    hasSong(songId: string): boolean;
    /**
     * Clear all songs from the lookup system
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    clearAll(): void;
    /**
     * Get total number of songs
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getCount(): number;
    /**
     * Check if the system is empty
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty(): boolean;
    /**
     * Bulk add songs for initial system population
     * Time Complexity: O(n) where n is the number of songs
     * Space Complexity: O(1)
     */
    bulkAddSongs(songs: Song[]): number;
    /**
     * Export lookup system data for backup/analysis
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    exportData(): {
        songs: Song[];
        stats: {
            totalSongs: number;
            totalArtists: number;
            totalGenres: number;
            avgSongsPerArtist: number;
            hashMapStats: {
                idMapStats: any;
                titleMapStats: any;
                artistMapStats: any;
            };
        };
        exportedAt: Date;
    };
}
//# sourceMappingURL=InstantSongLookupEngine.d.ts.map