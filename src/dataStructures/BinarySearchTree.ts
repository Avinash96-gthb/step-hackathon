import { Song } from '../types';

/**
 * Binary Search Tree Node for song rating system
 */
export class BSTNode<T> {
  key: number;
  data: T[];  // Array to store multiple songs with same rating
  left: BSTNode<T> | null = null;
  right: BSTNode<T> | null = null;

  constructor(key: number, data: T) {
    this.key = key;
    this.data = [data];
  }
}

/**
 * Binary Search Tree implementation for song rating system
 * Each node represents a rating (1-5) and contains all songs with that rating
 * 
 * Time Complexity:
 * - Insert: O(log n) average, O(n) worst case
 * - Search: O(log n) average, O(n) worst case
 * - Delete: O(log n) average, O(n) worst case
 * - Traversal: O(n)
 * 
 * Space Complexity: O(n) where n is the number of unique ratings
 */
export class BinarySearchTree<T> {
  private root: BSTNode<T> | null = null;
  private nodeCount: number = 0;

  /**
   * Insert a song with a specific rating
   * Time Complexity: O(log n) average, O(n) worst case
   * Space Complexity: O(1) for insertion, O(log n) for recursion stack
   */
  insert(rating: number, song: T): boolean {
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    if (!this.root) {
      this.root = new BSTNode(rating, song);
      this.nodeCount++;
      return true;
    }

    return this.insertNode(this.root, rating, song);
  }

  /**
   * Search for all songs with a specific rating
   * Time Complexity: O(log n) average, O(n) worst case
   * Space Complexity: O(1)
   */
  searchByRating(rating: number): T[] {
    if (rating < 1 || rating > 5) {
      return [];
    }

    const node = this.findNode(this.root, rating);
    return node ? [...node.data] : [];
  }

  /**
   * Delete a specific song from the BST
   * Time Complexity: O(log n) average, O(n) worst case
   * Space Complexity: O(log n) for recursion stack
   */
  deleteSong(song: T, rating: number): boolean {
    const node = this.findNode(this.root, rating);
    if (!node) {
      return false;
    }

    const songIndex = node.data.findIndex(s => s === song);
    if (songIndex === -1) {
      return false;
    }

    node.data.splice(songIndex, 1);

    // If no more songs with this rating, remove the entire node
    if (node.data.length === 0) {
      this.root = this.deleteNode(this.root, rating);
      this.nodeCount--;
    }

    return true;
  }

  /**
   * Get all songs sorted by rating (ascending)
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  getAllSongsByRatingAsc(): Array<{ rating: number; songs: T[] }> {
    const result: Array<{ rating: number; songs: T[] }> = [];
    this.inOrderTraversal(this.root, (node) => {
      result.push({ rating: node.key, songs: [...node.data] });
    });
    return result;
  }

  /**
   * Get all songs sorted by rating (descending)
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  getAllSongsByRatingDesc(): Array<{ rating: number; songs: T[] }> {
    const result: Array<{ rating: number; songs: T[] }> = [];
    this.reverseInOrderTraversal(this.root, (node) => {
      result.push({ rating: node.key, songs: [...node.data] });
    });
    return result;
  }

  /**
   * Get songs with rating greater than or equal to threshold
   * Time Complexity: O(n) - worst case need to check all nodes
   * Space Complexity: O(n)
   */
  getSongsWithRatingAtLeast(minRating: number): T[] {
    const result: T[] = [];
    this.collectSongsWithMinRating(this.root, minRating, result);
    return result;
  }

  /**
   * Get songs with rating less than or equal to threshold
   * Time Complexity: O(n) - worst case need to check all nodes
   * Space Complexity: O(n)
   */
  getSongsWithRatingAtMost(maxRating: number): T[] {
    const result: T[] = [];
    this.collectSongsWithMaxRating(this.root, maxRating, result);
    return result;
  }

