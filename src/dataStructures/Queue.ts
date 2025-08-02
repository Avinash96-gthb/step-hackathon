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
export class Queue<T> {
  private items: (T | undefined)[];
  private front: number = 0;
  private rear: number = 0;
  private count: number = 0;
  private maxSize: number;

  constructor(maxSize: number = 10) {
    this.maxSize = maxSize;
    this.items = new Array(maxSize);
  }

  /**
   * Add element to the rear of the queue
   * If queue is full, removes the oldest element first (sliding window behavior)
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  enqueue(item: T): void {
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
  dequeue(): T | undefined {
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
  peek(): T | undefined {
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
  isEmpty(): boolean {
    return this.count === 0;
  }

  /**
   * Check if queue is full
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  isFull(): boolean {
    return this.count === this.maxSize;
  }

  /**
   * Get current size of the queue
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  size(): number {
    return this.count;
  }

  /**
   * Get maximum capacity of the queue
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  capacity(): number {
    return this.maxSize;
  }

  /**
   * Clear all elements from the queue
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  clear(): void {
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
  toArray(): T[] {
    const result: T[] = [];
    let index = this.front;
    
    for (let i = 0; i < this.count; i++) {
      result.push(this.items[index]!);
      index = (index + 1) % this.maxSize;
    }
    
    return result;
  }

  /**
   * Check if queue contains a specific element
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  contains(item: T): boolean {
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
  getAll(): T[] {
    return this.toArray();
  }
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
export class Deque<T> {
  private items: (T | undefined)[];
  private front: number;
  private rear: number;
  private count: number = 0;
  private maxSize: number;

  constructor(maxSize: number = 10) {
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
  addFront(item: T): boolean {
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
  addRear(item: T): boolean {
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
  removeFront(): T | undefined {
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
  removeRear(): T | undefined {
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
  peekFront(): T | undefined {
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
  peekRear(): T | undefined {
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
  isEmpty(): boolean {
    return this.count === 0;
  }

  /**
   * Check if deque is full
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  isFull(): boolean {
    return this.count === this.maxSize;
  }

  /**
   * Get current size
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  size(): number {
    return this.count;
  }

  /**
   * Clear all elements
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  clear(): void {
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
  toArray(): T[] {
    const result: T[] = [];
    let index = this.front;
    
    for (let i = 0; i < this.count; i++) {
      result.push(this.items[index]!);
      index = (index + 1) % this.maxSize;
    }
    
    return result;
  }
}
