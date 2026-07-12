import { BlogLayout, PostTypeBadge, formatDate } from "./layout";
import { posts } from "./posts";

export default function Blog() {
  return (
    <BlogLayout>
      <section class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 class="text-4xl sm:text-5xl font-medium tracking-tight text-balance mb-4">Blog</h1>
        <p class="text-lg text-pretty text-stone-900/55 dark:text-stone-200/55 mb-12">
          Release announcements and usage examples from the rngo team.
        </p>

        <div role="list" class="divide-y divide-stone-900/10 dark:divide-stone-200/10">
          {posts.map((post) => (
            <a
              role="listitem"
              href={`/blog/${post.slug}`}
              class="group block py-8 first:pt-0 last:pb-0"
            >
              <div class="flex items-center gap-x-3 mb-3">
                <PostTypeBadge type={post.type} />
                <time datetime={post.date} class="text-xs text-stone-900/40 dark:text-stone-200/40">
                  {formatDate(post.date)}
                </time>
              </div>
              <h2 class="text-xl font-medium tracking-tight mb-2 transition-colors group-hover:text-amber-600 dark:group-hover:text-amber-400">
                {post.title}
              </h2>
              <p class="text-sm leading-relaxed text-pretty text-stone-900/70 dark:text-stone-200/70">
                {post.excerpt}
              </p>
            </a>
          ))}
        </div>
      </section>
    </BlogLayout>
  );
}
