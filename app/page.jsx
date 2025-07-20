import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Code, Users, Award, TrendingUp } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const algorithmCategories = [
  {
    title: "Sorting Algorithms",
    description: "Bubble Sort, Quick Sort, Merge Sort, Heap Sort",
    count: 6,
    difficulty: "Beginner",
    href: "/sorting",
    color: "bg-blue-500",
  },
  {
    title: "Searching Algorithms",
    description: "Linear Search, Binary Search, Interpolation Search",
    count: 4,
    difficulty: "Beginner",
    href: "/searching",
    color: "bg-green-500",
  },
  {
    title: "Graph Algorithms",
    description: "BFS, DFS, Dijkstra, Kruskal, Prim's Algorithm",
    count: 8,
    difficulty: "Intermediate",
    href: "/graph",
    color: "bg-purple-500",
  },
  {
    title: "Dynamic Programming",
    description: "Fibonacci, Knapsack, LCS, Edit Distance",
    count: 6,
    difficulty: "Advanced",
    href: "/dynamic-programming",
    color: "bg-orange-500",
  },
  {
    title: "Divide & Conquer",
    description: "Merge Sort, Quick Sort, Binary Search, Strassen's",
    count: 5,
    difficulty: "Intermediate",
    href: "/divide-conquer",
    color: "bg-red-500",
  },
  {
    title: "Greedy Algorithms",
    description: "Activity Selection, Huffman Coding, Job Scheduling",
    count: 4,
    difficulty: "Intermediate",
    href: "/greedy",
    color: "bg-teal-500",
  },
]

const stats = [
  { label: "Total Algorithms", value: "33+", icon: Code },
  { label: "Active Students", value: "150+", icon: Users },
  { label: "Submissions", value: "500+", icon: Award },
  { label: "Success Rate", value: "85%", icon: TrendingUp },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-600">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ADA Lab Platform</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Government Engineering College, Dahod</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/submit">
                <Button>Submit Work</Button>
              </Link>
              <Link href="/leaderboard">
                <Button variant="outline">Leaderboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Master Algorithm Design & Analysis</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Interactive JavaScript implementations of essential algorithms. Learn, code, verify, and submit your term
            work all in one place.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Algorithm Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Algorithm Categories</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {algorithmCategories.map((category, index) => (
              <Link key={index} href={category.href}>
                <Card className="hover:shadow-lg dark:hover:shadow-xl transition-shadow cursor-pointer h-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                      <Badge
                        variant={
                          category.difficulty === "Beginner"
                            ? "default"
                            : category.difficulty === "Intermediate"
                              ? "secondary"
                              : "destructive"
                        }
                        className="dark:text-white"
                      >
                        {category.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">{category.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{category.count} algorithms</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      >
                        Explore →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Platform Features</h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Interactive Code Editor</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Write, test, and debug JavaScript algorithms with real-time execution and output verification.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Visual Algorithm Analysis</h4>
              <p className="text-gray-600 dark:text-gray-300">
                See step-by-step execution, time complexity analysis, and performance comparisons.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Term Work Submission</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Submit your implementations directly through the platform with automatic evaluation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">ADA Lab Platform</h5>
              <p className="text-gray-400 dark:text-gray-500">
                Empowering students at GEC Dahod to master algorithms through interactive learning and practical
                implementation.
              </p>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help & Support
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-white">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-4">Contact Info</h5>
              <div className="text-gray-400 dark:text-gray-500 space-y-2">
                <p>Government Engineering College</p>
                <p>Dahod, Gujarat</p>
                <p>
                  Website:{" "}
                  <a
                    href="https://gecdahod.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    gecdahod.ac.in
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:nishitsavaliya7@gmail.com" className="text-blue-400 hover:text-blue-300">
                    nishitsavaliya7@gmail.com
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a href="tel:+919099207172" className="text-blue-400 hover:text-blue-300">
                    +91 9099207172
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 dark:border-gray-700 pt-8 text-center text-gray-400 dark:text-gray-500">
            <p>&copy; 2025 GEC Dahod - ADA Lab Platform. All rights reserved.</p>
          </div>
          <div className="border-t border-gray-800 dark:border-gray-700 mt-8 text-center text-gray-400 dark:text-gray-500">
            <p>
              Created by{" "}
              <a
                href="http://www.linkedin.com/in/nishit-savaliya-bb5647254"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                Nishit Savaliya
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
