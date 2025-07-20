import { cn } from "@/lib/utils"
import type { ComponentPropsWithoutRef } from "react"

export function Badge({
  className,
  variant = "default",
  ...props
}: ComponentPropsWithoutRef<"span"> & { variant?: "default" | "secondary" | "destructive" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold",
        {
          default: "bg-blue-600 border-blue-600 text-white",
          secondary: "bg-gray-200 border-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
          destructive: "bg-red-600 border-red-600 text-white",
        }[variant],
        className,
      )}
      {...props}
    />
  )
}
