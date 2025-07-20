"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, FileCode, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useActionState } from "react" // Import useActionState
import { submitAlgorithm } from "@/actions/submit-algorithm" // Import the Server Action

const algorithmCategories = [
  "Sorting Algorithms",
  "Searching Algorithms",
  "Graph Algorithms",
  "Dynamic Programming",
  "Divide & Conquer",
  "Greedy Algorithms",
]

const submissionHistory = [
  {
    id: 1,
    title: "Bubble Sort Implementation",
    category: "Sorting Algorithms",
    submittedAt: "2024-01-15",
    status: "approved",
    score: 95,
  },
  {
    id: 2,
    title: "Binary Search Tree",
    category: "Graph Algorithms",
    submittedAt: "2024-01-10",
    status: "pending",
    score: null,
  },
  {
    id: 3,
    title: "Fibonacci DP Solution",
    category: "Dynamic Programming",
    submittedAt: "2024-01-08",
    status: "revision",
    score: 78,
  },
]

export default function SubmitPage() {
  const [state, formAction, isPending] = useActionState(submitAlgorithm, null)

  // Reset form data after successful submission
  const resetForm = () => {
    // This state is now managed by the form's `action` and `useActionState`
    // We can clear the input fields by resetting their controlled values
    // For simplicity, we'll just rely on the form's natural reset or
    // let the user manually clear if they want to submit another.
    // If you need to programmatically clear, you'd manage formData state here.
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "revision":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <AlertCircle className="w-4 h-4" />
      case "revision":
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Submit Term Work</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Submission Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                  <Upload className="w-5 h-5" />
                  <span>Algorithm Implementation Submission</span>
                </CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  Submit your JavaScript algorithm implementation for term work evaluation
                </CardDescription>
              </CardHeader>
              <CardContent>
                {state?.success ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Submission Successful!</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {state.message} You will receive feedback within 2-3 days.
                    </p>
                    <Button onClick={() => window.location.reload()}>Submit Another Algorithm</Button>
                  </div>
                ) : (
                  <form action={formAction} className="space-y-6">
                    {state?.success === false && (
                      <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm">
                        <AlertCircle className="inline w-4 h-4 mr-2" />
                        {state.message}
                      </div>
                    )}
                    {/* Student Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="student-name" className="text-gray-900 dark:text-gray-100">
                          Student Name *
                        </Label>
                        <Input
                          id="student-name"
                          name="studentName" // Add name attribute for formData
                          placeholder="Enter your full name"
                          required
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      <div>
                        <Label htmlFor="enrollment-number" className="text-gray-900 dark:text-gray-100">
                          Enrollment Number *
                        </Label>
                        <Input
                          id="enrollment-number"
                          name="enrollmentNumber" // Add name attribute for formData
                          placeholder="e.g., 21CE001"
                          required
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    </div>

                    {/* Algorithm Details */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="algorithm-title" className="text-gray-900 dark:text-gray-100">
                          Algorithm Title *
                        </Label>
                        <Input
                          id="algorithm-title"
                          name="algorithmTitle" // Add name attribute for formData
                          placeholder="e.g., Quick Sort Implementation"
                          required
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category" className="text-gray-900 dark:text-gray-100">
                          Category *
                        </Label>
                        <Select
                          name="category" // Add name attribute for formData
                          onValueChange={(value) => {
                            // This is needed for controlled component behavior if you want to display the selected value
                            // For useActionState, the name attribute on SelectTrigger is sufficient for form data.
                          }}
                        >
                          <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                            <SelectValue placeholder="Select algorithm category" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                            {algorithmCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <Label htmlFor="description" className="text-gray-900 dark:text-gray-100">
                        Algorithm Description *
                      </Label>
                      <Textarea
                        id="description"
                        name="description" // Add name attribute for formData
                        placeholder="Describe your algorithm implementation, approach, and key features..."
                        className="h-24 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        required
                      />
                    </div>

                    {/* Code Implementation */}
                    <div>
                      <Label htmlFor="code" className="text-gray-900 dark:text-gray-100">
                        JavaScript Implementation *
                      </Label>
                      <Textarea
                        id="code"
                        name="code" // Add name attribute for formData
                        placeholder="Paste your complete JavaScript code here..."
                        className="font-mono text-sm h-64 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        required
                      />
                    </div>

                    {/* Test Cases */}
                    <div>
                      <Label htmlFor="test-cases" className="text-gray-900 dark:text-gray-100">
                        Test Cases & Output
                      </Label>
                      <Textarea
                        id="test-cases"
                        name="testCases" // Add name attribute for formData
                        placeholder="Provide test cases and expected outputs to demonstrate your algorithm works correctly..."
                        className="h-32 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isPending} className="px-8">
                        {isPending ? "Submitting..." : "Submit Algorithm"}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Submission Guidelines */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                  <FileCode className="w-5 h-5" />
                  <span>Submission Guidelines</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Code Requirements:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Write clean, well-commented JavaScript code</li>
                    <li>• Include proper variable naming</li>
                    <li>• Add time/space complexity analysis</li>
                    <li>• Provide working test cases</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Evaluation Criteria:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Correctness (40%)</li>
                    <li>• Code Quality (30%)</li>
                    <li>• Documentation (20%)</li>
                    <li>• Test Cases (10%)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Submission History */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Recent Submissions</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  Your latest algorithm submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissionHistory.map((submission) => (
                    <div
                      key={submission.id}
                      className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">{submission.title}</h4>
                        <div
                          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(submission.status)}`}
                        >
                          {getStatusIcon(submission.status)}
                          <span className="capitalize">{submission.status}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">{submission.category}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{submission.submittedAt}</span>
                        {submission.score && <Badge variant="outline">{submission.score}/100</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/help" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent text-gray-900 dark:text-gray-100"
                  >
                    📚 Documentation
                  </Button>
                </Link>
                <Link href="/examples" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent text-gray-900 dark:text-gray-100"
                  >
                    💡 Code Examples
                  </Button>
                </Link>
                <Link href="/contact" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent text-gray-900 dark:text-gray-100"
                  >
                    📧 Contact Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
