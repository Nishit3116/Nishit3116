"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"

/* ---------- Graph algorithm functions ---------- */

function createAdjacencyList(edges, vertices) {
  const graph = {}
  for (let i = 0; i < vertices; i++) {
    graph[i] = []
  }
  edges.forEach(([u, v, weight = 1]) => {
    graph[u].push({ node: v, weight })
    graph[v].push({ node: u, weight }) // For undirected graph
  })
  return graph
}

function bfs(graph, startVertex, vertices) {
  const steps = []
  const visited = new Set()
  const queue = [startVertex]
  const result = []

  steps.push({
    step: `Starting BFS from vertex ${startVertex}`,
    visited: new Set(),
    queue: [startVertex],
    current: null,
    result: [],
  })

  while (queue.length > 0) {
    const current = queue.shift()

    if (!visited.has(current)) {
      visited.add(current)
      result.push(current)

      steps.push({
        step: `Visiting vertex ${current}`,
        visited: new Set(visited),
        queue: [...queue],
        current,
        result: [...result],
      })

      // Add neighbors to queue
      const neighbors = graph[current] || []
      const newNeighbors = []

      neighbors.forEach(({ node }) => {
        if (!visited.has(node) && !queue.includes(node)) {
          queue.push(node)
          newNeighbors.push(node)
        }
      })

      if (newNeighbors.length > 0) {
        steps.push({
          step: `Adding neighbors [${newNeighbors.join(", ")}] to queue`,
          visited: new Set(visited),
          queue: [...queue],
          current,
          result: [...result],
          addedToQueue: newNeighbors,
        })
      }
    }
  }

  steps.push({
    step: `BFS traversal complete: [${result.join(" → ")}]`,
    visited: new Set(visited),
    queue: [],
    current: null,
    result,
    complete: true,
  })

  return { result, steps }
}

function dfs(graph, startVertex, vertices) {
  const steps = []
  const visited = new Set()
  const stack = [startVertex]
  const result = []

  steps.push({
    step: `Starting DFS from vertex ${startVertex}`,
    visited: new Set(),
    stack: [startVertex],
    current: null,
    result: [],
  })

  while (stack.length > 0) {
    const current = stack.pop()

    if (!visited.has(current)) {
      visited.add(current)
      result.push(current)

      steps.push({
        step: `Visiting vertex ${current}`,
        visited: new Set(visited),
        stack: [...stack],
        current,
        result: [...result],
      })

      // Add neighbors to stack (in reverse order for consistent traversal)
      const neighbors = graph[current] || []
      const newNeighbors = []

      neighbors.reverse().forEach(({ node }) => {
        if (!visited.has(node)) {
          stack.push(node)
          newNeighbors.push(node)
        }
      })

      if (newNeighbors.length > 0) {
        steps.push({
          step: `Adding neighbors [${newNeighbors.join(", ")}] to stack`,
          visited: new Set(visited),
          stack: [...stack],
          current,
          result: [...result],
          addedToStack: newNeighbors,
        })
      }
    }
  }

  steps.push({
    step: `DFS traversal complete: [${result.join(" → ")}]`,
    visited: new Set(visited),
    stack: [],
    current: null,
    result,
    complete: true,
  })

  return { result, steps }
}

