"use client"

import { useState, useRef, useEffect } from "react"
import { AlgorithmList } from "@/components/algorithm-list"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"
import { ArrayVisualization } from "@/components/array-visualization"

/* ---------- Sorting algorithm functions (JavaScript for visualization) ---------- */

// Bubble Sort
function bubbleSort(arr) {
  const n = arr.length
  const steps = []
  const arrayCopy = [...arr]

  steps.push({ step: "Initial array state", array: [...arrayCopy], comparing: [], swapped: [] })

  for (let i = 0; i < n - 1; i++) {
    let swappedInPass = false
    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({
        step: `Comparing elements at index ${j} (${arrayCopy[j]}) and ${j + 1} (${arrayCopy[j + 1]})`,
        array: [...arrayCopy],
        comparing: [j, j + 1],
        swapped: [],
      })
      if (arrayCopy[j] > arrayCopy[j + 1]) {
        ;[arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]]
        swappedInPass = true
        steps.push({
          step: `Swapped ${arrayCopy[j + 1]} and ${arrayCopy[j]} as ${arrayCopy[j + 1]} > ${arrayCopy[j]}`,
          array: [...arrayCopy],
          comparing: [],
          swapped: [j, j + 1],
        })
      }
    }
    if (!swappedInPass) {
      steps.push({ step: "No swaps in this pass, array is sorted", array: [...arrayCopy], comparing: [], swapped: [] })
      break
    }
  }
  steps.push({ step: "Sorting complete", array: [...arrayCopy], comparing: [], swapped: [] })
  return { sorted: arrayCopy, steps }
}

// Selection Sort
function selectionSort(arr) {
  const n = arr.length
  const steps = []
  const arrayCopy = [...arr]

  steps.push({ step: "Initial array state", array: [...arrayCopy], comparing: [], minIndex: null, swapped: [] })

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    steps.push({
      step: `Assume ${arrayCopy[i]} at index ${i} is the minimum in the unsorted part`,
      array: [...arrayCopy],
      comparing: [],
      minIndex: i,
      swapped: [],
    })

    for (let j = i + 1; j < n; j++) {
      steps.push({
        step: `Comparing ${arrayCopy[j]} at index ${j} with current minimum ${arrayCopy[minIdx]} at index ${minIdx}`,
        array: [...arrayCopy],
        comparing: [j, minIdx],
        minIndex: minIdx,
        swapped: [],
      })
      if (arrayCopy[j] < arrayCopy[minIdx]) {
        minIdx = j
        steps.push({
          step: `New minimum found: ${arrayCopy[minIdx]} at index ${minIdx}`,
          array: [...arrayCopy],
          comparing: [],
          minIndex: minIdx,
          swapped: [],
        })
      }
    }

    if (minIdx !== i) {
      steps.push({
        step: `Minimum element ${arrayCopy[minIdx]} found at index ${minIdx}. Swapping with ${arrayCopy[i]} at index ${i}.`,
        array: [...arrayCopy],
        comparing: [],
        minIndex: minIdx,
        swapped: [i, minIdx],
      })
      ;[arrayCopy[i], arrayCopy[minIdx]] = [arrayCopy[minIdx], arrayCopy[i]]
    } else {
      steps.push({
        step: `Element ${arrayCopy[i]} at index ${i} is already in its correct sorted position. No swap needed.`,
        array: [...arrayCopy],
        comparing: [],
        minIndex: null,
        swapped: [],
      })
    }
  }
  steps.push({ step: "Sorting complete", array: [...arrayCopy], comparing: [], minIndex: null, swapped: [] })
  return { sorted: arrayCopy, steps }
}

