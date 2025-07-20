"use client"

import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, FileText, Video, Bug } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const faqs = [
  {
    question: "How do I submit my algorithm implementation?",
    answer:
      "Navigate to the 'Submit Work' page, fill in your details, select the algorithm category, and paste your JavaScript code. Make sure to include test cases and documentation.",
  },
  {
    question: "What JavaScript features can I use in my implementations?",
    answer:
      "You can use all modern JavaScript features including ES6+ syntax, array methods, objects, functions, and classes. Avoid using external libraries unless specified.",
  },
  {
    question: "How is my code evaluated?",
    answer:
      "Your code is evaluated based on correctness (40%), code quality (30%), documentation (20%), and test cases (10%). Make sure your code is well-commented and follows best practices.",
  },
  {
    question: "Can I resubmit my work if I find errors?",
    answer:
      "Yes, you can resubmit your work. However, late submissions may have grade penalties. Check with your instructor for specific policies.",
  },
  {
    question: "How do I use the algorithm visualizations?",
    answer:
      "Select an algorithm from the homepage, enter your input data, and click 'Run Algorithm'. Use the step controls to navigate through the visualization.",
  },
  {
    question: "What if the platform doesn't work on my device?",
    answer:
      "The platform works best on modern browsers (Chrome, Firefox, Safari, Edge). Make sure JavaScript is enabled and your browser is up to date.",
  },
]

const resources = [
  {
    title: "Algorithm Complexity Guide",
    description: "Understanding Big O notation and complexity analysis",
    type: "PDF Guide",
    icon: FileText,
    difficulty: "Beginner",
  },
  {
    title: "JavaScript Best Practices",
    description: "Writing clean, efficient JavaScript code for algorithms",
    type: "Documentation",
    icon: Code,
    difficulty: "Intermediate",
  },
  {
    title: "Debugging Techniques",
    description: "Common debugging strategies for algorithm implementations",
    type: "Tutorial",
    icon: Bug,
    difficulty: "Beginner",
  },
  {
    title: "Advanced Algorithm Patterns",
    description: "Design patterns and advanced techniques",
    type: "Video Series",
    icon: Video,
    difficulty: "Advanced",
  },
]

export default function HelpPage() {
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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Help & Support</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-10">
        <Tabs defaultValue="faq">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>
          <TabsContent value="faq">
            <h2 className="mb-2 text-xl font-semibold">Frequently Asked Questions</h2>
            <p className="mb-4">Q: How do I submit my assignment?</p>
            <p>A: Navigate to the “Submit” page, upload your JavaScript file and click “Upload”.</p>
          </TabsContent>
          <TabsContent value="contact">
            <p>
              Need something else? Email{" "}
              <a href="mailto:nishitsavaliya7@gmail.com" className="text-blue-600 hover:underline">
                nishitsavaliya7@gmail.com
              </a>{" "}
              or call{" "}
              <a href="tel:+919099207172" className="text-blue-600 hover:underline">
                +91&nbsp;90992&nbsp;07172
              </a>
              .
            </p>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
