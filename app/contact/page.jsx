"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  BookOpen,
  Lightbulb,
  FlaskConical,
  GraduationCap,
  Target,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      })
    }, 2000)
  }

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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions about algorithms, need technical support, or want to provide feedback? We're here to help you
            succeed in your learning journey.
          </p>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Institution Info */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Institution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Government Engineering College</h3>
                  <p className="text-gray-600 dark:text-gray-300">Dahod, Gujarat</p>
                </div>
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
              </CardContent>
            </Card>

            {/* Computer Engineering Department Details */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Computer Engineering Department
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>

            {/* Contact Details */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contact Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Email</p>
                    <a
                      href="mailto:nishitsavaliya7@gmail.com"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      nishitsavaliya7@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                    <a href="tel:+919099207172" className="text-blue-600 dark:text-blue-400 hover:underline">
                      +91 9099207172
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Address</p>
                    <p className="text-gray-600 dark:text-gray-300">Dahod, Gujarat, India</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  College Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Monday - Friday</span>
                  <span className="text-gray-900 dark:text-white">10:30 AM - 5:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Saturday</span>
                  <span className="text-gray-900 dark:text-white">10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Sunday</span>
                  <span className="text-gray-900 dark:text-white">Closed</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/help" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Help & Support
                  </Button>
                </Link>
                <Link href="/resources" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Learning Resources
                  </Button>
                </Link>
                <Link href="/about" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    About Platform
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center">
                  <Send className="w-5 h-5 mr-2" />
                  Send us a Message
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Thank you for contacting us. We'll respond within 24 hours during business days.
                    </p>
                    <Button onClick={() => setSubmitSuccess(false)}>Send Another Message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-900 dark:text-white">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Enter your full name"
                          required
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-900 dark:text-white">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Enter your email address"
                          required
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category" className="text-gray-900 dark:text-white">
                          Category *
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                        >
                          <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="academic">Academic Help</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="bug">Bug Report</SelectItem>
                            <SelectItem value="feature">Feature Request</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="subject" className="text-gray-900 dark:text-white">
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                          placeholder="Brief subject line"
                          required
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-900 dark:text-white">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Please describe your question or issue in detail..."
                        className="h-32 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                        required
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" disabled={isSubmitting} className="px-8">
                        <Send className="w-4 h-4 mr-2" />
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <section className="mt-12">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white">
            <CardContent className="py-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
                <p className="text-lg opacity-90 mb-6">
                  For urgent technical issues or academic emergencies, contact us directly
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <a href="mailto:nishitsavaliya7@gmail.com" className="flex items-center space-x-2 hover:underline">
                    <Mail className="w-5 h-5" />
                    <span>nishitsavaliya7@gmail.com</span>
                  </a>
                  <a href="tel:+919099207172" className="flex items-center space-x-2 hover:underline">
                    <Phone className="w-5 h-5" />
                    <span>+91 9099207172</span>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Updated Contact Information */}
        <main className="container mx-auto max-w-3xl px-4 py-10 mt-12">
          <h1 className="mb-6 text-3xl font-bold">Contact Us</h1>
          <p className="mb-2">
            <strong>Address:</strong> Government Engineering College, Dahod, Gujarat
          </p>
          <p className="mb-2">
            <strong>Website:</strong>{" "}
            <a
              href="https://gecdahod.ac.in/"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              gecdahod.ac.in
            </a>
          </p>
          <p className="mb-2">
            <strong>Email:</strong>{" "}
            <a href="mailto:nishitsavaliya7@gmail.com" className="text-blue-600 hover:underline">
              nishitsavaliya7@gmail.com
            </a>
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            <a href="tel:+919099207172" className="text-blue-600 hover:underline">
              +91&nbsp;90992&nbsp;07172
            </a>
          </p>
        </main>
      </div>
    </div>
  )
}
