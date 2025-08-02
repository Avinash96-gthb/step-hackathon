/**
 * Node class for doubly linked list implementation
 * Each node contains a song and pointers to previous and next nodes
 */
export declare class DoublyLinkedListNode<T> {
    data: T;
    next: DoublyLinkedListNode<T> | null;
    prev: DoublyLinkedListNode<T> | null;
    constructor(data: T);
}
/**
 * Doubly Linked List implementation for playlist management
 *
 * Time Complexity:
 * - Insert at head/tail: O(1)
 * - Insert at position: O(n)
 * - Delete at head/tail: O(1)
 * - Delete at position: O(n)
 * - Search: O(n)
 * - Reverse: O(n)
 *
 * Space Complexity: O(n) where n is the number of elements
 */
export declare class DoublyLinkedList<T> {
    private head;
    private tail;
    private size;
    /**
     * Get the current size of the list
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getSize(): number;
    /**
     * Check if the list is empty
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty(): boolean;
    /**
     * Add element to the end of the list
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    append(data: T): void;
    /**
     * Add element to the beginning of the list
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    prepend(data: T): void;
    /**
     * Insert element at specific index
     * Time Complexity: O(n) - need to traverse to position
     * Space Complexity: O(1)
     */
    insertAt(index: number, data: T): boolean;
    /**
     * Remove element at specific index
     * Time Complexity: O(n) - need to traverse to position
     * Space Complexity: O(1)
     */
    removeAt(index: number): T | null;
    /**
     * Move element from one position to another
     * Time Complexity: O(n) - need to traverse to both positions
     * Space Complexity: O(1)
     */
    move(fromIndex: number, toIndex: number): boolean;
    /**
     * Get element at specific index
     * Time Complexity: O(n) - need to traverse to position
     * Space Complexity: O(1)
     */
    get(index: number): T | null;
    /**
     * Reverse the entire list
     * Time Complexity: O(n) - need to visit each node once
     * Space Complexity: O(1) - only swapping pointers
     */
    reverse(): void;
    /**
     * Convert list to array
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    toArray(): T[];
    /**
     * Find index of first occurrence of element
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    indexOf(data: T): number;
    /**
     * Clear all elements from the list
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    clear(): void;
    /**
     * Helper method to get node at specific index
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    private getNodeAt;
    /**
     * Get iterator for the list (for...of support)
     */
    [Symbol.iterator](): Iterator<T>;
}
//# sourceMappingURL=DoublyLinkedList.d.ts.map