"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/* ---------- Searching algorithm functions ---------- */

function linearSearch(arr, target) {
  const steps = []
  const arrayCopy = [...arr]

  steps.push({
    step: `Starting linear search for target: ${target}`,
    array: [...arrayCopy],
    comparing: [],
    found: false,
  })

  for (let i = 0; i < arrayCopy.length; i++) {
    steps.push({
      step: `Checking element at index ${i}: ${arrayCopy[i]}`,
      array: [...arrayCopy],
      comparing: [i],
      found: false,
      currentIndex: i,
    })

    if (arrayCopy[i] === target) {
      steps.push({
        step: `Found target ${target} at index ${i}!`,
        array: [...arrayCopy],
        comparing: [i],
        found: true,
        foundIndex: i,
      })
      return { found: true, index: i, steps }
    }
  }

  steps.push({
    step: `Target ${target} not found in the array`,
    array: [...arrayCopy],
    comparing: [],
    found: false,
  })

  return { found: false, index: -1, steps }
}

function binarySearch(arr, target) {
  const steps = []
  const sortedArray = [...arr].sort((a, b) => a - b)
  let left = 0
  let right = sortedArray.length - 1

  steps.push({
    step: `Array sorted for binary search. Looking for target: ${target}`,
    array: [...sortedArray],
    left,
    right,
    comparing: [],
  })

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    steps.push({
      step: `Checking middle element at index ${mid}: ${sortedArray[mid]}`,
      array: [...sortedArray],
      left,
      right,
      mid,
      comparing: [mid],
    })

    if (sortedArray[mid] === target) {
      steps.push({
        step: `Found target ${target} at index ${mid}!`,
        array: [...sortedArray],
        left,
        right,
        mid,
        comparing: [mid],
        found: true,
        foundIndex: mid,
      })
      return { found: true, index: mid, steps }
    }

    if (sortedArray[mid] < target) {
      left = mid + 1
      steps.push({
        step: `${sortedArray[mid]} < ${target}, search right half`,
        array: [...sortedArray],
        left,
        right,
        comparing: [],
        searchDirection: "right",
      })
    } else {
      right = mid - 1
      steps.push({
        step: `${sortedArray[mid]} > ${target}, search left half`,
        array: [...sortedArray],
        left,
        right,
        comparing: [],
        searchDirection: "left",
      })
    }
  }

  steps.push({
    step: `Target ${target} not found in the array`,
    array: [...sortedArray],
    left,
    right,
    comparing: [],
    found: false,
  })

  return { found: false, index: -1, steps }
}

function jumpSearch(arr, target) {
  const steps = []
  const sortedArray = [...arr].sort((a, b) => a - b)
  const n = sortedArray.length
  const jumpSize = Math.floor(Math.sqrt(n))
  let step = jumpSize
  let prev = 0

  steps.push({
    step: `Jump Search with jump size: ${jumpSize}. Looking for target: ${target}`,
    array: [...sortedArray],
    jumpSize,
    comparing: [],
  })

  // Jump through blocks
  while (sortedArray[Math.min(step, n) - 1] < target) {
    steps.push({
      step: `Jumping to index ${Math.min(step, n) - 1}: ${sortedArray[Math.min(step, n) - 1]} < ${target}`,
      array: [...sortedArray],
      comparing: [Math.min(step, n) - 1],
      jumpIndex: Math.min(step, n) - 1,
    })

    prev = step
    step += jumpSize
    if (prev >= n) {
      steps.push({
        step: `Reached end of array, target ${target} not found`,
        array: [...sortedArray],
        comparing: [],
        found: false,
      })
      return { found: false, index: -1, steps }
    }
  }

  // Linear search in the identified block
  steps.push({
    step: `Found potential block, doing linear search from index ${prev} to ${Math.min(step, n) - 1}`,
    array: [...sortedArray],
    comparing: [],
    blockStart: prev,
    blockEnd: Math.min(step, n) - 1,
  })

  while (sortedArray[prev] < target) {
    steps.push({
      step: `Linear search at index ${prev}: ${sortedArray[prev]}`,
      array: [...sortedArray],
      comparing: [prev],
      currentIndex: prev,
    })

    prev++
    if (prev === Math.min(step, n)) {
      steps.push({
        step: `Reached end of block, target ${target} not found`,
        array: [...sortedArray],
        comparing: [],
        found: false,
      })
      return { found: false, index: -1, steps }
    }
  }

  if (sortedArray[prev] === target) {
    steps.push({
      step: `Found target ${target} at index ${prev}!`,
      array: [...sortedArray],
      comparing: [prev],
      found: true,
      foundIndex: prev,
    })
    return { found: true, index: prev, steps }
  }

  steps.push({
    step: `Target ${target} not found`,
    array: [...sortedArray],
    comparing: [],
    found: false,
  })

  return { found: false, index: -1, steps }
}

