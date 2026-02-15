import { supabase } from "./supabase"

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  calculator_id?: string
  tags: string[]
  featured_image?: string
  meta_title?: string
  meta_description?: string
  keywords: string[]
  reading_time: number
  is_published: boolean
  author_id?: string
  created_at: string
  updated_at: string
  published_at?: string
}

export interface CreateBlogPostData {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  calculator_id?: string
  tags: string[]
  featured_image?: string
  meta_title?: string
  meta_description?: string
  keywords: string[]
  reading_time: number
  is_published: boolean
}

// Get all published blog posts
export async function getBlogPosts() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }

  return data as BlogPost[]
}

// Get all blog posts (admin)
export async function getAllBlogPosts() {
  const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching all blog posts:", error)
    return []
  }

  return data as BlogPost[]
}

// Get blog post by slug
export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single()

  if (error) {
    console.error("Error fetching blog post:", error)
    return null
  }

  return data as BlogPost
}

// Get blog post by ID (admin)
export async function getBlogPostById(id: string) {
  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching blog post by ID:", error)
    return null
  }

  return data as BlogPost
}

// Get blog posts by category
export async function getBlogPostsByCategory(category: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("category", category)
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts by category:", error)
    return []
  }

  return data as BlogPost[]
}

// Get blog posts by calculator ID
export async function getBlogPostsByCalculatorId(calculatorId: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("calculator_id", calculatorId)
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts by calculator ID:", error)
    return []
  }

  return data as BlogPost[]
}

// Create blog post
export async function createBlogPost(postData: CreateBlogPostData) {
  const { data, error } = await supabase
    .from("blog_posts")
    .insert([
      {
        ...postData,
        published_at: postData.is_published ? new Date().toISOString() : null,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error("Error creating blog post:", error)
    throw error
  }

  return data as BlogPost
}

// Update blog post
export async function updateBlogPost(id: string, updates: Partial<CreateBlogPostData>) {
  const updateData = {
    ...updates,
    updated_at: new Date().toISOString(),
    published_at: updates.is_published ? new Date().toISOString() : null,
  }

  const { data, error } = await supabase.from("blog_posts").update(updateData).eq("id", id).select().single()

  if (error) {
    console.error("Error updating blog post:", error)
    throw error
  }

  return data as BlogPost
}

// Delete blog post
export async function deleteBlogPost(id: string) {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id)

  if (error) {
    console.error("Error deleting blog post:", error)
    throw error
  }

  return true
}

// Search blog posts
export async function searchBlogPosts(query: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error searching blog posts:", error)
    return []
  }

  return data as BlogPost[]
}
