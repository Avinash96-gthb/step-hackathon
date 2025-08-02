import { Song, SortCriteria } from '../types';
/**
 * Playlist Engine using Doubly Linked List
 * Manages playlist operations with efficient insertion, deletion, and reordering
 *
 * Time Complexity Analysis:
 * - add_song: O(1) - append to end
 * - delete_song: O(n) - need to find position
 * - move_song: O(n) - need to find both positions
 * - reverse_playlist: O(n) - reverse entire list
 * - get_song: O(n) - traverse to position
 * - sort_playlist: O(n log n) - sorting algorithm
 *
 * Space Complexity: O(n) where n is the number of songs
 */
export declare class PlaylistEngine {
    private playlist;
    private playlistId;
    private playlistName;
    private createdAt;
    private updatedAt;
    constructor(playlistId: string, playlistName: string);
    /**
     * Add a song to the playlist
     * Time Complexity: O(1) - append to end
     * Space Complexity: O(1)
     */
    addSong(song: Song): boolean;
    /**
     * Add a song at a specific position
     * Time Complexity: O(n) - need to traverse to position
     * Space Complexity: O(1)
     */
    addSongAtPosition(song: Song, position: number): boolean;
    /**
     * Delete a song by index
     * Time Complexity: O(n) - need to traverse to position
     * Space Complexity: O(1)
     */
    deleteSong(index: number): Song | null;
    /**
     * Delete a song by song object
     * Time Complexity: O(n) - need to find the song first
     * Space Complexity: O(1)
     */
    deleteSongBySong(song: Song): boolean;
    /**
     * Move a song from one position to another
     * Time Complexity: O(n) - need to traverse to both positions
     * Space Complexity: O(1)
     */
    moveSong(fromIndex: number, toIndex: number): boolean;
    /**
     * Reverse the entire playlist
     * Time Complexity: O(n) - need to reverse all pointers
     * Space Complexity: O(1) - in-place reversal
     */
    reversePlaylist(): void;
    /**
     * Get a song at a specific index
     * Time Complexity: O(n) - need to traverse to position
     * Space Complexity: O(1)
     */
    getSong(index: number): Song | null;
    /**
     * Get all songs as an array
     * Time Complexity: O(n) - traverse entire list
     * Space Complexity: O(n) - create new array
     */
    getAllSongs(): Song[];
    /**
     * Sort playlist by criteria using merge sort (stable)
     * Time Complexity: O(n log n) - merge sort
     * Space Complexity: O(n) - merge sort requires additional space
     */
    sortPlaylist(criteria: SortCriteria, algorithm?: 'merge' | 'quick'): boolean;
    /**
     * Sort playlist by multiple criteria
     * Time Complexity: O(n log n)
     * Space Complexity: O(n)
     */
    sortPlaylistMultiCriteria(criteriaList: SortCriteria[]): boolean;
    /**
     * Find songs by title (partial match)
     * Time Complexity: O(n) - need to check all songs
     * Space Complexity: O(k) where k is the number of matching songs
     */
    findSongsByTitle(title: string): Song[];
    /**
     * Find songs by artist
     * Time Complexity: O(n)
     * Space Complexity: O(k) where k is the number of matching songs
     */
    findSongsByArtist(artist: string): Song[];
    /**
     * Get playlist statistics
     * Time Complexity: O(n) - need to traverse all songs
     * Space Complexity: O(1)
     */
    getPlaylistStats(): {
        totalSongs: number;
        totalDuration: number;
        averageDuration: number;
        averageRating: number;
        songsByGenre: Record<string, number>;
        createdAt: Date;
        updatedAt: Date;
    };
    /**
     * Get the current size of the playlist
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getSize(): number;
    /**
     * Check if playlist is empty
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty(): boolean;
    /**
     * Clear all songs from the playlist
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    clearPlaylist(): void;
    /**
     * Get playlist metadata
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getPlaylistInfo(): {
        id: string;
        name: string;
        songCount: number;
        createdAt: Date;
        updatedAt: Date;
    };
    /**
     * Update playlist name
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    updatePlaylistName(newName: string): void;
    /**
     * Shuffle the playlist using Fisher-Yates algorithm
     * Time Complexity: O(n)
     * Space Complexity: O(n) - need to convert to array and back
     */
    shufflePlaylist(): boolean;
}
//# sourceMappingURL=PlaylistEngine.d.ts.map