// Insertion Sort
function insertionSort(arr) {
  const n = arr.length
  const steps = []
  const arrayCopy = [...arr]

  steps.push({ step: "Initial array state", array: [...arrayCopy], comparing: [], inserted: [] })

  for (let i = 1; i < n; i++) {
    const current = arrayCopy[i]
    let j = i - 1
    steps.push({
      step: `Considering element ${current} at index ${i}. This is the key to be inserted.`,
      array: [...arrayCopy],
      comparing: [i],
      inserted: [],
    })

    while (j >= 0 && arrayCopy[j] > current) {
      steps.push({
        step: `Shifting ${arrayCopy[j]} at index ${j} to the right (index ${j + 1}) to make space for ${current}`,
        array: [...arrayCopy],
        comparing: [j, j + 1],
        inserted: [],
      })
      arrayCopy[j + 1] = arrayCopy[j]
      j--
    }
    arrayCopy[j + 1] = current
    steps.push({
      step: `Inserting ${current} at its correct sorted position at index ${j + 1}`,
      array: [...arrayCopy],
      comparing: [],
      inserted: [j + 1],
    })
  }
  steps.push({ step: "Sorting complete", array: [...arrayCopy], comparing: [], inserted: [] })
  return { sorted: arrayCopy, steps }
}

// Merge Sort
function mergeSort(arr) {
  const steps = []
  const arrayCopy = [...arr]

  function merge(left, right, currentArr) {
    const result = []
    let i = 0,
      j = 0

    while (i < left.length && j < right.length) {
      steps.push({
        step: `Merging: Comparing ${left[i]} (left) and ${right[j]} (right)`,
        array: [...currentArr], // Show the current state of the array being merged
        comparing: [], // Can't easily map to original indices for 'comparing' in merge
        inserted: [],
      })
      if (left[i] <= right[j]) {
        result.push(left[i])
        i++
      } else {
        result.push(right[j])
        j++
      }
      steps.push({
        step: `Merging: Added ${result[result.length - 1]} to merged array. Current merged: [${result.join(", ")}]`,
        array: [...currentArr],
        comparing: [],
        inserted: [], // Can't easily map to original indices for 'inserted' in merge
      })
    }

    while (i < left.length) {
      result.push(left[i])
      i++
    }
    while (j < right.length) {
      result.push(right[j])
      j++
    }

    return result
  }

  function sort(currentArr) {
    if (currentArr.length <= 1) {
      return currentArr
    }

    const mid = Math.floor(currentArr.length / 2)
    const left = currentArr.slice(0, mid)
    const right = currentArr.slice(mid)

    steps.push({
      step: `Dividing array [${currentArr.join(", ")}] into left [${left.join(", ")}] and right [${right.join(", ")}]`,
      array: [...arrayCopy], // Show full array context
      comparing: [],
      inserted: [],
    })

    const sortedLeft = sort(left)
    const sortedRight = sort(right)

    const mergedResult = merge(sortedLeft, sortedRight, currentArr)

    // Update the main arrayCopy to reflect the merged part
    const startIndex = arr.indexOf(currentArr[0]) // Find where this sub-array started in the original
    if (startIndex !== -1) {
      for (let k = 0; k < mergedResult.length; k++) {
        arrayCopy[startIndex + k] = mergedResult[k]
      }
    }

    steps.push({
      step: `Merged [${sortedLeft.join(", ")}] and [${sortedRight.join(", ")}] into [${mergedResult.join(", ")}]. Array now: [${arrayCopy.join(", ")}]`,
      array: [...arrayCopy],
      comparing: [],
      inserted: [], // Can't easily map to original indices for 'inserted' in merge
    })

    return mergedResult
  }

  steps.push({ step: "Initial array state", array: [...arrayCopy], comparing: [], swapped: [] })
  const sortedResult = sort(arrayCopy)
  steps.push({ step: "Sorting complete", array: [...sortedResult], comparing: [], swapped: [] })

  return { sorted: sortedResult, steps }
}

