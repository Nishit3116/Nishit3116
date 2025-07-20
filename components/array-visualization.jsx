"use client"
import { cn } from "@/lib/utils"

export function ArrayVisualization({
  array,
  comparing = [],
  swapped = [],
  minIndex = null,
  inserted = [],
  pivotIndex = null,
}) {
  if (!array || array.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-100 dark:bg-gray-900 rounded-md text-gray-500 dark:text-gray-400">
        Enter an array to visualize.
      </div>
    )
  }

  const maxValue = Math.max(...array)
  const barWidth = Math.max(20, Math.min(60, 600 / array.length)) // Dynamic width based on array size

  return (
    <div className="flex items-end justify-center h-64 bg-gray-50 dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-700 overflow-x-auto">
      {array.map((value, index) => {
        const isComparing = comparing.includes(index)
        const isSwapped = swapped.includes(index)
        const isMin = minIndex === index
        const isInserted = inserted.includes(index)
        const isPivot = pivotIndex === index

        let barColorClass = "bg-blue-500 dark:bg-blue-600" // Default color
        if (isSwapped) {
          barColorClass = "bg-green-500 dark:bg-green-600" // Swapped elements
        } else if (isPivot) {
          barColorClass = "bg-purple-500 dark:bg-purple-600" // Pivot element
        } else if (isComparing) {
          barColorClass = "bg-yellow-500 dark:bg-yellow-600" // Elements being compared
        } else if (isMin) {
          barColorClass = "bg-red-500 dark:bg-red-600" // Minimum element in selection sort
        } else if (isInserted) {
          barColorClass = "bg-orange-500 dark:bg-orange-600" // Inserted element in insertion sort (or merged)
        }

        const barHeight = maxValue > 0 ? (value / maxValue) * 90 + 10 : 0 // Scale height, min 10% for 0

        return (
          <div
            key={index}
            className="flex flex-col items-center mx-0.5 transition-all duration-300 ease-in-out"
            style={{ width: `${barWidth}px` }}
          >
            <div className={cn("w-full rounded-t-sm", barColorClass)} style={{ height: `${barHeight}%` }}></div>
            <span className="text-xs mt-1 text-gray-700 dark:text-gray-300">{value}</span>
          </div>
        )
      })}
    </div>
  )
}
