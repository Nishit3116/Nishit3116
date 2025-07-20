"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"
import { ArrayVisualization } from "@/components/array-visualization"

/* ---------- Divide & Conquer algorithm functions ---------- */

function mergeSort(arr, steps = []) {
  if (arr.length <= 1) {
    steps.push({ step: `Base case: array of length ${arr.length}`, array: [...arr], dividing: false })
    return { sorted: [...arr], steps }
  }

  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)

  steps.push({
    step: `Divide: [${arr.join(", ")}] into [${left.join(", ")}] and [${right.join(", ")}]`,
    array: [...arr],
    left: [...left],
    right: [...right],
    dividing: true,
  })

  const leftResult = mergeSort(left, steps)
  const rightResult = mergeSort(right, steps)

  const merged = merge(leftResult.sorted, rightResult.sorted, steps)
  return { sorted: merged, steps }
}

function merge(left, right, steps) {
  const result = []
  let i = 0,
    j = 0

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i])
      i++
    } else {
      result.push(right[j])
      j++
    }
    steps.push({
      step: `Merge: comparing ${left[i - 1] || left[i]} and ${right[j - 1] || right[j]}, result: [${result.join(", ")}]`,
      merging: true,
      result: [...result],
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

  steps.push({
    step: `Merge complete: [${result.join(", ")}]`,
    merging: true,
    result: [...result],
  })

  return result
}

function quickSort(arr, low = 0, high = arr.length - 1, steps = []) {
  if (arr.length <= 1) {
    steps.push({ step: "Base case: array too small to sort", array: [...arr] })
    return { sorted: [...arr], steps }
  }

  if (low < high) {
    const pi = partition(arr, low, high, steps)
    steps.push({
      step: `Pivot ${arr[pi]} is in correct position at index ${pi}`,
      array: [...arr],
      pivot: pi,
    })

    quickSort(arr, low, pi - 1, steps)
    quickSort(arr, pi + 1, high, steps)
  }

  return { sorted: arr, steps }
}

function partition(arr, low, high, steps) {
  const pivot = arr[high]
  let i = low - 1

  steps.push({
    step: `Choose pivot: ${pivot} at index ${high}`,
    array: [...arr],
    pivot: high,
  })

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
      steps.push({
        step: `${arr[j]} < ${pivot}, swap positions ${i} and ${j}`,
        array: [...arr],
        swapped: [i, j],
      })
    }
  }
  ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
  steps.push({
    step: `Place pivot ${pivot} in correct position`,
    array: [...arr],
    pivot: i + 1,
  })

  return i + 1
}

function binarySearch(arr, target, left = 0, right = arr.length - 1, steps = []) {
  if (arr.length === 0) {
    steps.push({ step: "Empty array - target not found", found: false })
    return { found: false, index: -1, steps }
  }

  if (left <= right) {
    const mid = Math.floor((left + right) / 2)
    steps.push({
      step: `Search range [${left}, ${right}], middle index: ${mid}, value: ${arr[mid]}`,
      array: [...arr],
      left,
      right,
      mid,
      comparing: mid,
    })

    if (arr[mid] === target) {
      steps.push({
        step: `Found target ${target} at index ${mid}!`,
        array: [...arr],
        found: true,
        index: mid,
      })
      return { found: true, index: mid, steps }
    }

    if (arr[mid] > target) {
      steps.push({
        step: `${arr[mid]} > ${target}, search left half`,
        array: [...arr],
        searchDirection: "left",
      })
      return binarySearch(arr, target, left, mid - 1, steps)
    } else {
      steps.push({
        step: `${arr[mid]} < ${target}, search right half`,
        array: [...arr],
        searchDirection: "right",
      })
      return binarySearch(arr, target, mid + 1, right, steps)
    }
  }

  steps.push({
    step: `Target ${target} not found in array`,
    array: [...arr],
    found: false,
  })
  return { found: false, index: -1, steps }
}

