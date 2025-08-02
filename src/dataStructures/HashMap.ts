/**
 * Hash table entry for collision handling
 */
interface HashEntry<K, V> {
  key: K;
  value: V;
  deleted?: boolean; // For lazy deletion
}

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
export class HashMap<K, V> {
  private buckets: Array<Array<HashEntry<K, V>>>;
  private size: number = 0;
  private capacity: number;
  private loadFactorThreshold: number = 0.75;

  constructor(initialCapacity: number = 16) {
    this.capacity = initialCapacity;
    this.buckets = new Array(this.capacity);
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }
  }

  /**
   * Hash function to convert key to bucket index
   * Time Complexity: O(1) for string keys, O(k) for string keys where k is key length
   * Space Complexity: O(1)
   */
  private hash(key: K): number {
    let hash = 0;
    const keyStr = String(key);
    
    for (let i = 0; i < keyStr.length; i++) {
      const char = keyStr.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash) % this.capacity;
  }

  /**
   * Set a key-value pair in the hash map
   * Time Complexity: O(1) average, O(n) worst case
   * Space Complexity: O(1)
   */
  set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    // Check if key already exists
    for (const entry of bucket) {
      if (entry.key === key && !entry.deleted) {
        entry.value = value;
        return;
      }
    }

    // Add new entry
    bucket.push({ key, value });
    this.size++;

    // Check if resize is needed
    if (this.size >= this.capacity * this.loadFactorThreshold) {
      this.resize();
    }
  }

  /**
   * Get value by key
   * Time Complexity: O(1) average, O(n) worst case
   * Space Complexity: O(1)
   */
  get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const entry of bucket) {
      if (entry.key === key && !entry.deleted) {
        return entry.value;
      }
    }

    return undefined;
  }

  /**
   * Check if key exists in the hash map
   * Time Complexity: O(1) average, O(n) worst case
   * Space Complexity: O(1)
   */
  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  /**
   * Delete a key-value pair
   * Time Complexity: O(1) average, O(n) worst case
   * Space Complexity: O(1)
   */
  delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const entry = bucket[i];
      if (entry.key === key && !entry.deleted) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  /**
   * Clear all entries from the hash map
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  clear(): void {
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }
    this.size = 0;
  }

  /**
   * Get the current size of the hash map
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Check if the hash map is empty
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Get all keys in the hash map
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  keys(): K[] {
    const keys: K[] = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        if (!entry.deleted) {
          keys.push(entry.key);
        }
      }
    }
    return keys;
  }

  /**
   * Get all values in the hash map
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  values(): V[] {
    const values: V[] = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        if (!entry.deleted) {
          values.push(entry.value);
        }
      }
    }
    return values;
  }

  /**
   * Get all key-value pairs
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  entries(): Array<[K, V]> {
    const entries: Array<[K, V]> = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        if (!entry.deleted) {
          entries.push([entry.key, entry.value]);
        }
      }
    }
    return entries;
  }

  /**
   * Get current load factor
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  getLoadFactor(): number {
    return this.size / this.capacity;
  }

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
  } {
    let collisions = 0;
    let maxBucketSize = 0;
    let totalBucketSize = 0;
    let nonEmptyBuckets = 0;

    for (const bucket of this.buckets) {
      const bucketSize = bucket.filter(entry => !entry.deleted).length;
      if (bucketSize > 0) {
        nonEmptyBuckets++;
        totalBucketSize += bucketSize;
        if (bucketSize > 1) {
          collisions += bucketSize - 1;
        }
        maxBucketSize = Math.max(maxBucketSize, bucketSize);
      }
    }

    return {
      size: this.size,
      capacity: this.capacity,
      loadFactor: this.getLoadFactor(),
      collisions,
      maxBucketSize,
      avgBucketSize: nonEmptyBuckets > 0 ? totalBucketSize / nonEmptyBuckets : 0
    };
  }

  /**
   * Resize the hash map when load factor exceeds threshold
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  private resize(): void {
    const oldBuckets = this.buckets;
    const oldCapacity = this.capacity;

    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }
    this.size = 0;

    // Rehash all existing entries
    for (const bucket of oldBuckets) {
      for (const entry of bucket) {
        if (!entry.deleted) {
          this.set(entry.key, entry.value);
        }
      }
    }
  }

  /**
   * Iterator support for for...of loops
   */
  *[Symbol.iterator](): Iterator<[K, V]> {
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        if (!entry.deleted) {
          yield [entry.key, entry.value];
        }
      }
    }
  }

  /**
   * Create a hash map from an array of key-value pairs
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  static from<K, V>(entries: Array<[K, V]>): HashMap<K, V> {
    const map = new HashMap<K, V>(Math.max(16, entries.length * 2));
    for (const [key, value] of entries) {
      map.set(key, value);
    }
    return map;
  }
}