function dijkstra(graph, startVertex, vertices) {
  const steps = []
  const distances = {}
  const visited = new Set()
  const previous = {}

  // Initialize distances
  for (let i = 0; i < vertices; i++) {
    distances[i] = i === startVertex ? 0 : Number.POSITIVE_INFINITY
    previous[i] = null
  }

  steps.push({
    step: `Initialize distances from vertex ${startVertex}`,
    distances: { ...distances },
    visited: new Set(),
    current: null,
  })

  while (visited.size < vertices) {
    // Find unvisited vertex with minimum distance
    let current = null
    let minDistance = Number.POSITIVE_INFINITY

    for (let vertex = 0; vertex < vertices; vertex++) {
      if (!visited.has(vertex) && distances[vertex] < minDistance) {
        minDistance = distances[vertex]
        current = vertex
      }
    }

    if (current === null || distances[current] === Number.POSITIVE_INFINITY) break

    visited.add(current)

    steps.push({
      step: `Visit vertex ${current} with distance ${distances[current]}`,
      distances: { ...distances },
      visited: new Set(visited),
      current,
    })

    // Update distances to neighbors
    const neighbors = graph[current] || []
    const updatedNeighbors = []

    neighbors.forEach(({ node, weight }) => {
      if (!visited.has(node)) {
        const newDistance = distances[current] + weight
        if (newDistance < distances[node]) {
          distances[node] = newDistance
          previous[node] = current
          updatedNeighbors.push({ node, distance: newDistance })
        }
      }
    })

    if (updatedNeighbors.length > 0) {
      steps.push({
        step: `Updated distances: ${updatedNeighbors.map(({ node, distance }) => `${node}:${distance}`).join(", ")}`,
        distances: { ...distances },
        visited: new Set(visited),
        current,
        updatedNeighbors,
      })
    }
  }

  steps.push({
    step: `Dijkstra's algorithm complete`,
    distances: { ...distances },
    visited: new Set(visited),
    current: null,
    complete: true,
  })

  return { distances, previous, steps }
}

const graphAlgorithms = {
  bfs: {
    name: "Breadth-First Search (BFS)",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    description: "Explores vertices level by level using a queue, visiting all neighbors before moving deeper.",
    code: `function bfs(graph, startVertex) {
  const visited = new Set();
  const queue = [startVertex];
  const result = [];
  
  while (queue.length > 0) {
    const current = queue.shift();
    
    if (!visited.has(current)) {
      visited.add(current);
      result.push(current);
      
      // Add unvisited neighbors to queue
      graph[current].forEach(neighbor => {
        if (!visited.has(neighbor) && !queue.includes(neighbor)) {
          queue.push(neighbor);
        }
      });
    }
  }
  
  return result;
}`,
    fn: bfs,
  },
  dfs: {
    name: "Depth-First Search (DFS)",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    description: "Explores as far as possible along each branch using a stack before backtracking.",
    code: `function dfs(graph, startVertex) {
  const visited = new Set();
  const stack = [startVertex];
  const result = [];
  
  while (stack.length > 0) {
    const current = stack.pop();
    
    if (!visited.has(current)) {
      visited.add(current);
      result.push(current);
      
      // Add unvisited neighbors to stack
      graph[current].forEach(neighbor => {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      });
    }
  }
  
  return result;
}`,
    fn: dfs,
  },
  dijkstra: {
    name: "Dijkstra's Algorithm",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V)",
    description: "Finds shortest paths from a source vertex to all other vertices in a weighted graph.",
    code: `function dijkstra(graph, startVertex, vertices) {
  const distances = {};
  const visited = new Set();
  
  // Initialize distances
  for (let i = 0; i < vertices; i++) {
    distances[i] = i === startVertex ? 0 : Infinity;
  }
  
  while (visited.size < vertices) {
    // Find unvisited vertex with minimum distance
    let current = null;
    let minDistance = Infinity;
    
    for (let vertex = 0; vertex < vertices; vertex++) {
      if (!visited.has(vertex) && distances[vertex] < minDistance) {
        minDistance = distances[vertex];
        current = vertex;
      }
    }
    
    if (current === null) break;
    visited.add(current);
    
    // Update distances to neighbors
    graph[current].forEach(({ node, weight }) => {
      if (!visited.has(node)) {
        const newDistance = distances[current] + weight;
        if (newDistance < distances[node]) {
          distances[node] = newDistance;
        }
      }
    });
  }
  
  return distances;
}`,
    fn: dijkstra,
  },
}