function interpolationSearch(arr, target) {
  const steps = []
  const sortedArray = [...arr].sort((a, b) => a - b)
  let low = 0
  let high = sortedArray.length - 1

  steps.push({
    step: `Interpolation Search for target: ${target}`,
    array: [...sortedArray],
    low,
    high,
    comparing: [],
  })

  while (low <= high && target >= sortedArray[low] && target <= sortedArray[high]) {
    if (low === high) {
      if (sortedArray[low] === target) {
        steps.push({
          step: `Found target ${target} at index ${low}!`,
          array: [...sortedArray],
          comparing: [low],
          found: true,
          foundIndex: low,
        })
        return { found: true, index: low, steps }
      }
      break
    }

    // Calculate interpolated position
    const pos = low + Math.floor(((target - sortedArray[low]) / (sortedArray[high] - sortedArray[low])) * (high - low))

    steps.push({
      step: `Interpolated position: ${pos}, checking value: ${sortedArray[pos]}`,
      array: [...sortedArray],
      low,
      high,
      pos,
      comparing: [pos],
    })

    if (sortedArray[pos] === target) {
      steps.push({
        step: `Found target ${target} at index ${pos}!`,
        array: [...sortedArray],
        comparing: [pos],
        found: true,
        foundIndex: pos,
      })
      return { found: true, index: pos, steps }
    }

    if (sortedArray[pos] < target) {
      low = pos + 1
      steps.push({
        step: `${sortedArray[pos]} < ${target}, search right half`,
        array: [...sortedArray],
        low,
        high,
        comparing: [],
      })
    } else {
      high = pos - 1
      steps.push({
        step: `${sortedArray[pos]} > ${target}, search left half`,
        array: [...sortedArray],
        low,
        high,
        comparing: [],
      })
    }
  }

  steps.push({
    step: `Target ${target} not found`,
    array: [...sortedArray],
    comparing: [],
    found: false,
  })

  return { found: false, index: -1, steps }
}

const searchingAlgorithms = {
  linearSearch: {
    name: "Linear Search",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Sequentially checks each element until the target is found or the list ends.",
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return { found: true, index: i };
    }
  }
  return { found: false, index: -1 };
}`,
    fn: linearSearch,
  },
  binarySearch: {
    name: "Binary Search",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    description: "Efficiently searches sorted arrays by repeatedly dividing the search interval in half.",
    code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return { found: true, index: mid };
    }
    
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return { found: false, index: -1 };
}`,
    fn: binarySearch,
  },
  jumpSearch: {
    name: "Jump Search",
    timeComplexity: "O(√n)",
    spaceComplexity: "O(1)",
    description: "Jumps through fixed-size blocks, then performs linear search in the identified block.",
    code: `function jumpSearch(arr, target) {
  const n = arr.length;
  const jumpSize = Math.floor(Math.sqrt(n));
  let step = jumpSize;
  let prev = 0;
  
  // Jump through blocks
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += jumpSize;
    if (prev >= n) {
      return { found: false, index: -1 };
    }
  }
  
  // Linear search in identified block
  while (arr[prev] < target) {
    prev++;
    if (prev === Math.min(step, n)) {
      return { found: false, index: -1 };
    }
  }
  
  if (arr[prev] === target) {
    return { found: true, index: prev };
  }
  
  return { found: false, index: -1 };
}`,
    fn: jumpSearch,
  },
  interpolationSearch: {
    name: "Interpolation Search",
    timeComplexity: "O(log log n)",
    spaceComplexity: "O(1)",
    description: "Estimates the position of the target based on the value distribution in sorted arrays.",
    code: `function interpolationSearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (low === high) {
      return arr[low] === target ? { found: true, index: low } : { found: false, index: -1 };
    }
    
    // Calculate interpolated position
    const pos = low + Math.floor(((target - arr[low]) / (arr[high] - arr[low])) * (high - low));
    
    if (arr[pos] === target) {
      return { found: true, index: pos };
    }
    
    if (arr[pos] < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
  }
  
  return { found: false, index: -1 };
}`,
    fn: interpolationSearch,
  },
}

