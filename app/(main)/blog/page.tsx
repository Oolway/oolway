import { getPosts } from "@/actions/get-posts"
import { BlogFeed } from "@/app/(main)/blog/components/blog-feed"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: siteConfig.seo.metaData.blog.title,
  description: siteConfig.seo.metaData.blog.description,
}

export default async function BlogPage() {
  const { posts, nextCursor, hasMore } = await getPosts()

  return (
    <section className="flex flex-col gap-20 py-16 mx-auto">
      <header className="font-bold text-6xl text-foreground text-center">
        <h1>Minimal Blog</h1>
      </header>

      <BlogFeed
        initialPosts={posts}
        initialCursor={nextCursor}
        initialHasMore={hasMore}
      />
    </section>
  )
}
