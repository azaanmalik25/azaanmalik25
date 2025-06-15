import type { Metadata } from "next"
import { BlogForm } from "@/components/admin/blog-form"

export const metadata: Metadata = {
  title: "Create New Blog Post - Admin Dashboard",
  description: "Create a new blog post with SEO optimization and rich content.",
  robots: "noindex, nofollow",
}

export default function NewBlogPostPage() {
  return <BlogForm />
}
