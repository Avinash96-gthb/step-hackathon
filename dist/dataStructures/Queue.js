"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deque = exports.Queue = void 0;
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
class Queue {
    constructor(maxSize = 10) {
        this.front = 0;
        this.rear = 0;
        this.count = 0;
        this.maxSize = maxSize;
        this.items = new Array(maxSize);
    }
    /**
     * Add element to the rear of the queue
     * If queue is full, removes the oldest element first (sliding window behavior)
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    enqueue(item) {
        if (this.isFull()) {
            // Remove oldest element to make space (sliding window)
            this.dequeue();
        }
        this.items[this.rear] = item;
        this.rear = (this.rear + 1) % this.maxSize;
        this.count++;
    }
    /**
     * Remove and return element from the front of the queue
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        const item = this.items[this.front];
        this.items[this.front] = undefined;
        this.front = (this.front + 1) % this.maxSize;
        this.count--;
        return item;
    }
    /**
     * Return the front element without removing it
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.front];
    }
    /**
     * Check if queue is empty
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty() {
        return this.count === 0;
    }
    /**
     * Check if queue is full
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isFull() {
        return this.count === this.maxSize;
    }
    /**
     * Get current size of the queue
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    size() {
        return this.count;
    }
    /**
     * Get maximum capacity of the queue
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    capacity() {
        return this.maxSize;
    }
    /**
     * Clear all elements from the queue
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    clear() {
        this.items = new Array(this.maxSize);
        this.front = 0;
        this.rear = 0;
        this.count = 0;
    }
    /**
     * Convert queue to array (front to rear order)
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    toArray() {
        const result = [];
        let index = this.front;
        for (let i = 0; i < this.count; i++) {
            result.push(this.items[index]);
            index = (index + 1) % this.maxSize;
        }
        return result;
    }
    /**
     * Check if queue contains a specific element
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    contains(item) {
        let index = this.front;
        for (let i = 0; i < this.count; i++) {
            if (this.items[index] === item) {
                return true;
            }
            index = (index + 1) % this.maxSize;
        }
        return false;
    }
    /**
     * Get all elements as array without modifying queue
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    getAll() {
        return this.toArray();
    }
}
exports.Queue = Queue;
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
class Deque {
    constructor(maxSize = 10) {
        this.count = 0;
        this.maxSize = maxSize;
        this.items = new Array(maxSize);
        this.front = 0;
        this.rear = maxSize - 1; // Initialize rear to the end for easier calculations
    }
    /**
     * Add element to the front of the deque
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    addFront(item) {
        if (this.isFull()) {
            return false;
        }
        this.front = (this.front - 1 + this.maxSize) % this.maxSize;
        this.items[this.front] = item;
        this.count++;
        return true;
    }
    /**
     * Add element to the rear of the deque
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    addRear(item) {
        if (this.isFull()) {
            return false;
        }
        this.rear = (this.rear + 1) % this.maxSize;
        this.items[this.rear] = item;
        this.count++;
        return true;
    }
    /**
     * Remove element from the front of the deque
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    removeFront() {
        if (this.isEmpty()) {
            return undefined;
        }
        const item = this.items[this.front];
        this.items[this.front] = undefined;
        this.front = (this.front + 1) % this.maxSize;
        this.count--;
        return item;
    }
    /**
     * Remove element from the rear of the deque
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    removeRear() {
        if (this.isEmpty()) {
            return undefined;
        }
        const item = this.items[this.rear];
        this.items[this.rear] = undefined;
        this.rear = (this.rear - 1 + this.maxSize) % this.maxSize;
        this.count--;
        return item;
    }
    /**
     * Peek at the front element
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    peekFront() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.front];
    }
    /**
     * Peek at the rear element
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    peekRear() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.rear];
    }
    /**
     * Check if deque is empty
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty() {
        return this.count === 0;
    }
    /**
     * Check if deque is full
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isFull() {
        return this.count === this.maxSize;
    }
    /**
     * Get current size
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    size() {
        return this.count;
    }
    /**
     * Clear all elements
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    clear() {
        this.items = new Array(this.maxSize);
        this.front = 0;
        this.rear = this.maxSize - 1;
        this.count = 0;
    }
    /**
     * Convert to array (front to rear order)
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    toArray() {
        const result = [];
        let index = this.front;
        for (let i = 0; i < this.count; i++) {
            result.push(this.items[index]);
            index = (index + 1) % this.maxSize;
        }
        return result;
    }
}
exports.Deque = Deque;
//# sourceMappingURL=Queue.js.map