  /**
   * Get the total number of songs in the BST
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  getTotalSongCount(): number {
    return this.countAllSongs(this.root);
  }

  /**
   * Get count of songs by rating
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  getSongCountByRating(): Record<number, number> {
    const counts: Record<number, number> = {};
    this.inOrderTraversal(this.root, (node) => {
      counts[node.key] = node.data.length;
    });
    return counts;
  }

  /**
   * Check if BST is empty
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  isEmpty(): boolean {
    return this.root === null;
  }

  /**
   * Get the height of the BST
   * Time Complexity: O(n)
   * Space Complexity: O(log n) for recursion stack
   */
  getHeight(): number {
    return this.calculateHeight(this.root);
  }

  /**
   * Clear all nodes from the BST
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  clear(): void {
    this.root = null;
    this.nodeCount = 0;
  }

  // Private helper methods

  private insertNode(node: BSTNode<T>, rating: number, song: T): boolean {
    if (rating === node.key) {
      node.data.push(song);
      return true;
    }

    if (rating < node.key) {
      if (!node.left) {
        node.left = new BSTNode(rating, song);
        this.nodeCount++;
        return true;
      }
      return this.insertNode(node.left, rating, song);
    } else {
      if (!node.right) {
        node.right = new BSTNode(rating, song);
        this.nodeCount++;
        return true;
      }
      return this.insertNode(node.right, rating, song);
    }
  }

  private findNode(node: BSTNode<T> | null, rating: number): BSTNode<T> | null {
    if (!node || node.key === rating) {
      return node;
    }

    if (rating < node.key) {
      return this.findNode(node.left, rating);
    } else {
      return this.findNode(node.right, rating);
    }
  }

  private deleteNode(node: BSTNode<T> | null, rating: number): BSTNode<T> | null {
    if (!node) {
      return null;
    }

    if (rating < node.key) {
      node.left = this.deleteNode(node.left, rating);
    } else if (rating > node.key) {
      node.right = this.deleteNode(node.right, rating);
    } else {
      // Node to be deleted found
      if (!node.left && !node.right) {
        return null;
      }

      if (!node.left) {
        return node.right;
      }

      if (!node.right) {
        return node.left;
      }

      // Node has two children - find inorder successor
      const successor = this.findMin(node.right);
      node.key = successor.key;
      node.data = successor.data;
      node.right = this.deleteNode(node.right, successor.key);
    }

    return node;
  }

  private findMin(node: BSTNode<T>): BSTNode<T> {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  private inOrderTraversal(node: BSTNode<T> | null, callback: (node: BSTNode<T>) => void): void {
    if (node) {
      this.inOrderTraversal(node.left, callback);
      callback(node);
      this.inOrderTraversal(node.right, callback);
    }
  }

  private reverseInOrderTraversal(node: BSTNode<T> | null, callback: (node: BSTNode<T>) => void): void {
    if (node) {
      this.reverseInOrderTraversal(node.right, callback);
      callback(node);
      this.reverseInOrderTraversal(node.left, callback);
    }
  }

  private collectSongsWithMinRating(node: BSTNode<T> | null, minRating: number, result: T[]): void {
    if (!node) {
      return;
    }

    if (node.key >= minRating) {
      result.push(...node.data);
      this.collectSongsWithMinRating(node.left, minRating, result);
    }

    this.collectSongsWithMinRating(node.right, minRating, result);
  }

  private collectSongsWithMaxRating(node: BSTNode<T> | null, maxRating: number, result: T[]): void {
    if (!node) {
      return;
    }

    if (node.key <= maxRating) {
      result.push(...node.data);
      this.collectSongsWithMaxRating(node.right, maxRating, result);
    }

    this.collectSongsWithMaxRating(node.left, maxRating, result);
  }

  private countAllSongs(node: BSTNode<T> | null): number {
    if (!node) {
      return 0;
    }

    return node.data.length + 
           this.countAllSongs(node.left) + 
           this.countAllSongs(node.right);
  }

  private calculateHeight(node: BSTNode<T> | null): number {
    if (!node) {
      return -1;
    }

    return 1 + Math.max(
      this.calculateHeight(node.left),
      this.calculateHeight(node.right)
    );
  }
}
