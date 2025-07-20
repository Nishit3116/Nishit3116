// This file is **server-only** (never bundled for the browser)
import { cookies } from "next/headers"

/**
 * Reads the persisted theme from the cookie.
 * Falls back to "system" if nothing is stored.
 */
export function getInitialTheme(): "light" | "dark" | "system" {
  return (cookies().get("theme")?.value as "light" | "dark" | undefined) ?? "system"
}
