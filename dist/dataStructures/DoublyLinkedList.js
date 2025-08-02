"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoublyLinkedList = exports.DoublyLinkedListNode = void 0;
/**
 * Node class for doubly linked list implementation
 * Each node contains a song and pointers to previous and next nodes
 */
class DoublyLinkedListNode {
    constructor(data) {
        this.next = null;
        this.prev = null;
        this.data = data;
    }
}
exports.DoublyLinkedListNode = DoublyLinkedListNode;
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
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    /**
     * Get the current size of the list
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getSize() {
        return this.size;
    }
    /**
     * Check if the list is empty
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty() {
        return this.size === 0;
    }
    /**
     * Add element to the end of the list
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    append(data) {
        const newNode = new DoublyLinkedListNode(data);
        if (!this.head) {
            this.head = this.tail = newNode;
        }
        else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }
    /**
     * Add element to the beginning of the list
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    prepend(data) {
        const newNode = new DoublyLinkedListNode(data);
        if (!this.head) {
            this.head = this.tail = newNode;
        }
        else {
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
    insertAt(index, data) {
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
            current.prev.next = newNode;
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
    removeAt(index) {
        if (index < 0 || index >= this.size) {
            return null;
        }
        if (this.size === 1) {
            const data = this.head.data;
            this.head = this.tail = null;
            this.size--;
            return data;
        }
        if (index === 0) {
            const data = this.head.data;
            this.head = this.head.next;
            this.head.prev = null;
            this.size--;
            return data;
        }
        if (index === this.size - 1) {
            const data = this.tail.data;
            this.tail = this.tail.prev;
            this.tail.next = null;
            this.size--;
            return data;
        }
        const nodeToRemove = this.getNodeAt(index);
        if (nodeToRemove) {
            const data = nodeToRemove.data;
            nodeToRemove.prev.next = nodeToRemove.next;
            nodeToRemove.next.prev = nodeToRemove.prev;
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
    move(fromIndex, toIndex) {
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
    get(index) {
        const node = this.getNodeAt(index);
        return node ? node.data : null;
    }
    /**
     * Reverse the entire list
     * Time Complexity: O(n) - need to visit each node once
     * Space Complexity: O(1) - only swapping pointers
     */
    reverse() {
        if (this.size <= 1) {
            return;
        }
        let current = this.head;
        let temp = null;
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
    toArray() {
        const result = [];
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
    indexOf(data) {
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
    clear() {
        this.head = this.tail = null;
        this.size = 0;
    }
    /**
     * Helper method to get node at specific index
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    getNodeAt(index) {
        if (index < 0 || index >= this.size) {
            return null;
        }
        // Optimize by starting from head or tail based on which is closer
        if (index < this.size / 2) {
            let current = this.head;
            for (let i = 0; i < index; i++) {
                current = current.next;
            }
            return current;
        }
        else {
            let current = this.tail;
            for (let i = this.size - 1; i > index; i--) {
                current = current.prev;
            }
            return current;
        }
    }
    /**
     * Get iterator for the list (for...of support)
     */
    *[Symbol.iterator]() {
        let current = this.head;
        while (current) {
            yield current.data;
            current = current.next;
        }
    }
}
exports.DoublyLinkedList = DoublyLinkedList;
//# sourceMappingURL=DoublyLinkedList.js.map