function maxSubarray(arr, left = 0, right = arr.length - 1, steps = []) {
  if (arr.length === 0) {
    steps.push({ step: "Empty array", maxSum: 0 })
    return { maxSum: 0, steps }
  }

  if (left === right) {
    steps.push({
      step: `Base case: single element ${arr[left]}`,
      maxSum: arr[left],
      subarray: [left, right],
    })
    return { maxSum: arr[left], leftIndex: left, rightIndex: right, steps }
  }

  const mid = Math.floor((left + right) / 2)
  steps.push({
    step: `Divide: range [${left}, ${right}] at middle ${mid}`,
    dividing: true,
    left,
    right,
    mid,
  })

  const leftResult = maxSubarray(arr, left, mid, steps)
  const rightResult = maxSubarray(arr, mid + 1, right, steps)
  const crossResult = maxCrossingSubarray(arr, left, mid, right, steps)

  const maxSum = Math.max(leftResult.maxSum, rightResult.maxSum, crossResult.maxSum)
  steps.push({
    step: `Combine: max(${leftResult.maxSum}, ${rightResult.maxSum}, ${crossResult.maxSum}) = ${maxSum}`,
    combining: true,
    maxSum,
  })

  if (maxSum === leftResult.maxSum) {
    return { maxSum, leftIndex: leftResult.leftIndex, rightIndex: leftResult.rightIndex, steps }
  } else if (maxSum === rightResult.maxSum) {
    return { maxSum, leftIndex: rightResult.leftIndex, rightIndex: rightResult.rightIndex, steps }
  } else {
    return { maxSum, leftIndex: crossResult.leftIndex, rightIndex: crossResult.rightIndex, steps }
  }
}

function maxCrossingSubarray(arr, left, mid, right, steps) {
  let leftSum = Number.NEGATIVE_INFINITY
  let sum = 0
  let maxLeft = mid

  for (let i = mid; i >= left; i--) {
    sum += arr[i]
    if (sum > leftSum) {
      leftSum = sum
      maxLeft = i
    }
  }

  let rightSum = Number.NEGATIVE_INFINITY
  sum = 0
  let maxRight = mid + 1

  for (let j = mid + 1; j <= right; j++) {
    sum += arr[j]
    if (sum > rightSum) {
      rightSum = sum
      maxRight = j
    }
  }

  const crossSum = leftSum + rightSum
  steps.push({
    step: `Cross sum: left=${leftSum} + right=${rightSum} = ${crossSum}`,
    crossSum,
    leftIndex: maxLeft,
    rightIndex: maxRight,
  })

  return { maxSum: crossSum, leftIndex: maxLeft, rightIndex: maxRight }
}

function strassenMultiply(A, B, steps = []) {
  const n = A.length

  if (n === 1) {
    const result = [[A[0][0] * B[0][0]]]
    steps.push({
      step: `Base case: ${A[0][0]} × ${B[0][0]} = ${result[0][0]}`,
      result,
    })
    return { result, steps }
  }

  // For simplicity, we'll implement basic matrix multiplication for visualization
  const result = Array(n)
    .fill(null)
    .map(() => Array(n).fill(0))

  steps.push({
    step: `Multiplying ${n}×${n} matrices using divide and conquer`,
    matrixA: A,
    matrixB: B,
  })

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        result[i][j] += A[i][k] * B[k][j]
      }
      steps.push({
        step: `Computing result[${i}][${j}] = ${result[i][j]}`,
        result: result.map((row) => [...row]),
        currentCell: [i, j],
      })
    }
  }

  return { result, steps }
}

