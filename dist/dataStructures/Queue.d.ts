/**
 * Queue implementation for recently skipped songs tracking
 * Uses circular buffer for efficient memory usage with fixed size
 *
 * Time Complexity:
 * - Enqueue: O(1)
 * - Dequeue: O(1)
 * - Peek: O(1)
 * - isEmpty/isFull: O(1)
 *
 * Space Complexity: O(k) where k is the maximum size
 */
export declare class Queue<T> {
    private items;
    private front;
    private rear;
    private count;
    private maxSize;
    constructor(maxSize?: number);
    /**
     * Add element to the rear of the queue
     * If queue is full, removes the oldest element first (sliding window behavior)
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    enqueue(item: T): void;
    /**
     * Remove and return element from the front of the queue
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    dequeue(): T | undefined;
    /**
     * Return the front element without removing it
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    peek(): T | undefined;
    /**
     * Check if queue is empty
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty(): boolean;
    /**
     * Check if queue is full
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isFull(): boolean;
    /**
     * Get current size of the queue
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    size(): number;
    /**
     * Get maximum capacity of the queue
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    capacity(): number;
    /**
     * Clear all elements from the queue
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    clear(): void;
    /**
     * Convert queue to array (front to rear order)
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    toArray(): T[];
    /**
     * Check if queue contains a specific element
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    contains(item: T): boolean;
    /**
     * Get all elements as array without modifying queue
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    getAll(): T[];
}
/**
 * Deque (Double-ended queue) implementation for advanced queue operations
 * Allows insertion and deletion from both ends
 *
 * Time Complexity:
 * - addFront/addRear: O(1)
 * - removeFront/removeRear: O(1)
 * - peekFront/peekRear: O(1)
 *
 * Space Complexity: O(k) where k is the maximum size
 */
export declare class Deque<T> {
    private items;
    private front;
    private rear;
    private count;
    private maxSize;
    constructor(maxSize?: number);
    /**
     * Add element to the front of the deque
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    addFront(item: T): boolean;
    /**
     * Add element to the rear of the deque
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    addRear(item: T): boolean;
    /**
     * Remove element from the front of the deque
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    removeFront(): T | undefined;
    /**
     * Remove element from the rear of the deque
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    removeRear(): T | undefined;
    /**
     * Peek at the front element
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    peekFront(): T | undefined;
    /**
     * Peek at the rear element
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    peekRear(): T | undefined;
    /**
     * Check if deque is empty
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty(): boolean;
    /**
     * Check if deque is full
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isFull(): boolean;
    /**
     * Get current size
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    size(): number;
    /**
     * Clear all elements
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    clear(): void;
    /**
     * Convert to array (front to rear order)
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    toArray(): T[];
}
//# sourceMappingURL=Queue.d.ts.map