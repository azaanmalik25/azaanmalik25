"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { blogCategories, createBlogPost, updateBlogPost, getBlogPostById } from "@/lib/blog-data"
import { ArrowLeft, Save, Eye, Plus, X } from "lucide-react"

interface BlogFormProps {
  postId?: string
}

export function BlogForm({ postId }: BlogFormProps) {
  const router = useRouter()
  const existingPost = postId ? getBlogPostById(postId) : null
  const isEditing = !!existingPost

  const [formData, setFormData] = useState({
    title: existingPost?.title || "",
    slug: existingPost?.slug || "",
    excerpt: existingPost?.excerpt || "",
    content: existingPost?.content || "",
    category: existingPost?.category || "",
    tags: existingPost?.tags || [],
    featuredImage: existingPost?.featuredImage || "",
    isPublished: existingPost?.isPublished || false,
    seo: {
      metaTitle: existingPost?.seo.metaTitle || "",
      metaDescription: existingPost?.seo.metaDescription || "",
      keywords: existingPost?.seo.keywords || [],
    },
    author: {
      name: existingPost?.author.name || "Admin",
      avatar: existingPost?.author.avatar || "/placeholder.svg?height=40&width=40",
      bio: existingPost?.author.bio || "Website administrator and content creator.",
    },
  })

  const [newTag, setNewTag] = useState("")
  const [newKeyword, setNewKeyword] = useState("")

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
      seo: {
        ...prev.seo,
        metaTitle: title.length > 60 ? title.substring(0, 57) + "..." : title,
      },
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.seo.keywords.includes(newKeyword.trim())) {
      setFormData((prev) => ({
        ...prev,
        seo: {
          ...prev.seo,
          keywords: [...prev.seo.keywords, newKeyword.trim()],
        },
      }))
      setNewKeyword("")
    }
  }

  const removeKeyword = (keywordToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: prev.seo.keywords.filter((keyword) => keyword !== keywordToRemove),
      },
    }))
  }

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const postData = {
      ...formData,
      readingTime: calculateReadingTime(formData.content),
      publishedAt: existingPost?.publishedAt || new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }

    try {
      if (isEditing && postId) {
        updateBlogPost(postId, postData)
      } else {
        createBlogPost(postData)
      }

      router.push("/admin/blog")
    } catch (error) {
      console.error("Error saving post:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <Link href="/admin/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Posts
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
              </h1>
              <p className="text-gray-400">
                {isEditing ? "Update your blog post content and settings" : "Write and publish a new blog post"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              form="blog-form"
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button type="submit" form="blog-form" className="bg-purple-600 hover:bg-purple-700">
              <Eye className="h-4 w-4 mr-2" />
              {formData.isPublished ? "Update" : "Publish"}
            </Button>
          </div>
        </div>

        <form id="blog-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-gray-300">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Enter post title..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="slug" className="text-gray-300">
                    Slug
                  </Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="post-url-slug"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt" className="text-gray-300">
                    Excerpt
                  </Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Brief description of the post..."
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="content" className="text-gray-300">
                    Content
                  </Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white min-h-[400px]"
                    placeholder="Write your blog post content here..."
                    required
                  />
                  <p className="text-sm text-gray-400 mt-1">
                    Estimated reading time: {calculateReadingTime(formData.content)} minutes
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle" className="text-gray-300">
                    Meta Title
                  </Label>
                  <Input
                    id="metaTitle"
                    value={formData.seo.metaTitle}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        seo: { ...prev.seo, metaTitle: e.target.value },
                      }))
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="SEO title for search engines..."
                    maxLength={60}
                  />
                  <p className="text-sm text-gray-400 mt-1">{formData.seo.metaTitle.length}/60 characters</p>
                </div>

                <div>
                  <Label htmlFor="metaDescription" className="text-gray-300">
                    Meta Description
                  </Label>
                  <Textarea
                    id="metaDescription"
                    value={formData.seo.metaDescription}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        seo: { ...prev.seo, metaDescription: e.target.value },
                      }))
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="SEO description for search engines..."
                    rows={3}
                    maxLength={160}
                  />
                  <p className="text-sm text-gray-400 mt-1">{formData.seo.metaDescription.length}/160 characters</p>
                </div>

                <div>
                  <Label className="text-gray-300">SEO Keywords</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Add keyword..."
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                    />
                    <Button type="button" onClick={addKeyword} size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.seo.keywords.map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="flex items-center gap-1">
                        {keyword}
                        <button
                          type="button"
                          onClick={() => removeKeyword(keyword)}
                          className="ml-1 hover:text-red-400"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Publish Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published" className="text-gray-300">
                    Published
                  </Label>
                  <Switch
                    id="published"
                    checked={formData.isPublished}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPublished: checked }))}
                  />
                </div>
                <Separator className="bg-gray-800" />
                <div>
                  <Label className="text-gray-300">Status</Label>
                  <p className="text-sm text-gray-400">
                    {formData.isPublished ? "This post will be published" : "This post will be saved as draft"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Category and Tags */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Category & Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {blogCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gray-300">Tags</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Add tag..."
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-red-400">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="featuredImage" className="text-gray-300">
                    Image URL
                  </Label>
                  <Input
                    id="featuredImage"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData((prev) => ({ ...prev, featuredImage: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  )
}