const divideConquerAlgorithms = {
  mergeSort: {
    name: "Merge Sort",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    description: "Divides array into halves, recursively sorts them, then merges sorted halves.",
    code: `function mergeSort(arr) {
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
    fn: (arr) => mergeSort([...arr]),
  },
  quickSort: {
    name: "Quick Sort",
    timeComplexity: "O(n log n) average, O(n²) worst",
    spaceComplexity: "O(log n) average, O(n) worst",
    description: "Selects a pivot, partitions array around it, then recursively sorts partitions.",
    code: `function quickSort(arr, low = 0, high = arr.length - 1) {
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
    fn: (arr) => quickSort([...arr]),
  },
  binarySearch: {
    name: "Binary Search",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(log n)",
    description: "Recursively divides sorted array in half to find target element.",
    code: `function binarySearch(arr, target, left = 0, right = arr.length - 1) {
  if (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return { found: true, index: mid };
    }
    
    if (arr[mid] > target) {
      return binarySearch(arr, target, left, mid - 1);
    } else {
      return binarySearch(arr, target, mid + 1, right);
    }
  }
  
  return { found: false, index: -1 };
}`,
    fn: (arr, target) =>
      binarySearch(
        [...arr].sort((a, b) => a - b),
        target,
      ),
  },
  maxSubarray: {
    name: "Maximum Subarray",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    description: "Finds the contiguous subarray with the largest sum using divide and conquer.",
    code: `function maxSubarray(arr, left = 0, right = arr.length - 1) {
  if (left === right) {
    return { maxSum: arr[left], leftIndex: left, rightIndex: right };
  }
  
  const mid = Math.floor((left + right) / 2);
  
  const leftResult = maxSubarray(arr, left, mid);
  const rightResult = maxSubarray(arr, mid + 1, right);
  const crossResult = maxCrossingSubarray(arr, left, mid, right);
  
  const maxSum = Math.max(leftResult.maxSum, rightResult.maxSum, crossResult.maxSum);
  
  if (maxSum === leftResult.maxSum) {
    return leftResult;
  } else if (maxSum === rightResult.maxSum) {
    return rightResult;
  } else {
    return crossResult;
  }
}`,
    fn: (arr) => maxSubarray([...arr]),
  },
}

export default function DivideConquerPage() {
  const [inputArrayString, setInputArrayString] = useState("5,2,8,1,9,4")
  const [targetValue, setTargetValue] = useState("8")
  const [currentAlgorithm, setCurrentAlgorithm] = useState("mergeSort")
  const [algorithmSteps, setAlgorithmSteps] = useState([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState("")

  const intervalRef = useRef(null)
  const animationSpeed = 1000

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

      let result
      if (currentAlgorithm === "binarySearch") {
        const target = Number(targetValue.trim())
        if (isNaN(target)) {
          throw new Error("Invalid target value. Please enter a number.")
        }
        result = divideConquerAlgorithms[currentAlgorithm].fn(parsedArray, target)
      } else {
        result = divideConquerAlgorithms[currentAlgorithm].fn(parsedArray)
      }

      setAlgorithmSteps(result.steps)
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
      <h1 className="mb-8 text-3xl font-bold">Divide & Conquer Algorithms</h1>

      <Tabs value={currentAlgorithm} onValueChange={setCurrentAlgorithm} className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="mergeSort">Merge Sort</TabsTrigger>
          <TabsTrigger value="quickSort">Quick Sort</TabsTrigger>
          <TabsTrigger value="binarySearch">Binary Search</TabsTrigger>
          <TabsTrigger value="maxSubarray">Max Subarray</TabsTrigger>
        </TabsList>

        {Object.entries(divideConquerAlgorithms).map(([key, algo]) => (
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
                <div className={currentAlgorithm === "binarySearch" ? "grid md:grid-cols-2 gap-4" : ""}>
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
                  </div>
                  {currentAlgorithm === "binarySearch" && (
                    <div>
                      <Label htmlFor="target-input" className="text-gray-900 dark:text-gray-100">
                        Target value
                      </Label>
                      <Input
                        id="target-input"
                        value={targetValue}
                        onChange={(e) => setTargetValue(e.target.value)}
                        placeholder="e.g., 8"
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  )}
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Controls */}
                <div className="flex items-center justify-between gap-2">
                  <Button onClick={handleRunAlgorithm}>Run Algorithm</Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={handlePrevStep} disabled={currentStepIndex === 0}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePlayPause}
                      disabled={algorithmSteps.length === 0}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNextStep}
                      disabled={currentStepIndex === algorithmSteps.length - 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleReset} disabled={algorithmSteps.length === 0}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Visualization */}
                <div className="space-y-4">
                  {currentStep.array && (
                    <ArrayVisualization
                      array={currentStep.array}
                      comparing={currentStep.comparing}
                      swapped={currentStep.swapped}
                      pivotIndex={currentStep.pivot}
                    />
                  )}

                  <Card className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                        Step {currentStepIndex + 1} of {algorithmSteps.length}:
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{currentStep.step}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Algorithm Code */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Algorithm Code</h3>
                  <pre className="bg-gray-900 text-gray-50 p-4 rounded-md overflow-x-auto text-sm">
                    <code>{algo.code}</code>
                  </pre>
                </div>

                {/* Result */}
                {currentStepIndex === algorithmSteps.length - 1 && algorithmSteps.length > 0 && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-md border border-blue-200 dark:border-blue-800">
                    <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                      {currentAlgorithm === "binarySearch"
                        ? currentStep.found
                          ? `Target found at index ${currentStep.index}!`
                          : "Target not found in array"
                        : currentAlgorithm === "maxSubarray"
                          ? `Maximum subarray sum: ${currentStep.maxSum}`
                          : currentStep.result
                            ? `Final sorted array: [${currentStep.result.join(", ")}]`
                            : currentStep.array
                              ? `Final result: [${currentStep.array.join(", ")}]`
                              : "Algorithm completed successfully!"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  )
}
