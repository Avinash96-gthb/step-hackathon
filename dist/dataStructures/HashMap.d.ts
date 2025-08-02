/**
 * Custom HashMap implementation for instant song lookup
 * Uses separate chaining for collision resolution
 *
 * Time Complexity:
 * - Insert/Set: O(1) average, O(n) worst case
 * - Get: O(1) average, O(n) worst case
 * - Delete: O(1) average, O(n) worst case
 * - Contains: O(1) average, O(n) worst case
 *
 * Space Complexity: O(n) where n is the number of key-value pairs
 */
export declare class HashMap<K, V> {
    private buckets;
    private size;
    private capacity;
    private loadFactorThreshold;
    constructor(initialCapacity?: number);
    /**
     * Hash function to convert key to bucket index
     * Time Complexity: O(1) for string keys, O(k) for string keys where k is key length
     * Space Complexity: O(1)
     */
    private hash;
    /**
     * Set a key-value pair in the hash map
     * Time Complexity: O(1) average, O(n) worst case
     * Space Complexity: O(1)
     */
    set(key: K, value: V): void;
    /**
     * Get value by key
     * Time Complexity: O(1) average, O(n) worst case
     * Space Complexity: O(1)
     */
    get(key: K): V | undefined;
    /**
     * Check if key exists in the hash map
     * Time Complexity: O(1) average, O(n) worst case
     * Space Complexity: O(1)
     */
    has(key: K): boolean;
    /**
     * Delete a key-value pair
     * Time Complexity: O(1) average, O(n) worst case
     * Space Complexity: O(1)
     */
    delete(key: K): boolean;
    /**
     * Clear all entries from the hash map
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    clear(): void;
    /**
     * Get the current size of the hash map
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getSize(): number;
    /**
     * Check if the hash map is empty
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty(): boolean;
    /**
     * Get all keys in the hash map
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    keys(): K[];
    /**
     * Get all values in the hash map
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    values(): V[];
    /**
     * Get all key-value pairs
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    entries(): Array<[K, V]>;
    /**
     * Get current load factor
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getLoadFactor(): number;
    /**
     * Get statistics about the hash map
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    getStats(): {
        size: number;
        capacity: number;
        loadFactor: number;
        collisions: number;
        maxBucketSize: number;
        avgBucketSize: number;
    };
    /**
     * Resize the hash map when load factor exceeds threshold
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    private resize;
    /**
     * Iterator support for for...of loops
     */
    [Symbol.iterator](): Iterator<[K, V]>;
    /**
     * Create a hash map from an array of key-value pairs
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    static from<K, V>(entries: Array<[K, V]>): HashMap<K, V>;
}
//# sourceMappingURL=HashMap.d.ts.map