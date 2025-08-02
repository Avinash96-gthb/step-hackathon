import { Song, SortCriteria } from '../types';
import { DoublyLinkedList, MergeSort, QuickSort, SortingUtils } from '../dataStructures';

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
export class PlaylistEngine {
  private playlist: DoublyLinkedList<Song>;
  private playlistId: string;
  private playlistName: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(playlistId: string, playlistName: string) {
    this.playlist = new DoublyLinkedList<Song>();
    this.playlistId = playlistId;
    this.playlistName = playlistName;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Add a song to the playlist
   * Time Complexity: O(1) - append to end
   * Space Complexity: O(1)
   */
  addSong(song: Song): boolean {
    try {
      this.playlist.append(song);
      this.updatedAt = new Date();
      return true;
    } catch (error) {
      console.error('Error adding song to playlist:', error);
      return false;
    }
  }

  /**
   * Add a song at a specific position
   * Time Complexity: O(n) - need to traverse to position
   * Space Complexity: O(1)
   */
  addSongAtPosition(song: Song, position: number): boolean {
    try {
      const success = this.playlist.insertAt(position, song);
      if (success) {
        this.updatedAt = new Date();
      }
      return success;
    } catch (error) {
      console.error('Error adding song at position:', error);
      return false;
    }
  }

  /**
   * Delete a song by index
   * Time Complexity: O(n) - need to traverse to position
   * Space Complexity: O(1)
   */
  deleteSong(index: number): Song | null {
    try {
      const removedSong = this.playlist.removeAt(index);
      if (removedSong) {
        this.updatedAt = new Date();
      }
      return removedSong;
    } catch (error) {
      console.error('Error deleting song:', error);
      return null;
    }
  }

  /**
   * Delete a song by song object
   * Time Complexity: O(n) - need to find the song first
   * Space Complexity: O(1)
   */
  deleteSongBySong(song: Song): boolean {
    try {
      const index = this.playlist.indexOf(song);
      if (index !== -1) {
        this.playlist.removeAt(index);
        this.updatedAt = new Date();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting song by object:', error);
      return false;
    }
  }

  /**
   * Move a song from one position to another
   * Time Complexity: O(n) - need to traverse to both positions
   * Space Complexity: O(1)
   */
  moveSong(fromIndex: number, toIndex: number): boolean {
    try {
      const success = this.playlist.move(fromIndex, toIndex);
      if (success) {
        this.updatedAt = new Date();
      }
      return success;
    } catch (error) {
      console.error('Error moving song:', error);
      return false;
    }
  }

  /**
   * Reverse the entire playlist
   * Time Complexity: O(n) - need to reverse all pointers
   * Space Complexity: O(1) - in-place reversal
   */
  reversePlaylist(): void {
    try {
      this.playlist.reverse();
      this.updatedAt = new Date();
    } catch (error) {
      console.error('Error reversing playlist:', error);
    }
  }

  /**
   * Get a song at a specific index
   * Time Complexity: O(n) - need to traverse to position
   * Space Complexity: O(1)
   */
  getSong(index: number): Song | null {
    try {
      return this.playlist.get(index);
    } catch (error) {
      console.error('Error getting song:', error);
      return null;
    }
  }

  /**
   * Get all songs as an array
   * Time Complexity: O(n) - traverse entire list
   * Space Complexity: O(n) - create new array
   */
  getAllSongs(): Song[] {
    try {
      return this.playlist.toArray();
    } catch (error) {
      console.error('Error getting all songs:', error);
      return [];
    }
  }

  /**
   * Sort playlist by criteria using merge sort (stable)
   * Time Complexity: O(n log n) - merge sort
   * Space Complexity: O(n) - merge sort requires additional space
   */
  sortPlaylist(criteria: SortCriteria, algorithm: 'merge' | 'quick' = 'merge'): boolean {
    try {
      const songs = this.playlist.toArray();
      const compareFn = SortingUtils.createSongComparator<Song>(criteria);
      
      let sortedSongs: Song[];
      
      if (algorithm === 'merge') {
        sortedSongs = MergeSort.sort(songs, compareFn);
      } else {
        sortedSongs = QuickSort.sort(songs, compareFn);
      }

      // Rebuild the playlist with sorted songs
      this.playlist.clear();
      for (const song of sortedSongs) {
        this.playlist.append(song);
      }

      this.updatedAt = new Date();
      return true;
    } catch (error) {
      console.error('Error sorting playlist:', error);
      return false;
    }
  }

  /**
   * Sort playlist by multiple criteria
   * Time Complexity: O(n log n)
   * Space Complexity: O(n)
   */
  sortPlaylistMultiCriteria(criteriaList: SortCriteria[]): boolean {
    try {
      const songs = this.playlist.toArray();
      const compareFn = SortingUtils.createMultiCriteriaComparator<Song>(criteriaList);
      
      const sortedSongs = MergeSort.sort(songs, compareFn);

      // Rebuild the playlist with sorted songs
      this.playlist.clear();
      for (const song of sortedSongs) {
        this.playlist.append(song);
      }

      this.updatedAt = new Date();
      return true;
    } catch (error) {
      console.error('Error sorting playlist with multiple criteria:', error);
      return false;
    }
  }

  /**
   * Find songs by title (partial match)
   * Time Complexity: O(n) - need to check all songs
   * Space Complexity: O(k) where k is the number of matching songs
   */
  findSongsByTitle(title: string): Song[] {
    try {
      const songs = this.playlist.toArray();
      return songs.filter(song => 
        song.title.toLowerCase().includes(title.toLowerCase())
      );
    } catch (error) {
      console.error('Error finding songs by title:', error);
      return [];
    }
  }

  /**
   * Find songs by artist
   * Time Complexity: O(n)
   * Space Complexity: O(k) where k is the number of matching songs
   */
  findSongsByArtist(artist: string): Song[] {
    try {
      const songs = this.playlist.toArray();
      return songs.filter(song => 
        song.artist.toLowerCase().includes(artist.toLowerCase())
      );
    } catch (error) {
      console.error('Error finding songs by artist:', error);
      return [];
    }
  }

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
  } {
    try {
      const songs = this.playlist.toArray();
      const totalSongs = songs.length;
      
      if (totalSongs === 0) {
        return {
          totalSongs: 0,
          totalDuration: 0,
          averageDuration: 0,
          averageRating: 0,
          songsByGenre: {},
          createdAt: this.createdAt,
          updatedAt: this.updatedAt
        };
      }

      const totalDuration = songs.reduce((sum, song) => sum + song.duration, 0);
      const averageDuration = totalDuration / totalSongs;
      
      const ratedSongs = songs.filter(song => song.rating !== undefined);
      const averageRating = ratedSongs.length > 0 
        ? ratedSongs.reduce((sum, song) => sum + (song.rating || 0), 0) / ratedSongs.length
        : 0;

      const songsByGenre: Record<string, number> = {};
      songs.forEach(song => {
        songsByGenre[song.genre] = (songsByGenre[song.genre] || 0) + 1;
      });

      return {
        totalSongs,
        totalDuration,
        averageDuration,
        averageRating,
        songsByGenre,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      };
    } catch (error) {
      console.error('Error getting playlist stats:', error);
      return {
        totalSongs: 0,
        totalDuration: 0,
        averageDuration: 0,
        averageRating: 0,
        songsByGenre: {},
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      };
    }
  }

  /**
   * Get the current size of the playlist
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  getSize(): number {
    return this.playlist.getSize();
  }

  /**
   * Check if playlist is empty
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  isEmpty(): boolean {
    return this.playlist.isEmpty();
  }

  /**
   * Clear all songs from the playlist
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  clearPlaylist(): void {
    try {
      this.playlist.clear();
      this.updatedAt = new Date();
    } catch (error) {
      console.error('Error clearing playlist:', error);
    }
  }

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
  } {
    return {
      id: this.playlistId,
      name: this.playlistName,
      songCount: this.playlist.getSize(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  /**
   * Update playlist name
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  updatePlaylistName(newName: string): void {
    this.playlistName = newName;
    this.updatedAt = new Date();
  }

  /**
   * Shuffle the playlist using Fisher-Yates algorithm
   * Time Complexity: O(n)
   * Space Complexity: O(n) - need to convert to array and back
   */
  shufflePlaylist(): boolean {
    try {
      const songs = this.playlist.toArray();
      
      // Fisher-Yates shuffle
      for (let i = songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [songs[i], songs[j]] = [songs[j], songs[i]];
      }

      // Rebuild playlist with shuffled songs
      this.playlist.clear();
      for (const song of songs) {
        this.playlist.append(song);
      }

      this.updatedAt = new Date();
      return true;
    } catch (error) {
      console.error('Error shuffling playlist:', error);
      return false;
    }
  }
}
