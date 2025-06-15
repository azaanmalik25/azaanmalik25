import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { BlogPost } from "@/lib/blog-data"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 transition-colors group">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-video">
          <Image
            src={post.featuredImage || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover rounded-t-lg"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary">{post.category}</Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readingTime} min</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
