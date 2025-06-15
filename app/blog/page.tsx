import type { Metadata } from "next"
import { getBlogPosts, blogCategories } from "@/lib/blog-data"
import { BlogCard } from "@/components/blog-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Calculator Blog - Tips, Guides & Financial Advice | Calculator Hub",
  description:
    "Expert guides and tips for using calculators effectively. Learn about BMI, mortgage, investment calculations and more financial planning tools.",
  keywords: [
    "calculator blog",
    "financial tips",
    "calculator guides",
    "BMI guide",
    "mortgage calculator",
    "investment planning",
  ],
  openGraph: {
    title: "Calculator Blog - Expert Tips & Guides",
    description:
      "Expert guides and tips for using calculators effectively. Financial planning, health calculations, and more.",
    type: "website",
    url: "https://calculatorhub.com/blog",
  },
}

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Calculator <span className="text-purple-400">Blog</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Expert guides, tips, and insights to help you make the most of our calculators and improve your financial
            planning.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 border-b border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search blog posts..." className="pl-10 bg-gray-800 border-gray-700 text-white" />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {blogCategories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, "-")}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No blog posts found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated with Calculator Tips</h2>
          <p className="text-gray-300 mb-8">
            Get the latest guides, tips, and financial insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email" className="flex-1 bg-gray-800 border-gray-700 text-white" />
            <Button className="bg-purple-600 hover:bg-purple-700">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
