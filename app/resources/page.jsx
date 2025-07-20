"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Code, FileText, Video, ExternalLink, Download, Globe, Mail, Phone, Target } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const studyMaterials = [
  {
    title: "Introduction to Algorithms (CLRS)",
    description: "The comprehensive guide to algorithm design and analysis",
    type: "Textbook",
    difficulty: "Intermediate",
    icon: BookOpen,
    link: "#",
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    description: "Practical implementations in JavaScript",
    type: "Online Course",
    difficulty: "Beginner",
    icon: Video,
    link: "#",
  },
  {
    title: "Big O Notation Cheat Sheet",
    description: "Quick reference for complexity analysis",
    type: "Reference",
    difficulty: "Beginner",
    icon: FileText,
    link: "#",
  },
  {
    title: "Algorithm Visualization Tools",
    description: "Interactive tools for understanding algorithms",
    type: "Tools",
    difficulty: "All Levels",
    icon: Code,
    link: "#",
  },
]

const practiceProblems = [
  {
    category: "Sorting Algorithms",
    problems: [
      "Implement Bubble Sort with optimization",
      "Compare Quick Sort vs Merge Sort performance",
      "Sort array of objects by multiple criteria",
      "Implement counting sort for integers",
    ],
  },
  {
    category: "Searching Algorithms",
    problems: [
      "Binary search in rotated sorted array",
      "Find first and last occurrence of element",
      "Search in 2D matrix",
      "Implement ternary search",
    ],
  },
  {
    category: "Graph Algorithms",
    problems: [
      "Detect cycle in directed graph",
      "Find shortest path in weighted graph",
      "Implement topological sorting",
      "Find strongly connected components",
    ],
  },
  {
    category: "Dynamic Programming",
    problems: [
      "Longest increasing subsequence",
      "Edit distance between strings",
      "Maximum sum subarray",
      "Coin change variations",
    ],
  },
]

const externalResources = [
  {
    name: "LeetCode",
    description: "Practice coding problems and algorithms",
    url: "https://leetcode.com",
    category: "Practice Platform",
  },
  {
    name: "GeeksforGeeks",
    description: "Comprehensive computer science tutorials",
    url: "https://geeksforgeeks.org",
    category: "Learning Platform",
  },
  {
    name: "Visualgo",
    description: "Algorithm visualizations and animations",
    url: "https://visualgo.net",
    category: "Visualization",
  },
  {
    name: "Khan Academy - Algorithms",
    description: "Free algorithm courses and tutorials",
    url: "https://khanacademy.org",
    category: "Online Course",
  },
  {
    name: "MIT OpenCourseWare",
    description: "Free MIT algorithm courses",
    url: "https://ocw.mit.edu",
    category: "Academic",
  },
  {
    name: "Coursera - Algorithms Specialization",
    description: "Stanford's algorithm specialization",
    url: "https://coursera.org",
    category: "Online Course",
  },
]

const templates = [
  {
    name: "Basic Algorithm Template",
    description: "Standard template for algorithm implementation",
    language: "JavaScript",
    type: "Template",
  },
  {
    name: "Sorting Algorithm Template",
    description: "Template with comparison and swap functions",
    language: "JavaScript",
    type: "Template",
  },
  {
    name: "Graph Algorithm Template",
    description: "Template for graph-based algorithms",
    language: "JavaScript",
    type: "Template",
  },
  {
    name: "Dynamic Programming Template",
    description: "Template for DP problems with memoization",
    language: "JavaScript",
    type: "Template",
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-600">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                ← Back to Home
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Learning Resources</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Master Algorithms with These Resources
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive collection of study materials, practice problems, and tools to help you excel in Algorithm
            Design and Analysis at GEC Dahod.
          </p>
        </section>

        {/* Quick Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-center">
              <CardContent className="pt-6">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">25+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Study Materials</div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-center">
              <CardContent className="pt-6">
                <Code className="w-8 h-8 mx-auto mb-2 text-green-600 dark:text-green-400" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Practice Problems</div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-center">
              <CardContent className="pt-6">
                <Video className="w-8 h-8 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">15+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Video Tutorials</div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-center">
              <CardContent className="pt-6">
                <FileText className="w-8 h-8 mx-auto mb-2 text-orange-600 dark:text-orange-400" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">10+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Code Templates</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Content Tabs */}
        <Tabs defaultValue="materials" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="materials">Study Materials</TabsTrigger>
            <TabsTrigger value="practice">Practice Problems</TabsTrigger>
            <TabsTrigger value="external">External Links</TabsTrigger>
            <TabsTrigger value="templates">Code Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="materials">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Study Materials</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Curated learning materials for algorithm mastery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {studyMaterials.map((material, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <material.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{material.title}</h3>
                            <Badge variant="outline" className="dark:border-gray-500 dark:text-gray-300">
                              {material.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{material.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                              {material.type}
                            </span>
                            <Button size="sm" variant="outline">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Access
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="practice">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Practice Problems</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Hands-on problems to strengthen your algorithm skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {practiceProblems.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                        <Target className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                        {section.category}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {section.problems.map((problem, problemIndex) => (
                          <div
                            key={problemIndex}
                            className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700 dark:text-gray-200">{problem}</span>
                              <Button size="sm" variant="ghost">
                                Try →
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="external">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">External Resources</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Recommended external platforms and websites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {externalResources.map((resource, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{resource.name}</h3>
                        <Badge variant="secondary" className="text-xs dark:bg-gray-600 dark:text-gray-200">
                          {resource.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{resource.description}</p>
                      <Button size="sm" variant="outline" className="w-full bg-transparent" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Visit Site
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Code Templates</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Ready-to-use templates for your algorithm implementations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {templates.map((template, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{template.name}</h3>
                        <Badge variant="outline" className="dark:border-gray-500 dark:text-gray-300">
                          {template.language}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{template.description}</p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="ghost">
                          Preview
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional External Resources */}
        <section className="mt-12">
          <h1 className="mb-6 text-3xl font-bold">Additional Learning Resources</h1>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <a
                href="https://cp-algorithms.com"
                target="_blank"
                className="text-blue-600 hover:underline"
                rel="noreferrer"
              >
                CP-Algorithms
              </a>
            </li>
            <li>
              <a
                href="https://visualgo.net/en"
                target="_blank"
                className="text-blue-600 hover:underline"
                rel="noreferrer"
              >
                VisuAlgo – Algorithm Visualiser
              </a>
            </li>
            <li>
              <a
                href="https://gecdahod.ac.in/"
                target="_blank"
                className="text-blue-600 hover:underline"
                rel="noreferrer"
              >
                GEC Dahod Library
              </a>
            </li>
          </ul>
        </section>

        {/* Contact Section */}
        <section className="mt-12">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white">
            <CardContent className="py-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Need More Resources?</h2>
                <p className="opacity-90">Contact us for additional study materials or specific algorithm help</p>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <a href="mailto:nishitsavaliya7@gmail.com" className="hover:underline">
                    nishitsavaliya7@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <a href="tel:+919099207172" className="hover:underline">
                    +91 9099207172
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <a
                    href="https://gecdahod.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    gecdahod.ac.in
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
