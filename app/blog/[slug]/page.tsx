import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBlogPost, getBlogPosts } from "@/lib/blog-data"
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
  const post = getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    keywords: post.seo.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  }
}

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getBlogPosts()
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3)

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
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
              <Image src={post.featuredImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>

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

          <Separator className="my-8 bg-gray-800" />

          {/* Author Bio */}
          <div className="bg-gray-900/50 rounded-lg p-6 mb-12">
            <div className="flex items-start gap-4">
              <Image
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">About {post.author.name}</h3>
                <p className="text-gray-300">{post.author.bio}</p>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group">
                    <div className="bg-gray-900/50 rounded-lg overflow-hidden hover:bg-gray-800/50 transition-colors">
                      <div className="relative aspect-video">
                        <Image
                          src={relatedPost.featuredImage || "/placeholder.svg"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
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
