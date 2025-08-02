import { SortCriteria } from '../types';

/**
 * Sorting algorithms implementation for playlist sorting
 * Includes Merge Sort, Quick Sort, and Heap Sort
 */

/**
 * Merge Sort implementation
 * Time Complexity: O(n log n) - stable
 * Space Complexity: O(n)
 * 
 * Stable sort - maintains relative order of equal elements
 * Best for large datasets and when stability is required
 */
export class MergeSort {
  /**
   * Sort array using merge sort algorithm
   * Time Complexity: O(n log n)
   * Space Complexity: O(n)
   */
  static sort<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
    if (arr.length <= 1) {
      return [...arr];
    }

    return this.mergeSort([...arr], compareFn);
  }

  private static mergeSort<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
    if (arr.length <= 1) {
      return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return this.merge(
      this.mergeSort(left, compareFn),
      this.mergeSort(right, compareFn),
      compareFn
    );
  }

  private static merge<T>(left: T[], right: T[], compareFn: (a: T, b: T) => number): T[] {
    const result: T[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (compareFn(left[leftIndex], right[rightIndex]) <= 0) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    // Add remaining elements
    while (leftIndex < left.length) {
      result.push(left[leftIndex]);
      leftIndex++;
    }

    while (rightIndex < right.length) {
      result.push(right[rightIndex]);
      rightIndex++;
    }

    return result;
  }
}

/**
 * Quick Sort implementation
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n) average (recursion stack)
 * 
 * In-place sorting algorithm, good average performance
 * Best for general-purpose sorting when space is limited
 */
export class QuickSort {
  /**
   * Sort array using quick sort algorithm
   * Time Complexity: O(n log n) average, O(n²) worst case
   * Space Complexity: O(log n) average
   */
  static sort<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
    const sortedArray = [...arr];
    this.quickSort(sortedArray, 0, sortedArray.length - 1, compareFn);
    return sortedArray;
  }

  private static quickSort<T>(
    arr: T[], 
    low: number, 
    high: number, 
    compareFn: (a: T, b: T) => number
  ): void {
    if (low < high) {
      const pivotIndex = this.partition(arr, low, high, compareFn);
      this.quickSort(arr, low, pivotIndex - 1, compareFn);
      this.quickSort(arr, pivotIndex + 1, high, compareFn);
    }
  }

  private static partition<T>(
    arr: T[], 
    low: number, 
    high: number, 
    compareFn: (a: T, b: T) => number
  ): number {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (compareFn(arr[j], pivot) <= 0) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }
}

/**
 * Heap Sort implementation
 * Time Complexity: O(n log n) - guaranteed
 * Space Complexity: O(1)
 * 
 * In-place sorting with guaranteed O(n log n) performance
 * Best when consistent performance is required
 */
export class HeapSort {
  /**
   * Sort array using heap sort algorithm
   * Time Complexity: O(n log n)
   * Space Complexity: O(1)
   */
  static sort<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
    const sortedArray = [...arr];
    const n = sortedArray.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.heapify(sortedArray, n, i, compareFn);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      [sortedArray[0], sortedArray[i]] = [sortedArray[i], sortedArray[0]];
      this.heapify(sortedArray, i, 0, compareFn);
    }

    return sortedArray;
  }

  private static heapify<T>(
    arr: T[], 
    n: number, 
    i: number, 
    compareFn: (a: T, b: T) => number
  ): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && compareFn(arr[left], arr[largest]) > 0) {
      largest = left;
    }

    if (right < n && compareFn(arr[right], arr[largest]) > 0) {
      largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      this.heapify(arr, n, largest, compareFn);
    }
  }
}

/**
 * Utility class for creating comparison functions
 */
export class SortingUtils {
  /**
   * Create a comparison function for songs based on criteria
   */
  static createSongComparator<T extends Record<string, any>>(
    criteria: SortCriteria
  ): (a: T, b: T) => number {
    return (a: T, b: T): number => {
      let result = 0;

      switch (criteria.field) {
        case 'title':
          result = a.title.localeCompare(b.title);
          break;
        case 'duration':
          result = a.duration - b.duration;
          break;
        case 'dateAdded':
          result = new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
          break;
        case 'playCount':
          result = a.playCount - b.playCount;
          break;
        case 'rating':
          result = (a.rating || 0) - (b.rating || 0);
          break;
        default:
          result = 0;
      }

      return criteria.order === 'desc' ? -result : result;
    };
  }

  /**
   * Sort songs by multiple criteria
   */
  static createMultiCriteriaComparator<T extends Record<string, any>>(
    criteriaList: SortCriteria[]
  ): (a: T, b: T) => number {
    return (a: T, b: T): number => {
      for (const criteria of criteriaList) {
        const compareFn = this.createSongComparator<T>(criteria);
        const result = compareFn(a, b);
        if (result !== 0) {
          return result;
        }
      }
      return 0;
    };
  }

  /**
   * Benchmark sorting algorithms
   */
  static benchmarkSorts<T>(
    data: T[],
    compareFn: (a: T, b: T) => number,
    iterations: number = 1
  ): {
    mergeSort: number;
    quickSort: number;
    heapSort: number;
    builtinSort: number;
  } {
    const results = {
      mergeSort: 0,
      quickSort: 0,
      heapSort: 0,
      builtinSort: 0
    };

    for (let i = 0; i < iterations; i++) {
      // Merge Sort
      const mergeSortData = [...data];
      const mergeStart = performance.now();
      MergeSort.sort(mergeSortData, compareFn);
      results.mergeSort += performance.now() - mergeStart;

      // Quick Sort
      const quickSortData = [...data];
      const quickStart = performance.now();
      QuickSort.sort(quickSortData, compareFn);
      results.quickSort += performance.now() - quickStart;

      // Heap Sort
      const heapSortData = [...data];
      const heapStart = performance.now();
      HeapSort.sort(heapSortData, compareFn);
      results.heapSort += performance.now() - heapStart;

      // Built-in Sort
      const builtinSortData = [...data];
      const builtinStart = performance.now();
      builtinSortData.sort(compareFn);
      results.builtinSort += performance.now() - builtinStart;
    }

    // Average the results
    results.mergeSort /= iterations;
    results.quickSort /= iterations;
    results.heapSort /= iterations;
    results.builtinSort /= iterations;

    return results;
  }

  /**
   * Check if array is sorted
   */
  static isSorted<T>(arr: T[], compareFn: (a: T, b: T) => number): boolean {
    for (let i = 1; i < arr.length; i++) {
      if (compareFn(arr[i - 1], arr[i]) > 0) {
        return false;
      }
    }
    return true;
  }

  /**
   * Generate test data for sorting algorithms
   */
  static generateTestData(size: number): number[] {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
  }
}