// Quick Sort
function quickSort(arr) {
  const steps = []
  const arrayCopy = [...arr]
  const n = arrayCopy.length

  function partition(low, high) {
    const pivot = arrayCopy[high]
    let i = low - 1

    steps.push({
      step: `Selecting pivot: ${pivot} at index ${high}. Elements smaller than pivot will go to its left, larger to its right.`,
      array: [...arrayCopy],
      pivotIndex: high,
      comparing: [],
      swapped: [],
    })

    for (let j = low; j < high; j++) {
      steps.push({
        step: `Comparing ${arrayCopy[j]} at index ${j} with pivot ${pivot}`,
        array: [...arrayCopy],
        pivotIndex: high,
        comparing: [j],
        swapped: [],
      })
      if (arrayCopy[j] < pivot) {
        i++
        steps.push({
          step: `Element ${arrayCopy[j]} is smaller than pivot. Swapping ${arrayCopy[i]} and ${arrayCopy[j]}.`,
          array: [...arrayCopy],
          pivotIndex: high,
          comparing: [],
          swapped: [i, j],
        })
        ;[arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]]
      }
    }
    steps.push({
      step: `Placing pivot ${pivot} at its correct position (index ${i + 1}). Swapping ${arrayCopy[i + 1]} and ${arrayCopy[high]}.`,
      array: [...arrayCopy],
      pivotIndex: high,
      comparing: [],
      swapped: [i + 1, high],
    })
    ;[arrayCopy[i + 1], arrayCopy[high]] = [arrayCopy[high], arrayCopy[i + 1]]
    return i + 1
  }

  function sort(low, high) {
    if (low < high) {
      const pi = partition(low, high)
      sort(low, pi - 1)
      sort(pi + 1, high)
    }
  }

  steps.push({ step: "Initial array state", array: [...arrayCopy], comparing: [], swapped: [] })
  sort(0, n - 1)
  steps.push({ step: "Sorting complete", array: [...arrayCopy], comparing: [], swapped: [] })

  return { sorted: arrayCopy, steps }
}

// Heap Sort
function heapSort(arr) {
  const steps = []
  const n = arr.length
  const arrayCopy = [...arr]

  function heapify(n, i) {
    let largest = i // Initialize largest as root
    const left = 2 * i + 1 // left child
    const right = 2 * i + 2 // right child

    steps.push({
      step: `Heapify: Considering subtree with root ${arrayCopy[i]} at index ${i}. Children: left (${arrayCopy[left] || "N/A"}) at ${left}, right (${arrayCopy[right] || "N/A"}) at ${right}.`,
      array: [...arrayCopy],
      comparing: [i, left, right].filter((idx) => idx < n),
      swapped: [],
    })

    // If left child is larger than root
    if (left < n && arrayCopy[left] > arrayCopy[largest]) {
      largest = left
      steps.push({
        step: `Left child ${arrayCopy[left]} is larger than current largest ${arrayCopy[largest === left ? i : largest]}. New largest is ${arrayCopy[largest]} at index ${largest}.`,
        array: [...arrayCopy],
        comparing: [i, left, right].filter((idx) => idx < n),
        swapped: [],
      })
    }

    // If right child is larger than largest so far
    if (right < n && arrayCopy[right] > arrayCopy[largest]) {
      largest = right
      steps.push({
        step: `Right child ${arrayCopy[right]} is larger than current largest ${arrayCopy[largest === right ? (largest === left ? i : left) : largest]}. New largest is ${arrayCopy[largest]} at index ${largest}.`,
        array: [...arrayCopy],
        comparing: [i, left, right].filter((idx) => idx < n),
        swapped: [],
      })
    }

    // If largest is not root
    if (largest !== i) {
      steps.push({
        step: `Largest element ${arrayCopy[largest]} is not root. Swapping ${arrayCopy[i]} (root) and ${arrayCopy[largest]} (largest child).`,
        array: [...arrayCopy],
        comparing: [],
        swapped: [i, largest],
      })
      ;[arrayCopy[i], arrayCopy[largest]] = [arrayCopy[largest], arrayCopy[i]]

      // Recursively heapify the affected sub-tree
      heapify(n, largest)
    }
  }

  // Build heap (rearrange array)
  steps.push({ step: "Building initial Max Heap from the array.", array: [...arrayCopy], comparing: [], swapped: [] })
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i)
  }
  steps.push({ step: "Max Heap built. Starting sorting phase.", array: [...arrayCopy], comparing: [], swapped: [] })

  // One by one extract an element from heap
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    steps.push({
      step: `Swapping root ${arrayCopy[0]} (largest element) with last element ${arrayCopy[i]} of unsorted part.`,
      array: [...arrayCopy],
      comparing: [],
      swapped: [0, i],
    })
    ;[arrayCopy[0], arrayCopy[i]] = [arrayCopy[i], arrayCopy[0]]

    // call max heapify on the reduced heap
    heapify(i, 0)
  }
  steps.push({ step: "Sorting complete", array: [...arrayCopy], comparing: [], swapped: [] })

  return { sorted: arrayCopy, steps }
}

