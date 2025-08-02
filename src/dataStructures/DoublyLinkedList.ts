import { Song } from '../types';

/**
 * Node class for doubly linked list implementation
 * Each node contains a song and pointers to previous and next nodes
 */
export class DoublyLinkedListNode<T> {
  data: T;
  next: DoublyLinkedListNode<T> | null = null;
  prev: DoublyLinkedListNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
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
export class DoublyLinkedList<T> {
  private head: DoublyLinkedListNode<T> | null = null;
  private tail: DoublyLinkedListNode<T> | null = null;
  private size: number = 0;

  /**
   * Get the current size of the list
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Check if the list is empty
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Add element to the end of the list
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  append(data: T): void {
    const newNode = new DoublyLinkedListNode(data);

    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  /**
   * Add element to the beginning of the list
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  prepend(data: T): void {
    const newNode = new DoublyLinkedListNode(data);

    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
  }

  /**
   * Insert element at specific index
   * Time Complexity: O(n) - need to traverse to position
   * Space Complexity: O(1)
   */
  insertAt(index: number, data: T): boolean {
    if (index < 0 || index > this.size) {
      return false;
    }

    if (index === 0) {
      this.prepend(data);
      return true;
    }

    if (index === this.size) {
      this.append(data);
      return true;
    }

    const newNode = new DoublyLinkedListNode(data);
    let current = this.getNodeAt(index);

    if (current) {
      newNode.next = current;
      newNode.prev = current.prev;
      current.prev!.next = newNode;
      current.prev = newNode;
      this.size++;
      return true;
    }

    return false;
  }

  /**
   * Remove element at specific index
   * Time Complexity: O(n) - need to traverse to position
   * Space Complexity: O(1)
   */
  removeAt(index: number): T | null {
    if (index < 0 || index >= this.size) {
      return null;
    }

    if (this.size === 1) {
      const data = this.head!.data;
      this.head = this.tail = null;
      this.size--;
      return data;
    }

    if (index === 0) {
      const data = this.head!.data;
      this.head = this.head!.next;
      this.head!.prev = null;
      this.size--;
      return data;
    }

    if (index === this.size - 1) {
      const data = this.tail!.data;
      this.tail = this.tail!.prev;
      this.tail!.next = null;
      this.size--;
      return data;
    }

    const nodeToRemove = this.getNodeAt(index);
    if (nodeToRemove) {
      const data = nodeToRemove.data;
      nodeToRemove.prev!.next = nodeToRemove.next;
      nodeToRemove.next!.prev = nodeToRemove.prev;
      this.size--;
      return data;
    }

    return null;
  }

  /**
   * Move element from one position to another
   * Time Complexity: O(n) - need to traverse to both positions
   * Space Complexity: O(1)
   */
  move(fromIndex: number, toIndex: number): boolean {
    if (fromIndex < 0 || fromIndex >= this.size || toIndex < 0 || toIndex >= this.size) {
      return false;
    }

    if (fromIndex === toIndex) {
      return true;
    }

    const data = this.removeAt(fromIndex);
    if (data === null) {
      return false;
    }

    // Adjust toIndex if moving forward
    const adjustedToIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
    return this.insertAt(adjustedToIndex, data);
  }

  /**
   * Get element at specific index
   * Time Complexity: O(n) - need to traverse to position
   * Space Complexity: O(1)
   */
  get(index: number): T | null {
    const node = this.getNodeAt(index);
    return node ? node.data : null;
  }

  /**
   * Reverse the entire list
   * Time Complexity: O(n) - need to visit each node once
   * Space Complexity: O(1) - only swapping pointers
   */
  reverse(): void {
    if (this.size <= 1) {
      return;
    }

    let current = this.head;
    let temp: DoublyLinkedListNode<T> | null = null;

    // Swap next and prev for all nodes
    while (current) {
      temp = current.prev;
      current.prev = current.next;
      current.next = temp;
      current = current.prev; // Move to next node (which is now prev)
    }

    // Swap head and tail
    temp = this.head;
    this.head = this.tail;
    this.tail = temp;
  }

  /**
   * Convert list to array
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;

    while (current) {
      result.push(current.data);
      current = current.next;
    }

    return result;
  }

  /**
   * Find index of first occurrence of element
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  indexOf(data: T): number {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.data === data) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  }

  /**
   * Clear all elements from the list
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  clear(): void {
    this.head = this.tail = null;
    this.size = 0;
  }

  /**
   * Helper method to get node at specific index
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  private getNodeAt(index: number): DoublyLinkedListNode<T> | null {
    if (index < 0 || index >= this.size) {
      return null;
    }

    // Optimize by starting from head or tail based on which is closer
    if (index < this.size / 2) {
      let current = this.head;
      for (let i = 0; i < index; i++) {
        current = current!.next;
      }
      return current;
    } else {
      let current = this.tail;
      for (let i = this.size - 1; i > index; i--) {
        current = current!.prev;
      }
      return current;
    }
  }

  /**
   * Get iterator for the list (for...of support)
   */
  *[Symbol.iterator](): Iterator<T> {
    let current = this.head;
    while (current) {
      yield current.data;
      current = current.next;
    }
  }
}
