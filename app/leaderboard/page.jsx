"use client"

import { Button } from "@/components/ui/button"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trophy, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// Placeholder data for the leaderboard
const leaderboardData = [
  { rank: 1, name: "Nishit Savaliya", enrollment: "21CE001", score: 980 },
  { rank: 2, name: "Alice Johnson", enrollment: "21CE005", score: 950 },
  { rank: 3, name: "Bob Williams", enrollment: "21CE012", score: 920 },
  { rank: 4, name: "Charlie Brown", enrollment: "21CE020", score: 900 },
  { rank: 5, name: "Diana Miller", enrollment: "21CE033", score: 880 },
  { rank: 6, name: "Eve Davis", enrollment: "21CE045", score: 850 },
  { rank: 7, name: "Frank White", enrollment: "21CE058", score: 830 },
  { rank: 8, name: "Grace Taylor", enrollment: "21CE061", score: 800 },
  { rank: 9, name: "Henry Wilson", enrollment: "21CE077", score: 780 },
  { rank: 10, name: "Ivy Moore", enrollment: "21CE089", score: 750 },
]

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                ← Back to Home
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leaderboard</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span>Top Performers</span>
            </CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              See who's leading in algorithm mastery! Scores are based on submitted work and challenge performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-gray-700">
                    <TableHead className="w-[80px] text-gray-700 dark:text-gray-200">Rank</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-200">Student Name</TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-200">Enrollment No.</TableHead>
                    <TableHead className="text-right text-gray-700 dark:text-gray-200">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboardData.map((student) => (
                    <TableRow key={student.enrollment} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                        {student.rank === 1 && <Trophy className="inline-block w-4 h-4 mr-1 text-yellow-500" />}
                        {student.rank === 2 && <Trophy className="inline-block w-4 h-4 mr-1 text-gray-400" />}
                        {student.rank === 3 && <Trophy className="inline-block w-4 h-4 mr-1 text-amber-700" />}
                        {student.rank}
                      </TableCell>
                      <TableCell className="text-gray-800 dark:text-gray-200 flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                        {student.name}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300">{student.enrollment}</TableCell>
                      <TableCell className="text-right font-semibold text-blue-600 dark:text-blue-400">
                        {student.score}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action / Information */}
        <section className="mt-8 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white">
            <CardContent className="py-8">
              <h2 className="text-2xl font-bold mb-4">Want to see your name here?</h2>
              <p className="text-lg opacity-90 mb-6">
                Submit your best algorithm implementations and participate in challenges to climb the ranks!
              </p>
              <Link href="/submit">
                <Button size="lg" variant="secondary">
                  Submit Your Work
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
