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
export class Stack<T> {
  private items: T[] = [];
  private maxSize?: number;

  constructor(maxSize?: number) {
    this.maxSize = maxSize;
  }

  /**
   * Add element to the top of the stack
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  push(item: T): boolean {
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
  pop(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.pop()!;
  }

  /**
   * Return the top element without removing it
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  peek(): T | null {
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
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Get the current size of the stack
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  size(): number {
    return this.items.length;
  }

  /**
   * Clear all elements from the stack
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  clear(): void {
    this.items = [];
  }

  /**
   * Convert stack to array (top to bottom order)
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  toArray(): T[] {
    return [...this.items].reverse();
  }

  /**
   * Get all elements without modifying the stack
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  getAll(): T[] {
    return [...this.items];
  }

  /**
   * Check if stack contains a specific element
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  contains(item: T): boolean {
    return this.items.includes(item);
  }

  /**
   * Get the maximum size of the stack
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  getMaxSize(): number | undefined {
    return this.maxSize;
  }

  /**
   * Check if the stack is at maximum capacity
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  isFull(): boolean {
    return this.maxSize !== undefined && this.items.length >= this.maxSize;
  }
}
