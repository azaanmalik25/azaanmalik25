import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBlogPostBySlug, getBlogPostsByCategory } from "@/lib/blog-service"
import { Calendar, Clock, User, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.published_at || post.created_at,
      modifiedTime: post.updated_at,
      images: post.featured_image
        ? [
            {
              url: post.featured_image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.featured_image ? [post.featured_image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getBlogPostsByCategory(post.category)
  const filteredRelatedPosts = relatedPosts.filter((p) => p.id !== post.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Breadcrumb */}
      <nav className="py-4 px-4 border-b border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white">
              Blog
            </Link>
            <span>/</span>
            <span className="text-white">{post.title}</span>
          </div>
        </div>
      </nav>

      <article className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <header className="mb-8">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-4">
                {post.category}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{post.title}</h1>
            <p className="text-xl text-gray-300 mb-8">{post.excerpt}</p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Admin</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.published_at || post.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.reading_time} min read</span>
              </div>
            </div>

            {/* Featured Image */}
            {post.featured_image && (
              <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
                <Image src={post.featured_image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
            )}

            {/* Share Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-gray-400 flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share:
              </span>
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none mb-12">
            <div
              className="text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }}
            />
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-gray-700 text-gray-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator className="my-8 bg-gray-800" />

          {/* Related Posts */}
          {filteredRelatedPosts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredRelatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group">
                    <div className="bg-gray-900/50 rounded-lg overflow-hidden hover:bg-gray-800/50 transition-colors">
                      {relatedPost.featured_image && (
                        <div className="relative aspect-video">
                          <Image
                            src={relatedPost.featured_image || "/placeholder.svg"}
                            alt={relatedPost.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors mb-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-400 text-sm">{relatedPost.excerpt.substring(0, 100)}...</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </div>
  )
}