const sortingAlgorithms = {
  bubbleSort: {
    name: "Bubble Sort",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    description:
      "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    code: {
      javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
      c: `void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++) {
    int swapped = 0;
    for (int j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = 1;
      }
    }
    if (swapped == 0) break;
  }
}`,
      cpp: `void bubbleSort(std::vector<int>& arr) {
  int n = arr.size();
  for (int i = 0; i < n - 1; i++) {
    bool swapped = false;
    for (int j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        std::swap(arr[j], arr[j + 1]);
        swapped = true;
      }
    }
    if (!swapped) break;
  }
}`,
      java: `class BubbleSort {
  void bubbleSort(int arr[]) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
      boolean swapped = false;
      for (int j = 0; j < n - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          int temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swapped = true;
        }
      }
      if (!swapped) break;
    }
  }
}`,
    },
    fn: bubbleSort,
  },
  selectionSort: {
    name: "Selection Sort",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    description: "Finds the minimum element from the unsorted part and puts it at the beginning.",
    code: {
      javascript: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
      c: `void selectionSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx != i) {
      int temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }
  }
}`,
      cpp: `void selectionSort(std::vector<int>& arr) {
  int n = arr.size();
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx != i) {
      std::swap(arr[i], arr[minIdx]);
    }
  }
}`,
      java: `class SelectionSort {
  void selectionSort(int arr[]) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
      int minIdx = i;
      for (int j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx != i) {
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
      }
    }
  }
}`,
    },
    fn: selectionSort,
  },
  insertionSort: {
    name: "Insertion Sort",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    description:
      "Builds the final sorted array (or list) one item at a time by repeatedly taking new elements and inserting them into the correct position among the already sorted elements.",
    code: {
      javascript: `function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}`,
      c: `void insertionSort(int arr[], int n) {
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
      cpp: `void insertionSort(std::vector<int>& arr) {
  int n = arr.size();
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
      java: `class InsertionSort {
  void insertionSort(int arr[]) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
      int key = arr[i];
      int j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
  }
}`,
    },
    fn: insertionSort,
  },
  mergeSort: {
    name: "Merge Sort",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    description: "Divides array into halves, recursively sorts them, then merges sorted halves.",
    code: {
      javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  const leftSorted = mergeSort(left);
  const rightSorted = mergeSort(right);

  return merge(leftSorted, rightSorted);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
      c: `// C code for Merge Sort (placeholder)
void mergeSort(int arr[], int l, int r) { /* ... */ }
void merge(int arr[], int l, int m, int r) { /* ... */ }`,
      cpp: `// C++ code for Merge Sort (placeholder)
void mergeSort(std::vector<int>& arr, int l, int r) { /* ... */ }
void merge(std::vector<int>& arr, int l, int m, int r) { /* ... */ }`,
      java: `// Java code for Merge Sort (placeholder)
class MergeSort { void mergeSort(int arr[], int l, int r) { /* ... */ } }`,
    },
    fn: mergeSort,
  },
  quickSort: {
    name: "Quick Sort",
    timeComplexity: "O(n log n) average, O(n²) worst",
    spaceComplexity: "O(log n) average, O(n) worst",
    description: "Selects a pivot, partitions array around it, then recursively sorts partitions.",
    code: {
      javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
      c: `// C code for Quick Sort (placeholder)
void quickSort(int arr[], int low, int high) { /* ... */ }
int partition(int arr[], int low, int high) { /* ... */ }`,
      cpp: `// C++ code for Quick Sort (placeholder)
void quickSort(std::vector<int>& arr, int low, int high) { /* ... */ }
int partition(std::vector<int>& arr, int low, int high) { /* ... */ }`,
      java: `// Java code for Quick Sort (placeholder)
class QuickSort { void quickSort(int arr[], int low, int high) { /* ... */ } }`,
    },
    fn: quickSort,
  },
  heapSort: {
    name: "Heap Sort",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    description: "Builds a max-heap from the input data and repeatedly extracts the maximum element.",
    code: {
      javascript: `function heapSort(arr) {
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // One by one extract an element from heap
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // call max heapify on the reduced heap
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i; // Initialize largest as root
  const left = 2 * i + 1; // left child
  const right = 2 * i + 2; // right child

  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // If largest is not root
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest);
  }
}`,
      c: `// C code for Heap Sort (placeholder)
void heapSort(int arr[], int n) { /* ... */ }
void heapify(int arr[], int n, int i) { /* ... */ }`,
      cpp: `// C++ code for Heap Sort (placeholder)
void heapSort(std::vector<int>& arr) { /* ... */ }
void heapify(std::vector<int>& arr, int n, int i) { /* ... */ }`,
      java: `// Java code for Heap Sort (placeholder)
class HeapSort { void heapSort(int arr[]) { /* ... */ } }`,
    },
    fn: heapSort,
  },
}

