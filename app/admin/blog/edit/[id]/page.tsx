import type { Metadata } from "next"
import { BlogForm } from "@/components/admin/blog-form"

export const metadata: Metadata = {
  title: "Edit Blog Post - Admin Dashboard",
  description: "Edit blog post content and settings.",
  robots: "noindex, nofollow",
}

interface EditBlogPostPageProps {
  params: {
    id: string
  }
}

export default function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  return <BlogForm postId={params.id} />
}
