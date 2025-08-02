/**
 * Binary Search Tree Node for song rating system
 */
export declare class BSTNode<T> {
    key: number;
    data: T[];
    left: BSTNode<T> | null;
    right: BSTNode<T> | null;
    constructor(key: number, data: T);
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
export declare class BinarySearchTree<T> {
    private root;
    private nodeCount;
    /**
     * Insert a song with a specific rating
     * Time Complexity: O(log n) average, O(n) worst case
     * Space Complexity: O(1) for insertion, O(log n) for recursion stack
     */
    insert(rating: number, song: T): boolean;
    /**
     * Search for all songs with a specific rating
     * Time Complexity: O(log n) average, O(n) worst case
     * Space Complexity: O(1)
     */
    searchByRating(rating: number): T[];
    /**
     * Delete a specific song from the BST
     * Time Complexity: O(log n) average, O(n) worst case
     * Space Complexity: O(log n) for recursion stack
     */
    deleteSong(song: T, rating: number): boolean;
    /**
     * Get all songs sorted by rating (ascending)
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    getAllSongsByRatingAsc(): Array<{
        rating: number;
        songs: T[];
    }>;
    /**
     * Get all songs sorted by rating (descending)
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    getAllSongsByRatingDesc(): Array<{
        rating: number;
        songs: T[];
    }>;
    /**
     * Get songs with rating greater than or equal to threshold
     * Time Complexity: O(n) - worst case need to check all nodes
     * Space Complexity: O(n)
     */
    getSongsWithRatingAtLeast(minRating: number): T[];
    /**
     * Get songs with rating less than or equal to threshold
     * Time Complexity: O(n) - worst case need to check all nodes
     * Space Complexity: O(n)
     */
    getSongsWithRatingAtMost(maxRating: number): T[];
    /**
     * Get the total number of songs in the BST
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    getTotalSongCount(): number;
    /**
     * Get count of songs by rating
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    getSongCountByRating(): Record<number, number>;
    /**
     * Check if BST is empty
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty(): boolean;
    /**
     * Get the height of the BST
     * Time Complexity: O(n)
     * Space Complexity: O(log n) for recursion stack
     */
    getHeight(): number;
    /**
     * Clear all nodes from the BST
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    clear(): void;
    private insertNode;
    private findNode;
    private deleteNode;
    private findMin;
    private inOrderTraversal;
    private reverseInOrderTraversal;
    private collectSongsWithMinRating;
    private collectSongsWithMaxRating;
    private countAllSongs;
    private calculateHeight;
}
//# sourceMappingURL=BinarySearchTree.d.ts.map