export default function SortingPage() {
  const [inputArrayString, setInputArrayString] = useState("5,2,8,1,9,4")
  const [currentAlgorithm, setCurrentAlgorithm] = useState("bubbleSort")
  const [algorithmSteps, setAlgorithmSteps] = useState([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState("")
  const [selectedCodeLanguage, setSelectedCodeLanguage] = useState("javascript") // New state for code language

  const intervalRef = useRef(null)
  const animationSpeed = 700 // milliseconds per step

  const currentStep = algorithmSteps[currentStepIndex] || {
    step: "Enter an array and click 'Run Algorithm' to start.",
    array: [],
  }

  useEffect(() => {
    if (isPlaying && currentStepIndex < algorithmSteps.length - 1) {
      intervalRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => prev + 1)
      }, animationSpeed)
    } else if (currentStepIndex === algorithmSteps.length - 1) {
      setIsPlaying(false)
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isPlaying, currentStepIndex, algorithmSteps.length, animationSpeed])

  const handleRunAlgorithm = () => {
    setError("")
    setIsPlaying(false)
    clearInterval(intervalRef.current)
    try {
      const parsedArray = inputArrayString
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map(Number)

      if (parsedArray.some(isNaN)) {
        throw new Error("Invalid input. Please enter comma-separated numbers.")
      }

      const arrayForAlgo = JSON.parse(JSON.stringify(parsedArray))

      const { steps } = sortingAlgorithms[currentAlgorithm].fn(arrayForAlgo)
      setAlgorithmSteps(steps)
      setCurrentStepIndex(0)
    } catch (e) {
      setError(e.message)
      setAlgorithmSteps([])
      setCurrentStepIndex(0)
    }
  }

  const handlePlayPause = () => {
    if (currentStepIndex === algorithmSteps.length - 1 && !isPlaying) {
      setCurrentStepIndex(0)
      setIsPlaying(true)
    } else {
      setIsPlaying(!isPlaying)
    }
  }

  const handleNextStep = () => {
    setIsPlaying(false)
    clearInterval(intervalRef.current)
    if (currentStepIndex < algorithmSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    }
  }

  const handlePrevStep = () => {
    setIsPlaying(false)
    clearInterval(intervalRef.current)
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }

  const handleReset = () => {
    setIsPlaying(false)
    clearInterval(intervalRef.current)
    setCurrentStepIndex(0)
    setAlgorithmSteps([])
    setError("")
  }

  return (
    <main className="container mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Sorting Algorithms</h1>

      <Tabs value={currentAlgorithm} onValueChange={setCurrentAlgorithm} className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="bubbleSort">Bubble Sort</TabsTrigger>
          <TabsTrigger value="selectionSort">Selection Sort</TabsTrigger>
          <TabsTrigger value="insertionSort">Insertion Sort</TabsTrigger>
          <TabsTrigger value="mergeSort">Merge Sort</TabsTrigger>
          <TabsTrigger value="quickSort">Quick Sort</TabsTrigger>
          <TabsTrigger value="heapSort">Heap Sort</TabsTrigger>
        </TabsList>

        {Object.entries(sortingAlgorithms).map(([key, algo]) => (
          <TabsContent key={key} value={key}>
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">
                  {algo.name}
                  <Badge variant="secondary" className="ml-2 dark:text-white">
                    {algo.timeComplexity}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">{algo.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Input Section */}
                <div>
                  <Label htmlFor="array-input" className="text-gray-900 dark:text-gray-100">
                    Enter numbers (comma-separated)
                  </Label>
                  <Input
                    id="array-input"
                    value={inputArrayString}
                    onChange={(e) => setInputArrayString(e.target.value)}
                    placeholder="e.g., 5,2,8,1,9,4"
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between gap-2">
                  <Button onClick={handleRunAlgorithm}>Run Algorithm</Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={handlePrevStep} disabled={currentStepIndex === 0}>
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Previous Step</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePlayPause}
                      disabled={algorithmSteps.length === 0}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNextStep}
                      disabled={currentStepIndex === algorithmSteps.length - 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Next Step</span>
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleReset} disabled={algorithmSteps.length === 0}>
                      <RotateCcw className="h-4 w-4" />
                      <span className="sr-only">Reset</span>
                    </Button>
                  </div>
                </div>

                {/* Visualization and Explanation */}
                <div className="space-y-4">
                  <ArrayVisualization
                    array={currentStep.array}
                    comparing={currentStep.comparing}
                    swapped={currentStep.swapped}
                    minIndex={currentStep.minIndex}
                    inserted={currentStep.inserted}
                    pivotIndex={currentStep.pivotIndex}
                  />
                  <Card className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                        Step {currentStepIndex + 1} of {algorithmSteps.length}:
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{currentStep.step}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Algorithm Code Display */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Algorithm Code</h3>
                  <Tabs value={selectedCodeLanguage} onValueChange={setSelectedCodeLanguage} className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                      <TabsTrigger value="c">C</TabsTrigger>
                      <TabsTrigger value="cpp">C++</TabsTrigger>
                      <TabsTrigger value="java">Java</TabsTrigger>
                    </TabsList>
                    <TabsContent value="javascript">
                      <pre className="bg-gray-900 text-gray-50 p-4 rounded-md overflow-x-auto text-sm">
                        <code>{algo.code.javascript}</code>
                      </pre>
                    </TabsContent>
                    <TabsContent value="c">
                      <pre className="bg-gray-900 text-gray-50 p-4 rounded-md overflow-x-auto text-sm">
                        <code>{algo.code.c}</code>
                      </pre>
                    </TabsContent>
                    <TabsContent value="cpp">
                      <pre className="bg-gray-900 text-gray-50 p-4 rounded-md overflow-x-auto text-sm">
                        <code>{algo.code.cpp}</code>
                      </pre>
                    </TabsContent>
                    <TabsContent value="java">
                      <pre className="bg-gray-900 text-gray-50 p-4 rounded-md overflow-x-auto text-sm">
                        <code>{algo.code.java}</code>
                      </pre>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Final Result */}
                {currentStepIndex === algorithmSteps.length - 1 && algorithmSteps.length > 0 && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-md border border-blue-200 dark:border-blue-800">
                    <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                      Final Sorted Array: [{currentStep.array.join(", ")}]
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Existing Algorithm List (for other algorithms not yet visualized) */}
      <AlgorithmList
        title="Other Algorithms (Coming Soon)"
        algorithms={[
          "Linear Search",
          "Binary Search",
          "Interpolation Search",
          "Jump Search",
          "Breadth-First Search (BFS)",
          "Depth-First Search (DFS)",
          "Dijkstra’s",
          "Kruskal’s",
          "Prim’s",
          "Bellman-Ford",
          "Topological Sort",
          "Floyd-Warshall",
          "Fibonacci (DP)",
          "0/1 Knapsack",
          "Longest Common Subsequence",
          "Edit Distance",
          "Coin Change",
          "Matrix Chain Multiplication",
          "Strassen’s Matrix Multiplication",
          "Maximum Subarray (Kadane’s)",
          "Activity Selection",
          "Huffman Coding",
          "Fractional Knapsack",
          "Job Sequencing with Deadlines",
        ]}
      />
    </main>
  )
}
