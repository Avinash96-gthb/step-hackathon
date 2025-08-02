"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortingUtils = exports.HeapSort = exports.QuickSort = exports.MergeSort = void 0;
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
class MergeSort {
    /**
     * Sort array using merge sort algorithm
     * Time Complexity: O(n log n)
     * Space Complexity: O(n)
     */
    static sort(arr, compareFn) {
        if (arr.length <= 1) {
            return [...arr];
        }
        return this.mergeSort([...arr], compareFn);
    }
    static mergeSort(arr, compareFn) {
        if (arr.length <= 1) {
            return arr;
        }
        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);
        return this.merge(this.mergeSort(left, compareFn), this.mergeSort(right, compareFn), compareFn);
    }
    static merge(left, right, compareFn) {
        const result = [];
        let leftIndex = 0;
        let rightIndex = 0;
        while (leftIndex < left.length && rightIndex < right.length) {
            if (compareFn(left[leftIndex], right[rightIndex]) <= 0) {
                result.push(left[leftIndex]);
                leftIndex++;
            }
            else {
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
exports.MergeSort = MergeSort;
/**
 * Quick Sort implementation
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n) average (recursion stack)
 *
 * In-place sorting algorithm, good average performance
 * Best for general-purpose sorting when space is limited
 */
class QuickSort {
    /**
     * Sort array using quick sort algorithm
     * Time Complexity: O(n log n) average, O(n²) worst case
     * Space Complexity: O(log n) average
     */
    static sort(arr, compareFn) {
        const sortedArray = [...arr];
        this.quickSort(sortedArray, 0, sortedArray.length - 1, compareFn);
        return sortedArray;
    }
    static quickSort(arr, low, high, compareFn) {
        if (low < high) {
            const pivotIndex = this.partition(arr, low, high, compareFn);
            this.quickSort(arr, low, pivotIndex - 1, compareFn);
            this.quickSort(arr, pivotIndex + 1, high, compareFn);
        }
    }
    static partition(arr, low, high, compareFn) {
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
exports.QuickSort = QuickSort;
/**
 * Heap Sort implementation
 * Time Complexity: O(n log n) - guaranteed
 * Space Complexity: O(1)
 *
 * In-place sorting with guaranteed O(n log n) performance
 * Best when consistent performance is required
 */
class HeapSort {
    /**
     * Sort array using heap sort algorithm
     * Time Complexity: O(n log n)
     * Space Complexity: O(1)
     */
    static sort(arr, compareFn) {
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
    static heapify(arr, n, i, compareFn) {
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
exports.HeapSort = HeapSort;
/**
 * Utility class for creating comparison functions
 */
class SortingUtils {
    /**
     * Create a comparison function for songs based on criteria
     */
    static createSongComparator(criteria) {
        return (a, b) => {
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
    static createMultiCriteriaComparator(criteriaList) {
        return (a, b) => {
            for (const criteria of criteriaList) {
                const compareFn = this.createSongComparator(criteria);
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
    static benchmarkSorts(data, compareFn, iterations = 1) {
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
    static isSorted(arr, compareFn) {
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
    static generateTestData(size) {
        return Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
    }
}
exports.SortingUtils = SortingUtils;
//# sourceMappingURL=Sorting.js.map