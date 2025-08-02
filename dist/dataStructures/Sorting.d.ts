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
export declare class MergeSort {
    /**
     * Sort array using merge sort algorithm
     * Time Complexity: O(n log n)
     * Space Complexity: O(n)
     */
    static sort<T>(arr: T[], compareFn: (a: T, b: T) => number): T[];
    private static mergeSort;
    private static merge;
}
/**
 * Quick Sort implementation
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n) average (recursion stack)
 *
 * In-place sorting algorithm, good average performance
 * Best for general-purpose sorting when space is limited
 */
export declare class QuickSort {
    /**
     * Sort array using quick sort algorithm
     * Time Complexity: O(n log n) average, O(n²) worst case
     * Space Complexity: O(log n) average
     */
    static sort<T>(arr: T[], compareFn: (a: T, b: T) => number): T[];
    private static quickSort;
    private static partition;
}
/**
 * Heap Sort implementation
 * Time Complexity: O(n log n) - guaranteed
 * Space Complexity: O(1)
 *
 * In-place sorting with guaranteed O(n log n) performance
 * Best when consistent performance is required
 */
export declare class HeapSort {
    /**
     * Sort array using heap sort algorithm
     * Time Complexity: O(n log n)
     * Space Complexity: O(1)
     */
    static sort<T>(arr: T[], compareFn: (a: T, b: T) => number): T[];
    private static heapify;
}
/**
 * Utility class for creating comparison functions
 */
export declare class SortingUtils {
    /**
     * Create a comparison function for songs based on criteria
     */
    static createSongComparator<T extends Record<string, any>>(criteria: SortCriteria): (a: T, b: T) => number;
    /**
     * Sort songs by multiple criteria
     */
    static createMultiCriteriaComparator<T extends Record<string, any>>(criteriaList: SortCriteria[]): (a: T, b: T) => number;
    /**
     * Benchmark sorting algorithms
     */
    static benchmarkSorts<T>(data: T[], compareFn: (a: T, b: T) => number, iterations?: number): {
        mergeSort: number;
        quickSort: number;
        heapSort: number;
        builtinSort: number;
    };
    /**
     * Check if array is sorted
     */
    static isSorted<T>(arr: T[], compareFn: (a: T, b: T) => number): boolean;
    /**
     * Generate test data for sorting algorithms
     */
    static generateTestData(size: number): number[];
}
//# sourceMappingURL=Sorting.d.ts.map