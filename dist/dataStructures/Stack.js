"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
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
class Stack {
    constructor(maxSize) {
        this.items = [];
        this.maxSize = maxSize;
    }
    /**
     * Add element to the top of the stack
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    push(item) {
        if (this.maxSize && this.items.length >= this.maxSize) {
            // Remove oldest item to maintain max size (FIFO for overflow)
            this.items.shift();
        }
        this.items.push(item);
        return true;
    }
    /**
     * Remove and return the top element from the stack
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    pop() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.pop();
    }
    /**
     * Return the top element without removing it
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.items.length - 1];
    }
    /**
     * Check if the stack is empty
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty() {
        return this.items.length === 0;
    }
    /**
     * Get the current size of the stack
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    size() {
        return this.items.length;
    }
    /**
     * Clear all elements from the stack
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    clear() {
        this.items = [];
    }
    /**
     * Convert stack to array (top to bottom order)
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    toArray() {
        return [...this.items].reverse();
    }
    /**
     * Get all elements without modifying the stack
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    getAll() {
        return [...this.items];
    }
    /**
     * Check if stack contains a specific element
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    contains(item) {
        return this.items.includes(item);
    }
    /**
     * Get the maximum size of the stack
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getMaxSize() {
        return this.maxSize;
    }
    /**
     * Check if the stack is at maximum capacity
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isFull() {
        return this.maxSize !== undefined && this.items.length >= this.maxSize;
    }
}
exports.Stack = Stack;
//# sourceMappingURL=Stack.js.map