import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Users, Eye, TrendingUp, Plus, Settings, BarChart3 } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"

export const metadata: Metadata = {
  title: "Admin Dashboard - Calculator Hub",
  description: "Admin dashboard for managing blog posts and website content.",
  robots: "noindex, nofollow",
}

// Mock data for now since we're in demo mode
const mockPosts = [
  {
    id: "1",
    title: "How to Calculate BMI Effectively",
    category: "Health",
    created_at: new Date().toISOString(),
    is_published: true,
    slug: "how-to-calculate-bmi",
  },
  {
    id: "2",
    title: "Understanding Compound Interest",
    category: "Finance",
    created_at: new Date().toISOString(),
    is_published: false,
    slug: "understanding-compound-interest",
  },
]

export default function AdminDashboard() {
  const allPosts = mockPosts
  const publishedPosts = allPosts.filter((post) => post.is_published)
  const draftPosts = allPosts.filter((post) => !post.is_published)

  const stats = [
    {
      title: "Total Posts",
      value: allPosts.length,
      icon: FileText,
      color: "text-blue-500",
    },
    {
      title: "Published",
      value: publishedPosts.length,
      icon: Eye,
      color: "text-green-500",
    },
    {
      title: "Drafts",
      value: draftPosts.length,
      icon: Users,
      color: "text-yellow-500",
    },
    {
      title: "Total Views",
      value: "12.5K",
      icon: TrendingUp,
      color: "text-purple-500",
    },
  ]

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-gray-400">Manage your blog posts and website content</p>
            </div>
            <div className="flex gap-2">
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link href="/admin/blog/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Post
                </Link>
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.title} className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Blog Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Manage blog posts</span>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <Link href="/admin/blog">View All Posts</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Create new post</span>
                  <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Link href="/admin/blog/new">New Post</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">View analytics</span>
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    Coming Soon
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">SEO reports</span>
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Posts */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Recent Posts</CardTitle>
                <Button asChild variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Link href="/admin/blog">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allPosts.slice(0, 5).map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-white mb-1">{post.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{post.category}</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        <span className={post.is_published ? "text-green-400" : "text-yellow-400"}>
                          {post.is_published ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        <Link href={`/admin/blog/edit/${post.id}`}>Edit</Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        <Link href={`/blog/${post.slug}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  )
}
