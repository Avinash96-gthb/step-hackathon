/**
 * Stack implementation for playback history management
 *
 * Time Complexity:
 * - Push: O(1)
 * - Pop: O(1)
 * - Peek: O(1)
 * - isEmpty: O(1)
 * - Size: O(1)
 *
 * Space Complexity: O(n) where n is the number of elements
 */
export declare class Stack<T> {
    private items;
    private maxSize?;
    constructor(maxSize?: number);
    /**
     * Add element to the top of the stack
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    push(item: T): boolean;
    /**
     * Remove and return the top element from the stack
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    pop(): T | null;
    /**
     * Return the top element without removing it
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    peek(): T | null;
    /**
     * Check if the stack is empty
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty(): boolean;
    /**
     * Get the current size of the stack
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    size(): number;
    /**
     * Clear all elements from the stack
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    clear(): void;
    /**
     * Convert stack to array (top to bottom order)
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    toArray(): T[];
    /**
     * Get all elements without modifying the stack
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    getAll(): T[];
    /**
     * Check if stack contains a specific element
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    contains(item: T): boolean;
    /**
     * Get the maximum size of the stack
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getMaxSize(): number | undefined;
    /**
     * Check if the stack is at maximum capacity
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isFull(): boolean;
}
//# sourceMappingURL=Stack.d.ts.map