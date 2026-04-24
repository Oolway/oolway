import { getPosts } from "@/actions/get-posts"
import { BlogFeed } from "@/app/(main)/blog/components/blog-feed"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: siteConfig.seo.metaData.blog.title,
  description: siteConfig.seo.metaData.blog.description,
}

export const revalidate = siteConfig.blog.feedRevalidateSeconds as number

export default async function BlogPage() {
  const { posts, nextCursor, hasMore } = await getPosts()

  return (
    <section className="flex flex-col gap-20 mx-auto">
      <header className="font-bold text-foreground text-center space-y-4">
        <h1 className="text-6xl">{siteConfig.blog.pageHeading}</h1>
        <h2 className="text-4xl">{siteConfig.blog.pageSubHeading}</h2>
      </header>

      <BlogFeed
        initialPosts={posts}
        initialCursor={nextCursor}
        initialHasMore={hasMore}
      />
    </section>
  )
}
