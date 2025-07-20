"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Users,
  Award,
  Target,
  Mail,
  Phone,
  Globe,
  Lightbulb,
  FlaskConical,
  GraduationCap,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const teamMembers = [
  {
    name: "Dr. Faculty Name",
    role: "Course Coordinator",
    department: "Computer Engineering",
    expertise: ["Algorithm Design", "Data Structures", "Computational Complexity"],
  },
  {
    name: "Prof. Guide Name",
    role: "Lab Instructor",
    department: "Computer Engineering",
    expertise: ["Programming Languages", "Software Development", "System Design"],
  },
]

const achievements = [
  {
    title: "Interactive Learning Platform",
    description: "First of its kind algorithm visualization platform for GEC Dahod",
    icon: BookOpen,
  },
  {
    title: "Student-Centric Design",
    description: "Built specifically for Computer Engineering students' learning needs",
    icon: Users,
  },
  {
    title: "Comprehensive Coverage",
    description: "Complete syllabus coverage with practical implementations",
    icon: Award,
  },
  {
    title: "Real-time Feedback",
    description: "Instant code evaluation and step-by-step algorithm visualization",
    icon: Target,
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-600">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                ← Back to Home
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">About ADA Lab Platform</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Mission Section */}
        <section className="mb-12">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
            <CardHeader>
              <CardTitle className="text-3xl text-center text-gray-900 dark:text-white">Our Mission</CardTitle>
              <CardDescription className="text-center text-lg text-gray-600 dark:text-gray-300">
                Empowering the next generation of computer engineers through interactive algorithm learning
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed">
                The ADA Lab Platform is designed specifically for students at Government Engineering College, Dahod, to
                master Algorithm Design and Analysis through hands-on JavaScript implementations. Our platform bridges
                the gap between theoretical knowledge and practical application, providing an interactive environment
                where students can visualize, understand, and implement complex algorithms.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* About GEC Dahod & Computer Department */}
        <section className="mb-12">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">
                Government Engineering College, Dahod
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 dark:text-gray-200 mb-4">
                    Government Engineering College, Dahod is a premier technical institution in Gujarat, committed to
                    providing quality engineering education. Established with the vision of creating skilled engineers
                    who can contribute to the nation's technological advancement.
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    The Computer Engineering department focuses on cutting-edge curriculum that combines theoretical
                    foundations with practical applications, preparing students for the challenges of the modern
                    technology industry.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <a
                      href="https://gecdahod.ac.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      gecdahod.ac.in
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <a
                      href="mailto:nishitsavaliya7@gmail.com"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      nishitsavaliya7@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <a href="tel:+919099207172" className="text-blue-600 dark:text-blue-400 hover:underline">
                      +91 9099207172
                    </a>
                  </div>
                  <div>
                    <p>Created by Nishit Savaliya</p>
                  </div>
                </div>
              </div>

              {/* Computer Engineering Department Details */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Computer Engineering Department
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2 text-blue-500 dark:text-blue-300" />
                      Vision
                    </h4>
                    <p className="text-gray-700 dark:text-gray-200">
                      To be a center of excellence in Computer Engineering education and research, producing globally
                      competent and socially responsible professionals.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      <Target className="w-4 h-4 mr-2 text-blue-500 dark:text-blue-300" />
                      Mission
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-1">
                      <li>To impart quality education in Computer Engineering through a well-designed curriculum.</li>
                      <li>To foster a learning environment that promotes innovation, research, and problem-solving.</li>
                      <li>To inculcate professional ethics and social responsibility among students.</li>
                      <li>To collaborate with industry and academia for mutual growth and development.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      <FlaskConical className="w-4 h-4 mr-2 text-blue-500 dark:text-blue-300" />
                      Key Facilities
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-1">
                      <li>Well-equipped Computer Labs with modern hardware and software.</li>
                      <li>High-speed internet connectivity.</li>
                      <li>Departmental Library with a rich collection of books and journals.</li>
                      <li>Research and Development facilities for advanced projects.</li>
                      <li>Dedicated faculty for student mentorship and guidance.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Platform Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Platform Achievements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow"
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-lg text-gray-900 dark:text-white">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Course Information */}
        <section className="mb-12">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">Course Information</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Algorithm Design and Analysis - Computer Engineering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Learning Objectives</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                    <li>• Master fundamental algorithm design techniques</li>
                    <li>• Analyze time and space complexity</li>
                    <li>• Implement algorithms in JavaScript</li>
                    <li>• Understand practical applications</li>
                    <li>• Develop problem-solving skills</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Topics Covered</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="dark:border-gray-500 dark:text-gray-300">
                      Sorting Algorithms
                    </Badge>
                    <Badge variant="outline" className="dark:border-gray-500 dark:text-gray-300">
                      Searching Algorithms
                    </Badge>
                    <Badge variant="outline" className="dark:border-gray-500 dark:text-gray-300">
                      Graph Algorithms
                    </Badge>
                    <Badge variant="outline" className="dark:border-gray-500 dark:text-gray-300">
                      Dynamic Programming
                    </Badge>
                    <Badge variant="outline" className="dark:border-gray-500 dark:text-gray-300">
                      Divide & Conquer
                    </Badge>
                    <Badge variant="outline" className="dark:border-gray-500 dark:text-gray-300">
                      Greedy Algorithms
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join hundreds of students mastering algorithms through interactive learning
              </p>
              <div className="space-x-4">
                <Link href="/">
                  <Button size="lg" variant="secondary">
                    Explore Algorithms
                  </Button>
                </Link>
                <Link href="/submit">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
                  >
                    Submit Your Work
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ADA Lab Platform Description */}
        <section className="mb-12">
          <main className="container mx-auto max-w-3xl px-4 py-10">
            <h1 className="mb-4 text-3xl font-bold">ADA Lab Platform</h1>
            <p className="leading-7">
              ADA Lab Platform is an interactive learning environment developed at
              <a
                href="https://gecdahod.ac.in/"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                Government Engineering College, Dahod
              </a>
              . It helps students master algorithm design &amp; analysis through live code, visualisations and automated
              evaluation.
            </p>
          </main>
        </section>
      </div>
    </div>
  )
}
