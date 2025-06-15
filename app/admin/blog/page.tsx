import type { Metadata } from "next"
import Link from "next/link"
import { getAllBlogPosts } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Eye, Trash2, Filter, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog Management - Admin Dashboard",
  description: "Manage blog posts, create new content, and edit existing articles.",
  robots: "noindex, nofollow",
}

export default function BlogManagementPage() {
  const posts = getAllBlogPosts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <Link href="/admin">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Blog Management</h1>
              <p className="text-gray-400">Create, edit, and manage your blog posts</p>
            </div>
          </div>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/admin/blog/new">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Link>
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="bg-gray-900/50 border-gray-800 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search posts..." className="pl-10 bg-gray-800 border-gray-700 text-white" />
              </div>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Posts List */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">All Posts ({posts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-white">{post.title}</h3>
                      <Badge
                        variant={post.isPublished ? "default" : "secondary"}
                        className={post.isPublished ? "bg-green-600" : "bg-yellow-600"}
                      >
                        {post.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Category: {post.category}</span>
                      <span>Author: {post.author.name}</span>
                      <span>Published: {new Date(post.publishedAt).toLocaleDateString()}</span>
                      <span>Reading time: {post.readingTime} min</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      <Link href={`/admin/blog/edit/${post.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-700 text-red-400 hover:bg-red-900/20">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {posts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">No blog posts found.</p>
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/admin/blog/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Post
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
