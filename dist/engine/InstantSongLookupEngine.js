"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstantSongLookupEngine = void 0;
const dataStructures_1 = require("../dataStructures");
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
class InstantSongLookupEngine {
    constructor(initialCapacity = 100) {
        this.songsCount = 0;
        this.songsByIdMap = new dataStructures_1.HashMap(initialCapacity);
        this.songsByTitleMap = new dataStructures_1.HashMap(initialCapacity);
        this.songsByArtistMap = new dataStructures_1.HashMap(initialCapacity);
    }
    /**
     * Add a song to the lookup system
     * Time Complexity: O(1) average, O(n) worst case
     * Space Complexity: O(1)
     */
    addSong(song) {
        try {
            // Check if song already exists
            if (this.songsByIdMap.has(song.id)) {
                // Update existing song
                return this.updateSong(song);
            }
            // Add to ID map
            this.songsByIdMap.set(song.id, song);
            // Add to title map (normalized lowercase for case-insensitive search)
            const normalizedTitle = song.title.toLowerCase().trim();
            this.songsByTitleMap.set(normalizedTitle, song);
            // Add to artist map
            const normalizedArtist = song.artist.toLowerCase().trim();
            const artistSongs = this.songsByArtistMap.get(normalizedArtist) || [];
            artistSongs.push(song);
            this.songsByArtistMap.set(normalizedArtist, artistSongs);
            this.songsCount++;
            return true;
        }
        catch (error) {
            console.error('Error adding song to lookup system:', error);
            return false;
        }
    }
    /**
     * Get song by ID
     * Time Complexity: O(1) average, O(n) worst case
     * Space Complexity: O(1)
     */
    getSongById(id) {
        try {
            const song = this.songsByIdMap.get(id);
            return song || null;
        }
        catch (error) {
            console.error('Error getting song by ID:', error);
            return null;
        }
    }
    /**
     * Get song by title (exact match, case-insensitive)
     * Time Complexity: O(1) average, O(n) worst case
     * Space Complexity: O(1)
     */
    getSongByTitle(title) {
        try {
            const normalizedTitle = title.toLowerCase().trim();
            const song = this.songsByTitleMap.get(normalizedTitle);
            return song || null;
        }
        catch (error) {
            console.error('Error getting song by title:', error);
            return null;
        }
    }
    /**
     * Get all songs by artist
     * Time Complexity: O(1) average, O(n) worst case
     * Space Complexity: O(k) where k is the number of songs by that artist
     */
    getSongsByArtist(artist) {
        try {
            const normalizedArtist = artist.toLowerCase().trim();
            const songs = this.songsByArtistMap.get(normalizedArtist);
            return songs ? [...songs] : [];
        }
        catch (error) {
            console.error('Error getting songs by artist:', error);
            return [];
        }
    }
    /**
     * Remove song from lookup system
     * Time Complexity: O(k) where k is the number of songs by the same artist
     * Space Complexity: O(1)
     */
    removeSong(songId) {
        try {
            const song = this.songsByIdMap.get(songId);
            if (!song) {
                return false; // Song not found
            }
            // Remove from ID map
            this.songsByIdMap.delete(songId);
            // Remove from title map
            const normalizedTitle = song.title.toLowerCase().trim();
            this.songsByTitleMap.delete(normalizedTitle);
            // Remove from artist map
            const normalizedArtist = song.artist.toLowerCase().trim();
            const artistSongs = this.songsByArtistMap.get(normalizedArtist) || [];
            const filteredSongs = artistSongs.filter(s => s.id !== songId);
            if (filteredSongs.length === 0) {
                this.songsByArtistMap.delete(normalizedArtist);
            }
            else {
                this.songsByArtistMap.set(normalizedArtist, filteredSongs);
            }
            this.songsCount--;
            return true;
        }
        catch (error) {
            console.error('Error removing song from lookup system:', error);
            return false;
        }
    }
    /**
     * Update existing song information
     * Time Complexity: O(k) where k is the number of songs by artist
     * Space Complexity: O(1)
     */
    updateSong(updatedSong) {
        try {
            const existingSong = this.songsByIdMap.get(updatedSong.id);
            if (!existingSong) {
                return false;
            }
            // If title or artist changed, need to update those maps
            const titleChanged = existingSong.title !== updatedSong.title;
            const artistChanged = existingSong.artist !== updatedSong.artist;
            if (titleChanged) {
                // Remove old title mapping
                const oldNormalizedTitle = existingSong.title.toLowerCase().trim();
                this.songsByTitleMap.delete(oldNormalizedTitle);
                // Add new title mapping
                const newNormalizedTitle = updatedSong.title.toLowerCase().trim();
                this.songsByTitleMap.set(newNormalizedTitle, updatedSong);
            }
            if (artistChanged) {
                // Remove from old artist mapping
                const oldNormalizedArtist = existingSong.artist.toLowerCase().trim();
                const oldArtistSongs = this.songsByArtistMap.get(oldNormalizedArtist) || [];
                const filteredOldSongs = oldArtistSongs.filter(s => s.id !== updatedSong.id);
                if (filteredOldSongs.length === 0) {
                    this.songsByArtistMap.delete(oldNormalizedArtist);
                }
                else {
                    this.songsByArtistMap.set(oldNormalizedArtist, filteredOldSongs);
                }
                // Add to new artist mapping
                const newNormalizedArtist = updatedSong.artist.toLowerCase().trim();
                const newArtistSongs = this.songsByArtistMap.get(newNormalizedArtist) || [];
                newArtistSongs.push(updatedSong);
                this.songsByArtistMap.set(newNormalizedArtist, newArtistSongs);
            }
            // Update main song map
            this.songsByIdMap.set(updatedSong.id, updatedSong);
            return true;
        }
        catch (error) {
            console.error('Error updating song in lookup system:', error);
            return false;
        }
    }
    /**
     * Search songs by partial title match
     * Time Complexity: O(n) - need to check all songs
     * Space Complexity: O(k) where k is the number of matching songs
     */
    searchSongsByTitle(query) {
        try {
            const normalizedQuery = query.toLowerCase().trim();
            const matchingSongs = [];
            for (const song of this.songsByIdMap.values()) {
                if (song.title.toLowerCase().includes(normalizedQuery)) {
                    matchingSongs.push(song);
                }
            }
            return matchingSongs;
        }
        catch (error) {
            console.error('Error searching songs by title:', error);
            return [];
        }
    }
    /**
     * Search songs by partial artist match
     * Time Complexity: O(n) - need to check all songs
     * Space Complexity: O(k) where k is the number of matching songs
     */
    searchSongsByArtist(query) {
        try {
            const normalizedQuery = query.toLowerCase().trim();
            const matchingSongs = [];
            for (const song of this.songsByIdMap.values()) {
                if (song.artist.toLowerCase().includes(normalizedQuery)) {
                    matchingSongs.push(song);
                }
            }
            return matchingSongs;
        }
        catch (error) {
            console.error('Error searching songs by artist:', error);
            return [];
        }
    }
    /**
     * Search songs by genre
     * Time Complexity: O(n) - need to check all songs
     * Space Complexity: O(k) where k is the number of matching songs
     */
    searchSongsByGenre(genre) {
        try {
            const normalizedGenre = genre.toLowerCase().trim();
            const matchingSongs = [];
            for (const song of this.songsByIdMap.values()) {
                if (song.genre.toLowerCase() === normalizedGenre) {
                    matchingSongs.push(song);
                }
            }
            return matchingSongs;
        }
        catch (error) {
            console.error('Error searching songs by genre:', error);
            return [];
        }
    }
    /**
     * Advanced search with multiple criteria
     * Time Complexity: O(n) - need to check all songs
     * Space Complexity: O(k) where k is the number of matching songs
     */
    advancedSearch(criteria) {
        try {
            const matchingSongs = [];
            for (const song of this.songsByIdMap.values()) {
                let matches = true;
                if (criteria.title && !song.title.toLowerCase().includes(criteria.title.toLowerCase())) {
                    matches = false;
                }
                if (criteria.artist && !song.artist.toLowerCase().includes(criteria.artist.toLowerCase())) {
                    matches = false;
                }
                if (criteria.genre && song.genre.toLowerCase() !== criteria.genre.toLowerCase()) {
                    matches = false;
                }
                if (criteria.minDuration && song.duration < criteria.minDuration) {
                    matches = false;
                }
                if (criteria.maxDuration && song.duration > criteria.maxDuration) {
                    matches = false;
                }
                if (criteria.minRating && (!song.rating || song.rating < criteria.minRating)) {
                    matches = false;
                }
                if (criteria.maxRating && (!song.rating || song.rating > criteria.maxRating)) {
                    matches = false;
                }
                if (matches) {
                    matchingSongs.push(song);
                }
            }
            return matchingSongs;
        }
        catch (error) {
            console.error('Error performing advanced search:', error);
            return [];
        }
    }
    /**
     * Get all songs in the system
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    getAllSongs() {
        try {
            return this.songsByIdMap.values();
        }
        catch (error) {
            console.error('Error getting all songs:', error);
            return [];
        }
    }
    /**
     * Get all unique artists
     * Time Complexity: O(1) - already maintained in artist map
     * Space Complexity: O(k) where k is the number of unique artists
     */
    getAllArtists() {
        try {
            return this.songsByArtistMap.keys();
        }
        catch (error) {
            console.error('Error getting all artists:', error);
            return [];
        }
    }
    /**
     * Get all unique genres
     * Time Complexity: O(n) - need to check all songs
     * Space Complexity: O(k) where k is the number of unique genres
     */
    getAllGenres() {
        try {
            const genres = new Set();
            for (const song of this.songsByIdMap.values()) {
                genres.add(song.genre);
            }
            return Array.from(genres);
        }
        catch (error) {
            console.error('Error getting all genres:', error);
            return [];
        }
    }
    /**
     * Get lookup system statistics
     * Time Complexity: O(1) for most stats, O(n) for genre count
     * Space Complexity: O(1)
     */
    getStats() {
        try {
            const totalArtists = this.songsByArtistMap.getSize();
            const totalGenres = this.getAllGenres().length;
            const avgSongsPerArtist = totalArtists > 0 ? this.songsCount / totalArtists : 0;
            return {
                totalSongs: this.songsCount,
                totalArtists,
                totalGenres,
                avgSongsPerArtist,
                hashMapStats: {
                    idMapStats: this.songsByIdMap.getStats(),
                    titleMapStats: this.songsByTitleMap.getStats(),
                    artistMapStats: this.songsByArtistMap.getStats()
                }
            };
        }
        catch (error) {
            console.error('Error getting lookup system stats:', error);
            return {
                totalSongs: 0,
                totalArtists: 0,
                totalGenres: 0,
                avgSongsPerArtist: 0,
                hashMapStats: {
                    idMapStats: {},
                    titleMapStats: {},
                    artistMapStats: {}
                }
            };
        }
    }
    /**
     * Check if a song exists by ID
     * Time Complexity: O(1) average
     * Space Complexity: O(1)
     */
    hasSong(songId) {
        return this.songsByIdMap.has(songId);
    }
    /**
     * Clear all songs from the lookup system
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    clearAll() {
        try {
            this.songsByIdMap.clear();
            this.songsByTitleMap.clear();
            this.songsByArtistMap.clear();
            this.songsCount = 0;
        }
        catch (error) {
            console.error('Error clearing lookup system:', error);
        }
    }
    /**
     * Get total number of songs
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getCount() {
        return this.songsCount;
    }
    /**
     * Check if the system is empty
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty() {
        return this.songsCount === 0;
    }
    /**
     * Bulk add songs for initial system population
     * Time Complexity: O(n) where n is the number of songs
     * Space Complexity: O(1)
     */
    bulkAddSongs(songs) {
        let successCount = 0;
        try {
            for (const song of songs) {
                if (this.addSong(song)) {
                    successCount++;
                }
            }
        }
        catch (error) {
            console.error('Error during bulk add operation:', error);
        }
        return successCount;
    }
    /**
     * Export lookup system data for backup/analysis
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    exportData() {
        try {
            return {
                songs: this.getAllSongs(),
                stats: this.getStats(),
                exportedAt: new Date()
            };
        }
        catch (error) {
            console.error('Error exporting lookup system data:', error);
            return {
                songs: [],
                stats: {
                    totalSongs: 0,
                    totalArtists: 0,
                    totalGenres: 0,
                    avgSongsPerArtist: 0,
                    hashMapStats: {
                        idMapStats: {},
                        titleMapStats: {},
                        artistMapStats: {}
                    }
                },
                exportedAt: new Date()
            };
        }
    }
}
exports.InstantSongLookupEngine = InstantSongLookupEngine;
//# sourceMappingURL=InstantSongLookupEngine.js.map