// Graph Visualization Component
function GraphVisualization({
  vertices,
  edges,
  visited = new Set(),
  current = null,
  queue = [],
  stack = [],
  distances = {},
  addedToQueue = [],
  addedToStack = [],
  updatedNeighbors = [],
}) {
  if (!vertices || vertices === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-900 rounded-md text-gray-500 dark:text-gray-400">
        Enter graph data to visualize.
      </div>
    )
  }

  // Calculate positions for vertices in a circle
  const centerX = 200
  const centerY = 150
  const radius = 100
  const positions = {}

  for (let i = 0; i < vertices; i++) {
    const angle = (2 * Math.PI * i) / vertices
    positions[i] = {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <svg
        width="400"
        height="300"
        className="border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
      >
        {/* Draw edges */}
        {edges.map(([u, v, weight], index) => {
          const pos1 = positions[u]
          const pos2 = positions[v]
          return (
            <g key={index}>
              <line
                x1={pos1.x}
                y1={pos1.y}
                x2={pos2.x}
                y2={pos2.y}
                stroke="#6b7280"
                strokeWidth="2"
                className="dark:stroke-gray-400"
              />
              {weight && weight !== 1 && (
                <text
                  x={(pos1.x + pos2.x) / 2}
                  y={(pos1.y + pos2.y) / 2}
                  fill="#374151"
                  className="text-xs dark:fill-gray-300"
                  textAnchor="middle"
                >
                  {weight}
                </text>
              )}
            </g>
          )
        })}

        {/* Draw vertices */}
        {Array.from({ length: vertices }, (_, i) => {
          const pos = positions[i]
          const isVisited = visited.has(i)
          const isCurrent = current === i
          const isInQueue = queue.includes(i)
          const isInStack = stack.includes(i)
          const isAddedToQueue = addedToQueue.includes(i)
          const isAddedToStack = addedToStack.includes(i)
          const isUpdated = updatedNeighbors.some((neighbor) => neighbor.node === i)

          let fillColor = "#3b82f6" // Default blue
          if (isCurrent) {
            fillColor = "#ef4444" // Red for current
          } else if (isVisited) {
            fillColor = "#10b981" // Green for visited
          } else if (isAddedToQueue || isAddedToStack || isUpdated) {
            fillColor = "#f59e0b" // Orange for newly added
          } else if (isInQueue || isInStack) {
            fillColor = "#8b5cf6" // Purple for in queue/stack
          }

          return (
            <g key={i}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="20"
                fill={fillColor}
                stroke="#1f2937"
                strokeWidth="2"
                className="dark:stroke-gray-200"
              />
              <text x={pos.x} y={pos.y + 5} fill="white" textAnchor="middle" className="text-sm font-bold">
                {i}
              </text>
              {distances[i] !== undefined && distances[i] !== Number.POSITIVE_INFINITY && (
                <text
                  x={pos.x}
                  y={pos.y - 30}
                  fill="#374151"
                  textAnchor="middle"
                  className="text-xs dark:fill-gray-300"
                >
                  d: {distances[i]}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-gray-700 dark:text-gray-300">Unvisited</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-700 dark:text-gray-300">Current</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-700 dark:text-gray-300">Visited</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span className="text-gray-700 dark:text-gray-300">In Queue/Stack</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-gray-700 dark:text-gray-300">Newly Added</span>
        </div>
      </div>
    </div>
  )
}

export default function GraphPage() {
  const [edgesInput, setEdgesInput] = useState("0-1,1-2,2-3,3-0,1-3")
  const [verticesCount, setVerticesCount] = useState("4")
  const [startVertex, setStartVertex] = useState("0")
  const [currentAlgorithm, setCurrentAlgorithm] = useState("bfs")
  const [algorithmSteps, setAlgorithmSteps] = useState([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState("")

  const intervalRef = useRef(null)
  const animationSpeed = 1500

  const currentStep = algorithmSteps[currentStepIndex] || {
    step: "Enter graph data and click 'Run Algorithm' to start.",
    visited: new Set(),
    queue: [],
    stack: [],
    current: null,
    result: [],
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
      const vertices = Number.parseInt(verticesCount.trim())
      const start = Number.parseInt(startVertex.trim())

      if (isNaN(vertices) || vertices <= 0 || isNaN(start) || start < 0 || start >= vertices) {
        throw new Error("Invalid input. Please enter valid vertex count and start vertex.")
      }

      // Parse edges
      const edges = edgesInput.split(",").map((edge) => {
        const parts = edge.trim().split("-")
        if (parts.length === 2) {
          return [Number.parseInt(parts[0]), Number.parseInt(parts[1])]
        } else if (parts.length === 3) {
          return [Number.parseInt(parts[0]), Number.parseInt(parts[1]), Number.parseInt(parts[2])]
        }
        throw new Error("Invalid edge format")
      })

      if (edges.some((edge) => edge.some(isNaN))) {
        throw new Error("Invalid edge format. Use format: 0-1,1-2,2-3 or 0-1-5,1-2-3 for weighted edges.")
      }

      const graph = createAdjacencyList(edges, vertices)
      const { steps } = graphAlgorithms[currentAlgorithm].fn(graph, start, vertices)

      // Add edges and vertices to each step for visualization
      const stepsWithGraph = steps.map((step) => ({
        ...step,
        edges,
        vertices,
      }))

      setAlgorithmSteps(stepsWithGraph)
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
      <h1 className="mb-8 text-3xl font-bold">Graph Algorithms</h1>

      <Tabs value={currentAlgorithm} onValueChange={setCurrentAlgorithm} className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bfs">BFS</TabsTrigger>
          <TabsTrigger value="dfs">DFS</TabsTrigger>
          <TabsTrigger value="dijkstra">Dijkstra's</TabsTrigger>
        </TabsList>

        {Object.entries(graphAlgorithms).map(([key, algo]) => (
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
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="vertices-input" className="text-gray-900 dark:text-gray-100">
                      Number of vertices
                    </Label>
                    <Input
                      id="vertices-input"
                      value={verticesCount}
                      onChange={(e) => setVerticesCount(e.target.value)}
                      placeholder="e.g., 4"
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edges-input" className="text-gray-900 dark:text-gray-100">
                      Edges (format: 0-1,1-2,2-3)
                    </Label>
                    <Input
                      id="edges-input"
                      value={edgesInput}
                      onChange={(e) => setEdgesInput(e.target.value)}
                      placeholder="e.g., 0-1,1-2,2-3,3-0"
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="start-input" className="text-gray-900 dark:text-gray-100">
                      Start vertex
                    </Label>
                    <Input
                      id="start-input"
                      value={startVertex}
                      onChange={(e) => setStartVertex(e.target.value)}
                      placeholder="e.g., 0"
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
                  <GraphVisualization
                    vertices={currentStep.vertices}
                    edges={currentStep.edges}
                    visited={currentStep.visited}
                    current={currentStep.current}
                    queue={currentStep.queue}
                    stack={currentStep.stack}
                    distances={currentStep.distances}
                    addedToQueue={currentStep.addedToQueue}
                    addedToStack={currentStep.addedToStack}
                    updatedNeighbors={currentStep.updatedNeighbors}
                  />

                  <Card className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                        Step {currentStepIndex + 1} of {algorithmSteps.length}:
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{currentStep.step}</p>

                      {/* Show current state */}
                      <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        {currentStep.queue && currentStep.queue.length > 0 && (
                          <p>Queue: [{currentStep.queue.join(", ")}]</p>
                        )}
                        {currentStep.stack && currentStep.stack.length > 0 && (
                          <p>Stack: [{currentStep.stack.join(", ")}]</p>
                        )}
                        {currentStep.result && currentStep.result.length > 0 && (
                          <p>Traversal: [{currentStep.result.join(" → ")}]</p>
                        )}
                      </div>
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
                {currentStepIndex === algorithmSteps.length - 1 &&
                  algorithmSteps.length > 0 &&
                  currentStep.complete && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-md border border-blue-200 dark:border-blue-800">
                      <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                        {currentStep.result
                          ? `Traversal Order: [${currentStep.result.join(" → ")}]`
                          : currentStep.distances
                            ? `Shortest Distances: ${Object.entries(currentStep.distances)
                                .map(([v, d]) => `${v}:${d === Number.POSITIVE_INFINITY ? "∞" : d}`)
                                .join(", ")}`
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