// Array Visualization Component for Searching
function SearchVisualization({
  array,
  comparing = [],
  found = false,
  foundIndex = -1,
  left = -1,
  right = -1,
  mid = -1,
  pos = -1,
  jumpIndex = -1,
  currentIndex = -1,
  blockStart = -1,
  blockEnd = -1,
}) {
  if (!array || array.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-100 dark:bg-gray-900 rounded-md text-gray-500 dark:text-gray-400">
        Enter an array to visualize.
      </div>
    )
  }

  const maxValue = Math.max(...array)
  const barWidth = Math.max(20, Math.min(60, 600 / array.length))

  return (
    <div className="flex items-end justify-center h-64 bg-gray-50 dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-700 overflow-x-auto">
      {array.map((value, index) => {
        const isComparing = comparing.includes(index)
        const isFound = found && foundIndex === index
        const isInRange = left !== -1 && right !== -1 && index >= left && index <= right
        const isMid = mid === index
        const isPos = pos === index
        const isJump = jumpIndex === index
        const isCurrent = currentIndex === index
        const isInBlock = blockStart !== -1 && blockEnd !== -1 && index >= blockStart && index <= blockEnd

        let barColorClass = "bg-blue-500 dark:bg-blue-600" // Default color
        if (isFound) {
          barColorClass = "bg-green-500 dark:bg-green-600" // Found element
        } else if (isComparing || isMid || isPos || isCurrent) {
          barColorClass = "bg-yellow-500 dark:bg-yellow-600" // Currently comparing
        } else if (isJump) {
          barColorClass = "bg-purple-500 dark:bg-purple-600" // Jump position
        } else if (isInBlock) {
          barColorClass = "bg-orange-300 dark:bg-orange-400" // In search block
        } else if (isInRange) {
          barColorClass = "bg-blue-300 dark:bg-blue-400" // In search range
        }

        const barHeight = maxValue > 0 ? (value / maxValue) * 90 + 10 : 0

        return (
          <div
            key={index}
            className="flex flex-col items-center mx-0.5 transition-all duration-300 ease-in-out"
            style={{ width: `${barWidth}px` }}
          >
            <div className={cn("w-full rounded-t-sm", barColorClass)} style={{ height: `${barHeight}%` }}></div>
            <span className="text-xs mt-1 text-gray-700 dark:text-gray-300">{value}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{index}</span>
          </div>
        )
      })}
    </div>
  )
}

export default function SearchingPage() {
  const [inputArrayString, setInputArrayString] = useState("1,3,5,7,9,11,13,15,17,19")
  const [targetValue, setTargetValue] = useState("7")
  const [currentAlgorithm, setCurrentAlgorithm] = useState("linearSearch")
  const [algorithmSteps, setAlgorithmSteps] = useState([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState("")

  const intervalRef = useRef(null)
  const animationSpeed = 1000

  const currentStep = algorithmSteps[currentStepIndex] || {
    step: "Enter an array and target value, then click 'Run Algorithm' to start.",
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

      const target = Number(targetValue.trim())

      if (parsedArray.some(isNaN) || isNaN(target)) {
        throw new Error("Invalid input. Please enter comma-separated numbers for array and a number for target.")
      }

      const { steps } = searchingAlgorithms[currentAlgorithm].fn(parsedArray, target)
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
      <h1 className="mb-8 text-3xl font-bold">Searching Algorithms</h1>

      <Tabs value={currentAlgorithm} onValueChange={setCurrentAlgorithm} className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="linearSearch">Linear Search</TabsTrigger>
          <TabsTrigger value="binarySearch">Binary Search</TabsTrigger>
          <TabsTrigger value="jumpSearch">Jump Search</TabsTrigger>
          <TabsTrigger value="interpolationSearch">Interpolation Search</TabsTrigger>
        </TabsList>

        {Object.entries(searchingAlgorithms).map(([key, algo]) => (
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
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="array-input" className="text-gray-900 dark:text-gray-100">
                      Enter numbers (comma-separated)
                    </Label>
                    <Input
                      id="array-input"
                      value={inputArrayString}
                      onChange={(e) => setInputArrayString(e.target.value)}
                      placeholder="e.g., 1,3,5,7,9,11,13,15"
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="target-input" className="text-gray-900 dark:text-gray-100">
                      Target value
                    </Label>
                    <Input
                      id="target-input"
                      value={targetValue}
                      onChange={(e) => setTargetValue(e.target.value)}
                      placeholder="e.g., 7"
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
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
                  <SearchVisualization
                    array={currentStep.array}
                    comparing={currentStep.comparing}
                    found={currentStep.found}
                    foundIndex={currentStep.foundIndex}
                    left={currentStep.left}
                    right={currentStep.right}
                    mid={currentStep.mid}
                    pos={currentStep.pos}
                    jumpIndex={currentStep.jumpIndex}
                    currentIndex={currentStep.currentIndex}
                    blockStart={currentStep.blockStart}
                    blockEnd={currentStep.blockEnd}
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
                      {currentStep.found
                        ? `Target found at index ${currentStep.foundIndex}!`
                        : `Target not found in the array.`}
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
