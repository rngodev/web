import type { PropsWithChildren } from "hono/jsx";
import { SiteHeader } from "../../components/site-header";
import { posts, type PostMeta, type PostType } from "./posts";

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

const postTypeLabels: Record<PostType, string> = {
  "release-friday": "Release Friday",
};

const postTypeStyles: Record<PostType, string> = {
  "release-friday": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

export function PostTypeBadge({ type }: { type: PostType }) {
  return (
    <span class={`text-xs px-1.5 py-0.5 rounded-sm ${postTypeStyles[type]}`}>
      {postTypeLabels[type]}
    </span>
  );
}

function RecentPosts({ current }: { current?: string }) {
  return (
    <div class="mb-6">
      <p class="text-xs uppercase tracking-widest mb-2 text-amber-600">Recent Posts</p>
      <ul class="space-y-0.5">
        {posts.slice(0, 5).map((post) => (
          <li>
            <a
              href={`/blog/${post.type}/${post.slug}`}
              aria-current={current === post.slug ? "page" : undefined}
              class={`block px-2 py-1.5 text-sm rounded-sm transition-colors ${
                current === post.slug
                  ? "text-stone-900 dark:text-stone-200 bg-stone-900/5 dark:bg-stone-200/10"
                  : "text-stone-900/55 dark:text-stone-200/55 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-900/5 dark:hover:bg-stone-200/5"
              }`}
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BlogLayout({ children, currentSlug }: PropsWithChildren<{ currentSlug?: string }>) {
  return (
    <div class="min-h-dvh font-mono bg-white text-stone-900 dark:bg-stone-900 dark:text-stone-200">
      <SiteHeader active="blog">
        <RecentPosts current={currentSlug} />
      </SiteHeader>

      <main>{children}</main>

      {/* Footer */}
      <footer class="border-t border-stone-900/10 dark:border-stone-200/10 mt-10">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex items-center justify-between">
          <p class="text-xs text-stone-900/30 dark:text-stone-200/30">© 2026 rngo</p>
          <nav class="flex items-center gap-x-6 text-xs text-stone-900/30 dark:text-stone-200/30">
            <a
              href="/docs"
              class="transition-colors hover:text-stone-900/60 dark:hover:text-stone-200/60"
            >
              docs
            </a>
            <a
              href="/blog"
              class="transition-colors hover:text-stone-900/60 dark:hover:text-stone-200/60"
            >
              blog
            </a>
            <a
              href="https://github.com/rngodev"
              class="transition-colors hover:text-stone-900/60 dark:hover:text-stone-200/60"
            >
              github
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export function PostLayout({ meta, children }: PropsWithChildren<{ meta: PostMeta }>) {
  return (
    <BlogLayout currentSlug={meta.slug}>
      <article class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10">
        <a
          href="/blog"
          class="inline-block text-sm text-stone-900/50 transition-colors hover:text-stone-900 dark:text-stone-200/50 dark:hover:text-stone-200 mb-8"
        >
          ← Blog
        </a>

        <div class="mb-10">
          <div class="flex items-center gap-x-3 mb-4">
            <PostTypeBadge type={meta.type} />
            <time datetime={meta.date} class="text-xs text-stone-900/40 dark:text-stone-200/40">
              {formatDate(meta.date)}
            </time>
          </div>
          <h1 class="text-3xl sm:text-4xl font-medium tracking-tight text-balance">{meta.title}</h1>
        </div>

        {children}
      </article>
    </BlogLayout>
  );
}
